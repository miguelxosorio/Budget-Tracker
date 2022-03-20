// collection of files to cache
const FILES_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    './js/index.js',
    './idb.js'
];

const APP_PREFIX = 'BudgetTracker-'; // app name
const VERSION = 'version_01'; // version iteration
const CACHE_NAME = APP_PREFIX + VERSION;

// sw's run before the window object has been created - self instead of window.addEventListener
// the context of self referes to the service worker object
self.addEventListener('install', function(e) {
    e.waitUntil(    // waitUntil() - tell the browser to wait until the work is complete before terminating the service worker
                    // This ensures that the service worker doesn't move on from the installing phase until it's finished executing all of its code.
        caches.open(CACHE_NAME).then(function(cache) {  // open() - to find the specific cache by name
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)         // then add every file in the FILES_TO_CACHE array to the cache.
        })
    )
})

// activation step - clears out any old data from the cache and tell the service worker how to manage caches
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(keyList) {
            let cacheKeepList = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            })
        })
    )
})