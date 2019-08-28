<template>
    <div class="create_work_wrap">
        <div class="title">
            <p>发布新职位</p>
        </div>
        <div class="line"></div>
        <div class="contain">
            <div class="basic">
                <div class="basic_title">
                    <span class="icon"></span>
                    <p>请填写基本信息</p>
                </div>
                <div class="info">
                    <p class="note">
                        注意：带 * 的内容，在确认发布后将不能修改
                    </p>
                    <el-form ref="form" :model="form" label-width="92px">
                        <el-form-item label="* 职位名称：">
                            <el-input v-model="form.name" placeholder="请输入职位名称"></el-input>
                        </el-form-item>
                        <el-form-item label="* 职位类型：">
                            <el-input v-model="form.work" placeholder="请选择" @focus="work_dialog = true"></el-input>
                        </el-form-item>
                        <el-form-item label=" 工作地点：">
                            <el-input v-model="form.area" placeholder="请输入工作地点" @focus="area_dialog = true"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="line"></div>
                </div>
                <div class="basic_title">
                    <span class="icon"></span>
                    <p>请填写职位要求</p>
                </div>
                <div class="ask">
                    <el-form ref="form" :model="form" label-width="92px">
                        <el-form-item label="工作经验：">
                            <el-select v-model="form.experience" placeholder="请选择">
                                <el-option label="不限" value="0"></el-option>
                                <el-option label="应届生" value="0"></el-option>
                                <el-option label="1年以内" value="0-1"></el-option>
                                <el-option label="1-3年" value="1-3"></el-option>
                                <el-option label="3-5年" value="3-5"></el-option>
                                <el-option label="5-10年" value="5-10"></el-option>
                                <el-option label="10年以上" value="10"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学历要求：">
                            <el-select v-model="form.education" placeholder="请选择">
                                <el-option label="不限" value="0"></el-option>
                                <el-option label="初中及以下" value="1"></el-option>
                                <el-option label="中专/中技" value="2"></el-option>
                                <el-option label="高中" value="3"></el-option>
                                <el-option label="大专" value="4"></el-option>
                                <el-option label="本科" value="5"></el-option>
                                <el-option label="硕士" value="6"></el-option>
                                <el-option label="博士" value="7"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="薪资范围：">
                            <el-select v-model="form.salary" placeholder="请选择">
                                <el-option label="1-2k" value="1000-2000"></el-option>
                                <el-option label="2-4k" value="2000-4000"></el-option>
                                <el-option label="4-6k" value="4000-6000"></el-option>
                                <el-option label="6-8k" value="6000-8000"></el-option>
                                <el-option label="8-10k" value="8000-10000"></el-option>
                                <el-option label="10-15k" value="10000-15000"></el-option>
                                <el-option label="15-20k" value="15000-20000"></el-option>
                                <el-option label="20k以上" value="20000"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职位描述：">
                            <el-input
                                    type="textarea"
                                    :rows="16"
                                    placeholder="填写岗位职责、任职要求等（3000字以内），清晰的描述有助于更好的展开招聘，例如：

岗位职责
1, ...
2, ...
3, ...
任职要求
1, ...
2, ...
3, ...
                        "
                                    maxlength="3000"
                                    show-word-limit
                                    v-model="form.describes">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <p>我已阅读并同意<span> 《得米平台服务协议》</span></p>
                    <button>确认发布</button>
                </div>
            </div>

        </div>
        <div class="work_dialog">
            <el-dialog
                    title="请选择职类"
                    :visible.sync="work_dialog"
                    width="850px">
                <div class="search">
                    <el-autocomplete
                            class="inline-input"
                            value-key="name"
                            v-model="search"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="handleSelect"
                    ></el-autocomplete>
                </div>
                <div>
                    <el-cascader-panel v-model="value" ref="tree" @change="handleChange2" :options="work_tree" :props="{ label:'name', value:'label_id'}"></el-cascader-panel>
                </div>

            </el-dialog>
        </div>

    </div>
</template>

<script>
    /* eslint-disable */
    /*import AMap from 'AMap'
    var map*/
    import http from '../../../libs/http'
    import {getType} from '../../../libs/http'
    import {forEach} from "../../../libs/tools";

    export default {
        name: 'work',
        data(){
            return{
                work_dialog:false,
                area_dialog:false,
                form:{
                    name:'',
                    work:'',
                    area:'',
                    experience:"",
                    education:'',
                },
                work_tree:[],
                work_list:[],
                search:'',
                label_id:null,
                value:[],

            }
        },
        mounted(){
            if(getType){
                this.apiGet('/labels?id=967&mode=tree').then((res) => {
                    this.$store.commit('loading', true);
                    this.work_tree = res;
                    this.$store.commit('loading', false);
                });
                this.apiGet('/labels?id=967').then((res) => {
                    this.$store.commit('loading', true);
                    forEach(res,item =>{
                        if(item.level===2){
                            this.work_list.push(item)
                        }
                    });
                    this.$store.commit('loading', false);
                });
            }
        },
        methods:{
            querySearch(queryString, cb) {
                var restaurants = this.work_list;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleChange2(val) {
                let dataRecieve = this.$refs.tree.getCheckedNodes();
                this.form.work = dataRecieve[0].label;
                let length = val.length;
                this.label_id = val[length-1];
                this.work_dialog = false;
                if(this.value){
                    this.search = '';
                }
            },
            handleSelect(item) {
                this.label_id = item.label_id;
                this.form.work = item.name;
                if(this.search){
                    this.value = [];
                }
                this.work_dialog = false;
            },
        },
        mixins:[http]
    }
</script>

<style lang="less" type="text/less">
    .create_work_wrap{
        margin: 12px auto;
        width: 1000px;
        font-family: MicrosoftYaHei;
        .title{
            padding: 20px 0;
            text-align: left;
            color: #4D4D4D;
            font-size: 16px;
        }
        .line{
            width:1000px;
            height:1px;
            background:rgba(213,218,223,1);
        }
        .contain{
            padding:50px 0 0 117px;
            box-sizing: border-box;
            .basic{
                text-align: left;
                .basic_title{
                    display: flex;
                    .icon{
                        width:3px;
                        height:16px;
                        background:rgba(36,191,255,1);
                        border-radius:2px;
                        margin-right: 11px;
                    }
                    p{
                        font-size: 16px;
                        color: #4D4D4D;
                    }
                }
                .info{
                    padding-left: 13px;
                    font-size: 14px;
                    color: #4D4D4D;
                    .note{
                        margin-top: 12px;
                        color: #B3B3B3;
                        font-size:12px;
                        margin-bottom: 50px;
                    }
                    .el-form-item{
                        margin-bottom: 28px;
                    }
                    .el-form-item:nth-last-child(1){
                        margin-bottom: 50px;
                    }
                    .el-form-item__label{
                        padding: 0 11px 0 0;
                        box-sizing: border-box;
                    }
                    .el-input{
                        width: 468px;
                    }
                    .el-input__inner{
                        border-radius: 0;
                        border-color: #D5DADF;
                    }
                    .el-input.is-active .el-input__inner, .el-input__inner:focus{
                        border-color:#24BFFF
                    }
                    .line{
                        width:573px;
                        height:1px;
                        border-top:1px dashed rgba(213,218,223,1);
                        background: none;
                        margin-bottom: 50px;
                    }
                }
                .ask{
                    margin-top: 50px;
                    .el-form{
                        margin-left: 13px;
                        .el-select,.el-textarea{
                            width: 468px;
                        }
                        .el-input__inner{
                            border-radius: 0;
                            border-color: #D5DADF;
                        }
                        .el-textarea__inner{
                            border-radius: 0;
                            border-color: #D5DADF;
                        }
                        .el-textarea__inner:focus{
                            border-color:#24BFFF
                        }
                        .el-select .el-input .el-select__caret{
                            font-size:16px;
                            color: #CCCCCC;
                            transform:rotateZ(90deg)
                        }
                        .el-select .el-input .el-select__caret.is-reverse{
                            transform:rotateZ(180deg);
                        }
                    }
                    p{
                        margin-left: 338px;
                        margin-top: 21px;
                        margin-bottom: 21px;
                        text-align: left;
                        color: #808080;
                        font-size: 14px;
                        span{
                            color: #24BFFF;
                        }
                    }
                    button{
                        margin-left: 450px;
                        width:125px;
                        height:30px;
                        background:rgba(36,191,255,1);
                        border-radius:15px;
                        color: white;
                        border:none;
                        margin-bottom: 283px;
                    }
                }
            }
        }
        ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:500;
            color:#B3B3B3;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:500;
            color:#B3B3B3;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:500;
            color:#B3B3B3;
        }
        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:500;
            color:#B3B3B3;
        }
        .work_dialog{
            .el-dialog{
                margin-top: 20vh!important;
                .el-input__suffix{
                    display: none;
                }
                .el-dialog__header{
                    text-align: left;
                    .el-dialog__title{
                        font-size: 16px;
                        color: #4D4D4D;
                        text-align: left;
                    }
                }
                .el-dialog__body{
                    padding-top: 0;
                    padding-bottom: 25px;
                    .search{
                        text-align: left;
                        margin-bottom: 10px;
                    }
                    .el-cascader-menu__wrap{
                        height: 350px;
                    }
                    .el-cascader-menu{
                        min-width: 269px;
                    }
                }
            }
        }

    }
    .el-popper[x-placement^=bottom]{
        margin-top: 10px!important;
    }
</style>