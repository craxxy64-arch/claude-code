/**
 * Turns an intent's outcome into something to say. Kept separate from
 * VoiceAssistant so the wording can be unit-tested without any Speech APIs.
 * Original phrasing — an assistant persona, not a copy of any film character.
 */
import type { VoiceIntent, VoiceStatusSnapshot } from './types.ts';

export interface Outcome {
  ok: boolean;
  /** Extra data a handler resolved (e.g. whether a target ID existed). */
  detail?: string | null;
}

const MODE_NAME: Record<string, string> = { camera: 'camera', radar: 'radar', split: 'split', full: 'console' };

export function describeStatus(s: VoiceStatusSnapshot): string {
  if (!s.cameraOn) return "Camera is off. Say 'start the camera' to bring me online.";
  const parts = [`Camera live${s.cameraLabel ? ` on ${s.cameraLabel}` : ''}.`];
  parts.push(
    s.modelStatus === 'ready'
      ? `Tracking ${s.targetsTracked} target${s.targetsTracked === 1 ? '' : 's'}, ${s.moving} moving, ${s.people} ${s.people === 1 ? 'person' : 'people'} detected.`
      : `Detection model is ${s.modelStatus}.`,
  );
  parts.push(`Processing at ${s.processingFps.toFixed(1)} frames per second.`);
  if (s.closest) {
    const c = s.closest;
    let line = `Closest is ${c.label} ${c.id}, about ${c.range.toFixed(1)} metres, estimated`;
    if (c.trend === 'closing') line += c.timeToReach != null && c.timeToReach < 30 ? `, closing — reaches the camera in about ${Math.round(c.timeToReach)} seconds` : ', closing';
    else if (c.trend === 'away') line += ', moving away';
    else if (c.trend === 'crossing') line += ', crossing';
    parts.push(`${line}.`);
  }
  if (s.hidden) parts.push(`${s.hidden} target${s.hidden === 1 ? ' is' : 's are'} hidden behind something.`);
  if (s.motionLevel !== 'none') parts.push(`Motion level ${s.motionLevel}.`);
  if (s.recording) parts.push('Recording is active.');
  return parts.join(' ');
}

export function speakFor(intent: VoiceIntent, outcome: Outcome, status?: VoiceStatusSnapshot): string {
  switch (intent.type) {
    case 'start-camera':
      return outcome.ok ? 'Starting the camera.' : "I couldn't start the camera.";
    case 'stop-camera':
      return 'Camera stopped.';
    case 'open-video':
      return 'Opening the file picker.';
    case 'set-mode':
      return `Switching to ${MODE_NAME[intent.mode]} mode.`;
    case 'mirror':
      return intent.on ? 'Mirroring the view.' : 'Unmirrored.';
    case 'snapshot':
      return 'Snapshot captured.';
    case 'record':
      return intent.on ? 'Recording started.' : 'Recording stopped.';
    case 'heatmap':
      return intent.on ? 'Showing the motion heatmap.' : 'Heatmap hidden.';
    case 'reset-heatmap':
      return 'Heatmap cleared.';
    case 'settings':
      return intent.open ? 'Opening settings.' : 'Closing settings.';
    case 'debug':
      return intent.open ? 'Debug panel open.' : 'Debug panel closed.';
    case 'fullscreen-radar':
      return intent.on ? 'Radar fullscreen.' : 'Exiting fullscreen.';
    case 'select-target':
      return outcome.detail ? `Target ${intent.id} selected — ${outcome.detail}.` : `I don't see a target with ID ${intent.id} right now.`;
    case 'deselect-target':
      return 'Target deselected.';
    case 'set-confidence':
      return `Confidence threshold set to ${Math.round(intent.value * 100)} percent.`;
    case 'status-report':
      return status ? describeStatus(status) : 'No status available yet.';
    case 'greeting':
      return "Xcv here. Say 'help' to hear what I can do.";
    case 'stop-listening':
      return 'Standing by.';
    case 'help':
      return "I can start or stop the camera, switch modes, control recording and snapshots, open settings, select a target by number, or give you a status report. Just ask.";
  }
}

export const NOT_UNDERSTOOD = [
  "I didn't catch a command in that.",
  "Sorry, I didn't get that one.",
  "Not sure what you're asking — try 'help'.",
];
