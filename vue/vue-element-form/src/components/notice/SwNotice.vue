<template>
   <div class="box" v-if="isShow">
      <h3>{{title}}</h3>
      <p class="box-content">{{message}}</p>
   </div>
</template>

<script>
   export default {
      props: {
         title: {
            type: String,
            default: ""
         },
         message: {
            type: String,
            default: ""
         },
         duration: {
            type: Number,
            default: 1000
         }
      },
      data() {
         return {
            isShow: false
         };
      },
      methods: {
         show() {
            this.isShow = true;
            setTimeout(this.hide, this.duration);
         },
         hide() {
            this.isShow = false;
            this.remove();
         }
      }
   };
</script>

<style lang="scss" scoped>
   .box {
      position: fixed;
      width: 100%;
      background: #f1f1f1;
      top: 50%;
      left: 50%;
      max-width: 80%;
      transform: translate(-50%, -50%);
      text-align: center;
      pointer-events: none;

      .box-content {
         width: 200px;
         margin: 10px auto;
         font-size: 14px;
         border: blue 3px solid;
         padding: 8px 16px;
         background: #fff;
         border-radius: 3px;
         margin-bottom: 8px;
      }
   }
</style>