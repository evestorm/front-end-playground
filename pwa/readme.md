# PWA

## 介绍

PWA的中文名叫做渐进式网页应用。它能将 `Web` 和 `App` 各自的优势融合在一起：渐进式、可响应、可离线、实现类似 `App` 的交互、即时更新、安全、可以被搜索引擎检索、可推送、可安装、可链接。

**需要特别说明的是，PWA 不是特指某一项技术，而是应用了多项技术的 Web App。其核心技术包括 App Manifest、Service Worker、Web Push，等等。**

## 特点

### 可安装

1. 可安装指的是可以像原生APP在主屏幕上留有图标。

2. 但是这需要我们提供 `Web app manifest`，`manifest.json` 是一个简单的JSON文件，我们在 `html` 页面如下引用他：

  ```html
  <link rel="manifest" href="/manifest.json">
  ```

它描述了我们的图标在主屏幕上如何显示，以及图标点击进去的启动页是什么，它的JSON格式如下所示：

```json
{
    "name":"街区地图", // 应用名称  
    "short_name":"街区地图", // 桌面应用的名称  ✓
    "display":"standalone", // 设置启动样式 fullScreen (standalone) minimal-ui browser ✓
    "start_url":"", // 打开时的网址  ✓
    "icons":[{
      "src": "images/touch/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },{
      "src": "images/touch/apple-touch-icon.png",
      "sizes": "152x152",
      "type": "image/png"
    },{
      "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
      "sizes": "144x144",
      "type": "image/png"
    }], // 设置桌面图片 icon图标 修改图标需要重新添加到桌面icons:[{src,sizes,type}]
    "background_color":"#aaa", // 会设置背景颜色， Chrome 在网络应用启动后会立即使用此颜色，这一颜色将保留在屏幕上，直至网络应用首次呈现为止。
    "theme_color":"#aaa" // 会设置主题颜色
}
```

更多 `manifest.json` 配置可以参考[MDN文档](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FManifest) 。

### 离线使用

`PWA` 另一项令人兴奋的特性就是可以离线使用,其背后用到的技术是 `Service worker`

`Service worker`实际上是一段脚本，在后台运行。作为一个独立的线程，运行环境与普通脚本不同，所以不能直接参与 Web 交互行为。`Service Worker`的出现是正是为了使得 `Web App`也可以做到像 `Native App`那样可以离线使用、消息推送的功能。

#### 注册一个 service worker

> index.html

```js
window.addEventListener('load',function(){
  // 页面加载完成后 注册serviceWorker
  if('serviceWorker' in navigator){
      navigator.serviceWorker.register('./sw.js').then(reg=>{
          console.log(reg.scope);
      });
      navigator.serviceWorker.addEventListener('controllerchange',()=>{
          console.log('change')
      })
  }
  if(!navigator.onLine){
      window.addEventListener('online',()=>{
          console.log('更新');
      })
  }
});
```

#### service worker 生命周期

[使用 Service Workers
](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)

#### 离线缓存，应用cache缓存请求

> sw.js

```js
// self 当前线程中的this
// 拦截用户发送的所有请求
let CACHE_NAME = `cache_version_` + 81;
let CACHAE_LIST = [
    '/',
    '/index.css',
    '/index.html',
    'main.js',
    '/getImage'
];
// 独立的线程 可以使用fetch 但是不能使用ajax
function fetchAndSave(req){
    return fetch(req).then(res=>{ // res 是流 
        // 做缓存操作
        let r = res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(req,r));
        return res;
    })
}
self.addEventListener('fetch', e => {
    // 用相应来替换 如果获取不到才用缓存
    let url = new URL(e.request.url);
    if(url.origin !== self.origin){
        return;
    }
    if(e.request.url.includes('/getImage')){ // 调用了接口
        // 如果遇到了接口  更新缓存
        e.respondWith(
            fetchAndSave(e.request).catch(err=>{
                //  如果没网 在缓存中 匹配结果 返回请求
                return caches.match(e.request);
            })
        )
        return;
    }
    e.respondWith(
        fetch(e.request).catch(err=>{
            //  如果没网 在缓存中 匹配结果 返回请求
            return caches.match(e.request);
        })
    )
}); // 用缓存替换

// serviceWorker安装的阶段
function preCache() {
    return caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CACHAE_LIST);
    })
}
self.addEventListener('install', (e) => {
    // 安装的过程中需要缓存
    e.waitUntil(
        preCache().then(skipWaiting) 
    )
});
function clearCache() {
    return caches.keys().then(keys => {
        return Promise.all(keys.map(key => {
            if (key !== CACHE_NAME) {
                return caches.delete(key);
            }
        }))
    })
}
self.addEventListener('activate', (e) => {
    e.waitUntil(
        Promise.all([
            clearCache(),
            self.clients.claim() // 立即使serviceWorker生效
        ])
    )
})
```

### 自己动手做一个pwa项目

[your-first-pwapp](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/)

## 参考阅读

- [简单介绍一下Progressive Web App(PWA)](https://juejin.im/post/5a6c86e451882573505174e7)
- [什么是PWA](http://www.zhufengpeixun.cn/architecture/html/66-13.pwa.html#t0%E4%BB%80%E4%B9%88%E6%98%AFPWA)
