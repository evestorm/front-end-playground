+(function(w){
	w.damu = {};
	w.damu.css=function (node,type,val){
			if(typeof node ==="object" && typeof node["transform"] ==="undefined" ){
				node["transform"]={};
			}
			
			if(arguments.length>=3){
				//设置
				var text ="";
				node["transform"][type] = val;
				
				for( item in node["transform"]){
					if(node["transform"].hasOwnProperty(item)){
						switch (item){
							case "translateX":
							case "translateY":
								text +=  item+"("+node["transform"][item]+"px)";
								break;
							case "scale":
								text +=  item+"("+node["transform"][item]+")";
								break;
							case "rotate":
								text +=  item+"("+node["transform"][item]+"deg)";
								break;
						}
					}
				}
				node.style.transform = node.style.webkitTransform = text;
			}else if(arguments.length==2){
				//读取
				val =node["transform"][type];
				if(typeof val === "undefined"){
					switch (type){
						case "translateX":
						case "translateY":
						case "rotate":
							val =0;
							break;
						case "scale":
							val =1;
							break;
					}
				}
				return val;
			}
		}
	w.damu.carousel=function (arr){
				//布局
				var carouselWrap = document.querySelector(".carousel-wrap");
				if(carouselWrap){
					var pointslength = arr.length;
					
					//无缝
					var needCarousel = carouselWrap.getAttribute("needCarousel");
					needCarousel = needCarousel == null?false:true;
					if(needCarousel){
						arr=arr.concat(arr);
					}
					
					
					var ulNode = document.createElement("ul");
					var styleNode = document.createElement("style");
					ulNode.classList.add("list");
					for(var i=0;i<arr.length;i++){
						ulNode.innerHTML+='<li><a href="javascript:;"><img src="'+arr[i]+'"/></a></li>';
					}
					styleNode.innerHTML=".carousel-wrap > .list > li{width: "+(1/arr.length*100)+"%;}.carousel-wrap > .list{width: "+arr.length+"00%}";
					carouselWrap.appendChild(ulNode);
					document.head.appendChild(styleNode);
					
					var imgNodes = document.querySelector(".carousel-wrap > .list > li > a >img");
					setTimeout(function(){
						carouselWrap.style.height=imgNodes.offsetHeight+"px";
					},100)
					
					var pointsWrap = document.querySelector(".carousel-wrap > .points-wrap");
					if(pointsWrap){
						for(var i=0;i<pointslength;i++){
							if(i==0){
								pointsWrap.innerHTML+='<span class="active"></span>';
							}else{
								pointsWrap.innerHTML+='<span></span>';
							}
						}
						var pointsSpan = document.querySelectorAll(".carousel-wrap > .points-wrap > span");
					}
					
					
					
					/*滑屏
					 * 	1.拿到元素一开始的位置
					 * 	2.拿到手指一开始点击的位置
					 * 	3.拿到手指move的实时距离
					 * 	4.将手指移动的距离加给元素
					 * */
					var index =0;
					//手指一开始的位置
					var startX = 0;
					//元素一开始的位置
					var elementX = 0;
					//var translateX =0;
					carouselWrap.addEventListener("touchstart",function(ev){
						ev=ev||event;
						var TouchC = ev.changedTouches[0];
						ulNode.style.transition="none";
						
						//无缝
						/*点击第一组的第一张时 瞬间跳到第二组的第一张
						点击第二组的最后一张时  瞬间跳到第一组的最后一张*/
						//index代表ul的位置
						if(needCarousel){
							var index = damu.css(ulNode,"translateX")/document.documentElement.clientWidth;
							if(-index === 0){
								index = -pointslength;
							}else if(-index ==(arr.length-1)){
								index = -(pointslength-1)
							}
							damu.css(ulNode,"translateX",index*document.documentElement.clientWidth)
						}
						
						
						
						startX=TouchC.clientX;
						//elementX=ulNode.offsetLeft;
						//elementX=translateX;
						elementX=damu.css(ulNode,"translateX");
						
						//清楚定时器
						clearInterval(timer);
					})
					carouselWrap.addEventListener("touchmove",function(ev){
						ev=ev||event;
						var TouchC = ev.changedTouches[0];
						var nowX = TouchC.clientX;
					    var disX = nowX - startX;
					    
						//ulNode.style.left = elementX+disX+"px";
						
						/*translateX = elementX+disX;
						ulNode.style.transform = 'translateX('+translateX+'px)';*/
						damu.css(ulNode,"translateX",elementX+disX);
					})
					carouselWrap.addEventListener("touchend",function(ev){
						ev=ev||event;
						//index抽象了ul的实时位置
						//var index = ulNode.offsetLeft/document.documentElement.clientWidth;
						//var index = translateX/document.documentElement.clientWidth;
					    index = damu.css(ulNode,"translateX")/document.documentElement.clientWidth;
						index = Math.round(index);
						
						//超出控制
						if(index>0){
							index=0;
						}else if(index<1-arr.length){
							index=1-arr.length;
						}
						
						xiaoyuandian(index);
						
						ulNode.style.transition=".5s transform";
						//ulNode.style.left = index*(document.documentElement.clientWidth)+"px";
						/*translateX=index*(document.documentElement.clientWidth);
						ulNode.style.transform ='translateX('+translateX+'px)';*/
						damu.css(ulNode,"translateX",index*(document.documentElement.clientWidth));
						
						//开启自动轮播
						if(needAuto){
							auto();
						}
					})
				
					//自动轮播
					var timer =0;
					var needAuto = carouselWrap.getAttribute("needAuto");
					needAuto = needAuto == null?false:true;
					if(needAuto){
						auto();
					}
					function auto(){
						clearInterval(timer);
						timer=setInterval(function(){
							if(index == 1-arr.length){
								ulNode.style.transition="none";
								index = 1-arr.length/2;
								damu.css(ulNode,"translateX",index*document.documentElement.clientWidth);
							}
							setTimeout(function(){
								index--;
								ulNode.style.transition="1s transform";
								xiaoyuandian(index);
								damu.css(ulNode,"translateX",index*document.documentElement.clientWidth);
							},50)
						},2000)
					}
					
					function xiaoyuandian(index){
						if(!pointsWrap){
							return;
						}
						for(var i=0;i<pointsSpan.length;i++){
							pointsSpan[i].classList.remove("active");
						}
						pointsSpan[-index%pointslength].classList.add("active");
					}
				}
			}
})(window)
