const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const blogCollection = db.collection('blog')

exports.main = async (event, context) => {
  let blogId = event.blogId
  return await blogCollection.aggregate().match({
    _id: blogId
  }).lookup({
    from: 'blog-comment',
    localField: '_id',
    foreignField: 'blogId',
    as: 'commentList'
  }).end()
};
