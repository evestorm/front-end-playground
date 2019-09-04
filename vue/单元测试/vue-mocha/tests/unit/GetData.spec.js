import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import GetData from '@/components/GetData'

import moxios from 'moxios'

// mocha + axios = moxios 插件来获取异步
describe('测试异步获取数据', () => {
  // 在当前describe测试用例断言运行之前执行
  beforeEach(function() {
    // 装载 moxios
    moxios.install()
  })
  // 在当前describe测试用例断言运行之后执行
  afterEach(function() {
    // 卸载 moxios
    moxios.uninstall()
  })

  it('测试数据获取', (done) => {
    let wrapper = shallowMount(GetData)
    // 模拟对应请求返回的结果
    moxios.stubRequest('/user', {
      status: 200,
      response: { user: 'lance' }
    })
    // 数据返回后测试组件中是否包含异步请求获取到的数据
    moxios.wait(() => {
      expect(wrapper.text()).to.be.match(/lance/)
      // 调用一次 done 告知测试用例本次异步请求测试以完成
      done()
    })
  });

});