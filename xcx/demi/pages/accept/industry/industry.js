const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    industry_list:null,
    industry_id:[],
    industry_select:[],
    industry_item:null,
    length: 0,
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array_id = JSON.parse(options.id)
    var array_name = JSON.parse(options.name)
    if (array_name.length>0){
      this.setData({
        industry_id: array_id,
        industry_select: array_name,
        length: 1
      })
    }else{
      this.setData({
        industry_id: array_id,
        industry_select: array_name,
        length: 0
      })
    }
  },
  onShow(){
    common.http(util.baseUrl + '/labels?id=1025&mode=tree', "get", function (res) {
      this.setData({
        industry_list: res,
        loading:false
      })
    }.bind(this))
  },
  handleIndustry(event){
    var index = event.currentTarget.dataset.index;
    var name = event.currentTarget.dataset.name;
    var id = event.currentTarget.dataset.id;
    var array = this.data.industry_id
    var select_item = this.data.industry_select
    if(this.data.industry_id.length >= 3){
      console.log(this.data.industry_id)
      wx.showToast({
        title: "最多只能选三个",
        icon: 'none',
        duration: 2000
      })
    }else{
      array.push(id)
      select_item.push(name)
      var length = this.data.industry_id.length
      this.setData({
        industry_id: array,
        industry_item: id,
        industry_select: select_item,
        length: length
      })
    }
    if (this.data.industry_id.length === 3){
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      var id_array = this.data.industry_id
      var name_array = this.data.industry_select
      prevPage.setData({
        industry_id: id_array,
        industry_name: name_array
      });
      wx.navigateBack({
        delta: 1,
        success: function (res) { }
      })
    }
   
  },
  handleRemove(event) {
    var index = event.currentTarget.dataset.index;
    var id_list = this.data.industry_id
    var name_list = this.data.industry_select
    id_list.splice(index, 1); 
    name_list.splice(index,1);
    var length = id_list.length
    this.setData({
      industry_select: name_list,
      industry_id: id_list,
      length: length
    })
  }
})