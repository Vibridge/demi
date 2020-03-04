Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#333333",
    backgroundColor: "#ffffff",
    list: [
      {
        "pagePath": "../index/index",
        "iconPath": "../pages/asset/img/index_nav.png",
        "selectedIconPath": "../pages/asset/img/index_nav_in.png",
        "text": "首页"
      },
      {
        "pagePath": "../logs/logs",
        "iconPath": "../pages/asset/img/index_nav.png",
        "selectedIconPath": "../pages/asset/img/index_nav_in.png",
        "text": "店铺"
      },
      {
        "pagePath": "../shopCar/shopCar",
        "iconPath": "../pages/asset/img/index_nav.png",
        "selectedIconPath": "../pages/asset/img/index_nav_in.png",
        "text": "购物车"
      },
      {
        "pagePath": "../logs/logs",
        "iconPath": "../pages/asset/img/index_nav.png",
        "selectedIconPath": "../pages/asset/img/index_nav_in.png",
        "text": "我的"
      }
    ]
  
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
    // switchTab(e) {
    //   let data = e.currentTarget.dataset
    //   const url = data.path;
    //   var that = this
    //   wx.switchTab(
    //     {
    //       url,
    //       success:function(res){
    //         that.setData({
    //           selected: data.index
    //         })
    //       }
    //     }
    //   )
    //   // wx.requestSubscribeMessage({
    //   //   tmplIds: ['eMN2ccAlUBVWEjE0-AokV9wARlUncKBnZd9eSHjAgOg'],
    //   //   success(res) {
    //   //     console.log(res)
    //   //    }
    //   // })
    // }
  }
})