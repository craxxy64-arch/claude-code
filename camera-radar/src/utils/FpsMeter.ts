/** Counts real events inside a sliding one-second window. */
export class FpsMeter {
  private stamps: number[] = [];
  constructor(private readonly windowMs = 1000) {}

  tick(now: number = performance.now()): void {
    this.stamps.push(now);
    this.trim(now);
  }

  value(now: number = performance.now()): number {
    this.trim(now);
    return (this.stamps.length * 1000) / this.windowMs;
  }

  reset(): void {
    this.stamps = [];
  }

  private trim(now: number): void {
    const cutoff = now - this.windowMs;
    let i = 0;
    while (i < this.stamps.length && this.stamps[i] < cutoff) i++;
    if (i) this.stamps.splice(0, i);
  }
}

/** Exponential moving average for latency figures. */
export class Ema {
  value: number | null = null;
  constructor(private readonly alpha = 0.2) {}
  push(v: number): number {
    this.value = this.value == null ? v : this.value + this.alpha * (v - this.value);
    return this.value;
  }
  reset(): void {
    this.value = null;
  }
}
