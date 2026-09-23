import { defineConfig } from 'vite';

// Camera Radar runs entirely in the browser. The dev server binds to localhost,
// which counts as a secure context, so getUserMedia works without HTTPS.
export default defineConfig({
  base: './',
  server: { host: 'localhost', port: 5173 },
  preview: { host: 'localhost', port: 4173 },
  worker: { format: 'es' },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 2500,
  },
});
