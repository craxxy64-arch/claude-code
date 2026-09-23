import { Emitter } from './emitter.ts';

export type LogLevel = 'info' | 'warn' | 'error';

export interface LogEntry {
  t: number;
  level: LogLevel;
  source: string;
  message: string;
}

const MAX_ENTRIES = 200;

class Logger extends Emitter<{ entry: LogEntry }> {
  readonly entries: LogEntry[] = [];
  errorCount = 0;
  warnCount = 0;

  log(level: LogLevel, source: string, message: string): void {
    const entry: LogEntry = { t: Date.now(), level, source, message };
    this.entries.push(entry);
    if (this.entries.length > MAX_ENTRIES) this.entries.shift();
    if (level === 'error') this.errorCount++;
    if (level === 'warn') this.warnCount++;
    const line = `[${source}] ${message}`;
    if (level === 'error') console.error(line);
    else if (level === 'warn') console.warn(line);
    else console.info(line);
    this.emit('entry', entry);
  }

  info(source: string, message: string): void {
    this.log('info', source, message);
  }
  warn(source: string, message: string): void {
    this.log('warn', source, message);
  }
  error(source: string, err: unknown): void {
    this.log('error', source, errorMessage(err));
  }
}

export function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.name && err.name !== 'Error' ? `${err.name}: ${err.message}` : err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export const logger = new Logger();
