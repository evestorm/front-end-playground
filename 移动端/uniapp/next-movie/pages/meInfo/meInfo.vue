<template>
	<view class="page page-fill">
		<!-- 个人信息 -->
		<view class="page-block info-list">
			<view class="item-wapper face-upbottom-top face-line" @click="operator">
				<view class="info-words">头像</view>
				<view class="right-wapper">
					<image :src="globalUser.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="/static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="item-wapper face-upbottom face-line" @click="operator">
				<view class="info-words">昵称</view>
				<view class="right-wapper">
					<view class="gray-fields">{{globalUser.nickname}}</view>
					<view class="arrow-block">
						<image src="/static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="item-wapper face-upbottom face-line" @click="operator">
				<view class="info-words">生日</view>
				<view class="right-wapper">
					<view class="gray-fields">{{globalUser.birthday}}</view>
					<view class="arrow-block">
						<image src="/static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<view class="item-wapper face-upbottom" @click="operator">
				<view class="info-words">性别</view>
				<view class="right-wapper">
					<view class="gray-fields">
						<view v-if="globalUser.sex == 1">
							男
						</view>
						<view v-else-if="globalUser.sex == 0">
							女
						</view>
						<view v-else>请选择</view>
					</view>
					<view class="arrow-block">
						<image src="/static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 个人信息 end -->
		
		<!-- 底部按钮 -->
		<view class="foot-wapper">
			<view class="footer-words" @click="clearCache">清理缓存</view>
			<view class="footer-words" style="margin-top: 4px;" @click="logout">退出登录</view>
		</view>
		<!-- 底部按钮 end -->
		
	</view>
</template>

<script>
	import common from '../../common/index.js'
	export default {
		data() {
			return {
				globalUser:{}
			}
		},
		onShow() {
			var me = this;
			me.globalUser = me.getGlobalUser();
		},
		
		methods: {
			clearCache(){
				// 清理缓存会删除所有数据,包括用户信息
				uni.clearStorageSync();
				uni.showToast({
					title:"清理缓存成功",
					duration:1500,
					mask:false
				});
			},
			logout(){
				var me = this;
				uni.request({
					url:common.serverURL + "/user/logout?&qq=843002185&userId=" + me.globalUser.id,
					method:"POST",
					success: (res) => {
						if(res.data.status == 200){
							// 退出登录成功
							uni.removeStorageSync("globalUser");
							uni.switchTab({
								url:"../me/me"
							});
						} else if(res.data.status == 500){
							uni.showToast({
								title:res.data.msg,
								mask:false,
								duration:1500
							});
						}
					}
				});
			},
			// 头像编辑
			operator(){
				var me = this;
				var globalUser = me.getGlobalUser()
				uni.showActionSheet({
					itemList:["查看我的头像", "从相册选择上传"],
					success: (res) => {
						var index = res.tapIndex;
						if (index == 0) {
							// 查看我的头像
							var faceArr = [];
							faceArr.push(globalUser.faceImage);
							uni.previewImage({
								urls:faceArr,
								current:faceArr[0]
							});
						} else {
							//从相册选择上传
							uni.chooseImage({
								count:1,
								sizeType:["compressed"],
								sourceType:["album"],
								success: (res) => {
									// 获得临时路径
									var tempFilePath = res.tempFilePaths[0];
									
									uni.navigateTo({
										url:"../meface/meface?tempFilePath=" + tempFilePath
									});
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
	@import url("meInfo.css");
</style>