const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { start, count} = event
  const tagId = await db.collection('log')
    .where({
      openid: _.eq(openid),
      actionType: 1
    })
    .get()
    .then(res => {
      const { data } = res
      if (!data.length) {
        return 0
      }
      const tagCount = {}
      data.forEach(element => {
        const tagId = element.custom.tagId
        if (tagCount[tagId]) {
          tagCount[tagId]++
        } else {
          tagCount[tagId] = 1
        }
      });
      return Object.keys(tagCount).reduce((a, b) => tagCount[a] > tagCount[b] ? a : b)
    })

  return await cloud.database().collection('playlist')
    // .skip(event.start)
    // .limit(event.count)
    .get()
    // .then((res) => res)
    .then((res) => {
      const { data } = res
      if (tagId) {
        data.sort((a, b) => {
          if (a.tagId == tagId) {
            return -1
          }
          return 1
        })
      }
      res.data = data.slice(start, start + count)
      return res
    })
};
