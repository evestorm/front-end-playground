# webpack拓展

## sourceMap

作为开发，代码调试当然少不了，那么问题来了，经过打包后的文件，你是不容易找到出错的地方的，`SourceMap` 就是用来解决这个问题的。

### 使用案例

首先我们的 `src` 目录结构如下：

```shel
├── index.html
└── index.js
```

其中 index.js 中代码就一句话：

```js
consele.log('Hello world');
```

并且这句话的 `console` 故意拼错。

然后来到 `webpack.config.js` 配置文件先设置不添加 `sourceMap` （默认 development 模式下 sourceMap 会自动开启）：

```js
module.exports = {
  entry: {
    main: './src/index.js',
  },
  devtool: 'none', // 关闭 'none'，启用 'source-map'
}
```

最后运行 `npm run bundle` 并打开 `dist/index.html` 我们会在控制台发现报错，但报错指向的位置是打包好后 `main.js` 中具体的代码行，这往往不是我们想要的，我们想要的是能够直接指出对应未打包前 js 对应出错的文件的具体出错行数。这个时候 sourceMap 的作用就提现出来了，它能在浏览器的调试工具中提示我们 js 错误具体出现的文件位置，而非打包好后 `main.js` 的出错位置，这样一来出错定位就能更加清晰。

### sourceMap 总结

sourceMap 是一个映射关系，它知道 dist 目录下 `main.js` 文件第XX行实际上对应着 `src` 目录下 `index.js` 文件第XX行。当使用它后，在 `dist` 目录下，每个 js 文件都对应添加上了一个 `[name].js.map` 的文件，这个文件就是用来记录js文件们的映射关系的：

```js
.
├── index.html
├── main.js
└── main.js.map
```

#### 配置常用可用值总结

- none 不使用
- source-map 使用，且每个 js 文件都对应一个 `[name].js.map` 的文件，用来记录映射关系
- inline-source-map 使用，不过映射文件不再单独存在，而是放在打包后的 `main.js` 文件中的最后。
- cheap-inline-source-map 使用，不过和前一个的区别是，inline-source-map 会精确的告诉你出错代码在第几行第几个字符。而cheap-inline-source-map 则只会告诉你出错在第几行。
- cheap-module-source-map 使用，前几项只会关注自身业务代码js文件之间的映射关系。加上 module 后，还会管项目中其他模块，例如 loader，第三方模块中的出现的错误。
- eval 使用，不过在 `main.js` 中是以 `eval(...)` 的形式描述错误映射关系的
- 【开发环境下推荐配置】cheap-module-eval-source-map，这种方式提示的错误是比较全的，同时它的打包速度又是比较快的。
- 【线上环境下推荐配置】cheap-module-source-map（不过一般线上环境下不需要配置 sourceMap ，设置为 none 就好）

## 实现 webpack 实时打包构建

webpack 提供了一个可选的本地开发服务器，这个本地服务器基于 node.js 构建，它是一个单独的插件，叫做 `webpack-dev-server` ，在 webpack 中进行配置之前需要单独安装它作为项目依赖。

devServer 作为 webpack 配置选项中的一项，以下是它的一些配置选项:

- `contentBase` ：设置服务器所读取文件的目录，当前我们设置为”./dist”
- `port` ：设置端口号，如果省略，默认为`8080`
- `inline` ：设置为`true`，当源文件改变时会自动刷新页面
- `historyApiFallback` ：设置为`true`，所有的跳转将指向`index.html`

1. 由于每次重新修改代码之后，都需要手动运行 webpack 打包的命令，比较麻烦，所以使用 `webpack-dev-server` 来实现代码实时打包编译，当修改代码之后，会自动进行打包构建。

2. 运行 `npm i webpack-dev-server -D` 安装到开发依赖

3. 安装完成之后，在 `webpack.config.js` 中配置：

   ```
   devServer: {
     inline: true, //打包后加入一个 websocket 客户端
     hot: true, // 启用热更新 的 第1步
     open: true, // 自动打开浏览器
     contentBase: path.resolve(__dirname, 'dist'), // 指定托管的根目录，不注释的话，无法访问 src 以外的资源，比如 node_modules
     host: 'localhost', // 主机地址
     port: 4321, // 设置启动时候的运行端口
     compress: true // 开发服务器是否启动gzip等压缩
   },
   ```

4. 在头部引入 `webpack` 模块：

   ```javascript
   // 启用热更新的 第2步
   const webpack = require('webpack')
   ```

5. 在 `plugins` 节点下新增：

   ```js
   // 启用热更新的第 3 步
   new webpack.HotModuleReplacementPlugin()
   ```

6. 在 `package.json` 中新增一段 script：`"dev": "webpack-dev-server"`
7. 最后运行 `npm run dev` 。这样就实现自动打开浏览器、热更新和配置浏览器的默认端口号了。
   1. 你会虽然实现了实时打包，但 dist 目录下并没有生成相关文件，这是因为 `webpack-dev-server` 将打包好的文件放在了内存中，这样带来的好处是由于需要实时打包编译，所以放在内存中速度会非常快。

## 使用 Babel 处理 ES6 语法

首先在 `index.js` 中编写 ES6语法 的 JS 代码：

```js
const arr = [
  new Promise(() => {}),
  new Promise(() => {}),
]

arr.map(item => {
  console.log(item)
})
```

执行 `npm run bundle` 打包。



将打包好的 `dist` 目录下 index.html 在各浏览器下运行，会发现 chrome，Safari 和 Firefox 等现代浏览器能够正常执行并打印。而在 IE 和一些国产浏览器下会报错。报错的原因就是这些浏览器不识别 ES6 语法。所以为了兼容性，我们还得将其转为 ES5 ，而 Babel 就能帮助我们解决此问题。

### ES6语法转ES5

我们进入 `Babel` 官网：https://babeljs.io/ ，找到顶部菜单栏的 `Setup` ，选择列表中的 `Webpack` ，就进入了如何在工具「webpack」中使用 Babel 的教程页面，我们直接根据指导进行操作：

1. 安装 `npm install --save-dev babel-loader @babel/core`

2. 接着在 `webpack.config.js` 中做规则配置：

   ```js
   module: {
     rules: [
       { 
         test: /\.js$/, 
         exclude: /node_modules/, // 排除第三方库的ES6转换
         loader: "babel-loader" // 此loader仅是webpack和babel之间的一个“桥梁”，它本身并不会帮你把js中的ES6转为ES5
       }
     ]
   }
   ```

3. 然后创建 `.babelrc` 配置文件：

   1. 首先安装 `env preset`：

      ```js
      npm install @babel/preset-env --save-dev
      ```

   2. 在创建好的 `.babelrc` 中做配置：

      ```json
      {
        "presets": ["@babel/preset-env"]
      }
      ```

   **说明**：为什么要安装 `@babel/preset-env` 呢？因为实际上之前安装的 `babel-loader` 仅是webpack和babel之间的一个“桥梁”，它本身并不会帮你把js中的ES6转为ES5。真正去帮我们做转换的是 `@babel/preset-env` 。

4. 最后执行 `npm run bundle` ，我们就会发现在打包好后的 `main.js` 中，babel已经帮我们将ES6语法转为了ES5语法了：

   ```js
   var arr = [new Promise(function () {}), new Promise(function () {})];
   arr.map(function (item) {
     console.log(item);
   });
   ```

   

### Babel-Polyfill

虽然上面我们已经把ES6语法转为了ES5，但在IE等一众浏览器下，它们仍然不能识别 Promise 等对象，此时就得借助 `babel-polyfill` ，让它帮我们实现一个 Promise ，这样IE等浏览器就能识别 Promise 了。

点击 Babel 官网顶部的「Docs」菜单栏，找到侧边栏的 Usage 目录下的 [polyfill](https://babeljs.io/docs/en/babel-polyfill) 板块，跟着教程指南走一遍流程。

1. 首先安装：

   ```js
   npm install --save @babel/polyfill
   ```

2. 在你使用了 ES6 语法的js文件中引入：

   ```js
   import "@babel/polyfill"; // ← 引入
   
   // consele.log('Hello world');
   
   const arr = [
     new Promise(() => {}),
     new Promise(() => {}),
   ]
   
   arr.map(item => {
     console.log(item)
   })
   ```

3. 接着运行 `npm run bundle` 就能实现 polyfill 了。但回过头观察在未使用之前打包后的 `main.js` 文件大小：`main.js   28.9 KiB` ，使用后的大小：`main.js    428 KiB` 。从这一点我们就可以看出，多出的这么些大小，就是 babel-polyfill 帮我们在 `main.js` 中弥补了低版本浏览器中不存在的内容，比如 Promise 的实现，数组 map 方法的实现。

4. 但其实我们的js中仅仅使用了两个高级ES6语法，并不需要把所有低版本浏览器不识别的语法都在 `main.js` 中进行实现，为了让最后打包后的 `main.js` 体积更小，我们可以在 `.babelrc` 中配置下，让其仅给js文件中已有的高级ES6 API做代码实现：

   ```js
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "useBuiltIns": "usage"
         }
       ]
     ]
   }
   ```

   配置文档详情见：https://babeljs.io/docs/en/babel-preset-env#usebuiltins

5. 这样一来，`@babel/preset-env` 就会根据我们业务代码js中的实际情况进行对特定语法或API的实现，例如我们只用到了 `Promise` 和 `map` ，那么`@babel/preset-env` 就只会对它俩进行实现。我们再次执行 `npm run bundle` ，就会发现打包后的 `main.js` 体积变得小了很多：`main.js   87.7 KiB`

p.s. 细心的你如果查看启动 `npm run bundle` 后的控制台打印，就会发现这样一句话：

> When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
> Please remove the `import '@babel/polyfill'` call or use `useBuiltIns: 'entry'` instead.

这句话的意思是，在新版 webpack4 中，一旦你在 `.babelrc` 下对 `@babel/preset-env` 做了「useBuiltIns: 'usage'」的配置，就不用在编写了 es6 语法的 js 文件开头引入 `import "@babel/polyfill";` 了。`@babel/polyfill"` 会自动的引入所需代码，所以我们可以删除 `index.js` 中开头的引入。

### 更多配置

#### targets

在刚才的 `.babelrc` 中，除了提到的「useBuiltIns」参数外，我们还可以配置「targets」，它的作用是告诉 `@babel/preset-env`，在哪些浏览器下不用做语法转换。

举个例子，在chrome58版本以上，已经实现了 `Promise` 和 `map` ，那我们其实完全不用在打包后的 `main.js` 中再次实现它们，因为浏览器自身支持。所以我们可以这样配置：

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": 58
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

再次运行 `npm run bundle` 打包，会发现打包后的 `main.js` 回到了以前的大小：`main.js   28.9 KiB` ，并没有在文件中实现Promise和map了。