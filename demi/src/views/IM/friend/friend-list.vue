<template>
  <div class="friend-list-container">
    <div class="header-bar">
      <div class="friend-search-bar">
        好友列表
      </div>
      <img src="../../../assets/img/icon-more-friend@2x.png" alt="">
    </div>
    <div class="nav">
      <div>企业用户</div>
      <div>

      </div>
      <div>个人用户</div>
      <div>

      </div>
    </div>
    <div class="friend-list-container" :class="{'default': !hasFriend}">
      <div v-if="hasFriend">
        <friend-item v-for="friend in friendList" :key="friend.userID" :friend="friend"/>
      </div>
      <div style="color:gray;align-self: center" v-else>暂无好友</div>
    </div>
  </div>

</template>

<script>
    import {mapState} from 'vuex'
    import FriendItem from './friend-item.vue'

    export default {
        components: {
            FriendItem
        },
        computed: {
            ...mapState({
                friendList: state => state.friend.friendList
            }),
            hasFriend() {
                return this.friendList.length > 0
            }
        }
    }
</script>

<style lang="stylus" scpoed>
  .default
    justify-content: center;
  .friend-list-container
    height 100%
    width 100%
    display flex
    flex-direction column
    .header-bar
      display: flex;
      flex-shrink 0
      height 60px
      border-bottom 1px solid #E6E6E6
      padding 15px 10px 10px 20px
      line-height: 32px;
      .friend-search-bar
        width 100%
        margin-right 10px
        /*padding: 23px 20px;*/
        font-size: 14px;
        color: #999;
    img
      width 30px
      height 30px
      cursor: pointer;



</style>
