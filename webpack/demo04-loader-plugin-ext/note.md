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

