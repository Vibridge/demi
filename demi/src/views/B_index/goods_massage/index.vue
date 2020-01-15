<template>
    <div class="goods_massage_wrap">
        <div v-if="!store">
            <store></store>
        </div>
        <div class="goods_massage" v-if="store">
            <div class="goods_massage_nav">
                <el-tabs type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="全部商品">
                        <div class="goods_info_contain">
                            <search @on-goods-search="handleGoodsSearch"></search>
                            <goods :shopList="shopList"></goods>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="出售中的商品">
                        <div class="goods_info_contain">
                            <search @on-goods-search="handleGoodsSearch"></search>
                            <goods :shopList="shopList"></goods>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="仓库中的商品">
                        <div class="goods_info_contain">
                            <search @on-goods-search="handleGoodsSearch"></search>
                            <goods :shopList="shopList"></goods>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
    </div>
</template>

<script>
    import store from '../../../components/store'
    import goods from './goods_info'
    import search from './goods_search'
    import http from '../../../libs/http'
    export default {
        name: 'index',
        components:{store,goods,search},
        data(){
            return{
                store:false,
                shop_info:null,
                shopList:[]
            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                console.log(res)
                if(res.type === 2){
                    if(res.shop){
                        this.store = true;
                        this.shop_info = res.shop
                        this.initialize(res.shop.shop_id)
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration: 1000
                    });
                    this.$router.push({
                        name: "login"
                    });
                }
            })
        },
        methods:{
            initialize(id,status = null){
                if(status != null){
                    this.apiGet('/api/goods/paginate?shop_id=' + id + '&status=' + status).then((res)=>{
                        console.log(res)
                        this.shopList = res.data
                    })
                }else{
                    this.apiGet('/api/goods/paginate?shop_id=' + id).then((res)=>{
                        console.log(res)
                        this.shopList = res.data
                    })
                }
            },
            handleClick(tab, event) {
                if(tab.index == 0){
                    this.initialize(this.shop_info.shop_id)
                }else if(tab.index == 1){
                    this.initialize(this.shop_info.shop_id,1)
                }else if(tab.index == 2){
                    this.initialize(this.shop_info.shop_id,0)
                }
            },
            handleGoodsSearch(name,id){
                console.log(name);
                console.log(id)
            }
        },
        mixins:[http]
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