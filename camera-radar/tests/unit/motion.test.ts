import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyseDiff, classifyLevel, diffThreshold, findBlobs } from '../../src/motion/analysis.ts';
import { MotionHeatmap } from '../../src/motion/MotionHeatmap.ts';

const W = 40;
const H = 30;

test('frame differencing finds a moved square as one blob', () => {
  const a = new Uint8Array(W * H).fill(50);
  const b = new Uint8Array(W * H).fill(50);
  for (let y = 10; y < 20; y++) for (let x = 5; x < 15; x++) b[y * W + x] = 200;
  const r = analyseDiff(a, b, W, H, 5, diffThreshold(50));
  assert.ok(Math.abs(r.changed - 100 / (W * H)) < 1e-6);
  const blobs = findBlobs(r.cells, r.gridW, r.gridH, 0.1, 1);
  assert.equal(blobs.length, 1);
  assert.ok(Math.abs(blobs[0].box.x - 5 / W) < 1e-6);
  assert.ok(Math.abs(blobs[0].box.w - 10 / W) < 1e-6);
});

test('noise below threshold is ignored', () => {
  const a = new Uint8Array(W * H).fill(100);
  const b = a.map((v, i) => v + (i % 3) * 3);
  const r = analyseDiff(a, Uint8Array.from(b), W, H, 5, diffThreshold(50));
  assert.equal(r.changed, 0);
  assert.equal(classifyLevel(r.changed, 0), 'none');
});

test('higher sensitivity lowers the pixel threshold', () => {
  assert.ok(diffThreshold(100) < diffThreshold(0));
});

test('heatmap keeps only the configured history window', () => {
  const hm = new MotionHeatmap(30); // 1 s buckets
  const cells = new Float32Array(4).fill(1);
  hm.add(cells, 2, 2, 0.5);
  assert.equal(hm.heat(0.5)!.max, 1);
  hm.add(cells, 2, 2, 10);
  assert.equal(hm.heat(10)!.max, 2);
  // 40 s later the first two samples have aged out of the 30 s window.
  hm.add(new Float32Array(4).fill(0.5), 2, 2, 50);
  assert.equal(hm.heat(50)!.max, 0.5);
  hm.reset();
  assert.equal(hm.heat(50), null);
});
