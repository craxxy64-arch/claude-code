import { colorFor } from '../detection/categories.ts';
import type { Track } from '../tracking/types.ts';
import { formatId } from '../utils/format.ts';
import { MONO } from '../utils/fonts.ts';
import { MonocularProjection, type RadarPoint } from './projection.ts';
import { fitMotion, rangeUncertainty, TREND_ARROW, TREND_LABEL, type Motion } from './kinematics.ts';
import type { AnimationLevel } from '../settings/Settings.ts';

export interface RadarOptions {
  range: number;
  selectedId: number | null;
  showIds: boolean;
  showVectors: boolean;
  showTrails: boolean;
  showConfidence: boolean;
  trailSec: number;
  animation: AnimationLevel;
}

export interface RadarTheme {
  grid: string;
  gridStrong: string;
  text: string;
  textDim: string;
  accent: string;
  fov: string;
  sweep: string;
  warn: string;
  bg: string;
  plate: string;
}

interface RadarTrackState {
  X: number;
  Y: number;
  point: RadarPoint;
  trail: { t: number; X: number; Y: number }[];
  lastT: number;
  seen: number;
  occluded: boolean;
}

export interface RadarBlip {
  id: number;
  label: string;
  point: RadarPoint;
  X: number;
  Y: number;
  /** Smoothed estimated distance, m. */
  range: number;
  /** Fractional ± on range (how sure the radar is about distance). */
  uncertainty: number;
  /** Closing / moving away / crossing, fitted from recent history (null until enough history). */
  motion: Motion | null;
  /** Seconds since last seen, when the target is hidden (e.g. something passing in front). */
  hiddenFor: number | null;
  /** Another target overlaps it, so its distance is being held rather than re-estimated. */
  partlyHidden: boolean;
}

/** True when another target's box covers a meaningful part of this one's. */
function overlappedByOther(track: Track, all: { track: Track }[]): boolean {
  const ax0 = track.x - track.w / 2;
  const ay0 = track.y - track.h / 2;
  const area = track.w * track.h;
  if (area <= 0) return false;
  for (const { track: o } of all) {
    if (o.id === track.id || o.status === 'tentative') continue;
    const ix = Math.max(0, Math.min(ax0 + track.w, o.x + o.w / 2) - Math.max(ax0, o.x - o.w / 2));
    const iy = Math.max(0, Math.min(ay0 + track.h, o.y + o.h / 2) - Math.max(ay0, o.y - o.h / 2));
    if ((ix * iy) / area > 0.15) return true;
  }
  return false;
}

/** Seconds ahead the projected path is drawn. */
const PROJECT_SEC = 1.5;

/**
 * Sector ("B-scope"-style) radar: the camera sits at the apex, targets are
 * placed by measured bearing and *estimated* range.
 */
export class RadarRenderer {
  readonly projection = new MonocularProjection();
  private ctx: CanvasRenderingContext2D;
  private cssW = 0;
  private cssH = 0;
  private dpr = 1;
  private state = new Map<number, RadarTrackState>();
  private hits: { id: number; x: number; y: number; r: number }[] = [];
  private theme: RadarTheme = {
    grid: 'rgba(120,200,180,0.14)',
    gridStrong: 'rgba(120,200,180,0.35)',
    text: '#cfe9e2',
    textDim: 'rgba(207,233,226,0.55)',
    accent: '#5cf2b0',
    fov: 'rgba(92,242,176,0.05)',
    sweep: 'rgba(92,242,176,0.22)',
    warn: '#ffb547',
    bg: '#070b10',
    plate: 'rgba(5,8,11,0.72)',
  };
  blips: RadarBlip[] = [];

  constructor(readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable for radar');
    this.ctx = ctx;
    new ResizeObserver(() => this.resize()).observe(canvas);
    this.resize();
  }

  setTheme(theme: Partial<RadarTheme>): void {
    this.theme = { ...this.theme, ...theme };
  }

  reset(): void {
    this.state.clear();
    this.blips = [];
  }

  /** Returns the target id under a CSS-pixel point, if any. */
  hitTest(x: number, y: number): number | null {
    let best: number | null = null;
    let bestD = Infinity;
    for (const h of this.hits) {
      const d = Math.hypot(h.x - x, h.y - y);
      if (d < h.r && d < bestD) {
        best = h.id;
        bestD = d;
      }
    }
    return best;
  }

  estimateFor(id: number): RadarBlip | undefined {
    return this.blips.find((b) => b.id === id);
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cssW = Math.max(1, rect.width);
    this.cssH = Math.max(1, rect.height);
    this.canvas.width = Math.round(this.cssW * this.dpr);
    this.canvas.height = Math.round(this.cssH * this.dpr);
  }

  /**
   * @param tracks confirmed tracks with interpolated positions
   * @param now seconds (performance clock)
   */
  render(tracks: { track: Track; x: number; y: number }[], now: number, opts: RadarOptions): void {
    if (this.canvas.width !== Math.round(this.cssW * this.dpr)) this.resize();
    const { ctx } = this;
    const W = this.cssW;
    const H = this.cssH;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const compact = W < 420;
    const half = Math.min(80, this.projection.hFovDeg / 2 + 9);
    const halfRad = (half * Math.PI) / 180;
    const topPad = compact ? 62 : 64; // room for the header and situation lines
    const bottomPad = compact ? 44 : 54;
    const side = 18;
    const availH = H - topPad - bottomPad;
    const R = Math.max(40, Math.min(availH, (W / 2 - side) / Math.sin(halfRad)));
    const ax = W / 2;
    // Centre the sector's bounding box vertically in the free space.
    const ay = topPad + R + Math.max(0, (availH - R) / 2);
    const pxPerM = R / opts.range;

    this.drawGrid(ctx, ax, ay, R, half, opts.range, compact);
    this.drawSweep(ctx, ax, ay, R, now, opts.animation);

    // Update per-track radar state.
    const alive = new Set<number>();
    const blips: RadarBlip[] = [];
    for (const { track, x, y } of tracks) {
      alive.add(track.id);
      const p = this.projection.project({ label: track.label, x, y, w: track.w, h: track.h });
      let st = this.state.get(track.id);
      if (!st) {
        st = { X: p.X, Y: p.Y, point: p, trail: [], lastT: now, seen: now, occluded: false };
        this.state.set(track.id, st);
      }
      // Range comes from box size. A box that's partly covered by another target
      // shrinks, which would read as "moving away" — so while a target is hidden or
      // overlapped, hold its last good distance and keep only its bearing current.
      st.occluded = track.status === 'lost' || overlappedByOther(track, tracks);
      const a = 1 - Math.exp(-Math.max(0, now - st.lastT) / 0.3);
      if (st.occluded) {
        const r = Math.hypot(st.X, st.Y);
        const rad = (p.bearing * Math.PI) / 180;
        st.X += a * (r * Math.sin(rad) - st.X);
        st.Y += a * (r * Math.cos(rad) - st.Y);
      } else {
        // Range estimates jitter with box size; smooth them over ~0.3 s.
        st.X += a * (p.X - st.X);
        st.Y += a * (p.Y - st.Y);
        st.point = p;
      }
      st.lastT = now;
      const lastTrail = st.trail.at(-1);
      // Held positions aren't measurements; keep them out of the motion fit.
      if (!st.occluded && (!lastTrail || now - lastTrail.t > 0.1)) st.trail.push({ t: now, X: st.X, Y: st.Y });
      const cutoff = now - Math.max(opts.trailSec, 1);
      while (st.trail.length && st.trail[0].t < cutoff) st.trail.shift();
      blips.push({
        id: track.id,
        label: track.label,
        point: p,
        X: st.X,
        Y: st.Y,
        range: Math.hypot(st.X, st.Y),
        uncertainty: rangeUncertainty(p),
        motion: st.occluded ? null : fitMotion(st.trail, now),
        partlyHidden: st.occluded && track.status !== 'lost',
        hiddenFor: track.status === 'lost' ? Math.max(0, now - track.lastSeen) : null,
      });
    }
    for (const id of this.state.keys()) if (!alive.has(id)) this.state.delete(id);
    this.blips = blips;

    const toScreen = (X: number, Y: number) => {
      const r = Math.hypot(X, Y);
      const clampR = Math.min(r, opts.range);
      const k = r > 0 ? clampR / r : 0;
      return { sx: ax + X * k * pxPerM, sy: ay - Y * k * pxPerM, clipped: r > opts.range };
    };

    // Trails.
    this.hits = [];
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (opts.showTrails) {
      for (const { track } of tracks) {
        const st = this.state.get(track.id);
        if (!st || st.trail.length < 2) continue;
        const color = colorFor(track.label);
        const selected = opts.selectedId === track.id;
        for (let i = 1; i < st.trail.length; i++) {
          const p0 = toScreen(st.trail[i - 1].X, st.trail[i - 1].Y);
          const p1 = toScreen(st.trail[i].X, st.trail[i].Y);
          const age = (now - st.trail[i].t) / Math.max(opts.trailSec, 1);
          ctx.globalAlpha = Math.max(0.05, (1 - age) * (selected ? 0.9 : 0.55));
          ctx.strokeStyle = color;
          ctx.lineWidth = selected ? 2.2 : 1.4;
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    // Blips.
    const font = compact ? 10 : 11;
    const placed: { x: number; y: number; w: number; h: number }[] = [];
    for (const { track } of tracks) {
      const st = this.state.get(track.id);
      if (!st) continue;
      const { sx, sy, clipped } = toScreen(st.X, st.Y);
      const color = colorFor(track.label);
      const lost = track.status === 'lost';
      const selected = opts.selectedId === track.id;
      const moving = track.movement === 'moving';

      const blip = blips.find((b) => b.id === track.id)!;

      // Range uncertainty: a bar along the line of sight showing how sure the distance is.
      if (!lost && !blip.point.measured) {
        const u = blip.uncertainty;
        const k0 = 1 - u;
        const k1 = 1 + u;
        const n = toScreen(st.X * k0, st.Y * k0);
        const f = toScreen(st.X * k1, st.Y * k1);
        ctx.strokeStyle = color;
        ctx.globalAlpha = selected ? 0.55 : 0.3;
        ctx.lineWidth = selected ? 3 : 2;
        ctx.beginPath();
        ctx.moveTo(n.sx, n.sy);
        ctx.lineTo(f.sx, f.sy);
        ctx.stroke();
        // End caps perpendicular to the line of sight.
        const ang = Math.atan2(f.sy - n.sy, f.sx - n.sx) + Math.PI / 2;
        const cap = 4;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (const e of [n, f]) {
          ctx.moveTo(e.sx - Math.cos(ang) * cap, e.sy - Math.sin(ang) * cap);
          ctx.lineTo(e.sx + Math.cos(ang) * cap, e.sy + Math.sin(ang) * cap);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Heading arrow plus dotted projected path: where it will be in PROJECT_SEC at this velocity.
      const mv = blip.motion;
      if (opts.showVectors && mv && mv.speed > 0.2) {
        const tip = toScreen(st.X + mv.vX * 0.6, st.Y + mv.vY * 0.6);
        const end = toScreen(st.X + mv.vX * PROJECT_SEC, st.Y + mv.vY * PROJECT_SEC);
        if (Math.hypot(tip.sx - sx, tip.sy - sy) > 4) this.arrow(ctx, sx, sy, tip.sx, tip.sy, color);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(tip.sx, tip.sy);
        ctx.lineTo(end.sx, end.sy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(end.sx, end.sy, 3.5, 0, Math.PI * 2);
        ctx.stroke();
        if (selected) {
          ctx.font = `9px ${MONO}`;
          ctx.fillStyle = color;
          ctx.textAlign = 'center';
          ctx.fillText(`+${PROJECT_SEC}s`, end.sx, end.sy - 7);
        }
        ctx.globalAlpha = 1;
      }

      // Hidden target: dashed ring where it was last seen.
      if (lost) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      const r = selected ? 7 : 5.5;
      ctx.globalAlpha = lost ? 0.45 : 1;
      if (opts.animation !== 'off' && !lost) {
        const pulse = (now * (moving ? 1.6 : 0.8) + track.id * 0.37) % 1;
        ctx.strokeStyle = color;
        ctx.globalAlpha = (1 - pulse) * 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, r + pulse * 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (track.label === 'person') {
        ctx.moveTo(sx, sy - r);
        ctx.lineTo(sx + r, sy);
        ctx.lineTo(sx, sy + r);
        ctx.lineTo(sx - r, sy);
        ctx.closePath();
      } else {
        ctx.rect(sx - r * 0.8, sy - r * 0.8, r * 1.6, r * 1.6);
      }
      if (lost) ctx.stroke();
      else ctx.fill();

      if (clipped) {
        ctx.fillStyle = this.theme.warn;
        ctx.font = `600 ${font}px ${MONO}`;
        ctx.textAlign = 'center';
        ctx.fillText('▲ BEYOND RANGE', sx, sy - r - 6);
      }

      if (selected) {
        ctx.strokeStyle = this.theme.text;
        ctx.lineWidth = 1;
        const b = r + 7;
        const c = 5;
        ctx.beginPath();
        for (const [dx, dy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
          ctx.moveTo(sx + dx * b, sy + dy * (b - c));
          ctx.lineTo(sx + dx * b, sy + dy * b);
          ctx.lineTo(sx + dx * (b - c), sy + dy * b);
        }
        ctx.stroke();
      }

      // Label (with simple collision avoidance against labels already placed).
      const title = opts.showIds ? `${formatId(track.id)} ${track.label.toUpperCase()}` : track.label.toUpperCase();
      const est = st.point.quality === 'rough' ? '≈' : '~';
      let second: string;
      if (lost) {
        second = `HIDDEN · last seen ${(blip.hiddenFor ?? 0).toFixed(1)} s ago`;
      } else if (blip.partlyHidden) {
        second = `${est}${blip.range.toFixed(1)} m held · PARTLY HIDDEN`;
      } else {
        second = `${est}${blip.range.toFixed(1)} ±${(blip.range * blip.uncertainty).toFixed(1)} m`;
        if (mv && mv.trend !== 'steady') {
          second += ` · ${TREND_ARROW[mv.trend]} ${TREND_LABEL[mv.trend]}`;
          if (mv.trend !== 'crossing') second += ` ${Math.abs(mv.rangeRate).toFixed(1)} m/s`;
        } else if (opts.showConfidence) {
          second += ` · ${Math.round(track.avgScore * 100)}%`;
        }
      }
      ctx.font = `600 ${font}px ${MONO}`;
      const lw = Math.max(ctx.measureText(title).width, ctx.measureText(second).width * 0.95) + 8;
      const lh = font * 2 + 6;
      const right = sx > W - lw - 24;
      let lx = right ? sx - 12 - lw : sx + 12;
      let ly = sy - font - 2;
      for (let k = 0; k < 6; k++) {
        const hit = placed.find((r) => lx < r.x + r.w && lx + lw > r.x && ly < r.y + r.h && ly + lh > r.y);
        if (!hit) break;
        ly = hit.y + hit.h + 2;
      }
      placed.push({ x: lx, y: ly, w: lw, h: lh });
      if (Math.abs(ly - (sy - font - 2)) > 2) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(right ? lx + lw : lx, ly + lh / 2);
        ctx.stroke();
      }
      ctx.globalAlpha = lost ? 0.55 : 1;
      ctx.fillStyle = this.theme.plate;
      ctx.fillRect(lx - 3, ly - 1, lw, lh);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = color;
      ctx.fillText(title, lx + 1, ly + 1);
      ctx.font = `${font - 1}px ${MONO}`;
      ctx.fillStyle = '#d7e6e2'; // plates are always dark for contrast
      ctx.fillText(second, lx + 1, ly + font + 3);
      ctx.textBaseline = 'alphabetic';
      ctx.globalAlpha = 1;

      this.hits.push({ id: track.id, x: sx, y: sy, r: 22 });
    }

    this.drawApex(ctx, ax, ay);
    this.drawHud(ctx, W, H, tracks.length, opts.range, compact);
    this.drawSituation(ctx, W, compact);
  }

  /** The closest target and what it's doing, plus how many are closing / hidden. */
  private drawSituation(ctx: CanvasRenderingContext2D, W: number, compact: boolean): void {
    const visible = this.blips.filter((b) => b.hiddenFor == null);
    const closest = visible.reduce<RadarBlip | null>((a, b) => (!a || b.range < a.range ? b : a), null);
    const closing = visible.filter((b) => b.motion?.trend === 'closing').length;
    const hidden = this.blips.length - visible.length;
    const y = compact ? 46 : 38;
    ctx.textBaseline = 'alphabetic';
    ctx.font = `600 ${compact ? 10 : 11}px ${MONO}`;
    ctx.textAlign = 'left';
    if (closest) {
      const m = closest.motion;
      let text = `CLOSEST ${formatId(closest.id)} ${closest.label.toUpperCase()} ~${closest.range.toFixed(1)} m est.`;
      if (m && m.trend === 'closing' && m.timeToReach != null && m.timeToReach < 30) text += ` · ${TREND_ARROW.closing} reaches camera in ~${m.timeToReach.toFixed(0)} s`;
      else if (m && m.trend !== 'steady') text += ` · ${TREND_ARROW[m.trend]} ${TREND_LABEL[m.trend]}`;
      ctx.fillStyle = m?.trend === 'closing' ? this.theme.warn : this.theme.text;
      ctx.fillText(text, 12, y);
    } else {
      ctx.fillStyle = this.theme.textDim;
      ctx.fillText('NO TARGETS IN VIEW', 12, y);
    }
    const parts = [];
    if (closing) parts.push(`${closing} CLOSING`);
    if (hidden) parts.push(`${hidden} HIDDEN`);
    if (parts.length && !compact) {
      ctx.textAlign = 'right';
      ctx.fillStyle = this.theme.textDim;
      ctx.fillText(parts.join(' · '), W - 12, y);
    }
  }

  private drawGrid(ctx: CanvasRenderingContext2D, ax: number, ay: number, R: number, half: number, range: number, compact: boolean): void {
    const t = this.theme;
    const a0 = -Math.PI / 2 - (half * Math.PI) / 180;
    const a1 = -Math.PI / 2 + (half * Math.PI) / 180;

    // Sector body.
    const g = ctx.createRadialGradient(ax, ay, 0, ax, ay, R);
    g.addColorStop(0, t.fov);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.arc(ax, ay, R, a0, a1);
    ctx.closePath();
    ctx.fill();

    // FOV wedge.
    const fovHalf = (this.projection.hFovDeg / 2) * (Math.PI / 180);
    ctx.fillStyle = t.fov;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.arc(ax, ay, R, -Math.PI / 2 - fovHalf, -Math.PI / 2 + fovHalf);
    ctx.closePath();
    ctx.fill();

    // Range rings.
    ctx.lineWidth = 1;
    const rings = 4;
    ctx.font = `${compact ? 9 : 10}px ${MONO}`;
    for (let i = 1; i <= rings; i++) {
      const r = (R * i) / rings;
      ctx.strokeStyle = i === rings ? t.gridStrong : t.grid;
      ctx.setLineDash(i === rings ? [] : [2, 4]);
      ctx.beginPath();
      ctx.arc(ax, ay, r, a0, a1);
      ctx.stroke();
      ctx.setLineDash([]);
      const m = (range * i) / rings;
      // Label along the boresight, just inside each ring.
      ctx.fillStyle = t.textDim;
      ctx.textAlign = 'left';
      ctx.fillText(`${m % 1 ? m.toFixed(1) : m} m`, ax + 5, ay - r + 12);
    }

    // Bearing spokes.
    const step = half > 50 ? 15 : 10;
    for (let d = -Math.floor(half / step) * step; d <= half; d += step) {
      const a = -Math.PI / 2 + (d * Math.PI) / 180;
      ctx.strokeStyle = d === 0 ? t.gridStrong : t.grid;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax + R * Math.cos(a), ay + R * Math.sin(a));
      ctx.stroke();
      // Ticks + labels.
      ctx.fillStyle = t.textDim;
      ctx.textAlign = 'center';
      const lr = R + 12;
      ctx.fillText(`${d > 0 ? '+' : ''}${d}°`, ax + lr * Math.cos(a), ay + lr * Math.sin(a) + 3);
    }
    // Fine ticks on the outer arc.
    ctx.strokeStyle = t.gridStrong;
    for (let d = -Math.floor(half); d <= half; d += 2) {
      const a = -Math.PI / 2 + (d * Math.PI) / 180;
      const len = d % 10 === 0 ? 6 : 3;
      ctx.beginPath();
      ctx.moveTo(ax + R * Math.cos(a), ay + R * Math.sin(a));
      ctx.lineTo(ax + (R - len) * Math.cos(a), ay + (R - len) * Math.sin(a));
      ctx.stroke();
    }

    // FOV edges.
    ctx.strokeStyle = t.accent;
    ctx.globalAlpha = 0.5;
    ctx.setLineDash([6, 5]);
    for (const s of [-1, 1]) {
      const a = -Math.PI / 2 + s * fovHalf;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax + R * Math.cos(a), ay + R * Math.sin(a));
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.fillStyle = t.accent;
    ctx.textAlign = 'left';
    const fa = -Math.PI / 2 + fovHalf;
    ctx.fillText(`FOV ${Math.round(this.projection.hFovDeg)}°`, ax + R * 0.55 * Math.cos(fa) + 6, ay + R * 0.55 * Math.sin(fa));
  }

  private drawSweep(ctx: CanvasRenderingContext2D, ax: number, ay: number, R: number, now: number, level: AnimationLevel): void {
    if (level === 'off') return;
    const fovHalf = (this.projection.hFovDeg / 2) * (Math.PI / 180);
    const period = level === 'full' ? 3.2 : 6;
    const phase = (now % period) / period;
    // Ping-pong across the field of view.
    const s = phase < 0.5 ? phase * 2 : 2 - phase * 2;
    const dir = phase < 0.5 ? 1 : -1;
    const a = -Math.PI / 2 - fovHalf + s * 2 * fovHalf;
    const width = level === 'full' ? 0.22 : 0.1;
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      const aa = a - dir * (width * i) / steps;
      ctx.globalAlpha = ((steps - i) / steps) * (level === 'full' ? 0.18 : 0.1);
      ctx.fillStyle = this.theme.sweep;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.arc(ax, ay, R, Math.min(aa, aa - dir * (width / steps)), Math.max(aa, aa - dir * (width / steps)));
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = this.theme.accent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax + R * Math.cos(a), ay + R * Math.sin(a));
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  private drawApex(ctx: CanvasRenderingContext2D, ax: number, ay: number): void {
    ctx.fillStyle = this.theme.accent;
    ctx.strokeStyle = this.theme.accent;
    ctx.beginPath();
    ctx.moveTo(ax, ay - 8);
    ctx.lineTo(ax + 7, ay + 4);
    ctx.lineTo(ax - 7, ay + 4);
    ctx.closePath();
    ctx.fill();
    ctx.font = `600 10px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = this.theme.textDim;
    ctx.fillText('CAM', ax, ay + 17);
  }

  private drawHud(ctx: CanvasRenderingContext2D, W: number, H: number, count: number, range: number, compact: boolean): void {
    const t = this.theme;
    ctx.font = `600 ${compact ? 10 : 11}px ${MONO}`;
    ctx.fillStyle = t.textDim;
    ctx.textAlign = 'left';
    const left = W < 640 ? 'SECTOR PROJECTION' : 'SECTOR PROJECTION · CAMERA SPACE → GROUND PLANE';
    const right = `TARGETS ${String(count).padStart(2, '0')} · RANGE ${range} m EST.`;
    const fits = ctx.measureText(left).width + ctx.measureText(right).width + 40 < W;
    ctx.fillText(left, 12, 18);
    ctx.textAlign = fits ? 'right' : 'left';
    ctx.fillStyle = t.text;
    ctx.fillText(right, fits ? W - 12 : 12, fits ? 18 : 32);
    ctx.textAlign = 'center';
    ctx.fillStyle = t.warn;
    ctx.font = `${compact ? 9 : 10.5}px ${MONO}`;
    const full = 'Estimated distance — camera calibration required for accurate measurements.';
    const msg = this.projection.depth
      ? `Range measured by depth sensor (${this.projection.depth.id}).`
      : compact || ctx.measureText(full).width > W - 24
        ? 'Estimated distance — calibration required for accuracy.'
        : full;
    ctx.fillText(msg, W / 2, H - 12);
  }

  private arrow(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string): void {
    const a = Math.atan2(y1 - y0, x1 - x0);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - 8 * Math.cos(a - 0.4), y1 - 8 * Math.sin(a - 0.4));
    ctx.lineTo(x1 - 8 * Math.cos(a + 0.4), y1 - 8 * Math.sin(a + 0.4));
    ctx.closePath();
    ctx.fill();
  }
}
