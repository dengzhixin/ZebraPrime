//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerCurrentBgColor: '',
    bannerCurrent: 0,
    products: [],
    bottomLoading: false,
    banner: [
      {
        bgUrl: '../../images/banner1.jpg',
        bgColor: '#d9d0c6'
      },
      {
        bgUrl: '../../images/banner2.jpg',
        bgColor: '#d4dadd'
      },
      {
        bgUrl: '../../images/banner3.jpg',
        bgColor: '#b6a08d'
      }
    ],
    scrollMenu: [
      {
        iconUrl: '../../images/menu1.png',
        bgColor: '#DD5855',
        name: '发现'
      },
      {
        iconUrl: '../../images/menu2.png',
        bgColor: '#8C4DA7',
        name: '斑马出品'
      },
      {
        iconUrl: '../../images/menu3.png',
        bgColor: '#36A759',
        name: '中国田'
      },
      {
        iconUrl: '../../images/menu4.png',
        bgColor: '#3AB795',
        name: '斑马果园'
      },
      {
        iconUrl: '../../images/menu5.png',
        bgColor: '#DB475D',
        name: '排行榜'
      },
      {
        iconUrl: '../../images/menu6.png',
        bgColor: '#BF5742',
        name: '出行'
      },
      {
        iconUrl: '../../images/menu7.png',
        bgColor: '#356DB2',
        name: '百货家纺'
      },
      {
        iconUrl: '../../images/menu8.png',
        bgColor: '#EF5D73',
        name: '服饰鞋包'
      },
      {
        iconUrl: '../../images/menu9.png',
        bgColor: '#F7A9A8',
        name: '母婴玩具'
      },
      {
        iconUrl: '../../images/menu10.png',
        bgColor: '#545E75',
        name: '轻奢饰品'
      },
      {
        iconUrl: '../../images/menu11.png',
        bgColor: '#86BAA1',
        name: '水果生鲜'
      },
      {
        iconUrl: '../../images/menu12.png',
        bgColor: '#FFCF56',
        name: '1分钱试用'
      },
      {
        iconUrl: '../../images/menu13.png',
        bgColor: '#DB475D',
        name: '新人专享'
      },
      {
        iconUrl: '../../images/menu14.png',
        bgColor: '#E4A52E',
        name: '积分商品'
      },
      {
        iconUrl: '../../images/menu15.png',
        bgColor: '#E09591',
        name: '斑马优选'
      },
      {
        iconUrl: '../../images/menu16.png',
        bgColor: '#8E49AD',
        name: '全国包邮'
      },
      {
        iconUrl: '../../images/menu17.png',
        bgColor: '#33A757',
        name: '斑马国际'
      },
      {
        iconUrl: '../../images/menu18.png',
        bgColor: '#D7B8F3',
        name: '美妆个护'
      },
      {
        iconUrl: '../../images/menu19.png',
        bgColor: '#7E92F0',
        name: '数码家电'
      },
      {
        iconUrl: '../../images/menu20.png',
        bgColor: '#CCE8CC',
        name: '生活美食'
      },
      {
        iconUrl: '../../images/menu21.png',
        bgColor: '#F42272',
        name: '滋补保健'
      },
      {
        iconUrl: '../../images/menu22.png',
        bgColor: '#FF907F',
        name: '休闲零食'
      },
      {
        iconUrl: '../../images/menu23.png',
        bgColor: '#404247',
        name: '品牌制造'
      },
      {
        iconUrl: '../../images/menu24.png',
        bgColor: '#D6BC98',
        name: '分类'
      }
    ]

  },

  bannerChange: function (current, source) {
    this.setData({ "bannerCurrentBgColor": this.data.banner[current.detail.current].bgColor })
  },
  onLoad: function () {
    this.setData({
      "bannerCurrentBgColor": this.data.banner[0].bgColor,
    })
    this.getProduct(1, () => {
      this.updataProduce()
    });
    app.initCart().then((e)=>{
      app.globalData.cart = e
    }).catch((e)=>{
      console.log(e)
    })

    this.initOpenId();
    this.initMenu();
    this.initBanner();
  },
  getProduct: (page, fallback) => {
    if (page > app.globalData.productPageMessage.pageSum) {
      fallback(false)
      return
    }
    wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        "page": page
      }
    }).then(res => {
      let data = res.result.data.data
      if (data.length > 0) {
        app.globalData.products = app.globalData.products.concat(data)
        console.log(app.globalData.products)
        app.globalData.productPageMessage = {
          current: page,
          pageSum: res.result.pageSum
        }
        fallback(true)
      }

    }).catch((err) => {
      console.log(err)
    })

  }
  ,
  initOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'

    }).then(res => {
      console.log(res)
      app.globalData.openid = res.result.openid
      }).catch((err) => {
        console.log(err)
      })
  },
  initMenu() {
    const db = wx.cloud.database()
    const menu = db.collection('indexMenu')
    let menuData = []
    menu.get().then((res) => {
      menuData = res.data
      menu.skip(20).get().then((res) => {
        menuData = menuData.concat(res.data)
        this.setData({
          scrollMenu: menuData
        })
      })


    })
  },
  initBanner() {
    const db = wx.cloud.database()
    const collection = db.collection('banner')
    collection.get().then((res) => {
      this.setData({
        banner: res.data
      })


    }).catch((err) => {
      console.log(err)
    })

  },
  onBannerTap(e) {
    let id = e.currentTarget.dataset.productid
    console.log(id)
    wx.navigateTo({
      url: '../product/product?id=' + id,
    })
  },
  toMenuItem(e) {
    let issearch = e.currentTarget.dataset.issearch
    let navigation = e.currentTarget.dataset.navigation
    if (issearch) {
      wx.navigateTo({
        url: '../productSearch/productSearch?type=' + navigation,
      })
    } else {
      let index = navigation.indexOf('tab-')
      if (index >= 0) {

        wx.switchTab({
          url: navigation.replace('tab-', ''),
        })
      } else {
        wx.navigateTo({
          url: navigation,
        })
      }
    }
  },

  goProduct: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../product/product?id=' + e.target.dataset.id,
    })
  },
  updataProduce() {
    this.setData({
      products: app.globalData.products
    })
  },
  onReachBottom: function () {
    this.setData({ bottomLoading: true })
    this.getProduct(app.globalData.productPageMessage.current + 1, (res) => {
      if (res) {
        this.updataProduce()
      }
      this.setData({ bottomLoading: false })

    })
  }
})
