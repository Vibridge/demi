<template>
    <div>
        <div class="work_resume_info">
            <div style="align-self: center;display: flex">
                <div class="info_avatar">
                    <img :src="item.user.avatar" alt="">
                    <img src="../../assets/img/toxiang@2x.png" alt=""
                         v-if="!item.user.avatar">
                    <img v-if="item.real && item.real.sex === 1" class="sex"
                         src="../../assets/img/boy.png" alt="">
                    <img v-if="item.real && item.real.sex === 2" class="sex"
                         src="../../assets/img/girl.png" alt="">
                </div>
                <div class="info_name">
                    <p>{{item.user.nickname}}</p>
                    <div style="display: flex">
                        <p>{{item.salary_min/1000}}-{{item.salary_max/1000}}k</p>
                        <p>
                            <span v-if="item.vita.education === 1">初中及以下/</span>
                            <span v-if="item.vita.education === 2">中专/中技/</span>
                            <span v-if="item.vita.education === 3">高中/</span>
                            <span v-if="item.vita.education === 4">大专/</span>
                            <span v-if="item.vita.education === 5">本科/</span>
                            <span v-if="item.vita.education === 6">硕士/</span>
                            <span v-if="item.vita.education === 7">博士/</span>
                            <span v-if="(new Date().getFullYear()-item.vita.work_start_date.split('-')[0]) > 0">{{new Date().getFullYear()-item.vita.work_start_date.split('-')[0]}}年/</span>
                            <span v-if="(new Date().getFullYear()-item.vita.work_start_date.split('-')[0]) <= 0">低于1年/</span>
                            <span v-if="item.real && item.real.birthday">{{new Date().getFullYear()-item.real.birthday.split('-')[0]}}岁/</span>
                            <span v-if="item.vita.work_status === 1">应届生</span>
                            <span v-if="item.vita.work_status === 2">离职-随时到岗</span>
                            <span v-if="item.vita.work_status === 3">在职-月内到岗</span>
                            <span v-if="item.vita.work_status === 4">在职-考虑机会</span>
                            <span v-if="item.vita.work_status === 5">在职-暂不考虑</span>
                        </p>
                    </div>

                </div>
            </div>
            <div class="info_cop">
                <button style="display: none"></button>
                <!--<button @mouseover="show_collect = item.index"
                        @mouseleave="show_collect = null"
                        @click="handleCollect(item.user_job_id)"
                >
                    <img src="../../assets/img/enshrine_hover.png" alt=""
                         v-if="show_collect === item.index">
                    <img src="../../assets/img/enshrine.png" alt=""
                         v-if="show_collect === null">
                    <img src="../../assets/img/have_already_collected@2x.png" alt=""
                         v-if="collect">
                    <span>收藏</span>
                </button>-->
                <button v-on:click.stop="handleMsg(item.user_id,item.job_label_id)">和他聊聊</button>
            </div>
        </div>
        <p class="export">求职意向：{{item.work.name}}<span v-if="item.city"> - {{item.city.city_name}}</span>
        </p>
        <div class="another">
            <div class="work_exc">
                <div class="work_exc_info" v-show="item.experiences.length < 1">
                    <span><img src="../../assets/img/experience@2x.png" alt=""></span>
                    <span>该用户没有填写工作经历</span>
                </div>
                <div class="work_exc_info" v-show="item.experiences.length > 0">
                    <span><img src="../../assets/img/experience@2x.png" alt=""></span>
                    <span v-if="item.experiences.length > 0 && item.experiences[0].company">{{item.experiences[0].company.company_name}}</span>
                    <span v-if="item.experiences.length > 0">{{item.experiences[0].workname}}</span>
                </div>
                <p class="time" v-if="item.experiences.length > 0">
                    {{item.experiences[0].start_date}}-<span
                        v-if="item.experiences[0].start_end">item.experiences[0].start_end</span>
                    <span v-if="!item.experiences[0].start_end">至今</span>
                </p>
            </div>
            <div class="edc" v-show="item.diploma">
                <div class="edc_info">
                    <span><img src="../../assets/img/edc.png" alt=""></span>
                    <span v-if="item.diploma && item.diploma.school">{{item.diploma.school.school_name}}</span>
                    <span v-if="item.diploma && item.diploma.major">{{item.diploma.major}}</span>
                </div>
                <!--<p class="time">2018.06-2019.09</p>-->
                <p class="time">&nbsp;</p>
            </div>
        </div>
        <div class="line"></div>
    </div>

</template>

<script>
    export default {
        name: 'work_resume_list',
        props: {
            item: {type: Object, default:{}}
        },
        data() {
            return {
                //鼠标更改收藏按钮样式
                show_collect: null,
                collect: false,
            }
        },
        methods: {
            //聊天
            handleMsg(id,key){
                let data = {};
                data.recipient = id;
                data.foreign_key = key;
                data.type = 1;
                this.$router.push({
                    name: "IM",
                    params:{id :JSON.stringify(data)}
                });
            }
        }
    }
</script>

<style scoped>

</style>