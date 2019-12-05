// pages/quanyi/quanyi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      {
        bgUrl: '../../images/banner5.jpg',
      },
      {
        bgUrl: '../../images/banner6.jpg',
      }
    ],
    products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initQuanyiProduct()
  },
  initQuanyiProduct(){
    const db = wx.cloud.database()
    const _ = db.command
    const productCollection = db.collection('product')
    productCollection.where({
      tags: _.in(['积分商品'])
    }).orderBy('maxDeduction','desc').get().then((res) => {

      this.setData({
        products: res.data,
      })
    })
  },
  goProduct: function (e) {
    wx.navigateTo({
      url: '../product/product?id=' + e.target.dataset.id,
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