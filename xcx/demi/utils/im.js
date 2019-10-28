//引入腾讯云IM
import TIM from '../pages/miniprogram_npm/tim-wx-sdk/index.js';
import COS from "../pages/miniprogram_npm/cos-wx-sdk-v5/index.js";

let options = {
  SDKAppID: 1400241696, // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// var that = this
// 将腾讯云对象存储服务 SDK （以下简称 COS SDK）注册为插件，IM SDK 发送文件、图片等消息时，需要用到腾讯云的 COS 服务
tim.registerPlugin({ 'cos-wx-sdk': COS });

// 设置 SDK 日志输出级别为 release 级别，
tim.setLogLevel(1);

// var onMessageReceived = function (event) {
//   // event.data - 存储 Message 对象的数组 - [Message]
//   console.log(event)
// };
// tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
  // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
  // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
  // event.data - 存储 Conversation 对象的数组 - [Conversation]
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
  // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
  // event.name - TIM.EVENT.GROUP_LIST_UPDATED
  // event.data - 存储 Group 对象的数组 - [Group]
});

tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECERIVED, function (event) {
  // 收到新的群系统通知
  // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECERIVED
  // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
  // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
});

tim.on(TIM.EVENT.PROFILE_UPDATED, function (event) {
  // 收到自己或好友的资料变更通知
  // event.name - TIM.EVENT.PROFILE_UPDATED
  // event.data - 存储 Profile 对象的数组 - [Profile]
});

tim.on(TIM.EVENT.BLACKLIST_UPDATED, function (event) {
  // 收到黑名单列表更新通知
  // event.name - TIM.EVENT.BLACKLIST_UPDATED
  // event.data - 存储 userID 的数组 - [userID]
});

tim.on(TIM.EVENT.ERROR, function (event) {
  // 收到 SDK 发生错误通知，可以获取错误码和错误信息
  // event.name - TIM.EVENT.ERROR
  // event.data.code - 错误码
  // event.data.message - 错误信息
});

tim.on(TIM.EVENT.SDK_READY, function (event) {
  // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 login 等 API
  // event.name - TIM.EVENT.SDK_READY
});

tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
  // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
  // event.name - TIM.EVENT.SDK_NOT_READY
  console.log(event.name)
});

tim.on(TIM.EVENT.KICKED_OUT, function (event) {
  wx.showToast({
    title: event.data.type,
    icon: 'none',
    duration: 2000,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  // 收到被踢下线通知
  // event.name - TIM.EVENT.KICKED_OUT
  // event.data.type - 被踢下线的原因，例如 TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多账号登录被踢
});
module.exports = {
  tim: tim,
  TIM: TIM,
  COS: COS,
  // onMessageReceived: onMessageReceived
}