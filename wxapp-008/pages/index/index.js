//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World!',
    userid: 1234,
  },
  onLoad: function () {
   
  },
  onShow: function(){
    //app.globalData.userInfo = "wxopen.club";
  },
  tapMessage: function(event){
    console.log(event);
    console.log("data - userid - "+ event.target.dataset.userid);
     console.log("data - userName - "+ event.target.dataset.userName);
  },
  handleTap1 :function(){console.log("handleTap1");},
  handleTap2 :function(){console.log("handleTap2");},
  handleTap3 :function(){console.log("handleTap3");},
})
