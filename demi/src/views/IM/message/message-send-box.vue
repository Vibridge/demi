<template>
    <div class="send">
        <div class="send-header-bar">
            <el-popover placement="top" width="400" trigger="click">
                <div class="emojis">
                    <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
                        <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px"/>
                    </div>
                </div>
                <img src="../../../assets/img/expression@2x.png" alt="" class="iconfont icon-smile" slot="reference"
                     title="发表情">
            </el-popover>

            <el-popover placement="top" width="400" trigger="click">
                <div class="common_header">
                    <span>常用语</span>
                    <i @click="handleOpen('create')" class="el-icon-plus"></i>
                </div>
                <div class="common_list">
                    <div v-for="item in common" class="common_info" :key="item.greet_id" @click="chooseCommon(item)">
                        <div class="common_inner">
                            <p>{{item.text}}</p>
                            <div>
                                <i @click.stop="handleOpen('edit',item.greet_id,item.text)" class="el-icon-edit"></i>
                                <i @click.stop="handleDelete(item.greet_id)" class="el-icon-delete"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="reference" class="sendImg">
                    常用语
                </div>
            </el-popover>

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

        <el-dialog
                custom-class="common_dialog"
                :visible.sync="commondialog"
                width="50%">
            <span slot="title">常用语设置</span>
            <el-input v-model="text" placeholder="你好" @keyup.enter.native="handleCommon(type , id)"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="commondialog = false">取 消</el-button>
                <el-button type="primary" @click="handleCommon(type , id)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import http from '../../../libs/http'
    import {mapGetters, mapState} from 'vuex'
    import {emojiMap, emojiName, emojiUrl} from '../../../libs/emojiMap'

    export default {
        name: 'message_box',
        data() {
            return {
                messageContent: '',
                emojiMap: emojiMap,
                emojiName: emojiName,
                emojiUrl: emojiUrl,
                file: '',
                common: [],
                commondialog: false,
                text: '',
                type: '',
                common_id: ''
            }
        },
        mounted() {
            this.handleCommonList()
        },
        computed: {
            ...mapGetters(['toAccount', 'currentConversationType']),
            ...mapState({
                memberList: state => state.group.currentMemberList
            })
        },
        methods: {
            handleCommonList() {
                var user_id = sessionStorage.getItem('userID');
                this.apiGet('/api/greet/paginate?user_id=' + user_id).then((res) => {
                    // console.log(res);
                    this.common = res.data;
                })
            },
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
                    payload: {text: this.messageContent}
                });
                this.$store.commit('pushCurrentMessageList', message);
                this.$bus.$emit('scroll-bottom');
                this.tim.sendMessage(message);
                this.messageContent = '';
                this.$emit("on-show-time", message.time);
            },
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
                this.$refs.imagePicker.value = null;
                this.$emit("on-show-time", message.time);
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
                this.$refs.filePicker.value = null;
                this.$emit("on-show-time", message.time);
            },

            chooseCommon(item) {
                const message = this.tim.createTextMessage({
                    to: this.toAccount,
                    conversationType: this.currentConversationType,
                    payload: {text: item.text}
                });
                this.$store.commit('pushCurrentMessageList', message);
                this.$bus.$emit('scroll-bottom');
                this.tim.sendMessage(message);
                this.$emit("on-show-time", message.time);
            },

            handleOpen(type, id = '', text) {
                this.commondialog = true;
                this.type = type;
                this.common_id = id;
                this.text = text
            },
            handleCommon(type, id) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                let data = {
                    mode: 1,
                    text: this.text
                };
                if (type == 'create') {
                    this.apiPost('api/greet/create', data).then((res) => {
                        console.log(res)
                        if (res) {
                            this.commondialog = false;
                            this.handleCommonList();
                            this.text = ''
                            this.$message.success('添加成功')
                        } else {
                            this.$message.error('添加失败')
                        }
                        loading.close();
                    })
                } else {
                    this.apiPost('api/greet/modify/' + id, data).then((res) => {
                        if (res) {
                            this.commondialog = false;
                            this.handleCommonList()
                            this.text = ''
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error('修改失败')
                        }
                        loading.close();
                    })
                }
            },
            handleDelete(id) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.apiDelete('api/greet/delete/' + id).then((res) => {
                    if (res) {
                        loading.close();
                        this.handleCommonList()
                        this.$message.success('删除成功')
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            }
        },
        mixins: [http]

    }
</script>

<style lang="less">
    .send {
        border-bottom: 1px solid #E6E6E6;
        max-height: 180px;
        box-sizing: border-box;
        overflow: hidden;
        padding: 16px 26px;
        border-left: 1px solid #E6E6E6;
        margin-left: -1px;

        .send-header-bar {
            display: flex;

            .sendImg {
                cursor: pointer;
                align-self: center;
                background-image: url("../../../assets/img/sendbg.png");
                width: 75px;
                height: 25px;
                background-size: 100%;
                text-align: center;
                line-height: 25px;
                font-size: 12px;
                color: #999999;
                margin: 0 16px 0 0;
            }
        }

        .send-header-bar {
            .iconfont {
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

                .tim-icon-send {
                    width: 81px;
                    height: 27px;
                    background-image: url('../../../assets/img/send@2x.png');
                    background-size: 100%;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 1);
                    line-height: 27px;
                    text-align: center;
                }
            }
        }
    }

    .el-popover {
        padding: 0;
    }

    .emojis {
        padding: 12px;
        height: 160px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        overflow-y: scroll;
    }

    .emojis::-webkit-scrollbar {
        width: 10px;
    }

    .emoji {
        height: 40px;
        width: 40px;
        box-sizing: border-box;
    }

    .common_header {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        padding: 10px 20px 10px;
        border-bottom: 1px solid #d6d6d6;
    }

    i {
        cursor: pointer;
        align-self: center;
    }

    .common_list {
        height: 160px;
        box-sizing: border-box;
        overflow-y: auto;

        .common_inner {
            display: flex;
            justify-content: space-between;
        }
    }

    .common_info {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #d6d6d6;
        padding: 0 20px;
        cursor: pointer;
    }

    .common_info:hover {
        .el-icon-edit {
            transform: translateX(0);
        }

        .el-icon-delete {
            transform: translateX(10px);
        }
    }

    .el-icon-edit {
        transform: translateX(15px);
        transition: all .2s ease;
    }

    .el-icon-delete {
        transform: translateX(50px);
        transition: all .2s ease;
    }

    .common_dialog {
        text-align: left;
    }
</style>