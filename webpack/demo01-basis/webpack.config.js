const path = require('path')

module.exports = {
  entry: './src/index.js', // 1. 设置 webpack 从 index.js 打包
  output: { // 2. 然后把打包后的文件放到 bundle 文件夹下，并命名为 bundle.js
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development', // 生产环境[production]打包（会压缩代码）or 开发环境[development]打包（不压缩代码）
}