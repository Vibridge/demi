const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:null,
    video_path:null,
    length:0,
    video_cover:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.video !== "null"){
      this.setData({
        video: options.video,
        length:1
      })
    }else{
      this.setData({
        video: options.video,
        length: 0
      })
    }
  },

  chooseVideo(){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 180,
      camera: 'back',
      success(res) {
        that.setData({
          video: res.tempFilePath,
          length: 1
        })
        var tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: util.baseUrl + "/file/uploads", //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'files',
          formData: {
            'type': 'video'
          },
          success(res) {
            if (res.statusCode === 200) {
              var data = JSON.parse(res.data)
              if (data.code === 200) {
                if (data.data) {
                  that.setData({
                    video_path: data.data
                  })
                  if(that.data.video_path !== null){
                    var pages = getCurrentPages();
                    var currPage = pages[pages.length - 1];   //当前页面
                    var prevPage = pages[pages.length - 2];  //上一个页面

                    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
                    console.log(that.data.video_cover)
                    prevPage.setData({
                      video_path: that.data.video_path[0],
                      show_video: that.data.video
                    });
                    wx.navigateBack({
                      delta: 1,
                      success: function (res) { }
                    })
                  }
                }
              } else {
                wx.showToast({
                  title: data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            } else {
              wx.showToast({
                title: "服务器不在状态",
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  }
})