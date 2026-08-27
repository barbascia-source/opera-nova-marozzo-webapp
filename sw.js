// ============================================================
// Service Worker — Codex Spadae PWA
// Strategia: Network-First (HTML/CSS/JS) + Stale-While-Revalidate (immagini/font)
// ============================================================

const CACHE_VERSION = 7;
const CACHE_NAME = `codex-spadae-v${CACHE_VERSION}`;

// Risorse da pre-cachare durante l'installazione
const PRECACHE_URLS = [
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
  './js/components/Equipaggiamento.js',
  './js/components/Passeggio.js',
  './js/components/BookView.js',
  './js/components/OperaNova.js',
  './js/components/LetturaPDF.js',
  './js/components/Strumenti.js',
  './public/logo-codex-spadae.png',
  './public/spada.png',
  './public/passeggio-marozziano.png',
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

// ---- Utility: classifica la richiesta ----

function isNavigationOrHTML(request) {
  if (request.mode === 'navigate') return true;
  const url = new URL(request.url);
  return url.pathname.endsWith('.html') || url.pathname.endsWith('/');
}

function isCriticalAsset(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  return path.endsWith('.css') || path.endsWith('.js');
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  return /\.(png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|eot|otf)$/i.test(path);
}

// ---- INSTALL ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // Forza attivazione immediata
  );
});

// ---- ACTIVATE: pulizia cache vecchie ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Elimino cache vecchia:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim()) // Prende controllo immediato
  );
});

// ---- MESSAGGIO SKIP_WAITING ----
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ---- FETCH ----
self.addEventListener('fetch', event => {
  const { request } = event;

  // Ignora richieste non-GET
  if (request.method !== 'GET') return;

  // 1) HTML / navigazione → NETWORK-FIRST
  if (isNavigationOrHTML(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 2) CSS / JS principali → NETWORK-FIRST
  if (isCriticalAsset(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 3) Immagini / font / icone → STALE-WHILE-REVALIDATE
  if (isStaticAsset(request)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 4) Tutto il resto (es. CDN Vue, Google Fonts CSS) → NETWORK-FIRST
  event.respondWith(networkFirst(request));
});

// ============================================================
// Strategie di caching
// ============================================================

/**
 * NETWORK-FIRST
 * Prova la rete; se riesce aggiorna la cache.
 * Se la rete fallisce, serve dalla cache (offline).
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    // Aggiorna la cache solo se la risposta è valida
    if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    // Rete non disponibile → fallback alla cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Se nemmeno in cache, errore generico offline
    console.warn('[SW] Offline e non in cache:', request.url);
    // Per le navigazioni restituisci la index.html cachata (SPA fallback)
    if (request.mode === 'navigate') {
      return caches.match('./index.html');
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/**
 * STALE-WHILE-REVALIDATE
 * Serve subito dalla cache (veloce), e in background aggiorna la cache dalla rete.
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // Aggiornamento in background (non blocca la risposta)
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => {
      // Nessun problema: siamo offline, la cache basta
    });

  // Se abbiamo la cache, la serviamo subito
  if (cachedResponse) {
    return cachedResponse;
  }

  // Se non c'è in cache, aspettiamo la rete
  return fetchPromise;
}
