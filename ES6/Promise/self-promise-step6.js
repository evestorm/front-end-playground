// 1. 基本的 new Promise 实现 + 调用一次 promise 的 then 方法
// 2. new Promise 中可以含有异步操作（状态未改变时，把then中的回调存储起来，状态改变后再执行相应的resolve和reject）
// 3. 同一个 promise 实例可以多次 then
// 4. 链式调用
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
  try {
    executor(resolve, reject) // 用户会调用 resolve / reject
  } catch (e) {
    reject(e) // 说明失败了
  }
}
// let index = 2
// Object.defineProperty(x, then, {
//   get() {
//     index--
//     if (index === 0) {
//       throw new Error()
//     }
//   }
// }) // 此案例配合下方注释包含「then属性具有getter且throw」的这行代码使用

// 这个规范是通用的，我们的promise可能会在别的promise中使用
function resolvePromise(promise2, x, resolve, reject) { // 判断 x 是不是 promise
  if (promise2 === x) { // 表示防止自己等待自己
    return reject(new TypeError('循环引用了'))
  }
  let called // 表示当前有没有被调用过
  // 保证当前 x 是个引用类型（排除null，因为null的typeof是object）
  if (x!== null && typeof x === 'object' || typeof x === 'function') {
    // 很有可能是个promise
    try {
      let then = x.then // then属性具有getter且throw一个错误时，获取值会发生异常，所以reject，另外之所以let一个then，是防止第二次获取then时报错，所以使用let的方式保证只调用一次
      if (typeof then === 'function') { // 就认为是promise
        then.call(x, (y) => { // 有可能是一个promise
          if (!called) return // 给别人封装的promise增加的（防止别人的库中既调用了成功又调用了失败）
          called = true
          // 一直解析，知道结果是一个常量为止
          resolvePromise(promise2, y, resolve, reject)
          // resolve(y) // 成功拿到成功的结果，让promise2变成成功态
        }, (r) => {
          if (!called) return
          called = true
          reject(r)
        }) // 保证this永远指向当前x这个实例
      } else { // 当前这个then就是个对象，普通对象
        resolve(x) // {a: 1}
      }
    } catch (e) {
      if (!called) return
      called = true
      reject(e)
    }
  } else { // 如果是普通值
    resolve(x)
  }
}
Promise.prototype.then = function (onfulfilled, onrejected) {
  // 防止两个回调有不传的情况，导致值穿透 p.then().then().then(1, data => { console.log(data, '123') })
  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
  onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
  let self = this
  // 调用 then 后需要再次返回一个全新的promise
  // 我们需要拿到当前then方法，成功或者失败执行后的结果
  let promise2 = new Promise(function (resolve, reject) {
    if (self.status === 'fulfilled') {
      setTimeout(() => { // 下面的代码需要使用异步，否则获取不到promise2，因为promise2是在外面用Promise new出来的，而你在new Promise里面又使用到了promise2，肯定拿不到。所以用异步。
        try {
          let x = onfulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e) // 如果执行函数时抛出失败，那么会走向下一个.then的失败状态
        }
      }, 0);
    }
    if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onrejected(self.err)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0);
    }
    if (self.status === 'pending') {
      // 订阅
      self.onFulfilledCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onfulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      })
      self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onrejected(self.err)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      })
    }
  })
  return promise2
}

Promise.all = function(values) {
  return new Promise((resolve, reject) => {
    let arr = [] // 最终结果的数组
    let index = 0
    function processData(key, value) {
      index++
      arr[key] = value
      if (index === values.length) { // 如果最终的结果的个数和values的个数相等
        resolve(arr)
      }
    }
    for (let i = 0; i < values.length; i++) {
      const current = values[i]
      if (current && current.then && typeof current.then === 'function') {
        // 是 promise 就 .then
        current.then(y => {
          processData(i, y)
        }, reject)
      } else {
        // 是普通值就直接添加到数组
        processData(i, current)
      }
    }
  })
}

Promise.race = function (values) {
  // 谁跑的快就是谁，所以不用维护数组
  return new Promise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      const current = values[i]
      if (current && current.then && typeof current.then === 'function') {
        // promise
        current.then(resolve, reject)
      } else {
        resolve(current)
      }
    }
  })
}

Promise.resolve = function(value) {
  return new Promise(resolve => resolve(value))
}

Promise.reject = function(value) {
  return new Promise((resolve, reject) => reject(value))
}

// 面试题：让你实现一个promise的延迟对象
Promise.defer = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise