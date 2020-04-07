const common = require('../../../utils/http.js')
const util = require('../../../utils/util.js')
const app = getApp()
Component({
  data: {
    phone: null,
    time: 60,
    text: "获取验证码",
    yzm: "",
    select: null,
    user_id: null
  },
  properties: {
    propA: null,
    propB: null,
  },
  methods: {
    initData() {
      var select = this.data.propA
      this.setData({
        select: select,
        user_id: this.data.propB
      })
    },
    handlePhone: function(e) {
      this.setData({
        phone: e.detail.value
      })
    },
    getYzm() {
      var phone = this.data.phone
      if (this.data.phone !== null) {
        if (this.data.time === 60) {
          var that = this;
          var time = that.data.time
          common.http(util.baseUrl + "/sms/captcha", "post", function(res) {
            if (res) {
              wx.showToast({
                title: "发送成功",
                icon: 'none',
                duration: 2000
              });
              var timer = setInterval(function() {
                time = time - 1;
                that.setData({
                  time: time,
                  text: "[ " + time + " ]"
                })
                if (that.data.time === 0) {
                  clearInterval(timer)
                  that.setData({
                    time: 60,
                    text: "获取验证码"
                  })
                }
              }, 1000);
            }
          }.bind(this), {
            phone: phone,
            mode: 3
          })
        }
      } else {
        wx.showToast({
          title: "请输入手机号",
          icon: 'none',
          duration: 2000
        })
      }
    },
    handleYzm(e) {
      this.setData({
        yzm: e.detail.value
      })
    },
    handleSumbit(event) {
      var formid = null;
      if (event.detail.formId) {
        if (event.detail.formId != "the formId is a mock one") {
          formid = event.detail.formId
        }
      }
      var phone = this.data.phone
      var yzm = this.data.yzm
      if (!phone) {
        wx.showToast({
          title: "请输入手机号码",
          icon: 'none',
          duration: 2000
        });
      } else if (!yzm) {
        wx.showToast({
          title: "请输入验证码",
          icon: 'none',
          duration: 2000
        });
      } else {
        var select = this.data.select
        var data = {
          mode: "sms",
          phone: phone,
          captcha: yzm,
          agent: this.data.user_id,
          sign_id: app.globalData.sign_id,
        }
        if(formid){
          data.form_id = formid
        }
        common.http(util.baseUrl + '/api/login', "post", function(res) {
          var token = res.token
          app.globalData.data = res;
          app.globalData.userSig = res.usersig;
          wx.setStorage({
            key: "token",
            data: res.token
          })
          if (res.type === 0) {
            var that = this
            common.http(util.baseUrl + '/api/user/update', 'post', function(res) {
              console.log(res)
              var myEventDetail = {
                login: false,
                select: select
              } // detail对象，提供给事件监听函数
              var myEventOption = {} // 触发事件的选项
              that.triggerEvent('myevent', myEventDetail, myEventOption)
            }, {
              type: 1
            }, token)
          }
          if(select == 3){
            var myEventDetail = {
              login: false,
              select: select
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption)
          }else{
            if (res.type === 1) {
              var myEventDetail = {
                login: false,
                select: select
              } // detail对象，提供给事件监听函数
              var myEventOption = {} // 触发事件的选项
              this.triggerEvent('myevent', myEventDetail, myEventOption)
            }
            if (res.type === 2) {
              wx.showToast({
                title: '当前身份不正确，请在app切换成个人身份',
                icon: 'none',
                duration: 3000
              })
            }
          }
          

        }.bind(this), data)
      }
    },

    backIndex() {
      var myEventDetail = {
        login: false
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
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
    detached() {},
  },
})