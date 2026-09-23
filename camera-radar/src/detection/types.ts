import type { Box } from '../utils/math.ts';
import type { ModelBase } from '../settings/Settings.ts';

export interface Detection {
  label: string;
  score: number;
  /** Normalised box in *view space* (mirrored if the view is mirrored). */
  box: Box;
  /** Colour signature of the object, used by the tracker to tell targets apart. */
  appearance?: Float32Array | null;
}

export interface RawDetection {
  label: string;
  score: number;
  /** Pixel box [x, y, w, h] in detector input space. */
  bbox: [number, number, number, number];
}

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error' | 'disabled';

export interface DetectorInfo {
  status: ModelStatus;
  message: string;
  model: ModelBase;
  backend: string;
  runtime: 'worker' | 'main-thread' | 'none';
  source: 'local' | 'remote' | 'none';
  loadMs: number;
  tensors: number | null;
  gpuBytes: number | null;
}

export interface DetectOutput {
  detections: RawDetection[];
  inferenceMs: number;
  tensors: number | null;
  bytes: number | null;
}

/** Common contract for any image detector (COCO-SSD today; others later). */
export interface ObjectDetector {
  readonly info: DetectorInfo;
  load(model: ModelBase): Promise<void>;
  detect(frame: ImageBitmap, minScore: number, maxBoxes: number): Promise<DetectOutput>;
  dispose(): void;
}

export const MODEL_LABELS: Record<ModelBase, string> = {
  lite_mobilenet_v2: 'SSDLite MobileNetV2 — fast',
  mobilenet_v1: 'SSD MobileNetV1 — balanced',
  mobilenet_v2: 'SSD MobileNetV2 — accurate (67 MB)',
};

export const MODEL_DIRS: Record<ModelBase, string> = {
  lite_mobilenet_v2: 'ssdlite_mobilenet_v2',
  mobilenet_v1: 'ssd_mobilenet_v1',
  mobilenet_v2: 'ssd_mobilenet_v2',
};

export const REMOTE_MODEL_BASE = 'https://storage.googleapis.com/tfjs-models/savedmodel';

/** Candidate model URLs: same-origin copy first, then the public TF.js bucket. */
export function modelUrls(model: ModelBase, origin: string): { url: string; source: 'local' | 'remote' }[] {
  return [
    { url: new URL(`models/${MODEL_DIRS[model]}/model.json`, origin).href, source: 'local' },
    { url: `${REMOTE_MODEL_BASE}/${MODEL_DIRS[model]}/model.json`, source: 'remote' },
  ];
}
