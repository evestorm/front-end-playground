# vue-mocha

## 创建项目

```shell
vue create vue-mocha
选择 babel / vue-router / vuex / unit test
```

测试选择 mocha + chai

创建完毕后来到 `package.json` 文件，script 脚本中的第三个：`"test:unit": "vue-cli-service test:unit"` 就是跑测试脚本的命令。

我们尝试在终端中运行：

```shell
npm run test:unit
```

会看到类似下方的测试结果：

```shell
 WEBPACK  Compiled successfully in 3808ms

 MOCHA  Testing...



  HelloWorld.vue
    ✓ renders props.msg when passed


  1 passing (41ms)

 MOCHA  Tests completed successfully
```

它其实运行的测试文件是根目录下的 `tests/unit/example.spec.js` 文件。

## 编写一个简单的测试用例

在 `src/` 下创建一个 `code` 目录，并新建 `parser.js` 文件：

```js
export let parser = (str) => { // name=lance&age=20
  let obj = {}
  str.replace(/([^&=]*)=([^&=]*)/g, function() {
    obj[arguments[1]] = arguments[2]
  })
  return obj // {name: 'lance', age: '20'}
}

export let stringify = (obj) => { // {name: 'lance', age: '20'}
  let arr = []
  for (const [key, value] of Object.entries(obj)) {
    arr.push(`${key}=${value}`)
  }
  return arr.join('&') // name=lance&age=20
}
```

上面两个方法用来对象转字符串，字符串转对象。平常我们要测试方法是否正确往往直接通过 console.log() 打印：

```js
console.log(parser('name=lance&age=20'))
console.log(stringify({
  name: 'lance',
  age: '20'
}))
```

然而这种方式有以下几点问题：

1. 通常自测后就会删除，测试代码无法保留；即使保留（注释掉），还会混在源码中增大文件体积
2. 一旦测试代码过多，就不便于分类。再次测试时只会打印出结果，难以发现打印内容是针对谁的测试。

所以最好以单元测试的方式，给某个文件单独写一个测试用例，专门测试该文件中的代码。例如针对上面的 `parser.js` 文件，我们可以在 `tests/unit` 下新建一个 `parser.spec.js` 文件，专门用来测试它：

```js
import { parser, stringify } from '@/code/parser.js'
import { expect } from 'chai'

// 使用 mocha + chai 编写断言

// 常见关系：相等 大于小于 包含不包含
describe('parser方法', () => {
  it('测试 parser 方法是否正确', () => {
    // to.be 全等
    // deep.equal 两对象是否相等（引用空间无所谓）
    expect(parser('name=lance&age=20')).to.be.deep.equal({
      name: 'lance',
      age: '20'
    })
  });
});

describe('stringify 方法', () => {
  it('测试 stringify 方法是否正确', () => {
    expect(stringify({
      name: 'lance',
      age: '20'
    })).to.be.equal('name=lance&age=20')
  });
});
```

## 测试常用关系

在 `tests/unit` 新建 `common.spec.js` 文件：

```js
import { expect } from 'chai'

describe('测试常用关系', () => {
  it('相等关系', () => {
    expect(1 + 1, '1 + 1 等于 2').to.be.equal(2)
    expect([1, 2, 3], '数组长度为 3').to.be.lengthOf(3)
    expect(true, '某值是否为 true').to.be.true
  });
  it('包含关系', () => {
    expect('lance', '字符串中是否包含"lan"').to.be.contain('lan')
    expect('lance', '字符串中是否包含"lan"（正则匹配）').to.be.match(/lan/)
  });
  it('大于 / 小于', () => {
    expect(5, '数值是否大于4').to.greaterThan(4)
    expect(3, '数值是否小于4').to.lessThan(4)
    expect(9, '数值不大于10').to.be.not.greaterThan(10)
  });
});
```

## 测试组件

需求：传给组件一个值，测试页面是否能够显示此值
测试对象：`src/components/HelloWorld.vue`

首先对该组件进行改造：

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

然后在 `tests/unit` 下新建一个 `HelloWorld.spec.js` 文件：

```js
import HelloWorld from '@/components/HelloWorld'
import Vue from 'vue'
import { expect } from 'chai'

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
```

但上面的写法太过繁琐，所以vue给我们提供了一个叫做 [Vue Test Utils](https://vue-test-utils.vuejs.org/zh/guides/) 库来帮助我们测试，还是实现上面一样的测试工作，现在换做 `@vue/test-utils` 库编写：

```js
import { mount } from '@vue/test-utils'

...

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
```

除了测试UI展示是否正确外，我们还可能对方法进行测试。例如我们编写一个计数+1的组件 `src/components/Counter.vue`：

```html
<template>
  <div>
    <span id="count">{{count}}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 10
      }
    },
    methods: {
      increment() {
        this.count++
      }
    },
  }
</script>
```

我们希望测试按钮每点击一次，count是否+1。

在 `tests/unit` 下新建一个 `counter.spec.js` 文件，编写如下代码进行测试：

```js
import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('测试counter组件', () => {
  it('测试点击按钮能否+1', () => {
    let wrapper = mount(Counter)
    // 获取count初始值
    expect(wrapper.find('#count').text())
      .to.be.equal('10')
    // 触发按钮点击事件
    wrapper.find('button').trigger('click')
    expect(wrapper.find('#count').text())
      .to.be.equal('11')
  });
});
```
