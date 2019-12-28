<template>
    <div>
        <div class="date">{{ date }}</div>
        <div
                class="c2c-layout"
                :class="messagePosition"
        >
            <div class="col-1" v-if="messageDetail">
                <!-- 头像 -->
                <!--<img class="avatar" v-if="isMine" :src="avatar" alt="">-->
                <img class="avatar" v-if="!isMine && (message.from !== 'dominator') && messageDetail && messageDetail.service" src="http://produce.jmzhipin.com/h5/images/customer.png" alt="">

                <img class="avatar" v-if="!isMine && (message.from !== 'dominator') && messageDetail.recipient && (messageDetail.recipient.user_id == user_id)"
                     :src="messageDetail.sender.avatar" alt="">

                <img class="avatar" v-if="isMine && (message.from !== 'dominator') && messageDetail.recipient && (messageDetail.recipient.user_id == user_id)"
                     :src="messageDetail.recipient.avatar" alt="">

                <img class="avatar" v-if="(isMine || !isMine) && (message.from !== 'dominator') && messageDetail.recipient && (messageDetail.recipient.user_id == user_id) && !messageDetail.sender.avatar"
                     src="../../assets/img/toxiang@2x.png" alt="">

                <img class="avatar" v-if="!isMine && (message.from !== 'dominator') && messageDetail.sender && (messageDetail.sender.user_id == user_id)"
                     :src="messageDetail.recipient.avatar" alt="">

                <img class="avatar" v-if="isMine && (message.from !== 'dominator') && messageDetail.sender && (messageDetail.sender.user_id == user_id)"
                     :src="messageDetail.sender.avatar" alt="">

                <img class="avatar" v-if="(isMine || !isMine) && (message.from !== 'dominator') && messageDetail.sender && (messageDetail.sender.user_id == user_id) && !messageDetail.recipient.avatar"
                     src="../../assets/img/toxiang@2x.png" alt="">
                <!--<img v-if="message.from !== 'dominator'" class="avatar" :src="avatar"/>-->
                <img v-if="message.from === 'dominator'" class="avatar" src="../../assets/img/notification.png"/>
            </div>
            <div class="col-2">
                <text-element
                        v-if="message.type === TIM.TYPES.MSG_TEXT"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <image-element
                        v-else-if="message.type === TIM.TYPES.MSG_IMAGE"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <file-element
                        v-else-if="message.type === TIM.TYPES.MSG_FILE"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <sound-element
                        v-else-if="message.type === TIM.TYPES.MSG_SOUND"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <custom-element
                        v-else-if="message.type === TIM.TYPES.MSG_CUSTOM"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <face-element
                        v-else-if="message.type === TIM.TYPES.MSG_FACE"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <video-element
                        v-else-if="message.type === TIM.TYPES.MSG_VIDEO"
                        :isMine="isMine"
                        :payload="message.payload"
                />
                <span v-else>暂未支持的消息类型：{{message.type}}</span>
            </div>

            <div class="col-3">
                <!-- 消息状态 -->
                <message-status-icon :message="message" />
            </div>
        </div>
    </div>


</template>

<script>
    import {mapState} from 'vuex'
    /*import MessageStatusIcon from './message-status-icon.vue'
    import MessageHeader from './message-header'
    import MessageFooter from './message-footer'*/
    import MessageStatusIcon from './message-status-icon.vue'
    import FileElement from './message-elements/file-element.vue'
    import FaceElement from './message-elements/face-element.vue'
    import ImageElement from './message-elements/image-element.vue'
    import TextElement from './message-elements/text-element.vue'
    import SoundElement from './message-elements/sound-element.vue'
    import VideoElement from './message-elements/video-element.vue'
    /*import GroupTipElement from './message-elements/group-tip-element.vue'
    import GroupSystemNoticeElement from './message-elements/group-system-notice-element.vue'*/
    import CustomElement from './message-elements/custom-element.vue'
    // import { getFullDate } from '../../../libs/time'


    export default {
        name: 'message_detail',
        props: {
            message: {
                type: Object,
                required: true
            },

            messageDetail: {type: Object, default: null}
        },
        components: {
            /*MessageHeader,
            MessageFooter,
            MessageStatusIcon,*/
            MessageStatusIcon,
            FileElement,
            FaceElement,
            ImageElement,
            TextElement,
            SoundElement,
            CustomElement,
            VideoElement
        },
        data(){
            return{
                user_id:null,
            }
        },
        created() {
            // console.log(new Date().getTime())
        },
        mounted(){
            // console.log(this.isShowTime)
            this.user_id = sessionStorage.getItem('userID');
        },
        computed: {
            ...mapState({
                currentConversation: state => state.conversation.currentConversation,
                currentUserProfile: state => state.user.currentUserProfile
            }),
            isMine() {
                // console.log(this.currentUserProfile, this.currentConversation);
                return this.message.flow === 'out'
            },
            avatar() {
                if (this.currentConversation.type === 'C2C') {
                    return this.isMine
                        ? this.currentUserProfile.avatar
                        : this.currentConversation.userProfile.avatar
                } else if (this.currentConversation.type === 'GROUP') {
                    return this.isMine
                        ? this.currentUserProfile.avatar
                        : this.message.avatar
                } else{
                    return ''
                }
            },
            date() {
                // return getFullDate(new Date(this.message.time * 1000))
                /*if(this.message.time){
                    return this.message.time
                }else{
                    return ''
                }*/
                if(typeof this.message.time == 'number'){
                    return ''
                }else{
                    return this.message.time
                }

            },
            messagePosition() {
                if (
                    ['TIMGroupTipElem', 'TIMGroupSystemNoticeElem'].includes(
                        this.message.elements[0].type
                    )
                ) {
                    return 'position-center'
                }
                if (this.isMine) {
                    return 'position-right'
                } else {
                    return 'position-left'
                }
            },
        },
    }
</script>

<style lang="less">


        .date{
            text-align: center;
            font-size:14px;
            color:rgba(177,177,179,1);
            margin-bottom: 30px;
        }
        .c2c-layout {
            display: flex;

            .col-1 {
                .avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
                }
            }

            .col-2 {
                margin: 0 14px;
                display: flex;
                flex-direction: column;
                // max-width 50% // 此设置可以自适应宽度，目前由bubble限制
            }

            .col-3 {
                width: 30px;
            }
        }



    .position-left {
        .col-2 {
            align-items: flex-start;
            max-width:540px;
            min-height:36px;
            background:rgba(245,245,247,1);
            border-radius:0 18px 18px 18px;
        }
    }

    .position-right {
        flex-direction: row-reverse;
        .col-2 {
            align-items: flex-end;
            max-width:540px;
            min-height:36px;
            background:rgba(36,191,255,1);
            border-radius:18px 0 18px 18px;
            font-size:14px;
            color:rgba(255,255,255,1);
        }
    }

    .position-center {
        justify-content: center;
    }

</style>
