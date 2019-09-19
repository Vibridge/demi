Page({

  /**
   * 页面的初始数据
   */
  data: {
    download:false
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "得米快找",
      path: 'pages/index/index',
    }
  }
})