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
  const img = `http://placekitten.com\/${randomNumber(50, 200)}\/${randomNumber(50, 200)}`;
  const tempItem = Object.assign({}, item);
  tempItem.img = img;
  tempItem.content += index + "~~~";
  return tempItem;
});

// 获取所有需要的dom元素
const $container = $("#container");
const $bottomBtn = $("#bottom");
const $startBtn = $("#start");
const $closeBtn = $("#close");
const $resetBtn = $("#reset");

// 创建 BarrageManager，用来渲染整个弹幕
const bm = new BarrageManager($container, { data });

// 弹幕控制
startBtn.addEventListener('click', () => {
  if (bm.isPaused === false) return;
  bm.isPaused = true;
  bm.start();
});