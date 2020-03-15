<template>
    <div>
        <div class="create_goods_info" v-if="!success">
            <div class="create_title">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基础信息" name="first"></el-tab-pane>
                    <el-tab-pane label="销售信息" name="second"></el-tab-pane>
                    <el-tab-pane label="图文描述" name="third"></el-tab-pane>
                    <el-tab-pane label="其他信息" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="select_category">
                    <p>当前类目：{{this.$route.query.title}}</p>
                    <el-button type="primary" v-if="!isUpdate" @click="handleBackSelect">切换类目</el-button>
                </div>
            </div>
            <div id="1" class="goods_basic">
                <div class="goods_basic_title">
                    基础信息
                </div>
                <div class="goods_basic_input">
                    <div class="goods_basic_name">
                        <p class="goods_basic_label"><span style="color:#FF0000">* </span>宝贝标题</p>
                        <el-input
                                size="small"
                                placeholder="输入2 - 20个汉字或字符"
                                minlength="2"
                                maxlength="20"
                                show-word-limit
                                v-model.trim="goods_name">
                        </el-input>
                    </div>
                    <!--<div class="goods_basic_category">
                        <p class="goods_basic_label"><span style="visibility: hidden">* </span>类目属性</p>
                        <div class="goods_basic_category_input">
                            <div class="number">
                                <p class="number_label">货号</p>
                                <el-input
                                        size="mini"
                                        clearable
                                        v-model="goods.goods_name">
                                </el-input>
                            </div>
                        </div>
                    </div>-->
                </div>
            </div>
            <div id="2" class="goods_sale">
                <div class="goods_sale_title">
                    销售信息
                </div>
                <div class="goods_sale_info" v-if="goods_info && goods_info.attrs">
                    <div class="goods_sale_category" v-for="(label,index) in goods_info.attrs"
                         :key="label.attribute_id">
                        <p class="goods_sale_label">{{label.title}}分类</p>
                        <div class="select_category_value" v-if="checkList[index].values">
                            <el-checkbox-group v-model="checkList[index].values">
                                <el-checkbox v-for="checkbox in label.children" :key="checkbox.attribute_id"
                                             :label="checkbox.title"
                                             @change="handleSelectAttr(checkbox.title)"></el-checkbox>
                                <el-checkbox v-for="item in custom_attr[index].values" v-if="item" :label="item"
                                             @change="handleSelectAttr(item)"></el-checkbox>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </el-checkbox-group>
                            <div style="display: flex">
                                <el-input v-model="custom[index]" placeholder="请输入自定义值" size="medium"></el-input>
                                <el-button type="primary" size="small" @click="handleAddAttr(index)">添加</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="goods_table" v-if="only.length > 0">
                        <div class="table_title">
                            <p>宝贝销售规格 <span>在标题栏中输入或选择内容可以进行筛选和批量填充</span></p>
                            <el-button type="primary" size="small" @click="handleFill">批量填充</el-button>
                        </div>
                        <div>
                            <el-table
                                    :data="tableData"
                                    border
                                    max-height="250px"
                                    style="max-width: 770px;"
                                    :header-row-style="{'height':'44px'}"
                                    :header-cell-style="{'padding':'0'}"
                                    :cell-style="{'height':'32px','padding':'0'}"
                                    row-key="index"
                            >
                                <el-table-column
                                        v-if="only"
                                        v-for="(label,index) in only"
                                        :label="label.title"
                                        width="112">
                                    <template slot-scope="scope">
                                        <p>{{scope.row[index]}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        width="160"
                                >
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="sale"
                                                size="mini"
                                                type='number'
                                                @change="handleInputChange(scope.$index)"
                                                placeholder="价格（元）"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_sale[scope.$index]"
                                                size="mini"
                                                type='number'
                                                @input="handleInputChange(scope.$index)"
                                                placeholder="价格（元）"/>
                                    </template>
                                </el-table-column>
                                <el-table-column width="160">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="sum"
                                                size="mini"
                                                type='number'
                                                @change="handleInputChange(scope.$index)"
                                                placeholder="数量（件）"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_sum[scope.$index]"
                                                size="mini"
                                                type='number'
                                                @input="handleInputChange(scope.$index)"
                                                placeholder="数量（件）"/>
                                    </template>
                                </el-table-column>
                                <el-table-column width="160">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="commission"
                                                size="mini"
                                                type='number'
                                                @change="handleInputChange(scope.$index)"
                                                placeholder="佣金（元）"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_commission[scope.$index]"
                                                size="mini"
                                                type='number'
                                                @input="handleInputChange(scope.$index)"
                                                placeholder="佣金（元）"/>
                                    </template>
                                </el-table-column>
                                <el-table-column width="186">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="code"
                                                size="mini"
                                                @change="handleInputChange(scope.$index)"
                                                placeholder="商品编码"/>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_code[scope.$index]"
                                                size="mini"
                                                @input="handleInputChange(scope.$index)"
                                                placeholder="商品编码"/>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="goods_price" v-if="only.length < 1">
                        <p class="goods_price_label"><span style="color:#FF0000">* </span>一口价</p>
                        <div class="goods_price_input">
                            <div style="display: flex">
                                <el-input
                                        size="small"
                                        :disabled="tableData.length > 0"
                                        v-model.trim="goods_price">
                                </el-input>
                                <span style="align-self: center">元</span>
                            </div>
                            <p>商品价格不能低于0.10元</p>
                        </div>
                    </div>
                    <div class="goods_price" v-if="only.length < 1">
                        <p class="goods_price_label"><span style="color:#FF0000">* </span>佣&nbsp;&nbsp;&nbsp;金</p>
                        <div class="goods_price_input">
                            <div style="display: flex">
                                <el-input
                                        size="small"
                                        :disabled="tableData.length > 0"
                                        v-model.trim="goods_salary">
                                </el-input>
                                <span style="align-self: center">元</span>
                            </div>
                        </div>
                    </div>
                    <div class="goods_price" v-if="only.length < 1">
                        <p class="goods_price_label"><span style="color:#FF0000">* </span>库&nbsp;&nbsp;&nbsp;存</p>
                        <div class="goods_price_input">
                            <div style="display: flex">
                                <el-input
                                        size="small"
                                        :disabled="tableData.length > 0"
                                        v-model.trim="goods_inventory">
                                </el-input>
                                <!--                                <span style="align-self: center">元</span>-->
                            </div>
                        </div>
                    </div>
                    <div class="goods_code" v-if="only.length < 1">
                        <p class="goods_code_label">商品编码</p>
                        <el-input
                                size="small"
                                placeholder="最多输入32个汉字和字符"
                                maxlength="32"
                                show-word-limit
                                v-model.trim="goods_no">
                        </el-input>
                    </div>
                </div>
            </div>
            <div id="3" class="goods_pic">
                <div class="goods_pic_title">
                    图文描述
                </div>
                <div class="goods_upload">
                    <div class="goods_pic_upload">
                        <p class="goods_pic_label"><span style="color:#FF0000">* </span>商品主图</p>
                        <div class="main_pic">
                            <p>商品主图大小不能超过3MB；建议800x800以上图片。</p>
                            <div class="upload-container">
                                <el-upload
                                        v-for="(item,index) in shop_img" :key="index"
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :data="{ 'index' : index}"
                                        :on-change="handleChange"
                                        :http-request="uploadShopImgFile"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="item.img" :src="$config.baseUrl + item.img" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <p v-if="!item.img" class="add-pic">添加图片</p>
                                    <div @mouseover="show_icon = index" @mouseleave="show_icon = null"
                                         style="width: 100%;height: 100%;position: absolute;top:0;left: 0;">
                                        <div v-if="(show_icon === index) && item.img" class="icon">
                                            <span v-on:click.stop="handleMoveFront(index)">
                                                <i v-if="index > 0" class="el-icon-arrow-left"></i>
                                            </span>
                                            <span v-on:click.stop="handleRemove(index,item.file_id)">
                                                <i class="el-icon-delete"></i>
                                            </span>
                                            <span v-on:click.stop="handleMoveAfter(index)">
                                                <i v-if="index !== (shop_img.length-1)" class="el-icon-arrow-right"></i>
                                            </span>
                                        </div>
                                    </div>

                                </el-upload>
                            </div>
                        </div>
                    </div>
                    <div class="goods_video_upload">
                        <p class="goods_video_label"><span style="color:#FF0000;visibility: hidden">* </span>主图视频</p>
                        <div class="main_video" v-loading="vid_loading">
                            <div class="upload-container">
                                <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :before-upload="beforeVidUpload"
                                        :http-request="uploadVidFile"
                                        :on-change="handleVidChange">
                                    <video id="video" class="avatar" :src="video_path"
                                           v-show="video_path" controls></video>
                                    <i v-show="!video_path" class="el-icon-plus avatar-uploader-icon"></i>
                                    <p class="add-pic">添加视频</p>
                                </el-upload>
                            </div>
                        </div>
                        <div class="goods_video_note">
                            <p>1.尺寸：建议1:1或16:9比例视频</p>
                            <p>2.时长：建议30秒到60秒以内短视频</p>
                        </div>
                    </div>
                    <div class="goods_look">
                        <p class="goods_look_label"><span style="color:#FF0000;visibility: hidden">* </span>商品详情</p>

                        <div class="edit_container">
                            <el-upload
                                    class="Editor-uploader"
                                    action=""
                                    :show-file-list="false"
                                    :on-change="handleChange"
                                    :http-request="uploadEditorImgFile"
                                    :before-upload="beforeAvatarUpload">
                            </el-upload>
                            <quill-editor
                                    v-model="content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)">
                            </quill-editor>
                        </div>
                    </div>
                </div>
            </div>
            <div id="4" class="goods_other">
                <div class="goods_other_title">
                    其他信息
                </div>
                <div class="goods_other_time">
                    <p class="goods_other_label"><span style="color:#FF0000">* </span>上架时间 </p>
                    <span class="goods_other_note">
                        未上架的商品在上架前请到“仓库中的宝贝”里编辑商品。
                    </span>
                    <div class="select_buy">
                        <div class="select_online" @click="handleSelect(1)">
                            <div style="align-self: center">
                                <img v-if="!active" src="../../../assets/img/weixuanz@2x.png" alt="">
                                <img v-else src="../../../assets/img/weixuanz_on@2x.png" alt="">
                            </div>
                            <p :style="!active ? 'color: #999999': 'color: #4d4d4d'">立即上架</p>
                        </div>
                        <div class="select_store" @click="handleSelect(0)">
                            <div style="align-self: center">
                                <img v-if="active" src="../../../assets/img/weixuanz@2x.png" alt="">
                                <img v-else src="../../../assets/img/weixuanz_on@2x.png" alt="">
                            </div>
                            <p :style="!active ? 'color: #4d4d4d': 'color: #999999'">放入仓库</p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="create_goods_sumbit">
                <el-button type="primary" size="medium" @click="handleSubGoodInfo">提交商品信息</el-button>
            </div>
        </div>
        <div class="create_call_back" v-if="success">
            <div class="call_back_title">
                <div>
                    <img src="../../../assets/img/create_call_back.png" alt="">
                </div>
                <div class="call_back_contain">
                    <p>商品发布成功</p>
                    <p v-if="false">商品已经放到仓库</p>
                    <p>商品ID=6100876915</p>
                </div>
            </div>
            <div class="next_coc">
                <el-button type="primary" size="medium" @click="handleLook">查看出售中的商品</el-button>
                <el-button type="primary" size="medium" @click="handleAgain">继续发布</el-button>
            </div>

        </div>
        <bottom :style="success ? 'position:fixed;bottom:0' : 'margin-bottom: 84px'"></bottom>
    </div>

</template>

<script>
    import bottom from '../../../components/B_person_bottom'
    import http from '../../../libs/http'
    import {addQuillTitle} from '../../../libs/quill-title.js'

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ];
    export default {
        name: 'create_goods_info',
        components: {bottom},
        data() {
            return {
                //编辑判断
                isUpdate: null,

                //类目id
                sort_id: null,

                //类目详情
                goods_info: null,

                //导航
                activeName: 'first',

                //货号
                goods_name: "",
                goods_price: '',
                goods_no: '',
                goods_salary: '',
                goods_inventory: '',

                //自定义属性值
                checkList: [],
                custom_attr: [],
                custom: [],

                //sku
                sku_array: [],
                sku_attr_id: [],
                sku_select_attr: [],
                sku_sale: [],
                sku_sum: [],
                sku_commission: [],
                sku_code: [],

                //创建时先添加的sku
                isCreateSku: [],

                //批量填充
                sale: '',
                sum: '',
                commission: '',
                code: '',

                //表格数据
                tableData: [],

                //图片
                shop_img: [
                    {img: '', file_id: ''},
                    {img: '', file_id: ''},
                    {img: '', file_id: ''},
                    {img: '', file_id: ''},
                    {img: '', file_id: ''},
                ],

                //上传文件
                files: '',

                //删除等icon显示判断
                show_icon: null,

                //视频
                vid_loading: false,
                video: null,
                real_video_path: null,
                video_path: '',
                cover: '',

                //富文本编辑器
                content: `<p>hello world</p>`,
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.getElementsByClassName('Editor-uploader')[0].getElementsByTagName('input')[0].click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    },

                },

                //商品状态
                active: 1,

                //创建成功
                success: false,

                //更新时商品的sku
                isUpdateSku: [],

                isSelectSku: [],

                only: []
            };
        },
        computed: {
            //富文本编辑器
            editor() {
                return this.$refs.myQuillEditor.quillEditor;
            },
        },
        mounted() {
            //富文本编辑器
            addQuillTitle();

            //属性信息
            this.initalize()
        },
        created() {
            //属性信息的id
            this.getParams()
        },
        methods: {
            initalize() {
                this.apiGet('/api/sort/info/' + this.sort_id).then((res) => {
                    this.goods_info = res;
                    let length = res.attrs.length;
                    if (length > 0) {
                        for (let i = 0; i < length; i++) {
                            this.checkList.push({
                                values: [],
                                attribute_id: res.attrs[i].attribute_id,
                                title: res.attrs[i].title
                            });
                            this.custom_attr.push({values: []});
                            // this.custom.splice(length)
                        }
                    }
                })
            },

            //类目id
            getParams() {
                // 取到路由带过来的参数
                this.sort_id = this.$route.query.sort_id;
                this.isUpdate = this.$route.query.update;
            },

            //导航指定div
            handleClick(tab, event) {
                var el = document.getElementById(`${parseInt(tab.index) + 1}`);
                document.getElementById('app').scrollTo(0, el.offsetTop);
            },

            //返回选择类目
            handleBackSelect() {
                this.$router.push({
                    name: 'create_goods',
                });
            },

            //自定义属性值
            handleAddAttr(index) {
                this.custom_attr[index].values.push(this.custom[index]);
                this.custom[index] = ''

            },

            //批量填充
            handleFill() {
                if (this.tableData) {
                    //价格
                    let tableLength = this.tableData.length
                    if (this.sale) {
                        let none = true;
                        let lessThan = [];
                        let length = this.sku_commission.length;
                        for (let i = 0; i < length; i++) {
                            if (this.sku_commission[i] && (this.sku_commission[i] > 0)) {
                                none = false
                            }
                            if (this.sale - this.sku_commission[i] > 0) {
                                lessThan.push(i)
                            }
                        }
                        let has = lessThan.length;
                        if ((parseInt(this.commission) && (parseInt(this.commission) < parseInt(this.sale))) || (!this.commission && none)) {
                            // let length = this.sku_sale.length;
                            for (let i = 0; i < tableLength; i++) {
                                this.$set(this.sku_sale, i, this.sale)
                            }
                            this.sale = '';
                        } else if (parseInt(this.commission) && (parseInt(this.commission) > parseInt(this.sale))) {
                            this.$message.error('佣金不能大于商品价格')
                        } else if (!this.commission && has > 0) {
                            for (let i = 0; i < has; i++) {
                                this.$set(this.sku_sale, lessThan[i], this.sale)
                            }
                            this.sale = '';
                        } else if (!this.commission && has < 1) {
                            this.$message.error('佣金不能大于商品价格')
                        }
                    }

                    //数量
                    if (this.sum) {
                        // let length = this.sku_sum.length;
                        for (let i = 0; i < tableLength; i++) {
                            this.$set(this.sku_sum, i, this.sum)
                        }
                        this.sum = ''
                    }

                    //佣金
                    if (this.commission) {
                        let none = true;
                        let lessThan = [];
                        let length = this.sku_sale.length;
                        for (let i = 0; i < length; i++) {
                            if (this.sku_sale[i] && (this.sku_sale[i] > 0)) {
                                none = false
                            }
                            if (this.sku_sale[i] - this.commission > 0) {
                                lessThan.push(i)
                            }
                        }
                        let has = lessThan.length;
                        if ((parseInt(this.sale) && (parseInt(this.commission) < parseInt(this.sale))) || (!this.sale && none)) {
                            // let length = this.sku_commission.length;
                            for (let i = 0; i < tableLength; i++) {
                                this.$set(this.sku_commission, i, this.commission)
                            }
                            this.commission = null
                        } else if ((parseInt(this.sale) && (parseInt(this.commission)) > parseInt(this.sale))) {
                            this.$message.error('佣金不能大于商品价格')
                        } else if (!this.sale && has > 0) {
                            for (let i = 0; i < has; i++) {
                                this.$set(this.sku_commission, lessThan[i], this.commission)
                            }
                            this.commission = null
                        } else if (!this.sale && has < 1) {
                            this.$message.error('佣金不能大于商品价格')
                        }
                    }

                    //编号
                    if (this.code) {
                        // let length = this.sku_code.length;
                        for (let i = 0; i < tableLength; i++) {
                            this.$set(this.sku_code, i, this.code)
                        }
                        this.code = ''
                    }
                }
            },

            //佣金输入判断
            handleInputChange(index) {
                let length = this.sku_commission.length;
                for (let i = 0; i < length; i++) {
                    if (this.sku_sale[i] && (this.sku_commission[i] - this.sku_sale[i] > 0)) {
                        this.$set(this.sku_commission, i, null)
                    }
                }
                console.log('a')
               /* let createSku = this.isCreateSku.length;
                if (createSku > 0) {
                    for (let k = 0; k < createSku; k++) {
                        for (let i in this.isCreateSku[k]) {
                            this.isCreateSku[k][i].price = this.sku_sale[k]
                            this.isCreateSku[k][i].salary = this.sku_commission[k]
                            this.isCreateSku[k][i].inventory = this.sku_sum[k]
                            this.isCreateSku[k][i].goods_no = this.sku_code[k]
                        }
                    }
                }
                console.log(this.isCreateSku)*/

            },

            //sku
            handleSelectAttr(item) {
                let length = this.isSelectSku.length;
                if (length > 0) {
                    let add = false;
                    let index = 0
                    for (let i = 0; i < length; i++) {
                        if (this.isSelectSku[i] === item) {
                            add = true
                            index = i
                        }
                    }
                    if (!add) {
                        this.isSelectSku.push(item)
                    } else {
                        this.isSelectSku.splice(index, 1)
                    }
                } else {
                    this.isSelectSku.push(item)
                }
                this.tableData = [];
                this.sku_array = [];
                this.sku_sale = [];
                this.sku_sum = [];
                this.sku_commission = [];
                this.sku_code = [];
                this.sku_attr_id = [];
                this.sku_select_attr = [];
                this.only = []
                this.handleSku(0, []);
                this.handleSkuAttrId(0)
            },
            handleSku(index, data) {
                let all_length = this.checkList.length;
                let length = this.checkList[index].values.length;
                if (length > 0) {
                    let has = this.only.length;
                    let hasIndex = false;
                    for (let h = 0; h < has; h++) {
                        if (this.only[h].title == this.checkList[index].title) {
                            hasIndex = true
                        }
                    }
                    if (!hasIndex) {
                        this.only.push(this.checkList[index])
                    }
                    /* if(index != 0){
                         this.only = this.checkList
                     }else{
                         this.only.push(this.checkList[index])
                     }*/
                    for (let i = 0; i < length; i++) {
                        if (index < all_length - 1) {
                            data[index] = this.checkList[index].values[i];
                            this.handleSku(index + 1, data)
                        } else {
                            let subItem = [...data, this.checkList[index].values[i]];
                            this.tableData.push(subItem);
                        }
                    }
                } else {
                    if (index != 0) {
                        if ([...data].length > 0) {
                            let array = [];
                            for (let i = 0; i < [...data].length; i++) {
                                if ([...data][i]) {
                                    array.push([...data][i]);
                                }
                            }
                            this.tableData.push([...array]);
                            // this.tableData.push([...data]);
                        }
                    }
                    if (index < all_length - 1) {
                        this.handleSku(index + 1, [])
                    }
                }

                /*if (this.tableData.length > 0) {
                    let table = this.tableData.length;
                    for (let i = 0; i < table; i++) {
                        this.$set(this.sku_sale, i, '');
                        this.$set(this.sku_sum, i, '');
                        this.$set(this.sku_commission, i, '');
                        this.$set(this.sku_code, i, '')
                    }
                }*/

            },
            handleSkuAttrId(index) {
                let all_length = this.checkList.length;
                if (index < all_length) {
                    let length = this.checkList[index].values.length;
                    console.log(this.checkList)
                    if (length > 0) {
                        for (let i = 0; i < length; i++) {
                            this.sku_attr_id.push(this.checkList[index].attribute_id);
                            this.sku_select_attr.push(this.checkList[index].values[i]);
                            // if (i === (length - 1)) {
                            //     this.handleSkuAttrId(index + 1);
                            // }
                        }
                    }
                    this.handleSkuAttrId(index + 1);
                }
            },

            //图片上传
            handleChange(file, fileList) {
                this.files = fileList;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 3;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG PNG格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!');
                }
                return isJPG || isPNG && isLt2M;
            },
            uploadShopImgFile(param) {
                // 创建表单对象
                // this.imageUrl = URL.createObjectURL(this.files.raw);
                // this.pic_loading = true;
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files', this.files[i].raw);
                }
                this.apiPost('/file/uploads', form).then((res) => {
                    if (res) {
                        this.shop_img[param.data.index].img = res[0]
                        // this.imageUrl = this.$config.baseUrl + res[0];
                        // this.form.shop_logo = res[0];
                        /*this.pic_loading = false;*/
                    }
                });
            },

            //改变图片顺序
            handleMoveFront(index) {
                let length = this.shop_img.length;
                let fornt;
                for (let i = 0; i < length; i++) {
                    fornt = this.shop_img[index - 1];
                    this.$set(this.shop_img, index - 1, this.shop_img[index]);
                    this.$set(this.shop_img, index, fornt);
                }
            },

            //删除图片
            handleRemove(index, id) {
                this.$set(this.shop_img, index, {'img': ''});
                /* if (id) {
                     this.apiDelete('api/goods/delete/file/' + id).then((res) => {
                         console.log(res)
                     })
                 }*/
            },
            handleMoveAfter(index) {
                let length = this.shop_img.length;
                let after;
                for (let i = 0; i < length; i++) {
                    after = this.shop_img[index + 1];
                    this.$set(this.shop_img, index + 1, this.shop_img[index]);
                    this.$set(this.shop_img, index, after);
                }
            },

            //视频上传
            beforeVidUpload(file) {
                if (!(file.type.indexOf('video') === 0 && file.type && /\.(?:mp4|rmvb|avi|ts|ogg|flv|wmv|mkv)$/.test(file.name.toLowerCase()))) {
                    this.$message.error('上传视频只限 mp4,rmvb，avi，ts，ogg，flv，wmv，mkv格式!');
                    return false
                } else {
                    return true
                }
            },
            handleVidChange(file) {
                this.video = file.raw;
            },
            uploadVidFile() {
                this.vid_loading = true
                var windowURL = window.URL || window.webkitURL;
                var videoURL = windowURL.createObjectURL(this.video);
                var video = document.getElementById('video');
                this.video_path = videoURL;
                video.src = videoURL;
                var scale = 0.8;
                video.setAttribute('crossOrigin', 'anonymous');
                video.setAttribute("preload", 'auto');
                video.addEventListener("loadedmetadata", function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth * scale;
                    canvas.height = video.videoHeight * scale;
                    canvas
                        .getContext("2d")
                        .drawImage(video, 0, 0, canvas.width, canvas.width);
                    let imgsrc = canvas.toDataURL("image/png");
                    this.cover = imgsrc;
                    if (this.cover) {
                        let fileImg = this.base64ToBlob(this.cover);
                        var form = new FormData();
                        form.append("files", fileImg, 'image.jpg');
                        this.apiPost('/file/uploads', form).then((res) => {
                            // cover_path = res[0];
                            this.cover = res[0]
                        });
                    }
                }.bind(this));
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append('files', this.video);
                form.append('type', 'video');
                this.apiPost('/file/uploads', form).then((res) => {
                    this.real_video_path = res[0]
                    this.vid_loading = false
                });

            },

            //base64解码，解码视频第一帧
            base64ToBlob(urlData) {
                var arr = urlData.split(',');
                var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
                // 去掉url的头，并转化为byte
                var bytes = window.atob(arr[1]);
                // 处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], {
                    type: mime
                });
            },

            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur() {
            }, // 失去焦点事件
            onEditorFocus() {
            }, // 获得焦点事件
            onEditorChange({editor, html, text}) {
            }, // 内容改变事件
            uploadEditorImgFile() {
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files', this.files[i].raw);
                }
                form.append('is_cloud', 1);
                this.apiPost('/file/uploads', form).then((res) => {
                    // 如果上传成功
                    if (res) {
                        // 获取光标所在位置
                        let length = quill.getSelection().index;
                        // 插入图片，res为服务器返回的图片链接地址
                        quill.insertEmbed(length, 'image', "https://jmsp-images-1257721067.cos.ap-guangzhou.myqcloud.com" + res[0]);
                        // 调整光标到最后
                        quill.setSelection(length + 1)
                    } else {
                        // 提示信息，需引入Message
                        this.$message.error('图片插入失败');
                    }
                });
            },

            //商品上架/放入仓库
            handleSelect(active) {
                this.active = active
            },

            //提交
            handleSubGoodInfo() {
                let array = [];
                // let editImg = true
                let length = this.shop_img.length;
                for (let i = 0; i < length; i++) {
                    if (this.shop_img[i].img) {
                        array.push(this.shop_img[i].img)
                    }
                    /*if (this.shop_img[i].img && !this.shop_img[i].file_id) {
                        array.push(this.shop_img[i].img)
                        editImg = false
                    }
                    if (this.shop_img[i].img && this.shop_img[i].file_id) {
                        editImg = false
                    }*/
                }
                let data = {
                    title: this.goods_name,
                    sort_id: this.sort_id,
                    is_sku: 0,
                    images: array,
                    description: this.content,
                    status: parseInt(this.active),
                };
                if (this.tableData) {
                    data.is_sku = 1;
                }else if (this.goods_price || this.goods_salary || this.goods_no || this.goods_inventory) {
                    data.is_sku = 0
                }

                if (this.goods_no) {
                    data.goods_no = this.goods_no;
                }
                if (this.real_video_path) {
                    data.video_path = this.real_video_path
                    data.video_cover = this.cover
                }
                if (data.is_sku == 0) {
                    data.price = this.goods_price;
                    data.salary = this.goods_salary;
                    data.inventory = this.goods_inventory;
                } else {
                    data.attr_ids = this.sku_attr_id;
                    data.attr_values = this.sku_select_attr;
                    data.sku_mark = this.sku_array;
                    data.sku_price = this.sku_sale;
                    data.sku_salary = this.sku_commission;
                    data.sku_inventory = this.sku_sum;
                    data.sku_no = this.sku_code;
                }
                if (!data.title) {
                    this.$message.error('请输入商品名称')
                } else if (data.is_sku == 0 && (!data.price && !data.salary && !data.goods_no && !data.inventory)) {
                    this.$message.error('请输入商品价格、佣金、库存及商品编码')
                } else if (data.is_sku == 1 && (!data.attr_ids && !data.attr_values && !data.sku_mark && !data.sku_price && !data.sku_salary && !data.sku_inventory && !data.sku_no)) {
                    this.$message.error('请输入商品价格、佣金、库存及商品编码')
                } else if (data.images.length < 1) {
                    this.$message.error('请上传商品图片')
                } else {
                    if (this.isUpdate != 0) {
                        this.apiPost('api/goods/update/' + this.$route.query.goods_id, data).then((res) => {
                            if (res) {
                                this.success = true
                            }
                        })
                    } else {
                        this.apiPost('api/goods/create', data).then((res) => {
                            if (res) {
                                this.success = true
                            }
                        })
                    }
                }
            },

            //查看仓库
            handleLook() {
                this.$router.push({
                    name: 'goods_massage'
                })
            },

            //返回类目选择
            handleAgain() {
                this.$router.push({
                    name: 'create_goods'
                })
            }
        },

        watch: {
            /*sku_sale() {
                let sku_edit = this.sku_array.length
                if (sku_edit > 0) {
                    console.log(this.sku_array)
                    let isEditSku = {};
                    for (let i = 0; i < sku_edit; i++) {
                        isEditSku = {}
                        isEditSku[this.sku_array[i]] = {
                            'price': this.sku_sale[i],
                            'inventory': this.sku_sum[i],
                            'salary': this.sku_commission[i],
                            'goods_no': this.sku_code[i],
                        };
                        console.log(isEditSku)
                        this.isCreateSku.push(isEditSku);
                    }

                }
                let sku_edit = this.sku_array.length
                let createSku = this.isCreateSku.length;
                console.log(this.sku_array)
                if (createSku > 0) {
                    for (let y = 0; y < sku_edit; y++) {
                        for (let k = 0; k < createSku; k++) {
                            for (let i in this.isCreateSku[k]) {
                                if (i == this.sku_array[y]) {
                                    this.$set(this.sku_sale, y, this.isCreateSku[k][i].price);
                                    /!* this.$set(this.sku_commission, y, this.isCreateSku[k][i].salary);
                                     this.$set(this.sku_sum, y, this.isCreateSku[k][i].inventory);
                                     this.$set(this.sku_code, y, this.isCreateSku[k][i].goods_no);*!/
                                }
                            }
                        }
                    }
                }
            },*/
            tableData() {
                if (this.tableData) {
                    this.sku_array = [];
                    // this.isCreateSku = []
                    let length = this.tableData.length;
                    for (let i = 0; i < length; i++) {
                        let length2 = this.tableData[i].length;
                        let item = [];
                        for (let y = 0; y < length2; y++) {
                            item.push(this.tableData[i][y])
                        }
                        /*if (this.sku_array.length < 1) {
                            this.sku_array.push(item.sort().join(','));
                        }*/
                        this.sku_array.push(item.sort().join(','));
                    }
                    let sku_edit = this.sku_array.length
                    if (this.isUpdate != 0) {
                        let updateSku = this.isUpdateSku.length
                        if (updateSku > 0) {
                            for (let y = 0; y < sku_edit; y++) {
                                for (let k = 0; k < updateSku; k++) {
                                    for (let i in this.isUpdateSku[k]) {
                                        if (i == this.sku_array[y]) {
                                            this.$set(this.sku_sale, y, this.isUpdateSku[k][i].price);
                                            this.$set(this.sku_commission, y, this.isUpdateSku[k][i].salary);
                                            this.$set(this.sku_sum, y, this.isUpdateSku[k][i].inventory);
                                            this.$set(this.sku_code, y, this.isUpdateSku[k][i].goods_no);
                                        }
                                    }
                                }
                            }
                        }
                    } /*else {
                        if (sku_edit > 0) {
                            let isEditSku = {};
                            for (let i = 0; i < sku_edit; i++) {
                                isEditSku = {};
                                isEditSku[this.sku_array[i]] = {
                                    'price': this.sku_sale[i],
                                    'inventory': this.sku_sum[i],
                                    'salary': this.sku_commission[i],
                                    'goods_no': this.sku_code[i],
                                };
                                this.isCreateSku.push(isEditSku);
                            }
                        };
                        console.log(this.isCreateSku)
                        /!*let createSku = this.isCreateSku.length;
                        if (createSku > 0) {
                            for (let y = 0; y < sku_edit; y++) {
                                for (let k = 0; k < createSku; k++) {
                                    for (let i in this.isCreateSku[k]) {
                                        if (i == this.sku_array[y]) {
                                            this.$set(this.sku_sale, y, this.isCreateSku[k][i].price);
                                            this.$set(this.sku_commission, y, this.isCreateSku[k][i].salary);
                                            this.$set(this.sku_sum, y, this.isCreateSku[k][i].inventory);
                                            this.$set(this.sku_code, y, this.isCreateSku[k][i].goods_no);
                                        }
                                    }
                                }
                            }
                        }*!/
                    }*/
                }
            },
            goods_info() {
                if (this.isUpdate != 0) {
                    if (this.goods_info) {
                        this.apiGet('/api/goods/info/' + this.$route.query.goods_id).then((res) => {
                            const data = res;
                            this.goods_name = data.title;
                            this.content = data.description;
                            this.active = data.status;
                            if (data.video) {
                                this.real_video_path = data.video.file_path;
                                this.cover = data.video.cover_path;
                                this.video_path = this.$config.baseUrl + data.video.file_path
                            }
                            if (data.images) {
                                let length = data.images.length;
                                for (let i = 0; i < length; i++) {
                                    this.$set(this.shop_img, i, {
                                        'img': data.images[i].file_path,
                                        'file_id': data.images[i].file_id
                                    });
                                }
                            }

                            if (data.is_sku) {

                                let length = data.sku.length;
                                for (let i = 0; i < length; i++) {
                                    this.sku_array.push(data.sku[i].mark)
                                    this.sku_sale.push(data.sku[i].price);
                                    this.sku_commission.push(data.sku[i].salary);
                                    this.sku_sum.push(data.sku[i].inventory);
                                    this.sku_code.push(data.sku[i].goods_no);
                                    this.$set(this.tableData, i, data.sku[i].mark.split(',').reverse());
                                    // this.$set(this.isUpdateSku, i, data.sku[i].mark:{})
                                    let isEditSku = {};
                                    isEditSku[data.sku[i].mark] = {
                                        'price': data.sku[i].price,
                                        'inventory': data.sku[i].inventory,
                                        'salary': data.sku[i].salary,
                                        'goods_no': data.sku[i].goods_no,
                                    };
                                    this.isUpdateSku.push(isEditSku);
                                    // this.isUpdateSku[i]
                                }
                                let attrs = data.attribute.length;
                                if (attrs > 0) {
                                    for (let attr = 0; attr < attrs; attr++) {

                                        let v = data.attribute[attr].values.length;
                                        let labelLength = this.goods_info.attrs[attr].children.length;

                                        if (v > 0) {
                                            for (let y = 0; y < v; y++) {

                                                this.checkList[attr].values.push(data.attribute[attr].values[y].attr_value);
                                                this.sku_attr_id.push(data.attribute[attr].attribute_id);
                                                this.sku_select_attr.push(data.attribute[attr].values[y].attr_value);
                                                this.custom_attr[attr].values.push(data.attribute[attr].values[y].attr_value);

                                                for (let l = 0; l < labelLength; l++) {
                                                    if (data.attribute[attr].values[y].attr_value === this.goods_info.attrs[attr].children[l].title) {
                                                        this.$set(this.custom_attr[attr].values, y, '')
                                                        break
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                let onlySku = this.checkList.length;

                                for (let o = 0; o < onlySku; o++) {
                                    let has = this.checkList[o].values.length;
                                    if (has > 0) {
                                        this.only.push(this.checkList[o])
                                    }
                                }
                            } else {
                                this.goods_price = data.price;
                                this.goods_salary = data.salary;
                                this.goods_no = data.goods_no;
                                this.goods_inventory = data.inventory;
                            }
                        });
                    }
                }
            }
        },
        mixins: [http]
    }
</script>

<style lang="stylus">
    /*去掉type为number的箭头*/
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .create_goods_info
        width 1000px
        margin 0 auto
        text-align left
        font-size: 14px;
        color: rgba(51, 51, 51, 1);

        .create_title
            height 92px
            margin-top 32px
            margin-bottom 16px
            background-color: #fff;

            .el-tabs
                .el-tabs__header
                    margin 0

                .el-tabs__item:nth-child(2)
                    padding-left 20px

                .el-tabs__item:last-child
                    padding-right 20px

                .el-tabs__active-bar
                    height 0

                .el-tabs__item
                    height 46px
                    line-height 46px

                .el-tabs__nav-wrap::after
                    height 0

                .el-tabs__item.is-active
                    border-top 2px solid #24BFFF

            .select_category
                display flex

                p
                    align-self center
                    padding-left 20px
                    margin-right 35px

                .el-button
                    align-self center
                    border-radius: 4px;
                    color: rgba(36, 191, 255, 1);
                    background: rgba(228, 240, 253, 1);
                    border: 1px solid rgba(36, 191, 255, 1);

        .goods_basic
            margin-bottom 25px
            background: rgba(255, 255, 255, 1);

            .goods_basic_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);

            .goods_basic_input
                padding-left 31px
                box-sizing border-box

                .goods_basic_name
                    display flex
                    margin-top 37px
                    padding-bottom 29px

                    .goods_basic_label
                        align-self center
                        margin-right 14px

                    .el-input
                        width 695px
                        align-self center

                        .el-input__inner
                            border-radius: 2px;
                            border: 1px solid rgba(204, 204, 204, 1);

                .goods_basic_category
                    display flex

                    .goods_basic_label
                        align-self flex-start
                        margin-right 14px

                    .goods_basic_category_input
                        width 695px
                        display flex
                        padding 28px 54px
                        /*margin-bottom 15px*/

                        .number
                            display flex

                            .number_label
                                margin-right 8px
                                align-self center

                        .el-input
                            width 197px

        /*.left, .right
            width 50%
            text-align center

            .brand, .number, .material
                display flex
                margin-bottom 25px

                .brand_label, .number_label, .material_label
                    margin-right 8px
                    align-self center

            .el-input
                width 197px*/

        .goods_sale
            margin-bottom 25px
            background: rgba(255, 255, 255, 1);

            .goods_sale_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);

            .goods_sale_info
                padding 46px 34px

                .goods_sale_category
                    display flex
                    margin-bottom 24px

                    .goods_sale_label
                        margin-right 10px
                        align-self flex-start

                    .select_category_value
                        width 702px
                        padding 15px 37px

                        .el-checkbox
                            margin-bottom 16px

                            .el-checkbox__inner
                                border-radius: 4px;

                            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
                                background-color #E4F0FD
                                border 1px solid #3BC7FF

                            .el-checkbox__inner::after
                                border: 1px solid #3BC7FF;
                                border-top: 0;
                                border-left: 0;

                        .el-input
                            width 214px
                            align-self center
                            margin-right 15px

                        .el-button
                            color #333333
                            align-self center
                            background-color #f7f8fa
                            border: 1px solid rgba(153, 153, 153, 1);

                .goods_table
                    margin-bottom 30px

                    .table_title
                        display flex
                        margin-bottom 17px
                        justify-content space-between

                        p
                            align-self center

                            span
                                font-size 12px
                                color: #999999

                        .el-button
                            margin-right 193px

                .goods_price
                    display flex
                    margin-bottom 19px

                    .goods_price_label
                        margin-right 41px
                        margin-top 9px
                        align-self flex-start

                    .goods_price_input
                        p
                            margin-top 4px
                            font-size: 12px;
                            color: rgba(204, 204, 204, 1);

                .goods_code
                    display flex

                    .goods_code_label
                        align-self center
                        margin-right 35px

                    .el-input
                        width 679px

        .goods_pic
            margin-bottom 25px
            padding-bottom: 41px;
            background: rgba(255, 255, 255, 1);

            .goods_pic_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);

            .goods_upload
                padding-left 31px

                .goods_pic_upload, .goods_video_upload, .goods_look
                    margin-top 35px
                    display flex

                    .goods_look_label
                        margin-right 15px

                    .edit_container
                        width 651px
                        height 501px

                        .ql-container
                            height: 400px;

                    .goods_pic_label, .goods_video_label
                        margin-right 28px

                    .main_pic, .main_video
                        margin-bottom 34px

                        p
                            font-size: 14px;
                            color: rgba(204, 204, 204, 1);
                            margin-bottom 14px

                        .avatar-uploader .el-upload {
                            border: 1px dashed #d9d9d9;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                            margin-right 15px
                            width: 100px;
                            height: 100px;
                        }

                        .icon
                            position absolute
                            width: 100px;
                            height: 22px;
                            line-height 22px
                            padding 0 10px
                            box-sizing border-box
                            background: rgba(0, 0, 0, .5);
                            bottom 0;
                            left 0
                            display flex
                            justify-content space-between

                            span
                                width 14px
                                color white


                        .avatar-uploader .el-upload:hover {
                            border-color: #409EFF;
                        }

                        .avatar-uploader-icon {
                            font-size: 29px;
                            color: #24BFFF;
                            width: 100px;
                            height: 70px;
                            line-height: 70px;
                            text-align: center;

                        }

                        .avatar {
                            width: 100px;
                            height: 100px;
                            display: block;
                        }

                        .add-pic
                            font-size: 12px;
                            color: rgba(102, 102, 102, 1);

                        .upload-container
                            display flex

                    .goods_video_note
                        color: rgba(204, 204, 204, 1);
                        align-self flex-start

                        p
                            margin-bottom 18px

        .goods_other
            margin-bottom 62px
            background: rgba(255, 255, 255, 1);

            .goods_other_title
                width 100%
                font-size: 18px;
                color: rgba(36, 191, 255, 1);
                padding 27px 0 17px 15px
                box-sizing border-box
                border-bottom: 1px solid rgba(228, 228, 228, 1);

            .goods_other_time
                padding 34px 31px

                .goods_other_label
                    display inline

                .goods_other_note
                    font-size 12px
                    color: #999

                .select_buy
                    margin-left 90px
                    margin-top 19px
                    display flex

                    .select_online, .select_store
                        display flex
                        margin-right 19px
                        align-self center

                        img
                            width 18px
                            margin-right 10px

                        p
                            color #000000
                            font-size 12px
                            align-self center


        .create_goods_sumbit
            position fixed
            bottom 0
            left 0
            height 83px
            width 100%
            line-height 83px
            background-color: #fff;
            text-align center
            z-index: 2;
            border-top: 1px solid rgba(36, 191, 255, 1)

            .el-button
                width: 255px;
                height: 39px;
                font-size: 15px;
                border-radius: 4px;
                color: rgba(36, 191, 255, 1);
                background: rgba(228, 240, 253, 1);
                border: 1px solid rgba(36, 191, 255, 1);

    .create_call_back
        width 1000px;
        text-align center
        position absolute
        left 50%
        top: calc(50vh - 176px);
        transform translate3d(-50%, -50%, 0)

        .call_back_title
            display flex
            margin-bottom 71px
            justify-content center

            img
                width 56px
                margin-right 21px
                align-self flex-start

            .call_back_contain
                color #24BFFF
                text-align left

                p:first-child
                    font-size: 38px

                p
                    font-size: 11px;
                    margin-bottom 7px

        .next_coc
            .el-button:first-child
                margin-right 75px
                color: rgba(36, 191, 255, 1);
                background: rgba(228, 240, 253, 1);
                border: 1px solid rgba(36, 191, 255, 1);

            .el-button
                width: 194px;
                font-size: 16px;
                border none
                border-radius: 4px;
                color: rgba(252, 252, 252, 1);
                background: rgba(36, 191, 255, 1);
</style>
