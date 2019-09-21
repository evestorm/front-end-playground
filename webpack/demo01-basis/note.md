# webpack

## 创建 package.json 文件

项目文件根目录下运行：

```shell
npm init
```

这样npm会询问你一堆有的没的，很麻烦。所以你还可以运行：

```shell
npm init -y
```

这样就能直接生成 `package.json` 了。

### package.json 文件配置信息

```json
{
  "name": "demo01",
  "version": "1.0.0",
  "description": "",
  "private": true, // 该包不会被发布到npm上
  "main": "index.js", // 暴露给外界的入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

## webpack 安装

### 全局安装（不推荐）

为什么不推荐全局安装？

因为有可能本地既有webpack3的项目，又有webpack4的项目。如果全局是webpack4，那么webpack3的项目就运行不起来。

```shell
npm install webpack webpack-cli -g
```

p.s. webpack-cli 的作用是为了让我们能够在命令行使用 webpack 命令。

查看 webpack 版本：

```shell
webpack -v
```

### 在项目中安装（推荐）

首先卸载全局 webpack、和webpack-cli ：

```shell
npm uninstall webpack webpack-cli -g
```

然后在命令行下，进入你需要的项目文件夹输入：

```shell
npm install webpack webpack-cli -D
```

查看当前项目安装的webpack版本号：

```shell
npx webpack -v
```

p.s. 是 npx 不是 npm 哦。

#### 项目中安装指定版本 webpack

首先查看 webpack 历史版本号：

```shell
npm info webpack
```

然后安装指定版本 webpack ：

```shell
mkdir demo02
npm init -y
npm install webpack@4.16.5 webpack-cli -D
```

安装完毕后再 `npx webpack -v` 就会发现，版本变为了 `4.16.5` 。
这样我们就实现了不同项目采用不同版本webpack的目的。

### 打包文件

```shell
npx webpack index.js
```

用 webpack 对 index.js 入口文件进行打包

## webpack 配置文件

> webpack.config.js

```js
const path = require('path')

module.exports = {
  entry: './src/index.js', // 1. 设置 webpack 从 index.js 打包
  output: { // 2. 然后把打包后的文件放到 bundle 文件夹下，并命名为 bundle.js
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development', // 生产环境[production]打包（会压缩代码）or 开发环境[development]打包（不压缩代码）
}
```

配置完一个基本webpack后，就只需运行 `npx webpack` 命名进行打包了。

### 配置文件改名

默认webpack配置文件叫做 `webpack.config.js` ，如果换个文件名运行 `npx webpack` 就会报错。如果想要更改配置文件名称后仍能支持打包，则需要在命令行追加配置：

```shell
npx webpack --config lance.js
```

## 改用 npm 命令进行打包

之前一直用的 `npx` 进行打包，然而日常开发中我们主要用的却是 `npm run xxx` 命令。这种命令的支持需要在 `package.json` 中做 script 配置：

```json
"scripts": {
  "bundle": "webpack"
},
```

例如上面这样配置后，我们就可以改 `npx webpack` 为 `npm run bundle` 命令进行执行打包。
