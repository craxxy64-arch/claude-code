// End-to-end verification in real Chromium with a fake camera fed from a
// Y4M clip of real photographs (see make-feed.py). Starts its own Vite server.
//
//   FEED=/path/feed.y4m node tests/e2e/run-e2e.mjs
//
// Screenshots and a JSON report are written to test-results/.
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const FEED = process.env.FEED ?? join(root, 'tests/e2e/feed.y4m');
const OUT = join(root, 'test-results');
if (!existsSync(FEED)) {
  console.error(`Missing fake camera clip: ${FEED}\nGenerate it with tests/e2e/make-feed.py (see README).`);
  process.exit(2);
}
await mkdir(OUT, { recursive: true });

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok: !!ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = await createServer({ root, logLevel: 'error', server: { port: 5199, strictPort: true, host: 'localhost' } });
await server.listen();
const APP_URL = 'http://localhost:5199/';

const baseArgs = ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'];
const camArgs = ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream', `--use-file-for-fake-video-capture=${FEED}`];

async function openPage(browser, opts = {}) {
  const ctx = await browser.newContext({
    viewport: opts.viewport ?? { width: 1600, height: 900 },
    permissions: opts.permissions ?? ['camera'],
    acceptDownloads: true,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  if (opts.init) await page.addInitScript(opts.init);
  if (opts.route) await opts.route(page);
  await page.goto(APP_URL);
  await page.waitForFunction(() => !!window.cameraRadar);
  return { ctx, page, errors };
}

const state = (page) =>
  page.evaluate(() => {
    const a = window.cameraRadar;
    const tracks = a.tracker.getTracks();
    return {
      camera: a.camera.info(),
      model: a.detector.info,
      detections: a.analytics.lastDetections.map((d) => ({ label: d.label, score: d.score })),
      tracks: tracks.map((t) => ({ id: t.id, label: t.label, status: t.status, movement: t.movement, speed: t.speedPx, x: t.x, vx: t.vx, hist: t.history.length })),
      blips: a.radar.blips.map((b) => ({ id: b.id, range: b.point.range, bearing: b.point.bearing, quality: b.point.quality })),
      events: a.events.map((e) => ({ type: e.type, text: e.text })),
      processingFps: a.analytics.processing.value(),
      renderFps: a.analytics.render.value(),
      latency: a.analytics.detectionLatency.value,
      motion: a.motion.last ? { level: a.motion.last.level, changed: a.motion.last.changed, blobs: a.motion.last.blobs.length } : null,
    };
  });

let browser = await chromium.launch({ args: [...baseArgs, ...camArgs] });
try {
  // ------------------------------------------------------------ main flow --
  const { page, errors } = await openPage(browser);
  check('Site loads with idle camera state', (await page.textContent('#emptyTitle')) === 'Camera is off');
  await page.screenshot({ path: join(OUT, '01-idle.png') });

  await page.click('#btnCamera');
  await page.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 15000 });
  let s = await state(page);
  check('Camera permission granted and stream live', s.camera.state === 'live', `${s.camera.label}`);
  check('Live video has real dimensions', s.camera.width === 640 && s.camera.height === 480, `${s.camera.width}×${s.camera.height}`);

  const devices = await page.$$eval('#cameraSelect option', (o) => o.map((x) => x.textContent));
  check('Cameras enumerated in selector', devices.length >= 2, devices.join(' | '));

  await page.waitForFunction(() => window.cameraRadar.detector.info.status === 'ready', null, { timeout: 60000 });
  s = await state(page);
  check('Detection model loaded', s.model.status === 'ready', `${s.model.runtime}/${s.model.backend}, weights ${s.model.source}, ${Math.round(s.model.loadMs)} ms`);

  // Let detection + tracking run across one full loop of the clip.
  const idSamples = [];
  let maxTracks = 0;
  let sawMoving = null;
  let radarSynced = true;
  for (let i = 0; i < 20; i++) {
    await sleep(1000);
    s = await state(page);
    maxTracks = Math.max(maxTracks, s.tracks.filter((t) => t.status === 'active').length);
    const mv = s.tracks.find((t) => t.movement === 'moving' && t.status === 'active');
    if (mv && !sawMoving) sawMoving = mv;
    idSamples.push(s.tracks.map((t) => `${t.id}:${t.label}:${t.x.toFixed(2)}:${t.movement}`));
    const ids = s.tracks.map((t) => t.id).sort().join(',');
    const bids = s.blips.map((b) => b.id).sort().join(',');
    if (ids !== bids) radarSynced = false;
    if (i === 6) await page.screenshot({ path: join(OUT, '02-tracking-mode-d.png') });
  }
  const labels = new Set(s.events.filter((e) => e.type === 'enter').map((e) => e.text.split(' ')[1]));
  check('Real detections produced', s.detections.length > 0, s.detections.map((d) => `${d.label} ${Math.round(d.score * 100)}%`).join(', '));
  check('Multiple simultaneous targets tracked', maxTracks >= 2, `max ${maxTracks} active`);
  check('Movement detected with px/s speed', !!sawMoving, sawMoving ? `#${sawMoving.id} ${sawMoving.label} ${Math.round(sawMoving.speed)} px/s` : '');
  check('Radar blips match tracked IDs every sample', radarSynced);
  check('Radar range labelled as estimate', s.blips.every((b) => b.quality !== 'measured'));
  const radarKnows = await page.evaluate(() => window.cameraRadar.radar.blips.map((b) => ({ u: b.uncertainty, trend: b.motion?.trend ?? null, hidden: b.hiddenFor, partly: b.partlyHidden })));
  check('Radar shows a distance uncertainty for every target', radarKnows.length > 0 && radarKnows.every((b) => b.u > 0), radarKnows.map((b) => `±${Math.round(b.u * 100)}%`).join(', '));
  const boxColour = await page.evaluate(() => {
    const c = document.getElementById('overlay');
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    let green = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 200 && d[i + 1] > 200 && d[i] < 90 && d[i + 2] < 150) green++;
    return green;
  });
  check('Tracking boxes are drawn in green', boxColour > 200, `${boxColour} bright-green pixels`);

  // Stationary dog (right side in mirrored view) should keep one ID.
  const staticIds = idSamples.map((row) => row.find((r) => Number(r.split(':')[2]) > 0.8 && r.endsWith(':stationary'))?.split(':')[0]).filter(Boolean);
  const dominant = staticIds.sort((a, b) => staticIds.filter((x) => x === a).length - staticIds.filter((x) => x === b).length).pop();
  const share = staticIds.filter((x) => x === dominant).length / Math.max(1, staticIds.length);
  // Only count samples where the target at the sitting dog's spot is stationary — the
  // walking dog passes through that area and is a different, correctly-IDed target.
  check('Stationary target keeps a persistent ID (even while another dog walks in front of it)', share >= 0.95, `ID ${dominant} in ${Math.round(share * 100)}% of ${staticIds.length} samples`);

  const types = new Set(s.events.map((e) => e.type));
  check('Target ENTER events', types.has('enter'), [...labels].join(', '));
  check('Target EXIT events (left the view)', types.has('exit'), s.events.find((e) => e.type === 'exit')?.text ?? '');
  check('Motion-layer events', types.has('motion') || types.has('sudden'), s.events.filter((e) => e.type === 'motion' || e.type === 'sudden').slice(0, 2).map((e) => e.text).join(' / '));
  const suddenTarget = s.events.find((e) => e.type === 'sudden' && e.text.startsWith('#'));
  check('Sudden target movement flagged', !!suddenTarget, suddenTarget?.text ?? s.events.filter((e) => e.type === 'sudden').map((e) => e.text).join(' / '));
  check('Processing FPS measured', s.processingFps > 0, `${s.processingFps.toFixed(1)} detections/s, latency ${Math.round(s.latency)} ms`);
  check('UI stays responsive (render FPS)', s.renderFps >= 30, `${s.renderFps.toFixed(0)} fps`);

  // Overlay is really drawn (non-transparent pixels in the overlay canvas).
  const overlayPixels = await page.evaluate(() => {
    const c = document.getElementById('overlay');
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    let n = 0;
    for (let i = 3; i < d.length; i += 16) if (d[i] > 0) n++;
    return n;
  });
  check('Overlay (boxes / vectors / trails) rendered', overlayPixels > 500, `${overlayPixels} sampled pixels`);

  // Target click → detail panel.
  const firstId = s.tracks[0]?.id;
  await page.click(`#targetList li[data-id="${firstId}"]`);
  await sleep(600);
  const drawerText = await page.textContent('#tdBody');
  check('Target detail panel opens with history', !(await page.isHidden('#targetDrawer')) && /Position/.test(drawerText) && /Movement history/.test(drawerText));
  check('Detail panel labels distance as estimated', /Estimated distance — camera calibration required/.test(drawerText));
  await page.screenshot({ path: join(OUT, '03-target-detail.png') });
  const [histDl] = await Promise.all([page.waitForEvent('download'), page.click('#tdBody [data-export]')]);
  check('Target history export (explicit save)', /target-\d+.*\.json$/.test(histDl.suggestedFilename()), histDl.suggestedFilename());
  await page.click('[data-close="targetDrawer"]');

  // Toggles.
  await page.evaluate(() => window.cameraRadar.settings.set({ showVectors: false, showTrails: false, showIds: false, showBoxes: false }));
  await sleep(300);
  const bare = await page.evaluate(() => {
    const c = document.getElementById('overlay');
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    let n = 0;
    for (let i = 3; i < d.length; i += 16) if (d[i] > 0) n++;
    return n;
  });
  check('Boxes / IDs / vectors / trails toggles take effect', bare < overlayPixels, `${overlayPixels} → ${bare} overlay pixels`);
  await page.evaluate(() => window.cameraRadar.settings.set({ showVectors: true, showTrails: true, showIds: true, showBoxes: true }));

  // Heatmap.
  await page.click('#btnHeatmap');
  await sleep(1500);
  const heat = await page.evaluate(() => window.cameraRadar.motion.heatmap.heat(performance.now() / 1000)?.max ?? 0);
  check('Motion heatmap accumulates', heat > 0, `max cell ${heat.toFixed(2)}`);
  await page.screenshot({ path: join(OUT, '04-heatmap.png') });
  await page.click('#btnResetHeat');
  const heatAfter = await page.evaluate(() => window.cameraRadar.motion.heatmap.heat(performance.now() / 1000)?.max ?? 0);
  check('Heatmap reset clears history', heatAfter < heat, `${heat.toFixed(2)} → ${heatAfter.toFixed(2)}`);
  await page.selectOption('#settingsBody #set-heatmapHistory', '120').catch(() => {});
  await page.evaluate(() => window.cameraRadar.settings.set({ heatmapHistory: 120 }));
  check('Heatmap history duration adjustable', (await page.evaluate(() => window.cameraRadar.motion.heatmap.history)) === 120);
  await page.click('#btnHeatmap');

  // Modes.
  for (const [mode, visible, hidden] of [
    ['camera', ['#cameraPanel'], ['#radarPanel', '#analyticsPanel']],
    ['radar', ['#radarPanel'], ['#cameraPanel', '#analyticsPanel']],
    ['split', ['#cameraPanel', '#radarPanel'], ['#analyticsPanel']],
    ['full', ['#cameraPanel', '#radarPanel', '#analyticsPanel'], []],
  ]) {
    await page.click(`.segmented [data-mode="${mode}"]`);
    let ok = true;
    for (const v of visible) ok &&= await page.isVisible(v);
    for (const h of hidden) ok &&= !(await page.isVisible(h));
    check(`Display mode ${mode.toUpperCase()}`, ok);
    if (mode === 'radar') await page.screenshot({ path: join(OUT, '05-mode-b-radar.png') });
  }

  // Settings panel.
  await page.click('#btnSettings');
  await page.fill('#set-confidenceThreshold', '0.8').catch(() => {});
  await page.$eval('#set-confidenceThreshold', (el) => {
    el.value = '0.8';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  check('Confidence threshold setting applied', (await page.evaluate(() => window.cameraRadar.settings.get('confidenceThreshold'))) === 0.8);
  await sleep(1500);
  s = await state(page);
  check('Detections respect confidence threshold', s.detections.every((d) => d.score >= 0.8), s.detections.map((d) => d.score.toFixed(2)).join(','));
  await page.selectOption('#set-theme', 'light');
  check('Light theme applied', (await page.getAttribute('html', 'data-theme')) === 'light');
  await page.screenshot({ path: join(OUT, '06-settings-light.png') });
  await page.selectOption('#set-theme', 'dark');
  await page.$eval('#set-confidenceThreshold', (el) => {
    el.value = '0.5';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.click('#btnSettings');

  // Mirror.
  await page.click('#btnMirror');
  check('Mirror toggle', !(await page.evaluate(() => document.getElementById('video').classList.contains('mirrored'))));
  await page.click('#btnMirror');

  // Recording.
  await page.click('#btnRecord');
  await sleep(500);
  check('Recording indicator visible while recording', (await page.isVisible('#chipRec')) && (await page.isVisible('#recBadge')));
  await page.screenshot({ path: join(OUT, '07-recording.png') });
  await sleep(2500);
  await page.click('#btnRecord');
  await page.waitForFunction(() => window.cameraRadar.recorder.recordings.length > 0, null, { timeout: 10000 });
  const rec = await page.evaluate(() => {
    const r = window.cameraRadar.recorder.recordings[0];
    return { size: r.blob.size, mime: r.mime, dur: r.durationSec };
  });
  check('Recording produced a video file', rec.size > 10000, `${rec.mime}, ${(rec.size / 1024).toFixed(0)} KB, ${rec.dur.toFixed(1)} s`);
  check('Recording indicator cleared after stop', !(await page.isVisible('#chipRec')));
  const [recDl] = await Promise.all([page.waitForEvent('download'), page.click('#recordingList [data-save]')]);
  check('Recording can be saved', /\.webm|\.mp4/.test(recDl.suggestedFilename()), recDl.suggestedFilename());

  // Snapshot.
  await page.click('#btnSnapshot');
  await page.waitForSelector('#snapshotModal:not([hidden])');
  const snapDims = await page.$eval('#snapCanvas', (c) => `${c.width}x${c.height}`);
  check('Snapshot captures full-resolution frame', snapDims === '640x480', snapDims);
  await page.screenshot({ path: join(OUT, '08-snapshot.png') });
  const [snapDl] = await Promise.all([page.waitForEvent('download'), page.click('#btnSnapSave')]);
  check('Snapshot saved as PNG', snapDl.suggestedFilename().endsWith('.png'), snapDl.suggestedFilename());

  // Fullscreen radar.
  await page.click('#btnFullscreen');
  await sleep(800);
  const fs = await page.evaluate(() => document.fullscreenElement?.id ?? (document.getElementById('radarWrap').classList.contains('pseudo-fullscreen') ? 'pseudo' : null));
  check('Fullscreen radar', fs === 'radarWrap' || fs === 'pseudo', String(fs));
  await page.screenshot({ path: join(OUT, '09-fullscreen-radar.png') });
  await page.click('#btnRadarExit');
  await sleep(300);

  // Debug panel.
  await page.click('#btnDebug');
  await sleep(600);
  const dbg = await page.textContent('#debugBody');
  check('Debug panel shows stream / model / latency', /CAMERA STREAM/.test(dbg) && /Inference/.test(dbg) && /Tracking update/.test(dbg));
  await page.screenshot({ path: join(OUT, '10-debug.png') });
  await page.click('#btnDebugClose');
  check('Debug panel can be turned off', await page.isHidden('#debugPanel'));

  // Disconnect + automatic recovery.
  await page.evaluate(() => window.cameraRadar.camera.element.srcObject.getVideoTracks()[0].dispatchEvent(new Event('ended')));
  await sleep(300);
  s = await state(page);
  check('Camera disconnect detected', s.camera.state === 'disconnected', (await page.textContent('#emptyTitle')) ?? '');
  await page.screenshot({ path: join(OUT, '11-disconnected.png') });
  await page.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 10000 }).catch(() => {});
  s = await state(page);
  check('Camera reconnects automatically', s.camera.state === 'live');

  // Stop.
  await page.click('#btnCamera');
  s = await state(page);
  check('Stop camera releases stream', s.camera.state === 'stopped' && s.camera.trackState === 'none');
  check('No uncaught page errors during main flow', errors.length === 0, errors.slice(0, 3).join(' | '));

  // Network privacy: no request other than the model weights leaves the origin.
  await page.context().close();

  // --------------------------------------------------------- responsive --
  for (const [name, vp] of [
    ['laptop-1280', { width: 1280, height: 800 }],
    ['tablet-1024', { width: 1024, height: 768 }],
    ['tablet-portrait-768', { width: 768, height: 1024 }],
    ['mobile-390', { width: 390, height: 844 }],
  ]) {
    const { page: p, ctx } = await openPage(browser, { viewport: vp });
    await p.click('#btnCamera');
    await p.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 15000 });
    await p.waitForFunction(() => window.cameraRadar.detector.info.status === 'ready', null, { timeout: 60000 });
    await sleep(3500);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await p.screenshot({ path: join(OUT, `12-responsive-${name}.png`), fullPage: true });
    check(`Responsive ${name}: no horizontal overflow`, overflow <= 0, `overflow ${overflow}px`);
    await ctx.close();
  }

  // --------------------------------------------------------- privacy ------
  {
    const { page: p, ctx } = await openPage(browser);
    const external = [];
    p.on('request', (r) => {
      const u = new URL(r.url());
      if (u.hostname !== 'localhost') external.push(r.url());
    });
    await p.click('#btnCamera');
    await p.waitForFunction(() => window.cameraRadar.detector.info.status === 'ready', null, { timeout: 60000 });
    await sleep(4000);
    check('No network requests leave the machine while processing', external.length === 0, external.slice(0, 3).join(', '));
    await ctx.close();
  }

  // ---------------------------------------------------- video file input --
  {
    // Record raw camera footage with the app itself, then analyse that file.
    const { page: p, ctx } = await openPage(browser);
    await p.evaluate(() => window.cameraRadar.settings.set({ recordOverlays: false }));
    await p.click('#btnCamera');
    await p.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 15000 });
    await p.click('#btnRecord');
    await sleep(6000);
    await p.click('#btnRecord');
    await p.waitForFunction(() => window.cameraRadar.recorder.recordings.length > 0, null, { timeout: 10000 });
    const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#recordingList [data-save]')]);
    const clip = join(OUT, 'clip.webm');
    await dl.saveAs(clip);
    await p.click('#btnCamera');
    await p.setInputFiles('#fileInput', clip);
    await p.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 15000 });
    await p.waitForFunction(() => window.cameraRadar.detector.info.status === 'ready', null, { timeout: 60000 });
    await sleep(5000);
    const st = await state(p);
    check('Video file analysed through the same pipeline', st.camera.label === 'clip.webm' && st.detections.length > 0 && st.tracks.length > 0, `${st.camera.width}×${st.camera.height}, ${st.detections.map((d) => d.label).join(', ')}`);
    await p.screenshot({ path: join(OUT, '16-video-file.png') });
    await ctx.close();
  }

  // -------------------------------------------------------- voice (Xcv) --
  // Real speech audio can't be fed to headless Chromium, so this stubs the
  // Web Speech API with a controllable fake and drives it exactly like a
  // real SpeechRecognition would (start/result/stop), to verify the actual
  // command → action → response pipeline end to end.
  {
    const { page: p, ctx, errors: errs } = await openPage(browser, { init: () => {
      class FakeRecognition extends EventTarget {
        constructor() {
          super();
          this.continuous = false;
          this.interimResults = false;
          this.lang = 'en-US';
          this._started = false;
        }
        start() {
          if (this._started) throw new DOMException('already started', 'InvalidStateError');
          this._started = true;
          this.onstart?.();
          window.__activeRecognition = this;
        }
        stop() {
          if (!this._started) return;
          this._started = false;
          this.onend?.();
          if (window.__activeRecognition === this) window.__activeRecognition = null;
        }
        abort() {
          this.stop();
        }
        fireResult(text, isFinal = true) {
          this.onresult?.({ resultIndex: 0, results: { 0: { isFinal, 0: { transcript: text, confidence: 0.9 }, length: 1 }, length: 1 } });
        }
      }
      window.SpeechRecognition = FakeRecognition;
      window.webkitSpeechRecognition = FakeRecognition;
      window.__sayToXcv = (text) => {
        const r = window.__activeRecognition;
        if (!r) return 'NOT_LISTENING';
        r.fireResult(text, true);
        r.stop();
        return 'OK';
      };
    } });
    const say = async (text) => {
      await p.hover('#btnVoiceMic');
      await p.mouse.down();
      await p.waitForTimeout(120);
      const code = await p.evaluate((t) => window.__sayToXcv(t), text);
      await p.mouse.up();
      await sleep(300);
      return code;
    };
    await p.evaluate(() => window.cameraRadar.settings.set({ voiceEnabled: true }));
    await p.waitForSelector('#btnVoiceMic:not([hidden])');
    check('Xcv: mic button appears once enabled and speech API is supported', await p.evaluate(() => window.cameraRadar.voice.isSupported()));

    await say('start the camera');
    await p.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 15000 });
    check('Xcv: push-to-talk "start the camera" actually starts it', true);
    await sleep(2500);

    await say('status report');
    const statusResp = await p.textContent('#voiceResponse');
    check('Xcv: status report speaks real live numbers', /Tracking \d+ target|Camera live/.test(statusResp), statusResp);

    await say('switch to radar mode');
    check('Xcv: voice command changes display mode', (await p.evaluate(() => window.cameraRadar.settings.get('layoutMode'))) === 'radar');

    await say('what is the weather today');
    check('Xcv: unrecognised speech gets a "didn\'t understand" reply, not a stale one', /didn'?t|not sure/i.test(await p.textContent('#voiceResponse')));

    const firstId = await p.evaluate(() => window.cameraRadar.tracker.getTracks()[0]?.id ?? null);
    if (firstId != null) {
      await say(`select target ${firstId}`);
      check('Xcv: "select target N" opens that target\'s panel', !(await p.isHidden('#targetDrawer')));
    }
    await say('select target 999');
    check('Xcv: a target ID that does not exist gets an honest "not found" reply', /don'?t see a target/i.test(await p.textContent('#voiceResponse')));

    await say('set confidence to 75 percent');
    check('Xcv: "set confidence" changes the real setting', (await p.evaluate(() => window.cameraRadar.settings.get('confidenceThreshold'))) === 0.75);

    // Hands-free: must ignore speech without the wake word, and act on speech with it.
    await p.evaluate(() => window.cameraRadar.settings.set({ voiceHandsFree: true }));
    await sleep(300);
    check('Xcv: hands-free mode puts the mic in continuous listening', (await p.evaluate(() => window.cameraRadar.voice.state)) === 'listening');
    await p.evaluate(() => window.__sayToXcv('stop the camera'));
    await sleep(300);
    check('Xcv: hands-free ignores a command with no wake word', (await p.evaluate(() => window.cameraRadar.camera.info().state)) === 'live');
    await p.evaluate(() => window.__sayToXcv('xcv stop the camera'));
    await sleep(400);
    check('Xcv: hands-free acts once the wake word is spoken', (await p.evaluate(() => window.cameraRadar.camera.info().state)) !== 'live');

    check('Xcv: no page errors from any voice interaction', errs.length === 0, errs.slice(0, 3).join(' | '));
    await p.screenshot({ path: join(OUT, '20-voice-assistant.png') });
    await ctx.close();
  }

  // ------------------------------------------------------ model failure --
  {
    const { page: p, ctx, errors: errs } = await openPage(browser, {
      route: (pg) => pg.route(/model\.json|group1-shard/, (r) => r.fulfill({ status: 404, body: 'nope' })),
    });
    await p.waitForFunction(() => window.cameraRadar.detector.info.status === 'error', null, { timeout: 30000 });
    await p.click('#btnCamera');
    await p.waitForFunction(() => window.cameraRadar.camera.info().state === 'live', null, { timeout: 15000 });
    await sleep(2500);
    const st = await state(p);
    const chip = await p.textContent('#chipModel .v');
    check('Model failure reported, camera + motion keep working', st.model.status === 'error' && st.camera.state === 'live' && st.motion !== null, `chip "${chip}", motion ${st.motion?.level}`);
    await p.screenshot({ path: join(OUT, '13-model-offline.png') });
    check('Model failure does not crash UI', errs.length === 0, errs.join(' | '));
    await ctx.close();
  }
  await browser.close();

  // ------------------------------------------------- permission denied --
  // Full Chromium (new headless) enforces a real "denied" camera permission.
  browser = await chromium.launch({ channel: 'chromium', args: [...baseArgs, '--use-fake-device-for-media-stream'] });
  {
    const { page: p, ctx } = await openPage(browser, { permissions: [] });
    const { targetInfo } = await (await ctx.newCDPSession(p)).send('Target.getTargetInfo');
    await (await browser.newBrowserCDPSession()).send('Browser.setPermission', {
      permission: { name: 'camera' },
      setting: 'denied',
      origin: new URL(APP_URL).origin,
      browserContextId: targetInfo.browserContextId,
    });
    await p.click('#btnCamera');
    await p.waitForFunction(() => window.cameraRadar.camera.info().state !== 'requesting', null, { timeout: 15000 });
    const st = await state(p);
    check('Permission denied handled', st.camera.state === 'denied', `${st.camera.state}: ${await p.textContent('#emptyTitle')}`);
    await p.screenshot({ path: join(OUT, '14-permission-denied.png') });
    await ctx.close();
  }
  await browser.close();

  // ------------------------------------------------------- no camera -----
  browser = await chromium.launch({ args: [...baseArgs, '--use-fake-ui-for-media-stream'] });
  {
    const { page: p, ctx } = await openPage(browser, {
      init: () => {
        // Simulate a machine with no video input devices.
        const md = navigator.mediaDevices;
        md.getUserMedia = () => Promise.reject(new DOMException('Requested device not found', 'NotFoundError'));
        md.enumerateDevices = () => Promise.resolve([]);
      },
    });
    await p.click('#btnCamera');
    await p.waitForFunction(() => window.cameraRadar.camera.info().state !== 'requesting', null, { timeout: 15000 });
    const st = await state(p);
    check('No camera found handled', st.camera.state === 'not-found', `${await p.textContent('#emptyTitle')} / ${await p.textContent('#cameraSelect')}`);
    await ctx.close();
  }
  // ------------------------------------------------ unsupported browser --
  {
    const { page: p, ctx, errors: errs } = await openPage(browser, {
      init: () => Object.defineProperty(Navigator.prototype, 'mediaDevices', { get: () => undefined, configurable: true }),
    });
    const st = await state(p);
    const banner = await p.textContent('#banner');
    check('Unsupported browser handled gracefully', st.camera.state === 'unsupported' && (await p.isVisible('#banner')) && errs.length === 0, banner ?? '');
    await p.screenshot({ path: join(OUT, '15-unsupported.png') });
    await ctx.close();
  }
} catch (err) {
  check('E2E run completed without exceptions', false, err.stack ?? String(err));
} finally {
  await browser.close().catch(() => {});
  await server.close();
}

const failed = results.filter((r) => !r.ok);
await writeFile(join(OUT, 'e2e-report.json'), JSON.stringify({ at: new Date().toISOString(), results }, null, 2));
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
