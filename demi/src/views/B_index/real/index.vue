<template>
  <div class="right">
    <div class="real_header">
      <span></span>
      <span>实名认证</span>
    </div>
    <div class="real_main">
      <div class="real_wrap" v-show="status === 0">
        <p>身份证正面</p>
        <el-upload
                action=""
                class="avatar-uploader"
                :on-change="handleChange"
                :before-upload="beforePicUpload"
                :http-request="uploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../assets/img/real_1.png">
        </el-upload>
       <!-- <el-upload
                class="avatar-uploader"
                action="http://app.jmzhipin.com/api/tools/ocr/idcard"
                :show-file-list="false"
                :on-change= "showReal"
                :auto-upload="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../assets/img/real_1.png">
        </el-upload>-->
        <p>身份证背面</p>
        <el-upload
                action=""
                class="avatar-uploader"
                :on-change="handleChange"
                :before-upload="beforePicUpload"
                :http-request="uploadFile"
                :limit='1'
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../assets/img/real_2.png">
        </el-upload>
        <!--<el-upload
                class="avatar-uploader"
                action="http://app.jmzhipin.com/api/tools/ocr/idcard"
                :show-file-list="false"
                :on-change= "showReal"
                :auto-upload="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-else class="el-icon-plus avatar-uploader-icon" src="../../../assets/img/real_2.png">
        </el-upload>-->
        <div class="demo-input-suffix">
          <div class="real_info" style="margin-top: 40px">
            <span>姓&nbsp;&nbsp;&nbsp;名：</span>
            <el-input
                    placeholder="证件姓名须与简历姓名一致"
                    v-model="name">
            </el-input>
          </div>
          <div style="width:100%;height:1px;background:rgba(230,230,230,1);"></div>
          <div class="real_info">
            <span>证件号：</span>
            <el-input
                    placeholder="与证件一致"
                    v-model="card_number">
            </el-input>
          </div>
          <button>确认无误</button>
        </div>
      </div>
      <div class="none_real" v-show="status === 1">
        <p>您已完成实名认证</p>
        <p>可以去发布岗位啦!</p>
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
        imageUrl: '',
        name: '',
        card_number: '',
        status:null,
        files:null,
      };
    },
    mounted(){
      this.$store.commit('loading', true);
      this.apiGet('/api/user/info').then((res) => {
        if(res.type === 2){
          this.status = res.status;
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
      handleChange(file, fileList) {
        this.files = fileList;
      },
      beforePicUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只限 JPG,PNG 格式!');
        }else{
          this.imageUrl = URL.createObjectURL(file.raw);
        }
        return isJPG || isPNG;
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
          console.log(res)
        })
      },
      /*showReal(file, fileList) {
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }else if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }else{
          this.imageUrl = URL.createObjectURL(file.raw);
        }
        console.log(fileList)
      },*/
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
      height: 766px;
      background: #FFFFFF;
      border-radius:8px;
      border:1px solid rgba(235, 235, 235, 1);
      position: relative;
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