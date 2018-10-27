// pages/details/details.js.js
var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id : 0,
   article : '',
   myrich : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(appInstance.globalData.openid)
    var that = this;
    that.setData({
      id: options.id
    });
    this.getArticle(that.data.id);
  },
  //通过 API 获取文章的详情
  getArticle : function (id) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this; // this 指向性的问题

    wx.request({
      url: 'https://api.techfoco.com/feed/getarticle?articleid=' + id,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) { //请求成功
        var res = JSON.parse(res.data);
        that.setData({
          article: res,
          myrich : res.Content
        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function () { //请求完成的时候，不管请求成功还是失败
        wx.hideLoading();
      }
    })

  }
})