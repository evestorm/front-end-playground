String.prototype.format = function (args) {
  var result = this;
  if (arguments.length < 1) {
    return result;
  }
  var data = arguments;
  if (arguments.length == 1 && typeof args == "object") {
    data = args;
  }
  for (var key in data) {
    var value = data[key];
    if (undefined != value) {
      result = result.replace("{" + key + "}", value);
    }
  }
  return result;
};
var barrager_code =
  "var item={\n" +
  "   img:'{img}', //图片 \n" +
  "   info:'{info}', //文字 \n" +
  "   href:'{href}', //链接 \n" +
  "   close:{close}, //显示关闭按钮 \n" +
  "   speed:{speed}, //延迟,单位秒,默认6 \n" +
  "   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n" +
  "   color:'{color}', //颜色,默认白色 \n" +
  "   old_ie_color:'{old_ie_color}', //ie低版兼容色,不能与网页背景相同,默认黑色 \n" +
  " }\n" +
  "$('body').barrager(item);";

$(function () {
  SyntaxHighlighter.all();
  $(".pick-a-color").pickAColor();

  var default_item = {
    img: "static/heisenberg.png",
    info: "弹幕文字信息",
    href: "http://www.yaseng.org",
    close: true,
    speed: 6,
    bottom: 70,
    color: "#fff",
    old_ie_color: "#000000"
  };
  var item = {
    img: "static/img/heisenberg.png",
    href: "http://www.baidu.com",
    info: "Jquery.barrager.js 专业的网页弹幕插件"
  };
  //item1={'href':'http://www.baidu.com','info':'这是一条很长很长的字幕','close':false};
  $("#barrager-code").val(barrager_code.format(default_item));

  // $("body").barrager(item);

  //每条弹幕发送间隔
  var looper_time = 3 * 1000;
  //是否首次执行
  var run_once = true;

  function do_barrager() {
    if (run_once) {
      //如果是首次执行,则设置一个定时器,并且把首次执行置为false
      looper = setInterval(do_barrager, looper_time);
      run_once = false;
    }
    //获取
    $.getJSON("server.php?mode=1", function (data) {
      //是否有数据
      if (data.info) {
        $("body").barrager(data);
      }
    });
  }

  function barrager() {}
});

function run() {
  var info = $("input[name=info]").val();
  info == "" ? (info = "请填写弹幕文字") : (info = info);
  var href = $("input[name=href]").val();
  var speed = parseInt($("input[name=speed]").val());
  var bottom = parseInt($("input[name=bottom]").val());
  var code = barrager_code;
  if ($("input:radio[name=bottomradio]:checked").val() == 0) {
    var window_height = $(window).height() - 150;
    bottom = Math.floor(Math.random() * window_height + 40);
    code = code.replace(
      "   bottom:{bottom}, //距离底部高度,单位px,默认随机 \n",
      ""
    );
  }

  var img = $("input:radio[name=img]:checked").val();

  if (img == "none") {
    code = code.replace("   img:'{img}', //图片 \n", "");
  }

  var item = {
    img: "static/img/" + img,
    info: info,
    href: href,
    close: true,
    speed: speed,
    bottom: bottom,
    color: "#" + $("input[name=color").val(),
    old_ie_color: "#" + $("input[name=color").val()
  };

  if (!$("input[name=close]").is(":checked")) {
    item.close = false;
  }

  code = code.format(item);
  console.log(code);
  $("#barrager-code").val(code);
  eval(code);
}

function clear_barrage() {
  $.fn.barrager.removeAll();
}

function calculateHeight(index) {
  var windowW = document.body.clientWidth;
  var windowH = document.body.clientHeight;
  console.log({windowW, windowH });
}

function run_example() {
  var items = Array.from({
    length: 20
  }).map(
    (_, index) => {
      return {
				img:
					index % 2 === 0 ? "static/img/heisenberg.png" : "static/img/cute.png",
				info: `我是第 ${index} 条弹幕~~~`,
				// bottom: 70
			};
    }
  );
  //每条弹幕发送间隔
  var looper_time = 1 * 1000;
  //弹幕总数
  var total = items.length;
  //是否首次执行
  var run_once = true;
  //弹幕索引
  var index = 0;
  //先执行一次
  barrager();

  function barrager() {
    if (run_once) {
      //如果是首次执行,则设置一个定时器,并且把首次执行置为false
      looper = setInterval(barrager, looper_time);
      run_once = false;
    }
    //发布一个弹幕
    $("body").barrager(items[index]);
    //索引自增
    index++;
    //所有弹幕发布完毕，清除计时器。
    if (index == total) {
      clearInterval(looper);
      run_once = true;
      index = 0;
      barrager();
      // return false;
    }
  }
}