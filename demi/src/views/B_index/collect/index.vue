<template>
    <div class="right">
        <div class="collect_header">
            <span></span>
            <span>人才收藏</span>
        </div>
        <div class="collect_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <!--全职人才-->
                <el-tab-pane label="全职人才" name="first">
                    <div class="all-wrap">
                        <div class="collect_list" v-show="collect_list.length>0">
                            <div class="collect_list_wrap" v-for="collect in collect_list" :key="collect.favorite_id" @mouseover="show_delect = collect.favorite_id"
                                 @mouseleave="show_delect = null" @click="handleDetail('work_resume',collect.job.user_job_id)">
                                <div class="collect_info">
                                    <div style="display: flex">
                                        <div class="collect_avatar">
                                            <img :src="collect.job.user.avatar" alt="">
                                        </div>
                                        <div class="collect_middle">
                                            <div class="collect_name">
                                                <p>{{collect.job.user.nickname}}</p>
                                                <div class="sex"><img src="../../../assets/img/boy@2x.png" alt=""></div>
                                            </div>
                                            <div class="collect_label">
                                                <span v-if="collect.job.city">{{collect.job.city.city_name}}/</span>
                                                <span>{{collect.job.vita.work_status}}年/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 1">初中及以下/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 2">中专/中技/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 3">高中/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 4">大专/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 5">本科/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 6">硕士/</span>
                                                <span class="vita_info" v-if="collect.job.vita.education === 7">博士/</span>
                                                <span>{{collect.job.work.name}}/</span>
                                                <span>{{collect.job.salary_min/1000}}-{{collect.job.salary_max/1000}}k</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="collect_cop">
                                        <button @click="handleMsg(1,collect.job.user.user_id,collect.job.job_label_id)">和他聊聊</button>
                                    </div>
                                </div>
                                <div class="collect_desc">
                                    <p>{{collect.job.vita.description}}</p>
                                </div>
                                <div class="delect" v-if="show_delect === collect.favorite_id" @click="handleDelect(1,collect.favorite_id)">
                                    <img src="../../../assets/img/expurgate@2x.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="collect_list.length===0">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>你还没有任何收藏哦</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="collect_list.length>0">
                        <el-pagination
                                :hide-on-single-page="true"
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(1)"
                                @current-change="handleCurrentPageChange(1)"
                                :pager-count='5'
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>

                <!--兼职人才-->
                <el-tab-pane label="兼职人才" name="second">
                    <div class="all-wrap">
                        <div class="collect_list" v-show="collect_ability.length>0">
                            <div class="collect_list_wrap" v-for="collect in collect_ability" :key="collect.ability_id" @mouseover="show_delect = collect.ability_id"
                                 @mouseleave="show_delect = null" @click="handleDetail('ability_resume',collect.ability_id)">
                                <div class="collect_info">
                                    <div style="display: flex">
                                        <div class="collect_avatar">
                                            <img :src="collect.ability.user.avatar" alt="">
                                        </div>
                                        <div class="collect_middle">
                                            <div class="collect_name">
                                                <p>{{collect.ability.user.nickname}}</p>
                                                <div class="level" v-if="collect.ability.user.reputation > 0 && collect.ability.user.reputation < 251">
                                                    <div v-if="4 <= collect.ability.user.reputation && collect.ability.user.reputation <= 10">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                    </div>
                                                    <div v-if="11 <= collect.ability.user.reputation && collect.ability.user.reputation <= 40">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                    </div>
                                                    <div v-if="41 <= collect.ability.user.reputation && collect.ability.user.reputation <= 90">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                    </div>
                                                    <div v-if="91 <= collect.ability.user.reputation && collect.ability.user.reputation <= 150">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                    </div>
                                                    <div v-if="151 <= collect.ability.user.reputation && collect.ability.user.reputation <= 250">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                        <img src="../../../assets/img/x.png" alt="">
                                                    </div>
                                                </div>
                                                <div class="level" v-if="collect.ability.user.reputation >= 251 && collect.ability.user.reputation < 10001">
                                                    <div v-if="251 <= collect.ability.user.reputation && collect.ability.user.reputation <= 500">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                    </div>
                                                    <div v-if="501 <= collect.ability.user.reputation && collect.ability.user.reputation <= 1000">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                    </div>
                                                    <div v-if="1001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 2000">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                    </div>
                                                    <div v-if="2001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 5000">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                    </div>
                                                    <div v-if="5001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 10000">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                        <img src="../../../assets/img/z.png" alt="">
                                                    </div>
                                                </div>
                                                <div class="level" v-if="collect.ability.user.reputation >= 10001 && collect.ability.user.reputation < 500001">
                                                    <div v-if="10001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 20000">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                    </div>
                                                    <div v-if="20001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 50000">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                    </div>
                                                    <div v-if="50001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 100000">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                    </div>
                                                    <div v-if="100001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 200000">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                    </div>
                                                    <div v-if="200001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 500000">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                        <img src="../../../assets/img/level3.png" alt="">
                                                    </div>
                                                </div>
                                                <div class="level" v-if="collect.ability.user.reputation >= 500001">
                                                    <div v-if="500001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 1000000">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                    </div>
                                                    <div v-if="1000001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 2000000">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                    </div>
                                                    <div v-if="2000001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 5000000">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                    </div>
                                                    <div v-if="5000001 <= collect.ability.user.reputation && collect.ability.user.reputation <= 10000000">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                    </div>
                                                    <div v-if="collect.ability.user.reputation > 10000000">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                        <img src="../../../assets/img/level4.png" alt="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="collect_note">
                                                <!--<p v-if="collect.ability.city">{{collect.ability.city.city_name}}</p>-->
                                                <div class="collect_label">
                                                    理想行业：<span v-for="item in collect.ability.industry" :key="item.label_id">{{item.name}}<span class="label_note">/</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="collect_cop">
                                        <p>{{collect.ability.type_label.name}}</p>
                                    </div>
                                </div>
                                <div class="collect_desc">
                                    <p style="width: 364px">{{collect.ability.description}}</p>
                                    <div class="collect_cop">
                                        <button @click="handleMsg(2,collect.ability.user.user_id,collect.ability.ability_id)">和他聊聊</button>
                                    </div>
                                </div>
                                <div class="delect" v-if="show_delect === collect.ability_id" @click="handleDelect(2,collect.favorite_id)">
                                    <img src="../../../assets/img/expurgate@2x.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="collect_ability.length < 1">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>你还没有任何收藏哦</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="collect_ability.length>0">
                        <el-pagination
                                :hide-on-single-page="true"
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(2)"
                                @current-change="handleCurrentPageChange(2)"
                                :pager-count='5'
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

    export default {
        name: 'collect',
        data() {
            return {
                activeName: 'first',
                collect_list: [],
                collect_ability:[],
                show_delect:null,
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },

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
            this.initialize(1);
        },
        methods: {
            //聊天
            handleMsg(type,id,key){
                let data = {};
                data.recipient = id;
                data.foreign_key = key;
                data.type = type;
                this.$router.push({
                    name: "IM",
                    params:{id :JSON.stringify(data)}
                });
            },

            //切换导航
            handleClick(tab, event) {
                if (tab.index === '0') {
                    //全职人才
                    this.initialize(1);
                } else {
                    //兼职人才
                    this.initialize(2);
                }
            },
            initialize(status) {
                this.$store.commit('loading', true);
                this.apiGet('/api/user/favorite/paginate' + '?mode=' + status, this.searchParams).then((res) => {
                    if(status === 1){
                        this.collect_list = res.data;
                    }else{
                        this.collect_ability = res.data;

                    }
                    console.log(res)
                    this.searchParams.page = parseInt(res.current_page);
                    this.searchParams.total = parseInt(res.total);
                    this.searchParams.per_page = parseInt(res.per_page);
                    this.$store.commit('loading', false);
                })
            },

            handleSizeChange(status, per_page) {
                this.searchParams.per_page = per_page;
                this.initialize(status);
                console.log(this.searchParams.per_page);
            },
            handleCurrentPageChange(status, page) {
                this.searchParams.page = page;
                this.initialize(status);
            },

            //取消收藏
            handleDelect(index,id){
                this.apiDelete('/api/user/favorite/delete/' + id).then((res) => {
                    console.log(res);
                    if(res){
                        if(index === 1){
                            this.initialize(1);
                        }else{
                            this.initialize(2);
                        }
                    }
                })
            },

            //打开新窗口，跳详情
            handleDetail(type,id){
                let routeData = this.$router.resolve({
                    name: type,
                    query: {
                        id:id
                    },
                });
                window.open(routeData.href, '_blank');
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

        .collect_header {
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

        .collect_main {
            margin-left: 1px;
            background: #FFFFFF;
            border-radius: 8px;
            width: 100%;
            height: 100%;

            .all-wrap {
                background: rgba(247, 248, 250, 1);

                .collect_list {
                    width: 100%;
                    background: #fff;
                    padding: 20px 20px 0 20px;
                    box-sizing: border-box;
                    border: 1px solid rgba(235, 235, 235, 1);
                    border-top: 1px solid transparent;
                    border-radius:0 0 8px 8px;

                    .collect_list_wrap {
                        box-sizing: border-box;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(235, 235, 235, 1);
                        border-radius:6px;
                        margin-bottom: 17px;
                        padding: 18px 30px;
                        text-align: left;
                        position: relative;
                        .collect_info{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 15px;
                            .collect_avatar{
                                align-self: center;
                                width: 54px;
                                height: 54px;
                                margin-right: 16px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    border-radius:50%;
                                }
                            }
                            .collect_middle{
                                align-self: flex-end;
                                .collect_name{
                                    display: flex;
                                    margin-bottom: 5px;
                                    .sex{
                                        img{
                                            width: 16px;
                                            height: 16px;
                                        }
                                    }
                                    .level{
                                        img{
                                            width: 23px;
                                            margin-right: 4px;
                                        }
                                    }
                                    .level:nth-child(1){
                                        img{
                                            width: 17px;
                                        }
                                    }
                                    .level:nth-child(2){
                                        img{
                                            width: 20px;
                                        }
                                    }
                                    p{
                                        font-size:16px;
                                        color:rgba(77,77,77,1);
                                        margin-right: 8px;
                                    }
                                }
                                .collect_label{
                                    padding: 6px 10px;
                                    background:rgba(255,255,255,1);
                                    border:1px solid rgba(235, 235, 235, 1);
                                    border-radius:4px;
                                    font-size:13px;
                                    color:rgba(128,128,128,1);
                                    letter-spacing:2px;
                                    span:nth-last-child(1){
                                        .label_note:nth-last-child(1){
                                            display: none;
                                        }
                                    }

                                }
                                .collect_note{
                                    p{
                                        width:45px;
                                        height:21px;
                                        background:rgba(36,191,255,1);
                                        border-radius:4px;
                                        font-size:13px;
                                        line-height: 21px;
                                        color:rgba(255,255,255,1);
                                        margin-right: 6px;
                                    }
                                }
                            }
                            .collect_cop{
                                p{
                                    font-size:15px;
                                    color:rgba(77,77,77,1);
                                    margin-right: 7px;
                                }
                                button{
                                    width:109px;
                                    height:31px;
                                    background:rgba(36,191,255,1);
                                    border-radius:16px;
                                    font-size:13px;
                                    color:rgba(255,255,255,1);
                                    border: none;
                                }
                            }
                        }
                        .collect_desc{
                            margin-left: 69px;
                            display: flex;
                            justify-content: space-between;
                            p{
                                font-size:13px;
                                color:rgba(77,77,77,1);
                                line-height: 28px;
                            }
                            .collect_cop{
                                align-self: flex-end;
                                button{
                                    width:109px;
                                    height:31px;
                                    background:rgba(36,191,255,1);
                                    border-radius:16px;
                                    font-size:13px;
                                    color:rgba(255,255,255,1);
                                    border: none;
                                }
                            }

                        }
                        .delect{
                            position: absolute;
                            right: 0;
                            top:0;
                            img{
                                width: 21px;
                            }
                        }
                    }
                    .collect_list_wrap:hover{
                        box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.08);
                    }

                }

            }

            .none_list {
                width: 100%;
                height: 718px;
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

        .active_over {
            color: #999999;
        }
    }
</style>
