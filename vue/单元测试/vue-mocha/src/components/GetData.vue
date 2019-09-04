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

<style lang="scss" scoped>

</style>