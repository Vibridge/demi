<template>
  <div class="friend-list-container">
    <div class="header-bar">
      <div class="friend-search-bar">好友列表</div>
      <img @click="handleSearch" src="../../../assets/img/icon-more-friend@2x.png" alt>
    </div>
    <div class="note">至多只有20个好友</div>

    <div class="nav">
      <div class="company" @click="handleType('company')">
        <div :class="active == 'company' ? 'active' : ''">企业用户</div>
        <p v-if="active == 'company'" class="space"></p>
      </div>
      <div class="person" @click="handleType('person')">
        <div :class="active == 'person' ? 'active' : ''">个人用户</div>
        <p v-if="active == 'person'" class="space"></p>
      </div>
    </div>
    <div class="friend-list-container" :class="{'default': !hasFriend}">
      <div v-if="hasFriend">
        <friend-item
          v-for="(friend,index) in friendList"
          :key="index"
          :friend="friend"
          :type="active"
          @on-handle-delete="handleType"
        />
      </div>
      <div style="color:gray;align-self: center" v-else>暂无好友</div>
    </div>

    <el-dialog :visible.sync="searchFriend" custom-class="searchFriend" width="50%">
      <span slot="title">添加好友</span>
      <div>
        <el-input v-model="search">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="result" v-if="searchResult.length > 0">
          <div style="display: flex">
            <span style="align-self: center;margin-right: 20px">
              <img :src="searchResult[0].avatar" alt>
            </span>

            <span style="align-self: center">{{searchResult[0].nickname}}</span>
          </div>
          <el-button @click="handleAdd" type="primary" size="mini">添加</el-button>
        </div>
        <div class="result" v-else>{{note}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import FriendItem from "./friend-item.vue";
import http from "../../../libs/http";

export default {
  components: {
    FriendItem
  },
  data() {
    return {
      active: "company",
      friendList: [],
      search: "",
      searchFriend: false,
      searchResult: [],
      note: "请输入手机号搜索"
    };
  },
  mounted() {
    this.initialize("company");
  },
  methods: {
    initialize(item) {
      this.friendList = [];
      this.apiGet("api/friend/lists").then(res => {
        if (res) {
          let length = res.length;
          if (item == "company") {
            for (let i = 0; i < length; i++) {
              if (parseInt(res[i].friend.enterprise_step) == 5) {
                this.friendList.push(res[i].friend);
              }
            }
          } else {
            for (let i = 0; i < length; i++) {
              if (parseInt(res[i].friend.user_step) >= 1) {
                this.friendList.push(res[i].friend);
              }
            }
          }
        }
      });
      console.log(this.friendList);
    },
    handleType(item) {
      this.active = item;
      this.initialize(item);
    },
    handleSearch() {
      if (this.search) {
        this.apiPost("api/friend/search", { phone: this.search }).then(res => {
          if (res.length > 0) {
            this.searchResult = res;
          } else {
            this.note = "没有搜索到结果，请检查输入号码或是该用户没有注册";
          }
        });
      } else {
        if (this.friendList.length > 10) {
          this.$message.error("至多只能有20个好友");
        } else {
          this.searchFriend = true;
        }
      }
    },
    handleAdd() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.apiPost("api/friend/create", {
        relation_id: this.searchResult[0].user_id
      }).then(res => {
        if (res) {
          this.$message.success("添加成功");
          this.searchFriend = false;
          this.search = "";
          this.initialize(this.active);
        }
        loading.close();
      });
    }
  },
  computed: {
    /*...mapState({
                friendList: state => state.friend.friendList
            }),*/
    hasFriend() {
      return this.friendList.length > 0;
    }
  },
  mixins: [http]
};
</script>

<style lang="stylus" scpoed>
.default {
  justify-content: center;
}

.friend-list-container {
  height: 100%;
  width: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: column;

  .header-bar {
    display: flex;
    flex-shrink: 0;
    height: 60px;
    border-bottom: 1px solid #E6E6E6;
    padding: 15px 10px 10px 20px;
    line-height: 32px;

    .friend-search-bar {
      width: 100%;
      margin-right: 10px;
      /* padding: 23px 20px; */
      font-size: 14px;
      color: #999;
    }
  }

  .note {
    font-size: 12px;
    padding: 3px 0;
    color: #999999;
    background: #cccccc;
  }

  .nav {
    display: flex;

    .company, .person {
      width: 50%;
      height: 50px;
      color: #999999;
      font-size: 16px;
      line-height: 50px;

      .space {
        width: 57px;
        height: 3px;
        margin: 0 auto;
        background: rgba(46, 213, 255, 1);
      }
    }

    .active {
      color: #030303 !important;
    }
  }

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .searchFriend {
    text-align: left;
    margin: 15vh auto;

    .result {
      display: flex;
      margin: 20px 0;
      justify-content: space-between;
    }
  }
}
</style>
