import "@babel/polyfill";

// consele.log('Hello world');

const arr = [
  new Promise(() => {}),
  new Promise(() => {}),
]

arr.map(item => {
  console.log(item)
})