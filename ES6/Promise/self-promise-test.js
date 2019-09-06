function Promise (executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.err = undefined
  function resolve (value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'resolved'
    }
  }
  function reject (err) {
    if (self.status === 'pending') {
      self.err = err
      self.status = 'rejected'
    }
  }
  executor(resolve, reject)
}
Promise.prototype.then = function(onfulfilled, onrejected) {
  let self = this
  if (self.status === 'resolved') {
    onfulfilled(self.value)
  }
  if (self.status === 'rejected') {
    onrejected(self.err)
  }
}
module.exports = Promise