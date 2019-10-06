<template>
	<view class="page">
		<!-- 视频播放 -->
		<view class="player">
			<video id="myTrailer"
			 :src="trailerInfo.trailer" 
			 :poster="trailerInfo.poster" 
			 class="movie" controls></video>
		</view>
		<!-- 影评基本信息 -->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover='+trailerInfo.cover">
				<image :src="trailerInfo.cover" mode="aspectFit" class="cover"></image>
			</navigator>
			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					<view class="score-stars">
						<!-- 解决 获取不到trailerInfo.score undefined问题 只有有分数时才进入 -->
						<block v-if="trailerInfo.score > 0">
							<trailer-stars :innerScore="trailerInfo.score" showNum="0"></trailer-stars>
						</block>
						<view class="prise-counts">{{trailerInfo.prisedCounts}} 人点赞</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 分割线 -->
		<view class="line-wrapper">
			<view class="line"></view>
		</view>
		<!-- 剧情介绍 -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<!-- 演职人员 -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<!-- 导演 -->
				<view class="actor-wrapper"
					v-for="(director, staffIndex) in directorArray" :key="director.staffId">
					<image :src="director.photo" mode="aspectFit" class="single-actor" :data-staffIndex="staffIndex" @tap="lookStaffs"></image>
					<view class="actor-name">{{director.name}}</view>
					<view class="actor-role">{{director.actName}}</view>
				</view>
				<!-- 演员 -->
				<view class="actor-wrapper"
					v-for="(actor, actorIndex) in actorArray" :key="actor.staffId">
					<image :src="actor.photo" mode="aspectFit" class="single-actor" :data-staffIndex="actorIndex + directorArray.length"
					 @tap="lookStaffs"></image>
					<view class="actor-name">{{actor.name}}</view>
					<view class="actor-role">{{actor.actName}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 剧照 -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image v-for="(img, imgIndex) in plotPicsArray" :key="imgIndex" :src="img" mode="aspectFill" class="plot-image" @tap="lookMe"
				 :data-imageIndex="imgIndex"></image>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/index.js'
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				trailerId: '', // 接收的movieId
				trailerInfo: {},
				plotPicsArray: [], //剧照
				directorArray: [], //导演列表
				actorArray: [] ,//演员列表
			}
		},
		// 页面初次渲染完成，获得视频上下文对象
		onReady() {
			// 解决app端和小程序端播放视频后，再点击剧照放大时，后台还在播放视频
			this.videoContext = uni.createVideoContext('myTrailer')
		},
		onHide() {
			// 页面被隐藏的时候，暂停播放
			this.videoContext.pause()
		},
		onShow() {
			// 再次回到当前页面时再继续播放
			if (this.videoContext) {
				this.videoContext.play()
			}
		},
		onLoad(payload) {
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000000'
			})
			const self = this
			self.trailerId = payload.trailerId
			self.requestMovieInfo()
			self.requestDirectorInfo()
			self.requestActorInfo()
		},
		// 只支持小程序端分享，分享到微信群或微信好友
		onShareAppMessage(res) {
			const self = this
			return {
				title: self.trailerInfo.name,
				path: '/pages/movie/movie?trailerId=' + self.trailerInfo.id
			}
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			const self = this

			const index = e.index
			console.log("tap button:" + index)

			const trialerInfo = self.trailerInfo
			const {
				id: trailderID,
				name: trailerName,
				cover, poster,
				plotDesc: desc } = trialerInfo;

			uni.share({
				provider: "weixin",
				scene: "WXSenceTimeline", // 分享到朋友圈
				type: 0,
				href: "http://www.imovietrailer.com/#/pages/movie/movie?trailerId=" + trailderID,
				title: '超英预告：《' + trailerName + '》',
				summary: desc,
				imageUrl: cover,
				success: (res) => {
					console.log("分享成功" + res)
				}
			})
		},
		methods: {
			// 查看剧照的图片预览
			lookMe(e) {
				const self = this
				const imageindex = e.currentTarget.dataset.imageindex
				const plotPicsArray = self.plotPicsArray
				uni.previewImage({
					urls: plotPicsArray,
					current: plotPicsArray[imageindex]
				});
			},
			// 查看演职表的图片预览
			lookStaffs(e) {
				const self = this
				const staffIndex = e.currentTarget.dataset.staffindex
				//拼接导演和演员的数组 成为新数组
				const staffArray = self.directorArray.concat(self.actorArray)
				const urls = []
				for (let i = 0; i < staffArray.length; i++) {
					const tempPhoto = staffArray[i].photo
					urls.push(tempPhoto)
				}
				uni.previewImage({
					urls: urls,
					current: urls[staffIndex],
				});
			},
			// 获取电影信息
			requestMovieInfo() {
				const self = this
				
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				uni.showNavigationBarLoading()
				
				uni.request({
					url: common.serverURL + '/search/trailer/' + self.trailerId + '?&qq=843002185',
					method: 'POST',
					data: {},
					success: res => {
						if (res.data.status == 200) {
							const trailerInfo = res.data.data
							console.log(trailerInfo)
							self.trailerInfo = trailerInfo
							// 将剧照的字符串转换成array
							const plotPicsArray = JSON.parse(trailerInfo.plotPics)
							self.plotPicsArray = plotPicsArray
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideNavigationBarLoading()
						uni.hideLoading()
					}
				});
			},
			// 获取导演信息
			requestDirectorInfo() {
				const self = this
				uni.request({
					url: common.serverURL + '/search/staff/' + self.trailerId + '/1' + '?qq=843002185',
					method: 'POST',
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.status == 200) {
							self.directorArray  = res.data.data
						}
					}
				});
			},
			requestActorInfo() {
				const self = this
				uni.request({
					url: common.serverURL + '/search/staff/' + self.trailerId + '/2' + '?qq=843002185',
					method: 'POST',
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.status == 200) {
							self.actorArray = res.data.data
						}
					}
				});
			}
		},
		components: {
			trailerStars,
		}
	}
</script>

<style lang="less" scoped>
	@import url('movie.less');
</style>
