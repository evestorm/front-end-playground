const express = require('express')

const app = express()

const bodyParser = require('body-parser')

let jwt = require('jsonwebtoken')

// 解决跨域【express跨域】
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method.toLowerCase() === 'options') {
    return res.end()
  }
  next()
})

app.use(bodyParser.json())

// 秘钥
let secret = 'lance'

app.post('/login', (req, res) => {
  let { username } = req.body
  if (username === 'admin') {
    res.json({
      code: 0,
      username: 'admin',
      // 三个参数：payload, 秘钥，{过期时间}
      token: jwt.sign({username: 'admin'}, secret, {
        expiresIn: 20
      })
    })
  } else {
    res.json({
      code: 1,
      data: '用户名不存在'
    })
  }
})

app.get('/validate', (req, res) => {
  let token = req.headers.authorization
  jwt.verify(token, secret, (err, decode) => { // decode => {username: 'admin'}
    if (err) { // token有错或token失效
      return res.json({
        code: 1,
        data: 'token失效了'
      })
    } else {
      res.json({ // 淘宝登陆后 离开30分钟 登录状态失效（给token续命）
        // 需要把token的时效延长
        code: 0,
        username: decode.username,
        token: jwt.sign({username: 'admin'}, secret, {
          expiresIn: 20
        })
      })
    }
  })
})

app.listen(3000)