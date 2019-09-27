<template>
	<view class="news-item">
		<view class="news-meta">
		  <view class="news-title">{{news.title}}</view>
		  <view class="news-info">
			<view class="news-source">{{news.source}}</view>
			<view class="news-time">{{news.date}}</view>
		  </view>
		</view>
		<image class="news-image" :src="news.firstImage" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		props: {
			news: Object
		}
	}
</script>

<style lang="less">
.news-item {
	display: flex;
	margin: 0 26rpx;
	padding: 30rpx 0;
	border-bottom: 1px solid rgba(151, 151, 151, 0.15);
	.news-meta {
	  flex: 1;
	}
	.news-title {
	  line-height: 42rpx;
	  opacity: 0.9;
	  font-size: 32rpx;
	  color: #303133;
	}
	.news-info {
	  display: flex;
	  margin-top: 10rpx;
	  line-height: 33rpx;
	  font-size: 24rpx;
	  color: rgba(29, 29, 38, 0.5);
	}
	.news-time {
	  margin-left: 30rpx;
	}
	
	.news-image {
	  flex-shrink: 0;
	  margin-left: 30rpx;
	  width: 188rpx;
	  height: 126rpx;
	  border-radius: 6rpx;
	}
}
</style>
