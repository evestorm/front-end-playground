<template>
	<view>
		
		<text class="title">自定义组件里面使用 uniImage 时，若 src 使用相对路径可能出现路径查找失败的情况，故建议使用绝对路径。</text>
		<sw-image></sw-image>
		
		<view>绝对路径：</view>
		<image src="/static/logo.png" mode=""></image>
		<view>相对路径：</view>
		<image src="../../static/logo.png" mode=""></image>
	</view>
</template>

<script>
	import swImage from '../../components/swImage.vue'
	export default {
		data() {
			return {
				
			};
		},
		components: {
			swImage
		}
	}
</script>

<style lang="less">
.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
