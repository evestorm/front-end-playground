const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // 1. 设置 webpack 从 index.js 打包
  devtool: 'cheap-module-source-map',
  output: { // 2. 然后把打包后的文件放到 bundle 文件夹下，并命名为 bundle.js
    filename: '[name].[contenthash:10].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: { // 针对具体模块设置解析规则
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        // 'css-loader',
        'sass-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/, // 排除第三方代码进行ES6转ES5操作
      loader: "babel-loader"
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}