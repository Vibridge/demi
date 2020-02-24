<template>
  <div class="reg_header_wrapper">
    <div class="header">
      <div class="logo">
        <img src="../assets/img/demilogo@2x.png" alt="">
      </div>

        <!--//@select="handleSelect"-->
      <div class="logout">
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal" active-text-color="#fff" background-color="#2D3238">
          <el-submenu index="1">
            <template slot="title">
              <div class="avatar">
                <div>
                  <img v-if="userAvatar" :src="baseUrl + userAvatar" alt="">
                  <img v-if="!userAvatar" src="../assets/img/toxiang@2x.png" alt="">
                </div>
                <p v-if="!userName">企业用户</p>
                <p v-if="userName">{{userName}}</p>
              </div>

            </template>
            <el-menu-item index="2-1" @click="handleLoginOut">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
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
      userAvatar :{type:String},
      userName :{type:String}
    },
    data(){
      return{
        baseUrl
      }
    },
    methods:{
      handleLoginOut(){
        this.tim.logout().then(function(imResponse) {
          console.log(imResponse.data); // 登出成功
        }).catch(function(imError) {
          console.warn('logout error:', imError);
        });
        // this.$store.dispatch('logout');
        sessionStorage.clear();
        setTimeout(() => {
          window.location = '/';
        }, 800);
        /*this.$router.push({
          name: "login"
        });*/
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
      .logout{
        ul{
          align-self: center;
          border-bottom:none;
          background:none;
          float: right;
          width: 150px;
          height:50px;
          li{
            height: 50px;
            line-height: 50px;
            padding:0!important;
            .el-submenu__title{
              display: flex;
              height: 50px;
              line-height: 50px;
              .el-submenu__icon-arrow{
                display: none;
              }
              .avatar{
                display: flex;
                height: 50px;
                line-height: 50px;
                p{
                  align-self: center;
                  color: #F5F5F7;
                  font-size: 14px;
                  margin-left: 8px;
                  line-height: 30px;
                }
                img{
                  width:30px;
                  border-radius: 50%;
                }
              }

            }
          }
        }
      }

    }
  }


</style>
