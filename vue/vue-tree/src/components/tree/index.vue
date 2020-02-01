<template>
   <div>
      <ul>
         <item class="item" :model="model"></item>
      </ul>
   </div>
</template>

<script>
   import Item from "./Item";
   export default {
      props: {
         model: {
            type: Object,
            required: true,
         }
      },
      components: {
         Item
      }
   };
</script>

<style lang="scss" scoped>
</style>