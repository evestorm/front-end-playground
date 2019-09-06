const Promise = require('./self-promise-test')

console.log('start')
let p = new Promise((resolve, reject) => {
  console.log('Enter the promise')
  reject('没有实现承诺')
  resolve('实现承诺')
})

p.then(value => {
  console.log('success', value)
}, err => {
  console.log('error', err)
})
console.log('end')