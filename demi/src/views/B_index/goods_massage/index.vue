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
                            <search :select_id="select_id" :sum="select_sum" :index="active_index" @on-goods-search="handleGoodsSearch"></search>
                            <goods :index="active_index" @on-select-list="handleSelectSum" :shopList="shopList" @on-goods-search="handleGoodsSearch"></goods>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="出售中的商品">
                        <div class="goods_info_contain">
                            <search :select_id="select_id" :sum="select_sum" :index="active_index" @on-goods-search="handleGoodsSearch"></search>
                            <goods :index="active_index" @on-select-list="handleSelectSum" :shopList="shopList" @on-goods-search="handleGoodsSearch"></goods>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="仓库中的商品">
                        <div class="goods_info_contain">
                            <search :select_id="select_id" :sum="select_sum" :index="active_index" @on-goods-search="handleGoodsSearch"></search>
                            <goods :index="active_index" @on-select-list="handleSelectSum" :shopList="shopList" @on-goods-search="handleGoodsSearch"></goods>
                        </div>
                    </el-tab-pane>
                </el-tabs>

                <div class="paging">
                    <el-pagination
                            background
                            :hide-on-single-page="true"
                            layout="prev, pager, next"
                            prev-text="上一页"
                            next-text="下一页"
                            :pager-count='5'
                            :total="searchParams.total"
                            :current-page="searchParams.page"
                            :page-size="searchParams.per_page"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentPageChange">
                    </el-pagination>
                </div>
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
                shopList:[],
                active_index:0,
                select_sum:0,
                select_id:[],
                searchParams: {
                    page: 1,
                    total: 0,
                    per_page: 15
                },
            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                if(res.type === 2){
                    if(res.shop){
                        this.store = true;
                        this.shop_info = res.shop;
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
            initialize(id,status = '',name = ''){
                if(status !== '' || name){
                    this.apiGet('/api/goods/paginate?shop_id=' + id + '&status=' + status + '&keyword=' + name, this.searchParams ).then((res)=>{
                        this.shopList = res.data
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                    })
                }else{
                    this.apiGet('/api/goods/paginate?shop_id=' + id, this.searchParams).then((res)=>{
                        this.shopList = res.data
                        this.searchParams.page = parseInt(res.current_page);
                        this.searchParams.total = parseInt(res.total);
                        this.searchParams.per_page = parseInt(res.per_page);
                    })
                }
            },
            handleClick(tab, event) {
                this.active_index = tab.index;
                if(tab.index == 0){
                    this.initialize(this.shop_info.shop_id,'')
                }else if(tab.index == 1){
                    this.initialize(this.shop_info.shop_id,1)
                }else if(tab.index == 2){
                    this.initialize(this.shop_info.shop_id,0)
                }
            },
            handleGoodsSearch(name,status){
                this.initialize(this.shop_info.shop_id,status,name)
            },
            handleSelectSum(data){
                this.select_sum = data.length;
                this.select_id = []
                if(this.select_sum > 0){
                    for (let i = 0;i<this.select_sum;i++){
                        this.select_id.push(data[i].goods_id)
                    }
                }
            },

            handleSizeChange(per_page) {
                this.searchParams.per_page = per_page;
                if(this.active_index == 0){
                    this.initialize(this.shop_info.shop_id,'')
                }else if(this.active_index == 1){
                    this.initialize(this.shop_info.shop_id,1)
                }else if(this.active_index == 2){
                    this.initialize(this.shop_info.shop_id,0)
                }
                document.getElementById('app').scrollTo(0,0)
            },
            handleCurrentPageChange(page) {
                this.searchParams.page = page;
                if(this.active_index == 0){
                    this.initialize(this.shop_info.shop_id,'')
                }else if(this.active_index == 1){
                    this.initialize(this.shop_info.shop_id,1)
                }else if(this.active_index == 2){
                    this.initialize(this.shop_info.shop_id,0)
                }
                document.getElementById('app').scrollTo(0,0)
            },
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
            .paging{
                padding-top: 40px;
                background:rgba(247,248,250,1);
                .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
                    border-radius: 4px;
                    font-size: 14px;
                    background: #fff;
                    color: #999999;
                    margin: 0 7px;
                }
                .btn-prev{
                    color: #999;
                }
                .btn-next{
                    color: #4d4d4d;
                }
                .el-pagination.is-background .el-pager li:not(.disabled):hover{
                    color: #409EFF;
                }
                .el-pagination.is-background .el-pager li:not(.disabled).active{
                    background:rgba(36,191,255,1);
                    color: #fff;
                }

                .el-pagination button, .el-pagination span:not([class*=suffix]){
                    min-width: 64px;
                    font-size: 14px;
                    background: #fff;
                }
            }
</style>
