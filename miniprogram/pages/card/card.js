// pages/card/card.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      card:[
        {
          productId:'7179922c-aca8-4b29-a451-43d777f97bdc',
          num:1
        },
        {
          productId: '7179922c-aca8-4b29-a451-43d777f97bdc',
          num: 2
        }
      ],
      newCard:[],
      allMoney:0,
      selectAll:true,

  },
  
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

  },
  tobuy(e){
    // let productId = e.target.dataset.id
    app.globalData.submitOrder = []
    this.data.newCard.forEach((cart)=>{
      if (cart.checked){
        app.globalData.submitOrder.push({
          productId: cart.productId,
          num: cart.num,
          integral: cart.integral,
          cardId: cart._id,
          ssku:cart.ssku
        })

      }
    })
   
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
    })
  },
  initCart(){
    let that = this
    let products = app.globalData.products
    this.data.newCard=[]
    this.data.card = app.globalData.cart
    this.data.card.forEach((card) => {

      console.log(card.productId)
      app.getProductFromId(card.productId).then((temp)=>{
        console.log(temp)
        if (temp != null) {
          temp.productId=temp._id
          temp._id = card._id
          temp.num = card.num
          temp.checked = true
          temp.ssku = card.sku
          that.data.newCard.push(JSON.parse(JSON.stringify(temp)))
          that.setData({
            "card": this.data.card,
            "newCard": this.data.newCard
          })
          this.updateAllMoney()

        }
        
      })
      
     


    })
    this.setData({
      "card": this.data.card,
      "newCard": this.data.newCard
    })
    this.updateAllMoney()

  },
  changeRadioStyle:function(e){
    console.log(e)
    let arr = e.detail.value
    let newCard = JSON.parse(JSON.stringify(this.data.newCard) ) 
    for(let i =0;i<newCard.length;i++){
      newCard[i].checked=false
    }
    console.log(newCard)

    for(let i =0;i<arr.length;i++){
      console.log("arr[i]" + arr[i])
      newCard[arr[i]].checked=true
    }
    console.log(newCard)
      this.setData({
        'newCard': newCard
      })
      
      if (this.isSelectAll()){
        this.setData({
          "selectAll":true
        })
      }else{
        this.setData({
          "selectAll": false
        })
      }
    this.updateAllMoney()
    
    
  },
  isSelectAll(){
    let sum=0;
    for (let i = 0, len = this.data.newCard.length; i < len; i++) {
      if (this.data.newCard[i].checked){
        sum++;
      }
    }
    if(sum==this.data.newCard.length){
      return true;
    }else{
      return false;
    }

  },
  numReduce:function(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let key = 'newCard[' + index + '].num'
    let num = this.data.newCard[index].num

    const db = wx.cloud.database()
    const cart = db.collection('cart')
  

    if(num!=1){
      this.setData({
        [key]: --num
      })
    }else{
      console.log(id)
      cart.doc(id).remove().then((res)=>{
        if(res.stats.removed==1){
          this.data.newCard.splice(index, 1)
          this.data.card.splice(index,1)
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            "card": this.data.card,
            "newCard": this.data.newCard
          })
          this.updateAllMoney()
        }
      })
    }
      
    this.updateAllMoney()
  },
  numIncrease:function(e){

    let index = e.currentTarget.dataset.id
    let key = 'newCard[' + index + '].num'
    let num = this.data.newCard[index].num
    this.setData({
      [key]: ++num
    })
      
    this.updateAllMoney()

  },
  changeSelectAll:function(){
    this.data.selectAll = !this.data.selectAll
    let flag = this.data.selectAll
    for (let i = 0, len = this.data.newCard.length; i < len; i++) {
      this.data.newCard[i].checked = flag
    }
    this.setData({
      newCard: this.data.newCard,
      selectAll: flag
    })
    this.updateAllMoney()
  },
  updateAllMoney(){
    let sum =0
    this.data.newCard.forEach((cart) => {
      if (cart.checked) {
        sum += cart.price*cart.num

      }
    })
    this.setData({
      allMoney:sum.toFixed(2)
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
    this.initCart()

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


