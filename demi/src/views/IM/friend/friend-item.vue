<template>
    <div style="margin-top: 10px" @click="handleFriendClick">
        <el-row class="friend-item-container">
            <el-col :span="6">
                <img v-if="type == 'person' && friend.avatar" :src="friend.avatar" alt="">
                <img v-if="type == 'company' && friend.agency" :src="friend.agency.logo_path" alt="">
                <!--<avatar :src="friend.profile.avatar" text="F" />-->
            </el-col>
            <el-col :span="18">
                <div class="friend-name" v-if="type == 'company' && friend.agency">{{friend.agency.company_name}}</div>
                <div class="friend-name" v-if="type == 'person' && friend.nickname">{{friend.nickname}}</div>
                <!--<div class="friend-name">{{friend.profile.nick||friend.userID}}</div>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
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
                let id
                if(this.type == 'company'){
                    id = this.friend.user_id + 'b'
                }else{
                    id = this.friend.user_id + 'a'
                }
                this.tim.getConversationProfile(`C2C${id}`).then(({data}) => {
                    this.$store.commit('updateCurrentConversation', data)
                })
                this.$store.dispatch('checkoutConversation', `C2C${id}`)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .friend-item-container
        height:60px;
        padding 0 20px
        .el-col-6
            width 25%
            img
                width 40px
                height 40px
                border-radius 50%
                transform translateY(25%)

        .el-col-18
            width 75%
            line-height 60px
    .friend-item-container:hover
        background:rgba(242,242,242,1);
</style>
