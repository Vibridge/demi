<template>
  <div class="reg_header_wrapper">
    <div class="header">
      <div class="logo">
        <img src="../assets/img/demilogo@2x.png" alt="">
      </div>
      <div class="avatar">
        <div>
          <img v-if="userAvatar" :src="baseUrl + userAvatar" alt="">
          <img v-if="!userAvatar" src="../assets/img/toxiang@2x.png" alt="">
        </div>
        <p>企业用户</p>
      </div>
    </div>
  </div>
</template>

<script>
  import  "../assets/css/reset.css"
  import config from '../config'
  const baseUrl = config.baseUrl;

  export default {
    name: 'HelloWorld',
    props: {
      userAvatar :{type:String}
    },
    data(){
      return{
        baseUrl
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .reg_header_wrapper{
    width:100%;
    font-family: MicrosoftYaHei;
    background: rgba(50,55,62,1);
    .header{
      width:1000px;
      height:50px;
      margin: 0 auto;
      .logo{
        float: left;
        width: 99px;
        height: 100%;
        padding-top: 13px;
        img{
          width: 100%;
        }
      }
      .avatar{
        float: right;
        width: 94px;
        height:50px;
        display: flex;
        div{
          align-self: center;
          img{
            width:30px;
            border-radius: 50%;
          }
        }
        p{
          align-self: center;
          color: #F5F5F7;
          font-size: 14px;
          margin-left: 8px;
          line-height: 30px;
        }
      }
    }
  }
</style>
