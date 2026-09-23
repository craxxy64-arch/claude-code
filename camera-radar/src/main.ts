import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
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

// Installable app + offline support (production builds only, so dev reloads stay fresh).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => logger.warn('app', `Offline support unavailable: ${errorMessage(err)}`));
  });
}

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
let installPrompt: InstallPromptEvent | null = null;
const installBtn = document.getElementById('btnInstall');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e as InstallPromptEvent;
  if (installBtn) installBtn.hidden = false;
});
window.addEventListener('appinstalled', () => {
  installPrompt = null;
  if (installBtn) installBtn.hidden = true;
  toast('Camera Radar installed — open it from your apps or home screen.');
});
installBtn?.addEventListener('click', async () => {
  if (!installPrompt) return;
  await installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installBtn.hidden = true;
});
