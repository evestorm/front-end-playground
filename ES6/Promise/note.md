# 总结

## promise的三个状态

- pending
- fulfilled
- rejected

只能从 pending 到 fulfilled 或 rejected，不可逆且一旦转换不可变。即等待能转成功/失败，但成功不能转失败，失败也不能转成功。

## promise异步

发布订阅模式，如果 .then 的上一级return的是个Promise对象，那么监听上一级状态 pending 的改变，一旦改变就执行当前和后续then中的代码。

## .then 方法，必须返回一个新的 Promise

这样才能保证状态可变。因为如果 .then 还是之前的promise对象，那么状态就不能被改变了。（Promise的状态不可变性）

上一个状态返回的结果会成为下一个then成功或失败的值。

## resolvePromise（promise a+）

里面的核心逻辑就是判断 then 中函数的返回结果是个普通值还是个promise。

## Promise.defer

就是减少一层 return new Promise 的嵌套

```js
function read(url) {
  let defer = Promise.defer()
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) defer.reject(err)
    defer.resolve(data)
  })
  return defer.promise
}
...
Promise.defer = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
```

## .catch

.catch 就是 then 的简写，是个没有成功的 then。

## Promise all / race / resolve / reject

- all：return一个promise对象，其中维护一个数组存放各promise返回的最终结果。判断传入的数组中各对象是值还是个promise，如果是值，直接push到数组中，如果是promise对象，则在promise.then有了结果后再push到数组，每成功push一次计数index则+1。最终根据index是否等于.all传入的数组长度来判定是否走 Promise.all().then()
- race：不用维护一个内部数组了，传入数组中谁最先返回结果谁就获胜
- resolve：return new Promise(resolve => resolve(value))
- reject：return new Promise((resolve, reject) => reject(value))
