<template>
    <div class="right">
        <div class="task_header">
            <span></span>
            <span>任务管理</span>
        </div>
        <div class="task_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

                <!--//全部-->
                <el-tab-pane label="全部" name="all">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <taskList :index="active_index" :task-list="task_list" @on-show-discuss="handleDiscuss_dia"
                                      @on-reset="initialize"></taskList>
                        </div>
                        <div class="none_list" v-show="task_list.length === 0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <!--//待处理-->
                <el-tab-pane label="待处理" name="todo">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <taskList :index="active_index" :task-list="task_list" @on-show-discuss="handleDiscuss_dia"
                                      @on-reset="initialize"></taskList>
                        </div>
                        <div class="none_list" v-show="task_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <!--//进行中-->
                <el-tab-pane label="进行中" name="doing">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <taskList :index="active_index" :task-list="task_list" @on-show-discuss="handleDiscuss_dia"
                                      @on-reset="initialize"></taskList>
                        </div>
                        <div class="none_list" v-show="task_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <!--已结束-->
                <el-tab-pane label="已结束" name="end">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <taskList :index="active_index" :task-list="task_list" @on-show-discuss="handleDiscuss_dia"
                                      @on-reset="initialize"></taskList>
                        </div>
                        <div class="none_list" v-show="task_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>

                <!-- 发布中-->
                <el-tab-pane label="发布中" name="release">
                    <div class="work_wrap_operate">
                        <button @click="handleRelease()">发布任务职位</button>
                    </div>
                    <div class="release-wrap">
                        <div class="work_list" v-show="tasks.length > 0" v-for="task in tasks"
                             :key="task.task_id">
                            <div class="work_list_wrap" @mouseover="show_copy = task.task_id"
                                 @mouseleave="show_copy = null">
                                <div class="work_list_info">
                                    <div class="work_title">
                                        <p>{{task.task_title}}</p>
                                        <p>
                                            <span v-text="task.city ? task.city.city_name : '不限'"></span>
                                            <span v-if="task.payment_money > 0"> - {{task.payment_money}}{{task.unit}}</span>
                                            <span v-if="(task.payment_method !== 3) && handleCommission(task.goods)">-{{handleCommission(task.goods)}}{{task.unit}}</span>
                                            <!--                                            <span v-if="task.payment_method === 1">/单</span>-->
                                        </p>
                                    </div>
                                    <div class="work_time">
                                        <div class="work_time_info">
                                            <p v-if="show_copy !== task.task_id">{{task.created_at.split(' ')[0]}}发布</p>
                                            <p style="cursor: pointer;margin:0 auto;width:92px;height:28px;line-height:28px;text-align:center;color:rgba(36,191,255,1);background:rgba(247,253,255,1);border:1px solid rgba(36, 191, 255, 1);border-radius:14px;"
                                               v-if="show_copy === task.task_id"
                                               @click="handleEdit(task,'Is_history')">复制发布</p>
                                        </div>
                                    </div>
                                    <div class="work_operate">
                                        <span @click="handleEdit(task)">编辑</span>
                                        <span v-if="task.status === 1" @click="handleOver(0,task.task_id)">下线</span>
                                        <span v-if="task.status === 0" @click="handleOver(1,task.task_id)">重新上线</span>
                                        <span @click="deleteWork(task)">删除</span>
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>

                        <!--//列表无数据时-->
                        <div class="none_list" v-show="tasks.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>


            <div class="paging" v-show="task_list.length>0">
                <el-pagination
                        :hide-on-single-page="true"
                        background
                        layout="prev, pager, next"
                        prev-text="上一页"
                        next-text="下一页"
                        :total="searchParams.total"
                        :current-page="searchParams.page"
                        :page-size="searchParams.per_page"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentPageChange"
                        :pager-count='5'
                >
                </el-pagination>
            </div>

            <el-dialog
                    :visible.sync="discuss"
                    custom-class="discuss"
                    :show-close=false
                    :lock-scroll=false
                    top="0">
                <div slot="title">
                    信誉评价
                </div>

                <div class="discuss_main">
                    <div class="discusser_avatar">
                        <img :src="discusser_info && discusser_info.user.avatar" alt="">
                    </div>
                    <div class="discusser_label">
                        <p class="discusser_name">{{discusser_info && discusser_info.user.nickname}}</p>
                        <p class="discusser_another">
                            <span v-if="discusser_info && discusser_info.snapshot.city">{{discusser_info.snapshot && discusser_info.snapshot.city.city_name}}</span>
                            <span v-if="discusser_info && !discusser_info.snapshot.city">不限城市</span>
                            <span>
                                {{discusser_info && discusser_info.snapshot.type_label.name}}
                            </span>
                        </p>
                    </div>
                </div>

                <div class="discuss_level">
                    <span>信誉评分：</span>
                    <div class="level_img">
                        <img src="../../../assets/img/star_level@2x.png" alt=""
                             v-for="(ed,index) in discuss_info.reputation" :key="ed.index"
                             @click="handleRec(index)">
                        <img src="../../../assets/img/star@2x.png" alt="" v-for="(ing,index) in discuss_ing"
                             :key="ing.index" @click="handleAdd(index)">
                    </div>
                    <span class="discuss_detail" v-if="discuss_info.reputation === 1">差</span>
                    <span class="discuss_detail" v-if="discuss_info.reputation === 2">不满意</span>
                    <span class="discuss_detail" v-if="discuss_info.reputation === 3">一般</span>
                    <span class="discuss_detail" v-if="discuss_info.reputation === 4">好</span>
                    <span class="discuss_detail" v-if="discuss_info.reputation === 5">非常好</span>
                </div>
                <div class="discuss_des">
                    <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="亲，写点评价吧，你的评价对其他企业有很大帮助的。"
                            v-model="discuss_info.description">
                    </el-input>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleDiscuss">发表评论</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import http from '../../../libs/http'
    import taskList from './taskList'

    export default {
        name: 'task',
        components: {
            taskList
        },
        data() {
            return {
                activeName: 'all',
                task_list: [],
                tasks:[],
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
                discuss: false,
                discusser_info: null,
                discuss_ing: 5,
                discuss_info: {
                    foreign_key: null,
                    reputation: 0,
                    description: null
                },
                index: 0,
                active_index: '0',
                show_copy: null,

            };
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
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
            });
            this.initialize();
            this.handleTask_Work_list()
        },
        created() {
            this.getRouterData();
        },
        methods: {
            // 切换状态导航

            handleClick(tab, event) {
                var array = [];
                this.active_index = tab.index;
                this.searchParams.page = 1;
                this.searchParams.total = 0;
                this.searchParams.per_page = 15;
                if (tab.index === '0') {
                    this.initialize();
                }
                if (tab.index === '1') {
                    array = [0];
                    this.initialize(array);
                }
                if (tab.index === '2') {
                    array = [1, 3, 5];
                    this.initialize(array);
                }
                if (tab.index === '3') {
                    array = [2, 4, 7];
                    this.initialize(array);
                }
            },

            //数据接口
            initialize(array) {
                if (array) {
                    this.searchParams.status = array;
                    this.apiGet('/api/task/order/paginate', this.searchParams).then((res) => {
                        this.task_list = res.data;
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                    });
                } else {
                    this.searchParams.status = [];
                    this.apiGet('/api/task/order/paginate', this.searchParams).then((res) => {
                        this.task_list = res.data;
                        console.log(res);
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                    })
                }
            },
            handleSizeChange(per_page) {
                var array = [];
                this.searchParams.per_page = per_page;
                if (this.active_index === '0') {
                    this.initialize()
                } else if (this.active_index === '1') {
                    array = [0, 5];
                    this.initialize(array);
                } else if (this.active_index === '2') {
                    array = [1, 3];
                    this.initialize(array);
                } else if (this.active_index === '3') {
                    array = [2, 4, 7];
                    this.initialize(array);
                }else{
                    this.handleTask_Work_list()
                }
                document.getElementById('app').scrollTo(0, 0)
            },
            handleCurrentPageChange(page) {
                var array = [];
                this.searchParams.page = page;
                if (this.active_index === '0') {
                    this.initialize()
                } else if (this.active_index === '1') {
                    array = [0, 5];
                    this.initialize(array);
                } else if (this.active_index === '2') {
                    array = [1, 3];
                    this.initialize(array);
                }  else if (this.active_index === '3') {
                    array = [2, 4, 7];
                    this.initialize(array);
                }else{
                    this.handleTask_Work_list()
                }
                document.getElementById('app').scrollTo(0, 0)
            },
            //跳创建全职或兼职路由
            handleRelease() {
                this.$router.push({
                    name: "create_task",
                    params: {
                        path: 'task'
                    }
                });
            },
            //跳编辑全职或兼职路由
            handleEdit(data, type) {
                // console.log(type);
                let task_data = {};
                task_data.id = data.task_id;
                task_data.payment_method = data.payment_method;
                if (type) {
                    task_data.isHistory = true;
                }
                task_data.path = 'task'
                this.$router.push({
                    name: "create_task",
                    params: {
                        task: JSON.stringify(task_data)
                    }
                });

            },
            handleCommission(array) {
                if (array) {
                    let length = array.length;
                    if (length > 0) {
                        if (length > 1) {
                            let commission = [];
                            for (let i = 0; i < length; i++) {
                                commission.push(parseFloat(array[i].price))
                            }
                            commission.sort();
                            return "(" + commission[0] + "～" + commission[length - 1] + ")"
                        } else {
                            return array[0].price
                        }
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            },

            //岗位下线
            handleOver(status, id) {
                this.apiPost('/api/task/update/' + id, {status: status}).then((res) => {
                    if (res) {
                        this.handleTask_Work_list()
                    }
                })

            },

            //删除岗位或兼职
            deleteWork(data) {
                this.$confirm('该操作将彻底删除该数据切无法恢复，确定要继续吗?', '提示', {
                    distinguishCancelAndClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '请稍等...';

                            this.apiDelete('/api/task/delete/' + data.task_id).then((res) => {
                                if (res !== false) {
                                    this.handleTask_Work_list();
                                    done();
                                }
                                instance.confirmButtonLoading = false;
                                instance.confirmButtonText = '确定';
                            }).catch(() => {
                                instance.confirmButtonLoading = false;
                                instance.confirmButtonText = '确定';
                            });

                        } else {
                            done();
                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = '确定';
                        }
                    }
                }).catch(() => {
                });
            },

            //兼职数据列表
            handleTask_Work_list() {
                this.apiGet('/api/user/info').then((res) => {
                    this.apiGet('/api/task/paginate?user_id=' + res.user_id, this.searchParams).then((res) => {
                        this.tasks = res.data;
                        console.log(res)
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                        // this.$store.commit('loading', false);
                    });
                })
            },

            /*//通过任务
            handlePass(index, id, user_id) {
                this.apiPost('/api/task/order/status/' + id, {status: 1}).then((res) => {
                    if (res) {
                        if (index === 0) {
                            this.initialize()
                        } else if (index === 1) {
                            this.initialize(0)
                        }
                        let userID = user_id + 'a';
                        const message = this.tim.createCustomMessage({
                            to: userID,
                            conversationType: "C2C",
                            payload: {
                                data: '', // 用于标识该消息是骰子类型消息
                                description: '[任务发布者通过了任务申请]', // 获取骰子点数
                                extension: ''
                            }
                        });
                        let promise = this.tim.sendMessage(message);
                        promise.then(function(imResponse) {
                            // 发送成功
                            console.log(imResponse);
                        }).catch(function(imError) {
                            // 发送失败
                            console.warn('sendMessage error:', imError);
                        });
                    }
                })
            },*/

            /*//拒绝任务
            handleRefuse(index, id, user_id) {
                this.apiPost('/api/task/order/status/' + id, {status: 2}).then((res) => {
                    // console.log(res);
                    if (res) {
                        if (index === 0) {
                            this.initialize()
                        } else if (index === 1) {
                            this.initialize(0)
                        }
                        let userID = user_id + 'a';
                        const message = this.tim.createCustomMessage({
                            to: userID,
                            conversationType: "C2C",
                            payload: {
                                data: '', // 用于标识该消息是骰子类型消息
                                description: '[任务发布者拒绝了任务申请]', // 获取骰子点数
                                extension: ''
                            }
                        });
                        let promise = this.tim.sendMessage(message);
                        promise.then(function(imResponse) {
                            // 发送成功
                            console.log(imResponse);
                        }).catch(function(imError) {
                            // 发送失败
                            console.warn('sendMessage error:', imError);
                        });
                    }
                })
            },*/

            /*//结束任务
            handleOver(index, id, user_id) {
                this.apiPost('/api/task/order/status/' + id, {status: 4}).then((res) => {
                    if (res) {
                        if (index === 0) {
                            this.initialize()
                        } else if (index === 2) {
                            this.initialize(1, 3)
                        }
                        let userID = user_id + 'a';
                        const message = this.tim.createCustomMessage({
                            to: userID,
                            conversationType: "C2C",
                            payload: {
                                data: '', // 用于标识该消息是骰子类型消息
                                description: '[任务发布者结束了任务]', // 获取骰子点数
                                extension: ''
                            }
                        });
                        let promise = this.tim.sendMessage(message);
                        promise.then(function(imResponse) {
                            // 发送成功
                            console.log(imResponse);
                        }).catch(function(imError) {
                            // 发送失败
                            console.warn('sendMessage error:', imError);
                        });
                    }
                })
            },*/

            //评价
            handleDiscuss_dia(show, item, index) {
                this.discuss = show;
                this.discusser_info = item;
                this.index = index
            },

            //评价级别
            handleAdd(index) {
                if (this.discuss_ing === 5 && index > 0) {
                    this.discuss_ing = 4 - index;
                    this.discuss_info.reputation = index + 1;
                } else if (this.discuss_ing !== 5 && index > 0) {
                    this.discuss_ing = this.discuss_ing - (index + 1);
                    this.discuss_info.reputation = 5 - this.discuss_ing;
                } else if (this.discuss_ing === 5 && index < 1) {
                    this.discuss_ing = 4 - index;
                    this.discuss_info.reputation = index + 1;
                } else if (this.discuss_ing !== 5 && index < 1) {
                    this.discuss_ing = this.discuss_ing - 1;
                    this.discuss_info.reputation = 5 - this.discuss_ing
                }
            },
            handleRec(index) {
                this.discuss_ing = 4 - index;
                this.discuss_info.reputation = index + 1
            },

            //创建评论
            handleDiscuss() {
                this.discuss_info.foreign_key = this.discusser_info.task_order_id;
                if (this.discuss_info.reputation < 1) {
                    this.$message({
                        showClose: true,
                        message: '请评分',
                        duration: 1000
                    })
                } else if (this.discuss_info.description === null) {
                    this.$message({
                        showClose: true,
                        message: '请填写评论',
                        duration: 1000
                    })
                } else {
                    this.apiPost('/api/task/comment/create', this.discuss_info).then((res) => {
                        if (res) {
                            this.discuss = false;
                            this.discuss_ing = 5;
                            this.discuss_info.reputation = 0;
                            this.discuss_info.description = null;
                            if (this.index === '0') {
                                this.initialize()
                            } else if (this.index === '3') {
                                this.initialize([2, 4, 7])
                            }
                        }
                    })
                }
            },

            //跳路由接收的参数
            getRouterData() {
                if (this.$route.params.activeName) {
                    this.activeName = this.$route.params.activeName;
                } else {
                    return this.activeName
                }
            },

            //聊天
            handleMsg(id, key) {
                let data = {};
                data.recipient = id;
                data.foreign_key = key;
                data.type = 2;
                this.$router.push({
                    name: "IM",
                    params: {id: JSON.stringify(data)}
                });
            },

            pay() {
                this.$message('请在app完成此操作')
            }
        },
        watch: {},
        mixins: [http]
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family: MicrosoftYaHeiLight;

        .task_header {
            padding: 20px 0 29px 2px;
            box-sizing: border-box;
            text-align: left;
            font-family: MicrosoftYaHei;
            display: flex;

            span:nth-child(1) {
                width: 4px;
                height: 22px;
                border-radius: 2px;
                background: #24BFFF;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
            }

            span:nth-child(2) {
                font-size: 20px;
                color: #4D4D4D;
            }
        }

        .task_main {
            margin-left: 1px;
            background: #FFFFFF;
            border-radius: 8px;
            width: 100%;
            height: 100%;
            .work_wrap_operate {
                width: 100%;
                padding: 20px 38px 0 0;
                text-align: right;
                box-sizing: border-box;
                border-left: 1px solid rgba(235, 235, 235, 1);
                border-right: 1px solid rgba(235, 235, 235, 1);

                button {
                    width: 106px;
                    height: 28px;
                    background: rgba(36, 191, 255, 1);
                    color: #fff;
                    border: none;
                    border-radius: 14px;
                    font-size: 12px;
                }
            }

            .release-wrap{
                background: rgba(247, 248, 250, 1);

                .work_list {
                    width: 100%;
                    background: #fff;

                    .work_list_wrap {
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);

                        .work_list_info {
                            width: 100%;
                            padding: 31px 38px;
                            font-size: 13px;
                            color: #4D4D4D;
                            text-align: left;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;

                            .work_title {
                                align-self: center;
                                color: #4D4D4D;
                                width: 30%;

                                p:nth-child(1) {
                                    margin-bottom: 10px;
                                    font-size: 15px;
                                }

                                p:nth-child(2) {
                                    color: #999;
                                }
                            }

                            .work_time {
                                align-self: center;
                                width: 30%;
                                text-align: center;

                                .work_time_info {
                                    font-size: 12px;
                                    color: #999;
                                }
                            }

                            .work_operate {
                                align-self: center;
                                font-size: 13px;
                                color: #24BFFF;
                                width: 162px;
                                display: flex;
                                justify-content: inherit;

                                span {
                                    margin-right: 29px;
                                    cursor: pointer;
                                }

                                span:nth-last-child(1) {
                                    margin-right: 0;
                                }
                            }
                        }

                        .work_list_info:hover {
                            background: #FAFAFA;
                        }

                        .line {
                            margin: 0 auto;
                            width: 648px;
                            border-top: 1px solid rgba(242, 242, 242, 1);
                        }
                    }
                }

            }

            .release-wrap> .work_list:nth-last-child(2) {
                width: 100%;
                background: #fff;
                border-radius: 0 0 8px 8px;

                .work_list_wrap {
                    border-radius: 0 0 8px 8px;
                    border-bottom: 1px solid rgba(235, 235, 235, 1);
                }
            }

            .all-wrap {
                background: rgba(247, 248, 250, 1);

                .task_list {
                    width: 100%;

                    .task_list_wrap {
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        background: #fff;

                        .task_list_info {
                            width: 100%;
                            padding: 31px 38px;
                            font-size: 13px;
                            color: #4D4D4D;
                            text-align: left;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;

                            .task_title {
                                align-self: center;
                                width: 139px;
                                color: #24BFFF;
                                margin-right: 45px;

                                p:nth-child(1) {
                                    width: 100%;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    margin-bottom: 7px;
                                }

                                p:nth-child(2) {
                                    color: #999;
                                    font-size: 12px;
                                }
                            }

                            .task_buyer {
                                align-self: center;
                                width: 189px;
                                margin-right: 47px;

                                .task_buyer_info {
                                    display: flex;

                                    div:nth-child(1) {
                                        align-self: center;
                                        margin-right: 12px;

                                        img {
                                            width: 35px;
                                            height: 35px;
                                            border-radius: 50%;
                                        }
                                    }

                                    div:nth-child(2) {
                                        width: 142px;

                                        p:nth-child(1) {
                                            margin-bottom: 7px;
                                        }

                                        p:nth-child(2) {
                                            width: 100%;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            color: #999;
                                            font-size: 12px !important;
                                        }
                                    }
                                }

                                .order_sum {
                                    margin-top: 3px;
                                    margin-left: 47px;
                                    color: #999;
                                    font-size: 12px !important;
                                }
                            }

                            .task_operate {
                                align-self: center;
                                display: flex;
                                height: 29px;
                                font-size: 12px;

                                .active_over {
                                    background: #EBEBEB !important;
                                    color: #999999 !important;
                                }

                                button {
                                    height: 100%;
                                    border: none;
                                    border-radius: 15px;
                                    font-size: 12px;
                                    line-height: 29px;
                                    padding: 0;
                                    cursor: pointer;
                                }

                                .first {
                                    width: 82px;
                                    margin-right: 10px;
                                    background: #fff;
                                    color: rgba(36, 191, 255, 1);
                                    border: 1px solid rgba(235, 235, 235, 1);
                                    cursor: pointer;
                                }

                                button:nth-child(2) {
                                    width: 136px;
                                    background: rgba(36, 191, 255, 1);
                                    color: #fff;
                                    cursor: pointer;
                                }
                            }
                        }

                        .line {
                            margin: 0 auto;
                            width: 648px;
                            border-top: 1px solid rgba(242, 242, 242, 1);
                        }
                    }
                }

            }

            .all-wrap > .task_list {
                .task_list_wrap:nth-last-child(1) {
                    .line {
                        display: none;
                    }
                }

                .task_list_wrap:nth-last-child(1) {
                    border-radius: 0 0 8px 8px;
                    border-bottom: 1px solid rgba(235, 235, 235, 1);
                }
            }

            .none_list {
                width: 100%;
                height: 659px;
                border: 1px solid rgba(235, 235, 235, 1);
                border-top: none;
                background: #fff;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                border-radius: 0 0 8px 8px;

                div {
                    vertical-align: middle;

                    img {
                        width: 178px;
                        margin-bottom: 40px;
                    }

                    p {
                        color: #999;
                    }

                }
            }

            .paging {
                padding-top: 40px;
                background: rgba(247, 248, 250, 1);

                .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
                    border-radius: 4px;
                    font-size: 14px;
                    background: #fff;
                    color: #999999;
                    margin: 0 7px;
                }

                .btn-prev {
                    color: #999;
                }

                .btn-next {
                    color: #4d4d4d;
                }

                .el-pagination.is-background .el-pager li:not(.disabled):hover {
                    color: #409EFF;
                }

                .el-pagination.is-background .el-pager li:not(.disabled).active {
                    background: rgba(36, 191, 255, 1);
                    color: #fff;
                }

                .el-pagination button, .el-pagination span:not([class*=suffix]) {
                    min-width: 64px;
                    font-size: 14px;
                    background: #fff;
                }
            }

            .el-tabs__item {
                border: none;
                height: 50px;
                line-height: 50px;
                width: 106px;
                color: #999999;
            }

            .el-tabs__item:nth-child(1) {
                border-radius: 3px 0 0 0;
            }

            .el-tabs__header {
                margin: 0;
                background: rgba(245, 246, 247, 1);
                border-radius: 7px 7px 0 0;
                box-sizing: border-box;
            }

            .el-tabs--card > .el-tabs__header {
                border: 1px solid rgba(235, 235, 235, 1);
                border-bottom: none;
                height: 50px;
            }

            .el-tabs--card > .el-tabs__header .el-tabs__nav {
                border: none;
            }

            .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
                border-top: 3.5px solid rgba(36, 191, 255, 1);
                line-height: 42.5px;
                color: #4d4d4d;
                background: #fff;
            }
        }

        .discuss {
            width: 460px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate3d(-25%, -50%, 0);

            .el-dialog__header {
                padding: 16px 30px;
                background: rgba(247, 248, 250, 1);
                color: #4D4D4D;
                font-size: 16px;
                text-align: left;

            }

            .el-dialog__body {
                padding: 30px;

                .discuss_main {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 30px;

                    .discusser_avatar {
                        align-self: center;
                        margin-right: 20px;
                        width: 56px;
                        height: 56px;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }

                    .discusser_label {
                        align-self: center;
                        display: flex;
                        flex-direction: column;
                        text-align: left;

                        .discusser_name {
                            font-size: 16px;
                            color: rgba(77, 77, 77, 1);
                            margin-bottom: 8px;
                        }

                        .discusser_another {
                            margin-top: 2px;

                            span {
                                background: rgba(255, 255, 255, 1);
                                border: 1px solid rgba(235, 235, 235, 1);
                                border-radius: 4px;
                                font-size: 12px;
                                color: rgba(153, 153, 153, 1);
                                padding: 2px 9px;
                                margin-right: 6px;
                            }
                        }
                    }
                }

                .discuss_level {
                    padding: 34px 0;
                    text-align: left;
                    font-size: 14px;
                    border-top: 1px solid #EBEBEB;
                    border-bottom: 1px solid #EBEBEB;
                    display: flex;

                    span {
                        color: rgba(153, 153, 153, 1);
                        align-self: center;
                    }

                    .discuss_detail {
                        align-self: center;
                        color: #4D4D4D;
                    }

                    .level_img {
                        display: flex;

                        img {
                            width: 30px;
                            height: 20px;
                            margin-right: 7px;
                        }
                    }

                }

                .discuss_des {
                    padding: 34px 0;
                    border-bottom: 1px solid #EBEBEB;
                }
            }

            .el-dialog__footer {
                padding: 0 30px 28px;

                .el-button {
                    width: 136px;
                    height: 31px;
                    background: rgba(36, 191, 255, 1);
                    border-radius: 16px;
                    border: none;
                    padding: 0;
                }

            }


        }
    }
</style>