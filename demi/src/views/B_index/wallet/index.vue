<template>
    <div class="right">
        <div class="wallet_header">
            <span></span>
            <span>钱包</span>
        </div>
        <div class="wallet_info">
            <div class="wallet_value">
                <div class="wallet_value_wrap">
                    <p>{{Available_amount}}</p>
                    <p>{{Frozen_amount}}</p>
                </div>
            </div>
            <div class="wallet_title">
                <div class="wallet_title_wrap">
                    <p>可用金额</p>
                    <span></span>
                    <p>冻结金额</p>
                </div>
            </div>
        </div>
        <div class="wallet_detail">
            <div class="wallet_detail-title">
                <p>消费明细</p>
                <p @click="handleWithDraw">提现</p>
            </div>
            <div class="wallet_list" v-for="item in wallet_list" :key="item.detail_id" v-show="wallet_list.length > 0">
                <div>
                    <p>{{item.title}}</p>
                    <p>{{item.created_at}}</p>
                </div>
                <div :class="item.action === 1 ? 'wallet_add' : 'wallet_rec'"><span
                        v-text="item.action === 2 ? '-' : '+'"></span>{{item.amount}}
                </div>
            </div>
            <div class="none_wallet_list" v-show="wallet_list.length < 1">
                <div>
                    <img src="../../../assets/img/snail@2x.png" alt="">
                    <p>你还没有消费记录哦</p>
                </div>
            </div>
        </div>
        <div class="paging" v-show="wallet_list.length > 0">
            <el-pagination
                    background
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    prev-text="上一页"
                    next-text="下一页"
                    :total="searchParams.total"
                    :current-page="searchParams.page"
                    :page-size="searchParams.per_page"
                    :pager-count='5'
                    @size-change="handleWalletSizeChange"
                    @current-change="handleWalletCurrentPageChange"
            >
            </el-pagination>
        </div>
        <div class="no_real_note">
            <el-dialog
                    :visible.sync="goReal"
                    width="460px"
                    :show-close="false"
            >
                <div slot="title">
                    实名提示
                </div>
                <div class="main">
                    <img src="../../../assets/img/_autonym@2x.png" alt="">
                    <p>
                        为保障你的账户安全
                    </p>
                    <p>
                        提现需实名认证
                    </p>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="goReal = false">再想想</el-button>
                <el-button type="primary" @click="handleReal">去实名</el-button>
            </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    import http from '../../../libs/http'
    export default {
        name: 'wallet',
        data() {
            return {
                wallet_list: [],
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
                Available_amount: null,
                Frozen_amount: null,
                goReal:false,
                is_real:false
            }
        },
        mounted() {
            this.handleWallet_list();
        },
        methods: {
            handleWalletSizeChange(per_page) {
                this.searchParams.per_page = per_page;
                this.handleWallet_list();
            },
            handleWalletCurrentPageChange(page) {
                this.searchParams.page = page;
                this.handleWallet_list();
            },
            handleWallet_list() {
                // this.$store.commit('loading', true);
                this.apiGet('/api/user/info').then((res) => {
                    if (res.type === 2) {
                        this.Available_amount = res.available_amount_b;
                        this.Frozen_amount = res.unusable_amount_b;
                        if(res.card && res.card.status === 3){
                            this.is_real = true;
                        }
                        this.apiGet('/api/user/wallet/details', this.searchParams).then((res) => {
                            this.wallet_list = res.data;
                            // console.log(res);
                            this.searchParams.page = parseInt(res.current_page);
                            this.searchParams.total = parseInt(res.total);
                            this.searchParams.per_page = parseInt(res.per_page);
                            // this.$store.commit('loading', false);
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                            duration: 3000
                        });
                        this.$router.push({
                            name: "login"
                        });
                    }
                })
            },

            //跳转提现路由
            handleWithDraw() {
                if (this.is_real) {
                    this.$router.push({
                        name: "withdraw",
                    });
                } else {
                    this.goReal = true
                }

            },

            //跳转认证路由
            handleReal(){
                this.$router.push({
                    name: "real",
                });
            }
        },
        mixins: [http]
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family: MicrosoftYaHei;

        .wallet_header {
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

        .wallet_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 17px;
            width: 100%;
            height: 256px;
            background-size: 100%;
            background-image: url('../../../assets/img/wallet_bg.png');

            .wallet_value {
                margin-bottom: 52px;

                .wallet_value_wrap {
                    display: flex;
                    justify-content: space-between;

                    p {
                        width: 50%;
                        text-align: center;
                        font-size: 48px;
                        color: #FFFFFF;
                        font-family: SimHei;
                    }
                }
            }

            .wallet_title_wrap {
                display: flex;
                justify-content: space-between;

                p {
                    width: 50%;
                    text-align: center;
                    color: #FFFFFF;
                }

                span {
                    width: 2px;
                    height: 19px;
                    background: rgba(237, 249, 255, 1);
                    opacity: 0.9;
                }
            }
        }

        .wallet_detail {
            width: 100%;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            border-radius: 8px;
            padding: 29px 38px;
            box-sizing: border-box;

            .wallet_detail-title {
                display: flex;
                justify-content: space-between;

                p:nth-child(1) {
                    align-self: center;
                    color: rgba(153, 153, 153, 1);
                }

                p:nth-child(2) {
                    align-self: center;
                    width: 89px;
                    height: 25px;
                    background: rgba(247, 253, 255, 1);
                    border: 1px solid rgba(36, 191, 255, 1);
                    border-radius: 13px;
                    line-height: 25px;
                    font-size: 12px;
                    color: #24BFFF;
                    cursor: pointer;
                }

                p:nth-child(2):hover {
                    background: rgba(36, 191, 255, 1);
                    color: white;
                }
            }

            .wallet_list {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 85px;
                border-bottom: 1px solid #F2F2F2;
                padding: 25px 26px 25px 0;
                box-sizing: border-box;

                div {
                    align-self: center;
                    text-align: left;
                    font-size: 13px;
                    color: rgba(153, 153, 153, 1);

                    p:nth-child(1) {
                        margin-bottom: 12px;
                        font-size: 15px;
                        color: #4C4C4C;
                    }
                }

                .wallet_add {
                    color: #1DCC14;
                    font-size: 16px;
                }

                .wallet_rec {
                    font-size: 16px;
                    color: #FF4E4D;
                }
            }

            .none_wallet_list {
                position: relative;
                height: 349px;

                div {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);

                    p {
                        margin-top: 40px;
                        color: #999999;
                    }

                    img {
                        width: 178px;
                    }
                }
            }
        }

        .paging {
            padding: 40px 0;
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

        .no_real_note{
            .el-dialog__header{
                padding: 16px 30px;
                background:rgba(247,248,250,1);
                font-size:16px;
                color:rgba(77,77,77,1);
                text-align: left;
            }
            .el-dialog__body{
                .main{
                    img{
                        width: 97px;
                        margin-bottom: 34px;
                    }
                    p{
                        font-size:14px;
                        color:rgba(77,77,77,1);
                        line-height:26px;
                    }
                }
            }
            .el-dialog__footer{
                padding: 40px 30px 59px;
                .el-button{
                    width:185px;
                    height:43px;
                    border-radius:22px;
                    font-size:16px;
                }
                .el-button--default{
                    background:rgba(247,253,255,1);
                    border:1px solid rgba(36, 191, 255, 1);
                    color: #24BFFF;
                }
                .el-button--default:hover{
                    background:rgba(223,247,255,1);
                }
                .el-button--primary{
                    margin-left: 30px;
                    color:rgba(255,255,255,1);
                    background:rgba(36,191,255,1);
                }
                .el-button--primary{
                    background:#00B5FF;
                }
            }

        }
    }
</style>