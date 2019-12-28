<template>
  <div class="group-tip-element-wrapper">{{text}}</div>
</template>

<script>
  export default {
  name: 'GroupTipElement',
  props: {
    payload: {
      type: Object,
      required: true
    }
  },
    data(){
      return{
        nick:[],
        operator:''
      }
    },
    mounted(){
      tim.getUserProfile({ userIDList: [this.payload.operatorID] }).then(imReponse => {
        this.operator = imReponse.data[0].nick
      })
      console.log(this.payload)
      this.getUserProfile(this.payload.userIDList)
    },
  computed: {
    text() {
      return this.getGroupTipContent(this.payload)
    },
  },
  methods: {
    getUserProfile(item){
      this.nick = [];
      tim.getUserProfile({ userIDList: item }).then(imReponse => {
        console.log(imReponse)
        let length = imReponse.data.length;
        for (var i = 0;i < length;i++){
          if(imReponse.data[i].nick){
            this.nick.push(imReponse.data[i].nick)
          }else{
            this.nick.push(imReponse.data[i].userID)
          }
        }
      });
    },
    getGroupTipContent(payload) {
      console.log(payload)
      switch (payload.operationType) {
        case this.TIM.TYPES.GRP_TIP_MBR_JOIN:
          return `群成员：${this.nick.join(',')}，加入群组`
        case this.TIM.TYPES.GRP_TIP_MBR_QUIT:
          return `群成员：${this.nick.join(',')}，退出群组`
        case this.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
          return `群成员：${this.nick.join(',')}，被${this.operator}踢出群组`
        case this.TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
          return `群成员：${this.nick.join(',')}，成为管理员`
        case this.TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
          return `群成员：${this.nick.join(',')}，被撤销管理员`
        case this.TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
          if(payload.newGroupProfile && payload.newGroupProfile.notification){
            return `${this.operator}修改了群公告`
          }
          if(payload.newGroupProfile && payload.newGroupProfile.introduction){
            return `${this.operator}修改了群介绍`
          }
          if(payload.newGroupProfile && payload.newGroupProfile.name){
            return `${this.operator}修改了群名称`
          }
        default:
          return '[群提示消息]'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.group-tip-element-wrapper
  background $white
  padding 4px 15px
  border-radius 3px
  color $secondary
  font-size 12px
  // text-shadow $secondary 0 0 0.05em
</style>
