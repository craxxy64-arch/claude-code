import { Emitter } from '../utils/emitter.ts';
import { FpsMeter } from '../utils/FpsMeter.ts';
import { errorMessage, logger } from '../utils/logger.ts';
import {
  RESOLUTION_PRESETS,
  type CameraDevice,
  type CameraInfo,
  type CameraState,
  type FrameSource,
  type Resolution,
} from './types.ts';

interface CameraEvents {
  state: CameraInfo;
  devices: CameraDevice[];
  frame: number;
}

type VideoWithRvfc = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: (now: number, meta: { mediaTime: number }) => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

/**
 * Owns the MediaStream lifecycle: permission, device enumeration and selection,
 * resolution changes, disconnect detection/recovery and real FPS measurement.
 */
export class CameraManager extends Emitter<CameraEvents> implements FrameSource {
  readonly kind = 'rgb' as const;
  readonly element: VideoWithRvfc;
  devices: CameraDevice[] = [];

  private stream: MediaStream | null = null;
  private track: MediaStreamTrack | null = null;
  private stateValue: CameraState = 'idle';
  /** 'file' when a local video file is played through the pipeline instead of a camera. */
  sourceKind: 'camera' | 'file' = 'camera';
  private fileUrl: string | null = null;
  private fileLabel = '';
  private messageValue = 'Camera off';
  private requested: { deviceId: string | null; width: number; height: number } | null = null;
  private fps = new FpsMeter(1000);
  private rvfcHandle = 0;
  private lastMediaTime = -1;
  private pollTimer = 0;
  private startToken = 0;
  private reconnectTimer = 0;

  constructor(video: HTMLVideoElement) {
    super();
    this.element = video as VideoWithRvfc;
    this.element.muted = true;
    this.element.playsInline = true;
    if (this.isSupported()) {
      navigator.mediaDevices.addEventListener?.('devicechange', () => void this.onDeviceChange());
    } else {
      this.setState('unsupported', this.unsupportedReason());
    }
  }

  // ---- FrameSource -------------------------------------------------------
  get width(): number {
    return this.element.videoWidth || 0;
  }
  get height(): number {
    return this.element.videoHeight || 0;
  }
  isLive(): boolean {
    return this.stateValue === 'live' && this.element.readyState >= 2 && this.width > 0;
  }

  get state(): CameraState {
    return this.stateValue;
  }

  isSupported(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && window.isSecureContext;
  }

  unsupportedReason(): string {
    if (!window.isSecureContext) return 'Camera access requires HTTPS or localhost.';
    return 'This browser does not support camera capture (getUserMedia).';
  }

  info(): CameraInfo {
    const settings = this.track?.getSettings?.() ?? {};
    return {
      state: this.stateValue,
      message: this.messageValue,
      deviceId: (settings.deviceId as string | undefined) ?? this.requested?.deviceId ?? null,
      label: this.sourceKind === 'file' ? this.fileLabel : (this.track?.label ?? ''),
      width: this.width,
      height: this.height,
      nominalFps: typeof settings.frameRate === 'number' ? settings.frameRate : null,
      measuredFps: this.fps.value(),
      trackState: this.track?.readyState ?? 'none',
      muted: this.track?.muted ?? false,
    };
  }

  measuredFps(): number {
    return this.fps.value();
  }

  async refreshDevices(): Promise<CameraDevice[]> {
    if (!this.isSupported()) return [];
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      let n = 0;
      this.devices = all
        .filter((d) => d.kind === 'videoinput')
        .map((d) => ({
          deviceId: d.deviceId,
          groupId: d.groupId,
          label: d.label || `Camera ${++n}${d.deviceId ? '' : ' (permission needed for name)'}`,
        }));
      this.emit('devices', this.devices);
    } catch (err) {
      logger.error('camera', err);
    }
    return this.devices;
  }

  /** Resolutions the active camera claims to support (or all presets if unknown). */
  supportedResolutions(): Resolution[] {
    const caps = this.track?.getCapabilities?.() as MediaTrackCapabilities | undefined;
    const maxW = caps?.width?.max;
    const maxH = caps?.height?.max;
    if (!maxW || !maxH) return RESOLUTION_PRESETS;
    const list = RESOLUTION_PRESETS.filter((r) => r.width <= maxW && r.height <= maxH);
    return list.length ? list : RESOLUTION_PRESETS.slice(0, 2);
  }

  async start(deviceId: string | null, width: number, height: number): Promise<boolean> {
    if (!this.isSupported()) {
      this.setState('unsupported', this.unsupportedReason());
      return false;
    }
    const token = ++this.startToken;
    this.releaseStream();
    this.requested = { deviceId, width, height };
    this.setState('requesting', 'Waiting for camera permission…');

    const video: MediaTrackConstraints = {
      width: { ideal: width },
      height: { ideal: height },
      frameRate: { ideal: 30 },
    };
    if (deviceId) video.deviceId = { exact: deviceId };

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video, audio: false });
    } catch (err) {
      const name = (err as DOMException)?.name;
      if (deviceId && (name === 'OverconstrainedError' || name === 'NotFoundError')) {
        // The previously selected device is gone: fall back to any camera.
        logger.warn('camera', `Selected camera unavailable (${name}); trying default camera`);
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: width }, height: { ideal: height } },
            audio: false,
          });
        } catch (err2) {
          if (token === this.startToken) this.handleStartError(err2);
          return false;
        }
      } else {
        if (token === this.startToken) this.handleStartError(err);
        return false;
      }
    }

    if (token !== this.startToken) {
      stream.getTracks().forEach((t) => t.stop());
      return false;
    }

    this.stream = stream;
    this.track = stream.getVideoTracks()[0] ?? null;
    if (!this.track) {
      this.setState('error', 'Camera stream has no video track.');
      return false;
    }
    this.track.addEventListener('ended', this.onTrackEnded);
    this.track.addEventListener('mute', this.onMute);
    this.track.addEventListener('unmute', this.onUnmute);

    this.element.srcObject = stream;
    try {
      await this.element.play();
    } catch (err) {
      logger.warn('camera', `video.play() rejected: ${errorMessage(err)}`);
    }
    await this.waitForDimensions();
    if (token !== this.startToken) return false;

    this.startFrameCounter();
    const s = this.track.getSettings();
    logger.info('camera', `Live: ${this.track.label || 'camera'} ${this.width}×${this.height} @ ${s.frameRate ?? '?'} fps`);
    this.setState('live', `${this.track.label || 'Camera'} live`);
    // Labels become available after permission is granted.
    void this.refreshDevices();
    return true;
  }

  /**
   * Plays a local video file through the same pipeline (useful where camera
   * access is blocked, or to analyse recorded footage). The file never leaves
   * the browser: it is read through an object URL.
   */
  async startFile(file: File): Promise<boolean> {
    const token = ++this.startToken;
    this.releaseStream();
    this.requested = null;
    this.sourceKind = 'file';
    this.fileLabel = file.name;
    this.fileUrl = URL.createObjectURL(file);
    const v = this.element;
    v.loop = true;
    v.src = this.fileUrl;
    this.setState('requesting', `Opening ${file.name}…`);
    try {
      await v.play();
    } catch (err) {
      if (token !== this.startToken) return false;
      this.releaseStream();
      this.setState('error', `Could not play "${file.name}" (${errorMessage(err)}). Try an MP4 or WebM file.`);
      logger.error('camera', err);
      return false;
    }
    await this.waitForDimensions();
    if (token !== this.startToken) return false;
    if (!this.width) {
      this.releaseStream();
      this.setState('error', `"${file.name}" has no video track this browser can decode.`);
      return false;
    }
    this.startFrameCounter();
    logger.info('camera', `Video file: ${file.name} ${this.width}×${this.height}`);
    this.setState('live', `Video file: ${file.name}`);
    return true;
  }

  stop(): void {
    this.startToken++;
    this.releaseStream();
    this.requested = null;
    this.setState('stopped', 'Camera stopped');
  }

  async setResolution(width: number, height: number): Promise<void> {
    if (!this.track || this.stateValue !== 'live') {
      if (this.requested) this.requested = { ...this.requested, width, height };
      return;
    }
    try {
      await this.track.applyConstraints({ width: { ideal: width }, height: { ideal: height } });
      await this.waitForDimensions(width, height);
      logger.info('camera', `Resolution now ${this.width}×${this.height}`);
      this.setState('live', this.messageValue);
    } catch (err) {
      logger.warn('camera', `applyConstraints failed (${errorMessage(err)}); restarting stream`);
      await this.start(this.requested?.deviceId ?? null, width, height);
    }
  }

  // ---- internals ---------------------------------------------------------
  private handleStartError(err: unknown): void {
    const name = (err as DOMException)?.name ?? '';
    switch (name) {
      case 'NotAllowedError':
      case 'SecurityError':
        this.setState('denied', 'Camera permission denied. Allow camera access in the browser address bar and press Start — or open a video file instead.');
        break;
      case 'NotFoundError':
      case 'OverconstrainedError':
        this.setState('not-found', 'No camera found. Connect a webcam or USB camera, then press Start.');
        break;
      case 'NotSupportedError':
        this.setState('error', 'The browser refused camera access in this context (no permission prompt available). Open the site in a regular browser window over HTTPS or localhost.');
        break;
      case 'NotReadableError':
      case 'AbortError':
        this.setState('busy', 'Camera is in use by another application or could not be opened.');
        break;
      default:
        this.setState('error', `Camera error: ${errorMessage(err)}`);
    }
    logger.error('camera', err);
  }

  private onTrackEnded = (): void => {
    if (this.stateValue !== 'live') return;
    logger.warn('camera', 'Camera track ended — device disconnected?');
    const wanted = this.requested;
    this.releaseStream();
    this.requested = wanted;
    this.setState('disconnected', 'Camera disconnected. Reconnect it — the stream resumes automatically.');
    this.scheduleReconnect(1500);
  };

  private onMute = (): void => {
    logger.warn('camera', 'Camera track muted (no frames from device)');
    this.emit('state', this.info());
  };
  private onUnmute = (): void => {
    logger.info('camera', 'Camera track unmuted');
    this.emit('state', this.info());
  };

  private async onDeviceChange(): Promise<void> {
    await this.refreshDevices();
    if (this.stateValue === 'disconnected') this.scheduleReconnect(400);
  }

  private scheduleReconnect(delay: number): void {
    window.clearTimeout(this.reconnectTimer);
    this.reconnectTimer = window.setTimeout(async () => {
      if (this.stateValue !== 'disconnected' || !this.requested) return;
      const { deviceId, width, height } = this.requested;
      const present = !deviceId || this.devices.some((d) => d.deviceId === deviceId);
      if (!present) return; // wait for the next devicechange event
      logger.info('camera', 'Attempting to reconnect camera…');
      const ok = await this.start(deviceId, width, height);
      if (!ok && (this.stateValue as CameraState) !== 'live') {
        this.setState('disconnected', 'Camera disconnected. Waiting for device…');
      }
    }, delay);
  }

  private releaseStream(): void {
    window.clearTimeout(this.reconnectTimer);
    this.stopFrameCounter();
    if (this.track) {
      this.track.removeEventListener('ended', this.onTrackEnded);
      this.track.removeEventListener('mute', this.onMute);
      this.track.removeEventListener('unmute', this.onUnmute);
    }
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.track = null;
    this.element.srcObject = null;
    if (this.fileUrl) {
      this.element.pause();
      this.element.removeAttribute('src');
      this.element.load();
      URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = null;
    }
    this.element.loop = false;
    this.sourceKind = 'camera';
    this.fps.reset();
  }

  private waitForDimensions(w?: number, h?: number): Promise<void> {
    return new Promise((resolve) => {
      const started = performance.now();
      const check = () => {
        const ready = this.element.videoWidth > 0 && (!w || !h || (this.element.videoWidth === w && this.element.videoHeight === h));
        if (ready || performance.now() - started > 3000) resolve();
        else requestAnimationFrame(check);
      };
      check();
    });
  }

  /** Counts genuinely new decoded frames (not render ticks). */
  private startFrameCounter(): void {
    this.stopFrameCounter();
    const v = this.element;
    if (v.requestVideoFrameCallback) {
      const cb = (now: number) => {
        this.fps.tick(now);
        this.emit('frame', now);
        this.rvfcHandle = v.requestVideoFrameCallback!(cb);
      };
      this.rvfcHandle = v.requestVideoFrameCallback(cb);
    } else {
      // Fallback: detect frame changes through currentTime at ~120 Hz.
      this.pollTimer = window.setInterval(() => {
        if (v.currentTime !== this.lastMediaTime) {
          this.lastMediaTime = v.currentTime;
          const now = performance.now();
          this.fps.tick(now);
          this.emit('frame', now);
        }
      }, 8);
    }
  }

  private stopFrameCounter(): void {
    if (this.rvfcHandle && this.element.cancelVideoFrameCallback) this.element.cancelVideoFrameCallback(this.rvfcHandle);
    this.rvfcHandle = 0;
    window.clearInterval(this.pollTimer);
    this.pollTimer = 0;
  }

  private setState(state: CameraState, message: string): void {
    this.stateValue = state;
    this.messageValue = message;
    this.emit('state', this.info());
  }
}
