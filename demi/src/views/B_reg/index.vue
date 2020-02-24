<template>
    <div class="reg_wrap">
        <Headers :user-avatar="user_avatar" :user-name="name"></Headers>
        <div class="main">
            <div class="left">
                <div v-if="first" class="first">
                    <h1>基本信息</h1>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :http-request="uploadAvatarFile"
                            :on-change="handleChange"
                    >
                        <img v-loading="ava_loading" v-if="user_avatar" :src="baseUrl + user_avatar" class="avatar">
                        <img v-else class="el-icon-plus avatar-uploader-icon" slot="trigger"
                             src="../../assets/img/ndtx@2x.png">
                    </el-upload>
                    <p>你的头像</p>
                    <div class="form">
                        <p>姓名</p>
                        <el-input v-model="name" placeholder="请输入姓名"></el-input>
                        <p>你的职务</p>
                        <el-input v-model="work" placeholder="请输入职务名称"></el-input>
                        <p>公司全称</p>
                        <el-input v-model="company_name" placeholder="必须与公司营业执照一致"></el-input>
                    </div>
                    <div style="margin-right: 154px;text-align: right;margin-bottom: 40px">
                        <button @click="handleSecond">下一步</button>
                    </div>
                </div>
                <div class="second" v-if="second">
                    <h1>公司信息</h1>
                    <div style="display: flex;margin-bottom: 29px">
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :before-upload="beforeUpload"
                                :http-request="upLogoloadFile"
                                :on-change="handleChange"
                        >
                            <img v-loading="logo_loading" v-if="logo" :src="baseUrl + logo" class="avatar">
                            <img v-else class="el-icon-plus avatar-uploader-icon" src="../../assets/img/ndtx@2x.png">
                        </el-upload>
                        <div style="align-self: center;margin-left: 24px;font-size: 16px;text-align: left">
                            <p style="color: #999999;margin-bottom: 17px">上传公司LOGO</p>
                            <p style="color: #4D4D4D">{{this.company_name}}</p>
                        </div>
                    </div>
                    <div class="form">
                        <p>公司简称</p>
                        <el-input v-model="abbreviation" placeholder="请输入公司简称(*不可更改)" :maxlength="10"></el-input>
                        <p>公司地址</p>
                        <el-input v-model="company_address" placeholder="广东省广州市番禺区"
                                  @focus="area_dialog = true"></el-input>
                        <p>公司行业</p>
                        <el-input v-model="company_industry" placeholder="请选择" @focus="SelectIndustry"><img
                                src="../../assets/img/icon_return @2x.png" slot="suffix"
                                class="el-input__icon el-icon-date"></el-input>
                        <p>人员规模</p>
                        <el-select v-model="company_staff" placeholder="请选择">
                            <el-option
                                    v-for="item in staff"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <p>发展阶段</p>
                        <el-select v-model="company_stage" placeholder="请选择">
                            <el-option
                                    v-for="item in stage"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="margin-right: 154px;text-align: right;">
                        <button @click="handleFirst">上一步</button>
                        <button @click="handleThird">下一步</button>
                    </div>
                </div>
                <div class="third" v-if="third">
                    <h1>上传营业执照</h1>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :http-request="upPassFile"
                            :on-change="handlePassChange"
                    >
                        <img v-loading="pass_loading" v-if="pass" :src="pass" class="avatar">
                        <div v-else style="position: absolute;top:50%;left:50%;transform: translate3d(-50%,-70%,0)">
                            <img class="el-icon-plus avatar-uploader-icon" src="../../assets/img/ndtx@2x.png">
                            <p style="margin-top: -24px;font-size: 12px;color: #999999;">点击上传</p>
                        </div>
                    </el-upload>
                    <div class="note">
                        <div class="title">
                            <span></span>
                            <span>注意事项</span>
                            <span></span>
                        </div>
                        <ol style="text-align: left;color: #999999;font-size: 15px">
                            <li style="margin-bottom: 15px">1, 照片不能裁剪</li>
                            <li style="margin-bottom: 15px">2, 照片清晰可见</li>
                            <li style="margin-bottom: 3px">3, 请确保你的营业执照真实有效，否则可能导致</li>
                            <li style="text-indent: 1rem">你的账号被锁定</li>
                        </ol>
                    </div>
                    <div style="margin: 0 auto 40px;width: 317px;">
                        <button @click="handleBackSecond">上一步</button>
                        <button @click="handlefourth">确认提交</button>
                    </div>
                </div>
                <div class="fourth" v-if="fourth">
                    <h1>等待审核通过</h1>
                    <img src="../../assets/img/snail@2x.png" alt="">
                    <p>
                        你的材料已提交<br/>
                        我们将会在一个工作日内完成审核
                    </p>
                </div>
            </div>
            <div class="right">
                <div class="right-wrapper">
                    <div class="content">
                        <div :class="first ? 'active_num' : ''">01</div>
                        <div :class="first ? 'active_text' : ''"><span>基本信息</span></div>
                    </div>
                    <div class="content">
                        <div :class="second ? 'active_num' : ''">02</div>
                        <div :class="second ? 'active_text' : ''"><span>公司信息</span></div>
                    </div>
                    <div class="content">
                        <div :class="third ? 'active_num' : ''">03</div>
                        <div :class="third ? 'active_text' : ''"><span>上传执照</span></div>
                    </div>
                    <div class="content">
                        <div :class="fourth ? 'active_num' : ''">04</div>
                        <div :class="fourth ? 'active_text' : ''"><span>等待审核</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="label_dialog">
            <el-dialog
                    title="请选择公司行业"
                    :visible.sync="dialogVisible"
                    width="850px"
            >
      <span>
        <ul>
          <li class="industry" v-for="item in lists" :key="item.label_id"
              @click="handleIndustry(item.label_id,item.name)">{{item.name}}</li>
        </ul>
      </span>
            </el-dialog>

        </div>

        <div class="area_dialog">
            <el-dialog
                    title="添加工作地点"
                    :visible.sync="area_dialog"
                    width="850px"
            >
                <div class="search">
                    <p class="note">请先选择工作城市</p>
                    <div class="block">
                        <p>*添加工作城市：</p>
                        <el-cascader
                                v-model="city"
                                :options="city_tree"
                                :props="{ label:'city_name', value:'city_id' }"
                                @change="handleProvince"
                                ref="city"
                                :show-all-levels="false"
                        ></el-cascader>
                    </div>
                    <div class="info">
                        <div class="input_key">
                            <p>*详细地址：</p>
                            <div class="input-item">
                                <el-input id='tipinput' v-model="address" type="text" @input="init" autocomplete="off"
                                          placeholder="输入行政区、街道、写字楼" :disabled="this.cityName === ''"></el-input>
                            </div>
                        </div>
                        <!--<div id="show" v-show="over"></div>-->
                    </div>
                    <div class="room">
                        <p>门牌号：</p>
                        <el-input v-model="room" placeholder="输入门牌号" :disabled="this.address === ''"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="area_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="handeleAddress"
                               :disabled="this.real_address === ''">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import "../../assets/css/reset.css"
    import Headers from "../../components/reg_header.vue"
    import http from '../../libs/http';
    import config from '../../config'
    import {forEach} from "../../libs/tools";
    const baseUrl = config.baseUrl;
    // import {handleMap} from '../../libs/Amap'
    // import config from '../libs/http';
    // const suffixUrl = config.suffixUrl;
    /* eslint-disable */

    export default {
        components: {
            Headers
        },
        name: 'home',
        data() {
            return {
                baseUrl,

                //上传字段
                file: null,
                user_avatar: '',
                logo: '',
                pass: '',
                license_path:'',
                logo_loading: false,
                ava_loading: false,
                pass_loading: false,


                //第一步
                name: '',
                work: '',
                company_name: '',

                //第二步
                company_address: '',
                company_industry: '',
                abbreviation: '',
                label_id: null,
                dialogVisible: false,
                company_staff: '',
                staff: [{
                    value: '20人以下',
                    label: '20人以下'
                }, {
                    value: '20-99人',
                    label: '20-99人'
                }, {
                    value: '100-500人',
                    label: '100-500人'
                }, {
                    value: '500-1000人',
                    label: '500-1000人'
                }, {
                    value: '1000人以上',
                    label: '1000人以上'
                }],
                company_stage: '',
                stage: [{
                    value: '未融资',
                    label: '未融资'
                }, {
                    value: '天使轮',
                    label: '天使轮'
                }, {
                    value: 'A轮',
                    label: 'A轮'
                }, {
                    value: 'B轮',
                    label: 'B轮'
                }, {
                    value: 'C轮',
                    label: 'C轮'
                },
                    {
                        value: 'D轮及以上',
                        label: 'D轮及以上'
                    },
                    {
                        value: '已上市',
                        label: '已上市'
                    },
                    {
                        value: '不需要融资',
                        label: '不需要融资'
                    }],
                lists: {},

                //步骤字段
                first: true,
                second: false,
                third: false,
                fourth:false,

                //地址变量
                latitude:null,
                longitude:null,
                area_dialog: false,
                // over: false,
                city: '',
                cityName: '',
                city_tree: [],
                address: '',
                room: '',
                real_address: '',
                city_id: '',

                //企业步骤
                company_id:null,
                enterprise_step:null

            };
        },
        mounted() {
            // handleMap();
            this.apiGet('/api/user/info').then((res) => {
                console.log(res);
                if(res.company_real){
                    this.company_id = res.company_real.company_id;
                    this.work = res.company_real.company_position;
                    this.company_name = res.company_real.company_name;
                    this.apiGet('/api/company/info/' + this.company_id).then((result)=>{
                        // console.log(result);
                        if(result){
                            this.company_address = result.address;
                            this.company_industry = result.industry_label.name;
                            this.abbreviation = result.abbreviation;
                            this.label_id = result.label_id;
                            this.company_staff = result.employee;
                            this.company_stage = result.financing;
                            this.latitude = result.latitude;
                            this.longitude = result.longitude;
                            this.city_id = result.city_id;
                            this.logo = result.logo_path.split('com')[1]
                        }
                    });
                    if(res.company_real.status === 2 && res.enterprise_step === 1){
                        this.$confirm(res.company_real.denial_reason, '审核不通过', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                        }).catch(() => {

                        });
                    }
                }

                this.enterprise_step = res.enterprise_step;
                this.user_avatar =res.avatar.split('com')[1];
                this.name = res.nickname;

                if (res.enterprise_step === 2) {
                    this.second = true;
                    this.first = false;
                    this.third = false;
                    this.fourth = false;
                } else if (res.enterprise_step === 3) {
                    this.third = true;
                    this.second = false;
                    this.first = false;
                    this.fourth = false;
                }else if (res.enterprise_step === 4) {
                    this.third = false;
                    this.second = false;
                    this.first = false;
                    this.fourth = true;
                }else if (res.enterprise_step === 5) {
                    this.$router.push({
                        name: 'B_index',
                    });
                }

            })
        },
        methods: {
            scrollTop() {
                document.getElementsByClassName('reg_header_wrapper')[0].scrollIntoView();
            },

            //上传文件
            beforeUpload(file) {
                this.pass_loading = true;
                this.logo_loading = true;
                this.ava_loading = true;
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只限 JPG,PNG 格式!');
                }
                return isJPG || isPNG;
            },
            handleChange(file) {
                this.file = file.raw;
            },

            handlePassChange(file){
                this.file = file.raw;
                this.pass = URL.createObjectURL(this.file);
            },

            //上传头像
            uploadAvatarFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files", this.file);
                this.apiPost('/file/uploads', form).then((res) => {
                    // console.log(res);
                    if (res) {
                        this.ava_loading = false;
                        this.user_avatar = res[0];
                    }
                })
            },


            //上传logo
            upLogoloadFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files", this.file);
                this.apiPost('/file/uploads', form).then((res) => {
                    // console.log(res);
                    if (res) {
                        this.logo_loading = false;
                        this.logo = res[0];
                    }
                })
            },

            //上传营业执照
            upPassFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files", this.file);
                // console.log(this.file)

                this.apiPost('/api/tools/ocr/bizlicense', form).then((res) => {
                    // console.log(res);
                    if (res) {
                        this.pass_loading = false;
                        this.license_path = res[0].file_path;
                    }
                })
            },
            //下一步
            handleSecond() {
                this.file = null;
                if (!this.user_avatar) {
                    this.$message({
                        showClose: true,
                        message: '请上传头像',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.name) {
                    this.$message({
                        showClose: true,
                        message: '请完善姓名信息',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.work) {
                    this.$message({
                        showClose: true,
                        message: '请完善职务信息',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.company_name) {
                    this.$message({
                        showClose: true,
                        message: '请填写公司名称',
                        type: 'error',
                        duration: 500
                    })
                } else {
                    let data = {
                        nickname: this.name,
                        avatar: this.user_avatar,
                        company_name: this.company_name,
                        company_position: this.work,
                    };
                    if(this.enterprise_step === 2){
                        this.apiPost('/api/company/update/' + this.company_id,data).then((res)=>{
                            // console.log(res);
                            if (res) {
                                this.first = false;
                                this.second = true;
                                this.scrollTop()
                            }
                        })
                    }else{
                        data.enterprise_step = 2;
                        this.apiPost('/api/company/create', data).then((res) => {
                            // console.log(res);
                            if (res) {
                                this.first = false;
                                this.second = true;
                                this.scrollTop()
                            }
                        })
                    }

                }
            },

            //上一步
            handleFirst() {
                this.file = null;
                this.first = true;
                this.second = false;
                this.scrollTop()
            },

            //选择城市
            handleCity() {
                this.apiGet('/city/lists?mode=tree').then((res) => {
                    // this.$store.commit('loading', true);
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
                    });
                    this.city_tree = res;
                    // this.$store.commit('loading', false);
                })
            },
            init() {
                axios.get('https://restapi.amap.com/v3/place/text?key=8ba784791c8a6d7ba250eb9e71124b68&keywords='
                    + this.address + '&types=keywords&city=' + this.cityName + '&citylimit=true')
                    .then(function (response) {
                        console.log(response);
                        if(response.status !== 200){
                            this.$message.error(response.statusText);
                        }else{
                            if(response.data.status){
                                if(response.data.sug_address){
                                    console.log(response.data.sug_address.location)
                                    this.latitude = response.data.sug_address.location.split('，')[0];
                                    this.longitude = response.data.sug_address.location.split('，')[1];
                                    this.real_address = response.data.sug_address.name;
                                    this.apiGet('/city/location?city_name=' + response.data.sug_address.adname).then((res) => {
                                        this.city_id = res.city_id
                                    })
                                }else{
                                    this.real_address = this.cityName + this.address
                                }
                            }
                        }

                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
                /*AMap.plugin('AMap.Autocomplete', function () {
                    // 实例化Autocomplete
                    var autoOptions = {
                        citylimit: true,
                        city: this.cityName,
                        output: 'show',
                        input: 'tipinput',
                        datatype: 'poi'
                    };
                    var autoComplete = new AMap.Autocomplete(autoOptions);
                    autoComplete.search(this.company_address, function (status, result) {
                        // 搜索成功时，result即是对应的匹配数据
                        AMap.event.addListener(autoComplete, 'select', function (results) {
                            //获取当前选中的结果数据 console.log(results.selected.data); });
                            this.over = false;
                            if (this.address) {
                                this.real_address = results.poi.district + results.poi.address + results.poi.name
                                this.latitude = results.poi.location.lat;
                                this.longitude = results.poi.location.lng;
                                let city = results.poi.district.split('市')[1]
                                this.apiGet('/city/location?city_name=' + city).then((res) => {
                                    this.city_id = res.city_id
                                })
                            } else {
                                this.real_address = '';
                            }
                        }.bind(this))
                    }.bind(this))
                }.bind(this))*/
            },
            handleProvince(value) {
                let dataRecieve = this.$refs.city.getCheckedNodes();
                this.cityName = dataRecieve[0].label
            },
            handeleAddress() {
                this.area_dialog = false;
                this.company_address = this.real_address + this.room;
            },

            //选择公司行业
            SelectIndustry() {
                this.dialogVisible = true;
                this.apiGet('/labels?id=992').then((res) => {
                    this.lists = res;
                });
                var industry = document.getElementsByClassName('industry');
                var length = industry.length;
                if (this.company_industry) {
                    for (var i = 0; i < length; i++) {
                        industry[i].classList.remove('active_li');
                        if (this.company_industry === industry[i].innerHTML) {
                            industry[i].classList.add('active_li');
                        }
                    }
                }
            },
            handleIndustry(id, name) {
                this.company_industry = name;
                this.dialogVisible = false;
                this.label_id = id;
            },

            handleThird() {
                this.file = null;

                if (!this.logo) {
                    this.$message({
                        showClose: true,
                        message: '请上传公司logo',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.abbreviation) {
                    this.$message({
                        showClose: true,
                        message: '请填写公司简称',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.company_address) {
                    this.$message({
                        showClose: true,
                        message: '请完善公司地址',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.company_industry) {
                    this.$message({
                        showClose: true,
                        message: '请选择公司行业',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.company_staff) {
                    this.$message({
                        showClose: true,
                        message: '请选择人员规模',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.company_stage) {
                    this.$message({
                        showClose: true,
                        message: '请选择发展阶段',
                        type: 'error',
                        duration: 500
                    })
                } else {
                    let data = {
                        company_name: this.company_name,
                        logo_path: this.logo,
                        abbreviation: this.abbreviation,
                        address: this.company_address,
                        industry_label_id: this.label_id,
                        employee: this.company_staff,
                        financing: this.company_stage,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        city_id:this.city_id,
                    };
                    if(this.enterprise_step === 3){
                        this.apiPost('/api/company/update/' + this.company_id,data).then((res)=>{
                            console.log(res)
                            if (res) {
                                this.second = false;
                                this.third = true;
                                this.scrollTop()
                            }
                        })
                    }else{
                        data.enterprise_step = 3;
                        this.apiPost('/api/company/create', data).then((res) => {
                            console.log(res);
                            if (res) {
                                this.second = false;
                                this.third = true;
                                this.scrollTop()
                            }
                        })
                    }
                }
            },

            //返回第二步
            handleBackSecond() {
                this.file = null;
                this.second = true;
                this.third = false;
                this.scrollTop()
            },

            handlefourth(){
                this.file = null;
                if (this.license_path) {
                    let data = {
                        company_name: this.company_name,
                        license_path: this.license_path,
                        enterprise_step: 4,
                        status:1
                    };
                    this.apiPost('/api/company/create', data).then((res) => {
                        console.log(res);
                        if(res){
                            this.third = false;
                            this.fourth = true;
                            this.scrollTop()
                        }
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '请上传营业执照',
                        type: 'error',
                        duration: 500
                    })
                }
            },

        },
        mixins: [http],
        watch: {
            second() {
                if (this.second || this.third) {
                    document.getElementsByClassName('main')[0].style.height = '761px';
                } else if (this.first) {
                    document.getElementsByClassName('main')[0].style.height = '650px';
                }
            },
            company_info(){
                if(this.company_info.enterprise_step>4){
                    this.fourth = false;
                    this.$router.push({
                        name: "B_index"
                    });
                }
            },
            area_dialog() {
                if (this.area_dialog) {
                    this.handleCity();
                }
            }
        },
    }
</script>
<style lang="less" type="text/less">
    a {
        color: white;
    }
    .el-menu--horizontal {
        border-bottom: none;
        .el-submenu__icon-arrow{
            color: #F5F5F7!important;
            right: 5px;
            margin-top: -7px;
        }
        .el-menu--popup{
            font-size: 16px;
            /*height: 50px;*/
            /*margin: 0 26px;*/
            /*padding: 0 5px;*/
            /*line-height: 50px;*/
            background-color: #fff !important;
            li{
                background: none!important;
            }
        }
        .el-menu-item.is-active {
            color: #ffffff !important;
            border-bottom: 3px solid #00e0ba;
        }
    }
    .reg_wrap {
        width: 100%;
        height: 100%;
        position: relative;

        .main {
            margin: 110px auto;
            width: 930px;
            font-family: MicrosoftYaHei;
            border-radius: 10px;
            box-shadow: 0 3px 16px 0 rgba(7, 14, 54, 0.12);
            display: flex;

            .left {
                width: 698px;
                text-align: center;
                background: #fff;
                border-radius: 10px 0 0 10px;

                .first {
                    h1 {
                        margin-bottom: 30px;
                        margin-top: 42px;
                        color: #464646;
                        font-size: 24px;
                    }

                    p {
                        margin: 17px 0 42px 0;
                        color: #808080;
                        font-size: 15px;
                    }

                    .form {
                        p {
                            color: #808080;
                            font-size: 15px;
                            margin-bottom: 9px;
                            margin-left: 176px;
                            text-align: left;
                        }

                        .el-input {
                            margin-bottom: 28px;
                            width: 390px;
                            height: 40px;

                            .el-input__inner {
                                border-radius: 21px;
                                background: rgba(247, 247, 247, 1);
                                border-color: rgba(0, 0, 0, .0);
                                color: #4D4D4D;
                                font-size: 16px;
                                height: 40px;
                                line-height: 40px;
                                padding: 0 20px;
                            }

                            .el-input.is-active .el-input__inner, .el-input__inner:focus {
                                border-color: #24BFFF !important;
                                background: #fff;
                            }
                        }
                    }

                    button {
                        font-family: MicrosoftYaHeiLight;
                        width: 120px;
                        height: 42px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 21px;
                        border: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }

                .second {
                    h1 {
                        margin-bottom: 30px;
                        padding-top: 42px;
                        color: #464646;
                        font-size: 24px;
                    }

                    .avatar-uploader {
                        text-align: left;
                    }

                    .avatar-uploader .el-upload {
                        border-radius: 6px;
                        border: 1px solid #f0f0f0;
                        background: rgba(247, 247, 250, 1);
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        margin-left: 154px;
                    }

                    .form {
                        p {
                            color: #808080;
                            font-size: 15px;
                            margin-bottom: 9px;
                            margin-left: 176px;
                            text-align: left;
                        }

                        .el-select {
                            .el-input {
                                margin-bottom: 28px;
                                width: 390px;
                                height: 40px;

                                .el-input__suffix {
                                    right: 20px;
                                    top: 10%;
                                }

                                .el-input__icon {
                                    width: 9px;
                                    height: 40px;
                                }
                            }
                        }

                        .el-select .el-input .el-select__caret {
                            font-size: 16px;
                            color: #808080;
                            transform: rotateZ(90deg)
                        }

                        .el-select .el-input .el-select__caret.is-reverse {
                            transform: rotateZ(180deg);
                        }

                        .el-input {
                            margin-bottom: 28px;
                            width: 390px;
                            height: 40px;

                            .el-input__suffix {
                                right: 21px;
                                top: 50%;
                                transform: translateY(-20%);
                            }

                            .el-input__icon {
                                width: 9px;
                                height: auto;
                            }

                            .el-input__inner {
                                border-radius: 21px;
                                background: rgba(247, 247, 247, 1);
                                border-color: rgba(0, 0, 0, .0);
                                color: #4D4D4D;
                                font-size: 16px;
                                height: 40px;
                                line-height: 40px;
                                padding: 0 20px;
                            }

                            .el-input.is-active .el-input__inner, .el-input__inner:focus {
                                border-color: #24BFFF !important;
                                background: #fff;
                            }
                        }
                    }

                    button:nth-child(1) {
                        font-family: MicrosoftYaHeiLight;
                        width: 120px;
                        height: 42px;
                        background: #fff;
                        border-radius: 21px;
                        border: 1px solid rgba(36, 191, 255, 1);
                        color: rgba(36, 191, 255, 1);
                        font-size: 16px;
                        cursor: pointer;
                        margin-right: 10px;
                    }

                    button:nth-last-child(1) {
                        font-family: MicrosoftYaHeiLight;
                        width: 120px;
                        height: 42px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 21px;
                        border: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }

                .third {
                    h1 {
                        margin-bottom: 42px;
                        padding-top: 42px;
                        color: #464646;
                        font-size: 24px;
                    }

                    .avatar-uploader .el-upload {
                        border-radius: 6px;
                        border: 1px solid #f0f0f0;
                        background: rgba(247, 247, 250, 1);
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        width: 264px;
                        height: 374px;
                    }

                    .avatar-uploader-icon {
                        width: 120px;
                        height: 120px;
                        line-height: 120px;
                        text-align: center;
                    }

                    .avatar {
                        width: 100%;
                        height: auto;
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0);
                    }

                    .note {
                        width: 317px;
                        margin: 30px auto;

                        .title {
                            width: 264px;
                            display: flex;
                            justify-content: space-around;
                            color: #4D4D4D;
                            font-size: 16px;
                            margin: 0 26px 25px 26px;

                            span {
                                border-top: 1px solid #E5E5E5;
                                width: 90px;
                                height: 1px;
                                align-self: center;
                            }

                            span:nth-child(2) {
                                align-self: center;
                                width: auto;
                                height: auto;
                                border-top: none;
                            }
                        }
                    }

                    button:nth-child(1) {
                        font-family: MicrosoftYaHeiLight;
                        width: 120px;
                        height: 42px;
                        background: #fff;
                        border-radius: 21px;
                        border: 1px solid rgba(36, 191, 255, 1);
                        color: rgba(36, 191, 255, 1);
                        font-size: 16px;
                        cursor: pointer;
                        margin-right: 10px;
                    }

                    button:nth-last-child(1) {
                        font-family: MicrosoftYaHeiLight;
                        width: 186px;
                        height: 42px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 21px;
                        border: none;
                        color: white;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }

                .fourth{
                    height: 100%;
                    h1 {
                        margin-bottom: 42px;
                        padding-top: 42px;
                        color: #464646;
                        font-size: 24px;
                    }
                    img{
                        margin-top: 70px;
                        margin-bottom: 120px;
                    }
                    p{
                        font-size:15px;
                        color:rgba(153,153,153,1);
                        margin-bottom: 40px;
                        line-height: 30px;
                    }
                }
            }

            .right {
                width: 232px;
                background: rgba(247, 247, 250, 1);
                position: relative;
                border-radius: 0 10px 10px 0;

                .right-wrapper {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    padding: 0 45px 0 35px;
                    width: 100%;

                    .content {
                        display: flex;
                        color: #FFFFFF;
                        margin-bottom: 92px;

                        div:nth-child(1) {
                            width: 43px;
                            height: 43px;
                            background: rgba(230, 230, 230, 1);
                            box-shadow: 0 2px 7px 0 rgba(7, 14, 54, 0.12);
                            border-radius: 50%;
                            line-height: 43px;
                            transform: translateX(95%);
                            font-size: 18px;
                        }

                        div:nth-child(2) {
                            width: 164px;
                            height: 43px;
                            background: rgba(235, 235, 235, 1);
                            border-radius: 22px;
                            line-height: 43px;
                            font-size: 16px;

                            span {
                                margin-left: 23px;
                            }
                        }
                    }

                    .content:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .area_dialog {
            .el-dialog__wrapper {
                overflow-y: hidden;
            }

            .el-dialog {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -80%, 0);
                margin-top: 0 !important;

                .el-input__suffix {
                    display: none;
                }

                .el-dialog__header {
                    text-align: left;

                    .el-dialog__title {
                        font-size: 16px;
                        color: #4D4D4D;
                        text-align: left;
                    }
                }

                .el-dialog__body {
                    padding-bottom: 10px;

                    .search {
                        text-align: left;
                        margin-bottom: 10px;

                        .note {
                            color: #B3B3B3;
                            font-size: 12px;
                            margin-bottom: 20px;
                        }

                        .block {
                            display: flex;
                            margin-bottom: 20px;

                            p {
                                align-self: center;
                                width: 107px;
                                text-align: right;
                                margin-right: 10px;
                            }

                            .el-cascader {
                                align-self: center;

                                .el-input {
                                    width: 200px;
                                }

                                .el-cascader-menu {
                                    min-width: 120px;
                                }

                                .el-cascader-node {
                                    text-align: center;
                                }
                            }

                        }

                        .info {
                            position: relative;

                            .input_key {
                                display: flex;

                                p {
                                    align-self: center;
                                    width: 107px;
                                    text-align: right;
                                    margin-right: 10px;
                                }

                                .input-item {
                                    align-self: center;

                                    .el-input {
                                        width: 500px;
                                    }
                                }
                            }

                            #show {
                                position: absolute;
                                border: 1px solid #DCDFE6;
                                margin-left: 117px;
                                margin-top: 10px;
                                width: 480px !important;
                                border-radius: 4px;
                                padding: 10px;
                                background-color: #FFF;
                                top: 40px !important;
                                left: 0 !important;
                                z-index: 99999999;

                                .auto-item {
                                    font-size: 14px;
                                    height: 20px;
                                    line-height: 20px;
                                }
                            }
                        }

                        .room {
                            display: flex;
                            margin-top: 20px;

                            p {
                                align-self: center;
                                width: 107px;
                                text-align: right;
                                margin-right: 10px;
                            }

                            .el-input {
                                width: 500px;
                            }
                        }
                    }

                    .el-cascader-menu__wrap {
                        height: 350px;
                    }

                    .el-cascader-menu {
                        min-width: 269px;
                    }
                }

                .el-dialog__footer {
                    padding-top: 0;
                    padding-bottom: 20px;
                }
            }
        }
        .label_dialog{
            .el-dialog {
                position: fixed;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
                left: 50%;
                margin: 0 !important;
                text-align: left;
                border-radius: 10px;
                height: 500px;
            }

            .el-dialog__header {
                color: #464646;
                padding: 20px;
                border-bottom: 1px solid #f0f0f0;
                background: #fff;
                border-radius: 10px 10px 0 0;
            }

            .el-dialog__body {
                background: #f7f8fa;
                border-bottom: 1px solid #f0f0f0;
                border-radius: 0 0 10px 10px;
                height: 375px;

                ul {
                    li {
                        display: inline-block;
                        margin-right: 20px;
                        margin-bottom: 20px;
                        border: 1px solid #e5e5e5;
                        border-radius: 21px;
                        padding: 10px;
                        background: #fff;
                    }
                }
            }

            .el-scrollbar {
                text-align: center;
            }

        }

        .avatar-uploader .el-upload {
            border-radius: 50%;
            background: rgba(247, 247, 250, 1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 90px;
            height: 90px;
            line-height: 90px;
            text-align: center;
        }

        .avatar {
            width: 90px;
            height: 90px;
            display: block;
        }

        ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            font-family: MicrosoftYaHeiLight;
            color: #CCCCCC;
        }

        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-family: MicrosoftYaHeiLight;
            color: #CCCCCC;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-family: MicrosoftYaHeiLight;
            color: #CCCCCC;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-family: MicrosoftYaHeiLight;
            color: #CCCCCC;
        }

        .active_num {
            color: #24BFFF;
            background: #fff !important;
        }

        .active_text {
            background: #24BFFF !important;
        }

        .active_li {
            background: #24BFFF !important;
            color: white;
            border: none;
        }
        .el-menu--horizontal>.el-submenu .el-submenu__title{
            height: 50px;
            line-height: 50px;
            /*display: flex;*/
        }
        .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
            position: absolute;
            font-size: 17px;
            color: aqua;
        }

    }
    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
        min-width: 130px;
    }

</style>