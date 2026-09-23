import { logger, type LogEntry } from '../utils/logger.ts';
import { escapeHtml } from './dom.ts';
import { formatClock } from '../utils/format.ts';

export type DebugRows = [string, string][];

export class DebugPanel {
  constructor(private readonly body: HTMLElement) {}

  update(sections: { title: string; rows: DebugRows }[]): void {
    const tables = sections
      .map(
        (s) =>
          `<h5>${escapeHtml(s.title)}</h5><table>${s.rows
            .map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
            .join('')}</table>`,
      )
      .join('');
    const log = logger.entries
      .slice(-60)
      .reverse()
      .map((e: LogEntry) => `<li data-level="${e.level}">${formatClock(e.t)} [${escapeHtml(e.source)}] ${escapeHtml(e.message)}</li>`)
      .join('');
    // Preserve scroll position of the log while updating.
    const prevLog = this.body.querySelector('.debug-log');
    const scroll = prevLog?.scrollTop ?? 0;
    this.body.innerHTML = `${tables}<h5>Errors / warnings / info (${logger.errorCount} errors, ${logger.warnCount} warnings)</h5><ul class="debug-log">${log || '<li>—</li>'}</ul>`;
    const nextLog = this.body.querySelector('.debug-log');
    if (nextLog) nextLog.scrollTop = scroll;
  }
}
