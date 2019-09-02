// ajaxRequest 获取
import axios from 'axios'
import store from '../store'
import { getLocal } from '../libs/local'

// 当第一次请求 显示loading 剩下的时候就不调用了
// 当都请求完毕后，隐藏loading
class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'
    this.timeout = 3000
    this.queue = {} // 存放请求队列
  }
  merge(options) {
    return {...options, baseURL: this.baseURL, timeout: this.timeout}
  }
  setInterceptor(instance, url) {
    // 一般请求拦截器中干下面两件事：
    // 1. 更改请求头（比如添加jwt）
    // 2. 添加loading效果
    instance.interceptors.request.use(config => {
      config.headers.Authorization = getLocal('token')
      // 保证第一次请求 显示loading
      if (Object.keys(this.queue).length === 0) {
        store.commit('showLoading')
      }
      this.queue[url] = url
      return config
    })
    // 如果上一个promise返回了一个常量，会作为下一个promise的输入
    instance.interceptors.response.use(res => {
      delete this.queue[url] // 每次请求成功后，就从队列中删除该请求url
      // 当都请求完毕后，再隐藏loading
      if (Object.keys(this.queue).length === 0) {
        store.commit('hideLoading')
      }
      return res.data
    })
  }
  request(options) {
    let instance = axios.create() // 通过axios库创建一个axios实例
    // 拦截器
    this.setInterceptor(instance, options.url)
    let config = this.merge(options)
    return instance(config) // axios执行后返回的是一个promise
  }
}

export default new AjaxRequest

// 外界如何使用：
// import ajax from "./ajaxRequest"
// ajax.request({
//   url: 'xxx',
//   method: 'xxx'
// }).then()