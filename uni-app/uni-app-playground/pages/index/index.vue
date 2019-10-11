<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<uni-list style="width: 100%;">
			<uni-list-item title="uniIcon H5不显示" @tap="gotoUniIcon"></uni-list-item>
			<uni-list-item title="uniImage 推荐书写绝对路径" @tap="gotoImageSource"></uni-list-item>
			<uni-list-item title="v-show 小程序端不显示" @tap="gotoVShow"></uni-list-item>
			<uni-list-item title="自定义弹窗 modal" @tap="gotoModal"></uni-list-item>
			<uni-list-item title="class 和 style 注意事项" @tap="gotoClassAndStyle"></uni-list-item>
			<!-- <uni-list-item title="" note=""></uni-list-item> -->
		</uni-list>
	</view>
</template>

<script>
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				title: 'uni-app playground'
			}
		},
		components: {
			uniList,
			uniListItem
		},
		onLoad() {

		},
		methods: {
			gotoUniIcon() {
				uni.navigateTo({
					url: '/pages/uniIcon/uniIcon',
				});
			},
			gotoImageSource() {
				uni.navigateTo({
					url: '/pages/imageSource/imageSource',
				});
			},
			gotoVShow() {
				uni.navigateTo({
					url: '/pages/v-show/v-show',
				});
			},
			gotoModal() {
				uni.navigateTo({
					url: '/pages/modal/modal',
				});
			},
			gotoClassAndStyle() {
				uni.navigateTo({
					url: '/pages/classAndStyle/classAndStyle',
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
