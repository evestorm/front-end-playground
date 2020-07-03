<template>
   <!-- 可视区域 -->
   <div ref="list" :style="{height}" class="infinite-list-container" @scroll="scrollEvent($event)">
      <!-- 高度占位区域 -->
      <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
      <!-- 渲染区域 -->
      <div class="infinite-list" :style="{ transform: getTransform }">
         <div
            ref="items"
            class="infinite-list-item"
            v-for="item in visibleData"
            :key="item.id"
            :style="{ height: itemSize + 'px' }"
         >{{ item.value }}</div>
      </div>
   </div>
</template>

<script>
export default {
   name: "VirtualList",
   props: {
      //所有列表数据
      listData: {
         type: Array,
         default: () => []
      },
      //每项高度
      itemSize: {
         type: Number,
         default: 200
      },
      //容器高度 100px or 50vh
      height: {
         type: String,
         default: "100%"
      }
   },
   computed: {
      //列表总高度
      listHeight() {
         return this.listData.length * this.itemSize;
      },
      //可显示的列表项数
      visibleCount() {
         // 向上取整，确保底部不空缺
         return Math.ceil(this.screenHeight / this.itemSize);
      },
      //偏移量对应的style
      getTransform() {
         return `translate3d(0,${this.startOffset}px,0)`;
      },
      //获取真实显示列表数据
      visibleData() {
         return this.listData.slice(
            this.start,
            Math.min(this.end, this.listData.length)
         );
      }
   },
   mounted() {
      // 获取屏幕高度
      this.screenHeight = this.$el.clientHeight;
      // 设置开始结束索引
      this.start = 0;
      this.end = this.start + this.visibleCount;
   },
   data() {
      return {
         //可视区域高度
         screenHeight: 0,
         //偏移量
         startOffset: 0,
         //起始索引
         start: 0,
         //结束索引
         end: 0
      };
   },
   methods: {
      // 监听可视区域的滚动
      scrollEvent() {
         //当前滚动位置
         let scrollTop = this.$refs.list.scrollTop;
         //此时的开始索引（确保当前可视区域顶部item完全不可见时才改变起始索引）
         // e.g.
         // scrollTop 50 的时候，第一个元素还没有完全消失，此时还不能改变起始索引，取整 50 / 200 = 0
         // scrollTop 200 的时候，第一个元素完全消失，此时改变起始索引，取整 200 / 200 = 1
         // scrollTop 220 的时候，第二个元素还没有完全消失，此时还不能改变起始索引，取整 220 / 200 = 1 仍然是1
         this.start = Math.floor(scrollTop / this.itemSize);
         //此时的结束索引
         this.end = this.start + this.visibleCount;
         //此时的偏移量（确保顶部item完全不可见时，才改变偏移）
         // e.g.
         // scrollTop 50的时候，startOffset = 50 - (50 % 200) = 50 - 50 = 0 不改变偏移
         // scrollTop 200的时候，startOffset = 200 - (200 % 200) = 200 - 0 = 200 改变偏移，让渲染区向下偏移刚才删掉元素的高度
         this.startOffset = scrollTop - (scrollTop % this.itemSize);
         console.log(scrollTop, this.startOffset);
         console.log(scrollTop % this.itemSize);
      }
   }
};
</script>

<style lang="less" scoped>
// 可视区域容器
.infinite-list-container {
   // 竖向滚动
   overflow-y: auto;
   position: relative;
   //   属性控制元素在移动设备上是否使用滚动回弹效果
   //   touch:当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果
   -webkit-overflow-scrolling: touch;

   // 占位容器（高度占位，总列表高度）
   .infinite-list-phantom {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
   }
   // 渲染区域（实际内容区域）
   .infinite-list {
      left: 0;
      right: 0;
      top: 0;
      position: absolute;

      .infinite-list-item {
         padding: 5px;
         color: #555;
         box-sizing: border-box;
         border-bottom: 1px solid #999;
         background-color: lightpink;
      }
   }
}
</style>