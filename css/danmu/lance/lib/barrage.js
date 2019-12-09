/**
 * 用来实例化每一个弹幕
 * @class Barrage
 * @param item 弹幕数据
 * @param bm 弹幕管理者
 */
class Barrage {
  constructor(item, bm) {
    this.content = item.content;
    this.img = item.img;

    this._item = item;
    this._bm = bm;
  }
  // 弹幕初始化
  init() {
    // 如果数据里没有涉及到下面4种参数，就直接取默认参数
    this.color = this._item.color || this._bm.color;
    this.speed = this._item.speed || this._bm.speed;
    this.opacity = this._item.opacity || this._bm.opacity;
    this.fontSize = this._item.fontSize || this._bm.fontSize;
  }
}

class BarrageManager {
  constructor(container, options = {}) {
    // 如果 container 没传，直接return
    if (!container) return;

    // 直接挂载到this上
    this._container = container;
    // 设置边界与容器宽高一致
    this._width = container.clientWidth;
    this._height = container.clientHeight;

    // 设置默认参数，如果没有传就给带上
    let defOpts = {
      color: "#e91e63",
      bgColor: "white",
      speed: 1.5,
      opacity: 0.5,
      fontSize: 20,
      data: []
    };
    // 合并对象并全都挂到this实例上
    Object.assign(this, defOpts, options);

    // 添加个属性，用来判断播放状态，默认是true暂停
    this.isPaused = true;
    // 得到所有的弹幕消息
    this.barrages = this.data.map((item) => new Barrage(item, this));
    // 渲染
    this.render();
    console.log(this);
  }
  // 渲染绘制的弹幕
  render() {
    // 渲染的第一步是清除原来的画布，方便复用写成clear方法来调用
    this.clear();
    // 渲染弹幕
    this.renderBarrage();
    // // 如果没有暂停的话就继续渲染
    // if (this.isPaused === false) {
    // 	// 通过raf渲染动画，递归进行渲染
    // 	requestAnimationFrame(this.render.bind(this));
    // }
  }
  // 渲染真正的弹幕数据
  renderBarrage() {
    // 遍历所有的弹幕，每个barrage都是Barrage的实例
    this.barrages.forEach((barrage) => {
      // 用一个flag来处理是否渲染，默认是false
      if (!barrage.flag) {
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
  // 清空画布
  clear() {
    // 清除整个容器中的弹幕
    this._container.remove(".barrage-item");
  }
}