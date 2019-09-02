<template>
  <div class="home">
    <h1>Home</h1>
    <h2>state获取</h2>
    <p>
      <pre>常规：「$store.state.username / age」</pre>
      {{$store.state.username}} / {{$store.state.age}}
    </p>
    <p>
      <pre>计算属性...mapState：「...mapState(['username', 'age'])」</pre>
      {{username}} / {{age}}
    </p>
    <hr>
    <h2>getter获取</h2>
    <p>
      <pre>常规：「$store.getters.getName」</pre>
      {{$store.getters.getName}}
    </p>
    <p>
      <pre>计算属性...mapGetters：「...mapGetters(['getName'])」</pre>
      {{getName}}
    </p>
    <hr>
    <h2>mutations调用</h2>
    <p>
      <pre>常规：「this.$store.commit('setUsername', 'Lannnnnnce')」</pre>
      <button @click="changeUsername">改变username</button>
    </p>
    <p>
      <pre>
        methods中声明...mapMutations：「...mapMutations(['setUsername'])」
        methods某个方法中调用：changeUsername2() { this.setUsername('lance')}
      </pre>
      <button @click="changeUsername2">改变username</button>
    </p>
    <hr>
    <h2>actions调用</h2>
    <p>
      <pre>常规：「this.$store.actions('asyncSetUsername', 'bilibili')」</pre>
      <button @click="asyncChangeUsername">1秒后改变username</button>
    </p>
    <p>
      <pre>
        methods中声明...mapActions：「...mapActions(['asyncSetUsername'])」
        methods某个方法中调用：asyncChangeUsername2() { this.asyncSetUsername('acfun')}
      </pre>
      <button @click="asyncChangeUsername2">1秒后改变username</button>
    </p>
    <hr>
    <h2>modules使用</h2>
    <h3>state获取</h3>
    <p>
      <pre>常规：「$store.state.user.email」</pre>
      {{$store.state.user.email}}
    </p>
    <p>
      <pre>计算属性...mapState：「...mapState('user', ['email'])」</pre>
      {{email}}
    </p>
    <h3>mutations调用</h3>
    <p>
      <pre>常规：「this.$store.commit('user/setEmail', '233333333333333@gmail.com')」</pre>
      <button @click="changeEmail">改变user模块下的email</button>
    </p>
    <p>
      <pre>
        methods中声明...mapMutations：「...mapMutations(['setEmail'])」
        methods某个方法中调用：changeEmail2() { this.setEmail('23@gmail.com')}
      </pre>
      <button @click="changeEmail2">改变user模块下的email</button>
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'home',
  // computed:mapState(['lesson','className']),
  // computed中没其他计算属性，可上面简写形式
  computed: {
    ...mapState(['username', 'age']),
    ...mapGetters(['getName']),
    // -------- module user ----------
    //第二个参数是对象 当前直接 获取 u 
    // ...mapState('user',{u:(state)=>state.email})
    ...mapState('user', ['email'])
  },
  mounted() {
    console.log(mapState(['username', 'age']))
    // {username: ƒ, age: ƒ}
    //   age: ƒ mappedState()
    //   username: ƒ mappedState()
    //   __proto__: Object
  },
  methods: {
    changeUsername() {
      this.$store.commit('setUsername', 'Lannnnnnce')
    },

    ...mapMutations(['setUsername']),
    changeUsername2() {
      // 两种写法：
      // this['setUsername']('lance')
      this.setUsername('lance')
    },


    asyncChangeUsername() {
      this.$store.dispatch('asyncSetUsername', 'bilibili')
    },

    ...mapActions(['asyncSetUsername']),
    asyncChangeUsername2() {
      this.asyncSetUsername('acfun')
    },


    // ----------- module user -----------
    // user 是子模块的名字
    changeEmail() {
      this.$store.commit('user/setEmail', '233333333333333@gmail.com')
    },

    ...mapMutations('user', ['setEmail']),
    changeEmail2() {
      this.setEmail('23@gmail.com')
    }
  }
}
/* 另一种获取模块下的属性的写法：
  import {createNamespacedHelpers} from 'vuex'
  let {mapState} = createNamespacedHelpers('user')
  computed:{
    ...mapState(['userName']),
  },
*/
</script>
