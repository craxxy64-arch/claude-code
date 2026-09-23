import { colorFor } from '../detection/categories.ts';
import { TREND_LABEL } from '../radar/kinematics.ts';
import type { RadarBlip } from '../radar/RadarRenderer.ts';
import type { Track } from '../tracking/types.ts';
import { escapeHtml, fitCanvas } from './dom.ts';
import { formatClock, formatDuration, formatId } from '../utils/format.ts';
import { compassArrow, compassFromVelocity, compassName, compassWord, headingDegrees } from '../utils/math.ts';
import type { LoggedEvent } from './AnalyticsPanel.ts';

/** Live-updating details for the selected target. Data is session-only. */
export class TargetPanel {
  track: Track | null = null;
  private pathCanvas: HTMLCanvasElement | null = null;

  constructor(
    private readonly drawer: HTMLElement,
    private readonly title: HTMLElement,
    private readonly body: HTMLElement,
    private readonly onExport: (track: Track) => void,
  ) {}

  get isOpen(): boolean {
    return !this.drawer.hidden;
  }

  open(track: Track): void {
    this.track = track;
    this.drawer.hidden = false;
  }

  close(): void {
    this.drawer.hidden = true;
    this.track = null;
  }

  private built = false;
  private f = new Map<string, HTMLElement>();

  private build(): void {
    this.body.innerHTML = `
      <div class="td-hero"><span class="id" data-f="id"></span><span class="label" data-f="label"></span></div>
      <span class="td-state" data-f="state"></span>
      <div class="td-grid">
        <div><span>Position (px)</span><b data-f="pos"></b></div>
        <div><span>Previous (px)</span><b data-f="prev"></b></div>
        <div><span>Direction</span><b data-f="dir"></b></div>
        <div><span>Heading</span><b data-f="heading"></b></div>
        <div><span>Speed</span><b data-f="speed"></b></div>
        <div><span>Box size (px)</span><b data-f="size"></b></div>
        <div><span>Confidence</span><b data-f="conf"></b></div>
        <div><span>Tracked for</span><b data-f="duration"></b></div>
        <div><span>Entered</span><b data-f="entered"></b></div>
        <div><span>Last seen</span><b data-f="seen"></b></div>
        <div><span>Bearing</span><b data-f="bearing"></b></div>
        <div><span>Distance (est.)</span><b data-f="range"></b></div>
      </div>
      <p class="td-note" data-f="note"></p>
      <div class="td-sub" data-f="histTitle"></div>
      <canvas class="td-path"></canvas>
      <table class="td-table">
        <thead><tr><th>Time</th><th>X</th><th>Y</th><th>px/s</th></tr></thead>
        <tbody data-f="rows"></tbody>
      </table>
      <div class="td-sub">Target events</div>
      <ol class="event-log" data-f="events"></ol>
      <div class="row-actions"><button class="btn btn-sm" type="button" data-export>Save history (JSON)</button></div>`;
    this.body.querySelectorAll<HTMLElement>('[data-f]').forEach((el) => this.f.set(el.dataset.f!, el));
    this.body.querySelector<HTMLButtonElement>('[data-export]')!.onclick = () => this.track && this.onExport(this.track);
    this.pathCanvas = this.body.querySelector('canvas');
    this.built = true;
  }

  private set(key: string, value: string, html = false): void {
    const el = this.f.get(key);
    if (!el) return;
    if (html) {
      if (el.innerHTML !== value) el.innerHTML = value;
    } else if (el.textContent !== value) {
      el.textContent = value;
    }
  }

  update(args: {
    now: number;
    alive: boolean;
    blip: RadarBlip | undefined;
    frameW: number;
    frameH: number;
    events: LoggedEvent[];
    epochOffset: number;
  }): void {
    const t = this.track;
    if (!t || !this.isOpen) return;
    if (!this.built) this.build();
    const { frameW: W, frameH: H, now } = args;
    const color = colorFor(t.label);
    this.title.textContent = `Target ${formatId(t.id)}`;
    this.body.style.setProperty('--c', color);
    const moving = t.movement === 'moving' && t.status !== 'lost' && args.alive;
    const dir = compassFromVelocity(t.vx * W, t.vy * H);
    const state = !args.alive ? 'LEFT VIEW' : t.status === 'lost' ? 'SIGNAL LOST' : moving ? 'MOVING' : 'STATIONARY';
    const px = (v: number, s: number) => Math.round(v * s);
    const duration = (args.alive ? now : t.lastSeen) - t.firstSeen;
    const est = args.blip?.point;

    this.set('id', formatId(t.id));
    this.set('label', t.label);
    this.set('state', state);
    const stateEl = this.f.get('state')!;
    stateEl.className = `td-state ${moving ? 'moving' : ''} ${t.status === 'lost' || !args.alive ? 'lost' : ''}`;
    this.set('pos', `${px(t.x, W)}, ${px(t.y, H)}`);
    this.set('prev', t.prev ? `${px(t.prev.x, W)}, ${px(t.prev.y, H)}` : '—');
    this.set('dir', moving ? `${compassArrow(dir)} ${compassWord(dir)}` : '—');
    this.set('heading', moving ? `${Math.round(headingDegrees(t.vx * W, t.vy * H))}° ${compassName(dir)}` : '—');
    this.set('speed', `${Math.round(t.speedPx)} px/s`);
    this.set('size', `${px(t.w, W)} × ${px(t.h, H)}`);
    this.set('conf', `${Math.round(t.score * 100)}% (avg ${Math.round(t.avgScore * 100)}%)`);
    this.set('duration', formatDuration(duration));
    this.set('entered', t.enteredFrom === 'inside' ? 'in view' : `from ${t.enteredFrom}`);
    this.set('seen', formatClock(args.epochOffset + t.lastSeen * 1000));
    this.set('bearing', est ? `${est.bearing >= 0 ? '+' : ''}${est.bearing.toFixed(1)}°` : '—');
    const blip = args.blip;
    const trend =
      blip?.motion && blip.motion.trend !== 'steady'
        ? ` · ${TREND_LABEL[blip.motion.trend].toLowerCase()}${blip.motion.trend !== 'crossing' ? ` ${Math.abs(blip.motion.rangeRate).toFixed(1)} m/s` : ''}`
        : '';
    this.set('range', blip ? `~${blip.range.toFixed(1)} ±${(blip.range * blip.uncertainty).toFixed(1)} m${trend}` : '—');
    this.set(
      'note',
      est && est.measured
        ? 'Distance measured by depth sensor.'
        : `Estimated distance — camera calibration required for accurate measurements. Basis: ${est?.basis ?? 'n/a'}. Speed is in image pixels per second, not real-world units.`,
    );
    const span = t.history.length ? t.history.at(-1)!.t - t.history[0].t : 0;
    this.set('histTitle', `Movement history (last ${Math.round(span)} s, ${t.history.length} samples)`);
    this.set(
      'rows',
      t.history
        .slice(-12)
        .reverse()
        .map((p) => `<tr><td>${formatClock(args.epochOffset + p.t * 1000)}</td><td>${px(p.x, W)}</td><td>${px(p.y, H)}</td><td>${Math.round(p.speed)}</td></tr>`)
        .join(''),
      true,
    );
    this.set(
      'events',
      args.events.length
        ? args.events.slice(0, 12).map((e) => `<li data-type="${e.type}"><time>${formatClock(e.at)}</time><span>${escapeHtml(e.text)}</span></li>`).join('')
        : '<li class="empty-note">No events.</li>',
      true,
    );
    this.drawPath(t, color, W, H);
  }

  private drawPath(t: Track, color: string, W: number, H: number): void {
    const c = this.pathCanvas;
    if (!c) return;
    const { w, h, dpr } = fitCanvas(c);
    const ctx = c.getContext('2d');
    if (!ctx || !w) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    // Frame outline with the camera's aspect ratio.
    const aspect = W / Math.max(1, H);
    let fw = w - 12;
    let fh = fw / aspect;
    if (fh > h - 12) {
      fh = h - 12;
      fw = fh * aspect;
    }
    const ox = (w - fw) / 2;
    const oy = (h - fh) / 2;
    ctx.strokeStyle = 'rgba(140,205,190,0.25)';
    ctx.strokeRect(ox, oy, fw, fh);
    ctx.fillStyle = 'rgba(140,205,190,0.4)';
    ctx.font = '9px monospace';
    ctx.fillText('CAMERA FRAME', ox + 4, oy + 11);
    if (t.history.length < 2) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    t.history.forEach((p, i) => {
      const x = ox + p.x * fw;
      const y = oy + p.y * fh;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    const first = t.history[0];
    const last = t.history.at(-1)!;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(ox + first.x * fw, oy + first.y * fh, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ox + last.x * fw, oy + last.y * fh, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
