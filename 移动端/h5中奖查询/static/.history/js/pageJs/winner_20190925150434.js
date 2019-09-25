$(function () {
	var vm = new Vue({
		el: '#winner',
		data: {
			mescroll: null, // 下拉加载

			winnerList: [],
			memberId: '',
			pageNum: 1,
			pageSize: 50,
		},
		mounted: function () {
			//创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
			//解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
			var self = this;
			self.mescroll = new MeScroll("mescroll", {
				up: {
					callback: self.upCallback, //上拉回调
					isBounce: false, //此处禁止ios回弹
					htmlNodata: '<p class="upwarp-nodata">没有更多啦~</p>',
					page: {
						size: self.pageSize
					}, //可配置每页8条数据,默认10
					toTop: { //配置回到顶部按钮
						src: "../../img/mescroll-totop.png",
					},
					empty: { //配置列表无任何数据的提示
						warpId: "inner",
						icon: "../../img/mescroll-empty.png",
						tip: "亲,暂无相关数据哦~",
					},
					lazyLoad: {
						use: true // 是否开启懒加载,默认false
					}
				}
			});

		},
		methods: {
			//上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
			upCallback: function (page) {
				//联网加载数据
				var self = this;
				self.getListDataFromNet(page.num, page.size, function (curPageData, totalPage) {
					// curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

					//如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
					if (page.num == 1) self.winnerList = [];

					//更新列表数据
					self.winnerList = self.winnerList.concat(curPageData);

					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
					console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length + ", self.winnerList.length==" + self.winnerList.length);

					// 后台接口有返回列表的总页数 totalPage
					self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

					//提示:curPageData.length必传的原因:
					// 1.判断是否有下一页的首要依据: 当传的值小于page.size时,则一定会认为无更多数据.
					// 2.比传入的totalPage, totalSize, hasNext具有更高的判断优先级
					// 3.使配置的noMoreSize生效

				}, function () {
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
					self.mescroll.endErr();
				});
			},
			queryWinners() {
				this.mescroll.resetUpScroll(true)
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				console.log(this.memberId, pageNum, pageSize)
				var url = ''
				switch (pageNum) {
					case 1:
						url = 'js\pageJs\\fake.json'
						break;
					case 2:
						url = 'js\pageJs\\fake2.json'
						break;
					case 3:
						url = 'js\pageJs\\fake3.json'
						break;
					case 4:
						url = 'js\pageJs\\fake4.json'
						break;
					default:
						break;
				}
				$.ajax({
					// url: 'http://192.168.2.101:9100/nd/blessing/findPage',
					url: url,
					type: 'GET',
					data: {
						// pageNum: pageNum,
						// pageSize: pageSize,
						memberId: this.memberId
					},
					dataType: "json",
					contentType: 'application/json;charset=utf-8',
					success: function (data) {
						if (data.code === 200) {
							// 回调传入当前列表 + 总页数
							successCallback && successCallback(data.data.dataList, data.data.pageCount)
						} else {
							errorCallback && errorCallback()
						}
					},
					error: function (e) {
						errorCallback && errorCallback()
					}
				});
			}
		},
	});
});