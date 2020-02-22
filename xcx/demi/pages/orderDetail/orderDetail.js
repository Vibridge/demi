const util = require('../../utils/util.js')
var common = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    order_info:null,
    refund:false,
    msg:"",
    logistics:false,
    type:0,
    cancle:false,
    after:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      type: options.type
    })
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
    this.initialize()
  },
  initialize:function(){
    let token = wx.getStorageSync('token');
    common.http(util.baseUrl + '/api/order/info/' + this.data.id , "get", function (res) {
      console.log(res)
      this.setData({
        order_info: res
      })
    }.bind(this), null, token)
  },

  onMyEvent: function (e) {
    // 自定义组件触发事件时提供的detail对象
    let refund = e.detail.refund;//登录refund组件传递的参数
    let msg = e.detail.msg;
    let cancle = e.detail.cancle
    let after = e.detail.after
    this.setData({
      refund: refund,
    })
    if(msg){
      let data
      console.log(cancle)
      console.log(after)
      if (after) {
        data = {
          status: 7,
          msg: msg
        }
        this.handleChangeStatus(data)
      } else {
        if (!cancle) {
          if (msg) {
            data = {
              status: 9,
              msg: msg
            }
            this.handleChangeStatus(data)
          }
        } else {
          if (msg) {
            data = {
              status: 1,
              msg: msg
            }
            this.handleChangeStatus(data)
          }
        }
      }
    }
  },

  onMyLogistics(e){
    let logistics = e.detail.logistics;//登录refund组件传递的参数
    let isNess = e.detail.isNess
    this.setData({
      logistics: logistics,
    })
    let data
    if (isNess == 'true') {
      wx.navigateTo({
        url: '../delivery/delivery?id=' + this.data.id + "&status=" + this.data.order_info.status,
      })
    } else if (isNess == 'false'){
      if(this.data.type != 1){
        data = {
          status: 6
        }
        this.handleChangeStatus(data)
      }else{
        data = {
          status: 10
        }
        this.handleChangeStatus(data)
      }
    }
  },

  handleGoIm(event){
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;

    wx.navigateTo({
      url: '../IM/IM?type=4' + '&user_id=' + id + '&name=' + name + '&code=c'
    })
  },

  handleRefuse(event){
    let id = event.currentTarget.dataset.id;
    this.setData({
      refund:true
    })
  },

  handlePass(event){
    let status = event.currentTarget.dataset.status;
    let data;
    if(status == 7){
      data = {
        status: 8
      }
      this.handleChangeStatus(data)
    }else{
      data = {
        status: 11
      }
      this.handleChangeStatus(data)
    }
  
  },

  handleDelivery(event){
    this.setData({
      logistics:true
    })
  },

  handleChangeStatus(data){
    let token = wx.getStorageSync('token');
    common.http(util.baseUrl + '/api/order/update/' + this.data.id, "post", function (res) {
      console.log(res)
      if (res) {
        this.initialize()
      }
    }.bind(this), data, token)
  },

  handleCancle(event){
    let status = event.currentTarget.dataset.status;
    let data;
    if(status == 0){
      data = {
        status:1
      }
      this.handleChangeStatus(data)
    }else{
      this.setData({
        refund:true,
        cancle:true
      })
    }
  },

  handleOver(){
    let data = {
      status:12
    }
    this.handleChangeStatus(data)
  },

  handleAfterSale(){
    this.setData({
      after:true,
      refund:true
    })
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