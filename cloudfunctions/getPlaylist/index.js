// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const playlistCollection = db.collection('playlist')

const axios = require('axios')
const URL = 'http://43.140.248.221:3000/style/playlist?tagId=1000'

// 云函数入口函数
exports.main = async (event, context) => {
  const { status, statusText, data } = await axios.get(URL)
  if (status !== 200) {
    console.log(statusText)
    return
  }
  const { playlist, page } = data.data
  const { data: list } = await playlistCollection.get()
  const newData = deduplication(playlist, list)

  if (newData.length) {
    await playlistCollection.add({
      data: [...newData]
    }).then((res) => {
      console.log('插入成功', res)
    }).then((err) => {
      console.log('插入失败', err)
    })
  }
  return newData.length
}

/**
 * 返回不在arr2中的arr1元素
 * @param {array: [{id: number}]} arr1 
 * @param {array: [{id: number}]} arr2 
 */
function deduplication(arr1 = [], arr2 = []) {
  return arr1.filter(p => {
    for (let i = 0; i < arr2.length; i++) {
      if (p.id === arr2[i].id) return false
    }
    return true
  })
}