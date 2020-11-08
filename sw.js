
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log('Service worker registered successfully.');
        }, (err) => {
            console.error("Registration failed.");
            console.error(err);
        })
        .catch((error) => {
            console.log(error);
        })
    })
}

const basePath = '/lockdown-sms/'
const cacheName = 'lockdown-sms-v1';
const urlsToCache = [
    '/',
    basePath,
    basePath + 'index.html',
    basePath + 'images/virus_mask.webp',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
    'https://code.jquery.com/jquery-3.5.1.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    basePath + 'sms-script.js',
    basePath + 'sms-style.css',
]

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName)
    .then((cache) => {
        return cache.addAll(urlsToCache).catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    })
    )
})

self.addEventListener   ('fetch', (event) => {
    console.log(event.request.url);
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            return response;
        } else {
            return fetch(event.request);
        }
    }))
})