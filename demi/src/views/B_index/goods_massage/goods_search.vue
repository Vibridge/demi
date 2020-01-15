<template>
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
                <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                <el-button type="primary" size="mini" @click="handleReset">重置</el-button>
            </div>
        </div>
        <div class="goods_coc">
            <el-button type="primary" size="mini">删除</el-button>
            <el-button type="primary" size="mini">上架</el-button>
            <el-button type="primary" size="mini">下架</el-button>
            <p>已选商品（6）</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods_search',
        data(){
            return{
                goods_name: '',
                goods_id: '',
            }
        },
        methods:{
            handleSearch(){
                this.$emit('on-goods-search',this.goods_name,this.goods_id)
            },
            handleReset(){
                this.goods_name = '';
                this.goods_id = '';
                this.$emit('on-goods-search',this.goods_name,this.goods_id)
            }
        }
    }
</script>

<style scoped>

</style>