// miniprogram/pages/submitOrder/submitOrder.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    product: [],
    buyerMessage: '',
    sumPrice: 0,
    activeAddress: 0,
    sumMaxDeduction: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.initMyAddress().then(() => {
      this.setData({
        address: app.globalData.address
      })
    });
    let products = []
    let allP = app.globalData.products
    let sumPrice = 0
    let productSumDeduction = 0
    console.log("------", app.globalData.submitOrder)
    app.globalData.submitOrder.forEach((p) => {
      app.getProductFromId(p.productId).then((res) => {
        let pr = res
        pr.num = p.num
        pr.sku = p.ssku
        sumPrice += p.num * pr.price
        productSumDeduction += p.num * (pr.maxDeduction ? pr.maxDeduction : 0)
        products.push(pr)
      
        app.initUserInfo().then((res) => {
          let userIntegral = app.globalData.userInfo.integral
          let temp = 0
          console.log("productSumDeduction" + productSumDeduction)
          this.setData({
            product: products,
            sumPrice: sumPrice,
            sumMaxDeduction: userIntegral > productSumDeduction ? productSumDeduction : userIntegral
          })
          console.log(res)

        })
      }).catch((res) => {
        console.log("出错")
        console.log(res)
      })

    })




    

  },
  updateAddress: function (activeAddress) {
    this.setData({
      address: app.globalData.address,
      activeAddress: activeAddress
    })
  },
  toAddress() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  buyerMessageChange(e) {
    this.data.buyerMessage = e.detail.value
  },
  submitOrder() {
    // console.log(app.globalData.openid)
    let addData = {
      createTime: (new Date()).valueOf(),
      products: app.globalData.submitOrder,
      sumPrice: this.data.sumPrice,
      realSumPrice: this.data.sumPrice - this.data.sumMaxDeduction,
      sumMaxDeduction: this.data.sumMaxDeduction,
      address: this.data.address[this.data.activeAddress],
      _openid: app.globalData.openid
    }
    
    wx.cloud.callFunction({
      name: 'buy',
      data: { addData }
    }).then((res) => {
      app.globalData.userInfo = res.result.userInfo
      console.log("hhah")
      console.log(res)
      console.log(app.globalData.userInfo)
      wx.redirectTo({
        url: '../myOrder/myOrder',
      })
      app.initCart().then((e) => {
        app.globalData.cart = e
      }).catch((e) => {
        console.log(e)
      })
      
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