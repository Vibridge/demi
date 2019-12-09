<template>
    <div class="withdraw">
        <div class="title">
            <p><span @click="handleBack">钱包 - </span><span>提现</span></p>
        </div>
        <div class="main">
            <div class="note">
                <p>注意：为保证账户安全，银行持卡人姓名必须与实名认证姓名一致</p>
            </div>
            <div class="choose">
                <p>选择银行卡</p>
                <div class="card_list">
                    <div v-if="card_list.length > 0" v-for="item in card_list" :key="item.bank_card_id" @click="handleSelect(item.bank_card_id)"
                         :class="select ===  item.bank_card_id ? 'active_select item' : 'item'">
                        <div class="item_header">
                            <div>
                                <img src="../../assets/img/redlining@2x.png" alt="">
                            </div>
                            <p>{{item.bank_name}}</p>
                        </div>
                        <p class="number">{{handleShowCard(item.card_number,3,4)}}</p>
                        <img v-if="select ===  item.bank_card_id" class="select" src="../../assets/img/pitch_up@2x.png" alt="">
                    </div>
                    <div class="add" @click="handleAdd">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
            </div>
            <div class="money">
                <div class="title">提现金额</div>
                <el-input v-model="amount" placeholder="请输入提现金额"></el-input><span>元</span>
                <p>账户余额：{{Available_amount}}元<span class="all" @click="amount = Available_amount">全部提现</span></p>
            </div>
            <div class="time">
                <p>到账时间：当天发起提现，下一个工作日到账</p>
                <button @click="handleCash">确认提现</button>
            </div>
        </div>

        <div class="dialog-card">
            <el-dialog
                    :visible.sync="addCard"
                    width="707px"
                    :show-close = "false"
            >
                <div slot="title">
                    <p>新增银行卡</p>
                </div>
                <el-form label-width="208px" :model="form">
                    <el-form-item label="公司名称：">
                        <el-input v-model="form.full_name" placeholder="开户公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="银行名称：">
                        <el-input v-model="form.bank_name" placeholder="银行名称(eg:中国银行)"></el-input>
                    </el-form-item>
                    <el-form-item label="银行卡号：">
                        <el-input v-model="form.card_number" placeholder="银行卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="开户支行名称：">
                        <el-input v-model="form.bank_branch" placeholder="请输入开户支行"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleSubmit">确认无误</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import http from '../../libs/http';

    export default {
        name: 'index',
        data(){
            return{
                amount:'',
                addCard:false,
                Available_amount:null,
                form:{
                    full_name:'',
                    bank_name:'',
                    card_number:null,
                    bank_branch:''
                },
                card_list:[],
                select:null
            }
        },
        mounted(){
            this.initialize()
        },
        methods:{
            initialize(){
                this.apiGet('/api/user/info').then((res) => {
                    if (res.type === 2) {
                        this.Available_amount = res.available_amount_b;
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
                });
                this.apiGet('/api/bank/card/lists').then((res)=>{
                    // console.log(res)
                    if(res){
                        this.card_list = res;
                    }
                })
            },
            handleBack(){
                this.$router.push({
                    name:'wallet'
                })
            },

            handleAdd(){
                this.addCard = true
            },

            handleSubmit(){
                this.addCard = false;
                this.apiPost('/api/bank/card/create',this.form).then((res)=>{
                    // console.log(res);
                    this.initialize()
                })
            },

            //银行卡显示
            handleShowCard(str,frontLen,endLen) {
                var len = str.length-frontLen-endLen;
                var xing = '';
                for (var i=0;i<len;i++) {
                    xing +='*';
                }
                return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
            },

            handleSelect(id){
                this.select = id;
            },

            handleCash(){
                if(this.select){
                    let data={
                        bank_card_id: this.select,
                        amount:this.amount
                    };
                    if(this.amount > 0){
                        this.apiPost('/api/user/money/withdraw',data).then((res)=>{
                            // console.log(res);
                        })
                    }
                }else{
                    this.$message('请先选择银行卡')
                }

            }
        },
        mixins:[http]
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
            p {
                color:rgba(77,77,77,1);
                margin: 0 auto;
                text-align: left;
                width: 1000px;
                cursor: pointer;
            }

            span:nth-child(2) {
                color: #24BFFF;
            }
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

                .card_list{
                    margin-top: 21px;
                    display: flex;

                    .item{
                        position: relative;
                        cursor: pointer;
                        width:190px;
                        height:102px;
                        padding:20px 10px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(230, 230, 230, 1);
                        box-sizing: border-box;
                        margin-right: 26px;
                        .item_header{
                            display: flex;
                            margin-bottom: 11px;
                            div{
                                align-self: center;
                                img{
                                    width: 22px;
                                    margin-right: 10px;
                                }
                            }
                            p{
                                align-self: center;
                                font-size:14px;
                                color:rgba(77,77,77,1);
                            }
                        }
                        .number{
                            margin-left: 30px;
                            font-size:14px;
                            color:rgba(153,153,153,1);
                        }
                        .select{
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            width: 24px;
                        }

                    }
                    .item:hover{
                        background:rgba(250,250,250,1);
                    }
                    .add{
                        width:166px;
                        height:100px;
                        background:rgba(247,248,250,1);
                        border:1px solid rgba(230, 230, 230, 1);
                        line-height: 100px;
                        text-align: center;
                        i{
                            font-size: 34px;
                            line-height: 34px;
                            color: #CCCCCC;
                        }
                    }
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
                    cursor: pointer;
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
        .dialog-card{
            .el-dialog__header{
                height:50px;
                line-height: 50px;
                padding: 0 0 0 30px;
                background:rgba(247,248,250,1);
                font-size:16px;
                color:rgba(77,77,77,1);
            }
            .el-dialog__body{
                padding: 0;
                .el-form{
                    .el-form-item{
                        padding-top: 50px;
                        margin: 0;
                        .el-form-item__label{
                            font-size:16px;
                            color:rgba(77,77,77,1);
                        }
                        .el-input{
                            width: 389px;
                            .el-input__inner{
                                border-radius: 0;
                                height: 38px;
                                line-height: 38px;
                            }
                        }
                    }
                }
            }
            .el-dialog__footer{
                padding: 50px 110px 93px 0;
                .el-button--primary{
                    width:127px;
                    height:33px;
                    background:rgba(36,191,255,1);
                    border-radius:17px;
                    padding: 0;
                    font-size:14px;
                    color:rgba(255,255,255,1);
                    border: none;
                }

            }
        }
        .active_select{
            border:1px solid rgba(36, 191, 255, 1)!important;
        }
    }
</style>