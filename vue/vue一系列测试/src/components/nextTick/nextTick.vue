<template>
    <div>
        <h1>Vue.nextTick</h1>
        <p ref='arr'>数组的值：{{arr}}</p>
        <pre>
            this.arr = [4,5,6]
            let arr = this.$refs.arr
            console.log(arr.innerHTML) // 显示原本的[1,2,3]
            this.$nextTick(() => {
                console.log(arr.innerHTML) // 更新视图后[4,5,6]
            })
        </pre>
        <button @click="hiddenInput">点我显示右侧input</button>

        <input type="text" v-show="isShow" ref="swinput">

        <hr>
        <p>
            数据变化后更新视图操作是异步的
        </p>
        <p>
        nextTick应用场景：
        点击按钮显示原本以 v-show = false 隐藏起来的输入框，并获取焦点。

        <pre>
            hiddenInput() {
                // 修改 v-show
                this.isShow = true
                // 在第一个 tick 里，获取不到输入框，自然也获取不到焦点
                // this.$refs.swinput.focus()

                // nextTick的回调会在 DOM 更新后触发，此时 input 已经显示，可以获取到元素了
                this.$nextTick(() => {
                    this.$refs.swinput.focus()
                })
            }
        </pre>
        </p>
        <p>
        参考资料：
        <a href="https://segmentfault.com/a/1190000012861862">Vue.nextTick 的原理和用途</a>
        </p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false,
                arr: [1,2,3]
            }
        },
        mounted() {
            this.arr = [4,5,6]
            let arr = this.$refs.arr
            console.log(arr.innerHTML) // 显示原本的[1,2,3]
            this.$nextTick(() => {
                console.log(arr.innerHTML) // 更新视图后[4,5,6]
            })
        },
        methods: {
            hiddenInput() {
                this.isShow = true
                // this.$refs.swinput.focus()

                this.$nextTick(() => {
                    this.$refs.swinput.focus()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>