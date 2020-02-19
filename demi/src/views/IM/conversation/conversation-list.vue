<template>
  <div class="list-container">
    <div class="header-bar">
      <div class="title">
        最近联系人
      </div>
    </div>
    <div class="scroll-container">
      <div class="none_list" v-if="!handleList">
        <p>暂无聊天记录</p>
      </div>
      <conversation-item
        :conversation="item"
        v-for="item in handleList"
        :key="item.conversationID"
        :new-list="newList"
        :work_label="work_label"
        v-else
      />
    </div>
  </div>
</template>

<script>
import ConversationItem from './conversation-item'
import { mapState } from 'vuex'
import http from '../../../libs/http';

export default {
  name: 'ConversationList',
  components: { ConversationItem },
  data() {
    return {
      newList:[],
      work_label:null
    }
  },
  computed: {
    ...mapState({
      isSDKReady: state => state.user.isSDKReady,
      handleList(state) {
        if(this.isSDKReady){
          let id = "C2C" + sessionStorage.getItem('service_id') + 'b';
          let user_id = "C2C" + sessionStorage.getItem('userID') + 'a';
          for (let i in state.conversation.conversationList) {
            if (state.conversation.conversationList[i].conversationID == id) {
              this.deleteConversation(id)
            }
            if(state.conversation.conversationList[i].conversationID == user_id){
              this.deleteConversation(user_id)
            }
          }
          return state.conversation.conversationList
        }
      },
      currentConversation: state => state.conversation.currentConversation
    })
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
    this.handleMsgList();
    this.getRouterData();
    let data = null;
    data = sessionStorage.getItem('id');
    if (data) {
      let userID = JSON.parse(data).recipient + 'a';
      let a = {
        type: JSON.parse(data).type,
        recipient: JSON.parse(data).recipient,
        foreign_key: JSON.parse(data).foreign_key
      };
      this.apiPost('/converse/create', a).then((res) => {
        sessionStorage.removeItem('id');
        if (res) {
          this.$store.commit('handleDetail', res)
          this.handleMsgList();
          this.$store
                  .dispatch('checkoutConversation', `C2C${userID}`)
                  .then(() => {
                    console.log('aaa')
                  })
        }
      })

    }

    this.apiGet('/labels?id=967').then((res) => {
      this.work_label = res
    });
  },

  destroyed() {
    window.removeEventListener('keydown', this.handleKeydown)
  },

  methods: {
    //删除客服会话在列表
    deleteConversation(id) {
      this.tim
              .deleteConversation(id)
              .then(() => {
                this.$store.commit('resetCurrentConversation');
                console.log('success')
              })
              .catch(error => {

              })
    },

    handleMsgList() {
      this.apiGet('/converse/lists?mode=object').then((res) => {
        this.newList = res;
      });
    },

    getRouterData() {
      if (this.$route.params.id) {
        sessionStorage.setItem('id', this.$route.params.id);
      }
    },

  },
  mixins:[http]
}
</script>

<style lang="stylus" scoped>
.list-container
  height 100%
  width 100%
  display flex
  flex-direction column // -reverse
  .header-bar
    flex-shrink 0
    height 60px
    border-bottom 1px solid #E6E6E6
    background-color #fff
    /*padding 10px 10px 10px 20px*/
    .title
      padding: 23px 20px;
      font-size: 14px;
      color: #999999;

  .scroll-container
    overflow-y auto
    flex 1
    .none_list
      text-align: center;
      margin-top: 23px;
      height: calc(100vh - 177px);
.bottom-circle-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.refresh {
  bottom: 70px;
}
</style>
