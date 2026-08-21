const CACHE_NAME = "bon-almolok-v5-20260821";
const STATIC_CACHE = "bon-almolok-static-v5-20260821";
const CORE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./logo.png",
  "./logo-192.png",
  "./logo-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(CORE_FILES).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => ![CACHE_NAME, STATIC_CACHE].includes(key)).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if(url.origin !== location.origin) return;

  const isDocument = event.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname === "/";
  const isAsset = /\.(css|js|json|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname);

  if(isDocument || isAsset){
    event.respondWith(
      fetch(event.request).then(response => {
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
    );
  }
});
