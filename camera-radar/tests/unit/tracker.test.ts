import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Tracker } from '../../src/tracking/Tracker.ts';
import type { MeasuredObject, TrackEvent } from '../../src/tracking/types.ts';

const box = (cx: number, cy: number, w = 0.1, h = 0.2) => ({ x: cx - w / 2, y: cy - h / 2, w, h });
const det = (label: string, cx: number, cy: number, w = 0.1, h = 0.2, score = 0.9): MeasuredObject => ({ label, score, box: box(cx, cy, w, h) });

function collect(tr: Tracker): TrackEvent[] {
  const ev: TrackEvent[] = [];
  tr.on('event', (e) => ev.push(e));
  return ev;
}

test('confirms a track after minHits and keeps its ID while it moves', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  const ev = collect(tr);
  let id = -1;
  for (let i = 0; i < 30; i++) {
    const t = i * 0.1;
    tr.update([det('person', 0.2 + i * 0.01, 0.5)], t);
    const tracks = tr.getTracks();
    if (i >= 2) {
      assert.equal(tracks.length, 1, `frame ${i}`);
      if (id < 0) id = tracks[0].id;
      assert.equal(tracks[0].id, id, 'ID must stay stable');
    }
  }
  assert.ok(ev.some((e) => e.type === 'enter'));
  const t = tr.getTracks()[0];
  // 0.01 per 0.1 s = 0.1 frame widths/s = 100 px/s at 1000 px.
  assert.ok(Math.abs(t.speedPx - 100) < 15, `speed ${t.speedPx}`);
  assert.equal(t.movement, 'moving');
  assert.ok(t.vx > 0 && Math.abs(t.vy) < 0.01);
});

test('stationary target is classified as stationary despite jitter', () => {
  const tr = new Tracker({ frameWidth: 1280, frameHeight: 720 });
  let seed = 1;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647 - 0.5) * 0.006;
  for (let i = 0; i < 40; i++) tr.update([det('laptop', 0.5 + rnd(), 0.6 + rnd(), 0.2, 0.15)], i / 12);
  const [t] = tr.getTracks();
  assert.equal(t.movement, 'stationary');
});

test('multiple targets keep separate identities when crossing paths vertically apart', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  for (let i = 0; i < 40; i++) {
    const t = i * 0.1;
    tr.update([det('person', 0.1 + i * 0.02, 0.3), det('person', 0.9 - i * 0.02, 0.75)], t);
  }
  const tracks = tr.getTracks().sort((a, b) => a.id - b.id);
  assert.equal(tracks.length, 2);
  assert.ok(tracks[0].vx > 0 && tracks[0].y < 0.5, 'first keeps moving right on top row');
  assert.ok(tracks[1].vx < 0 && tracks[1].y > 0.5, 'second keeps moving left on bottom row');
});

test('coasts through short detection dropouts without changing ID', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  for (let i = 0; i < 10; i++) tr.update([det('dog', 0.3 + i * 0.01, 0.5)], i * 0.1);
  const id = tr.getTracks()[0].id;
  for (let i = 10; i < 14; i++) tr.update([], i * 0.1); // 0.4 s dropout
  assert.equal(tr.getTracks()[0].status, 'lost');
  tr.update([det('dog', 0.44, 0.5)], 1.4);
  assert.equal(tr.getTracks()[0].id, id);
  assert.equal(tr.getTracks()[0].status, 'active');
});

test('reports exit edge and re-identifies a target that returns quickly', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000, maxLostSec: 0.5, reidSec: 3 });
  const ev = collect(tr);
  for (let i = 0; i < 10; i++) tr.update([det('cat', 0.8 + i * 0.015, 0.5)], i * 0.1);
  const id = tr.getTracks()[0].id;
  for (let i = 10; i < 18; i++) tr.update([], i * 0.1);
  const exit = ev.find((e) => e.type === 'exit');
  assert.ok(exit, 'exit event');
  assert.equal(exit!.track.exitedVia, 'right');
  assert.equal(tr.getTracks().length, 0);
  tr.update([det('cat', 0.93, 0.5)], 2.0);
  assert.equal(tr.getTracks()[0]?.id, id, 're-identified with same ID');
  assert.ok(ev.some((e) => e.type === 'reacquired'));
});

test('entering from an edge is detected', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  const ev = collect(tr);
  for (let i = 0; i < 5; i++) tr.update([det('person', 0.04 + i * 0.02, 0.5)], i * 0.1);
  const enter = ev.find((e) => e.type === 'enter');
  assert.ok(enter);
  assert.equal(enter!.track.enteredFrom, 'left');
});

test('flags sudden movement', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  const ev = collect(tr);
  let x = 0.3;
  for (let i = 0; i < 20; i++) tr.update([det('person', x, 0.5)], i * 0.1);
  for (let i = 20; i < 26; i++) {
    x += 0.06;
    tr.update([det('person', x, 0.5)], i * 0.1);
  }
  assert.ok(ev.some((e) => e.type === 'sudden'), 'sudden event emitted');
});

test('brief class flicker does not relabel or split the track', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  for (let i = 0; i < 10; i++) tr.update([det('dog', 0.5, 0.5, 0.3, 0.3)], i * 0.1);
  tr.update([det('cat', 0.5, 0.5, 0.3, 0.3)], 1.0);
  tr.update([det('dog', 0.5, 0.5, 0.3, 0.3)], 1.1);
  const tracks = tr.getTracks();
  assert.equal(tracks.length, 1);
  assert.equal(tracks[0].label, 'dog');
});

test('does not steal a distant detection of the same class', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  for (let i = 0; i < 10; i++) tr.update([det('dog', 0.85, 0.6, 0.15, 0.3)], i * 0.1);
  const id = tr.getTracks()[0].id;
  // Static dog missed while another dog appears 0.3 frame widths away.
  tr.update([det('dog', 0.55, 0.6, 0.15, 0.3)], 1.0);
  tr.update([det('dog', 0.56, 0.6, 0.15, 0.3), det('dog', 0.85, 0.6, 0.15, 0.3)], 1.1);
  const original = tr.getTracks().find((t) => t.id === id)!;
  assert.ok(Math.abs(original.x - 0.85) < 0.05, `original stays at 0.85, got ${original.x}`);
});


test('a person standing still who then walks straight at the camera keeps their ID', () => {
  // Head-on approach: the box centre barely moves but the box grows in proportion.
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  let t = 0;
  for (let i = 0; i < 30; i++, t += 0.1) tr.update([det('person', 0.5, 0.5, 0.1, 0.3)], t); // standing 3 s
  const id = tr.getTracks()[0].id;
  let s = 1;
  for (let i = 0; i < 15; i++, t += 0.1) {
    s *= 1.06; // ~2.4× bigger over 1.5 s — walking toward the camera
    tr.update([det('person', 0.5, 0.5 + (s - 1) * 0.05, 0.1 * s, 0.3 * s)], t);
  }
  const tracks = tr.getTracks();
  assert.equal(tracks.length, 1, `tracks: ${tracks.map((x) => x.id).join(',')}`);
  assert.equal(tracks[0].id, id);
  assert.ok(tracks[0].h > 0.5, 'track grew with the person');
});

test('a lunge caught by a single detection (low detection rate) is still flagged as sudden', () => {
  // ~3 detections/s: the lunge only lands in one reading.
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  const ev = collect(tr);
  let t = 0;
  for (let i = 0; i < 12; i++, t += 0.3) tr.update([det('person', 0.3, 0.5)], t);
  tr.update([det('person', 0.55, 0.5)], t); // 0.25 frame widths in 0.3 s
  assert.ok(ev.some((e) => e.type === 'sudden'), 'sudden event from one decisive reading');
});

test('a small jitter at low detection rate is not flagged as sudden', () => {
  const tr = new Tracker({ frameWidth: 1000, frameHeight: 1000 });
  const ev = collect(tr);
  let t = 0;
  for (let i = 0; i < 12; i++, t += 0.3) tr.update([det('person', 0.3 + (i % 2) * 0.01, 0.5)], t);
  assert.ok(!ev.some((e) => e.type === 'sudden'));
});
