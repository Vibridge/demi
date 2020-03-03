//获取应用实例
const app = getApp();
var timer = false;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    page: 1,
    pois: []
  },
  //返回按钮
  BackTap: function (e) {
    // console.log(this.data.lists[e.currentTarget.dataset.item])
    app.globalData.addAddr = []
    app.globalData.addAddr.push(this.data.pois[e.currentTarget.dataset.item])
    wx.navigateBack({
      delta: 1
    })
  },
  BackTap2: function (e) {
    // console.log(this.data.lists[e.currentTarget.dataset.item])
    app.globalData.addAddr = []
    wx.navigateBack({
      delta: 1
    })
  },
  backTap3: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: '2ZDBZ-VEP64-3WUUZ-D6L46-6RCKO-KIBQO'
    });
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined  表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false  表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true  表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
                vm.BackTap2()
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                      vm.BackTap2()
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res), '获得经纬度')
        var latitude = res.latitude
        var longitude = res.longitude
        vm.setData({
          latitude: latitude,
          longitude: longitude
        })
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        vm.BackTap2()
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    wx.showLoading({
      title: '加载中',
    })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      coord_type: 1,
      get_poi: 1,
      poi_options: 'page_size=20;page_index=' + vm.data.page + ';category=房地产,住宅区',
      success: function (res) {
        console.log(res, '地理位置');
        wx.hideLoading()
        let pois = res.result.pois
        vm.setData({
          pois: vm.data.pois.concat(pois),
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  //根据坐标查询位置
  bindInputSchool(e) {
    var val = e.detail.value;
    let vm = this
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (val.length > 0) {
        qqmapsdk.getSuggestion({
          keyword: val, //搜索关键词
          policy:1,
          location: vm.data.latitude + ',' +  vm.data.longitude,
          page_size: 20,
          filter: "category=房地产,住宅区",
          success: function (res) {
            console.log(res);
            let pois = res.data
            vm.setData({
              pois: pois,
            })
          },
          complete:function(res){
            console.log(res);
          }
        });
      } else {

        vm.setData({
          pois: [],
        })
        vm.getLocal(vm.data.latitude, vm.data.longitude)
      }

    }, 500);
  },
  onReachBottom: function () {
    let vm = this;
    vm.setData({
      page: vm.data.page + 1
    })
    vm.getLocal(vm.data.latitude, vm.data.longitude)
  },
})