// const Promise = require('./self-promise-step4')
const fs = require('fs')
const path = require('path')
const Promise = require('./self-promise-step4')

function read(url) {
  let defer = Promise.defer()
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) defer.reject(err)
    defer.resolve(data)
  })
  return defer.promise
}

read(path.resolve(__dirname, './test/name.txt'))
  .then(data => {
    console.log(data)
  })

// function readFile(url) { // 依然嵌套太多，最好实现上面的defer写法
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, 'utf8', function (err, data) {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }

return

let p = new Promise(function (resolve, reject) {
    // resolve('实现承诺')
    throw 123
})

// 值的穿透
p.then().then().then(1, data => {
  console.log(data, '123')
})

// ---------