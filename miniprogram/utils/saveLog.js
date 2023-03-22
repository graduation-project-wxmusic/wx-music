import actionMap from './actionMap'

module.exports = (actionid, actionType, custom) => {
  wx.cloud.callFunction({
    name: 'log',
    data: {
      actionid,
      actionType: actionMap[actionType],
      custom,
    }
  }).then((res) => {
    console.log('Log has been saved.', actionType)
  }).catch((err) => {
    console.log(err)
  })
}