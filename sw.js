// Offline cache for the Speak & Learn web app.
// Pages (index.html) are fetched NETWORK-FIRST so updates show up right away;
// the cached copy is only used when you're offline.
const CACHE_NAME = "armanly-v8";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-180.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS.map(function(u){ return new Request(u, {cache: "reload"}); }));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event){
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return; // fonts etc. go straight to network

  // Network-first: always try to get the newest version, fall back to cache offline.
  event.respondWith(
    fetch(req).then(function(response){
      var copy = response.clone();
      caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
      return response;
    }).catch(function(){
      return caches.match(req).then(function(c){ return c || caches.match("./index.html"); });
    })
  );
});
