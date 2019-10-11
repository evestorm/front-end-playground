<template>
	<view>
		<view class="h1">classAndStyle</view>
		<view>
			<view class="h2">class数组对象形式绑定</view>
			【直接绑定对象 {active: isActive, bold: true}】全端支持：<view :class="{ active: isActive, bold: true }">我</view>
			【绑定一个数组对象 [activeClass, 'bold']】非H5不支持：<view :class="[activeClass, 'bold']">从未见过
			<!-- #ifdef MP-WEIXIN -->
			<text>（← 失去高光）</text>
			<!-- #endif -->
			</view>
			【变相通过 computed 绑定】全端支持：<view :class="activeClass1">如此厚颜无耻之人！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isActive: true,
				activeClass: {
					active: true,
				}
			};
		},
		computed: {
			activeClass1() {
				return 'bold ' + (this.activeClass.active ? 'active' : '')
			}
		}
	}
</script>

<style lang="less" scoped>
.h1, {
	display: block;
	font-size: 2em;
	margin-block-start: 0.67em;
	margin-block-end: 0.67em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	font-weight: bold;
}

.h2 {
	display: block;
	font-size: 1.5em;
	margin-block-start: 0.83em;
	margin-block-end: 0.83em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	font-weight: bold;
}
.active {
	color: red;
}
.bold {
	font-weight: bold;
}
</style>
