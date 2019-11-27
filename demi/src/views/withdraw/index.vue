<template>
    <div class="withdraw">
        <div class="title">
            提现
        </div>
        <div class="main">
            <div class="note">
                <p>注意：为保证账户安全，银行持卡人姓名必须与实名认证姓名一致</p>
            </div>
            <div class="choose">
                <p>选择银行卡</p>
                <div>

                </div>
            </div>
            <div class="money">
                <div class="title">提现金额</div>
                <el-input v-model="input" placeholder="placeholder"></el-input><span>元</span>
                <p>账户余额：8888元<span class="all">全部提现</span></p>
            </div>
            <div class="time">
                <p>到账时间：当天发起提现，下一个工作日到账</p>
                <button>确认提现</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data(){
            return{
                input:0
            }
        }
    }
</script>

<style lang="less" type="text/less">
    .withdraw{
        width: 1000px;
        margin: 0 auto;
        text-align: left;
        .title{
            margin: 32px 0;
            font-size:16px;
            color:rgba(77,77,77,1);
        }
        .main{
            width: 100%;
            height:1000px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(230, 230, 230, 1);
            .note{
                height:70px;
                line-height: 70px;
                background:rgba(230,238,247,1);
                p{
                    font-size:14px;
                    color:rgba(77,77,77,1);
                    margin-left: 32px;
                }
            }
            .choose{
                margin-left: 31px;
                padding: 60px 0;
                border-bottom: 1px solid #EBEBEB;
                p{
                    font-size:14px;
                    color:rgba(77,77,77,1);
                }
            }
            .money{
                margin-left: 31px;
                padding: 60px 0;
                border-bottom: 1px solid #EBEBEB;
                .title{
                    font-size:14px;
                    color:rgba(77,77,77,1);
                    margin-bottom: 20px;
                }
                .el-input{
                    width: 180px;
                    margin-right: 10px;
                    margin-bottom: 12px;
                }
                span{
                    font-size:14px;
                    color:rgba(77,77,77,1);
                }
                p{
                    font-size:12px;
                    color:rgba(153,153,153,1);
                    margin-right: 13px;
                }
                .all{
                    margin-left: 13px;
                    font-size:12px;
                    color:rgba(36,191,255,1);
                }
            }
            .time{
                margin-left: 31px;
                p{
                    margin: 60px 0;
                    font-size:14px;
                    color:rgba(77,77,77,1);
                }
                button{
                    width:127px;
                    height:33px;
                    background:rgba(36,191,255,1);
                    border-radius:17px;
                    border: none;
                    font-size:14px;
                    color:rgba(255,255,255,1);
                }
            }
        }
    }
</style>