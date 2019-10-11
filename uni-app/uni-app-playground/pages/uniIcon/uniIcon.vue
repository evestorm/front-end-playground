<template>
	<view class="content">
		<text class="title">{{title}}</text>
		<view class="wrapper">
			<view class="item">
				<text>uni-icon：</text>
				<uni-icon type="plusempty" size="20"></uni-icon>
			</view>
			<view class="item">
				<text>sw-icon：</text>
				<sw-icon type="plusempty" size="20"></sw-icon>
			</view>
			<view class="item">
				<text>uni-icons：</text>
				<uni-icons type="plusempty" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '../../components/uni-icon/uni-icon.vue'
	import swIcon from '../../components/uni-icon/uni-icon.vue'
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				title: 'uni-icon'
			}
		},
		components: {
			uniIcon,
			swIcon,
			uniIcons,
		},
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}
		.wrapper {
			width: 100%;
			display: flex;
			.item {
				border: 1px solid red;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	
	
</style>
