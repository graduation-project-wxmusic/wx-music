const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  return await cloud.database().collection('playlist')
    .skip(event.start)
    .limit(event.count)
    .get()
    .then((res) => res)
};
