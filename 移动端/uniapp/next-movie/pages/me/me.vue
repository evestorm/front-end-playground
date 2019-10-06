<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="userInfo.faceImage" class="face"></image>
			</view>
			<view v-else>
				<!-- 未登录 -->
				<image src="/static/icos/108x108.png" class="face"></image>
			</view>
			<view class="info-wrapper" v-if="userIsLogin">
				<view class="nickname">{{userInfo.nickname}}</view>
				<view class="nav-info">ID: {{userInfo.id}}</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">注册/登录</view>
				</navigator>
			</view>
			
			<view class="set-wrapper" v-if="userIsLogin">
				<image src="/static/icos/settings.png"
				 class="settings"
				 @click="goToMeInfo"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin: false ,//用户是否登陆
				userInfo: {}	//用户信息
			};
		},
		onShow() {
			const self = this
			// 用户状态的切换
			// 把方法 getGlobalUser 挂载到 Vue.prototype 中，用来获取用户数据
			const userInfo = self.getGlobalUser()
			if (userInfo != null && userInfo != "" && userInfo != undefined) {
				self.userInfo = userInfo
				self.userIsLogin = true
			} else {
				self.userIsLogin = false
			}
		},
		methods: {
			goToMeInfo(){
				uni.navigateTo({
					url:"../meInfo/meInfo"
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('me.less');
</style>
