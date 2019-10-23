const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: { // 2. 然后把打包后的文件放到 bundle 文件夹下，并命名为 bundle.js
    publicPath: '',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: { // 针对具体模块设置解析规则
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/, // 排除第三方代码进行ES6转ES5操作
      loader: "babel-loader"
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
}