import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MonocularProjection } from '../../src/radar/projection.ts';

test('bearing follows the pinhole model', () => {
  const p = new MonocularProjection();
  p.hFovDeg = 90;
  assert.equal(Math.round(p.bearingOf(0.5)), 0);
  assert.equal(Math.round(p.bearingOf(1)), 45);
  assert.equal(Math.round(p.bearingOf(0)), -45);
  assert.equal(Math.round(p.bearingOf(0.75)), 27); // atan(0.5)
});

test('size-based range estimate for a fully visible person', () => {
  const p = new MonocularProjection();
  p.hFovDeg = 70;
  p.aspect = 16 / 9;
  // Person occupying half the frame height at image centre.
  const r = p.project({ label: 'person', x: 0.5, y: 0.5, w: 0.1, h: 0.5 });
  const fy = 0.5 / Math.tan(((p.vFovDeg / 2) * Math.PI) / 180);
  assert.ok(Math.abs(r.range - (1.7 * fy) / 0.5) < 1e-6);
  assert.equal(r.measured, false);
  assert.equal(r.quality, 'estimate');
});

test('truncated targets fall back to width and are marked rough', () => {
  const p = new MonocularProjection();
  const r = p.project({ label: 'person', x: 0.5, y: 0.6, w: 0.3, h: 0.8 });
  assert.equal(r.quality, 'rough');
});

test('depth provider overrides the estimate', () => {
  const p = new MonocularProjection();
  p.depth = { id: 'test-depth', depthAt: () => 2 };
  const r = p.project({ label: 'person', x: 0.5, y: 0.5, w: 0.1, h: 0.5 });
  assert.equal(r.measured, true);
  assert.ok(Math.abs(r.range - 2) < 1e-9);
});
