import { Emitter } from '../utils/emitter.ts';
import { errorMessage, logger } from '../utils/logger.ts';

export interface Recording {
  id: number;
  url: string;
  blob: Blob;
  mime: string;
  durationSec: number;
  createdAt: number;
  overlays: boolean;
}

export type RecorderState = 'idle' | 'recording' | 'unsupported' | 'error';

const MIME_CANDIDATES = [
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
  'video/mp4;codecs=avc1',
  'video/mp4',
];

/**
 * Explicit, user-initiated recording via MediaRecorder. Nothing is recorded
 * unless the user presses Record, and recordings stay in memory (object URLs)
 * until the user downloads them or closes the page.
 */
export class Recorder extends Emitter<{ state: RecorderState; saved: Recording }> {
  state: RecorderState = typeof MediaRecorder === 'undefined' ? 'unsupported' : 'idle';
  startedAt = 0;
  overlays = false;
  readonly recordings: Recording[] = [];
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private seq = 0;
  private mime = '';
  /** Composite canvas the app draws into while recording with overlays. */
  readonly canvas: HTMLCanvasElement = document.createElement('canvas');

  static isSupported(): boolean {
    return typeof MediaRecorder !== 'undefined' && typeof HTMLCanvasElement.prototype.captureStream === 'function';
  }

  get elapsed(): number {
    return this.state === 'recording' ? (performance.now() - this.startedAt) / 1000 : 0;
  }

  start(source: { camera: MediaStream | null; withOverlays: boolean; width: number; height: number }): boolean {
    if (!Recorder.isSupported()) {
      this.setState('unsupported');
      logger.warn('recorder', 'MediaRecorder / canvas.captureStream not supported in this browser');
      return false;
    }
    if (this.state === 'recording') return true;
    let stream: MediaStream | null;
    if (source.withOverlays) {
      const scale = Math.min(1, 1280 / Math.max(1, source.width));
      this.canvas.width = Math.round(source.width * scale);
      this.canvas.height = Math.round(source.height * scale);
      stream = this.canvas.captureStream(30);
    } else {
      stream = source.camera;
    }
    if (!stream) {
      logger.warn('recorder', 'No video stream to record');
      return false;
    }
    this.mime = MIME_CANDIDATES.find((m) => MediaRecorder.isTypeSupported(m)) ?? '';
    try {
      this.recorder = new MediaRecorder(stream, this.mime ? { mimeType: this.mime, videoBitsPerSecond: 5_000_000 } : undefined);
    } catch (err) {
      logger.error('recorder', err);
      this.setState('error');
      return false;
    }
    this.chunks = [];
    this.overlays = source.withOverlays;
    this.recorder.ondataavailable = (e) => {
      if (e.data.size) this.chunks.push(e.data);
    };
    this.recorder.onstop = () => this.finalize();
    this.recorder.onerror = (e) => {
      logger.error('recorder', errorMessage((e as unknown as { error?: unknown }).error ?? 'MediaRecorder error'));
      this.setState('error');
    };
    this.recorder.start(1000);
    this.startedAt = performance.now();
    this.setState('recording');
    logger.info('recorder', `Recording started (${this.mime || 'default codec'}${source.withOverlays ? ', with overlays' : ''})`);
    return true;
  }

  stop(): void {
    if (this.recorder && this.recorder.state !== 'inactive') this.recorder.stop();
  }

  discard(id: number): void {
    const i = this.recordings.findIndex((r) => r.id === id);
    if (i >= 0) {
      URL.revokeObjectURL(this.recordings[i].url);
      this.recordings.splice(i, 1);
    }
  }

  private finalize(): void {
    const durationSec = (performance.now() - this.startedAt) / 1000;
    const type = this.recorder?.mimeType || this.mime || 'video/webm';
    const blob = new Blob(this.chunks, { type });
    this.chunks = [];
    this.recorder = null;
    this.setState('idle');
    if (!blob.size) {
      logger.warn('recorder', 'Recording produced no data');
      return;
    }
    const rec: Recording = {
      id: ++this.seq,
      url: URL.createObjectURL(blob),
      blob,
      mime: type,
      durationSec,
      createdAt: Date.now(),
      overlays: this.overlays,
    };
    this.recordings.unshift(rec);
    logger.info('recorder', `Recording ready: ${(blob.size / 1e6).toFixed(2)} MB, ${durationSec.toFixed(1)} s`);
    this.emit('saved', rec);
  }

  private setState(s: RecorderState): void {
    this.state = s;
    this.emit('state', s);
  }
}

export function recordingFilename(rec: Recording): string {
  const ext = rec.mime.includes('mp4') ? 'mp4' : 'webm';
  const d = new Date(rec.createdAt);
  const stamp = d.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return `camera-radar-${stamp}.${ext}`;
}
