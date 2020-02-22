const util = require('../../utils/util.js')
const app = getApp()
var common = require('../../utils/http.js')
Page({
  data: {
    login: false,
    accept: false,
    task_id: null,
    cursor: 0,
    avatar:'../asset/img/camera@2x.png',
    real_avatar:null,
    sex:1,
    name:null,
    city_id: null,
    city_name: "选择城市",
    work_id: null,
    work_name: "选择任务类型",
    industry_id: [],
    industry_name: [],
    industry: "选择行业",
    length: 0,
    des: null,
    pic_array: [],
    pic_show_array: [],
    pic: "上传图片作品",
    video_path: null,
    show_video: null,
    video: "上传视频简历",
    download:false,
  },
  onLoad: function(option) {
    console.log(option)
    this.setData({
      task_id: option.task_id
    })
    if (app.globalData.data.ability_count < 1) {
      this.setData({
        login: true,
        accept: false
      })
    } else {
      this.handleTask();
      this.setData({
        login: false,
        accept: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */

  //各个注册页面传递的参数渲染
  onShow() {
    var name = this.data.industry_name
    var img_array = this.data.pic_array
    var industry = this.data.industry
    var vid = this.data.video_path
    if (name.length > 0) {
      this.setData({
        industry: '已选择'
      })
    } else {
      this.setData({
        industry: '选择行业'
      })
    }
    if (img_array.length > 0) {
      this.setData({
        pic: '已上传'
      })
    } else {
      this.setData({
        pic: '上传图片作品'
      })
    }
    if (vid !== null) {
      this.setData({
        video: '已上传'
      })
    } else {
      this.setData({
        video: '上传视频简历'
      })
    }
  },

  //发布简历
  setAbility() {
    this.setData({
      login: false,
      accept: false
    })
  },

  //上传头像
  handleAvatar(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          avatar: tempFilePaths[0]
        })
        console.log(that.data.avatar)
        wx.uploadFile({
          url: util.baseUrl + "/file/uploads",
          filePath: tempFilePaths[0],
          name: 'files',
          success(res) {
            if (res.statusCode === 200) {
              var data = JSON.parse(res.data)
              if (data.code === 200) {
                if (data.data) {
                  var avatar = data.data;
                  that.setData({
                    real_avatar: avatar[0]
                  })
                }
              } else {
                wx.showToast({
                  title: data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            } else {
              wx.showToast({
                title: "服务器不在状态",
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },

  //选择性别
  handleSex(event){
    var sex = parseInt(event.currentTarget.dataset.sex);
    this.setData({
      sex:sex
    })
  },

  //姓名
  handleName(e){
    this.setData({
      name:e.detail.value
    })
  },

  //已经上传或选择时再次点击应将数据传递

  //跳转选择城市
  GoToCity() {
    wx.navigateTo({
      url: "./city/city",
      success: function(res) {
        console.log(res)
      }
    })
  },

  //跳转选择职业
  GoToWork() {
    var work_id = this.data.work_id
    var work_name = this.data.work_name
    wx.navigateTo({
      url: "./work/work?id=" + work_id,
      success: function(res) {
        console.log(res)
      }
    })
  },

  //跳转选择适合行业
  GoToInd() {
    var id = JSON.stringify(this.data.industry_id)
    var name = JSON.stringify(this.data.industry_name)
    wx.navigateTo({
      url: "./industry/industry?id=" + id + '&name=' + name,
      success: function(res) {
        console.log(res)
      }
    })
  },

  //跳转上传图片
  GoToPic() {
    var array = JSON.stringify(this.data.pic_show_array)
    wx.navigateTo({
      url: "./pic/pic?array=" + array,
      success: function(res) {
        console.log(res)
      }
    })
  },

  //跳转上传视频
  GoToVid() {
    var array = this.data.show_video
    wx.navigateTo({
      url: "./video/video?video=" + array,
      success: function(res) {
        console.log(res)
      }
    })
  },

  //自我描述
  bindTextAreainput(e) {
    this.setData({
      cursor: e.detail.cursor,
      des: e.detail.value
    })
  },

  //发布简历
  handleAbility() {
    let avatar = this.data.real_avatar;
    let sex = this.data.sex;
    let name = this.data.name;
    let id = this.data.city_id;
    let work_id = this.data.work_id;
    let industry_id = this.data.industry_id;
    let des = this.data.des;
    let pic = this.data.pic_array;
    let video = this.data.video_path;
    let token = wx.getStorageSync('token');
    if (avatar === null){
      wx.showToast({
        title: '请上传头像',
        duration: 2000,
        icon: 'none'
      })
    } else if (name === null){
      wx.showToast({
        title: '请输入姓名',
        duration: 2000,
        icon: 'none'
      })
    }else if (id === null) {
      wx.showToast({
        title: '请选择城市',
        duration: 2000,
        icon: 'none'
      })
    } else if (work_id === null) {
      wx.showToast({
        title: '请选择任务类型',
        duration: 2000,
        icon: 'none'
      })
    } else if (industry_id === []) {
      wx.showToast({
        title: '请选择理想行业',
        duration: 2000,
        icon: 'none'
      })
    } else if (des === null) {
      wx.showToast({
        title: '请完善自我描述',
        duration: 2000,
        icon: 'none'
      })
    } else {
      var that = this
      common.http(util.baseUrl + '/api/user/update', 'post', function (res) {
        console.log(res)
      }, {
          avatar: avatar,
          sex: sex,
          nickname: name,
        }, token)
      common.http(util.baseUrl + '/api/ability/create', 'post', function(res) {
        that.setData({
          login: false,
          accept: true
        })
        that.handleTask();
      }, {
        city_id: id,
        type_label_id: work_id,
        industry_arr: industry_id,
        description: des,
        img_array: pic,
        video_path: video,
        video_cover: avatar
      },token)
    }
  },

  //返回上一个页面
  backIndex() {
    wx.navigateBack({
      delta: 1
    })
  },

  //打开app
  launchAppError(e) {
    console.log(e.detail.errMsg)
    wx.showToast({
      title: '未检测到相关的app，请确认是否已经安装',
      duration:2000,
      icon:'none'
    })
    this.setData({
      download:true,
      accept:false
    })
  },

  //申请任务
  handleTask() {
    var id = this.data.task_id
    var token = wx.getStorageSync('token')
    common.http(util.baseUrl + '/api/task/order/create', 'post', function(res) {
      
      if(res){
        console.log(res)
      }else{
        wx.navigateBack({
          delta: 1,
        })
      }
    }, {
      task_id: id
    }, token)
  }
})