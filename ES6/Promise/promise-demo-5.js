const Promise = require('./self-promise-step5')
const path = require('path')
const fs = require('fs')

function readFile(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

Promise.all([1, readFile(path.resolve(__dirname, './test/name.txt')), readFile(path.resolve(__dirname, './test/age.txt'))])
  .then(data => {
    console.log(data)
  }, err => {
    console.log(err)
  })

Promise.race([readFile(path.resolve(__dirname, './test/name.txt')), readFile(path.resolve(__dirname, './test/age.txt'))])
  .then(data => {
    console.log(data)
  }, err => {
    console.log(err)
  })