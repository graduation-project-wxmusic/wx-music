const axios = require('axios')
const CONSTS = require('../CONSTS')

exports.main = async (event, context) => {
  const res = await axios.get(`${CONSTS.BASE_URL}/playlist/detail?id=${event.playlistId}`)
  return res.data
};
