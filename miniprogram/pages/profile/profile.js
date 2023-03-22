// pages/profile/profile.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
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
    const {
      avatarUrl,
      nickName
    } = app.getUserInfo()
    this.setData({
      avatarUrl,
      nickName,
    })
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

  onTapQrCode() {
    wx.showLoading({
      title: '生成中',
    })
    wx.cloud.callFunction({
      name: 'getQrCode'
    }).then((res) => {
      const fileId = res.result
      wx.previewImage({
        urls: [fileId],
        current: fileId
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },
})