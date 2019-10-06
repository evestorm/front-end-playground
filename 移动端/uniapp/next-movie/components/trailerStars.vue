<template name="trailerStars">
	<view class="movie-score-wrapper">
		<image
			v-for="yellow in yellowScore"
			src="/static/icos/star-yellow.png"
			mode=""
			class="star-ico"></image>
		<image
			v-for="gray in grayScore"
			src="/static/icos/star-gray.png"
			mode=""
			class="star-ico"></image>
		<view class="movie-score" v-if="showNum === 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'trailerStars',
		data() {
			return {
				yellowScore: 0,
				grayScore: 5
			};
		},
		props: {
			innerScore: 0, // 外部传入的分数
			showNum: 0 // 是否需要显示具体的分数 1. 显示 0. 不显示
		},
		created() {
			let tempScore = 0
			if (this.innerScore !== null && this.innerScore !== undefined && this.innerScore !== '') {
				 tempScore = this.innerScore
			}
			let yellowScore = parseInt(tempScore / 2)
			let grayScore = 5 - yellowScore
			
			this.yellowScore = yellowScore
			this.grayScore = grayScore
		}
	}
</script>

<style lang="less" scoped>
.movie-score-wrapper {
	display: flex;
	flex-direction: row;
	.star-ico {
		width: 20rpx;
		height: 20rpx;
		margin-top: 6rpx;
	}
	.star-score {
		font-size: 12px;
		color: dimgrey;
		margin-left: 8rpx;
	}
}
</style>
