const axios = require('axios')
const CONSTS = require('../CONSTS')

exports.main = async (event, context) => {
  const res = await axios.get(`${CONSTS.BASE_URL}/lyric?id=${event.musicId}`)
  return res.data
};
