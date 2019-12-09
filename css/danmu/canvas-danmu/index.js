// https://juejin.im/post/5be54a286fb9a049ae07641b
let currentTime = 0;

setInterval(() => {
  currentTime += 1;
}, 1000);

let data = [{
    value: '周杰伦的听妈妈的话，让我反复循环再循环',
    time: 5,
    color: 'red',
    speed: 1,
    fontSize: 22
  },
  {
    value: '想快快长大，才能保护她', // 必填
    time: 10, // 必填
    color: '#00a1f5',
    speed: 1,
    fontSize: 30
  },
  {
    value: '听妈妈的话吧，晚点再恋爱吧！爱呢？',
    time: 15
  },
];

// 获取到所有需要的dom元素
let doc = document;
let canvas = doc.getElementById('canvas');
let video = doc.getElementById('video');
let $txt = doc.getElementById('text');
let $btn = doc.getElementById('btn');
let $color = doc.getElementById('color');
let $range = doc.getElementById('range');


// 创建Barrage类，用来实例化每一个弹幕元素
class Barrage {
  constructor(obj, ctx) {
    this.value = obj.value; // 弹幕的内容
    this.time = obj.time; // 弹幕出现时间
    // 把obj和ctx都挂载到this上方便获取
    this.obj = obj;
    this.context = ctx;
  }
  // 初始化弹幕
  init() {
    // 如果数据里没有涉及到下面4种参数，就直接取默认参数
    this.color = this.obj.color || this.context.color;
    this.speed = this.obj.speed || this.context.speed;
    this.opacity = this.obj.opacity || this.context.opacity;
    this.fontSize = this.obj.fontSize || this.context.fontSize;

    // 为了计算每个弹幕的宽度，我们必须创建一个元素p，然后计算文字的宽度
    let p = document.createElement('p');
    p.style.fontSize = this.fontSize + 'px';
    p.innerHTML = this.value;
    document.body.appendChild(p);

    // 把p元素添加到body里了，这样就可以拿到宽度了
    // 设置弹幕的宽度
    this.width = p.clientWidth;
    // 得到了弹幕的宽度后，就把p元素从body中删掉吧
    document.body.removeChild(p);

    // 设置弹幕出现的位置
    this.x = this.context.canvas.width;
    this.y = this.context.canvas.height * Math.random();
    // 做下超出范围处理
    if (this.y < this.fontSize) {
      this.y = this.fontSize;
    } else if (this.y > this.context.canvas.height - this.fontSize) {
      this.y = this.context.canvas.height - this.fontSize;
    }
  }
  // 渲染每个弹幕
  render() {
    // 设置画布文字的字号和字体
    this.context.ctx.font = `${this.fontSize}px Arial`;
    // 设置画布文字颜色
    this.context.ctx.fillStyle = this.color;
    // 绘制文字
    this.context.ctx.fillText(this.value, this.x, this.y);
  }
}

// 创建CanvasBarrage类
class CanvasBarrage {
  constructor(canvas, video, opts = {}) {
    // opts = {}表示如果opts没传就设为{}，防止报错，ES6语法

    // 如果canvas和video都没传，那就直接return掉
    if (!canvas || !video) return;

    // 直接挂载到this上
    this.video = video;
    this.canvas = canvas;
    // 设置canvas的宽高和video一致
    this.canvas.width = video.clientWidth;
    this.canvas.height = video.clientHeight;
    // 获取画布，操作画布
    this.ctx = canvas.getContext("2d");

    // 设置默认参数，如果没有传就给带上
    let defOpts = {
      color: "#e91e63",
      speed: 1.5,
      opacity: 0.5,
      fontSize: 20,
      data: []
    };
    // 合并对象并全都挂到this实例上
    Object.assign(this, defOpts, opts);

    // 添加个属性，用来判断播放状态，默认是true暂停
    this.isPaused = true;
    // 得到所有的弹幕消息
    this.barrages = this.data.map((item) => new Barrage(item, this));
    // 渲染
    this.render();
    console.log(this);
  }

  renderBarrage() {
    // 首先拿到当前视频播放的时间
    // 要根据该时间来和弹幕要展示的时间做比较，来判断是否展示弹幕
    // let time = this.video.currentTime;
    let time = currentTime;
    console.log(time);
    // 遍历所有的弹幕，每个barrage都是Barrage的实例
    this.barrages.forEach((barrage) => {
      // 用一个flag来处理是否渲染，默认是false
      // 并且只有在视频播放时间大于等于当前弹幕的展现时间时才做处理
      if (!barrage.flag && time >= barrage.time) {
        // 判断当前弹幕是否有过初始化了
        // 如果isInit还是false，那就需要先对当前弹幕进行初始化操作
        if (!barrage.isInit) {
          barrage.init();
          barrage.isInit = true;
        }
        // 弹幕要从右向左渲染，所以x坐标减去当前弹幕的speed即可
        barrage.x -= barrage.speed;
        barrage.render(); // 渲染当前弹幕

        // 如果当前弹幕的x坐标比自身的宽度还小了，就表示结束渲染了
        if (barrage.x < -barrage.width) {
          barrage.flag = true; // 把flag设为true下次就不再渲染
        }
      }
    });
  }

  // 渲染canvas绘制的弹幕
  render() {
    // 渲染的第一步是清除原来的画布，方便复用写成clear方法来调用
    this.clear();
    // 渲染弹幕
    this.renderBarrage();
    // 如果没有暂停的话就继续渲染
    if (this.isPaused === false) {
      // 通过raf渲染动画，递归进行渲染
      requestAnimationFrame(this.render.bind(this));
    }
  }

  clear() {
    // 清除整个画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  replay() {
    this.clear(); //先清除画布
    // 获取当前视频播放时间
    // let time = this.video.currentTime;
    let time = currentTime;
    console.log(time);
    // 遍历barrages弹幕数组
    this.barrages.forEach(barrage => {
      // 当前弹幕的flag设为false
      barrage.flag = false;
      // 并且，当前视频时间小于等于当前弹幕所展现的时间
      if (time <= barrage.time) {
        // 就把isInit重设为false，这样才会重新初始化渲染
        barrage.isInit = false;
      } else { // 其他时间对比不匹配的，flag还是true不用重新渲染
        barrage.flag = true;
      }
    });
  }
}
// 创建CanvasBarrage实例
let canvasBarrage = new CanvasBarrage(canvas, video, {
  data
});

// 设置video的play事件来调用CanvasBarrage实例的render方法
document.getElementById('play').addEventListener('click', () => {
  console.log(123);
  if (canvasBarrage.isPaused === false) return;
  canvasBarrage.isPaused = false;
  canvasBarrage.render(); // 触发弹幕
});
document.getElementById("pause").addEventListener("click", () => {
  console.log(canvasBarrage.isPaused);
  if (canvasBarrage.isPaused === true) return;
  canvasBarrage.isPaused = true;
  canvasBarrage.render(); // 暂停弹幕
});
document.getElementById("replay").addEventListener("click", () => {
  console.log(123);
  // canvasBarrage.isPaused = false;
  currentTime = 0;
  canvasBarrage = new CanvasBarrage(canvas, video, {
		data
  });
  canvasBarrage.isPaused = false;
  canvasBarrage.render(); // 重绘弹幕
});