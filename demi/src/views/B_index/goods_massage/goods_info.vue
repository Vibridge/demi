<template>
    <div class="goods_info_contain">
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
                    <el-button type="primary" size="mini">搜索</el-button>
                    <el-button type="primary" size="mini">重置</el-button>
                </div>
            </div>
            <div class="goods_coc">
                <el-button type="primary" size="mini">删除</el-button>
                <el-button type="primary" size="mini">上架</el-button>
                <el-button type="primary" size="mini">下架</el-button>
                <p>已选商品（6）</p>
            </div>
        </div>
        <div class="goods_table">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{'text-align':'center','height':'25px','background-color':'#EBECF0','padding':'0','line-height':'25px'}"
                   >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        width="120"
                        show-overflow-tooltip
                >
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="价格"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="库存"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="销量"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="创建时间"
                        >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作"
                        >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'goods_info',
        data(){
            return{
                goods_name:'',
                goods_id:'',
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
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style lang="stylus">
    .goods_info_contain
        font-size:14px;
        .goods_info_search
            padding 0 28px
            text-align left
            .info_search_wrap
                display flex
                padding-bottom 28px
                justify-content space-between
                border-bottom 1px dashed rgba(230,230,230,1);
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
                    border-radius:4px;
                    margin-right 16px
                    color:rgba(51,51,51,1);
                    background:rgba(240,242,245,.3);
                    border:1px solid #999999;
                p
                    font-size:12px;
                    align-self center
                    color:rgba(153,153,153,1);
        .goods_table
            height:1143px;
            overflow-y auto
            .el-table
                .el-table__header
                    border:1px solid rgba(204,204,204,1);
                    border-left:1px solid white;
                    border-right:1px solid white;
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