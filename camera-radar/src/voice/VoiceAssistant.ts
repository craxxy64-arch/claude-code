import { Emitter } from '../utils/emitter.ts';
import { errorMessage, logger } from '../utils/logger.ts';
import type { VoiceActions } from './actions.ts';
import { parseCommand } from './commands.ts';
import { NOT_UNDERSTOOD, speakFor } from './responses.ts';
import { getSpeechRecognitionCtor, type SpeechRecognitionLike } from './speechTypes.ts';
import type { ParsedCommand } from './types.ts';

export type VoiceState = 'unsupported' | 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';
export type ListenMode = 'push-to-talk' | 'hands-free';

export interface VoiceHeard {
  text: string;
  final: boolean;
}
export interface VoiceCommandResult {
  parsed: ParsedCommand;
  spoken: string;
}

interface VoiceEvents {
  state: VoiceState;
  heard: VoiceHeard;
  command: VoiceCommandResult;
  unrecognised: { text: string; response: string };
  error: string;
}

export interface VoiceSettings {
  rate: number; // 0.5–2
  pitch: number; // 0–2
  volume: number; // 0–1
  voiceURI: string | null;
}

/**
 * Voice control for Camera Radar's own features. Speech recognition in
 * Chrome/Edge is NOT on-device — audio is sent to the browser vendor's
 * speech service while the mic is active. It is therefore off by default,
 * a single utterance (push-to-talk) unless the user opts into hands-free
 * listening, and `state` always reflects whether the mic is live so the UI
 * can show it plainly. This module never enables the mic on its own.
 */
export class VoiceAssistant extends Emitter<VoiceEvents> {
  state: VoiceState;
  mode: ListenMode = 'push-to-talk';
  settings: VoiceSettings = { rate: 0.95, pitch: 0.75, volume: 1, voiceURI: null };
  lastHeard = '';
  lastResponse = '';

  private recognition: SpeechRecognitionLike | null = null;
  private wantListening = false;
  private speaking = false;
  private restartTimer = 0;
  private speechWatchdog = 0;

  constructor(private readonly actions: VoiceActions) {
    super();
    const Ctor = getSpeechRecognitionCtor();
    this.state = Ctor && 'speechSynthesis' in window ? 'idle' : 'unsupported';
    if (Ctor) {
      this.recognition = new Ctor();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = true;
      this.recognition.onresult = (e) => this.onResult(e);
      this.recognition.onerror = (e) => this.onError(e);
      this.recognition.onend = () => this.onEnd();
    }
  }

  isSupported(): boolean {
    return this.state !== 'unsupported';
  }

  availableVoices(): SpeechSynthesisVoice[] {
    return 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : [];
  }

  configure(patch: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...patch };
  }

  /** Hold-to-talk: a single utterance, no wake word required. */
  pushToTalkStart(): void {
    if (!this.recognition) return;
    if (this.speaking) this.interruptSpeech(); // pressing the mic always takes priority over Xcv talking
    this.mode = 'push-to-talk';
    this.wantListening = true;
    this.recognition.continuous = false;
    this.startRecognition();
  }
  pushToTalkStop(): void {
    this.wantListening = false;
    this.recognition?.stop();
  }

  /** Hands-free: keeps the mic live and requires "Xcv" before each command. */
  setHandsFree(on: boolean): void {
    if (!this.recognition) return;
    this.mode = 'hands-free';
    this.wantListening = on;
    window.clearTimeout(this.restartTimer);
    if (on) {
      this.recognition.continuous = true;
      this.startRecognition();
    } else {
      this.recognition.stop();
    }
  }

  stopAll(): void {
    this.wantListening = false;
    window.clearTimeout(this.restartTimer);
    this.recognition?.stop();
    this.interruptSpeech();
  }

  /** Cancels any in-progress utterance and clears the "speaking" state immediately. */
  private interruptSpeech(): void {
    window.clearTimeout(this.speechWatchdog);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    this.speaking = false;
  }

  dispose(): void {
    this.stopAll();
    if (this.recognition) {
      this.recognition.onresult = null;
      this.recognition.onerror = null;
      this.recognition.onend = null;
    }
  }

  speak(text: string, { silent = false } = {}): void {
    this.lastResponse = text;
    if (silent || !('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = this.settings.rate;
      u.pitch = this.settings.pitch;
      u.volume = this.settings.volume;
      const voice = this.settings.voiceURI ? this.availableVoices().find((v) => v.voiceURI === this.settings.voiceURI) : this.pickVoice();
      if (voice) u.voice = voice;
      this.speaking = true;
      this.setState('speaking');
      const finish = () => {
        window.clearTimeout(this.speechWatchdog);
        if (!this.speaking) return; // already resolved by the watchdog
        this.speaking = false;
        this.setState(this.wantListening ? 'listening' : 'idle');
      };
      u.onend = finish;
      u.onerror = finish;
      window.speechSynthesis.speak(u);
      // Some browsers/environments (no audio device, backgrounded tab) never fire onend —
      // never let that wedge the assistant in "speaking" and unable to listen again.
      const maxMs = Math.min(20000, 1200 + text.length * 90);
      this.speechWatchdog = window.setTimeout(finish, maxMs);
    } catch (err) {
      logger.warn('voice', `Speech synthesis failed: ${errorMessage(err)}`);
    }
  }

  /** Prefers a lower, calmer voice for the assistant's tone, when one exists. */
  private pickVoice(): SpeechSynthesisVoice | undefined {
    const voices = this.availableVoices().filter((v) => v.lang.startsWith('en'));
    return (
      voices.find((v) => /daniel|arthur|oliver|male|guy/i.test(v.name)) ??
      voices.find((v) => !/female|woman|samantha|victoria|zira/i.test(v.name)) ??
      voices[0]
    );
  }

  private startRecognition(): void {
    if (!this.recognition) return;
    try {
      this.recognition.start();
      this.setState('listening');
    } catch (err) {
      // start() throws if already started; ignore, onstart/onend will settle it.
      logger.warn('voice', `recognition.start(): ${errorMessage(err)}`);
    }
  }

  private onResult(e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }): void {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      const text = r[0].transcript;
      if (r.isFinal) {
        this.lastHeard = text.trim();
        this.emit('heard', { text: this.lastHeard, final: true });
        this.handleFinal(this.lastHeard);
      } else {
        interim += text;
      }
    }
    if (interim) this.emit('heard', { text: interim, final: false });
  }

  private handleFinal(text: string): void {
    const parsed = parseCommand(text, this.mode === 'hands-free');
    if (!parsed) {
      // In hands-free mode, ignore ambient speech that never invoked the wake word —
      // only reply "didn't understand" to something that was actually addressed to Xcv.
      const addressedToMe = this.mode === 'push-to-talk' || /\bxcv\b/i.test(text);
      if (addressedToMe && text) {
        this.setState('thinking');
        const response = NOT_UNDERSTOOD[Math.floor(Math.random() * NOT_UNDERSTOOD.length)];
        this.emit('unrecognised', { text, response });
        this.speak(response);
      }
      return;
    }
    this.setState('thinking');
    const spoken = this.execute(parsed);
    this.emit('command', { parsed, spoken });
    this.speak(spoken);
  }

  private execute(parsed: ParsedCommand): string {
    const { intent } = parsed;
    const a = this.actions;
    switch (intent.type) {
      case 'start-camera':
        a.startCamera();
        return speakFor(intent, { ok: true });
      case 'stop-camera':
        a.stopCamera();
        return speakFor(intent, { ok: true });
      case 'open-video':
        a.openVideoPicker();
        return speakFor(intent, { ok: true });
      case 'set-mode':
        a.setMode(intent.mode);
        return speakFor(intent, { ok: true });
      case 'mirror':
        a.setMirror(intent.on);
        return speakFor(intent, { ok: true });
      case 'snapshot':
        a.snapshot();
        return speakFor(intent, { ok: true });
      case 'record':
        a.setRecording(intent.on);
        return speakFor(intent, { ok: true });
      case 'heatmap':
        a.setHeatmap(intent.on);
        return speakFor(intent, { ok: true });
      case 'reset-heatmap':
        a.resetHeatmap();
        return speakFor(intent, { ok: true });
      case 'settings':
        a.setSettingsOpen(intent.open);
        return speakFor(intent, { ok: true });
      case 'debug':
        a.setDebugOpen(intent.open);
        return speakFor(intent, { ok: true });
      case 'fullscreen-radar':
        a.setFullscreenRadar(intent.on);
        return speakFor(intent, { ok: true });
      case 'select-target': {
        const label = a.selectTarget(intent.id);
        return speakFor(intent, { ok: !!label, detail: label });
      }
      case 'deselect-target':
        a.deselectTarget();
        return speakFor(intent, { ok: true });
      case 'set-confidence':
        a.setConfidence(intent.value);
        return speakFor(intent, { ok: true });
      case 'status-report':
        return speakFor(intent, { ok: true }, a.getStatus());
      case 'stop-listening':
        this.setHandsFree(false);
        return speakFor(intent, { ok: true });
      case 'greeting':
      case 'help':
        return speakFor(intent, { ok: true });
    }
  }

  private onError(e: { error: string }): void {
    if (e.error === 'no-speech' || e.error === 'aborted') return; // routine, not a real error
    logger.warn('voice', `Speech recognition error: ${e.error}`);
    this.emit('error', e.error);
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      this.wantListening = false;
      this.setState('error');
    }
  }

  private onEnd(): void {
    if (this.wantListening && this.mode === 'hands-free') {
      // Browsers stop continuous recognition after a silence; restart it.
      window.clearTimeout(this.restartTimer);
      this.restartTimer = window.setTimeout(() => this.wantListening && this.startRecognition(), 250);
      return;
    }
    this.wantListening = false;
    if (!this.speaking) this.setState('idle');
  }

  private setState(s: VoiceState): void {
    if (this.state === 'unsupported') return;
    this.state = s;
    this.emit('state', s);
  }
}
