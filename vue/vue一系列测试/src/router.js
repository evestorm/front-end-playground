import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import swNextTick from '@/components/nextTick/nextTick';
import swLifeCycle from '@/components/lifeCycle/lifeCycle';
import swDefineProperty from '@/components/defineProperty/defineProperty';
import swFor from '@/components/v-for/v-for.vue';
import swCommon from '@/components/common/common.vue';
import swProvide from '@/components/provide/provide.vue';
import swSync from '@/components/sync/sync.vue';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/swNextTick', name: 'swNextTick', component: swNextTick },
    { path: '/swLifeCycle', name: 'swLifeCycle', component: swLifeCycle },
    { path: '/swDefineProperty', name: 'swDefineProperty', component: swDefineProperty },
    { path: '/swFor', name: 'swFor', component: swFor },
    { path: '/swCommon', name: 'swCommon', component: swCommon },
    { path: '/swProvide', name: 'swProvide', component: swProvide },
    { path: '/swSync', name: 'swSync', component: swSync }
  ]
})
