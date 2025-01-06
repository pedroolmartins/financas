self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('meu-app-cache').then((cache) => {
            return cache.addAll([
                config.APP_URL + 'index.html',
                config.APP_URL + 'style/styles.css',
                config.APP_URL + 'js/scripts.js',
                config.APP_URL + 'icons/icon-120x120.png',
                config.APP_URL + 'icons/icon-152x152.png',
                config.APP_URL + 'icons/icon-167x167.png',
                config.APP_URL + 'icons/icon-180x180.png',
                config.APP_URL + 'icons/icon-192x192.png',
                config.APP_URL + 'icons/icon-512x512.png'
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
