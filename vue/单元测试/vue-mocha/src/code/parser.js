export let parser = (str) => { // name=lance&age=20
  let obj = {}
  str.replace(/([^&=]*)=([^&=]*)/g, function() {
    obj[arguments[1]] = arguments[2]
  })
  return obj // {name: 'lance', age: '20'}
}

export let stringify = (obj) => { // {name: 'lance', age: '20'}
  let arr = []
  for (const [key, value] of Object.entries(obj)) {
    arr.push(`${key}=${value}`)
  }
  return arr.join('&') // name=lance&age=20
}

console.log(parser('name=lance&age=20'))
console.log(stringify({
  name: 'lance',
  age: 20
}))