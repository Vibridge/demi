<template>
    <div class="IM_wrap">
        <div class="connect_list">
            <div class="title">
                最近联系人
            </div>
            <div class="list" @click="handleNewList">
                <div class="list_info">
                    <div class="avatar">
                        <img src="../../assets/img/toxiang@2x.png" alt="">
                    </div>
                    <div class="name">
                        <p>戴小美</p>
                        <p>翰阅网络科技-人事</p>
                    </div>
                </div>
                <div class="time">
                    7月16日
                </div>
            </div>
        </div>
        <div class="main">
            <div class="title">
                <div class="label">
                    <p>游戏界面设计/游戏UI设计丝</p>
                    <p>1-3年 / 本科 / 广州</p>
                </div>
                <div>
                    <p>8-12k</p>
                    <p>sda</p>
                </div>
            </div>
            <div class="detail">

            </div>
            <div class="send">

            </div>
        </div>
    </div>
</template>

<script>

    import http from '../../libs/http'
    /*import tim from "../../libs/im";
    import TIM from 'tim-js-sdk';*/
    // import COS from "cos-js-sdk-v5";

    export default {
        name: 'index',
        data() {
            return {
                newList:[]
            }
        },
        mounted() {
            this.apiGet('/converse/lists?mode=object').then((res)=>{
                console.log(res)
            });

            let promise = tim.getConversationList();
            promise.then(function (imResponse) {
                this.newList = imResponse.data.conversationList;
                console.log(this.newList)
                // 会话列表，用该列表覆盖原有的会话列表
            }.bind(this)).catch(function (imError) {
                console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
            });


        },
        methods: {
            handleNewList() {
                this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
                    // 收到推送的单聊、群聊、群提示以及群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
                    // event.name - TIM.EVENT.MESSAGE_RECEIVED
                    // event.data - 存储 Message 对象的数组 - [Message]
                });

                this.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
                    // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
                    // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
                    // event.data - 存储 Conversation 对象的数组 - [Conversation]
                });

                this.tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
                    // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
                    // event.name - TIM.EVENT.GROUP_LIST_UPDATED
                    // event.data - 存储 Group 对象的数组 - [Group]
                });

                this.tim.on(TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, function(event) {
                    // 收到新的群系统通知
                    // event.name - TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED
                    // event.data.type - 群系统通知的类型，详情请参见 GroupSystemNoticePayload 的 operationType 枚举值说明
                    // event.data.message - Message 对象，可将 event.data.message.content 渲染到到页面
                });

                this.tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
                    // 收到自己或好友的资料变更通知
                    // event.name - TIM.EVENT.PROFILE_UPDATED
                    // event.data - 存储 Profile 对象的数组 - [Profile]
                });

                this.tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
                    // 收到黑名单列表更新通知
                    // event.name - TIM.EVENT.BLACKLIST_UPDATED
                    // event.data - 存储 userID 的数组 - [userID]
                });

                this.tim.on(TIM.EVENT.ERROR, function(event) {
                    // 收到 SDK 发生错误通知，可以获取错误码和错误信息
                    // event.name - TIM.EVENT.ERROR
                    // event.data.code - 错误码
                    // event.data.message - 错误信息
                });

                this.tim.on(TIM.EVENT.SDK_READY, function(event) {
                    // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 login 等 API
                    // event.name - TIM.EVENT.SDK_READY
                    console.log(event)
                });

                this.tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
                    // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
                    // event.name - TIM.EVENT.SDK_NOT_READY
                    console.log(event)
                });

                this.tim.on(TIM.EVENT.KICKED_OUT, function(event) {
                    console.log(event)
                    // 收到被踢下线通知
                    // event.name - TIM.EVENT.KICKED_OUT
                    // event.data.type - 被踢下线的原因，例如 TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多账号登录被踢
                });

            }
        },
        mixins: [http],
    }
</script>

<style lang="less" type="text/less">
    .IM_wrap {
        width: 1000px;
        margin: 33px auto;
        text-align: left;
        display: flex;
        font-family: Microsoft YaHei;
        background: #fff;

        .connect_list {
            width: 296px;
            min-height: calc(100vh - 116px);
            background: #fff;
            border: 1px solid rgba(230, 230, 230, 1);

            .title {
                width: 100%;
                background: rgba(255, 255, 255, 1);
                border-bottom: 1px solid rgba(230, 230, 230, 1);
                padding: 22px 20px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                box-sizing: border-box;
            }

            .list {
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 19px;
                box-sizing: border-box;

                .list_info {
                    align-self: center;
                    display: flex;

                    .avatar {
                        align-self: center;
                        margin-right: 14px;

                        img {
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                        }
                    }

                    .name {
                        align-self: center;

                        p:nth-child(1) {
                            font-size: 14px;
                            color: rgba(77, 77, 77, 1);
                            margin-bottom: 6px;
                        }

                        p:nth-child(2) {
                            font-size: 12px;
                            color: rgba(179, 179, 179, 1);
                        }
                    }
                }

                .time {
                    align-self: flex-start;
                    margin-top: 10px;
                    font-size: 12px;
                    color: rgba(179, 179, 179, 1);
                }
            }

            .list:hover {
                background: rgba(242, 242, 245, 1);
            }
        }

        .main {
            width: 701px;
            border: 1px solid rgba(230, 230, 230, 1);
            border-left: 1px solid transparent;

            .title {
                width: 701px;
                height: 61px;
                background: #FAFAFA;
                padding: 12px 38px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                .label {
                    p:nth-child(1) {
                        font-size: 14px;
                        margin-bottom: 9px;
                        color: rgba(51, 51, 51, 1);
                    }

                    p:nth-child(2) {
                        font-size: 12px;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
        }
    }
</style>