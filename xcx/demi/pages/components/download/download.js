Component({
  data:{
    http:'http://produce.jmzhipin.com/download',
  },
  properties: {
    propB: null,
  },
  methods:{
    backIndex() {
      if(this.data.propB){
        wx.navigateBack({
          delta: 1
        })
      }else{
        var myEventDetail = {
          download: false
        } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myEventDetail, myEventOption)
      }
     
    },
    copy(){
      var url = this.data.http
      wx.setClipboardData({
        data: url,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      })
    }
  }
})