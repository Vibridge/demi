<template>
  <div class="right">
    <div class="real_header">
      <span></span>
      <span>实名认证</span>
    </div>
    <div class="real_main">
      <p class="reason" v-if="denial_reason">*认证不通过，原因：{{denial_reason}}</p>
      <div class="real_wrap" v-show="!is_real">
        <p>身份证正面</p>
        <el-upload
                action=""
                :show-file-list="false"
                class="avatar-uploader"
                :on-change="handleFrontChange"
                :before-upload="beforePicUpload"
                :http-request="upFrontFile"
        >
          <img v-loading="Front_loading" v-if="front_img" :src="front_img" class="avatar">
          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../assets/img/real_1.png">
        </el-upload>

        <p>身份证背面</p>
        <el-upload
                action=""
                :show-file-list="false"
                class="avatar-uploader"
                :on-change="handleBackChange"
                :before-upload="beforePicUpload"
                :http-request="upBackFile"
        >
          <img v-loading="Back_loading" v-if="back_img" :src="back_img" class="avatar">
          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../assets/img/real_2.png">
        </el-upload>

        <div class="demo-input-suffix">
          <div class="real_info" style="margin-top: 40px">
            <span>姓&nbsp;&nbsp;&nbsp;名：</span>
            <el-input
                    placeholder="证件姓名须与简历姓名一致"
                    v-model="card.name">
            </el-input>
          </div>
          <div style="width:100%;height:1px;background:rgba(230,230,230,1);"></div>
          <div class="real_info">
            <span>证件号：</span>
            <el-input
                    placeholder="与证件一致"
                    v-model="card.number">
            </el-input>
          </div>
          <button @click="handleCard">确认无误</button>
        </div>
      </div>
      <div class="none_real" v-show="is_real && loading">
        <img src="../../../assets/img/success.png" alt="">
        <p>您已完成实名认证</p>
        <p>可以去发布岗位啦!</p>
      </div>
      <div class="none_real" v-show="is_real && !loading">
        <img src="../../../assets/img/in_autonym@2x.png" alt="">
        <p>你的材料已提交</p>
        <p>我们将会在一个工作日内完成审核</p>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import http from '../../../libs/http'
  export default {
    name: 'real',
    data() {
      return {
        front_img: '',
        back_img:'',
        is_real:false,
        files:null,
        Front_loading:'',
        Back_loading:'',
        card:{
          image_front:null,
          image_behind:null,
          number:null,
          name:null,
          real_status:1,
        },
        denial_reason:'',
        loading:false
      };
    },
    mounted(){
      this.$store.commit('loading', true);
      this.apiGet('/api/user/info').then((res) => {
        if(res.type === 2){
          if(res.card && res.card.status === 3){
            this.is_real = true;
            this.loading = true;
            this.denial_reason = ''
          }else if((!res.card) || (res.card && res.card.status === 2)){
            if(res.card.denial_reason){
              this.denial_reason = res.card.denial_reason;
            }
            this.is_real = false;
          }
          console.log(res)
        }else{
          this.$message({
            showClose: true,
            message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
            duration:1000
          });
          this.$router.push({
            name: "login"
          });
        }
        this.$store.commit('loading', false);
      })
    },
    methods: {
      handleFrontChange(file){
        this.file = file.raw;
        this.front_img = URL.createObjectURL(this.file);
      },
      handleBackChange(file){
        this.file = file.raw;
        this.back_img = URL.createObjectURL(this.file);
      },
      beforePicUpload(file) {
        this.Front_loading = true;
        this.Back_loading = true;
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只限 JPG,PNG 格式!');
        }
        return isJPG || isPNG;
      },
      upFrontFile() {
        // 创建表单对象
        let form = new FormData();
        // 后端接受参数 ，可以接受多个参数
        form.append("files", this.file);
        form.append('card_side','FRONT')
        this.apiPost('/api/tools/ocr/idcard', form).then((res) => {
          console.log(res)
          if(res){
            this.card.image_front = res[0].file_path
            console.log(this.card.image_front)

          }
        })
      },
      upBackFile() {
        // 创建表单对象
        let form = new FormData();
        // 后端接受参数 ，可以接受多个参数
        form.append("files", this.file);
        form.append('card_side','BACK');
        this.apiPost('/api/tools/ocr/idcard', form).then((res) => {

          if(res){
            this.card.image_behind = res[0].file_path;
            console.log(this.card.image_behind)
          }
        })
      },
      handleCard(){
        if(!this.card.image_front || !this.card.image_behind || !this.card.name || !this.card.number){
          this.$message("请上传完整的信息！")
        }else{
          this.apiPost('/api/user/update',this.card).then((res)=>{
            console.log(res)
          })
        }
      }
    },
    mixins:[http]
  }
</script>

<style type="text/less" lang="less">
  .right{
    width: 100%;
    font-family: MicrosoftYaHeiLight;
    .real_header{
      padding: 20px 0 29px 2px;
      box-sizing: border-box;
      text-align: left;
      font-family: MicrosoftYaHei;
      display: flex;
      span:nth-child(1){
        width: 4px;
        height: 22px;
        border-radius: 2px;
        background: #24BFFF;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
      span:nth-child(2){
        font-size: 20px;
        color: #4D4D4D;
      }
    }
    .real_main{
      margin-left: 1px;
      width: 100%;
      min-height: 766px;
      background: #FFFFFF;
      border-radius:8px;
      border:1px solid rgba(235, 235, 235, 1);
      position: relative;
      .reason{
        font-size:14px;
        color:rgba(255,78,77,1);
        line-height:31px;
        margin-top: 15px;
        margin-left: 18px;
        text-align: left;
      }
      .real_wrap{
        width: 268px;
        margin: 0 auto;
        font-family:MicrosoftYaHei;
        text-align: left;
        p{
          font-weight:400;
          color:rgba(153,153,153,1);
          margin-bottom: 11px;
          margin-top: 37px;
        }
        img{
          width: 100%;
        }
        .real_info{
          display: flex;
          width: 100%;
          height:45px;
          justify-content: space-between;
          .el-input{
            width: 209px;
            align-self: center;
          }
          .el-input__inner{
            border:none;
            height:45px;
            line-height: 45px;
            color: #4D4D4D;
          }
          span{
            align-self: center;
            color:rgba(128,128,128,1);
            margin-bottom: 2px;
          }
        }
        button{
          margin-top: 30px;
          width: 100%;
          height:34px;
          background:rgba(36,191,255,1);
          border-radius:17px;
          border: none;
          color: #FFFFFF;
        }
      }
      .none_real{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        color: #999999;
        img{
          width: 314px;
          margin-bottom: 94px;
        }
        p{
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
    ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
      font-family: MicrosoftYaHeiLight;
      color: #D9D9D9;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      font-family: MicrosoftYaHeiLight;
      color: #D9D9D9;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      font-family: MicrosoftYaHeiLight;
      color: #D9D9D9;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      font-family: MicrosoftYaHeiLight;
      color: #D9D9D9;
    }
  }
</style>