//logs.js
const util = require('../../utils/util.js')
var common = require('../../utils/http.js')
const app = getApp()
Page({
  data: {
    id: null,
    login: false,
    task_info: null,
    select: null,
    title: null,
    loading:true,
    open:false
  },
  onLoad: function(options) {
    for (var i in options) {
      this.setData({
        id: options[i]
      })
    }
    console.log(options)
    

  },
  onShow(){
    common.http(util.baseUrl + '/api/task/info/' + this.data.id, "get", function (res) {
      console.log(res)
      this.setData({
        task_info: res,
        title: res.task_title,
        loading:false
      })
    }.bind(this))
  },
  //没有绑定手机号的情况
  onMyEvent: function(e) {
    // 自定义组件触发事件时提供的detail对象

    let login = e.detail.login;//登录components/login组件传递的参数
    let select = e.detail.select//登录components/login组件传递的参数
    this.setData({
      login: login,
    })
    let user_id = this.data.task_info.user.user_id
    let task_id = this.data.task_info.task_id
    let task_name = this.data.task_info.task_title
    let company_name = this.data.task_info.company.company_name
    let payment_money = this.data.task_info.payment_money
    let user_name = this.data.task_info.user.nickname
    let avatar = this.data.task_info.user.avatar

    if (select) {
      if (select === 1) {//点击的是“咨询”
        wx.navigateTo({
          url: "../IM/IM?user_id=" + user_id + "&task_id=" + task_id + "&company_name=" + company_name + "&payment_money=" + payment_money + '&user_name=' + user_name + '&avatar=' + avatar + '&task_name=' + task_name,
          success: function(res) {}
        })
      } else {//点击的是“申请”
        wx.navigateTo({
          url: "../accept/accept?task_id=" + task_id,
          success: function(res) {
            console.log(res)
          }
        })
      }
    }
  },

  //“咨询”
  chat: function(event) {
    let token = wx.getStorageSync('token')
    if (token) {
      if (event.detail.formId && event.detail.formId != "the formId is a mock one") {
        common.http(util.baseUrl + '/api/user/formid/create', 'post', function(res) {
          console.log(res)
        }, {
          formid: event.detail.formId
        }, token)
      }
    }
    let user_id = this.data.task_info.user.user_id
    let task_id = this.data.task_info.task_id
    let task_name = this.data.task_info.task_title
    let company_name = this.data.task_info.company.company_name
    let payment_money = this.data.task_info.payment_money
    let user_name = this.data.task_info.user.nickname
    let avatar = this.data.task_info.user.avatar
    console.log(app.globalData.data)
    if (app.globalData.data === null || !token || app.globalData.data.type == 2) {
      if (app.globalData.data.type == 2){
        wx.showToast({
          title: '当前身份不正确，请在app上切换为个人身份',
          icon:'none',
          duration:2000,
        })
      }
      this.setData({
        login: true,
        select: 1
      })
    } else {
      this.setData({
        login: false
      })
      wx.navigateTo({
        url: "../IM/IM?user_id=" + user_id + "&task_id=" + task_id + "&company_name=" + company_name + "&payment_money=" + payment_money + '&user_name=' + user_name + '&avatar=' + avatar + '&task_name=' + task_name + '&type=2',
        success: function(res) {
          console.log(res)
        }
      })
    }
  },

  note: function (event){
    let token = wx.getStorageSync('token')
    console.log(token)
    if (token) {
      if (event.detail.formId) {
        if (event.detail.formId != "the formId is a mock one") {
          common.http(util.baseUrl + '/api/user/formid/create', 'post', function (res) {
            console.log(res)
          }, {
              formid: event.detail.formId
            }, token)
        }
      }
    }
    this.setData({
      open:true
    })
  },
  close(event){
    let token = wx.getStorageSync('token')
    console.log(token)
    if (token) {
      if (event.detail.formId) {
        if (event.detail.formId != "the formId is a mock one") {
          common.http(util.baseUrl + '/api/user/formid/create', 'post', function (res) {
            console.log(res)
          }, {
              formid: event.detail.formId
            }, token)
        }
      }
    }
    this.setData({
      open: false
    })
  },
  //“申请”
  open: function(event) {
    let token = wx.getStorageSync('token')
    console.log(token)
    if (token) {
      if (event.detail.formId) {
        if (event.detail.formId != "the formId is a mock one") {
          common.http(util.baseUrl + '/api/user/formid/create', 'post', function(res) {
            console.log(res)
          }, {
            formid: event.detail.formId
          }, token)
        }
      }
    }

    let task_id = this.data.task_info.task_id
    if (!token || app.globalData.data.type == 2) {
      if (app.globalData.data.type == 2) {
        wx.showToast({
          title: '当前身份不正确，请在app上切换为个人身份',
          icon: 'none',
          duration: 2000,
        })
      }
      this.setData({
        open:false,
        login: true,
        select: 2
      })
    } else {
      this.setData({
        login: false,
        open: false,
      })
      wx.navigateTo({
        url: "../accept/accept?task_id=" + task_id,
        success: function(res) {
          console.log(res)
        }
      })
    }
  },
  
  //转发
  onShareAppMessage: function(res) {
    let title = this.data.task_info.task_title
    let img = this.data.task_info.company.logo_path
    let id = this.data.id
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: 'pages/ability_work/ability_work?id=' + id,
    }
  }
})
