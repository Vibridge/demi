<template>
<message-bubble :isMine=isMine>
  <div class="custom-element-wrapper">
    <div class="survey"  v-if="this.payload.data === 'survey'">
      <div class="title">对IM DEMO的评分和建议</div>
      <el-rate
          v-model="rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
      </el-rate>
      <div class="suggestion">{{this.payload.extension}}</div>
    </div>
    <span class="text" title="您可以自行解析自定义消息" v-else>{{text}}</span>
  </div>
</message-bubble>
</template>

<script>
import MessageBubble from '../message-bubble'
import http from '../../../../libs/http'
export default {
  name: 'CustomElement',
  props: {
    payload: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean
    }
  },
  data(){
    return{
      operator:'',
      name:''
    }
  },
  components: {
    MessageBubble,
  },
  mounted(){
    console.log(this.payload)
    /*tim.getUserProfile({ userIDList: [this.payload.extension.split('创')[0]] }).then(imReponse => {
      this.operator = imReponse.data[0].nick
    })*/
  },
  computed: {
    text() {
      return this.translateCustomMessage(this.payload)
    },
    rate() {
      return parseInt(this.payload.description)
    }
  },
  methods: {
    translateCustomMessage(payload) {
      if (payload.data === 'group_create') {
        
        this.apiGet('/api/user/info?user_id=' + payload.extension.match(/\d*/)).then((res)=>{
            console.log(res)
            this.name = res.nickname
        })
        console.log(this.name)
        return this.name + '创建了群组'
      }
      if(payload.data === 'message'){
        return `${payload.description}`
      }
      return `${payload.description}`
    }
  },
  mixins:[http]
}
</script>

<style lang="stylus" scoped>
.text
  font-weight bold
.title
  font-size 16px
  font-weight 600
  padding-bottom 10px
.survey
  background-color white
  color black
  padding 20px
  display flex
  flex-direction column
.suggestion
  padding-top 10px
  font-size 14px
</style>
