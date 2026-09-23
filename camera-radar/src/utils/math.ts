export interface Box {
  /** Left edge, normalised 0..1 of frame width. */
  x: number;
  /** Top edge, normalised 0..1 of frame height. */
  y: number;
  w: number;
  h: number;
}

export const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export function iou(a: Box, b: Box): number {
  const x1 = Math.max(a.x, b.x);
  const y1 = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const union = a.w * a.h + b.w * b.h - inter;
  return union > 0 ? inter / union : 0;
}

export function mirrorBox(b: Box): Box {
  return { x: 1 - b.x - b.w, y: b.y, w: b.w, h: b.h };
}

export type Compass = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

const COMPASS: Compass[] = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
const ARROWS: Record<Compass, string> = { N: '↑', NE: '↗', E: '→', SE: '↘', S: '↓', SW: '↙', W: '←', NW: '↖' };
const WORDS: Record<Compass, string> = {
  N: 'UP',
  NE: 'UP-RIGHT',
  E: 'RIGHT',
  SE: 'DOWN-RIGHT',
  S: 'DOWN',
  SW: 'DOWN-LEFT',
  W: 'LEFT',
  NW: 'UP-LEFT',
};
const NAMES: Record<Compass, string> = {
  N: 'north',
  NE: 'northeast',
  E: 'east',
  SE: 'southeast',
  S: 'south',
  SW: 'southwest',
  W: 'west',
  NW: 'northwest',
};

/**
 * Converts an image-space velocity (y grows downward) into an 8-point compass
 * heading where "north" is the top of the camera frame.
 */
export function compassFromVelocity(vx: number, vy: number): Compass {
  const angle = Math.atan2(-vy, vx); // screen up = +y in math space
  const idx = Math.round(angle / (Math.PI / 4));
  return COMPASS[(idx + 8) % 8];
}

export const compassArrow = (c: Compass): string => ARROWS[c];
export const compassWord = (c: Compass): string => WORDS[c];
export const compassName = (c: Compass): string => NAMES[c];

/** Heading in degrees, 0 = up/north, clockwise. */
export function headingDegrees(vx: number, vy: number): number {
  const deg = (Math.atan2(vx, -vy) * 180) / Math.PI;
  return (deg + 360) % 360;
}
