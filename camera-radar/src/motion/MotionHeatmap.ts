/**
 * Sliding-window motion accumulator. The history window is split into
 * buckets; old buckets are recycled so the heatmap always reflects exactly the
 * last `historySec` seconds of activity.
 */
export class MotionHeatmap {
  readonly buckets = 30;
  private data: Float32Array[] = [];
  private energy = new Float32Array(this.buckets);
  private stamps = new Float64Array(this.buckets).fill(-1);
  private gridW = 0;
  private gridH = 0;
  private historySec: number;
  private sum: Float32Array | null = null;
  private sumDirty = true;
  startedAt = 0;

  constructor(historySec = 60) {
    this.historySec = historySec;
  }

  get history(): number {
    return this.historySec;
  }

  setHistory(sec: number): void {
    if (sec === this.historySec) return;
    this.historySec = sec;
    this.reset();
  }

  reset(): void {
    this.data = [];
    this.stamps.fill(-1);
    this.energy.fill(0);
    this.sum = null;
    this.sumDirty = true;
    this.startedAt = 0;
  }

  private get bucketSec(): number {
    return this.historySec / this.buckets;
  }

  add(cells: Float32Array, gridW: number, gridH: number, t: number): void {
    if (gridW !== this.gridW || gridH !== this.gridH) {
      this.gridW = gridW;
      this.gridH = gridH;
      this.reset();
    }
    if (!this.startedAt) this.startedAt = t;
    if (!this.data.length) {
      for (let i = 0; i < this.buckets; i++) this.data.push(new Float32Array(gridW * gridH));
    }
    const slot = Math.floor(t / this.bucketSec);
    const idx = slot % this.buckets;
    if (this.stamps[idx] !== slot) {
      this.data[idx].fill(0);
      this.energy[idx] = 0;
      this.stamps[idx] = slot;
    }
    const bucket = this.data[idx];
    let e = 0;
    for (let i = 0; i < cells.length; i++) {
      bucket[i] += cells[i];
      e += cells[i];
    }
    this.energy[idx] += e / cells.length;
    this.sumDirty = true;
  }

  /** Summed activity over the window, or null if nothing recorded yet. */
  heat(t: number): { values: Float32Array; max: number; gridW: number; gridH: number } | null {
    if (!this.data.length) return null;
    const current = Math.floor(t / this.bucketSec);
    if (!this.sum || this.sumDirty || this.sum.length !== this.gridW * this.gridH) {
      this.sum = new Float32Array(this.gridW * this.gridH);
      for (let b = 0; b < this.buckets; b++) {
        if (this.stamps[b] < 0 || current - this.stamps[b] >= this.buckets) continue;
        const src = this.data[b];
        for (let i = 0; i < src.length; i++) this.sum[i] += src[i];
      }
      this.sumDirty = false;
    }
    let max = 0;
    for (let i = 0; i < this.sum.length; i++) if (this.sum[i] > max) max = this.sum[i];
    return { values: this.sum, max, gridW: this.gridW, gridH: this.gridH };
  }

  /** Motion energy per bucket, oldest → newest, for the history sparkline. */
  timeline(t: number): number[] {
    const current = Math.floor(t / this.bucketSec);
    const out: number[] = [];
    for (let k = this.buckets - 1; k >= 0; k--) {
      const slot = current - k;
      const idx = ((slot % this.buckets) + this.buckets) % this.buckets;
      out.push(this.stamps[idx] === slot ? this.energy[idx] : 0);
    }
    return out;
  }

  /** Coarse 3×3 zone description of where most activity happened. */
  hotspot(t: number): { zone: string; share: number } | null {
    const h = this.heat(t);
    if (!h || h.max <= 0) return null;
    const zones = new Float32Array(9);
    let total = 0;
    for (let y = 0; y < h.gridH; y++) {
      for (let x = 0; x < h.gridW; x++) {
        const v = h.values[y * h.gridW + x];
        zones[Math.min(2, Math.floor((y / h.gridH) * 3)) * 3 + Math.min(2, Math.floor((x / h.gridW) * 3))] += v;
        total += v;
      }
    }
    let best = 0;
    for (let i = 1; i < 9; i++) if (zones[i] > zones[best]) best = i;
    const names = ['upper-left', 'upper-centre', 'upper-right', 'mid-left', 'centre', 'mid-right', 'lower-left', 'lower-centre', 'lower-right'];
    return { zone: names[best], share: total > 0 ? zones[best] / total : 0 };
  }
}
