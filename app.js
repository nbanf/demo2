//app.js
App({  //注册小程序

  data:{
    isPlay:false,
    pageIndex:null,
    moviesArr:[]
  },
  onLaunch: function (e) {  //小程序初始化完成时触发，全局只触发一次
    console.log(e)
    this.getUserinfo();
  },
  onShow: function (e) {   //小程序启动，或从后台进入前台显示时触发
    console.log(e)
  },
  onHide: function (e) {
    console.log(e)    //小程序从前台进入后台时触发
  },
  getUserinfo: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
      }
    });
  },
  globalData: {
    userInfo: null
  }
})