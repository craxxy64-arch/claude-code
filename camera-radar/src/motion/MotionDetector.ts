import { Emitter } from '../utils/emitter.ts';
import { Tracker } from '../tracking/Tracker.ts';
import type { TrackEvent } from '../tracking/types.ts';
import {
  analyseDiff,
  classifyLevel,
  diffThreshold,
  edgeActivity,
  findBlobs,
  toGray,
  type MotionResult,
} from './analysis.ts';
import { MotionHeatmap } from './MotionHeatmap.ts';

export type MotionEventType = 'sudden' | 'global' | 'enter' | 'exit' | 'large';

export interface MotionEvent {
  type: MotionEventType;
  t: number;
  detail: string;
}

const WORK_WIDTH = 160;
const CELL = 5;

/**
 * Pixel-level motion layer, independent of the object detector: it reacts to
 * anything that moves (including objects the model does not know).
 */
export class MotionDetector extends Emitter<{ event: MotionEvent }> {
  readonly heatmap = new MotionHeatmap();
  /** Tracks motion blobs so region entry / exit can be reported. */
  readonly regionTracker = new Tracker({ minHits: 3, maxLostSec: 0.6, reidSec: 0.8, crossClassPenalty: 0 });
  sensitivity = 55;
  last: MotionResult | null = null;
  lastMs = 0;

  private canvas: OffscreenCanvas | HTMLCanvasElement;
  private ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
  private prev: Uint8Array | null = null;
  private cur: Uint8Array | null = null;
  private width = WORK_WIDTH;
  private height = 90;
  private baseline = 0;
  private lastSuddenT = -Infinity;
  private lastGlobalT = -Infinity;
  private lastLevel: MotionResult['level'] = 'none';

  constructor() {
    super();
    if (typeof OffscreenCanvas !== 'undefined') {
      this.canvas = new OffscreenCanvas(this.width, this.height);
    } else {
      this.canvas = document.createElement('canvas');
    }
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('2D canvas unavailable for motion detection');
    this.ctx = ctx as CanvasRenderingContext2D;
    this.regionTracker.on('event', (e) => this.onRegionEvent(e));
  }

  reset(): void {
    this.prev = null;
    this.last = null;
    this.baseline = 0;
    this.regionTracker.reset();
  }

  /** Processes the current video frame; `mirror` keeps coordinates in view space. */
  process(video: HTMLVideoElement, t: number, mirror: boolean): MotionResult | null {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return null;
    const started = performance.now();
    const h = Math.max(CELL * 4, Math.round((WORK_WIDTH * vh) / vw / CELL) * CELL);
    if (h !== this.height) {
      this.height = h;
      this.canvas.width = this.width;
      this.canvas.height = h;
      this.prev = null;
    }
    const ctx = this.ctx;
    ctx.save();
    if (mirror) {
      ctx.translate(this.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, this.width, this.height);
    ctx.restore();
    const img = ctx.getImageData(0, 0, this.width, this.height);
    const n = this.width * this.height;
    if (!this.cur || this.cur.length !== n) this.cur = new Uint8Array(n);
    toGray(img.data, this.cur);

    if (!this.prev || this.prev.length !== n) {
      this.prev = this.cur;
      this.cur = new Uint8Array(n);
      return null;
    }

    const { changed, cells, gridW, gridH } = analyseDiff(this.prev, this.cur, this.width, this.height, CELL, diffThreshold(this.sensitivity));
    // Swap buffers.
    const tmp = this.prev;
    this.prev = this.cur;
    this.cur = tmp;

    const global = changed > 0.55;
    const blobs = global ? [] : findBlobs(cells, gridW, gridH, 0.1, 2);
    const level = classifyLevel(changed, blobs[0]?.area ?? 0);
    const sudden = !global && changed > Math.max(0.035, this.baseline * 5) && this.baseline < 0.05;
    this.baseline += 0.05 * (changed - this.baseline);

    const result: MotionResult = { t, changed, level, sudden, global, blobs, cells, gridW, gridH, edges: edgeActivity(cells, gridW, gridH) };
    this.last = result;
    if (!global) this.heatmap.add(cells, gridW, gridH, t);

    // Region tracking gives motion-layer enter / leave events.
    this.regionTracker.configure({ frameWidth: vw, frameHeight: vh, sensitivity: this.sensitivity });
    this.regionTracker.update(
      blobs.filter((b) => b.area > 0.004).slice(0, 8).map((b) => ({ label: 'motion', score: 1, box: b.box })),
      t,
    );

    if (global && t - this.lastGlobalT > 3) {
      this.lastGlobalT = t;
      this.emit('event', { type: 'global', t, detail: `whole-frame change (${Math.round(changed * 100)}%) — lighting change or camera moved` });
    } else if (sudden && t - this.lastSuddenT > 1.5) {
      this.lastSuddenT = t;
      this.emit('event', { type: 'sudden', t, detail: `sudden motion burst (${(changed * 100).toFixed(1)}% of frame)` });
    }
    if (level === 'large' && this.lastLevel !== 'large' && !global) {
      this.emit('event', { type: 'large', t, detail: `large movement (${(changed * 100).toFixed(1)}% of frame)` });
    }
    this.lastLevel = level;
    this.lastMs = performance.now() - started;
    return result;
  }

  private onRegionEvent(e: TrackEvent): void {
    if (e.type === 'enter' && e.track.enteredFrom !== 'inside') {
      this.emit('event', { type: 'enter', t: e.t, detail: `motion entering frame from ${e.track.enteredFrom.toUpperCase()}` });
    } else if (e.type === 'exit' && e.track.exitedVia && e.track.exitedVia !== 'inside') {
      this.emit('event', { type: 'exit', t: e.t, detail: `motion leaving frame via ${e.track.exitedVia.toUpperCase()}` });
    }
  }
}
