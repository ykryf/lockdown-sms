if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service worker registered successfully.');
        }, (err) => {
            console.error("Registration failed.");
            console.error(err);
        })
    })
}


const cacheName = 'lockdown-sms-v1';
const urlsToCache = [
    '/',
    '/images/virus_mask.webp',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
    'https://code.jquery.com/jquery-3.5.1.slim.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf',
    '/sms-script.js',
    '/sms-style.css'
]

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(urlsToCache);
    }))
})

self.addEventListener   ('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            return response;
        } else {
            return fetch(event.request);
        }
    }))
})