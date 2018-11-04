Page({
  data: {
    feeds: [],
    page: 1
  },
  onLoad: function() {
    var that = this;
    this.getFeeds(that.data.page);
  },
  onReachBottom: function() {
    wx.showLoading({
      title: '加载更多文章',
    })
    var that = this;
    this.getFeeds(that.data.page);
  },
  getFeeds: function(page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'https://api.gugudata.com/news/techblogs?appkey=请去www.gugudata.com申请key&pageindex=' + page + '&pagesize=10',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var res = res.data;

        if (that.data.page > 1) {
          var feedTemp = that.data.feeds;
          that.setData({
            feeds: feedTemp.concat(res),
            page: page + 1
          })
        } else {
          console.log(res);
          that.setData({
            feeds: res,
            page: page + 1
          })
        }
      },
      
      fail: function() {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function() {
        if (page >= 1) {
          wx.hideLoading()
        } else {
          //wx.stopPullDownRefresh()
        }
      }
    })
  },
  //单项的点击事件
  tapItem: function(event) {
    var that = this; 
    var article = event.currentTarget.dataset.para;
    wx.navigateTo({
      url: "/pages/details/details?id=" + article.ArticleId
    })
  }
})