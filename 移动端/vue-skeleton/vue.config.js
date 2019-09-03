const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const path = require('path')

// 骨架屏插件原理
class MyPlugin {
  apply(compiler) { // compiler 表示当前整个webpack对象
    compiler.plugin('compilation', (compilation) => { // compilation 表示当前这次webpack打包的对象（也就是说多次打包会产生多个）
      compilation.plugin(
        // 当前webpack插件在html处理之前，把html替换
        'html-webpack-plugin-before-html-processing',
        (data) => {
          data.html = data.html.replace(`<div id="app"></div>`, `
              <div id="app">
                  <div id="home" style="display:none">首页骨架屏</div>
                  <div id="about" style="display:none">about页骨架屏</div>
              </div>
              <script>
                  if(window.hash == '#/about' ||  location.pathname=='/about'){
                      document.getElementById('about').style.display="block"
                  }else{
                      document.getElementById('home').style.display="block"
                  }
              </script>
          `);
          return data;
        }
      )
    });
  }
}

module.exports = {
  configureWebpack: { // 给webpack新增配置
    plugins: [
      // 使用自己的插件
      new MyPlugin()
      // new SkeletonWebpackPlugin({
      //   webpackConfig: {
      //     entry: {
      //       app: path.resolve(__dirname, 'src/skeleton.js')
      //     }
      //   },
      //   router: {
      //     mode: 'history',
      //     routes: [{
      //         path: '/',
      //         skeletonId: 'skeleton-home'
      //       },
      //       {
      //         path: '/about',
      //         skeletonId: 'skeleton-about'
      //       },
      //     ]
      //   },
      // })
    ]
  }
}