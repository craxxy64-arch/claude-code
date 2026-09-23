// Re-encodes a downloaded model's weight shards as base64 text (*.b64.txt) for
// static hosts that refuse application/octet-stream (e.g. claude.ai artifacts).
//   node scripts/pack-model.mjs public/models/ssdlite_mobilenet_v2 out/models/ssdlite_mobilenet_v2
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const [src, dst] = process.argv.slice(2);
if (!src || !dst) throw new Error('usage: pack-model.mjs <srcDir> <dstDir>');
await mkdir(dst, { recursive: true });
const model = JSON.parse(await readFile(join(src, 'model.json'), 'utf8'));
for (const group of model.weightsManifest) {
  group.paths = await Promise.all(
    group.paths.map(async (p) => {
      const out = `${p}.b64.txt`;
      await writeFile(join(dst, out), (await readFile(join(src, p))).toString('base64'));
      return out;
    }),
  );
}
await writeFile(join(dst, 'model.json'), JSON.stringify(model));
console.log(`packed ${src} -> ${dst}`);
