const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js',
  }, // 1. 设置 webpack 从 index.js 打包
  devtool: 'source-map', // 关闭 'none'，启用 'source-map'
  output: { // 2. 然后把打包后的文件放到 bundle 文件夹下，并命名为 bundle.js
    publicPath: '',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    inline: true, //打包后加入一个 websocket 客户端
    hot: true, // 启用热更新 的 第1步
    open: true, // 自动打开浏览器
    contentBase: path.resolve(__dirname, 'dist'), // 指定托管的根目录，不注释的话，无法访问 src 以外的资源，比如 node_modules
    host: '127.0.0.1', // 主机地址
    port: 4321, // 设置启动时候的运行端口
    compress: true // 开发服务器是否启动gzip等压缩
  },
  module: { // 针对具体模块设置解析规则
    rules: [{
      test: /\.(jpg|png|gif)$/,
      use: {
        // loader: 'file-loader',
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]', // 自定打包后的图片对应文件名
          outputPath: 'images/', // 把打包图片放进单独文件夹中
          limit: 204800, // 当图片大小大于204.8KB后，会单独打包到 images 文件夹下；如果小于204.8KB，就会直接base64到bundle.js中
        }
      }
    }, {
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader'
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        // 'css-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 意思是如果 scss 文件中又 import 了一个 scss 文件，为了防止它不重新走一个完整的 scss 文件处理流程，所以添加一个 importLoaders 配置，让其也能走完 postcss-loader 和 sass-loader 的处理流程
            // modules: true, // 开启css的模块化打包
          }
        },
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
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development', // 生产环境[production]打包（会压缩代码）or 开发环境[development]打包（不压缩代码）
}