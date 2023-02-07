// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const TcbRouter = require('tcb-router')
const axios = require('axios')
const BASE_URL = 'http://43.140.248.221:3000'

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

  app.router('musiclist', async (ctx, next) => {
    const res = await axios.get(`${BASE_URL}/playlist/detail?id=${event.playlistId}`)
    ctx.body = res.data
  })

  return app.serve()
}