/**
 * Camera-space → radar-space transformation.
 *
 * Bearing comes from the pinhole model and the horizontal field of view, which
 * is geometrically sound. Range from a single webcam is NOT measurable; it is
 * *estimated* from apparent size using typical real-world object sizes, and
 * everything downstream labels it as such. A registered DepthProvider replaces
 * the estimate with measured depth.
 */
import type { DepthProvider } from '../extensions/capabilities.ts';

export interface ProjectionInput {
  label: string;
  /** Centre + size, normalised to the frame. */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RadarPoint {
  /** Degrees, 0 = camera axis, negative = left. */
  bearing: number;
  /** Metres. */
  range: number;
  /** Ground-plane coordinates in metres: X right, Y forward. */
  X: number;
  Y: number;
  measured: boolean;
  quality: 'measured' | 'estimate' | 'rough';
  basis: string;
}

/** Typical physical dimensions in metres: [height, width]. */
const SIZE_PRIORS: Record<string, [number, number]> = {
  person: [1.7, 0.5],
  bicycle: [1.05, 1.7],
  car: [1.5, 4.3],
  motorcycle: [1.1, 2.0],
  bus: [3.0, 11],
  truck: [3.0, 7],
  cat: [0.3, 0.45],
  dog: [0.55, 0.75],
  horse: [1.6, 2.2],
  bird: [0.2, 0.25],
  chair: [0.9, 0.5],
  couch: [0.85, 2.0],
  bed: [0.6, 2.0],
  'dining table': [0.75, 1.4],
  toilet: [0.75, 0.45],
  tv: [0.6, 1.0],
  laptop: [0.24, 0.34],
  mouse: [0.04, 0.07],
  remote: [0.18, 0.05],
  keyboard: [0.04, 0.44],
  'cell phone': [0.15, 0.075],
  microwave: [0.3, 0.5],
  refrigerator: [1.8, 0.8],
  book: [0.23, 0.16],
  clock: [0.3, 0.3],
  vase: [0.25, 0.14],
  bottle: [0.25, 0.07],
  'wine glass': [0.2, 0.08],
  cup: [0.1, 0.08],
  bowl: [0.08, 0.16],
  backpack: [0.45, 0.32],
  handbag: [0.28, 0.35],
  suitcase: [0.65, 0.42],
  umbrella: [0.9, 0.9],
  'potted plant': [0.45, 0.35],
  'teddy bear': [0.3, 0.25],
  scissors: [0.2, 0.08],
  'sports ball': [0.22, 0.22],
  bench: [0.85, 1.5],
};
const DEFAULT_PRIOR: [number, number] = [0.4, 0.4];
const EDGE = 0.02;

export class MonocularProjection {
  hFovDeg = 70;
  aspect = 16 / 9;
  depth: DepthProvider | null = null;

  get vFovDeg(): number {
    const h = (this.hFovDeg * Math.PI) / 360;
    return (Math.atan(Math.tan(h) / this.aspect) * 360) / Math.PI;
  }

  bearingOf(xNorm: number): number {
    const tanH = Math.tan((this.hFovDeg * Math.PI) / 360);
    return (Math.atan((xNorm - 0.5) * 2 * tanH) * 180) / Math.PI;
  }

  project(o: ProjectionInput): RadarPoint {
    const bearing = this.bearingOf(o.x);
    const rad = (bearing * Math.PI) / 180;

    const measuredDepth = this.depth?.depthAt(o.x, o.y) ?? null;
    if (measuredDepth != null && measuredDepth > 0) {
      // Depth cameras report Z along the optical axis.
      const range = measuredDepth / Math.cos(rad);
      return { bearing, range, X: range * Math.sin(rad), Y: range * Math.cos(rad), measured: true, quality: 'measured', basis: `depth sensor (${this.depth!.id})` };
    }

    const [realH, realW] = SIZE_PRIORS[o.label] ?? DEFAULT_PRIOR;
    const tanH = Math.tan((this.hFovDeg * Math.PI) / 360);
    const tanV = Math.tan((this.vFovDeg * Math.PI) / 360);
    // Focal length in "frame widths" / "frame heights".
    const fx = 0.5 / tanH;
    const fy = 0.5 / tanV;
    const top = o.y - o.h / 2;
    const bottom = o.y + o.h / 2;
    const left = o.x - o.w / 2;
    const right = o.x + o.w / 2;
    const cutV = top < EDGE || bottom > 1 - EDGE;
    const cutH = left < EDGE || right > 1 - EDGE;

    let z: number;
    let quality: RadarPoint['quality'] = 'estimate';
    let basis: string;
    if (!cutV) {
      z = (realH * fy) / Math.max(o.h, 1e-3);
      basis = `apparent height vs typical ${o.label} height ${realH} m`;
    } else if (!cutH) {
      // Cut off top/bottom: the visible height is smaller than the real one, so the
      // height-based figure over-states distance — it is a ceiling, not an estimate.
      // Use the width estimate, capped by that ceiling (the same rule as when both
      // axes are cut), so a box nudging past a frame edge can't make the range jump.
      const widthZ = (realW * fx) / Math.max(o.w, 1e-3);
      const heightCeiling = (realH * fy) / Math.max(o.h, 1e-3);
      z = Math.min(widthZ, heightCeiling);
      quality = 'rough';
      basis = `partially visible — apparent width vs typical width ${realW} m, capped by visible height`;
    } else {
      z = Math.min((realH * fy) / Math.max(o.h, 1e-3), (realW * fx) / Math.max(o.w, 1e-3));
      quality = 'rough';
      basis = 'truncated on both axes — very rough';
    }
    if (!(o.label in SIZE_PRIORS)) {
      quality = 'rough';
      basis = `no size prior for "${o.label}" — generic 0.4 m assumption`;
    }
    const range = z / Math.cos(rad);
    return { bearing, range, X: range * Math.sin(rad), Y: range * Math.cos(rad), measured: false, quality, basis };
  }
}
