import { Emitter } from '../utils/emitter.ts';
import { logger } from '../utils/logger.ts';

export type LayoutMode = 'camera' | 'radar' | 'split' | 'full';
export type AnimationLevel = 'off' | 'low' | 'full';
export type Theme = 'dark' | 'light';
export type ModelBase = 'lite_mobilenet_v2' | 'mobilenet_v1' | 'mobilenet_v2';

export interface Settings {
  // Camera
  cameraId: string | null;
  resolution: string; // "WIDTHxHEIGHT"
  mirror: boolean;
  // Detection
  detectionEnabled: boolean;
  model: ModelBase;
  confidenceThreshold: number; // 0..1
  maxDetectionFps: number;
  detectorInputSize: number; // longest side in px fed to the model
  autoPerformance: boolean;
  // Tracking
  trackingSensitivity: number; // 0..100
  trailLength: number; // seconds
  // Motion
  motionEnabled: boolean;
  motionSensitivity: number; // 0..100
  heatmapHistory: number; // seconds
  showHeatmap: boolean;
  showMotion: boolean;
  // Radar
  radarRange: number; // metres (estimated)
  cameraFov: number; // horizontal field of view in degrees
  // Display
  layoutMode: LayoutMode;
  animationLevel: AnimationLevel;
  showBoxes: boolean;
  showIds: boolean;
  showVectors: boolean;
  showTrails: boolean;
  showConfidence: boolean;
  showAnalytics: boolean;
  showDebug: boolean;
  theme: Theme;
  // Capture
  recordOverlays: boolean;
  snapshotOverlays: boolean;
  // Voice (Xcv)
  voiceEnabled: boolean;
  voiceHandsFree: boolean;
  voiceRate: number;
  voicePitch: number;
  voiceVolume: number;
  voiceVoiceURI: string | null;
}

export const DEFAULT_SETTINGS: Settings = {
  cameraId: null,
  resolution: '1280x720',
  mirror: true,
  detectionEnabled: true,
  model: 'lite_mobilenet_v2',
  confidenceThreshold: 0.5,
  maxDetectionFps: 15,
  detectorInputSize: 480,
  autoPerformance: true,
  trackingSensitivity: 50,
  trailLength: 6,
  motionEnabled: true,
  motionSensitivity: 55,
  heatmapHistory: 60,
  showHeatmap: false,
  showMotion: true,
  radarRange: 8,
  cameraFov: 70,
  layoutMode: 'full',
  animationLevel: 'full',
  showBoxes: true,
  showIds: true,
  showVectors: true,
  showTrails: true,
  showConfidence: true,
  showAnalytics: true,
  showDebug: false,
  theme: 'dark',
  recordOverlays: true,
  snapshotOverlays: true,
  voiceEnabled: false,
  voiceHandsFree: false,
  voiceRate: 0.95,
  voicePitch: 0.75,
  voiceVolume: 1,
  voiceVoiceURI: null,
};

const STORAGE_KEY = 'camera-radar.settings.v1';

/**
 * Reactive settings store. Only these UI preferences are persisted (in this
 * browser's localStorage); no camera frames or tracking data are ever stored.
 */
export class SettingsStore extends Emitter<{ change: { keys: (keyof Settings)[]; settings: Settings } }> {
  private state: Settings;

  constructor() {
    super();
    this.state = { ...DEFAULT_SETTINGS, ...this.load() };
  }

  get value(): Readonly<Settings> {
    return this.state;
  }

  get<K extends keyof Settings>(key: K): Settings[K] {
    return this.state[key];
  }

  set(patch: Partial<Settings>): void {
    const keys: (keyof Settings)[] = [];
    for (const key of Object.keys(patch) as (keyof Settings)[]) {
      if (this.state[key] !== patch[key]) keys.push(key);
    }
    if (!keys.length) return;
    this.state = { ...this.state, ...patch };
    this.save();
    this.emit('change', { keys, settings: this.state });
  }

  reset(): void {
    const keep = { cameraId: this.state.cameraId };
    const keys = Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[];
    this.state = { ...DEFAULT_SETTINGS, ...keep };
    this.save();
    this.emit('change', { keys, settings: this.state });
  }

  private load(): Partial<Settings> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const clean: Partial<Settings> = {};
      for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[]) {
        const def = DEFAULT_SETTINGS[key];
        const v = parsed[key];
        if (v === undefined) continue;
        if (def === null ? typeof v === 'string' || v === null : typeof v === typeof def) {
          (clean as Record<string, unknown>)[key] = v;
        }
      }
      return clean;
    } catch (err) {
      logger.warn('settings', `Could not read saved settings: ${String(err)}`);
      return {};
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage may be unavailable (private mode); settings then live for this session only.
    }
  }
}
