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
                <div class="basic_info">
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
                                <el-option label="20-30k" value="20000-30000k"></el-option>
                                <el-option label="30-40k" value="30000-40000k"></el-option>
                                <el-option label="40-50k" value="40000-50000k"></el-option>
                                <el-option label="50k以上" value="50000"></el-option>
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
                            <div class="write">
                                <div>
                                    <div @click="handleTpl(index)" v-text="this.tpl.length>0 ? '换一个': '描述推荐'"></div>
                                </div>
                                <div @click="form.describes = ''">清空文本</div>
                            </div>
                        </el-form-item>
                    </el-form>
                    <p>我已阅读并同意<span> 《得米平台服务协议》</span></p>
                    <button @click="handleSubmit">确认发布</button>
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
                    <el-cascader-panel v-model="label_name" ref="tree" :show-all-levels="false" @change="handleChange2" :options="work_tree" :props="{ label:'name', value:'label_id'}"></el-cascader-panel>
                </div>
            </el-dialog>
        </div>
        <div class="area_dialog">
            <el-dialog
                    title="添加工作地点"
                    :visible.sync="area_dialog"
                    width="850px">
                <div class="search">
                    <p class="note">请先选择工作城市</p>
                    <div class="block">
                        <p>*添加工作城市：</p>
                        <el-cascader
                                v-model="city"
                                :options="city_tree"
                                :props="{ label:'city_name', value:'city_id' }"
                                @change="handleProvince"
                                ref="city"
                                :show-all-levels="false"
                                ></el-cascader>
                    </div>
                    <div class="info">
                        <div class="input_key">
                            <p>*详细地址：</p>
                            <div class="input-item">
                                <el-input id='tipinput' v-model="address" type="text" @input="init" autocomplete="off" placeholder="输入行政区、街道、写字楼" :disabled="this.cityName === ''"></el-input>
                            </div>
                        </div>
                        <div id="show" v-show="over"></div>
                    </div>
                    <div class="room">
                        <p>门牌号：</p>
                        <el-input v-model="room" placeholder="输入门牌号" :disabled="this.address === ''"></el-input>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="area_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="handeleAddress" :disabled="this.real_address === ''">确 定</el-button>
                </span>
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
    import {handleMap} from '../../../libs/Amap'

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
                    salary:'',
                    describes:''
                },
                work_tree:[],
                work_list:[],
                search:'',
                label_id:null,
                label_name:[],
                over:false,
                city:'',
                cityName:'',
                city_tree:[],
                address:'',
                room:'',
                real_address:'',
                city_id:'',
                longitude:'',
                latitude:'',
                tpl:[],
                index:0,
                work_edit:{}
            }
        },
        mounted(){
            handleMap();
            this.getRouterData();
            this.work_edit = JSON.parse(sessionStorage.getItem('work'));
            console.log(this.work_edit)
            if(this.work_edit){
                this.form.name = this.work_edit.work_name;
                this.label_id = this.work_edit.work_label_id;
                this.form.area = this.work_edit.address;
                this.label_name[0] = this.work_edit.work_label_id;
                this.form.describes = this.work_edit.description;
                this.form.education = this.work_edit.education.toString();
                this.city_id = this.work_edit.city.city_id;
                this.longitude = this.work_edit.longitude;
                this.latitude = this.work_edit.latitude;
                this.form.salary = this.work_edit.salary_min + '-' + this.work_edit.salary_max;
                this.form.experience = this.work_edit.work_experience_min + '-' + this.work_edit.work_experience_max;
            }
        },
        methods:{
            handleCity(){
                if(getType) {
                    this.apiGet('/city/lists?mode=tree').then((res) => {
                        this.$store.commit('loading', true);
                        forEach(res, item => {
                            if(item.municipalities !== 0){
                                let muniCity = [{
                                    "city_name": item.city_name,
                                    "city_id": item.city_id
                                }];
                                item.children = muniCity
                            }
                            forEach(item.children, item1 => {
                                if(item1.children){
                                    delete item1.children
                                }
                            });
                        });
                        this.city_tree = res;
                        this.$store.commit('loading', false);
                    })
                }
            },
            handleLabel(){
                if(getType) {
                    this.$store.commit('loading', true);
                    this.apiGet('/labels?id=967&mode=tree').then((res) => {
                        this.work_tree = res;
                        this.$store.commit('loading', false);
                    });
                    this.apiGet('/labels?id=967').then((res) => {
                        forEach(res, item => {
                            if (item.level === 2) {
                                this.work_list.push(item)
                            }
                        });
                        this.$store.commit('loading', false);
                    });
                }

            },
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
                console.log(this.label_name)
                if(this.label_name){
                    this.search = '';
                }
            },
            handleSelect(item) {
                this.label_id = item.label_id;
                this.form.work = item.name;
                if(this.search){
                    this.label_name = [];
                }
                this.work_dialog = false;
            },
            init(){
                var auto = new AMap.Autocomplete({
                    citylimit:true,
                    city: this.cityName,
                    output:'show',
                    input:'tipinput',
                    datatype:'poi'
                });
                AMap.event.addListener(auto, "select", function(e) {
                    //开始搜索对应的poi名称
                    this.over = true;
                    auto.search(e.poi.name, function(status, results) {
                        this.over = false;
                        if(this.address){
                            this.real_address = results.tips[0].district + results.tips[0].address + results.tips[0].name
                            if(results.tips[0]){
                                this.latitude = results.tips[0].location.lat;
                                this.longitude = results.tips[0].location.lng;
                            }
                            if(results.tips[0].district){
                                let city = results.tips[0].district.split('市')[1]
                                this.apiGet('/city/location?city_name=' + city).then((res) =>{
                                    this.city_id=res.city_id
                                })
                            }
                        }else{
                            this.real_address = '';
                        }
                    }.bind(this));
                }.bind(this));
            },
            handleProvince(value){
                let dataRecieve = this.$refs.city.getCheckedNodes();
                this.cityName = dataRecieve[0].label
            },
            handeleAddress(){
                this.area_dialog = false;
                this.form.area = this.real_address + this.room;
            },
            handleTpl(index){
                if(this.label_id){
                    var length = this.tpl.length;
                    if(length < 1){
                        this.apiGet('/tpl/paginate?type=2&foreign_key=' + this.label_id).then((res) => {
                            this.form.describes = res.data[0].template;
                            this.tpl = res.data;
                        })
                    }else{
                        this.index = index + 1;
                        if(this.index > (length-1)){
                            this.index = 0
                        }
                        this.form.describes = this.tpl[this.index].template;
                    }
                }else{
                    this.$message.error('请先选择职位！');
                }



            },
            handleSubmit(){
                if(!this.form.name){
                    this.$message({
                        showClose: true,
                        message: '请填写职位名称',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.form.work){
                    this.$message({
                        showClose: true,
                        message: '请选择职位类型',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.form.area){
                    this.$message({
                        showClose: true,
                        message: '请完善地址',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.form.experience){
                    this.$message({
                        showClose: true,
                        message: '请完善工作要求',
                        type: 'error',
                        duration:500
                    })
                }else if(!this.form.education) {
                    this.$message({
                        showClose: true,
                        message: '请完善工作要求',
                        type: 'error',
                        duration: 500
                    })
                }else if(!this.form.salary) {
                    this.$message({
                        showClose: true,
                        message: '请完善工作要求',
                        type: 'error',
                        duration: 500
                    })
                }else if(!this.form.describes) {
                    this.$message({
                        showClose: true,
                        message: '请完善工作要求',
                        type: 'error',
                        duration: 500
                    })
                }else {
                    var work_experience_min, work_experience_max, salary_min, salary_max;
                    if (this.form.experience) {
                        var real_experience = this.form.experience.split('-');
                        if (real_experience.length > 1) {
                            work_experience_min = real_experience[0];
                            work_experience_max = real_experience[1];
                        } else {
                            work_experience_max = null;
                            work_experience_min = null;
                        }
                    }
                    if (this.form.salary) {
                        var real_salary = this.form.salary.split('-');
                        if (real_salary.length > 1) {
                            salary_min = real_salary[0];
                            salary_max = real_salary[1];
                        } else {
                            salary_min = real_salary[0];
                            salary_max = null;
                        }
                    }
                    let data = {
                        city_id: this.city_id,
                        work_label_id:this.label_id,
                        work_name:this.form.name,
                        education: this.form.education,
                        work_experience_max:work_experience_max,
                        work_experience_min:work_experience_min,
                        salary_min:salary_min,
                        salary_max:salary_max,
                        description:this.form.describes,
                        address:this.form.area,
                        longitude:this.longitude,
                        latitude:this.latitude,
                        status:1,
                    };
                    this.apiPost('/api/work/create', data).then((res)=>{
                        sessionStorage.removeItem('work')
                        this.$router.push({
                            name: "work",
                            params:{
                                activeName: 'work'
                            }
                        });
                    })
                }
            },
            getRouterData() {
                if(this.$route.params.work){
                    sessionStorage.setItem('work',this.$route.params.work);
                }
            },
        },
        watch:{
            work_dialog(){
                if(this.work_dialog){
                    this.handleLabel();
                }
            },
            area_dialog(){
                if(this.area_dialog){
                    this.handleCity();
                }
            }
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
                .basic_info{
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
                        .el-form-item:nth-last-child(1){
                            .el-form-item__content{
                                display: flex;
                                .write{
                                    margin-left: 16px;
                                    font-size: 12px;
                                    div:nth-child(1){
                                        div{
                                            width: 75px;
                                            height: 25px;
                                            line-height: 25px;
                                            text-align: center;
                                            margin-right: 17px;
                                            margin-top: 9px;
                                            background-size: 100% auto;
                                            background-repeat: no-repeat;
                                            display: inline-block;
                                            cursor: pointer;
                                            background-image: url('../../../assets/img/1@2x.png');
                                            color: #24BFFF;
                                        }
                                        div:hover{
                                            background-image: url('../../../assets/img/2@2x.png');
                                            color: white;
                                        }
                                    }
                                    div:nth-child(2){
                                        width: 75px;
                                        height: 25px;
                                        line-height: 25px;
                                        text-align: center;
                                        margin-right: 17px;
                                        margin-top: 9px;
                                        background-size: 100% auto;
                                        background-repeat: no-repeat;
                                        background-image: url('../../../assets/img/3@2x.png');
                                        color: #B3B3B3;
                                        cursor: pointer;
                                    }
                                }
                            }
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
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate3d(-50%,-50%,0);
                margin-top: 0!important;
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
        .area_dialog{
            .el-dialog__wrapper{
                overflow-y: hidden;
            }
            .el-dialog{
                position: absolute;
                top:50%;
                left: 50%;
                transform: translate3d(-50%,-80%,0);
                margin-top: 0!important;
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
                    padding-bottom: 10px;
                    .search{
                        text-align: left;
                        margin-bottom: 10px;
                        .note{
                            color: #B3B3B3;
                            font-size:12px;
                            margin-bottom: 20px;
                        }
                        .block{
                            display: flex;
                            margin-bottom: 20px;
                            p{
                                align-self: center;
                                width: 107px;
                                text-align: right;
                                margin-right: 10px;
                            }
                            .el-cascader{
                                align-self: center;
                                .el-input{
                                    width: 200px;
                                }
                                .el-cascader-menu{
                                    min-width: 120px;
                                }
                                .el-cascader-node{
                                    text-align: center;
                                }
                            }

                        }
                        .info{
                            position: relative;
                            .input_key{
                                display: flex;
                                p{
                                    align-self: center;
                                    width: 107px;
                                    text-align: right;
                                    margin-right: 10px;
                                }
                                .input-item{
                                    align-self: center;
                                    .el-input{
                                        width: 500px;
                                    }
                                }
                            }
                            #show{
                                position: absolute;
                                border: 1px solid #DCDFE6;
                                margin-left: 117px;
                                margin-top: 10px;
                                width: 480px!important;
                                border-radius: 4px;
                                padding: 10px;
                                background-color: #FFF;
                                top:40px!important;
                                left: 0!important;
                                z-index: 99999999;
                                .auto-item{
                                    font-size: 14px;
                                    height: 20px;
                                    line-height: 20px;
                                }
                            }
                        }
                        .room{
                            display: flex;
                            margin-top: 20px;
                            p{
                                align-self: center;
                                width: 107px;
                                text-align: right;
                                margin-right: 10px;
                            }
                            .el-input{
                                width: 500px;
                            }
                        }
                    }
                    .el-cascader-menu__wrap{
                        height: 350px;
                    }
                    .el-cascader-menu{
                        min-width: 269px;
                    }
                }
                .el-dialog__footer{
                    padding-top: 0;
                    padding-bottom: 20px;
                }
            }
        }
    }
    .el-popper[x-placement^=bottom]{
        margin-top: 10px!important;
    }
    .amap-sug-result{
        z-index: 99999999;
    }

</style>