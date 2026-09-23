import { Analytics } from './analytics/Analytics.ts';
import { CameraManager } from './camera/CameraManager.ts';
import type { CameraInfo } from './camera/types.ts';
import { DetectorClient } from './detection/DetectorClient.ts';
import type { Detection } from './detection/types.ts';
import { extensions } from './extensions/capabilities.ts';
import { MotionDetector, type MotionEvent } from './motion/MotionDetector.ts';
import { RadarRenderer } from './radar/RadarRenderer.ts';
import { Recorder, recordingFilename, type Recording } from './recording/Recorder.ts';
import { canvasToBlob, captureFrame, downloadBlob, timestampName } from './recording/snapshot.ts';
import { SettingsStore, type LayoutMode, type Settings } from './settings/Settings.ts';
import { Tracker } from './tracking/Tracker.ts';
import type { Track, TrackEvent } from './tracking/types.ts';
import { AnalyticsPanel, drawSparkline, type LoggedEvent } from './ui/AnalyticsPanel.ts';
import { DebugPanel } from './ui/DebugPanel.ts';
import { $, escapeHtml, fitCanvas, setChip } from './ui/dom.ts';
import { OverlayRenderer, type OverlayFrame, type OverlayOptions, type Rect } from './ui/OverlayRenderer.ts';
import { SettingsPanel } from './ui/SettingsPanel.ts';
import { TargetPanel } from './ui/TargetPanel.ts';
import { toast } from './ui/toasts.ts';
import type { VoiceActions } from './voice/actions.ts';
import { VoiceAssistant, type VoiceState } from './voice/VoiceAssistant.ts';
import type { VoiceStatusSnapshot } from './voice/types.ts';
import { colorFor } from './detection/categories.ts';
import { formatBytes, formatClock, formatDuration, formatId } from './utils/format.ts';
import { errorMessage, logger } from './utils/logger.ts';
import { compassArrow, compassFromVelocity, mirrorBox } from './utils/math.ts';

const INPUT_SIZES = [256, 320, 416, 480, 640];
const UI_INTERVAL_MS = 250;
const MOTION_INTERVAL_MS = 66;

interface InterpolatedTrack {
  track: Track;
  x: number;
  y: number;
}

/**
 * Orchestrates the pipeline:
 *   camera → (worker) detector → tracker → overlay / radar / analytics
 *   camera → motion detector → heatmap / motion events
 * Rendering runs on requestAnimationFrame; detection and motion analysis are
 * throttled independently so the UI stays responsive.
 */
export class App {
  readonly settings = new SettingsStore();
  readonly camera: CameraManager;
  readonly detector = new DetectorClient();
  readonly tracker = new Tracker();
  readonly motion = new MotionDetector();
  readonly analytics = new Analytics();
  readonly recorder = new Recorder();
  readonly overlay = new OverlayRenderer();
  readonly radar: RadarRenderer;
  readonly voice: VoiceAssistant;

  private overlayCanvas = $<HTMLCanvasElement>('overlay');
  private overlayCtx = this.overlayCanvas.getContext('2d')!;
  private viewport = $('viewport');
  private cameraPanel = $('cameraPanel');
  private radarPanel = $('radarPanel');
  private radarWrap = $('radarWrap');
  private analyticsView: AnalyticsPanel;
  private targetPanel: TargetPanel;
  private settingsPanel: SettingsPanel;
  private debugPanel = new DebugPanel($('debugBody'));

  private selectedId: number | null = null;
  private detBusy = false;
  private lastDetStart = 0;
  private lastMotion = 0;
  private lastUi = 0;
  private detErrors = 0;
  private detRuns = 0;
  private cameraFrames = 0;
  private lowFpsSince = 0;
  private lastPerfStep = 0;
  private perfWarn = { latency: false, fps: false };
  private events: LoggedEvent[] = [];
  private targetEvents = new Map<number, LoggedEvent[]>();
  private lastDetections: Detection[] = [];
  private lastInputSize = { w: 0, h: 0 };
  private resizeFallback: OffscreenCanvas | HTMLCanvasElement | null = null;
  private bitmapResizeSupported = true;
  private snapshot: { raw: HTMLCanvasElement; withOverlay: HTMLCanvasElement } | null = null;
  /** Converts performance-clock seconds to wall-clock ms for display. */
  private readonly epochOffset = Date.now() - performance.now();
  private eventsDirty = true;
  private pseudoFullscreen = false;

  constructor() {
    this.camera = new CameraManager($<HTMLVideoElement>('video'));
    this.radar = new RadarRenderer($<HTMLCanvasElement>('radar'));
    this.analyticsView = new AnalyticsPanel($('metrics'), $('targetList'), $('eventLog'), $('targetCount'), (id) => this.select(id), $('heroStats'));
    this.targetPanel = new TargetPanel($('targetDrawer'), $('tdTitle'), $('tdBody'), (t) => this.exportTrack(t));
    this.settingsPanel = new SettingsPanel($('settingsBody'), this.settings, () => {
      this.settings.reset();
      toast('Settings reset to defaults');
    });
    this.voice = new VoiceAssistant(this.voiceActions());
  }

  /**
   * Everything Xcv is allowed to do — each entry calls a control this app
   * already exposes elsewhere in the UI. Nothing here reaches outside this
   * browser tab: a voice assistant running on a web page cannot control the
   * operating system or other applications, and Xcv does not claim to.
   */
  private voiceActions(): VoiceActions {
    return {
      startCamera: () => void this.startCamera(),
      stopCamera: () => this.camera.stop(),
      openVideoPicker: () => $<HTMLInputElement>('fileInput').click(),
      setMode: (mode) => this.settings.set({ layoutMode: mode }),
      setMirror: (on) => this.settings.set({ mirror: on }),
      snapshot: () => this.takeSnapshot(),
      setRecording: (on) => {
        if ((this.recorder.state === 'recording') !== on) this.toggleRecording();
      },
      setHeatmap: (on) => {
        if (on && !this.settings.get('motionEnabled')) this.settings.set({ motionEnabled: true });
        this.settings.set({ showHeatmap: on });
      },
      resetHeatmap: () => this.motion.heatmap.reset(),
      setSettingsOpen: (open) => this.setSettingsDrawerOpen(open),
      setDebugOpen: (open) => this.settings.set({ showDebug: open }),
      setFullscreenRadar: (on) => void (on ? this.toggleRadarFullscreen() : this.exitRadarFullscreen()),
      selectTarget: (id) => {
        this.select(id);
        return this.tracker.getTrack(id)?.label ?? null;
      },
      deselectTarget: () => this.select(null),
      setConfidence: (value) => this.settings.set({ confidenceThreshold: Math.round(value * 20) / 20 }),
      getStatus: () => this.voiceStatus(),
    };
  }

  private voiceStatus(): VoiceStatusSnapshot {
    const cam = this.camera.info();
    const tracks = this.tracker.getTracks();
    return {
      cameraOn: cam.state === 'live',
      cameraLabel: cam.label,
      targetsTracked: tracks.length,
      moving: tracks.filter((t) => t.movement === 'moving' && t.status === 'active').length,
      people: tracks.filter((t) => t.label === 'person').length,
      modelStatus: this.detector.info.status,
      processingFps: this.analytics.processing.value(),
      motionLevel: this.motion.last?.level ?? 'none',
      recording: this.recorder.state === 'recording',
    };
  }

  init(): void {
    this.applyAllSettings();
    this.bindUi();
    this.bindPipeline();
    this.onVoiceState(this.voice.state); // sync mic button before any voice.on('state') fires
    this.populateResolutions();

    if (!this.camera.isSupported()) {
      this.showUnsupported(this.camera.unsupportedReason());
    } else {
      void this.camera.refreshDevices();
    }
    if (this.settings.get('detectionEnabled')) void this.loadModel();
    else this.detector.disable();

    logger.info('app', `Camera Radar ready. Extensions — ${extensions.summary()}`);
    requestAnimationFrame(this.loop);
    window.setInterval(() => ($('clock').textContent = formatClock(Date.now())), 1000);
    $('clock').textContent = formatClock(Date.now());
  }

  // ======================================================================
  // Pipeline wiring
  // ======================================================================
  private bindPipeline(): void {
    this.camera.on('state', (info) => this.onCameraState(info));
    this.camera.on('devices', () => this.populateCameras());
    this.camera.on('frame', () => this.cameraFrames++);

    this.detector.on('info', (info) => {
      const tone = info.status === 'ready' ? 'ok' : info.status === 'loading' ? 'busy' : info.status === 'error' ? 'alert' : 'idle';
      const text =
        info.status === 'ready'
          ? `${info.backend.toUpperCase()}`
          : info.status === 'loading'
            ? 'LOADING'
            : info.status === 'error'
              ? 'OFFLINE — RETRY'
              : info.status === 'disabled'
                ? 'OFF'
                : 'IDLE';
      setChip('chipModel', tone, text, info.status === 'error' ? `${info.message}\nClick to retry.` : info.message);
      $('chipModel').style.cursor = info.status === 'error' ? 'pointer' : '';
      this.updateEmptyState();
    });

    this.tracker.on('event', (e) => this.onTrackEvent(e));
    this.motion.on('event', (e) => this.onMotionEvent(e));

    this.recorder.on('state', (s) => this.onRecorderState(s));
    this.recorder.on('saved', (rec) => this.onRecordingSaved(rec));

    this.settings.on('change', ({ keys }) => this.onSettingsChange(keys));

    this.voice.on('state', (state) => this.onVoiceState(state));
    this.voice.on('heard', ({ text, final }) => {
      const el = $('voiceTranscript');
      el.textContent = text || '…';
      el.classList.toggle('is-interim', !final);
    });
    this.voice.on('command', ({ parsed, spoken }) => {
      $('voiceResponse').textContent = spoken;
      this.pushEvent({ at: Date.now(), type: 'system', text: `Xcv: "${parsed.matched}" → ${spoken}` });
    });
    this.voice.on('unrecognised', ({ text, response }) => {
      $('voiceResponse').textContent = response;
      this.pushEvent({ at: Date.now(), type: 'system', text: `Xcv: heard "${text}", no matching command` });
    });
    this.voice.on('error', (err) => {
      if (err === 'not-allowed' || err === 'service-not-allowed') {
        toast('Microphone permission denied — Xcv needs mic access to listen for commands.', 'alert', 7000);
      }
    });
  }

  private onVoiceState(state: VoiceState): void {
    const mic = $<HTMLButtonElement>('btnVoiceMic');
    const orb = $('voiceOrb');
    mic.dataset.state = state;
    orb.dataset.state = state;
    $('voiceState').textContent = state;
    mic.setAttribute('aria-pressed', String(state === 'listening'));
    if (state === 'unsupported') {
      mic.disabled = true;
      mic.title = 'Xcv needs a browser with speech recognition (Chrome or Edge).';
    }
  }

  private async loadModel(): Promise<void> {
    try {
      await this.detector.load(this.settings.get('model'));
      this.detErrors = 0;
    } catch (err) {
      toast(`Object detection unavailable: ${errorMessage(err)}. Motion detection still works.`, 'alert', 8000, {
        label: 'Retry',
        run: () => void this.loadModel(),
      });
    }
  }

  private loop = (nowMs: number): void => {
    requestAnimationFrame(this.loop);
    const t = nowMs / 1000;
    this.analytics.render.tick(nowMs);
    try {
      const live = this.camera.isLive();
      if (live) {
        this.maybeDetect(nowMs);
        this.maybeMotion(nowMs, t);
      }
      const tracks = this.interpolatedTracks(t);
      this.renderOverlay(tracks, t, live);
      this.renderRadar(tracks, t);
      if (this.recorder.state === 'recording') this.renderRecordingFrame(tracks, t);
      if (nowMs - this.lastUi >= UI_INTERVAL_MS) {
        this.lastUi = nowMs;
        this.updateUi(t, nowMs);
      }
    } catch (err) {
      // A rendering bug must never stop the loop.
      logger.error('loop', err);
    }
  };

  private interpolatedTracks(t: number): InterpolatedTrack[] {
    return this.tracker.getTracks().map((track) => ({ track, ...this.tracker.predictPoint(track, t) }));
  }

  // ---- detection --------------------------------------------------------
  private maybeDetect(nowMs: number): void {
    const s = this.settings.value;
    if (this.detBusy || !s.detectionEnabled || this.detector.info.status !== 'ready' || document.hidden) return;
    if (nowMs - this.lastDetStart < 1000 / s.maxDetectionFps) return;
    this.lastDetStart = nowMs;
    this.detBusy = true;
    void this.runDetection().finally(() => (this.detBusy = false));
  }

  private async grabFrame(video: HTMLVideoElement, w: number, h: number): Promise<ImageBitmap> {
    if (this.bitmapResizeSupported) {
      try {
        return await createImageBitmap(video, { resizeWidth: w, resizeHeight: h, resizeQuality: 'low' });
      } catch {
        this.bitmapResizeSupported = false;
        logger.warn('detector', 'createImageBitmap resize unsupported; using canvas downscale');
      }
    }
    if (!this.resizeFallback) {
      this.resizeFallback = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : document.createElement('canvas');
    }
    const c = this.resizeFallback;
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
    }
    const ctx = c.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    ctx.drawImage(video, 0, 0, w, h);
    return createImageBitmap(c);
  }

  private async runDetection(): Promise<void> {
    const s = this.settings.value;
    const video = this.camera.element;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;
    const scale = Math.min(1, s.detectorInputSize / Math.max(vw, vh));
    const iw = Math.max(32, Math.round(vw * scale));
    const ih = Math.max(32, Math.round(vh * scale));
    this.lastInputSize = { w: iw, h: ih };
    const mirror = s.mirror;
    const t0 = performance.now();
    try {
      const frame = await this.grabFrame(video, iw, ih);
      const captured = performance.now();
      const out = await this.detector.detect(frame, s.confidenceThreshold, 30);
      const done = performance.now();
      this.detRuns++;
      this.analytics.processing.tick(done);
      this.analytics.detectionLatency.push(done - t0);
      this.analytics.inference.push(out.inferenceMs);

      // Settings or camera may have changed while inference was running.
      if (mirror !== this.settings.get('mirror') || !this.camera.isLive()) return;

      const detections: Detection[] = out.detections.map((d) => {
        const box = { x: d.bbox[0] / iw, y: d.bbox[1] / ih, w: d.bbox[2] / iw, h: d.bbox[3] / ih };
        return { label: d.label, score: d.score, box: mirror ? mirrorBox(box) : box };
      });
      this.lastDetections = detections;
      this.analytics.lastDetections = detections;

      this.tracker.configure({
        frameWidth: vw,
        frameHeight: vh,
        sensitivity: s.trackingSensitivity,
        historySec: Math.max(30, s.trailLength),
      });
      this.tracker.update(detections, captured / 1000);
      this.analytics.tracking.push(this.tracker.lastUpdateMs);
      this.detErrors = 0;
    } catch (err) {
      this.detErrors++;
      logger.error('detector', err);
      if (this.detErrors === 5) {
        toast('Object detection is failing repeatedly — see the debug panel. Reloading model…', 'alert', 7000);
        void this.loadModel();
      }
    }
  }

  // ---- motion -----------------------------------------------------------
  private maybeMotion(nowMs: number, t: number): void {
    const s = this.settings.value;
    if (!s.motionEnabled || document.hidden || nowMs - this.lastMotion < MOTION_INTERVAL_MS) return;
    this.lastMotion = nowMs;
    try {
      this.motion.sensitivity = s.motionSensitivity;
      const res = this.motion.process(this.camera.element, t, s.mirror);
      if (res) {
        this.analytics.motion.tick(nowMs);
        this.analytics.motionCost.push(this.motion.lastMs);
      }
    } catch (err) {
      logger.error('motion', err);
    }
  }

  // ---- rendering --------------------------------------------------------
  private contentRect(cssW: number, cssH: number): Rect {
    const vw = this.camera.width || 16;
    const vh = this.camera.height || 9;
    const s = Math.min(cssW / vw, cssH / vh);
    const w = vw * s;
    const h = vh * s;
    return { x: (cssW - w) / 2, y: (cssH - h) / 2, w, h };
  }

  private overlayOptions(): OverlayOptions {
    const s = this.settings.value;
    return {
      showBoxes: s.showBoxes,
      showIds: s.showIds,
      showVectors: s.showVectors,
      showTrails: s.showTrails,
      showConfidence: s.showConfidence,
      showMotion: s.showMotion && s.motionEnabled,
      showHeatmap: s.showHeatmap && s.motionEnabled,
      trailSec: s.trailLength,
      selectedId: this.selectedId,
    };
  }

  private overlayFrame(tracks: InterpolatedTrack[], t: number): OverlayFrame {
    return {
      tracks,
      motion: this.settings.get('motionEnabled') ? this.motion.last : null,
      heatmap: this.motion.heatmap,
      now: t,
      frameWidth: this.camera.width || 1,
      frameHeight: this.camera.height || 1,
    };
  }

  private renderOverlay(tracks: InterpolatedTrack[], t: number, live: boolean): void {
    if (this.cameraPanel.offsetParent === null) return;
    const { w, h, dpr } = fitCanvas(this.overlayCanvas);
    const ctx = this.overlayCtx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (!live) return;
    this.overlay.draw(ctx, this.contentRect(w, h), this.overlayFrame(tracks, t), this.overlayOptions(), w < 520 ? 0.85 : 1);
  }

  private renderRadar(tracks: InterpolatedTrack[], t: number): void {
    if (this.radarPanel.offsetParent === null && !document.fullscreenElement && !this.pseudoFullscreen) return;
    const s = this.settings.value;
    this.radar.projection.hFovDeg = s.cameraFov;
    this.radar.projection.aspect = (this.camera.width || 16) / (this.camera.height || 9);
    this.radar.projection.depth = extensions.depth;
    this.radar.render(tracks, t, {
      range: s.radarRange,
      selectedId: this.selectedId,
      showIds: s.showIds,
      showVectors: s.showVectors,
      showTrails: s.showTrails,
      showConfidence: s.showConfidence,
      trailSec: s.trailLength,
      animation: s.animationLevel,
    });
  }

  private renderRecordingFrame(tracks: InterpolatedTrack[], t: number): void {
    if (!this.recorder.overlays) return;
    const c = this.recorder.canvas;
    const ctx = c.getContext('2d');
    const video = this.camera.element;
    if (!ctx || !video.videoWidth) return;
    this.composite(ctx, c.width, c.height, video, tracks, t, true);
  }

  /** Draws the (mirrored) video frame plus overlays into an export canvas. */
  private composite(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    source: CanvasImageSource,
    tracks: InterpolatedTrack[],
    t: number,
    mirrorSource: boolean,
  ): void {
    ctx.save();
    if (mirrorSource && this.settings.get('mirror')) {
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(source, 0, 0, w, h);
    ctx.restore();
    this.overlay.draw(ctx, { x: 0, y: 0, w, h }, this.overlayFrame(tracks, t), this.overlayOptions(), Math.max(0.8, Math.min(2.5, w / 960)));
    // Burn-in timestamp for exported media.
    ctx.font = `600 ${Math.max(11, Math.round(w / 90))}px monospace`;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    const stamp = `CAMERA RADAR · ${new Date().toLocaleString()}`;
    const tw = ctx.measureText(stamp).width;
    ctx.fillRect(w - tw - 20, h - 30, tw + 14, 22);
    ctx.fillStyle = '#d6ebe5';
    ctx.fillText(stamp, w - tw - 13, h - 14);
  }

  // ======================================================================
  // UI updates (throttled)
  // ======================================================================
  private updateUi(t: number, nowMs: number): void {
    const tracks = this.tracker.getTracks();
    const cam = this.camera.info();
    const motion = this.motion.last;
    this.analytics.skippedFrames = Math.max(0, this.cameraFrames - this.detRuns);
    const snap = this.analytics.snapshot({
      cameraFps: cam.measuredFps,
      width: cam.width,
      height: cam.height,
      tracks,
      totalTracked: this.tracker.totalConfirmed,
      motionLevel: motion?.level ?? 'none',
      motionChanged: motion?.changed ?? 0,
    });
    const live = cam.state === 'live';
    if (!live) {
      snap.processingFps = 0;
      snap.cameraFps = 0;
    }
    this.checkPerformance(snap.renderFps, snap.detectionLatency, nowMs, live);
    this.analyticsView.updateMetrics(snap, this.perfWarn);
    this.analyticsView.updateTargets(tracks, this.selectedId, cam.width || 1, cam.height || 1);
    if (this.eventsDirty) {
      this.analyticsView.renderEvents(this.events);
      this.eventsDirty = false;
    }

    // Header chips.
    const moving = tracks.filter((x) => x.movement === 'moving' && x.status === 'active').length;
    setChip('chipTargets', tracks.length ? 'ok' : 'idle', tracks.length ? `${tracks.length} · ${moving} MOV` : '0');
    $('camMeta').textContent = live
      ? `${cam.label || 'Camera'} · ${cam.width}×${cam.height} · ${cam.measuredFps.toFixed(0)} fps${cam.muted ? ' · NO SIGNAL' : ''}`
      : cam.message;
    if (live) setChip('chipCamera', cam.muted ? 'warn' : 'ok', `${cam.measuredFps.toFixed(0)} FPS`);
    $('hudLive').hidden = !live;
    if (live) {
      const src = this.camera.sourceKind === 'file' ? 'VIDEO' : 'LIVE';
      $('hudLiveText').textContent = `${src} · ${cam.width}×${cam.height} · ${cam.measuredFps.toFixed(0)} FPS · ${tracks.length} TGT`;
    }
    const d = this.detector.info;
    $('sysBackend').textContent = d.status === 'ready' ? `${d.backend} · ${d.runtime}` : d.status;

    // Motion panel.
    const motionOn = this.settings.get('motionEnabled') && live;
    const level = !motionOn ? 'OFF' : motion?.global ? 'SCENE CHANGE' : motion?.sudden ? 'SUDDEN' : (motion?.level ?? 'none').toUpperCase();
    $('motionLevel').textContent = level;
    $('motionBar').style.width = `${Math.min(100, (motion?.changed ?? 0) * 800)}%`;
    const tag = $('motionTag');
    tag.textContent = `MOTION · ${level}${motionOn && motion ? ` · ${(motion.changed * 100).toFixed(1)}%` : ''}`;
    tag.dataset.level = motion?.sudden ? 'sudden' : (motion?.level ?? 'none');
    tag.hidden = !this.settings.get('motionEnabled');
    const hist = this.motion.heatmap.history;
    $('motionWindow').textContent = hist < 60 ? `${hist} s` : `${hist / 60} min`;
    $('heatWindow').textContent = `window ${$('motionWindow').textContent}`;
    const hot = this.motion.heatmap.hotspot(t);
    $('motionHotspot').textContent = hot ? `${hot.zone} (${Math.round(hot.share * 100)}%)` : '—';
    const css = getComputedStyle(document.documentElement);
    drawSparkline($<HTMLCanvasElement>('fpsSpark'), this.analytics.fpsHistory, css.getPropertyValue('--accent').trim() || '#5cf2b0', css.getPropertyValue('--line').trim());
    drawSparkline($<HTMLCanvasElement>('motionSpark'), this.motion.heatmap.timeline(t), css.getPropertyValue('--warn').trim() || '#ffb547', css.getPropertyValue('--line').trim());

    // Recording timer.
    if (this.recorder.state === 'recording') {
      const e = formatDuration(this.recorder.elapsed);
      setChip('chipRec', 'alert', e);
      $('recBadge').querySelector('span')!.textContent = e;
    }

    // Target drawer.
    if (this.targetPanel.isOpen && this.targetPanel.track) {
      const tr = this.targetPanel.track;
      const alive = tracks.some((x) => x.id === tr.id);
      this.targetPanel.update({
        now: t,
        alive,
        blip: this.radar.estimateFor(tr.id),
        frameW: cam.width || 1,
        frameH: cam.height || 1,
        events: this.targetEvents.get(tr.id) ?? [],
        epochOffset: this.epochOffset,
      });
    }

    if (document.fullscreenElement === this.radarWrap || this.pseudoFullscreen) this.updateRadarSide(tracks, cam.width, cam.height);
    if (this.settings.get('showDebug')) this.updateDebug(cam, snap);
  }

  private updateRadarSide(tracks: Track[], W: number, H: number): void {
    const html = tracks
      .slice()
      .sort((a, b) => a.id - b.id)
      .map((t) => {
        const blip = this.radar.estimateFor(t.id);
        const moving = t.movement === 'moving' && t.status === 'active';
        const dir = moving ? compassArrow(compassFromVelocity(t.vx * W, t.vy * H)) : '·';
        return `<div class="row" data-id="${t.id}" style="--c:${colorFor(t.label)}"><b style="color:var(--c)">${formatId(t.id)}</b><span>${escapeHtml(t.label.toUpperCase())}</span><span>${dir}</span>
          <small>${t.status === 'lost' ? 'SIGNAL LOST' : moving ? `MOVING ${Math.round(t.speedPx)} px/s` : 'STATIONARY'}${blip ? ` · ${blip.point.bearing.toFixed(0)}° · ~${blip.point.range.toFixed(1)} m est.` : ''}</small></div>`;
      })
      .join('');
    $('radarSide').innerHTML = html || '<div class="row" style="--c:var(--muted)"><span>No targets</span></div>';
  }

  private checkPerformance(renderFps: number, latency: number | null, nowMs: number, live: boolean): void {
    const s = this.settings.value;
    this.perfWarn = { fps: live && renderFps > 0 && renderFps < 20, latency: live && latency != null && latency > 600 };
    const low = this.perfWarn.fps || this.perfWarn.latency;
    const chip = $('chipPerf');
    chip.hidden = !low;
    if (low) setChip('chipPerf', 'warn', this.perfWarn.fps ? `${renderFps.toFixed(0)} FPS` : `${Math.round(latency!)} ms`);
    if (!low || document.hidden) {
      this.lowFpsSince = 0;
      return;
    }
    if (!this.lowFpsSince) this.lowFpsSince = nowMs;
    if (!s.autoPerformance || nowMs - this.lowFpsSince < 4000 || nowMs - this.lastPerfStep < 6000) return;
    const idx = INPUT_SIZES.indexOf(s.detectorInputSize);
    const patch: Partial<Settings> = {};
    if (idx > 0) patch.detectorInputSize = INPUT_SIZES[idx - 1];
    if (s.maxDetectionFps > 6) patch.maxDetectionFps = Math.max(6, Math.round(s.maxDetectionFps * 0.7));
    if (!Object.keys(patch).length) return;
    this.lastPerfStep = nowMs;
    this.settings.set(patch);
    const msg = `Performance is low — reduced detector load (input ${this.settings.get('detectorInputSize')} px, max ${this.settings.get('maxDetectionFps')} detections/s).`;
    logger.warn('perf', msg);
    toast(msg, 'warn', 6000);
  }

  private updateDebug(cam: CameraInfo, snap: ReturnType<Analytics['snapshot']>): void {
    const d = this.detector.info;
    const mem = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
    const f = (v: number | null, digits = 1, unit = 'ms') => (v == null ? '—' : `${v.toFixed(digits)} ${unit}`);
    this.debugPanel.update([
      {
        title: 'CAMERA STREAM',
        rows: [
          ['State', `${cam.state} — ${cam.message}`],
          ['Track', `${cam.trackState}${cam.muted ? ' (muted)' : ''}`],
          ['Device', cam.label || '—'],
          ['Resolution', cam.width ? `${cam.width}×${cam.height}` : '—'],
          ['Driver / measured FPS', `${cam.nominalFps ?? '—'} / ${cam.measuredFps.toFixed(1)}`],
          ['Frames analysed / received', `${this.detRuns} / ${this.cameraFrames} (${snap.skippedFrames} skipped by throttle)`],
        ],
      },
      {
        title: 'MODEL',
        rows: [
          ['Status', `${d.status} — ${d.message}`],
          ['Model', d.model],
          ['Runtime / backend', `${d.runtime} / ${d.backend}`],
          ['Weights source', d.source],
          ['Load time', d.loadMs ? `${Math.round(d.loadMs)} ms` : '—'],
          ['Detector input', this.lastInputSize.w ? `${this.lastInputSize.w}×${this.lastInputSize.h}` : '—'],
          ['Tensors / memory', d.tensors == null ? '—' : `${d.tensors} tensors · ${d.gpuBytes == null ? '—' : formatBytes(d.gpuBytes)}`],
        ],
      },
      {
        title: 'TIMING',
        rows: [
          ['UI / processing / motion FPS', `${snap.renderFps.toFixed(0)} / ${snap.processingFps.toFixed(1)} / ${snap.motionFps.toFixed(0)}`],
          ['Detection latency (end-to-end)', f(snap.detectionLatency, 0)],
          ['Inference', f(snap.inferenceMs, 0)],
          ['Tracking update', f(snap.trackingMs, 3)],
          ['Motion analysis', f(snap.motionMs, 2)],
        ],
      },
      {
        title: 'STATE',
        rows: [
          ['Active targets', `${snap.activeTargets} (${snap.moving} moving, ${snap.stationary} stationary)`],
          ['Detections (last frame)', `${this.lastDetections.length}`],
          ['Motion regions', `${this.motion.last?.blobs.length ?? 0}`],
          ['JS heap', mem ? `${formatBytes(mem.usedJSHeapSize)} / ${formatBytes(mem.jsHeapSizeLimit)}` : 'n/a in this browser'],
          ['Extensions', extensions.summary()],
          ['Recorder', this.recorder.state],
        ],
      },
    ]);
  }

  // ======================================================================
  // Events
  // ======================================================================
  private pushEvent(e: LoggedEvent): void {
    this.events.unshift(e);
    if (this.events.length > 200) this.events.pop();
    if (e.trackId != null) {
      const list = this.targetEvents.get(e.trackId) ?? [];
      list.unshift(e);
      if (list.length > 50) list.pop();
      this.targetEvents.set(e.trackId, list);
    }
    this.eventsDirty = true;
  }

  private onTrackEvent(e: TrackEvent): void {
    const id = formatId(e.track.id);
    const name = `${id} ${e.track.label.toUpperCase()}`;
    const at = this.epochOffset + e.t * 1000;
    const type: LoggedEvent['type'] =
      e.type === 'enter' ? 'enter' : e.type === 'exit' ? 'exit' : e.type === 'reacquired' ? 'reacquired' : e.type === 'sudden' ? 'sudden' : 'minor';
    this.pushEvent({ at, type, text: `${name} ${e.detail}`, trackId: e.track.id });
  }

  private onMotionEvent(e: MotionEvent): void {
    const type: LoggedEvent['type'] = e.type === 'sudden' ? 'sudden' : e.type === 'global' ? 'global' : 'motion';
    this.pushEvent({ at: this.epochOffset + e.t * 1000, type, text: e.detail });
  }

  // ======================================================================
  // Camera state
  // ======================================================================
  private onCameraState(info: CameraInfo): void {
    const btn = $<HTMLButtonElement>('btnCamera');
    const live = info.state === 'live';
    const busy = info.state === 'requesting';
    btn.classList.toggle('is-live', live || busy);
    btn.querySelector('.lbl')!.textContent = live ? (this.camera.sourceKind === 'file' ? 'Stop video' : 'Stop camera') : busy ? 'Starting…' : 'Start camera';
    btn.disabled = info.state === 'unsupported';

    const toneMap: Record<string, 'ok' | 'warn' | 'alert' | 'idle' | 'busy'> = {
      live: 'ok',
      requesting: 'busy',
      denied: 'alert',
      'not-found': 'alert',
      busy: 'alert',
      error: 'alert',
      disconnected: 'warn',
      unsupported: 'alert',
      stopped: 'idle',
      idle: 'idle',
    };
    const textMap: Record<string, string> = {
      live: 'LIVE',
      requesting: 'REQUESTING',
      denied: 'DENIED',
      'not-found': 'NOT FOUND',
      busy: 'IN USE',
      error: 'ERROR',
      disconnected: 'DISCONNECTED',
      unsupported: 'UNSUPPORTED',
      stopped: 'OFF',
      idle: 'OFF',
    };
    setChip('chipCamera', toneMap[info.state], textMap[info.state], info.message);

    if (!live) {
      if (this.recorder.state === 'recording') {
        this.recorder.stop();
        toast('Recording stopped because the camera stopped.', 'warn');
      }
      this.tracker.reset();
      this.motion.reset();
      this.radar.reset();
      this.lastDetections = [];
      this.analytics.lastDetections = [];
    } else {
      this.tracker.reset();
      this.motion.reset();
      this.radar.reset();
      this.analytics.reset();
      this.detRuns = 0;
      this.cameraFrames = 0;
      this.populateResolutions();
      this.pushEvent({
        at: Date.now(),
        type: 'system',
        text: `${this.camera.sourceKind === 'file' ? 'Video file' : 'Camera live'}: ${info.label || 'camera'} ${info.width}×${info.height}`,
      });
    }
    if (info.state === 'disconnected') {
      this.pushEvent({ at: Date.now(), type: 'system', text: 'Camera disconnected' });
      toast('Camera disconnected. It will resume automatically when reconnected.', 'warn', 6000);
    }
    if (info.state === 'denied' && info.embedBlocked) {
      toast('Camera is blocked because this page is embedded. Use "Open in new tab" to use the camera.', 'warn', 9000);
    } else if (['denied', 'not-found', 'busy', 'error'].includes(info.state)) {
      toast(info.message, 'alert', 7000);
    }
    this.updateEmptyState();
  }

  private updateEmptyState(): void {
    const info = this.camera.info();
    const el = $('emptyState');
    const title = $('emptyTitle');
    const msg = $('emptyMsg');
    const btn = $<HTMLButtonElement>('btnEmptyStart');
    el.hidden = info.state === 'live';
    btn.hidden = info.state === 'unsupported' || info.state === 'requesting';
    btn.textContent = info.state === 'denied' || info.state === 'error' || info.state === 'busy' || info.state === 'not-found' ? 'Try again' : 'Start camera';
    const titles: Partial<Record<CameraInfo['state'], string>> = {
      idle: 'Camera is off',
      stopped: 'Camera is off',
      requesting: 'Requesting camera…',
      denied: info.embedBlocked ? 'Camera blocked in this embed' : 'Permission denied',
      'not-found': 'No camera found',
      busy: 'Camera unavailable',
      disconnected: 'Camera disconnected',
      unsupported: 'Browser not supported',
      error: 'Camera error',
    };
    title.textContent = titles[info.state] ?? 'Camera';
    el.dataset.tone = info.state === 'denied' && info.embedBlocked
      ? 'warn'
      : ['denied', 'not-found', 'busy', 'error', 'unsupported'].includes(info.state)
        ? 'alert'
        : info.state === 'disconnected'
          ? 'warn'
          : '';
    const openTab = $<HTMLAnchorElement>('btnOpenTab');
    const blocked = info.state === 'denied' && info.embedBlocked;
    openTab.hidden = !blocked;
    if (blocked) openTab.href = location.href;
    btn.hidden = btn.hidden || blocked;
    let text = info.state === 'idle' || info.state === 'stopped'
      ? 'Start the camera to begin detection and tracking. Frames are processed locally in this browser and never uploaded.'
      : info.message;
    const d = this.detector.info;
    if (d.status === 'error') text += ' Object detection model is offline — motion detection will still run.';
    msg.textContent = text;
  }

  private showUnsupported(reason: string): void {
    const b = $('banner');
    b.hidden = false;
    b.textContent = `${reason} Camera features are disabled.`;
    this.updateEmptyState();
  }

  // ======================================================================
  // Recorder / snapshot
  // ======================================================================
  private toggleRecording(): void {
    if (this.recorder.state === 'recording') {
      this.recorder.stop();
      return;
    }
    if (!this.camera.isLive()) {
      toast('Start the camera before recording.', 'warn');
      return;
    }
    if (!Recorder.isSupported()) {
      toast('Recording is not supported in this browser (MediaRecorder unavailable).', 'alert');
      return;
    }
    const ok = this.recorder.start({
      camera: this.camera.element.srcObject as MediaStream | null,
      // A video file has no MediaStream, so it is always recorded via the composite canvas.
      withOverlays: this.settings.get('recordOverlays') || this.camera.sourceKind === 'file',
      width: this.camera.width,
      height: this.camera.height,
    });
    if (!ok) toast('Could not start recording — see the debug panel.', 'alert');
  }

  private onRecorderState(state: string): void {
    const rec = state === 'recording';
    $('chipRec').hidden = !rec;
    $('recBadge').hidden = !rec;
    this.viewport.classList.toggle('is-recording', rec);
    const btn = $<HTMLButtonElement>('btnRecord');
    btn.classList.toggle('is-recording', rec);
    btn.querySelector('.lbl')!.textContent = rec ? 'Stop' : 'Record';
    btn.querySelector('use')?.setAttribute('href', rec ? '#i-stop' : '#i-rec');
    if (rec) {
      setChip('chipRec', 'alert', '00:00');
      this.pushEvent({ at: Date.now(), type: 'system', text: `Recording started${this.recorder.overlays ? ' (with overlays)' : ''}` });
    }
  }

  private onRecordingSaved(rec: Recording): void {
    this.pushEvent({ at: Date.now(), type: 'system', text: `Recording stopped (${formatDuration(rec.durationSec)}, ${formatBytes(rec.blob.size)})` });
    this.renderRecordings();
    toast(`Recording ready (${formatDuration(rec.durationSec)}, ${formatBytes(rec.blob.size)}). It stays in memory until you save it.`, 'info', 8000, {
      label: 'Save',
      run: () => downloadBlob(rec.blob, recordingFilename(rec)),
    });
  }

  private renderRecordings(): void {
    const list = $('recordingList');
    $('recordingsSection').hidden = !this.recorder.recordings.length;
    list.innerHTML = this.recorder.recordings
      .map(
        (r) => `<li><span>${formatClock(r.createdAt)} · ${formatDuration(r.durationSec)} · ${formatBytes(r.blob.size)}</span>
        <span><button class="btn btn-sm" data-save="${r.id}">Save</button> <button class="btn btn-sm" data-drop="${r.id}">✕</button></span></li>`,
      )
      .join('');
  }

  private takeSnapshot(): void {
    if (!this.camera.isLive()) {
      toast('Start the camera to take a snapshot.', 'warn');
      return;
    }
    const video = this.camera.element;
    const raw = captureFrame(video, this.settings.get('mirror'));
    const withOverlay = document.createElement('canvas');
    withOverlay.width = raw.width;
    withOverlay.height = raw.height;
    const ctx = withOverlay.getContext('2d')!;
    const t = performance.now() / 1000;
    this.composite(ctx, raw.width, raw.height, raw, this.interpolatedTracks(t), t, false);
    this.snapshot = { raw, withOverlay };
    const box = $<HTMLInputElement>('snapOverlays');
    box.checked = this.settings.get('snapshotOverlays');
    this.showSnapshot();
    $('snapshotModal').hidden = false;
    this.pushEvent({ at: Date.now(), type: 'system', text: 'Snapshot captured (not saved)' });
  }

  private showSnapshot(): void {
    if (!this.snapshot) return;
    const src = $<HTMLInputElement>('snapOverlays').checked ? this.snapshot.withOverlay : this.snapshot.raw;
    const c = $<HTMLCanvasElement>('snapCanvas');
    c.width = src.width;
    c.height = src.height;
    c.getContext('2d')!.drawImage(src, 0, 0);
  }

  private async saveSnapshot(): Promise<void> {
    if (!this.snapshot) return;
    const src = $<HTMLInputElement>('snapOverlays').checked ? this.snapshot.withOverlay : this.snapshot.raw;
    try {
      const blob = await canvasToBlob(src);
      downloadBlob(blob, timestampName('camera-radar-snapshot', 'png'));
      toast('Snapshot saved.');
      this.closeSnapshot();
    } catch (err) {
      logger.error('snapshot', err);
      toast('Could not encode the snapshot.', 'alert');
    }
  }

  private closeSnapshot(): void {
    $('snapshotModal').hidden = true;
    this.snapshot = null;
  }

  private exportTrack(t: Track): void {
    const W = this.camera.width || 1;
    const H = this.camera.height || 1;
    const data = {
      exportedAt: new Date().toISOString(),
      note: 'Positions in source-image pixels. Speeds are image-plane px/s, not real-world units.',
      frame: { width: W, height: H },
      target: {
        id: t.id,
        label: t.label,
        firstSeen: new Date(this.epochOffset + t.firstSeen * 1000).toISOString(),
        lastSeen: new Date(this.epochOffset + t.lastSeen * 1000).toISOString(),
        enteredFrom: t.enteredFrom,
        exitedVia: t.exitedVia,
        averageConfidence: Number(t.avgScore.toFixed(3)),
      },
      history: t.history.map((p) => ({
        time: new Date(this.epochOffset + p.t * 1000).toISOString(),
        x: Math.round(p.x * W),
        y: Math.round(p.y * H),
        w: Math.round(p.w * W),
        h: Math.round(p.h * H),
        speedPxPerSec: Math.round(p.speed),
      })),
      events: (this.targetEvents.get(t.id) ?? []).map((e) => ({ time: new Date(e.at).toISOString(), event: e.text })),
    };
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), timestampName(`target-${t.id}`, 'json'));
  }

  // ======================================================================
  // Selection / fullscreen
  // ======================================================================
  private setSettingsDrawerOpen(open: boolean): void {
    $('settingsDrawer').hidden = !open;
    $('btnSettings').setAttribute('aria-pressed', String(open));
    if (open) this.targetPanel.close();
  }

  private select(id: number | null): void {
    this.selectedId = id;
    if (id == null) {
      this.targetPanel.close();
      return;
    }
    const track = this.tracker.getTrack(id);
    if (!track) return;
    this.setSettingsDrawerOpen(false);
    this.targetPanel.open(track);
    this.lastUi = 0; // refresh immediately
  }

  private async toggleRadarFullscreen(): Promise<void> {
    const el = this.radarWrap;
    if (document.fullscreenElement === el || this.pseudoFullscreen) {
      await this.exitRadarFullscreen();
      return;
    }
    // Radar must be visible to render; switch into a mode that contains it.
    if (this.settings.get('layoutMode') === 'camera') this.settings.set({ layoutMode: 'split' });
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen({ navigationUI: 'hide' });
        return;
      }
    } catch (err) {
      logger.warn('ui', `Fullscreen API refused (${errorMessage(err)}); using full-window mode`);
    }
    this.pseudoFullscreen = true;
    el.classList.add('pseudo-fullscreen');
  }

  private async exitRadarFullscreen(): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen().catch(() => undefined);
    this.pseudoFullscreen = false;
    this.radarWrap.classList.remove('pseudo-fullscreen');
  }

  // ======================================================================
  // Settings
  // ======================================================================
  private applyAllSettings(): void {
    this.onSettingsChange(Object.keys(this.settings.value) as (keyof Settings)[], true);
  }

  private onSettingsChange(keys: (keyof Settings)[], initial = false): void {
    const s = this.settings.value;
    const has = (k: keyof Settings) => keys.includes(k);

    if (has('theme')) {
      document.documentElement.dataset.theme = s.theme;
      const css = getComputedStyle(document.documentElement);
      const v = (name: string) => css.getPropertyValue(name).trim();
      this.radar.setTheme({
        grid: v('--radar-grid'),
        gridStrong: v('--radar-grid-strong'),
        text: v('--text'),
        textDim: v('--text-dim'),
        accent: v('--accent'),
        fov: v('--radar-fov'),
        sweep: v('--radar-sweep'),
        warn: v('--warn'),
        bg: v('--bg'),
        plate: v('--radar-plate'),
      });
    }
    if (has('layoutMode') || has('showAnalytics')) this.applyLayout(s.layoutMode, s.showAnalytics);
    if (has('mirror')) {
      this.camera.element.classList.toggle('mirrored', s.mirror);
      $('btnMirror').setAttribute('aria-pressed', String(s.mirror));
      if (!initial) {
        // Coordinates are stored in view space; flip means starting fresh.
        this.tracker.reset();
        this.motion.reset();
        this.motion.heatmap.reset();
        this.radar.reset();
      }
    }
    if (has('showHeatmap')) {
      for (const id of ['btnHeatmap', 'btnHeatmap2']) $(id).setAttribute('aria-pressed', String(s.showHeatmap));
      $('heatLegend').hidden = !s.showHeatmap;
      $('categoryLegend').hidden = s.showHeatmap;
    }
    if (has('showDebug')) {
      $('debugPanel').hidden = !s.showDebug;
      $('btnDebug').setAttribute('aria-pressed', String(s.showDebug));
    }
    if (has('heatmapHistory')) this.motion.heatmap.setHistory(s.heatmapHistory);
    if (has('motionSensitivity')) this.motion.sensitivity = s.motionSensitivity;
    if (has('trackingSensitivity')) this.tracker.configure({ sensitivity: s.trackingSensitivity });
    if (has('motionEnabled') && !s.motionEnabled) this.motion.reset();

    if (has('voiceEnabled')) {
      $('btnVoiceMic').hidden = !s.voiceEnabled || !this.voice.isSupported();
      if (!s.voiceEnabled) {
        this.voice.stopAll();
        $('voiceHud').hidden = true;
      }
    }
    if (has('voiceRate') || has('voicePitch') || has('voiceVolume') || has('voiceVoiceURI')) {
      this.voice.configure({ rate: s.voiceRate, pitch: s.voicePitch, volume: s.voiceVolume, voiceURI: s.voiceVoiceURI });
    }
    if (has('voiceHandsFree') || has('voiceEnabled')) {
      const handsFree = s.voiceEnabled && s.voiceHandsFree && this.voice.isSupported();
      $<HTMLButtonElement>('btnVoiceMic').title = handsFree ? 'Xcv is listening — say "Xcv" then a command (V to mute)' : 'Hold to talk to Xcv (V)';
      this.voice.setHandsFree(handsFree);
      if (handsFree) $('voiceHud').hidden = false;
    }

    if (initial) return;

    if (has('model') && s.detectionEnabled) {
      this.tracker.reset();
      void this.loadModel();
    }
    if (has('detectionEnabled')) {
      if (!s.detectionEnabled) {
        this.detector.disable();
        this.tracker.reset();
        this.lastDetections = [];
        this.analytics.lastDetections = [];
      } else {
        void this.loadModel();
      }
    }
    if (has('resolution')) {
      const [w, h] = s.resolution.split('x').map(Number);
      if (this.camera.state === 'live') void this.camera.setResolution(w, h);
      $<HTMLSelectElement>('resolutionSelect').value = s.resolution;
    }
    if (has('cameraId')) {
      $<HTMLSelectElement>('cameraSelect').value = s.cameraId ?? '';
      if (this.camera.state === 'live') void this.startCamera();
    }
  }

  private applyLayout(mode: LayoutMode, showAnalytics: boolean): void {
    const body = document.body;
    body.classList.remove('mode-camera', 'mode-radar', 'mode-split', 'mode-full');
    body.classList.add(`mode-${mode}`);
    body.classList.toggle('no-analytics', !showAnalytics);
    document.querySelectorAll<HTMLButtonElement>('.segmented [data-mode]').forEach((b) => {
      b.setAttribute('aria-selected', String(b.dataset.mode === mode));
    });
  }

  private populateCameras(): void {
    const sel = $<HTMLSelectElement>('cameraSelect');
    const opts = [{ value: '', label: 'Default camera' }, ...this.camera.devices.map((d) => ({ value: d.deviceId, label: d.label }))];
    const current = this.camera.info().deviceId ?? this.settings.get('cameraId') ?? '';
    sel.innerHTML = opts.map((o) => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
    sel.value = opts.some((o) => o.value === current) ? current : '';
    this.settingsPanel.setOptions('cameraId', opts);
    if (!this.camera.devices.length && this.camera.isSupported()) {
      sel.innerHTML = '<option value="">No camera detected</option>';
    }
  }

  private populateResolutions(): void {
    const list = this.camera.supportedResolutions();
    const opts = list.map((r) => ({ value: `${r.width}x${r.height}`, label: r.label }));
    // Show what the camera actually delivers; fall back to the requested value.
    const actual = this.camera.isLive() ? `${this.camera.width}x${this.camera.height}` : '';
    let current = opts.some((o) => o.value === actual) ? actual : this.settings.get('resolution');
    if (!opts.some((o) => o.value === current) && opts.length) current = opts[opts.length - 1].value;
    const sel = $<HTMLSelectElement>('resolutionSelect');
    sel.innerHTML = opts.map((o) => `<option value="${o.value}">${o.label}</option>`).join('');
    sel.value = current;
    this.settingsPanel.setOptions('resolution', opts);
    this.settingsPanel.showValue('resolution', current);
  }

  private async startCamera(): Promise<void> {
    const s = this.settings.value;
    const [w, h] = s.resolution.split('x').map(Number);
    await this.camera.start(s.cameraId, w || 1280, h || 720);
  }

  // ======================================================================
  // DOM bindings
  // ======================================================================
  private bindVoiceUi(): void {
    const mic = $<HTMLButtonElement>('btnVoiceMic');
    const startTalk = (e: Event) => {
      e.preventDefault();
      if (mic.disabled) return;
      $('voiceHud').hidden = false;
      if (this.settings.get('voiceHandsFree')) return; // already listening continuously
      this.voice.pushToTalkStart();
    };
    const stopTalk = () => {
      if (!this.settings.get('voiceHandsFree')) this.voice.pushToTalkStop();
    };
    mic.addEventListener('pointerdown', startTalk);
    mic.addEventListener('pointerup', stopTalk);
    mic.addEventListener('pointerleave', stopTalk);
    mic.addEventListener('pointercancel', stopTalk);
    mic.addEventListener('click', () => {
      // In hands-free mode the mic is already always-on; a click just surfaces the HUD.
      if (this.settings.get('voiceHandsFree')) $('voiceHud').hidden = false;
    });
    $('btnVoiceHudClose').onclick = () => {
      $('voiceHud').hidden = true;
      if (!this.settings.get('voiceHandsFree')) this.voice.pushToTalkStop();
    };

    this.populateVoiceList();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => this.populateVoiceList();
    }
  }

  private populateVoiceList(): void {
    const voices = this.voice.availableVoices().filter((v) => v.lang.startsWith('en'));
    const list = voices.length ? voices : this.voice.availableVoices();
    const opts = [{ value: '', label: 'Automatic (deep, calm)' }, ...list.map((v) => ({ value: v.voiceURI, label: `${v.name} (${v.lang})` }))];
    this.settingsPanel.setOptions('voiceVoiceURI', opts);
  }

  private bindUi(): void {
    const topbar = document.querySelector<HTMLElement>('.topbar')!;
    const toolbar = document.querySelector<HTMLElement>('.toolbar')!;
    const syncChrome = () =>
      document.documentElement.style.setProperty('--chrome-h', `${Math.round(topbar.offsetHeight + toolbar.offsetHeight)}px`);
    new ResizeObserver(syncChrome).observe(toolbar);
    new ResizeObserver(syncChrome).observe(topbar);
    syncChrome();

    const toggleCamera = () => {
      if (this.camera.state === 'live' || this.camera.state === 'requesting') this.camera.stop();
      else void this.startCamera();
    };
    $('btnCamera').onclick = toggleCamera;
    $('btnEmptyStart').onclick = () => void this.startCamera();
    const fileInput = $<HTMLInputElement>('fileInput');
    const pickFile = () => fileInput.click();
    $('btnFile').onclick = pickFile;
    $('btnEmptyFile').onclick = pickFile;
    // Optional demo footage: shown only when a sample.webm is deployed next to the page.
    const sampleBtn = $<HTMLButtonElement>('btnSample');
    fetch(new URL('sample.webm', document.baseURI), { method: 'HEAD' })
      .then((r) => (sampleBtn.hidden = !(r.ok && (r.headers.get('content-type') ?? '').startsWith('video/'))))
      .catch(() => undefined);
    sampleBtn.onclick = async () => {
      try {
        const blob = await (await fetch(new URL('sample.webm', document.baseURI))).blob();
        this.settings.set({ mirror: false });
        await this.camera.startFile(new File([blob], 'sample.webm', { type: blob.type || 'video/webm' }));
      } catch (err) {
        toast(`Could not load the sample clip: ${errorMessage(err)}`, 'alert');
      }
    };
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      fileInput.value = '';
      if (!file) return;
      // Recorded footage is not a selfie view; show it unmirrored (toggle back if wanted).
      this.settings.set({ mirror: false });
      void this.camera.startFile(file);
    };
    $<HTMLSelectElement>('cameraSelect').onchange = (e) => this.settings.set({ cameraId: (e.target as HTMLSelectElement).value || null });
    $<HTMLSelectElement>('resolutionSelect').onchange = (e) => this.settings.set({ resolution: (e.target as HTMLSelectElement).value });
    $('btnMirror').onclick = () => this.settings.set({ mirror: !this.settings.get('mirror') });

    document.querySelectorAll<HTMLButtonElement>('.segmented [data-mode]').forEach((b) => {
      b.onclick = () => this.settings.set({ layoutMode: b.dataset.mode as LayoutMode });
    });

    const toggleHeat = () => {
      if (!this.settings.get('motionEnabled')) this.settings.set({ motionEnabled: true });
      this.settings.set({ showHeatmap: !this.settings.get('showHeatmap') });
    };
    $('btnHeatmap').onclick = toggleHeat;
    $('btnHeatmap2').onclick = toggleHeat;
    $('btnResetHeat').onclick = () => {
      this.motion.heatmap.reset();
      toast('Motion heatmap cleared.');
    };
    $('btnSnapshot').onclick = () => this.takeSnapshot();
    $('btnRecord').onclick = () => this.toggleRecording();
    $('btnFullscreen').onclick = () => void this.toggleRadarFullscreen();
    $('btnRadarFs').onclick = () => void this.toggleRadarFullscreen();
    $('btnRadarExit').onclick = () => void this.exitRadarFullscreen();
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === this.radarWrap) this.updateRadarSide(this.tracker.getTracks(), this.camera.width, this.camera.height);
    });

    $('btnSettings').onclick = () => this.setSettingsDrawerOpen($('settingsDrawer').hidden);
    $('btnDebug').onclick = () => this.settings.set({ showDebug: !this.settings.get('showDebug') });
    $('btnDebugClose').onclick = () => this.settings.set({ showDebug: false });
    document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach((b) => {
      b.onclick = () => {
        const target = b.dataset.close!;
        if (target === 'targetDrawer') this.select(null);
        else if (target === 'settingsDrawer') this.setSettingsDrawerOpen(false);
        else $(target).hidden = true;
      };
    });
    $('chipModel').onclick = () => {
      if (this.detector.info.status === 'error') void this.loadModel();
    };
    this.bindVoiceUi();

    // Target selection on the camera overlay and the radar.
    this.overlayCanvas.addEventListener('click', (e) => {
      const r = this.overlayCanvas.getBoundingClientRect();
      const id = this.overlay.hitTest(e.clientX - r.left, e.clientY - r.top);
      if (id != null) this.select(id);
    });
    $<HTMLCanvasElement>('radar').addEventListener('click', (e) => {
      const r = (e.target as HTMLCanvasElement).getBoundingClientRect();
      const id = this.radar.hitTest(e.clientX - r.left, e.clientY - r.top);
      if (id != null) this.select(id);
    });
    $('radarSide').addEventListener('click', (e) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');
      if (row) this.select(Number(row.dataset.id));
    });

    // Snapshot modal.
    $('snapOverlays').onchange = () => this.showSnapshot();
    $('btnSnapSave').onclick = () => void this.saveSnapshot();
    $('btnSnapDiscard').onclick = () => this.closeSnapshot();
    $('btnSnapClose').onclick = () => this.closeSnapshot();

    // Recordings list.
    $('recordingList').addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      const save = el.closest<HTMLElement>('[data-save]');
      const drop = el.closest<HTMLElement>('[data-drop]');
      if (save) {
        const rec = this.recorder.recordings.find((r) => r.id === Number(save.dataset.save));
        if (rec) downloadBlob(rec.blob, recordingFilename(rec));
      } else if (drop) {
        this.recorder.discard(Number(drop.dataset.drop));
        this.renderRecordings();
      }
    });

    // Keyboard shortcuts.
    document.addEventListener('keydown', (e) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      const modes: LayoutMode[] = ['camera', 'radar', 'split', 'full'];
      if (e.key >= '1' && e.key <= '4') this.settings.set({ layoutMode: modes[Number(e.key) - 1] });
      else if (e.key === 'h' || e.key === 'H') toggleHeat();
      else if (e.key === 's' || e.key === 'S') this.takeSnapshot();
      else if (e.key === 'r' || e.key === 'R') this.toggleRecording();
      else if (e.key === 'f' || e.key === 'F') void this.toggleRadarFullscreen();
      else if (e.key === 'd' || e.key === 'D') this.settings.set({ showDebug: !this.settings.get('showDebug') });
      else if ((e.key === 'v' || e.key === 'V') && this.settings.get('voiceEnabled') && this.voice.isSupported() && !e.repeat) {
        $('voiceHud').hidden = false;
        this.voice.pushToTalkStart();
      } else if (e.key === 'Escape') {
        if (!$('snapshotModal').hidden) this.closeSnapshot();
        else if (this.pseudoFullscreen) void this.exitRadarFullscreen();
        else if (!$('settingsDrawer').hidden) this.setSettingsDrawerOpen(false);
        else if (!$('voiceHud').hidden) $('voiceHud').hidden = true;
        else this.select(null);
      }
    });
    document.addEventListener('keyup', (e) => {
      if ((e.key === 'v' || e.key === 'V') && this.settings.get('voiceEnabled')) this.voice.pushToTalkStop();
    });

    // Pause heavy work when hidden; the loop checks document.hidden.
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.lastDetStart = 0;
    });
    window.addEventListener('beforeunload', () => {
      if (this.recorder.state === 'recording') this.recorder.stop();
      this.camera.stop();
      this.voice.dispose();
    });
  }
}
