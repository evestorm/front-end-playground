const Promise = require('./self-promise-step2')

console.log('start')
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('没有实现承诺')
    // resolve('实现了承诺')
  }, 1000);
})

p.then(value => {
  console.log('success', value)
}, err => {
  console.log('error', err)
})
p.then(value => {
  console.log('success', value)
}, err => {
  console.log('error', err)
})
console.log('end')