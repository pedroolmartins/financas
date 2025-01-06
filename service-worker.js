self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('meu-app-cache').then((cache) => {
            return cache.addAll([
                'financas/',
                'financas/index.html',
                'financas/style/styles.css',
                'financas/js/scripts.js',
                'financas/icons/icon-120x120.png',
                'financas/icons/icon-152x152.png',
                'financas/icons/icon-167x167.png',
                'financas/icons/icon-180x180.png',
                'financas/icons/icon-192x192.png',
                'financas/icons/icon-512x512.png'
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
