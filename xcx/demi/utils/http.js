
function http(url, method, callback, data = null, token = null){
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    data: data,
    header: {
      Authorization: token,
      'x-access-sign': '585c84aca67b58e000364309783e31e6',
    },
    method:method,
    success(res) {
      if (res.header.Authorization) {
        wx.setStorage({
          key: "token",
          data: res.header.Authorization
        })
      }
      console.log(res)
      console.log(res.header.Authorization)
      console.log(wx.getStorageSync('token'))
      if(res.statusCode === 200){
        if (res.data.code === 200) {
          if (res.data.data) {
            callback(res.data.data)
          } else {
            callback(true)
          }
        } else {
          let title = res.data.message
          if (title == "不存在的任务招募信息"){
            wx.showToast({
              title: "您来晚了，该任务已下线",
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: title,
              icon: 'none',
              duration: 2000
            })
          }
        }
      }else{
        wx.showToast({
          title: "服务器不在状态",
          icon: 'none',
          duration: 2000
        })
      }
    },
    fail(error){
      console.log(error);
    }
  })
}
module.exports.http = http