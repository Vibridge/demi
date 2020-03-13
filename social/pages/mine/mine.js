Page({

  /**
   * 页面的初始数据
   */
  data: {
    icons:[
      {
        id:0,
        image:"../asset/img/all_order_icon.png",
        title:"全部订单"
      },
      {
        id: 1,
        image: "../asset/img/pay_order_icon.png",
        title: "待支付"
      },
      {
        id: 2,
        image: "../asset/img/deliver_order_icon.png",
        title: "待送货"
      },
      {
        id: 3,
        image: "../asset/img/extract_order_icon.png",
        title: "待提取"
      },
      {
        id: 4,
        image: "../asset/img/finish_order_icon.png",
        title: "已送达"
      },
    ],
    others:[
      {
        title:"收货地址"
      },
      {
        title:"浏览记录"
      },
      {
        title:"商务合作"
      }
    ]
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
        selected: 2
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