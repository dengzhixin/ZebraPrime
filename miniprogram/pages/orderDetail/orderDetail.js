// miniprogram/pages/orderDetail/orderDetail.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    orderState:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order = app.globalData.orderDetail
    
    let orderState = ""
    switch (order.state) {
      case 0:
        orderState = "订单已创建"
        break;
      case 1:
        orderState = "订单已付款"
        break;
      case 2:
        orderState = "订单配货中"
        break;
      case 3:
        orderState = "订单已发货"
        break;
      case 4:
        orderState = "订单已完成"
        break;
      case 5:
        orderState = "订单退款中"
        break;
      case 6:
        orderState = "订单已关闭"
        break;
    }
    this.setData(
      { order, orderState}
    )
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