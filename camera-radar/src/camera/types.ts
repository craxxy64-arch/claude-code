export type CameraState =
  | 'idle'
  | 'unsupported'
  | 'requesting'
  | 'live'
  | 'stopped'
  | 'denied'
  | 'not-found'
  | 'busy'
  | 'disconnected'
  | 'error';

export interface CameraDevice {
  deviceId: string;
  label: string;
  groupId: string;
}

export interface Resolution {
  width: number;
  height: number;
  label: string;
}

export interface CameraInfo {
  state: CameraState;
  message: string;
  deviceId: string | null;
  label: string;
  width: number;
  height: number;
  /** Frame rate reported by the driver (may be nominal). */
  nominalFps: number | null;
  /** Frame rate actually measured from decoded video frames. */
  measuredFps: number;
  trackState: MediaStreamTrackState | 'none';
  muted: boolean;
  /** True when the page is embedded in a frame that does not grant camera access. */
  embedBlocked: boolean;
}

/**
 * Abstraction over anything that produces frames for the vision pipeline.
 * The built-in implementation wraps a webcam; depth or stereo rigs can
 * implement the same contract and add optional capabilities.
 */
export interface FrameSource {
  readonly kind: 'rgb' | 'rgbd' | 'stereo';
  /** Element the pipeline reads pixels from. */
  readonly element: HTMLVideoElement;
  readonly width: number;
  readonly height: number;
  isLive(): boolean;
  /** Metric depth at a normalised image point, if the source can measure it. */
  depthAt?(x: number, y: number): number | null;
}

export const RESOLUTION_PRESETS: Resolution[] = [
  { width: 320, height: 240, label: '320×240 (QVGA)' },
  { width: 640, height: 480, label: '640×480 (VGA)' },
  { width: 960, height: 540, label: '960×540 (qHD)' },
  { width: 1280, height: 720, label: '1280×720 (HD)' },
  { width: 1920, height: 1080, label: '1920×1080 (Full HD)' },
  { width: 2560, height: 1440, label: '2560×1440 (QHD)' },
  { width: 3840, height: 2160, label: '3840×2160 (4K)' },
];
