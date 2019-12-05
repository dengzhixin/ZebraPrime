// miniprogram/pages/product/product.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    openSkuSelector: false,
    currenSku: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    console.log(app)
     app.getProductFromId(options.id).then((res)=>{
       let product =res
       this.setData({
         product: product
       })
       wx.setNavigationBarTitle({
         title: product.title
       })
    })
    
  },
  tobuy(e) {
    if (this.data.product.sku && Object.keys(this.data.currenSku).length < Object.keys(this.data.product.sku).length){
      this.openSkuSelector()
      return
    }
    let productId = e.target.dataset.id
    app.globalData.submitOrder = []
    app.globalData.submitOrder.push({
      productId: productId,
      num: 1,
      integral: this.data.product.integral,
      ssku: this.data.currenSku
    })
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
    })
  },
  addCart: function(e) {
    if (this.data.product.sku && Object.keys(this.data.currenSku).length < Object.keys(this.data.product.sku).length) {
      this.openSkuSelector()
      return
    }
    let productId = e.target.dataset.id
    let res = this.isExitCart(productId, this.data.currenSku);
    const db = wx.cloud.database()
    const cartCollection = db.collection('cart')
    let addData = {
      productId: productId,
      num: 1,
      sku: this.data.currenSku

    }
    let showT = function(success) {
      if (success) {
        wx.showToast({
          title: '加入购物车成功',
        })
      } else {
        wx.showToast({
          title: '加入购物车失败，请检查您的网络',
          icon: 'none'
        })
      }
      console.log(res)
    }
    console.log("-------------")
    console.log(res)
    if (!res) { //不存在
      cartCollection.add({
        data: addData

      }).then((res) => {
        console.log("resreadsavfdsaiujkdn")
        console.log(res)
        showT(true)
        addData._id=res._id
        app.globalData.cart.push(addData)

      }).catch((res) => {
        showT(false)

      })

    } else {
      console.log("-----")
      console.log(res._id)
      cartCollection.doc(res._id).update({
        data: {
          num: ++res.num
        }
      }).then((resp) => {
        showT(true)
      }).catch(() => {
        showT(false)

      })

    }
  },
  isExitCart(id,sku) {
    let cart = app.globalData.cart

    if (cart == null || cart.length == 0 ) {
      return false
    }
    for (let i = 0, len = cart.length; i < len; i++) {
      
      if (cart[i].productId == id && JSON.stringify(cart[i].sku) === JSON.stringify(sku)  ) {
        cart[i].index = i
        return cart[i]
      }
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  openSkuSelector() {
    console.log("truetruetruetruetrue")
    this.setData({
      viewSkuSelector: true
    })
  },
  closeSkuSelector() {
    this.setData({
      viewSkuSelector: false
    })
  },
  updataCurrentSku(e) {
    let isBen = Object.keys(this.data.currenSku).length == Object.keys(this.data.product.sku).length

    this.data.currenSku[e.currentTarget.dataset.key] =   e.currentTarget.dataset.value+""

    if (isBen==false && Object.keys(this.data.currenSku).length == Object.keys(this.data.product.sku).length) {
      this.closeSkuSelector()

    }
    this.setData({
      currenSku: this.data.currenSku
    })
  }
})