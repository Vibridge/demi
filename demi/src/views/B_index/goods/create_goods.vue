<template>
    <div>
        <div class="create_wrap">
            <!--<div v-if="category_popper" class="category_popper">
                <ul v-for="level1 in options" :key="level1.sort_id">

                    <li v-for="level2 in level1.children" :key="level2.sort_id" v-show="handleShow(level2.sort_id)">

                        <p v-if="!level2.children && handleCategory(level1.title + level2.title,level2.sort_id)">
                            {{level1.title}} > {{level2.title}}
                        </p>

                        <div v-for="level3 in level2.children" :key="level3.sort_id">
                            <p v-if="level2.children && !level3.children && handleCategory(level1.title + level2.title + level3.title,level2.sort_id)" >
                                {{level1.title}} > {{level2.title}} > {{level3.title}}
                            </p>

                            <div v-for="level4 in level3.children" :key="level4.sort_id">
                                <p v-if="level3.children && handleCategory(level1.title + level2.title + level3.title + level4.title,level2.sort_id)" >
                                    {{level1.title}} > {{level2.title}} > {{level3.title}} > {{level4.title}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="search_all">
                <el-input v-model.trim="category" placeholder="请输入内容" clearable @input="category_popper = false"
                          @clear="category_popper = false"></el-input>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </div>-->

            <!--<p class="create_history">发布历史：五金>仪表>电阻测试仪</p>-->
            <div class="category">
                <div class="category_contain">
                   <!-- <div class="search">
                        <el-input
                                placeholder="名称/拼音"
                                suffix-icon="el-icon-search"
                                v-model="first_category">
                        </el-input>
                    </div>-->
                    <div class="main">
                        <div class="category_list" v-for="(level1,index) in options" :key="index">
                            <div class="category_title" @click="handleShowFirst(level1.title,index)">
                                {{level1.title}}
                                <i :class="(active_first_category.length > 0) && (active_first_category[index] === index) ? 'active el-icon-arrow-right' : 'el-icon-arrow-right'"></i>
                            </div>
                            <transition name="slide-fade">
                                <div class="category_connect"
                                     v-if="(active_first_category.length > 0) && (active_first_category[index] === index)">
                                    <ul>
                                        <li v-for="level2 in level1.children" :class="active_select === level2.sort_id ? 'active' : ''" @click="handleSecondCategory(level2)">
                                            <p>{{level2.title}}</p>
                                        </li>
                                    </ul>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <category v-for="(item,index) in paginate" :key="item.level" class="category_contain" :row="item.row" @handle-next-sort="handleNextSort" @handle-select-sort="handleSelectSort"></category>
            </div>
            <div class="select_result">
                <p>已选类目：{{show_sort_title}}</p>
            </div>
            <div class="next">
                <el-button type="primary" @click="handleCreateInfo" :disabled="!select_sort_id">下一步</el-button>
            </div>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
    import bottom from '../../../components/B_person_bottom'
    import category from './components/category'
    // import searchCategory from './components/search_category'
    import http from '../../../libs/http'

    export default {
        name: 'create_goods',
        components: {bottom,category},
        data() {
            return {
                first_category: '',
                // second_category: '',
                active_first_category: [],
                category: '',
                category_popper: false,
                options: [],
                show_sort_id: null,
                paginate:[],

                select_sort_id:null,
                first_category_title:'',
                select_sort_title:[],
                show_sort_title:'',

                active_select:null
            }
        },
        mounted() {
            this.apiGet('/api/sort/paginate?format=tree').then((res) => {
                this.options = res;
                console.log(res)
            })
        },
        methods: {
            handleSearch() {
                if(this.category){
                    this.category_popper = true;
                    this.show_sort_id = null
                }
            },

            handleShow(id){
                if(this.show_sort_id == id){
                    return true
                }else{
                    return false
                }
            },

            handleCategory(value, id) {
                let array1 = value.split('');
                let array2 = this.category.split('');
                let length1 = array1.length;
                let length2 = array2.length;
                for(let y = 0; y < length2;y++){
                    for (let i = 0; i < length1; i++) {
                        if (array2[y] == array1[i]) {
                            this.show_sort_id = id;
                            break
                        }
                    }
                }
                if(this.show_sort_id){
                    return true
                }else {
                    return false
                }
            },
            handleShowFirst(title,index) {
                this.first_category_title = title
                let length = this.active_first_category.length;
                if (length > 0) {
                    if (this.active_first_category[index] === index) {
                        this.$set(this.active_first_category, index, '')
                    } else {
                        this.$set(this.active_first_category, index, index)
                    }
                } else {
                    this.$set(this.active_first_category, index, index)
                }
            },

            handleSecondCategory(data){
                this.paginate = [];
                this.select_sort_title = [];
                this.select_sort_id = null;
                this.show_sort_title = '';
                this.$set(this.select_sort_title, 0, this.first_category_title + '>' + data.title)
                this.active_select = data.sort_id;
                if(data.children){
                    let item = {
                        level:data.level,
                        row:data.children
                    };
                    let length = this.paginate.length;
                    if(length>0){
                        for(let i=0;i<length;i++){
                            if((this.paginate[i].level !== level) && (i === (length-1))){
                                this.paginate.push(item)
                            }
                        }
                    }else{
                        this.paginate.push(item)
                    }

                }else{
                    this.select_sort_id = data.sort_id;
                    this.show_sort_title = this.first_category_title + '>' + data.title;
                }
            },

            handleNextSort(level,data,title){
                let array = [];
                let select_sum = this.paginate.length;
                this.$set(this.select_sort_title, (level-1),  (title));
                for (let y = 0;y < select_sum;y++){
                    if(y <= (level - 2)){
                        array.push(this.paginate[y]);
                    }
                }
                this.paginate = array;
                let item = {
                    level:level,
                    row:data
                };
                let length = this.paginate.length;
                if(length>0){
                    for(let i=0;i<length;i++){
                        if((this.paginate[i].level != level) && (i === (length-1))){
                            this.paginate.push(item);
                            break
                        }else if(this.paginate[i].level == level){
                            this.$set(this.paginate,i,item);
                            break
                        }
                    }
                }

            },
            handleSelectSort(level,id,title){
                let array = [];
                let length1 = this.paginate.length;
                for (let y = 0;y<length1;y++){
                    if(y <= (level - 2)){
                        array.push(this.paginate[y]);
                    }
                }
                this.paginate = array;
                this.select_sort_id = id;
                this.$set(this.select_sort_title, (level-1),  title);

                let select = '';
                for(let i = 0;i<level;i++){
                    if(i === (level-1)){
                        select = select + this.select_sort_title[i]
                    }else{
                        select = select + this.select_sort_title[i] + '>'
                    }
                }
                this.show_sort_title = select

            },

            handleCreateInfo() {
                this.$router.push({
                    path: "/B_index/B_person/create/goods_info",
                    query: {
                        title: this.show_sort_title, sort_id: this.select_sort_id, update:0
                    }
                })
            }
        },
        mixins: [http]
    }
</script>

<style lang="stylus">
    .create_wrap
        width 1000px
        text-align left
        margin 32px auto
        position relative

        .search_all
            display flex
            margin-bottom 22px

            .el-input
                width: 602px;
                height: 37px;
                margin-right 15px

                .el-input__inner
                    height: 37px;
                    line-height 37px
                    border: 1px solid rgba(36, 191, 255, 1);

            .el-button
                width: 104px;
                font-size: 16px;
                border-radius: 6px;
                padding: 10px 36px
                border none
                color: rgba(255, 255, 255, 1);
                background: rgba(36, 191, 255, 1);

        .create_history
            font-size: 14px;
            color: rgba(51, 51, 51, 1);

        .category
            min-width 248px;
            max-height 1000px
            height 434px
            display flex
            margin 24px auto
            .category_contain
                width 249px
                box-sizing border-box
                .search
                    background: #fff;
                    padding 14px 19px
                    border 1px solid rgba(76, 176, 255, 1)
                    border-bottom none
                    .el-input
                        .el-input__inner
                            height 24px
                            line-height 24px

                        .el-input__icon
                            line-height 24px

                .slide-fade-enter-active {
                    transition: all .3s ease;
                }

                .slide-fade-leave-active {
                    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
                }

                .slide-fade-enter, .slide-fade-leave-to {
                    transform: translateY(-10px);
                    opacity: 0;
                }

                .main
                    padding-top 10px
                    height 382px
                    overflow-y scroll
                    background: #fff;
                    border 1px solid rgba(76, 176, 255, 1)
                    /*border-top none*/

                    .category_list
                        border-bottom: 1px dashed rgba(204, 204, 204, 1);

                    .category_title
                        padding 7px 4px
                        color: rgba(36, 191, 255, 1);

                        .active
                            transform: rotate(90deg);
                            transition-property: all;
                            transition-duration: 0.3s;
                            transition-timing-function: linear;

                        i
                            transform: rotate(0deg);
                            transition-property: all;
                            transition-duration: 0.3s;
                            transition-timing-function: linear;
                            color: rgba(36, 191, 255, 1);

                    .category_connect
                        ul
                            li:hover
                                background: rgba(240, 240, 240, 1);

                            li
                                font-size: 14px;
                                color #333333
                                padding 7px 18px
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                border-left: 2px solid transparent;
                            .active
                                border-left: 2px solid #0085D7!important;
                                background: rgba(240, 240, 240, 1);


        .select_result
            height: 58px;
            width: 1000px;
            font-size: 14px;
            margin 25px 0
            line-height 58px
            color: rgba(51, 51, 51, 1);
            background: rgba(240, 240, 240, 1);

            p
                margin-left 25px

        .next
            text-align center

            .is-disabled
                background-color #f7f8fa!important
                color #b3b3b3!important
                border 1px solid #b3b3b3!important
            .el-button
                width: 200px;
                border none
                /*padding 17px 74px*/
                font-size: 18px;
                border-radius: 4px
                box-sizing border-box
                color: rgba(255, 255, 255, 1);
                background: rgba(36, 191, 255, 1);



        .category_popper
            position absolute
            top: 37px
            left 0
            padding 8px 0
            background-color #fff
            width 602px !important
            border: 1px solid #DCDEE3;

            ul
                max-height: 268px;
                overflow-y: auto;
                li:hover
                    background-color #f2f3f7

                li
                    height 32px
                    color #333333
                    font-size 12px
                    padding 0 20px
                    line-height 32px


    /*.category_popper
        display block
    .category_popper_hide
        display none*/

</style>
