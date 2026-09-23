/// <reference lib="webworker" />
import { backendName, backendNote, detect, dispose, initBackend, loadModel } from './cocoSsdEngine.ts';
import type { ModelBase } from '../settings/Settings.ts';

export type WorkerRequest =
  | { type: 'load'; model: ModelBase; urls: { url: string; source: 'local' | 'remote' }[] }
  | { type: 'detect'; id: number; frame: ImageBitmap; minScore: number; maxBoxes: number }
  | { type: 'dispose' };

export type WorkerResponse =
  | { type: 'loaded'; backend: string; source: 'local' | 'remote'; loadMs: number; note: string }
  | { type: 'result'; id: number; output: import('./types.ts').DetectOutput }
  | { type: 'error'; id?: number; phase: 'load' | 'detect'; message: string };

const ctx = self as unknown as DedicatedWorkerGlobalScope;
let backendReady = false;

ctx.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const msg = event.data;
  if (msg.type === 'load') {
    const t0 = performance.now();
    try {
      if (!backendReady) {
        await initBackend();
        backendReady = true;
      }
      const { source } = await loadModel(msg.model, msg.urls);
      post({ type: 'loaded', backend: backendName(), source, loadMs: performance.now() - t0, note: backendNote });
    } catch (err) {
      post({ type: 'error', phase: 'load', message: err instanceof Error ? err.message : String(err) });
    }
  } else if (msg.type === 'detect') {
    try {
      const output = await detect(msg.frame, msg.minScore, msg.maxBoxes);
      post({ type: 'result', id: msg.id, output });
    } catch (err) {
      post({ type: 'error', id: msg.id, phase: 'detect', message: err instanceof Error ? err.message : String(err) });
    }
  } else if (msg.type === 'dispose') {
    dispose();
  }
};

function post(msg: WorkerResponse): void {
  ctx.postMessage(msg);
}
