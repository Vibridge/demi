<template>
    <div class="create_task_wrap">
        <div v-show="!sale & !common" class="before">
            <div class="title" @click="backWork">
                <p>职位管理 - <span>选择发布类型</span></p>
            </div>
            <div class="line"></div>
            <div class="contain">
                <div class="select">
                    <div class="select_wrap" @click="handleSale">
                        <div></div>
                        <p>发布销售代理任务</p>
                    </div>
                    <div class="select_wrap" @click="handleCommon">
                        <div></div>
                        <p>发布普通任务</p>
                    </div>
                </div>
                <div class="history">
                    <p class="title">使用历史模板</p>
                    <div class="history_wrap" v-for="item in history_list" :key="item.task_id" @click="handleCopy(item.task_id,item.payment_method)">
                            <div class="history_list">
                                <p class="title">{{item.task_title}}</p>
                                <div class="history_info">
                                    <div class="price_info">{{item.payment_money.split('.')[0]}}<span>{{item.unit}}/单</span></div>
                                    <div class="icon">
                                        <img src="../../../assets/img/icon_return@2x.png" alt="">
                                    </div>
                                </div>
                                <p class="label">
                                    <span v-if="item.payment_method === 1">即结</span>
                                    <span v-if="item.payment_method !== 1">完工结</span>
                                    <span v-if="item.city">{{item.city.city_name}}</span>
                                    <span v-if="!item.city">不限地区</span>
                                </p>
                            </div>
                        </div>
                    <div class="none" v-if="false">
                        <img src="../../../assets/img/snail @2x.png" alt="">
                        <p>你还没有发布过任务哦</p>
                    </div>
                </div>
            </div>
        </div>
        <sale :is-show="sale" @show-sale="handleBack" :is-updata="is_Edit" :is-history="history" :is-history-id="history_id"></sale>
        <common :is-show="common" v-on:show-common="handleBack" :is-updata="is_Edit" :is-history="history" :is-history-id="history_id"></common>
    </div>
</template>

<script>
    /* eslint-disable */
    /*import AMap from 'AMap'
    var map*/
    import http from '../../../libs/http'
    import sale from "./sale"
    import common from "./commom"
    export default {
        name: 'task',
        components:{sale,common},
        data() {
            return {
                sale:false,
                common:false,
                history:false,
                task_edit:{},
                is_Edit:false,
                history_list:{},
                history_id:null,
                path:'work'
            }
        },
        mounted() {

            this.$nextTick(() =>{
                this.getRouterData();
            });
            this.apiGet('/api/user/info').then((res) => {
                if (res.type === 2) {
                    this.apiGet('/api/task/paginate?user_id=' + res.user_id,).then((res) => {
                        // console.log(res)
                        this.history_list = res.data
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration: 1000
                    });
                    this.$router.push({
                        name: "login"
                    });
                }
            })
        },
        methods: {
            handleBack(data,type){
                if(type === 'sale'){
                    this.sale = data;
                    this.$emit('show-sale');
                }else{
                    this.common = data
                    this.$emit('show-common');
                }
            },
            backWork(){
                sessionStorage.removeItem('task');
                let name = "task_work";
                if(this.path != 'work'){
                    name = 'release'
                }
                this.$router.push({
                    name: this.path,
                    params: {
                        activeName: name
                    }
                });
            },
            handleSale(){
                sessionStorage.removeItem('task');
                this.sale=true;
                this.common=false
            },
            handleCommon(){
                sessionStorage.removeItem('task');
                this.sale=false;
                this.common=true
            },
            handleCopy(item,method){
                this.history_id = item;
                if(method !== 1){
                    this.common = true;
                    this.history = true;
                }else{
                    this.sale = true;
                    this.history = true;
                }
            },
            getRouterData() {
                if(this.$route.params.task){
                    sessionStorage.setItem('task',this.$route.params.task);
                    this.task_edit = JSON.parse(sessionStorage.getItem('task'));
                    // console.log(this.task_edit)
                    if(this.task_edit){
                        if(this.task_edit.isHistory){
                            this.history = true;
                            this.history_id = this.task_edit.id;
                            if(this.task_edit.payment_method !== 1){
                                this.common = true;
                            }else{
                                this.sale = true;
                            }
                        }else{
                            this.is_Edit = true;
                            if(this.task_edit.payment_method !== 1){
                                this.common = true;
                            }else{
                                this.sale = true;
                            }
                        }
                        if(this.task_edit.path){
                            this.path = this.$route.params.path
                        }
                    }
                }
                if(this.$route.params.type){
                    this.sale = true
                }
                if(this.$route.params.path){
                    this.path = this.$route.params.path
                }
            },

        },
        watch: {},
        mixins: [http]
    }
</script>

<style lang="less" type="text/less">
    .create_task_wrap {
        font-family: MicrosoftYaHei;
        background: #FFF;
        .before {
            padding: 12px auto;
            margin: 0 auto;
            width: 1000px;
            .title {
                padding: 20px 0;
                text-align: left;
                color: #4D4D4D;
                font-size: 16px;
                p {
                    color: #4D4D4D;
                    margin: 0 auto;
                    text-align: left;
                    width: 1000px;
                    cursor: pointer;
                }
                span{
                    color: #24BFFF;
                }
            }

            .line {
                width: 1000px;
                height: 1px;
                background: rgba(213, 218, 223, 1);
            }

            .contain {
                .select {
                    display: flex;
                    justify-content: center;
                    padding: 110px 183px;

                    .select_wrap {
                        width: 226px;
                        height: 296px;
                        border: 1px solid rgba(36, 191, 255, 1);
                        border-radius: 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        cursor: pointer;

                        div {
                            width: 100%;
                            height: 170px;
                            -webkit-background-size: 100%;
                            background-size: 100%;
                            background-repeat: no-repeat;
                            background-position: 50% 100%;
                            background-image: url('../../../assets/img/market@2x.png');
                        }

                        p {
                            align-self: flex-end;
                            width: 100%;
                            margin-bottom: 59px;
                            color: rgba(36, 191, 255, 1);
                            font-size: 16px;
                        }
                    }

                    .select_wrap:nth-child(1) {
                        margin-right: 182px;
                    }

                    .select_wrap:nth-child(1):hover {
                        background: #24BFFF;

                        div {
                            background-image: url('../../../assets/img/market_on@2x.png');
                        }

                        p {
                            color: white;
                        }
                    }

                    .select_wrap:nth-child(2) {
                        div {
                            background-image: url('../../../assets/img/task@2x.png');
                        }
                    }

                    .select_wrap:nth-child(2):hover {
                        background: #24BFFF;

                        div {
                            background-image: url('../../../assets/img/task_on@2x.png');
                        }

                        p {
                            color: white;
                        }
                    }
                }

                .history {
                    width: 100%;
                    margin-top: 19px;
                    text-align: left;
                    padding-bottom: 200px;
                    .title{
                        color: rgba(153, 153, 153, 1);
                        font-size: 16px;
                        margin-bottom: 20px;
                    }
                    .none {
                        width: 100%;
                        height: 500px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        img {
                            align-self: center;
                            width: 178px;
                        }

                        p {
                            margin-top: 39px;
                            font-size: 14px;
                            color: rgba(153, 153, 153, 1);
                        }
                    }

                    .history_wrap {
                        width: 100%;
                        display: inline;
                        .history_list:hover{
                            background:rgba(247,247,247,1);
                        }
                        .history_list{
                            width:326px;
                            height:160px;
                            background:rgba(255,255,255,1);
                            border:1px solid rgba(230, 230, 230, 1);
                            border-radius:8px;
                            display: inline-block!important;
                            margin-right: 7px;
                            margin-bottom: 7px;
                            padding: 23px 22px;
                            box-sizing: border-box;
                            .title{
                                margin-bottom: 21px;
                                margin-top: 0;
                                padding: 0;
                                font-size:16px;
                                font-weight:bold;
                                color:#4D4D4D;
                            }
                            .history_info{
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 20px;
                                .price_info{
                                    font-size:26px;
                                    color:rgba(255,78,77,1);
                                    line-height: 20px;
                                    align-self: center;
                                    span{
                                        font-size:12px;
                                        color:rgba(153,153,153,1);
                                        margin-left: 6px;
                                    }
                                }
                                .icon{
                                    width: 8px;
                                    align-self: center;
                                    img{
                                        width: 100%;
                                    }
                                }
                            }
                            .label{
                                margin: 0;
                                span{
                                    height:21px;
                                    background:rgba(255,255,255,1);
                                    border:1px solid rgba(230, 230, 230, 1);
                                    border-radius:4px;
                                    margin-right: 4px;
                                    padding: 4px 10px;
                                    font-size:12px;
                                    color:rgba(153,153,153,1);
                                }
                            }
                        }

                    }
                }
            }
        }

    }
</style>