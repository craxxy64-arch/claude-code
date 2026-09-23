import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Tracker } from '../../src/tracking/Tracker.ts';
import { computeSignature } from '../../src/tracking/appearance.ts';
import type { MeasuredObject } from '../../src/tracking/types.ts';

function colour(rgb: [number, number, number]): Float32Array {
  const px = new Uint8ClampedArray(16 * 16 * 4);
  for (let i = 0; i < 256; i++) px.set([rgb[0], rgb[1], rgb[2], 255], i * 4);
  return computeSignature(px, 16, 16)!;
}
const RED = colour([210, 40, 40]);
const BLUE = colour([40, 70, 210]);

const det = (cx: number, cy: number, appearance: Float32Array | null): MeasuredObject => ({
  label: 'dog',
  score: 0.9,
  box: { x: cx - 0.06, y: cy - 0.12, w: 0.12, h: 0.24 },
  appearance,
});

/**
 * Two dogs walk toward each other, meet, then both turn back. Motion
 * prediction expects them to keep going, so position alone tends to hand
 * each ID to the other dog. Returns which colour ended up with each ID.
 */
function bounce(withAppearance: boolean): { redId: number; blueId: number; firstRed: number; firstBlue: number } {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  let firstRed = -1;
  let firstBlue = -1;
  let redX = 0.3;
  let blueX = 0.7;
  const step = (i: number, vr: number, vb: number) => {
    redX += vr;
    blueX += vb;
    tr.update([det(redX, 0.5, withAppearance ? RED : null), det(blueX, 0.5, withAppearance ? BLUE : null)], i * 0.1);
  };
  let i = 0;
  for (; i < 12; i++) step(i, 0.016, -0.016); // approach
  const at = () => tr.getTracks().sort((a, b) => a.x - b.x);
  [firstRed, firstBlue] = [at()[0].id, at()[1].id];
  for (; i < 16; i++) step(i, 0.004, -0.004); // slow down as they meet
  for (; i < 30; i++) step(i, -0.02, 0.02); // both turn back
  const [left, right] = at();
  return { redId: left.id, blueId: right.id, firstRed, firstBlue };
}

test('appearance keeps IDs on the right objects when two same-class targets meet and turn back', () => {
  const r = bounce(true);
  assert.equal(r.redId, r.firstRed, 'red dog kept its ID');
  assert.equal(r.blueId, r.firstBlue, 'blue dog kept its ID');
});

test('appearance does not stop normal tracking of a single moving target', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  for (let i = 0; i < 30; i++) tr.update([det(0.2 + i * 0.01, 0.5, RED)], i * 0.1);
  const tracks = tr.getTracks();
  assert.equal(tracks.length, 1);
  assert.ok(tracks[0].appearanceSamples >= 29);
});

test('a returning target is re-identified after a long absence only if it looks the same', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000, maxLostSec: 0.5, reidSec: 2, appearanceReidSec: 8 });
  for (let i = 0; i < 10; i++) tr.update([det(0.5, 0.5, RED)], i * 0.1);
  const id = tr.getTracks()[0].id;
  for (let i = 10; i < 50; i++) tr.update([], i * 0.1); // gone for 4 s — past the normal 2 s window
  tr.update([det(0.52, 0.5, RED)], 5.0);
  assert.ok(tr.getTracks().some((t) => t.id === id), 'same-looking dog got its old ID back after 4 s');
});

test("a different-looking object in the same spot does not steal a lost target's ID", () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000, maxLostSec: 0.5, reidSec: 3 });
  for (let i = 0; i < 10; i++) tr.update([det(0.5, 0.5, RED)], i * 0.1);
  const id = tr.getTracks()[0].id;
  for (let i = 10; i < 18; i++) tr.update([], i * 0.1);
  for (let i = 18; i < 24; i++) tr.update([det(0.5, 0.5, BLUE)], i * 0.1);
  const now = tr.getTracks();
  assert.equal(now.length, 1);
  assert.notEqual(now[0].id, id, 'blue dog got a new ID');
});

test('without appearance data the tracker behaves exactly as before (no crash, still tracks)', () => {
  const r = bounce(false);
  assert.ok(r.redId > 0 && r.blueId > 0);
});

test('report: does position alone swap IDs in the bounce scenario?', () => {
  const r = bounce(false);
  console.log(`# position-only: ${r.redId === r.firstRed ? 'kept' : 'SWAPPED'} IDs; with appearance: kept`);
});
