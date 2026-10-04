const CACHE='codexda-v6-shell';
const NEWS_CACHE='codexda-v6-news';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.json','./assets/developer-studio.png'];

self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&key!==NEWS_CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));

function todayKey(url){
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata'}).format(new Date());
  return new Request(`${url.origin}${url.pathname}?codexda-news-date=${day}`);
}

async function handleNews(request){
  const url=new URL(request.url), cache=await caches.open(NEWS_CACHE), key=todayKey(url);
  const today=await cache.match(key);
  if(today)return today;
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response.ok){
      await cache.put(key,response.clone());
      await cache.put(new Request(`${url.origin}${url.pathname}?codexda-news-latest`),response.clone());
    }
    return response;
  }catch(error){
    return (await cache.match(new Request(`${url.origin}${url.pathname}?codexda-news-latest`))) || Response.error();
  }
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.hostname==='api.mediastack.com'&&url.pathname==='/v1/news'){
    event.respondWith(handleNews(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match('./index.html'))));
});
