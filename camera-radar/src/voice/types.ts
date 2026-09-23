import type { LayoutMode } from '../settings/Settings.ts';

export type VoiceIntent =
  | { type: 'start-camera' }
  | { type: 'stop-camera' }
  | { type: 'open-video' }
  | { type: 'set-mode'; mode: LayoutMode }
  | { type: 'mirror'; on: boolean }
  | { type: 'snapshot' }
  | { type: 'record'; on: boolean }
  | { type: 'heatmap'; on: boolean }
  | { type: 'reset-heatmap' }
  | { type: 'settings'; open: boolean }
  | { type: 'debug'; open: boolean }
  | { type: 'fullscreen-radar'; on: boolean }
  | { type: 'select-target'; id: number }
  | { type: 'deselect-target' }
  | { type: 'set-confidence'; value: number }
  | { type: 'status-report' }
  | { type: 'greeting' }
  | { type: 'stop-listening' }
  | { type: 'help' };

export interface ParsedCommand {
  intent: VoiceIntent;
  /** The phrase fragment that matched, for the transcript log. */
  matched: string;
}

/** Status Xcv can actually read back — every field is a real measured value. */
export interface VoiceStatusSnapshot {
  cameraOn: boolean;
  cameraLabel: string;
  targetsTracked: number;
  moving: number;
  people: number;
  modelStatus: string;
  processingFps: number;
  motionLevel: string;
  recording: boolean;
}
