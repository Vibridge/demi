<template>
    <div class="orderInfo_wrap">
        <div class="orderInfo_header">
            <span>你的位置：</span>
            <span>首页</span>
            <span>></span>
            <span>我的订单</span>
        </div>
        <div class="orderInfo_nav">
            <div :class="order_info && order_info.status == '0' ? 'active_status nav_label' : 'nav_label'">
                已下单
            </div>
            <div :class="order_info && order_info.status == '2' ? 'active_status nav_label' : 'nav_label'">
                已付款
            </div>
            <div :class="order_info && order_info.status == '6' ? 'active_status nav_label' : 'nav_label'">
                已发货
            </div>
            <div :class="order_info && order_info.status == '12' ? 'active_status nav_label' : 'nav_label'">
                已收货
            </div>
            <div :class="order_info && order_info.status == '13' ? 'active_status nav_label' : 'nav_label'">
                已完成
            </div>
        </div>
        <div class="orderInfo_icon">
            <div class="nav_label" :class="order_info && order_info.status == '0' ? 'active_status nav_label' : 'nav_label'">
                <i class="el-icon-caret-top"></i>
            </div>
            <div class="nav_label" :class="order_info && order_info.status == '2' ? 'active_status nav_label' : 'nav_label'">
                <i class="el-icon-caret-top"></i>
            </div>
            <div class="nav_label" :class="order_info && order_info.status == '6' ? 'active_status nav_label' : 'nav_label'">
                <i class="el-icon-caret-top"></i>
            </div>
            <div class="nav_label" :class="order_info && order_info.status == '12' ? 'active_status nav_label' : 'nav_label'">
                <i class="el-icon-caret-top"></i>
            </div>
            <div class="nav_label" :class="order_info && order_info.status == '13' ? 'active_status nav_label' : 'nav_label'">
                <i class="el-icon-caret-top"></i>
            </div>
        </div>
        <div class="orderInfo_status">
            <span>当前订单状态：买家已付款，等待卖家发货</span>
            <span v-if="order_info && order_info.status == '6'">买家还有9天23时59分58来"确认收货"。超时订单将自动确认收货。</span>
            <span v-if="order_info && order_info.status == '12'">根据《消费者权益保护法》还有14天23时59分58秒，消费者可以无理由退货</span>
            <div class="status_coc">
                <p v-if="order_info && order_info.status == '2'">去发货</p>
                <p class="">联系买家</p>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../libs/http'
    export default {
        name: 'index',
        data(){
            return{
                id:null,
                order_info:{}
            }
        },
        created(){
            this.getRouterData()
        },
        mounted(){

        },
        methods:{
            getRouterData(){
                this.id = this.$route.query.id;
                this.apiGet('api/order/info/' + this.id).then((res)=>{
                    console.log(res)
                    if(res){
                        this.order_info = res
                    }
                })
            }
        },
        mixins:[http]
    }
</script>

<style lang="stylus">
    .orderInfo_wrap
        width 1000px;
        padding 0 30px
        text-align left
        margin 32px auto;
        box-sizing border-box
        background-color #FFFFFF
        .orderInfo_header
            color #333333
            font-size 14px
            padding 29px 0 32px 0
            span:nth-child(2)
                color #33B5FF
            span:nth-child(4)
                color #33B5FF
        .orderInfo_nav
            width:940px;
            height:54px;
            display flex
            line-height 54px
            border-radius:27px;
            background:rgba(221,221,221,1);
            justify-content space-around
            .nav_label
                width 188px
                color #FFFFFF
                font-size 18px
                text-align center
            .active_status
                background:rgba(36,191,255,1);
            .nav_label:nth-child(1)
                border-radius:27px 0 0 27px;
            .nav_label:last-child
                border-radius:0 27px 27px 0;
        .orderInfo_icon
            width:940px;
            display flex
            background:#ffffff;
            justify-content space-around
            .nav_label
                width 188px
                color #24BFFF
                font-size 36px
                text-align center
                visibility hidden
            .active_status
                visibility visible
        .orderInfo_status
            width:940px;
            padding 30px
            display flex
            box-sizing border-box
            flex-direction column
            background:rgba(240,251,255,1);
            border:1px solid rgba(36,191,255,1);
            span:nth-child(1)
                color #333333
                font-size 20px
                margin-bottom 15px
            .status_coc
                display flex

</style>