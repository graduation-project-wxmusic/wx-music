// pages/login/login.js

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },

  onConfirm() {
    const {
      avatarUrl,
      nickName
    } = this.data
    const openid = app.globalData.openid
    if (nickName.trim() == '') {
      wx.showModal({
        title: '昵称不能为空',
        content: '',
      })
      return
    }

    wx.cloud.uploadFile({
      cloudPath: 'user/' + openid + '.jpg',
      filePath: avatarUrl,
      success: (res) => {
        this.saveUser(res.fileID, nickName)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  saveUser(fileID, nickName) {
    wx.showLoading({
      title: '保存中',
      mask: true,
    })
    db.collection('user').add({
      data: {
        avatarUrl: fileID,
        nickName,
        createTime: db.serverDate(),
      }
    })
    .then(() => {
      app.globalData.avatarUrl = fileID
      app.globalData.nickName = nickName
    })
    .finally(() => {
      wx.hideLoading()
      wx.navigateBack({
        delta: 1
      })
    })
  }
})