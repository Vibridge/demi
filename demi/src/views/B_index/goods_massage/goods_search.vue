<template>
    <div class="goods_info_search">
        <div class="info_search_wrap">
            <div class="info_search_input">
                <div class="info_search">
                    <p class="search_label">关键字</p>
                    <el-input v-model="keyword" size="mini"></el-input>
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
            <p>已选商品（{{sum}}）</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods_search',
        props:['index','sum'],
        data(){
            return{
                keyword: '',
            }
        },
        mounted(){
            console.log(this.index);
            console.log(this.index)
        },
        methods:{
            handleSearch(){
                let status;
                if(this.index == 0){
                    status = '';
                }else if(this.index == 1){
                    status = 1;
                }else{
                    status = 0;
                }
                this.$emit('on-goods-search',this.keyword,status)
            },
            handleReset(){
                let status;
                if(this.index == 0){
                    status = '';
                }else if(this.index == 1){
                    status = 1;
                }else{
                    status = 0;
                }
                this.keyword = '';
                this.$emit('on-goods-search',this.keyword,status)
            }
        }
    }
</script>

<style scoped>

</style>
