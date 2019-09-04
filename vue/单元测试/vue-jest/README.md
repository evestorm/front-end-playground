# vue-jest

## 创建项目

```shell
vue create vue-jest
选择 babel / vue-router / vuex / jest测试框架
```

创建完毕后来到 `package.json` 文件，script 脚本中的第三个：`"test:unit": "vue-cli-service test:unit"` 就是跑测试脚本的命令。

我们尝试在终端中运行：

```shell
npm run test:unit
```

会看到类似下方的测试结果：

```shell
 PASS  tests/unit/example.spec.js
  HelloWorld.vue
    ✓ renders props.msg when passed (30ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.818s
Ran all test suites.
```

它其实运行的测试文件是根目录下的 `tests/unit/example.spec.js` 文件。

## 常用测试用例写法

`tests/unit` 下新建 `common.spec.js` ：

```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('常用测试用例', () => {
  it('相等', () => {
    expect(1 + 1).toBe(2)
    expect({name: 'lance'}).toEqual({name: 'lance'})
    expect([1,2,3]).toHaveLength(3)
  });
  it('大于 小于', () => {
    expect(3).toBeGreaterThan(2)
    expect(2).toBeLessThan(3)
  });
  it('包含', () => {
    expect('lance').toContain('nc')
  });
});
```

如果你曾经使用过 jasmine.js 测试库，那么上面的语法你已经很熟悉~

## 测试异步数据

在 `src/components` 中新增 `GetData.vue` 组件，代码如下：

```html
<template>
  <div>
    {{user}}
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        user: ''
      }
    },
    mounted() {
      axios.get('/user').then(res => {
        this.user = res.data.user
      })
    }
  }
</script>
```

为了mock数据，我们需要在 `tests/unit` 下新建一个 `__mocks__` 文件夹放置一个 `axios.js` 文件，专门用来配置模拟返回的数据：

```js
// 模拟组件中的axios请求返回的结果
export default {
  get: () => Promise.resolve({data: {user: 'lance'}})
}
```

再来 `tests/unit` 下新建一个 `getData.spec.js` 文件，用 jest 来模拟测试异步请求：

```js
import { shallowMount } from '@vue/test-utils'
import GetData from '@/components/GetData.vue'
import Vue from 'vue'

// 设置模拟axios，把页面中所有axios模拟成通过 `tests/unit/__mocks__/axios.js` 获取的数据
// 此处传入的 axios 参数要和 `axios.js` 的文件名保持一致
jest.mock('axios') // 默认再去调用 get 方法，就是使用 axios.js 中自己编写的方法了
describe('jest 测试 mock axios', () => {
  it('mock掉axios', () => {
    let wrapper = shallowMount(GetData)
    expect(wrapper.text()).toMatch(/lance/)
  });
});
```

编写完成后使用 `npm run test:unit` 开始测试，会发现异步测试失败，这是由于 axios 请求了异步数据，在请求数据返回之前（也就是 Promise 完成之前），我们的断言（expect）由于是个同步代码，所以不会等待异步请求的完成就已经开始执行了，那个时候页面上当然还没有user数据。jes也就反馈测试失败了。

针对异步测试，大多数单元测试库都提供一个回调来使得运行期知道测试用例的完成时机。Jest 和 Mocha 都是用了 `done`。我们可以和 `nextTick` 或 `setTimeout` 结合使用 `done` 来确保任何 Promise 都会在断言之前完成。这里我们选择 `Vue.nextTick` 。

所以在 `tests/unit/getData.spec.js` 中我们还得引入 `Vue` ，从而能够调用 nextTick ，最终代码如下：

```js
import { shallowMount } from '@vue/test-utils'
import GetData from '@/components/GetData.vue'
import Vue from 'vue'

jest.mock('axios')
describe('jest 测试 mock axios', () => {
  it('mock掉axios', (done) => {
    let wrapper = shallowMount(GetData)
    // 等待下一个队列完成断言这件事
    Vue.nextTick(() => {
      expect(wrapper.text()).toMatch(/lance/)
      done()
    })
  });
});
```

现在跑一遍 `npm run test:unit` 就能通过异步测试啦~

当然，利用 Promise 的特性，我们还可以简化上方的代码：

```js
describe('jest 测试 mock axios', () => {
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
```
