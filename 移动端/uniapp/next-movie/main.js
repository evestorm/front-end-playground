import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.getGlobalUser = function(){
	const userInfo = uni.getStorageSync("globalUser")
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else{
		return null;
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
