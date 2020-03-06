Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1Checked: true,
    select_edit:['','',''],
    address_items:[
      {
        id:0,
        type:'name',
        name:'收货人',
        placeholder:'姓名'
      },
      {
        id: 1,
        type: 'phone',
        name: '手机号',
        placeholder: ''
      },
      {
        id: 2,
        type: 'address',
        name: '详情地址',
        placeholder: ''
      }
    ],
    form:{
      name:'',
      phone:'',
      address:''
    }
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
    
  },

  switch1Change(){

  },

  handleInfo(e){
    let value = e.detail.value;
    let array = this.data.select_edit;
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    if (value){
      array[index] = type
    }else{
      array[index] = ''
    }
    if (type == 'name'){
      this.setData({
        "form.name": value,
        select_edit: array
      })
    } else if (type == 'phone'){
      this.setData({
        "form.phone": value,
        select_edit: array
      })
    } else if (type == 'address') {
      this.setData({
        "form.address": value,
        select_edit: array
      })
    }
  },

  handleClear(e){
    let array = this.data.select_edit;
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    array[index] = ''
    if (type == 'name') {
      this.setData({
        "form.name": "",
        select_edit: array
      })
    } else if (type == 'phone') {
      this.setData({
        "form.phone": "",
        select_edit: array
      })
    } else if (type == 'address') {
      this.setData({
        "form.address": "",
        select_edit: array
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