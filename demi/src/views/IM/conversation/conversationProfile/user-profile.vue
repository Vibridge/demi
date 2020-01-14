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
    <div>
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
        <div class="resume" v-if="select == 'resume' && resume && resume[0] && resume[0].work">
          <p>{{resume[0].work.name}}</p>
          <div>
            <p>期望要求：<span>{{resume[0].salary_min}} - {{resume[0].salary_max}}k</span></p>
            <p>期望城市：<span v-if="resume[0].city">{{resume[0].city.city_name}}</span>
              <span v-if="!resume[0].city">不限</span></p>
          </div>
        </div>
        <div class="ability" v-if="select == 'ability' && ability && ability[0]">
          <p>{{ability[0].type_label.name}}</p>
          <div>
            <p>期望行业：<span v-for="ind in ability[0].industry">{{ind.name}}/</span></p>
            <p>期望城市：<span v-if="ability[0].city">{{ability[0].city.city_name}}</span>
              <span v-if="!ability[0].city">不限</span></p>
          </div>
        </div>
      </div>
      <div class="space" v-if="resume && resume[0] && resume[0].diploma && resume[0].diploma.school"></div>
      <div class="edc" v-if="resume && resume[0] && resume[0].diploma && resume[0].diploma.school">
        <div class="title_label">教育经历</div>
        <p class="school_name">{{resume[0].diploma.school.school_name}}</p>
        <div class="major">
          <p>专业</p>
          <span>{{resume[0].diploma.major}}</span>
        </div>
        <div class="level">
          <p>学历</p>
          <span v-if="resume[0].diploma.education === 1">初中</span>
          <span v-if="resume[0].diploma.education === 2">中专/中技</span>
          <span v-if="resume[0].diploma.education === 3">高中</span>
          <span v-if="resume[0].diploma.education === 4">大专</span>
          <span v-if="resume[0].diploma.education === 5">本科</span>
          <span v-if="resume[0].diploma.education === 6">硕士</span>
          <span v-if="resume[0].diploma.education === 7">博士</span>
        </div>
      </div>
      <div class="space" v-if="resume && resume[0] && resume[0].vita"></div>
      <div class="self" v-if="resume && resume[0] && resume[0].vita">
        <div class="title_label">自我评价</div>
        <p style="line-height:19px;">{{resume[0].vita.description}}</p>
      </div>
    </div>

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
    this.user_id = sessionStorage.getItem('userID');
    console.log(this.userProfile.userID)
  },
  computed: {
    ...mapState({
      blacklist: state => state.blacklist.blacklist,
      detail:state => state.conversation.detail,
      currentConversation: state => state.conversation.currentConversation

    }),
    // myUserID: state => state.user.currentUserProfile.userID,
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

  },
  watch:{
      userProfile(){
        this.apiGet('/api/user/info?user_id=' + this.userProfile.userID).then((res)=>{
          if(res.card && res.card.birthday){
            this.user_info.birthday = res.card.birthday
          }
          this.user_info.email = res.email
          if(res.type === 1 && res.job_count > 0){
            this.apiGet('/api/vita/paginate?user_id=' + this.userProfile.userID).then((res)=>{
              this.resume = res.data
            })
          }else if(res.job_count <1){
            this.resume=[]
          }
          if(res.type === 1 && res.ability_count > 0){
            this.apiGet('/api/ability/paginate?user_id=' + this.userProfile.userID).then((res)=>{
              console.log(res)
              this.ability = res.data
            })
          }else if(res.ability_count <1){
            this.ability=[]
          }
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
    .school_name
      font-size 18px
      margin-bottom 8px
    .major,.level
      display flex
      justify-content space-between
      p
        color #999999
        margin-bottom 8px
      span
        color #333333
    .level
      p
        margin-bottom 0px
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
    .resume
      color #999;
      p
        margin-bottom 9px


  .gender
    padding 5px 0 10px 0
    border-bottom 1px solid $border-base
  .btn-add-blacklist
    color $danger
</style>
