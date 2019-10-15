# webpack

## 什么是 plugins

翻译过来就是插件的意思。plugin 可以在 webpack 运行到某个时刻的时候，帮你做一些事情。可以联想 vue，react 框架的页面生命周期，不同的插件会在不同的“时刻”帮你做不同的事情。和 loader 的区别重点在「某个时刻」和「某类文件」。

## html中引入JS

### htmlWebpackPlugin

#### 安装 html-webpack-plugin

```shell
npm i html-webpack-plugin -D
```

#### webpack.config.js 中做配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html', // 模板
  })],
  ...
}
```

#### html-webpack-plugin 做的工作

在打包结束后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中。

## 清除 dist 目录

### clean-webpack-plugin

此 plugin 能实现打包前先清除已有的 dist 目录。

```shell
npm i clean-webpack-plugin -D
```

#### webpack.config.js 中做配置

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  ...
  plugins: [
    ...
    new CleanWebpackPlugin()
  ],
  ...
}
```

## 多文件打包

之前 webpack 配置中我们都在打包单个文件，那么多文件应该如何打包呢？配置如下：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // ↓ 把 index.js 打包两次，分别起名为 main 和 sub ↓
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  }, // 1. 设置 webpack 从 index.js 打包
  output: { // 2. 然后把打包后的文件放到 dist 文件夹下，并分别命名为 entry 对象中的key值
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development', // 生产环境[production]打包（会压缩代码）or 开发环境[development]打包（不压缩代码）
}
```

## publicPath 公共路径配置

### 场景

通常情况下，我们会把打包好后的 index.html 给后端，js文件则上传到 cdn 下，所以现有的 `index.html` 中的 js 引入路径例如 `<script type="text/javascript" src="main.js"></script>` 就有问题了，我们需要加上cdn地址前缀。

###webpack.config.js 中做配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // ↓ 把 index.js 打包两次，分别起名为 main 和 sub ↓
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  }, // 1. 设置 webpack 从 index.js 打包
  output: { // 2. 然后把打包后的文件放到 dist 文件夹下
    publicPath: 'https://cdn.lance.cn/', // 3. 配置公共路径前缀
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development', // 生产环境[production]打包（会压缩代码）or 开发环境[development]打包（不压缩代码）
}
```

最后 `npm run bundle` 打包，会发现 dist 目录下 index.html 中的 js 引用路径变成了：

```html
<script type="text/javascript" src="https://cdn.lance.cn/main.js"></script>
```

