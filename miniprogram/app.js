//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      'env': 'zabra-3567d'
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    productPageMessage: {
      current: 1,
      pageSum: 1
    },
    products: [],
    address: []
  },
  initUserInfo() {
    return new Promise((resolve, reject) => {

      if (this.globalData.userInfo != null) {
        resolve()
        return
      }
      const db = wx.cloud.database()
      const userCollection = db.collection('user')
      userCollection.get().then((res) => {
        if (res.data.length == 0) {
          let data = {
            "integral": 0,
            "level": 1,
            "sumIntegral": 0
          }
          userCollection.add({
            data: data
          }
          ).then(() => {
            this.globalData.userInfo = data
            resolve()
          }).catch((res) => {
            console.log(res)
            reject()
          })

        } else {

          this.globalData.userInfo = res.data[0]
          resolve()
        }
      }).catch(() => {
        reject()
      })
    })

  },
  initMyAddress() {
    let that = this
    return new Promise(function (resolve, reject) {
      console.log()
      if (that.globalData.address.length == 0) {
        const db = wx.cloud.database()
        const addressCollection = db.collection('address')
        addressCollection.get().then((res) => {
          that.globalData.address = res.data
          resolve()
        }).catch((res) => {
          reject(res)
        })
      } else {
        resolve()
      }

    }).catch(function (reason) {
      console.log('catch:', reason);
    });


  },
  getProductFromId(id) {
    return new Promise((resove,reject)=>{
      let p = this.globalData.products
      console.log(p)
      console.log(id)

      for (let i = 0, len = p.length; i < len; i++) {
        if (p[i]._id == id) {
          resove(JSON.parse(JSON.stringify(p[i])))  
        }
      }
      const db = wx.cloud.database()
      const productCollection = db.collection('product')
      console.log("运行到这")
      productCollection.doc(id).get().then((res)=>{
        resove(res.data)
      }).catch(()=>{
        reject()
      })

    })

  },
  initCart() {
    return new Promise((resove,reject)=>{
      const db = wx.cloud.database()
      const cart = db.collection('cart')
      cart.get().then((res) => {
        console.log(res)
        resove(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
    
  }
})