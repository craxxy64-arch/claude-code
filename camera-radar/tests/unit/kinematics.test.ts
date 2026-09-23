import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitMotion, rangeUncertainty } from '../../src/radar/kinematics.ts';

const trail = (fn: (t: number) => [number, number], n = 12, dt = 0.1) =>
  Array.from({ length: n }, (_, i) => {
    const t = i * dt;
    const [X, Y] = fn(t);
    return { t, X, Y };
  });

test('a target walking straight at the camera is closing, with time to reach', () => {
  const m = fitMotion(trail((t) => [0, 5 - 1.0 * t]), 1.1)!;
  assert.equal(m.trend, 'closing');
  assert.ok(Math.abs(m.rangeRate + 1) < 0.01, `rate ${m.rangeRate}`);
  assert.ok(Math.abs(m.timeToReach! - 3.9) < 0.05, `ttr ${m.timeToReach}`);
});

test('a target walking away is "away" with no time to reach', () => {
  const m = fitMotion(trail((t) => [0, 3 + 0.8 * t]), 1.1)!;
  assert.equal(m.trend, 'away');
  assert.equal(m.timeToReach, null);
});

test('a target walking sideways at constant distance is crossing', () => {
  const m = fitMotion(trail((t) => [4 * Math.sin(-0.3 + 0.12 * t), 4 * Math.cos(-0.3 + 0.12 * t)]), 1.1)!;
  assert.equal(m.trend, 'crossing');
  assert.ok(Math.abs(m.rangeRate) < 0.05);
});

test('range jitter on a still target reads as steady, not closing/away', () => {
  let s = 3;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647 - 0.5) * 0.12;
  const m = fitMotion(trail(() => [0.5 + rnd(), 3 + rnd()]), 1.1)!;
  assert.equal(m.trend, 'steady');
});

test('too little history gives no motion estimate', () => {
  assert.equal(fitMotion(trail((t) => [0, 5 - t], 3), 0.2), null);
});

test('uncertainty is smallest for measured depth and largest for rough estimates', () => {
  const base = { bearing: 0, range: 3, X: 0, Y: 3, basis: '' };
  assert.ok(rangeUncertainty({ ...base, measured: true, quality: 'measured' }) < rangeUncertainty({ ...base, measured: false, quality: 'estimate' }));
  assert.ok(rangeUncertainty({ ...base, measured: false, quality: 'estimate' }) < rangeUncertainty({ ...base, measured: false, quality: 'rough' }));
});
