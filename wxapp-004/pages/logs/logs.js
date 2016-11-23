//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    });
    console.log("logs page execute: onLoad.");
  },
  onReady: function() {
    console.log("logs page execute: onReady.");
  },
  onShow: function() {
    // Do something when page show.
    console.log("logs page execute: onShow.");
  },
  onHide: function() {
    // Do something when page hide.
    console.log("logs page execute: onHide.");
  },
  onUnload: function() {
    // Do something when page close.
    console.log("logs page execute: onUnload.");
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    console.log("logs page execute: onPullDownRefresh.");
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    console.log("logs page execute: onReachBottom.");
  },
})
