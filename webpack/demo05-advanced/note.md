# webpack进阶

## 区分开发和生产环境

### 环境介绍

webpack的mode选项有三个值：development | production | none 。

详细参考：https://webpack.js.org/configuration/mode/

### 开始

现在webpack.config.js的内容大概是这样的：

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'bundles')
  },

  // 开启devServer
  devServer: {},

  
  // optimization: {
  //   // production模式下默认开启
  //   usedExports: true
  // },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: ['url-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
```

根目录下新建一个目录webpack, 并将webpack.config.js复制两份到该目录下，
重命名为webpack.dev.js和webpack.prod.js，目录如下：

![clipboard.png](https://segmentfault.com/img/bVbsOh5?w=264&h=387)

先来写开发环境下的配置，
webpack/webpack.dev.js：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../bundles')
  },

  devtool: 'cheap-module-eval-source-map',

  // 开启devServer
  devServer: {},


  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: ['url-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
```

生产环境下的配置，
webpack/webpack.prod.js：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash:10].js',
    path: resolve(__dirname, '../bundles')
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: ['url-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ]
};
```

- 开发环境去掉了CleanWebpackPlugin，postcss-loader
- 生产环境去掉了devServer
- 并且都设置了不同devtool和output.filename

然后修改package.js的scripts属性：

```js
"scripts": {
  "dev": "webpack-dev-server --config webpack/webpack.dev.js",
  "build": "webpack --config webpack/webpack.prod.js"
},
```

因为配置文件的名称和路径都变了，所以要用--config来指定
这时npm run build或npm run dev一切正常，配置也已区分。

### 抽离公共配置

现在两种模式下的配置文件有很多的是相同的，我们需要把它们抽离出来。
新建webpack/webpack.base.js,并把公共配置添加进去。
webpack/webpack.base.js：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../bundles')
  },


  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: ['url-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
```

然后把webpack.dev.js和webpack.prod.js里的公共代码删除。

webpack/webpack.dev.js:

```js
module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',

  // 开启devServer
  devServer: {},

  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  }
};
```

webpack/webpack.prod.js:

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:10].js'
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```

然后用webpack-merge插件把webpack.base.js合并到webpack.dev.js和webpack.prod.js里去.

继续修改配置
webpack/webpack.dev.js:

```js
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',

  // 开启devServer
  devServer: {},

  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  }
});
```

merge函数返回合并后的配置对象，webpack.prod.js也一样：

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:10].js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});
```

然后安装：npm i webpack-merge -D

装完后再试下npm run dev和npm run build，效果应该还是正常的。

### 环境变量

到目前为止，区分配置其实已经完成，根目录下的webpack.config.js已经可以删了，但我们经常会看到很多人在一个文件中就做到区分配置，这里就需要用到环境变量。这里只介绍这种方式的做法，后续并不会用这种方式。
比如我只想用webpack.config.js这一个配置文件，那么可以这么写：
webpack.config.js:

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const baseConfig = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, './bundles')
  },


  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: ['url-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};



const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',

  // 开启devServer
  devServer: {},

  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  }
}

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:10].js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

module.exports = env => {
  return env === 'development' ? merge(baseConfig, devConfig) : merge(baseConfig, prodConfig);
}
```

最后导出的配置取决于env的值，这个值在命令行中设置，比如：
运行开发环境：npx webpack-dev-server --env development
运行生产环境：npx webpack-dev-server --env production

如果配置过于复杂，还可以将loader或plugin单独分离出去。
