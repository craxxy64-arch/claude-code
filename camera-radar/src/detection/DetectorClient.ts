import { Emitter } from '../utils/emitter.ts';
import { errorMessage, logger } from '../utils/logger.ts';
import type { ModelBase } from '../settings/Settings.ts';
import { modelUrls, type DetectOutput, type DetectorInfo, type ObjectDetector } from './types.ts';
import type { WorkerRequest, WorkerResponse } from './detector.worker.ts';

type Engine = typeof import('./cocoSsdEngine.ts');

/**
 * Runs COCO-SSD inside a Web Worker so inference never blocks rendering.
 * If workers (or OffscreenCanvas) are unavailable it transparently falls back
 * to running the same engine on the main thread.
 */
export class DetectorClient extends Emitter<{ info: DetectorInfo }> implements ObjectDetector {
  info: DetectorInfo = {
    status: 'idle',
    message: 'Model not loaded',
    model: 'lite_mobilenet_v2',
    backend: 'none',
    runtime: 'none',
    source: 'none',
    loadMs: 0,
    tensors: null,
    gpuBytes: null,
  };

  private worker: Worker | null = null;
  private engine: Engine | null = null;
  private seq = 0;
  private pending = new Map<number, { resolve: (o: DetectOutput) => void; reject: (e: Error) => void }>();
  private loadWaiter: { resolve: () => void; reject: (e: Error) => void } | null = null;
  private workerFailed = false;

  async load(model: ModelBase): Promise<void> {
    this.update({ status: 'loading', message: `Loading ${model}…`, model });
    const urls = modelUrls(model, document.baseURI);
    const canUseWorker = typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined' && !this.workerFailed;

    if (canUseWorker) {
      try {
        await this.loadInWorker(model, urls);
        return;
      } catch (err) {
        const msg = errorMessage(err);
        // A download failure will fail on the main thread too; only fall back for runtime issues.
        if (/download failed/i.test(msg)) {
          this.update({ status: 'error', message: msg });
          logger.error('detector', msg);
          throw err;
        }
        logger.warn('detector', `Worker detector unavailable (${msg}); falling back to main thread`);
        this.workerFailed = true;
        this.terminateWorker();
      }
    }
    await this.loadOnMainThread(model, urls);
  }

  async detect(frame: ImageBitmap, minScore: number, maxBoxes: number): Promise<DetectOutput> {
    if (this.info.status !== 'ready') {
      frame.close();
      throw new Error('Detector not ready');
    }
    let out: DetectOutput;
    if (this.worker) {
      const id = ++this.seq;
      out = await new Promise<DetectOutput>((resolve, reject) => {
        this.pending.set(id, { resolve, reject });
        const msg: WorkerRequest = { type: 'detect', id, frame, minScore, maxBoxes };
        this.worker!.postMessage(msg, [frame]);
      });
    } else if (this.engine) {
      out = await this.engine.detect(frame, minScore, maxBoxes);
    } else {
      frame.close();
      throw new Error('No detector runtime');
    }
    this.info.tensors = out.tensors;
    this.info.gpuBytes = out.bytes;
    return out;
  }

  disable(): void {
    this.update({ status: 'disabled', message: 'Object detection disabled in settings' });
  }

  dispose(): void {
    this.terminateWorker();
    this.engine?.dispose();
    this.engine = null;
    this.update({ status: 'idle', message: 'Model unloaded', runtime: 'none', backend: 'none' });
  }

  // ---- worker runtime ----------------------------------------------------
  private loadInWorker(model: ModelBase, urls: ReturnType<typeof modelUrls>): Promise<void> {
    if (!this.worker) {
      this.worker = new Worker(new URL('./detector.worker.ts', import.meta.url), { type: 'module', name: 'detector' });
      this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => this.onWorkerMessage(e.data);
      this.worker.onerror = (e) => {
        e.preventDefault();
        const err = new Error(e.message || 'Worker script error');
        logger.error('detector', err);
        this.failAll(err);
      };
    }
    return new Promise<void>((resolve, reject) => {
      this.loadWaiter = { resolve, reject };
      const msg: WorkerRequest = { type: 'load', model, urls };
      this.worker!.postMessage(msg);
    });
  }

  private onWorkerMessage(msg: WorkerResponse): void {
    if (msg.type === 'loaded') {
      this.update({
        status: 'ready',
        message: 'Model ready',
        backend: msg.backend,
        runtime: 'worker',
        source: msg.source,
        loadMs: msg.loadMs,
      });
      if (msg.note) logger.warn('detector', msg.note);
      logger.info('detector', `Model ready in worker (${msg.backend}, ${msg.source}, ${Math.round(msg.loadMs)} ms)`);
      this.loadWaiter?.resolve();
      this.loadWaiter = null;
    } else if (msg.type === 'result') {
      const p = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      p?.resolve(msg.output);
    } else if (msg.type === 'error') {
      if (msg.phase === 'load') {
        this.loadWaiter?.reject(new Error(msg.message));
        this.loadWaiter = null;
      } else if (msg.id != null) {
        const p = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        p?.reject(new Error(msg.message));
      }
    }
  }

  private failAll(err: Error): void {
    this.loadWaiter?.reject(err);
    this.loadWaiter = null;
    for (const p of this.pending.values()) p.reject(err);
    this.pending.clear();
  }

  private terminateWorker(): void {
    this.failAll(new Error('Detector worker terminated'));
    this.worker?.terminate();
    this.worker = null;
  }

  // ---- main-thread runtime ----------------------------------------------
  private async loadOnMainThread(model: ModelBase, urls: ReturnType<typeof modelUrls>): Promise<void> {
    const t0 = performance.now();
    try {
      this.engine ??= await import('./cocoSsdEngine.ts');
      const backend = await this.engine.initBackend();
      if (this.engine.backendNote) logger.warn('detector', this.engine.backendNote);
      const { source } = await this.engine.loadModel(model, urls);
      const loadMs = performance.now() - t0;
      this.update({ status: 'ready', message: 'Model ready (main thread)', backend, runtime: 'main-thread', source, loadMs });
      logger.info('detector', `Model ready on main thread (${backend}, ${source}, ${Math.round(loadMs)} ms)`);
    } catch (err) {
      const message = errorMessage(err);
      this.update({ status: 'error', message: `Model failed to load: ${message}`, runtime: 'none' });
      logger.error('detector', err);
      throw err;
    }
  }

  private update(patch: Partial<DetectorInfo>): void {
    this.info = { ...this.info, ...patch };
    this.emit('info', this.info);
  }
}
