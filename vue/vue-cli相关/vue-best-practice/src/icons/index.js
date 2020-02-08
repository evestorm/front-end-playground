import Vue from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
// 全局引入SvgIcon组件
Vue.component("svg-icon", SvgIcon);

// icons/index.js
// 下面这行代码会指定 require 的上下文为 svg 文件夹下的所有 svg 后缀名文件
const req = require.context("./svg", false, /\.svg$/)
// keys: ['qq.svg', 'wx.svg']
req.keys().map(req)