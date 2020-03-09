//index.js
//获取应用实例
const app = getApp()
const height = wx.getSystemInfoSync().windowHeight
Page({
  data: {
    store_list:[
      { name: '士多店', id:1},
      { name: '奶茶店', id: 2 },
      { name: '药店', id: 3 },
      { name: '快餐店', id: 4 },
      { name: '宠物店', id: 5 },
    ],
    goods_list: [
      { name: '肉禽特价', id: 1 },
      { name: '水果特价', id: 2 },
      { name: '肉禽特价', id: 3 },
      { name: '水果特价', id: 4 },
      { name: '肉禽特价', id: 5 },
      { name: '肉禽特价', id: 6 },
      { name: '肉禽特价', id: 7 },
      { name: '肉禽特价', id: 8 },
    ],
    select_label:1,
    height: height,
    // sticky: false,
    activeTab: 0,
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    // this.setData({
    //   search: this.search.bind(this)
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow:function(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  //滚动条监听
  onPageScroll: function (e) {
    //console.log('page scroll')
  },

  handleSelectLabel(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      select_label:id
    })
  },

  handleStoreInfo(e){
    
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../order/order?id=' + id,
    })
    console.log(id);
  },

  // search: function (value) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
  //     }, 200)
  //   })
  // },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
  }
})
