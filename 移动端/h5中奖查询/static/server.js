//首先安装express
//1.引入express
const express = require('express');

//2.创建服务器对象
let server = express();

//3.创建一个路由对象
let router = express.Router();

//4.设置路由
router.get('/list', (req, res) => {
  res.send('这是页面');
}).get('/register', (req, res) => {
  res.send('这是注册页面');
});
server.use(router);

//5.监听端口
server.listen(8888, (req, res) => {
  console.log('Server running at http://127.0.0.1:8888/')
});