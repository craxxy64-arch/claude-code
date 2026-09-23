/**
 * Extension points for capabilities a plain webcam cannot provide.
 *
 * Nothing here is simulated: each interface is a contract a future module
 * (depth camera, stereo rig, pose / hand model, SLAM…) can implement and
 * register. The pipeline already consults the registry — e.g. the radar uses a
 * registered DepthProvider instead of its monocular size-based estimate.
 */
import type { Track } from '../tracking/types.ts';

/** Metric depth from RGB-D or stereo hardware. */
export interface DepthProvider {
  readonly id: string;
  /** Depth in metres at a normalised image point, or null if unknown. */
  depthAt(x: number, y: number): number | null;
}

/** Any per-frame vision model (pose, hands, gestures, segmentation…). */
export interface VisionModule<Output = unknown> {
  readonly id: string;
  readonly kind: 'pose' | 'hands' | 'gesture' | 'segmentation' | 'detector' | 'custom';
  load(): Promise<void>;
  process(frame: ImageBitmap, t: number): Promise<Output>;
  /** Optionally attach results to tracks (keypoints, gestures…) via `track.meta`. */
  annotate?(tracks: Track[], output: Output): void;
  dispose(): void;
}

/** Room / spatial mapping backends producing 3D points in metres. */
export interface SpatialMapper {
  readonly id: string;
  update(tracks: Track[], t: number): void;
  points(): Float32Array;
}

class ExtensionRegistry {
  depth: DepthProvider | null = null;
  readonly modules: VisionModule[] = [];
  mapper: SpatialMapper | null = null;

  registerDepth(provider: DepthProvider | null): void {
    this.depth = provider;
  }
  registerModule(mod: VisionModule): void {
    this.modules.push(mod);
  }
  registerMapper(mapper: SpatialMapper | null): void {
    this.mapper = mapper;
  }
  summary(): string {
    const parts = [
      this.depth ? `depth: ${this.depth.id}` : 'depth: none (monocular estimate)',
      `modules: ${this.modules.length ? this.modules.map((m) => m.id).join(', ') : 'none'}`,
      this.mapper ? `mapper: ${this.mapper.id}` : 'mapper: none',
    ];
    return parts.join(' · ');
  }
}

export const extensions = new ExtensionRegistry();
