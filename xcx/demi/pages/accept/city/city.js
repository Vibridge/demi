const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    province:null,
    city_list:null,
    second:false,
    province_item: null,
    city_item: null,
    real_city_list:null,
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    
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
    common.http(util.baseUrl + '/city/lists', "get", function (res) {
      var length = res.length;
      var city = [];
      var province = [];
      var first = {
        "city_name": '不限',
        "city_id": 0
      };
      city.push(first);
      province.push(first);
      for (var i = 0; i < length; i++) {
        if (res[i].level === 0) {
          province.push(res[i])
        }
        if (res[i].level === 1) {
          city.push(res[i])
        }
      }
      this.setData({
        province: province,
        city_list: city,
        loading:false
      })
    }.bind(this))
  },


  handleSecondCity: function (event){
    var index = event.currentTarget.dataset.index;
    var name = event.currentTarget.dataset.cityName;
    var id = event.currentTarget.dataset.id;
    var provice = this.data.province;
    var city = this.data.city_list;
    var second = this.data.second;
    var length = this.data.city_list.length;
    var real_city = [];
    let first = {
      "city_name": '不限',
      "city_id": 0,
    };
    if (index === 0) {
      real_city.push(first)
    } else {
      real_city = [];
    }
    for (var i = 1; i < length; i++) {
      if (city[i].name_relation[0] === name) {
        real_city.push(city[i])
      }
    }
    let muniCity = [{
      "city_name": '全' + name,
      "city_id": id
    }];
    let provice_length = provice.length
    if (index > 0) {
      if (provice[index].municipalities !== 0) {
        real_city = muniCity;
      }
    }
    if (real_city.length > 0) {
      second = true;
    }
    this.setData({
      real_city_list: real_city,
      second: second,
      province_item: index
    })
  },

  handleCity: function (event){
    var index = event.currentTarget.dataset.index;
    var name = event.currentTarget.dataset.cityName;
    var id = event.currentTarget.dataset.id;
    var province_item = this.data.province_item
    this.setData({
      city_item: index
    })

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
  
    prevPage.setData({
      city_id: id,
      city_name: name
    });
    wx.navigateBack({
      delta: 1
    })

  },

  handleSearch(e){
    console.log(e.detail.vue)
  }

})