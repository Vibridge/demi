const common = require('./utils/http.js')
const util = require('./utils/util.js')

//app.js
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var data, userSig;
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
          common.http(util.baseUrl + '/api/login', "post", function (res) {
            data = res;
            that.globalData.data = data;
            if (res.sign_id){
              that.globalData.sign_id = res.sign_id;
            }
            if (res.token) {
              wx.setStorage({
                key: "token",
                data: res.token
              })
            }
            if (res.usersig) {
              that.globalData.userSig = res.usersig;
            }
          }.bind(this), {
              mode: "xcx",
              captcha: code
          })
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

  globalData: {
    data:null,
    userSig:null,
    sign_id:null
  }
})