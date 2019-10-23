// import "@babel/polyfill"; // 新版webpack4不需要引入了

// consele.log('Hello world');

const arr = [
  new Promise(() => {}),
  new Promise(() => {}),
]

arr.map(item => {
  console.log(item)
})