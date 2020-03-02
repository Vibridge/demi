<template>
    <div
        class="conversation-item-container"
        @click="selectConversation(conversation,conversation.conversationID,conversation.type)"
        :class="{ 'choose': conversation.conversationID === currentConversation.conversationID }"
    >
      <div class="close-btn">
        <span class="tim-icon-close" title="删除会话" @click="deleteConversation"></span>
      </div>
      <div class="warp">

        <avatars :src="avatar" :type="conversation.type" v-if="(conversation.type === TIM.TYPES.CONV_SYSTEM) || (conversation.type ===  TIM.TYPES.CONV_GROUP) || (newList[Corresponding(conversation.conversationID)] && newList[Corresponding(conversation.conversationID)].type == 4) || (!newList[Corresponding(conversation.conversationID)] && conversation.conversationID.split('C2C')[1] !== 'dominator')"/>

        <img class="avatar" v-if="conversation.conversationID.split('C2C')[1] === 'dominator'"
             src="../../../assets/img/notification.png" alt="">

        <img class="avatar" v-if="
          newList[Corresponding(conversation.conversationID)] && (newList[Corresponding(conversation.conversationID)].recipient
          && newList[Corresponding(conversation.conversationID)].recipient.user_id == user_id)
          && conversation.conversationID.split('C2C')[1] !== 'dominator'
          && (newList[Corresponding(conversation.conversationID)].type != 4)"
             :src="newList[Corresponding(conversation.conversationID)].sender.avatar" alt="">

        <img class="avatar" v-if="newList[Corresponding(conversation.conversationID)] && (newList[Corresponding(conversation.conversationID)].sender
        && newList[Corresponding(conversation.conversationID)].sender.user_id == user_id)
        && conversation.conversationID.split('C2C')[1] !== 'dominator'
        && (newList[Corresponding(conversation.conversationID)].type != 4)"
             :src="newList[Corresponding(conversation.conversationID)].recipient.avatar" alt="">

        <div class="content">
          <div class="row-1">
            <div class="name">
              <div class="text-ellipsis">
                <span v-if="(conversation.type === TIM.TYPES.CONV_C2C) && (conversation.conversationID.split('C2C')[1] === 'dominator')" style="margin-bottom: 0">系统消息</span>

                <span v-if="(conversation.type === TIM.TYPES.CONV_C2C) && newList[Corresponding(conversation.conversationID)] && (newList[Corresponding(conversation.conversationID)].recipient && newList[Corresponding(conversation.conversationID)].recipient.user_id == user_id) && conversation.conversationID.split('C2C')[1] !== 'dominator' && (newList[Corresponding(conversation.conversationID)].type != 4)">
                  {{newList[Corresponding(conversation.conversationID)].sender.nickname}}</span>

                <span v-if="(conversation.type === TIM.TYPES.CONV_C2C) && newList[Corresponding(conversation.conversationID)] && (newList[Corresponding(conversation.conversationID)].sender && newList[Corresponding(conversation.conversationID)].sender.user_id == user_id) && conversation.conversationID.split('C2C')[1] !== 'dominator' && (newList[Corresponding(conversation.conversationID)].type != 4)">
                  {{newList[Corresponding(conversation.conversationID)].recipient.nickname}}&nbsp;</span>

                <span style="color: #B3B3B3;font-size: 12px" v-if="(conversation.type === TIM.TYPES.CONV_C2C) && newList[Corresponding(conversation.conversationID)] && (newList[Corresponding(conversation.conversationID)].type === 2) && conversation.conversationID.split('C2C')[1] !== 'dominator'">
                  {{newList[Corresponding(conversation.conversationID)].job.type_label.name}}</span>

                <span style="color: #B3B3B3;font-size: 12px" v-if="(conversation.type === TIM.TYPES.CONV_C2C) && newList[Corresponding(conversation.conversationID)] && (newList[Corresponding(conversation.conversationID)].type === 1) && conversation.conversationID.split('C2C')[1] !== 'dominator'">
                  <span v-text="handleWork(newList[Corresponding(conversation.conversationID)].job.job_label_id)"></span>
                  -
                  {{newList[Corresponding(conversation.conversationID)].job.salary_min/1000}}-{{newList[Corresponding(conversation.conversationID)].job.salary_max/1000}}k
                </span>

                <span :title="conversation.userProfile.nick || conversation.userProfile.userID"
                  v-if="(conversation.conversationID.split('C2C')[1] !== 'dominator' && conversation.type ===  TIM.TYPES.CONV_C2C && !newList[Corresponding(conversation.conversationID)]) || (conversation.type ===  TIM.TYPES.CONV_C2C && (newList[Corresponding(conversation.conversationID)] && newList[Corresponding(conversation.conversationID)].type == 4))"
                  >{{conversation.userProfile.nick || conversation.userProfile.userID}}
                </span>

                <span :title="conversation.groupProfile.name || conversation.groupProfile.groupID"
                  v-else-if="conversation.type ===  TIM.TYPES.CONV_GROUP"
                  >{{conversation.groupProfile.name || conversation.groupProfile.groupID}}
                </span>

                <span
                  v-else-if="conversation.type === TIM.TYPES.CONV_SYSTEM"
                  >群系统通知
                </span>
              </div>
            </div>
            <div class="unread-count">
              <span class="badge" v-if="conversation.unreadCount > 0">
                {{conversation.unreadCount}}
                <template v-if="conversation.unreadCount > 99">+</template>
              </span>
            </div>
          </div>
          <div class="row-2">
            <div class="date">
              {{date}}
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getTime, isToday, getFullDate,  getDay} from '../../../libs/time'
import http from '../../../libs/http';

export default {
  name: 'conversation-item',
  props: ['conversation','newList','work_label'],
  data() {
    return {
      popoverVisible: false,
      user_id:null
    }
  },
  mounted() {
    this.user_id = sessionStorage.getItem('userID');
  },

  computed: {
    date() {
      if (
              !this.conversation.lastMessage ||
              !this.conversation.lastMessage.lastTime
      ) {
        return ''
      }
      const date = new Date(this.conversation.lastMessage.lastTime * 1000);
      if (isToday(date)) {
        return getTime(date)
      }
      if ((date.getFullYear() == new Date().getFullYear()) && (date.getMonth() == new Date().getMonth())) {
        if (parseInt(new Date().getDate()) - parseInt(date.getDate()) == 1) {
          return '昨天' + ' ' + getTime(date);
        } else if ((parseInt(new Date().getDate()) - parseInt(date.getDate()) > 1) && (parseInt(new Date().getDate()) - parseInt(date.getDate()) <= 7)) {
          return getDay(date) + getTime(date)
        }
      } else {
        return getFullDate(date)
      }
    },

    avatar: function() {
      switch (this.conversation.type) {
        case 'GROUP':
          return this.conversation.groupProfile.avatar
        case 'C2C':
          return this.conversation.userProfile.avatar
        default:
          return ''
      }
    },

    ...mapState({
      currentConversation: state => state.conversation.currentConversation
    }),
    ...mapGetters(['toAccount'])
  },
  methods: {
    //id对应的工作岗位/任务
    handleWork(id) {
      let label_name = '';
      if (this.work_label) {
        let length = this.work_label.length;
        for (let i = 0; i < length; i++) {
          if (this.work_label[i].label_id === id) {
            label_name = this.work_label[i].name;
            return label_name
          }
        }
      }
    },

    Corresponding(id) {
      let im_id = id.split('C2C')[1];
      for (let i in this.newList) {
        if (i.split('-')[0] === im_id || i.split('-')[1] === im_id) {
          return i
        }
      }
    },

    selectConversation(im,item,type) {
      if(type === TIM.TYPES.CONV_C2C && this.newList[this.Corresponding(item)] && this.newList[this.Corresponding(item)].type != 4){
        let data;
        if (item === 'C2Cdominator') {
          data = {
            dominator: true
          }
        } else {
          data = this.newList[this.Corresponding(item)];
          data.dominator = false
        }
        this.$store.commit('handleDetail', data)
      }else{
        this.$store.commit('handleDetail', false)
      }

      if (im.conversationID !== this.$store.state.conversation.currentConversation.conversationID) {
        this.$store.dispatch(
                'checkoutConversation',
                im.conversationID
        );
        this.$store.commit('handleLastTime', im.lastMessage.lastTime)
      }
      this.setMessageRead()
    },

    deleteConversation() {
      this.tim
        .deleteConversation(this.conversation.conversationID)
        .then(() => {
          this.$store.commit('showMessage', {
            message: `会话${this.conversation.conversationID}删除成功!`,
            type: 'success'
          })
          this.popoverVisible = false
          this.$store.commit('resetCurrentConversation')
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            message: `会话${this.conversation.conversationID}删除失败!, error=${error.message}`,
            type: 'error'
          })
          this.popoverVisible = false
        })
    },

    setMessageRead() {
      if (this.conversation.unreadCount === 0) {
        return
      }
      if (this.conversation.type === 'C2C') {
        this.tim.setMessageRead({
          conversationID: this.conversation.conversationID,
          lastMessageTime: this.conversation.lastMessage.lastTime
        })
      } else if (this.conversation.type === 'GROUP') {
        this.tim.setMessageRead({
          conversationID: this.conversation.conversationID,
          lastMessageSeq: this.conversation.lastMessage.lastSequence
        })
      }
    }
  },
  mixins:[http],
}
</script>

<style lang="stylus" scoped>


.conversation-item-container
  padding 15px 20px
  cursor pointer
  position relative
  overflow hidden
  transition .2s
  // &:first-child
  //   padding-top 30px
  &:hover
    background-color #E6E6E6
    .close-btn
      right 3px
  .close-btn
    position absolute
    right -20px
    top 3px
    color $font-dark
    transition: all .2s ease;
    &:hover
      color $danger
  .warp
    display flex
  .avatar
    width 40px
    height 40px
    margin-right 10px
    border-radius 50%
    flex-shrink 0
  .content
    flex 1
    height 40px
    overflow hidden
    .row-1
      display flex
      line-height 21px
      justify-content space-between
      .name
        color #333333
      .unread-count
        padding-left 10px
        flex-shrink 0
        color $font-dark
        font-size 12px
        .badge
          vertical-align bottom
          background-color $danger
          border-radius 10px
          color #FFF
          display inline-block
          font-size 12px
          height 18px
          max-width 40px
          line-height 18px
          padding 0 6px
          text-align center
          white-space nowrap
    .row-2
      display flex
      justify-content space-between
      font-size 12px
      padding-top 3px
      .date
        padding-left 10px
        flex-shrink 0
        text-align right
        color $font-dark
.choose {
  background-color: #f5f5f5;
}
.context-menu-button {
  padding: 10px
  border: 2px solid $primary;
  border-radius: 8px;
}
</style>
