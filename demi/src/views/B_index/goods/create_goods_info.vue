<template>
    <div class="create_goods_info">
        <div class="create_title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first"></el-tab-pane>
                <el-tab-pane label="配置管理" name="second"></el-tab-pane>
                <el-tab-pane label="角色管理" name="third"></el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="select_category">
                <p>当前类目：服饰配件/皮带/帽子/围巾/耳套</p>
                <el-button type="primary">切换类目</el-button>
            </div>
        </div>
        <div class="goods_basic">
            <div class="goods_basic_title">
                基础信息
            </div>
            <div class="goods_basic_input">
                <div class="goods_basic_name">
                    <p class="goods_basic_label"><span style="color:#FF0000">* </span>宝贝标题</p>
                    <el-input
                            size="small"
                            placeholder="最多输入20个汉字和字符"
                            maxlength="20"
                            show-word-limit
                            v-model="goods.goods_name">
                    </el-input>
                </div>
                <div class="goods_basic_category">
                    <p class="goods_basic_label"><span style="visibility: hidden">* </span>类目属性</p>
                    <div class="goods_basic_category_input">
                        <div class="left">
                            <div class="brand">
                                <p class="brand_label">品牌</p>
                                <el-input
                                        size="mini"
                                        clearable
                                        v-model="goods.goods_name">
                                </el-input>
                            </div>
                            <div class="number">
                                <p class="number_label">货号</p>
                                <el-input
                                        size="mini"
                                        clearable
                                        v-model="goods.goods_name">
                                </el-input>
                            </div>
                        </div>
                        <div class="right">
                            <div class="material">
                                <p class="material_label">材质</p>
                                <el-input
                                        size="mini"
                                        clearable
                                        v-model="goods.goods_name">
                                </el-input>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="goods_sale">
            <div class="goods_sale_title">
                销售信息
            </div>
            <div class="goods_sale_info">
                <div class="goods_sale_category">
                    <p class="goods_sale_label">颜色分类</p>
                    <div class="select_category_value">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="复选框 A"></el-checkbox>
                            <el-checkbox label="复选框 B"></el-checkbox>
                            <el-checkbox label="复选框 C"></el-checkbox>
                            <el-checkbox label="禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                            <el-checkbox label="选中且禁用"></el-checkbox>
                        </el-checkbox-group>
                        <el-input v-model="custom" placeholder="请输入自定义值" size="medium"></el-input>
                        <el-button type="primary" size="small">添加</el-button>
                    </div>
                </div>
                <div class="goods_table">
                    <div class="table_title">
                        <p>宝贝销售规格 在标题栏中输入或选择内容可以进行筛选和批量填充</p>
                        <el-button type="primary" size="small">批量填充</el-button>
                    </div>
                    <div>
                        <el-table
                                :data="tableData"
                                height="250"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="地址">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="goods_price">
                    <p class="goods_price_label"><span style="color:#FF0000">* </span>一口价</p>
                    <div class="goods_price_input">
                        <div style="display: flex">
                            <el-input
                                    size="small"
                                    v-model="goods.goods_name">
                            </el-input>
                            <span style="align-self: center">元</span>
                        </div>
                        <p>商品价格不能低于0.10元</p>
                    </div>

                </div>
                <div class="goods_code">
                    <p class="goods_code_label">商品条形码</p>
                    <el-input
                            size="small"
                            placeholder="最多输入32个汉字和字符"
                            maxlength="32"
                            show-word-limit
                            v-model="goods.goods_name">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="goods_pic">
            <div class="goods_pic_title">
                图文描述
            </div>
            <div class="goods_upload">
                <div class="goods_pic_upload">
                    <p class="goods_pic_label"><span style="color:#FF0000">* </span>商品主图</p>
                    <div class="main_pic">
                        <p>商品主图大小不能超过3MB；建议800x800以上图片。</p>
                        <div>
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :on-success="handleAvatarSuccess"
                                    :show-file-list="false"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="goods_other">
            <div class="goods_other_title">
                其他信息
            </div>
            <div class="goods_other_time">
                <p class="goods_other_label"><span style="color:#FF0000">* </span>上架时间 </p>
                <span class="goods_other_note">
                    未上架的商品在上架前请到“仓库中的宝贝”里编辑商品。
                </span>
                <div class="select_buy">
                    <div class="select_online">
                        <div style="align-self: center">
                            <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(1)"
                                 v-show="active === 2">
                            <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 1">
                        </div>
                        <p :style="active === 2 ? 'color: #999999': 'color: #4d4d4d'">立即上架</p>
                    </div>
                    <div class="select_store">
                        <div style="align-self: center">
                            <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(2)"
                                 v-show="active === 1">
                            <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 2">
                        </div>
                        <p :style="active === 2 ? 'color: #4d4d4d': 'color: #999999'">放入仓库</p>
                    </div>
                </div>

            </div>
        </div>
        <div class="create_goods_sumbit">
            <el-button type="primary" size="medium">提交商品信息</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'create_goods_info',
        data() {
            return {
                activeName: 'second',
                active: 1,
                goods: {
                    goods_name: ""
                },
                imageUrl:'',
                checkList: ['选中且禁用', '复选框 A'],
                custom: '',
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelect(active) {
                this.active = active
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style lang="stylus">
    .create_goods_info
        width 1000px
        margin 0 auto
        text-align left
        font-size: 14px;
        color: rgba(51, 51, 51, 1);

        .create_title
            height 92px
            margin-top 32px
            margin-bottom 16px
            background-color: #fff;

            .el-tabs
                .el-tabs__header
                    margin 0

                .el-tabs__item:nth-child(2)
                    padding-left 20px

                .el-tabs__item:last-child
                    padding-right 20px

                .el-tabs__active-bar
                    height 0

                .el-tabs__item
                    height 46px
                    line-height 46px

                .el-tabs__nav-wrap::after
                    height 0

                .el-tabs__item.is-active
                    border-top 2px solid #24BFFF

            .select_category
                display flex

                p
                    align-self center
                    padding-left 20px
                    margin-right 35px

                .el-button
                    align-self center
                    border-radius: 4px;
                    color: rgba(36, 191, 255, 1);
                    background: rgba(228, 240, 253, 1);
                    border: 1px solid rgba(36, 191, 255, 1);

        .goods_basic
            margin-bottom 25px
            background: rgba(255, 255, 255, 1);

            .goods_basic_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);

            .goods_basic_input
                padding-left 31px
                box-sizing border-box

                .goods_basic_name
                    display flex
                    margin-top 37px
                    margin-bottom 29px

                    .goods_basic_label
                        align-self center
                        margin-right 14px

                    .el-input
                        width 695px
                        align-self center

                        .el-input__inner
                            border-radius: 2px;
                            border: 1px solid rgba(204, 204, 204, 1);

                .goods_basic_category
                    display flex

                    .goods_basic_label
                        align-self flex-start
                        margin-right 14px

                    .goods_basic_category_input
                        width 695px
                        display flex
                        padding 28px 54px
                        margin-bottom 15px

                        .left, .right
                            width 50%
                            text-align center

                            .brand, .number, .material
                                display flex
                                margin-bottom 25px

                                .brand_label, .number_label, .material_label
                                    margin-right 8px
                                    align-self center

                            .el-input
                                width 197px

        .goods_sale
            margin-bottom 25px
            background: rgba(255, 255, 255, 1);

            .goods_sale_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);

            .goods_sale_info
                padding 46px 34px

                .goods_sale_category
                    display flex
                    margin-bottom 24px

                    .goods_sale_label
                        margin-right 10px
                        align-self flex-start

                    .select_category_value
                        width 702px
                        padding 15px 37px

                        .el-checkbox
                            margin-bottom 16px

                        .el-input
                            width 214px
                            margin-right 15px

                        .el-button
                            color #333333
                            background-color #f7f8fa
                            border: 1px solid rgba(153, 153, 153, 1);

                .goods_table
                    margin-bottom 30px

                    .table_title
                        display flex
                        margin-bottom 17px
                        justify-content space-between

                        p
                            align-self center

                        .el-button
                            margin-right 193px

                .goods_price
                    display flex
                    margin-bottom 19px

                    .goods_price_label
                        margin-right 41px
                        margin-top 9px
                        align-self flex-start

                    .goods_price_input
                        p
                            margin-top 4px
                            font-size: 12px;
                            color: rgba(204, 204, 204, 1);

                .goods_code
                    display flex

                    .goods_code_label
                        align-self center
                        margin-right 19px

                    .el-input
                        width 679px

        .goods_pic
            margin-bottom 25px
            background: rgba(255, 255, 255, 1);

            .goods_pic_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);
            .goods_upload
                padding-left 31px
                .goods_pic_upload
                    margin-top 35px
                    display flex
                    .goods_pic_label
                        margin-right 28px
                    .main_pic
                        p
                            font-size:14px;
                            color:rgba(204,204,204,1);
                            margin-bottom 14px

        .goods_other
            margin-bottom 128px
            background: rgba(255, 255, 255, 1);

            .goods_other_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);
            .goods_other_time
                padding 34px 31px
                .goods_other_label
                    display inline
                .goods_other_note
                    font-size 12px
                    color:#999
                .select_buy
                    margin-left 90px
                    margin-top 19px
                    display flex
                    .select_online,.select_store
                        display flex
                        margin-right 19px
                        align-self center
                        img
                            width 18px
                            margin-right 10px
                        p
                            color #000000
                            font-size 12px
                            align-self center


        .create_goods_sumbit
            position fixed
            bottom 0
            left 0
            height 103px
            width 100%
            line-height 103px
            background-color: #fff;
            text-align center
            z-index:2;
            border-top:1px solid rgba(36,191,255,1)
            .el-button
                width:255px;
                height:59px;
                font-size:20px;
                border-radius:4px;
                color:rgba(36,191,255,1);
                background:rgba(228,240,253,1);
                border:1px solid rgba(36,191,255,1);
</style>