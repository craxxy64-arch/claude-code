import { test } from 'node:test';
import assert from 'node:assert/strict';
import { describeStatus, speakFor } from '../../src/voice/responses.ts';
import type { VoiceStatusSnapshot } from '../../src/voice/types.ts';

const status = (patch: Partial<VoiceStatusSnapshot> = {}): VoiceStatusSnapshot => ({
  cameraOn: true,
  cameraLabel: 'Webcam',
  targetsTracked: 2,
  moving: 1,
  people: 1,
  modelStatus: 'ready',
  processingFps: 6.4,
  motionLevel: 'small',
  recording: false,
  ...patch,
});

test('status report mentions camera-off first when camera is off', () => {
  const text = describeStatus(status({ cameraOn: false }));
  assert.match(text, /Camera is off/);
});

test('status report includes real numbers, not placeholders', () => {
  const text = describeStatus(status());
  assert.match(text, /Tracking 2 targets/);
  assert.match(text, /1 moving/);
  assert.match(text, /1 person detected/);
  assert.match(text, /6\.4 frames per second/);
});

test('status report singularises one target correctly', () => {
  const text = describeStatus(status({ targetsTracked: 1 }));
  assert.match(text, /Tracking 1 target,/);
});

test('status report mentions recording when active', () => {
  assert.match(describeStatus(status({ recording: true })), /Recording is active/);
  assert.doesNotMatch(describeStatus(status({ recording: false })), /Recording/);
});

test('status report falls back when the model is not ready', () => {
  const text = describeStatus(status({ modelStatus: 'loading' }));
  assert.match(text, /Detection model is loading/);
});

test('select-target response differs when the target does not exist', () => {
  const found = speakFor({ type: 'select-target', id: 3 }, { ok: true, detail: 'person' });
  const missing = speakFor({ type: 'select-target', id: 99 }, { ok: false, detail: null });
  assert.match(found, /Target 3 selected — person/);
  assert.match(missing, /don't see a target with ID 99/);
});

test('set-mode names the console mode, not the raw layout key', () => {
  assert.match(speakFor({ type: 'set-mode', mode: 'full' }, { ok: true }), /console mode/);
});

test('every intent produces non-empty speech', () => {
  const intents: Parameters<typeof speakFor>[0][] = [
    { type: 'start-camera' }, { type: 'stop-camera' }, { type: 'open-video' },
    { type: 'set-mode', mode: 'radar' }, { type: 'mirror', on: true }, { type: 'snapshot' },
    { type: 'record', on: true }, { type: 'heatmap', on: false }, { type: 'reset-heatmap' },
    { type: 'settings', open: true }, { type: 'debug', open: false }, { type: 'fullscreen-radar', on: true },
    { type: 'deselect-target' }, { type: 'set-confidence', value: 0.5 }, { type: 'greeting' },
    { type: 'stop-listening' }, { type: 'help' },
  ];
  for (const intent of intents) assert.ok(speakFor(intent, { ok: true }).length > 0, JSON.stringify(intent));
});

test('status report names the closest target and when it will reach the camera', () => {
  const text = describeStatus(status({ closest: { id: 2, label: 'dog', range: 2.4, trend: 'closing', timeToReach: 4.2 }, hidden: 1 }));
  assert.match(text, /Closest is dog 2, about 2\.4 metres, estimated, closing — reaches the camera in about 4 seconds/);
  assert.match(text, /1 target is hidden/);
});
