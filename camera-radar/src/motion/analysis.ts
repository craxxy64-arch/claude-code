/**
 * Pure motion-analysis functions (no DOM) so they can be unit tested and
 * moved into a worker later without changes.
 */
import type { Box } from '../utils/math.ts';

export type MotionLevel = 'none' | 'small' | 'large';

export interface MotionBlob {
  box: Box;
  /** Fraction of frame area covered by active cells in this blob. */
  area: number;
  cells: number;
}

export interface MotionResult {
  t: number;
  /** Fraction of pixels whose brightness changed beyond threshold. */
  changed: number;
  level: MotionLevel;
  sudden: boolean;
  /** True when most of the frame changed at once (lighting change / camera bump). */
  global: boolean;
  blobs: MotionBlob[];
  /** Per-cell activity 0..1 (gridW × gridH). */
  cells: Float32Array;
  gridW: number;
  gridH: number;
  edges: { left: number; right: number; top: number; bottom: number };
}

/** Luma (BT.601) from RGBA into a reusable Uint8 buffer. */
export function toGray(rgba: Uint8ClampedArray, out: Uint8Array): void {
  for (let i = 0, j = 0; j < out.length; i += 4, j++) {
    out[j] = (rgba[i] * 77 + rgba[i + 1] * 150 + rgba[i + 2] * 29) >> 8;
  }
}

/** Pixel threshold for a sensitivity of 0..100. */
export const diffThreshold = (sensitivity: number): number => Math.round(48 - (Math.max(0, Math.min(100, sensitivity)) / 100) * 40);

/**
 * Frame differencing → per-cell activity → connected-component blobs.
 */
export function analyseDiff(
  prev: Uint8Array,
  cur: Uint8Array,
  width: number,
  height: number,
  cellSize: number,
  threshold: number,
): { changed: number; cells: Float32Array; gridW: number; gridH: number } {
  const gridW = Math.floor(width / cellSize);
  const gridH = Math.floor(height / cellSize);
  const cells = new Float32Array(gridW * gridH);
  let changed = 0;
  for (let y = 0; y < gridH * cellSize; y++) {
    const row = y * width;
    const cy = (y / cellSize) | 0;
    for (let x = 0; x < gridW * cellSize; x++) {
      const i = row + x;
      const d = cur[i] - prev[i];
      if (d > threshold || d < -threshold) {
        changed++;
        cells[cy * gridW + ((x / cellSize) | 0)] += 1;
      }
    }
  }
  const perCell = cellSize * cellSize;
  for (let i = 0; i < cells.length; i++) cells[i] /= perCell;
  return { changed: changed / (gridW * gridH * perCell), cells, gridW, gridH };
}

export function findBlobs(cells: Float32Array, gridW: number, gridH: number, activeLevel = 0.12, minCells = 2): MotionBlob[] {
  const seen = new Uint8Array(cells.length);
  const blobs: MotionBlob[] = [];
  const stack: number[] = [];
  for (let start = 0; start < cells.length; start++) {
    if (seen[start] || cells[start] < activeLevel) continue;
    let minX = gridW, minY = gridH, maxX = 0, maxY = 0, count = 0;
    stack.push(start);
    seen[start] = 1;
    while (stack.length) {
      const idx = stack.pop()!;
      const x = idx % gridW;
      const y = (idx / gridW) | 0;
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      // 8-connectivity with a one-cell bridge so fragmented silhouettes merge.
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= gridW || ny >= gridH) continue;
          const n = ny * gridW + nx;
          if (!seen[n] && cells[n] >= activeLevel) {
            seen[n] = 1;
            stack.push(n);
          }
        }
      }
    }
    if (count >= minCells) {
      blobs.push({
        box: { x: minX / gridW, y: minY / gridH, w: (maxX - minX + 1) / gridW, h: (maxY - minY + 1) / gridH },
        area: count / cells.length,
        cells: count,
      });
    }
  }
  return blobs.sort((a, b) => b.area - a.area);
}

export function edgeActivity(cells: Float32Array, gridW: number, gridH: number): MotionResult['edges'] {
  let left = 0, right = 0, top = 0, bottom = 0;
  for (let y = 0; y < gridH; y++) {
    left += cells[y * gridW];
    right += cells[y * gridW + gridW - 1];
  }
  for (let x = 0; x < gridW; x++) {
    top += cells[x];
    bottom += cells[(gridH - 1) * gridW + x];
  }
  return { left: left / gridH, right: right / gridH, top: top / gridW, bottom: bottom / gridW };
}

export function classifyLevel(changed: number, largestBlobArea: number): MotionLevel {
  if (changed < 0.002 && largestBlobArea === 0) return 'none';
  if (changed > 0.06 || largestBlobArea > 0.1) return 'large';
  return 'small';
}
