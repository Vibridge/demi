<template>
    <div class="right">
        <div class="order_header">
            <span></span>
            <span>订单列表</span>
        </div>
        <div class="order_main">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

                <!--全部-->
                <el-tab-pane label="全部" name="all">
                    <orderList :order_list="order_list" :my_info="my_info"></orderList>
                </el-tab-pane>

                <!--已付款-->
                <el-tab-pane label="已付款" name="paid">
                    <orderList :order_list="order_list" :my_info="my_info"></orderList>
                    <!--<div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="order_list.length < 1"></div>
                        <div class="order_list" v-show="order_list.length > 0" v-for="order in order_list" :key="order.order_id">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">
                                    <p>销售：{{order.referrer.nickname}}</p>
                                    <p v-if="order.logistics">{{order.logistics.name}}：{{order.logistics_no}}</p>
                                </div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <div><img :src="order.snapshot.images[0].file_path" alt=""></div>
                                        <p>{{order.snapshot.goods.goods_title}}</p>
                                        <span style="margin-right: 81px;">¥{{order.goods_price}}</span>
                                        <span style="margin-right: 82px;">×{{order.buy_quantity}}</span>
                                        <span>¥{{order.pay_amount}}</span>
                                    </div>
                                    <div class="status" v-if="order.status === 2">
                                        <button>确认发货</button>
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>{{order.contact_name}}</span>
                                        <span>{{order.contact_phone}}</span>
                                        <span style="color: #999">{{order.city.name_relation.join('') + order.city.city_name + order.contact_address}}</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：{{order.remark}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="order_list.length < 1">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="order_list.length > 0">
                        <el-pagination
                                background
                                :hide-on-single-page="true"
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count='5'
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(2)"
                                @current-change="handleCurrentPageChange(2)">
                        </el-pagination>
                    </div>-->
                </el-tab-pane>

                <!--未付款-->
                <el-tab-pane label="未付款" name="unpaid">
                    <orderList :order_list="order_list" :my_info="my_info"></orderList>
<!--
                    <div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="order_list.length < 1"></div>
                        <div class="order_list" v-show="order_list.length > 0" v-for="order in order_list" :key="order.order_id">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">
                                    <p>销售：{{order.referrer.nickname}}</p>
                                    <p v-if="order.logistics">{{order.logistics.name}}：{{order.logistics_no}}</p>
                                </div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <div><img :src="order.snapshot.images[0].file_path" alt=""></div>
                                        <p>{{order.snapshot.goods.goods_title}}</p>
                                        <span style="margin-right: 81px;">¥{{order.goods_price}}</span>
                                        <span style="margin-right: 82px;">×{{order.buy_quantity}}</span>
                                        <span>¥{{order.pay_amount}}</span>
                                    </div>
                                    <div class="status" v-if="order.status === 0 && !order.pay_amount">
                                        &lt;!&ndash;<button>待支付</button>&ndash;&gt;
                                        <img src="../../../assets/img/arrearage@2x.png" alt="">
                                    </div>
                                    <div class="status" v-if="order.status === 1">
                                        &lt;!&ndash;<button>已取消</button>&ndash;&gt;
                                        <img src="../../../assets/img/arrearage@2x.png" alt="">
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>{{order.contact_name}}</span>
                                        <span>{{order.contact_phone}}</span>
                                        <span style="color: #999">{{order.city.name_relation.join('') + order.city.city_name + order.contact_address}}</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：{{order.remark}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="order_list.length < 1">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="order_list.length > 0">
                        <el-pagination
                                background
                                :hide-on-single-page="true"
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count='5'
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(0,1)"
                                @current-change="handleCurrentPageChange(0,1)">
                        </el-pagination>
                    </div>-->
                </el-tab-pane>

                <!--已发货-->
                <el-tab-pane label="已发货" name="shipped">
                    <orderList :order_list="order_list" :my_info="my_info"></orderList>
                    <!--<div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="order_list.length < 1"></div>
                        <div class="order_list" v-show="order_list.length > 0" v-for="order in order_list" :key="order.order_id">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">
                                    <p>销售：{{order.referrer.nickname}}</p>
                                    <p v-if="order.logistics">{{order.logistics.name}}：{{order.logistics_no}}</p>
                                </div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <div><img :src="order.snapshot.images[0].file_path" alt=""></div>
                                        <p>{{order.snapshot.goods.goods_title}}</p>
                                        <span style="margin-right: 81px;">¥{{order.goods_price}}</span>
                                        <span style="margin-right: 82px;">×{{order.buy_quantity}}</span>
                                        <span>¥{{order.pay_amount}}</span>
                                    </div>
                                    <div class="status" v-if="order.status === 3">
                                        &lt;!&ndash;<button>去发货</button>&ndash;&gt;
                                        <img src="../../../assets/img/delivered@2x.png" alt="">
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>{{order.contact_name}}</span>
                                        <span>{{order.contact_phone}}</span>
                                        <span style="color: #999">{{order.city.name_relation.join('') + order.city.city_name + order.contact_address}}</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：{{order.remark}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="order_list.length < 1">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="order_list.length > 0">
                        <el-pagination
                                background
                                :hide-on-single-page="true"
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count='5'
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(3)"
                                @current-change="handleCurrentPageChange(3)">
                        </el-pagination>
                    </div>-->
                </el-tab-pane>

                <!--退款中-->
                <el-tab-pane label="退款中" name="refund">
                    <orderList :order_list="order_list" :my_info="my_info"></orderList>
                    <!--<div class="all-wrap">
                        <div class="second_nav">
                            <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
                        </div>
                        <div class="no_line" v-show="order_list.length < 1"></div>
                        <div class="order_list" v-show="order_list.length > 0" v-for="order in order_list" :key="order.order_id">
                            <div class="line"></div>
                            <div class="order_list_wrap">
                                <div class="order_title">
                                    <p>销售：{{order.referrer.nickname}}</p>
                                    <p v-if="order.logistics">{{order.logistics.name}}：{{order.logistics_no}}</p>
                                </div>
                                <div class="order_info">
                                    <div class="order_info_main">
                                        <div><img :src="order.snapshot.images[0].file_path" alt=""></div>
                                        <p>{{order.snapshot.goods.goods_title}}</p>
                                        <span style="margin-right: 81px;">¥{{order.goods_price}}</span>
                                        <span style="margin-right: 82px;">×{{order.buy_quantity}}</span>
                                        <span>¥{{order.pay_amount}}</span>
                                    </div>
                                    <div class="status" v-if="order.status === 3">
                                        &lt;!&ndash;<button>去发货</button>&ndash;&gt;
                                        <img src="../../../assets/img/delivered@2x.png" alt="">
                                    </div>
                                </div>
                                <div class="order_buyer">
                                    <div class="order_buyer_info">
                                        <img src="../../../assets/img/address_site.png" alt="">
                                        <span>{{order.contact_name}}</span>
                                        <span>{{order.contact_phone}}</span>
                                        <span style="color: #999">{{order.city.name_relation.join('') + order.city.city_name + order.contact_address}}</span>
                                    </div>
                                    <p style="margin-left: 27px">备注：{{order.remark}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="none_list" v-show="order_list.length < 1">
                            <div>
                                <img src="../../../assets/img/snail@2x.png" alt="">
                                <p>暂无数据</p>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-show="order_list.length > 0">
                        <el-pagination
                                background
                                :hide-on-single-page="true"
                                layout="prev, pager, next"
                                prev-text="上一页"
                                next-text="下一页"
                                :pager-count='5'
                                :total="searchParams.total"
                                :current-page="searchParams.page"
                                :page-size="searchParams.per_page"
                                @size-change="handleSizeChange(3)"
                                @current-change="handleCurrentPageChange(3)">
                        </el-pagination>
                    </div>-->
                </el-tab-pane>
            </el-tabs>
            <div class="paging" v-show="order_list.length > 0">
                <el-pagination
                        background
                        :hide-on-single-page="true"
                        layout="prev, pager, next"
                        prev-text="上一页"
                        next-text="下一页"
                        :pager-count='5'
                        :total="searchParams.total"
                        :current-page="searchParams.page"
                        :page-size="searchParams.per_page"
                        @size-change="handleSizeChange()"
                        @current-change="handleCurrentPageChange()">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import orderList from './orderList'
    import http from '../../../libs/http'
    export default {
        name: 'order',
        props:{
            user_info:{type:Object, default: null},
        },
        components:{
            orderList
        },
        data() {
            return {
                activeName: 'all',
                /*searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
                second_nav:[
                    {id:'1',name:'销售'},
                    {id:'2',name:'商品'},
                    {id:'3',name:'单价'},
                    {id:'4',name:'数量'},
                    {id:'5',name:'实付'},
                    {id:'6',name:'状态'},
                ],*/
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
                order_list:[],
                active_index: 0,
                my_info: null
            };
        },
        mounted(){
            if(this.user_info){
                this.my_info = this.user_info
            }
            console.log(this.user_info)
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
        },
        created(){
            this.getRouterData();
        },
        computed:{

        },
        methods: {
            // 切换状态导航
            handleClick(tab, event) {
                this.active_index = tab.index;
                this.searchParams.page = 1;
                this.searchParams.total = 0;
                this.searchParams.per_page = 15;
                if (tab.index === '0') {
                    this.initialize();
                }
                if (tab.index === '1') {
                    this.initialize(2);
                }
                if (tab.index === '2') {
                    this.initialize(0);
                }
                if (tab.index === '3') {
                    this.initialize(3);
                }
            },

            //数据接口
            initialize(status){
                if (status|| (status === 0)) {
                    this.apiGet('/api/order/paginate' + '?status=' + status, this.searchParams).then((res) => {
                        this.order_list = res.data;
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                        // console.log(this.order_list)
                    });
                } else {
                    this.apiGet('/api/order/paginate', this.searchParams).then((res) => {
                        this.order_list = res.data;
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                        // console.log(this.order_list)
                    })
                }
            },

            handleSizeChange(per_page) {
                this.searchParams.per_page = per_page;
                if(this.active_index === '0'){
                    this.initialize();
                }else if(this.active_index === '1'){
                    this.initialize(2);
                }else if(this.active_index === '2'){
                    this.initialize(0);
                }else if(this.active_index === '2'){
                    this.initialize(3);
                }
                document.getElementById('app').scrollTo(0,0)

            },
            handleCurrentPageChange(page) {
                this.searchParams.page = page;
                if(this.active_index === '0'){
                    this.initialize();
                }else if(this.active_index === '1'){
                    this.initialize(2);
                }else if(this.active_index === '2'){
                    this.initialize(0);
                }else if(this.active_index === '2'){
                    this.initialize(3);
                }
                document.getElementById('app').scrollTo(0,0)
            },

            getRouterData() {
                if(this.$route.params.activeName){
                    this.activeName = this.$route.params.activeName;
                }else{
                    return this.activeName
                }
            }
        },
        mixins:[http]

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
                        padding: 25px 11px 25px 38px;
                        font-size: 13px;
                        color: #4D4D4D;
                        text-align: left;
                        box-sizing: border-box;
                        border-left: 1px solid rgba(235, 235, 235, 1);
                        border-right: 1px solid rgba(235, 235, 235, 1);
                        .order_title{
                            color: #24BFFF;
                            margin-bottom: 20px;
                            display: flex;
                            justify-content: space-between;
                        }
                        .order_info{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 15px;
                            .order_info_main{
                                align-self: center;
                                width: 566px;
                                display: flex;
                                img{
                                    align-self: center;
                                    width:60px;
                                    border-radius:4px;
                                    margin-right: 16px;
                                }
                                p{
                                    align-self: center;
                                    display: inline-block;
                                    width: 143px;
                                    word-break: break-word;
                                    margin-right: 53px;
                                    line-height: 17px;
                                }
                                span{
                                    align-self: center;
                                }
                            }
                            .status{
                                align-self: center;
                                width: 136px;
                                text-align: right;
                                button{
                                    background:rgba(255,255,255,1);
                                    border:1px solid rgba(235, 235, 235, 1);
                                    border-radius:8px;
                                    width: 100%;
                                    height: 100%;
                                    line-height: 27px;
                                    color:rgba(36,191,255,1);
                                    font-size: 12px;
                                }
                                botton:hover{
                                    background:rgba(36,191,255,1);
                                    color: white;
                                }
                                img{
                                    width: 58px;
                                    margin-right: 27px;
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