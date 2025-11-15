const CACHE_NAME="vr-explorer-v6";
const ASSETS_TO_CACHE=[
  "/ExplorerTest7/",
  "/ExplorerTest7/index.html",
  "/ExplorerTest7/manifest.json",
  "/ExplorerTest7/icons/icon-192.png",
  "/ExplorerTest7/icons/icon-512.png",
  "/ExplorerTest7/icons/icon-maskable-192.png",
  "/ExplorerTest7/icons/icon-maskable-512.png"
];

self.addEventListener("install", e=>{
    e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS_TO_CACHE)));
    self.skipWaiting();
});

self.addEventListener("activate", e=>{
    e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
    self.clients.claim();
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        fetch(e.request).then(resp=>{caches.open(CACHE_NAME).then(c=>c.put(e.request,resp.clone())); return resp;}).catch(()=>caches.match(e.request))
    );
});
