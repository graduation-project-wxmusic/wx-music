// app.js
App({
  onLaunch: function () {
    this.checkUpate()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-8gde89ykd7916df3',
        traceUser: true,
      });
    }

    this.getOpenid()
    this.globalData = {
      playingMusicId: -1, // 正在播放的歌曲的ID
      openid: -1, // 用户openid
      avatarUrl: '', // 用户头像
      nickName: '', // 用户昵称
    };
  },

  setPlayMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },

  getPlayMusicId() {
    return this.globalData.playingMusicId
  },

  setUserInfo(openid) {
    wx.cloud.database().collection('user').where({
      _openid: openid,
    })
      .get()
      .then((res) => {
        const {
          data
        } = res
        if (data.length) {
          this.globalData.avatarUrl = data[0].avatarUrl
          this.globalData.nickName = data[0].nickName
        }
      })
  },

  getUserInfo() {
    const { avatarUrl, nickName } = this.globalData
    if (!nickName) {
      wx.navigateTo({
        url: '../login/login',
      })
    }
    return { avatarUrl, nickName }
  },

  getOpenid() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'getOpenId'
      }
    }).then((res) => {
      const openid = res.result.userInfo.openId
      this.globalData.openid = openid
      if (wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid, [])
      }
      this.setUserInfo(openid)
    })
  },

  checkUpate() {
    const updateManager = wx.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },
});
