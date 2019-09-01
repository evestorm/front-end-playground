<template>
    <div>
        <h1>生命周期</h1>
        <div id="appLoading" v-if="isLoading">
            <img src="../../assets/Spinner-1s-164px.gif" alt="loading" />
        </div>
        <h2>创建期间</h2>
        <h3>beforeCreate</h3>
        <p>
            说明：初始化自身，此刻data，methods等都还没准备好，不可用。<br>
            用途：常用于初始化非响应式变量，有时候可以在此处进行mixin混入（vuex或vue-router把自身实例挂载到每个vue组件实例上）
        </p>
        <h3>created</h3>
        <p>
            说明：data，methods都初始化完毕，还没有开始编译模板<br>
            用途：发请求，页面初始化
        </p>
        <h3>beforeMount</h3>
        <p>
            说明：模板编译完成，还没开始挂载<br>
            用途：一般不用
        </p>
        <h3>mounted</h3>
        <p>
            说明：模板已挂载，页面渲染完成<br>
            用途：异步请求，获取真实DOM
        </p>
        <h2>更新期间</h2>
        <h3>beforeUpdate</h3>
        <p>
            说明：状态更新之前被执行，此时 data 中的值是最新的，但页面上数据还是旧的，因为此时还没有开始重新渲染DOM节点<br>
            用途：适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
        </p>
        <h3>updated</h3>
        <p>
            说明：实例更新完后被调用，此时 data 中的状态值 和 界面上显示的数据都是最新的<br>
            用途：避免在这个钩子函数中操作数据，可能陷入死循环（值在更新后又被更新，更新后又被更新）
        </p>
        <h2>销毁期间</h2>
        <h3>beforeDestroy</h3>
        <p>
            说明：实例销毁之前调用<br>
            用途：常用于销毁定时器、解绑全局事件、销毁插件对象等操作<br>
            例子：在mounted上加一个setInterval，在beforeDestroy中clearInterval
        </p>
        <h3>destroyed</h3>
        <p>
            说明：销毁后调用<br>
            用途：1. 路由切换（一个组件切另一个组件，把上一个销毁） 2. 手动销毁 vm.$destroyed()
        </p>
        <hr>
        <ul>
            <li>created阶段的ajax请求与mounted请求的区别：前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态</li>
            <li>mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'lance',
                isLoading: true
            }
        },
        beforeCreate() {
            console.log("beforeCreate")
            // this.requestData() // 报错找不到该方法：this.requestData is not a function
        },
        created() {
            console.log("created")
            console.log(this.$data, this.$el) // data初始化完毕
            this.requestData() // 可以调用方法
        },
        beforeMount() { // 一般不用
            console.log("beforeMount", this.$el)
        },
        mounted() {
            console.log("mounted")
            console.log(this.$el)
            this.requestData()
        },
        beforeUpdate() {
            console.log("beforeUpdate")
        },
        updated() {
            console.log("updated")
        },
        beforeDestroy() {
            console.log("beforeDestroy")
        },
        destroyed() {
            console.log("destroyed")
        },
        methods: {
            requestData() {
                this.$ajax({
                    url: 'https://test-miniprogram.com/api/news/list?type=gn',
                    method: 'get'
                }).then(res => {
                    this.isLoading = false
                    console.log(res.data)
                })
            }
        }
    }
</script>

<style scoped>
    #appLoading {
        width: 100%;
        height: 100%;
    }

    #appLoading img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        -webkit-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
    }
</style>