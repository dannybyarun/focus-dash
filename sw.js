const CACHE_NAME = 'pocketos-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/apps.html',
  '/dashboard/index.html',
  '/dashboard/focus.html',
  '/assets/style.css',
  '/apps/games/index.html',
  '/apps/crypto/index.html',
  '/apps/splitter/index.html',
  '/apps/flashcards/index.html',
  '/apps/notes/index.html',
  '/apps/me/index.html',
  '/apps/timer/index.html',
  '/apps/habits/index.html',
  '/apps/colors/index.html',
  '/apps/converter/index.html',
  '/apps/encode/index.html',
  '/apps/jsontool/index.html',
  '/apps/markdown/index.html',
  '/apps/password/index.html',
  '/apps/timezones/index.html',
  '/apps/regex/index.html',
];

const CACHE_STRATEGIES = {
  static: 'cache-first',
  html: 'network-first',
  api: 'network-only',
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, {credentials: 'same-origin'})))
        .catch(err => console.log('Cache install partial:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

function isStaticAsset(url) {
  return url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.svg') ||
         url.pathname.endsWith('.ico') ||
         url.pathname.endsWith('.woff2');
}

function isHTML(url) {
  return url.pathname.endsWith('.html') || url.pathname.endsWith('/');
}

function isAPI(url) {
  return url.hostname !== location.hostname ||
         url.pathname.startsWith('/api/');
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', {status: 503, statusText: 'Offline'});
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline', {status: 503, statusText: 'Offline'});
  }
}

async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch {
    return new Response(JSON.stringify({error: 'Offline'}), {
      status: 503,
      headers: {'Content-Type': 'application/json'}
    });
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;

  if (isAPI(url)) {
    event.respondWith(networkOnly(event.request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  if (isHTML(url)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(networkFirst(event.request));
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data === 'getVersion') {
    event.ports[0].postMessage({version: CACHE_NAME});
  }
});