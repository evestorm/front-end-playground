# vue-mocha

## 创建项目

```shell
vue create vue-mocha
选择 babel / vue-router / vuex / mocha + chai 测试框架
```

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

所以最好以单元测试的方式，给某个文件单独写一个测试用例，专门测试该文件中的代码。例如针对上面的 `parser.js` 文件，我们可以在 `tests/unit` 下新建一个 `Parser.spec.js` 文件，专门用来测试它：

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

在 `tests/unit` 新建 `Common.spec.js` 文件：

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

在 `tests/unit` 下新建一个 `Counter.spec.js` 文件，编写如下代码进行测试：

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

## 测试父子组件

### 测试父组件

现在模拟一个需求，目前父组件有一个子组件 Child 以及一个 #content 标签，#content 标签默认不显示，它的显示与否用 isShow 来控制。

我们现在要测试的是，点击子组件 Child 中的按钮，能否触发父组件的 #content 标签显示。两组件如下：

> src/components/Parent.vue

```html
<template>
  <div>
    <Child @show="show"></Child>
    <div id="content" v-if="isShow">内容</div>
  </div>
</template>

<script>
  import Child from './Child'
  export default {
    data() {
      return {
        isShow: false
      }
    },
    components: {
      Child,
    },
    methods: {
      show() {
        this.isShow = true
      }
    },
  }
</script>
```

> src/components/Child.vue

```html
<template>
  <div>
    <button>点我显示父组件内容</button>
  </div>
</template>

<script>
  export default {
  }
</script>
```

接下来我们在 `tests/unit` 下新建一个 `Parent.spec.js` 文件来测试下此功能：

```js
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Parent from '@/components/Parent'
import Child from '@/components/Child'

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
```

### 测试子组件

有时候我们还会在项目中，通过父组件给子组件传递一个函数调用。然后检测此函数在子组件中是否能被正常调用。

首先给 `src/components/Child.vue` 组件添加一个prop接收函数，然后在组件内部添加一个按钮来触发函数的调用：

```html
<template>
  <div>
    <button>点我显示父组件内容</button>
    <button id="fn" @click="clickMe">点我调用父组件传来的方法</button>
  </div>
</template>

<script>
  export default {
    props: {
      fn: {}
    },
    methods: {
      clickMe() {
        this.fn()
      }
    }
  }
</script>
```

回到 `tests/unit/Parent.spec.js` 中编写测试。在编写之前还要引入一个插件 `sinon` ，它能帮助我们监听函数的调用情况：

```shell
npm install sinon
```

```js
...
import sinon from 'sinon'

...

// mocha + chai + sinon（帮助我们mock方法）
describe('测试子组件接收一个函数，点击按钮时调用这个函数', () => {
  it('点击按钮触发函数', () => {
    let callback = sinon.spy() // 间谍函数
    let wrapper = shallowMount(Child, {
      // 把间谍函数传给子组件，它在记录自己被调用的次数
      propsData: { fn: callback }
    })
    wrapper.find('#fn').trigger('click')
    // 看调用次数callCount为几，触发一次click就是1，触发两次就是2，以此类推
    expect(callback.callCount).to.be.equal(1)
  });
});
```

当然，sinon还能模拟函数传参的场景。首先来更改 `src/components/Child.vue` 组件的 clickMe 方法：

```js
clickMe() {
  // this.fn()
  this.fn('bilibili')
  this.fn('dilidili')
}
```

然后对 `tests/unit/Parent.spec.js` 进行改造，模拟函数被调用两次，且一二次分别传入不同参数的场景：

```js
wrapper.find('#fn').trigger('click')
// 检测函数被调用第一次时，传入的第一个参数是否为「bilibili」
expect(callback.getCall(0).args[0]).to.be.equal('bilibili')
// 检测函数被调用第二次时，传入的第一个参数是否为「dilidili」
expect(callback.getCall(1).args[0]).to.be.equal('dilidili')
// 看调用次数callCount为几，触发一次click就是1，触发两次就是2，以此类推
expect(callback.callCount).to.be.equal(2)
```

## 模拟异步请求

平常开发用的挺多的还有异步请求，在 `macha + chai` 这套测试方案中，异步测试还缺少一个插件 `moxios` ，可以看做是 mocha + axios 的结合体，专门用来模拟异步测试。

下面来模拟一个异步请求在组件中展示数据的场景。

我们在 `src/components` 下新建 `GetData.vue` 组件：

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
        user: 'lance'
      }
    },
    mounted() {
      axios.get('/user', res => {
        this.user = res.data.user
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
```

在 `tests/unit/` 下新建 `GetData.spec.js` 用于异步测试。首先安装 `moxios` ：

```shell
npm install moxios
```

然后编写异步测试代码：

```js
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
```
