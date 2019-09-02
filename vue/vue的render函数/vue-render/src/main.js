import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.component('MyTitle', {
  props: {
    level: {}
  },
  render(h) {
    let tag = 'h' + this.level
    return <tag>你好</tag>
    // return h('h' + this.level, '你好')
  }
})
import Test from './components/Test.vue'
new Vue({
  // render: h => h(App),
  render(h) {
    // 用处：根据传递的props值生成对应标签
    return <MyTitle level='2'>你好</MyTitle>
    // jsx形式组件
    return <Test name={'lance'} on-mousedown={() => {alert('事件')}}></Test>
    // 渲染一个组件
    return h(Test, {
      props: {
        name: 'Lance'
      },
      on: {
        mousedown() {
          alert('事件')
        }
      },
      nativeOn: { // 原生事件
        click() {
          alert('原生事件')
        }
      }
    }, 'hello test')
    // jsx写法
    return <h1 
      id='h1' 
      on-click={() => {alert(1)}} 
      style={{color: 'red'}}>
      你好
    </h1>
    // 麻烦的写法
    return h('h1', {
      class: ['a', 'b'],
      on: {
        click() {
          alert(1)
        }
      },
      domProps: {
        innerHTML: 'hello'
      },
      style: {
        color: 'red'
      },
      attrs: {
        id: 1
      }
    }, 'Hello world')
  }
}).$mount('#app')
