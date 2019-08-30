<template>
    <div class="right">
        <div class="work_header">
            <span></span>
            <span>职位管理</span>
        </div>
        <div class="work_main">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="全职职位" name="work">
                    <div class="work_wrap_operate">
                        <button @click="handleWork">发布全职职位</button>
                    </div>
                    <div class="all-wrap">
                        <div class="work_list" v-for="work in work_list" :key="work.work_id" v-show="work_list.length > 0">
                            <div class="work_list_wrap">
                                <div class="work_list_info">
                                    <div class="work_title">
                                        <p>{{work.work_name}}</p>
                                        <p>
                                            <span v-if="work.education === 0">不限/</span>
                                            <span v-if="work.education === 1">初中及以下/</span>
                                            <span v-if="work.education === 2">中专/中技/</span>
                                            <span v-if="work.education === 3">高中/</span>
                                            <span v-if="work.education === 4">大专/</span>
                                            <span v-if="work.education === 5">本科/</span>
                                            <span v-if="work.education === 6">硕士/</span>
                                            <span v-if="work.education === 7">博士/</span>
                                            <span v-text="work.work_experience_min === 0 ? '不限/' : work.work_experience_min + '-' + work.work_experience_max + '年/'"></span>
                                            <span v-text="work.city ? work.city.city_name + '/' : '不限/'"></span>
                                            <span>{{(parseInt(work.salary_min))/1000}}-{{(parseInt(work.salary_max))/1000}}k</span>
                                        </p>
                                    </div>
                                    <div class="work_time">
                                        <div class="work_time_info">
                                            <p>{{work.created_at}}发布</p>
                                        </div>
                                    </div>
                                    <div class="work_operate">
                                        <span @click="handleWorkEdit(work)">编辑</span>
                                        <span>下线</span>
                                        <span>删除</span>
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="none_list" v-show="work_list.length === 0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="a">
                        <el-pagination
                                :hide-on-single-page="true"
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :total="workParams.total"
                                :current-page="workParams.page"
                                :page-size="workParams.per_page"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentPageChange"
                                :pager-count = '5'
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="兼职职位" name="task_work">
                    <div class="work_wrap_operate">
                        <button>发布兼职职位</button>
                    </div>
                    <div class="all-wrap">
                        <div class="work_list" v-show="task_list.length>0" v-for="task in task_list" :key="task.task_id">
                            <div class="work_list_wrap">
                                <div class="work_list_info">
                                    <div class="work_title">
                                        <p>{{task.task_title}}</p>
                                        <p>
                                            <span v-text="task.city ? task.city.city_name + '-' : '不限-'"></span>
                                            <span>{{task.payment_money}}{{task.unit}}</span>
                                            <span v-if="task.payment_method === 1">/单</span>
                                        </p>
                                    </div>
                                    <div class="work_time">
                                        <div class="work_time_info">
                                            <p>{{task.created_at}}发布</p>
                                        </div>
                                    </div>
                                    <div class="work_operate">
                                        <span>编辑</span>
                                        <span>下线</span>
                                        <span>删除</span>
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="none_list" v-show="task_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="a">
                        <el-pagination
                                :hide-on-single-page="true"
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :total="task_work_Params.total"
                                :current-page="task_work_Params.page"
                                :page-size="task_work_Params.per_page"
                                @size-change="handleTaskSizeChange"
                                @current-change="handleTaskCurrentPageChange"
                                :pager-count = '5'
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import http from '../../../libs/http'
    import createWork from '../../create/work_create/work'
    export default {
        components:{ createWork },
        name: 'work',
        data() {
            return {
                activeName: 'work',
                a:true,
                work_list:[],
                task_list:[],
                workParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
                task_work_Params:{
                    page: 1,
                    total: 0,
                    per_page: 15
                },
                area_dialog:false
            };
        },
        created(){
            this.getRouterData();
        },
        mounted(){
            this.handleWork_list();
            this.handleTask_Work_list();
        },
        methods: {
            handleWork_list(){
                this.$store.commit('loading', true);
                this.apiGet('/api/user/info').then((res) =>{
                    if(res.type===2){
                        this.apiGet('/api/work/paginate?user_id=' + res.user_id,this.workParams).then((res) => {
                            this.work_list = res.data;
                            this.workParams.page = parseInt(res.current_page);
                            this.workParams.total = parseInt(res.total);
                            this.workParams.per_page = parseInt(res.per_page);
                            this.$store.commit('loading', false);
                        });
                    }
                })
            },
            handleTask_Work_list(){
                this.apiGet('/api/user/info').then((res) =>{
                    if(res.type===2){
                        this.apiGet('/api/task/paginate?user_id=' + res.user_id,this.task_work_Params).then((res) => {
                            this.task_list = res.data;
                            console.log(this.task_list)
                            this.task_work_Params.page = parseInt(res.current_page);
                            this.task_work_Params.total = parseInt(res.total);
                            this.task_work_Params.per_page = parseInt(res.per_page);
                            this.$store.commit('loading', false);
                        });
                    }
                })
            },
            handleSizeChange(per_page){
                this.workParams.per_page = per_page;
                this.handleWork_list();
            },
            handleCurrentPageChange(page){
                this.workParams.page = page;
                this.handleWork_list();
            },
            handleTaskSizeChange(per_page){
                this.task_work_Params.per_page = per_page;
                this.handleTask_Work_list();
            },
            handleTaskCurrentPageChange(page){
                this.task_work_Params.page = page;
                this.handleTask_Work_list();
            },
            getRouterData() {
                if(this.$route.params.activeName){
                    this.activeName = this.$route.params.activeName;
                }else{
                    return this.activeName
                }
            },
            handleWork(){
                this.$router.push({
                    name: "create_work",
                });
            },
            handleWorkEdit(data){
                var work_data = JSON.stringify(data)
                this.$router.push({
                    name: "create_work",
                    params:{
                        work:work_data
                    }
                });
            }
        },

        mixins:[http]
    }
</script>

<style type="text/less" lang="less">
    .right{
        width: 100%;
        font-family: MicrosoftYaHeiLight;
        .work_header{
            padding: 20px 0 29px 2px;
            box-sizing: border-box;
            text-align: left;
            font-family: MicrosoftYaHei;
            span:nth-child(1){
                width: 4px;
                height: 22px;
                border-radius: 2px;
                background: #24BFFF;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
            }
            span:nth-child(2){
                font-size: 20px;
                color: #4D4D4D;
            }
        }
        .work_main{
            margin-left: 1px;
            background: #FFFFFF;
            border-radius:8px;
            width: 100%;
            height: 100%;
            .work_wrap_operate{
                width: 100%;
                padding: 20px 38px 0 0;
                text-align: right;
                box-sizing: border-box;
                border-left: 1px solid rgba(235, 235, 235, 1);
                border-right: 1px solid rgba(235, 235, 235, 1);
                button{
                    width:106px;
                    height: 28px;
                    background:rgba(36,191,255,1);
                    color: #fff;
                    border: none;
                    border-radius:14px;
                    font-size: 12px;
                }
            }
            .all-wrap{
                background:rgba(247,248,250,1);
                .work_list{
                    width: 100%;
                    background: #fff;
                    .work_list_wrap{
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        .work_list_info{
                            width: 100%;
                            padding: 31px 38px;
                            font-size: 13px;
                            color: #4D4D4D;
                            text-align: left;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;
                            .work_title{
                                align-self: center;
                                color: #4D4D4D;
                                width: 30%;
                                p:nth-child(1){
                                    margin-bottom: 10px;
                                    font-size: 15px;
                                }
                                p:nth-child(2){
                                    color: #999;
                                }
                            }
                            .work_time{
                                align-self: center;
                                width: 30%;
                                .work_time_info{
                                    font-size: 12px;
                                    color: #999;
                                }
                            }
                            .work_operate{
                                align-self: center;
                                font-size: 13px;
                                color: #24BFFF;
                                span{
                                    margin-right: 29px;
                                }
                                span:nth-last-child(1){
                                    margin-right: 0;
                                }
                            }
                        }
                        .work_list_info:hover{
                            background: #FAFAFA;
                        }
                        .line{
                            margin: 0 auto;
                            width:648px;
                            border-top: 1px solid rgba(242,242,242,1);
                        }
                    }
                }
                
            }
            .all-wrap>.work_list:nth-last-child(2){
                width: 100%;
                background: #fff;
                border-radius:0 0 8px 8px;
                .work_list_wrap{
                    border-radius:0 0 8px 8px;
                    border-bottom: 1px solid rgba(235, 235, 235, 1);
                }
            }
            .none_list{
                width: 100%;
                height: 611px;
                border: 1px solid rgba(235, 235, 235, 1);
                border-top: none;
                background: #fff;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                box-sizing: border-box;
                border-radius:0 0 8px 8px;
                div{
                    vertical-align: middle;
                    img{
                        width: 178px;
                        margin-bottom: 40px;
                    }
                    p{
                        color: #999;
                    }

                }
            }
            .paging{
                padding-top: 40px;
                background:rgba(247,248,250,1);
                .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
                    border-radius: 4px;
                    font-size: 14px;
                    background: #fff;
                    color: #999999;
                    margin: 0 7px;
                }
                .btn-prev{
                    color: #999;
                }
                .btn-next{
                    color: #4d4d4d;
                }
                .el-pagination.is-background .el-pager li:not(.disabled):hover{
                    color: #409EFF;
                }
                .el-pagination.is-background .el-pager li:not(.disabled).active{
                    background:rgba(36,191,255,1);
                    color: #fff;
                }
                .el-pagination button, .el-pagination span:not([class*=suffix]){
                    min-width: 64px;
                    font-size: 14px;
                    background: #fff;
                }
            }
            .el-tabs__item{
                border: none;
                height: 50px;
                line-height: 50px;
                width: 106px;
                color: #999999;
            }
            .el-tabs__item:nth-child(1){
                border-radius: 3px 0 0 0;
            }
            .el-tabs__header{
                margin: 0;
                background:rgba(245,246,247,1);
                border-radius: 7px 7px 0 0;
                box-sizing: border-box;
            }
            .el-tabs--card>.el-tabs__header{
                border: 1px solid rgba(235, 235, 235, 1);
                border-bottom: none;
                height: 50px;
            }
            .el-tabs--card>.el-tabs__header .el-tabs__nav{
                border: none;
            }
            .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
                border-top: 3.5px solid rgba(36,191,255,1);
                line-height: 42.5px;
                color: #4d4d4d;
                background: #fff;
            }
        }
    }
</style>