// Static build for GitHub Pages (or any HTTPS static host): bundles the fast
// model only, and adds .nojekyll so Pages serves every file as-is.
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

if (!existsSync('public/models/ssdlite_mobilenet_v2/model.json')) {
  execSync('node scripts/fetch-model.mjs', { stdio: 'inherit' });
}
execSync('npx tsc --noEmit && npx vite build', { stdio: 'inherit' });
for (const dir of readdirSync('dist/models')) {
  if (dir !== 'ssdlite_mobilenet_v2') rmSync(join('dist/models', dir), { recursive: true, force: true });
}
writeFileSync('dist/.nojekyll', '');
console.log('dist/ ready for static hosting');
