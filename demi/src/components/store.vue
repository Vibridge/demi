<template>
    <div class="store">
        <div class="noneStore">
            <img src="../assets/img/store.png" alt="" style="">
            <p>主人你还未开通店铺，请先开通店铺</p>
            <el-button type="primary" @click="handleOpen">去开店</el-button>
        </div>
        <el-dialog
                :visible.sync="open"
                width="724px"
                custom-class="open"
                :close-on-click-modal="false"
        >
            <div slot="title">
                <p>注册店铺</p>
            </div>

            <div class="form">
                <p class="form-title">店铺名</p>
                <el-input
                        placeholder="请输入店铺名称不可修改"
                        v-model="form.shop_name">
                </el-input>
            </div>
            <div class="form">
                <p class="form-title">客服联系号码</p>
                <el-input
                        placeholder="请输入客服联系号码"
                        v-model="form.shop_phone">
                </el-input>
            </div>
            <!--<div class="form">
                <p class="form-title">验证码</p>
                <div>
                    <el-input
                            placeholder="请输入短信验证码"
                            v-model="form.yzm">
                    </el-input>
                    <el-button type="primary">验证码</el-button>
                </div>

            </div>-->
            <div class="form">
                <p class="form-title" style="align-self: self-start;margin-top: 8px">店铺简介</p>
                <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请用一句话来介绍你的店铺"
                        v-model="form.shop_poster"
                        maxlength="100"
                        show-word-limit>
                </el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleCreate">创建店铺</el-button>
            </span>
        </el-dialog>

        <el-dialog
                :visible.sync="over"
                width="724px"
                custom-class="over"
                :close-on-click-modal="false"
                :show-close="false"
        >

            <div>
                <img src="../assets/img/success.png" alt="">
                <p>恭喜你，注册成功！</p>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleBack('B_person')">返回个人中心</el-button>
                <el-button type="primary" @click="handleBack('create_goods')">去发布商品</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import http from '../libs/http'
    export default {
        name: 'store',
        data() {
            return {
                store: true,
                open: false,
                form: {
                    shop_name: '',
                    shop_phone: '',
                    shop_poster: '',

                },
                over: false
            }
        },
        methods: {
            handleOpen() {
                this.open = true
            },
            handleCreate() {
                if(this.form.shop_name){
                    this.apiPost('/api/shop/create',this.form).then((res)=>{
                        if(res){
                            console.log(res)
                            this.open = false;
                            this.over = true
                        }
                    })
                }else{
                    this.$message('请输入店铺名')
                }

            },
            handleBack(path){
                this.over = false;
                this.$router.push({
                    name: path,
                });
            }
        },
        mixins:[http]
    }
</script>

<style lang="stylus">
    .store
        width 100%
        min-height 751px
        position relative
        border-radius 8px
        background-color white
        border 1px solid rgba(235, 235, 235, 1)

        .noneStore
            width 524px
            position absolute
            top: 50%
            left 50%
            padding-top 68px
            padding-bottom 40px
            text-align center
            border-radius 8px
            transform translate3d(-50%, -50%, 0)

            img
                width 100%

            p
                font-size: 14px;
                color: rgba(204, 204, 204, 1);
                margin-bottom 113px

            .el-button
                width: 196px;
                background: rgba(36, 191, 255, 1);
                border-radius: 18px;
                border none
                font-size: 16px;
                color: rgba(255, 255, 255, 1)

        .el-dialog__wrapper
            .open
                border-radius: 8px;

                .el-dialog__header
                    padding 25px 0
                    color: rgba(36, 191, 255, 1)
                    font-size: 30px
                    border-bottom: 1px solid rgba(242, 242, 242, 1);

                .el-dialog__body
                    padding 20px 0 31px

                    .form
                        display flex
                        margin-bottom 20px

                        .form-title
                            align-self center
                            width 36%
                            margin-right 14px
                            text-align right
                            color: rgba(102, 102, 102, 1);

                        .el-input, .el-textarea
                            align-self center
                            margin-right 10px
                            width 214px

                            .el-input__inner
                                height 30px
                                line-height 30px
                                border-radius 0

                        .el-button
                            padding 6px
                            border-radius: 0;

                .el-dialog__footer
                    text-align center

                    .el-button
                        border none
                        width 196px
                        font-size 16px
                        border-radius 18px
                        margin-bottom 41px
                        color rgba(255, 255, 255, 1)
                        background rgba(36, 191, 255, 1)


            .over
                border-radius: 8px;
                .el-dialog__body
                    img
                        width 285px
                        margin-bottom 34px

                    p
                        font-size: 32px;
                        color: rgba(204, 204, 204, 1)

                .el-dialog__footer
                    text-align center

                    .el-button
                        font-size: 16px;
                        width: 185px;
                        color #FFFFFF
                        border none
                        padding 8px 51px
                        border-radius: 17px;
                        margin-bottom 66px
                        background:rgba(36,191,255,1);
                    .el-button:nth-child(1)
                        color #CCCCCC
                        margin-right 50px
                        background:rgba(242,242,242,1);


</style>
