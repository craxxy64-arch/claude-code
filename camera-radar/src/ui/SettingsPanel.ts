import type { Settings, SettingsStore } from '../settings/Settings.ts';
import { MODEL_LABELS } from '../detection/types.ts';
import { escapeHtml } from './dom.ts';

type Option = { value: string; label: string };

type Field =
  | { key: keyof Settings; label: string; type: 'toggle'; help?: string }
  | { key: keyof Settings; label: string; type: 'range'; min: number; max: number; step: number; format: (v: number) => string; help?: string }
  | { key: keyof Settings; label: string; type: 'select'; options: Option[] | 'dynamic'; numeric?: boolean; help?: string };

interface Group {
  title: string;
  fields: Field[];
}

const pct = (v: number) => `${Math.round(v * 100)}%`;

const GROUPS: Group[] = [
  {
    title: 'Camera',
    fields: [
      { key: 'cameraId', label: 'Camera', type: 'select', options: 'dynamic' },
      { key: 'resolution', label: 'Resolution', type: 'select', options: 'dynamic', help: 'Only resolutions the active camera reports are listed.' },
      { key: 'mirror', label: 'Mirror camera', type: 'toggle' },
    ],
  },
  {
    title: 'Detection',
    fields: [
      { key: 'detectionEnabled', label: 'Object detection', type: 'toggle' },
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: Object.entries(MODEL_LABELS).map(([value, label]) => ({ value, label })),
        help: 'COCO-SSD (80 object classes) via TensorFlow.js, running in a Web Worker.',
      },
      { key: 'confidenceThreshold', label: 'Confidence threshold', type: 'range', min: 0.2, max: 0.95, step: 0.05, format: pct },
      { key: 'maxDetectionFps', label: 'Max detection rate', type: 'range', min: 1, max: 30, step: 1, format: (v) => `${v} /s` },
      {
        key: 'detectorInputSize',
        label: 'Detector input size',
        type: 'select',
        numeric: true,
        options: [256, 320, 416, 480, 640].map((v) => ({ value: String(v), label: `${v} px` })),
        help: 'Frames are downscaled to this before inference. Smaller = faster, larger = better for small objects.',
      },
      { key: 'autoPerformance', label: 'Adaptive performance', type: 'toggle', help: 'Lower detector load automatically when the UI frame rate drops.' },
    ],
  },
  {
    title: 'Tracking',
    fields: [
      { key: 'trackingSensitivity', label: 'Tracking sensitivity', type: 'range', min: 0, max: 100, step: 5, format: (v) => `${v}`, help: 'Higher reacts faster and flags smaller movements; lower is smoother.' },
      { key: 'trailLength', label: 'Trail length', type: 'range', min: 1, max: 30, step: 1, format: (v) => `${v} s` },
    ],
  },
  {
    title: 'Motion',
    fields: [
      { key: 'motionEnabled', label: 'Motion detection', type: 'toggle' },
      { key: 'motionSensitivity', label: 'Motion sensitivity', type: 'range', min: 0, max: 100, step: 5, format: (v) => `${v}` },
      {
        key: 'heatmapHistory',
        label: 'Heatmap history',
        type: 'select',
        numeric: true,
        options: [10, 30, 60, 120, 300, 600].map((v) => ({ value: String(v), label: v < 60 ? `${v} s` : `${v / 60} min` })),
      },
      { key: 'showHeatmap', label: 'Show heatmap', type: 'toggle' },
      { key: 'showMotion', label: 'Show motion regions', type: 'toggle' },
    ],
  },
  {
    title: 'Radar',
    fields: [
      { key: 'radarRange', label: 'Radar range (estimated)', type: 'range', min: 2, max: 30, step: 1, format: (v) => `${v} m` },
      {
        key: 'cameraFov',
        label: 'Camera horizontal FOV',
        type: 'range',
        min: 40,
        max: 120,
        step: 1,
        format: (v) => `${v}°`,
        help: 'Used to convert image position to bearing. Typical laptop webcams are 60–78°. Set it from your camera spec for better bearings.',
      },
    ],
  },
  {
    title: 'Display',
    fields: [
      {
        key: 'animationLevel',
        label: 'Animation level',
        type: 'select',
        options: [
          { value: 'full', label: 'Full' },
          { value: 'low', label: 'Low' },
          { value: 'off', label: 'Off' },
        ],
      },
      { key: 'showBoxes', label: 'Bounding boxes', type: 'toggle' },
      { key: 'showIds', label: 'Tracking IDs', type: 'toggle' },
      { key: 'showVectors', label: 'Movement vectors', type: 'toggle' },
      { key: 'showTrails', label: 'Trails', type: 'toggle' },
      { key: 'showConfidence', label: 'Confidence', type: 'toggle' },
      { key: 'showAnalytics', label: 'Analytics panel (mode D)', type: 'toggle' },
      { key: 'showDebug', label: 'Debug panel', type: 'toggle' },
      {
        key: 'theme',
        label: 'Interface',
        type: 'select',
        options: [
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' },
        ],
      },
    ],
  },
  {
    title: 'Capture',
    fields: [
      { key: 'recordOverlays', label: 'Record with overlays', type: 'toggle' },
      { key: 'snapshotOverlays', label: 'Snapshot overlays by default', type: 'toggle' },
    ],
  },
];

/** Settings drawer generated from a schema and kept in sync with the store. */
export class SettingsPanel {
  private inputs = new Map<keyof Settings, HTMLInputElement | HTMLSelectElement>();
  private outputs = new Map<keyof Settings, HTMLOutputElement>();

  constructor(
    private readonly host: HTMLElement,
    private readonly store: SettingsStore,
    private readonly onReset: () => void,
  ) {
    this.build();
    store.on('change', () => this.sync());
  }

  setOptions(key: keyof Settings, options: Option[]): void {
    const el = this.inputs.get(key);
    if (!(el instanceof HTMLSelectElement)) return;
    el.innerHTML = options.map((o) => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
    this.syncOne(key);
  }

  /** Displays a value without writing it to the store (e.g. the camera's actual resolution). */
  showValue(key: keyof Settings, value: string): void {
    const el = this.inputs.get(key);
    if (el) el.value = value;
  }

  private build(): void {
    const frag = document.createDocumentFragment();
    for (const group of GROUPS) {
      const g = document.createElement('section');
      g.className = 'set-group';
      g.innerHTML = `<h4>${group.title}</h4>`;
      for (const f of group.fields) g.appendChild(this.field(f));
      frag.appendChild(g);
    }
    const foot = document.createElement('section');
    foot.className = 'set-group';
    foot.innerHTML = `
      <h4>Install as an app</h4>
      <p class="set-note">Chrome / Edge: use the <b>Install app</b> button in the toolbar (or the install icon in the address bar).
      iPhone / iPad (Safari): Share → <b>Add to Home Screen</b>. Android: menu → <b>Install app</b>.
      Once installed it opens in its own window and works offline.</p>
      <h4>Privacy</h4>
      <p class="set-note">Camera frames are processed only inside this browser tab (TensorFlow.js + canvas). Nothing is uploaded.
      Recordings and snapshots stay in memory until you choose to save them. Only these preferences are stored, in this browser's local storage.
      The detection model is loaded from this site, or, if not bundled, downloaded once from Google's public TF.js model bucket.</p>
      <div class="row-actions"><button class="btn btn-sm" type="button" data-reset>Reset to defaults</button></div>`;
    foot.querySelector<HTMLButtonElement>('[data-reset]')!.onclick = () => this.onReset();
    frag.appendChild(foot);
    this.host.appendChild(frag);
    this.sync();
  }

  private field(f: Field): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'field';
    const id = `set-${String(f.key)}`;
    if (f.type === 'toggle') {
      wrap.innerHTML = `<label class="toggle" for="${id}"><input type="checkbox" id="${id}" /><span></span>${f.label}</label>`;
      const input = wrap.querySelector('input')!;
      input.addEventListener('change', () => this.store.set({ [f.key]: input.checked } as Partial<Settings>));
      this.inputs.set(f.key, input);
    } else if (f.type === 'range') {
      wrap.innerHTML = `<label for="${id}">${f.label}</label><output for="${id}"></output>
        <input type="range" id="${id}" min="${f.min}" max="${f.max}" step="${f.step}" />`;
      const input = wrap.querySelector('input')!;
      const out = wrap.querySelector('output')!;
      input.addEventListener('input', () => {
        out.textContent = f.format(Number(input.value));
        this.store.set({ [f.key]: Number(input.value) } as Partial<Settings>);
      });
      this.inputs.set(f.key, input);
      this.outputs.set(f.key, out);
      (out as HTMLOutputElement & { _fmt?: (v: number) => string })._fmt = f.format;
    } else {
      wrap.innerHTML = `<label for="${id}">${f.label}</label><select id="${id}"></select>`;
      const sel = wrap.querySelector('select')!;
      if (f.options !== 'dynamic') {
        sel.innerHTML = f.options.map((o) => `<option value="${o.value}">${escapeHtml(o.label)}</option>`).join('');
      }
      sel.addEventListener('change', () => {
        const raw = sel.value;
        const value = f.numeric ? Number(raw) : f.key === 'cameraId' ? raw || null : raw;
        this.store.set({ [f.key]: value } as Partial<Settings>);
      });
      this.inputs.set(f.key, sel);
    }
    if (f.help) {
      const help = document.createElement('div');
      help.className = 'help';
      help.textContent = f.help;
      wrap.appendChild(help);
    }
    return wrap;
  }

  private sync(): void {
    for (const key of this.inputs.keys()) this.syncOne(key);
  }

  private syncOne(key: keyof Settings): void {
    const el = this.inputs.get(key);
    if (!el) return;
    const v = this.store.get(key);
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      el.checked = Boolean(v);
    } else {
      const s = v == null ? '' : String(v);
      const known = !(el instanceof HTMLSelectElement) || Array.from(el.options).some((o) => o.value === s);
      if (known && el.value !== s) el.value = s;
      const out = this.outputs.get(key) as (HTMLOutputElement & { _fmt?: (v: number) => string }) | undefined;
      if (out?._fmt) out.textContent = out._fmt(Number(v));
    }
  }
}
