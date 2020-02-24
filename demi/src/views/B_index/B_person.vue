<template>
    <div class="right">
        <div class="person_main">
            <div class="task">
                <div class="title" @click="handleTask('all')">
                    <div>
                        <span></span>
                        <span>任务管理</span>
                    </div>
                    <div>
                        <img src="../../assets/img/icon_return_2@2x.png" alt="">
                    </div>
                </div>
                <span class="line"></span>
                <div class="task_list">
                    <ol>
                        <li v-for="status in task_status" :key="status.activeName"
                            @click="handleTask(status.activeName)">
                            <div><p>{{status.name}}</p>
                                <p>{{status.num}}</p></div>
                        </li>
                    </ol>
                </div>
            </div>
            <div class="order">
                <div class="order_header">
                    <span></span>
                    <span>订单列表</span>
                </div>
                <div class="order_list">
                    <ul>
                        <li v-for="status in order_status" :key="status.activeName"
                            @click="handleOrder(status.activeName)">
                            <div class="order_list_wrap">
                                <div>
                                    <span>{{status.num}}</span>
                                    <span>{{status.name}}</span>
                                </div>
                                <div>
                                    <img src="../../assets/img/icon_return_2@2x.png" alt="">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="post">
            <div class="post_header">
                <div style="align-self: center">
                    <span></span>
                    <span>职位管理</span>
                    <span>全职岗位</span>
                </div>
                <p>任务</p>
            </div>
            <div class="post_list">
                <ul v-show="work_list3 && work_list3.length > 0">
                    <li v-for="work in work_list3" :key="work.work_id">
                        <div class="post_list_wrap">
                            <div class="content">
                                <p>{{work.work_name}}</p>
                                <div>
                                    <span>{{(parseInt(work.salary_min))/1000}}-{{(parseInt(work.salary_max))/1000}}k</span>
                                    <span><img src="../../assets/img/icon_return_2@2x.png" alt=""></span>
                                </div>
                            </div>
                            <p>
                                <span v-text="work.work_experience_min === 0 ? '不限/' : work.work_experience_min + '-' + work.work_experience_max + '年/'"></span>
                                <span v-if="work.education === 0">不限/</span>
                                <span v-if="work.education === 1">初中及以下/</span>
                                <span v-if="work.education === 2">中专/中技/</span>
                                <span v-if="work.education === 3">高中/</span>
                                <span v-if="work.education === 4">大专/</span>
                                <span v-if="work.education === 5">本科/</span>
                                <span v-if="work.education === 6">硕士/</span>
                                <span v-if="work.education === 7">博士/</span>
                                <span>{{work.city && work.city.city_name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="none" v-show="work_list3 && work_list3.length === 0">
                    <img src="../../assets/img/snail@2x.png" alt="">
                    <button @click="handleWork('work')">去发布</button>
                </div>
                <div style="width:1px;height: 186px;border-right: 0.5px solid #F2F2F2;border-left: 0.5px solid #f2f2f2;margin-top: 16px"></div>
                <ul v-show="task_list3 && task_list3.length > 0">
                    <li v-for="task in task_list3" :key="task.task_id">
                        <div class="post_list_wrap">
                            <div class="content">
                                <p>{{task.task_title}}</p>
                                <div>
                                    <span><img src="../../assets/img/icon_return_2@2x.png" alt=""></span>
                                </div>
                            </div>
                            <p><span v-text="task.payment_method === 1 ? '即结/签合同/' : '完工结/签合同/'"></span>
                                <span v-text="task.city ? task.city.city_name : '不限'"></span></p>
                        </div>
                    </li>
                </ul>
                <div class="none" v-show="task_list3 && task_list3.length === 0">
                    <img src="../../assets/img/snail@2x.png" alt="">
                    <button @click="handleWork('task_work')">去发布</button>
                </div>
            </div>
            <div class="post_bottom">
                <div v-show="work_list3 && work_list3.length > 0">
                    <button @click="handleWork('work')">查看所有 ></button>
                </div>
                <div v-show="(work_list3 && work_list3.length === 0) || (task_list3 && task_list3.length === 0)"></div>
                <div v-show="task_list3 && task_list3.length > 0">
                    <button @click="handleWork('task_work')">查看所有 ></button>
                </div>
            </div>
        </div>
        <div class="interview">
            <div class="interview_header">
                <span></span>
                <span>面试管理</span>
            </div>
            <div class="none_interview_lists" v-show="interview_list3.length===0">
                <div>
                    <img src="../../assets/img/snail@2x.png" alt="">
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="interview_lists" v-show="interview_list3.length>0">
                <ul>
                    <li v-for="interview in interview_list3" :key="interview.interview_id">
                        <div class="interview_lists_wrap">
                            <div class="info">
                                <div>
                                    <img v-if="interview.candidate" :src="interview.candidate.avatar" alt="">
                                    <img v-if="!interview.candidate" src="../../assets/img/toxiang@2x.png" alt="">
                                </div>
                                <span class="info_text">
                                    <p style="margin-bottom: 10px">
                                        <span style="font-size: 16px;color: #4D4D4D;margin-right: 18px">{{interview.candidate.nickname}}</span>
                                        <span>
                                            <img v-if="interview.candidate.real.sex === 2" src="../../assets/img/girl@2x.png" alt="">
                                            <img v-if="interview.candidate.real.sex === 1" src="../../assets/img/boy@2x.png" alt="">
                                        </span>
                                        <span class="vita_info" style="color: #999999;font-size: 12px">{{interview.vita.work_start_date}}年/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 1">初中及以下/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 2">中专/中技/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 3">高中/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 4">大专/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 5">本科/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 6">硕士/</span>
                                        <span class="vita_info" v-if="interview.vita.education === 7">博士/</span>
                                        <span class="vita_info">{{interview.work && interview.work.work_name}}</span>
                                    </p>
                                    <p style="color: #999999;font-size: 12px">面试时间：{{interview.time}} <span
                                            v-if="interview.status === 3">[已同意]</span>
                                        <span v-if="interview.status === 1">[已取消]</span>
                                        <span v-if="interview.status === 2">[已拒绝]</span>
                                        <span v-if="interview.status === 4">[已面试]</span>
                                        <span v-if="interview.status === 5">[已反馈]</span>
                                        <span v-if="interview.status === 0">[等待同意]</span>
                                    </p>
                                </span>
                            </div>
                            <div class="info_button" v-if="interview.status !== 1 && interview.status !== 2">
                                <button @click="handleMsg(interview.candidate.user_id,interview.work_id)">和他聊聊</button>
                                <button v-if="interview.status === 0" @click="canleIv(interview.interview_id)">取消面试</button>
                                <button v-if="interview.status === 3">等待面试</button>
                                <button v-if="interview.status === 4">已面试</button>
                                <button v-if="interview.status === 5">已反馈</button>
                            </div>
                            <div class="info_button" v-if="interview.status === 1 || interview.status === 2">
                                <img src="../../assets/img/countermand@2x.png" alt="">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="interview_bottom" v-show="interview_list3.length>0">
                <div>
                    <button @click="handleInterview">查看所有></button>
                </div>
            </div>
        </div>
        <div class="wallet">
            <div class="wallet_header">
                <div class="title">
                    <span></span>
                    <span>我的钱包</span>
                </div>
                <div class="wallet_header_button" @click="handleWallet">
                    <button>提现<img src="../../assets/img/icon_return_3@2x.png" alt=""></button>
                </div>
            </div>
            <span class="line"></span>
            <div class="wallet_money">
                <div class="wallet_money_wrap" @click="handleWallet">
                    <div class="money">
                        <p v-text="user_info ? user_info.available_amount_b : '--'"></p>
                        <p>可用金额</p>
                    </div>
                </div>
                <div style="width:1px;height: 96px;border-right: 0.5px solid #F2F2F2;border-left: 0.5px solid #f2f2f2;margin-top: 16px"></div>
                <div class="wallet_money_wrap" @click="handleWallet">
                    <div class="money">
                        <p v-text="user_info ? user_info.unusable_amount_b : '--'"></p>
                        <p>冻结金额</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import '../../assets/css/reset.css'
    import bottom from '../../components/B_person_bottom'
    import http from '../../libs/http'
    import {forEach} from "../../libs/tools";



    export default {
        name: 'B_person',
        components: {bottom},
        data() {
            return {
                a: false,
                work_list3: [],
                task_list3: [],
                interview_list3: [],
                user_info: {
                    available_amount_b: null,
                    unusable_amount_b: null,
                },
                task_status: [
                    {activeName: 'todo', name: '待处理', num: 0},
                    {activeName: 'doing', name: '进行中', num: 0},
                    {activeName: 'end', name: '已结束', num: 0},
                ],
                order_status: [
                    {activeName: 'unpaid', name: '未付款', num: 0},
                    {activeName: 'paid', name: '已付款', num: 0},
                    {activeName: 'shipped', name: '已发货', num: 0},
                    {activeName: 'refund', name: '退款中', num: 0},
                ],
            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                if (res.type === 2) {
                    //钱包
                    this.user_info.available_amount_b = res.available_amount_b;
                    this.user_info.unusable_amount_b = res.unusable_amount_b;
                    // this.$store.commit('loading', true);

                    //只岗位显示三条数据
                    this.apiGet('/api/work/paginate?user_id=' + res.user_id + '&per_page=3&page=1').then((res) => {
                        // console.log(res)
                        this.work_list3 = res.data;
                        // this.$store.commit('loading', false);
                    });

                    //只任务显示三条数据
                    this.apiGet('/api/task/paginate?user_id=' + res.user_id + '&per_page=3&page=1').then((res) => {
                        this.task_list3 = res.data;
                        // this.$store.commit('loading', false);
                    });

                    //我的任务状态总数
                    this.apiGet('/api/task/order/paginate?status=0').then((res) => {
                        this.task_status[0].num = res.total;
                        // this.$store.commit('loading', false);
                    });
                    this.apiGet('/api/task/order/paginate?status[0]=1&status[1]=3').then((res) => {
                        this.task_status[1].num = res.total;
                        // this.$store.commit('loading', false);
                    });
                    this.apiGet('/api/task/order/paginate?status[0]=2&status[1]=4').then((res) => {
                        this.task_status[2].num = res.total;
                        // this.$store.commit('loading', false);
                    });

                    //我的订单状态总数
                    this.apiGet('/api/order/paginate?status=2').then((res) => {
                        this.order_status[0].num = res.total;
                        // this.$store.commit('loading', false);
                    });
                    this.apiGet('/api/order/paginate?status[0]=0&status[1]=1').then((res) => {
                        this.order_status[1].num = res.total;
                        // this.$store.commit('loading', false);
                    });
                    this.apiGet('/api/order/paginate?status=3').then((res) => {
                        this.order_status[2].num = res.total;
                        // this.$store.commit('loading', false);
                    });

                    //面试记录三条
                    this.apiGet('/api/work/interview/lists?per_page=3&page=1').then((res) => {
                        // console.log(res)
                        forEach(res.data, item => {
                            if (item.vita.work_start_date) {
                                item.vita.work_start_date = new Date().getFullYear() - parseInt(item.vita.work_start_date.split('-')[0]);
                            }
                        });
                        this.interview_list3 = res.data;
                        // this.$store.commit('loading', false);
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration: 1000
                    });
                    this.$router.push({
                        name: "login"
                    });

                }
            })
        },
        methods: {
            handleTask(activeName) {
                this.$router.push({
                    name: "task",
                    params: {
                        activeName: activeName
                    }
                });
            },
            handleOrder(activeName) {
                this.$router.push({
                    name: "order",
                    params: {
                        activeName: activeName
                    }
                });
            },
            handleWork(activeName) {
                this.$router.push({
                    name: "work",
                    params: {
                        activeName: activeName
                    }
                });
            },
            handleInterview() {
                this.$router.push({
                    name: "interview",
                });
            },
            handleWallet() {
                this.$router.push({
                    name: "wallet",
                });
            },
            //取消面试
            canleIv(id){
                this.apiPost('/api/work/interview/update/' + id).then((res)=>{
                    // console.log(res)
                })
            },
            //聊天
            handleMsg(id,key){
                let data = {};
                data.recipient = id;
                data.foreign_key = key;
                data.type = 1;
                this.$router.push({
                    name: "IM",
                    params:{id :JSON.stringify(data)}
                });
            }
        },
        watch: {},
        mixins: [http],
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family: MicrosoftYaHeiLight;

        .person_main {
            display: flex;
            justify-content: space-between;
            height: 230px;
            margin-bottom: 17px;

            .task {
                margin-right: 17px;
                height: 100%;
                width: 50%;
                background: #fff;
                border: 1px solid rgba(235, 235, 235, 1);
                border-radius: 8px;

                .title {
                    height: 14px;
                    line-height: 14px;
                    display: flex;
                    justify-content: space-between;
                    padding: 16px 18px;
                    cursor: pointer;

                    span:nth-child(1) {
                        width: 3px;
                        height: 15px;
                        border-radius: 2px;
                        background: #24BFFF;
                        margin-right: 8px;
                        display: inline-block;
                        vertical-align: middle;
                    }

                    span:nth-child(2) {
                        font-size: 14px;
                        color: #4D4D4D;
                        vertical-align: middle;
                    }

                    img {
                        width: 8px;
                        vertical-align: middle;
                    }

                }

                .line {
                    margin: 0 18px;
                    display: inline-block;
                    width: 318px;
                    height: 1px;
                    border-bottom: 1px dashed rgba(230, 230, 230, 1);
                }

                .task_list {
                    padding: 8px 0;

                    ol {
                        width: 100%;

                        li {
                            display: inline-block;
                            width: 118px;
                            height: 105px;
                            padding: 17px 0 20px 0;
                            border-radius: 6px;

                            div {
                                width: 100%;
                                height: 100%;
                                border-right: 1px solid #F2F2F2;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                cursor: pointer;

                                p:nth-last-child(1) {
                                    margin-bottom: 14px;
                                    color: #24BFFF;
                                    font-size: 30px;
                                }

                                p {
                                    color: #999999;
                                    font-size: 12px;
                                }
                            }
                        }

                        li:nth-last-child(1) {
                            div {
                                border-right: none;

                            }
                        }

                        li:hover {
                            background: #F7F7F7;
                        }

                    }
                }
            }

            .order {
                height: 100%;
                width: 50%;
                background: #fff;
                border: 1px solid rgba(235, 235, 235, 1);
                border-radius: 8px;

                .order_header {
                    height: 39px;
                    padding: 16px 0 9px 16px;
                    text-align: left;
                    box-sizing: border-box;

                    span:nth-child(1) {
                        width: 3px;
                        height: 15px;
                        border-radius: 2px;
                        background: #24BFFF;
                        margin-right: 8px;
                        display: inline-block;
                        vertical-align: middle;
                    }

                    span:nth-child(2) {
                        font-size: 14px;
                        color: #4D4D4D;
                        vertical-align: middle;
                    }
                }

                .order_list {
                    width: 100%;
                    height: 191px;

                    ul {
                        width: 100%;
                        height: 100%;

                        li {
                            width: 100%;
                            height: 47.7px;
                            cursor: pointer;

                            .order_list_wrap {
                                margin: 0 17px;
                                border-bottom: 1px solid #F2F2F2;
                                height: 100%;
                                display: flex;
                                justify-content: space-between;

                                div {
                                    align-self: center;

                                    span {
                                        height: 34px;
                                        margin-right: 25px;
                                        font-size: 14px;
                                        color: #4D4D4D;
                                    }

                                    span:nth-child(1) {
                                        width: 68px;
                                        color: #999999;
                                        font-size: 16px;
                                        padding: 11px 25px;
                                        border-right: 1px solid #F2F2F2;
                                    }

                                    img {
                                        width: 8px;
                                    }
                                }
                            }
                        }

                        li:nth-last-child(1) {
                            border-radius: 0 0 8px 8px;

                            .order_list_wrap {
                                border-bottom: none;
                            }
                        }

                        li:hover {
                            background: #F7F7F7;
                        }
                    }
                }
            }
        }

        .post {
            width: 100%;
            border-radius: 8px;
            height: 311px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            margin-bottom: 16px;
            box-sizing: border-box;

            .post_header {
                padding: 16px 29px 9px 18px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                span:nth-child(1) {
                    width: 3px;
                    height: 15px;
                    border-radius: 2px;
                    background: #24BFFF;
                    margin-right: 8px;
                    display: inline-block;
                    vertical-align: middle;
                }

                span:nth-child(2) {
                    font-size: 14px;
                    color: #4D4D4D;
                    vertical-align: middle;
                }

                span:nth-child(3) {
                    color: #CCCCCC;
                    font-size: 12px;
                    vertical-align: middle;
                    margin-bottom: 1.5px;
                    margin-left: 200px;
                }

                p {
                    align-self: center;
                    color: #CCCCCC;
                    font-size: 12px;
                }
            }

            .post_list {
                width: 100%;
                display: flex;
                justify-content: space-between;
                cursor: pointer;

                .none {
                    width: 50%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    margin-top: 50px;

                    img {
                        align-self: center;
                        width: 143px;
                        margin: 0 0 32px 0;
                    }

                    button {
                        align-self: center;
                        width: 143px;
                        height: 32px;
                        color: #999999;
                        font-size: 12px;
                        border: 1px solid rgba(230, 230, 230, 1);
                        background: rgba(255, 255, 255, 1);
                        border-radius: 16px;
                        cursor: pointer;
                    }

                    button:hover {
                        background: rgba(247, 247, 247, 1);
                        border: none;
                    }
                }

                .none:nth-child(1) {
                    border-right: 1px solid rgba(242, 242, 242, 1);
                }

                ul {
                    width: 50%;

                    li {
                        width: 100%;
                        height: 74px;
                        padding: 20px 28px 0 30px;
                        box-sizing: border-box;

                        .post_list_wrap {
                            width: 100%;
                            height: 100%;
                            border-bottom: 1px dashed #E6E6E6;
                            text-align: left;

                            p {
                                color: #808080;
                                font-size: 12px;
                            }

                            .content {
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 7px;

                                p {
                                    color: #24BFFF;
                                }

                                div {
                                    span:nth-child(1) {
                                        margin-right: 18px;
                                        color: #808080;
                                        font-size: 12px;
                                    }

                                    img {
                                        width: 7px;
                                        margin-top: 1px;
                                    }
                                }
                            }
                        }
                    }

                    li:nth-last-child(1) {
                        div {
                            border-bottom: none;
                        }
                    }

                    li:hover {
                        background: #F7F7F7;
                    }
                }
            }

            .post_bottom {
                display: flex;
                width: 100%;

                div {
                    width: 50%;

                    button {
                        width: 254px;
                        border: none;
                        border-radius: 18px;
                        height: 35px;
                        font-size: 12px;
                        color: #CCCCCC;
                        background: none;
                        cursor: pointer;
                    }

                    button:hover {
                        background: #F7F7F7;
                        color: #999999;
                    }
                }
            }
        }

        .interview {
            border-radius: 8px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            position: relative;
            margin-bottom: 16px;
            max-height: 386px;
            min-height: 172px;

            .interview_header {
                padding: 16px 0 7px 18px;
                box-sizing: border-box;
                text-align: left;

                span:nth-child(1) {
                    width: 3px;
                    height: 15px;
                    border-radius: 2px;
                    background: #24BFFF;
                    margin-right: 8px;
                    display: inline-block;
                    vertical-align: middle;
                }

                span:nth-child(2) {
                    font-size: 14px;
                    color: #4D4D4D;
                    vertical-align: middle;
                }
            }

            .none_interview_lists {
                padding: 20px 0;
                img {
                    width: 145px;
                    margin-bottom: 24px;
                }

                p {
                    color: #999999;
                    font-size: 12px;
                }
            }

            .interview_lists {
                width: 100%;

                ul {
                    width: 100%;

                    li {
                        padding: 22px 29px 0 29px;
                        box-sizing: border-box;
                        width: 100%;
                        height: 97px;

                        .interview_lists_wrap {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #F2F2F2;
                            padding-bottom: 22px;
                            box-sizing: border-box;

                            .info {
                                align-self: center;
                                text-align: left;
                                display: flex;

                                img {
                                    width: 54px;
                                    margin-right: 17px;
                                    border-radius: 50%;
                                }

                                .info_text {
                                    display: flex;
                                    flex-direction: column;
                                    align-self: center;

                                    img {
                                        width: 13px;
                                    }

                                    .vita_info {
                                        color: #999999;
                                        font-size: 12px
                                    }
                                }
                            }

                            .info_button {
                                align-self: center;
                                img{
                                    width: 46px;
                                    margin-right: 18px;
                                }

                                button {
                                    width: 82px;
                                    height: 27px;
                                    border-radius: 14px;
                                    font-size: 12px;
                                    cursor: pointer;
                                }

                                button:nth-child(1) {
                                    background: rgba(247, 253, 255, 1);
                                    border: 1px solid rgba(36, 191, 255, 1);
                                    color: #24BFFF;
                                    margin-right: 12px;
                                }

                                button:nth-child(1):hover {
                                    background: rgba(36, 191, 255, 1);
                                    border: none;
                                    color: #FFFFFF;
                                }

                                button:nth-child(2) {
                                    background: rgba(255, 255, 255, 1);
                                    border: 1px solid rgba(230, 230, 230, 1);
                                    color: #999999;
                                }

                                button:nth-child(2):hover {
                                    background: rgba(247, 247, 247, 1);
                                    border: none;
                                }
                            }
                        }
                    }

                    li:nth-last-child(1) {
                        .interview_lists_wrap {
                            border: none;
                        }
                    }
                }
            }

            .interview_bottom {
                width: 100%;
                margin-bottom:12px;

                div {
                    button {
                        width: 254px;
                        border: none;
                        border-radius: 18px;
                        height: 35px;
                        color: #CCCCCC;
                        background: none;
                        cursor: pointer;
                    }

                    button:hover {
                        background: #F7F7F7;
                        color: #999999;
                    }
                }
            }
        }

        .wallet {
            width: 100%;
            height: 204px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            border-radius: 8px;

            .wallet_header {
                padding: 16px 15px 15px 18px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                height: 47px;

                .title {
                    align-self: center;

                    span:nth-child(1) {
                        width: 3px;
                        height: 15px;
                        border-radius: 2px;
                        background: #24BFFF;
                        margin-right: 8px;
                        display: inline-block;
                        vertical-align: middle;
                    }

                    span:nth-child(2) {
                        font-size: 14px;
                        color: #4D4D4D;
                        vertical-align: middle;
                    }
                }

                .wallet_header_button {
                    align-self: center;
                    width: 77px;
                    height: 26px;
                    border-radius: 13px;

                    button {
                        width: 100%;
                        height: 100%;
                        border-radius: 13px;
                        border: none;
                        color: #24BFFF;
                        background: none;
                        cursor: pointer;

                        img {
                            width: 7px;
                            margin-left: 10px;
                            vertical-align: baseline;
                        }
                    }
                }

                .wallet_header_button:hover {
                    background: rgba(247, 247, 247, 1);
                }

            }

            .line {
                margin: 0 29px 14px 18px;
                display: inline-block;
                width: 677px;
                height: 1px;
                border-bottom: 1px dashed rgba(230, 230, 230, 1);
            }

            .wallet_money {
                width: 100%;
                display: flex;

                .wallet_money_wrap {
                    width: 50%;
                    box-sizing: border-box;
                    align-self: center;

                    .money {
                        width: 122px;
                        border-radius: 6px;
                        padding: 24px 0;
                        text-align: center;
                        box-sizing: border-box;
                        margin-left: 121px;
                        cursor: pointer;

                        p:nth-child(1) {
                            color: #4D4D4D;
                            font-size: 30px;
                            margin-bottom: 37px;
                        }

                        p {
                            color: #999999;
                            font-size: 12px;
                        }
                    }

                    .money:hover {
                        background: #F7F7F7;
                    }
                }
            }
        }
    }
</style>