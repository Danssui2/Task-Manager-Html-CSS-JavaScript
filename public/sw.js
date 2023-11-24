const CACHE_NAME = 'v1.1';

const preCache = async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(['/', './assets/index.js', './assets/index.css', './assets/icons.svg', './assets/bg.png']);
  } catch (err) {
    console.error(err);
  }
};

self.addEventListener('install', e => {
  //activate worker on waiting
  self.skipWaiting();

  e.waitUntil(preCache());
});

const deleteOldCache = function() {
  //get cache keys
  caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      )
    });

  clients.claim();
}

self.addEventListener('activate', e => {
  e.waitUntil(deleteOldCache());
});

const cacheFirst = async (request) => {
  const resFromCaches = await caches.match(request);

  if (resFromCaches) return resFromCaches;
  else return fetch(request);
}

self.addEventListener('fetch', e => {
  e.respondWith(cacheFirst(e.request))
})