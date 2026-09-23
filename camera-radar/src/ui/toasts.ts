import { $ } from './dom.ts';

export type ToastTone = 'info' | 'warn' | 'alert';

export function toast(message: string, tone: ToastTone = 'info', ms = 4200, action?: { label: string; run: () => void }): void {
  const host = $('toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.dataset.tone = tone;
  el.textContent = message;
  if (action) {
    const b = document.createElement('button');
    b.className = 'btn btn-sm';
    b.style.marginLeft = '10px';
    b.textContent = action.label;
    b.onclick = () => {
      action.run();
      el.remove();
    };
    el.appendChild(b);
  }
  host.appendChild(el);
  while (host.children.length > 4) host.firstElementChild?.remove();
  window.setTimeout(() => el.remove(), ms);
}
