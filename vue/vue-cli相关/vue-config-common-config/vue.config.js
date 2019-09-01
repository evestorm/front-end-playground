// 基于 node 的，而 node 不支持 import 语法
const path = require('path')
module.exports = {
  // 旧版baseURL
  // 线上/开发环境的路径配置
  publicPath: process.env.NODE_ENV === 'production' ? 'http://mall.swlance.cn' : '/',

  // 输出路径（默认dist）
  outputDir: './my-dist',

  // 静态资源目录
  assetsDir: 'my-assets',

  // 打包不生成sourceMap映射
  productionSourceMap: false,

  chainWebpack: config => {
    // 可以获取并控制 webpack 内部配置

    // 配置目录别名，别名叫 + 。 例如 App.vue 中引入组件时：
    // import HelloWorld from './components/HelloWorld.vue'
    // 改为 ↓
    // import HelloWorld from '+/HelloWorld.vue'
    config.resolve.alias.set('+', path.resolve(__dirname, 'src/components'))
  },

  configureWebpack: { // 新增插件等
    plugins: [],
    module: {}
  },

  devServer: { // 开发阶段生效
    proxy: {
      '/api/getUser': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api': '' // 把 `/api` 替换为空，就相当于给「http://localhost:3000/getUser」发请求了
        }
      }
    }
  },

  // 安装第三方插件
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // 给全局增加 assets/common.scss 样式（自动注入）
        path.resolve(__dirname, './src/assets/common.sass')
      ]
    }
  }
}
