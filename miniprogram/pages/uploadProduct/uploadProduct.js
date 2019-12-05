Page({
  data: {
    tagList: ['服饰箱包', '全国包邮'],
    product: {
      title: '',
      imgUrl: [],
      tags: ['服饰箱包', '全国包邮'],


    },
    formats: {},
    readOnly: false,
    placeholder: '商品详情',
    swiperCurrent: 0,
    tempImagePath: {}

  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    this.initTagList()
  },
  initTagList() {
    const db = wx.cloud.database()
    const collection = db.collection('indexMenu')
    collection.where({
      isSearch: true
    }).get().then((res) => {
      let tagList = []
      res.data.forEach((tag) => {
        tagList.push(tag.name)
      })
      tagList.push('积分商品')
      this.setData({
        tagList: tagList
      })
    })

  },
  uploadSwiperItem() {
    wx.chooseImage({
      success: (res) => {
        if (res.tempFilePaths.length == 0) {
          return
        }
        res.tempFilePaths.forEach((path) => {
          wx.showLoading({
            title: '上传中',
          })
          this.uploadImage(path,(cloudPath)=>{
            let index = this.data.product.imgUrl.push(cloudPath) - 1
            this.data.swiperCurrent = index
            this.setData({
              'product.imgUrl': this.data.product.imgUrl
            })
            wx.hideLoading()
          })
        })
        
      },
    })
  },
  onTagsChange(e) {
    let {
      value
    } = e.detail
    console.log(value)
    let tags = this.data.product.tags
    let index = -1
    for (let i = 0, len = tags.length; i < len; i++) {
      if (tags[i] == value) {
        index = i;
      }
    }
    if (index == -1) {
      tags.push(value)
    } else {
      tags.splice(index, 1)
    }
    this.setData({
      "product.tags": tags
    })
  },
  onTitleInput(e) {
    this.data.product.title = e.detail.value
  },
  onPriceInput(e) {
    this.data.product.price = parseFloat(e.detail.value)
  },
  onOldPriceInput(e) {
    this.data.product.oldPrice = parseFloat(e.detail.value) 
  },
  onIntegralInput(e) {
    this.data.product.integral = parseFloat(e.detail.value) 
  },
  onSumInventoryInput(e){
    this.data.product.sumInventory = parseInt(e.detail.value)

  },
  onMaxDeductionInput(e){
    this.data.product.maxDeduction = parseInt(e.detail.value)

  },
  onSellNumberInput(e){
    this.data.product.sellNumber = parseInt(e.detail.value)

  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 9,
      success: function (res) {
        for(let i=0;i<res.tempFilePaths.length;i++){
          let path = res.tempFilePaths[i]
          let fix = path.substr(path.lastIndexOf('.') + 1, path.length)
          wx.showLoading({
            title: '上传中',
          })
          wx.cloud.uploadFile({
            cloudPath: new Date().valueOf() + "." + fix,
            filePath: path, // 文件路径
            success: res => {
              // get resource ID

              console.log(res)
              that.editorCtx.insertImage({
                src: res.fileID,
                width: '100%',
                success: function () {
                  console.log('insert image success')
                }
              })
            },
            fail: err => {
              // handle error
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        }
        

      }
    })
  },
  uploadProduct() {
    let product = this.data.product
    console.log(product)
    wx.showLoading({
      title: '上传中',
    })
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res)
        product.content=res.html
        product.createTime=new Date().valueOf
        product.inventory= product.sumInventory
        const db = wx.cloud.database()
        const productCollection = db.collection('product')
        productCollection.add(
          {data:product}
        ).then(()=>{
          wx.showToast({
            title: '上架成功',
          })
        }).catch((res)=>{
          console.log(res)
        })
      }
    })
  },
  uploadImage(path, goback) {

    let fix = path.substr(path.lastIndexOf('.') + 1, path.length)


    wx.cloud.uploadFile({

      cloudPath: new Date().valueOf() + "." + fix,
      filePath: path, // 文件路径
      success: res => {
        // get resource ID
        goback(res.fileID)
      },
      fail: err => {
        // handle error
      },
      complete: () => {
      }
    })
  }
})