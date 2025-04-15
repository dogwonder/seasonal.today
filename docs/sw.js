
// Define the cache name
const CACHE_NAME = 'seasonal-1744729347860';

// Add list of files to cache here
const CACHE_ASSETS = [
    '/',
    '/index.html',
	'/css/main.css',
	'/js/app.js',
	'/images/logo.svg', 
	'/assets/images/meta/favicon-192x192.png',
	'/months/january/index.html',
	'/months/february/index.html',
	'/months/march/index.html',
	'/months/april/index.html',
	'/months/may/index.html',
	'/months/june/index.html',
	'/months/july/index.html',
	'/months/august/index.html',
	'/months/september/index.html',
	'/months/october/index.html',
	'/months/november/index.html',
	'/months/december/index.html'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');

    // Pre-caching assets
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching Files');
                cache.addAll(CACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});