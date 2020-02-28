<template>
    <div class="orderInfo_wrap">
        <div class="orderInfo_header">
            <span>你的位置：</span>
            <span @click="handleBack('B_person')">首页</span>
            <span>></span>
            <span @click="handleBack('order')">我的订单</span>
        </div>
        <div v-if="order_info.status != '7' && order_info.status != '8' && order_info.status != '10'">
            <div class="orderInfo_nav">
                <div :class="order_info && order_info.status == '0' ? 'active_status nav_label' : 'nav_label'">
                    已下单
                </div>
                <div :class="order_info && order_info.status == '2' ? 'active_status nav_label' : 'nav_label'">
                    已付款
                </div>
                <div :class="order_info && order_info.status == '6'  || (!order_info.is_sign_for && (order_info.status == '7' || order_info.status == '8' || order_info.status == '9' || order_info.status == '10')) ? 'active_status nav_label' : 'nav_label'">
                    已发货
                </div>
                <div :class="order_info && order_info.status == '12' || (order_info.is_sign_for && (order_info.status == '7' || order_info.status == '8' || order_info.status == '9' || order_info.status == '10')) ? 'active_status nav_label' : 'nav_label'">
                    已收货
                </div>
                <div :class="order_info && (order_info.status == '13' || order_info.status == '11') ? 'active_status nav_label' : 'nav_label'">
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
                <div class="nav_label" :class="order_info && order_info.status == '6' || (!order_info.is_sign_for && (order_info.status == '7' || order_info.status == '8' || order_info.status == '9' || order_info.status == '10')) ? 'active_status nav_label' : 'nav_label'">
                    <i class="el-icon-caret-top"></i>
                </div>
                <div class="nav_label" :class="order_info && order_info.status == '12' || (order_info.is_sign_for && (order_info.status == '7' || order_info.status == '8' || order_info.status == '9' || order_info.status == '10')) ? 'active_status nav_label' : 'nav_label'">
                    <i class="el-icon-caret-top"></i>
                </div>
                <div class="nav_label" :class="order_info && (order_info.status == '13' || order_info.status == '11') ? 'active_status nav_label' : 'nav_label'">
                    <i class="el-icon-caret-top"></i>
                </div>
            </div>
            <div class="orderInfo_status">
                <span>当前订单状态：{{handleStatusText1(order_info.status)}}</span>
                <span v-if="order_info && order_info.status == '6'">买家还有<span style="color: #F4333C;font-size:14px">{{handleTime(order_info.logistics_at,10)}}</span>来"确认收货"。超时订单将自动确认收货。</span>
                <span v-if="order_info && order_info.status == '12'">根据平台相关规定资金将在本平台冻结<span style="color: #F4333C;font-size:14px">{{handleTime(order_info.logistics_at,15)}}</span>后解冻到账</span>
                <div class="status_coc">
                    <p class="delivery" v-if="order_info && order_info.status == '2'" @click="handleDelivery(order_info.order_id)">去发货</p>
                    <p class="connect" @click="handleMes(order_info.user_id,'a')">联系买家</p>
                </div>
            </div>

            <div class="orderInfo_main">
                <div class="orderInfo_title">
                    订单信息
                </div>
                <div class="inner">
                    <div class="orderInfo_time">
                        <p class="time">创建时间：{{order_info && order_info.created_at}}</p>
                        <p class="time" v-if="order_info && order_info.pay_time">付款时间：{{order_info.pay_time}}</p>
                        <p class="time" v-if="order_info && order_info.logistics_at">发货时间：{{order_info.logistics_at}}</p>
                    </div>
                    <div class="contact">
                        <span class="icon">
                            <img src="../../assets/img/Location@2x.png" alt="">
                        </span>
                        <p class="contact_name">{{order_info && order_info.contact_name}}</p>
                        <p class="contact_phone">{{order_info && order_info.contact_phone}}</p>
                        <p class="contact_address">{{order_info && order_info.contact_address}}</p>
                    </div>
                    <p class="remark">备注：{{order_info && order_info.remark}}</p>
                    <div class="good_info">
                        <div class="good_info_nav">
                            <p class="name">宝贝</p>
                            <p class="status">状态</p>
                            <p class="price">单价</p>
                            <p class="num">数量</p>
                        </div>
                        <div class="good_list" v-for="item in order_info.goods" :key="item.goods_id">
                            <div class="good_basic">
                                <div class="good_img">
                                    <img :src="$config.baseUrl + item.cover_path" alt="">
                                </div>
                                <p class="good_title">{{item.title}}</p>
                            </div>
                            <div class="good_status">{{handleStatusText(order_info.status)}}</div>
                            <div class="good_price">{{item.price}}</div>
                            <div class="good_quantity">{{item.quantity}}</div>
                        </div>
                    </div>
                    <div class="pay_price">
                        <p>实收款：<span>{{order_info && order_info.pay_amount}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="order_info.status == '7' || order_info.status == '8' || order_info.status == '10'">
            <div class="space_wrap">
                <div :class="order_info && order_info.status == '11' ? 'space_inner active_status_space' : 'space_inner'">
                    <div class="space"></div>
                    <p>退款完毕</p>
                </div>
                <div class="space_inner">
                    <div class="second_space">
                        <div :class="order_info && (order_info.status == '8' || order_info.status == '10') ? 'triangle active_status_space' : order_info && order_info.status > 8 ? 'triangle over_status_space' : 'triangle'"></div>
                        <div :class="order_info && (order_info.status == '8' || order_info.status == '10') ? 'space active_status_space' : order_info && order_info.status > 8 ? 'space over_status_space' : 'space'"></div>
                    </div>
                    <p>卖家确认退款</p>
                </div>
                <div class="space_inner">
                    <div class="second_space">
                        <div :class="order_info && order_info.status == '7' ? 'triangle active_status_space' : order_info && order_info.status > 7 ? 'triangle over_status_space' : 'triangle'"></div>
                        <div :class="order_info && order_info.status == '7' ? 'space active_status_space' : order_info && order_info.status > 7 ? 'space over_status_space' : 'space'"></div>
                    </div>
                    <p>卖家处理退款</p>
                </div>

                <div class="space_inner">
                    <div class="second_space">
                        <div class="triangle over_status_space"></div>
                        <div class="space over_status_space"></div>
                    </div>
                    <p>买家发起退款</p>
                </div>


            </div>
            <p class="info">退款信息</p>
            <p class="uploadTime">申请时间：{{order_info && order_info.after_sale && order_info.after_sale.created_at}}</p>
            <div class="contact">
                        <span class="icon">
                            <img src="../../assets/img/Location@2x.png" alt="">
                        </span>
                <p class="contact_name">{{order_info && order_info.contact_name}}</p>
                <p class="contact_phone">{{order_info && order_info.contact_phone}}</p>
                <p class="contact_address">{{order_info && order_info.contact_address}}</p>
            </div>
            <p class="remark">备注：{{order_info && order_info.remark}}</p>
            <div class="good_info">
                <div class="good_info_nav">
                    <p class="name">宝贝</p>
                    <p class="status">状态</p>
                    <p class="price">单价</p>
                    <p class="num">数量</p>
                </div>
                <div class="good_list" v-for="item in order_info.goods" :key="item.goods_id">
                    <div class="good_basic">
                        <div class="good_img">
                            <img :src="$config.baseUrl + item.cover_path" alt="">
                        </div>
                        <p class="good_title">{{item.title}}</p>
                    </div>
                    <div class="good_status">{{handleStatusText(order_info.status)}}</div>
                    <div class="good_price">{{item.price}}</div>
                    <div class="good_quantity">{{item.quantity}}</div>
                </div>
            </div>
            <div class="pay_price">
                <p>退款金额：<span>{{order_info && order_info.pay_amount}}</span></p>
            </div>
            <p class="note">请处理退款申请</p>
            <p class="note1">请尽快联系买家协商退款事宜</p>
            <div class="order_coc">
                <div class="agree" v-if="order_info && order_info.status == '7'" @click="handleOrderUpdate(order_info.order_id,8)">同意申请</div>
                <div class="agree" v-if="order_info && (order_info.status == '8' || order_info.status == '10')" @click="handleOrderUpdate(order_info.order_id,11)">同意退款</div>
                <div class="reduce" v-if="order_info && order_info.status == '7'">拒绝申请</div>
                <div class="connect" @click="handleMes(order_info.user_id,'a')">联系买家</div>
            </div>
            <div style="padding-bottom: 43px">
                <p class="history">协商历史</p>
                <div class="history_title">
                    <p>买家</p>
                    <p>{{order_info && order_info.after_sale.created_at}}</p>
                </div>
                <p class="reason">退款原因：{{order_info && order_info.after_sale.message}}</p>
                <div class="history_title" v-if="order_info && order_info.status == '9'">
                    <p>卖家</p>
                    <p>{{order_info && order_info.after_sale.created_at}}</p>
                </div>
                <p class="reason" v-if="order_info && order_info.status == '9'">拒绝原因：{{order_info && order_info.after_sale.message}}</p>
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
                order_info:{},
                time:''
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
                this.initialization()
            },
            initialization(){
                this.apiGet('api/order/info/' + this.id).then((res)=>{
                    console.log(res)
                    if(res){
                        this.order_info = res
                    }
                })
            },
            handleStatusText(status){
                if(status == '0'){
                    return "未付款"
                }else if(status == "1"){
                    return "已取消"
                }else if(status == "2"){
                    return "已支付"
                }else if(status == "6"){
                    return "已发货"
                }else if(status == "7"){
                    return "售后中"
                }else if(status == "8"){
                    return "等待退货"
                }else if(status == "9"){
                    return "拒绝退款"
                }else if(status == "10"){
                    return "等待退货"
                }else if(status == "11"){
                    return "已退款"
                }else if(status == "12"){
                    return "已收货"
                }else{
                    return "已完成"
                }
            },
            handleStatusText1(status){
                if(status == '0'){
                    return "买家未付款"
                }else if(status == "1"){
                    return "买家已取消"
                }else if(status == "2"){
                    return "买家已支付，等待发货"
                }else if(status == "6"){
                    return "已发货，等待买家收货"
                }else if(status == "7"){
                    return "买家发起售后"
                }else if(status == "8"){
                    return "等待退货"
                }else if(status == "9"){
                    return "拒绝退款"
                }else if(status == "10"){
                    return "等待退货"
                }else if(status == "11"){
                    return "订单已退款"
                }else if(status == "12"){
                    return "买家已收货"
                }else{
                    return "订单已完成"
                }
            },
            handleTime(time,day){
                let starTime = new Date(time).valueOf();
                let lastTime = starTime + (day * 24 * 60 * 60 * 1000)
                let nowTime = new Date().valueOf();
                if(lastTime - nowTime > 0){
                    let difference  = lastTime - nowTime
                    setInterval(function () {
                        difference = difference - 1000
                        // 计算相差的天数
                        let days = Math.floor(difference / (24 * 3600 * 1000));
                        // 计算天数后剩余的毫秒数
                        let leave1 = difference % (24 * 3600 * 1000);
                        // 计算出小时数
                        let hours = Math.floor(leave1 / (3600 * 1000));
                        // 计算小时数后剩余的毫秒数
                        let leave2 = leave1 % (3600 * 1000);
                        // 计算相差分钟数
                        let minutes = Math.floor(leave2 / (60 * 1000));

                        let leave3 = leave2 % (60 * 1000);

                        let min = Math.floor(leave3 / 1000)

                        let endTime = days + "天" + hours + "时" + minutes + "分" + min + "秒";

                        this.time = endTime
                    }.bind(this),1000)

                    return this.time

                }
            },
            handleDelivery(id){
                this.$router.push({
                    name:'order',
                    query:{
                        id:id
                    }
                })
            },
           /* handleOverTime(time,day){
                setTimeout(function () {
                    this.handleTime(time,day)
                }.bind(this),1000)
            },*/
            handleBack(path){
                this.$router.push({
                    name: path
                })
            },
            handleMes(id,card){
                let data = {};
                data.recipient = id;
                data.type = 4;
                data.card = card
                this.$router.push({
                    name: "IM",
                    params: {id: JSON.stringify(data)}
                });
            },
            handleOrderUpdate(id,status){
                this.apiPost('api/order/update/' + id,{status:status}).then((res)=>{
                    console.log(res)
                    if(res){
                        this.initialization()
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
                cursor pointer
            span:nth-child(4)
                color #33B5FF
                cursor pointer
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
                transform: translateY(12px);
            .active_status
                visibility visible
        .orderInfo_status
            width:940px;
            padding 30px
            display flex
            margin-bottom 30px
            box-sizing border-box
            flex-direction column
            background:rgba(240,251,255,1);
            border:1px solid rgba(36,191,255,1);
            span:nth-child(1)
                color #333333
                font-size 20px
                margin-bottom 15px
            span:nth-child(2)
                color #999999
                font-size 14px
                margin-bottom 15px
            .status_coc
                display flex
                .delivery
                    width:136px;
                    height:29px;
                    line-height 29px
                    margin-right 30px
                    text-align center
                    border-radius:15px;
                    background:rgba(247,253,255,1);
                    border:1px solid rgba(36, 191, 255, 1);
                .connect
                    width:136px;
                    height:29px;
                    cursor pointer
                    line-height 29px
                    text-align center
                    border-radius:15px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(230, 230, 230, 1);


        .orderInfo_main
            width:940px;
            .orderInfo_title
                width 299px
                color #333333
                font-size 22px
                padding 11px 0
                margin-left 31px
                text-align center
                position relative
                background:rgba(255,255,255,1)
                border:1px solid rgba(36,191,255,1)
                border-bottom 1px solid transparent
            .inner
                z-index -1
                margin-top -1px
                padding 20px 30px
                background:rgba(255,255,255,1)
                border:1px solid rgba(36,191,255,1)
                .orderInfo_time
                    display flex
                    color #999999
                    font-size 14px
                    margin-bottom 21px
                    justify-content space-between
                .contact
                    display flex
                    font-size 13px
                    margin-bottom 13px
                    .icon
                        margin-right 17px
                        img
                            width:10px;
                            height:13px;
                    .contact_name,.contact_phone
                        color #4D4D4D
                        margin-right 17px
                    .contact_address
                        color #999999
                .remark
                    color #4D4D4D
                    font-size 13px
                    margin-left 27px
                    margin-bottom 22px
                .good_info
                    width 880px
                    margin-bottom 20px
                    border:1px solid rgba(204,204,204,1);
                    border-bottom:1px solid transparent;
                    .good_info_nav
                        height 24px
                        display flex
                        line-height 24px
                        text-align center
                        background-color #f2fafc
                        border-bottom:1px solid rgba(204,204,204,1);
                        .name
                            width 269px
                        .price,.status
                            width 180px
                        .num
                            width 253px
                    .good_list
                        display flex
                        .good_basic
                            width 269px
                            display flex;
                            padding 15px 0
                            justify-content center
                            align-self flex-start
                            border-right 1px solid #CCCCCC
                            border-bottom 1px solid #CCCCCC
                            .good_img
                                img
                                    width:60px;
                                    height:60px;
                                    border-radius:4px;
                                    margin-right 15px
                            .good_title
                                color #4D4D4D
                                font-size 13px
                                line-height 20px
                        .good_status,.good_price
                            width 180px
                            display flex
                            padding 15px 0
                            text-align center
                            flex-direction column
                            justify-content center
                            border-right 1px solid #CCCCCC
                            border-bottom 1px solid #CCCCCC
                        .good_quantity
                            width 253px
                            display flex
                            padding 15px 0
                            text-align center
                            flex-direction column
                            justify-content center
                            border-bottom 1px solid #CCCCCC
                .pay_price
                    text-align right
                    p
                        color #333333
                        font-size 20px
                        margin-right 20px
                        span
                            color #F4333C
                            font-size 30px
        .space_wrap
            display flex
            margin-bottom 19px

            .space_inner
                position relative
               /* .active_status_space
                    border-color: rgba(255,0,0,1)!important;*/
                /*.over_status_space
                    border-color: #FF9999;*/
                .space
                    width:185px;
                    color #FFFFFF
                    font-size 16px
                    border: 15px solid rgba(228,228,228,1);
                    border-right: 15px solid transparent;
                .space.active_status_space
                    border: 15px solid rgba(255,0,0,1)!important;
                    border-right: 15px solid transparent!important;
                .second_space
                    display flex
                    .triangle
                        margin-left -25px
                        border 15px solid transparent
                        border-right: 15px solid rgba(228,228,228,1)
                    .space
                        width:185px;
                        color #FFFFFF
                        font-size 16px
                        border: 15px solid rgba(228,228,228,1);
                        border-right: 15px solid transparent;
                    .triangle.over_status_space
                        border-right: 15px solid #FF9999!important
                    .space.over_status_space
                        border: 15px solid #FF9999!important;
                        border-right: 15px solid transparent!important;
                    .triangle.active_status_space
                        border-right: 15px solid rgba(255,0,0,1)!important
                    .space.active_status_space
                        border: 15px solid rgba(255,0,0,1)!important;
                        border-right: 15px solid transparent!important;
                p
                    position absolute
                    top 50%
                    left 50%
                    color #FFFFFF
                    font-size 16px
                    transform translate3d(-50%,-50%,0)
            .space_inner:last-child
                .second_space
                    .space.over_status_space
                        border-right: 15px solid #FF9999!important;
        .info
            color #000000
            font-size 20px
            margin-bottom 20px
        .uploadTime
            color #999999
            font-size 14px
            margin-bottom 21px
        .contact
            display flex
            font-size 13px
            margin-bottom 13px
            .icon
                margin-right 17px
                img
                    width:10px;
                    height:13px;
            .contact_name,.contact_phone
                color #4D4D4D
                margin-right 17px
            .contact_address
                color #999999
        .remark
            color #4D4D4D
            font-size 13px
            margin-left 27px
            margin-bottom 22px
        .good_info
            width 880px
            margin-bottom 20px
            border:1px solid rgba(204,204,204,1);
            border-bottom:1px solid transparent;
            .good_info_nav
                height 24px
                display flex
                line-height 24px
                text-align center
                background-color #f2fafc
                border-bottom:1px solid rgba(204,204,204,1);
                .name
                    width 269px
                .price,.status
                    width 180px
                .num
                    width 253px
            .good_list
                display flex
                .good_basic
                    width 269px
                    display flex;
                    padding 15px 0
                    justify-content center
                    align-self flex-start
                    border-right 1px solid #CCCCCC
                    border-bottom 1px solid #CCCCCC
                    .good_img
                        img
                            width:60px;
                            height:60px;
                            border-radius:4px;
                            margin-right 15px
                    .good_title
                        color #4D4D4D
                        font-size 13px
                        line-height 20px
                .good_status,.good_price
                    width 180px
                    display flex
                    padding 15px 0
                    text-align center
                    flex-direction column
                    justify-content center
                    border-right 1px solid #CCCCCC
                    border-bottom 1px solid #CCCCCC
                .good_quantity
                    width 253px
                    display flex
                    padding 15px 0
                    text-align center
                    flex-direction column
                    justify-content center
                    border-bottom 1px solid #CCCCCC
        .pay_price
            text-align right
            margin-right 60px
            margin-bottom 29px
            p
                color #333333
                font-size 20px
                margin-right 20px
                span
                    color #F4333C
                    font-size 30px
        .note
            color #000
            font-size 20px
            margin-bottom 11px
        .note1
            color #999999
            font-size 14px
            margin-right 60px
            margin-bottom 15px
            padding-bottom 15px
            border-bottom 1px solid #CCCCCC
        .order_coc
            display flex
            padding-bottom 21px
            .agree,.reduce,.connect
                width:136px;
                height:29px;
                color #FFFFFF
                cursor pointer
                line-height 29px
                text-align center
                margin-right 30px
                border-radius:15px;
                background:rgba(51,204,255,1);
                border:1px solid rgba(36, 191, 255, 1);
            .reduce,.connect
                color #666666
                background:rgba(255,255,255,1);
                border:1px solid rgba(153,153,153,1);


        .history
            color #000000
            font-size 20px
            margin-bottom 20px
        .history_title
            display flex
            margin-bottom 20px
            p:nth-child(1)
                color #333333
                font-size 18px
                align-self center
                margin-right 19px
            p:nth-child(2)
                color #CCCCCC
                font-size 14px
                line-height 17px
                align-self center
        .reason
            color #333333
            font-size 18px
            margin-bottom 26px
</style>