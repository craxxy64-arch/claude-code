import { Emitter } from '../utils/emitter.ts';
import { clamp, iou, lerp, type Box } from '../utils/math.ts';
import { hungarian } from './hungarian.ts';
import type { Edge, MeasuredObject, Track, TrackEvent } from './types.ts';

export interface TrackerConfig {
  /** 0..100 — higher reacts faster and flags smaller movements. */
  sensitivity: number;
  /** Detections needed before a track is confirmed. */
  minHits: number;
  /** How long an unmatched confirmed track is kept (and coasted). */
  maxLostSec: number;
  /** Window in which a removed track can be re-acquired under the same ID. */
  reidSec: number;
  /** Seconds of history kept per track. */
  historySec: number;
  /** Source frame size, used to express speed in pixels. */
  frameWidth: number;
  frameHeight: number;
  /** Allow a detection of another class to continue a track (penalised). */
  crossClassPenalty: number;
}

export const DEFAULT_TRACKER_CONFIG: TrackerConfig = {
  sensitivity: 50,
  minHits: 3,
  maxLostSec: 1.6,
  reidSec: 4,
  historySec: 30,
  frameWidth: 1280,
  frameHeight: 720,
  crossClassPenalty: 0.35,
};

const EDGE_MARGIN = 0.035;
const MAX_COST = 0.9;

/**
 * Multi-target tracker: SORT-style association (Hungarian on IoU + centre
 * distance) with an alpha–beta filter per target, coasting through short
 * occlusions and re-identification of recently removed targets so IDs stay
 * stable when the detector flickers.
 */
export class Tracker extends Emitter<{ event: TrackEvent }> {
  config: TrackerConfig;
  private tracks: Track[] = [];
  private graveyard: Track[] = [];
  private nextId = 1;
  totalConfirmed = 0;
  lastUpdateMs = 0;

  constructor(config: Partial<TrackerConfig> = {}) {
    super();
    this.config = { ...DEFAULT_TRACKER_CONFIG, ...config };
  }

  configure(patch: Partial<TrackerConfig>): void {
    this.config = { ...this.config, ...patch };
  }

  /** Confirmed (active or coasting) tracks. */
  getTracks(): Track[] {
    return this.tracks.filter((t) => t.status !== 'tentative');
  }

  getTrack(id: number): Track | undefined {
    return this.tracks.find((t) => t.id === id) ?? this.graveyard.find((t) => t.id === id);
  }

  reset(): void {
    this.tracks = [];
    this.graveyard = [];
    this.nextId = 1;
    this.totalConfirmed = 0;
  }

  // Tunables derived from sensitivity --------------------------------------
  private get s(): number {
    return clamp(this.config.sensitivity / 100, 0, 1);
  }
  /** Speed (frame widths / s) above which a target counts as moving. */
  get moveThreshold(): number {
    return lerp(0.16, 0.035, this.s);
  }
  private get alpha(): number {
    return lerp(0.35, 0.8, this.s);
  }
  private get beta(): number {
    return lerp(0.08, 0.35, this.s);
  }
  /** Multiple of the move threshold a raw jump must exceed to count as sudden. */
  private get suddenFactor(): number {
    return lerp(5, 3, this.s);
  }

  /**
   * Associates a new set of measurements taken at time `t` (seconds).
   */
  update(measurements: MeasuredObject[], t: number): TrackEvent[] {
    const started = performance.now();
    const events: TrackEvent[] = [];
    const aspect = this.config.frameWidth / Math.max(1, this.config.frameHeight);

    // 1. Predict.
    const predicted = this.tracks.map((tr) => this.predictBox(tr, t));

    // 2. Cost matrix.
    const cost = this.tracks.map((tr, i) =>
      measurements.map((m) => this.cost(tr, predicted[i], m, aspect)),
    );
    const assignment = hungarian(cost);
    const usedMeas = new Set<number>();

    // 3. Update matched.
    this.tracks.forEach((tr, i) => {
      const j = assignment[i];
      if (j >= 0 && cost[i][j] < MAX_COST) {
        usedMeas.add(j);
        this.correct(tr, measurements[j], t, events);
      } else {
        this.miss(tr, t, events);
      }
    });

    // 4. Remove dead tracks.
    const alive: Track[] = [];
    for (const tr of this.tracks) {
      const lostFor = t - tr.lastSeen;
      if (tr.status === 'tentative' && tr.misses >= 2) continue;
      if (tr.status === 'lost' && lostFor > this.config.maxLostSec) {
        tr.exitedVia = this.edgeOf(tr);
        const where = tr.exitedVia === 'inside' ? 'lost inside frame (occluded or undetected)' : `left via ${tr.exitedVia.toUpperCase()} edge`;
        events.push({ type: 'exit', t, track: tr, detail: where });
        this.graveyard.push(tr);
        continue;
      }
      alive.push(tr);
    }
    this.tracks = alive;
    this.graveyard = this.graveyard.filter((g) => t - g.lastSeen < this.config.reidSec);

    // 5. Unmatched measurements: re-identify or spawn.
    measurements.forEach((m, j) => {
      if (usedMeas.has(j)) return;
      const revived = this.reidentify(m, t, aspect);
      if (revived) {
        this.correct(revived, m, t, events);
        revived.status = 'active';
        this.tracks.push(revived);
        events.push({ type: 'reacquired', t, track: revived, detail: 'target re-acquired with same ID' });
        return;
      }
      const fresh = this.spawn(m, t);
      this.correct(fresh, m, t, events);
      this.tracks.push(fresh);
    });

    this.lastUpdateMs = performance.now() - started;
    for (const e of events) this.emit('event', e);
    return events;
  }

  /** Position extrapolated to render time (tracking interpolation). */
  predictPoint(tr: Track, t: number): { x: number; y: number } {
    const dt = clamp(t - tr.lastUpdate, 0, 0.25);
    const k = tr.status === 'lost' ? 0 : 1;
    return { x: tr.x + tr.vx * dt * k, y: tr.y + tr.vy * dt * k };
  }

  // ------------------------------------------------------------------------
  private predictBox(tr: Track, t: number): Box {
    const dt = clamp(t - tr.lastUpdate, 0, 0.5);
    const cx = tr.x + tr.vx * dt;
    const cy = tr.y + tr.vy * dt;
    return { x: cx - tr.w / 2, y: cy - tr.h / 2, w: tr.w, h: tr.h };
  }

  private cost(tr: Track, pred: Box, m: MeasuredObject, aspect: number): number {
    const overlap = iou(pred, m.box);
    const mcx = m.box.x + m.box.w / 2;
    const mcy = m.box.y + m.box.h / 2;
    const pcx = pred.x + pred.w / 2;
    const pcy = pred.y + pred.h / 2;
    const dx = (mcx - pcx) * aspect;
    const dy = mcy - pcy;
    const dist = Math.hypot(dx, dy);
    // Gate: a fraction of the target's size plus slack for velocity error
    // (prediction already moved the box along its velocity).
    const size = Math.max(Math.hypot(tr.w * aspect, tr.h), 0.05);
    const speed = Math.hypot(tr.vx * aspect, tr.vy);
    const gate = size * 0.4 + 0.03 + speed * 0.15 + Math.min(2, tr.misses) * 0.02;
    if (overlap < 0.01 && dist > gate) return 1e3;
    const proximity = Math.max(0, 1 - dist / gate);
    const sizeRatio = Math.min(m.box.w * m.box.h, tr.w * tr.h) / Math.max(m.box.w * m.box.h, tr.w * tr.h, 1e-6);
    let c = 1 - (0.5 * overlap + 0.35 * proximity + 0.15 * sizeRatio);
    if (m.label !== tr.label) {
      if (overlap < 0.5) return 1e3;
      c += this.config.crossClassPenalty;
    }
    return c;
  }

  private correct(tr: Track, m: MeasuredObject, t: number, events: TrackEvent[]): void {
    const mx = m.box.x + m.box.w / 2;
    const my = m.box.y + m.box.h / 2;
    const dt = t - tr.lastUpdate;
    const { frameWidth: W, frameHeight: H } = this.config;

    if (tr.hits === 0 || dt <= 0 || dt > 2) {
      tr.x = mx;
      tr.y = my;
      tr.w = m.box.w;
      tr.h = m.box.h;
      if (dt > 2) {
        tr.vx = 0;
        tr.vy = 0;
      }
    } else {
      const px = tr.x + tr.vx * dt;
      const py = tr.y + tr.vy * dt;
      const rx = mx - px;
      const ry = my - py;
      tr.x = px + this.alpha * rx;
      tr.y = py + this.alpha * ry;
      tr.vx += (this.beta / dt) * rx;
      tr.vy += (this.beta / dt) * ry;
      // Bound the velocity to something physically plausible for a camera frame.
      const vmax = 4;
      tr.vx = clamp(tr.vx, -vmax, vmax);
      tr.vy = clamp(tr.vy, -vmax, vmax);
      tr.w += 0.35 * (m.box.w - tr.w);
      tr.h += 0.35 * (m.box.h - tr.h);
    }

    // Sudden movement: the raw measured speed jumps well above the target's
    // usual pace for two consecutive updates (one bad box can't trigger it).
    const dtMeas = tr.lastMeas ? t - tr.lastMeas.t : 0;
    if (tr.lastMeas && dtMeas > 0 && dtMeas < 1) {
      const raw = Math.hypot(mx - tr.lastMeas.x, (my - tr.lastMeas.y) * (H / W)) / dtMeas;
      const limit = Math.max(this.moveThreshold * this.suddenFactor, tr.paceBaseline * 3);
      tr.suddenStreak = raw > limit ? tr.suddenStreak + 1 : 0;
      tr.paceBaseline += 0.12 * (Math.min(raw, 4) - tr.paceBaseline);
      if (tr.suddenStreak >= 2 && tr.status !== 'tentative' && t - tr.suddenAt > 1.5) {
        tr.suddenAt = t;
        tr.suddenStreak = 0;
        events.push({ type: 'sudden', t, track: tr, detail: `sudden movement (${Math.round(raw * W)} px/s)` });
      }
    }
    tr.lastMeas = { x: mx, y: my, t };

    if (tr.hits > 0) tr.prev = { x: tr.history.at(-1)?.x ?? tr.x, y: tr.history.at(-1)?.y ?? tr.y, t: tr.lastUpdate };
    tr.speedPx = Math.hypot(tr.vx * W, tr.vy * H);
    const speedNorm = tr.speedPx / W;
    // Hysteresis prevents flicker between moving / stationary.
    const wasMoving = tr.movement === 'moving';
    if (!wasMoving && speedNorm > this.moveThreshold) {
      tr.movement = 'moving';
      if (tr.status === 'active') events.push({ type: 'start-moving', t, track: tr, detail: 'started moving' });
    } else if (wasMoving && speedNorm < this.moveThreshold * 0.55) {
      tr.movement = 'stationary';
      if (tr.status === 'active') events.push({ type: 'stopped', t, track: tr, detail: 'became stationary' });
    }

    if (m.label !== tr.label) {
      // Relabel only if the detector insists (keeps IDs stable on class flicker).
      const votes = ((tr.meta.labelVotes as Record<string, number>) ??= {});
      votes[m.label] = (votes[m.label] ?? 0) + 1;
      if (votes[m.label] >= 5) {
        tr.label = m.label;
        tr.meta.labelVotes = {};
      }
    } else if (tr.meta.labelVotes) {
      tr.meta.labelVotes = {};
    }

    tr.score = m.score;
    tr.avgScore = tr.hits === 0 ? m.score : tr.avgScore + 0.15 * (m.score - tr.avgScore);
    tr.hits++;
    tr.misses = 0;
    tr.lastSeen = t;
    tr.lastUpdate = t;
    tr.history.push({ t, x: tr.x, y: tr.y, w: tr.w, h: tr.h, speed: tr.speedPx });
    const cutoff = t - this.config.historySec;
    while (tr.history.length && (tr.history[0].t < cutoff || tr.history.length > 900)) tr.history.shift();

    if (tr.status === 'tentative' && tr.hits >= this.config.minHits) {
      tr.status = 'active';
      this.totalConfirmed++;
      const from = tr.enteredFrom === 'inside' ? 'appeared in view' : `entered from ${tr.enteredFrom.toUpperCase()} edge`;
      events.push({ type: 'enter', t, track: tr, detail: from });
    } else if (tr.status === 'lost') {
      tr.status = 'active';
    }
  }

  private miss(tr: Track, t: number, _events: TrackEvent[]): void {
    tr.misses++;
    if (tr.status === 'active') tr.status = 'lost';
    // Coast briefly along the last velocity, decaying it.
    const dt = clamp(t - tr.lastUpdate, 0, 0.5);
    if (t - tr.lastSeen < 0.6) {
      tr.x = clamp(tr.x + tr.vx * dt, 0, 1);
      tr.y = clamp(tr.y + tr.vy * dt, 0, 1);
    }
    tr.vx *= 0.6;
    tr.vy *= 0.6;
    tr.lastUpdate = t;
  }

  private reidentify(m: MeasuredObject, t: number, aspect: number): Track | null {
    let best: Track | null = null;
    let bestD = Infinity;
    const mcx = m.box.x + m.box.w / 2;
    const mcy = m.box.y + m.box.h / 2;
    for (const g of this.graveyard) {
      if (g.label !== m.label) continue;
      // Targets that walked out of frame come back through an edge, anywhere along it.
      const gap = t - g.lastSeen;
      const reach = 0.12 + Math.hypot(g.vx * aspect, g.vy) * Math.min(gap, 1.5) + Math.max(g.w * aspect, g.h) * 0.5;
      const d = Math.hypot((mcx - g.x) * aspect, mcy - g.y);
      if (d < reach && d < bestD) {
        best = g;
        bestD = d;
      }
    }
    if (best) {
      this.graveyard = this.graveyard.filter((g) => g !== best);
      best.exitedVia = null;
      best.misses = 0;
    }
    return best;
  }

  private spawn(m: MeasuredObject, t: number): Track {
    const edge = this.boxEdge(m.box);
    return {
      id: this.nextId++,
      label: m.label,
      status: 'tentative',
      x: m.box.x + m.box.w / 2,
      y: m.box.y + m.box.h / 2,
      w: m.box.w,
      h: m.box.h,
      vx: 0,
      vy: 0,
      speedPx: 0,
      movement: 'stationary',
      score: m.score,
      avgScore: m.score,
      firstSeen: t,
      lastSeen: t,
      lastUpdate: t,
      hits: 0,
      misses: 0,
      prev: null,
      history: [],
      enteredFrom: edge,
      exitedVia: null,
      suddenAt: -Infinity,
      lastMeas: null,
      suddenStreak: 0,
      paceBaseline: 0,
      meta: {},
    };
  }

  private boxEdge(b: Box): Edge | 'inside' {
    // Prefer the side the box is pressed against most.
    const d: [Edge, number][] = [
      ['left', b.x],
      ['right', 1 - (b.x + b.w)],
      ['top', b.y],
      ['bottom', 1 - (b.y + b.h)],
    ];
    const touching = d.filter(([, v]) => v < EDGE_MARGIN).sort((a, b2) => a[1] - b2[1]);
    // Bottom edge is often touched by people standing close; favour left/right.
    const lr = touching.find(([e]) => e === 'left' || e === 'right');
    return lr ? lr[0] : touching[0]?.[0] ?? 'inside';
  }

  private edgeOf(tr: Track): Edge | 'inside' {
    const box = { x: tr.x - tr.w / 2, y: tr.y - tr.h / 2, w: tr.w, h: tr.h };
    const edge = this.boxEdge(box);
    if (edge !== 'inside') return edge;
    // Heading out quickly from close to an edge also counts.
    const s = 0.12;
    if (tr.x < s && tr.vx < 0) return 'left';
    if (tr.x > 1 - s && tr.vx > 0) return 'right';
    return 'inside';
  }
}
