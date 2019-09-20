const util = require('../../utils/util.js')
var common = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    ability_info:null,
    download:false,
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id;
    for (var i in options) {
      id = options[i]
      this.setData({
        id: id
      })
    }
    
  },
  onShow(){
    common.http(util.baseUrl + '/api/ability/info/' + this.data.id, "get", function (res) {
      console.log(res)
      this.setData({
        ability_info: res,
        loading:false
      })
    }.bind(this))
  },
  onMyEvent: function (e) {
    var download = e.detail.download;
    this.setData({
      download: download
    })

  },
  launchAppError(e) {
    console.log(e.detail.errMsg)
    wx.showToast({
      title: '未检测到相关的app，请确认是否已经安装',
      duration: 2000,
      icon: 'none'
    })
    this.setData({
      download: true
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var title = this.data.task_info.task_title
    var img = this.data.task_info.company.logo_path
    var id = this.data.id
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: title,
      path: 'pages/ability_info/ability_info?id=' + id,
    }
  }
})