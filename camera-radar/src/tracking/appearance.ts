/**
 * Appearance signatures for re-identification.
 *
 * Position alone can't tell two objects of the same class apart when they
 * cross or overlap, so the tracker also remembers what each target looks
 * like: a coarse colour histogram (hue bins for coloured pixels, plus
 * lightness bins for greys) of the central part of its box. Comparing
 * signatures lets the tracker keep the right ID on the right object.
 *
 * Pure functions on raw RGBA arrays — no DOM, so fully unit-testable.
 */

export const HUE_BINS = 12;
export const GREY_BINS = 4;
export const SIGNATURE_SIZE = HUE_BINS + GREY_BINS;

/** Pixels less saturated than this are treated as grey (hue is meaningless). */
const MIN_SATURATION = 0.18;
/** Very dark pixels carry no reliable hue either. */
const MIN_VALUE = 0.12;

/**
 * Builds a normalised colour signature from an RGBA pixel block.
 * Returns null when there are too few pixels to be meaningful.
 */
export function computeSignature(rgba: Uint8ClampedArray, width: number, height: number): Float32Array | null {
  const n = width * height;
  if (n < 16 || rgba.length < n * 4) return null;
  const sig = new Float32Array(SIGNATURE_SIZE);
  for (let i = 0; i < n * 4; i += 4) {
    const r = rgba[i] / 255;
    const g = rgba[i + 1] / 255;
    const b = rgba[i + 2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const sat = max > 0 ? delta / max : 0;
    if (sat < MIN_SATURATION || max < MIN_VALUE) {
      sig[HUE_BINS + Math.min(GREY_BINS - 1, Math.floor(max * GREY_BINS))] += 1;
      continue;
    }
    let hue: number;
    if (max === r) hue = ((g - b) / delta + 6) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    // Weight coloured pixels by saturation so vivid colours dominate the signature.
    sig[Math.min(HUE_BINS - 1, Math.floor((hue / 6) * HUE_BINS))] += 0.5 + sat;
  }
  let total = 0;
  for (let i = 0; i < SIGNATURE_SIZE; i++) total += sig[i];
  if (total <= 0) return null;
  for (let i = 0; i < SIGNATURE_SIZE; i++) sig[i] /= total;
  return sig;
}

/**
 * Histogram intersection: 1 = identical colour distribution, 0 = disjoint.
 * Adjacent hue bins get partial credit so small lighting shifts don't
 * look like a different object.
 */
export function similarity(a: Float32Array, b: Float32Array): number {
  let s = 0;
  for (let i = 0; i < HUE_BINS; i++) {
    const prev = (i + HUE_BINS - 1) % HUE_BINS;
    const next = (i + 1) % HUE_BINS;
    const bSpread = 0.7 * b[i] + 0.15 * b[prev] + 0.15 * b[next];
    s += Math.min(a[i], Math.max(b[i], bSpread));
  }
  for (let i = HUE_BINS; i < SIGNATURE_SIZE; i++) s += Math.min(a[i], b[i]);
  return Math.max(0, Math.min(1, s));
}

/** Exponential blend used to keep a track's signature current as lighting changes. */
export function blendSignature(current: Float32Array, next: Float32Array, rate: number): Float32Array {
  const out = new Float32Array(SIGNATURE_SIZE);
  let total = 0;
  for (let i = 0; i < SIGNATURE_SIZE; i++) {
    out[i] = current[i] + rate * (next[i] - current[i]);
    total += out[i];
  }
  if (total > 0) for (let i = 0; i < SIGNATURE_SIZE; i++) out[i] /= total;
  return out;
}
