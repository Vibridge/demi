<template>
    <div style="width: 100%;height: 100%;position: relative">
        <Headers :user-avatar="user_avatar"></Headers>
        <div class="main">
            <div class="left">
                <div v-if="first" class="first">
                    <h1>基本信息</h1>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :before-upload="beforeAvatarUpload"
                            :http-request="uploadAvatarFile"
                            :on-change="showAvatar"
                            :show-file-list="false"
                            :auto-upload="false"
                    >
                        <img v-if="user_avatar" :src="user_avatar" class="avatar">
                        <img v-else class="el-icon-plus avatar-uploader-icon" slot="trigger" src="../../assets/img/ndtx@2x.png">
                    </el-upload>
                    <p>你的头像</p>
                    <div class="form">
                        <p>姓名</p>
                        <el-input v-model="name" placeholder="请输入姓名"></el-input>
                        <p>你的职务</p>
                        <el-input v-model="work" placeholder="请输入职务名称"></el-input>
                        <p>公司全称</p>
                        <el-input v-model="license" placeholder="必须与公司营业执照一致"></el-input>
                    </div>
                    <div style="margin-right: 154px;text-align: right;">
                        <button @click="handleSecond">下一步</button>
                    </div>
                </div>
                <div class="second" v-if="second">
                    <h1>公司信息</h1>
                    <div style="display: flex;margin-bottom: 29px">
                        <el-upload
                                class="avatar-uploader"
                                action="http://app.jmzhipin.com/api/company/create"
                                :show-file-list="false"
                                :on-change= "showLogo"
                                :auto-upload="false"
                        >
                            <img v-if="logo" :src="logo" class="avatar">
                            <img v-else class="el-icon-plus avatar-uploader-icon" src="../../assets/img/ndtx@2x.png">
                        </el-upload>
                        <div style="align-self: center;margin-left: 24px;font-size: 16px;text-align: left">
                            <p style="color: #999999;margin-bottom: 17px">上传公司LOGO</p>
                            <p style="color: #4D4D4D">{{this.license}}</p>
                        </div>
                    </div>
                    <div class="form">
                        <p>公司简称</p>
                        <el-input v-model="company_name" placeholder="请输入公司简称"></el-input>
                        <p>公司地址</p>
                        <el-input v-model="company_address" placeholder="广东省广州市番禺区"></el-input>
                        <p>公司行业</p>
                        <el-input v-model="company_industry" placeholder="请选择" @focus="SelectIndustry"><img src="../../assets/img/icon_return @2x.png" slot="suffix" class="el-input__icon el-icon-date"></el-input>
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
                            action="http://app.jmzhipin.com/api/company/create"
                            :show-file-list="false"
                            :on-change= "showPass"
                            :auto-upload="false"
                    >
                        <img v-if="pass" :src="pass" class="avatar">
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
                    <div style="margin: 0 auto;width: 317px;">
                        <button @click="handleBackSecond">上一步</button>
                        <button @click="handleSubmit">确认提交</button>
                    </div>
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
                </div>
            </div>
        </div>
        <el-dialog
                title="请选择公司行业"
                :visible.sync="dialogVisible"
                width="850px"
        >
      <span>
        <ul>
          <li class="industry" v-for="item in lists" :key="item.label_id" @click="handleIndustry(item.label_id,item.name)">{{item.name}}</li>
        </ul>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    import "../../assets/css/reset.css"
    import Headers from "../../components/reg_header.vue"
    import http from '../../libs/http';
    // import config from '../libs/http';
    // const suffixUrl = config.suffixUrl;
    /* eslint-disable */

    export default {
        components:{
            Headers
        },
        name: 'home',
        data() {
            return {
                user_avatar: '',
                logo:'',
                pass:'',
                name:'',
                work:'',
                license:'',
                company_name:'',
                company_address:'',
                company_industry:'',
                label_id :null,
                dialogVisible: false,
                company_staff:'',
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
                company_stage:'',
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
                },
                    {
                        value: '选项6',
                        label: 'D轮及以上'
                    },
                    {
                        value: '选项7',
                        label: '已上市'
                    },
                    {
                        value: '选项8',
                        label: '不需要融资'
                    }],
                first:true,
                second:false,
                third:false,
                lists:{}
            };
        },
        mounted(){

        },
        methods: {
            scrollTop(){
                document.getElementsByClassName('reg_header_wrapper')[0].scrollIntoView();
            },
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
            //展示上传图片
            showAvatar(file, fileList) {
                const isJPG = file.raw.type === 'image/jpeg';
                const isPNG = file.raw.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }else if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }else{
                    this.user_avatar = URL.createObjectURL(file.raw);
                }
                console.log(fileList)
            },
            showLogo(file, fileList) {
                const isJPG = file.raw.type === 'image/jpeg';
                const isPNG = file.raw.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }else if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }else{
                    this.logo = URL.createObjectURL(file.raw);
                }
                console.log(fileList)
            },
            showPass(file, fileList) {
                const isJPG = file.raw.type === 'image/jpeg';
                const isPNG = file.raw.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }else if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }else{
                    this.pass = URL.createObjectURL(file.raw);
                }
                console.log(fileList)
            },
            //选择公司行业
            SelectIndustry(){
                this.dialogVisible = true;
                this.apiGet('/labels?id=992').then((res)=>{
                    this.lists = res;
                });
                var industry = document.getElementsByClassName('industry');
                var length = industry.length;
                if(this.company_industry){
                    for (var i = 0;i<length;i++){
                        industry[i].classList.remove('active_li');
                        if(this.company_industry === industry[i].innerHTML){
                            industry[i].classList.add('active_li');
                        }
                    }
                }
            },
            handleIndustry(id,name){
                this.company_industry = name;
                this.dialogVisible = false;
                this.label_id = id;
            },
            //下一步
            handleSecond(){
                if(!this.user_avatar){
                    this.$message({
                        showClose: true,
                        message: '请上传头像',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.name){
                    this.$message({
                        showClose: true,
                        message: '请完善姓名信息',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.work){
                    this.$message({
                        showClose: true,
                        message: '请完善职务信息',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.license){
                    this.$message({
                        showClose: true,
                        message: '请填写公司名称',
                        type: 'error',
                        duration:500
                    })
                }else{
                    this.first = false;
                    this.second = true;
                    this.scrollTop()
                }
            },
            handleFirst(){
                this.first = true;
                this.second = false;
                this.scrollTop()
            },
            handleThird(){
                if(!this.logo){
                    this.$message({
                        showClose: true,
                        message: '请上传公司logo',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.company_name){
                    this.$message({
                        showClose: true,
                        message: '请填写公司简称',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.company_address){
                    this.$message({
                        showClose: true,
                        message: '请完善公司地址',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.company_industry){
                    this.$message({
                        showClose: true,
                        message: '请选择公司行业',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.company_staff) {
                    this.$message({
                        showClose: true,
                        message: '请选择人员规模',
                        type: 'error',
                        duration: 500
                    })
                }else if(!this.company_stage) {
                    this.$message({
                        showClose: true,
                        message: '请选择发展阶段',
                        type: 'error',
                        duration: 500
                    })
                }else{
                    this.second = false;
                    this.third = true;
                    this.scrollTop()
                }
            },
            handleBackSecond(){
                this.second = true;
                this.third = false;
                this.scrollTop()
            },
            handleSubmit(){
                if(this.pass){
                    this.$router.push({
                        name: "B_index"
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '请上传营业执照',
                        type: 'error',
                        duration: 500
                    })
                }
            }

        },
        mixins: [http],
        watch:{
            second(){
                if(this.second || this.third){
                    document.getElementsByClassName('main')[0].style.height = '761px';
                }else if(this.first){
                    document.getElementsByClassName('main')[0].style.height = '650px';
                }
            }
        }
    }
</script>
<style lang="less" type="text/less">
    a{
        color: white;
    }
    .main{
        margin: 110px auto;
        width: 930px;
        height: 650px;
        font-family: MicrosoftYaHei;
        border-radius: 10px;
        box-shadow:0 3px 16px 0 rgba(7,14,54,0.12);
        .left{
            width: 698px;
            height: 100%;
            text-align: center;
            display: inline-block;
            background: #fff;
            border-radius:10px 0 0 10px;
            .first{
                h1{
                    margin-bottom: 30px;
                    margin-top: 42px;
                    color: #464646;
                    font-size: 24px;
                }
                p{
                    margin: 17px 0 42px 0;
                    color: #808080;
                    font-size: 15px;
                }
                .form{
                    p{
                        color: #808080;
                        font-size: 15px;
                        margin-bottom: 9px;
                        margin-left: 176px;
                        text-align: left;
                    }
                    .el-input{
                        margin-bottom: 28px;
                        width:390px;
                        height:40px;
                        .el-input__inner{
                            border-radius:21px;
                            background:rgba(247,247,247,1);
                            border-color:rgba(0,0,0,.0);
                            color: #4D4D4D;
                            font-size: 16px;
                            height: 40px;
                            line-height: 40px;
                            padding:0 20px;
                        }
                        .el-input.is-active .el-input__inner, .el-input__inner:focus{
                            border-color: #24BFFF!important;
                            background: #fff;
                        }
                    }
                }
                button{
                    font-family: MicrosoftYaHeiLight;
                    width:120px;
                    height:42px;
                    background:rgba(36,191,255,1);
                    border-radius:21px;
                    border: none;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
            .second{
                h1{
                    margin-bottom: 30px;
                    padding-top: 42px;
                    color: #464646;
                    font-size: 24px;
                }
                .avatar-uploader{
                    text-align: left;
                }
                .avatar-uploader .el-upload {
                    border-radius: 6px;
                    border: 1px solid #f0f0f0;
                    background:rgba(247,247,250,1);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    margin-left: 154px;
                }
                .form{
                    p{
                        color: #808080;
                        font-size: 15px;
                        margin-bottom: 9px;
                        margin-left: 176px;
                        text-align: left;
                    }
                    .el-select{
                        .el-input{
                            margin-bottom: 28px;
                            width:390px;
                            height:40px;
                            .el-input__suffix{
                                right: 20px;
                                top:10%;
                            }
                            .el-input__icon{
                                width: 9px;
                                height:40px;
                            }
                        }
                    }
                    .el-select .el-input .el-select__caret{
                        font-size:16px;
                        color: #808080;
                        transform:rotateZ(90deg)
                    }
                    .el-select .el-input .el-select__caret.is-reverse{
                        transform:rotateZ(180deg);
                    }

                    .el-input{
                        margin-bottom: 28px;
                        width:390px;
                        height:40px;
                        .el-input__suffix{
                            right: 21px;
                            top: 50%;
                            transform: translateY(-20%);
                        }
                        .el-input__icon{
                            width: 9px;
                            height: auto;
                        }
                        .el-input__inner{
                            border-radius:21px;
                            background:rgba(247,247,247,1);
                            border-color:rgba(0,0,0,.0);
                            color: #4D4D4D;
                            font-size: 16px;
                            height: 40px;
                            line-height: 40px;
                            padding:0 20px;
                        }
                        .el-input.is-active .el-input__inner, .el-input__inner:focus{
                            border-color: #24BFFF!important;
                            background: #fff;
                        }
                    }
                }
                button:nth-child(1){
                    font-family: MicrosoftYaHeiLight;
                    width:120px;
                    height:42px;
                    background:#fff;
                    border-radius:21px;
                    border: 1px solid rgba(36,191,255,1);
                    color: rgba(36,191,255,1);
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                button:nth-last-child(1){
                    font-family: MicrosoftYaHeiLight;
                    width:120px;
                    height:42px;
                    background:rgba(36,191,255,1);
                    border-radius:21px;
                    border: none;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
            .third{
                h1{
                    margin-bottom: 42px;
                    padding-top: 42px;
                    color: #464646;
                    font-size: 24px;
                }
                .avatar-uploader .el-upload {
                    border-radius: 6px;
                    border: 1px solid #f0f0f0;
                    background:rgba(247,247,250,1);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    width: 264px;
                    height: 374px;
                }
                .avatar-uploader-icon {
                    width:120px;
                    height: 120px;
                    line-height: 120px;
                    text-align: center;
                }
                .avatar {
                    width: 100%;
                    height: auto;
                    display: block;
                    position: absolute;
                    top:50%;
                    left: 50%;
                    transform: translate3d(-50%,-50%,0);
                }
                .note{
                    width: 317px;
                    margin: 30px auto;
                    .title{
                        width: 264px;
                        display: flex;
                        justify-content: space-around;
                        color: #4D4D4D;
                        font-size: 16px;
                        margin: 0 26px 25px 26px ;
                        span{
                            border-top:1px solid #E5E5E5;
                            width: 90px;
                            height: 1px;
                            align-self: center;
                        }
                        span:nth-child(2){
                            align-self: center;
                            width: auto;
                            height: auto;
                            border-top: none;
                        }
                    }
                }
                button:nth-child(1){
                    font-family: MicrosoftYaHeiLight;
                    width:120px;
                    height:42px;
                    background:#fff;
                    border-radius:21px;
                    border: 1px solid rgba(36,191,255,1);
                    color: rgba(36,191,255,1);
                    font-size: 16px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                button:nth-last-child(1){
                    font-family: MicrosoftYaHeiLight;
                    width:186px;
                    height:42px;
                    background:rgba(36,191,255,1);
                    border-radius:21px;
                    border: none;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                }
            }
        }
        .right{
            width: 232px;
            height: 100%;
            display: inline-block;
            background:rgba(247,247,250,1);
            position: relative;
            border-radius:0 10px 10px 0;
            .right-wrapper{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate3d(-50%,-50%,0);
                padding: 0 45px 0 35px;
                width: 100%;
                .content{
                    display: flex;
                    color: #FFFFFF;
                    margin-bottom: 92px;
                    div:nth-child(1){
                        width:43px;
                        height:43px;
                        background:rgba(230,230,230,1);
                        box-shadow:0 2px 7px 0 rgba(7,14,54,0.12);
                        border-radius:50%;
                        line-height: 43px;
                        transform: translateX(95%);
                        font-size: 18px;
                    }
                    div:nth-child(2){
                        width:164px;
                        height:43px;
                        background:rgba(235,235,235,1);
                        border-radius:22px;
                        line-height: 43px;
                        font-size: 16px;
                        span{
                            margin-left: 23px;
                        }
                    }
                }
                .content:nth-last-child(1){
                    margin-bottom:0;
                }
            }
        }
    }
    .el-dialog{
        position: fixed;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        left: 50%;
        margin: 0!important;
        text-align: left;
        border-radius: 10px;
        height:500px;
    }
    .el-dialog__header{
        color: #464646;
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
        background: #fff;
        border-radius: 10px 10px 0 0;
    }
    .el-dialog__body{
        background: #f7f8fa;
        border-bottom: 1px solid #f0f0f0;
        border-radius: 0 0 10px 10px;
        height:375px;
        ul{
            li{
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
    .el-scrollbar{
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border-radius: 50%;
        background:rgba(247,247,250,1);
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
    .active_num{
        color: #24BFFF;
        background: #fff!important;
    }
    .active_text{
        background: #24BFFF!important;
    }
    .active_li{
        background: #24BFFF!important;
        color: white;
        border: none;
    }
</style>