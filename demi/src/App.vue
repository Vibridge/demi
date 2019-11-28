<template>
    <div id="app">
        <div class="wrap">
            <template>
                <el-backtop target="#app">
                    <div
                            style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                        border-radius: 50%;
                    }"
                    >
                        <i class="el-icon-caret-top"></i>
                    </div>
                </el-backtop>
            </template>

            <router-view/>

        </div>

    </div>
</template>

<script>
    import http from './libs/http'

    import {mapState} from 'vuex'

    export default {
        name: 'app',

        mounted() {
            // 初始化监听器
            let user_id = sessionStorage.getItem('userID') + 'b';
            let userSig = sessionStorage.getItem('userSig');
            if (user_id && userSig) {
                this.tim.login({
                    userID: user_id,
                    userSig: userSig
                }).then(() => {
                    this.$store.commit('toggleIsLogin', true);
                    this.$store.commit('startComputeCurrent');
                }).catch(error => {
                    this.$store.commit('showMessage', {
                        message: '登录失败：' + error.message,
                        type: 'error'
                    })
                });
            }
            this.initListener();
            /*this.apiGet('/api/user/info').then((res) => {
                if (res.type !== 2) {
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration: 1000
                    });
                    this.$router.push({
                        name: "login"
                    });
                }
            });*/
        },
        methods: {
            initListener() {
                // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
                this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
                // SDK NOT READT
                this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
                // 被踢出
                this.tim.on(this.TIM.EVENT.KICKED_OUT, () => {
                    this.$store.commit('showMessage', {
                        message: '被踢出，请重新登录。',
                        type: 'error'
                    })
                    this.$store.commit('toggleIsLogin', false)
                    this.$store.commit('reset')
                })
                // SDK内部出错
                this.tim.on(this.TIM.EVENT.ERROR, this.onError)
                // 收到新消息
                this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
                // 会话列表更新
                this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
                    this.$store.commit('updateConversationList', event.data)
                })
                /*// 群组列表更新
                this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, event => {
                    this.$store.commit('updateGroupList', event.data)
                })*/
                /*  // 收到新的群系统通知
                  this.tim.on(this.TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED, event => {
                      const isKickedout = event.data.type === 4
                      const isCurrentConversation =
                          `GROUP${event.data.message.payload.groupProfile.groupID}` === this.currentConversation.conversationID
                      // 在当前会话被踢，需reset当前会话
                      if (isKickedout && isCurrentConversation) {
                          this.$store.commit('resetCurrentConversation')
                      }
                      Notification({
                          title: '新系统通知',
                          message: translateGroupSystemNotice(event.data.message),
                          duration: 3000,
                          onClick: () => {
                              const SystemConversationID = '@TIM#SYSTEM'
                              this.$store.dispatch('checkoutConversation', SystemConversationID)
                          }
                      })
                  })*/
            },
            onReceiveMessage({data: messageList}) {
                this.handleAt(messageList)
                this.$store.commit('pushCurrentMessageList', messageList)
            },
            onError({data}) {
                if (data.message !== 'Network Error') {
                    this.$store.commit('showMessage', {
                        message: data.message,
                        type: 'error'
                    })
                }
            },
            onReadyStateUpdate({name}) {
                const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
                this.$store.commit('toggleIsSDKReady', isSDKReady)
                if (isSDKReady) {
                    this.tim.getMyProfile().then(({data}) => {
                        this.$store.commit('updateCurrentUserProfile', data)
                    })
                    // this.$store.dispatch('getBlacklist')
                }
            },
            /**
             * 处理 @ 我的消息
             * @param {Message[]} messageList
             */
            handleAt(messageList) {
                // 筛选有 @ 符号的文本消息
                const atTextMessageList = messageList.filter(
                    message => message.type === this.TIM.TYPES.MSG_TEXT && message.payload.text.includes('@')
                )
                for (let i = 0; i < atTextMessageList.length; i++) {
                    const message = atTextMessageList[i]
                    const matched = message.payload.text.match(/@\w+/g)
                    if (!matched) {
                        continue
                    }
                    // @ 我的
                    if (matched.includes(`@${this.currentUserProfile.userID}`)) {
                        // 当前页面不可见时，调用window.Notification接口，系统级别通知。
                        if (document.hidden) {
                            this.notifyMe(message)
                        }
                        Notification({
                            title: `有人在群${message.conversationID.slice(5)}提到了你`,
                            message: message.payload.text,
                            duration: 3000
                        })
                        this.$bus.$emit('new-messsage-at-me', {
                            data: {conversationID: message.conversationID}
                        })
                    }
                }
            },
            /**
             * 使用 window.Notification 进行全局的系统通知
             * @param {Message} message
             */
            notifyMe(message) {
                // 需检测浏览器支持和用户授权
                if (!('Notification' in window)) {
                    return
                } else if (window.Notification.permission === 'granted') {
                    this.handleNotify(message)
                } else if (window.Notification.permission !== 'denied') {
                    window.Notification.requestPermission().then(permission => {
                        // 如果用户同意，就可以向他们发送通知
                        if (permission === 'granted') {
                            this.handleNotify(message)
                        }
                    })
                }
            },
            handleNotify(message) {
                const notification = new window.Notification('有人提到了你', {
                    body: message.payload.text
                })
                notification.onclick = () => {
                    window.focus()
                    this.$store.dispatch('checkoutConversation', message.conversationID)
                    notification.close()
                }
            }
        },
        mixins: [http],
        computed: {
            ...mapState({
                currentUserProfile: state => state.user.currentUserProfile,
                currentConversation: state => state.conversation.currentConversation,
                isLogin: state => state.user.isLogin,
                isSDKReady: state => state.user.isSDKReady
            }),
        }
    }
</script>

<style type="text/less" lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    html, body, #app {
        width: 100%;
        height: 100%;
        /* background-color: #f0f0f0; */
        background: #f7f8fa;
        overflow-x: hidden;
        font-size: 14px;
    }

</style>
