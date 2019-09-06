// 1. 基本的 new Promise 实现 + 调用一次 promise 的 then 方法
// 2. new Promise 中可以含有异步操作
// 3. 同一个 promise 实例可以多次 then
function Promise(executor) {
  // 在 Promise 内部定义一个状态 当前 promise 的状态
  let self = this
  self.status = 'pending' // 默认 promise 的状态
  self.value = undefined
  self.err = undefined
  self.onFulfilledCallbacks = [] // 存储所有成功的回调
  self.onRejectedCallbacks = [] // 存储所有失败的回调
  function resolve(value) {
    // 防止状态已经确定后被修改
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled' // 成功态
      // 发布
      self.onFulfilledCallbacks.forEach(fn => fn())
    }
  }

  function reject(err) {
    if (self.status === 'pending') {
      self.err = err
      self.status = 'rejected' // 失败态
      // 发布
      self.onRejectedCallbacks.forEach(fn => fn())
    }
  }
  executor(resolve, reject)
}
Promise.prototype.then = function (onfulfilled, onrejected) {
  let self = this
  if (self.status === 'fulfilled') {
    onfulfilled(self.value)
  }
  if (self.status === 'rejected') {
    onrejected(self.err)
  }
  if (self.status === 'pending') {
    // 订阅
    self.onFulfilledCallbacks.push(function() {
      onfulfilled(self.value)
    })
    self.onRejectedCallbacks.push(function() {
      onrejected(self.err)
    })
  }
}
module.exports = Promise