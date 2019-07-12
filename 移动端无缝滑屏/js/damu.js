+(function (w) {
  // 使用命名空间来避免命名冲突
  w.damu = {};
  w.damu.css = function (node, type, val) {
    if (typeof node === "object" && typeof node["transform"] === "undefined") {
      node["transform"] = {};
    }

    if (arguments.length >= 3) {
      //设置
      var text = "";
      node["transform"][type] = val;

      for (item in node["transform"]) {
        if (node["transform"].hasOwnProperty(item)) {
          switch (item) {
            case "translateX":
            case "translateY":
              text += item + "(" + node["transform"][item] + "px)";
              break;
            case "scale":
              text += item + "(" + node["transform"][item] + ")";
              break;
            case "rotate":
              text += item + "(" + node["transform"][item] + "deg)";
              break;
          }
        }
      }
      node.style.transform = node.style.webkitTransform = text;
    } else if (arguments.length == 2) {
      //读取
      val = node["transform"][type];
      if (typeof val === "undefined") {
        switch (type) {
          case "translateX":
          case "translateY":
          case "rotate":
            val = 0;
            break;
          case "scale":
            val = 1;
            break;
        }
      }
      return val;
    }
  }
  w.damu.carousel = function (arr) {
    const carouselWrap = document.querySelector('.carousel-wrap')
    if (carouselWrap) {
      const pointslength = arr.length
      //无缝
      let needCarousel = carouselWrap.getAttribute("needCarousel")
      needCarousel = needCarousel == null ? false : true
      if (needCarousel) {
        arr = arr.concat(arr)
      }

      const ulNode = document.createElement('ul')
      const styleNode = document.createElement('style')
      ulNode.className = 'list'
      for (let i = 0; i < arr.length; i++) {
        const img = arr[i];
        ulNode.innerHTML += '<li><a href="javascript:;"><img src="' + img + '" alt=""></a></li>'
      }
      styleNode.innerHTML = '.carousel-wrap > .list > li { width: ' + (1 / arr.length * 100) +
        '%; } .carousel-wrap > .list { width: ' + (arr.length) + '00% }'
      carouselWrap.appendChild(ulNode)
      document.head.appendChild(styleNode)

      const imgNode = document.querySelector('.carousel-wrap>.list>li>a>img')
      setTimeout(() => {
        carouselWrap.style.height = imgNode.offsetHeight + 'px'
      }, 100);

      // 小圆点
      let pointsWrap = document.querySelector(".carousel-wrap > .points-wrap"),
        pointsSpan
      if (pointsWrap) {
        for (let i = 0; i < pointslength; i++) {
          if (i === 0) {
            pointsWrap.innerHTML += '<span class="active"></span>'
          } else {
            pointsWrap.innerHTML += '<span></span>'
          }
        }
        pointsSpan = document.querySelectorAll(".carousel-wrap>.points-wrap > span")
      }

      /*滑屏
       * 1.拿到元素一开始的位置
       * 2.拿到手指一开始点击的位置
       * 3.拿到手指move的实时距离
       * 4.将手指移动的距离加给元素
       * */

      let index = 0
      //手指一开始的位置
      let startX = 0
      //元素一开始的位置
      let elementX = 0
      carouselWrap.addEventListener("touchstart", function (event) {
        const TouchC = event.changedTouches[0]

        ulNode.style.transition = "none"

        // 无缝
        /*点击第一组的第一张时 瞬间跳到第二组的第一张
        点击第二组的最后一张时 瞬间跳到第一组的最后一张*/
        //index代表ul的位置
        if (needCarousel) {
          let index = damu.css(ulNode, "translateX") / document.documentElement.clientWidth
          if (-index === 0) {
            index = -pointslength
          } else if (-index === (arr.length - 1)) {
            index = -(pointslength - 1)
          }
          damu.css(ulNode, "translateX", index * document.documentElement.clientWidth)
        }

        startX = TouchC.clientX
        elementX = damu.css(ulNode, 'translateX')

        //清楚定时器
        clearInterval(timer)
      })
      carouselWrap.addEventListener("touchmove", function (event) {
        const TouchC = event.changedTouches[0]
        const nowX = TouchC.clientX
        const disX = nowX - startX
        damu.css(ulNode, 'translateX', elementX + disX)
      })
      carouselWrap.addEventListener("touchend", function () {
        //index抽象了ul的实时位置
        index = damu.css(ulNode, 'translateX') / document.documentElement.clientWidth
        index = Math.round(index);

        //超出控制
        if (index > 0) {
          index = 0;
        } else if (index < 1 - arr.length) {
          index = 1 - arr.length
        }

        // 控制小圆点
        for (let i = 0; i < pointsSpan.length; i++) {
          pointsSpan[i].classList.remove("active")
        }
        pointsSpan[-index % pointslength].classList.add("active")

        ulNode.style.transition = ".5s transform"
        damu.css(ulNode, 'translateX', index * (document.documentElement.clientWidth))

        //开启自动轮播
        if (needAuto) {
          auto()
        }
      })

      // 自动轮播
      let timer = 0
      let needAuto = carouselWrap.getAttribute("needAuto")
      needAuto = needAuto == null ? false : true
      if (needAuto) {
        auto()
      }

      function auto() {
        clearInterval(timer)
        timer = setInterval(function () {
          if (index === 1 - arr.length) {
            ulNode.style.transition = "none"
            index = 1 - arr.length / 2
            damu.css(ulNode, "translateX", index * document.documentElement.clientWidth)
          }
          setTimeout(function () {
            index--
            ulNode.style.transition = "1s transform"
            xiaoyuandian(index)
            damu.css(ulNode, "translateX", index * document.documentElement.clientWidth)
          }, 50)
        }, 2000)
      }

      function xiaoyuandian(index) {
        if (!pointsWrap) return
        for (let i = 0; i < pointsSpan.length; i++) {
          pointsSpan[i].classList.remove("active")
        }
        pointsSpan[-index % pointslength].classList.add("active")
      }
    }
  }
})(window)