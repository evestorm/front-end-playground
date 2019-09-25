window.onload = function () {
	var mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id (1.3.5版本支持传入dom对象)
		//如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
		//解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
		down: {
			callback: downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
		},
		up: {
			callback: upCallback, //上拉加载的回调
			//以下是一些常用的配置,当然不写也可以的.
			page: {
				num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
				size: 10 //每页数据条数,默认10
			},
			htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
			noMoreSize: 5,
			/* 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
							避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
							这就是为什么无更多数据有时候不显示的原因. */
			toTop: {
				//回到顶部按钮
				src: "../img/mescroll-totop.png", //图片路径,默认null,支持网络图
				offset: 1000 //列表滚动1000px才显示回到顶部按钮	
			},
			empty: {
				//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
				warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
				icon: "../img/mescroll-empty.png", //图标,默认null,支持网络图
				tip: "暂无相关数据~" //提示
			},
			lazyLoad: {
				use: true // 是否开启懒加载,默认false
				attr: 'imgurl' // 标签中网络图的属性名 : <img imgurl='网络图  src='占位图''/>
			}
		}
	});
}