'use strict';
const PREFIX='crystal-duel:'+self.registration.scope;
const CACHE=PREFIX+'v0.3.0';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./v03/styles.css?v=0.3.2", "./v03/game.js", "./v03/cards.js", "./v03/art.js", "./v03/engine.js", "./v03/audio.js", "./v03/assets/arena.webp", "./v03/assets/mages.webp", "./v03/assets/creatures.webp"];
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
