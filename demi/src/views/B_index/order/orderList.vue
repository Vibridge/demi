<template>
    <div>
        <div class="all-wrap">
            <div class="second_nav">
                <span v-for="label in second_nav" :key="label.id">{{label.name}}</span>
            </div>
            <div class="no_line" v-show="!order_list"></div>
            <div class="order_list" v-show="order_list" v-for="order in order_list" :key="order.order_id">
                <div class="line"></div>
                <div class="order_list_wrap">
                    <!--<div class="order_title">
                        <p>销售：{{order.contact_name}}</p>
                        <p v-if="order.logistics">{{order.logistics.name}}：{{order.logistics_no}}</p>
                    </div>-->
                    <div class="order_info">
                        <div class="order_info_main" v-for="good in order.goods">
                            <div><img :src="$config.baseUrl + good.cover_path" alt=""></div>
                            <p>{{good.title}}</p>
                            <span style="width: 95px;">¥{{good.price}}</span>
                            <span style="width: 100px;text-align: center">×{{good.quantity}}</span>
                            <span style="width: 100px;text-align: center">¥{{order.pay_amount}}</span>
                        </div>

                        <div class="status" v-if="order.status === 0">
                            <img src="../../../assets/img/arrearage@2x.png" alt="">
                        </div>

                        <div class="status" v-if="order.status === 1">
                            <img src="../../../assets/img/arrearage@2x.png" alt="">
                        </div>

                        <div class="status" v-if="(order.status === 2)">
                            <p>已付款</p>
                        </div>

                        <div class="status" v-if="order.status === 6">
                            <img src="../../../assets/img/delivered@2x.png" alt="">
                        </div>

                        <div class="status" v-if="order.status === 7">
                            <p>对方发起售后</p>
                        </div>

                        <div class="status" v-if="order.status === 8">
                            <p>等待货物退回</p>
                        </div>

                        <div class="status" v-if="order.status === 9">
                            <p>拒绝申请</p>
                        </div>

                        <div class="status" v-if="order.status === 10">
                            <p>对方已退货</p>
                        </div>

                        <div class="status" v-if="order.status === 11">
                            <p>已退款</p>
                        </div>

                        <div class="status" v-if="order.status === 12">
                            <p>对方已收货</p>
                        </div>

                        <div class="status" v-if="order.status === 13">
                            <p>交易成功</p>
                        </div>
                    </div>
                    <div class="order_buyer">
                        <div class="order_buyer_basic">
                            <div class="order_buyer_info">
                                <img src="../../../assets/img/address_site.png" alt="">
                                <span>{{order.contact_name}}</span>
                                <span>{{order.contact_phone}}</span>
                                <span style="color: #999">{{order.contact_address}}</span>
                            </div>
                            <p style="margin-left: 27px">备注：{{order.remark}}</p>
                        </div>
                        <div class="order_buyer_coc">
                            <div class="status" v-if="order.status === 0">
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 1">
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="(order.status === 2)">
                                <div class="connect">联系买家</div>
                                <div class="delivery" @click="handleDelivery(order.order_id)">去发货</div>
                            </div>

                            <div class="status" v-if="order.status === 6">
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 7">
                                <div class="connect">确认申请</div>
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 8">
                                <div class="connect">确认退款</div>
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 9">
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 10">
                                <div class="connect">确认退款</div>
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 11">
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 12">
                                <div class="connect">联系买家</div>
                            </div>

                            <div class="status" v-if="order.status === 13">
                                <div class="connect">联系买家</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="none_list" v-show="!order_list">
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
        },
        data(){
            return{
                second_nav:[
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
            handleDelivery(id){
                this.$emit('on-handle-delivery',id)
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