<template>
  <div>
    <el-form :model="form" :rules="rules" ref="createGroupForm" label-width="100px">
      <el-form-item label="群ID" style="display: none">
        <el-input v-model="form.groupID"></el-input>
      </el-form-item>
      <el-form-item label="群名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="群类型" style="display: none">
        <el-select v-model="form.type">
          <el-option label="Private" value="Private"></el-option>
          <el-option label="Public" value="Public"></el-option>
          <el-option label="ChatRoom" value="ChatRoom"></el-option>
          <el-option label="AVChatRoom" value="AVChatRoom"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="群头像地址">
        <el-input v-model="form.avatar"></el-input>
      </el-form-item> -->
      <el-form-item label="群简介">
        <el-input type="textarea" v-model="form.introduction" :maxlength="240"></el-input>
      </el-form-item>
      <el-form-item label="群公告">
        <el-input type="textarea" v-model="form.notification" :maxlength="300"></el-input>
      </el-form-item>
      <el-form-item label="加群方式" style="display: none">
        <el-radio-group v-model="form.joinOption" :disabled="joinOptionDisabled">
          <el-radio label="FreeAccess">自由加群</el-radio>
          <el-radio label="NeedPermission">需要验证</el-radio>
          <el-radio label="DisableApply">禁止加群</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="群成员列表">
        <el-cascader
          :options="options"
          :props="props"
          :clearable="true"
          :show-all-levels="false"
          @change="handleSearchUser"
        ></el-cascader>
        <!-- <el-select
          v-model="form.memberList"
          default-first-option
          multiple
          filterable
          remote
          :disabled="form.type === 'AVChatRoom'"
          :remote-method="handleSearchUser"
          :loading="loading"
          placeholder="请输入群成员 userID"
        >
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="onSubmit('createGroupForm')">立即创建</el-button>
      <el-button @click="closeCreateGroupModel">取消</el-button>
    </div>
  </div>
</template>

<script>
import http from '../../../libs/http'
export default {
  data() {
    return {
      form: {
        groupID: "",
        name: "",
        type: "Private",
        avatar: "",
        introduction: "",
        notification: "",
        joinOption: "FreeAccess",
        memberList: []
      },
      options: [
        { label: "企业用户", value: 1, children: [] },
        { label: "个人用户", value: 2, children: [] }
      ],
      props: { multiple: true ,emitPath:false},
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入群名称", trigger: "blur" }]
      }
    };
  },
  mounted(){
    this.initialize()
  },
  computed: {
    joinOptionDisabled() {
      return [
        this.TIM.TYPES.GRP_PRIVATE,
        this.TIM.TYPES.GRP_CHATROOM,
        this.TIM.TYPES.GRP_AVCHATROOM
      ].includes(this.form.type);
    }
  },

  methods: {
    initialize() {
      this.apiGet("api/friend/lists").then(res => {
        if (res) {
          console.log(res);
          let length = res.length;
          for (let i = 0; i < length; i++) {
            if (parseInt(res[i].friend.user_step) >= 1) {
              let item = {
                label:res[i].friend.nickname + ' ' +  res[i].friend.phone,
                value:res[i].friend.user_id + 'a'
              }
              this.options[1].children.push(item);
            }
            if (parseInt(res[i].friend.enterprise_step) == 5) {
              let item = {
                label:res[i].friend.agency.company_name + ' ' +  res[i].friend.phone,
                value:res[i].friend.user_id + 'b'
              }
              this.options[0].children.push(item);
            }
          }
          console.log(this.options);
        }
      });
    },
    onSubmit(ref) {
      this.$refs[ref].validate(valid => {
        if (!valid) {
          return false;
        }
        this.createGroup();
      });
    },
    closeCreateGroupModel() {
      this.$store.commit("updateCreateGroupModelVisible", false);
    },
    createGroup() {
      this.tim.createGroup(this.getOptions()).then(res => {
        console.log(res);
        this.closeCreateGroupModel();
      });
    },
    getOptions() {
      let options = {
        ...this.form,
        memberList: this.form.memberList.map(userID => ({ userID }))
      };
      if (["Private", "AVChatRoom"].includes(this.form.type)) {
        delete options.joinOption;
      }
      console.log(options);
      return options;
    },
    // handleSearchUser(userID) {
    //   if (userID !== "") {
    //     this.loading = true;
    //     this.tim.getUserProfile({ userIDList: [userID] }).then(({ data }) => {
    //       this.options = data.map(item => item.userID);
    //       this.loading = false;
    //     });
    //   }
    // }
    handleSearchUser(value) {
      console.log(value)
      this.form.memberList=value
    }
  },
  mixins:[http]
};
</script>

<style lang="stylus" scoped>
</style>
