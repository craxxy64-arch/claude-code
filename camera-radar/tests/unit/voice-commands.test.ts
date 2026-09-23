import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCommand, stripWakeWord, WAKE_WORD } from '../../src/voice/commands.ts';

test('wake word constant matches the stripper', () => {
  assert.equal(WAKE_WORD, 'xcv');
});

test('strips various wake-word phrasings', () => {
  assert.deepEqual(stripWakeWord('Xcv, start the camera'), { hadWakeWord: true, rest: 'start the camera' });
  assert.deepEqual(stripWakeWord('hey xcv start the camera'), { hadWakeWord: true, rest: 'start the camera' });
  assert.deepEqual(stripWakeWord('okay xcv, status report'), { hadWakeWord: true, rest: 'status report' });
  assert.deepEqual(stripWakeWord('start the camera'), { hadWakeWord: false, rest: 'start the camera' });
});

test('push-to-talk mode does not require the wake word', () => {
  const p = parseCommand('start the camera', false);
  assert.deepEqual(p?.intent, { type: 'start-camera' });
});

test('always-listening mode requires the wake word', () => {
  assert.equal(parseCommand('start the camera', true), null);
  const p = parseCommand('xcv start the camera', true);
  assert.deepEqual(p?.intent, { type: 'start-camera' });
});

test('parses camera on/off', () => {
  assert.deepEqual(parseCommand('turn on the camera', false)?.intent, { type: 'start-camera' });
  assert.deepEqual(parseCommand('stop the camera', false)?.intent, { type: 'stop-camera' });
});

test('parses mode switches by name', () => {
  assert.deepEqual(parseCommand('switch to radar mode', false)?.intent, { type: 'set-mode', mode: 'radar' });
  assert.deepEqual(parseCommand('console mode', false)?.intent, { type: 'set-mode', mode: 'full' });
  assert.deepEqual(parseCommand('split view', false)?.intent, { type: 'set-mode', mode: 'split' });
});

test('parses recording and snapshot', () => {
  assert.deepEqual(parseCommand('start recording', false)?.intent, { type: 'record', on: true });
  assert.deepEqual(parseCommand('stop recording', false)?.intent, { type: 'record', on: false });
  assert.deepEqual(parseCommand('take a snapshot', false)?.intent, { type: 'snapshot' });
});

test('parses target selection with digit or word numbers', () => {
  assert.deepEqual(parseCommand('select target 3', false)?.intent, { type: 'select-target', id: 3 });
  assert.deepEqual(parseCommand('show target number seven', false)?.intent, { type: 'select-target', id: 7 });
  assert.deepEqual(parseCommand('focus on target twelve', false)?.intent, { type: 'select-target', id: 12 });
});

test('parses confidence threshold as a fraction', () => {
  assert.deepEqual(parseCommand('set confidence to 80 percent', false)?.intent, { type: 'set-confidence', value: 0.8 });
  assert.deepEqual(parseCommand('set confidence threshold to 50', false)?.intent, { type: 'set-confidence', value: 0.5 });
});

test('parses status report phrasing', () => {
  assert.deepEqual(parseCommand('status report', false)?.intent, { type: 'status-report' });
  assert.deepEqual(parseCommand('give me a status report', false)?.intent, { type: 'status-report' });
  assert.deepEqual(parseCommand('sitrep', false)?.intent, { type: 'status-report' });
});

test('strips politeness fillers', () => {
  assert.deepEqual(parseCommand('can you take a snapshot please', false)?.intent, { type: 'snapshot' });
});

test('unrecognised speech yields no command', () => {
  assert.equal(parseCommand('what is the weather today', false), null);
  assert.equal(parseCommand('', false), null);
  assert.equal(parseCommand('   ', true), null);
});

test('bare wake word alone is a greeting', () => {
  assert.deepEqual(parseCommand('xcv', true)?.intent, { type: 'greeting' });
});
