//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World!',
    userid: 1234,
    show: false,
    array:[{
      message: 'hello'
    },
    {
      message: 'world'
    },
    {
      message: '!'
    }],
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    itemb: {
      index: 999,
      msg: 'this is a template!!',
      time: '2016-11-15'
    }
  },
  onLoad: function () {
   
  },
  onShow: function(){
    //app.globalData.userInfo = "wxopen.club";
  }
})
