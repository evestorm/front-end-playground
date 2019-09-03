// 默认情况下 sw文件变化后会重新注册serviceWork
const CACHE_NAME = "cache_v" + 1;

// 缓存列表：告诉sw要缓存哪些内容
const CACHE_LIST = [
  "/",
  "/index.html",
  "/index.css",
  "/main.js",
  "/api/img"
];

// 1. 首先安装sw，缓存文件
self.addEventListener("install", e => {
  //如果上一个serviceWork不销毁，当前的新sw就不会被激活，
  // 所以需要在产生新sw后，在then中手动skipWaiting，不去等待上一个sw的销毁
  e.waitUntil(preCache().then(skipWaiting));
});

// 2. 在安装 Service Worker 且用户转至其他页面或刷新当前页面后
// Service Worker 将开始接收 fetch 事件。
// fetch 事件监听客户请求
// 从缓存中找到缓存文件返回请求
self.addEventListener("fetch", e => {
  //如果联网的话就发请求
  // 而sw中不能发ajax请求，所以转为用 fetch api 发请求（fetch基于promise）
  if (e.request.url.includes("/api/")) { // 截取包含 api 的网络请求
    return e.respondWith(
      // 缓存策略：先发请求看能不能成功（网络正常），如果成功则把网络请求返还，且更新缓存
      // 失败则从已有缓存中取对应api的数据
      // 其他策略：缓存优先 / 网络优先 ...

      // 发起请求，如果请求失败，证明网挂了，就会被catch捕获
      // 然后就可以去缓存中匹配有没有对应响应的缓存，有就返回
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

// 3. 当前serviceWorker激活后，
// （删除之前的sw缓存，并且让当前sw立即生效）
self.addEventListener("activate", e => {
  // self.clients.claim()：
  // 激活当前serviceWork,让service worker立即生效
  e.waitUntil(Promise.all([clearCache(), self.clients.claim()]));
});

// 发起请求，获取数据后进行缓存
function fetchAddSave(request) {
  //如果请求到了 需要更新缓存
  return fetch(request).then(res => {
    //res必须克隆 因为使用一次就销毁
    let r = res.clone();
    // 更新缓存
    caches.open(CACHE_NAME).then(cache => cache.put(request, r));
    return res;
  });
}
//缓存 需要缓存内容
function preCache() {
  // 开启一个缓存空间（caches是个promise）
  return caches.open(CACHE_NAME).then(cache => {
    //添加列表到缓存中（return的也是个promise）
    return cache.addAll(CACHE_LIST);
  });
}

function clearCache() {
  return caches.keys().then(keys => {
    return Promise.all(
      keys.map(key => {
        // 名字不相等表示是旧缓存，删掉
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    );
  });
}