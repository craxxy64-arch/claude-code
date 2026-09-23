import './styles/main.css';
import { App } from './app.ts';
import { errorMessage, logger } from './utils/logger.ts';
import { toast } from './ui/toasts.ts';

// Last line of defence: surface unexpected errors without killing the UI.
window.addEventListener('error', (e) => {
  logger.error('window', e.error ?? e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  logger.error('promise', e.reason);
});

try {
  const app = new App();
  app.init();
  // Exposed for debugging from the console and for automated tests.
  (window as unknown as { cameraRadar: App }).cameraRadar = app;
} catch (err) {
  logger.error('boot', err);
  const b = document.getElementById('banner');
  if (b) {
    b.hidden = false;
    b.textContent = `Camera Radar failed to start: ${errorMessage(err)}`;
  }
  try {
    toast(`Startup error: ${errorMessage(err)}`, 'alert', 10000);
  } catch {
    /* toasts unavailable */
  }
}
