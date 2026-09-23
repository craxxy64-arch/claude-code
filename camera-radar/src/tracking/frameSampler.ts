import { computeSignature } from './appearance.ts';
import type { Box } from '../utils/math.ts';

const SAMPLE_WIDTH = 192;

/**
 * Keeps a small copy of the exact frame handed to the detector, so each
 * detection's colour signature is taken from the same moment as its box
 * (objects move during inference, so a later frame would be misaligned).
 */
export class FrameSampler {
  private canvas: OffscreenCanvas | HTMLCanvasElement;
  private ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;
  private pixels: ImageData | null = null;

  constructor() {
    this.canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(SAMPLE_WIDTH, 144) : document.createElement('canvas');
    const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('2D canvas unavailable for appearance sampling');
    this.ctx = ctx as CanvasRenderingContext2D;
  }

  /** Snapshot a frame (call before it is transferred to the detector worker). */
  capture(frame: CanvasImageSource, width: number, height: number): void {
    const h = Math.max(8, Math.round((SAMPLE_WIDTH * height) / Math.max(1, width)));
    if (this.canvas.width !== SAMPLE_WIDTH || this.canvas.height !== h) {
      this.canvas.width = SAMPLE_WIDTH;
      this.canvas.height = h;
    }
    this.ctx.drawImage(frame, 0, 0, SAMPLE_WIDTH, h);
    this.pixels = this.ctx.getImageData(0, 0, SAMPLE_WIDTH, h);
  }

  /**
   * Colour signature of the central part of a box (normalised coordinates in
   * the captured frame, i.e. before any mirroring). The centre avoids most of
   * the background that surrounds an object inside its bounding box.
   */
  signature(box: Box): Float32Array | null {
    const img = this.pixels;
    if (!img) return null;
    const W = img.width;
    const H = img.height;
    const x0 = Math.max(0, Math.floor((box.x + box.w * 0.2) * W));
    const x1 = Math.min(W, Math.ceil((box.x + box.w * 0.8) * W));
    const y0 = Math.max(0, Math.floor((box.y + box.h * 0.15) * H));
    const y1 = Math.min(H, Math.ceil((box.y + box.h * 0.85) * H));
    const w = x1 - x0;
    const h = y1 - y0;
    if (w < 4 || h < 4) return null;
    const crop = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      const src = ((y0 + y) * W + x0) * 4;
      crop.set(img.data.subarray(src, src + w * 4), y * w * 4);
    }
    return computeSignature(crop, w, h);
  }
}
