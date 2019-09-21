# webpack

## 什么是 loader

其实 loader 就是一个打包方案。它会告诉 webpack 应该「怎样」对某些特定文件进行打包。因为 webpack 本身是不知道对于某些文件应该如何打包的，而 loader 们告诉了它。

## 解析图片

### file-loader

#### 安装 file-loader

安装 file-loader 插件：

```shell
npm i file-loader -D
```

#### webpack.config.js 中做配置

```js
const path = require('path')

module.exports = {
  ...
  module: { // 针对具体模块设置解析规则
    rules: [{ // 使用 file-loader 插件对 *.jpg 文件进行解析
      test: /\.jpg$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  ...
}
```

#### file-loader 内部做的工作

1. 把文件挪到 dist 目录下
2. 把这个文件的地址再返回给你的变量（index.js 中的变量 avatar）

p.s. 理论上 file-loader 能处理任何文件，而不仅是图片资源

#### 打包图片的额外配置（文件名、打包目录...）

> webpack.config.js

```js
rules: [{
  test: /\.(jpg|png|gif)$/,
  use: {
    loader: 'file-loader',
    options: {
      // 自定打包后的图片对应文件名
      // 名称_hash值.文件后缀名
      name: '[name]_[hash].[ext]',
      outputPath: 'images/' // 把打包图片放进单独文件夹中
    }
  }
}]
```

#### 去官网查阅更多 file-loader 配置

https://webpack.js.org/loaders/file-loader

### 培养要使用 loader 的意识

webpack 对 js 文件以外文件格式都不识别。所以一旦在项目中要通过 `require` 或者 `import` 语法导入文件、且文件后缀不为 `.js` 时，就要考虑我需要使用对应的 `loader` 来解析它了。

例如 `import Header from './header.vue'` ，看到它就要想到，我们需要一个 loader 来解析它，这个 loader 则是 `vue-loader` 。

### url-loader

#### 安装 url-loader

此 loader 能实现 file-loader 的所有功能。并且还能对小文件图片进行 base64 编码转为字符串形式直接嵌入js文件中。

```shell
npm i url-loader -D
```

#### 替换 file-loader

```js
rules: [{
  test: /\.(jpg|png|gif)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name]_[hash].[ext]',
      outputPath: 'images/'
    }
  }
}]
```

运行 `npm run bundle` 后，会发现 dist 目录下已经没有 images 文件夹和图片了，因为此图片被 base64 编码进了 bundle.js 文件。

#### 根据文件大小更改打包形式

```js
rules: [{
  test: /\.(jpg|png|gif)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name]_[hash].[ext]', // 自定打包后的图片对应文件名
      outputPath: 'images/', // 把打包图片放进单独文件夹中
      limit: 204800, // 当图片大小大于204.8KB后，会单独打包到 images 文件夹下；如果小于204.8KB，就会直接base64到bundle.js中
    }
  }
}]
```

## 解析CSS

我们在 index.js 中引入一个 index.css 文件，然后在此文件中又 import 一个 avatar.css 文件。为了最后让css顺利给img标签添加上样式，我们需要两个 css loader。

### style-loader + css-loader

#### 安装两个 loader

```shell
npm install style-loader css-loader -D
```

#### 在 webpack.config.js 中配置

```js
rules: [{
  ...
}, {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}]
```

配置完毕后 `npm run bundle` ，就会发现图片已经应用了样式。

#### 分析两个 loader 作用

- css-loader 负责分析多个css之间的依赖关系，最终把多个css文件合并成一段css。
- style-loader 会把 css-loader 最终生成的 css 挂载到 index.html 文件的 head 标签中。

### 使用 sass-loader + node-sass 解析 scss

#### 安装 sass-loader + node-sass

```shell
npm i sass-loader node-sass -D
```

#### 在 webpack.config.js 中配置它们

```js
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

❗️警告❗️：安装 node-sass，但不需要在 webpack.config.js 中配置它。

#### sass-loader 的作用

它的作用就是对 scss 文件进行翻译，翻译成真正的 css 文件。

### 使用 postcss-loader 自动添加浏览器厂商前缀

#### 安装 postcss-loader

```shell
npm i postcss-loader -D
```

#### 项目根目录下新建 `postcss.config.js` 文件

```js
module.exports = {
  plugins: [
    // require('autoprefixer') 原本只用这么写，不过会失效
    // 原因见：http://www.mamicode.com/info-detail-2746932.html
    // 大概原因是postCss版本更新，之前版本的配置已无效
    require('autoprefixer')({
      overrideBrowserslist: ['> 0.15% in CN'] // 自动添加css前缀
    })
  ]
}
```

#### 安装上面配置的 autoprefixer

```shell
npm i autoprefixer -D
```

#### 在 webpack.config.js 中配置 postcss-loader

```js
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
}
```

再次打包，就能加上浏览器厂商前缀了。

### css-loader 扩展

#### importLoaders 的作用

相关代码逻辑：

index.js 引入了 `import './common.scss'`，而 `common.scss` 本身又引入了 `ext.scss` 文件。

如果想要针对 loader 进行进一步配置，我们则需要把 loader 名称改为对象的形式：

```js
use: [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2, // 意思是如果 scss 文件中又 import 了一个 scss 文件，为了防止它不重新走一个完整的 scss 文件处理流程（有可能会忽略掉 'postcss-loader' 以及 'sass-loader' 直接走 'css-loader'），所以添加一个 importLoaders: 2 的配置，让其也能走完 postcss-loader 和 sass-loader 的处理流程
    }
  },
  'sass-loader',
  'postcss-loader'
]
```

#### modules 开启 css 的模块化打包

目前我们的 `index.js` 文件如下：

```js
// var avatar = require('./avatar.jpg')
// console.log(avatar)

import avatar from './avatar.jpg'
import './index.css'
import './common.scss'

const img = new Image()
img.src = avatar
img.classList.add(style.avatar)

const root = document.getElementById('root')
root.appendChild(img)
```

然后我们新建一个 `createAvatar.js` 封装一个方法，专门用来创建 img ：

```js
import avatar from './avatar.jpg'

export default function createAvatar() {
  const img = new Image()
  img.src = avatar
  img.classList.add('avatar')

  const root = document.getElementById('root')
  root.appendChild(img)
}
```

然后我们改造 `index.js` ：

```js
import avatar from './avatar.jpg'
import './index.css'
import './common.scss'
import createAvatar from './createAvatar'

// 通过方法生成的图片
createAvatar()

// 直接生成的图片
const img = new Image()
img.src = avatar
img.classList.add('avatar')

const root = document.getElementById('root')
root.appendChild(img)
```

这个时候webpack打包后，会发现两张图片拥有相同的样式。但有时候我们其实并不希望这样，而是希望 index.js 中通过方法创建的 img 不应用 `common.scss` 中的样式，而未封装代码创建的 img 应用样式。这个时候我们就需要配置 `css-loader` 中的 `modules` 属性为 true ，开启 css 的模块化打包。

首先更改 `webpack.config.js` ：

```js
{
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: true, // 开启css的模块化打包
  }
},
```

然后回到 `index.js` 文件做如下改造：

```js
// var avatar = require('./avatar.jpg')
// console.log(avatar)

import avatar from './avatar.jpg'
import './index.css'
import style from './common.scss' // 起个别名
import createAvatar from './createAvatar'

// 通过方法生成的图片
createAvatar()

// 直接生成的图片
const img = new Image()
img.src = avatar
img.classList.add(style.avatar) // 单独加载 style 下的 avatar 样式

const root = document.getElementById('root')
root.appendChild(img)
```

这样一来便实现了 css 的模块化打包。

## 解析字体

### 安装字体文件

把字体文件扔进 `src` 的 `font` 文件夹

### 其他准备工作

新建 `font.scss` 专门用来引入字体

最后在 `index.js` 中引入 `font.scss`：

```js
// 引入
import './font.scss'

// 往index.html中添加字体
// 添加字体图标
const div = document.createElement('div')
div.innerHTML = '<div class="iconfont icon-changjingguanli"></div>'
root.appendChild(div)
```

### 在 webpack.config.js 中配置字体文件 loader

```js
{
  test: /\.(eot|ttf|svg)$/,
  use: {
    loader: 'file-loader'
  }
}
```

❗️说明❗：处理字体文件不需要对 css 进行模块化打包，所以注释掉之前 css-loader 的 modules 配置：

```js
{
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    // modules: true, // 开启css的模块化打包
  }
},
```

最后进行 `npm run bundle` 进行打包，这样字体就显示出来了。
