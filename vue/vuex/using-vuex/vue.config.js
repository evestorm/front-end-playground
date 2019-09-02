let path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'http://www.baidu.com' : '/',
  assetsDir: 'asserts',
  outputDir: './my-dist',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')),
    config.resolve.alias.set('_v', path.resolve(__dirname, 'src/views'))
  },
  devServer: {
    proxy: {
      '/api/getUser': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
}