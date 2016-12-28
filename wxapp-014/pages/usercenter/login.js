Page({
	data: {
		email: '',
		password: ''
	},
	bindEmailInput: function(e) {
		this.setData({email: e.detail.value})
	},
	bindPasswordInput: function(e) {
		this.setData({password: e.detail.value})
	},
	login: function(e) {
		wx.showToast({title: '登录请求中', icon: 'loading', duration: 10000});
		//网络请求开始
		wx.request({
			url: 'https://api.gugujiankong.com/account/Login?email=' + this.data.email + '&password=' + this.data.password,
			header: {
				'Content-Type': 'application/json'
			},
			success: function(res) {
				wx.hideToast();
				if (res.data.LoginStatus == 1) {
					//进行一些用户状态的存储
				} else {
					wx.showModal({title: '登录失败', content: '请检查您填写的用户信息！', showCancel: false, success: function(res) {
							//回调函数
						}});
				}
			}
		});
	}
})
