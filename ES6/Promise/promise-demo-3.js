const Promise = require('./self-promise-step3')
const fs = require('fs')
const path = require('path')

let p = new Promise(function (resolve, reject) {
  // setTimeout(() => {
    resolve('实现承诺')
  // }, 1000);
})
// 判断then函数的执行结果，和promise2的关系
let promise2 = p.then(data => {
  // return promise2 // 如果自己等待着自己完成，那么当前就应该走向失败
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(3000)
            }, 1000);
          }))
        }, 1000);
      }))
    }, 1000);
  })
})
promise2.then(data => {
  console.log('success', data)
}, err => {
  console.log('err', err)
})

// promise2.then(data => {
//   console.log(data)
// }, err => {
//   console.log('err', err)
// })

return

// 封装的readFile方法
function readFile (url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// 链式调用：调用的特点
// 1. 如果一个 then 方法，返回一个普通值，这个值会传递给下一次 then 中作为成功的结果
// 2. 如果不是普通值（promise or 报错）
// 3. 如果返回的是一个promise，会根据返回的promise是成功还是失败，来决定下一个then是成功还是失败
// 4. 捕获错误的机制：默认会找离自己最近的then失败函数，找不到就一直向下找
// 5. jquery链式调用 返回this promise调用then后，会返回一个新的promise（因为一旦一个promise改变了状态，就无法逆转）
readFile(path.resolve(__dirname, './test/name.txt'))
  .then(
    data => readFile(path.resolve(__dirname, `./test/${data}1`)), 
    err => console.log(err))
  .then(
    data => console.log(data),
    // function(err) {
    //   console.log('err ' + err)
    //   // return undefined
    //   // 一旦上一个then出错了，这里return的其实就是个undefined
    //   // 所以下方then走第一个回调，data值为undefined
    // }
  )
  .then(
    data => console.log(data),
    // err => console.log(err)
  ).catch(err => {
    // console.log('catch ' + err)
    throw err
  }) // 之前的then都没有捕获错误时，catch才会捕获
  .then(data => { // 上面的catch如果也出错，就会被后面的err捕获，如果没出错，进入后面then的第一个函数
    console.log(data)
  }, () => {
    console.log('err')
  })

// node写法
// 嵌套获取，先调用第一个接口，第一个接口的输出是下一个的输入
// 也就是常说的回调地狱，阅读和维护都不方便
// fs.readFile(path.resolve(__dirname, './test/name.txt'), 'utf8', function(err, data) {
//   console.log(data)
//   fs.readFile(path.resolve(__dirname, './test/' + data), 'utf8', function(err, data) {
//     console.log(data)
//   })
// })