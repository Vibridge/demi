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
                            <div class="collect_list_wrap" v-for="collect in collect_list" :key="collect.collect_id">
                                <div class="collect_avatar">
                                    <div>
                                        <img src="" alt="">
                                    </div>
                                    <div>
                                        <div>
                                            <p></p>
                                            <div><img src="" alt=""></div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <p></p>
                                </div>
                                <div class="collect_desc">

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
                                @size-change="handleSizeChange(3)"
                                @current-change="handleCurrentPageChange(3)"
                                :pager-count='5'
                        >
                        </el-pagination>
                    </div>
                </el-tab-pane>

                <!--兼职人才-->
                <el-tab-pane label="兼职人才" name="second">
                    <div class="all-wrap">
                        <div class="collect_list" v-show="collect_list.length>0">
                            <div class="collect_list_wrap" v-for="collect in collect_list" :key="collect.collect_id">

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
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentPageChange"
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
    import {getType} from "../../../libs/http";

    export default {
        name: 'collect',
        data() {
            return {
                activeName: 'first',
                collect_list: [],
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
            };
        },
        mounted() {
            if (getType) {
                this.initialize(1);
            }
        },
        methods: {

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
                    this.collect_list = res.data;
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
                        padding: 18px 24px;
                    }
                    .collect_list_wrap:hover{
                        box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.08);
                    }

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

        .active_over {
            color: #999999;
        }
    }
</style>