const CACHE_NAME = 'codex-spadae-v3';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './js/app.js',
  './js/data/books.js',
  './js/data/glossary.js',
  './js/components/Tooltip.js',
  './js/components/Home.js',
  './js/components/Biografia.js',
  './js/components/SdS.js',
  './js/components/Passeggio.js',
  './js/components/BookView.js',
  './public/logo-codex-spadae.png',
  './public/cinghiara_porta_di_ferro_stretta.png',
  './public/cinghiara_porta_di_ferro_larga.png',
  './public/guardia_dintrare_in_largo_passo.png',
  './public/porta_di_ferro_stretta.png',
  './public/guardia_di_testa.png',
  './public/guardia_di_faccia.png',
  './public/varianti_alte_1.png',
  './public/varianti_alte_2.png',
  './public/varianti_basse_1.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Forza l'attivazione immediata del nuovo Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Rimuove le vecchie cache (es. v1)
          }
        })
      );
    }).then(() => self.clients.claim()) // Prende il controllo di tutte le pagine aperte immediatamente
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          // Ritorna la risorsa se già presente in cache
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            // Mette in cache anche le risorse richieste dinamicamente (es. Vue da unpkg.com e i font Google)
            // status 0 permette di cachare richieste "opaque" (CORS cross-origin limitate)
            if(!response || (response.status !== 200 && response.status !== 0)) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        ).catch(function() {
            console.warn('Offline: risorsa di rete non disponibile e non presente in cache -> ', event.request.url);
        });
      })
  );
});
