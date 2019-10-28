const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: { // 2. 然后把打包后的文件放到 bundle 文件夹下，并命名为 bundle.js
    filename: '[name].[contenthash:10].js',
  },
  module: { // 针对具体模块设置解析规则
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        // 'css-loader',
        'sass-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    // 配置代码分割
    splitChunks: {
      // 要分割哪些模块：all（推荐）, async(默认，只分隔异步代码), and initial
      // chunks: 'all'
      cacheGroups: {
        vendors: false,
        default: false
      }
    }
  }
});