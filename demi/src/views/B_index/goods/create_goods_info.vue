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
                    <el-button type="primary">切换类目</el-button>
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
                                placeholder="最多输入20个汉字和字符"
                                maxlength="20"
                                show-word-limit
                                v-model="goods.goods_name">
                        </el-input>
                    </div>
                    <div class="goods_basic_category">
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
                    </div>
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
                        <div class="select_category_value" v-if="checkList[index].list">
                            <el-checkbox-group v-model="checkList[index].list">
                                <el-checkbox v-for="checkbox in label.children" :key="checkbox.attribute_id"
                                             :label="checkbox.title"
                                             @change="handleSelectAttr()"></el-checkbox>
                                <el-checkbox v-for="(custom,index) in custom_attr" :key="index" :label="custom"
                                             @change="handleSelectAttr()"></el-checkbox>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </el-checkbox-group>
                            <div style="display: flex">
                                <el-input v-model="custom" placeholder="请输入自定义值" size="medium"></el-input>
                                <el-button type="primary" size="small" @click="handleAddAttr">添加</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="goods_table" v-if="tableData.length > 0">
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
                                <!--:span-method="objectSpanMethod"-->
                                <el-table-column
                                        v-if="checkList"
                                        v-for="(label,index) in checkList"
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
                                                placeholder="价格（元）"/>
                                    </template>
                                    <!--v-model="scope.row[handleTableInput(scope.row,scope.row.length)]"-->
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_sale[scope.$index]"
                                                size="mini"
                                                placeholder="价格（元）"/>
                                    </template>
                                </el-table-column>
                                <el-table-column width="160">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="sum"
                                                size="mini"
                                                placeholder="数量（件）"/>
                                    </template>
                                    <!--scope.row[handleTableInput(scope.row,scope.row.length + 1)]-->
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_sum[scope.$index]"
                                                size="mini"
                                                placeholder="数量（件）"/>
                                    </template>
                                </el-table-column>
                                <el-table-column width="160">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="commission"
                                                size="mini"
                                                placeholder="佣金（元）"/>
                                    </template>
                                    <!--scope.row[handleTableInput(scope.row,scope.row.length + 2)]-->
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_commission[scope.$index]"
                                                size="mini"
                                                placeholder="佣金（元）"/>
                                    </template>
                                </el-table-column>
                                <el-table-column width="186">
                                    <template slot="header" slot-scope="scope">
                                        <el-input
                                                v-model.trim="code"
                                                size="mini"
                                                placeholder="商品条形码"/>
                                    </template>
                                    <!--scope.row[handleTableInput(scope.row,scope.row.length + 3)]-->
                                    <template slot-scope="scope">
                                        <el-input
                                                v-model.trim="sku_code[scope.$index]"
                                                size="mini"
                                                placeholder="商品条形码"/>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="goods_price">
                        <p class="goods_price_label"><span style="color:#FF0000">* </span>一口价</p>
                        <div class="goods_price_input">
                            <div style="display: flex">
                                <el-input
                                        size="small"
                                        v-model="goods.goods_name">
                                </el-input>
                                <span style="align-self: center">元</span>
                            </div>
                            <p>商品价格不能低于0.10元</p>
                        </div>
                    </div>
                    <div class="goods_code">
                        <p class="goods_code_label">商品条形码</p>
                        <el-input
                                size="small"
                                placeholder="最多输入32个汉字和字符"
                                maxlength="32"
                                show-word-limit
                                v-model="goods.goods_name">
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
                                    <div @mouseover="show_icon = index" @mouseleave="show_icon = null" style="width: 100%;height: 100%;position: absolute;top:0;left: 0;">
                                        <div v-if="(show_icon === index) && item.img" class="icon">
                                            <span v-on:click.stop="handleMoveFront(index)">
                                                <i v-if="index > 0" class="el-icon-arrow-left"></i>
                                            </span>
                                            <span v-on:click.stop="handleRemove(index)">
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
                        <p class="goods_video_label"><span style="color:#FF0000">* </span>主图视频</p>
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
                        <p class="goods_look_label"><span style="color:#FF0000;visibility: hidden">* </span>商品详情图</p>
                        <div class="main_look">
                            <div class="demo-image__lazy">
                                <el-image v-for="url in urls" :key="url" :src="url"></el-image>
                            </div>
                            <div class="demo-image-bottom">
                                <div class="bottom_contain">
                                    <div class="bottom_label">
                                        <img src="" alt="">
                                        <p>预览</p>
                                    </div>
                                    <div class="bottom_label">
                                        <img src="" alt="">
                                        <p>图片</p>
                                    </div>
                                    <div class="bottom_label">
                                        <img src="" alt="">
                                        <p>文字</p>
                                    </div>
                                </div>
                            </div>
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
                        <div class="select_online">
                            <div style="align-self: center">
                                <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(1)"
                                     v-show="active === 2">
                                <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 1">
                            </div>
                            <p :style="active === 2 ? 'color: #999999': 'color: #4d4d4d'">立即上架</p>
                        </div>
                        <div class="select_store">
                            <div style="align-self: center">
                                <img src="../../../assets/img/weixuanz@2x.png" alt="" @click="handleSelect(2)"
                                     v-show="active === 1">
                                <img src="../../../assets/img/weixuanz_on@2x.png" alt="" v-show="active === 2">
                            </div>
                            <p :style="active === 2 ? 'color: #4d4d4d': 'color: #999999'">放入仓库</p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="create_goods_sumbit">
                <el-button type="primary" size="medium" @click="success=true">提交商品信息</el-button>
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

    export default {
        name: 'create_goods_info',
        components: {bottom},
        data() {
            return {
                goods_info: null,
                activeName: 'second',

                //货号
                goods: {
                    goods_name: ""
                },
                //自定义属性值
                checkList: [],
                custom_attr: [],

                sku_array: [],
                sku_attr_id: [],
                sku_select_attr: [],
                sku_sale: [],
                sku_sum: [],
                sku_commission: [],
                sku_code: [],
                spanRow: '',
                sale: '',
                sum: '',
                commission: '',
                code: '',
                tableData: [],

                shop_img: [
                    {img: ''},
                    {img: ''},
                    {img: ''},
                    {img: ''},
                    {img: ''},
                ],
                files: '',
                show_icon:null,

                vid_loading: false,
                video: null,
                real_video_path: null,
                video_path:'',
                success: false,
                imageUrl: '',
                custom: '',
                active: 1,
                urls: [
                    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
                ]
            };
        },
        mounted() {
            this.apiGet('/api/sort/info/' + this.$route.query.sort_id).then((res) => {
                this.goods_info = res;
                let length = res.attrs.length;
                for (let i = 0; i < length; i++) {
                    this.checkList.push({list: [], attr: res.attrs[i].attribute_id, title: res.attrs[i].title});
                }
                console.log(this.checkList);
            })
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelect(active) {
                this.active = active
            },

            /*objectSpanMethod({row, column, rowIndex, columnIndex}) {
                let length = this.checkList.length;
                if((rowIndex % this.checkList[length-1].list.length === 0)){
                    if(columnIndex % this.checkList[length-1].list.length === 0){
                        return [this.checkList[length-1].list.length,1]
                    }
                }else{
                    return {
                        rowspan: 1,
                        colspan: 1
                    };
                }
                /!*let length = this.checkList.length;

                    if((rowIndex % this.checkList[length-1].list.length === 0)){
                        return [this.checkList[length-1].list.length,1]
                    }else{
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                   /!* if(rowIndex === 0){
                        this.spanRow = row[0];
                    }else{
                        if(this.spanRow !== row[0]){

                        }
                    }*!/
                    /!*if(this.spanRow === row[0]){

                    }
                    if(row[0] === this.tableData[rowIndex][0]){
                        return [this.checkList[1].list.length,1]
                    }*!/

                   /!*!/!* if(rowIndex === 0){
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    }else *!/
                   if(rowIndex > 0 && (rowIndex % this.checkList[0].list.length === 0) && (row[0] === this.checkList[0].list[rowIndex])){
                        return {
                            rowspan:  this.checkList[0].list.length,
                            colspan: 1
                        };
                    }else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }*!/

                /!*console.log('a');
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 1,
                            colspan: 0
                        };
                    }
                }*!/!*!/
            },*/

            handleAddAttr() {
                this.custom_attr.push(this.custom);
                this.custom = ''
            },

            handleFill() {
                if (this.tableData) {
                    if (this.sale) {
                        let length = this.sku_sale.length;
                        for (let i = 0; i < length; i++) {
                            this.$set(this.sku_sale, i, this.sale)
                        }
                        this.sale = ''
                    }
                    if (this.sum) {
                        let length = this.sku_sum.length;
                        for (let i = 0; i < length; i++) {
                            this.$set(this.sku_sum, i, this.sum)
                        }
                        this.sum = ''
                    }
                    if (this.commission) {
                        let length = this.sku_commission.length;
                        for (let i = 0; i < length; i++) {
                            this.$set(this.sku_commission, i, this.commission)
                        }
                        this.commission = ''
                    }
                    if (this.code) {
                        let length = this.sku_code.length;
                        for (let i = 0; i < length; i++) {
                            this.$set(this.sku_code, i, this.code)
                        }
                        this.code = ''
                    }
                    console.log(this.sku_sale)
                }
            },

            handleSelectAttr() {
                this.tableData = [];
                this.sku_array = [];
                this.sku_sale = [];
                this.sku_sum = [];
                this.sku_commission = [];
                this.sku_code = [];
                this.sku_attr_id = [];
                this.sku_select_attr = [];
                this.handleSku(0, []);
                this.handleSkuAttrId(0)
            },

            handleSku(index, data) {
                let all_length = this.checkList.length;
                let length = this.checkList[index].list.length;
                if (length > 0) {
                    for (let i = 0; i < length; i++) {
                        if (index < all_length - 1) {
                            data[index] = this.checkList[index].list[i];
                            this.handleSku(index + 1, data)
                        } else {
                            let subItem = [...data, this.checkList[index].list[i]];
                            this.tableData.push(subItem);
                        }
                    }
                }
                if (this.tableData.length > 0) {
                    this.sku_sale[this.tableData.length - 1] = '';
                    this.sku_sum[this.tableData.length - 1] = '';
                    this.sku_commission[this.tableData.length - 1] = '';
                    this.sku_code[this.tableData.length - 1] = '';
                }

            },
            handleSkuAttrId(index) {
                let all_length = this.checkList.length;
                if (index < all_length) {
                    let length = this.checkList[index].list.length;
                    if (length > 0) {
                        for (let i = 0; i < length; i++) {
                            this.sku_attr_id.push(this.checkList[index].attr);
                            this.sku_select_attr.push(this.checkList[index].list[i]);
                            if (i === (length - 1)) {
                                this.handleSkuAttrId(index + 1);
                            }
                        }
                    }
                }
            },

            /*handleTableInput(data, index) {
                let all_length = this.checkList.length;
                let length = data.length;
                if (length > all_length) {
                    let option = length - all_length;
                    return index - option
                } else {
                    return index
                }
            },*/
            /* handleAvatarSuccess(res, file) {
                 this.imageUrl = URL.createObjectURL(file.raw);
             },*/
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
                console.log(param);
                // 创建表单对象
                // this.imageUrl = URL.createObjectURL(this.files.raw);
                // this.pic_loading = true;
                console.log(this.files);
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                let length = this.files.length;
                for (let i = 0; i < length; i++) {
                    form.append('files', this.files[i].raw);
                }
                this.apiPost('/file/uploads', form).then((res) => {
                    if (res) {
                        console.log(res);
                        this.shop_img[param.data.index].img = res[0]
                        // this.imageUrl = this.$config.baseUrl + res[0];
                        // this.form.shop_logo = res[0];
                        /*this.pic_loading = false;*/
                    }
                });
            },
            /*handleImgSort(event,before,after){
                if(event === 'front'){
                    return after - before
                }else{
                    return before - after
                }
            },*/
            handleMoveFront(index){
                let length = this.shop_img.length;
                let fornt;
                for(let i = 0;i<length;i++){
                    fornt = this.shop_img[index - 1];
                    this.$set(this.shop_img,index - 1,this.shop_img[index]);
                    this.$set(this.shop_img,index,fornt);
                }
            },
            handleRemove(index) {
                this.$set(this.shop_img,index,{'img':''});
            },
            handleMoveAfter(index){
                let length = this.shop_img.length;
                let after;
                for(let i = 0;i<length;i++){
                    after = this.shop_img[index + 1];
                    this.$set(this.shop_img,index + 1,this.shop_img[index]);
                    this.$set(this.shop_img,index,after);
                }
            },

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
                }.bind(this));
                let form = new FormData();
                // 后端接受参数 ，可以接受多个参数
                form.append('files', this.video);
                form.append('type', 'video');
                this.apiPost('/file/uploads', form).then((res) => {
                    this.real_video_path = res
                    console.log(this.real_video_path)
                    this.vid_loading = false
                })
                console.log(this.real_video_path)

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

            handleLook() {
                this.$router.push({
                    name: 'goods_massage'
                })
            },
            handleAgain() {
                this.$router.push({
                    name: 'create_goods'
                })
            }
        },
        watch: {
            tableData() {
                if (this.tableData) {
                    let length = this.tableData.length;
                    for (let i = 0; i < length; i++) {
                        let length2 = this.tableData[i].length;
                        let item;
                        for (let y = 0; y < length2; y++) {
                            if (y === 0) {
                                item = this.tableData[i][y]
                            } else {
                                item = item + ',' + this.tableData[i][y];
                            }
                        }
                        this.sku_array.push(item)
                    }
                }
            }
            /*sku_sale(){
                if(this.sku_sale){
                    let length = this
                    console.log(this.sku_sale)
                    console.log(this.sku_sum)
                    console.log(this.sku_commission)
                    console.log(this.sku_code)
                }
            }*/
        },
        mixins: [http]
    }
</script>

<style lang="stylus">
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
                    margin-bottom 29px

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
                        margin-right 19px

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

                    .main_look
                        width 651px
                        height 503px
                        border: 1px solid rgba(204, 204, 204, 1);

                        .demo-image__lazy
                            padding-left 11px
                            height 442px
                            overflow auto
                        .demo-image-bottom
                            width 100%
                            height:59px;
                            background:rgba(236,236,236,1);
                            .bottom_contain
                                width 457px
                                height:59px;
                                display flex
                                margin 0 auto
                                justify-content space-around
                                .bottom_label
                                    align-self center
                                    img
                                        width 22px
                                    p
                                        font-size:12px;
                                        color:rgba(102,102,102,1);

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
                            width:100px;
                            height:22px;
                            line-height 22px
                            padding 0 10px
                            box-sizing border-box
                            background:rgba(0,0,0,.5);
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
