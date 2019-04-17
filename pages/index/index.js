// pages/index/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("on Load 页面加载");


    //判断用户是否授权了
    wx.getSetting({
      success: (date)=>{
        console.log(date);
        if (date.authSetting['scope.userInfo']){
          //用户已经授权
          this.setData({
            isShow: false
          })
        }else{
          //用户没有授权
          this.setData({
            isShow:true
          })
        }
      }
    })

    //获取用户登录的信息
    wx.getUserInfo({
      success: (date)=>{
        console.log(date)
        this.setData({
          userInfo: date.userInfo
        })
      },
      fail:()=>{
        console.log("123")
      }
    })  
  },
  handgetuserinfo(date){
    console.log("用户点击了",date)
    if(date.detail.rawData){
      //用户点击的是允许
      this.onLoad();
    }
  },
  handleclick(){
    wx.switchTab({
      url: '../list/list',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})