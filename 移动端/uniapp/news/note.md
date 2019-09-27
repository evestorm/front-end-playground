# uniapp 基础

## 创建项目

新建项目：

1. 类型选择 uni-app
2. 模板选择 默认模板
3. 点击创建

## 导入 hello-uniapp 模板中的文件

新建 hello-uniapp 项目

1. 类型选择 uni-app
2. 模板选择 hello-uniapp
3. 点击创建

### 拷贝 common 文件夹

将 hello-uni-app 中的 common 文件夹整个复制到自己项目中去。然后在 `App.vue` 中引入：

```html
<style>
	/* #ifdef APP-PLUS */
	/*每个页面公共css */
	@import './common/uni.css';
	/* #endif */
</style>
```

## 在微信小程序中启动 uni-app

### HBuilderX设置

#### 运行设置

![image-20190924073641782](/Users/macbook/Library/Application Support/typora-user-images/image-20190924073641782.png)

![image-20190924073713891](/Users/macbook/Library/Application Support/typora-user-images/image-20190924073713891.png)

#### 设置微信小程序 AppID

![image-20190925203138928](/Users/macbook/Library/Application Support/typora-user-images/image-20190925203138928.png)

### 微信小程序工具打开服务端端口

这样HBX就能调用小程序工具了

![image-20190924073540505](/Users/macbook/Library/Application Support/typora-user-images/image-20190924073540505.png)

![image-20190924073557945](/Users/macbook/Library/Application Support/typora-user-images/image-20190924073557945.png)

最后 Ctrl+R / CMD + R 在小程序中运行即可。

## 编写列表页

### 更改导航栏背景色和字体颜色

> pages.json

```json
"globalStyle": {
	"navigationBarTextStyle": "white",
	"navigationBarTitleText": "新闻快讯",
	"navigationBarBackgroundColor": "#3b9fe2",
	"backgroundColor": "#F8F8F8"
}
```

### 使用到的组件

- [scroll-view组件](https://uniapp.dcloud.io/component/scroll-view?id=scroll-view)
- [滑动视图/轮播图组件](https://uniapp.dcloud.io/component/swiper?id=swiper)

### 发送网络请求

- [uni.request](https://uniapp.dcloud.io/api/request/request?id=request)

```js
uni.request({
    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
    data: { id },
    header: {
        'custom-header': 'hello' //自定义请求头信息
    },
    success: (res) => {
        console.log(res.data);
        this.text = 'request success';
    }
});
```

### 跳转传参

列表页通过 @tap 触发点击，参数以 data-* 的形式传入：

```html
<view class="news-item"
	v-for="(item, index) in newsList"
	:key="index"
	@tap="onTapItem" :data-news-id="item.id">
```

js 通过 uni.navigateTo 跳转：

```js
onTapItem(e) {
	const newsId = e.currentTarget.dataset.newsId
	uni.navigateTo({
		url: '../info/info?newsId=' + newsId
	});
},
```

详情页可在 `onLoad` 函数中接收传递过来的参数：

```js
onLoad(payload) {
	let id = payload.newsId
	if (id) {
	  this.getDetail(id)
	}
},
```

