const axios = require('axios')
const CONSTS = require('../CONSTS')

exports.main = async (event, context) => {
  const res = await axios.get(`${CONSTS.BASE_URL}/song/url/v1?id=${event.musicId}&level=standard`)
  return res.data
};
