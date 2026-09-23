import type { AnalyticsSnapshot } from '../analytics/Analytics.ts';
import { colorFor } from '../detection/categories.ts';
import type { Track } from '../tracking/types.ts';
import { escapeHtml, fitCanvas } from './dom.ts';
import { fixed, formatClock, formatId, percent } from '../utils/format.ts';
import { compassArrow, compassFromVelocity, compassWord } from '../utils/math.ts';

export interface LoggedEvent {
  at: number;
  type: 'enter' | 'exit' | 'reacquired' | 'sudden' | 'motion' | 'global' | 'minor' | 'system';
  text: string;
  trackId?: number;
}

const METRICS: { key: keyof AnalyticsSnapshot; label: string; unit?: string; digits?: number; tone?: 'accent' }[] = [
  { key: 'renderFps', label: 'UI FPS', digits: 0 },
  { key: 'cameraFps', label: 'Camera FPS', digits: 0 },
  { key: 'processingFps', label: 'Processing FPS', digits: 1, tone: 'accent' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'objectsDetected', label: 'Objects (frame)' },
  { key: 'peopleDetected', label: 'People (frame)', tone: 'accent' },
  { key: 'moving', label: 'Moving' },
  { key: 'stationary', label: 'Stationary' },
  { key: 'activeTargets', label: 'Tracked now' },
  { key: 'totalTracked', label: 'Total tracked' },
  { key: 'avgConfidence', label: 'Avg confidence' },
  { key: 'detectionLatency', label: 'Detect latency', unit: 'ms', digits: 0 },
  { key: 'inferenceMs', label: 'Inference', unit: 'ms', digits: 0 },
  { key: 'trackingMs', label: 'Tracking', unit: 'ms', digits: 2 },
];

export class AnalyticsPanel {
  private values = new Map<string, HTMLElement>();
  private tiles = new Map<string, HTMLElement>();
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
  ) {
    this.listEl = listEl;
    this.eventsEl = eventsEl;
    this.countEl = countEl;
    metricsHost.innerHTML = METRICS.map(
      (m) => `<div class="metric" data-key="${m.key}" ${m.tone ? `data-tone="${m.tone}"` : ''}><div class="label">${m.label}</div><div class="value">—</div></div>`,
    ).join('');
    for (const m of METRICS) {
      const tile = metricsHost.querySelector<HTMLElement>(`[data-key="${m.key}"]`)!;
      this.tiles.set(m.key, tile);
      this.values.set(m.key, tile.querySelector('.value')!);
    }
    listEl.addEventListener('pointerdown', (e) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>('li[data-id]');
      if (li) onSelect(Number(li.dataset.id));
    });
    this.eventsEl.innerHTML = '<li class="empty-note">No events yet.</li>';
  }

  updateMetrics(s: AnalyticsSnapshot, perfWarn: { latency: boolean; fps: boolean }): void {
    for (const m of METRICS) {
      const raw = s[m.key];
      let html: string;
      if (m.key === 'avgConfidence') html = percent(raw as number | null);
      else if (typeof raw === 'number' || raw === null) html = `${fixed(raw as number | null, m.digits ?? 0)}${m.unit && raw != null ? `<small>${m.unit}</small>` : ''}`;
      else html = escapeHtml(String(raw));
      const el = this.values.get(m.key)!;
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    this.tiles.get('detectionLatency')!.dataset.tone = perfWarn.latency ? 'warn' : '';
    this.tiles.get('renderFps')!.dataset.tone = perfWarn.fps ? 'warn' : '';
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
            const state = t.status === 'lost' ? 'LOST' : moving ? 'MOVING' : 'STATIONARY';
            const sub = moving && dir ? `${compassArrow(dir)} ${compassWord(dir)} · ${Math.round(t.speedPx)} px/s` : t.status === 'lost' ? 'searching…' : 'holding position';
            return `<li data-id="${t.id}" style="--c:${colorFor(t.label)}" class="${t.id === selectedId ? 'selected' : ''} ${t.status === 'lost' ? 'lost' : ''}">
              <span class="tid">${formatId(t.id)}</span><span>${escapeHtml(t.label.toUpperCase())}</span><span class="tstate ${moving ? 'moving' : ''}">${state}</span>
              <span class="tsub">${sub} · ${Math.round(t.avgScore * 100)}%</span></li>`;
          })
          .join('')
      : '<li class="empty-note">No targets tracked.</li>';
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
