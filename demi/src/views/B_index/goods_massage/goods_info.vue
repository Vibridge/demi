<template>
    <div>
        <div class="goods_table">
            <el-table
                    ref="multipleTable"
                    :data="shopList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{'text-align':'center','height':'25px','background-color':'#EBECF0','padding':'0','line-height':'25px'}"
                    :cell-style="{'text-align':'center'}"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        min-width="120"
                >
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <div style="align-self: center">
                                <img v-if="scope.row.images.length > 0" style="width: 75px;height: 75px;margin-right: 10px"
                                     :src="$config.baseUrl + scope.row.images[0].file_path" alt="">
                            </div>
                            <div style="align-self: center;">
                                <p style="color: #24BFFF;">{{scope.row.title}}</p>
                                <p style="color: #CCCCCC;font-size: 12px">ID:{{scope.row.goods_id}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="价格"
                        width="120">
                    <template slot-scope="scope">
                        <div>
                            <p style="color: #FF0000;"><span>￥</span>{{scope.row.price}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="inventory"
                        label="库存"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="创建时间"
                        width="160"
                >
                    <template slot-scope="scope">
                        <div style="text-align: left">
                            <p>{{scope.row.created_at}}</p>
                            <p v-if="scope.row.status" style="color: #66FF33">出售中</p>
                            <p v-else style="color: #FF8033;font-size: 12px">仓库中</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="handleEditShop(scope.row.goods_id)">编辑</el-button>
                        <el-button v-if="scope.row.status == 1" type="text" size="mini" @click="handleChangeStatus(0,scope.row.goods_id)">下架</el-button>
                        <el-button v-if="scope.row.status == 0" type="text" size="mini" @click="handleChangeStatus(1,scope.row.goods_id)">上架</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import http from '../../../libs/http'

    export default {
        name: 'goods_info',
        props: ['shopList','index'],
        data() {
            return {
                multipleSelection: [],
                title:[],
                sort_id:null,
                goods_id:null
            }
        },
        // inject: ['reload'],
        mounted() {},
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit('on-select-list',this.multipleSelection)
            },

            handleChangeStatus(status,id){
                this.apiPost('/api/goods/update/' + id,{status:status}).then((res)=>{
                    let status;
                    if(this.index == 0){
                        status = '';
                    }else if(this.index == 1){
                        status = 1;
                    }else{
                        status = 0;
                    }
                    this.$emit('on-goods-search','',status)
                })
            },

            handleEditShop(id){
                this.title = [];
                this.apiGet('/api/goods/info/' + id).then((res)=>{
                    if(res){
                        this.title.push(res.title);
                        this.sort_id = res.sort_id;
                        this.goods_id = res.goods_id;
                        this.handleAttrTitle(res.sort_id)
                    }
                });

            },
            handleAttrTitle(id){
                this.apiGet('/api/sort/info/' + id).then((res) => {
                    this.title.push(res.title);
                    if(res.pid > 0){
                        this.handleAttrTitle(res.pid)
                    }else{
                        let sort_title;
                        sort_title = this.title.reverse().join(' > ');
                        this.$router.push({
                            path: "/B_index/B_person/create/goods_info",
                            query: {
                                title: sort_title, sort_id: this.sort_id, update:1,goods_id:this.goods_id
                            }
                        })
                    }
                });
            }
        },
        mixins:[http]
    }
</script>

<style lang="stylus">
    .goods_info_contain
        font-size: 14px;

        .goods_info_search
            padding 0 28px
            text-align left

            .info_search_wrap
                display flex
                padding-bottom 28px
                justify-content space-between
                border-bottom 1px dashed rgba(230, 230, 230, 1);

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

            .goods_coc
                display flex
                padding 25px 0

                .el-button
                    width 63px
                    border-radius: 4px;
                    margin-right 16px
                    color: rgba(51, 51, 51, 1);
                    background: rgba(240, 242, 245, .3);
                    border: 1px solid #999999;

                p
                    font-size: 12px;
                    align-self center
                    color: rgba(153, 153, 153, 1);

        .goods_table
            height: 1143px;
            overflow-y auto

            .el-table
                .el-table__header
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-left: 1px solid white;
                    border-right: 1px solid white;

                    .has-gutter
                        color #666666
                        font-size 12px

                        tr
                            th:nth-child(1)
                                .cell
                                    text-align left
                                    padding 0 13px

                            th:nth-child(2)
                                .cell
                                    text-align left

</style>
