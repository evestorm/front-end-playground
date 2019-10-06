<template>
	<view class="page">
		<!-- 搜索栏 -->
		<view class="search-block">
			<view class="search-ico-wrapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input
				placeholder="搜索预告" focus maxlength="10" confirm-type="search"
				class="search-text" @confirm="searchMovie"/>
		</view>
		<!-- 搜索结果列表 -->
		<view class="movie-list page-block">
			<view class="movie-wrapper"
				v-for="item in trailerList" :key="item.id">
				<image :src="item.cover" class="poster"
					:data-trailer-id="item.id"
					@tap="showTrailer"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/index.js'
	export default {
		data() {
			return {
				trailerList: [], // 预告片搜索
				keywords: '', // 搜索关键字
				page: 1, // 当前第几页
				pageSize: 15, // 每页多少条
				totalPages: 1, // 总页数
			};
		},
		onLoad() {
			const self = this
			
			self.requestData()
		},
		methods: {
			// 请求数据
			requestData() {
				const self = this
				
				uni.showLoading({
					title: '正在搜索...',
					mask: true // 添加遮罩，在loading期间防止用户点击其他组件
				});
				uni.showNavigationBarLoading()
				
				uni.request({
					url: `${common.serverURL}/search/list?&qq=843002185&page=${self.page}&pageSize=${self.pageSize}&keywords=${self.keywords}`,
					method: 'POST',
					success: res => {
						const { status, data } = res.data
						console.log(data)
						if (res.data.status === 200) {
							self.trailerList = self.trailerList.concat(data.rows)
							self.totalPages = data.total // 总页数
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideNavigationBarLoading()
						uni.hideLoading()
					}
				});
			},
			// 点击搜索查询电影
			searchMovie(e) {
				const self = this
				const value = e.detail.value
				self.keywords = value
				self.trailerList = []
				self.page = 1
				
				self.requestData()
			},
			// 去详情页
			showTrailer(e) {
				const trailerId = e.currentTarget.dataset.trailerId
				console.log(trailerId)
				uni.navigateTo({ // 跳转后左上角有返回按钮
					url: '../movie/movie?trailerId=' + trailerId
				});
				// uni.redirectTo({ // 跳转后不可返回
				// 	url: '',
				// });
				// uni.switchTab({ // 切换底部tab
				// 	url: '../me/me'
				// })
			}
		},
		// 滚动条触底触发
		onReachBottom() {
			const self = this
			self.page += 1
			
			// 如果当前需要分页的分页数大于总分页，则不操作
			if (self.page > self.totalPages) {
				return;
			}
			self.requestData()
		}
	}
</script>

<style lang="less" scoped>
	@import url("search.less");
</style>