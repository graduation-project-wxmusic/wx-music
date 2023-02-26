const getBlogList = require('./getBlogList/index')  // 获取云数据库中的博客列表
const getCommentList = require('./getCommentList/index')  // 获取云数据库中的博客评论列表

exports.main = async (event, context) => {
  switch (event.type) {
    case 'getBlogList':
      return await getBlogList.main(event, context)
    case 'getCommentList':
      return await getCommentList.main(event, context)
  }
}
