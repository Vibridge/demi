<template>
    <div class="connect_list">
        <div class="title">
            最近联系人
        </div>
        <div class="none_list" v-if="handleList.length < 1">
            <p>暂无聊天记录</p>
        </div>

        <div class="list_wrap">
            <div v-for="(item,index) in handleList" :key="index" @click="showMessage(item,item.conversationID)" class="list"
                 :class="{ 'active_list': item.conversationID === currentConversation.conversationID }">
                <div class="list_info">
                    <div class="avatar">
                        <el-badge :value="item.unreadCount"
                                  :hidden="item.unreadCount < 1 || item.conversationID === currentConversation.conversationID"
                                  class="item">
                            <img v-if="item.conversationID.split('C2C')[1] === 'dominator'"
                                 src="../../assets/img/notification.png" alt="">
                            <img v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].recipient && newList[Corresponding(item.conversationID)].recipient.user_id == user_id) && item.conversationID.split('C2C')[1] !== 'dominator'"
                                 :src="newList[Corresponding(item.conversationID)].sender.avatar" alt="">
                            <img v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].recipient && newList[Corresponding(item.conversationID)].recipient.user_id == user_id) && item.conversationID.split('C2C')[1] !== 'dominator' && !newList[Corresponding(item.conversationID)].sender.avatar"
                                 src="../../assets/img/toxiang@2x.png" alt="">
                            <img v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].sender && newList[Corresponding(item.conversationID)].sender.user_id == user_id)  && item.conversationID.split('C2C')[1] !== 'dominator'"
                                 :src="newList[Corresponding(item.conversationID)].recipient.avatar" alt="">
                            <img v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].sender && newList[Corresponding(item.conversationID)].sender.user_id == user_id)  && item.conversationID.split('C2C')[1] !== 'dominator' && !newList[Corresponding(item.conversationID)].recipient.avatar"
                                 src="../../assets/img/toxiang@2x.png" alt="">
                        </el-badge>
                    </div>
                    <div class="name">
                        <p v-if="item.conversationID.split('C2C')[1] === 'dominator'" style="margin-bottom: 0">系统消息</p>
                        <p v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].recipient && newList[Corresponding(item.conversationID)].recipient.user_id == user_id) && item.conversationID.split('C2C')[1] !== 'dominator'">
                            {{newList[Corresponding(item.conversationID)].sender.nickname}}</p>
                        <p v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].sender && newList[Corresponding(item.conversationID)].sender.user_id == user_id) && item.conversationID.split('C2C')[1] !== 'dominator'">
                            {{newList[Corresponding(item.conversationID)].recipient.nickname}}</p>
                        <p v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].type === 2) && item.conversationID.split('C2C')[1] !== 'dominator'">
                            {{newList[Corresponding(item.conversationID)].job.type_label.name}}</p>
                        <p v-if="newList[Corresponding(item.conversationID)] && (newList[Corresponding(item.conversationID)].type === 1) && item.conversationID.split('C2C')[1] !== 'dominator'">
                            <span v-text="handleWork(newList[Corresponding(item.conversationID)].job.job_label_id)"></span>
                            -
                            {{newList[Corresponding(item.conversationID)].job.salary_min/1000}}-{{newList[Corresponding(item.conversationID)].job.salary_max/1000}}k
                        </p>
                        <!--<p>翰阅网络科技-人事</p>-->
                    </div>
                </div>
                <div class="time" v-if="item.lastMessage.lastTime > 0">
                    {{time.Time(item.lastMessage.lastTime,'Y-M-D')}}
                </div>
                <div class="time" v-else>
                    {{getDate(new Date())}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../libs/http'
    import {mapState} from 'vuex'
    import {forEach} from "../../libs/tools";
    import {getDate} from '../../libs/time'
    import time from "../../libs/time";

    export default {
        name: 'msg_list',
        props: {
            isRefresh: {type: Boolean, default: false},
        },
        data() {
            return {
                time,
                getDate,
                work_label: null,
                newList: [],
                user_id: null,
                isCheckouting: false, // 是否正在切换会话
                // id: null,
                // dominator:null,//系统消息
                // // messageDetail:null,
            }
        },

        mounted() {
            window.addEventListener('keydown', this.handleKeydown);
            this.$nextTick(function () {
                this.handleMsgList();
            });
            this.apiGet('/labels?id=967').then((res) => {
                this.work_label = res
            });

            //路由参数
            this.getRouterData();
            let data = null;
            data = sessionStorage.getItem('id');
            if (data) {
                console.log(JSON.parse(data).type)
                let userID = JSON.parse(data).recipient + 'a';
                console.log(userID);
                let a = {
                    type: JSON.parse(data).type,
                    recipient: JSON.parse(data).recipient,
                    foreign_key: JSON.parse(data).foreign_key
                };
                this.apiPost('/converse/create', a).then((res) => {
                    console.log(res);
                    sessionStorage.removeItem('id');
                    if (res) {
                        /*if (this.currentConversation.conversationID) {
                            this.id = this.currentConversation.conversationID;
                        }*/
                        this.$emit('on-msg-header', res);
                        this.handleMsgList();
                        this.$store
                            .dispatch('checkoutConversation', `C2C${userID}`)
                            .then(() => {
                                console.log('aaa')
                            })
                    }
                })

            }
        },

        destroyed() {
            window.removeEventListener('keydown', this.handleKeydown)
        },

        computed: {
            ...mapState({
                handleList(state) {
                    let id = "C2C" +  sessionStorage.getItem('service_id') + 'b';
                    for(let i in state.conversation.conversationList){
                        if(state.conversation.conversationList[i].conversationID === id){
                            this.deleteConversation(id)
                        }
                    }
                    return state.conversation.conversationList

                },
                currentConversation: state => state.conversation.currentConversation
            }),

        },

        methods: {

            getRouterData() {
                if (this.$route.params.id) {
                    sessionStorage.setItem('id', this.$route.params.id);
                }
            },

            Corresponding(id) {
                let im_id = id.split('C2C')[1];
                for (let i in this.newList) {
                    if (i.split('-')[0] === im_id || i.split('-')[1] === im_id) {
                        return i
                    }
                }
            },
            handleMsgList() {
                this.user_id = sessionStorage.getItem('userID');
                this.apiGet('/converse/lists?mode=object').then((res) => {
                    this.newList = res;
                    // this.isRefresh = false;
                    this.$emit('on-msg-refresh', false);
                    console.log(this.newList);
                    console.log(this.handleList);
                });
            },
            handleKeydown(event) {
                if (event.keyCode !== 38 && event.keyCode !== 40 || this.isCheckouting) {
                    return
                }
                const currentIndex = this.conversationList.findIndex(
                    item => item.conversationID === this.currentConversation.conversationID
                );
                if (event.keyCode === 38 && currentIndex - 1 >= 0) {
                    this.checkoutPrev(currentIndex)
                }
                if (
                    event.keyCode === 40 &&
                    currentIndex + 1 < this.conversationList.length
                ) {
                    this.checkoutNext(currentIndex)
                }
            },
            checkoutPrev(currentIndex) {
                this.isCheckouting = true;
                this.$store
                    .dispatch(
                        'checkoutConversation',
                        this.conversationList[currentIndex - 1].conversationID
                    )
                    .then(() => {
                        this.isCheckouting = false
                    })
                    .catch(() => {
                        this.isCheckouting = false
                    })
            },
            checkoutNext(currentIndex) {
                this.isCheckouting = true;
                this.$store
                    .dispatch(
                        'checkoutConversation',
                        this.conversationList[currentIndex + 1].conversationID
                    )
                    .then(() => {
                        this.isCheckouting = false
                    })
                    .catch(() => {
                        this.isCheckouting = false
                    })
            },

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

            showMessage(im, item) {
                // this.messageDetail = item;

                let data;
                if (item === 'C2Cdominator') {
                    data = {
                        dominator: true
                    }
                } else {
                    data = this.newList[this.Corresponding(item)];
                }
                console.log(data)

                this.$emit('on-msg-header', data);
                /* this.$emit('on-msg-refresh', false);*/
                if (im.conversationID !== this.$store.state.conversation.currentConversation.conversationID) {
                    this.$store.dispatch(
                        'checkoutConversation',
                        im.conversationID
                    );
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

            //删除会话
            deleteConversation(id) {
                this.tim
                    .deleteConversation(id)
                    .then(() => {
                        /*this.$store.commit('showMessage', {
                            message: `会话${this.conversation.conversationID}删除成功!`,
                            type: 'success'
                        })*/
                        // this.popoverVisible = false
                        this.$store.commit('resetCurrentConversation')
                        console.log('success')
                    })
                    .catch(error => {
                        /*this.$store.commit('showMessage', {
                            message: `会话${this.conversation.conversationID}删除失败!, error=${error.message}`,
                            type: 'error'
                        })*/
                        console.log(error)

                        // this.popoverVisible = false
                    })
            },
        },
        mixins: [http],
        watch: {
            isRefresh() {
                console.log(this.isRefresh);
                if (this.isRefresh) {
                    this.handleMsgList();
                }
            },
            newList() {

                let data = null;
                if (this.currentConversation.conversationID === 'C2Cdominator') {
                    data = {
                        dominator: true
                    }
                } else {
                    data = this.newList[this.Corresponding(this.currentConversation.conversationID)];
                }
                console.log(data)
                this.$emit('on-msg-header', data);

            }
        }
    }
</script>

<style scoped>

</style>
