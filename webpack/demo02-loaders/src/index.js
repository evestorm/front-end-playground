// var avatar = require('./avatar.jpg')
// console.log(avatar)

import avatar from './avatar.jpg'
import './index.css'
import style from './common.scss'
import createAvatar from './createAvatar'

import './font.scss'

// 通过方法生成的图片
createAvatar()

// 直接生成的图片
const img = new Image()
img.src = avatar
img.classList.add(style.avatar)

const root = document.getElementById('root')
root.appendChild(img)

// 添加字体图标
const div = document.createElement('div')
div.innerHTML = '<div class="iconfont icon-changjingguanli"></div>'
root.appendChild(div)