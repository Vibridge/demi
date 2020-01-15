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
                                <img style="width: 75px;height: 75px;margin-right: 10px"
                                     :src="$config.baseUrl + scope.row.images[0].file_path" alt="">
                            </div>
                            <div style="align-self: center;">
                                <p style="color: #24BFFF;">{{scope.row.title}}</p>
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
                        <el-button type="text" size="mini">编辑</el-button>
                        <el-button type="text" size="mini">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods_info',
        props: ['shopList'],
        data() {
            return {

                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: []
            }
        },
        mounted() {
            console.log(this.shopList)
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
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