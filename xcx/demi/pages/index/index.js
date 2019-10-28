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
    over:0,
    to:null,
    total:null,
    img_level:null,
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
    this.handleList();
  },

  handleList(page){
    var img1 = this.data.img_level1;
    var img2 = this.data.img_level2;
    var img3 = this.data.img_level3;
    var img4 = this.data.img_level4;
    var task_list = this.data.task_list
    common.http(util.baseUrl + '/api/task/paginate?page=' + page, 'get', function (res) {
      console.log(res)
      if(res){
        wx.stopPullDownRefresh()
      }
      res.data.forEach(item => {
        var that = this
        if (4 <= item.company.reputation && item.company.reputation <= 10) {
          that.setData({
            level: 1,
            img_level: img1
          });
        }
        if (11 <= item.company.reputation && item.company.reputation <= 40) {
          that.setData({
            level: 2,
            img_level: img1
          });
        }
        if (41 <= item.company.reputation && item.company.reputation <= 90) {
          that.setData({
            level: 3,
            img_level: img1
          });
        }
        if (91 <= item.company.reputation && item.company.reputation <= 150) {
          that.setData({
            level: 4,
            img_level: img1
          });
        }
        if (151 <= item.company.reputation && item.company.reputation <= 250) {
          that.setData({
            level: 5,
            img_level: img1
          });
        }
        if (251 <= item.company.reputation && item.company.reputation <= 500) {
          that.setData({
            level: 1,
            img_level: img2
          });
        }
        if (501 <= item.company.reputation && item.company.reputation <= 1000) {
          that.setData({
            level: 2,
            img_level: img2
          });
        }
        if (1001 <= item.company.reputation && item.company.reputation <= 2000) {
          that.setData({
            level: 3,
            img_level: img2
          });
        }
        if (2001 <= item.company.reputation && item.company.reputation <= 5000) {
          that.setData({
            level: 4,
            img_level: img2
          });
        }
        if (5001 <= item.company.reputation && item.company.reputation <= 10000) {
          that.setData({
            level: 5,
            img_level: img2
          });
        }
        if (10001 <= item.company.reputation && item.company.reputation <= 20000) {
          that.setData({
            level: 1,
            img_level: img3
          });
        }
        if (20001 <= item.company.reputation && item.company.reputation <= 50000) {
          that.setData({
            level: 2,
            img_level: img3
          });
        }
        if (50001 <= item.company.reputation && item.company.reputation <= 100000) {
          that.setData({
            level: 3,
            img_level: img3
          });
        }
        if (100001 <= item.company.reputation && item.company.reputation <= 200000) {
          that.setData({
            level: 4,
            img_level: img3
          });
        }
        if (200001 <= item.company.reputation && item.company.reputation <= 500000) {
          that.setData({
            level: 5,
            img_level: img3
          });
        }
        if (500001 <= item.company.reputation && item.company.reputation <= 1000000) {
          that.setData({
            level: 1,
            img_level: img4
          });
        }
        if (1000001 <= item.company.reputation && item.company.reputation <= 2000000) {
          that.setData({
            level: 2,
            img_level: img4
          });
        }
        if (2000001 <= item.company.reputation && item.company.reputation <= 5000000) {
          that.setData({
            level: 3,
            img_level: img4
          });
        }
        if (5000001 <= item.company.reputation && item.company.reputation <= 10000000) {
          that.setData({
            level: 4,
            img_level: img4
          });
        }
        if (item.company.reputation > 1000000) {
          that.setData({
            level: 5,
            img_level: img4
          });
        }
        task_list.push(item)
        
      })
      this.setData({
        task_list: task_list,
        total: res.total,
        to: res.to
      })

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
    var to = this.data.to;
    var total = this.data.total;
    var over = this.data.over
    console.log(index)
    if (to < total){
      console.log(to < total)
      index++;
      this.setData({
        index: index,
        over: 0,
      })
      this.handleList(index)
    }else{
      if(over === 1){
        return true
      }else{
        var that = this;
        wx.showToast({
          title: '已加载全部',
          success: function () {
            that.setData({
              index: 1,
              over: 1,
            })
          }
        })
      }
    }
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})