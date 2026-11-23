const VERSION='doom-tracker-v8',SHELL=['./','./index.html','./manifest.webmanifest','./doom-icon-v7-192.png','./doom-icon-v7-512.png','./doom-icon-v7-maskable-512.png','./catalog-v5.js','./catalog-v5.css','./upgrade-v6.js?v=7','./upgrade-v6.css?v=7','./cast-v8.js?v=8','./cast-v8.css?v=8'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const req=event.request;if(req.method!=='GET')return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(res=>{if(res.ok){const r=res.clone();caches.open(VERSION).then(c=>c.put('./index.html',r)).catch(()=>{})}return res}).catch(()=>caches.match('./index.html')));return;
 }
 if(req.url.startsWith(self.location.origin)){
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok){const r=res.clone();caches.open(VERSION).then(c=>c.put(req,r)).catch(()=>{})}return res})));return;
 }
 // Do not pre-download 38 large posters: cache images only after they are viewed, preserving mobile data.
 if(req.destination==='image'){
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok||res.type==='opaque'){
    const r=res.clone();caches.open(VERSION).then(c=>c.put(req,r)).catch(()=>{});}return res;})));}
});