<template>
  <div class="home">
    当前登录用户名：{{$store.state.username}}
  </div>
</template>

<script>
// @ is an alias to /src
import { getUser } from '../api/user'
export default {
  name: 'home',
  async mounted() {
    // let res = await getUser()
    // console.log(res)
  },
  components: {
  }
}
</script>
