<template>
  <div class="friend-item-wrap" @click="handleFriendClick">
    <el-row class="friend-item-container">
      <el-col :span="6">
        <img v-if="type == 'person' && friend.avatar" :src="friend.avatar" alt>
        <img v-if="type == 'company' && friend.agency" :src="friend.agency.logo_path" alt>
        <!--<avatar :src="friend.profile.avatar" text="F" />-->
      </el-col>
      <el-col :span="18">
        <div class="friend_name">
          <span v-if="type == 'company' && friend.agency">{{friend.agency.company_name}}</span>
          <span v-if="type == 'person' && friend.nickname">{{friend.nickname}}</span>
          <i @click.stop="handleDelete(friend.user_id)" class="el-icon-delete"></i>
        </div>

        <!--<div class="friend-name">{{friend.profile.nick||friend.userID}}</div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import http from "../../../libs/http";
export default {
  props: {
    friend: {
      type: Object,
      required: true
    },
    type: {
      type: String
    }
  },
  methods: {
    handleFriendClick() {
      let id;
      if (this.type == "company") {
        id = this.friend.user_id + "b";
      } else {
        id = this.friend.user_id + "a";
      }
      this.tim.getConversationProfile(`C2C${id}`).then(({ data }) => {
        this.$store.commit("updateCurrentConversation", data);
      });
      this.$store.dispatch("checkoutConversation", `C2C${id}`);
    },
    handleDelete(id) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.apiDelete("api/friend/delete/" + id).then(res => {
        console.log(res);
        if (res) {
          this.$message.success("删除成功");
          
          this.$emit("on-handle-delete", this.type);
        }
        loading.close();
      });
    }
  },
  mixins: [http]
};
</script>

<style lang="stylus" scoped>
.friend-item-wrap {
  margin-top: 10px;

  &:hover {
    background-color: #E6E6E6;

    .el-icon-delete {
      right: 10px;
    }
  }

  .el-icon-delete {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    color: $font-dark;
    font-size: 20px;
    transition: all 0.2s ease;

    &:hover {
      color: $danger;
    }
  }

  .friend-item-container {
    height: 60px;
    padding: 0 20px;

    .el-col-6 {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transform: translateY(25%);
      }
    }

    .el-col-18 {
      line-height: 60px;

      .friend_name {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
