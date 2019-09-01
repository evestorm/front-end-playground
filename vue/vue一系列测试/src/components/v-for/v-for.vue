<template>
  <div>
    <h1>v-for循环要注意的点</h1>
    <p>两边都选中嬴政，然后添加一个新的</p>
    <input type="text" v-model="name">
    <button @click="add">添加</button>
    <div class="container">
      <h4>使用index</h4>
      <ul class="check">
        <li v-for="(item, index) in list" :key="index">
          <input type="checkbox">{{item.name}}
        </li>
      </ul>
    </div>
    <div class="container">
      <h4>使用id</h4>
      <ul class="check">
        <li v-for="item in list" :key="item.id">
          <input type="checkbox">{{item.name}}
        </li>
      </ul>
    </div>
    <hr style="clear: both;">
    <h3>为什么使用index的选中状态从嬴政变成了吕不韦呢？</h3>
    <p>
      因为之前选中项的index为2，<br>
      现在给数组开头加了个对象，index还是有2这个索引。<br>
      vue就判定该组件可以复用，然后仅仅把这一行的文本替换了，<br>
      input以及上面的状态还是选中的没改<br>
      最后由于arr增加了一项，就直接在最后添加了一个input+文本节点，用来显示最后的嬴政</p>

    <hr>

    <h3>列表倒序</h3>
    <p>选中第一项React，然后点击倒序按钮。左边列表采用index，右边列表采用id。左边状态不变的原因也是 index 没有变化被复用了，导致选中状态永远都是 index=0 的第一项。</p>
    <div class="container">
      <ul class="framework">
        <li v-for="(item, index) in framework" :key="index">
          <input type='checkbox'>{{item.name}}
        </li>
      </ul>
    </div>
    <div class="container">
      <ul class="framework">
        <li v-for="item in framework" :key="item.id">
          <input type='checkbox'>{{item.name}}
        </li>
      </ul>
    </div>
    <hr style="clear: both;" />
    <button @click="reversefw">倒序</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        newId: 3,
        list: [
          { id: 1, name: '李斯' },
          { id: 2, name: '吕不韦' },
          { id: 3, name: '嬴政' }
        ],
        framework: [
          { id: 'react', name: 'React' },
          { id: 'vue', name: 'Vue' },
          { id: 'angular', name: 'Angular' },
        ]
      }
    },
    methods: {
      add() {
        this.list.unshift({id: ++this.newId, name: this.name})
        this.name = ''
      },
      reversefw() {
        this.framework.reverse()
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  float: left;
  margin-right: 20px;
}
</style>