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
    choose: 'all',
    orderList:[],
    type:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onlogin()
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
    let choose = this.data.choose;
    if (choose === 'pay') {
      this.orderList(2)
    } else if (choose === 'unpay') {
      this.orderList(0)
    } else if (choose === 'service') {
      let array = [8, 11, 12]
      this.orderList(array)
    } else {
      this.orderList(null)
    }
    
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
  handleOrderDetail: function (event){
    console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id=' + event.currentTarget.dataset.id,
    })
  },

  
  onlogin: function (event) {
    let token = wx.getStorageSync('token')
    if (app.globalData.data === null || !token) {
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
  orderList(status){
    // let token = wx.getStorageSync('token');
    let token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAuam16aGlwaW4uY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNTgyMzAwODcxLCJleHAiOjE1ODIzMDA5MzEsIm5iZiI6MTU4MjMwMDg3MSwianRpIjoiZ0NjU2lYeXg3V1dBS2tGYyIsInN1YiI6MywicHJ2IjoiMWQyMDQyOGRlNGU5NTlhZDkxMjcwZjkyNjZjMTNhMmYwZDAyMDUxMiJ9.Kocm4a6JdqJWvhYyfw2HF-7qFqgjruoddL3KBIZG4LA";

    console.log(app.globalData.data.user_id)
    let phone = app.globalData.data.phone;
    // this.setData({
    //   type: app.globalData.data.type
    // })
    if(status != null){
      console.log(typeof status)
      common.http(util.baseUrl + '/api/order/paginate?user_id=3' + '&per_page=11111111' + '&status=' +status, "get", function (res) {
        console.log(res)
        this.setData({
          orderList: res.data
        })
      }.bind(this), null, token)
    }else{
      common.http(util.baseUrl + '/api/order/paginate?user_id=3' + '&per_page=11111111', "get", function (res) {
        console.log(res)
        this.setData({
          orderList: res.data
        })
      }.bind(this), null, token)
    }
  },

  handleSelect(e){
    let choose = e.currentTarget.dataset.active;
    this.setData({
      choose:choose
    });
    if (choose === 'pay'){
      this.orderList(2)
    } else if (choose === 'unpay'){
      this.orderList(0)
    } else if (choose === 'service'){
      this.orderList(8,11,12)
    }else{
      this.orderList(null)
    }
  },

  //“咨询”
  chat: function (event) {
    let token = wx.getStorageSync('token')
    if (token) {
      if (event.detail.formId && event.detail.formId != "the formId is a mock one") {
        common.http(util.baseUrl + '/api/user/formid/create', 'post', function (res) {
          console.log(res)
        }, {
            formid: event.detail.formId
          }, token)
      }
    }
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    if (app.globalData.data === null || !token) {
      this.setData({
        login: true,
        select: 1
      })
    } else {
      this.setData({
        login: false
      })
      wx.navigateTo({
        url: '../IM/IM?type=4' + '&user_id=' + id + '&name=' + name + '&code=b'
      })
    }
  },

  handleCancle(event){
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    // let token = wx.getStorageSync('token');
    let token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAuam16aGlwaW4uY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNTgyMzAwODcxLCJleHAiOjE1ODIzMDA5MzEsIm5iZiI6MTU4MjMwMDg3MSwianRpIjoiZ0NjU2lYeXg3V1dBS2tGYyIsInN1YiI6MywicHJ2IjoiMWQyMDQyOGRlNGU5NTlhZDkxMjcwZjkyNjZjMTNhMmYwZDAyMDUxMiJ9.Kocm4a6JdqJWvhYyfw2HF-7qFqgjruoddL3KBIZG4LA";
    let data;
    if(status == 0){
      data = {
        status: 1
      }
    }else{
      data = {
        status: 4
      }
    }
    common.http(util.baseUrl + '/api/order/update/' + id, "post", function (res) {
      console.log(res)
      if(res){
        let choose = this.data.choose;
        if (choose === 'pay') {
          this.orderList(2)
        } else if (choose === 'unpay') {
          this.orderList(0)
        } else if (choose === 'service') {
          this.orderList(8, 11, 12)
        } else {
          this.orderList(null)
        }
      }
    }.bind(this), data, token)
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