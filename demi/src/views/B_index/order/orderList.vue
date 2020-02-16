<template>
    <div>
        <div class="all-wrap">
            <div class="second_nav">
                <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
            </div>
            <div class="no_line" v-show="order_list.length < 1"></div>
            <div class="order_list" v-show="order_list.length > 0" v-for="order in order_list" :key="order.order_id">
                <div class="line"></div>
                <div class="order_list_wrap">
                    <div class="order_title">
                        <p>销售：{{order.contact_name}}</p>
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
                        <div class="status" v-if="order.status === 0">
                            <!--<button>待支付</button>-->
                            <img src="../../../assets/img/arrearage@2x.png" alt="">
                        </div>
                        <div class="status" v-if="order.status === 1">
                            <!--<button>已取消</button>-->
                            <img src="../../../assets/img/arrearage@2x.png" alt="">
                        </div>
                        <div class="status" v-if="(order.status === 2) && (order.contact_phone != my_info.phone)">
                            <button @click="handleDelivery(order.order_id)">确认发货</button>
                        </div>
                        <div class="status" v-if="order.status === 3">
                            <!--<button>去发货</button>-->
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
        <!--<div class="paging" v-show="order_list.length > 0">
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
        </div>-->

    </div>

</template>

<script>
    export default {
        name: 'orderList',
        props:{
            order_list:{type:Array},
            my_info:{
                type: Object,
                default:null
            }
        },
        data(){
            return{
                second_nav:[
                    {id:'1',name:'销售'},
                    {id:'2',name:'商品'},
                    {id:'3',name:'单价'},
                    {id:'4',name:'数量'},
                    {id:'5',name:'实付'},
                    {id:'6',name:'状态'},
                ],
                /*searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },*/

            }
        },
        mounted(){

        },
        methods:{
            handleDelivery(){

            }
            /*handleSizeChange(per_page) {
                this.searchParams.per_page = per_page;
                if(this.active_index === '0'){
                    this.initialize();
                }else if(this.active_index === '1'){
                    this.initialize(2,0);
                }else if(this.active_index === '2'){
                    this.initialize(0, 1);
                }else if(this.active_index === '2'){
                    this.initialize(3,0);
                }
            },
            handleCurrentPageChange(page) {
                this.searchParams.page = page;
                if(this.active_index === '0'){
                    this.initialize();
                }else if(this.active_index === '1'){
                    this.initialize(2,0);
                }else if(this.active_index === '2'){
                    this.initialize(0, 1);
                }else if(this.active_index === '2'){
                    this.initialize(3,0);
                }
            },*/
        }
    }
</script>

<style scoped>

</style>