import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hungarian } from '../../src/tracking/hungarian.ts';

test('solves a square assignment optimally', () => {
  const cost = [
    [4, 1, 3],
    [2, 0, 5],
    [3, 2, 2],
  ];
  const a = hungarian(cost);
  const total = a.reduce((s, j, i) => s + cost[i][j], 0);
  assert.equal(total, 5); // 1 + 2 + 2
  assert.equal(new Set(a).size, 3);
});

test('handles more rows than columns', () => {
  const a = hungarian([[1], [0.2], [5]]);
  assert.deepEqual(a, [-1, 0, -1]);
});

test('handles more columns than rows', () => {
  const a = hungarian([[9, 0.1, 4]]);
  assert.deepEqual(a, [1]);
});

test('empty input', () => {
  assert.deepEqual(hungarian([]), []);
  assert.deepEqual(hungarian([[], []]), [-1, -1]);
});
