<template>
    <div>
        <div class="search">
            <el-input
                    placeholder="名称/拼音"
                    suffix-icon="el-icon-search"
                    v-model="first_category">
            </el-input>
        </div>
        <div class="main">
            <div class="category_list" v-for="(item,index) in row" :key="item.sort_id">
                <div class="category_connect">
                    <ul>
                        <li @click="handleNextCategory(item)">
                            <p>{{item.title}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'category',
        props:['row'],
        data(){
            return{
                first_category:'',
                active_first_category: [],
            }
        },
        mounted(){
            console.log(this.row)
        },
        methods:{
            handleNextCategory(data){
                if(data.children){
                    this.$emit('handle-next-sort',data.level,data.children)
                }else{
                    this.$emit('handle-select-sort',data.sort_id,data.title)
/*
                    this.second_category = false;
                    this.second_category = [];
                    this.select_sort_id = data.sort_id;
                    this.select_sort_title = data.title;*/
                }
            },
        }

    }
</script>

<style scoped>

</style>
