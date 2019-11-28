<template>
    <div class="work_resume">
        <!--//搜索筛选-->
        <div class="work_resume_header">
            <div class="search">
                <el-autocomplete
                        class="inline-input"
                        value-key="name"
                        v-model="search"
                        :fetch-suggestions="querySearch"
                        placeholder="搜索职位名称"
                        @select="handleSelect"
                        @focus="handleLabel"
                >
                    <el-button slot="append" @click="HandleSelectMatching()">搜索</el-button>
                </el-autocomplete>
            </div>
            <div class="search_label">
                <div class="hot_label">
                    <p>热门职位:</p>
                    <span v-for="hw in hot_work" :key="hw.work_label_id"
                          @click="HandleSelectMatching(hw.work_label_id)">{{hw.name}}</span>
                </div>
            </div>
        </div>

        <!--//城市筛选-->
        <div class="work_resume_select">
            <div class="select_city">
                <p>选择城市:</p>
                <span v-for="city in hot_city" :key="city.city_id" :class="select_city === city.city_id ? 'active' : ''"
                      @click="HandleSelectCity(city.city_id)">{{city.city_name}}</span>
                <span @click="handelAllCity()">
                    <el-popover
                            placement="left-start"
                            width="500"
                            trigger="click"
                            v-model="show_select_city"
                    >
                        <div class="city_list" v-loading="loading">
                            <div class="level_l_wrap">
                                <div v-for="first in city_tree" :key="first.city_id"
                                     @click="handleSecondCity(first.city_id,first.children)"
                                     :class="city_active === first.city_id ? 'level_1_city active_city' : 'level_1_city'"
                                >
                                    <p>{{first.city_name}}</p>
                                </div>
                            </div>

                            <ul class="level_2_wrap">
                                <li class="level_2_city" v-for="second in city_children" :key="second.city_id"
                                    :class="second_city_active === second.city_id ? 'level_2_city active_city' : 'level_2_city'"
                                    @click="HandleSelectCity(second.city_id,second.city_name)"
                                >
                                    {{second.city_name}}
                                </li>
                            </ul>
                        </div>
                        <div slot="reference" class="label_wrap">
                            <span style="color: #24BFFF;line-height: 14px">{{now_city}}</span>
                        </div>
                    </el-popover>
                </span>
            </div>
            <div class="select_city">
                <p>最低学历:</p>
                <span v-for="edc in edu" :key="edc.education"
                      :class="select_education === edc.education ? 'active' : ''"
                      @click="HandleSelectEdc(edc.education)">{{edc.label_name}}</span>
            </div>
            <div class="select_city">
                <p>工作经验:</p>
                <span v-for="(exp,index) in experience" :key="index"
                      :class="select_experience === index ? 'active' : ''"
                      @click="HandleSelectExp(index,exp.experience_min,exp.experience_max)">{{exp.label_name}}</span>
            </div>
            <div class="select_city">
                <p>薪资要求:</p>
                <span v-for="(sal,index) in salary" :key="index" :class="select_salary === index ? 'active' : ''"
                      @click="HandleSelectSal(index,sal.salary_min,sal.salary_max)">{{sal.label_name}}</span>
            </div>
        </div>

        <div class="work_resume_main">
            <div class="work_resume_nav">
                <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeToggle">
                    <!--//人才推荐-->
                    <el-tab-pane label="人才推荐" name="first">
                        <div class="work_resume_list">
                            <ul class="infinite-list" v-infinite-scroll="load">
                                <li class="work_resume_wrap" v-for="(item,index) in work_resume" :key="index"
                                    @click="handleDetail(index)">
                                    <list :item="item"></list>
                                </li>
                                <li v-if="work_resume.length < 1" class="work_resume_none">
                                    <img src="../../assets/img/snail@2x.png" alt="">
                                    <p class="none_note">牛人正在赶来</p>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>

                    <!--&lt;!&ndash;//最新发布&ndash;&gt;
                    <el-tab-pane label="最新发布" name="second">
                        <div class="work_resume_list">
                            &lt;!&ndash;<ul class="infinite-list" v-infinite-scroll="load">
                                <li class="work_resume_wrap" v-for="(item,index) in work_resume" :key="item.index">
                                    <div class="work_resume_info">
                                        <div style="align-self: center;display: flex">
                                            <div class="info_avatar">
                                                <img :src="item.user.avatar" alt="">
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
                                                        <span>{{new Date().getFullYear()-item.vita.work_start_date.split('-')[0]}}年/</span>
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
                                            <button @mouseover="show_collect = item.index"
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
                                            </button>
                                            <button>和他聊聊</button>
                                        </div>
                                    </div>
                                    <p class="export">求职意向：{{item.work.name}}<span v-if="item.city"> - {{item.city.city_name}}</span>
                                    </p>
                                    <div class="another">
                                        <div class="work_exc">
                                            <div class="work_exc_info" v-show="item.experiences.length < 1">
                                                <span><img src="../../assets/img/experience@2x.png" alt=""></span>
                                                <span>应届生</span>
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
                                            <p class="time">2018.06-2019.09</p>
                                        </div>
                                    </div>
                                    <div class="line"></div>
                                </li>
                            </ul>&ndash;&gt;
                            aa
                        </div>
                    </el-tab-pane>-->

                    <!--//与我匹配-->
                    <el-tab-pane name="third">
                        <div slot="label">
                            <el-popover
                                    width="538"
                                    trigger="click"
                                    popper-class="matching_wrap"
                                    placement="bottom"
                                    v-model="show_matching"
                            >
                                <div class="matching">
                                    <p class="title" v-if="matching_work.length > 0">我发布的职位</p>
                                    <div class="matching_list" v-for="work in matching_work" :key="work.work_id"
                                         @click="HandleSelectMatching(true,work.work_label_id)">
                                        <div class="matching_work">
                                            <p>{{work.work_name}}</p>
                                            <p>{{work.salary_min/1000}}-{{work.salary_max/1000}}k</p>
                                        </div>
                                        <p class="matching_label">
                                            <span>{{work.work_experience_min}}-{{work.work_experience_max}}年</span>
                                            <span v-if="work.education === 0 || !work.education">不限</span>
                                            <span v-if="work.education === 1">初中及以下</span>
                                            <span v-if="work.education === 2">中专/中技</span>
                                            <span v-if="work.education === 3">高中</span>
                                            <span v-if="work.education === 4">大专</span>
                                            <span v-if="work.education === 5">本科</span>
                                            <span v-if="work.education === 6">硕士</span>
                                            <span v-if="work.education === 7">博士</span>
                                            <span v-if="work.city && work.city.name_relation.length > 1">{{work.city.name_relation[1]}}</span>
                                            <span v-if="work.city && work.city.name_relation.length === 1">{{work.city.name_relation[0]}}</span>
                                        </p>
                                    </div>
                                    <div class="matching_none" v-if="matching_work.length < 1">
                                        <img src="../../assets/img/snail@2x.png" alt="">
                                        <p class="none_note">您还没有发布任何岗位</p>
                                    </div>
                                </div>
                                <p slot="reference">与我匹配</p>
                            </el-popover>
                        </div>
                        <div class="work_resume_list">
                            <ul class="infinite-list" v-infinite-scroll="load">
                                <li class="work_resume_wrap" v-for="(item,index) in work_resume" :key="index"
                                    @click="handleDetail(index)">
                                    <list :item="item"></list>
                                </li>
                                <li v-if="work_resume.length < 1" class="work_resume_none">
                                    <img src="../../assets/img/snail@2x.png" alt="">
                                    <p class="none_note">牛人正在赶来</p>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>

        <div>
            <template>
                <el-dialog
                        :visible.sync="dialogVisible"
                        width="1000px"
                        :show-close=false
                        custom-class="show_detail"
                        :destroy-on-close=true
                        v-if="dialogVisible"
                >
                    <div class="show_detail_header">
                        <div class="user_info">
                            <div class="user_info_avatar">
                                <div>
                                    <img v-if="detail_info && !detail_info.user.avatar" src="../../assets/img/toxiang@2x.png"
                                         alt="">
                                    <img v-if="detail_info && detail_info.user.avatar" :src="detail_info.user.avatar" alt="">
                                </div>
                                <div style="align-self: flex-end">
                                    <img v-if="detail_info && detail_info.real && detail_info.real.sex === 1" class="sex"
                                         src="../../assets/img/boy.png" alt="">
                                    <img v-if="detail_info && detail_info.real && detail_info.real.sex === 2" class="sex"
                                         src="../../assets/img/girl.png" alt="">
                                </div>
                            </div>
                            <div class="user_info_name">
                                <p v-if="detail_info">{{detail_info.user.nickname}}</p>
                                <p v-if="detail_info">
                                    <span v-if="detail_info.vita.education === 1">初中及以下</span>
                                    <span v-if="detail_info.vita.education === 2">中专/中技</span>
                                    <span v-if="detail_info.vita.education === 3">高中</span>
                                    <span v-if="detail_info.vita.education === 4">大专</span>
                                    <span v-if="detail_info.vita.education === 5">本科</span>
                                    <span v-if="detail_info.vita.education === 6">硕士</span>
                                    <span v-if="detail_info.vita.education === 7">博士</span>
                                    <span v-if="detail_info.real && detail_info.real.birthday">{{new Date().getFullYear()-detail_info.real.birthday.split('-')[0]}}岁</span>
                                    <span v-if="detail_info && parseInt(detail_info.work_year.split('年')[0]) > 0">{{detail_info.work_year}}</span>
                                    <span v-if="detail_info && parseInt(detail_info.work_year.split('年')[0]) <= 0">低于1年</span>
                                    <!--<span>{{detail_info.work_year}}</span>-->
                                </p>
                            </div>
                        </div>
                        <div class="cop">
                            <p>发布于2019</p>
                            <div>
                                <button @mouseover="show_collect = true"
                                        @mouseleave="show_collect = false"
                                        @click="handleCollect(detail_info)"
                                >
                                    <img src="../../assets/img/enshrine_hover.png" alt=""
                                         v-if="show_collect && detail_info && !detail_info.favorites">
                                    <img src="../../assets/img/enshrine.png" alt=""
                                         v-if="!show_collect && detail_info && !detail_info.favorites">
                                    <img style="width: 17px" src="../../assets/img/have_already_collected@2x.png" alt=""
                                         v-if="detail_info && detail_info.favorites">
                                    <span>收藏</span>
                                </button>
                                <button @click="handleMsg(detail_info.user_id,detail_info.job_label_id)">和他聊聊</button>
                            </div>
                        </div>
                    </div>
                    <div class="work_exp">
                        <div>
                            <p>期望职位：<span>{{detail_info && detail_info.work.name}}<span style="margin-left: 0"
                                                                                        v-if="detail_info && detail_info.city">- {{detail_info.city.city_name}}</span></span>
                            </p>
                            <p>求助意向：<span>{{detail_info && detail_info.vita.status}}</span></p>
                        </div>
                        <div>
                            <p>开始工作：<span>{{detail_info && detail_info.vita.work_start_date}}</span></p>
                            <p>薪资要求：<span>{{detail_info && detail_info.salary_min/1000}}-{{detail_info && detail_info.salary_max/1000}}k</span>
                            </p>
                        </div>
                    </div>
                    <div class="another_label">
                        <p class="label_title">视频简历</p>
                        <div class="label_content">
                            <video v-if="detail_info && detail_info.video && detail_info.video.status === 2" :src="detail_info.video.file_path" controls></video>
                            <img v-if="(detail_info && !detail_info.video) || (detail_info && detail_info.video && detail_info.video.status !== 2)" src="../../assets/img/snail@2x.png" alt="">
                        </div>
                    </div>
                    <div class="another_label">
                        <p class="label_title">工作经验</p>
                        <div class="label_content" v-if="detail_info && detail_info.experiences.length > 0">
                            <div class="timeline" v-for="timeline in detail_info.experiences" :key="timeline.experience_id">
                                <div class="work_time">
                                    <p v-if="timeline.end_date">{{timeline.end_date}}</p>
                                    <p v-if="!timeline.end_date">至今</p>
                                    <p>{{timeline.start_date}}</p>
                                </div>
                                <div class="time-line">
                                    <img src="../../assets/img/stamp@2x.png" alt="">
                                    <div class="line"></div>
                                </div>
                                <div class="label_detail">
                                    <p>{{timeline.company.company_name}}</p>
                                    <p>{{timeline.work.name}}</p>
                                    <p>
                                        {{timeline.description}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="label_content" v-if="detail_info && detail_info.experiences.length < 1">
                            <p>该用户没有填写工作经验</p>
                        </div>
                    </div>
                    <div class="another_label">
                        <p class="label_title">联系方式</p>
                        <div class="label_content">
                            <div class="info">
                                <div>
                                    <img src="../../assets/img/phone@2x.png" alt="">
                                    <span v-if="isVip">{{detail_info && detail_info.user.phone}}</span>
                                    <span v-if="!isVip && detail_info">{{this.vipShow(detail_info.user.phone,3,4)}}</span>
                                </div>
                                <div>
                                    <img src="../../assets/img/postbox@2x.png" alt="" style="width: 16px">
                                    <span v-if="isVip">{{detail_info && detail_info.user.email}}</span>
                                    <span v-if="!isVip && detail_info">{{this.vipShow(detail_info.user.email,3,3)}}</span>
                                </div>
                            </div>
                            <div class="vip" v-if="!isVip" @click="handleOpenVip">开通<img src="../../assets/img/vip_detail@2x.png">查看完整联系方式</div>
                        </div>
                    </div>
                    <div class="another_label">
                        <p class="label_title">自我描述</p>
                        <div class="label_content">
                            <div class="dec">
                                {{detail_info && detail_info.vita.description}}
                            </div>
                        </div>
                    </div>
                    <div class="another_label">
                        <p class="label_title">教育经历</p>
                        <div class="label_content" v-if="detail_info && detail_info.education.length > 0">
                            <div class="timeline" v-for="edc in detail_info.education" :key="edc.education_id">
                                <div class="work_time">
                                    <p>{{edc.e_date}}</p>
                                    <p>{{edc.s_date}}</p>
                                </div>
                                <div class="time-line">
                                    <img src="../../assets/img/stamp@2x.png" alt="">
                                    <div class="line"></div>
                                </div>
                                <div class="label_detail" v-if="edc.school">
                                    <p>{{edc.school.school_name}} -
                                        <span v-if="edc.education === 1">初中及以下</span>
                                        <span v-if="edc.education === 2">中专/中技</span>
                                        <span v-if="edc.education === 3">高中</span>
                                        <span v-if="edc.education === 4">大专</span>
                                        <span v-if="edc.education === 5">本科</span>
                                        <span v-if="edc.education === 6">硕士</span>
                                        <span v-if="edc.education === 7">博士</span>
                                        <span> / {{edc.major}}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="label_content" v-if="detail_info && detail_info.education.length < 1">
                            <p>该用户没有填写教育经历</p>
                        </div>
                    </div>
                    <div class="another_label">
                        <p class="label_title">图片作品</p>
                        <div class="label_content" v-if="detail_info && sumImg(detail_info.files) > 0">
                            <div class="pic">
                                <div class="demo-image__preview">
                                    <el-image
                                            v-for="pic in detail_info.files"
                                            :key="pic.file_id"
                                            :src="pic.file_path"
                                            :preview-src-list="handleBigImg(detail_info.files)"
                                            v-if="pic.type === 2"
                                    >
                                    </el-image>
                                </div>
                            </div>
                        </div>
                        <div class="label_content" v-if="detail_info && sumImg(detail_info.files) < 1">
                            <img src="../../assets/img/snail@2x.png" alt="">
                        </div>
                    </div>
                    <div class="go_left" @click="goBack">
                        <img src="../../assets/img/left@2x.png" alt="">
                    </div>
                    <div class="go_right" @click="goNext">
                        <img src="../../assets/img/right@2x.png" alt="">
                    </div>
                </el-dialog>
            </template>
        </div>
    </div>
</template>

<script>
    import http from '../../libs/http'
    import {forEach} from "../../libs/tools";
    import time from "../../libs/time";
    import timestamp from "../../libs/time";
    import list from "./work_resume_list"
    export default {
        name: 'index',
        components:{list},
        data() {
            return {
                //公司id
                company_id: null,

                //是否vip
                isVip: false,

                //岗位搜索
                search: '',

                //岗位数据
                work_list: [],

                //城市数据
                city_tree: null,
                city_children: [],
                city_active: null,
                second_city_active: null,
                show_select_city: false,
                now_city: '全部城市',
                loading:true,

                //鼠标更改收藏按钮样式
                show_collect: null,

                //热门城市
                hot_city: [
                    {
                        "city_name": '不限',
                        "city_id": 0
                    }
                ],

                //热门岗位
                hot_work: [
                    {
                        "work_label_id": 4,
                        "name": "java"
                    },
                    {
                        "work_label_id": 3,
                        "name": "PHP"
                    },
                    {
                        "work_label_id": 70,
                        "name": "数据分析"
                    },
                    {
                        "work_label_id": 28,
                        "name": "web前端"
                    },
                    {
                        "work_label_id": 144,
                        "name": "产品经理"
                    },
                    {
                        "work_label_id": 35,
                        "name": "ios"
                    },
                    {
                        "work_label_id": 34,
                        "name": "Android"
                    },
                    {
                        "work_label_id": 166,
                        "name": "UI设计师"
                    },
                ],

                //form选择
                edu: [
                    {
                        education: 0,
                        label_name: '不限'
                    },
                    {
                        education: 1,
                        label_name: '初中及以下'
                    },
                    {
                        education: 2,
                        label_name: '中专/中技'
                    },
                    {
                        education: 3,
                        label_name: '高中'
                    },
                    {
                        education: 4,
                        label_name: '大专'
                    },
                    {
                        education: 5,
                        label_name: '本科'
                    },
                    {
                        education: 6,
                        label_name: '硕士'
                    },
                    {
                        education: 7,
                        label_name: '博士'
                    },
                ],
                experience: [
                    {
                        experience_min: 0,
                        experience_max: 100,
                        label_name: '不限'
                    },
                    {
                        experience_min: 0,
                        experience_max: 1,
                        label_name: '1年以内'
                    },
                    {
                        experience_min: 1,
                        experience_max: 3,
                        label_name: '1-3年'
                    },
                    {
                        experience_min: 3,
                        experience_max: 5,
                        label_name: '3-5年'
                    },
                    {
                        experience_min: 5,
                        experience_max: 8,
                        label_name: '5-8年'
                    },
                    {
                        experience_min: 8,
                        experience_max: 10,
                        label_name: '8-10年'
                    },
                    {
                        experience_min: 10,
                        experience_max: 100,
                        label_name: '10年以上'
                    },
                ],
                salary: [
                    {
                        salary_min: 0,
                        salary_max: 1000000000,
                        label_name: '不限'
                    },
                    {
                        salary_min: 0,
                        salary_max: 3000,
                        label_name: '3k以内'
                    },
                    {
                        salary_min: 3000,
                        salary_max: 5000,
                        label_name: '3-5k'
                    },
                    {
                        salary_min: 5000,
                        salary_max: 8000,
                        label_name: '5-8k'
                    },
                    {
                        salary_min: 8000,
                        salary_max: 12000,
                        label_name: '8-12k'
                    },
                    {
                        salary_min: 12000,
                        salary_max: 20000,
                        label_name: '12-20k'
                    },
                    {
                        salary_min: 20000,
                        salary_max: 50000,
                        label_name: '20-50k'
                    },
                    {
                        salary_min: 50000,
                        salary_max: 1000000000,
                        label_name: '50k以上'
                    },
                ],

                //导航初始
                activeName: 'first',

                //人才数据
                work_resume: [],

                //分页
                page: 1,
                last_page: null,

                //筛选
                select_city: 0,
                select_education: 0,
                select_experience: 0,
                select_salary: 0,
                select_job_label_id: 0,

                //与我匹配
                matching_work: [],
                show_matching: false,

                //详情
                dialogVisible: false,
                detail_info: null,
                index: null,

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.handleCity();
                this.initialize(this.page);
                this.apiGet('/api/user/info').then((res) => {
                    console.log(res);
                    if (res.type === 2) {
                        this.company_id = res.company_real.company_id;
                        var start = time.Time(res.vip_start, 'Y-M-D');
                        var end_time = parseInt(start.split('-')[0]) + 1 + '-' + start.split('-')[1] + '-' + start.split('-')[2];
                        if (timestamp.Stamp(end_time) < new Date().getTime() / 1000) {
                            this.isVip = false
                        } else {
                            this.isVip = true
                        }
                    }else {
                        this.$message({
                            showClose: true,
                            message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                            duration: 1000
                        });
                        this.$router.push({
                            name: "login"
                        });
                    }
                });
            });
        },
        methods: {
            //滚动效果
            load() {
                var min = null, max = null;
                if (this.select_experience !== null) {
                    min = this.experience[this.select_experience].experience_min;
                    max = this.experience[this.select_experience].experience_max;
                }
                var Sal_min = null, Sal_max = null;
                if (this.select_experience !== null) {
                    Sal_min = this.salary[this.select_salary].salary_min;
                    Sal_max = this.salary[this.select_salary].salary_max;
                }
                if (this.page < this.last_page) {
                    this.page = this.page + 1;
                    setTimeout(
                        this.initialize(this.page, this.select_city, this.select_education, min, max, Sal_min, Sal_max, this.select_job_label_id)
                    ,1000)
                }
            },

            //城市数据
            handleCity() {
                this.apiGet('/city/lists').then((res) => {
                    this.$store.commit('loading', true);
                    console.log(res)
                    forEach(res, item => {
                        if (item.municipalities !== 0) {
                            let muniCity = [{
                                "city_name": item.city_name,
                                "city_id": item.city_id
                            }];
                            item.children = muniCity
                        }
                        if (item.is_hot === 1) {
                            this.hot_city.push(item)
                        }
                        // forEach(item.children, item1 => {
                        //     if (item1.children) {
                        //         delete item1.children
                        //     }
                        // });
                    });
                    this.$store.commit('loading', false);
                })

            },

            //城市筛选
            handelAllCity() {
                this.show_select_city = true;
                this.apiGet('/city/lists?mode=tree').then((res) => {
                    forEach(res, item => {
                        if (item.municipalities !== 0) {
                            let muniCity = [{
                                "city_name": item.city_name,
                                "city_id": item.city_id,
                                "is_hot": 1
                            }];
                            item.children = muniCity
                        }
                        forEach(item.children, item1 => {
                            if (item1.children) {
                                delete item1.children
                            }
                        });

                        /*if(item.city_id === 1){
                            this.city_children = item.children;
                        }*/
                    });
                    this.city_tree = res;
                    this.loading = false
                })
            },
            handleSecondCity(id, item) {
                this.city_active = id;
                this.city_children = item
            },

            //岗位数据
            handleLabel() {

                this.apiGet('/labels?id=967').then((res) => {
                    forEach(res, item => {
                        if (item.level === 2) {
                            this.work_list.push(item)
                        }
                    });
                });

            },

            //搜索框
            querySearch(queryString, cb) {
                var restaurants = this.work_list;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            //搜索框选择岗位
            handleSelect(item) {
                this.select_job_label_id = item.label_id;
            },

            //导航切换
            handleClick(tab, event) {
                var min = null, max = null;
                if (this.select_experience !== null) {
                    min = this.experience[this.select_experience].experience_min;
                    max = this.experience[this.select_experience].experience_max;
                }
                var Sal_min = null, Sal_max = null;
                if (this.select_experience !== null) {
                    Sal_min = this.salary[this.select_salary].salary_min;
                    Sal_max = this.salary[this.select_salary].salary_max;
                }
                if (tab.name === 'first') {
                    this.work_resume = [];
                    this.select_job_label_id = 0;
                    this.initialize(1, this.select_city, this.select_education, min, max, Sal_min, Sal_max, this.select_job_label_id);
                }
                if (tab.name === 'third') {
                    this.show_matching = true;
                    this.apiGet('/api/work/paginate?company_id=' + this.company_id).then((res) => {
                        this.matching_work = res.data;
                    });
                }
            },

            beforeToggle(){
                console.log('aaa')
                if(this.show_matching){
                    return false
                }else{
                    return true
                }
            },

            //人才数据列表
            initialize(page, city_id, edc, Exp_min, Exp_max, Sal_min, Sal_max, work_label_id) {
                if (city_id || edc || Exp_min || Exp_max || Sal_min || Sal_max || work_label_id) {
                    this.apiGet('/api/vita/paginate?page=' + page + '&education=' + edc + '&city_id=' + city_id + '&work_year_s=' + Exp_min + '&work_year_e=' + Exp_max + '&salary_min=' + Sal_min + '&salary_max=' + Sal_max + '&job_label_id=' + work_label_id).then((res) => {
                        this.last_page = res.last_page;
                        forEach(res.data, item => {
                            this.work_resume.push(item)
                        });
                        console.log(res.data)
                    });
                } else {
                    this.apiGet('/api/vita/paginate?page=' + page).then((res) => {
                        this.last_page = res.last_page;
                        forEach(res.data, item => {
                            this.work_resume.push(item)
                        });
                        console.log(res.data)

                    })
                }
            },

            //收藏简历
            handleCollect(item) {
                var data = {
                    id: item.user_job_id
                };
                if (!this.detail_info.favorites) {
                    this.apiPost('/api/user/favorite', data).then((res) => {
                        console.log(res);
                        if(res){
                            this.handleDetail(this.index)
                        }
                    })
                }else{
                    this.apiDelete('/api/user/favorite/delete/' + item.favorites.favorite_id).then((res)=>{
                        console.log(res);
                        if(res){
                            this.handleDetail(this.index)
                        }
                    })
                }
            },

            //通过城市筛选
            HandleSelectCity(id,name) {
                if(name){
                    this.now_city = name;
                    this.show_select_city = false
                }
                var min = null, max = null;
                if (this.select_experience !== null) {
                    min = this.experience[this.select_experience].experience_min;
                    max = this.experience[this.select_experience].experience_max;
                }
                var Sal_min = null, Sal_max = null;
                if (this.select_experience !== null) {
                    Sal_min = this.salary[this.select_salary].salary_min;
                    Sal_max = this.salary[this.select_salary].salary_max;
                }
                this.select_city = id;
                this.page = 1;
                this.work_resume = [];
                this.initialize(this.page, this.select_city, this.select_education, min, max, Sal_min, Sal_max, this.select_job_label_id);
            },

            //通过学历筛选
            HandleSelectEdc(edc) {
                var min = null, max = null;
                if (this.select_experience !== null) {
                    min = this.experience[this.select_experience].experience_min;
                    max = this.experience[this.select_experience].experience_max;
                }
                var Sal_min = null, Sal_max = null;
                if (this.select_experience !== null) {
                    Sal_min = this.salary[this.select_salary].salary_min;
                    Sal_max = this.salary[this.select_salary].salary_max;
                }
                this.select_education = edc;
                this.page = 1;
                this.work_resume = [];
                this.initialize(this.page, this.select_city, edc, min, max, Sal_min, Sal_max, this.select_job_label_id);
            },

            //通过工作经验筛选
            HandleSelectExp(index, min, max) {
                var Sal_min = null, Sal_max = null;
                if (this.select_experience !== null) {
                    Sal_min = this.salary[this.select_salary].salary_min;
                    Sal_max = this.salary[this.select_salary].salary_max;
                }
                this.select_experience = index;
                this.page = 1;
                this.work_resume = [];
                this.initialize(this.page, this.select_city, this.select_education, min, max, Sal_min, Sal_max, this.select_job_label_id);
            },

            //通过工资筛选
            HandleSelectSal(index, min, max) {
                var Exp_min = null, Exp_max = null;
                if (this.select_experience !== null) {
                    Exp_min = this.experience[this.select_experience].experience_min;
                    Exp_max = this.experience[this.select_experience].experience_max;
                }
                this.select_salary = index;
                this.page = 1;
                this.work_resume = [];
                this.initialize(this.page, this.select_city, this.select_education, Exp_min, Exp_max, min, max, this.select_job_label_id);

            },

            //与我匹配筛选
            HandleSelectMatching(id) {
                console.log(id);
                // var work_label_id = id;
                /*if (this.select_job_label_id !== 0 && this.select_job_label_id !== null) {
                    work_label_id = this.select_job_label_id;
                }*/
                this.show_matching = false;
                this.page = 1;
                this.work_resume = [];
                var min = null, max = null;
                if (this.select_experience !== null) {
                    min = this.experience[this.select_experience].experience_min;
                    max = this.experience[this.select_experience].experience_max;
                }
                var Sal_min = null, Sal_max = null;
                if (this.select_experience !== null) {
                    Sal_min = this.salary[this.select_salary].salary_min;
                    Sal_max = this.salary[this.select_salary].salary_max;
                }
                this.select_job_label_id = id;
                this.initialize(this.page, this.select_city, this.select_education, min, max, Sal_min, Sal_max, this.select_job_label_id);
            },


            //图片数量
            sumImg(array){
                if(array){
                    let data = [];
                    forEach(array,item=>{
                        if(item.type === 2 && item.status === 2){
                            data.push(item.file_path);
                        }
                    })
                    return data.length;
                }else{
                    return 0
                }

            },

            //图片作品放大
            handleBigImg(array){
                if(array){
                    let data = [];
                    forEach(array,item=>{
                        if(item.type === 2 && item.status === 2){
                            data.push(item.file_path);
                        }
                    })
                    return data;
                }else{
                    return []
                }

            },

            //简历详情
            handleDetail(index) {
                this.index = index;
                this.dialogVisible = true;
                this.apiGet("/api/job/info/" + this.work_resume[this.index].user_job_id).then((res) => {
                    console.log(res)
                    this.detail_info = res;
                })
            },

            //聊天
            handleMsg(id, key) {
                let data = {};
                data.recipient = id;
                data.foreign_key = key;
                data.type = 1;
                this.$router.push({
                    name: "IM",
                    params: {id: JSON.stringify(data)}
                });
            },

            //手机、邮箱显示
            vipShow (str,frontLen,endLen) {
                var len = str.length-frontLen-endLen;
                var xing = '';
                for (var i=0;i<len;i++) {
                    xing+='*';
                }
                return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
            },

            //开通vip
            handleOpenVip(){
                this.$router.push({
                    name: "VIP",
                });
            },

            //返回上一个
            goBack() {
                if (0 <= this.index < this.work_resume.length) {
                    this.index = this.index - 1;
                    this.dialogVisible = true;
                    this.apiGet("/api/job/info/" + this.work_resume[this.index].user_job_id).then((res) => {
                        console.log(res)
                        this.detail_info = res;
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '这是第一条了'
                    });
                }
            },

            //下一个
            goNext() {
                if (0 <= this.index < this.work_resume.length) {
                    this.index = this.index + 1;
                    this.dialogVisible = true;
                    this.apiGet("/api/job/info/" + this.work_resume[this.index].user_job_id).then((res) => {
                        console.log(res)
                        this.detail_info = res;
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '没有下一条了'
                    });
                }
            },
        },
        mixins: [http]

    }
</script>

<style lang="less" type="text/less">
    .city_list {
        display: flex;
        font-size: 14px;
        flex-direction: column;
        overflow-y: hidden;
        min-height: 50px;

        .level_l_wrap::-webkit-scrollbar {
            height: 5px;
        }

        .level_l_wrap::-webkit-scrollbar-thumb {
            background: #c1c1c1;
        }

        .level_l_wrap {
            display: flex;
            overflow-x: auto;

            .level_1_city {
                cursor: pointer;
                margin-bottom: 12px;

                p {
                    width: 50px;
                    padding: 4px 10px;
                    text-align: center;
                }
            }

            .level_1_city:hover {
                border-radius: 14px;
                background: #F7F8FA;
            }
        }

        .level_2_wrap {
            width: 500px;
            margin-top: 12px;

            .level_2_city {
                display: inline-block;
                padding: 4px 10px;
                margin-bottom: 10px;
                cursor: pointer;
            }

            .level_2_city:hover {
                border-radius: 14px;
                background: #F7F8FA;
            }
        }

        .active_city {
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(36, 191, 255, 1);
            color: rgba(36, 191, 255, 1);
            border-radius: 14px;
        }

    }
    .work_resume {
        font-family: MicrosoftYaHei;
        width: 100%;
        text-align: left;
        background: #FFFFFF;

        .work_resume_header {
            width: 100%;
            height: 140px;
            background: rgba(50, 55, 62, 1);
            padding: 30px 0 32px 0;
            box-sizing: border-box;

            .search {
                width: 932px;
                margin: 0 auto;

                .el-input {
                    width: 932px;
                    margin-bottom: 16px;

                    .el-input__inner {
                        border-radius: 25px 0 0 25px;
                        padding: 0 25px;
                    }

                    .el-input-group__append {
                        text-align: center;
                        width: 140px;
                        background: rgba(59, 199, 255, 1);
                        border-radius: 0px 25px 25px 0px;
                        font-size: 16px;
                        color: rgba(255, 255, 255, 1);
                        padding: 0;
                        border: none;
                    }
                }
            }

            .search_label {
                width: 932px;
                margin: 0 auto;
                color: white;

                .hot_label {
                    margin-left: 30px;
                    font-size: 14px;

                    p {
                        font-size: 14px;
                        color: rgba(173, 174, 179, 1);
                        display: inline-block;
                        margin-right: 15px;
                    }

                    span {
                        font-size: 14px;
                        color: rgba(36, 191, 255, 1);
                        opacity: 0.8;
                        margin-right: 22px;
                        cursor: pointer;
                    }
                }
            }
        }

        .work_resume_select {
            width: 1000px;
            margin: 32px auto;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(230, 230, 230, 1);
            padding: 30px;
            box-sizing: border-box;
            /*.select_city:nth-child(1){
                margin-bottom: 14px;
            }*/
            .select_city {
                margin-bottom: 28px;
                display: flex;
                p {
                    align-self: center;
                    font-size: 14px;
                    color: rgba(153, 153, 153, 1);
                    display: inline-block;
                    margin-right: 20px;
                }

                span {
                    align-self: center;
                    font-size: 14px;
                    color: rgba(77, 77, 77, 1);
                    margin-right: 20px;
                    cursor: pointer;
                    display: inline-block;
                }

            }

            .select_city:nth-last-child(1) {
                margin-bottom: 0;
            }
        }

        .work_resume_main {
            width: 1000px;
            margin: 0 auto;
            padding-bottom: 74px;

            .work_resume_nav {
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(230, 230, 230, 1);

                .el-tabs__header {
                    padding: 21px 15px;
                    background: rgba(250, 250, 250, 1);
                    margin: 0;

                    .el-tabs__nav-wrap {
                        .el-tabs__active-bar {
                            display: none;
                        }

                        .el-tabs__item {
                            padding: 0 15px;
                            height: auto;
                            line-height: unset;
                        }
                    }

                    .el-tabs__nav-wrap::after {
                        height: 0;
                    }
                }

                .work_resume_list {
                    height: 998px;
                    overflow-y: hidden;

                    .infinite-list {
                        height: 998px;
                        overflow-y: scroll;
                        position: relative;
                    }

                    .infinite-list::-webkit-scrollbar {
                        width: 2px;
                    }

                    .work_resume_wrap {
                        padding: 29px 29px 0 29px;

                        .work_resume_info {
                            display: flex;
                            justify-content: space-between;

                            .info_avatar {
                                width: 56px;
                                height: 56px;
                                margin-right: 19px;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }

                                .sex {
                                    width: 16px;
                                    height: 16px;
                                    transform: translate3d(0, -100%, 0)
                                }
                            }

                            .info_name {
                                align-self: center;

                                p:nth-child(1) {
                                    font-size: 16px;
                                    color: rgba(77, 77, 77, 1);
                                    margin-bottom: 12px;
                                }

                                div {
                                    text-align: center;

                                    p {
                                        font-size: 13px;
                                        line-height: 23px;
                                        border-radius: 4px;
                                    }

                                    p:nth-child(1) {
                                        padding: 2px 6px;
                                        background: rgba(255, 78, 77, 1);
                                        color: rgba(255, 255, 255, 1);
                                        margin-right: 6px;
                                        margin-bottom: 0;
                                    }

                                    p:nth-last-child(1) {
                                        box-sizing: border-box;
                                        background: rgba(255, 255, 255, 1);
                                        border: 1px solid rgba(36, 191, 255, 1);
                                        color: #24BFFF;
                                        letter-spacing: 1px;
                                        padding: 0 13px;
                                    }
                                }

                            }

                            .info_cop {
                                align-self: flex-end;

                                button {
                                    width: 112px;
                                    line-height: 32px;
                                    border-radius: 4px;
                                    font-size: 14px;
                                }

                                button:nth-child(1) {
                                    background: rgba(255, 255, 255, 1);
                                    border: 1px solid rgba(230, 230, 230, 1);
                                    color: rgba(153, 153, 153, 1);
                                    margin-right: 6px;

                                    img {
                                        width: 13px;
                                        height: 13px;
                                        margin-right: 11px;
                                        vertical-align: text-top;
                                        margin-top: 1px;
                                    }
                                }

                                button:nth-child(2) {
                                    background: rgba(36, 191, 255, 1);
                                    border-radius: 3px;
                                    color: rgba(255, 255, 255, 1);
                                    border: 0;
                                }
                            }
                        }

                        .export {
                            margin: 14px 0 17px 75px;
                            font-size: 14px;
                            color: rgba(128, 128, 128, 1);
                        }

                        .another {
                            display: flex;
                            justify-content: space-between;

                            .work_exc {
                                width: 50%;
                                align-self: center;

                                .work_exc_info {
                                    margin-left: 75px;
                                    margin-bottom: 10px;

                                    span {
                                        margin-right: 10px;
                                        font-size: 14px;

                                        img {
                                            width: 13px;
                                            vertical-align: bottom;
                                        }
                                    }

                                    span:nth-child(2) {
                                        color: #4D4D4D;
                                        margin-right: 15px;
                                    }

                                    span:nth-child(3) {
                                        color: #24BFFF
                                    }
                                }

                                .time {
                                    margin-left: 98px;
                                    color: #B3B3B3;
                                }
                            }

                            .edc {
                                width: 50%;
                                align-self: center;

                                .edc_info {
                                    text-align: left;
                                    margin-left: 110px;
                                    margin-bottom: 10px;

                                    span {
                                        margin-right: 10px;
                                        font-size: 14px;

                                        img {
                                            width: 13px;
                                            vertical-align: bottom;
                                        }
                                    }

                                    span:nth-child(2) {
                                        color: #4D4D4D;
                                        margin-right: 15px;
                                    }

                                    span:nth-child(3) {
                                        color: #24BFFF
                                    }
                                }

                                .time {
                                    text-align: left;
                                    margin-left: 133px;
                                    color: #B3B3B3;
                                }
                            }
                        }

                        .line {
                            padding-top: 29px;
                            width: 100%;
                            border-bottom: 1px dashed rgba(240, 241, 242, 1);
                        }
                    }

                    .work_resume_none {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0);

                        .none_note {
                            text-align: center;
                            margin-top: 30px;
                            font-size: 14px;
                            color: rgba(77, 77, 77, 1);
                        }
                    }

                    .work_resume_wrap:hover {
                        background: rgba(250, 250, 250, 1);
                    }
                }


            }

            .el-tabs__item.is-active {
                color: #24BFFF;
            }
        }
    }

    .show_detail {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        position: relative;
        margin-top: 7vh !important;

        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding: 0;

            .show_detail_header {
                display: flex;
                justify-content: space-between;
                padding: 57px 80px 77px;
                background: rgba(247, 248, 250, 1);
                box-sizing: border-box;

                .user_info {
                    align-self: center;
                    display: flex;

                    .user_info_avatar {
                        display: flex;
                        width: 86px;
                        height: 86px;

                        img {
                            width: 86px;
                            height: 86px;
                            border-radius: 50%;
                        }

                        .sex {
                            width: 16px;
                            height: 16px;
                            transform: translateX(-100%);
                        }
                    }

                    .user_info_name {
                        margin-left: 38px;
                        align-self: center;

                        p:nth-child(1) {
                            font-size: 22px;
                            color: rgba(51, 51, 51, 1);
                            margin-bottom: 17px;
                            line-height: 22px;
                        }

                        p:nth-child(2) {
                            font-size: 14px;
                            color: rgba(51, 51, 51, 1);

                            span {
                                padding: 0 14px;
                                border-right: 1px solid #E0E0E0;
                            }

                            span:nth-child(1) {
                                padding-left: 0;
                            }

                            span:nth-last-child(1) {
                                border-right: none;
                            }
                        }
                    }
                }

                .cop {
                    text-align: right;
                    align-self: flex-end;

                    p {
                        font-size: 13px;
                        color: rgba(179, 179, 179, 1);
                        margin-bottom: 21px;
                    }

                    button {
                        width: 112px;
                        line-height: 32px;
                        border-radius: 4px;
                        font-size: 14px;
                    }

                    button:nth-child(1) {
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(230, 230, 230, 1);
                        color: rgba(153, 153, 153, 1);
                        margin-right: 6px;

                        img {
                            width: 13px;
                            height: 13px;
                            margin-right: 11px;
                            vertical-align: text-top;
                            margin-top: 1px;
                        }
                    }

                    button:nth-child(2) {
                        background: rgba(36, 191, 255, 1);
                        border-radius: 3px;
                        color: rgba(255, 255, 255, 1);
                        border: 0;
                    }
                }
            }

            .work_exp {
                width: 714px;
                height: 132px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0 0 12px 0 rgba(48, 74, 126, 0.12);
                border-radius: 4px;
                margin: 0 auto 30px;
                transform: translateY(-39px);
                display: flex;
                justify-content: space-between;

                div {
                    width: 50%;
                    align-self: center;

                    p {
                        width: 80%;
                        margin: 0 auto 22px;
                        font-size: 13px;
                        color: rgba(153, 153, 153, 1);

                        span {
                            margin-left: 15px;
                            color: rgba(77, 77, 77, 1);
                        }
                    }

                    p:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                }
            }

            .another_label {
                padding: 0 80px 49px;

                .label_title {
                    font-size: 16px;
                    color: rgba(50, 51, 51, 1);
                    margin-bottom: 28px;
                }

                .label_content {
                    text-align: center;
                    margin: 0 auto;

                    video {
                        max-width: 510px;
                    }

                    .timeline {
                        display: flex;
                        justify-content: flex-start;
                        margin: 0 63px;

                        .work_time {
                            font-size: 12px;
                            width: 82px;
                            height: 22px;
                            line-height: 22px;
                            margin-right: 10px;

                            p:nth-child(1) {
                                background: rgba(128, 128, 128, 1);
                                border-radius: 2px;
                                color: rgba(255, 255, 255, 1);
                                margin-bottom: 6px;
                            }

                            p:nth-child(2) {
                                color: rgba(153, 153, 153, 1);
                                text-align: right;
                            }
                        }

                        .time-line {
                            img {
                                width: 9px;
                                height: 9px;
                            }

                            .line {
                                width: 1px;
                                height: 100%;
                                background: rgba(240, 240, 240, 1);
                                margin: 0 auto;
                            }
                        }

                        .label_detail {
                            text-align: left;
                            width: 597px;
                            margin-left: 10px;

                            p:nth-child(1) {
                                color: rgba(50, 51, 51, 1);
                                margin-bottom: 14px;
                                font-size: 14px;

                                span {
                                    color: rgba(152, 152, 152, 1);
                                }
                            }

                            p:nth-child(2) {
                                width: 76px;
                                height: 24px;
                                background: rgba(36, 191, 255, 1);
                                border-radius: 3px;
                                line-height: 24px;
                                text-align: center;
                                font-size: 12px;
                                color: rgba(255, 255, 255, 1);
                                margin-bottom: 15px;
                                padding: 0 14px;
                            }

                            p:nth-child(3) {
                                font-size: 14px;
                                color: rgba(86, 86, 87, 1);
                                line-height: 31px;
                            }
                        }
                    }

                    .info {
                        display: flex;
                        justify-content: space-between;

                        div {
                            width: 50%;

                            img {
                                width: 15px;
                                height: 15px;
                                margin-right: 14px;
                                vertical-align: middle;
                            }

                            span {
                                font-size: 14px;
                                color: rgba(76, 76, 77, 1);
                                vertical-align: text-bottom;
                            }
                        }
                    }

                    .vip {
                        font-size: 13px;
                        color: rgba(255, 176, 66, 1);
                        text-align: right;
                        margin-top: 30px;
                        margin-right: 60px;
                        cursor: pointer;

                        img {
                            width: 27px;
                            vertical-align: text-bottom;
                        }

                    }

                    .dec {
                        text-align: left;
                        margin: 0 63px;
                        font-size: 14px;
                        color: rgba(86, 86, 87, 1);
                        line-height: 31px;
                    }

                    .pic {
                        width: 713px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(230, 230, 230, 1);
                        border-radius: 10px;
                        padding: 23px 19px 23px 23px;
                        box-sizing: border-box;
                        margin: 0 auto;

                        .demo-image__preview {
                            width: 100%;
                            height: 100%;
                            text-align: left;

                            .el-image__inner {
                                width: 130px;
                                height: 130px;
                                display: inline-block;
                                margin: 0 4px 4px 0;
                            }

                        }

                    }
                }
            }

            .go_left {
                position: fixed;
                top: 50%;
                left: calc(50% - 520px);
                transform: translate3d(0, -50%, 0);

                img {
                    width: 20px;
                }
            }

            .go_right {
                position: fixed;
                top: 50%;
                right: calc(50% - 500px);;
                transform: translate3d(20%, -50%, 0);
                img {
                    width: 20px;
                }
            }
        }
    }

    .matching_wrap {
        left: 15% !important;
        border: 1px solid rgba(240, 240, 240, 1);
        padding: 0;

        .matching {
            padding: 22px 20px 20px 20px;

            .title {
                font-size: 16px;
                color: rgba(179, 179, 179, 1);
                margin-bottom: 20px;
                line-height: 16px;
                margin-left: 9px;
            }

            .matching_list {
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(235, 235, 235, 1);
                border-radius: 4px;
                margin-bottom: 14px;
                padding: 20px 26px;

                .matching_work {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5px;

                    p {
                        font-size: 14px;
                        color: rgba(36, 191, 255, 1);
                    }

                    p:nth-child(2) {
                        border-radius: 12px;
                        font-size: 12px;
                        padding: 0 16px;
                        border: 1px solid rgba(235, 235, 235, 1);
                        height: 24px;
                        line-height: 24px;
                    }
                }

                .matching_label {
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);

                    span {
                        padding: 0 13px;
                        border-right: 1px solid rgba(235, 235, 235, 1);
                    }

                    span:nth-child(1) {
                        padding-left: 0;
                    }

                    span:nth-last-child(1) {
                        border-right: none;
                    }
                }
            }

            .matching_list:hover {
                background: rgba(250, 251, 252, 1);
            }

            .matching_none {
                text-align: center;
                padding: 50px;

                p {
                    margin-top: 20px;
                }
            }
        }

        .popper__arrow {
            left: 223px !important;
        }
    }

    .active {
        color: #24BFFF !important;
    }

</style>
