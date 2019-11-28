<template>
    <div class="login_wrap" v-show="start">
        <div class="login_header">
            <div class="login_header_wrap">
                <div class="login_header_left">
                    <img src="../../assets/img/demilogo@2x.png" alt="">
                </div>
                <div class="login_header_right">
                    <el-input class="phone" v-model="phone" placeholder="手机号" @input="changePhone"></el-input>
                    <el-input class="yzm" placeholder="验证码" v-model="yzm">
                        <div slot="append" @click="Getyzm()" v-text="this.success ? this.timeText : '获取'"></div>
                    </el-input>
                    <div class="captcha-container" v-show="isCaptcha">
                        <div id="captcha"></div>
                    </div>
                    <button @click="login">企业登录/注册</button>
                </div>
            </div>
        </div>
        <div class="login_main">
            <div class="left">
                <img src="../../assets/img/shoji@2x.png" alt="">
            </div>
            <div class="right">
                <div class="right_wrap">
                    <div style="width: 20%; border:1px solid rgba(230, 230, 230, 1);border-radius:6px;margin-right: 3%;padding: 1%">
                        <img src="../../assets/img/download.png" alt="" @click="dialogVisible = true">
                    </div>
                    <div style="align-self: flex-end;width: 30%">
                        <div class="download"><span><img src="../../assets/img/Iphone@2x.png" alt=""></span>
                            <p>iphone</p><span><img src="../../assets/img/download@2x.png"></span></div>
                        <div class="download"><span><img src="../../assets/img/Android@2x.png" alt=""></span>
                            <p>Android</p><span><img src="../../assets/img/download@2x.png"></span></div>
                    </div>
                </div>
                <div class="text">
                    <ul>
                        <li><span>1/</span>
                            <p>为了使人才与优质企业互动更高效，得米为你提供相应的视频简历、视频面试、对口专业招聘专场等模式对个人用户进行人才筛选。</p></li>
                        <li><span>2/</span>
                            <p>得米为企业和求职者精准对接，视频简历能让企业更立体了解求职者，视频面试可以突破时间和地域，使企业招人更高效。</p></li>
                        <li><span>3/</span>
                            <p>得米特有任务广场系统供企业发布短需求工种，并配有人才评价系统、钱包结算系统等功能。能有效为企业降低用人、试错成本，拓宽市场渠道。</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>聚天下之英才而用之</p>
            <p>Gather the talent of the world</p>
        </div>
        <el-dialog
                title="请扫码下载"
                :visible.sync="dialogVisible"
        >
            <img src="../../assets/img/wx.png" alt="">
        </el-dialog>
    </div>
</template>

<script>
    /* eslint-disable */
    import '../../assets/css/reset.css'
    import http from '../../libs/http';
    import Jigsaw from '../../assets/js/slide';


    export default {
        name: 'index',
        data() {
            return {
                phone: '',
                yzm: '',
                time: 60,
                success: false,
                isCaptcha: false,
                type: '',
                start: false,
                dialogVisible: false
            }
        },
        mounted() {
            setTimeout(function () {
                this.start = true;
            }.bind(this));
        },
        computed: {
            timeText() {
                setTimeout(function () {
                    this.time = this.time - 1;
                }.bind(this), 1000);
                if (this.time > 0) {
                    return "[ " + this.time + "s ]";
                } else if (this.time <= 0) {
                    this.success = false;
                    this.time = 61;
                    return null;
                }
            }
        },
        methods: {

            Getyzm() {
                /*else if (!/^((13[0-9])|(166)|(17[0-9])|(15[^4\\D])|(18[0,2,5-9]))\d{8}$/.test(this.phone)) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机号',
                        type: 'error',
                        duration: 500
                    })
                }*/
                if (!this.phone) {
                    this.$message({
                        showClose: true,
                        message: '请输入手机号',
                        type: 'error',
                        duration: 500
                    })
                } else {
                    this.isCaptcha = true;
                    document.getElementsByClassName('captcha-container')[0].style.display = 'block'
                    if (this.time === 60) {
                        let target = document.getElementById('captcha');
                        let captcha = target.getElementsByTagName('div');
                        let length = captcha.length;
                        if (length === 0) {
                            this.jigsaw = new Jigsaw(target, () => {
                                this.apiPost('/sms/captcha', {
                                    phone: this.phone,
                                    mode: 3
                                }).then((res) => {
                                    if (res) {
                                        this.isCaptcha = false;
                                        this.success = true;
                                        this.$message({
                                            showClose: true,
                                            message: '发送成功',
                                            type: 'success',
                                            duration: 500
                                        })
                                    }
                                    setTimeout(() => {
                                        this.isCaptcha = false;
                                        this.jigsaw.reset();
                                    }, 1000);
                                }).catch(() => {
                                    this.isCaptcha = false;
                                    this.jigsaw.reset();
                                });
                            });
                            this.jigsaw.init();
                        }

                    }
                }

            },
            changePhone: function () {
                if (!this.phone) {
                    this.success = false;
                    this.time = 61
                }
            },

            login() {
                this.apiPost('/api/login', {
                    phone: this.phone,
                    mode: 'sms',
                    captcha: this.yzm,
                }).then((res) => {
                    console.log(res);
                    this.yzm = '';
                    this.setToken({authorization: res.token});

                    if (res && (res.type === 2) && (res.enterprise_step > 4)) {
                        let user_id = res.user_id;
                        let userSig = res.usersig;
                        sessionStorage.setItem('userID', user_id);
                        sessionStorage.setItem('userSig', userSig);
                        this.tim.login({
                            userID: user_id + 'b',
                            userSig: userSig
                        }).then(() => {
                            this.$store.commit('toggleIsLogin', true);
                            this.$store.commit('startComputeCurrent');
                            console.log('im登陆成功');
                            this.apiGet('/api/service').then((res) => {
                                if (res && (res.service_id != user_id)) {
                                    sessionStorage.setItem('service_id', res.service_id);
                                    console.log(res)
                                    let data = {
                                        type:3,
                                        recipient: res.service_id,
                                        foreign_key: 0,
                                        sender_mark: user_id + 'b',
                                        recipient_mark: res.service_id + 'b'
                                    };
                                    this.apiPost('/converse/create',data).then((res)=>{
                                        if(res){
                                            this.$store
                                                .dispatch('checkoutConversation', `C2C${res.recipient_mark}`)
                                                .then(() => {
                                                    console.log('aaa');
                                                })
                                        }
                                    })
                                }
                            })
                            /*this.apiGet('/api/service').then((res) => {
                                if (res && (res.service_id !== user_id)) {
                                    sessionStorage.setItem('service_id', res.service_id);
                                    let data = {
                                        type:3,
                                        recipient: res.service_id,
                                        foreign_key: 0,
                                        sender_mark: user_id + 'b',
                                        recipient_mark: res.service_id + 'b'
                                    };
                                    this.apiPost('/converse/create',data).then((res)=>{
                                        if(res){
                                            this.$store
                                                .dispatch('checkoutConversation', `C2C${res.recipient_mark}`)
                                                .then(() => {
                                                    console.log('aaa')
                                                })
                                        }
                                    })
                                }
                            })*/
                        }).catch(error => {
                            this.$store.commit('showMessage', {
                                message: '登录失败：' + error.message,
                                type: 'error'
                            })
                        });
                        // this.$store.dispatch('login', user_id);
                        this.$router.push({
                            name: "B_index"
                        });
                    } else if (res.type === 0 || (res.type === 2 && res.enterprise_step <= 4)) {
                        if (res.enterprise_step === 0) {
                            let data = {
                                type: 2,
                                enterprise_step: 1
                            };
                            this.apiPost('/api/user/update', data).then((res) => {
                                if (res) {
                                    this.$router.push({
                                        name: "B_reg"
                                    });
                                }
                            })
                        }
                        this.$router.push({
                            name: "B_reg"
                        });
                    } else if(res && (res.type !== 2)) {
                        this.$message({
                            showClose: true,
                            message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                            duration: 1000
                        })
                    }


                })
            }
        },
        watch: {},
        mixins: [http],
    }
</script>

<style type="text/less" lang="less">

    .login_wrap {
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(0, 166, 255, 1), rgba(0, 204, 255, 1));
        font-family: MicrosoftYaHei;

        .login_header {
            width: 1000px;
            font-family: MicrosoftYaHeiLight;
            margin: 0 auto;

            .login_header_wrap {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 100px;
                font-size: 13px;

                .login_header_left {
                    align-self: center;

                    img {
                        width: 99px;
                    }
                }

                .login_header_right {
                    align-self: center;
                    display: flex;

                    .phone {
                        width: 190px;
                        height: 39px;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 20px;
                        margin-right: 10px;
                        border: none;

                        .el-input__inner {
                            border-radius: 20px;
                            border: none;
                            padding: 0 25px;
                            height: 39px;
                        }
                    }

                    .yzm {
                        width: 190px;
                        height: 39px;
                        background: rgba(255, 255, 255, 1);
                        margin-right: 10px;
                        border-radius: 20px;
                        border: none;

                        .el-input__inner {
                            border-radius: 20px 0 0 20px;
                            border: none;
                            padding: 0 25px;
                            height: 39px;

                        }

                        .el-input-group__append {
                            border-radius: 20px;
                            border: none;
                            width: 77px;
                            padding: 0;
                            color: #24BFFF;
                            background: none;
                        }

                        .el-input-group__append:hover {
                            background: rgba(247, 247, 247, 1);

                        }
                    }

                    button {
                        background: rgba(255, 255, 255, 1);
                        border-radius: 20px;
                        border: none !important;
                        padding: 0 20px;
                        color: #24BFFF;
                        font-weight: bolder;
                    }

                    button:hover {
                        background: rgba(247, 247, 247, 1);
                    }

                }
            }
        }

        .login_main {
            margin: 0 auto;
            height: calc(100vh - 173px);
            background-image: url("../../assets/img/bg@2x.png");
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            justify-content: center;

            .left {
                width: 20%;
                align-self: center;
                margin-right: 5%;

                img {
                    width: 100%;
                }
            }

            .right {
                width: 35%;
                align-self: center;

                .right_wrap {
                    display: flex;
                    justify-content: flex-start;
                    width: 100%;
                    margin-bottom: 10%;

                    img {
                        width: 100%;
                    }

                    .download {
                        width: 100%;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(230, 230, 230, 1);
                        border-radius: 20px;
                        font-size: 14px;
                        margin-bottom: 5%;
                        padding: 5% 0;
                        display: flex;
                        justify-content: space-around;
                        cursor: pointer;

                        span {
                            width: 10%;
                            align-self: center;

                            img {
                                width: 100%;
                            }
                        }

                        p {
                            align-self: center;

                        }

                    }

                    .download:nth-last-child(1) {
                        margin-bottom: 0;
                    }

                    .download:hover {
                        background: rgba(250, 250, 250, 1);
                    }
                }

                .text {
                    width: 100%;
                    margin: 0 auto;
                    text-align: left;

                    ul {
                        li {
                            margin-bottom: 5%;
                            word-break: break-word;

                            span {
                                color: #24BFFF;
                                font-size: 30px;
                                position: absolute;
                                transform: translateY(-35%);
                            }

                            p {
                                font-size: 14px;
                                text-indent: 2em;
                                line-height: 24px;
                            }
                        }
                    }
                }
            }
        }

        .footer {
            font-family: PingFang-SC-Medium;
            color: #FFFFFF;

            p:nth-child(1) {
                font-size: 22px;
                margin-bottom: 11px;
                margin-top: 20px;
            }

            p {
                font-size: 12px;
            }
        }

        .el-dialog {
            margin: 0 auto !important;
            top: 50%;
            width: 400px;
            height: 400px;
            transform: translateY(-50%);
        }
    }

    .captcha-container {
        z-index: 500;
        top: 100px;
        padding: 8px;
        position: absolute;
        border-radius: 4px;
        border: 1px solid #e4e7eb;
        background-color: #ffffff;
    }

    #captcha {
        position: relative;

        .sliderContainer {
            position: relative;
            text-align: center;
            width: 280px;
            border-radius: 4px;
            height: 38px;
            line-height: 38px;
            background: #f7f9fa;
            color: #45494c;
            border: 1px solid #e4e7eb;
        }

        .block {
            position: absolute;
            left: 0;
            top: 0;
        }

        .sliderContainer_active .slider {
            height: 36px;
            top: -1px;
            border: 1px solid #1991FA;
        }

        .sliderContainer_active .sliderMask {
            height: 36px;
            border-width: 1px;
        }

        .sliderContainer_success .slider {
            height: 36px;
            top: -1px;
            border-radius: 4px;
            border: 1px solid #52CCBA;
            background-color: #52CCBA !important;
        }

        .sliderContainer_success .sliderMask {
            height: 36px;
            border: 1px solid #52CCBA;
            background-color: #D2F4EF;
        }

        .sliderContainer_success .sliderIcon {
            background-position: 0 0 !important;
        }

        .sliderContainer_fail .slider {
            height: 36px;
            border-radius: 4px;
            top: -1px;
            border: 1px solid #f57a7a;
            background-color: #f57a7a !important;
        }

        .sliderContainer_fail .sliderMask {
            height: 36px;
            border: 1px solid #f57a7a;
            background-color: #fce1e1;
        }

        .sliderContainer_fail .sliderIcon {
            background-position: 0 -83px !important;
        }

        .sliderContainer_active .sliderText, .sliderContainer_success .sliderText, .sliderContainer_fail .sliderText {
            display: none;
        }

        .sliderMask {
            position: absolute;
            left: 0;
            top: 0;
            height: 38px;
            border: 0 solid #1991FA;
            background: #D1E9FE;
        }

        .slider {
            position: absolute;
            top: 0;
            left: 0;
            width: 38px;
            height: 38px;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: background .2s linear;
        }

        .slider:hover {
            background: #1991FA;
        }

        .slider:hover .sliderIcon {
            background-position: 0 -13px;
        }

        .canvas_wrap {
            width: 100%;
        }

        .sliderIcon {
            position: absolute;
            top: 14px;
            left: 13px;
            width: 14px;
            height: 10px;
            background: url("../../assets/icon/icon_light.f13cff3.png") 0 -26px;
            background-size: 34px 471px;
        }

        .refreshIcon {
            position: absolute;
            right: 0;
            top: 0;
            width: 34px;
            height: 34px;
            cursor: pointer;
            background: url('../../assets/icon/icon_light.f13cff3.png') 0 -437px;
            background-size: 34px 471px;
        }
    }

    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color: #B2B2B2;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #B2B2B2;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #B2B2B2;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #B2B2B2;
    }

</style>
