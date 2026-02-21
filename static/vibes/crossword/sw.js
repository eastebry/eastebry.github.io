const CACHE_NAME = 'crossword-v1';
const ASSETS = [
  '/vibes/crossword/',
  '/vibes/crossword/index.html',
  '/vibes/crossword/manifest.webmanifest',
  '/vibes/crossword/icon.svg',
  'https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      }).catch(() => caches.match('/vibes/crossword/index.html'));
    })
  );
});
