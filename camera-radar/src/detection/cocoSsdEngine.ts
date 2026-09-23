/**
 * TF.js COCO-SSD engine. Shared by the Web Worker and the main-thread fallback,
 * so it must not touch the DOM.
 */
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import wasmPlain from '@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm.wasm?url';
import wasmSimd from '@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd.wasm?url';
import wasmThreaded from '@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd.wasm?url';
import type { ModelBase } from '../settings/Settings.ts';
import type { DetectOutput } from './types.ts';

setWasmPaths({
  'tfjs-backend-wasm.wasm': wasmPlain,
  'tfjs-backend-wasm-simd.wasm': wasmSimd,
  'tfjs-backend-wasm-threaded-simd.wasm': wasmThreaded,
});

tf.env().set('PROD', true);

let model: cocoSsd.ObjectDetection | null = null;
let scratch: OffscreenCanvas | null = null;
let scratchCtx: OffscreenCanvasRenderingContext2D | null = null;

/**
 * Returns the WebGL renderer name if it is a software rasteriser. On such
 * machines (VMs, remote desktops, GPU blocklisted) WASM SIMD is far faster.
 */
export function softwareWebGL(): string | null {
  try {
    const canvas: OffscreenCanvas | HTMLCanvasElement =
      typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(1, 1) : document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return null;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer) ? renderer : null;
  } catch {
    return null;
  }
}

export let backendNote = '';

export async function initBackend(order: string[] = ['webgl', 'wasm', 'cpu']): Promise<string> {
  const soft = order.includes('webgl') ? softwareWebGL() : null;
  if (soft) {
    backendNote = `WebGL is software-rendered (${soft}); using WASM instead`;
    order = [...order.filter((b) => b !== 'webgl'), 'webgl'];
  }
  for (const name of order) {
    try {
      if (await tf.setBackend(name)) {
        await tf.ready();
        // Sanity check: run a trivial op so broken GPU contexts fail here, not mid-stream.
        const probe = tf.tidy(() => tf.add(tf.scalar(1), tf.scalar(1)));
        await probe.data();
        probe.dispose();
        return name;
      }
    } catch {
      // try the next backend
    }
  }
  throw new Error('No TensorFlow.js backend could be initialised (WebGL, WASM and CPU all failed).');
}

export async function loadModel(
  base: ModelBase,
  urls: { url: string; source: 'local' | 'remote' }[],
): Promise<{ source: 'local' | 'remote'; url: string }> {
  model?.dispose();
  model = null;
  const errors: string[] = [];
  for (const candidate of urls) {
    try {
      if (candidate.source === 'local') {
        // Avoid a noisy 404 parse error when the model was not fetched locally.
        const head = await fetch(candidate.url, { method: 'GET', cache: 'force-cache' });
        const type = head.headers.get('content-type') ?? '';
        if (!head.ok || type.includes('text/html')) throw new Error(`HTTP ${head.status}`);
      }
      const m = await cocoSsd.load({ base, modelUrl: candidate.url });
      model = m;
      return candidate;
    } catch (err) {
      errors.push(`${candidate.source}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  throw new Error(`Model download failed (${errors.join('; ')})`);
}

export async function detect(frame: ImageBitmap, minScore: number, maxBoxes: number): Promise<DetectOutput> {
  if (!model) throw new Error('Model not loaded');
  const w = frame.width;
  const h = frame.height;
  // Convert via a 2D canvas: works on every backend, including in workers.
  if (!scratch || scratch.width !== w || scratch.height !== h) {
    scratch = new OffscreenCanvas(w, h);
    scratchCtx = scratch.getContext('2d', { willReadFrequently: true });
  }
  if (!scratchCtx) throw new Error('OffscreenCanvas 2D context unavailable');
  scratchCtx.drawImage(frame, 0, 0);
  frame.close();
  const pixels = scratchCtx.getImageData(0, 0, w, h);

  const t0 = performance.now();
  const input = tf.browser.fromPixels(pixels);
  let result: cocoSsd.DetectedObject[];
  try {
    result = await model.detect(input as tf.Tensor3D, maxBoxes, minScore);
  } finally {
    input.dispose();
  }
  const inferenceMs = performance.now() - t0;
  const mem = tf.memory() as tf.MemoryInfo & { numBytesInGPU?: number };
  return {
    detections: result.map((d) => ({ label: d.class, score: d.score, bbox: d.bbox })),
    inferenceMs,
    tensors: mem.numTensors,
    bytes: mem.numBytesInGPU ?? mem.numBytes,
  };
}

export function dispose(): void {
  model?.dispose();
  model = null;
}

export function backendName(): string {
  return tf.getBackend() ?? 'none';
}
