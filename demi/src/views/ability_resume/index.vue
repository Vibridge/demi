<template>
    <div class="ability_resume">
        <div class="ability_resume_header">
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
        </div>
        <div class="select_label">
            <div class="now_city" @click="handelSelectCity()">
                <el-popover
                        placement="left-start"
                        width="500"
                        trigger="click"
                        v-model="show_select_city"
                >
                    <div class="city_list">
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
                                @click="handleSelectCity(second.city_id,second.city_name)"
                            >
                                {{second.city_name}}
                            </li>
                        </ul>


                    </div>
                    <div slot="reference" class="label_wrap">
                        <img src="../../assets/img/Location@2x.png" alt="">
                        <span>{{now_city}}</span>
                        <span>[切换城市]</span>
                    </div>
                </el-popover>
            </div>
            <div class="select_detail">
                <div class="label_wrap" @click="handleRecommend(1)">
                    <div>
                        <img v-if="active !== 1" src="../../assets/img/_recommend @2x.png" alt="">
                        <img v-if="active === 1" src="../../assets/img/_recommend_in@2x.png" alt="">
                    </div>
                    <span :class="active === 1 ? 'active_select' : ''">推荐人才</span>
                </div>
                <el-popover
                        width="438"
                        trigger="manual"
                        popper-class="matching_task_wrap"
                        placement="bottom"
                        v-model="show_matching"
                >
                    <div class="matching_task">
                        <p class="title" v-if="matching_task">我发布的职位</p>
                        <div class="matching_task_list" v-for="task in matching_task" :key="task.task_id"
                             @click="HandleSelectMatching(task.type_label.label_id)">
                            <div class="matching_task_info">
                                <p>{{task.task_title}}</p>
                                <p>{{task.payment_money}}{{task.unit}}/单</p>
                            </div>
                            <p class="matching_label">
                                <span v-if="task.city">{{task.city.city_name}}</span>
                                <span v-if="!task.city">不限城市</span>
                            </p>
                        </div>
                        <div class="matching_task_none" v-if="!matching_task">
                            <img src="../../assets/img/snail@2x.png" alt="">
                            <p class="none_note">您还没有发布任何岗位</p>
                        </div>
                    </div>
                    <div class="label_wrap" slot="reference" @click="handleMatching(2)">
                        <div>
                            <img v-if="active !== 2" src="../../assets/img/mapping@2x.png" alt="">
                            <img v-if="active === 2" src="../../assets/img/mapping_in@2x.png" alt="">
                        </div>
                        <span :class="active === 2 ? 'active_select' : ''">与我匹配</span>
                    </div>
                </el-popover>

                <el-popover
                        width="548"
                        trigger="manual"
                        popper-class="select_work_wrap"
                        placement="bottom"
                        v-model="show_select_work"
                >
                    <div class="select_work">
                        <p class="title">任务职位</p>
                        <div class="select_wrap" v-for="work in work_label" :key="work.label_id">
                            <div class="select_left">
                                {{work.name}}
                            </div>
                            <div class="select_right">
                                <span v-for="child in work.children" :key="child.label_id"
                                      @click="HandleSelectMatching(child.label_id)">{{child.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="label_wrap" slot="reference" @click="handleSelectWork(3)">
                        <div>
                            <img v-if="active !== 3" src="../../assets/img/screen@2x.png" alt="">
                            <img v-if="active === 3" src="../../assets/img/screen_in@2x.png" alt="">
                        </div>
                        <span :class="active === 3 ? 'active_select' : ''">职位筛选</span>
                    </div>
                </el-popover>

            </div>
        </div>
        <ul class="infinite-list" v-infinite-scroll="load">
            <li class="ability_resume_detail" v-for="(item,index) in ability_resume" :key="index"
                @click="handleDetail(index)">
                <p class="title">{{item.type_label.name}}</p>
                <div class="ability_resume_wrap">
                    <div class="ability_resume_info">
                        <div style="display: flex">
                            <div class="avatar">
                                <img v-if="item.user.avatar" :src="item.user.avatar" alt="">
                                <img v-if="!item.user.avatar" src="../../assets/img/toxiang@2x.png" alt="">
                            </div>
                            <div class="name">
                                <div class="level_info">
                                    <span v-if="item.user.nickname">{{item.user.nickname}}</span>
                                    <span v-if="!item.user.nickname">{{item.user.user_id}}</span>
                                    <div class="level levle_1"
                                         v-if="item.user.reputation > 0 && item.user.reputation < 251">
                                        <div v-if="4 <= item.user.reputation && item.user.reputation <= 10">
                                            <img src="../../assets/img/x.png" alt="">
                                        </div>
                                        <div v-if="11 <= item.user.reputation && item.user.reputation <= 40">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                        </div>
                                        <div v-if="41 <= item.user.reputation && item.user.reputation <= 90">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                        </div>
                                        <div v-if="91 <= item.user.reputation && item.user.reputation <= 150">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                        </div>
                                        <div v-if="151 <= item.user.reputation && item.user.reputation <= 250">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                            <img src="../../assets/img/x.png" alt="">
                                        </div>
                                    </div>
                                    <div class="level levle_2"
                                         v-if="item.user.reputation >= 251 && item.user.reputation < 10001">
                                        <div v-if="251 <= item.user.reputation && item.user.reputation <= 500">
                                            <img src="../../assets/img/z.png" alt="">
                                        </div>
                                        <div v-if="501 <= item.user.reputation && item.user.reputation <= 1000">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                        </div>
                                        <div v-if="1001 <= item.user.reputation && item.user.reputation <= 2000">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                        </div>
                                        <div v-if="2001 <= item.user.reputation && item.user.reputation <= 5000">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                        </div>
                                        <div v-if="5001 <= item.user.reputation && item.user.reputation <= 10000">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                            <img src="../../assets/img/z.png" alt="">
                                        </div>
                                    </div>
                                    <div class="level levle_3"
                                         v-if="item.user.reputation >= 10001 && item.user.reputation < 500001">
                                        <div v-if="10001 <= item.user.reputation && item.user.reputation <= 20000">
                                            <img src="../../assets/img/level3.png" alt="">
                                        </div>
                                        <div v-if="20001 <= item.user.reputation && item.user.reputation <= 50000">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                        </div>
                                        <div v-if="50001 <= item.user.reputation && item.user.reputation <= 100000">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                        </div>
                                        <div v-if="100001 <= item.user.reputation && item.user.reputation <= 200000">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                        </div>
                                        <div v-if="200001 <= item.user.reputation && item.user.reputation <= 500000">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                            <img src="../../assets/img/level3.png" alt="">
                                        </div>
                                    </div>
                                    <div class="level levle_4" v-if="item.user.reputation >= 500001">
                                        <div v-if="500001 <= item.user.reputation && item.user.reputation <= 1000000">
                                            <img src="../../assets/img/level4.png" alt="">
                                        </div>
                                        <div v-if="1000001 <= item.user.reputation && item.user.reputation <= 2000000">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                        </div>
                                        <div v-if="2000001 <= item.user.reputation && item.user.reputation <= 5000000">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                        </div>
                                        <div v-if="5000001 <= item.user.reputation && item.user.reputation <= 10000000">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                        </div>
                                        <div v-if="item.user.reputation > 10000000">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                            <img src="../../assets/img/level4.png" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="city">
                                    <p v-if="item.city">{{item.city.city_name}}</p>
                                    <p v-if="!item.city">不限城市</p>
                                    <p>理想行业：<span v-for="(label,label_index) in item.industry" :key="label_index">{{label.name}} <span
                                            class="last_label">/ </span></span></p>
                                </div>
                            </div>
                        </div>
                        <button>和他聊聊</button>
                    </div>
                    <p class="des">
                        {{item.description}}
                    </p>
                </div>
            </li>
            <li v-if="ability_resume.length < 1" class="work_resume_none">
                <img src="../../assets/img/snail@2x.png" alt="">
                <p class="none_note">牛人正在赶来</p>
            </li>
        </ul>

        <el-dialog
                :visible.sync="dialogVisible"
                width="1000px"
                :show-close=false
                custom-class="show_ability_detail"
        >
            <div :class="searchBarFixed === true ? 'isFixed show_ability_wrap' :'show_ability_wrap'">
                <div class="show_detail_header">
                    <div class="user_info">
                        <div class="user_info_avatar">
                            <div>
                                <img v-if="detail_info && !detail_info.user.avatar"
                                     src="../../assets/img/toxiang@2x.png" alt="">
                                <img v-if="detail_info && detail_info.user.avatar" :src="detail_info.user.avatar"
                                     alt="">
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
                            <p v-if="detail_info">适合行业：
                                <span v-for="ind in detail_info.industry" :key="ind.label_id">{{ind.name}}<span>/</span></span>
                            </p>
                            <p>
                            <span>
                                {{detail_info && detail_info.type_label.name}}
                            </span>
                                <span v-if="detail_info && detail_info.city">
                                {{detail_info.city.city_name}}
                            </span>
                                <span v-if="detail_info && !detail_info.city">
                                不限城市
                            </span>
                            </p>
                        </div>
                    </div>
                    <div class="cop">
                        <p>发布于：{{detail_info && detail_info.created_at.split(' ')[0]}}</p>
                        <div>
                            <button @mouseover="show_collect = true"
                                    @mouseleave="show_collect = false"
                                    @click="handleCollect(detail_info.ability_id)"
                            >
                                <img src="../../assets/img/enshrine_hover.png" alt=""
                                     v-if="show_collect">
                                <img src="../../assets/img/enshrine.png" alt=""
                                     v-if="!show_collect && detail_info && !detail_info.favorites">
                                <img style="width: 17px" src="../../assets/img/have_already_collected@2x.png" alt=""
                                     v-if="collect || (detail_info && detail_info.favorites)">
                                <span>收藏</span>
                            </button>
                            <button>和他聊聊</button>
                        </div>
                    </div>
                </div>
                <div class="another_label" style="margin-top: 40px">
                    <p class="label_title">视频简历</p>
                    <div class="label_content">
                        <video v-if="detail_info && detail_info.video" :src="detail_info.video.file_path"
                               controls></video>
                        <img v-if="detail_info && !detail_info.video" src="../../assets/img/snail@2x.png" alt="">
                    </div>
                </div>
                <div class="another_label">
                    <p class="label_title">工作描述</p>
                    <div class="label_content" v-if="detail_info && detail_info.description">
                        <p class="dec">{{detail_info.description}}</p>
                    </div>
                </div>
                <div class="another_label">
                    <p class="label_title">联系方式</p>
                    <div class="label_content">
                        <div class="info">
                            <div>
                                <img src="../../assets/img/phone@2x.png" alt="">
                                <span>{{detail_info && detail_info.user.phone}}</span>
                            </div>
                            <div>
                                <img src="../../assets/img/postbox@2x.png" alt="" style="width: 16px">
                                <span>{{detail_info && detail_info.user.email}}</span>
                            </div>
                        </div>
                        <div class="vip" v-if="!isVip">开通<img src="../../assets/img/vip_detail@2x.png">查看完整联系方式</div>
                    </div>
                </div>
                <div class="another_label">
                    <p class="label_title">图片作品</p>
                    <div class="label_content" v-if="detail_info && detail_info.images.length > 0">
                        <div class="pic">
                            <div class="demo-image__preview">
                                <el-image
                                        v-for="pic in detail_info.images"
                                        :src="pic.file_path"
                                        :preview-src-list="detail_info.images"
                                        v-if="pic.status === 2"
                                >
                                </el-image>
                            </div>
                        </div>
                    </div>
                    <div class="label_content" v-if="detail_info && detail_info.images.length < 1">
                        <img src="../../assets/img/snail@2x.png" alt="">
                    </div>
                </div>
                <div class="another_label">
                    <p class="label_title">接单记录</p>
                    <div class="label_content">
                        <ul class="card" v-infinite-scroll="card_load">
                            <li v-if="card_list.length > 0" class="card_wrap" v-for="card in card_list"
                                :key="card.comment_id">
                                <div class="card_company_info">
                                    <div class="card_company_avatar">
                                        <div style="align-self: center">
                                            <img :src="card.company.logo_path" alt="">
                                        </div>
                                        <div class="name">
                                            <p>{{card.company.company_name}}</p>
                                            <p>任务：{{card.task.task_title}}</p>
                                        </div>
                                    </div>
                                    <div class="reputation">{{card.reputation}}.0分</div>
                                </div>
                                <p class="desc">
                                    {{card.description}}
                                </p>
                            </li>
                            <li v-if="card_list.length < 1" class="work_resume_none">
                                <img src="../../assets/img/snail@2x.png" alt="">
                                <p style="margin-top: 20px">已经到底了哦~</p>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
            <div class="go_left" @click="goBack">
                <img src="../../assets/img/left@2x.png" alt="">
            </div>
            <div class="go_right" @click="goNext">
                <img src="../../assets/img/right@2x.png" alt="">
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import http from '../../libs/http'
    import {getType} from '../../libs/http'
    import {forEach} from "../../libs/tools";
    import {handleMap} from '../../libs/Amap'
    import time from "../../libs/time";
    import timestamp from "../../libs/time";

    export default {
        name: 'index',
        data() {
            return {
                user_id: null,
                isVip: false,

                //岗位数据
                work_list: [],

                //岗位搜索
                search: '',

                //当前城市
                now_city: '',

                //筛选
                select_city: null,
                select_type_label_id: 0,

                //人才数据
                ability_resume: [],

                //分页
                page: 1,
                last_page: null,

                //点击筛选的样式
                active: 1,

                //与我匹配
                matching_task: null,
                show_matching: false,

                //职位筛选
                show_select_work: false,
                work_label: null,

                //详情
                dialogVisible: false,
                detail_info: null,
                index: null,

                //鼠标更改收藏按钮样式
                show_collect: null,
                collect: false,

                //评论
                card_page: 1,
                card_last_page: null,
                card_list: [],

                //城市
                city_tree: [],
                city_children: [],
                city_active:null,
                second_city_active:null,
                show_select_city:false,

                //详情固定
                searchBarFixed:false,
            }
        },
        mounted() {
            this.$nextTick(() => {
                handleMap();
                this.showCityInfo();
                this.apiGet('/api/user/info').then((res) => {
                    if (res.type === 2) {
                        this.user_id = res.user_id;
                        var start = time.Time(res.vip_start, 'Y-M-D');
                        var end_time = parseInt(start.split('-')[0]) + 1 + '-' + start.split('-')[1] + '-' + start.split('-')[2];
                        if (timestamp.Stamp(end_time) < new Date().getTime() / 1000) {
                            this.isVip = false
                        } else {
                            this.isVip = true
                        }
                    }
                });
                // document.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {

            //滚动效果
            load() {
                if (this.page < this.last_page) {
                    this.page = this.page + 1;
                    this.initialize(this.page, this.select_city, this.select_type_label_id);
                }
            },

            //获取当前城市
            showCityInfo() {
                //实例化城市查询类
                var citysearch = new AMap.CitySearch();
                //自动获取用户IP，返回当前城市
                citysearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.city && result.bounds) {
                            var cityinfo = result.city;
                            /*document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
                            //地图显示当前城市
                            map.setBounds(citybounds);*/
                            this.now_city = cityinfo;
                            if (cityinfo) {
                                this.apiGet('/city/location?city_name=' + cityinfo).then((res) => {
                                    this.select_city = res.city_id;
                                    this.initialize(this.page, this.select_city, this.select_type_label_id);
                                });
                            }
                        }
                    } else {
                        console.log(result.info);
                    }
                }.bind(this));
            },

            //岗位数据
            handleLabel() {
                this.apiGet('/labels?id=1027&mode=list').then((res) => {
                    forEach(res, item => {
                        if (item.level === 1) {
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
                this.select_type_label_id = item.label_id;
            },

            //兼职人才数据
            initialize(page, city_id, select_type_label_id) {
                if (getType) {
                    if (city_id || select_type_label_id) {
                        this.apiGet('/api/ability/paginate?page=' + page + '&city_id=' + city_id + '&type_label_id=' + select_type_label_id).then((res) => {
                            this.last_page = res.last_page;
                            forEach(res.data, item => {
                                this.ability_resume.push(item)
                            });
                        });
                    } else {
                        this.apiGet('/api/ability/paginate?page=' + page).then((res) => {
                            this.last_page = res.last_page;
                            forEach(res.data, item => {
                                this.ability_resume.push(item)
                            });
                        })
                    }

                }
            },

            //城市筛选
            handelSelectCity() {
                this.show_select_city = true;
                this.apiGet('/city/lists?mode=tree').then((res) => {
                    forEach(res, item => {
                        if (item.municipalities !== 0) {
                            let muniCity = [{
                                "city_name": item.city_name,
                                "city_id": item.city_id
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
                })
            },
            handleSecondCity(id,item) {
                this.city_active = id;
                this.city_children = item
            },
            handleSelectCity(id,name){
                this.ability_resume = [];
                this.page = 1;
                this.now_city = name;
                this.select_city = id;
                this.show_select_city = false;
                this.initialize(this.page,id,this.select_type_label_id)
            },

            //推荐
            handleRecommend(active) {
                this.active = active;
                this.show_matching = false;
                this.show_select_work = false;
                this.ability_resume = [];
                this.search = '';
                this.initialize(1);
            },

            //与我匹配
            handleMatching(active) {
                this.active = active;
                if (this.show_matching) {
                    this.show_matching = false
                } else {
                    this.show_matching = true;
                    this.show_select_work = false
                }
                this.apiGet('/api/task/paginate?user_id=' + this.user_id).then((res) => {
                    this.matching_task = res.data;
                });
            },

            //与我匹配筛选
            HandleSelectMatching(id) {
                var work_label_id = id;
                if (this.select_type_label_id !== 0 && this.select_type_label_id !== null) {
                    work_label_id = this.select_type_label_id;
                }
                this.show_matching = false;
                this.show_select_work = false;
                this.page = 1;
                this.select_type_label_id = id;
                this.ability_resume = [];
                this.active = null;
                this.initialize(this.page, this.select_city, work_label_id);
            },

            //职位筛选
            handleSelectWork(active) {
                this.active = active;
                if (this.show_select_work) {
                    this.show_select_work = false
                } else {
                    this.show_select_work = true;
                    this.show_matching = false;
                }
                this.apiGet('/labels?id=1027&mode=tree').then((res) => {
                    this.work_label = res;
                })
            },

            //简历详情
            handleDetail(index) {
                this.index = index;
                this.dialogVisible = true;
                this.apiGet("/api/ability/info/" + this.ability_resume[this.index].ability_id).then((res) => {
                    this.detail_info = res;
                    if (res) {
                        this.handCard(this.card_page)
                    }
                })
            },

            //评论数据
            handCard(page) {
                this.apiGet("/api/task/comment/paginate?user_id=" + this.detail_info.user.user_id + '&page=' + page).then((res) => {
                    this.card_last_page = res.last_page;
                    this.card_list = res.data;
                })
            },

            //评论滚动
            card_load() {
                if (this.card_page < this.card_last_page) {
                    this.card_page = this.card_page + 1;
                    this.handCard(this.card_page);
                }
            },

            //返回上一个
            goBack() {
                if (0 <= this.index < this.ability_resume.length) {
                    this.index = this.index - 1;
                    this.dialogVisible = true;
                    this.apiGet("/api/ability/info/" + this.ability_resume[this.index].ability_id).then((res) => {
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
                if (0 <= this.index < this.ability_resume.length) {
                    this.index = this.index + 1;
                    this.dialogVisible = true;
                    this.apiGet("/api/ability/info/" + this.ability_resume[this.index].ability_id).then((res) => {
                        this.detail_info = res;
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '没有下一条了'
                    });
                }
            },

            /*handleScroll () { //改变元素#searchBar的top值
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                console.log(scrollTop);
                var offsetTop = document.getElementById('fixed').offsetTop;
                if (scrollTop > offsetTop) {
                    this.searchBarFixed = true
                } else {
                    this.searchBarFixed = false
                }
            },
            destroyed () {//离开该页面需要移除这个监听的事件
                window.removeEventListener('scroll', this.handleScroll)
            },*/
        },
        mixins: [http]


    }
</script>

<style lang="less" type="text/less">
    .ability_resume {
        font-family: MicrosoftYaHeiLight;
        background: #f7f8fa;
        width: 100%;

        .ability_resume_header {
            width: 100%;
            height: 120px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.11);
            padding: 35px 0;
            box-sizing: border-box;
            margin-bottom: 28px;

            .search {
                width: 932px;
                margin: 0 auto;

                .el-input {
                    width: 932px;

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
        }

        .select_label {
            width: 1000px;
            margin: 0 auto 28px auto;
            display: flex;
            justify-content: space-between;

            .now_city {
                cursor: pointer;

                .label_wrap {
                    height: 36px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    padding: 0 11px;
                    line-height: 36px;

                    img {
                        width: 12px;
                        margin-right: 5px;
                        vertical-align: text-bottom;
                    }

                    span {
                        margin-right: 10px;
                        font-size: 14px;
                        color: rgba(153, 153, 153, 1);
                    }

                    span:nth-last-child(1) {
                        margin-right: 0;
                    }
                }

                .label_wrap:hover {
                    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
                }
            }

            .select_detail {
                display: flex;

                .label_wrap {
                    height: 36px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    padding: 0 10px 0 13px;
                    line-height: 36px;
                    margin-right: 10px;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;
                    color: rgba(153, 153, 153, 1);
                    cursor: pointer;

                    div {
                        align-self: center;
                        height: 18px;
                        line-height: 18px;

                        img {
                            width: 14px;
                            height: 100%;
                            margin-right: 8px;
                        }
                    }

                    span {
                        align-self: center;
                        margin-right: 10px;
                        font-size: 14px;
                        color: rgba(153, 153, 153, 1);
                    }

                    span:nth-last-child(1) {
                        margin-right: 0;
                    }
                }

                .label_wrap:nth-child(2) {
                    img {
                        width: 15px;
                    }
                }

                .label_wrap:nth-child(3) {
                    margin-right: 0;

                    img {
                        width: 17px;
                    }
                }

                .label_wrap:hover {
                    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
                }
            }

        }

        .ability_resume_detail {
            width: 1000px;
            margin: 0 auto 20px;
            background: rgba(255, 255, 255, 1);
            padding: 17px 30px 26px 28px;
            text-align: left;
            box-sizing: border-box;

            .title {
                font-size: 16px;
                color: rgba(77, 77, 77, 1);
                margin-bottom: 9px;
            }

            .ability_resume_wrap {
                padding-top: 18px;
                border-top: 1px dashed rgba(240, 241, 242, 1);

                .ability_resume_info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;

                    .avatar {
                        margin-right: 17px;

                        img {
                            width: 56px;
                            height: 56px;
                            border-radius: 50%;
                        }
                    }

                    .name {
                        align-self: flex-end;

                        .level_info {
                            margin-bottom: 11px;
                            font-size: 16px;
                            color: rgba(77, 77, 77, 1);

                            .level {
                                display: inline-block;
                                vertical-align: text-bottom;
                                margin-left: 17px;

                                img {
                                    width: 17px;
                                    margin-right: 4px;
                                }
                            }

                            .levle_1 {
                                img {
                                    width: 17px;
                                }
                            }

                            .levle_2 {
                                img {
                                    width: 20px;
                                }
                            }

                            .levle_3, .levle_4 {
                                img {
                                    width: 23px;
                                }
                            }
                        }

                        .city {
                            display: flex;

                            p {
                                height: 23px;
                                line-height: 23px;
                                background: rgba(36, 191, 255, 1);
                                border-radius: 4px;
                                padding: 0 15px;
                                font-size: 13px;
                                color: rgba(255, 255, 255, 1);
                                margin-right: 6px;
                            }

                            p:nth-child(2) {
                                height: 21px;
                                line-height: 21px;
                                background: rgba(255, 255, 255, 1);
                                border: 1px solid rgba(230, 230, 230, 1);
                                color: rgba(153, 153, 153, 1);

                                span:nth-last-child(1) {
                                    .last_label {
                                        display: none;
                                    }
                                }

                            }


                        }
                    }

                    button {
                        align-self: center;
                        width: 112px;
                        height: 32px;
                        background: rgba(36, 191, 255, 1);
                        border: 1px solid rgba(36, 191, 255, 1);
                        border-radius: 16px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 1);
                    }
                }

                .des {
                    margin-left: 73px;
                    font-size: 14px;
                    color: rgba(77, 77, 77, 1);
                    line-height: 28px;
                }
            }
        }

        .ability_resume_detail:hover {
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
        }

        .active_select {
            color: rgba(36, 191, 255, 1) !important;
        }
    }

    .matching_task_wrap {
        border: 1px solid rgba(240, 240, 240, 1);
        padding: 0;
        left: 54% !important;

        .matching_task::-webkit-scrollbar {
            width: 2px;
        }

        .matching_task {
            padding: 32px 20px 18px 20px;
            height: 449px;
            overflow-y: auto;
            box-sizing: border-box;

            .title {
                font-size: 16px;
                color: rgba(179, 179, 179, 1);
                margin-bottom: 22px;
                line-height: 16px;
                margin-left: 22px;
            }

            .matching_task_list {
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(235, 235, 235, 1);
                border-radius: 4px;
                margin-bottom: 14px;
                padding: 22px;
                box-sizing: border-box;

                .matching_task_info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;

                    p {
                        align-self: center;
                        font-size: 14px;
                        color: #4D4D4D;
                    }

                    p:nth-child(2) {
                        border-radius: 12px;
                        font-size: 13px;
                        height: 24px;
                        line-height: 24px;
                        color: #808080;
                    }
                }

                .matching_label {
                    font-size: 12px;
                    color: rgba(128, 128, 128, 1);
                }
            }

            .matching_task_list:hover {
                background: rgba(250, 251, 252, 1);
            }

            .matching_task_none {
                text-align: center;
                padding: 50px;

                p {
                    margin-top: 20px;
                }
            }
        }

        .popper__arrow {
            left: 270px !important;
        }
    }

    .select_work_wrap {
        border: 1px solid rgba(240, 240, 240, 1);
        padding: 0;
        left: 46% !important;

        .select_work {
            padding: 28px 20px 18px 38px;

            .title {
                font-size: 16px;
                color: #B3B3B3;
                margin-bottom: 20px;
                line-height: 16px;
            }

            .select_wrap {
                display: flex;

                .select_left {
                    font-size: 14px;
                    color: rgba(179, 179, 179, 1);
                    margin-right: 20px;
                    margin-bottom: 14px;
                    align-self: center;

                }

                .select_right {
                    span {
                        align-self: center;
                        font-size: 14px;
                        color: rgba(77, 77, 77, 1);
                        text-align: center;
                        line-height: 14px;
                        padding: 6px 17px;
                        cursor: pointer;
                    }

                    span:hover {
                        background: rgba(247, 248, 250, 1);
                        border-radius: 14px;
                    }
                }
            }

            .select_wrap:nth-last-child(1) {
                .select_left {
                    margin-bottom: 0;
                }
            }
        }

        .popper__arrow {
            left: 90% !important;
        }
    }

    .show_ability_detail {
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        margin-top: 7vh !important;
        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding: 0;
            .show_ability_wrap {
                height: 100%;
                overflow-y: auto;
                background: #fff;

                .show_detail_header {
                    display: flex;
                    justify-content: space-between;
                    padding: 50px 0;
                    margin: 0 80px;
                    box-sizing: border-box;
                    border-bottom: 1px dashed rgba(235, 235, 235, 1);

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
                                width: 18px;
                                height: 18px;
                                transform: translateX(-100%);
                            }
                        }

                        .user_info_name {
                            margin-left: 39px;
                            align-self: center;
                            text-align: left;

                            p:nth-child(1) {
                                font-size: 22px;
                                color: #323333;
                                margin-bottom: 12px;
                                line-height: 22px;
                            }

                            p:nth-child(2) {
                                font-size: 14px;
                                color: #999999;
                                margin-bottom: 10px;

                                span:nth-last-child(1) {
                                    span {
                                        display: none;
                                    }
                                }
                            }

                            p:nth-child(3) {
                                font-size: 13px;

                                span:nth-child(1) {
                                    background: rgba(36, 191, 255, 1);
                                    border-radius: 3px;
                                    padding: 4px 14px;
                                    margin-right: 6px;
                                    color: rgba(255, 255, 255, 1);
                                }

                                span:nth-child(2) {
                                    background: rgba(255, 255, 255, 1);
                                    border: 1px solid rgba(36, 191, 255, 1);
                                    border-radius: 3px;
                                    padding: 3px 14px;
                                    color: #24BFFF;
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
                            width: 138px;
                            height: 35px;
                            line-height: 35px;
                            border-radius: 18px;
                            font-size: 14px;
                        }

                        button:nth-child(1) {
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(230, 230, 230, 1);
                            color: rgba(153, 153, 153, 1);
                            margin-right: 8px;

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
                            color: rgba(255, 255, 255, 1);
                            border: 0;
                        }
                    }
                }

                .another_label {
                    padding: 0 80px 49px;
                    text-align: left;

                    .label_title {
                        font-size: 16px;
                        color: rgba(50, 51, 51, 1);
                        margin-bottom: 28px;
                        margin-left: 62px;
                    }

                    .label_content {
                        text-align: center;
                        margin: 0 auto;

                        video {
                            width: 510px;
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

                            img {
                                width: 27px;
                                vertical-align: text-bottom;
                            }

                        }

                        .dec {
                            text-align: left;
                            margin: 0 126px;
                            font-size: 14px;
                            color: #565657;
                            line-height: 31px;
                        }

                        .pic {
                            width: 713px;
                            height: 312px;
                            background: rgba(255, 255, 255, 1);
                            border: 1px solid rgba(230, 230, 230, 1);
                            border-radius: 10px;
                            padding: 23px 19px 23px 23px;
                            box-sizing: border-box;
                            margin-left: 126px;

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

                        .card {
                            .card_wrap {
                                margin-left: 126px;
                                text-align: left;
                                padding: 30px 0;
                                border-bottom: 1px dashed #EBEBEB;

                                .card_company_info {
                                    display: flex;
                                    justify-content: space-between;
                                    margin-bottom: 10px;

                                    .card_company_avatar {
                                        display: flex;

                                        img {
                                            width: 48px;
                                            height: 48px;
                                            border-radius: 50%;
                                            margin-right: 16px;
                                        }

                                        .name {
                                            font-size: 14px;

                                            p:nth-child(1) {
                                                color: rgba(50, 51, 51, 1);
                                                margin-bottom: 8px;
                                            }

                                            P:nth-child(2) {
                                                color: rgba(151, 152, 153, 1);
                                            }
                                        }
                                    }

                                    .reputation {
                                        font-size: 14px;
                                        color: rgba(36, 191, 255, 1);
                                    }
                                }

                                .desc {
                                    margin-left: 64px;
                                }
                            }

                            .card_wrap:nth-child(1) {
                                padding-top: 0;
                            }
                        }
                    }
                }
            }

            .show_ability_wrap::-webkit-scrollbar {
                width: 2px;
            }

            .go_left {
                position: fixed;
                left: calc(50vw - 500px);
                top: 50%;
                transform: translate3d(-100%, -50%, 0);

                img {
                    width: 20px;
                }
            }

            .go_right {
                position: fixed;
                right: calc(50vw - 490px);
                top: 50%;
                transform: translate3d(50%, -50%, 0);

                img {
                    width: 20px;
                }
            }
        }


    }

    .city_list {
        display: flex;
        font-size: 14px;
        flex-direction: column;
        .level_l_wrap::-webkit-scrollbar {
            height: 5px;
        }
        .level_l_wrap::-webkit-scrollbar-thumb{
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
            .level_1_city:hover{
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
            .level_2_city:hover{
                border-radius: 14px;
                background: #F7F8FA;
            }
        }

        .active_city{
            background:rgba(255,255,255,1);
            border:1px solid rgba(36, 191, 255, 1);
            color:rgba(36,191,255,1);
            border-radius: 14px;
        }

    }
</style>