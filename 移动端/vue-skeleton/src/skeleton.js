import Vue from 'vue'
import Skeleton from './components/Skeleton.vue'
import SkeletonAbout from './components/SkeletonAbout.vue'

export default new Vue({
  components: {
    Skeleton,
    SkeletonAbout
  },
  // 默认都隐藏，通过在 vue.config.js 中的插件配置中根据id进行判断
  template: `<div>
      <Skeleton style="display: none;" id="skeleton-home"></Skeleton>
      <SkeletonAbout style="display: none;" id = "skeleton-about"></SkeletonAbout>
    </div>
    `
})