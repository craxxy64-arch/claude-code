import type { LayoutMode } from '../settings/Settings.ts';
import type { VoiceStatusSnapshot } from './types.ts';

/**
 * Everything Xcv is able to do — every entry maps to a real control this
 * app already exposes in its toolbar/settings. There is nothing here that
 * reaches outside this browser tab.
 */
export interface VoiceActions {
  startCamera(): void;
  stopCamera(): void;
  openVideoPicker(): void;
  setMode(mode: LayoutMode): void;
  setMirror(on: boolean): void;
  snapshot(): void;
  setRecording(on: boolean): void;
  setHeatmap(on: boolean): void;
  resetHeatmap(): void;
  setSettingsOpen(open: boolean): void;
  setDebugOpen(open: boolean): void;
  setFullscreenRadar(on: boolean): void;
  /** Returns the target's label if one with that ID currently exists. */
  selectTarget(id: number): string | null;
  deselectTarget(): void;
  setConfidence(value: number): void;
  getStatus(): VoiceStatusSnapshot;
}
