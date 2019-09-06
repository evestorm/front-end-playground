function Promise(executor) {
  // 在 Promise 内部定义一个状态 当前 promise 的状态
  let self = this
  self.status = 'pending' // 默认 promise 的状态
  self.value = undefined
  self.err = undefined

  function resolve(value) {
    // 防止状态已经确定后被修改
    if (self.status === 'pending') {
      self.value = value
      self.status = 'resolved' // 成功态
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
  if (self.status === 'resolved') {
    onfulfilled(self.value)
  }
  if (self.status === 'rejected') {
    onrejected(self.err)
  }
}

module.exports = Promise