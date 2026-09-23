/**
 * What the radar can infer about each target from its recent history.
 * Pure functions, unit-tested. Everything is in *estimated* metres — it
 * inherits the uncertainty of the single-camera range estimate — and the UI
 * labels it that way.
 */
import type { RadarPoint } from './projection.ts';

export interface TrailSample {
  t: number;
  X: number;
  Y: number;
}

export type Trend = 'closing' | 'away' | 'crossing' | 'steady';

export interface Motion {
  /** Ground-plane velocity, m/s (estimated). */
  vX: number;
  vY: number;
  speed: number;
  /** Rate of change of distance to the camera, m/s. Negative = getting closer. */
  rangeRate: number;
  trend: Trend;
  /** Seconds until the target would reach the camera at this rate (closing only). */
  timeToReach: number | null;
}

/** Below this the change is indistinguishable from range-estimate jitter. */
const TREND_MIN = 0.15; // m/s
const CROSSING_MIN = 0.25; // m/s

/** Least-squares slope of v over t. */
function slope(ts: number[], vs: number[]): number {
  const n = ts.length;
  let mt = 0;
  let mv = 0;
  for (let i = 0; i < n; i++) {
    mt += ts[i];
    mv += vs[i];
  }
  mt /= n;
  mv /= n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (ts[i] - mt) * (vs[i] - mv);
    den += (ts[i] - mt) ** 2;
  }
  return den > 1e-9 ? num / den : 0;
}

/**
 * Fits the target's recent motion. Returns null when there isn't enough
 * history to say anything reliable (fewer than 4 samples or under 0.4 s).
 */
export function fitMotion(trail: TrailSample[], now: number, windowSec = 1.2): Motion | null {
  const recent = trail.filter((p) => now - p.t <= windowSec);
  if (recent.length < 4 || recent.at(-1)!.t - recent[0].t < 0.4) return null;
  const ts = recent.map((p) => p.t);
  const vX = slope(ts, recent.map((p) => p.X));
  const vY = slope(ts, recent.map((p) => p.Y));
  const rangeRate = slope(ts, recent.map((p) => Math.hypot(p.X, p.Y)));
  const speed = Math.hypot(vX, vY);
  let trend: Trend = 'steady';
  if (rangeRate < -TREND_MIN) trend = 'closing';
  else if (rangeRate > TREND_MIN) trend = 'away';
  else if (speed > CROSSING_MIN) trend = 'crossing';
  const last = recent.at(-1)!;
  const range = Math.hypot(last.X, last.Y);
  const timeToReach = trend === 'closing' ? range / -rangeRate : null;
  return { vX, vY, speed, rangeRate, trend, timeToReach };
}

/** Fractional ± on the range, by how the range was obtained. */
export function rangeUncertainty(point: RadarPoint): number {
  if (point.measured) return 0.05;
  return point.quality === 'rough' ? 0.45 : 0.25;
}

export const TREND_LABEL: Record<Trend, string> = {
  closing: 'CLOSING',
  away: 'MOVING AWAY',
  crossing: 'CROSSING',
  steady: 'STEADY',
};

export const TREND_ARROW: Record<Trend, string> = {
  closing: '▼',
  away: '▲',
  crossing: '◆',
  steady: '·',
};
