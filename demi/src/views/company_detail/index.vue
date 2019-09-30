<template>
    <div class="right">
        <div class="company_detail_header">
            <span></span>
            <span>公司主页</span>
        </div>
        <div class="company_main">
            <div class="company_basic">
                <div class="logo" v-loading="loading">
                    <img :src="company_info && company_info.logo_path" alt="">
                </div>
                <div class="name">
                    <p>{{company_info && company_info.company_name}}</p>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :http-request="uploadFile"
                            :on-change="handleChange">
                        <p>点击上传LOGO</p>
                    </el-upload>
                </div>
            </div>
            <div class="company_another">
                <div class="company_label">
                    <p class="label_title">公司视频</p>
                    <div v-if="company_info && company_info.video" class="company_video" v-loading="loading">
                        <video controls :src="company_info.video[0].file_path"></video>
                    </div>
                    <div class="video_ing" v-if="company_info && !company_info.video">
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
                    <div class="reupload" v-if="company_info && company_info.video">
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
                    <p class="label_title">公司视频</p>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../libs/http'
    import {getType} from "../../libs/http";
    export default {
        name: 'index',
        data(){
            return {
                id:null,
                company_info:null,
                file:null,
                avatar:null,
                video:null,
                loading:false,
            }
        },

        created() {
            this.getRouterData()
        },

        methods: {
            //路由传参
            getRouterData() {
                this.id = this.$route.query.id
            },
            handleChange(file) {
                this.file = file.raw
            },
            beforeAvatarUpload(file) {
                this.loading = true
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只限 JPG,PNG 格式!');
                }
                return isJPG || isPNG;
            },
            uploadFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files",this.file);
                this.apiPost('/file/uploads', form).then((res)=>{
                    console.log(res)
                    if(res){
                        this.loading = false
                        this.avatar = res[0]
                    }
                    // this.imageUrl = this.action + res[0];
                    // this.formParams.cover_path = res[0];
                })
            },

            beforeVidUpload(file) {
                console.log(file)
                if (! /\.(?:mp4|rmvb|avi|ts|ogg|flv|wmv|mkv)$/.test(file.name.toLowerCase())){
                    this.$message.error('上传头像图片只限 mp4,rmvb,avi,ts,ogg,flv,wmv,mkv 格式!');
                    return false
                }else{
                    return true
                }
            },
            uploadVidFile() {
                // 创建表单对象
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append("files",this.file);
                form.append('type','video')
                this.apiPost('/file/uploads', form).then((res)=>{
                    console.log(res)
                    this.video = res[0]
                    // this.imageUrl = this.action + res[0];
                    // this.formParams.cover_path = res[0];
                })
            },
        },
        watch:{
            id(){
                if(this.id){
                    if(getType){
                        this.apiGet('/api/company/info/' + this.id).then((res) =>{
                            this.company_info = res;
                            console.log(res);
                        });
                    }
                }
            }
        },
        mixins:[http]
    }
</script>

<style type="text/less" lang="less">
    .right {
        width: 100%;
        font-family: MicrosoftYaHei;
        .company_detail_header{
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
        .company_main{
            width:724px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(235, 235, 235, 1);
            border-radius:8px;
            .company_basic{
                padding: 34px 38px;
                display: flex;
                background:rgba(245,246,247,1);
                border-radius:7px 7px 0px 0px;
                .logo{
                    align-self: center;
                    width:80px;
                    height:80px;
                    margin-right: 34px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius:50%;
                    }
                }
                .name{
                    align-self: center;
                    font-size:16px;
                    p{
                        color:rgba(77,77,77,1);
                        margin-bottom: 13px;
                    }
                    .avatar-uploader{
                        text-align: left;
                        p{
                            font-size:13px;
                            color:rgba(153,153,153,1);
                            margin-bottom: 0;
                        }
                    }
                }
            }
            .company_another{
                padding: 30px 39px;
                .company_label{
                    display: flex;
                    .label_title{
                        font-size:14px;
                        color:rgba(77,77,77,1);
                        margin-right: 33px;
                    }
                    .company_video{
                        width: 468px;
                        video{
                            width: 100%;
                        }
                    }
                    .video_ing{
                        width: 468px;
                        height: 254px;
                        border:1px solid rgba(213, 218, 223, 1);
                        position: relative;
                        img{
                            width: 100%;
                            position: absolute;
                            top:50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                        }
                        p{
                            position: absolute;
                            top:70%;
                            left:50%;
                            transform: translateX(-55%);
                            font-size:14px;
                            color:rgba(36,191,255,1);
                        }
                    }
                    .reupload{
                        width:81px;
                        height:27px;
                        background:rgba(36,191,255,1);
                        border-radius:14px 13px 13px 0px;
                        font-size:12px;
                        color:rgba(255,255,255,1);
                        margin-left: 8px;
                        line-height: 27px;
                    }
                }
            }
        }
    }
</style>