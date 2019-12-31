<template>
  <div class="profile-user">

    <avatars :src="userProfile.avatar" />
    <div class="nick-name text-ellipsis">
      <span v-if="userProfile.nick" :title=userProfile.nick>
        {{ userProfile.nick }}
      </span>
      <span v-else class="anonymous" title="该用户未设置昵称">
        <span v-if="(currentConversation.type === TIM.TYPES.CONV_C2C) && detail && (detail.recipient && detail.recipient.user_id == user_id) && currentConversation.conversationID.split('C2C')[1] !== 'dominator'">
                  {{detail.sender.nickname}}</span>

                <span v-if="(currentConversation.type === TIM.TYPES.CONV_C2C) && detail && (detail.sender && detail.sender.user_id == user_id) && currentConversation.conversationID.split('C2C')[1] !== 'dominator'">
                  {{detail.recipient.nickname}}</span>
      </span>
    </div>
    <div class="space"></div>
    <div class="nick-basic">
      <div class="title_label">个人信息</div>
      <div class="main">
        <div class="info">
          <p>出生日期</p>
          <p>邮箱</p>
        </div>
        <div class="info">
          <span v-if="user_info.birthday">{{user_info.birthday}}</span>
          <span v-if="user_info.email">{{user_info.email}}</span>
        </div>
      </div>
    </div>
    <div class="space"></div>
    <div class="work">
      <div class="title_label nav">
        <p :class="select == 'resume' ? 'resume active' : 'resume'" @click="select = 'resume'">全职简历</p>
        <p :class="select == 'ability' ? 'ability active' : 'ability'" @click="select = 'ability'">兼职简历</p>
      </div>
      <div>
        <p>产品经理</p>
        <div>
          <p>期望要求：10k-12k</p>
          <p>期望城市：广州市天河区</p>
        </div>
      </div>
      <div></div>
    </div>
    <div class="space"></div>

    <div class="edc">
      <div class="title_label">教育经历</div>
      <p v-if="resume && resume[0].diploma.school">{{resume[0].diploma.school.school_name}}</p>
     <!-- <div>
        <p>在校时间</p>
        <span>1988.10.23-1999.10.23</span>
      </div>-->
      <div>
        <p>专业</p>
        <span>{{resume[0].diploma.major}}</span>
      </div>
      <div>
        <p>学历</p>
        <span>大专</span>
      </div>
    </div>
    <div class="space"></div>

    <div class="self">
      <div class="title_label">自我评价</div>
      <p>你不要管我说什么，反正我说什么都是废话，所以你根不用管
        我说什么</p>
    </div>
    <!--<div class="gender" v-if="genderClass">
      <span :title="gender" class="iconfont" :class="genderClass"></span>
    </div>
    <el-button
      title="将该用户加入黑名单"
      type="text"
      @click="addToBlackList"
      v-if="!isInBlacklist && userProfile.userID !== myUserID"
      class="btn-add-blacklist"
      >加入黑名单</el-button
    >
    <el-button title="将该用户移出黑名单" type="text" @click="removeFromBlacklist" v-else-if="isInBlacklist">移出黑名单</el-button>
    &lt;!&ndash; 拉黑 和 反拉黑 &ndash;&gt;-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import http from '../../../../libs/http'
export default {
  props: {
    userProfile: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      user_id:null,
      user_info:{
        birthday:'',
        email:''
      },
      resume:[],
      ability:[],
      select:'resume'
    }
  },
  mounted(){
    console.log(this.detail)
    this.user_id = sessionStorage.getItem('userID');
    this.apiGet('/api/user/info?user_id=' + this.userProfile.userID).then((res)=>{
      console.log(res)
      if(res.card && res.card.birthday){
        this.user_info.birthday = res.card.birthday
      }
      this.user_info.email = res.email
      if(res.type === 1 && res.job_count > 0){
        this.apiGet('/api/vita/paginate?user_id=' + this.userProfile.userID).then((res)=>{
          console.log(res)
          this.resume = res.data
        })
      }
      if(res.type === 1 && res.ability_count > 0){
        this.apiGet('/api/ability/paginate?user_id=' + this.userProfile.userID).then((res)=>{
          console.log(res)
          this.ability = res.data
        })
      }
    })


  },
  computed: {
    ...mapState({
      blacklist: state => state.blacklist.blacklist,
      myUserID: state => state.user.currentUserProfile.userID,
      detail:state => state.conversation.detail,
      currentConversation: state => state.conversation.currentConversation

    }),
    isInBlacklist() {
      return this.blacklist.findIndex(item => item.userID === this.userProfile.userID) >= 0
    },
    gender() {
      switch (this.userProfile.gender) {
        case this.TIM.TYPES.GENDER_MALE:
          return '男'
        case this.TIM.TYPES.GENDER_FEMALE:
          return '女'
        default:
          return '未设置'
      }
    },
    genderClass() {
      switch (this.userProfile.gender) {
        case this.TIM.TYPES.GENDER_MALE:
          return 'icon-male'
        case this.TIM.TYPES.GENDER_FEMALE:
          return 'icon-female'
        default:
          return ''
      }
    }
  },
  methods: {
    addToBlackList() {
      this.tim
        .addToBlacklist({ userIDList: [this.userProfile.userID] })
        .then(() => {
          this.$store.dispatch('getBlacklist')
        })
        .catch(imError => {
          this.$store.commit('showMessage', {
            message: imError.message,
            type: 'error'
          })
        })
    },
    removeFromBlacklist() {
      this.tim.removeFromBlacklist({ userIDList: [this.userProfile.userID] }).then(() => {
        this.$store.commit('removeFromBlacklist', this.userProfile.userID)
      })
    }
  },
  mixins:[http]
}
</script>

<style lang="stylus" scoped>
.profile-user
  width 100%
  text-align center

  .avatar
    width 160px
    height 160px
    border-radius 50%
    margin 20px auto
  .nick-name
    width 100%
    color $base
    font-size 20px
    font-weight bold
    text-shadow $font-dark 0 0 0.1em
    margin-bottom 20px
    .anonymous
      color $first
      text-shadow none
  .space
    width:100%
    height:8px
    background:rgba(245,245,246,1)
  .nick-basic,.work,.edc,.self
    padding 20px
    text-align left
    .title_label
      padding-bottom 10px
      margin-bottom 10px
      font-size:16px;
      color:rgba(51,51,51,1);
      border-bottom 1px solid #E6E6E6
  .nick-basic
    .main
      font-size:14px;
      display flex
      justify-content space-between
      .info
        align-self center
        p
          color:rgba(153,153,153,1);
          margin 10px 0
        span
          margin 10px 0
          color:rgba(51,51,51,1);
          display block
  .work
    .nav
      display flex
      color:rgba(153,153,153,1);
      .active
        color:rgba(51,51,51,1);
      .resume
        margin-right 34px


  .gender
    padding 5px 0 10px 0
    border-bottom 1px solid $border-base
  .btn-add-blacklist
    color $danger
</style>
