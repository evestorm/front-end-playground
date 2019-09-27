<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* #ifdef APP-PLUS */
	/*每个页面公共css */
	@import './common/uni.css';
	/* #endif */
</style>
