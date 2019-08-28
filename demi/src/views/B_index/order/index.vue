<template>
    <div class="right">
        <div class="order_header">
            <span></span>
            <span>订单列表</span>
        </div>
        <div class="order_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all">
                    <div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="!a"></div>
                        <div class="order_list" v-show="a">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">销售：邻好冻</div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <img src="../../../assets/img/snail@2x.png" alt="">
                                        <p>梅西夏季透气网鞋男子轻跑鞋休闲跑步鞋...</p>
                                        <span style="margin-right: 81px;">¥199</span>
                                        <span style="margin-right: 82px;">×2</span>
                                        <span>¥398</span>
                                    </div>
                                    <div class="status">
                                        <button>去发货</button>
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>戴小美</span>
                                        <span>13078855273</span>
                                        <span style="color: #999">广东省广州市番禺区大学城小围菊街道互投帮创业园3楼302b</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：麻烦老板给我发一个黑色的和一个白色的，还要一个红色的谢谢老板</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="!a">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="a">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :total="1000">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已付款" name="paid">
                    <div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="!a"></div>
                        <div class="order_list" v-show="a">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">销售：邻好冻</div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <img src="../../../assets/img/snail@2x.png" alt="">
                                        <p>梅西夏季透气网鞋男子轻跑鞋休闲跑步鞋...</p>
                                        <span style="margin-right: 81px;">¥199</span>
                                        <span style="margin-right: 82px;">×2</span>
                                        <span>¥398</span>
                                    </div>
                                    <div class="status">
                                        <button>去发货</button>
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>戴小美</span>
                                        <span>13078855273</span>
                                        <span style="color: #999">广东省广州市番禺区大学城小围菊街道互投帮创业园3楼302b</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：麻烦老板给我发一个黑色的和一个白色的，还要一个红色的谢谢老板</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="!a">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="a">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :total="1000">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未付款" name="unpaid">
                    <div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="!a"></div>
                        <div class="order_list" v-show="a">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">销售：邻好冻</div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <img src="../../../assets/img/snail@2x.png" alt="">
                                        <p>梅西夏季透气网鞋男子轻跑鞋休闲跑步鞋...</p>
                                        <span style="margin-right: 81px;">¥199</span>
                                        <span style="margin-right: 82px;">×2</span>
                                        <span>¥398</span>
                                    </div>
                                    <div class="status" style="text-align: right">
                                        <img src="../../../assets/img/no_pay.png" alt="" style="width: 58px">
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>戴小美</span>
                                        <span>13078855273</span>
                                        <span style="color: #999">广东省广州市番禺区大学城小围菊街道互投帮创业园3楼302b</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：麻烦老板给我发一个黑色的和一个白色的，还要一个红色的谢谢老板</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="!a">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="a">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :total="1000">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="shipped">
                    <div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="!a"></div>
                        <div class="order_list" v-show="a">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">销售：邻好冻</div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <img src="../../../assets/img/snail@2x.png" alt="">
                                        <p>梅西夏季透气网鞋男子轻跑鞋休闲跑步鞋...</p>
                                        <span style="margin-right: 81px;">¥199</span>
                                        <span style="margin-right: 82px;">×2</span>
                                        <span>¥398</span>
                                    </div>
                                    <div class="status" style="text-align: right">
                                        <img src="../../../assets/img/pay.png" alt="" style="width: 58px">
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>戴小美</span>
                                        <span>13078855273</span>
                                        <span style="color: #999">广东省广州市番禺区大学城小围菊街道互投帮创业园3楼302b</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：麻烦老板给我发一个黑色的和一个白色的，还要一个红色的谢谢老板</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="!a">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="a">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count = '5'
                                :total="1000">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: 'order',
        props:{
            user_info:{type:Object, default: null},
        },
        data() {
            return {
                activeName: 'all',
                a:true,
                second_nav:[
                    {id:'1',name:'销售'},
                    {id:'2',name:'商品'},
                    {id:'3',name:'单价'},
                    {id:'4',name:'数量'},
                    {id:'5',name:'实付'},
                    {id:'6',name:'状态'},
                ]
            };
        },
        created(){
            this.getRouterData();
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getRouterData() {
                if(this.$route.params.activeName){
                    this.activeName = this.$route.params.activeName;
                }else{
                    return this.activeName
                }
            }
        },

    }
</script>

<style type="text/less" lang="less">
    .right{
        width: 100%;
        font-family: MicrosoftYaHeiLight;
        .order_header{
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
        .order_main{
            margin-left: 1px;
            background: #FFFFFF;
            border-radius:8px;
            width: 100%;
            height: 100%;
            .all-wrap{
                background:rgba(247,248,250,1);
                .second_nav{
                    height: 51px;
                    font-size: 12px;
                    color: #999999;
                    line-height: 51px;
                    padding-left: 15px;
                    text-align: left;
                    background: #fff;
                    border-left: 1px solid rgba(235, 235, 235, 1);
                    border-right: 1px solid rgba(235, 235, 235, 1);
                    box-sizing: border-box;
                    span{
                        margin-left: 83px;
                    }
                }
                .no_line{
                    width: 100%;
                    height:4px;
                    background:rgba(245,246,247,1);
                    border-left: 1px solid rgba(235, 235, 235, 1);
                    border-right: 1px solid rgba(235, 235, 235, 1);
                }
                .order_list{
                    width: 100%;
                    background: #fff;
                    .line{
                        width: 100%;
                        height:4px;
                        background:rgba(245,246,247,1);
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        box-sizing: border-box;
                    }
                    .order_list_wrap{
                        width: 100%;
                        padding: 25px 38px;
                        font-size: 13px;
                        color: #4D4D4D;
                        text-align: left;
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        .order_title{
                            color: #24BFFF;
                            margin-bottom: 20px;
                        }
                        .order_info{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 15px;
                            .order_info_main{
                                align-self: center;
                                width: 566px;
                                img{
                                    width:60px;
                                    border-radius:4px;
                                    margin-right: 16px;
                                }
                                p{
                                    display: inline-block;
                                    width: 143px;
                                    word-break: break-word;
                                    margin-right: 53px;
                                    line-height: 17px;
                                }
                            }
                            .status{
                                align-self: center;
                                width: 82px;
                                button{
                                    width: 100%;
                                    height: 100%;
                                    line-height: 27px;
                                    border: none;
                                    color: #fff;
                                    background: #24BFFF;
                                    border-radius:14px;
                                    font-size: 12px;
                                }
                            }
                        }
                        .order_buyer{
                            width: 100%;
                            text-align: left;
                            .order_buyer_info{
                                margin-bottom: 13px;
                                img{
                                    width: 10px;
                                }
                                span{
                                    margin-left: 17px;
                                }
                            }
                        }
                    }
                    .order_list_wrap:nth-last-child(1){
                        border-radius:0 0 8px 8px;
                        border-bottom: 1px solid rgba(235, 235, 235, 1);
                    }
                }
            }
            .none_list{
                width: 100%;
                height: 604px;
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