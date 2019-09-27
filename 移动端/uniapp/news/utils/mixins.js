let tapItemMixin = {
	methods: {
		onTapItem(e) {
			const newsId = e.currentTarget.dataset.newsId
			console.log(newsId)
			uni.navigateTo({
				url: '../info/info?newsId=' + newsId
			});
		},
	}
}

export default {
	tapItemMixin,
}