// One-click "Copy IP" with visual + screen-reader feedback.
const RESET_MS = 2000;

function legacyCopy(text) {
  const ta = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  if (!ok) throw new Error('Copy command failed');
}

async function writeClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied or document not focused — fall through to legacy copy.
    }
  }
  legacyCopy(text);
}

export function initCopyIp(ip) {
  const box = document.querySelector('[data-copy-ip]');
  if (!box) return;
  const btn = box.querySelector('[data-copy-btn]');
  const label = box.querySelector('[data-copy-label]');
  const announce = box.querySelector('[data-copy-announce]');
  const ipEl = box.querySelector('[data-ip]');
  if (ipEl) ipEl.textContent = ip;

  let timer;
  btn.addEventListener('click', async () => {
    clearTimeout(timer);
    try {
      await writeClipboard(ip);
      box.classList.add('is-copied');
      label.textContent = 'Copied!';
      announce.textContent = `Server IP ${ip} copied to clipboard.`;
    } catch {
      label.textContent = 'Press Ctrl+C';
      announce.textContent = 'Copy failed. Select the IP and copy it manually.';
      const range = document.createRange();
      range.selectNodeContents(ipEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    timer = setTimeout(() => {
      box.classList.remove('is-copied');
      label.textContent = 'Copy IP';
      announce.textContent = '';
    }, RESET_MS);
  });
}
