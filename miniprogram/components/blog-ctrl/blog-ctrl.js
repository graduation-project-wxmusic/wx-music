// components/blog-ctrl/blog-ctrl.js

let userInfo = {}
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object,
  },

  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],

  /**
   * 组件的初始数据
   */
  data: {
    loginShow: false,
    modalShow: false,
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment() {
      // 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true,
                })
              }
            })
          } else {
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },

    onLoginsuccess(event) {
      userInfo = event.detail
      // 授权框消失，评论框显示
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true,
        })
      })
    },

    onLoginfail() {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },

    onInput(event) {
      this.setData({
        content: event.detail.value
      })
    },

    onSend() {
      // 插入数据库
      let content = this.data.content
      console.log(content);
      if (content.trim() == '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '评论中',
        mask: true,
      })
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) => {
        // 推送订阅消息
        wx.cloud.callFunction({
          name: 'subscribeMsg',
          data: {
            content,
            blogId: this.properties.blogId
          }
        }).then((res) => {
          wx.showToast({
            title: '评论成功',
          })
        })
        this.setData({
          modalShow: false,
          content: '',
        })
        // 父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      }).finally(() => {
        wx.hideLoading()
      })
    },
    // 调起客户端小程序订阅消息界面
    subscribeMsg() {
      const tmplId = 'ezTl6CbGyqDRnS1fsfvnPefBHja2NGNnSavKhZIYc08'
      wx.requestSubscribeMessage({
        tmplIds: [tmplId],
        success: (res) => {
          if (res[tmplId] === 'accept') {
            this.onComment()
          } else {
            wx.showToast({
              icon: 'none',
              title: '订阅失败，无法评论',
            })
          }
        }
      })
    },
  }
})
