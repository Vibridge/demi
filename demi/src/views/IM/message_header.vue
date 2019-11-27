<template>
    <div class="title">
        <div v-if="messageDetail && messageDetail.dominator">
            系统消息
        </div>
        <div class="title_wrap" v-if="messageDetail && messageDetail.type === 1">
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
        </div>
        <div class="title_wrap" v-if="messageDetail && messageDetail.type === 2">
            <div class="label">
                <p>{{messageDetail.work.task_title}}</p>
                <p>
                    <span v-if="messageDetail.work.address">{{messageDetail.work.address}}</span>
                </p>
            </div>
            <div class="salary">
                <p>{{messageDetail.work.payment_money}}{{messageDetail.work.unit}}/单</p>
                <p><img src="../../assets/img/icon_return.png" alt=""></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'message_header',
        props: {messageDetail: {type: Object, default: null}},
        mounted() {
            console.log(this.messageDetail)
        }
    }
</script>

<style scoped>

</style>