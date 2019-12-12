Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#24BFFF",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/pages/asset/img/home@2x.png",
        selectedIconPath: "/pages/asset/img/home_active@2x.png",
        text: "首页"
      },
      {
        pagePath: "/pages/order/order",
        iconPath: "/pages/asset/img/indent@2x.png",
        selectedIconPath: "/pages/asset/img/indent_on@2x.png",
        text: "我的订单"
      }
    ]
  
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      let data = e.currentTarget.dataset
      const url = data.path;
      var that = this
      wx.switchTab(
        {
          url,
          success:function(res){
            that.setData({
              selected: data.index
            })
          }
        }
      )
      console.log()
      
    }
  }
})