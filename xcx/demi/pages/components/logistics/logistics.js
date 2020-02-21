const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')
const app = getApp()
Component({
  data: {
    cancle: false,
    items: [
      { value: 'false', name:'无需物流配送'},
      { value: 'true', name:'使用物流配送', checked: 'true' },
    ],
    isNess: true,
  },
  properties: {
    propA: null,
    propB: null,
  },
  methods: {
    initData() {
      var cancle = this.data.propB
      if (this.data.propB) {
        this.setData({
          cancle: cancle
        })
      }
    },

    backIndex() {
      var myEventDetail = {
        logistics: false
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },

    radioChange: function (event) {
      console.log('radio发生change事件，携带value值为：', event.currentTarget.dataset.value)
      this.setData({
        isNess: event.currentTarget.dataset.value
      })
    },

    handleSumbit() {
      if (this.data.isNess) {
        var myEventDetail = {
          isNess: this.data.isNess,
          logistics: false
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