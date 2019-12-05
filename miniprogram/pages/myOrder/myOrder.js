// miniprogram/pages/myOrder/myOrder.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMyOrder()
  },
  initMyOrder(){
    const db = wx.cloud.database()
    const orderCollection = db.collection('order')
    orderCollection.orderBy('createTime', 'desc').get().then((res) => {
      
      let orders = res.data
      orders.forEach((order)=>{
        order.products.forEach((product)=>{
          app.getProductFromId(product.productId).then((res)=>{
            product.product=res
            this.setData({
              "orders": orders
            })
          })

        })
      })
      
    })
  },
  toOrderDetail(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    console.log("---"+index)
    app.globalData.orderDetail=this.data.orders[index]
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
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