// miniprogram/pages/productSearch/productSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searckKeyword:'',
    products:[],
    showEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    if (options.type!=null){
      this.requestSearchType(options.type)
    }
  },
  toProduct(e) {
    console.log(e)
    let productId = e.currentTarget.dataset.id
    console.log(productId)
    wx.navigateTo({
      url: '../product/product?id=' + productId,
    })
  },
  onConfirm:function(e){
    console.log(e.detail.value)
    this.requestSearchTitle(e.detail.value)
  },
  requestSearchTitle(keyword){
    const db = wx.cloud.database(); //初始化数据库
    db.collection("product").where({
      // name: _name,
      title: {
        $regex: '.*' + keyword,
        $options: 'i'
      }
    }).get().then((res)=>{
      this.setData({
        products:res.data
      })
    });

  },
  requestSearchType(type) {
    const db = wx.cloud.database(); //初始化数据库
    const _ = db.command

    db.collection("product").where({
      // name: _name,
      tags: _.in([type])
    }).get().then((res) => {
      console.log(res)
      this.setData({
        products: res.data,
        showEmpty:res.data.length>0?false:true
      })
      
    });

  }
  
})