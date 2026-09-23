/**
 * Pure command grammar: turns a recognised speech transcript into an intent
 * Xcv can act on. No browser APIs here, so this is unit-testable directly.
 *
 * This only ever maps to actions the Camera Radar app itself exposes
 * (camera, modes, recording, targets, settings) — a page running in a
 * browser tab has no way to control the operating system or other
 * applications, and Xcv does not pretend otherwise.
 */
import type { LayoutMode } from '../settings/Settings.ts';
import type { ParsedCommand, VoiceIntent } from './types.ts';

export const WAKE_WORD = 'xcv';

const NUMBER_WORDS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
};

function parseNumber(word: string): number | null {
  const digits = word.match(/\d+/);
  if (digits) return Number(digits[0]);
  return word in NUMBER_WORDS ? NUMBER_WORDS[word] : null;
}

/** Strips a leading wake word ("xcv", "hey xcv", "okay xcv") if present. */
export function stripWakeWord(text: string): { hadWakeWord: boolean; rest: string } {
  const m = text.match(/^\s*(?:hey|hi|ok(?:ay)?)?\s*xcv[,.\s]+(.*)$/i);
  if (m) return { hadWakeWord: true, rest: m[1].trim() };
  if (/^\s*xcv\s*$/i.test(text)) return { hadWakeWord: true, rest: '' };
  return { hadWakeWord: false, rest: text.trim() };
}

interface Rule {
  pattern: RegExp;
  build: (m: RegExpMatchArray) => VoiceIntent;
}

const MODE_NAMES: Record<string, LayoutMode> = {
  camera: 'camera',
  radar: 'radar',
  split: 'split',
  'split view': 'split',
  console: 'full',
  full: 'full',
  analytics: 'full',
  everything: 'full',
};

const RULES: Rule[] = [
  { pattern: /^(start|turn on|open|enable) (the )?camera$/, build: () => ({ type: 'start-camera' }) },
  { pattern: /^(stop|turn off|disable|close) (the )?camera$/, build: () => ({ type: 'stop-camera' }) },
  { pattern: /^(open|load|play) (a |the )?video( file)?$/, build: () => ({ type: 'open-video' }) },
  {
    pattern: /^(?:switch to|go to|show|set mode to)?\s*(camera|radar|split view|split|console|full|analytics|everything) ?(?:mode|view)?$/,
    build: (m) => ({ type: 'set-mode', mode: MODE_NAMES[m[1]] }),
  },
  { pattern: /^mirror (on|off)$/, build: (m) => ({ type: 'mirror', on: m[1] === 'on' }) },
  { pattern: /^(flip|unflip|unmirror) (the )?(camera|view|image)$/, build: () => ({ type: 'mirror', on: true }) },
  { pattern: /^(take|capture) (a )?(snapshot|photo|picture)$/, build: () => ({ type: 'snapshot' }) },
  { pattern: /^(start|begin) recording$/, build: () => ({ type: 'record', on: true }) },
  { pattern: /^(stop|end) recording$/, build: () => ({ type: 'record', on: false }) },
  { pattern: /^(show|enable|turn on) (the )?heat ?map$/, build: () => ({ type: 'heatmap', on: true }) },
  { pattern: /^(hide|disable|turn off) (the )?heat ?map$/, build: () => ({ type: 'heatmap', on: false }) },
  { pattern: /^reset (the )?heat ?map$/, build: () => ({ type: 'reset-heatmap' }) },
  { pattern: /^(open|show) settings$/, build: () => ({ type: 'settings', open: true }) },
  { pattern: /^(close|hide) settings$/, build: () => ({ type: 'settings', open: false }) },
  { pattern: /^(open|show) debug( panel)?$/, build: () => ({ type: 'debug', open: true }) },
  { pattern: /^(close|hide) debug( panel)?$/, build: () => ({ type: 'debug', open: false }) },
  { pattern: /^(go |enter )?full ?screen( the)? radar$/, build: () => ({ type: 'fullscreen-radar', on: true }) },
  { pattern: /^exit full ?screen$/, build: () => ({ type: 'fullscreen-radar', on: false }) },
  {
    pattern: /^(?:select|show|focus( on)?) target (?:number |#)?(\w+)$/,
    build: (m) => {
      const n = parseNumber(m[2]);
      return n == null ? { type: 'help' } : { type: 'select-target', id: n };
    },
  },
  { pattern: /^(deselect|close) target$/, build: () => ({ type: 'deselect-target' }) },
  {
    pattern: /^set confidence (?:to |threshold to )?(\d+)(?: ?percent| ?%)?$/,
    build: (m) => ({ type: 'set-confidence', value: Math.max(0, Math.min(100, Number(m[1]))) / 100 }),
  },
  { pattern: /^(status report|report status|give me a status report|status)$/, build: () => ({ type: 'status-report' }) },
  { pattern: /^(what'?s? (going on|happening)|sitrep)$/, build: () => ({ type: 'status-report' }) },
  { pattern: /^(hello|hi|hey)( xcv)?$/, build: () => ({ type: 'greeting' }) },
  { pattern: /^who are you\??$/, build: () => ({ type: 'greeting' }) },
  { pattern: /^(stop listening|go to sleep|that'?s all|never ?mind|cancel)$/, build: () => ({ type: 'stop-listening' }) },
  { pattern: /^(help|what can you do)\??$/, build: () => ({ type: 'help' }) },
];

const LEADING_FILLERS = /^(please |can you |could you |xcv |now )+/;
const TRAILING_FILLERS = /\s+(please|now|thanks|thank you)$/;

/**
 * Parses one recognised utterance. `requireWakeWord` controls whether a
 * leading "Xcv" is mandatory (always-listening mode) or optional
 * (push-to-talk, where the whole clip is already a deliberate command).
 */
export function parseCommand(raw: string, requireWakeWord: boolean): ParsedCommand | null {
  const text = raw.trim().toLowerCase().replace(/[.!?]+$/, '');
  if (!text) return null;
  const { hadWakeWord, rest } = stripWakeWord(text);
  if (requireWakeWord && !hadWakeWord) return null;
  const body = (hadWakeWord ? rest : text).replace(LEADING_FILLERS, '').replace(TRAILING_FILLERS, '').trim();
  if (!body) return hadWakeWord ? { intent: { type: 'greeting' }, matched: raw } : null;

  for (const rule of RULES) {
    const m = body.match(rule.pattern);
    if (m) return { intent: rule.build(m), matched: raw };
  }
  return null;
}
