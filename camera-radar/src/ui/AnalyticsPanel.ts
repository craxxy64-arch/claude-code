import type { AnalyticsSnapshot } from '../analytics/Analytics.ts';
import { colorFor } from '../detection/categories.ts';
import type { Track } from '../tracking/types.ts';
import { escapeHtml, fitCanvas } from './dom.ts';
import { fixed, formatClock, formatId, percent } from '../utils/format.ts';
import { compassArrow, compassFromVelocity, compassWord, headingDegrees } from '../utils/math.ts';

export interface LoggedEvent {
  at: number;
  type: 'enter' | 'exit' | 'reacquired' | 'sudden' | 'motion' | 'global' | 'minor' | 'system';
  text: string;
  trackId?: number;
}

const HERO: { key: keyof AnalyticsSnapshot; label: string; tone?: 'accent' | 'warn' }[] = [
  { key: 'activeTargets', label: 'Tracked', tone: 'accent' },
  { key: 'moving', label: 'Moving' },
  { key: 'peopleDetected', label: 'People' },
  { key: 'totalTracked', label: 'Session' },
];

/** System metrics; `max` scales the inline bar (value / max). */
const METRICS: { key: keyof AnalyticsSnapshot; label: string; unit?: string; digits?: number; max?: number; invert?: boolean }[] = [
  { key: 'renderFps', label: 'UI FPS', digits: 0, max: 60 },
  { key: 'cameraFps', label: 'Camera FPS', digits: 0, max: 30 },
  { key: 'processingFps', label: 'Processing FPS', digits: 1, max: 30 },
  { key: 'detectionLatency', label: 'Detect latency', unit: 'ms', digits: 0, max: 500, invert: true },
  { key: 'inferenceMs', label: 'Inference', unit: 'ms', digits: 0, max: 500, invert: true },
  { key: 'trackingMs', label: 'Tracking', unit: 'ms', digits: 2, max: 5, invert: true },
  { key: 'avgConfidence', label: 'Avg confidence', max: 1 },
  { key: 'objectsDetected', label: 'Objects in frame', max: 10 },
  { key: 'stationary', label: 'Stationary', max: 10 },
  { key: 'resolution', label: 'Resolution' },
];

export class AnalyticsPanel {
  private values = new Map<string, HTMLElement>();
  private bars = new Map<string, HTMLElement>();
  private rows = new Map<string, HTMLElement>();
  private heroValues = new Map<string, HTMLElement>();
  private eventsEl: HTMLElement;
  private listEl: HTMLElement;
  private countEl: HTMLElement;
  private lastListHtml = '';

  constructor(
    metricsHost: HTMLElement,
    listEl: HTMLElement,
    eventsEl: HTMLElement,
    countEl: HTMLElement,
    onSelect: (id: number) => void,
    heroHost?: HTMLElement,
  ) {
    this.listEl = listEl;
    this.eventsEl = eventsEl;
    this.countEl = countEl;
    if (heroHost) {
      heroHost.innerHTML = HERO.map(
        (h) => `<div class="hero" data-key="${h.key}" ${h.tone ? `data-tone="${h.tone}"` : ''}><b>0</b><span>${h.label}</span></div>`,
      ).join('');
      for (const h of HERO) this.heroValues.set(h.key, heroHost.querySelector<HTMLElement>(`[data-key="${h.key}"] b`)!);
    }
    metricsHost.innerHTML = METRICS.map(
      (m) => `<div class="metric" data-key="${m.key}"><span class="label">${m.label}</span><span class="value">—</span>${m.max ? '<i class="meter"><i></i></i>' : ''}</div>`,
    ).join('');
    for (const m of METRICS) {
      const row = metricsHost.querySelector<HTMLElement>(`[data-key="${m.key}"]`)!;
      this.rows.set(m.key, row);
      this.values.set(m.key, row.querySelector('.value')!);
      const bar = row.querySelector<HTMLElement>('.meter > i');
      if (bar) this.bars.set(m.key, bar);
    }
    listEl.addEventListener('pointerdown', (e) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>('li[data-id]');
      if (li) onSelect(Number(li.dataset.id));
    });
    this.eventsEl.innerHTML = '<li class="empty-note">No events yet.</li>';
  }

  updateMetrics(s: AnalyticsSnapshot, perfWarn: { latency: boolean; fps: boolean }): void {
    for (const h of HERO) {
      const v = String(s[h.key] ?? 0);
      const el = this.heroValues.get(h.key);
      if (el && el.textContent !== v) el.textContent = v;
    }
    for (const m of METRICS) {
      const raw = s[m.key];
      let html: string;
      if (m.key === 'avgConfidence') html = percent(raw as number | null);
      else if (typeof raw === 'number' || raw === null) html = `${fixed(raw as number | null, m.digits ?? 0)}${m.unit && raw != null ? `<small>${m.unit}</small>` : ''}`;
      else html = escapeHtml(String(raw));
      const el = this.values.get(m.key)!;
      if (el.innerHTML !== html) el.innerHTML = html;
      const bar = this.bars.get(m.key);
      if (bar && m.max) {
        const v = typeof raw === 'number' ? Math.max(0, Math.min(1, raw / m.max)) : 0;
        bar.style.transform = `scaleX(${v})`;
      }
    }
    this.rows.get('detectionLatency')!.dataset.tone = perfWarn.latency ? 'warn' : '';
    this.rows.get('renderFps')!.dataset.tone = perfWarn.fps ? 'warn' : '';
  }

  updateTargets(tracks: Track[], selectedId: number | null, frameW: number, frameH: number): void {
    this.countEl.textContent = tracks.length ? String(tracks.length) : '';
    const html = tracks.length
      ? tracks
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((t) => {
            const moving = t.movement === 'moving' && t.status !== 'lost';
            const dir = moving ? compassFromVelocity(t.vx * frameW, t.vy * frameH) : null;
            const heading = moving ? Math.round(headingDegrees(t.vx * frameW, t.vy * frameH) / 5) * 5 : 0;
            const state = t.status === 'lost' ? 'LOST' : moving ? 'MOVING' : 'STILL';
            const sub = moving && dir ? `${compassWord(dir)} · ${Math.round(t.speedPx)} px/s` : t.status === 'lost' ? 'searching…' : 'holding position';
            const speed = Math.min(1, t.speedPx / 400);
            return `<li data-id="${t.id}" style="--c:${colorFor(t.label)}" class="${t.id === selectedId ? 'selected' : ''} ${t.status === 'lost' ? 'lost' : ''} ${moving ? 'is-moving' : ''}">
              <span class="tid">${formatId(t.id)}</span>
              <span class="tname">${escapeHtml(t.label)}</span>
              <span class="tdir" title="${moving && dir ? compassArrow(dir) : ''}">${moving ? `<svg class="ico" style="transform:rotate(${heading}deg)"><use href="#i-arrow" /></svg>` : '<i class="still"></i>'}</span>
              <span class="tstate">${state}</span>
              <span class="tsub">${sub}</span>
              <span class="tconf">${Math.round(t.avgScore * 100)}%</span>
              <i class="tspeed"><i style="transform:scaleX(${speed.toFixed(2)})"></i></i></li>`;
          })
          .join('')
      : '<li class="empty-note">No targets yet — objects appear here as they are detected.</li>';
    if (html !== this.lastListHtml) {
      this.listEl.innerHTML = html;
      this.lastListHtml = html;
    }
  }

  renderEvents(events: LoggedEvent[]): void {
    if (!events.length) {
      this.eventsEl.innerHTML = '<li class="empty-note">No events yet.</li>';
      return;
    }
    const label: Record<LoggedEvent['type'], string> = {
      enter: 'ENTER',
      exit: 'EXIT',
      reacquired: 'REACQ',
      sudden: 'SUDDEN',
      motion: 'MOTION',
      global: 'SCENE',
      minor: 'STATE',
      system: 'SYS',
    };
    this.eventsEl.innerHTML = events
      .slice(0, 40)
      .map((e) => `<li data-type="${e.type}"><time>${formatClock(e.at)}</time><span><b>${label[e.type]}</b>${escapeHtml(e.text)}</span></li>`)
      .join('');
  }
}

/** Minimal sparkline for motion history / fps. */
export function drawSparkline(canvas: HTMLCanvasElement, values: number[], color: string, grid: string): void {
  const { w, h, dpr } = fitCanvas(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx || !w) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h - 0.5);
  ctx.lineTo(w, h - 0.5);
  ctx.stroke();
  if (!values.length) return;
  const max = Math.max(...values, 1e-4);
  const bw = w / values.length;
  ctx.fillStyle = color;
  values.forEach((v, i) => {
    const bh = (v / max) * (h - 4);
    ctx.globalAlpha = 0.35 + 0.65 * (i / values.length);
    ctx.fillRect(i * bw + 1, h - bh, Math.max(1, bw - 2), bh);
  });
  ctx.globalAlpha = 1;
}
