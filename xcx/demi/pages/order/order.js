const util = require('../../utils/util.js')
var common = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    select: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
    this.chat()
    this.orderList()
  },

  //没有绑定手机号的情况
  onMyEvent: function (e) {
    // 自定义组件触发事件时提供的detail对象
    console.log('a')
    let login = e.detail.login;//登录components/login组件传递的参数
    let select = e.detail.select//登录components/login组件传递的参数
    this.setData({
      login: login,
    })
  },

  //“咨询”
  chat: function (event) {
    console.log('aaa')
    let token = wx.getStorageSync('token')
    // if (token) {
    //   if (event.detail.formId && event.detail.formId != "the formId is a mock one") {
    //     common.http(util.baseUrl + '/api/user/formid/create', 'post', function (res) {
    //       console.log(res)
    //     }, {
    //         formid: event.detail.formId
    //       }, token)
    //   }
    // }
    // let user_id = this.data.task_info.user.user_id
    // let task_id = this.data.task_info.task_id
    // let task_name = this.data.task_info.task_title
    // let company_name = this.data.task_info.company.company_name
    // let payment_money = this.data.task_info.payment_money
    // let user_name = this.data.task_info.user.nickname
    // let avatar = this.data.task_info.user.avatar
    console.log(app.globalData.data)
    if (app.globalData.data === null || !token || app.globalData.data.type == 2) {
      if (app.globalData.data.type == 2) {
        wx.showToast({
          title: '当前身份不正确，请在app上切换为个人身份',
          icon: 'none',
          duration: 2000,
        })
      }
      this.setData({
        login: true,
        select: 3
      })
    } else {
      this.setData({
        login: false
      })
    }
  },
  orderList(){
    let token = wx.getStorageSync('token');
    console.log(token)
    let phone = app.globalData.data.phone
    common.http(util.baseUrl + '/api/order/paginate?contact_phone=' + phone, "get", function (res) {
      console.log(res)
    },null,token)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})