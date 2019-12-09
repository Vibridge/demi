<template>
    <div class="title">
        <div v-if="messageDetail && messageDetail.dominator">
            系统消息
        </div>
       <!-- <div class="title_wrap" v-if="messageDetail && messageDetail.type === 1">
            <div class="label">
                <p>{{messageDetail.work.work_name}}</p>
                <p>
                    <span>{{messageDetail.work.work_experience_min}}-{{messageDetail.work.work_experience_max}}年 / </span>
                    <span v-if="messageDetail.work.education === 0">不限 / </span>
                    <span v-if="messageDetail.work.education === 1">初中及以下 / </span>
                    <span v-if="messageDetail.work.education === 2">中专/中技 / </span>
                    <span v-if="messageDetail.work.education === 3">高中 / </span>
                    <span v-if="messageDetail.work.education === 4">大专 / </span>
                    <span v-if="messageDetail.work.education === 5">本科 / </span>
                    <span v-if="messageDetail.work.education === 6">硕士 / </span>
                    <span v-if="messageDetail.work.education === 7">博士 / </span>
                    <span v-if="messageDetail.work.city">{{messageDetail.work.city.city_name}}</span>
                </p>
            </div>
            <div class="salary">
                <p>{{messageDetail.work.salary_min/1000}}-{{messageDetail.work.salary_max/1000}}k</p>
                <p><img src="../../assets/img/icon_return.png" alt=""></p>
            </div>
        </div>-->
        <!--=== 2-->
        <div class="title_wrap" v-if="messageDetail && messageDetail.type">
            <div class="label">
                <p v-if="messageDetail && messageDetail.recipient && messageDetail.recipient.user_id == user_id">
                    {{messageDetail.sender.nickname}}</p>
                <p v-if="messageDetail && messageDetail.sender && messageDetail.sender.user_id == user_id">
                    {{messageDetail.recipient.nickname}}</p>
                <!--<p>{{messageDetail && messageDetail.work && messageDetail.work.task_title}}</p>-->
                <p v-if="messageDetail && messageDetail.type === 2">
                    {{messageDetail.job.type_label.name}}</p>
                <p v-if="messageDetail && messageDetail.type === 1">
                    <span v-text="handleWork(messageDetail.job.job_label_id)"></span>
                    -
                    {{messageDetail.job.salary_min/1000}}-{{messageDetail.job.salary_max/1000}}k
                </p>
                <!-- <p>
                    <span v-if="messageDetail && messageDetail.work && messageDetail.work.address">{{messageDetail && messageDetail.work && messageDetail.work.address}}</span>
                </p>-->
            </div>
            <div class="salary">
                <!--<p>{{messageDetail && messageDetail.work && messageDetail.work.payment_money}}{{messageDetail && messageDetail.work && messageDetail.work.unit}}/单</p>-->
                <p><img src="../../assets/img/icon_return.png" alt=""></p>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../libs/http'

    export default {
        name: 'message_header',
        props: {messageDetail: {type: Object, default: null}},
        data(){
            return{
                work_label: null,
                user_id:null
            }
        },
        mounted() {
            this.user_id = sessionStorage.getItem('userID');
            this.apiGet('/labels?id=967').then((res) => {
                this.work_label = res
            });
            console.log(this.messageDetail)
        },
        methods:{
            //id对应的工作岗位/任务
            handleWork(id) {
                let label_name = '';
                if (this.work_label) {
                    let length = this.work_label.length;
                    for (let i = 0; i < length; i++) {
                        if (this.work_label[i].label_id === id) {
                            label_name = this.work_label[i].name;
                            return label_name
                        }
                    }
                }
            },
        },
        mixins: [http],

    }
</script>

<style scoped>

</style>