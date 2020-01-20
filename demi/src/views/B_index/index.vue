<template>
    <div class="B_index_wrapper" v-show="this.start"
         element-loading-spinner="el-icon-loading" element-loading-customClass="el-loading">
        <!--//头部导航-->
        <div :class="active_top === '/B_index/Detail' ? 'header active_app' : 'header'"
             :style="active_top === '/B_index/Detail' ? 'margin:0 auto;z-index:1;height:50px':''">
            <div class="header_wrap">
                <div class="logo">
                    <div>
                        <span style="width: 99px" v-if="active_top !== '/B_index/Detail'"><img
                                src="../../assets/img/demilogo.png" alt=""></span>
                        <span style="width: 99px" v-if="active_top === '/B_index/Detail'"><img
                                src="../../assets/img/detail_2.png" alt=""></span>
                        <el-menu :default-active="active_top" class="el-menu-demo" mode="horizontal" router
                                 @select="handleTopMenu">
                            <el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''"
                                          index="/B_index/B_person">个人中心
                            </el-menu-item>
                            <el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''"
                                          index="/B_index/ability_resume">兼职人才
                            </el-menu-item>
                            <el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''"
                                          index="/B_index/work_resume">全职人才
                            </el-menu-item>
                            <el-menu-item
                                    :class="active_top === '/B_index/Detail' ? 'active_app_item is_app_active' : ''"
                                    index="/B_index/Detail">得米APP
                            </el-menu-item>
                            <el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''"
                                          index="/B_index/IM">
                                <el-badge :value="totalUnreadCount" :hidden="totalUnreadCount > 0 ? false : true"
                                          :max="99" class="item">
                                    <el-button size="small" style="margin-bottom: 2.5px">
										<span :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''">
											消息
										</span>
                                    </el-button>
                                </el-badge>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>

                <div class="logout">
                    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" active-text-color="#fff"
                             :background-color="active_top === '/B_index/Detail' ? '#45c9ff' : '#2D3238'"
                             popper-class="self-coc">
                        <el-submenu index="1">
                            <template slot="title">
                                <div class="Avatar" :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''">
                                    <span class="work_name"
                                          v-text="user_info.company_position ? user_info.name + '-' +  user_info.company_position : user_info.name"></span>
                                    <img :src="user_info.avatar" alt="" :title="user_info.name">
                                </div>
                            </template>
                            <el-menu-item v-if="this.user_info.shop" index="2-1" @click="handleStore">店铺资料</el-menu-item>
                            <el-menu-item index="2-2" @click="handleLoginOut">退出登录</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>


            </div>
        </div>
        <div class="person-wrap" v-if="this.IsShow">
            <div class="content">
                <!--//左部导航-->
                <div class="left">

                    <!--//公司信息-->
                    <div class="person_header" @click="handleCompany">
                        <img v-if="company_info.logo_path" :src="company_info.logo_path" alt="">
                        <img v-if="!company_info.logo_path" src="../../assets/img/toxiang@2x.png" alt="">
                        <p v-text="company_info.company_name ? company_info.company_name : 'xxxxxx有限公司'"></p>
                        <span v-if="company_info.industry_label">{{company_info.industry_label && company_info.industry_label.name}}/{{company_info.financing}}/{{company_info.employee}}</span>
                    </div>
                    <span class="line"></span>
                    <el-row class="tac">
                        <el-col :span="12">
                            <el-menu
                                    :default-active="active_left"
                                    class="el-menu-vertical-demo"
                                    @select="handleOpen"
                                    router
                            >
                                <el-menu-item class="nav_label" v-for="(item,index) in left_list" :key="index"
                                              :index="item.path">
                                    <img :src="item.img" alt="" v-if="active_class !== item.path">
                                    <img :src="item.img_active" alt=""
                                         v-if="active_class === item.path">
                                    <span slot="title" v-html="item.title"
                                          :class="active_class === item.path ? 'active_left' : ''"></span>
                                    <img src="../../assets/img/xuangzhong@2x.png" v-if="active_class === item.path">
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
                </div>

                <!--//右边内容渲染-->
                <div class="right">
                    <router-view :user_info="user_info"/>
                </div>
            </div>
        </div>

        <!--//头部导航内容渲染-->
        <router-view v-if="!IsShow"/>

        <!--//底部内容渲染-->
        <bottom v-if="this.IsShow"></bottom>

        <div class="customer" v-if="showCustomer" @click="handleCustomer">
            <el-badge :value="customer && customer.unreadCount" :hidden="customer && customer.unreadCount < 1"
                      class="item">
                <img src="http://produce.jmzhipin.com/h5/images/customer.png" alt="">
            </el-badge>
        </div>
        <!--<scroll></scroll>-->

        <div class="chatCustomer">
            <el-dialog
                    title="得米在线客服"
                    :visible.sync="chatCustomer"
                    width="700px"
                    top="10vh"
                    :destroy-on-close="true"
            >
                <div style="position: relative">
                    <div class="message-list" ref="message-list" @scroll="this.onScroll">
                        <div class="more" v-if="!isCompleted">
                            <el-button
                                    type="text"
                                    @click="$store.dispatch('getMessageList', service_id);timeTamp=0"
                            >查看更多
                            </el-button>
                        </div>
                        <div class="no-more" v-else>没有更多了</div>
                        <MessageItem :message-detail="messageDetail" class="detail"
                                     v-for="(item,index) in this.handleMessageList" :key="item.ID"
                                     :message="item"></MessageItem>
                    </div>
                    <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">
                        回到最新位置
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <MessageBox @on-show-time="handleUpdataTime"></MessageBox>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import "../../assets/css/reset.css"
    import http from '../../libs/http'
    import bottom from '../../components/B_person_bottom'
    import {mapState} from 'vuex'
    import {mapGetters} from 'vuex'
    // import scroll from '../../components/scroll'
    import MessageBox from '../../views/IM/message/message-send-box'
    import MessageItem from '../../views/IM/message/message-item'
    import {forEach} from "../../libs/tools";
    import {getTime} from '../../libs/time'
    import {isToday} from '../../libs/time'
    import {getFullDate} from '../../libs/time'
    import {getDay} from '../../libs/time'

    /* eslint-disable */
    export default {
        name: 'index',
        components: {bottom, MessageBox, MessageItem},
        data() {
            return {
                user_info: {
                    avatar: '',
                    company_id: null,
                    user_id: null,
                    name: '',
                    company_position: '',
                    phone: '',
                    shop:null
                },
                company_info: {},
                active_left: '/B_index/B_person',
                active_top: '/B_index/B_person',
                left_list: [
                    {
                        path: '/B_index/B_person',
                        title: '<span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>',
                        img: require('../../assets/img/home@2x.png'),
                        img_active: require('../../assets/img/home_active@2x.png')
                    },
                    {
                        path: '/B_index/B_person/work',
                        title: '职位管理',
                        img: require('../../assets/img/post@2x.png'),
                        img_active: require('../../assets/img/post_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/interview',
                        title: '面试管理',
                        img: require('../../assets/img/interview@2x.png'),
                        img_active: require('../../assets/img/interview_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/task',
                        title: '任务管理',
                        img: require('../../assets/img/assignment@2x.png'),
                        img_active: require('../../assets/img/assignment_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/order',
                        title: '订单列表',
                        img: require('../../assets/img/indent@2x.png'),
                        img_active: require('../../assets/img/indent_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/collect',
                        title: '人才收藏',
                        img: require('../../assets/img/enshrine@2x.png'),
                        img_active: require('../../assets/img/enshrine_in@2x.png')
                    },
                    {
                        path: '/B_index/B_person/wallet',
                        title: '我的钱包',
                        img: require('../../assets/img/burse@2x.png'),
                        img_active: require('../../assets/img/burse_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/real',
                        title: '实名认证',
                        img: require('../../assets/img/autonym@2x.png'),
                        img_active: require('../../assets/img/autonym_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/VIP',
                        title: '得米 VIP',
                        img: require('../../assets/img/vip@2x.png'),
                        img_active: require('../../assets/img/vip_on@2x.png')
                    },
                    {
                        path: '/B_index/B_person/goods',
                        title: '发布商品',
                        img: require('../../assets/img/goods.png'),
                        img_active: require('../../assets/img/goods_on.png')
                    },
                    {
                        path: '/B_index/B_person/goods_massage',
                        title: '商品管理',
                        img: require('../../assets/img/goods_manage.png'),
                        img_active: require('../../assets/img/goods_manage_on.png')
                    },
                ],
                active_class: '/B_index/B_person',
                read: 0,
                active_app_class: '',
                customer: null,
                chatCustomer: false,
                isShowScrollButtomTips: false,
                preScrollHeight: 0,
                timeTamp: 0,
                lastTime: 0,
                messageDetail: null,
                service_id: null
            }
        },
        mounted() {
            //发送后消息到底部
            console.log(this.tim.context)
            this.$bus.$on('scroll-bottom', this.scrollMessageListToButtom);
            /*this.apiGet('/api/user/info').then((res) => {
                console.log(res);
                if (res.type !== 2) {
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration: 1000
                    });
                    this.$router.push({
                        name: "login"
                    });
                } else {
                    if (this.isSDKReady && (this.currentUserProfile.avatar != res.company.logo_path)) {
                        let name = res.nickname;
                        let avatar = res.company.logo_path;
                        let options = {
                            nick: name,
                            avatar: avatar
                        };
                        this.tim
                            .updateMyProfile(options)
                            .then(() => {
                                console.log('修改成功')
                            })
                            .catch(imError => {
                                this.$store.commit('showMessage', {
                                    message: imError.message,
                                    type: 'error'
                                })
                            })
                    }

                }
            });*/
            //回到顶部
            // this.scrollTop();
            this.initialize();
            //左边导航默认选中
            this.active_left = this.$route.fullPath;
            if (this.active_left) {
                this.handleOpen(this.active_left)
            }
        },

        updated() {
            this.keepMessageListOnButtom();
        },

        methods: {
            initialize() {
                this.apiGet('/api/user/info').then((res) => {
                    this.user_info.avatar = res.avatar;
                    this.user_info.company_id = res.company_id;
                    this.user_info.user_id = res.user_id;
                    this.user_info.name = res.nickname;
                    this.user_info.company_position = res.company_position;
                    this.user_info.phone = res.phone;
                    this.user_info.shop = res.shop;
                    console.log(res)
                    if (res.type !== 2) {
                        this.$message({
                            showClose: true,
                            message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                            duration: 1000
                        });
                        this.$router.push({
                            name: "login"
                        });
                    } else {
                        if (this.isSDKReady && (this.currentUserProfile.avatar != res.company.logo_path)) {
                            let name = res.nickname;
                            let avatar = res.company.logo_path;
                            let options = {
                                nick: name,
                                avatar: avatar
                            };
                            this.tim
                                .updateMyProfile(options)
                                .then(() => {
                                    console.log('修改成功')
                                })
                                .catch(imError => {
                                    this.$store.commit('showMessage', {
                                        message: imError.message,
                                        type: 'error'
                                    })
                                })
                        }

                    }
                });
            },
            /*scrollTop(){
                document.getElementsByClassName('B_index_wrapper')[0].scrollIntoView();
            },*/

            handleTopMenu(key, keyPath) {
                this.active_top = key
            },

            //左边导航选中状态
            handleOpen(key, keyPath) {
                // this.scrollTop();
                this.active_class = key;
            },

            //跳转公司详情
            handleCompany() {
                this.$router.push({
                    name: "company_info",
                    query: {
                        id: this.user_info.company_id
                    }
                });
            },

            //退出登录
            handleLoginOut() {

                this.tim.logout().then(function (imResponse) {
                    console.log(imResponse.data); // 登出成功
                }).catch(function (imError) {
                    console.warn('logout error:', imError);
                });
                // this.$store.dispatch('logout');
                if (this.removeToken()) {
                    sessionStorage.clear();
                    setTimeout(() => {
                        window.location = '/';
                    }, 800);
                }
            },

            //店铺信息
            handleStore() {
                this.$router.push({
                    name: "store_info"
                })
            },

            //客服聊天
            handleSendCustomer() {
                let service_id = sessionStorage.getItem('service_id');
                let user_id = sessionStorage.getItem('userID');
                // console.log(service_id)
                if (service_id) {
                    let data = {
                        type: 3,
                        recipient: service_id,
                        foreign_key: 0,
                        sender_mark: user_id + 'b',
                        recipient_mark: service_id + 'b'
                    };
                    this.apiPost('/converse/create', data).then((res) => {
                        if (res) {
                            let message = {
                                service: true
                            };
                            this.messageDetail = message;
                            this.$store
                                .dispatch('checkoutConversation', `C2C${res.recipient_mark}`)
                                .then(() => {
                                    this.customer = this.handleList;
                                    // console.log(this.handleList)
                                })
                        }
                    })
                }
            },
            handleCustomer() {
                this.chatCustomer = true;
                this.timeTamp = this.handleList.lastMessage.lastTime;
                this.tim.setMessageRead({
                    conversationID: this.handleList.conversationID,
                    lastMessageTime: this.handleList.lastMessage.lastTime
                })
            },

            handleUpdataTime(data) {
                this.lastTime = data;
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
                let messageListNode = this.$refs['message-list'];
                if (!messageListNode) {
                    return
                }
                // console.log(messageListNode.clientHeight);
                if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
                    this.isShowScrollButtomTips = false
                } else {
                    this.isShowScrollButtomTips = true
                }
            },

            // 直接滚到底部
            scrollMessageListToButtom() {
                this.$nextTick(() => {
                    let messageListNode = this.$refs['message-list'];
                    if (!messageListNode) {
                        return
                    }
                    messageListNode.scrollTop = messageListNode.scrollHeight
                    this.preScrollHeight = messageListNode.scrollHeight
                    this.isShowScrollButtomTips = false
                })
            },


        },
        computed: {
            //是否是左边导航
            IsShow() {
                if (this.$route.path == '/B_index/Detail') {
                    document.getElementById('app').style.overflow = 'hidden';
                } else {
                    document.getElementById('app').style.overflow = 'auto';
                }
                if (this.$route.meta['parent'] !== 'B_person') {
                    this.active_top = '/B_index/B_person';
                    if (this.$route.meta['parent'] !== 'create') {
                        this.active_top = this.$route.path;
                    }
                    return false
                } else {
                    this.active_class = this.$route.path;
                    return true
                }
            },

            //判断用户类型
            start() {
                if (this.user_info.company_id && this.user_info.user_id) {
                    this.apiGet('/api/company/info/' + this.user_info.company_id).then((res) => {
                        this.company_info = res;
                    });
                    return true;
                }
            },

            /*//判断是否为左边导航内容
            showRight(){
                this.active_left = this.$route.fullPath;
                if(this.active_left){
                    if(this.IsShow && this.start){
                        this.handleOpen(this.active_left);
                    }
                    return true
                }
                return true
            }*/

            ...mapGetters(['totalUnreadCount']),

            //显示客服
            showCustomer() {
                let Customer = sessionStorage.getItem('service_id');
                let userID = sessionStorage.getItem('userID')
                if ((this.$route.name !== 'App') && (this.$route.name !== 'IM') && (Customer != userID)) {
                    // console.log(this.$route.name);
                    if (this.isLogin && this.isSDKReady) {
                        this.handleSendCustomer();
                    }
                    return true
                } else {
                    return false
                }
            },

            ...mapState({
                handleList(state) {
                    let id = "C2C" + sessionStorage.getItem('service_id') + 'b';
                    this.service_id = id;
                    let message = null;
                    for (let i in state.conversation.conversationList) {
                        if (state.conversation.conversationList[i].conversationID == id) {
                            message = state.conversation.conversationList[i];
                        }
                    }
                    return message
                },
                currentUserProfile: state => state.user.currentUserProfile,
                isLogin: state => state.user.isLogin,
                isSDKReady: state => state.user.isSDKReady,
                handleMessageList(state) {
                    if (this.showCustomer) {
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
                                    console.log(item.time)
                                }
                            }
                        })
                    }
                    return state.conversation.currentMessageList
                },
                isCompleted: state => state.conversation.isCompleted,
            }),
        },
        watch: {},
        mixins: [http]
    }
</script>

<style type="text/less" lang="less">
    .B_index_wrapper {
        width: 100%;
        height: 100%;
        font-family: MicrosoftYaHeiLight;
        /*overflow-y: auto;*/

        .active_app {
            background: rgba(69, 201, 255, 1) !important;
        }

        .header {
            width: 100%;
            background: #2D3238;

            .header_wrap {
                width: 1000px;
                height: 50px;
                margin: 0 auto;
                z-index: 99999;

                .logo {
                    float: left;
                    height: 100%;
                    color: #FFFFFF;
                    font-size: 14px;

                    div {
                        display: flex;

                        img {
                            width: 100%;
                            padding-top: 13px;
                        }

                        .el-menu {
                            background: none;
                        }

                        .is_app_active {
                            background: rgba(29, 184, 248, 1) !important;
                        }

                        .el-menu-demo {
                            border-bottom: none;
                        }

                        .el-menu--horizontal > .el-menu-item.is-active {
                            background: #272B30;
                            border-bottom: none;
                            color: #ffffff;
                        }

                        .el-menu-item:focus, .el-menu-item:hover {
                            background: none;
                            color: #ffffff;
                        }

                        ul {
                            margin-left: 31px;

                            li {
                                display: inline-block;
                                height: 50px;
                                line-height: 50px;
                                margin-right: 15px;
                                padding: 0 15px;
                                cursor: pointer;
                                color: #D9D9D9;
                                border-bottom: none;

                                .el-badge {
                                    height: 50px;

                                    button {
                                        background: none;
                                        color: #D9D9D9;
                                        border: none;
                                        font-size: 14px;
                                        padding: 0;
                                    }

                                    button:hover {
                                        color: #ffffff;
                                    }

                                    .el-badge__content.is-fixed {
                                        top: 14px;
                                        right: 6px;
                                    }

                                    .el-badge__content {
                                        border: none;
                                        line-height: 17px;
                                        padding: 0 5px;
                                    }
                                }
                            }
                        }
                    }
                }

                .active_app_item {
                    /*background:rgba(29,184,248,1);*/
                    /*border-bottom:none;*/
                    color: #ffffff !important;
                }

                .logout {
                    /*width: 200px;*/
                    height: 100%;
                    float: right;
                    /*padding: 0 10px;*/
                    /*padding: 0 10px;*/

                    ul {
                        align-self: center;
                        border-bottom: none;
                        background: none;
                        height: 50px;
                        padding: 0 5px;

                        li {
                            height: 50px;
                            line-height: 50px;
                            padding: 0 !important;

                            .el-submenu__title {
                                display: flex;
                                height: 50px;
                                line-height: 50px;

                                .Avatar {
                                    height: 100%;
                                    padding-top: 10px;
                                    display: flex;
                                    color: #D9D9D9;
                                    font-size: 14px;

                                    img {
                                        width: 30px;
                                        height: 30px;
                                        border-radius: 50%;
                                        cursor: pointer;
                                        align-self: flex-start;
                                    }

                                    .work_name {
                                        align-self: flex-start;
                                        height: 100%;
                                        margin-right: 12px;
                                        line-height: 30px;
                                    }
                                }

                                i {
                                    display: none;
                                }

                            }
                        }
                    }
                }

                /*.is-opened{
                    background: #272B30;
                }*/

            }
        }

        .person-wrap {
            width: 1000px;
            margin: 32px auto;

            .content {
                width: 100%;
                display: flex;

                .left {
                    width: 260px;
                    margin-right: 17px;
                    background: #fff;
                    border: 1px solid rgba(235, 235, 235, 1);
                    border-radius: 8px;
                    text-align: center;

                    .person_header {
                        margin-top: 19px;
                        padding-bottom: 19px;

                        img {
                            margin-top: 22px;
                            margin-bottom: 16px;
                            width: 74px;
                            height: 74px;
                            border-radius: 50%;

                        }

                        p {
                            margin-bottom: 11px;
                            font-size: 14px;
                            color: #4D4D4D;
                        }

                        span {
                            font-size: 12px;
                            color: #999999;
                        }
                    }

                    .person_header:hover {
                        background: rgba(247, 247, 247, 1);
                    }

                    .line {
                        margin-top: 19px;
                        margin-bottom: 6px;
                        display: inline-block;
                        width: 237px;
                        height: 1px;
                        border-bottom: 1px dashed rgba(230, 230, 230, 1);
                    }

                    .tac {
                        .el-col-12 {
                            width: 100%;

                            .el-menu {
                                border: none;

                                li {
                                    position: relative;
                                    margin-top: 17px;
                                    height: 50px;
                                    line-height: 50px;
                                    cursor: pointer;
                                    color: #808080;
                                    font-size: 14px;
                                    text-align: center;

                                    img {
                                        width: 22px;
                                        margin-right: 17px;
                                    }

                                    img:nth-child(2) {
                                        position: absolute;
                                        margin: 0;
                                        top: 33%;
                                        right: -1px;
                                        width: 10px;
                                        vertical-align: unset;
                                    }
                                }

                                .el-menu-item:focus {
                                    background: none;
                                }

                                .el-menu-item:hover {
                                    background: rgba(247, 247, 247, 1);
                                }
                            }
                        }


                    }
                }

                .right {
                    width: 724px;
                }
            }
        }

        .customer {
            position: fixed;
            bottom: 100px;
            right: 40px;
            z-index: 10;
            width: 40px;
            height: 40px;
            border-radius: 50%;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .chatCustomer {
            text-align: left;

            .el-dialog__body {
                .message-list {
                    height: 45vh;
                    overflow-y: auto;

                    .more {
                        text-align: center;
                    }

                    .no-more {
                        text-align: center;
                        color: #999999;
                        margin-bottom: 20px;
                    }
                }

                .newMessageTips {
                    position: absolute;
                    cursor: pointer;
                    padding: 5px;
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
                    color: #2d8cf0;
                    /*border: $border-light 1px solid;
                    background-color: $white;
                    color: $primary;*/
                }

                .message-list::-webkit-scrollbar {
                    width: 2px;
                }
            }

            .el-dialog__footer {
                margin: 0 auto;
                padding: 0;

                .send {
                    margin: 0;
                }
            }
        }
    }

    .active_left {
        color: #24BFFF;
    }

    .active_item {
        background: #272B30;
    }

    .el-loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    a {
        color: white;
    }

    .self-coc {
        .el-menu--horizontal {
            border-bottom: none;

            .el-menu--popup {
                font-size: 16px;
                /*height: 50px;*/
                margin: 0 16px;
                /*padding: 0 5px;*/
                /*line-height: 50px;*/
                background-color: #fff !important;

                li {
                    background: none !important;
                }
            }

            .el-menu-item.is-active {
                color: #ffffff !important;
                border-bottom: 3px solid #00e0ba;
            }
        }
    }
    .el-menu--horizontal{
        .el-menu--popup{
            background-color: white!important;
            .is-active{
                color: #000!important;
            }
            .el-menu-item{
                border-bottom: 1px solid #d9d9d9;
                background-color: white!important;
            }
            .el-menu-item:last-child{
                border-bottom:none
            }
        }
    }



</style>
