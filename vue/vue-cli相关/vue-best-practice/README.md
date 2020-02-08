# Vue项目最佳实践

## 资源

- [Vue-CLI 3.0](https://cli.vuejs.org/zh/guide/webpack.html)

## 知识点

### vue-cli 3.x项目配置

`vue-cli` 项目基于 `webpack` 构建，并带有合理的默认配置；可以通过项目内的配置文件进行配置；可以通过插件进行扩展。

#### webpack相关配置，请在根目录创建vue.config.js

```js
// vue.config.js
const port = 7070;
const title = "vue项目最佳实践";
module.exports = {
  publicPath: '/best-practice', // 部署应用包时的基本 URL
  devServer: {
  	port: port,
  },
  configureWebpack: {
    // 向index.html注入标题
    name: title
  }
};
// public/index.html
<title><%= webpackConfig.name %></title>
```

> 注意：以上配置要求vue-cli-service版本>=3.5
>
> 通过命令查看配置结果：
>
> - vue inspect 全部配置
>
> - vue inspect --rules 查看全部规则
>
> - vue inspect --rule vue 查看指定规则
>
> - vue inspect --plugins 查看全部插件
>
> - vue inspect --plugin vue-plugin 查看指定插件
> - vue inspect --mode development 指定模式
>
> 通过ui查看配置结果：
>
> - vue ui

#### [高级链式操作]([https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7](https://cli.vuejs.org/zh/guide/webpack.html#链式操作-高级))：webpack规则配置

使用icon前先安装依赖：`svg-sprite-loader`

```shell
npm i svg-sprite-loader -D
```

[下载图标](https://www.iconfont.cn/)，存入src/icons/svg中

随便在上面网站上下载几个图标，例如qq、微博、微信

```js
└── svg
    ├── qq.svg
    ├── weibo.svg
    └── wx.svg
```

修改规则和新增规则，`vue.config.js` :

```js
// resolve定义一个绝对路径获取函数
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
//...
module.exports = {
	// ...
	chainWebpack(config) {
		// 配置svg规则排除icons目录中svg文件处理
		config.module
			.rule("svg")
			.exclude.add(resolve("src/icons"))
			.end();
		// 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
		config.module
			.rule("icons")
			.test(/\.svg$/)
			.include.add(resolve("src/icons"))
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({ symbolId: "icon-[name]" }) // 使用图标的名称
			.end();
	}
};
```

上方配置的结果最终会变成下面代码：

```js
/* config.module.rule('icons') */
{
  test: /\.svg$/,
    include: [
      '/Users/macbook/Documents/examination/front-end-playground/vue/vue-cli相关/vue-best-practice/src/icons'
    ],
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
}
// 上面代码可通过命令行 vue inspect --rule icons 获得
```

测试，HelloWorld.vue

```html
<template>
  <div class="hello">
    <svg>
      <use xlink:href="#icon-qq"></use>
    </svg>
  </div>
</template>

<script>
import '@/icons/svg/qq.svg';
//...
</script>
```

重启 `npm run serve` 就能看到svg图片了。

但每次添加三行标签外加导入svg图片路径很繁琐，所以我们需要对其进行封装：

##### 1. 图片自动导入

```js
// icons/index.js
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req);

// main.js
import './icons'
```

此时我们已经完成了第一步，不再需要在每个需要svg的文件中单独导入svg了，现在删除之前在 `HelloWorld.vue` 中import的 qq.svg，重启serve服务，会发现图标仍然能正常显示。

> 🎉 拓展 - 何为 require.context  🎉
>
> 一个webpack的api,通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块
>
> 这个方法有 3 个参数：
>
> - 要搜索的文件夹目录
> - 是否还应该搜索它的子目录
> - 以及一个匹配文件的正则表达式。

具体用法可参考：[使用require.context实现前端工程自动化](https://www.jianshu.com/p/c894ea00dfec)

##### 2. 创建SvgIcon组件，./components/SvgIcon.vue

```html
<template>
	<svg :class="svgClass" aria-hidden="true" v-on="$listeners">
		<use :xlink:href="iconName" />
	</svg>
</template>
<script>
export default {
	name: "SvgIcon",
	props: {
		iconClass: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ""
		}
	},
	computed: {
		iconName() {
			return `#icon-${this.iconClass}`;
		},
		svgClass() {
			if (this.className) {
				return "svg-icon " + this.className;
			} else {
				return "svg-icon";
			}
		}
	}
};
</script>
<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>

```

##### 3. 注册，icons/index.js

```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
Vue.component('svg-icon', SvgIcon)

// ...
```

##### 4. 使用，HelloWorld.vue

```html
<template>
  <div class="hello">
    <svg-icon icon-class="qq"></svg-icon>
  </div>
</template>
```

