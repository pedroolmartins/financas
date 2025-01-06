self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('meu-app-cache').then((cache) => {
            return cache.addAll([
                'index.html',
                'style/styles.css',
                'js/scripts.js',
                'icons/icon-120x120.png',
                'icons/icon-152x152.png',
                'icons/icon-167x167.png',
                'icons/icon-180x180.png',
                'icons/icon-192x192.png',
                'icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
