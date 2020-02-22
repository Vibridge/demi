const util = require('../../utils/util.js')
const common = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    deliveryList:[],
    name:'',
    delivery_id:null,
    no:'',
    status:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.setData({
        id: options.id,
        status: options.status
      })
    }
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

    common.http(util.baseUrl + '/labels?id=1083', "get", function (res) {
      console.log(res)
      this.setData({
        deliveryList:res
      })
    }.bind(this), null, null)
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let array = this.data.deliveryList
    let name = array[e.detail.value].name
    let delivery_id = array[e.detail.value].label_id
    this.setData({
      name: name,
      delivery_id: delivery_id
    })
    // this.setData({
    //   index: e.detail.value
    // })
  },
  bindReplaceInput(e){
    this.setData({
      no: e.detail.value
    })
  },
  handleSumbit(){
    let token = wx.getStorageSync('token');
    if(this.data.no && this.data.name){
      if (this.data.status == 2){
        let data = {
          status: 6,
          logistics_label_id: this.data.delivery_id,
          logistics_no: this.data.no
        }
        common.http(util.baseUrl + '/api/order/update/' + this.data.id, "post", function (res) {
          console.log(res)
          if (res) {
            wx.navigateBack({
              delta: 1,
            })
          }
        }.bind(this), data, token)
      }else{
        let data = {
          status: 10,
          logistics_label_id: this.data.delivery_id,
          logistics_no: this.data.no
        }
        common.http(util.baseUrl + '/api/order/update/' + this.data.id, "post", function (res) {
          console.log(res)
          if (res) {
            wx.navigateBack({
              delta: 1,
            })
          }
        }.bind(this), data, token)
      }
      
    }else{
      wx.showToast({
        title: '请完善快递信息',
        icon: 'none',
        duration: 2000
      })
    }
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