<template>
    <div class="current-conversation-wrapper">
        <div class="current-conversation" @scroll="onScroll" v-if="showCurrentConversation">
            <div class="current-conversation-header">
                <div v-if="(detail && detail.dominator) || (detail && detail.type)">
                    <div class="name" v-if="detail && detail.dominator">
                        系统消息
                    </div>
                    <div class="title_wrap" v-if="detail && detail.type">
                        <div class="label">
                            <p v-if="detail && detail.recipient && detail.recipient.user_id == user_id">
                                {{detail.sender.nickname}}</p>
                            <p v-if="detail && detail.sender && detail.sender.user_id == user_id">
                                {{detail.recipient.nickname}}</p>
                            <p v-if="detail && detail.type === 2">
                                {{detail.job.type_label.name}}</p>
                            <p v-if="detail && detail.type === 1">
                                <span v-text="handleWork(detail.job.job_label_id)"></span>
                                -
                                {{detail.job.salary_min/1000}}-{{detail.job.salary_max/1000}}k
                            </p>
                        </div>
                    </div>
                </div>
                <div class="name" v-if="!detail || (detail && !detail.dominator) && (detail && !detail.type)">{{ name }}</div>
                <div class="btn-more-info"
                     :class="showConversationProfile ? '' : 'left-arrow'"
                     @click="showMore"
                     v-show="(!currentConversation.conversationID.includes('SYSTEM')) && (currentConversation.conversationID.split('C2C')[1] !== 'dominator')"
                     title="查看详细信息">
                </div>
            </div>
            <div class="content">
                <div class="message-list" ref="message-list" @scroll="this.onScroll">
                    <div class="more" v-if="!isCompleted">
                        <el-button
                                type="text"
                                @click="$store.dispatch('getMessageList', currentConversation.conversationID)"
                        >查看更多
                        </el-button>
                    </div>
                    <div class="no-more" v-else>没有更多了</div>
                    <message-item :message-detail="detail" v-for="message in this.handleMessageList" :key="message.ID" :message="message"/>
                </div>
                <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">回到最新位置
                </div>
            </div>
            <div class="footer" v-if="showMessageSendBox">
                <message-send-box @on-show-time="handleUpdataTime"/>
            </div>
        </div>
        <div class="profile" v-if="showConversationProfile">
            <conversation-profile/>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import MessageSendBox from '../message/message-send-box'
    import MessageItem from '../message/message-item'
    import ConversationProfile from './conversation-profile.vue'
    import {forEach} from "../../../libs/tools";
    import {getTime, isToday, getFullDate, getDay} from '../../../libs/time'
    import http from '../../../libs/http';

    export default {
        name: 'CurrentConversation',
        components: {
            MessageSendBox,
            MessageItem,
            ConversationProfile
        },
        props:['work_label'],
        data() {
            return {
                isShowScrollButtomTips: false,
                preScrollHeight: 0,
                showConversationProfile: false,
                timeout: '',
                timeTamp: 0,
                lastTime: 0,
                user_id:null,
            }
        },
        mounted() {
            this.$bus.$on('image-loaded', this.onImageLoaded)
            this.$bus.$on('scroll-bottom', this.scrollMessageListToButtom)
            if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
                return false
            }
            this.user_id = sessionStorage.getItem('userID');
        },
        updated() {
            this.keepMessageListOnButtom()
            if (this.currentConversation.conversationID === '@TIM#SYSTEM' || this.currentConversation.conversationID.split('C2C')[1] === 'dominator') {
                this.showConversationProfile = false
            }
        },
        computed: {
            ...mapState({
                currentConversation: state => state.conversation.currentConversation,
                handleMessageList(state) {
                    forEach(state.conversation.currentMessageList, item => {
                        if (typeof item.time != 'string') {
                            if (this.lastTime > 0) {
                                if (this.lastTime - this.timeTamp > 300) {
                                    item.time = getTime((new Date(item.time * 1000)));
                                } else {
                                    item.time = ""
                                }
                                this.lastTime = 0;
                            } else {
                                if ((Math.abs(item.time - this.timeTamp) > 300) || (item.time - this.timeTamp == 0)) {
                                    this.timeTamp = item.time;
                                    if (isToday(new Date(item.time * 1000))) {
                                        item.time = getTime((new Date(item.time * 1000)));
                                    } else {
                                        if ((new Date(item.time * 1000).getFullYear() == new Date().getFullYear()) && (new Date(item.time * 1000).getMonth() == new Date().getMonth())) {
                                            if (parseInt(new Date().getDate()) - parseInt(new Date(item.time * 1000).getDate()) == 1) {
                                                item.time = '昨天' + ' ' + getTime((new Date(item.time * 1000)));
                                            } else if ((parseInt(new Date().getDate()) - parseInt(new Date(item.time * 1000).getDate()) > 1) && (parseInt(new Date().getDate()) - parseInt(new Date(item.time * 1000).getDate()) <= 7)) {
                                                item.time = getDay(new Date(item.time * 1000)) + getTime((new Date(item.time * 1000)))
                                            }
                                        } else {
                                            item.time = getFullDate(new Date(item.time * 1000))
                                        }
                                    }
                                } else {
                                    this.timeTamp = item.time;
                                    item.time = ""
                                }
                            }
                        }
                    });
                    return state.conversation.currentMessageList
                },
                isCompleted: state => state.conversation.isCompleted,
                detail: state => state.conversation.detail,
                handleMessageTime(state) {
                    if (state.conversation.lastTime > 0) {
                        this.timeTamp = state.conversation.lastTime
                    }
                }
            }),
            ...mapGetters(['toAccount']),
            // 是否显示当前会话组件
            showCurrentConversation() {
                return !!this.currentConversation.conversationID
            },
            name() {
                if (this.currentConversation.type === 'C2C') {
                    return this.currentConversation.userProfile.nick || this.toAccount
                } else if (this.currentConversation.type === 'GROUP') {
                    return this.currentConversation.groupProfile.name || this.toAccount
                } else if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
                    return '群系统通知'
                }
                return this.toAccount
            },
            showMessageSendBox() {
                if(this.currentConversation.conversationID.split('C2C')[1] !== 'dominator'){
                    return (this.currentConversation.type !== this.TIM.TYPES.CONV_SYSTEM) || (this.detail && !this.detail.dominator) || (!this.detail)
                }else{
                    return false
                }
            }
        },
        methods: {
            //id对应的工作岗位/任务
            handleWork(id) {
                let label_name = '';
                if (this.work_label) {
                    let length = this.work_label.length;
                    for (let i = 0; i < length; i++) {
                        if (this.work_label[i].label_id === id) {
                            label_name = this.work_label[i].name;
                            return label_name
                        }
                    }
                }
            },

            handleUpdataTime(data) {
                this.lastTime = data;
            },

            onScroll({target: {scrollTop}}) {
                let messageListNode = this.$refs['message-list']
                if (!messageListNode) {
                    return
                }
                if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
                    this.isShowScrollButtomTips = false
                }
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
                    })
                    this.isShowScrollButtomTips = false
                } else {
                    this.isShowScrollButtomTips = true
                }
                this.preScrollHeight = messageListNode.scrollHeight
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
            showMore() {
                this.showConversationProfile = !this.showConversationProfile
            },
            onImageLoaded() {
                this.keepMessageListOnButtom()
            }
        },
        mixins:[http],

    }
</script>

<style lang="stylus" scoped>
    /* 当前会话的骨架屏 */
    .current-conversation-wrapper
        height $height
        background-color #fff
        color $base
        display flex

        .current-conversation
            display: flex;
            flex-direction: column;
            width: 100%;
            height: $height;

        .profile
            height: $height;
            overflow-y: scroll;
            width 300px
            border-left 1px solid $border-base
            flex-shrink 0

        .more
            display: flex;
            justify-content: center;
            font-size: 12px;

        .no-more
            display: flex;
            justify-content: center;
            color: $secondary;
            font-size: 12px;
            padding: 20px 10px;

    .current-conversation-header
        border-bottom 1px solid $border-base
        height 60px
        position relative

        .name
            padding: 12px 38px
            color $base
            font-size 18px
            font-weight 600
            height: 60px
            background-color #FAFAFA
            box-sizing: border-box
            text-align left

        .title_wrap
            color $base
            background: #FAFAFA
            padding: 12px 38px
            height: 60px
            text-align left

            .label
                p:nth-child(1)
                    font-size: 14px;
                    margin-bottom: 9px;
                    color: rgba(51, 51, 51, 1);

                p:nth-child(2)
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);

        .btn-more-info
            position absolute
            top 10px
            right -15px
            border-radius 50%
            width 30px
            height 30px
            cursor pointer

            &::before
                position absolute
                right 0
                z-index 0
                content ""
                width: 15px
                height: 30px
                border: 1px solid $border-base
                border-radius: 0 100% 100% 0 / 50%
                border-left: none
                background-color $background-light

            &::after
                content ""
                width: 8px;
                height: 8px;
                transition: transform 0.8s;
                border-top: 2px solid $secondary;
                border-right: 2px solid $secondary;
                float: right;
                position: relative;
                top: 11px;
                right: 8px;
                transform: rotate(45deg)

            &.left-arrow
                transform rotate(180deg)

                &::before
                    background-color $white

            &:hover
                &::after
                    border-color $light-primary

    .content
        display: flex;
        flex 1
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        position: relative;

        .message-list
            width: 100%;
            box-sizing: border-box;
            overflow-y: scroll;
            padding: 0 20px;

        .newMessageTips
            position: absolute
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
            border: $border-light 1px solid;
            background-color: $white;
            color: $primary;

    .footer
        border-top: 1px solid $border-base;

    .show-more {
        text-align: right;
        padding: 10px 20px 0 0;
    }
</style>
