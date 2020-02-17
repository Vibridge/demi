<template>
    <div class="goods_info_search">
        <div class="info_search_wrap">
            <div class="info_search_input">
                <div class="info_search">
                    <p class="search_label">关键字</p>
                    <el-input v-model.trim="keyword" size="mini"></el-input>
                </div>
            </div>
            <div>
                <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                <el-button type="primary" size="mini" @click="handleReset">重置</el-button>
            </div>
        </div>
        <div class="goods_coc">
            <el-button type="primary" size="mini" @click="handleDeleteShop(0)">删除</el-button>
            <el-button type="primary" size="mini" @click="handleLowerShop(0)">上架</el-button>
            <el-button type="primary" size="mini" @click="handleUpperShop(0)">下架</el-button>
            <p>已选商品（{{sum}}）</p>
        </div>
    </div>
</template>

<script>
    import http from '../../../libs/http'

    export default {
        name: 'goods_search',
        props:['index','sum','select_id'],
        data(){
            return{
                keyword: '',
            }
        },
        mounted(){},
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
                if(this.keyword){
                    this.$emit('on-goods-search',this.keyword,status)
                }
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
            },
            handleDeleteShop(index){
                let length = this.select_id.length;
                console.log(length)
                if(length > 0){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    if(index < length){
                        this.apiDelete('/api/goods/delete/' + this.select_id[index]).then((res)=>{
                            console.log(res);
                            if(res){
                                this.handleDeleteShop(index+1)
                            }
                        })
                    }else{
                        loading.close();
                        let status;
                        if(this.index == 0){
                            status = '';
                        }else if(this.index == 1){
                            status = 1;
                        }else{
                            status = 0;
                        }
                        this.$emit('on-goods-search','',status)
                    }
                }

            },
            handleLowerShop(index){
                let length = this.select_id.length;
                if(length){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    if(index <= (length-1)){
                        this.apiPost('/api/goods/update/' + this.select_id[index],{status:1}).then((res)=>{
                            if(res){
                                this.handleLowerShop(index+1)
                            }
                        })
                    }else{
                        loading.close();
                        let status;
                        if(this.index == 0){
                            status = '';
                        }else if(this.index == 1){
                            status = 1;
                        }else{
                            status = 0;
                        }
                        this.$emit('on-goods-search','',status)
                    }
                }

            },
            handleUpperShop(index){
                let length = this.select_id.length;
                if(length){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    if(index <= (length-1)){
                        this.apiPost('/api/goods/update/' + this.select_id[index],{status:0}).then((res)=>{
                            if(res){
                                this.handleUpperShop(index+1);
                            }
                        })
                    }else{
                        loading.close();
                        let status;
                        if(this.index == 0){
                            status = '';
                        }else if(this.index == 1){
                            status = 1;
                        }else{
                            status = 0;
                        }
                        this.$emit('on-goods-search','',status)
                    }
                }

            }
        },
        mixins:[http]
    }
</script>

<style scoped>

</style>
