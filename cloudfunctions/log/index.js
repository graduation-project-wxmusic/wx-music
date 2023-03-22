// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const logCollection = db.collection('log')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { actionid, actionType, custom } = event

  return await logCollection.add({
    data: {
      openid,
      actionid,
      actionType,
      createTime: db.serverDate(),
      custom,
    }
  });
}