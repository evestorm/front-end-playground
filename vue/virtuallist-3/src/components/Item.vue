<template>
  <p><span style="color:red">{{item.id}}</span>{{item.value}}</p>
</template>


<script>
//ç»ä»¶api https://github.com/dwqs/react-virtual-list/blob/develop/README-CN.md
export default {
  props: {
    //ææåè¡¨æ°æ®
    item:{
      type:Object,
      default:()=>{}
    }
  },
  
  mounted() {
    
  },
  updated(){
    
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>


<style scoped>

</style>