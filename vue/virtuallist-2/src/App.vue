<template>
  <VirtualList :listData="data"></VirtualList>
</template>

<script>
import VirtualList from "./components/VirtualList";

import faker from "faker";

let data = [];
for (let id = 0; id < 1000; id++) {
  data.push({
    id,
    value: faker.lorem.sentences() // 长文本
  });
}

export default {
  name: "App",
  data() {
    return { data };
  },
  components: {
    VirtualList
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
html,
body,
#app {
  height: 100%;
}
</style>
