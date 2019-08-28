<template>
    <div class="right">
        <div class="task_header">
            <span></span>
            <span>任务管理</span>
        </div>
        <div class="task_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <div class="task_list_wrap">
                                <div class="task_list_info">
                                    <div class="task_title">
                                        <p>产品销售代理asdadasdasd</p>
                                        <p>100元/单</p>
                                    </div>
                                    <div class="task_buyer">
                                        <div class="task_buyer_info">
                                            <div>
                                                <img src="../../../assets/img/avator.png" alt="">
                                            </div>
                                            <div>
                                                <p>临好冻</p>
                                                <p>广州-销售/教育/互联网IT...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="task_operate">
                                        <button>拒绝</button>
                                        <button>通过并发送产品链接</button>
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="none_list" v-show="task_list.length === 0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
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
                                :pager-count = '5'
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="待处理" name="todo">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <div class="task_list_wrap">
                                <div class="task_list_info">
                                    <div class="task_title">
                                        <p>产品销售代理asdadasdasd</p>
                                        <p>100元/单</p>
                                    </div>
                                    <div class="task_buyer">
                                        <div class="task_buyer_info">
                                            <div>
                                                <img src="../../../assets/img/avator.png" alt="">
                                            </div>
                                            <div>
                                                <p>临好冻</p>
                                                <p>广州-销售/教育/互联网IT...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="task_operate">
                                        <button>拒绝</button>
                                        <button>通过并发送产品链接</button>
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
                    <div class="paging" v-show="task_list.length>0">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :hide-on-single-page="true"
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(0)"
                                @current-change="handleCurrentPageChange(0)">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="进行中" name="doing">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <div class="task_list_wrap">
                                <div class="task_list_info">
                                    <div class="task_title">
                                        <p>产品销售代理asdadasdasd</p>
                                        <p>100元/单</p>
                                    </div>
                                    <div class="task_buyer">
                                        <div class="task_buyer_info">
                                            <div>
                                                <img src="../../../assets/img/avator.png" alt="">
                                            </div>
                                            <div>
                                                <p>临好冻</p>
                                                <p>广州-销售/教育/互联网IT...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="task_operate_ing">
                                        <button>和他聊聊</button>
                                        <button>结束任务</button>
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
                    <div class="paging" v-show="task_list.length>0">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :hide-on-single-page="true"
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(1,3)"
                                @current-change="handleCurrentPageChange(1,3)">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已结束" name="end">
                    <div class="all-wrap">
                        <div class="task_list" v-show="task_list.length>0">
                            <div class="task_list_wrap">
                                <div class="task_list_info">
                                    <div class="task_title">
                                        <p>产品销售代理asdadasdasd</p>
                                        <p>100元/单</p>
                                    </div>
                                    <div class="task_buyer">
                                        <div class="task_buyer_info">
                                            <div>
                                                <img src="../../../assets/img/avator.png" alt="">
                                            </div>
                                            <div>
                                                <p>临好冻</p>
                                                <p>广州-销售/教育/互联网IT...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="task_operate_ing">
                                        <button>和他聊聊</button>
                                        <button>去评价</button>
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
                    <div class="paging" v-show="task_list.length>0">
                        <el-pagination
                                background
                                :hide-on-single-page="true"
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(2,4)"
                                @current-change="handleCurrentPageChange(2,4)">
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
    export default {
        name: 'task',
        data() {
            return {
                activeName: 'all',
                task_list:[],
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
            };
        },
        mounted(){
            this.initialize();
        },
        created(){
            this.getRouterData();
        },
        methods: {
            handleClick(tab, event) {
                if(tab.index === '1'){
                    this.initialize();
                }
                if(tab.index === '2'){
                    this.initialize(0);
                }
                if(tab.index === '3'){
                    this.initialize(1,3);
                }
                if(tab.index === '4'){
                    this.initialize(2,4);
                }
            },
            initialize(status1,status2){
                if(status1 || status2){
                    this.apiGet('/api/task/order/paginate' + '?status=' + status1 ,this.searchParams).then((res) => {
                        this.task_list = res.data;
                    });
                    this.apiGet('/api/task/order/paginate' + '?status=' + status1 + '&status=' + status2 ,this.searchParams).then((res) => {
                        this.task_list = res.data;
                    });
                }else{
                    this.apiGet('/api/task/order/paginate' ,this.searchParams).then((res) => {
                        this.task_list = res.data;
                    })
                }
            },
            handleSizeChange(status1,status2,per_page){
                this.searchParams.per_page = per_page;
                this.initialize(status1,status2);
                console.log(this.searchParams.per_page);
            },
            handleCurrentPageChange(status1,status2,page){
                this.searchParams.page = page;
                this.initialize(status1,status2);
            },
            getRouterData() {
                if(this.$route.params.activeName){
                    this.activeName = this.$route.params.activeName;
                }else{
                    return this.activeName
                }
            }
        },
        watch:{
        },
        mixins:[http]
    }
</script>

<style type="text/less" lang="less">
    .right{
        width: 100%;
        font-family: MicrosoftYaHeiLight;
        .task_header{
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
        .task_main{
            margin-left: 1px;
            background: #FFFFFF;
            border-radius:8px;
            width: 100%;
            height: 100%;
            .all-wrap{
                background:rgba(247,248,250,1);
                .task_list{
                    width: 100%;
                    background: #fff;
                    .task_list_wrap{
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        .task_list_info{
                            width: 100%;
                            padding: 31px 38px;
                            font-size: 13px;
                            color: #4D4D4D;
                            text-align: left;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;
                            .task_title{
                                align-self: center;
                                width: 139px;
                                color: #24BFFF;
                                margin-right: 45px;
                                p:nth-child(1){
                                    width: 100%;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;
                                    margin-bottom: 7px;
                                }
                                p:nth-child(2){
                                    color: #999;
                                    font-size: 12px;
                                }
                            }
                            .task_buyer{
                                align-self: center;
                                width: 189px;
                                margin-right: 47px;
                                .task_buyer_info{
                                    display: flex;
                                    div:nth-child(1){
                                        align-self: center;
                                        margin-right: 12px;
                                        img{
                                            width:35px;
                                            height: 35px;
                                            border-radius:50%;
                                        }
                                    }
                                    div:nth-child(2){
                                        width: 142px;
                                        p:nth-child(1){
                                            margin-bottom: 7px;
                                        }
                                        p:nth-child(2){
                                            width: 100%;
                                            overflow: hidden;
                                            text-overflow:ellipsis;
                                            white-space: nowrap;
                                            color: #999;
                                            font-size: 12px!important;
                                        }
                                    }
                                }
                            }
                            .task_operate{
                                align-self: center;
                                display: flex;
                                height: 29px;
                                font-size: 12px;
                                button{
                                    height: 100%;
                                    border: none;
                                    border-radius:15px;
                                    font-size: 12px;
                                    line-height: 29px;
                                    padding: 0;
                                }
                                button:nth-child(1){
                                    width: 82px;
                                    margin-right: 10px;
                                    background:rgba(235,235,235,1);
                                    color: #999999;
                                }
                                button:nth-child(2){
                                    width:136px;
                                    background:rgba(36,191,255,1);
                                    color: #fff;
                                }
                            }
                            .task_operate_ing{
                                align-self: center;
                                display: flex;
                                height: 29px;
                                button{
                                    height: 100%;
                                    border: none;
                                    font-size: 12px;
                                    border-radius:15px;
                                    padding: 0;

                                }
                                button:nth-child(1){
                                    width: 82px;
                                    margin-right: 10px;
                                    background:#F7FDFF;
                                    color: #24BFFF;
                                    border:1px solid rgba(36, 191, 255, 1);
                                }
                                button:nth-child(2){
                                    width:136px;
                                    background:rgba(36,191,255,1);
                                    color: #fff;
                                }
                            }
                        }
                        .line{
                            margin: 0 auto;
                            width:648px;
                            border-top: 1px solid rgba(242,242,242,1);
                        }
                    }
                }

            }
            .all-wrap>.task_list:nth-last-child(2){
                width: 100%;
                background: #fff;
                border-radius:0 0 8px 8px;
                .task_list_wrap{
                    border-radius:0 0 8px 8px;
                    border-bottom: 1px solid rgba(235, 235, 235, 1);
                }
            }
            .none_list{
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