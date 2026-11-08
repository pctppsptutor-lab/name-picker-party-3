const CACHE_NAME = 'name-picker-vol3-v3';
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./games/i18n.js",
  "./games/fx.js",
  "./games/decor.js",
  "./games/bases.js",
  "./games/scenes.js",
  "./games/g13-penguin.js",
  "./games/g14-shells.js",
  "./games/g15-aliens.js",
  "./games/g16-monsters.js",
  "./games/g17-cafe.js",
  "./games/g18-recycle.js",
  "./assets/g13/sfx_almost_selected.wav",
  "./assets/g13/sfx_selected.wav",
  "./assets/g13/sfx_wrong_turn.wav",
  "./assets/g13/sfx_win.wav"
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('name-picker-vol3-') && k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (/\.(webp|wav|svg|woff2?)$/i.test(url.pathname) || url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
