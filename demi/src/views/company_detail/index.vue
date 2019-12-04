<template>
    <div class="right">
        <div class="company_detail_header">
            <span></span>
            <span>公司主页</span>
        </div>
        <div class="company_main">
            <div class="company_basic">
                <div class="logo" v-loading="logo_loading">
                    <img v-if="!form.logo_path" :src="company_info && company_info.logo_path" alt="">
                    <img v-if="form.logo_path" :src="baseUrl + form.logo_path" alt="">
                </div>
                <div class="name">
                    <p>{{company_info && company_info.company_name}}</p>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :http-request="upLogoloadFile"
                            :on-change="handleChange">
                        <p>点击上传LOGO</p>
                    </el-upload>
                </div>
            </div>
            <div class="company_another">
                <div class="company_label">
                    <p class="label_title">公司视频</p>
                    <div v-if="company_info && company_info.video.length > 0 && !form.video_path" class="company_video"
                         v-loading="vid_loading">
                        <video controls :src="company_info && company_info.video[0].file_path"></video>
                    </div>
                    <div v-if="form.video_path" class="company_video" v-loading="vid_loading">
                        <video controls :src="baseUrl + form.video_path"></video>
                    </div>
                    <div class="video_ing" v-if="company_info && company_info.video.length < 1">
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :before-upload="beforeVidUpload"
                                :http-request="uploadVidFile"
                                :on-change="handleChange">
                            <div>
                                <img src="../../assets/img/my_videos@2x.png" alt="">
                                <p>点击上传视频</p>
                            </div>
                        </el-upload>
                    </div>
                    <div class="reupload" v-if="company_info && company_info.video.length > 0">
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :before-upload="beforeVidUpload"
                                :http-request="uploadVidFile"
                                :on-change="handleChange">
                            <p>重新上传</p>
                        </el-upload>
                    </div>
                </div>
                <div class="company_label">
                    <p class="label_title">公司图片</p>
                    <div class="company_pic">
                        <div class="show_pic" v-if="edPic">
                            <div v-for="(item,index) in edPic" :key="item.file_id" @mouseover="show_icon = item.file_id"
                                 @mouseleave="show_icon = null">
                                <img :src="item.file_path" alt="">
                                <span v-if="show_icon === item.file_id">
                                     <i class="icon el-icon-zoom-in" @click="handlePictureCardPreview(item)"></i>
                                     <i class="icon el-icon-delete" @click="handleRemove(index,edPic)"></i>
                                </span>
                            </div>
                        </div>
                        <el-upload
                                action=""
                                list-type="picture-card"
                                :multiple="true"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-change="handlePicChange"
                                :before-upload="beforePicUpload"
                                :http-request="uploadPicFile"
                                :limit='9'
                                :on-exceed="handleSum"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" custom-class="bigPic">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="company_label">
                    <p class="label_title">基本信息</p>
                    <div class="detail_info">
                        <el-form ref="form" :model="form" label-width="80px">

                            <el-form-item>
                                <div slot="label">公司地址</div>
                                <el-input v-model="form.address" placeholder="请输入工作地点"
                                          @focus="area_dialog = true"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div slot="label">公司简称</div>
                                <el-input v-model="form.abbreviation" placeholder="请输入公司简称"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <div slot="label">公司行业</div>
                                <el-select v-model="form.industry_label" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.label_id"
                                            :label="item.name"
                                            :value="item.label_id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <div slot="label">人员规模</div>
                                <el-select v-model="form.employee" placeholder="请选择">
                                    <el-option
                                            v-for="item in staff"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <div slot="label">发展阶段</div>
                                <el-select v-model="form.financing" placeholder="请选择">
                                    <el-option
                                            v-for="item in stage"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <div slot="label">公司简介</div>
                                <el-input
                                        type="textarea"
                                        :rows="6"
                                        placeholder="请输入内容"
                                        v-model="form.description">
                                </el-input>

                            </el-form-item>
                        </el-form>
                    </div>

                </div>
                <div class="company_label">
                    <p class="label_title">我的职务</p>
                    <div class="myself_info">
                        <p>我的头像</p>
                        <div class="avatar">
                            <div class="logo" v-loading="ava_loading">
                                <img v-if="!avatar" :src="user_info.avatar" alt="">
                                <img v-if="avatar" :src="baseUrl + avatar" alt="">
                            </div>
                            <div class="name">
                                <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :before-upload="beforeUpload"
                                        :http-request="upAvaloadFile"
                                        :on-change="handleChange">
                                    <p>点击上传头像</p>
                                </el-upload>
                            </div>
                        </div>
                        <div class="my_name">
                            <p>我的姓名</p>
                            <el-input v-model="user_info.nickname" placeholder="请输入昵称"></el-input>
                        </div>
                        <div class="my_work">
                            <p>我的职位</p>
                            <el-input v-model="user_info.company_position" placeholder="请输入任职职位"></el-input>
                        </div>
                    </div>
                </div>
                <div class="ed_sumbit">
                    <button @click="handleUpdata">保存</button>
                </div>
            </div>

        </div>

        <div class="area_dialog">
            <el-dialog
                    title="添加工作地点"
                    :visible.sync="area_dialog"
                    width="850px">
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
                        <div id="show" v-show="over"></div>
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
    import http from '../../libs/http'
    import {forEach} from "../../libs/tools";
    import config from "../../config"

    const baseUrl = config.baseUrl;
    import {handleMap} from '../../libs/Amap'

    export default {
        name: 'index',
        data() {
            return {
                baseUrl,
                id: null,
                company_info: null,

                //图片变量
                edPic: [],
                files: [],
                show_icon: null,
                dialogImageUrl: '',
                dialogVisible: false,

                //头像视频变量
                file: null,
                ava_loading: false,
                vid_loading: false,
                logo_loading: false,
                avatar: null,

                options: [],
                staff: [{
                    value: '选项1',
                    label: '20人以下'
                }, {
                    value: '选项2',
                    label: '20-99人'
                }, {
                    value: '选项3',
                    label: '100-500人'
                }, {
                    value: '选项4',
                    label: '500-1000人'
                }, {
                    value: '选项5',
                    label: '1000人以上'
                }],
                stage: [{
                    value: '选项1',
                    label: '未融资'
                }, {
                    value: '选项2',
                    label: '天使轮'
                }, {
                    value: '选项3',
                    label: 'A轮'
                }, {
                    value: '选项4',
                    label: 'B轮'
                }, {
                    value: '选项5',
                    label: 'C轮'
                }, {
                    value: '选项6',
                    label: 'D轮及以上'
                }, {
                    value: '选项7',
                    label: '已上市'
                }, {
                    value: '选项8',
                    label: '不需要融资'
                }],
                form: {
                    address: '',
                    abbreviation: '',
                    industry_label: '',
                    employee: '',
                    financing: '',
                    description: '',
                    video_path: null,
                    logo_path: null,
                    image_path: [],
                    longitude: '',
                    latitude: '',
                },
                user_info: {
                    nickname: '',
                    company_position: '',
                    avatar: ''
                },


                //地址变量
                area_dialog: false,
                over: false,
                city: '',
                cityName: '',
                city_tree: [],
                address: '',
                room: '',
                real_address: '',
                city_id: '',

            }
        },
        mounted() {
            handleMap();
            this.initialize()
        },

        // created() {
        //     this.getRouterData()
        // },

        methods: {
            //路由传参
            // getRouterData() {
            //     this.id = this.$route.query.id
            // },
            initialize(){
                this.apiGet('/api/user/info').then((res) => {
                    if (res.type === 2) {
                        console.log(res);
                        this.user_info.nickname = res.nickname;
                        this.user_info.company_position = res.company_position;
                        this.user_info.avatar = res.avatar;
                        this.apiGet('/api/company/info/' + res.company_id).then((res) => {
                            console.log(res);
                            this.company_info = res;
                            if(res.files.length > 0){
                                forEach(res.files, item => {
                                    if (item.type === 2) {
                                        this.edPic.push(item)
                                    }
                                });
                            }
                            this.form.address = res.address;
                            this.form.abbreviation = res.abbreviation;
                            this.form.industry_label = res.industry_label_id;
                            this.form.employee = res.employee;
                            this.form.financing = res.financing;
                            this.form.description = res.description;
                        });
                        this.apiGet('/labels?id=992').then((res) => {
                            this.options = res;
                        });
                    } else {
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

            //上传logo
            handleChange(file) {
                this.file = file.raw
            },
            beforeUpload(file) {
                this.logo_loading = true;
                this.ava_loading = true;
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只限 JPG,PNG 格式!');
                }
                return isJPG || isPNG;
            },
            upLogoloadFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files", this.file);
                this.apiPost('/file/uploads', form).then((res) => {
                    console.log(res);
                    if (res) {
                        this.logo_loading = false;
                        this.form.logo_path = res[0];
                    }
                })
            },

            //上传视频
            beforeVidUpload(file) {
                console.log(file)
                this.vid_loading = true;
                if (!/\.(?:mp4|rmvb|avi|ts|ogg|flv|wmv|mkv)$/.test(file.name.toLowerCase())) {
                    this.$message.error('上传头像图片只限 mp4,rmvb,avi,ts,ogg,flv,wmv,mkv 格式!');
                    return false
                } else {
                    return true
                }
            },
            uploadVidFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files", this.file);
                form.append('type', 'video')
                this.apiPost('/file/uploads', form).then((res) => {
                    console.log(res)
                    if (res) {
                        this.vid_loading = false;
                        this.form.video_path = res[0]
                    }
                })
            },


            //上传图片
            handlePictureCardPreview(file) {
                console.log(file)
                this.dialogImageUrl = file.url;
                if (file.file_path) {
                    this.dialogImageUrl = file.file_path;
                }
                this.dialogVisible = true;
            },
            handlePicChange(file, fileList) {
                if (this.edPic) {
                    if (this.form.image_path.length < 9 - this.edPic.length) {
                        this.files = fileList;
                    }
                } else {
                    if (this.form.image_path.length < 9) {
                        this.files = fileList;
                    }
                }
            },
            beforePicUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只限 JPG,PNG 格式!');
                }
                return isJPG || isPNG;
            },
            handleSum(file, fileList) {
                this.$message({
                    showClose: true,
                    message: '最多只能上传9张',
                    type: 'error',
                    duration: 500
                })
            },
            uploadPicFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files[]', this.files[i].raw)
                }
                this.apiPost('/file/uploads', form).then((res) => {
                    if (res) {
                        this.form.image_path = res;
                        console.log(this.form.image_path)
                    } else {
                        this.form.image_path = []
                    }
                })
            },

            //删除图片
            handleRemove(file, fileList) {
                if (typeof file == "number") {
                    console.log(fileList[file].file_id)
                    this.apiDelete('/api/company/file/delete/' + fileList[file].file_id).then((res) => {
                        console.log(res)
                    });
                }
                this.files = fileList;
                this.uploadPicFile();
            },

            //选择城市
            handleCity() {

                this.apiGet('/city/lists?mode=tree').then((res) => {
                    this.$store.commit('loading', true);
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
                    this.$store.commit('loading', false);
                })

            },
            init() {
                AMap.plugin('AMap.Autocomplete', function () {
                    // 实例化Autocomplete
                    var autoOptions = {
                        citylimit: true,
                        city: this.cityName,
                        output: 'show',
                        input: 'tipinput',
                        datatype: 'poi'
                    };
                    var autoComplete = new AMap.Autocomplete(autoOptions);
                    autoComplete.search(this.form.address, function (status, result) {
                        // 搜索成功时，result即是对应的匹配数据
                        AMap.event.addListener(autoComplete, 'select', function (results) {
                            //获取当前选中的结果数据 console.log(results.selected.data); });
                            this.over = false;
                            if (this.address) {
                                this.real_address = results.poi.district + results.poi.address + results.poi.name
                                this.form.latitude = results.poi.location.lat;
                                this.form.longitude = results.poi.location.lng;
                                let city = results.poi.district.split('市')[1]
                                this.apiGet('/city/location?city_name=' + city).then((res) => {
                                    this.city_id = res.city_id
                                })
                            } else {
                                this.real_address = '';
                            }
                        }.bind(this))
                    }.bind(this))
                }.bind(this))
            },
            handleProvince(value) {
                let dataRecieve = this.$refs.city.getCheckedNodes();
                this.cityName = dataRecieve[0].label
            },
            handeleAddress() {
                this.area_dialog = false;
                this.form.address = this.real_address + this.room;
            },

            //上传avatar
            upAvaloadFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files", this.file);
                this.apiPost('/file/uploads', form).then((res) => {
                    if (res) {
                        this.ava_loading = false;
                        this.user_info.avatar = baseUrl + res[0];
                        this.avatar = res[0];
                    }
                })
            },

            //提交
            handleUpdata() {
                this.user_info.avatar = this.user_info.avatar.split('com')[1]
                var id = this.company_info.company_id;
                this.apiPost('/api/company/update/' + id, this.form).then((res) => {
                    console.log(res)
                    this.initialize()
                });
                this.apiPost('/api/user/update', this.user_info).then((res) => {
                    console.log(res)
                    this.initialize()
                });


            }
        },
        watch: {
            // id() {
            //     if (this.id) {
            //
            //     }
            // },
            area_dialog() {
                if (this.area_dialog) {
                    this.handleCity();
                }
            }
        },
        mixins: [http]
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family: MicrosoftYaHei;

        .company_detail_header {
            padding: 20px 0 29px 2px;
            box-sizing: border-box;
            text-align: left;
            display: flex;

            span:nth-child(1) {
                width: 4px;
                height: 22px;
                border-radius: 2px;
                background: #24BFFF;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
            }

            span:nth-child(2) {
                font-size: 20px;
                color: #4D4D4D;
            }
        }

        .company_main {
            width: 724px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(235, 235, 235, 1);
            border-radius: 8px;

            .company_basic {
                padding: 34px 38px;
                display: flex;
                background: rgba(245, 246, 247, 1);
                border-radius: 7px 7px 0px 0px;

                .logo {
                    align-self: center;
                    width: 80px;
                    height: 80px;
                    margin-right: 34px;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .name {
                    align-self: center;
                    font-size: 16px;

                    p {
                        color: rgba(77, 77, 77, 1);
                        margin-bottom: 13px;
                    }

                    .avatar-uploader {
                        text-align: left;

                        p {
                            font-size: 13px;
                            color: rgba(153, 153, 153, 1);
                            margin-bottom: 0;
                        }
                    }
                }
            }

            .company_another {
                padding: 30px 39px;

                .company_label:nth-child(4) {
                    margin-bottom: 0;
                }

                .company_label {
                    display: flex;
                    margin-bottom: 30px;

                    .label_title {
                        font-size: 14px;
                        color: rgba(77, 77, 77, 1);
                        margin-right: 33px;
                    }

                    .company_pic {
                        width: 468px;
                        text-align: left;

                        .el-upload {
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            margin-right: 16px;
                        }

                        img {
                            width: 100px;
                            height: 100px;
                        }

                        ul {
                            width: 468px;

                            li {
                                width: 100px;
                                height: 100px;
                                display: inline-block;
                                margin-right: 16px;
                                border-radius: 0;
                                border: 0;
                            }
                        }

                        .show_pic {
                            float: left;

                            div {
                                width: 100px;
                                height: 100px;
                                display: inline-block;
                                margin-right: 16px;
                                position: relative;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }

                                span {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100px;
                                    height: 100px;
                                    background: rgba(0, 0, 0, .3);
                                    display: flex;
                                    justify-content: center;

                                    .icon {
                                        align-self: center;
                                        color: white;
                                        font-size: 20px;
                                        margin-right: 20px;
                                        cursor: pointer;
                                    }

                                    .icon:nth-last-child(1) {
                                        margin: 0;
                                    }
                                }

                            }
                        }

                        .bigPic {
                            .el-dialog__header {
                                padding: 0;

                                .el-dialog__headerbtn {
                                    background: #24BFFF;
                                    border-radius: 50%;
                                    width: 30px;
                                    height: 30px;
                                    line-height: 30px;

                                    .el-icon {
                                        color: white;

                                    }
                                }
                            }

                            .el-dialog__body {
                                padding: 0;
                                line-height: 0;
                            }
                        }
                    }

                    .company_video {
                        width: 468px;

                        video {
                            width: 100%;
                        }
                    }

                    .video_ing {
                        width: 468px;
                        height: 254px;
                        border: 1px solid rgba(213, 218, 223, 1);
                        position: relative;

                        img {
                            width: 100%;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }

                        p {
                            position: absolute;
                            top: 70%;
                            left: 50%;
                            transform: translateX(-55%);
                            font-size: 14px;
                            color: rgba(36, 191, 255, 1);
                        }
                    }

                    .reupload {
                        width: 81px;
                        height: 27px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 14px 13px 13px 0px;
                        font-size: 12px;
                        color: rgba(255, 255, 255, 1);
                        margin-left: 8px;
                        line-height: 27px;
                    }

                    .detail_info {
                        .el-form-item {
                            margin-bottom: 29px;

                            .el-form-item__label {
                                font-size: 14px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 10px;
                                padding: 0;
                                text-align: left;
                                line-height: normal;
                            }

                            .el-form-item__content {
                                margin-left: 0 !important;
                                width: 468px;

                                .el-input__inner {
                                    background: rgba(255, 255, 255, 1);
                                    border: 1px solid rgba(213, 218, 223, 1);
                                    border-radius: 0;
                                }
                            }

                            .el-select {
                                display: block;

                                .el-input__suffix {
                                    top: 75%;
                                    transform: translateY(-55%);
                                }
                            }

                            .el-select .el-input .el-select__caret {
                                font-size: 16px;
                                color: #CCCCCC;
                                transform: rotateZ(90deg)
                            }

                            .el-select .el-input .el-select__caret.is-reverse {
                                transform: rotateZ(180deg);
                            }


                        }

                    }

                    .myself_info {
                        text-align: left;
                        width: 468px;

                        p {
                            font-size: 14px;
                            color: rgba(153, 153, 153, 1);
                            margin-bottom: 8px;
                        }

                        .avatar {
                            display: flex;
                            justify-content: flex-start;
                            margin-bottom: 29px;

                            .logo {
                                align-self: center;
                                width: 62px;
                                height: 62px;
                                margin-right: 19px;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                }
                            }

                            .name {
                                align-self: center;
                            }
                        }

                        .my_name, .my_work {
                            margin-bottom: 29px;

                            .el-input {
                                width: 100%;

                                .el-input__inner {
                                    background: rgba(255, 255, 255, 1);
                                    border: 1px solid rgba(213, 218, 223, 1);
                                    border-radius: 0;
                                }
                            }
                        }
                    }
                }

                .ed_sumbit {
                    width: 557px;
                    text-align: right;
                    margin-bottom: 18px;

                    button {
                        border: 0;
                        width: 125px;
                        height: 30px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 15px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 1);
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
                    padding-top: 0;
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

    }
</style>