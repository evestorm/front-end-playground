const Promise = require('./self-promise-step6')
const fs = require('fs')
const path = require('path')

Promise.resolve(5).then(data => console.log(data))
Promise.reject(5).then(() => {}, err => console.log(err))

// ---

// 繁琐，希望封装一个函数，可以把 fs.readFile传进去，获取到数据后返回
// function readFile(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(url, 'utf8', function (err, data) {
//       if (err) reject(err)
//       resolve(data)
//     })
//   })
// }

function promisify (fn) { // node中 util模块自带了这个功能
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function(err, data) {
        if(err) reject(err)
        resolve(data)
      })
    })
  }
}

let readFile = promisify(fs.readFile)
Promise.all([1, readFile(path.resolve(__dirname, './test/name.txt'), 'utf8'), readFile(path.resolve(__dirname, './test/age.txt'), 'utf8')])
  .then(data => {
    console.log(data)
  }, err => console.log(err))