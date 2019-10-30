<template>
    <div class="IM_wrap">
        <div class="connect_list">
            <div class="title">
                最近联系人
            </div>
            <div v-if="!newList">
                <p>暂无30天以内的聊天记录</p>
            </div>
            <div class="list" v-for="(item,index) in newList" :key="index" @click="showMessage(handleList[index],item)">
                <div class="list_info">
                    <div class="avatar">
                        <el-badge :value="handleList[index].unreadCount" :hidden="handleList[index].unreadCount < 1" class="item">
                            <img v-if="item.recipient.user_id == user_id" :src="item.sender.avatar" alt="">
                            <img v-if="item.recipient.user_id == user_id && !item.sender.avatar" src="../../assets/img/toxiang@2x.png" alt="">
                            <img v-if="item.sender.user_id == user_id" :src="item.recipient.avatar" alt="">
                            <img v-if="item.sender.user_id == user_id && !item.recipient.avatar" src="../../assets/img/toxiang@2x.png" alt="">
                        </el-badge>
                    </div>
                    <div class="name">
                        <p v-if="item.recipient.user_id == user_id">{{item.sender.nickname}}</p>
                        <p v-if="item.sender.user_id == user_id">{{item.recipient.nickname}}</p>
                        <p v-if="item.type === 2">{{item.job.type_label.name}}</p>
                        <p v-if="item.type === 1"><span v-text="handleWork(item.job.job_label_id)"></span> - {{item.job.salary_min/1000}}-{{item.job.salary_max/1000}}k</p>
                        <!--<p>翰阅网络科技-人事</p>-->
                    </div>
                </div>
                <div class="time">
                    {{time.Time(handleList[index].lastMessage.lastTime,'Y-M-D')}}
                </div>
            </div>
        </div>
        <div class="main">
            <MessageHeader :message-detail="messageDetail"></MessageHeader>
            <div class="message-list" ref="message-list" @scroll="this.onScroll" v-if="messageDetail">
                <div class="more" v-if="!isCompleted">
                    <el-button
                            type="text"
                            @click="$store.dispatch('getMessageList', currentConversation.conversationID)"
                    >查看更多</el-button>
                </div>
                <div class="no-more" v-else>没有更多了</div>
                <MessageItem v-for="message in this.handleMessageList" :key="message.ID" :message="message"></MessageItem>
            </div>
            <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">回到最新位置</div>
            <MessageBox v-if="messageDetail"></MessageBox>
        </div>
    </div>
</template>

<script>

    import http from '../../libs/http'
    /*import tim from "../../libs/im";
    import TIM from 'tim-js-sdk';*/
    // import COS from "cos-js-sdk-v5";
    import { mapState } from 'vuex'
    import {forEach} from "../../libs/tools";
    import time from "../../libs/time";
    import MessageItem from './message_detail'
    import MessageHeader from './message_header'
    import MessageBox from './message_box'

    export default {
        name: 'index',
        components: {
            MessageItem,
            MessageHeader,
            MessageBox,
        },
        data() {
            return {
                time,
                newList:[],
                user_id:null,
                work_label:null,
                messageDetail:null,
                isShowScrollButtomTips: false,
                preScrollHeight: 0,
            }
        },
        created() {
            this.$nextTick(function () {
                this.user_id = sessionStorage.getItem('userID');
                this.apiGet('/converse/lists?mode=object').then((res)=>{
                    let arr = [];
                    for(let n in res){
                        arr.push(res[n])
                    }
                    forEach(this.handleList,i=>{
                        forEach(arr,item=>{
                            if(i.toAccount === item.sender_mark || i.toAccount === item.recipient_mark){
                                this.newList.push(item)
                            }
                        })
                    })

                });
                console.log(this.handleMessageList)
            });
            this.apiGet('/labels?id=967').then((res)=>{
                this.work_label = res
            })
        },
        methods: {
            showMessage(im,item){
                this.messageDetail = item;
                console.log(this.messageDetail)
                if (im.conversationID !== this.$store.state.conversation.currentConversation.conversationID) {
                    this.$store.dispatch(
                        'checkoutConversation',
                        im.conversationID
                    )
                }
                if (im.unreadCount === 0) {
                    return
                }
                if (im.type === 'C2C') {
                    this.tim.setMessageRead({
                        conversationID: im.conversationID,
                        lastMessageTime: im.lastMessage.lastTime
                    })
                }
            },

            handleWork(id){
                let label_name = '';
                if(this.work_label){
                    let length = this.work_label.length;
                    for(let i = 0;i<length;i++){
                        if(this.work_label[i].label_id === id){
                            label_name = this.work_label[i].name;
                            return label_name
                        }
                    }
                }
            },

            onScroll({ target: { scrollTop } }) {
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
        },
        computed:{
            ...mapState({
                // conversationList: state => state.conversation.conversationList,
                currentConversation: state => state.conversation.currentConversation,
                handleList (state) {
                    return state.conversation.conversationList
                },
                handleMessageList(state){
                    return state.conversation.currentMessageList
                },
                isCompleted: state => state.conversation.isCompleted,
            }),
        },
        watch:{

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
            background: #fafafa;
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
                cursor: pointer;

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

            .message-list{
                box-sizing: border-box;
                overflow-y: scroll;
                padding: 0 26px;
                max-height: 722px;
                .newMessageTips{
                    position: absolute;
                    cursor: pointer;
                    padding: 5px;
                    width: 120px;
                    margin: auto;
                    left: 0;
                    right: 0;
                    bottom: 5px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 10px;
                    /*border: $border-light 1px solid;
                    background-color: $white;
                    color: $primary;*/
                }
            }

            .send {
                border-top: 1px solid #E6E6E6;
                min-height: 180px;
            }
        }

        .el-badge__content.is-fixed{
            top:5px;
            right: 15px;
            font-size: 10px;
            background:rgba(255,56,89,1);
            border-radius:50%;
        }
    }
</style>