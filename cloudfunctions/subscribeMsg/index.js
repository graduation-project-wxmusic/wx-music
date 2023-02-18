// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    console.log(event);
    cloud.openapi.subscribeMessage.send({
      touser: wxContext.OPENID,
      templateId: 'ezTl6CbGyqDRnS1fsfvnPefBHja2NGNnSavKhZIYc08',
      page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
      data: {
        phrase2: {
          value: '评论成功'
        },
        thing3: {
          value: event.content,
        }
      },
      miniprogramState: 'developer'
    })
  } catch (err) {
    console.log(err)
  }
}