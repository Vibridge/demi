<template>
    <div class="goods_info_contain">
        <div class="goods_info_search">
            <div class="info_search_wrap">
                <div class="info_search_input">
                    <div class="info_search">
                        <p class="search_label">商品标题</p>
                        <el-input v-model="goods_name" size="mini"></el-input>
                    </div>
                    <div class="info_search">
                        <p class="search_label">商品ID</p>
                        <el-input v-model="goods_id" size="mini"></el-input>
                    </div>
                </div>
                <div>
                    <el-button type="primary" size="mini">搜索</el-button>
                    <el-button type="primary" size="mini">重置</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods_info',
        data(){
            return{
                goods_name:'',
                goods_id:'',
            }
        }
    }
</script>

<style lang="stylus">
    .goods_info_contain
        .goods_info_search
            padding 0 13px
            .info_search_wrap
                display flex
                justify-content space-between
                .info_search_input
                    display flex
                    .info_search:last-child
                        .search_label
                            margin-right 20px
                    .info_search
                        display flex
                        .search_label
                            align-self center
                            font-size 12px
                            color #333333
                            margin-right 9px
                        .el-input
                            width 127px
                            margin-right 31px
                            .el-input__inner
                                border-radius 0

</style>