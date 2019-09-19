const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    work_list: null,
    work_item:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    common.http(util.baseUrl + '/labels?id=1027&mode=tree', "get", function (res) {
      this.setData({
        work_list: res
      })
    }.bind(this))
    var id = parseInt(option.id)
    this.setData({
      work_item: id
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

  handleWork: function (event) {
    var index = event.currentTarget.dataset.index;
    var name = event.currentTarget.dataset.name;
    var id = event.currentTarget.dataset.id;
    this.setData({
      work_item: id
    })
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去

    prevPage.setData({
      work_id: id,
      work_name: name
    });
    wx.navigateBack({
      delta: 1
    })
  }
})