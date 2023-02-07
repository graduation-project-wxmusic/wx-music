// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const TcbRouter = require('tcb-router')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .get()
      .then((res) => {
        return res
      })
  })

  return app.serve()
}