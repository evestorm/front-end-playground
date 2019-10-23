const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
  },
  devServer: {
    inline: true, //打包后加入一个 websocket 客户端
    hot: true, // 启用热更新 的 第1步
    open: true, // 自动打开浏览器
    // contentBase: path.resolve(__dirname, 'dist'), // 指定托管的根目录，不注释的话，无法访问 src 以外的资源，比如 node_modules
    host: '127.0.0.1', // 主机地址
    port: 4321, // 设置启动时候的运行端口
    compress: true // 开发服务器是否启动gzip等压缩
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
  }
});