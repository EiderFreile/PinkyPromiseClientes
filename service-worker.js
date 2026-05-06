const CACHE = 'pinky-clientes-v1';
const ASSETS = [
  '/PinkyPromiseClientes/',
  '/PinkyPromiseClientes/index.html',
  '/PinkyPromiseClientes/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.url.includes('firebase')||e.request.url.includes('googleapis')||e.request.url.includes('gstatic')||e.request.url.includes('fonts.')||e.request.url.includes('cdnjs')) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
