// Downloads the COCO-SSD graph models into public/models so the app can load
// them from the same origin (offline use, no third-party request at runtime).
//   node scripts/fetch-model.mjs            -> fast model only
//   node scripts/fetch-model.mjs --all      -> fast + balanced + accurate
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const BASE = 'https://storage.googleapis.com/tfjs-models/savedmodel';
const all = process.argv.includes('--all');
const models = all ? ['ssdlite_mobilenet_v2', 'ssd_mobilenet_v1', 'ssd_mobilenet_v2'] : ['ssdlite_mobilenet_v2'];

for (const name of models) {
  const dir = join('public', 'models', name);
  await mkdir(dir, { recursive: true });
  const manifestRes = await fetch(`${BASE}/${name}/model.json`);
  if (!manifestRes.ok) throw new Error(`${name}: model.json HTTP ${manifestRes.status}`);
  const manifestText = await manifestRes.text();
  await writeFile(join(dir, 'model.json'), manifestText);
  const paths = JSON.parse(manifestText).weightsManifest.flatMap((m) => m.paths);
  let bytes = 0;
  for (const p of paths) {
    const res = await fetch(`${BASE}/${name}/${p}`);
    if (!res.ok) throw new Error(`${name}/${p}: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    bytes += buf.length;
    await writeFile(join(dir, p), buf);
  }
  console.log(`✓ ${name}: ${paths.length} shards, ${(bytes / 1e6).toFixed(1)} MB -> ${dir}`);
}
