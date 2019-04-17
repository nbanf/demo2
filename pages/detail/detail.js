// pages/detail/detail.js

let app = getApp();
console.log(app, typeof app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false,
    index:null,
    isMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //获取参数值
    let index = options.index;
    this.setData({
      index:index
    })

    //根据本地缓冲的数据判断用户是否收藏了当前的文章
    let detailStorge = wx.getStorageSync("isCollected"); 

    if (!detailStorge){
      //初始化空对象
      wx.setStorageSync("isCollected", {})
    }

    //判断用户是否收藏
    if (detailStorge[index]){
      this.setData({
        isCollected:true
      })
    } //收藏过


    //监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
      console.log("音乐播放")
      this.setData({
        isMusic:true
      })

      //修改app中的数据
      app.data.isPlay = true
      app.data.pageIndex = index
    })
    //监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      console.log("音乐暂停")
      this.setData({
        isMusic:false
      })
      //修改app中的数据
      app.data.isPlay = true
    })

    //判断音乐是否在播放
    if(app.data.isPlay == true && app.data.pageIndex === index){
      this.setData({
        isMusic: true
      });
    }
    
  },
  handleCollection(){
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected:isCollected
    });
    //提示用户
    let title = isCollected?"收藏成功":"取消收藏"
    wx.showToast({
      title: title,
      icon:"success"
    });
    //缓冲数据到本地
    //{1：true,2:false} 
    let {index} = this.data;
    console.log(this.data)
    //不可行  会覆盖之前的状态
    // let obj = {};

    wx.getStorage({
      key: 'isCollected',
      success: function(res) {
        console.log(res)
        let obj = res.data;
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: function () {
            console.log("缓冲成功")
          }
        })
      },
    })
  

  },
  //音乐播放
  musicopen(){
    let isMusic = !this.data.isMusic;
    this.setData({
      isMusic:isMusic
    })

    //控制音乐播放
    if(isMusic){
      //播放音乐
      wx.playBackgroundAudio({
        dataUrl: 'http://up.mcyt.net/down/46100.mp3',
        title:"IF-Ken Aria"
      })
    }else{
      //暂停音乐
      wx.pauseBackgroundAudio()
    }
  },

  //点击分享功能
  handlerShare(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈','分享到qq空间','分享到微博'],
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