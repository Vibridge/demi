const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic_list:[],
    real_pic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = JSON.parse(options.array)
    this.setData({
      pic_list: array
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
    
  },

  chooseImg(){
    var that = this;
    var img = that.data.real_pic
    var length = img.length
    console.log(length)
    if (length >= 9){
      wx.showToast({
        title: '最多只能上传九张',
        icon: 'none',
        duration: 2000
      })
    }else{
      var num = 9 - length
      wx.chooseImage({
        count: num,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          var img_show = that.data.pic_list;
          let temp = tempFilePaths.length
          for (var i = 0; i < temp; i++) {
            img_show.push(tempFilePaths[i])
            wx.uploadFile({
              url: util.baseUrl + "/file/uploads",
              filePath: tempFilePaths[i],
              name: 'files',
              success: function (res) {
                if (res.statusCode === 200) {
                  var data = JSON.parse(res.data)
                  if (data.code === 200) {
                    if (data.data) {
                      var array = that.data.real_pic;
                      array.push(data.data[0])
                      that.setData({
                        real_pic: array
                      })
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
            });
          }
          that.setData({
            pic_list: img_show
          })
        }
      })
    }
    
  },
  handleRemove(event){
    var index = event.currentTarget.dataset.index;
    var pic_list = this.data.pic_list
    var real_pic = this.data.real_pic
    pic_list.splice(index, 1);
    real_pic.splice(index, 1);
    this.setData({
      pic_list: pic_list,
      real_pic: real_pic
    })
  },
  handlePic(){
    var array1 = this.data.real_pic
    var array2 = this.data.pic_list
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去

    prevPage.setData({
      pic_array: array1,
      pic_show_array: array2,
    });
    wx.navigateBack({
      delta: 1
    })
  }
})