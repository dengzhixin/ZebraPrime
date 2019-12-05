// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
const _ = db.command
const collection = db.collection('product')
const pageSize = 4
exports.main = async (event, context) => {
  let page = event.page ? event.page : 1
  let skip = (page - 1) * pageSize
  let countResult = await collection.where({
    tags:_.nin(['积分商品'])
  }).count()
  let total = countResult.total
  let pageSum = Math.ceil(total / pageSize)
  let data

  if (page > pageSum) {
    data = null
  } else {
    data = await collection.where({
      tags: _.nin(['积分商品'])
    }).orderBy('createTime', 'desc').skip(skip).limit(pageSize).get()

  }

  return {
    data,
    total,
    pageSum
  }
}