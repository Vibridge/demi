<template>
    <div class="store_info">
        <div class="store_info_title">
            <p>店铺信息</p>
        </div>
        <div class="store_info_contain">
            <div class="store_info_basic">
                <div class="info_basic_title">
                    <span></span>
                    <p>基础信息</p>
                </div>
                <div class="info_basic">
                    <div class="store_name">
                        <p class="store_label">店铺名称：</p>
                        <p>{{shop_info && shop_info.shop_name}}</p>
                    </div>
                    <div class="store_logo">
                        <p class="store_label">店铺LOGO：</p>
                        <div class="upload_logo">
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                                    :before-upload="beforeUpload"
                                    :http-request="upLogoloadFile"
                                    :on-change="handleChange">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                    <div class="store_name">
                        <p class="store_label">店铺简介：</p>
                        <el-input
                                type="textarea"
                                placeholder="你的店铺已开启，为了方便消费者了解你的店铺，快来填写你的店铺简介吧~"
                                v-model="form.shop_poster"
                                maxlength="200"
                                show-word-limit
                                rows="7"
                        ></el-input>
                    </div>
                    <div class="store_name">
                        <p class="store_label">店铺公告：</p>
                        <el-input
                                type="textarea"
                                placeholder="请输入你想多消费着公告的信息~"
                                v-model="form.description"
                                maxlength="200"
                                show-word-limit
                                rows="7"
                        ></el-input>
                    </div>

                </div>
            </div>
            <!--<div class="store_info_connect">
                <div class="info_connect_title">
                    <span></span>
                    <p>联系方式</p>
                </div>
                <div class="info_connect">
                    <div class="store_name">
                        <p class="store_label">入驻邮箱：</p>
                        <el-input v-model="email" placeholder="请输入邮箱" size="mini"></el-input>
                    </div>
                    <div class="store_name">
                        <p class="store_label">入驻电话：</p>
                        <el-input v-model="email" placeholder="159***1234" size="mini" :disabled="true"></el-input>
                    </div>
                    <div class="store_name">
                        <p class="store_label">紧急联系人姓名：</p>
                        <el-input v-model="email" placeholder="请输入姓名" size="mini"></el-input>
                    </div>
                    <div class="store_name">
                        <p class="store_label">紧急联系人电话：</p>
                        <el-input v-model="email" placeholder="请输入电话" size="mini"></el-input>
                    </div>
                </div>
            </div>-->
        </div>
        <div class="store_info_sumbit">
            <el-button type="primary" @click="handleUpdataShop">保存</el-button>
        </div>
    </div>
</template>

<script>
    import http from '../../libs/http'
    export default {

        name: 'index',
        data() {
            return {
                form:{
                    shop_name:'',
                    shop_logo:'',
                    shop_poster:'',
                    description:''
                },
                files: '',
                pic_loading: false,
                imageUrl: '',
                email:'',
                shop_info:null
            }
        },
        inject: ['reload'],
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                console.log(res)
                if(res.type === 2){
                    if(res.shop){
                        this.shop_info = res.shop;
                        this.form.shop_name = res.shop.shop_name;
                        this.form.shop_poster = res.shop.shop_poster;
                        this.form.description = res.shop.description;
                        if(res.shop.shop_logo){
                            this.imageUrl = res.shop.shop_logo;
                        }
                        console.log(this.form)
                    }
                }else{
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
        methods: {
            handleChange(file, fileList) {
                this.files = fileList;
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                if (!isJPG && !isPNG) {
                    this.$message.error('上传图片只限 JPG,PNG 格式!');
                }
                return isJPG || isPNG;
            },
            upLogoloadFile() {
                // 创建表单对象
                // this.imageUrl = URL.createObjectURL(this.files.raw);
                this.pic_loading = true;
                console.log(this.files)
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files', this.files[i].raw);
                }
                this.handleUpload(length, form)
            },
            handleUpload(length, form) {
                this.apiPost('/file/uploads', form).then((res) => {
                    if (res) {
                        console.log(res)
                        this.imageUrl = this.$config.baseUrl + res[0];
                        this.pic_loading = false;
                    }
                });
            },
            handleUpdataShop(){
                this.apiPost('/api/shop/update/' + this.shop_info.shop_id, this.form).then((res)=>{
                    console.log(res);
                    if(res){
                        this.reload()
                    }
                })
            }
        },
        mixins:[http]

    }
</script>

<style lang="stylus">
    .store_info
        width 724px
        text-align left
        font-size 14px
        background-color #fff
        font-family: Microsoft YaHei;

        .store_info_title
            padding 19px
            border: 1px solid rgba(242, 242, 242, 1);

            p
                font-size: 20px;
                color: rgba(36, 191, 255, 1);

        .store_info_contain
            padding 0 20px 40px
            border-bottom:1px solid rgba(242,242,242,1);
            .store_info_basic,.store_info_connect
                margin-top 15px

                .info_basic_title,.info_connect_title
                    display flex

                    span
                        width: 2px;
                        height: 18px;
                        align-self center
                        margin-right 5px
                        background: rgba(36, 191, 255, 1);

                    p
                        font-size: 16px;
                        color: rgba(0, 0, 0, 1);
                        align-self center

                .info_basic
                    padding-left 53px

                    .store_name, .store_logo
                        display flex
                        margin-top 28px
                        color #999999

                        .store_label
                            width 84px
                            text-align right
                            margin-right 20px

                        .upload_logo
                            width 167px
                            height 167px
                            border: 1px solid #d9d9d9;
                            img
                                width 167px
                                height 167px

                            .avatar-uploader-icon
                                font-size: 28px;
                                color: #8c939d;
                                width: 167px;
                                height: 167px;
                                line-height: 167px;
                                text-align: center;
                        .el-textarea
                            width 471px
                            border:1px solid rgba(153,153,153,1);
                            .el-textarea__inner
                                border-radius 0
                                border:none;

                .info_connect
                    padding-left 22px
                    .store_name
                        display flex
                        margin-top 25px
                        color #999999
                        .store_label
                            width 113px
                            align-self center
                            text-align right
                        .el-input
                            width 288px
                            align-self center
                            .el-input__inner
                                border-radius 0
        .store_info_sumbit
            padding  20px 0;
            text-align center
            .el-button
                width:123px;
                border none
                border-radius:18px;
                padding 9px 42px
                font-size:18px;
                color white
                background:rgba(36,191,255,1);
</style>
