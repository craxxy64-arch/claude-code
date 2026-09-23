import type { Box } from '../utils/math.ts';

export type TrackStatus = 'tentative' | 'active' | 'lost';
export type MovementState = 'moving' | 'stationary';
export type Edge = 'left' | 'right' | 'top' | 'bottom';

export interface TrackPoint {
  /** Seconds (performance clock). */
  t: number;
  /** Filtered centre, normalised view space. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Speed at this sample in source pixels per second. */
  speed: number;
}

export interface Track {
  id: number;
  label: string;
  status: TrackStatus;
  /** Filtered centre & size (normalised). */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Filtered velocity, normalised units per second. */
  vx: number;
  vy: number;
  /** Speed in source pixels / second (image plane, not real-world). */
  speedPx: number;
  movement: MovementState;
  /** Latest raw detector score and running average. */
  score: number;
  avgScore: number;
  firstSeen: number;
  lastSeen: number;
  lastUpdate: number;
  hits: number;
  misses: number;
  /** Position at the previous accepted measurement. */
  prev: { x: number; y: number; t: number } | null;
  history: TrackPoint[];
  enteredFrom: Edge | 'inside';
  exitedVia: Edge | 'inside' | null;
  suddenAt: number;
  /** Last raw (unfiltered) measurement, used to spot abrupt jumps. */
  lastMeas: { x: number; y: number; t: number } | null;
  suddenStreak: number;
  /** Slow average of raw measured speed (frame widths / s) — the "normal" pace. */
  paceBaseline: number;
  /** When the target last became stationary (seconds), or null while moving. */
  stillSince: number | null;
  /** Size where a parked target settled; a detection far from it isn't the same object. */
  anchor: { w: number; h: number } | null;
  /** Running colour signature of this target, used to keep IDs apart when targets cross. */
  appearance: Float32Array | null;
  appearanceSamples: number;
  /** Extension slot (depth, pose keypoints, embeddings…). */
  meta: Record<string, unknown>;
}

export interface MeasuredObject {
  label: string;
  score: number;
  box: Box;
  /** Colour signature sampled from the frame (see tracking/appearance.ts), when available. */
  appearance?: Float32Array | null;
}

export type TrackEventType = 'enter' | 'exit' | 'reacquired' | 'sudden' | 'start-moving' | 'stopped';

export interface TrackEvent {
  type: TrackEventType;
  t: number;
  track: Track;
  detail: string;
}
