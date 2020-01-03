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
            <div class="category_list" v-for="(item,index) in 5" :key="index">
                <div class="category_connect">
                    <ul>
                        <li v-for="item in 5">
                            <p>服装配件/皮带/帽子/围巾</p>
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
        data(){
            return{
                first_category:'',
                active_first_category: [],
            }
        },
        methods:{
            handleShowFirst(index) {
                let length = this.active_first_category.length;
                if (length > 0) {
                    if (this.active_first_category[index] === index) {
                        this.$set(this.active_first_category, index, '')
                    } else {
                        this.$set(this.active_first_category, index, index)
                    }
                } else {
                    console.log('d')
                    this.$set(this.active_first_category, index, index)
                }
                console.log(this.active_first_category)
            },
        }

    }
</script>

<style scoped>

</style>