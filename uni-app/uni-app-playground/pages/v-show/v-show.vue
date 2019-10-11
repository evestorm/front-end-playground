<template>
	<view>
		<view v-show="show" class="item">谁特么买小米？！</view>
		<view v-show="show">
			<view class="item">
				谁特么买小米？！
			</view>
		</view>
		<view v-if="show" class="item">干翻华为！</view>
		<button type="primary" @tap="trigger">显示隐藏</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			};
		},
		methods: {
			trigger() {
				this.show = !this.show;
			}
		}
	}
</script>

<style lang="less" scoped>
.item {
	display: flex;
}
</style>
