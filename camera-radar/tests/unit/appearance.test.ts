import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blendSignature, computeSignature, similarity, SIGNATURE_SIZE } from '../../src/tracking/appearance.ts';

function block(w: number, h: number, rgb: [number, number, number], noise = 0, seed = 7): Uint8ClampedArray {
  const px = new Uint8ClampedArray(w * h * 4);
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647 - 0.5) * 2 * noise;
  for (let i = 0; i < w * h; i++) {
    px[i * 4] = rgb[0] + rnd();
    px[i * 4 + 1] = rgb[1] + rnd();
    px[i * 4 + 2] = rgb[2] + rnd();
    px[i * 4 + 3] = 255;
  }
  return px;
}

test('signature is normalised and the right size', () => {
  const sig = computeSignature(block(10, 10, [200, 40, 40]), 10, 10)!;
  assert.equal(sig.length, SIGNATURE_SIZE);
  const total = sig.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(total - 1) < 1e-5);
});

test('too few pixels yields no signature', () => {
  assert.equal(computeSignature(block(2, 2, [200, 0, 0]), 2, 2), null);
});

test('same colour under noise is highly similar', () => {
  const a = computeSignature(block(16, 16, [180, 90, 30], 12, 1), 16, 16)!;
  const b = computeSignature(block(16, 16, [180, 90, 30], 12, 99), 16, 16)!;
  assert.ok(similarity(a, b) > 0.85, `got ${similarity(a, b)}`);
});

test('different colours are clearly dissimilar', () => {
  const blue = computeSignature(block(16, 16, [30, 60, 200]), 16, 16)!;
  const orange = computeSignature(block(16, 16, [220, 120, 30]), 16, 16)!;
  assert.ok(similarity(blue, orange) < 0.2, `got ${similarity(blue, orange)}`);
});

test('grey objects are distinguished by lightness', () => {
  const dark = computeSignature(block(16, 16, [40, 40, 40]), 16, 16)!;
  const light = computeSignature(block(16, 16, [230, 230, 230]), 16, 16)!;
  assert.ok(similarity(dark, light) < 0.2);
  assert.ok(similarity(dark, dark) > 0.99);
});

test('a small hue shift (lighting) still reads as the same object', () => {
  const a = computeSignature(block(16, 16, [200, 100, 40]), 16, 16)!;
  const b = computeSignature(block(16, 16, [200, 115, 40]), 16, 16)!;
  assert.ok(similarity(a, b) > 0.6, `got ${similarity(a, b)}`);
});

test('blending moves toward the new signature and stays normalised', () => {
  const red = computeSignature(block(16, 16, [220, 30, 30]), 16, 16)!;
  const blue = computeSignature(block(16, 16, [30, 30, 220]), 16, 16)!;
  const mix = blendSignature(red, blue, 0.5);
  assert.ok(Math.abs(mix.reduce((a, b) => a + b, 0) - 1) < 1e-5);
  assert.ok(similarity(mix, red) > similarity(blue, red));
  assert.ok(similarity(mix, blue) > similarity(red, blue));
});
