// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
const _ = db.command
const orderCollection = db.collection('order')
const userCollection = db.collection('user')
const cartCollection = db.collection('cart')
exports.main = async (event, context) => {


  /**、
   * 状态： 0 未付款 1 已付款 2 待发货 3 已发货  4 订单完成  5 退款中  6 关闭
   */
  event.addData.state = 1

  // 新建订单
  let addOrder = await orderCollection.add({
    data: event.addData
  })
  let addSumIntegral = 0
  event.addData.products.forEach((product) => {
    addSumIntegral += product.integral * product.num

    //删除购物车
    console.log(product)
    if (product.cardId) {
      cartCollection.doc(product.cardId).remove()
    }
  })
  // 更新用户积分
  let user = await userCollection.where({
    _openid: event.addData._openid
  }).get()

  let userInfo = {
    "integral": 0,
    "level": 1,
    "sumIntegral": 0,
    "_openid": event.addData._openid
  }
  if (user.data.length == 0) {
    await userCollection.add({
      data: userInfo
    })
  } else {
    userInfo = user.data[0]

  }
  userInfo.sumIntegral += addSumIntegral
  console.log("sumMaxDeduction",event.addData.sumMaxDeduction)
  userInfo.integral += addSumIntegral - event.addData.sumMaxDeduction
  console.log(userInfo.integral)
  userInfo.level = upgradeLevel(userInfo.sumIntegral)

  console.log(userInfo)
  let addUserIntegral = await userCollection.where({
    _openid: event.addData._openid
  }).update({
    data: {
      sumIntegral: userInfo.sumIntegral,
      integral: userInfo.integral,
      level: userInfo.level
    }
  })



  // let removeCard
  return {
    event, user, userInfo, addOrder, addUserIntegral
  }
}

function upgradeLevel(integral) {
  if (integral > 2400) {
    return 6
  } else if (integral > 1200) {
    return 5
  } else if (integral > 900) {
    return 4
  } else if (integral > 600) {
    return 3
  } else if (integral > 300) {
    return 2
  } else {
    return 1
  }
}