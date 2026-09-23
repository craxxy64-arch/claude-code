import { colorFor } from '../detection/categories.ts';
import type { MotionResult } from '../motion/analysis.ts';
import type { MotionHeatmap } from '../motion/MotionHeatmap.ts';
import type { Track } from '../tracking/types.ts';
import { MONO } from '../utils/fonts.ts';
import { formatId } from '../utils/format.ts';
import { compassArrow, compassFromVelocity, compassWord } from '../utils/math.ts';

export interface OverlayOptions {
  showBoxes: boolean;
  showIds: boolean;
  showVectors: boolean;
  showTrails: boolean;
  showConfidence: boolean;
  showMotion: boolean;
  showHeatmap: boolean;
  trailSec: number;
  selectedId: number | null;
}

export interface OverlayFrame {
  tracks: { track: Track; x: number; y: number }[];
  motion: MotionResult | null;
  heatmap: MotionHeatmap | null;
  now: number;
  frameWidth: number;
  frameHeight: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Draws detection / tracking / motion overlays into any 2D context, so the same
 * code renders the live overlay, snapshots and recordings.
 */
export class OverlayRenderer {
  private heatCanvas: HTMLCanvasElement = document.createElement('canvas');
  private heatCtx = this.heatCanvas.getContext('2d')!;
  private lastBoxes: { id: number; x: number; y: number; w: number; h: number }[] = [];

  draw(ctx: CanvasRenderingContext2D, rect: Rect, frame: OverlayFrame, opts: OverlayOptions, uiScale = 1): void {
    const P = (nx: number, ny: number) => [rect.x + nx * rect.w, rect.y + ny * rect.h] as const;
    const S = (v: number) => v * uiScale;
    this.lastBoxes = [];

    if (opts.showHeatmap && frame.heatmap) this.drawHeatmap(ctx, rect, frame);

    if (opts.showMotion && frame.motion && !frame.motion.global) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,181,71,0.75)';
      ctx.lineWidth = S(1);
      ctx.setLineDash([S(3), S(3)]);
      for (const b of frame.motion.blobs.slice(0, 12)) {
        const [x, y] = P(b.box.x, b.box.y);
        ctx.strokeRect(x, y, b.box.w * rect.w, b.box.h * rect.h);
      }
      ctx.restore();
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const { track: tr, x: cxn, y: cyn } of frame.tracks) {
      const color = colorFor(tr.label);
      const lost = tr.status === 'lost';
      const selected = opts.selectedId === tr.id;
      const bw = tr.w * rect.w;
      const bh = tr.h * rect.h;
      const [cx, cy] = P(cxn, cyn);
      const bx = cx - bw / 2;
      const by = cy - bh / 2;
      this.lastBoxes.push({ id: tr.id, x: bx, y: by, w: bw, h: bh });

      // Trail.
      if (opts.showTrails && tr.history.length > 1) {
        const cutoff = frame.now - opts.trailSec;
        ctx.lineWidth = S(selected ? 2.4 : 1.6);
        ctx.strokeStyle = color;
        let prev: readonly [number, number] | null = null;
        for (const p of tr.history) {
          if (p.t < cutoff) continue;
          const q = P(p.x, p.y);
          if (prev) {
            ctx.globalAlpha = 0.15 + 0.7 * (1 - (frame.now - p.t) / opts.trailSec);
            ctx.beginPath();
            ctx.moveTo(prev[0], prev[1]);
            ctx.lineTo(q[0], q[1]);
            ctx.stroke();
          }
          prev = q;
        }
        if (prev) {
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(prev[0], prev[1]);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // Box.
      if (opts.showBoxes) {
        ctx.globalAlpha = lost ? 0.45 : 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = S(selected ? 1.6 : 1);
        ctx.setLineDash(lost ? [S(4), S(4)] : []);
        ctx.globalAlpha = lost ? 0.35 : 0.35;
        ctx.strokeRect(bx, by, bw, bh);
        ctx.setLineDash([]);
        ctx.globalAlpha = lost ? 0.5 : 1;
        ctx.lineWidth = S(selected ? 3 : 2);
        const c = Math.min(S(16), bw / 3, bh / 3);
        ctx.beginPath();
        ctx.moveTo(bx, by + c); ctx.lineTo(bx, by); ctx.lineTo(bx + c, by);
        ctx.moveTo(bx + bw - c, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + c);
        ctx.moveTo(bx + bw, by + bh - c); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw - c, by + bh);
        ctx.moveTo(bx + c, by + bh); ctx.lineTo(bx, by + bh); ctx.lineTo(bx, by + bh - c);
        ctx.stroke();
        if (frame.now - tr.suddenAt < 1.2 && Math.floor(frame.now * 6) % 2 === 0) {
          ctx.strokeStyle = '#ff5d5d';
          ctx.lineWidth = S(2);
          ctx.strokeRect(bx - S(3), by - S(3), bw + S(6), bh + S(6));
        }
        ctx.globalAlpha = 1;
      }

      // Previous → current position.
      if (tr.prev && !lost) {
        const [px, py] = P(tr.prev.x, tr.prev.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = S(1);
        ctx.beginPath();
        ctx.arc(px, py, S(3.5), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, S(lost ? 2.5 : 3.5), 0, Math.PI * 2);
      ctx.fill();

      // Movement vector: where the target will be in 0.6 s at current velocity.
      const moving = tr.movement === 'moving' && !lost;
      let dirText = '';
      if (moving) {
        const dir = compassFromVelocity(tr.vx * frame.frameWidth, tr.vy * frame.frameHeight);
        dirText = `${compassArrow(dir)} ${compassWord(dir)}`;
        if (opts.showVectors) {
          const look = 0.6;
          let tx = cx + tr.vx * look * rect.w;
          let ty = cy + tr.vy * look * rect.h;
          const len = Math.hypot(tx - cx, ty - cy);
          const minLen = S(18);
          if (len < minLen && len > 0) {
            tx = cx + ((tx - cx) / len) * minLen;
            ty = cy + ((ty - cy) / len) * minLen;
          }
          this.arrow(ctx, cx, cy, tx, ty, color, S(2));
        }
      }

      // Label chip.
      if (opts.showBoxes || opts.showIds) {
        const title = `${opts.showIds ? formatId(tr.id) + ' ' : ''}${tr.label.toUpperCase()}${opts.showConfidence ? ` ${Math.round(tr.score * 100)}%` : ''}`;
        const sub = lost
          ? 'SIGNAL LOST'
          : moving
            ? `MOVING ${dirText} · ${Math.round(tr.speedPx)} px/s`
            : 'STATIONARY';
        const fs = S(11);
        ctx.font = `600 ${fs}px ${MONO}`;
        const w1 = ctx.measureText(title).width;
        ctx.font = `${fs - S(1)}px ${MONO}`;
        const w2 = ctx.measureText(sub).width;
        const cw = Math.max(w1, w2) + S(12);
        const ch = fs * 2 + S(9);
        let lx = bx;
        let ly = by - ch - S(3);
        if (ly < rect.y) ly = by + S(3);
        if (lx + cw > rect.x + rect.w) lx = rect.x + rect.w - cw;
        if (lx < rect.x) lx = rect.x;
        ctx.globalAlpha = lost ? 0.6 : 0.92;
        ctx.fillStyle = 'rgba(6,10,14,0.82)';
        ctx.fillRect(lx, ly, cw, ch);
        ctx.fillStyle = color;
        ctx.fillRect(lx, ly, S(2), ch);
        ctx.globalAlpha = 1;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = `600 ${fs}px ${MONO}`;
        ctx.fillStyle = color;
        ctx.fillText(title, lx + S(7), ly + S(4));
        ctx.font = `${fs - S(1)}px ${MONO}`;
        ctx.fillStyle = frame.now - tr.suddenAt < 1.2 ? '#ff7b7b' : '#d7e6e2';
        ctx.fillText(frame.now - tr.suddenAt < 1.2 ? `SUDDEN · ${sub}` : sub, lx + S(7), ly + fs + S(5));
        ctx.textBaseline = 'alphabetic';
      }
    }
  }

  /** Box under a point in the same coordinates `draw` used. */
  hitTest(x: number, y: number): number | null {
    let best: number | null = null;
    let bestArea = Infinity;
    for (const b of this.lastBoxes) {
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
        const area = b.w * b.h;
        if (area < bestArea) {
          best = b.id;
          bestArea = area;
        }
      }
    }
    return best;
  }

  private drawHeatmap(ctx: CanvasRenderingContext2D, rect: Rect, frame: OverlayFrame): void {
    const heat = frame.heatmap!.heat(frame.now);
    if (!heat) return;
    const { gridW, gridH, values, max } = heat;
    if (this.heatCanvas.width !== gridW || this.heatCanvas.height !== gridH) {
      this.heatCanvas.width = gridW;
      this.heatCanvas.height = gridH;
    }
    const img = this.heatCtx.createImageData(gridW, gridH);
    const recent = frame.motion?.cells;
    const norm = Math.max(max, 0.5);
    for (let i = 0; i < values.length; i++) {
      const v = Math.sqrt(values[i] / norm); // perceptual stretch
      const [r, g, b] = heatColor(v);
      const o = i * 4;
      const live = recent && recent.length === values.length ? Math.min(1, recent[i] * 3) : 0;
      img.data[o] = Math.min(255, r + live * 120);
      img.data[o + 1] = Math.min(255, g + live * 120);
      img.data[o + 2] = Math.min(255, b + live * 120);
      img.data[o + 3] = Math.min(210, v * 220 + live * 140);
    }
    this.heatCtx.putImageData(img, 0, 0);
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(this.heatCanvas, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
  }

  private arrow(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string, width: number): void {
    const a = Math.atan2(y1 - y0, x1 - x0);
    const head = width * 4.5;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1 + Math.cos(a) * width, y1 + Math.sin(a) * width);
    ctx.lineTo(x1 - head * Math.cos(a - 0.45), y1 - head * Math.sin(a - 0.45));
    ctx.lineTo(x1 - head * Math.cos(a + 0.45), y1 - head * Math.sin(a + 0.45));
    ctx.closePath();
    ctx.fill();
  }
}

/** Low → high activity: deep blue → teal → amber → red. */
export function heatColor(v: number): [number, number, number] {
  const stops: [number, [number, number, number]][] = [
    [0, [20, 40, 120]],
    [0.35, [40, 200, 200]],
    [0.65, [255, 200, 60]],
    [1, [255, 60, 60]],
  ];
  const t = Math.max(0, Math.min(1, v));
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      const k = (t - t0) / (t1 - t0);
      return [c0[0] + (c1[0] - c0[0]) * k, c0[1] + (c1[1] - c0[1]) * k, c0[2] + (c1[2] - c0[2]) * k];
    }
  }
  return stops[stops.length - 1][1];
}
