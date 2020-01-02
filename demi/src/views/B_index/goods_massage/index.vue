<template>
    <div class="goods_massage_wrap">
        <div v-if="false">
            <store></store>
        </div>
        <div class="goods_massage">
            <div class="goods_massage_nav">
                <el-tabs type="border-card">
                    <el-tab-pane label="全部商品">
                        <goods></goods>
                    </el-tab-pane>
                    <el-tab-pane label="出售中的商品">
                        <goods></goods>
                    </el-tab-pane>
                    <el-tab-pane label="仓库中的商品">
                        <goods></goods>
                        <!--<goods></goods>-->
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>

<script>
    import store from '../../../components/store'
    import goods from './goods_info'
    export default {
        name: 'index',
        components:{store,goods},
    }
</script>

<style lang="stylus">
    .goods_massage_wrap
        .goods_massage
            width 724px
            font-size 14px
            .el-tabs--border-card
                border none
                box-shadow:none
                .el-tabs__content
                    padding 15px 0
                .el-tabs__header
                    background-color #EEEFF2
                    border-bottom 1px solid #fff

                    .el-tabs__item
                        height 43px
                        color #666666
                        line-height 43px
                        padding 0 27px
                        border-right-color: #DCDFE6;
                        border-left-color: #DCDFE6;
                    .is-active
                        color #24BFFF!important
                        border-top 2px solid #24BFFF
</style>