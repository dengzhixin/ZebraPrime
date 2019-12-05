// miniprogram/pages/addNewAddress/addNewAddress.js
import data from './data'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options1: data,
    value1: [],
    phone: '',
    name: '',
    region: '',
    address: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(data)
    this.setData({ options: data })
 
  },
  nameChange(e) {
    this.data.name = e.detail.value
  },
  addressChange(e) {
    this.data.address = e.detail.value

  },
  phoneChange(e) {
    this.data.phone = e.detail.value
  },
  save() {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请填写正确手机号',
        icon: 'none'
      })
      return
    }
    if (this.data.name.length == 0 || this.data.region.length == 0 || this.data.address.length == 0) {
      wx.showToast({
        title: '请填写正确收货信息',
        icon: 'none'
      })
      return
    }

    const db = wx.cloud.database()
    const cartCollection = db.collection('address')
    let addData = {
      name: this.data.name,
      phone: this.data.phone,
      address: this.data.region + this.data.address
    }
    cartCollection.add({
      data: addData

    }).then((res) => {
      app.globalData.address.push(addData)
      console.log(app.globalData.address)
      wx.showToast({
        title: '保存成功',
      })
      console.log(getCurrentPages())
      
      wx.navigateBack({
        delta: 1,
        success:function(){
          let pages = getCurrentPages()
          pages[pages.length - 1].updateAddress()
        }
      })

    }).catch((res) => {
      // showT(false)

    })
  },
  back(){
    
  },
  openSelect() {
    this.setData({ visible1: true })

  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    this.setData({ region: e.detail.options.map((n) => n.label).join('') })
    console.log('onChange1', e.detail)
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