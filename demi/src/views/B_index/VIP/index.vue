<template>
    <div class="right">
        <div class="VIP_header">
            <span></span>
            <span>得米VIP</span>
        </div>
        <div class="VIP_content">
            <div class="VIP_info">
                <span>
                    <img src="../../../assets/img/vip.png" alt="">
                </span>
                <span style="align-self: flex-end;text-align: right">
                    <p style="margin-bottom: 15px">×1</p>
                    <p>¥2000</p>
                </span>
            </div>
            <div class="VIP_introduce">
                <div class="common">
                    <p style="font-size: 21px;margin-bottom: 35px">普通用户</p>
                    <p style="margin-bottom: 19px">每天只能畅聊20位牛人</p>
                    <p>不能查看牛人联系方式</p>
                </div>
                <div>
                    <img src="../../../assets/img/vs@2x.png" alt="">
                </div>
                <div class="VIP">
                    <p style="font-size: 21px;margin-bottom: 35px">VIP会员</p>
                    <p style="margin-bottom: 19px">海量牛人无限畅聊</p>
                    <p style="margin-bottom: 19px">无限制查看牛人联系方式</p>
                    <p>365天超长有效期</p>
                </div>
            </div>
            <div class="VIP_invoice">
                <p>申请发票</p>
                <div class="change">
                    <div>
                        <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(1)" v-show="active === 2">
                        <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 1">
                        <span style="color: #999999;" v-show="active === 2">需要</span>
                        <span style="color: #4d4d4d;" v-show="active === 1">需要</span>
                    </div>
                    <div>
                        <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(2)" v-show="active === 1">
                        <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 2">
                        <span style="color: #999999;" v-show="active === 1">不需要</span>
                        <span style="color: #4d4d4d;" v-show="active === 2">不需要</span>
                    </div>
                </div>
            </div>
            <el-collapse-transition>
                <div class="Is_invoice" v-show="active === 1">
                    <div class="Is_invoice_wrap">
                        <span>抬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;头：</span>
                        <el-input v-model="rise" placeholder="请输入抬头"></el-input>
                    </div>
                    <div class="Is_invoice_wrap">
                        <span>税&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-input v-model="duty" placeholder="请输入税号"></el-input>
                    </div>
                    <div class="Is_invoice_wrap">
                        <span>接收邮箱:</span>
                        <el-input v-model="email" placeholder="请输入接收发票的邮箱"></el-input>
                    </div>
                </div>
            </el-collapse-transition>
            <div class="bottom">
                <button>立即开通</button>
            </div>
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import {getType} from "../../../libs/http";
    import http from '../../../libs/http'

    export default {
        name: 'wallet',
        data(){
            return{
                active:2,
                rise:null,
                duty:null,
                email:''
            }
        },
        mounted(){

        },
        methods:{
            handleSelect(active){
                this.active = active
            }
        },
        mixins:[http]
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family:PingFang-SC-Medium;
        .VIP_header {
            padding: 20px 0 29px 2px;
            box-sizing: border-box;
            text-align: left;
            font-family: MicrosoftYaHei;
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
        .VIP_content{
            width:100%;
            padding:52px 56px;
            box-sizing: border-box;
            background:rgba(255,255,255,1);
            border:1px solid rgba(235, 235, 235, 1);
            border-radius:8px;
            .VIP_info{
                display: flex;
                justify-content: space-between;
                padding-bottom: 55px;
                border-bottom: 1px solid #E6E6E6;
                img{
                    width: 139px;
                    height: auto;
                }
                p{
                    color: #4D4D4D;
                    font-size: 21px;
                    font-family:MicrosoftYaHei;
                }
            }
            .VIP_introduce{
                padding: 70px 14px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #E6E6E6;
                box-sizing: border-box;
                div{
                    align-self: center;
                    font-size: 16px;
                }
                .common{
                    color: #999999;
                }
                img{
                    width: 63px;
                }
                .VIP{
                    color: #FFA200;
                    p{
                        font-weight:500;
                    }
                }
            }
            .VIP_invoice{
                padding: 27px 0;
                width: 100%;
                border-bottom: 1px solid #E6E6E6;
                display: flex;
                justify-content: space-between;
                p{
                    align-self: center;
                    font-size:16px;
                    color:rgba(77,77,77,1);
                }
                .change{
                    align-self: center;
                    display: flex;
                    justify-content: space-between;
                    div{
                        align-self: center;
                        font-size: 16px;
                        img{
                            width: 24px;
                            margin-right: 5px;
                        }
                        span{
                            line-height: 22px;
                        }
                    }
                    div:nth-child(1){
                        span{
                            margin-right: 75px;
                        }
                    }
                }
            }
            .Is_invoice{
                width: 100%;
                padding-left: 115px;
                box-sizing: border-box;
                text-align: left;
                .Is_invoice_wrap{
                    display: flex;
                    height: 69px;
                    border-bottom: 1px solid #E6E6E6;
                    span{
                        align-self: center;
                        margin-right: 18px;
                        margin-bottom: 2.1px;
                        font-size: 16px;
                        color: #808080;
                        width: 100px;
                    }
                    .el-input{
                        align-self: center;
                        .el-input__inner{
                            border: none;
                            font-size: 16px;
                            color: #4D4D4D;
                        }
                    }
                }
            }
            .bottom{
                margin: 50px 0 17px 0;
                text-align: right;
                button{
                    width: 210px;
                    height: 42.2px;
                    background:linear-gradient(270deg,rgba(255,217,151,1),rgba(255,201,107,1));
                    border-radius:21px;
                    font-size:16px;
                    color:rgba(182,115,12,1);
                    border: none;
                    cursor: pointer;
                }
            }
        }
        ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color: #CCCCCC;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #CCCCCC;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #CCCCCC;
        }
        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #CCCCCC;
        }
    }
</style>