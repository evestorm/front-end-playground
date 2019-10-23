module.exports = {
  plugins: [
    // require('autoprefixer') 原本只用这么写，不过会失效
    // 原因见：http://www.mamicode.com/info-detail-2746932.html
    // 大概原因是postCss版本更新，之前版本的配置已无效
    require('autoprefixer')({
      overrideBrowserslist: ['> 0.15% in CN'] // 自动添加css前缀
    })
  ]
}