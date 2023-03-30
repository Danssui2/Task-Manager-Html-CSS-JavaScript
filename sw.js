const CACHE_NAME = 'v1';

self.addEventListener('install', e => {


  //activate worker on waiting
  self.skipWaiting();

  const preCache = async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      return cache.addAll(['/', 'src/app.js', 'src/assets/icons.svg', 'src/assets/bg.png']);
    } catch (err) {
      console.error(err);
    }
  };

  e.waitUntil(preCache());
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

const cacheFirst = async (request) => {
  const resFromCaches = await caches.match(request);

  if (resFromCaches) return resFromCaches;
  else return fetch(request);
}

self.addEventListener('fetch', e => {
  e.respondWith(cacheFirst(e.request))
});