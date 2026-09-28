// Live server status. Falls back to "Under Development" when the server is offline or unreachable.
async function fetchStatus({ statusApi, serverIp, statusTimeoutMs }) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), statusTimeoutMs);
  try {
    const res = await fetch(statusApi + encodeURIComponent(serverIp), { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

function render(els, state, data) {
  els.pill.dataset.state = state;
  if (state === 'online') {
    const { online = 0, max = 0 } = data.players ?? {};
    els.label.textContent = `Online · ${online} playing`;
    if (els.players) els.players.textContent = `${online}/${max}`;
  } else {
    els.label.textContent = 'Under Development';
    if (els.players) els.players.textContent = 'Soon';
  }
}

export function initServerStatus(config) {
  const pill = document.querySelector('[data-status]');
  if (!pill) return;
  const els = {
    pill,
    label: pill.querySelector('[data-status-label]'),
    players: document.querySelector('[data-players]'),
  };

  const update = async () => {
    try {
      const data = await fetchStatus(config);
      render(els, data.online ? 'online' : 'dev', data);
    } catch {
      render(els, 'dev');
    }
  };

  update();
  setInterval(() => { if (!document.hidden) update(); }, config.statusRefreshMs);
}
