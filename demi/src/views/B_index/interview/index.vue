<template>
    <div class="right">
        <div class="interview_header">
            <span></span>
            <span>面试管理</span>
        </div>
        <div class="interview_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <!--已邀请-->
                <el-tab-pane label="已邀请" name="first">
                    <div class="all-wrap">
                        <div class="interview_list" v-show="interview_list.length>0">
                            <div class="interview_list_wrap" v-for="interview in interview_list" :key="interview.interview_id">
                                <div class="interview_time">
                                    <span :class="interview.status === 2 || interview.status === 1 ? 'active_over' : ''">面试时间：{{interview.time}}</span>
                                    <span v-if="interview.status === 0">[等待同意]</span>
                                    <span v-if="interview.status === 1" :class="interview.status === 1 ? 'active_over' : ''">[已取消]</span>
                                    <span v-if="interview.status === 2" :class="interview.status === 2 ? 'active_over' : ''">[对方已拒绝]</span>
                                    <span v-if="interview.status === 3">[待面试]</span>
                                    <span v-if="interview.status === 4">[已面试]</span>
                                    <span v-if="interview.status === 5">[已反馈]</span>
                                </div>
                                <div class="interview_list_info">
                                    <div class="interview_title">
                                        <div>
                                            <img :src="interview.candidate.avatar" alt="" v-show="interview.candidate.avatar">
                                            <img src="../../../assets/img/toxiang@2x.png" alt="" v-show="!interview.candidate.avatar">
                                        </div>
                                        <div>
                                            <p>{{interview.candidate.nickname}}<img src="../../../assets/img/girl@2x.png"></p>
                                            <p>
                                                <span class="vita_info" style="color: #999999;font-size: 12px">{{interview.vita.work_start_date}}年/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 1">初中及以下/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 2">中专/中技/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 3">高中/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 4">大专/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 5">本科/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 6">硕士/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 7">博士/</span>
                                                <span class="vita_info">{{interview.work.work_name}}/</span>
                                                <span>{{(parseInt(interview.work.salary_min))/1000}}-{{(parseInt(interview.work.salary_max))/1000}}k</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="interview_operate" v-if="interview.status === 0">
                                        <button>和他聊聊</button>
                                        <button>取消面试</button>
                                    </div>
                                    <div class="interview_operate" v-if="interview.status === 3">
                                        <button>和他聊聊</button>
                                        <button>等待面试</button>
                                    </div>
                                    <div class="interview_operate" v-if="interview.status === 1 || interview.status === 2">
                                        <img src="../../../assets/img/countermand@2x.png" alt="" style="width:46px;height:46px;margin-right: 23px;">
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="none_list" v-show="interview_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="interview_list.length>0">
                        <el-pagination
                                :hide-on-single-page="true"
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(3)"
                                @current-change="handleCurrentPageChange(3)"
                                :pager-count = '5'
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>

                <!--已面试-->
                <el-tab-pane label="已面试" name="second">
                    <div class="all-wrap">
                        <div class="interview_list" v-show="interview_list.length>0">
                            <div class="interview_list_wrap" v-for="interview in interview_list" :key="interview.interview_id">
                                <div class="interview_time">
                                    <span>面试时间：{{interview.time}}</span>
                                    <span v-if="interview.status === 4">[已面试]</span>
                                    <span v-if="interview.status === 5">[已反馈]</span>
                                </div>
                                <div class="interview_list_info">
                                    <div class="interview_title">
                                        <div>
                                            <img :src="interview.candidate.avatar" alt="" v-show="interview.candidate.avatar">
                                            <img src="../../../assets/img/toxiang@2x.png" alt="" v-show="!interview.candidate.avatar">
                                        </div>
                                        <div>
                                            <p>{{interview.candidate.nickname}}<img src="../../../assets/img/girl@2x.png"></p>
                                            <p>
                                                <span class="vita_info" style="color: #999999;font-size: 12px">{{interview.vita.work_start_date}}年/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 1">初中及以下/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 2">中专/中技/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 3">高中/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 4">大专/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 5">本科/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 6">硕士/</span>
                                                <span class="vita_info" v-if="interview.vita.education === 7">博士/</span>
                                                <span class="vita_info">{{interview.work.work_name}}/</span>
                                                <span>{{(parseInt(interview.work.salary_min))/1000}}-{{(parseInt(interview.work.salary_max))/1000}}k</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="interview_operate">
                                        <div v-if="interview.status === 4">
                                            <button>确认录用</button>
                                            <button>不合适</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <div class="none_list" v-show="interview_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="interview_list.length>0">
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
            </el-tabs>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import http from '../../../libs/http'
    import {forEach} from "../../../libs/tools";
    import {getType} from "../../../libs/http";
    export default {
        name: 'interview',
        data() {
            return {
                activeName: 'first',
                interview_list:[],
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
            };
        },
        mounted(){
            if(getType){
                this.initialize(3);
            }
        },
        methods: {

            //切换导航
            handleClick(tab, event) {
                if(tab.index === '0'){
                    //已邀请
                    this.initialize(3);
                }else{
                    //已面试
                    this.initialize();
                }
            },


            initialize(status){
                this.$store.commit('loading', true);
                //已邀请参数
                if(status){
                    this.apiGet('/api/work/interview/lists' + '?status[0]=0&status[1]=1&status[2]=2&status[3]=' + status, this.searchParams ).then((res) => {
                        this.interview_list = res.data;
                        console.log(res)
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                        this.$store.commit('loading', false);
                    })
                }else{
                    //已面试需要多个参数
                    this.apiGet('/api/work/interview/lists?status[0]=4&status[1]=5', this.searchParams ).then((res) => {
                        forEach(res.data, item => {
                            if(item.vita.work_start_date){
                                item.vita.work_start_date = new Date().getFullYear() - parseInt(item.vita.work_start_date.split('-')[0]);
                            }
                        });
                        this.interview_list = res.data;
                        console.log(res);
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                        this.$store.commit('loading', false);
                    })
                }

            },
            handleSizeChange(status,per_page){
                this.searchParams.per_page = per_page;
                this.initialize(status);
                console.log(this.searchParams.per_page);
            },
            handleCurrentPageChange(status,page){
                this.searchParams.page = page;
                this.initialize(status);
            },
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
        .interview_header{
            padding: 20px 0 29px 2px;
            box-sizing: border-box;
            text-align: left;
            font-family: MicrosoftYaHei;
            display: flex;
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
        .interview_main{
            margin-left: 1px;
            background: #FFFFFF;
            border-radius:8px;
            width: 100%;
            height: 100%;
            .all-wrap{
                background:rgba(247,248,250,1);
                .interview_list{
                    width: 100%;
                    background: #fff;
                    .interview_list_wrap{
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        .interview_time{
                            padding: 30px 37px 0 37px;
                            color:rgba(77,77,77,1);
                            text-align: left;
                            span{
                                margin-right: 20px;
                            }
                        }
                        .interview_list_info{
                            width: 100%;
                            padding: 18px 38px 30px 38px;
                            font-size: 13px;
                            color: #4D4D4D;
                            text-align: left;
                            display: flex;
                            justify-content: space-between;
                            box-sizing: border-box;
                            .interview_title{
                                align-self: center;
                                display: flex;
                                justify-content: space-between;
                                div:nth-child(1){
                                    align-self: center;
                                    margin-right: 23px;
                                    img{
                                        width: 56px;
                                        height:56px;
                                        border-radius:50%;
                                    }
                                }
                                div:nth-child(2){
                                    align-self: center;
                                    img{
                                        width: 13px;
                                        margin-left: 13px;
                                        vertical-align: baseline;
                                    }
                                    p:nth-child(1){
                                        font-size: 16px;
                                        margin-bottom: 8px;
                                    }
                                    p:nth-child(2){
                                        color: #999;

                                    }
                                }
                            }
                            .interview_operate{
                                align-self: center;
                                button{
                                    font-size: 12px;
                                    border-radius:15px;
                                    height:29px;
                                    line-height: 29px;
                                }
                                button:nth-child(1){
                                    width:136px;
                                    background:rgba(247,253,255,1);
                                    border:1px solid rgba(36, 191, 255, 1);
                                    margin-right: 10px;
                                    color: #24BFFF;
                                }
                                button:nth-child(2){
                                    width:92px;
                                    background:rgba(255,255,255,1);
                                    border:1px solid rgba(204, 204, 204, 1);
                                    color: #999999;
                                }
                            }
                        }
                        .line{
                            width: 100%;
                            border-left: 1px solid rgba(242,242,242,1);
                            border-right: 1px solid rgba(242,242,242,1);
                            height: 4px;
                            background:rgba(245,246,247,1);
                            box-sizing: border-box;
                        }
                    }
                    .interview_list_wrap:nth-last-child(1){
                        border-radius:0 0 8px 8px;
                        border-bottom: 1px solid rgba(235, 235, 235, 1);
                        .line{
                            display: none;
                        }
                    }
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
        .active_over{
            color: #999999;
        }
    }
</style>