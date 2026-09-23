export function $<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function setChip(id: string, tone: 'ok' | 'warn' | 'alert' | 'idle' | 'busy', value: string, title?: string): void {
  const chip = document.getElementById(id);
  if (!chip) return;
  chip.dataset.tone = tone;
  const v = chip.querySelector('.v');
  if (v && v.textContent !== value) v.textContent = value;
  if (title !== undefined) chip.title = title;
}

/** Sizes a canvas backing store to its CSS box × devicePixelRatio. Returns the CSS size. */
export function fitCanvas(canvas: HTMLCanvasElement, maxDpr = 2): { w: number; h: number; dpr: number } {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const bw = Math.max(1, Math.round(w * dpr));
  const bh = Math.max(1, Math.round(h * dpr));
  if (canvas.width !== bw || canvas.height !== bh) {
    canvas.width = bw;
    canvas.height = bh;
  }
  return { w, h, dpr };
}

export function isShown(el: HTMLElement): boolean {
  return el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
}
