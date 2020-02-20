
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
      if(res.statusCode === 200){
        if (res.data.code === 200) {
          if (res.data.data) {
            if (res.data.current_page) {
             
              callback(res.data)
            } else {
              callback(res.data.data)
            }
          } else {
            callback(true)
          }
        } else if (res.data.code === 403){
          console.log(res.data.message)
          wx.removeStorage({
            key: "token",
            success(res) {
              console.log(res)
            }
          })
        } else{
          let title = res.data.message
          console.log(title)
          if ((title == 'Token Signature could not be verified') || (title == 'Token not provided')){
            console.log(res.data.message)
            wx.removeStorage({
              key: "token",
              success(res) {
                console.log(res)
              }
            })
          }
          if (title != "执行成功"){
            if (title == "不存在的任务招募信息" || title == "你要查看的岗位信息不存在") {
              wx.showToast({
                title: "您来晚了，该任务 / 职位已下线",
                icon: 'none',
                duration: 2000,
                success() {
                  let timer = setTimeout(
                    function () {
                      wx.navigateTo({
                        url: "../download/download",
                        success: function (res) {
                          console.log(res)
                          clearTimeout(timer)
                        }
                      })
                    },
                    1500
                  )
                }
              })
            } else if (title == "你要查看的信息不存在" || title =="你要查看的数据不存在"){
              wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000,
                success() {
                  let timer = setTimeout(
                    function () {
                      wx.navigateTo({
                        url: "../download/download",
                        success: function (res) {
                          console.log(res)
                          clearTimeout(timer)
                        }
                      })
                    },
                    1500
                  )
                }
              })
            } else {
              wx.showToast({
                title: title,
                icon: 'none',
                duration: 2000
              })
            }
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