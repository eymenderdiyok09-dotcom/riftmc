import { CONFIG } from './config.js';
import { initNav } from './modules/nav.js';
import { initCopyIp } from './modules/copy-ip.js';
import { initServerStatus } from './modules/server-status.js';
import { initReveal } from './modules/reveal.js';
import { initCardGlow } from './modules/card-glow.js';

function applyConfig() {
  document.querySelectorAll('[data-discord-link]').forEach((a) => {
    if (CONFIG.discordUrl) {
      a.href = CONFIG.discordUrl;
      return;
    }
    a.removeAttribute('href');
    a.removeAttribute('target');
    a.setAttribute('aria-disabled', 'true');
    a.classList.add('is-disabled');
    const label = a.querySelector('[data-discord-label]');
    if (label) label.textContent = 'Discord Coming Soon';
  });
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}

applyConfig();
initNav();
initCopyIp(CONFIG.serverIp);
initServerStatus(CONFIG);
initReveal();
initCardGlow();
