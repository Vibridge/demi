<template>
    <div class="sale">
        <div class="title">
            <p>发布销售代理任务</p>
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
                        <el-form-item label="* 职位名称：">
                            <el-input v-model="form.task_title" placeholder="请输入职位名称"></el-input>
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
                                         placeholder="请选择行业" @focus="handleType"
                                         @change="handleLabel"></el-cascader>
                        </el-form-item>
                        <el-form-item label="发布城市：">
                            <el-cascader :options="city_tree" v-model="form.city" :show-all-levels="false"
                                         :props="{ label:'city_name', value:'city_id'}" placeholder="请选择城市"
                                         @focus="handleCity"></el-cascader>
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
                            <el-input v-model="form.goods_title" placeholder="请输入职位名称"></el-input>
                        </el-form-item>
                        <el-form-item label="产品价格：">
                            <el-input v-model="form.goods_price" placeholder="请输入佣金"></el-input>
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
                            <div class="picture">
                                <p>必填</p>
                                <el-upload
                                        action=""
                                        list-type="picture-card"
                                        :multiple="true"
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove"
                                        :on-change="handleChange"
                                        :before-upload="beforePicUpload"
                                        :http-request="uploadFile"
                                        :limit='9'
                                        :on-exceed="handleSum"
                                >
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                        <el-form-item label="产品视频：">
                            <div class="video">
                                <p>选填</p>
                                <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :before-upload="beforeVidUpload"
                                        :http-request="uploadVidFile"
                                        :on-change="handleVidChange">
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
                    <p>我已阅读并同意<span> 《得米平台服务协议》</span></p>
                    <button @click="handleSubmit">确认发布</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../../libs/http'
    import {getType} from '../../../libs/http'
    import {forEach} from "../../../libs/tools";

    export default {
        name: 'sale',
        data() {
            return {
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
                industry_arr: [],
                files: [],
                video: null,
                real_video_path: null,
                cover: "",
                type_list: null,
                city_tree: null,
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            handleType() {
                if (getType) {
                    this.apiGet('/labels?id=1025&mode=tree').then((res) => {
                        this.type_list = res;
                    })
                }
            },
            handleLabel(res) {
                var length = res.length;
                if (length > 3) {
                    let showLabel = [];
                    showLabel.push(res[0]);
                    showLabel.push(res[1]);
                    showLabel.push(res[2]);
                    this.form.industry = showLabel;
                    this.$message({
                        showClose: true,
                        message: '最多只能选3个',
                        type: 'error',
                        duration: 500
                    })
                } else {
                    this.industry_arr = [];
                    forEach(res, item => {
                        this.industry_arr.push(item[1])
                    });
                }
            },
            handleCity() {
                if (getType) {
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
                }
            },
            handleChange(file, fileList) {
                if (this.form.image_arr.length < 9) {
                    this.files = fileList;
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
            uploadFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files[]', this.files[i].raw)
                }
                this.apiPost('/file/uploads', form).then((res) => {
                    this.form.image_arr = res;
                })
            },
            handleRemove(file, fileList) {
                this.files = fileList;
                this.uploadFile();
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
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
                }.bind(this));
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append('files', this.video);
                form.append('type', 'video');
                this.apiPost('/file/uploads', form).then((res) => {
                    this.real_video_path = res
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
                } else if (!this.form.describes) {
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
                    let fileImg = this.base64ToBlob(this.cover);
                    var form = new FormData();
                    var cover_path;
                    form.append("files", fileImg, 'image.jpg');
                    this.apiPost('/file/uploads', form).then((res) => {
                        cover_path = res;
                    });
                    var data;

                    data = {
                        task_title: this.form.task_title,
                        payment_method: 1,
                        unit: '元',
                        payment_money: this.form.payment_money,
                        industry_arr: this.industry_arr,
                        city_id: this.form.city_id[1],
                        goods_title: this.form.goods_title,
                        goods_price: this.form.goods_price,
                        goods_desc: this.form.goods_desc,
                        image_arr: this.image_arr,
                        status: 1,
                        video_path: this.real_video_path,
                        video_cover: cover_path,
                    };


                    this.apiPost('/api/task/create', data).then((res) => {
                        /*sessionStorage.removeItem('task')*/
                        this.$router.push({
                            name: "task",
                            params: {
                                activeName: 'task'
                            }
                        });
                    })

                }
            }

        },
        watch: {},
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

            p {
                font-size: 16px;
                color: #4D4D4D;
                margin: 0 auto;
                padding: 31px;
                text-align: left;
                width: 1000px;
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
                    }

                    p {
                        font-size: 16px;
                        color: #4D4D4D;
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
                                margin-left: -26px;
                                z-index: 2;
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

                    button {
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