const getPlayList = require('./getPlayList/index')  // 获取云数据库中的歌单列表
const getMusicList = require('./getMusicList/index')  // 获取接口中歌单的歌曲列表
const getMusicUrl = require('./getMusicUrl/index')  // 获取接口中歌曲的URL
const getMusicLyric = require('./getMusicLyric/index')  // 获取接口中歌曲的歌词

exports.main = async (event, context) => {
  switch (event.type) {
    case 'getPlayList':
      return await getPlayList.main(event, context)
    case 'getMusicList':
      return await getMusicList.main(event, context)
    case 'getMusicUrl':
      return await getMusicUrl.main(event, context)
    case 'getMusicLyric':
      return await getMusicLyric.main(event, context)
  }
}
