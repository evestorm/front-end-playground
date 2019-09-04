import HelloWorld from '@/components/HelloWorld'
import Vue from 'vue'
import { expect } from 'chai'
import { mount } from '@vue/test-utils'

describe('Hello World 组件', () => {
  it('传递属性后页面能否正常显示结果', () => { // 测试组件的UI效果，是否和预期一致
    // 原生自己测试vue
    // extend：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
    // 创建构造器
    let Constructor = Vue.extend(HelloWorld)
    // 创建 HelloWorld 实例并挂载
    let vm = new Constructor({
      propsData: {
        msg: 'Hello'
      }
    }).$mount()
    // node环境下拿不到dom，然而 mocha 在测试的时候集成了 jsdom ，所以在node环境下可以拿到dom了
    expect(vm.$el.querySelector('h1').innerHTML)
      .to.be.contain('Hello')
  })
});

describe('Hello World 组件（使用vue提供的库测试）', () => {
  it('传递属性后页面能否正常显示结果', () => {
    // 生成一个该组件的包裹器，包含一个挂载组件或 vnode ，以及测试该组件或 vnode 的方法
    let wrapper = mount(HelloWorld)
    // 传递属性
    wrapper.setProps({
      msg: 'Hello'
    })
    // 找到h1 dom对象中的文本测试
    expect(wrapper.find('h1').text()).to.be.contain('Hello')
  })
});