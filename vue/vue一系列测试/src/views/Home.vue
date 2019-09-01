<template>
  <div class="home">
    <h1>学习列表</h1>
    <router-link :to="{name: 'swNextTick'}" tag="li">Vue.nextTick</router-link>
    <router-link :to="{name: 'swLifeCycle'}" tag="li">Vue的生命周期</router-link>
    <router-link :to="{name: 'swDefineProperty'}" tag="li">Vue的defineProperty</router-link>
    <router-link :to="{name: 'swFor'}" tag="li">Vue的v-for循环</router-link>
    <router-link :to="{name: 'swCommon'}" tag="li">Vue常用内容</router-link>
    <router-link :to="{name: 'swProvide'}" tag="li">provide/inject依赖注入</router-link>
    <router-link :to="{name: 'swSync'}" tag="li">sync修饰符————>对一个 prop 进行“双向绑定”</router-link>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>
