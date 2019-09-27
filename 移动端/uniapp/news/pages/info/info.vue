<template>
	<scroll-view class="cnt" scroll-y>
	  <view class="news-title">{{title}}</view>
	  <view class="news-info">
	    <view class="news-source">{{source}}</view>
	    <view class="news-time">{{date}}</view>
	    <view class="news-read">阅读 {{readCount}}</view>
	  </view>
	  <view class="news-content">
	    <view v-for="(item, id) in content" :key="id">
	      <view :class="item.type" v-if="item.type === 'p' || item.type === 'strong'">{{item.text}}</view>
	      <image class="img" v-else-if="item.type === 'image'" :src="item.src" mode="aspectFit"></image>
	    </view>
	  </view>
	</scroll-view>
</template>

<script>
	import _ from '../../utils/index.js'
	export default {
		data() {
			return {
				title: '',
				source: '',
				date: '',
				readCount: 0,
				content: []
			};
		},
		onLoad(payload) {
			let id = payload.newsId
			
			if (id) {
			  this.getDetail(id)
			}
		},
		methods: {
			getDetail(id) {
				uni.request({
					url: 'https://test-miniprogram.com/api/news/detail',
					method: 'GET',
					data: { id },
					success: res => {
						let data = res.data
						if (data && data.code === 200) {
							let { title, source, date, readCount, content } = data.result
							this.title = title
							this.source = source
							this.date = _.formatTime(date, 'HH:mm')
							this.readCount = readCount
							this.content = content
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
.cnt {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  
  .news-title {
    margin: 46rpx 27rpx 0;
    line-height: 56rpx;
    opacity: 0.9;
    font-size: 46rpx;
    color: #303133;
  }
  
  .news-info {
    display: flex;
    margin: 25rpx 27rpx 0;
    font-size: 26rpx;
    line-height: 37rpx;
    color: rgba(29, 29, 38, 0.5);
	
	.news-time {
	  flex: 1;
	  margin-left: 30rpx;
	}
  }
  
  .news-content {
    margin: 73rpx 27rpx 100rpx;
    font-size: 28rpx;
    color: rgba(29, 29, 38, 0.8);
    line-height: 45rpx;
    box-sizing: content-box;
    
    .p {
      margin-bottom: 36rpx;
    }
    
    .strong {
      margin-bottom: 36rpx;
      font-weight: bold;
    }
    
    .img {
      width: 100%;
      margin-bottom: 36rpx;
    }
  }
}

</style>
