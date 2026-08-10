const cacheName = "bon-almolok-v3";

const filesToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./logo.png",
    "./manifest.json"
];

// تثبيت النسخة الجديدة
self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// حذف الـ Cache القديم
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== cacheName)
                    .map((name) => caches.delete(name))
            );
        })
    );

    self.clients.claim();
});

// تحميل الملفات
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});