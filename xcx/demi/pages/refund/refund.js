const common = require('../../utils/http.js')
const util = require('../../utils/util.js')
const app = getApp()
Component({
  data: {
    cancle:false,
    order:false,
    after:false,
    items: [
      { value: '不想买了' },
      { value: '信息填写错误，重新拍'},
      { value: '卖家缺货' },
      { value: '点错了' },
      { value: '其他原因' },
    ],
    afterSale:[
      { value: '不喜欢/不想要' },
      { value: '货物破损' },
      { value: '卖家发错货' },
      { value: '生产日期/保质与商品描述不符' },
      { value: '其他原因' },
    ],
    other:false,
    refund:'',
    msg:""
  },
  properties: {
    propA: null,
    propB:null,
    propC: null,
    propD: null,
  },
  methods: {
    initData() {
      var cancle = this.data.propB
      if (this.data.propB){
        this.setData({
          cancle: cancle
        })
      }
      if (this.data.propC){
        this.setData({
          order: this.data.propC
        })
      }
      if (this.data.propD) {
        this.setData({
          after: this.data.propD
        })
      }
    },
    
    backIndex() {
      var myEventDetail = {
        refund: false
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    bindTextAreaBlur: function (e) {
      console.log(e.detail.value)
      this.setData({
        msg: e.detail.value
      })
    },
    radioChange: function (event) {
      console.log('radio发生change事件，携带value值为：', event.currentTarget.dataset.value)
      if (event.currentTarget.dataset.value == "其他原因"){
        this.setData({
          other:true
        })
      }else{
        this.setData({
          other: false
        })
        this.setData({
          msg: event.currentTarget.dataset.value
        })
      }
    },

    handleSumbit(){
      if(this.data.msg){
        var myEventDetail = {
          msg: this.data.msg,
          refund:false,
          cancle:this.data.cancle,
          after: this.data.after
        } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myEventDetail, myEventOption)
      }
    }
  },
  lifetimes: {

    /**
     * 在组件实例进入页面节点树时执行
     */
    attached() {
      this.initData();
    },

    /**
     *  在组件实例被从页面节点树移除时执行
     */
    detached() { },
  },
})