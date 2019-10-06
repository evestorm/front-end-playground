<template>
	<view class="black">
		<image :src="cover" mode="widthFix" class="cover" @longpress="longPress"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover: '',
			}
		},
		onLoad(params) {
			var self = this
			var cover = params.cover
			self.cover = cover
		},
		methods: {
			// 长按保存图片
			longPress() {
				const self = this
				uni.showActionSheet({
					itemList: ['保存图片'],
					success: (res) => {
						console.log('图片:' + self.cover)
						
						const tapIndex = res.tapIndex
						if (tapIndex == 0) {
							//下载图片
							console.log('进入保存图片')
							uni.showLoading({
								title: '图片保存中...'
							});
							uni.downloadFile({
								url: self.cover,
								success: (result) => {
									const tempFilePath = result.tempFilePath
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: () => {
											uni.showToast({
												title: '保存成功',
												duration: 2000
											});
										},
										complete() {
											uni.hideLoading()
										}
									});
								},
								fail: () => {
									uni.hideLoading()
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url('cover.less')
</style>