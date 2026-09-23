import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Tracker } from '../../src/tracking/Tracker.ts';

/**
 * Replays real detector output recorded from the camera feed (fixtures/
 * real-detections.json): a person, a dog sitting still near the right edge,
 * and a second dog that walks in front of it twice. The detector briefly
 * loses the sitting dog and reports one growing merged box over both.
 */
type Fixture = {
  frameWidth: number;
  frameHeight: number;
  frames: { t: number; m: { label: string; score: number; box: { x: number; y: number; w: number; h: number }; appearance: number[] | null }[] }[];
};
const load = (name: string) => JSON.parse(readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8')) as Fixture;
/** Two recordings: tracking started at different points in the clip. */
const FIXTURES = ['real-detections.json', 'real-detections-early.json'];

function replay(data: Fixture) {
  const tr = new Tracker({ frameWidth: data.frameWidth, frameHeight: data.frameHeight });
  const lifetimes = new Map<number, { label: string; minX: number; maxX: number; first: number; last: number }>();
  const parkedIds: number[] = [];
  for (const f of data.frames) {
    tr.update(f.m.map((d) => ({ ...d, appearance: d.appearance ? Float32Array.from(d.appearance) : null })), f.t);
    for (const t of tr.getTracks()) {
      const e = lifetimes.get(t.id) ?? { label: t.label, minX: t.x, maxX: t.x, first: f.t, last: f.t };
      e.minX = Math.min(e.minX, t.x);
      e.maxX = Math.max(e.maxX, t.x);
      e.last = f.t;
      lifetimes.set(t.id, e);
    }
    const parked = tr.getTracks().find((t) => Math.abs(t.x - 0.875) < 0.04 && t.y > 0.6);
    if (parked) parkedIds.push(parked.id);
  }
  return { lifetimes, parkedIds };
}

for (const name of FIXTURES) {
  const data = load(name);

  test(`${name}: the sitting dog keeps one ID while another dog walks in front of it`, () => {
    const { parkedIds } = replay(data);
    assert.ok(parkedIds.length > 80, 'sitting dog tracked for most of the clip');
    assert.equal(new Set(parkedIds).size, 1, `sitting dog IDs: ${[...new Set(parkedIds)].join(',')}`);
  });

  test(`${name}: the sitting dog's ID never gets dragged away by the walker`, () => {
    const { parkedIds, lifetimes } = replay(data);
    const e = lifetimes.get(parkedIds[0])!;
    assert.ok(e.minX > 0.78, `sitting dog's track stayed near its spot (min x ${e.minX.toFixed(2)})`);
  });

  test(`${name}: the person keeps one ID for the whole clip`, () => {
    const { lifetimes } = replay(data);
    const people = [...lifetimes.values()].filter((e) => e.label === 'person' && e.last - e.first > 5);
    assert.equal(people.length, 1);
  });
}
