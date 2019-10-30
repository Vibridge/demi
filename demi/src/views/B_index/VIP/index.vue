<template>
    <div class="right">
        <div class="VIP_header">
            <span></span>
            <span>得米VIP</span>
        </div>
        <div class="VIP_content">
            <div class="VIP_ing" v-if="!isVip">
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
                            <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(1)"
                                 v-show="active === 2">
                            <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 1">
                            <span style="color: #999999;" v-show="active === 2">需要</span>
                            <span style="color: #4d4d4d;" v-show="active === 1">需要</span>
                        </div>
                        <div>
                            <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(2)"
                                 v-show="active === 1">
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
            <div class="VIP_ed" v-if="isVip">
                <div class="VIPS_info">
                    <p>Hello，尊敬的用户！</p>
                    <p>你已成为VIP会员 享无限特权</p>
                    <p>Highest privilege member exclusive</p>
                </div>
                <div class="VIPS_detail">
                    <p>“海量牛人无限畅聊”</p>
                    <p>“无限制查看牛人联系方式”</p>
                    <p>“365天超长有效期”</p>
                </div>
                <button>有效期至：{{end_time}}</button>
                <p class="note">《“得米”平台服务协议》</p>
            </div>
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import time from "../../../libs/time";
    import http from '../../../libs/http'

    export default {
        name: 'wallet',
        data() {
            return {
                active: 2,
                rise: null,
                duty: null,
                email: '',
                end_time:null,
                isVip:false,
            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                if(res.type === 2){
                    var start = time.Time(res.vip_start,'Y-M-D');
                    this.end_time = parseInt(start.split('-')[0]) + 1 + '-' + start.split('-')[1] + '-' + start.split('-')[2];
                    if(time.Stamp(this.end_time) < new Date().getTime()/1000){
                        this.isVip = false
                    }else{
                        this.isVip = true
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration:1000
                    });
                }
            })
        },
        methods: {
            handleSelect(active) {
                this.active = active
            },

        },
        mixins: [http]
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family: PingFang-SC-Medium;

        .VIP_header {
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

        .VIP_content {
            width: 100%;
            padding: 52px 56px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            border-radius: 8px;

            .VIP_ing {
                .VIP_info {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 55px;
                    border-bottom: 1px solid #E6E6E6;

                    img {
                        width: 139px;
                        height: auto;
                    }

                    p {
                        color: #4D4D4D;
                        font-size: 21px;
                        font-family: MicrosoftYaHei;
                    }
                }

                .VIP_introduce {
                    padding: 70px 14px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #E6E6E6;
                    box-sizing: border-box;

                    div {
                        align-self: center;
                        font-size: 16px;
                    }

                    .common {
                        color: #999999;
                    }

                    img {
                        width: 63px;
                    }

                    .VIP {
                        color: #FFA200;

                        p {
                            font-weight: 500;
                        }
                    }
                }

                .VIP_invoice {
                    padding: 27px 0;
                    width: 100%;
                    border-bottom: 1px solid #E6E6E6;
                    display: flex;
                    justify-content: space-between;

                    p {
                        align-self: center;
                        font-size: 16px;
                        color: rgba(77, 77, 77, 1);
                    }

                    .change {
                        align-self: center;
                        display: flex;
                        justify-content: space-between;

                        div {
                            align-self: center;
                            font-size: 16px;

                            img {
                                width: 24px;
                                margin-right: 5px;
                            }

                            span {
                                line-height: 22px;
                            }
                        }

                        div:nth-child(1) {
                            span {
                                margin-right: 75px;
                            }
                        }
                    }
                }

                .Is_invoice {
                    width: 100%;
                    padding-left: 115px;
                    box-sizing: border-box;
                    text-align: left;

                    .Is_invoice_wrap {
                        display: flex;
                        height: 69px;
                        border-bottom: 1px solid #E6E6E6;

                        span {
                            align-self: center;
                            margin-right: 18px;
                            margin-bottom: 2.1px;
                            font-size: 16px;
                            color: #808080;
                            width: 100px;
                        }

                        .el-input {
                            align-self: center;

                            .el-input__inner {
                                border: none;
                                font-size: 16px;
                                color: #4D4D4D;
                            }
                        }
                    }
                }

                .bottom {
                    margin: 50px 0 17px 0;
                    text-align: right;

                    button {
                        width: 210px;
                        height: 42.2px;
                        background: linear-gradient(270deg, rgba(255, 217, 151, 1), rgba(255, 201, 107, 1));
                        border-radius: 21px;
                        font-size: 16px;
                        color: rgba(182, 115, 12, 1);
                        border: none;
                        cursor: pointer;
                    }
                }
            }

            .VIP_ed {
                width: 100%;
                text-align: center;
                background-image: url("../../../assets/img/vipp@2x.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                padding-top: 152px;
                font-family: PingFang SC;
                font-weight: 500;
                .VIPS_info {
                    p {
                        color: rgba(216, 136, 0, 1);
                        margin-bottom: 18px;
                        line-height:26px;
                    }

                    p:nth-child(1) {
                        font-size: 23px;
                    }

                    p:nth-child(2) {
                        font-size: 33px;
                    }

                    p:nth-child(3) {
                        font-size: 16px;
                    }
                }
                .VIPS_detail{
                    margin-top: 70px;
                    p{
                        font-size:16px;
                        color:rgba(77,77,77,1);
                        margin-bottom: 19px;
                        line-height:21px;
                    }
                }
                button{
                    width:284px;
                    height:47px;
                    background:linear-gradient(270deg,rgba(255,201,107,1),rgba(255,217,151,1));
                    border-radius:24px;
                    border:none;
                    font-size:16px;
                    color:rgba(182,115,12,1);
                    margin-top: 50px;
                    margin-bottom: 31px;
                }

                .note{
                    font-size:14px;
                    color:rgba(255,162,0,1);
                    padding-bottom: 47px;
                    line-height:31px;
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