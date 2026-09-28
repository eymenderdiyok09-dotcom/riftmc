// Central site configuration — edit values here instead of hunting through modules.
export const CONFIG = Object.freeze({
  serverIp: 'mc.riftmc.lol',
  // Paste your free Discord invite here, e.g. 'https://discord.gg/aB3xYz9'.
  // Discord: right-click your server → Invite People → Edit invite link → Expire After: Never.
  // Leave empty to show "Discord Coming Soon" instead of a link.
  discordUrl: 'https://dsc.gg/riftmc-lol',
  // Public status API (no key required). Returns { online, players: { online, max }, version }.
  statusApi: 'https://api.mcsrvstat.us/3/',
  statusTimeoutMs: 6000,
  statusRefreshMs: 60_000,
});
