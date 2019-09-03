const CACHE_NAME = "cache_v" + 1; //默认情况 sw文件变化后会重新注册serviceWork

const CACHE_LIST = ["/", "/index.html", "/index.css", "/main.js", "/api/img"];

//获取数据后进行缓存
function fetchAddSave(request) {
  //如果请求到了 需要更新缓存
  return fetch(request).then(res => {
    //res必须克隆 因为使用一次就销毁
    let r = res.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(request, r));
    return res;
  });
}
//线程中 不能发ajax --> fetch fetchApi
self.addEventListener("fetch", e => {
  //如果联网的话就发请求
  if (e.request.url.includes("/api/")) {
    return e.respondWith(
      fetchAddSave(e.request).catch(err => {
        //打开缓存 把缓存中匹配到的结果 返还回去
        return caches.open(CACHE_NAME).then(cache => cache.match(e.request));
      })
    );
  }
  //用什么内容 返回当前响应
  e.respondWith(
    fetch(e.request).catch(err => {
      //打开缓存 把缓存中匹配到的结果 返还回去
      return caches.open(CACHE_NAME).then(cache => cache.match(e.request));
    })
  );
});
//缓存 需要缓存内容
function preCache() {
  return caches.open(CACHE_NAME).then(cache => {
    //添加列表到缓存中
    return cache.addAll(CACHE_LIST);
  });
}
self.addEventListener("install", e => {
  //如果上一个serviceWork不销毁 需要手动skipWating
  e.waitUntil(preCache().then(skipWaiting));
});
//激活当前serviceWork,让servicel立即生效 self.clients.claim()
function clearCache() {
  return caches.keys().then(keys => {
    return Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    );
  });
}
// 当前serviceWorker安装完毕后
self.addEventListener("activate", e => {
  e.waitUntil(Promise.all([clearCache(), self.clients.claim()]));
});
