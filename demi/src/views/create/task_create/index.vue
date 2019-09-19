<template>
    <div class="create_task_wrap">
        <div v-show="!sale & !common" class="before">
            <div class="title">
                <p>选择发布类型</p>
            </div>
            <div class="line"></div>
            <div class="contain">
                <div class="select">
                    <div class="select_wrap" @click="sale=true;common=false">
                        <div></div>
                        <p>发布销售代理任务</p>
                    </div>
                    <div class="select_wrap" @click="sale=false;common=true">
                        <div></div>
                        <p>发布普通任务</p>
                    </div>
                </div>
                <div class="history">
                    <p>使用历史模板</p>
                    <div class="history_wrap">
                        <div class="none">
                            <img src="../../../assets/img/snail @2x.png" alt="">
                            <p>你还没有发布过任务哦</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <sale v-show="sale"></sale>
        <common v-show="common"></common>
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
                common:false
            }
        },
        mounted() {

        },
        methods: {

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
            margin: 12px auto;
            width: 1000px;

            .title {
                padding: 20px 0;
                text-align: left;
                color: #4D4D4D;
                font-size: 16px;
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
                    margin-top: 19px;
                    text-align: left;

                    p {
                        color: rgba(153, 153, 153, 1);
                        font-size: 16px;
                        margin-bottom: 20px;
                    }

                    .history_wrap {
                        width: 100%;

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
                    }
                }
            }
        }

    }
</style>