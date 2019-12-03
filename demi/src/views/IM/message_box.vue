<template>
    <div class="send">
        <div class="send-header-bar">
            <el-popover placement="top" width="400" trigger="click">
                <div class="emojis">
                    <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
                        <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px"/>
                    </div>
                </div>
                <img src="../../assets/img/expression@2x.png" alt="" class="iconfont icon-smile" slot="reference" title="发表情">
            </el-popover>
            <div class="sendImg">
                常用语
            </div>
            <div class="sendImg" @click="handleSendImageClick">
                图片文件
            </div>
            <div class="sendImg" @click="handleSendFileClick">
                发文件
            </div>
        </div>
        <div class="bottom">
            <textarea
                    rows="4"
                    resize="false"
                    v-model="messageContent"
                    class="text-input"
                    @focus="focus = true"
                    @blur="focus = false"
                    @keydown.enter.exact.prevent="handleEnter"
                    @keyup.ctrl.enter.prevent.exact="handleLine"
                    @keydown.up.stop="handleUp"
                    @keydown.down.stop="handleDown"
            ></textarea>
            <el-tooltip class="item" effect="dark" content="按Enter发送消息，Ctrl+Enter换行" placement="left-start">
                <div class="btn-send" @click="sendTextMessage">
                    <div class="tim-icon-send">
                        发送
                    </div>
                </div>
            </el-tooltip>
        </div>
        <input
                type="file"
                id="imagePicker"
                ref="imagePicker"
                accept=".jpg, .jpeg, .png, .gif"
                @change="sendImage"
                style="display:none"
        />
        <input type="file" id="filePicker" ref="filePicker" @change="sendFile" style="display:none"/>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import { emojiMap, emojiName, emojiUrl } from '../../libs/emojiMap'
    export default {
        name: 'message_box',
        data(){
            return{
                messageContent: '',
                emojiMap: emojiMap,
                emojiName: emojiName,
                emojiUrl: emojiUrl,
                file: '',
                // timeout:null,
            }
        },
        computed: {
            ...mapGetters(['toAccount', 'currentConversationType']),
            ...mapState({
                memberList: state => state.group.currentMemberList
            })
        },
        methods:{
            handleUp() {
                const index = this.memberList.findIndex(member => member.userID === this.atUserID)
                if (index - 1 < 0) {
                    return
                }
                this.atUserID = this.memberList[index - 1].userID
            },
            handleDown() {
                const index = this.memberList.findIndex(member => member.userID === this.atUserID)
                if (index + 1 >= this.memberList.length) {
                    return
                }
                this.atUserID = this.memberList[index + 1].userID
            },
            handleEnter() {
                /*if (this.showAtGroupMember) {
                    this.handleSelectAtUser()
                } else {
                    this.sendTextMessage()
                }*/
                this.sendTextMessage()
            },
            handleLine() {
                this.messageContent += '\n'
            },
            sendTextMessage() {
                if (this.messageContent === '' || this.messageContent.trim().length === 0) {
                    this.messageContent = '';
                    this.$store.commit('showMessage', {
                        message: '不能发送空消息哦！',
                        type: 'info'
                    });
                    return
                }
                const message = this.tim.createTextMessage({
                    to: this.toAccount,
                    conversationType: this.currentConversationType,
                    payload: { text: this.messageContent }
                });
                this.$store.commit('pushCurrentMessageList', message);
                this.$bus.$emit('scroll-bottom');
                this.tim.sendMessage(message);
                this.messageContent = '';
                this.$emit("on-show-time",message.time);
                /*if(message){
                    this.refreshConversation()
                }*/
            },
            /*refreshConversation() {
                this.tim.getConversationList().then(() => {
                    /!* that.$store.commit('showMessage', {
                         message: '刷新成功',
                         type: 'success',
                     });*!/
                    this.$emit('on-msg-refresh', true);
                });
                /!*let that = this;
                return function () {
                    if (!that.timeout) {
                        that.timeout = setTimeout(() =>{
                            that.timeout = null;
                            that.tim.getConversationList().then(() => {
                               /!* that.$store.commit('showMessage', {
                                    message: '刷新成功',
                                    type: 'success',
                                });*!/
                                this.$emit('on-msg-refresh', true);
                            })
                        }, 1000)
                    }
                }*!/
            },*/
            chooseEmoji(item) {
                this.messageContent += item
            },
            handleSendImageClick() {
                this.$refs.imagePicker.click()
            },
            handleSendFileClick() {
                this.$refs.filePicker.click()
            },
            sendImage() {
                const message = this.tim.createImageMessage({
                    to: this.toAccount,
                    conversationType: this.currentConversationType,
                    payload: {
                        file: document.getElementById('imagePicker') // 或者用event.target
                    },
                    onProgress: percent => {
                        this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
                    }
                })
                this.$store.commit('pushCurrentMessageList', message)
                this.tim.sendMessage(message).catch(imError => {
                    this.$store.commit('showMessage', {
                        message: imError.message,
                        type: 'error'
                    })
                })
                this.$refs.imagePicker.value = null
            },
            sendFile() {
                const message = this.tim.createFileMessage({
                    to: this.toAccount,
                    conversationType: this.currentConversationType,
                    payload: {
                        file: document.getElementById('filePicker') // 或者用event.target
                    },
                    onProgress: percent => {
                        this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
                    }
                })
                this.$store.commit('pushCurrentMessageList', message)
                this.tim.sendMessage(message).catch(imError => {
                    this.$store.commit('showMessage', {
                        message: imError.message,
                        type: 'error'
                    })
                })
                this.$refs.filePicker.value = null
            }
        }

    }
</script>

<style lang="less">
    .send {
        border-top: 1px solid #E6E6E6;
        max-height: 180px;
        box-sizing: border-box;
        overflow: hidden;
        padding: 16px 26px;
        border-left: 1px solid #E6E6E6;
        margin-left: -1px;

        .send-header-bar {
            display: flex;
            .sendImg{
                cursor: pointer;
                align-self: center;
                background-image: url("../../assets/img/sendbg.png");
                width:75px;
                height:25px;
                background-size: 100%;
                text-align: center;
                line-height: 25px;
                font-size:12px;
                color:#999999;
                margin: 0 16px 0 0;
            }
        }
        .send-header-bar {
            .iconfont{
                width: 25px;
                height: 25px;
                cursor: pointer;
                font-size: 24px;
                color: gray;
                margin: 0 16px 0 0;
            }
        }
        textarea {
            resize: none;
        }
        .text-input {
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            border: none;
            outline: none;
            background-color: transparent;
        }
        .block {
            padding: 10px 0;
            display: flex;
            align-items: center;
        }
        .bottom {
            padding-top: 10px;
            position: relative;
            .btn-send {
                cursor: pointer;
                position: absolute;
                color: #2d8cf0;
                font-size: 30px;
                right: 0;
                bottom: -5px;
                padding: 6px 6px 4px 4px;
                border-radius: 50%;
                .tim-icon-send{
                    width: 81px;
                    height: 27px;
                    background-image: url('../../assets/img/send@2x.png');
                    background-size: 100%;
                    font-size:14px;
                    color:rgba(255,255,255,1);
                    line-height: 27px;
                    text-align: center;
                }
            }
        }
    }
    .emojis {
        height: 160px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
    }

    .emoji {
        height: 40px;
        width: 40px;
        box-sizing: border-box;
    }
</style>