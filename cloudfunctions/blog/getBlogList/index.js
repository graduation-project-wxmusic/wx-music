const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const blogCollection = db.collection('blog')

exports.main = async (event, context) => {
  const keyword = event.keyword
  let w = {}
  if (keyword && keyword.trim() !== '') {
    w = {
      content: new db.RegExp({
        regexp: keyword,
        options: 'i'
      })
    }
  }
  return await blogCollection.where(w)
    .skip(event.start)
    .limit(event.count)
    .orderBy('createTime', 'desc')
    .get()
    .then((res) => res)
};
