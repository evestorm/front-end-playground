// 弹幕类
class Barrage {
  // 参数 当前弹幕管理员
  constructor(opts, bm) {
    this._opts = opts;
    this._bm = bm;
  }
  init() {
    const { img, content } = this._opts;
    let temp = `
      <div class="barrage">
        <img class="img" src="${img}" alt="cat">
        <div class="content">${content}</div>
      </div>
    `;
    return temp;
  }
  render() {
    $("#container").append($(this.init()));
  }
}

// 模拟数据
const item = {
	img: "http://placekitten.com/50/50", // 头像
  content: "我是弹幕：", // 内容
  // 下面是今后的拓展
	color: "pink", // 字体颜色
	speed: 5, // 速度
	backgroundColor: "white", // 背景颜色
	x: 0, // 初始x轴
	y: 0 // 初始y轴
};
const data = Array.from({ length: 20 }).map((_, index) => {
	const img = `http://placekitten.com\/${randomNumber(50, 200)}\/${randomNumber(
		50,
		200
	)}`;
	const tempItem = Object.assign({}, item);
	tempItem.img = img;
	tempItem.content += index + "~~~";
	return tempItem;
});

const barrage = new Barrage(data[0], {});
barrage.render();