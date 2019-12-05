// pages/myself/myself.js
let app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      "integral": 0,
      "level": 1,
      "sumIntegral": 0
    },
    levelRouLe:{
      1: 300,
      2: 600,
      3: 900,
      4: 1200,
      5: 2400,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  toQuanyi: function () {
    wx.switchTab({
      url: '/pages/quanyi/quanyi'
    })
  },
  toMyOrder() {
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  toAddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  toGood(){
    wx.navigateTo({
      url: '../good/good',
    })
  },
  toKf(){

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
    console.log(app.globalData.userInfo)
    app.initUserInfo().then(() => {
      console.log(app.globalData.userInfo)

      this.setData({
        userInfo: app.globalData.userInfo
      })
    })
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