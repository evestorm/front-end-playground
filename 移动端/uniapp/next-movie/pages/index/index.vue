<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
			<swiper-item v-for="item in carouselList" :key="item.movieId">
				<image :src="item.image" class="swiper-item-image"></image>
			</swiper-item>
		</swiper>
		<!-- 热门超英 -->
		<view class="super-hot page-block">
			<view class="hot-title-wrapper">
				<image class="hot-ico" src="../../static/icos/hot.png" mode=""></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="item in hotSuperheroList" :key="item.id">
				<view class="poster-wrapper">
					<image :src="item.cover" mode="" class="poster"></image>
					<view class="movie-name">
						{{item.name}}
					</view>
					<trailer-stars :innerScore="item.score" :showNum="1"></trailer-stars>
				</view>
			</view>
		</scroll-view>
		<!-- 热门预告 -->
		<view class="super-hot page-block">
			<view class="hot-title-wrapper">
				<image class="hot-ico" src="../../static/icos/interest.png" mode=""></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		<view class="hot-movies page-block">
			<video
				:id="item.id"
				:data-playingIndex='item.id'
				@play="meIsPlaying"
				v-for="item in hotTrailerList" :key="item.id"
				:src="item.trailer"
				:poster="item.poster"
				class="hot-movie-single"
				controls></video>
		</view>
		<!-- 猜你喜欢 -->
		<view class="super-hot page-block">
			<view class="hot-title-wrapper">
				<image class="hot-ico" src="../../static/icos/guess-u-like.png" mode=""></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		<view class="guess-u-like page-block">
			<view class="single-like-movie"
				v-for="(item, gIndex) in guessULikeList" :key="item.id">
				<image :src="item.cover" mode="" class="movie-poster"></image>
				<view class="movie-desc">
					<view class="movie-title">{{item.name}}</view>
					<trailer-stars :innerScore="item.score" :showNum="0"></trailer-stars>
					<view class="movie-info">{{item.basicInfo}}</view>
					<view class="movie-info">{{item.releaseDate}}</view>
				</view>
				<view class="movie-oper" @click="praiseMe" :data-gIndex="gIndex">
					<image src="../../static/icos/praise.png" mode="" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationDataList[gIndex]" class="praise-me animation-opacity">+1</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/index.js'
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				carouselList: [], // banner
				hotSuperheroList: [], // 热门
				hotTrailerList: [], // 预告
				guessULikeList: [], // 猜你喜欢
				animationData: {}, // 点赞动画
				animationDataList: [], // 动画数组，存放单独的animationData对象
			}
		},
		onLoad() {
			// 在页面创建的时候，创建一个临时动画对象
			this.animation = uni.createAnimation()
			this.requestBannerList()
			this.requestHotList()
			this.requestTrailerList()
			this.refresh()
		},
		onUnload() {
			// 页面卸载时清除动画数据
			this.animationData = {}
			this.animationDataArr = []
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onHide() {
			if (this.videoContext) {
				this.videoContext.pause()
				console.log("离开页面 停止播放")
			}	
		},
		methods: {
			// 播放一个视频的时候，需要暂停其他正在播放的视频
			meIsPlaying(e) {
				const self = this
				let trailerId = ''
				if (e) {
					trailerId = e.currentTarget.dataset.playingindex
					self.videoContext = uni.createVideoContext(trailerId)
				}
				const hotTrailerList = self.hotTrailerList
				for (let i = 0; i < hotTrailerList.length; i++) {
					var tmpID = hotTrailerList[i].id
					if (tmpID != trailerId) {
						uni.createVideoContext(tmpID).pause()
					}
				}
			},
			// banner图
			requestBannerList() {
				const self = this
				uni.request({
					url: common.serverURL + '/index/carousel/list?&qq=843002185',
					method: 'POST',
					success: res => {
						// debugger
						if (res.data.status === 200) {
							self.carouselList = res.data.data
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 热门scroll-view
			requestHotList() {
				const self = this
				uni.request({
					url: common.serverURL + '/index/movie/hot?type=superhero&qq=843002185',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.status === 200) {
							self.hotSuperheroList = res.data.data
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 预告片
			requestTrailerList() {
				const self = this
				uni.request({
					url: common.serverURL + '/index/movie/hot?type=trailer&qq=843002185',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.status === 200) {
							self.hotTrailerList = res.data.data
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 电影列表
			requestGuessULikeList(cb) {
				const self = this
				uni.request({
					url: common.serverURL + '/index/guessULike?qq=843002185',
					method: 'POST',
					data: {},
					success: res => {
						const { status, data } = res.data
						if (status === 200) {
							this.guessULikeList = data
							this.animationDataList = Array.from({length: data.length})
						}
					},
					fail: () => {},
					complete: () => {
						typeof cb === 'function' && cb()
					}
				});
			},
			// 下拉刷新
			refresh() {
				const self = this
				
				uni.showLoading({
					title: '正在刷新',
					mask: true // 添加遮罩，在loading期间防止用户点击其他组件
				});
				// navigationbar 导航栏显示加载（如果在pages.json中设置了禁用原生导航栏，h5端就不会显示这个菊花loading，因为导航栏已经被干掉了）
				uni.showNavigationBarLoading()
				self.requestGuessULikeList(() => {
					uni.hideLoading()
					uni.hideNavigationBarLoading()
					uni.stopPullDownRefresh()
				})
			},
			// 实现点赞动画效果
			praiseMe(e) {
				const self = this
				const gIndex = e.currentTarget.dataset.gindex
				console.log(gIndex)
				// 构建动画数据，并且通过 step 来表示这组动画的完成
				self.animation.translateY(-60).opacity(1).step({
					duration: 400
				})
				// 导出动画数据到view组件，实现组件的动画效果
				// self.animationData = self.animation.export()
				self.animationData = self.animation.export()
				// h5端直接索引会导致动画不执行，需要采用 Vue.$set 方式给数组下标位置赋值
				// self.animationDataList[gIndex] = self.animationData
				self.$set(self.animationDataList, gIndex, self.animationData)
				console.log(self.animationDataList, self.animationData)
				// 还原动画
				setTimeout(function() {
					self.animation.translateY(0).opacity(0).step({
						duration: 0
					})
					self.animationData = self.animation.export()
					self.$set(self.animationDataList, gIndex, self.animationData)
				}.bind(self), 500);
			}
		},
		components: {
			trailerStars,
		}
	}
</script>

<style lang="less" scoped>
	@import url("index.less");
</style>
