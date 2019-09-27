<template>
	<view class="content">
		<!-- 横向滚动导航栏 -->
		<scroll-view scroll-x="true" class="tabs">
			<view class="tab-item"
				v-for="(item, index) in newsCategory" :key="index"
				:class="{active: curTypeIdx === index}"
				@click="changeType(index)">
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 滚动新闻banner -->
		<view class="swiper-wrapper">
			<swiper class="swiper"
				:indicator-dots="true"
				:autoplay="true"
				:interval="3000"
				:duration="1000">
				<swiper-item
					v-for="(item, index) in swiperList" :key="index"
					@tap="onTapItem" :data-news-id="item.id">
					<view class="swiper-item hot-item">
						<image
							class="hot-bg"
							:src="item.firstImage"
							mode="aspectFill" />
						<image class="hot-image"
							:src="item.firstImage"
							mode="aspectFill">
						  <view class="hot-tips">热门</view>
						</image>
						<view class="hot-content">
						  <view class="hot-title">{{item.title}}</view>
						  <view class="hot-info">
							<view class="hot-source">{{item.source}}</view>
							<view class="hot-time">{{item.date}}</view>
						  </view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 新闻列表 -->
		<view class="news-list">
			<view
				v-for="(item, index) in newsList"
				:key="index"
				@tap="onTapItem" :data-news-id="item.id">
				<news-item :news="item"></news-item>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from '../../utils/index.js'
	import newsItem from '../../components/news-item.vue'
	const newsCategory = [
	  { id: 'gn', name: '国内' },
	  { id: 'gj', name: '国际' },
	  { id: 'cj', name: '财经' },
	  { id: 'yl', name: '娱乐' },
	  { id: 'js', name: '纪实' },
	  { id: 'ty', name: '台湾' },
	  { id: 'other', name: '综合' },
	  { id: 'gn', name: '国内' },
	  { id: 'gj', name: '国际' },
	  { id: 'cj', name: '财经' },
	  { id: 'yl', name: '娱乐' },
	  { id: 'js', name: '纪实' },
	  { id: 'ty', name: '台湾' },
	  { id: 'other', name: '综合' }
	]
	export default {
		data() {
			return {
				title: '新闻快讯',
				newsList: [], // 当前新闻列表
				swiperList: [], // 当前banner列表
				curTypeIdx: 0, // 默认国内新闻
				newsCategory,
			}
		},
		components: {
			newsItem,
		},
		onLoad() {
			this.requestData()
		},
		onPullDownRefresh() {
			this.requestData(_ => {
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			requestData(cb) {
				uni.request({
					url: 'https://test-miniprogram.com/api/news/list',
					method: 'GET',
					data: { type: newsCategory[this.curTypeIdx].id },
					success: res => {
						console.log(res)
						const { result } = res.data
						let newsList = result.map(item => {
							item.date = _.formatTime(item.date, 'HH:mm')
							return item
						})
						this.swiperList = newsList.slice(0, 3)
						this.newsList = newsList
					},
					fail: () => {},
					complete: () => {
						cb && cb()
					}
				});
			},
			onTapItem(e) {
				const newsId = e.currentTarget.dataset.newsId
				console.log(newsId)
				uni.navigateTo({
					url: '../info/info?newsId=' + newsId
				});
			},
			changeType(curTypeIdx) {
				if (curTypeIdx === this.curTypeIdx) return
				this.curTypeIdx = curTypeIdx
				this.requestData()
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tabs {
		width: 100%;
		height: 60rpx;
		white-space: nowrap;
		background-color: #3b9fe2;
		font-size: 30rpx;
		color: white;
		.tab-item {
			display: inline-block;
			padding: 0 20rpx 5rpx 20rpx;
			position: relative;
			&.active {
				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: -4rpx;
					transform: translateX(-50%);
					width: 20rpx;
					height: 5rpx;
					background-color: white;
				}
			}
		}
	}
	
	.swiper-wrapper {
	  box-sizing: border-box;
	  width: 100%;
	  .swiper {
		  width: 100%;
		  height: 406rpx;

		  .hot-item {
		    position: relative;
		    height: 406rpx;
		  }
		  
		  .hot-bg {
		    position: absolute;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 100%;
		    opacity: 0.1;
		    z-index: -2;
		  }
		  
		  .hot-image {
		    position: absolute;
		    top: 29rpx;
		    bottom: 29rpx;
		    left: 27rpx;
		    right: 27rpx;
		    width: auto;
		    height: auto;
		    border-radius: 6rpx;
		    opacity: 1;
		    z-index: -1;
		  }
		  
		  .hot-tips {
		    position: absolute;
		    top: 0;
		    right: 0;
		    padding: 5rpx 10rpx 5rpx 20rpx;
		    border-top-right-radius: 6rpx;
		    font-size: 24rpx;
		    line-height: 33rpx;
		    color: #FFFEFE;
		    background: rgba(219, 42, 31, 0.6);
		    border-bottom-left-radius: 25rpx;
		  }
		  
		  .hot-content {
		    position: absolute;
		    left: 27rpx;
		    right: 27rpx;
		    bottom: 29rpx;
		    padding: 80rpx 23rpx 13rpx;
		    box-sizing: border-box;
		    border-radius: 0 0 6rpx 6rpx;
		    background-image: linear-gradient(-180deg, rgba(8, 8, 8, 0) 0%, rgba(0, 0, 0, 0.7) 98%);
		  }
		  
		  .hot-title {
		    margin-bottom: 10rpx;
		    font-size: 30rpx;
		    color: rgba(255, 255, 255, 0.9);
		    line-height: 42rpx;
		  }
		  
		  .hot-info {
		    display: flex;
		    font-size: 24rpx;
		    color: rgba(255, 255, 255, 0.5);
		    line-height: 33rpx;
		  }
		  
		  .hot-time {
		    margin-left: 30rpx;
		  }
	  }
	}
	
	.news-list {
		
	}
</style>
