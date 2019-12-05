// miniprogram/pages/good/good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:5,
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onText(e){
    console.log(e)
    this.data.text=e.detail.value
  },
  raterChange(e){
    this.data.start=e.detail.value
  },
  submit(){
    console.log(this.data)
    const db = wx.cloud.database()
    const suggectionCollection = db.collection('suggection')
    let addData = {
      start: this.data.start,
      text: this.data.text,
    }
    suggectionCollection.add({
      data: addData

    }).then((res) => {
      let resTex=""
      if(this.data.start>=3){
        resTex = "感谢您的支持！"
      }else{
        resTex = "感谢您的反馈，我们会继续优化的！"
      }
      
      wx.navigateBack({
        success:()=>{
          wx.showToast({
            title: resTex,
          })
        }
      })

    }).catch((res) => {
      wx.navigateBack()
      // showT(false)

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