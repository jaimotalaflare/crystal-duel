'use strict';
const PREFIX='crystal-duel:'+self.registration.scope;
const CACHE=PREFIX+'v0.5.0';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./v05/styles.css?v=0501", "./v05/lobby.css?v=0501", "./v05/controls.css?v=0501", "./v05/crystals.css?v=0501", "./v05/game.js?v=0501", "./v05/cards.js?v=0501", "./v05/engine.js?v=0501", "./v05/art.js?v=0501", "./v05/audio.js?v=0501", "./v05/progress.js?v=0501", "./v05/lobby.js?v=0501", "./v05/friends.js?v=0501", "./v05/network.js?v=0501", "./v05/peerjs.min.js", "./v03/assets/mages.webp", "./v03/assets/creatures.webp", "./v03/assets/arena.webp"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||!event.request.url.startsWith(self.registration.scope))return;
  const path=new URL(event.request.url).pathname;
  const base=new URL(self.registration.scope).pathname;
  if(!FILES.map(f=>new URL(f,self.registration.scope).pathname).includes(path))return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put('./index.html',copy)))}
      return response;
    }).catch(()=>caches.match('./index.html')));
  }else event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
