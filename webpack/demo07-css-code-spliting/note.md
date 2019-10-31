# webpack CSS代码分割 (code spliting)

## chunkFilename 属性的作用

有时候会发现别人的 webpack 配置中的 output 配置项下有个 `chunkFilename` 属性：

```js
output: {
  publicPath: '',
  filename: '[name].js',
  chunkFilename: '[name].chunk.js', // ←
  path: path.resolve(__dirname, '../dist')
},
```

这个 output 配置中 chunkFileName 用以命名未出现在入口文件的打包文件，filename 用来命名入口文件对应的打包文件名。

我们在 `build/webpack.common.js` 中配置如上代码，运行 `npm run build` 后就会发现，入口文件 `main.js` 被打包成了 `main.[contenthash:10].js` 的形式，而 `lodash.js` 则被打包成了 `lodash.chunk.js` 。

## CSS 代码分割

首先在 `src` 下新建 `style.css` ：

```css
body {
  background: yellow;
}
```

再修改 `src/index.js` 代码为下方所示：

```js
import './style.css';

console.log('hello world');
```

webpack 配置文件 `build/webpack.prod.js` 中的css解析规则如下：

```json
rules: [{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    'postcss-loader'
  ]
}]
```

最后我们运行 `npm run build` ，打开 index.html 文件，发现css并没有出现在里面，但浏览器查看却发现黄色背景生效了。这里其实是在 `main.js` 中直接引入了css，如果你在页面上右击查看源代码就会发现，css被内联到了页面中。现在我们要做的，就是把这个css文件单独提出来打包，link到index.html。

### mini-css-extract-plugin

这是个将CSS提取为独立的文件的插件，我们先来安装它：

```shell
npm i mini-css-extract-plugin -D
```

再来到 `build/webpack.prod.js` 中做配置：

```js
// 第一步引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 第二步配置规则
module: {
  rules: [{
    test: /\.css$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      // 'style-loader', 注意，此处需要用 MiniCssExtractPlugin 插件替换掉了先前的 style-loader
      'css-loader',
      'postcss-loader'
    ]
  }]
},

// 第三步实例化插件
plugins: [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  }),
],
```

最后我们再次打包 `npm run build` ，就会发现 `style.css` 被单独打包成了一个 `main.css` 文件，并且被 `main.html` 文件link了。

p.s. 打包生成的css文件名叫做 `main.css` 而非 `style.css` 是因为入口文件 `index.html` 直接引入了这个css，所以走了 `MiniCssExtractPlugin` 配置的 `filename` 配置项。如果这个css文件是间接被引入到 `index.html` 中的话，就会走 `chunkFilename` 配置项。

### optimize-css-assets-webpack-plugin

这个插件是用来给css做代码压缩的。

首先安装：

```shell
npm install optimize-css-assets-webpack-plugin -D
```

然后在 `build/webpack.prod.js` 中做配置：

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
}
```

我们再次 `npm run build` 打包，就会发现打包生成的 `main.css` 文件已经做了代码压缩了。
