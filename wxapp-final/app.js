//app.js
App({
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.techfoco.com/account/wxlogin',
            data: {
              code: res.code
            },
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
              'Content-Type': 'application/json'
            },
            success: function (res) {
              var res = JSON.parse(res.data);
              that.globalData.openid = res.openid;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    openid: ''
  }
})