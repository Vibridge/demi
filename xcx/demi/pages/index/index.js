const util = require('../../utils/util.js')
const common = require('../../utils/http.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_list:[],
    index:1,
    level:1,
    // over:0,
    // to:null,
    // total:null,
    // img_level:null,
    img_level1:'../asset/img/x.png',
    img_level2: '../asset/img/z.png',
    img_level3: '../asset/img/mission3@2x.png',
    img_level4: '../asset/img/star_level@2x.png',
  
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
    this.setData({
      index:1,
      level:1,
      img_level: null,
      task_list:[]
    })
    this.handleList(1);
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  
  },

  handleList(page){
    var current_page = 0;
    var last_page = 0;
    
    var task_list = this.data.task_list
    common.http(util.baseUrl + '/api/task/paginate?page=' + page, 'get', function (res) {
      if(res){
        current_page = res.current_page;
        last_page = res.last_page
        wx.stopPullDownRefresh();
        if (current_page < last_page){
          res.data.forEach(item => {
            item.level = this.handleStar(item.company.reputation)
            task_list.push(item)
          })
          this.setData({
            task_list: task_list,
            // total: res.total,
            // to: res.to
          })
        }else{
          wx.showToast({
            title: '已加载全部'
          })
          // var over = this.data.over;
          // if (over === 1) {
          //   return true
          // } else {
          //   var that = this;
          //   wx.showToast({
          //     title: '已加载全部',
          //     success: function () {
          //       that.setData({
          //         index: 1,
          //         over: 1,
          //       })
          //     }
          //   })
          // }
        }
        
      }
    }.bind(this))
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
  // onPullDownRefresh: function () {
  //   this.handleList(1)
  //   this.setData({
  //     index:1
  //   })
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var index = this.data.index;
    // var to = this.data.to;
    // var total = this.data.total;
    // var over = this.data.over;
    index++;
    console.log(index)
    this.setData({
      index: index,
      // over: 0,
    })
    this.handleList(index)
  },


  handleDetail(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ability_work/ability_work?id=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  handleStar(socal){
    var level = 0;
    if ((4 <= socal && socal <= 10) || (251 <= socal && socal <= 500) || (10001 <= socal && socal <= 20000) || (500001 <= socal && socal <= 1000000)) {
      level = 1
    }
    if ((11 <= socal && socal <= 40) || (501 <= socal && socal <= 1000) || (20001 <= socal && socal <= 50000) || (1000001 <= socal && socal <= 2000000) ){
      level = 2
    }
    if ((41 <= socal && socal <= 90) || (1001 <= socal && socal <= 2000) || (50001 <= socal && socal <= 100000) || (2000001 <= socal && socal <= 5000000)){
      level = 3
    }
    if ((91 <= socal && socal <= 150) || (2001 <= socal && socal <= 5000) || (100001 <= socal && socal <= 200000) || (5000001 <= socal && socal <= 10000000)) {
      level = 4
    }
    if ((151 <= socal && socal <= 250) || (5001 <= socal && socal <= 10000) || (200001 <= socal && socal <= 500000) || (socal > 1000000)) {
      level = 5
    }
    return level
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})