//index.js
const util = require('../../utils/util.js')
const common = require('../../utils/http.js')
const tim = require('../../utils/im.js')
const TIM = require('../../utils/im.js').TIM
const COS = require('../../utils/im.js').COS

//获取应用实例
const app = getApp()
Page({
  data: {
    nodes: [{
      name: 'ul',
      attrs: {
        class: 'label',
      },
      children: [{
          name: 'li',
          attrs: {
            class: 'label_li',
          },
          children: [{
            type: 'text',
            text: "即结"
          }]
        },
        {
          name: 'li',
          attrs: {
            class: 'label_li',
          },
          children: [{
            type: 'text',
            text: "签合同"
          }]
        },
      ]
    }],
    scrollTop: 0,
    company_name: null,
    task_name: null,
    userID: null,
    task_username: null,
    task_avatar: null,
    moeny: null,
    task_id: null,
    userSig: null,
    message: [],
    nextReqMessageID: null,
    over: null,
    value: '',
    bigImg_url: null,
    bigImg: false,
    show: false,
    height: 0,
    loading: true,
    type:2,
    commisson:null,
    name:'',
    code:'b'
  },
  onLoad: function(option) {
    if(option.type == 2){
      this.setData({
        userID: option.user_id,
        company_name: option.company_name,
        task_id: option.task_id,
        task_username: option.user_name,
        moeny: option.payment_money,
        task_avatar: option.avatar,
        task_name: option.task_name,
        type:option.type,
        commisson: option.commission
      })
    }else{
      if (option.name){
        this.setData({
          userID: option.user_id,
          name: option.name,
          type: option.type,
          code: option.code
        })
      }
    }
  },

  onShow: function() {
    // 页面出现在前台时执行
    this.login();
  },

  login() {
    var that = this
    var id;
    if(this.data.code === 'b'){
      id = app.globalData.data.user_id + 'a'
    }else{
      id = app.globalData.data.user_id + 'b'
    }
    var userSig = app.globalData.userSig
    var token = wx.getStorageSync('token');
    //im登录
    tim.tim.login({
      userID: id, //登录人账号
      userSig: userSig
    }).then(function(imResponse) {
      var name = null
      tim.tim.on(TIM.EVENT.SDK_READY, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 login 等 API
        // event.name - TIM.EVENT.SDK_READY
        name = event.name
        if (name) {
          if (that.data.type == 2) {
            var item = {
              recipient: that.data.userID, //聊天对象id
              foreign_key: that.data.task_id, //创建对话详情的任务id
              type: that.data.type
            }
          } else {
            var item = {
              account: that.data.userID + that.data.code, //聊天对象id
              type: that.data.type
            }
          }
          common.http(util.baseUrl + '/converse/create', "post", function(res) { //创建对话详情
            var chat = "C2C" + that.data.userID + that.data.code //聊天对象账号
            //获取某会话的消息列表
            tim.tim.getMessageList({
              conversationID: chat, //会话 ID
              count: 15 //需要拉取的消息数量，最大值为15
            }).then(function(imResponse) {
              const messageList = imResponse.data.messageList; // 消息列表。
              const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
              const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
              messageList.forEach(item => {
                if (typeof item.time === 'number') {
                  item.time = util.formatTimeTwo(item.time, 'Y/M/D h:m:s')
                }
              }) //时间格式转换，用于页面渲染时

              //实时接受消息
              tim.tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
                // event.data - 存储 Message 对象的数组 - [Message]
                event.data.forEach(item => {
                  if (typeof item.time === 'number') {
                    item.time = util.formatTimeTwo(item.time, 'Y/M/D h:m:s')
                  }
                }) //时间格式转换，用于页面渲染时
                messageList.push(event.data[0])
                let newLength = messageList.length;
                that.setData({
                  message: messageList,
                  scrollTop: 1000 * newLength //键盘出现时将输入框顶起
                })
              }.bind(that));
              var length = messageList.length;
              that.setData({
                nextReqMessageID: nextReqMessageID,
                message: messageList,
                over: imResponse.data.isCompleted,
                scrollTop: 1000 * length,
                loading: false
              })
            }.bind(that));
            //将某会话下的未读消息状态设置为已读
            tim.tim.setMessageRead({
              conversationID: chat
            });
          }, item, token)
        }
      });


    }.bind(that)).catch(function(imError) {
      console.log(imError)
    });
  },


  //键盘出现时，输入框顶上的高度
  handleHight(e) {
    this.setData({
      height: e.detail.height
    })
  },

  //键盘收起时，输入框恢复
  clearHeight() {
    this.setData({
      height: 0
    })
  },

  //输入框值
  handleValue(e) {
    this.setData({
      value: e.detail.value
    })
  },

  //发送消息
  handleSend(event) {
    //formid
    var token = wx.getStorageSync('token')
    if (event.detail.formId) {
      if (event.detail.formId != "the formId is a mock one") {
        common.http(util.baseUrl + '/api/user/formid/create', 'post', function(res) {
          console.log(res)
        }, {
          formid: event.detail.formId
        }, token)
      }
    }

    var value = event.currentTarget.dataset.value
    var recipient = this.data.userID + this.data.code
    //发送消息
    let message = tim.tim.createTextMessage({
      to: recipient, //对象
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: value
      }
    });
    // 2. 发送消息
    tim.tim.sendMessage(message).then(function(imResponse) {
      // 发送成功
      var array = this.data.message;
      imResponse.data.message.time = util.formatTimeTwo(imResponse.data.message.time, 'Y/M/D h:m:s'); //时间格式转换，用于页面渲染时
      array.push(imResponse.data.message)
      this.setData({
        message: array,
        value: '',
        scrollTop: array.length * 1000
      })
    }.bind(this)).catch(function(imError) {
      // 发送失败
      var error = imError
      wx.showToast({
        title: error,
        duration: 2000,
        icon: "none"
      })
    });
  },

  //加载更多历史消息
  handleMes() {
    var nextReqMessageID = this.data.nextReqMessageID
    var over = this.data.over
    var that = this
    if (over === 0) {
      var recipient = that.data.userID
      var chat = "C2C" + recipient + that.data.code
      tim.tim.getMessageList({
        conversationID: chat,
        nextReqMessageID,
        count: 15
      }).then(function(imResponse) {
        var message = that.data.message
        const messageList = imResponse.data.messageList; // 消息列表。
        const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
        const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
        messageList.forEach(item => {
          item.time = util.formatTimeTwo(item.time, 'Y/M/D h:m:s')
        })
        for (let i in message) {
          messageList.push(message[i])
        }
        if (nextReqMessageID) {
          that.setData({
            nextReqMessageID: nextReqMessageID,
            message: messageList,
            over: isCompleted
          })
        }
      }).catch(function(IMError) {
        console.log(IMError)
      });
      console.log(that.data.message)
    }
  },

  //下拉刷新
  lower: function(e) {
    this.handleMes()
  },

  //图片点击放大
  handleBigImage(event) {
    var url = event.currentTarget.dataset.url;
    this.setData({
      bigImg: true,
      bigImg_url: url
    })
  },

  //返回上个页面
  backIndex() {
    this.setData({
      bigImg: false
    })
  },


  onHide: function() {
    // 页面从前台变为后台时执行
    this.loginout();
  },
  onUnload: function() {
    // 页面销毁时执行
    this.loginout();
  },

  //退出im
  loginout() {
    let promise = tim.tim.logout();
    promise.then(function(imResponse) {
      console.log(imResponse.data); // 登出成功
    }).catch(function(imError) {
      console.warn('logout error:', imError);
    });
  }
})