<template>
    <div class="IM_wrap">

        <!--聊天列表-->
        <MessageList @on-msg-header="handleMsgHeader" @on-msg-refresh="handleRefresh"></MessageList>

        <!--消息内容-->
        <div class="main" @click="onScroll" :style="(messageDetail && messageDetail.dominator) ? 'justify-content:flex-start' : ''" >

            <!--头部信息-->
            <MessageHeader :message-detail="messageDetail"></MessageHeader>

            <div style="position: relative">
                <div class="message-list" :style="messageDetail.dominator ? 'max-height:calc(100vh - 145px)' : ''" ref="message-list" @scroll="this.onScroll" v-if="messageDetail">
                    <div class="more" v-if="!isCompleted">
                        <el-button
                                type="text"
                                @click="$store.dispatch('getMessageList', currentConversation.conversationID)"
                        >查看更多
                        </el-button>
                    </div>
                    <div class="no-more" v-else>没有更多了</div>
                    <MessageItem class="detail" v-for="(item,index) in this.handleMessageList" :key="item.ID"
                                 :message="item"></MessageItem>
                </div>
                <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">回到最新位置</div>
            </div>

            <!--发送框@on-msg-refresh="handleRefresh"-->
            <MessageBox v-show="messageDetail && !messageDetail.dominator" ></MessageBox>
        </div>

    </div>
</template>

<script>

    import http from '../../libs/http'
    /*import tim from "../../libs/im";
    import TIM from 'tim-js-sdk';*/
    // import COS from "cos-js-sdk-v5";
    import {mapState} from 'vuex'
    import {forEach} from "../../libs/tools";
    import time from "../../libs/time";
    import MessageList from './msg_list'
    import MessageItem from './message_detail'
    import MessageHeader from './message_header'
    import MessageBox from './message_box'
    import { getDate } from '../../libs/time'


    export default {
        name: 'index',
        components: {
            MessageItem,
            MessageHeader,
            MessageBox,
            MessageList,
        },
        data() {
            return {
                time,
                getDate,
                messageDetail: null,
                isShowScrollButtomTips: false,
                preScrollHeight: 0,
            }
        },
        mounted() {
            // this.initListener();

            //发送后消息到底部
            this.$bus.$on('scroll-bottom', this.scrollMessageListToButtom);

            console.log(this.handleMessageList)
            /*//路由参数
            this.getRouterData();
            let data = null;
            data = sessionStorage.getItem('id');
            if (data) {
                let userID = JSON.parse(data).recipient + 'a';
                this.$store
                    .dispatch('checkoutConversation', `C2C${userID}`)
                    .then(() => {
                        let a ={
                            type:JSON.parse(data).type,
                            recipient:JSON.parse(data).recipient,
                            foreign_key:JSON.parse(data).foreign_key
                        };
                        this.apiPost('/converse/create',a).then((res)=>{
                            if(res){
                                this.messageDetail = res;
                                sessionStorage.removeItem('id');
                                this.isRefresh = true
                            }
                        })
                    })
            }*/
        },

        updated() {
            this.keepMessageListOnButtom();
        },

        methods: {
            showTime(index){
                console.log(this.handleMessageList[index])
            },

            handleMsgHeader(data){
                console.log(data)
                this.messageDetail = data;
            },

            handleRefresh(item){
                this.isRefresh = item
            },

            // 如果滚到底部就保持在底部，否则提示是否要滚到底部
            keepMessageListOnButtom() {
                let messageListNode = this.$refs['message-list']
                if (!messageListNode) {
                    return
                }
                // 距离底部20px内强制滚到底部,否则提示有新消息
                if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 20) {
                    this.$nextTick(() => {
                        messageListNode.scrollTop = messageListNode.scrollHeight
                    });
                    this.isShowScrollButtomTips = false
                } else {
                    this.isShowScrollButtomTips = true
                }
                this.preScrollHeight = messageListNode.scrollHeight
            },

            onScroll({target: {scrollTop}}) {
                console.log('aaa')
                let messageListNode = this.$refs['message-list']
                if (!messageListNode) {
                    return
                }
                if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
                    this.isShowScrollButtomTips = false
                }
            },

            // 直接滚到底部
            scrollMessageListToButtom() {
                this.$nextTick(() => {
                    let messageListNode = this.$refs['message-list']
                    if (!messageListNode) {
                        return
                    }
                    messageListNode.scrollTop = messageListNode.scrollHeight
                    this.preScrollHeight = messageListNode.scrollHeight
                    this.isShowScrollButtomTips = false
                })
            },

            /*getRouterData() {
                if (this.$route.params.id) {
                    sessionStorage.setItem('id', this.$route.params.id);
                }
            },*/
        },
        computed: {
            ...mapState({
                // conversationList: state => state.conversation.conversationList,
                currentConversation: state => state.conversation.currentConversation,
               /* handleList(state) {
                    return state.conversation.conversationList
                },*/
                handleMessageList(state) {
                    return state.conversation.currentMessageList
                },
                isCompleted: state => state.conversation.isCompleted,
            }),

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
            background: #fafafa;
            border: 1px solid rgba(230, 230, 230, 1);
            /*border-right: 1px solid transparent;*/

            .title {
                background: rgba(255, 255, 255, 1);
                border-bottom: 1px solid rgba(230, 230, 230, 1);
                padding: 23px 20px;
                font-size: 14px;
                color: rgba(153, 153, 153, 1);
                /*border-right: 1px solid rgba(230, 230, 230, 1);*/
            }

            .none_list{
                text-align: center;
                margin-top: 23px;
                height: calc(100vh - 177px);

            }
            .list_wrap::-webkit-scrollbar {
                width: 2px;
            }
            .list_wrap{
                height: calc(100vh - 177px);
                overflow-y: auto;
                overflow-x: hidden;

                .list {
                    display: flex;
                    justify-content: space-between;
                    padding: 19px;
                    cursor: pointer;
                    margin-right: -1px;

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

        }

        .main {
            width: 701px;
            border: 1px solid rgba(230, 230, 230, 1);
            border-left: 1px solid transparent;
            margin-left: -1px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            position: relative;

            .title {
                width: 701px;
                height: 61px;
                background: #FAFAFA;
                padding: 12px 38px;
                box-sizing: border-box;

                .title_wrap {
                    display: flex;
                    justify-content: space-between;

                    .label {
                        align-self: center;

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

                    .salary {
                        align-self: center;
                        display: flex;

                        p:nth-child(1) {
                            font-size: 14px;
                            line-height: 14px;
                            color: rgba(255, 78, 77, 1);
                        }

                        p:nth-child(2) {
                            margin-left: 67px;

                            img {
                                width: 8px;
                                height: 13px;
                            }
                        }
                    }
                }
            }

            .message-list {
                box-sizing: border-box;
                overflow-y: auto;
                padding: 0 26px;
                max-height: calc(100vh - 325px);
                position: relative;

                .more {
                    display: flex;
                    justify-content: center;
                    font-size: 12px;
                }

                .no-more {
                    display: flex;
                    justify-content: center;
                    color: #a5b5c1;
                    font-size: 12px;
                    padding: 10px 10px;
                }

                .detail {
                    margin-top: 50px;
                }

                .detail:nth-child(2) {
                    margin-top: 30px;
                }

                .detail:nth-last-child(1) {
                    margin-bottom: 30px;
                }


            }
            .newMessageTips {
                position: absolute;
                cursor: pointer;
                padding: 10px;
                width: 100px;
                margin: auto;
                left: 0;
                right: 0;
                bottom: 5px;
                font-size: 12px;
                text-align: center;
                border-radius: 10px;
                border: 1px solid #e9eaec;
                background: #fff;
                color:  #2d8cf0;
                /*border: $border-light 1px solid;
                background-color: $white;
                color: $primary;*/
            }
            .message-list::-webkit-scrollbar {
                width: 2px;
            }
        }

        .el-badge__content.is-fixed {
            top: 5px;
            right: 15px;
            font-size: 10px;
            background: rgba(255, 56, 89, 1);
            border-radius: 50%;
        }
    }

    .active_list {
        background: rgba(255, 255, 255, 1);
        border-right: 1px solid white !important;
    }
</style>
