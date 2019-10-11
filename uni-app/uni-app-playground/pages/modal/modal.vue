<template>
	<view>
		<h2>自定义modal</h2>
		<button type="primary" @tap="showModal">显示modal</button>
		<text v-show="content.length > 0">{{content}}</text>
		<neil-modal :show="show" @close="closeModal" title="更新提示" confirm-text="立即更新" cancel-text="暂不更新" @confirm="updateContent">
		    <text>输入文本：</text><input type="text" v-model="value" />
		</neil-modal>
	</view>
</template>

<script>
	import neilModal from '../../components/neil-modal/neil-modal.vue'
	export default {
		data() {
			return {
				show: false,
				content: '',
				value: ''
			};
		},
		components: {
			neilModal
		},
		methods: {
			showModal() {
				this.show = true;
			},
			closeModal() {
				uni.showToast({
					title: '关闭了弹窗'
				});
				this.show = false;
			},
			updateContent() {
				this.content = this.value;
				uni.showToast({
					title: '更新了文本'
				});
				this.show = false;
			}
		}
	}
</script>

<style lang="less">

</style>
