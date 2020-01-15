<template>
    <div>
       <!-- <div class="search">
            <el-input
                    placeholder="名称/拼音"
                    suffix-icon="el-icon-search"
                    v-model="first_category">
            </el-input>
        </div>-->
        <div class="main">
            <div class="category_list" v-for="(item,index) in row" :key="item.sort_id">
                <div class="category_connect">
                    <ul>
                        <li :class="select_category === item.sort_id ? 'active' : ''" @click="handleNextCategory(item)">
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
                select_category:null,
            }
        },
        mounted(){
            // console.log(this.row)
        },
        methods:{
            handleNextCategory(data){
                this.select_category = data.sort_id;
                if(data.children){
                    this.$emit('handle-next-sort',data.level,data.children,data.title)
                }else{
                    this.$emit('handle-select-sort',data.level,data.sort_id,data.title)
                }
            },
        }

    }
</script>

<style scoped>

</style>
