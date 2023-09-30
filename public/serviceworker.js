
self.addEventListener("install", event => {
   console.log("Service worker installed");
});
self.addEventListener("activate", event => {
   console.log("Service worker activated");
});
self.addEventListener("fetch", (e) => {
   e.respondWith(
     (async () => {
       const r = await caches.match(e.request);
       console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
       if (r) {
         return r;
       }
       const response = await fetch(e.request);
       const cacheName = "js13kPWA-v1";

       const cache = await caches.open(cacheName);
       console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
       cache.put(e.request, response.clone());
       return response;
     })(),
   );
 });