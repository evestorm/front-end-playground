## 需求

- 最多6行
- 前后间距相同，上下间距相同
- 从右至左，从上到下
- 循环播放
- 可设置固定底部播放

## 技术

- css3 动画（transform，animation）
- ES6（Class）

## 结构

- 定义一个 Barrage 的类，专门用来实例化一条弹幕
  - init 初始化
  - render 渲染自身
  - remove 删除自身
- 定义一个 BarrageManager 类，专门用来管理弹幕以及操作弹幕
  - init 初始化
  - render 渲染所有弹幕
  - clear 清屏
  - pause 暂停
  - options 配置
    - direction 弹幕方向（默认从右往左）
    - bgColor 背景颜色
    - color 字体颜色
    - speed 速度
    - circle 是否循环弹幕
    - row 几行（默认6行）
    - isBottom 仅底部显示（默认false）

## 思路

Barrage:
负责生成一条弹幕dom
BarrageManager：
