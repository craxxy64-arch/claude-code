import { Ema, FpsMeter } from '../utils/FpsMeter.ts';
import type { Track } from '../tracking/types.ts';

export interface AnalyticsSnapshot {
  renderFps: number;
  cameraFps: number;
  processingFps: number;
  motionFps: number;
  resolution: string;
  objectsDetected: number;
  peopleDetected: number;
  moving: number;
  stationary: number;
  activeTargets: number;
  totalTracked: number;
  avgConfidence: number | null;
  detectionLatency: number | null;
  inferenceMs: number | null;
  trackingMs: number | null;
  motionMs: number | null;
  skippedFrames: number;
  motionLevel: string;
  motionChanged: number;
}

/** Collects real, measured pipeline metrics. Nothing here is synthesised. */
export class Analytics {
  readonly render = new FpsMeter();
  readonly processing = new FpsMeter();
  readonly motion = new FpsMeter();
  readonly detectionLatency = new Ema(0.2);
  readonly inference = new Ema(0.2);
  readonly tracking = new Ema(0.2);
  readonly motionCost = new Ema(0.2);
  lastDetections: { label: string; score: number }[] = [];
  skippedFrames = 0;
  /** Rolling processing-fps history for the sparkline. */
  readonly fpsHistory: number[] = [];

  reset(): void {
    this.processing.reset();
    this.motion.reset();
    this.detectionLatency.reset();
    this.inference.reset();
    this.tracking.reset();
    this.motionCost.reset();
    this.lastDetections = [];
    this.skippedFrames = 0;
  }

  snapshot(args: {
    cameraFps: number;
    width: number;
    height: number;
    tracks: Track[];
    totalTracked: number;
    motionLevel: string;
    motionChanged: number;
  }): AnalyticsSnapshot {
    const det = this.lastDetections;
    const active = args.tracks.filter((t) => t.status === 'active');
    const avg = det.length ? det.reduce((s, d) => s + d.score, 0) / det.length : null;
    const snap: AnalyticsSnapshot = {
      renderFps: this.render.value(),
      cameraFps: args.cameraFps,
      processingFps: this.processing.value(),
      motionFps: this.motion.value(),
      resolution: args.width ? `${args.width}×${args.height}` : '—',
      objectsDetected: det.length,
      peopleDetected: det.filter((d) => d.label === 'person').length,
      moving: active.filter((t) => t.movement === 'moving').length,
      stationary: active.filter((t) => t.movement === 'stationary').length,
      activeTargets: args.tracks.length,
      totalTracked: args.totalTracked,
      avgConfidence: avg,
      detectionLatency: this.detectionLatency.value,
      inferenceMs: this.inference.value,
      trackingMs: this.tracking.value,
      motionMs: this.motionCost.value,
      skippedFrames: this.skippedFrames,
      motionLevel: args.motionLevel,
      motionChanged: args.motionChanged,
    };
    this.fpsHistory.push(snap.processingFps);
    if (this.fpsHistory.length > 60) this.fpsHistory.shift();
    return snap;
  }
}
