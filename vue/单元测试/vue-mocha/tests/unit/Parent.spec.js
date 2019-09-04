import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Parent from '@/components/Parent'
import Child from '@/components/Child'
import sinon from 'sinon'

describe('当前子组件触发事件时，可以控制父组件', () => {
  it('$emit show', () => {
    // 下方调用mount后拿到的包裹器的组件内容
    // 会显示子组件内容，然而我们测试针对的对象是父组件，
    // 并不需要子组件被渲染，为了防止这种情况（因为实际情况中组件嵌套可能很深，要是都渲染会影响效率）
    // 所以改用 shallowMount 替换 mount，这样就不会渲染当前组件中的子组件了
    // let wrapper = mount(Parent)
    let wrapper = shallowMount(Parent)
    // 先判断初始状态下 #content 元素是否存在
    expect(wrapper.find('#content').exists()).to.be.false
    // 触发子组件的 $emit
    wrapper.find(Child).vm.$emit('show')
    // 再次查看父组件的 #content 是否存在
    expect(wrapper.find('#content').exists()).to.be.true
  });
});

// mocha + chai + sinon（帮助我们mock方法）
describe('测试子组件接收一个函数，点击按钮时调用这个函数', () => {
  it('点击按钮触发函数', () => {
    let callback = sinon.spy() // 间谍函数
    let wrapper = shallowMount(Child, {
      // 把间谍函数传给子组件，它在记录自己被调用的次数
      propsData: { fn: callback }
    })
    wrapper.find('#fn').trigger('click')
    // 检测函数被调用第一次时，传入的第一个参数是否为「bilibili」
    expect(callback.getCall(0).args[0]).to.be.equal('bilibili')
    // 检测函数被调用第二次时，传入的第一个参数是否为「dilidili」
    expect(callback.getCall(1).args[0]).to.be.equal('dilidili')
    // 看调用次数callCount为几，触发一次click就是1，触发两次就是2，以此类推
    expect(callback.callCount).to.be.equal(2)
  });
});