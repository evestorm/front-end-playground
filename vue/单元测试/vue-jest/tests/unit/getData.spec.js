import { shallowMount } from '@vue/test-utils'
import GetData from '@/components/GetData.vue'
import Vue from 'vue'

// 设置模拟axios，把页面中所有axios模拟成通过 `tests/unit/__mocks__/axios.js` 获取的数据
// 此处传入的 axios 参数要和 `axios.js` 的文件名保持一致
jest.mock('axios') // 默认再去调用 get 方法，就是使用 axios.js 中自己编写的方法了
describe('jest 测试 mock axios', () => {
  // it('mock掉axios', (done) => {
  //   let wrapper = shallowMount(GetData)
  //   // 等待下一个队列完成断言这件事
  //   Vue.nextTick(() => {
  //     expect(wrapper.text()).toMatch(/lance/)
  //     done()
  //   })
  // });
  it('mock掉axios', () => {
    let wrapper = shallowMount(GetData)
    // Vue.nextTick() 一般写成回调形式，然而它本身返回的就是个promise
    // 所以可以写成 .then 的 Promise 形式，然后返回
    // 这样就不用加繁琐的 done 了
    return Vue.nextTick().then(() => {
      expect(wrapper.text()).toMatch(/lance/)
    })
  });
});