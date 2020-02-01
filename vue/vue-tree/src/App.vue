<template>
  <div id="app">
    <Tree :model="treeData"></Tree>
  </div>
</template>

<script>
  import Tree from "./components/tree";

  export default {
    name: 'app',
    data() {
      return {
        treeData: {
          title: "Web全栈架构师",
          children: [{
              title: "Java架构师"
            },
            {
              title: "JS高级",
              children: [{
                  title: "ES6"
                },
                {
                  title: "动效"
                }
              ]
            },
            {
              title: "Web全栈",
              children: [{
                  title: "Vue训练营",
                  expand: true,
                  children: [{
                      title: "组件化"
                    },
                    {
                      title: "源码"
                    },
                    {
                      title: "docker部署"
                    }
                  ]
                },
                {
                  title: "React",
                  children: [{
                      title: "JSX"
                    },
                    {
                      title: "虚拟DOM"
                    }
                  ]
                },
                {
                  title: "Node"
                }
              ]
            }
          ]
        }
      }
    },
    components: {
      Tree
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>