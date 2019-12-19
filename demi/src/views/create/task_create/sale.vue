<template>
    <div class="sale" v-if="isShow">
        <div class="title" @click="handleBack">
            <p><span v-if="!isHistory">职位管理 - </span><span v-if="isHistory">历史模板 -</span><span
                    v-if="!isUpdata">发布销售代理任务</span><span v-if="isUpdata">编辑销售代理任务</span></p>
        </div>
        <div class="contain">
            <div class="basic">
                <div class="basic_title">
                    <span class="icon"></span>
                    <p>请填写基本信息</p>
                </div>
                <div class="basic_info">
                    <p class="note">
                        注意：带 * 的内容，在确认发布后将不能修改
                    </p>
                    <el-form ref="form" :model="form" label-width="92px">
                        <el-form-item label="* 任务名称：">
                            <el-input v-model="form.task_title" placeholder="请输入任务名称" maxlength="30"
                                      :show-word-limit="true"></el-input>
                        </el-form-item>
                        <el-form-item label="佣金/每单：">
                            <el-input v-model="form.payment_money" placeholder="请输入佣金"></el-input>
                            <p>元</p>
                        </el-form-item>
                        <el-form-item label="结算方式：">
                            <el-input v-model="form.payment_method" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="招募人数：">
                            <el-input v-model="form.quantity_max" placeholder="请输入招募人数"></el-input>
                            <p>人</p>
                        </el-form-item>
                        <el-form-item label="适合行业：">
                            <el-cascader ref="label" :options="type_list" :show-all-levels="false"
                                         v-model="form.industry"
                                         :props="{ label:'name', value:'label_id',multiple: true,}"
                                         :placeholder="edit" @focus="handleType"
                                         @change="handleLabel"
                            ></el-cascader>
                            <p class="edit_show" v-if="(isUpdata && !type_list) || isHistory"><span
                                    style="color: #808080"
                                    v-for="item in form.industry"
                                    :key="item.label_id">{{item.name}}/</span>
                            </p>

                        </el-form-item>
                        <el-form-item label="发布城市：">
                            <el-cascader :options="city_tree" v-model="form.city" :show-all-levels="false"
                                         :props="{ label:'city_name', value:'city_id'}" :placeholder="edit"
                                         @focus="handleCity"
                            ></el-cascader>
                            <p class="edit_show" v-if="isUpdata && !city_tree || isHistory">{{this.cityName}}</p>

                        </el-form-item>
                    </el-form>
                    <div class="line"></div>
                </div>
                <div class="basic_title">
                    <span class="icon"></span>
                    <p>请填写产品描述</p>
                </div>
                <div class="ask">
                    <el-form ref="form" :model="form" label-width="92px">
                        <el-form-item label="产品名称：">
                            <el-input v-model="form.goods_title" placeholder="请输入产品名称" maxlength="30"
                                      :show-word-limit="true"></el-input>
                        </el-form-item>
                        <el-form-item label="产品价格：">
                            <el-input v-model="form.goods_price" placeholder="请输入产品价格"></el-input>
                            <p>元</p>
                        </el-form-item>
                        <el-form-item label="产品描述：">
                            <el-input
                                    type="textarea"
                                    :rows="10"
                                    placeholder="例如
品牌名称:
品牌型号:
产品颜色:
生产企业等等
                        "
                                    :maxlength="500"
                                    show-word-limit
                                    v-model="form.goods_desc">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="产品图片：">
                            <div class="picture" v-loading="pic_loading">
                                <p>必填</p>
                                <div class="show_pic">
                                    <div class="edit_img" v-for="(item,index) in show_pic" :key="item.file_id" v-if="(isUpdata && show_pic) || (isHistory && show_pic)"
                                         @mouseover="show_icon = item.file_id" @mouseleave="show_icon = null">
                                        <img :src="item.file_path" alt="">
                                        <span v-if="show_icon === item.file_id">
                                            <i class="icon el-icon-zoom-in" @click="handlePictureCardPreview(item)"></i>
                                            <i class="icon el-icon-delete" @click="handleRemove(index,show_pic)"></i>
                                        </span>
                                    </div>
                                    <div class="upload_img">
                                        <el-upload
                                                action=""
                                                list-type="picture-card"
                                                :multiple="true"
                                                :on-change="handleChange"
                                                :before-upload="beforePicUpload"
                                                :http-request="uploadFile"
                                                :limit='9'
                                                :on-exceed="handleSum"
                                                :on-preview="handlePictureCardPreview"
                                                :on-remove="handleRemove"
                                                :on-success="handleSuccess"
                                        >
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                    </div>
                                </div>

                                <el-dialog :visible.sync="dialogVisible" custom-class="bigPic">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item label="产品视频：">
                            <div class="video" v-loading="loading">
                                <p>选填</p>
                                <div class="operation" v-if="form.video_path">
                                    <!--<div class="delect" style="display: none" @click="form.video_path = '';cover = '';real_video_path = ''">删除</div>-->
                                    <el-upload action=""
                                               :show-file-list="false"
                                               :before-upload="beforeVidUpload"
                                               :http-request="uploadVidFile"
                                               :on-change="handleVidChange"
                                    >重新上传
                                    </el-upload>
                                </div>
                                <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :before-upload="beforeVidUpload"
                                        :http-request="uploadVidFile"
                                        :on-change="handleVidChange"
                                        >
                                    <video id="video" class="avatar" :src="this.form.video_path"
                                           v-show="form.video_path !== ''" controls></video>
                                    <img src="../../../assets/img/my_videos@2x.png" v-show="form.video_path === ''"
                                         class="el-icon-plus avatar-uploader-icon">
                                    <p v-show="form.video_path === ''">点击上传视频</p>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="line"></div>
                    <p>确认发布代表同意<span> 《得米平台服务协议》</span></p>
                    <button class="submit" @click="handleSubmit">确认发布</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../../libs/http'
    import {forEach} from "../../../libs/tools";
    import draggable from 'vuedraggable';

    export default {
        name: 'sale',
        props: {
            isShow: {type: Boolean, default: false},
            isUpdata: {type: Boolean, default: false},
            isHistory: {type: Boolean, default: false},
            isHistoryId: {type: Number, default: null}
        },
        components: {
            draggable,
        },
        data() {
            return {
                /*labelLoading:true,
                areaLoading:true,*/
                form: {
                    task_title: '',
                    payment_money: null,
                    payment_method: '即结 [销售代理任务只支持即结]',
                    quantity_max: null,
                    industry: null,
                    city: '',
                    goods_title: '',
                    goods_desc: '',
                    video_path: '',
                    goods_price: '',
                    image_arr: []
                },
                edit: '请选择',
                industry_arr: [],
                files: [],
                video: null,
                real_video_path: null,
                cover: "",
                type_list: null,
                city_tree: null,
                cityName: null,
                dialogImageUrl: '',
                dialogVisible: false,
                show_icon: null,
                show_pic: [],
                loading: false,
                pic_loading:false
            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                if (res.type !== 2) {
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
        },
        methods: {
            handleBack() {
                if (this.isUpdata) {
                    sessionStorage.removeItem('task');
                    this.$router.push({
                        name: "work",
                        params: {
                            activeName: 'task_work'
                        }
                    });
                } else {
                    this.$emit('show-sale', false, 'sale')
                }
            },
            handleType() {
                this.apiGet('/labels?id=1025&mode=tree').then((res) => {
                    this.type_list = res;
                    // this.labelLoading = false
                })

            },
            handleLabel(res) {
                var length = res.length;
                if (length > 3) {
                    let showLabel = [];
                    showLabel.push(res[0]);
                    showLabel.push(res[1]);
                    showLabel.push(res[2]);
                    this.form.industry = showLabel;
                    this.industry_arr = [];
                    forEach(showLabel, item => {
                        this.industry_arr.push(item[1])
                    });
                    this.$message({
                        showClose: true,
                        message: '最多只能选3个',
                        type: 'error',
                        duration: 1000
                    })
                } else {
                    this.industry_arr = [];
                    forEach(res, item => {
                        this.industry_arr.push(item[1])
                    });
                }
            },
            handleCity() {

                let first_city = {
                    "city_name": '不限',
                    "city_id": 0,
                    children: [{
                        "city_name": '不限',
                        "city_id": 0,
                    }]
                };
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
                    // this.areaLoading = false
                    this.city_tree.unshift(first_city)
                    this.$store.commit('loading', false);
                })

            },
            handleChange(file, fileList) {
                if (this.show_pic) {
                    if (this.form.image_arr.length < 9 - this.show_pic.length) {
                        this.files = fileList;
                    }
                } else {
                    if (this.form.image_arr.length < 9) {
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
            uploadFile(edit) {
                // 创建表单对象
                this.pic_loading = true
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files[]', this.files[i].raw);
                }
                this.apiPost('/file/uploads', form).then((res) => {
                    if (res) {
                        this.form.image_arr = res;
                        this.pic_loading = false
                       /* if (this.show_pic) {
                            let length = this.show_pic.length;
                            for (let i = 0; i < length; i++) {
                                var path = this.show_pic[i].file_path.split('com')[1];
                                this.form.image_arr.unshift(path);
                            }
                        }*/
                    } else {
                        if(edit == "number"){
                            this.pic_loading = false
                        }
                        this.form.image_arr = []
                    }
                });
            },
            handleRemove(file, fileList) {
                if (typeof file == "number") {
                    this.apiDelete('/api/task/delete/file/' + fileList[file].file_id).then((res) => {
                        if (res) {
                            fileList.splice(file, 1);
                        }
                    });
                }
                this.files = fileList;
                this.uploadFile(typeof file);
            },
            handleSuccess() {
                this.loading = false
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                if (file.file_path) {
                    this.dialogImageUrl = file.file_path;
                }
                this.dialogVisible = true;
            },
            beforeVidUpload(file) {
                if (!(file.type.indexOf('video') === 0 && file.type && /\.(?:mp4|rmvb|avi|ts|ogg|flv|wmv|mkv)$/.test(file.name.toLowerCase()))) {
                    this.$message.error('上传视频只限 mp4,rmvb，avi，ts，ogg，flv，wmv，mkv格式!');
                    return false
                } else {
                    return true
                }
            },
            handleVidChange(file) {
                this.video = file.raw;
            },
            uploadVidFile() {
                this.loading = true;
                var windowURL = window.URL || window.webkitURL;
                var videoURL = windowURL.createObjectURL(this.video);
                var video = document.getElementById('video');
                this.form.video_path = videoURL;
                video.src = videoURL;
                var scale = 0.8;
                video.setAttribute('crossOrigin', 'anonymous');
                video.setAttribute("preload", 'auto');
                video.addEventListener("loadedmetadata", function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth * scale;
                    canvas.height = video.videoHeight * scale;
                    canvas
                        .getContext("2d")
                        .drawImage(video, 0, 0, canvas.width, canvas.width);
                    let imgsrc = canvas.toDataURL("image/png");
                    this.cover = imgsrc;
                    if (this.cover) {
                        let fileImg = this.base64ToBlob(this.cover);
                        var form = new FormData();
                        form.append("files", fileImg, 'image.jpg');
                        this.apiPost('/file/uploads', form).then((res) => {
                            // cover_path = res[0];
                            this.cover = res[0]
                        });
                    }
                }.bind(this));
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append('files', this.video);
                form.append('type', 'video');
                this.apiPost('/file/uploads', form).then((res) => {
                    this.real_video_path = res[0];
                    this.loading = false
                })
            },
            //base64解码，解码视频第一帧
            base64ToBlob(urlData) {
                var arr = urlData.split(',');
                var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
                // 去掉url的头，并转化为byte
                var bytes = window.atob(arr[1]);
                // 处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], {
                    type: mime
                });
            },
            handleSubmit() {
                if (!this.form.task_title) {
                    this.$message({
                        showClose: true,
                        message: '请填写职位名称',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.payment_money) {
                    this.$message({
                        showClose: true,
                        message: '请填写佣金',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.quantity_max) {
                    this.$message({
                        showClose: true,
                        message: '请填写招募人数',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.industry) {
                    this.$message({
                        showClose: true,
                        message: '请选择适合行业',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.city) {
                    this.$message({
                        showClose: true,
                        message: '请选择城市',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.goods_title) {
                    this.$message({
                        showClose: true,
                        message: '请输入产品名称',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.goods_price) {
                    this.$message({
                        showClose: true,
                        message: '请输入产品价格',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.goods_desc) {
                    this.$message({
                        showClose: true,
                        message: '请完善产品描述',
                        type: 'error',
                        duration: 500
                    })
                } else if (!this.form.image_arr) {
                    this.$message({
                        showClose: true,
                        message: '请上传产品图片',
                        type: 'error',
                        duration: 500
                    })
                } else {
                    // var cover_path = '';
                    if (this.form.city === '不限') {
                        this.form.city = [0, 0]
                    }
                    var data = {
                            type_label_id: 1091,
                            quantity_max: this.form.quantity_max,
                            task_title: this.form.task_title,
                            payment_method: 1,
                            unit: '元',
                            payment_money: this.form.payment_money,
                            industry_arr: this.industry_arr,
                            city_id: this.form.city[1],
                            goods_title: this.form.goods_title,
                            goods_price: this.form.goods_price,
                            goods_desc: this.form.goods_desc,
                            image_arr: this.form.image_arr,
                            status: 1,
                            video_path: this.real_video_path,
                            video_cover: this.cover,
                        };
                    console.log(data);
                    if (this.isUpdata) {
                        // console.log(res)

                        var task_edit = JSON.parse(sessionStorage.getItem('task'));
                        this.apiPost('/api/task/update/' + task_edit.id, data).then((res) => {
                            if (res) {
                                sessionStorage.removeItem('task');
                                this.$router.push({
                                    name: "work",
                                    params: {
                                        activeName: 'task_work'
                                    }
                                });
                            }
                        })
                    } else {
                        this.apiPost('/api/task/create', data).then((res) => {
                            if (res) {
                                sessionStorage.removeItem('task');
                                this.$router.push({
                                    name: "work",
                                    params: {
                                        activeName: 'task_work'
                                    }
                                });
                            }

                        })
                    }
                }
            },
            handleEdit(id) {
                this.apiGet('/api/task/info/' + id).then((res) => {
                    console.log(res)
                    this.form.task_title = res.task_title;
                    this.form.payment_money = res.payment_money;
                    this.form.quantity_max = res.quantity_max;
                    if (res.city) {
                        this.form.city = [0]
                        this.form.city.push(res.city.city_id);
                        this.cityName = res.city.city_name;
                    } else {
                        this.form.city = "不限"
                        this.cityName = "不限"
                    }
                    this.form.industry = res.industry;
                    forEach(res.industry, item => {
                        this.industry_arr.push(item.label_id)
                    });
                    this.form.goods_desc = res.goods.description;
                    this.form.goods_title = res.goods.goods_title;
                    this.form.goods_price = res.goods.goods_price;
                    if (res.images.length > 0) {
                        this.show_pic = res.images;
                        this.form.image_path = res.images;
                        // console.log(res)
                       /* forEach(res.images, item => {
                            this.form.image_arr.push(item.file_path.split('com')[1])
                        })*/
                    }
                    if (res.video) {
                        this.form.video_path = res.video.file_path;
                        this.real_video_path = res.video.file_path.split('com')[1];
                        this.cover = res.video.cover.split('com')[1]
                    }
                });
            }
        },
        watch: {
            isUpdata() {
                if (this.isUpdata && this.isShow) {
                    this.edit = '';
                    var task_edit = JSON.parse(sessionStorage.getItem('task'));
                    this.handleEdit(task_edit.id)
                }
            },
            isHistory() {
                if (this.isHistory && this.isHistoryId && this.isShow) {
                    this.edit = '';
                    this.handleEdit(this.isHistoryId)
                }
            }
        },
        mixins: [http]
    }
</script>

<style lang="less" type="text/less">
    .sale {
        width: 100%;

        .title {
            width: 100%;
            height: 79px;
            background: rgba(247, 248, 250, 1);
            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12);
            font-size: 16px;

            p {
                color: #4D4D4D;
                margin: 0 auto;
                padding: 31px;
                text-align: left;
                width: 1000px;
                cursor: pointer;
            }

            span:nth-child(2) {
                color: #24BFFF;
            }
        }

        .contain {
            width: 1000px;
            margin: 0 auto;
            padding: 50px 0 0 117px;
            box-sizing: border-box;

            .basic {
                text-align: left;

                .basic_title {
                    display: flex;

                    .icon {
                        width: 3px;
                        height: 16px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 2px;
                        margin-right: 11px;
                        align-self: center;
                    }

                    p {
                        font-size: 16px;
                        color: #4D4D4D;
                        margin: 0;
                    }
                }

                .basic_info {
                    padding-left: 13px;
                    font-size: 14px;
                    color: #4D4D4D;

                    .note {
                        margin-top: 12px;
                        color: #B3B3B3;
                        font-size: 12px;
                        margin-bottom: 50px;
                    }

                    .el-form-item {
                        margin-bottom: 28px;
                    }

                    .el-form-item:nth-last-child(1) {
                        margin-bottom: 50px;
                    }

                    .el-form-item:nth-child(4), .el-form-item:nth-child(2) {
                        .el-form-item__content {
                            display: flex;
                            justify-content: flex-start;

                            p {
                                z-index: 2;
                                margin: 0 0 0 -26px;
                            }
                        }
                    }

                    .el-cascader {
                        .el-icon-arrow-down {
                            transform: rotateZ(-90deg) !important;
                        }

                        .is-reverse {
                            transform: rotateZ(0deg) !important;
                        }
                    }

                    .el-form-item__label {
                        padding: 0 11px 0 0;
                        box-sizing: border-box;
                    }

                    .el-input {
                        width: 468px;
                    }

                    .el-input__inner {
                        border-radius: 0;
                        border-color: #D5DADF;
                    }

                    .el-input.is-active .el-input__inner, .el-input__inner:focus {
                        border-color: #24BFFF
                    }

                    .line {
                        width: 573px;
                        height: 1px;
                        border-top: 1px dashed rgba(213, 218, 223, 1);
                        background: none;
                        margin-bottom: 50px;
                    }
                }

                .ask {
                    margin-top: 50px;

                    .el-form {
                        margin-left: 13px;

                        .el-form-item {
                            margin-bottom: 28px;
                        }

                        .el-form-item:nth-last-child(1) {
                            margin-bottom: 0;
                        }

                        .el-form-item:nth-child(2) {
                            .el-form-item__content {
                                display: flex;
                                justify-content: flex-start;

                                p {
                                    margin: 0 0 0 -26px;
                                    z-index: 2;
                                }
                            }
                        }

                        .el-select, .el-textarea {
                            width: 468px;
                        }

                        .el-textarea__inner {
                            border-radius: 0;
                            border-color: #D5DADF;
                            padding: 9px 16px;
                        }

                        .el-textarea__inner:focus {
                            border-color: #24BFFF
                        }

                        .el-form-item__label {
                            padding: 0 11px 0 0;
                            box-sizing: border-box;
                        }

                        .el-input {
                            width: 468px;
                        }

                        .el-input__inner {
                            border-radius: 0;
                            border-color: #D5DADF;
                        }

                        .el-input.is-active .el-input__inner, .el-input__inner:focus {
                            border-color: #24BFFF
                        }
                    }

                    .picture {
                        width: 468px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(213, 218, 223, 1);
                        padding: 13px 7px 20px 15px;
                        box-sizing: border-box;

                        p {
                            margin: 0 0 18px 0;
                            text-align: left;
                            color: rgba(179, 179, 179, 1);
                            line-height: 14px;
                        }

                        .el-upload {
                            width: 140px;
                            height: 140px;
                            line-height: 140px;
                            border-radius: 0;
                        }

                        .el-upload-list__item {
                            width: 140px;
                            height: 140px;
                            margin: 0 8px 0 0;
                            border-radius: 0
                        }
                    }

                    .video {
                        width: 468px;
                        background: rgba(255, 255, 255, 1);
                        border: 1px solid rgba(213, 218, 223, 1);
                        padding: 13px;
                        box-sizing: border-box;
                        margin-bottom: 50px;

                        video {
                            width: 100%;
                        }

                        .operation {
                            display: flex;
                            margin-bottom: 18px;

                            /*.delect {
                                width: 80px;
                                height: 30px;
                                line-height: 30px;
                                background: rgba(247, 253, 255, 1);
                                border: 1px solid rgba(36, 191, 255, 1);
                                border-radius: 15px;
                                margin-right: 12px;
                                text-align: center;
                                font-size: 14px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(36, 191, 255, 1);
                            }*/

                            div:nth-child(1) {
                                width: 125px;
                                height: 32px;
                                line-height: 32px;
                                background: rgba(36, 191, 255, 1);
                                border-radius: 15px;
                                font-size: 14px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: rgba(255, 255, 255, 1);
                                text-align: center;
                            }
                        }

                        p {
                            margin: 0 0 18px 0;
                            text-align: left;
                            color: rgba(179, 179, 179, 1);
                            line-height: 14px;
                        }

                        .el-upload {
                            width: 100%;
                            height: 100%;
                            border-radius: 0;

                            .avatar-uploader-icon {
                                width: 100%;
                            }

                            p {
                                font-size: 14px;
                                text-align: center;
                                color: rgba(36, 191, 255, 1);
                                position: absolute;
                                top: 200px;
                                left: 192px;
                                margin-bottom: 0;
                            }
                        }

                    }

                    .line {
                        width: 573px;
                        height: 1px;
                        border-top: 1px dashed rgba(213, 218, 223, 1);
                        background: none;
                        margin-bottom: 50px;
                    }

                    p {
                        margin-left: 338px;
                        margin-top: 21px;
                        margin-bottom: 21px;
                        text-align: left;
                        color: #808080;
                        font-size: 14px;

                        span {
                            color: #24BFFF;
                        }
                    }

                    .submit {
                        margin-left: 450px;
                        width: 125px;
                        height: 30px;
                        background: rgba(36, 191, 255, 1);
                        border-radius: 15px;
                        color: white;
                        border: none;
                        margin-bottom: 140px;
                    }
                }
            }
        }
    }

    .edit_show {
        position: absolute;
        z-index: 2;
        top: -45%;
        left: 15px;
        transform: translateY(50%);
        margin: 0 !important;
        height: 38px;
        line-height: 38px;
        color: #808080;
    }

    .show_pic {
        .edit_img {
            width: 140px;
            height: 140px;
            display: inline-block;
            margin-right: 8px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }

            span {
                position: absolute;
                top: 0;
                left: 0;
                width: 140px;
                height: 140px;
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
        .upload_img{
            display: inline;
            div{
                display: inline;
                .el-upload{
                    display: inline-block;
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
                width: 30px!important;
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

    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #B3B3B3;

    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #B3B3B3;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #B3B3B3;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 500;
        color: #B3B3B3;
    }

    [class*=" el-icon-"], [class^=el-icon-] {
        vertical-align: middle;
    }
</style>