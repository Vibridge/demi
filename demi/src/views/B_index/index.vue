<template>
	<div class="B_index_wrapper" v-show="this.start"
		 element-loading-spinner="el-icon-loading" element-loading-customClass="el-loading">
		<!--//头部导航-->
		<div :class="active_top === '/B_index/Detail' ? 'header active_app' : 'header'">
			<div class="header_wrap">
				<div class="logo">
					<div>
						<span style="width: 99px" v-if="active_top !== '/B_index/Detail'"><img src="../../assets/img/demilogo.png" alt=""></span>
						<span style="width: 99px" v-if="active_top === '/B_index/Detail'"><img src="../../assets/img/detail_2.png" alt=""></span>
						<el-menu :default-active="active_top" class="el-menu-demo" mode="horizontal" router @select="handleTopMenu">
							<el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''" index="/B_index/B_person">个人中心</el-menu-item>
							<el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''" index="/B_index/ability_resume">兼职人才</el-menu-item>
							<el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''" index="/B_index/work_resume">全职人才</el-menu-item>
							<el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item is_app_active' : ''" index="/B_index/Detail">得米APP</el-menu-item>
							<el-menu-item :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''" index="/B_index/IM">
								<el-badge :value="totalUnreadCount" :hidden="totalUnreadCount > 0 ? false : true" :max="99" class="item">
									<el-button size="small" style="margin-bottom: 2.5px">
										<span :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''">
											消息
										</span>
									</el-button>
								</el-badge>
							</el-menu-item>
						</el-menu>
					</div>
				</div>
				<div class="Avatar" :class="active_top === '/B_index/Detail' ? 'active_app_item' : ''">
					<span class="work_name" v-text="user_info.company_position ? user_info.name + '-' +  user_info.company_position : user_info.name"></span>
					<img :src="user_info.avatar" alt="" :title="user_info.name">
				</div>
			</div>
		</div>
		<div class="person-wrap" v-if="this.IsShow">
			<div class="content">
				<!--//左部导航-->
				<div class="left">

					<!--//公司信息-->
					<div class="person_header" @click="handleCompany">
						<img v-if="company_info.logo_path" :src="company_info.logo_path" alt="">
						<img v-if="!company_info.logo_path" src="../../assets/img/toxiang@2x.png" alt="">
						<p v-text="company_info.company_name ? company_info.company_name : 'xxxxxx有限公司'"></p>
						<span v-if="company_info.industry_label">{{company_info.industry_label && company_info.industry_label.name}}/{{company_info.financing}}/{{company_info.employee}}</span>
					</div>
					<span class="line"></span>
					<el-row class="tac">
						<el-col :span="12">
							<el-menu
									:default-active="active_left"
									class="el-menu-vertical-demo"
									@select="handleOpen"
									router
							>
								<el-menu-item class="nav_label" v-for="(item,index) in left_list" :key="index" :index="item.path">
									<img src="../../assets/img/home@2x.png" alt="" v-if="active_class !== item.path">
									<img src="../../assets/img/home_active@2x.png" alt="" v-if="active_class === item.path">
									<span slot="title" v-html="item.title" :class="active_class === item.path ? 'active_left' : ''"></span>
									<img src="../../assets/img/xuangzhong@2x.png" v-if="active_class === item.path">
								</el-menu-item>
							</el-menu>
						</el-col>
					</el-row>
				</div>

				<!--//右边内容渲染-->
				<div class="right">
					<router-view :user_info="user_info" />
				</div>
			</div>
		</div>

		<!--//头部导航内容渲染-->
		<router-view v-if="!IsShow"/>

		<!--//底部内容渲染-->
		<bottom v-if="this.IsShow"></bottom>

	</div>
</template>

<script>
	import  "../../assets/css/reset.css"
	import http from '../../libs/http'
	import bottom from '../../components/B_person_bottom'

	import { mapGetters } from 'vuex'
	/* eslint-disable */
	export default {
		name: 'index',
		components:{bottom},
		data(){
			return{
				user_info:{
					avatar:'',
					company_id:null,
					user_id:null,
					name:'',
					company_position:'',
				},
				company_info:{},
				active_left:'/B_index/B_person/index',
				active_top:'/B_index/B_person',
				left_list:[
					{
						path: '/B_index/B_person/index',
						title: '<span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>'
					},
					{
						path: '/B_index/B_person/work',
						title:'职位管理'
					},
					{
						path: '/B_index/B_person/interview',
						title:'面试管理'
					},
					{
						path: '/B_index/B_person/task',
						title:'任务管理'
					},
					{
						path: '/B_index/B_person/order',
						title:'订单列表'
					},
					{
						path: '/B_index/B_person/collect',
						title:'人才收藏'
					},
					{
						path: '/B_index/B_person/wallet',
						title:'我的钱包'
					},
					{
						path: '/B_index/B_person/real',
						title:'实名认证'
					},
					{
						path: '/B_index/B_person/VIP',
						title:'得米 VIP'
					},
				],
				active_class:'',
				read:0,
				active_app_class:''
			}
		},
		mounted() {
			this.apiGet('/api/user/info').then((res) => {
				if (res.type !== 2) {
					this.$message({
						showClose: true,
						message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
						duration: 1000
					});
					this.$router.push({
						name: "login"
					});
				}
			});
			//回到顶部
			this.scrollTop();
			this.initialize();
			//左边导航默认选中
			this.active_left = this.$route.fullPath;
			if(this.active_left){
				this.handleOpen(this.active_left)
			}
		},
		methods:{
			initialize(){
				this.apiGet('/api/user/info').then((res) =>{
					this.user_info.avatar = res.avatar;
					this.user_info.company_id = res.company_id;
					this.user_info.user_id = res.user_id;
					this.user_info.name = res.nickname;
					this.user_info.company_position = res.company_position;
				});
			},
			scrollTop(){
				document.getElementsByClassName('B_index_wrapper')[0].scrollIntoView();
			},

			handleTopMenu(key, keyPath){
				this.active_top = key
			},

			//左边导航选中状态
			handleOpen(key, keyPath) {
				this.scrollTop();
				this.active_class = key
			},

			//跳转公司详情
			handleCompany(){
				this.$router.push({
					name: "company_info",
					query:{
						id : this.user_info.company_id
					}
				});
			},

		},
		computed:{
			//是否是左边导航
			IsShow(){
				if(this.$route.meta['parent'] !== 'B_person'){
					this.active_top = '/B_index/B_person';
					if(this.$route.meta['parent'] !== 'create'){
						this.active_top = this.$route.path;
					}
					return false
				}else{
					return true
				}
			},

			//判断用户类型
			start(){
				if(this.user_info.company_id && this.user_info.user_id){
					this.apiGet('/api/company/info/' + this.user_info.company_id).then((res) =>{
						this.company_info = res;
					});
					return true;
				}
			},

			/*//判断是否为左边导航内容
			showRight(){
				this.active_left = this.$route.fullPath;
				if(this.active_left){
					if(this.IsShow && this.start){
						this.handleOpen(this.active_left);
					}
					return true
				}
				return true
			}*/

			...mapGetters(['totalUnreadCount']),
			/*// 是否显示 Loading 状态
			showLoading() {
				return !this.isSDKReady
			}*/
		},
		watch:{
		},
		mixins:[http]
	}
</script>

<style type="text/less" lang="less">
	.B_index_wrapper{
		width:100%;
		height: 100%;
		font-family: MicrosoftYaHeiLight;
		overflow-y: auto;
		.active_app{
			background:rgba(69,201,255,1)!important;
		}
		.header{
			width:100%;
			background: #2D3238;
			.header_wrap{
				width:1000px;
				height:50px;
				margin: 0 auto;
				.logo{
					float: left;
					height: 100%;
					color: #FFFFFF;
					font-size: 14px;
					div{
						display: flex;
						img{
							width: 100%;
							padding-top: 13px;
						}
						.el-menu{
							background: none;
						}
						.is_app_active{
							background:rgba(29,184,248,1)!important;
						}
						.el-menu-demo{
							border-bottom: none;
						}
						.el-menu--horizontal>.el-menu-item.is-active{
							background: #272B30;
							border-bottom:none;
							color: #ffffff;
						}
						.el-menu-item:focus, .el-menu-item:hover{
							background: none;
							color: #ffffff;
						}
						ul{
							margin-left: 31px;
							li{
								display: inline-block;
								height: 50px;
								line-height: 50px;
								margin-right: 15px;
								padding: 0 15px;
								cursor: pointer;
								color: #D9D9D9;
								border-bottom:none;
								.el-badge{
									height: 50px;
									button{
										background: none;
										color: #D9D9D9;
										border: none;
										font-size: 14px;
										padding: 0;
									}
									button:hover{
										color: #ffffff;
									}
									.el-badge__content.is-fixed{
										top:14px;
										right:6px;
									}
									.el-badge__content{
										border: none;
										line-height: 17px;
										padding: 0 5px;
									}
								}
							}
						}
					}
				}
				.active_app_item{
					/*background:rgba(29,184,248,1);*/
					/*border-bottom:none;*/
					color: #ffffff!important;
				}
				.Avatar{
					float: right;
					height: 100%;
					padding-top: 10px;
					display: flex;
					color: #D9D9D9;
					font-size: 14px;
					img{
						width:30px;
						height: 30px;
						border-radius: 50%;
						cursor: pointer;
						align-self: flex-start;
					}
					.work_name{
						align-self: flex-start;
						height: 100%;
						margin-right: 12px;
						line-height: 30px;
					}
				}
			}
		}
		.person-wrap {
			width: 1000px;
			margin: 32px auto;
			.content {
				width: 100%;
				display: flex;
				.left {
					width: 260px;
					height: 837px;
					margin-right: 17px;
					background: #fff;
					border: 1px solid rgba(235, 235, 235, 1);
					border-radius: 8px;
					text-align: center;

					.person_header {
						margin-top: 19px;
						padding-bottom: 19px;
						img {
							margin-top: 22px;
							margin-bottom: 16px;
							width: 74px;
							height: 74px;
							border-radius: 50%;

						}
						p {
							margin-bottom: 11px;
							font-size: 14px;
							color: #4D4D4D;
						}
						span {
							font-size: 12px;
							color: #999999;
						}
					}

					.person_header:hover {
						background: rgba(247, 247, 247, 1);
					}
					.line {
						margin-top: 19px;
						margin-bottom: 6px;
						display: inline-block;
						width: 237px;
						height: 1px;
						border-bottom: 1px dashed rgba(230, 230, 230, 1);
					}
					.tac {
						.el-col-12 {
							width: 100%;
							.el-menu {
								border: none;
								li {
									position: relative;
									margin-top: 17px;
									height: 50px;
									line-height: 50px;
									cursor: pointer;
									color: #808080;
									font-size: 14px;
									text-align: center;
									img {
										width: 22px;
										margin-right: 17px;
									}
									img:nth-child(2){
										position: absolute;
										margin: 0;
										top:33%;
										right: -1px;
										width: 10px;
										vertical-align: unset;
									}
								}
								.el-menu-item:focus{
									background: none;
								}
								.el-menu-item:hover{
									background: rgba(247, 247, 247, 1);
								}
							}
						}


					}
				}
				.right {
					width: 724px;
				}
			}
		}
	}
	.active_left{
		color:#24BFFF;
	}
	.active_item{
		background: #272B30;
	}
	.el-loading{
		position:fixed;
		top:50%;
		left:50%;
		transform: translate3d(-50%,-50%,0);
	}
	a{
		color: white;
	}
</style>