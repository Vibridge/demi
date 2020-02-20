<template>
    <div class="profile-user">
        <avatars :src="currentConversation.userProfile.avatar"/>
        <div class="nick-name text-ellipsis">
            <span v-if="card == 'a'"
                  :title=currentConversation.userProfile.nick>
                {{ currentConversation.userProfile.nick || currentConversation.userProfile.userID}}
            </span>

            <span v-if="(currentConversation.type === TIM.TYPES.CONV_C2C) && detail && (detail.recipient && detail.recipient.user_id == user_id) && (user_info.type === 1)">
                  {{detail.sender.nickname}}</span>

            <span v-if="(currentConversation.type === TIM.TYPES.CONV_C2C) && detail && (detail.sender && detail.sender.user_id == user_id) && (user_info.type === 1)">
                  {{detail.recipient.nickname}}</span>

            <span v-if="card == 'b'" style="color: #333333;font-size: 16px;margin-bottom: 7px">
                {{user_info.company && user_info.company.company_name}}<br>
                <span style="font-size: 10px;margin-bottom: 20px;color: #999999">{{user_info.company && user_info.company.company_position}}</span>
            </span>

        </div>
        <div class="person" v-if="card === 'a'">
            <div class="space"></div>
            <div class="nick-basic">
                <div class="title_label">个人信息</div>
                <div class="main">
                    <div class="info" v-if="user_info.birthday || user_info.email">
                        <p>出生日期</p>
                        <p>邮箱</p>
                    </div>
                    <div class="info">
                        <span v-if="user_info.birthday || user_info.email">
                            <span v-if="user_info.birthday">{{user_info.birthday}}</span>
                            <span v-else>暂无更多信息</span>
                            <span v-if="user_info.email">{{user_info.email}}</span>
                            <span v-else>暂无更多信息</span>
                        </span>
                        <span v-else>
                            <span>暂无更多信息</span>
                        </span>

                    </div>
                </div>
            </div>
            <div class="space"></div>
            <div class="work">
                <div class="title_label nav">
                    <p :class="select == 'resume'? 'resume active' : 'resume'" @click="select = 'resume'">全职简历</p>
                    <p :class="select == 'ability' ? 'ability active' : 'ability'" @click="select = 'ability'">兼职简历</p>
                </div>
                <div class="resume" v-if="select == 'resume'">
                    <div v-if="resume.length > 0">
                        <p>{{resume[0].work.name}}</p>
                        <div>
                            <p>期望要求：<span>{{resume[0].salary_min}} - {{resume[0].salary_max}}k</span></p>
                            <p>期望城市：<span v-if="resume[0].city">{{resume[0].city.city_name}}</span>
                                <span v-if="!resume[0].city">不限</span></p>
                        </div>
                    </div>
                    <div v-else style="margin-top: 30px;color: #333">
                        暂无简历
                    </div>
                </div>
                <div class="ability" v-if="select == 'ability'">
                    <div v-if="ability.length > 0">
                        <p>{{ability[0].type_label.name}}</p>
                        <div>
                            <p>期望行业：<span v-for="ind in ability[0].industry">{{ind.name}}&nbsp;</span></p>
                            <p>期望城市：<span v-if="ability[0].city">{{ability[0].city.city_name}}</span>
                                <span v-if="!ability[0].city">不限</span></p>
                        </div>
                    </div>

                    <div v-else style="margin-top: 30px;color: #333">
                        暂无简历
                    </div>
                </div>
            </div>
            <div class="space" v-if="resume && resume[0] && resume[0].diploma && resume[0].diploma.school"></div>
            <div class="edc" v-if="resume && resume[0] && resume[0].diploma && resume[0].diploma.school">
                <div class="title_label">教育经历</div>
                <p class="school_name">{{resume[0].diploma.school.school_name}}</p>
                <div class="major">
                    <p>专业</p>
                    <span>{{resume[0].diploma.major}}</span>
                </div>
                <div class="level">
                    <p>学历</p>
                    <span v-if="resume[0].diploma.education === 1">初中</span>
                    <span v-if="resume[0].diploma.education === 2">中专/中技</span>
                    <span v-if="resume[0].diploma.education === 3">高中</span>
                    <span v-if="resume[0].diploma.education === 4">大专</span>
                    <span v-if="resume[0].diploma.education === 5">本科</span>
                    <span v-if="resume[0].diploma.education === 6">硕士</span>
                    <span v-if="resume[0].diploma.education === 7">博士</span>
                </div>
            </div>
            <div class="space" v-if="resume && resume[0] && resume[0].vita"></div>
            <div class="self" v-if="resume && resume[0] && resume[0].vita">
                <div class="title_label">自我评价</div>
                <p style="line-height:19px;">{{resume[0].vita.description}}</p>
            </div>
        </div>
        <!--<div class="company" v-if="card === 'b'">
            <div class="company_nav">
                <div @click="select2='work'" class="company_nav_work"
                     :style="select2 == 'work' ? 'color:#333333;font-size:16px' : ''">
                    招聘职位
                </div>
                <div @click="select2='task'" class="company_nav_task"
                     :style="select2 == 'task' ? 'color:#333333;font-size:16px' : ''">
                    兼职任务
                </div>
            </div>
            <div class="company_nav_work_list" v-if="select2 == 'work'">
                <div v-if="work.length > 0">

                </div>
                <div v-else class="none">
                    暂未发布岗位
                </div>
            </div>
            <div class="company_nav_task_list" v-if="select2 == 'task'">
                <div v-if="task.length > 0">

                </div>
                <div v-else class="none">
                    暂未发布任务
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import http from '../../../../libs/http'

    export default {
        data() {
            return {
                user_id: null,
                profileID: null,
                user_info: {
                    birthday: '',
                    email: '',
                    type: 0,
                    company: {}
                },
                resume: [],
                ability: [],
                work: [],
                task: [],
                select: 'resume',
                select2: 'work',
                card: 'a'
            }
        },
        mounted() {
            this.user_id = sessionStorage.getItem('userID');
        },
        computed: {
            ...mapState({
                detail: state => state.conversation.detail,
                currentConversation(state) {
                    this.initialize(state)
                    return state.conversation.currentConversation
                }
            }),
        },
        methods: {
            initialize(state) {
                if (state) {
                    this.card = state.conversation.currentConversation.userProfile.userID.replace(/[^a-z]+/ig, "")
                    this.profileID = state.conversation.currentConversation.userProfile.userID.split(/[a-z]/)[0]
                    this.apiGet('/api/user/info?user_id=' + this.profileID).then((res) => {
                        if (res.card && res.card.birthday) {
                            this.user_info.birthday = res.card.birthday
                        } else {
                            this.user_info.birthday = ''
                        }
                        if (res.email) {
                            this.user_info.email = res.email;
                        } else {
                            this.user_info.email = ''
                        }
                        this.user_info.type = res.type;
                        this.user_info.company = res.company_real;

                        if (this.card === 'a' && res.job_count > 0) {
                            this.apiGet('/api/vita/paginate?user_id=' + res.user_id).then((result) => {
                                this.resume = result.data
                            })
                        } else if (res.job_count < 1) {
                            this.resume = []
                        }

                        if (this.card === 'a' && res.ability_count > 0) {
                            this.apiGet('/api/ability/paginate?user_id=' + res.user_id).then((result) => {
                                this.ability = result.data
                            })
                        } else if (res.ability_count < 1) {
                            this.ability = []
                        }

                        if (this.card === 'b') {
                            this.apiGet('/api/work/paginate?company_id=' + res.company_id).then((result) => {

                                if (result.data.length > 0) {
                                    this.work = result.data
                                } else {
                                    this.work = []
                                }
                            });
                            this.apiGet('/api/task/paginate?user_id=' + res.user_id).then((result) => {
                                if (result.data.length > 0) {
                                    this.task = result.data
                                } else {
                                    this.task = []
                                }
                            })
                        }
                    })
                }
            }
        },
        watch: {
            profileID() {
                this.initialize()
            }
        },
        mixins: [http]
    }
</script>


<style lang="stylus" scoped>
    .profile-user
        width 100%
        text-align center

        .avatar
            width 160px
            height 160px
            border-radius 50%
            margin 20px auto

        .nick-name
            width 100%
            color $base
            font-size 20px
            font-weight bold
            text-shadow $font-dark 0 0 0.1em
            margin-bottom 20px

            .anonymous
                color $first
                text-shadow none

        .person
            .space
                width: 100%
                height: 8px
                background: rgba(245, 245, 246, 1)

            .nick-basic, .work, .edc, .self
                padding 20px
                text-align left

                .title_label
                    padding-bottom 10px
                    margin-bottom 10px
                    font-size: 16px;
                    color: rgba(51, 51, 51, 1);
                    border-bottom 1px solid #E6E6E6

                .school_name
                    font-size 18px
                    margin-bottom 8px

                .major, .level
                    display flex
                    justify-content space-between

                    p
                        color #999999
                        margin-bottom 8px

                    span
                        color #333333

                .level
                    p
                        margin-bottom 0px

            .nick-basic
                .main
                    font-size: 14px;
                    display flex
                    justify-content space-between

                    .info
                        align-self center

                        p
                            color: rgba(153, 153, 153, 1);
                            margin 10px 0

                        span
                            margin 10px 0
                            color: rgba(51, 51, 51, 1);
                            display block

            .work
                .nav
                    display flex
                    color: rgba(153, 153, 153, 1);

                    .active
                        color: rgba(51, 51, 51, 1);

                    .resume
                        margin-right 34px

                .resume, .ability
                    color #999;

                    p
                        margin-bottom 9px


        .company
            .company_nav
                display flex
                justify-content center

                .company_nav_work, .company_nav_task
                    color #999999
                    font-size: 14px;
                    padding 7px 12px 8px 12px
                    border-radius: 4px 4px 0 0;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-bottom none
                    background: #fff;

                .company_nav_work
                    margin-right 9px

            .company_nav_work_list, .company_nav_task_list
                margin-top -1px
                border-top 1px solid rgba(204, 204, 204, 1)

                .none
                    margin-top 30px

</style>
