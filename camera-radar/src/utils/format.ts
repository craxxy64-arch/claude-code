export const pad2 = (n: number): string => String(n).padStart(2, '0');

export const formatId = (id: number): string => `#${pad2(id)}`;

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(r)}` : `${pad2(m)}:${pad2(r)}`;
}

export function formatClock(ms: number): string {
  const d = new Date(ms);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

export const fixed = (v: number | null | undefined, digits = 0, fallback = '—'): string =>
  v == null || !Number.isFinite(v) ? fallback : v.toFixed(digits);

export const percent = (v: number | null | undefined): string =>
  v == null || !Number.isFinite(v) ? '—' : `${Math.round(v * 100)}%`;

export const titleCase = (s: string): string => s.replace(/\b\w/g, (c) => c.toUpperCase());
