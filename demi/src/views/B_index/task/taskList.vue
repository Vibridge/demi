<template>
    <div>
        <div class="task_list_wrap" v-for="task in this.taskList" :key="task.task_order_id">
            <div class="task_list_info">
                <div class="task_title">
                    <p>{{task.task_title}}</p>
                    <p>{{task.snapshot.payment_money}}{{task.unit}}/单</p>
                </div>
                <div class="task_buyer">
                    <div class="task_buyer_info">
                        <div>
                            <img :src="task.user.avatar" alt="">
                        </div>
                        <div>
                            <p>{{task.user.nickname}}</p>
                            <p>
                                <span v-if="task.snapshot.city">{{task.snapshot.city.city_name}}-</span>
                                <span v-if="!task.snapshot.city">不限-</span>
                                <span v-for="ind in task.snapshot.industry" :key="ind.label_id">
                                                        {{ind.name}}
                                                    </span>
                            </p>
                        </div>
                    </div>
                    <p class="order_sum" v-if="task.order_sum && task.payment_method !== 3">
                        已销售：{{task.order_sum}}</p>
                    <p class="order_sum" v-if="!task.order_sum && task.payment_method !== 3">
                        已销售：0</p>
                </div>
                <div class="task_operate" v-if="task.status === 0">
                    <button @click="handleRefuse(this.index,task.task_order_id,task.user.user_id)" class="first active_over">拒绝
                    </button>
                    <button v-if="parseInt(task.snapshot.front_money) <= 0"
                            @click="handlePass(this.index,task.task_order_id,task.user.user_id)">通过
                    </button>
                    <button v-if="parseInt(task.snapshot.front_money)>0"
                            @click="pay()">通过&支付定金
                    </button>
                </div>

                <div class="task_operate" v-if="task.status === 1 & task.payment_method !== 1">
                    <button style="width: 82px;margin-right: 10px;background: #EBEBEB;color: #999999">进行中</button>
                    <button style="background: #fff;border: 1px solid rgba(36, 191, 255, 1);color: rgba(36, 191, 255, 1)"
                            @click="handleMsg(task.user.user_id,task.task_order_id)">
                        和他聊聊
                    </button>
                </div>
                <div class="task_operate" v-if="task.status === 1 & task.payment_method === 1">
                    <button class="first" @click="handleMsg(task.user.user_id,task.task_order_id)">和他聊聊</button>
                    <button @click="handleOver(index,task.task_order_id,task.user.user_id)">结束任务</button>
                </div>
                <div class="task_operate" v-if="task.status === 3">
                    <button class="first" @click="handleMsg(task.user.user_id,task.task_order_id)">和他聊聊</button>
                    <button @click="pay">任务完成&支付尾款</button>
                </div>
                <div class="task_operate" v-if="task.status === 2">
                    <!--<button style="visibility: hidden;width: 82px;margin-right: 10px;"></button>-->
                    <!--<button style="background: #EBEBEB;color: #999999;">已拒绝</button>-->
                    <button style="visibility: hidden;width:136px;margin-right: 10px;"></button>
                    <button style="width: 82px;background: #EBEBEB;color: #999999;">已拒绝</button>
                </div>

                <div class="task_operate" v-if="task.status === 4 && task.is_comment_boss === 0">
                    <button class="first" @click="handleMsg(task.user.user_id,task.task_order_id)">和他聊聊</button>
                    <button @click="handleDiscuss_dia(index,task)">去评价</button>
                </div>

                <div class="task_operate" v-if="task.status === 4 && task.is_comment_boss === 1">
                    <button style="visibility: hidden;width:136px;margin-right: 10px;"></button>
                    <button style="width: 82px;background: #EBEBEB;color: #999999;">已评价</button>
                </div>

                <!--<div class="task_operate" v-if="task.status === 5">
                    <button class="first" @click="handleMsg(task.user.user_id,task.task_order_id)">和他聊聊</button>
                    <button @click="handleCancel(index,task)">取消任务</button>
                </div>-->

                <div class="task_operate" v-if="task.status === 6">
                    <button class="first" @click="handleMsg(task.user.user_id,task.task_order_id)">和他聊聊</button>
                    <button @click="handleDiscuss_dia(index,task)">拒绝取消</button>
                </div>

                <div class="task_operate" v-if="task.status === 7">
                    <button style="visibility: hidden;width:136px;margin-right: 10px;"></button>
                    <button style="width: 82px;background: #EBEBEB;color: #999999;">已取消</button>
                </div>
            </div>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
    import http from '../../../libs/http'
    export default {
        name: 'taskList',
        props: {
            taskList: {
                type: Array
            },
            index:{
                type:String
            }
        },
        data() {
            return {}
        },
        methods: {
            //拒绝任务
            handleRefuse(index, id, user_id) {
                this.apiPost('/api/task/order/status/' + id, {status: 2}).then((res) => {
                    // console.log(res);
                    if (res) {
                        // this.$emit('on-reset',index)
                        if (index === '0') {
                            this.$emit('on-reset',[])
                        } else if (index === '1') {
                            this.$emit('on-reset',[0,5])
                        }
                        let userID = user_id + 'a';
                        const message = this.tim.createCustomMessage({
                            to: userID,
                            conversationType: "C2C",
                            payload: {
                                data: '', // 用于标识该消息是骰子类型消息
                                description: '[任务发布者拒绝了任务申请]', // 获取骰子点数
                                extension: ''
                            }
                        });
                        let promise = this.tim.sendMessage(message);
                        promise.then(function (imResponse) {
                            // 发送成功
                            console.log(imResponse);
                        }).catch(function (imError) {
                            // 发送失败
                            console.warn('sendMessage error:', imError);
                        });
                    }
                })
            },

            //通过任务
            handlePass(index, id, user_id) {
                this.apiPost('/api/task/order/status/' + id, {status: 1}).then((res) => {
                    if (res) {
                        if (index === '0') {
                            this.$emit('on-reset',[])
                        } else if (index === '1') {
                            this.$emit('on-reset',[0,5])
                        }
                        let userID = user_id + 'a';
                        const message = this.tim.createCustomMessage({
                            to: userID,
                            conversationType: "C2C",
                            payload: {
                                data: '', // 用于标识该消息是骰子类型消息
                                description: '[任务发布者通过了任务申请]', // 获取骰子点数
                                extension: ''
                            }
                        });
                        let promise = this.tim.sendMessage(message);
                        promise.then(function (imResponse) {
                            // 发送成功
                            console.log(imResponse);
                        }).catch(function (imError) {
                            // 发送失败
                            console.warn('sendMessage error:', imError);
                        });
                    }
                })
            },

            pay() {
                this.$message('请在app完成此操作')
            },

            //聊天
            handleMsg(id, key) {
                let data = {};
                data.recipient = id;
                data.foreign_key = key;
                data.type = 2;
                this.$router.push({
                    name: "IM",
                    params: {id: JSON.stringify(data)}
                });
            },

            //结束任务
            handleOver(index, id, user_id) {
                this.apiPost('/api/task/order/status/' + id, {status: 4}).then((res) => {
                    if (res) {
                        if (index === '0') {
                            this.$emit('on-reset',[])
                        } else if (index === '2') {
                            this.$emit('on-reset',[1, 3])
                        }
                        let userID = user_id + 'a';
                        const message = this.tim.createCustomMessage({
                            to: userID,
                            conversationType: "C2C",
                            payload: {
                                data: '', // 用于标识该消息是骰子类型消息
                                description: '[任务发布者结束了任务]', // 获取骰子点数
                                extension: ''
                            }
                        });
                        let promise = this.tim.sendMessage(message);
                        promise.then(function(imResponse) {
                            // 发送成功
                            console.log(imResponse);
                        }).catch(function(imError) {
                            // 发送失败
                            console.warn('sendMessage error:', imError);
                        });
                    }
                })
            },

            //评价
            handleDiscuss_dia(index, item) {
                this.$emit('on-show-discuss',true, item ,index)
                /*this.discuss = true;
                this.discusser_info = item;*/
                // this.index = index
            },
        },
        mixins:[http]
    }
</script>

<style scoped>

</style>