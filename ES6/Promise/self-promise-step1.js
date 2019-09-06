// 1. 基本的 new Promise 实现 + 调用一次 promise 的 then 方法
function Promise(executor) {
  // 在 Promise 内部定义一个状态 当前 promise 的状态
  let self = this
  self.status = 'pending' // 默认 promise 的状态
  self.value = undefined
  self.err = undefined

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled' // 成功态
    }
  }

  function reject(err) {
    if (self.status === 'pending') {
      self.err = err
      self.status = 'rejected' // 失败态
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
}
module.exports = Promise