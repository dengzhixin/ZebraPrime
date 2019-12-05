// miniprogram/pages/address/address.js
let app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.initMyAddress().then(()=>{
      this.setData({
        address: app.globalData.address
      })
    })
  },
  deleteAddress(e){
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    const db = wx.cloud.database()
    const addressCollection = db.collection('address')
    addressCollection.doc(id).remove().then((res)=>{
      if(res.stats.removed==1){
        wx.showToast({
          title: '删除成功',
        })
        app.globalData.address.splice(index,1)
        this.setData({
          address: app.globalData.address
        })
      }
    })
    // addressCollection.where({

    // })
  },
  chooseAddress(e){
    let index = e.currentTarget.dataset.index
    wx.navigateBack({
      success:function(){
        let pages=getCurrentPages()
        console.log()
        let page = pages[pages.length - 1]
        if (page.route == "pages/submitOrder/submitOrder"){
          page.updateAddress(index)
        }
      }
    })
  },
  toAddNewAddress(){
    wx.navigateTo({
      url: '../addNewAddress/addNewAddress',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  updateAddress:function(){
    this.setData({
      address: app.globalData.address
    })
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