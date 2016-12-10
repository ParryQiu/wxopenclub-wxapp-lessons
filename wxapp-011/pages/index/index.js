//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    newsdata: ''
  },

  loadData: function () {
    var that = this;
    wx.request({
      url: 'http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          newsdata: res.data
        });
      }
    })
  }
})
