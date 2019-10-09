<template>
	<div class="B_index_wrapper" v-show="this.start" v-loading="$store.state.app.loading"
		 element-loading-spinner="el-icon-loading" element-loading-customClass="el-loading">
		<!--//头部导航-->
		<div class="header">
			<div class="header_wrap">
				<div class="logo">
					<div>
						<span style="width: 99px"><img src="../../assets/img/demilogo.png" alt=""></span>
						<el-menu default-active="/B_index/B_person" class="el-menu-demo" mode="horizontal" router>
							<el-menu-item index="/B_index/B_person">个人中心</el-menu-item>
							<el-menu-item index="/B_index/home">兼职人才</el-menu-item>
							<el-menu-item index="/B_index/home">全职人才</el-menu-item>
							<el-menu-item index="3">得米APP</el-menu-item>
							<el-menu-item index="4">
								<el-badge :value="200" :max="99" class="item">
									<el-button size="small" style="margin-bottom: 2.5px">消息</el-button>
								</el-badge>
							</el-menu-item>
						</el-menu>
					</div>
				</div>
				<div class="Avatar">
					<span v-text="user_info.company_position ? user_info.name + '-' +  user_info.company_position : user_info.name"></span>
					<img :src="user_info.avatar" alt="" :title="user_info.name">
				</div>
			</div>
		</div>
		<div class="person-wrap" v-show="this.IsShow">
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
									active-text-color="#24BFFF"
							>
								<el-menu-item class="nav_label" index="/B_index/B_person">
									<img src="../../assets/img/home@2x.png" alt="">
									<img src="../../assets/img/home_active@2x.png" alt="">
									<span slot="title">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/work">
									<img src="../../assets/img/post@2x.png" alt="">
									<img src="../../assets/img/post_on@2x.png" alt="">
									<span slot="title">职位管理</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/interview">
									<img src="../../assets/img/interview@2x.png" alt="">
									<img src="../../assets/img/interview_on@2x.png" alt="">
									<span slot="title">面试管理</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/task">
									<img src="../../assets/img/assignment@2x.png" alt="">
									<img src="../../assets/img/assignment_on@2x.png" alt="">
									<span slot="title">任务管理</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/order">
									<img src="../../assets/img/indent@2x.png" alt="">
									<img src="../../assets/img/indent_on@2x.png" alt="">
									<span slot="title">订单列表</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/collect">
									<img src="../../assets/img/enshrine@2x.png" alt="">
									<img src="../../assets/img/enshrine_in@2x.png" alt="">
									<span slot="title">人才收藏</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/wallet">
									<img src="../../assets/img/burse@2x.png" alt="">
									<img src="../../assets/img/burse_on@2x.png" alt="">
									<span slot="title">我的钱包</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/real">
									<img src="../../assets/img/autonym@2x.png" alt="">
									<img src="../../assets/img/autonym_on@2x.png" alt="">
									<span slot="title">实名认证</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
								<el-menu-item class="nav_label" index="/B_index/B_person/VIP">
									<img src="../../assets/img/vip@2x.png" alt="">
									<img src="../../assets/img/vip_on@2x.png" alt="">
									<span slot="title">得米 VIP</span>
									<img src="../../assets/img/xuangzhong@2x.png">
								</el-menu-item>
							</el-menu>
						</el-col>
					</el-row>
				</div>
				<!--//右边内容渲染-->
				<div class="right" v-show="this.showRight">
					<router-view :user_info="user_info" />
				</div>
			</div>
		</div>

		<!--//头部导航内容渲染-->
		<router-view v-if="!IsShow"/>

		<!--//底部内容渲染-->
		<bottom v-show="this.IsShow"></bottom>
	</div>
</template>

<script>
	import  "../../assets/css/reset.css"
	import http from '../../libs/http'
	import bottom from '../../components/B_person_bottom'
	import {getType} from "../../libs/http";
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
				active_left:'/B_index/B_person'
			}
		},
		mounted() {
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
				this.$store.commit('loading', true);
				this.apiGet('/api/user/info').then((res) =>{
					this.user_info.avatar = res.avatar;
					this.user_info.company_id = res.company_id;
					this.user_info.user_id = res.user_id;
					this.user_info.name = res.nickname;
					this.user_info.company_position = res.company_position;
					this.$store.commit('loading', false);
				});
			},
			scrollTop(){
				document.getElementsByClassName('B_index_wrapper')[0].scrollIntoView();
			},

			//左边导航选中状态
			handleOpen(key, keyPath) {
				var lis = document.getElementsByClassName('nav_label');
				this.scrollTop();
				if(key === '/B_index/B_person'){
					lis[0].getElementsByTagName('img')[0].style.display = 'none';
					lis[0].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[0].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[0].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[0].getElementsByTagName('img')[1].style.display = 'none';
					lis[0].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/work'){
					lis[1].getElementsByTagName('img')[0].style.display = 'none';
					lis[1].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[1].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[1].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[1].getElementsByTagName('img')[1].style.display = 'none';
					lis[1].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/interview'){
					lis[2].getElementsByTagName('img')[0].style.display = 'none';
					lis[2].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[2].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[2].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[2].getElementsByTagName('img')[1].style.display = 'none';
					lis[2].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/task'){
					lis[3].getElementsByTagName('img')[0].style.display = 'none';
					lis[3].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[3].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[3].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[3].getElementsByTagName('img')[1].style.display = 'none';
					lis[3].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/order'){
					lis[4].getElementsByTagName('img')[0].style.display = 'none';
					lis[4].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[4].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[4].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[4].getElementsByTagName('img')[1].style.display = 'none';
					lis[4].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/collect'){
					lis[5].getElementsByTagName('img')[0].style.display = 'none';
					lis[5].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[5].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[5].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[5].getElementsByTagName('img')[1].style.display = 'none';
					lis[5].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/wallet'){
					lis[6].getElementsByTagName('img')[0].style.display = 'none';
					lis[6].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[6].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[6].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[6].getElementsByTagName('img')[1].style.display = 'none';
					lis[6].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/real'){
					lis[7].getElementsByTagName('img')[0].style.display = 'none';
					lis[7].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[7].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[7].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[7].getElementsByTagName('img')[1].style.display = 'none';
					lis[7].getElementsByTagName('img')[2].style.display = 'none';
				}
				if(key === '/B_index/B_person/VIP'){
					lis[8].getElementsByTagName('img')[0].style.display = 'none';
					lis[8].getElementsByTagName('img')[1].style.display = 'inline-block';
					lis[8].getElementsByTagName('img')[2].style.display = 'block';
				}else {
					lis[8].getElementsByTagName('img')[0].style.display = 'inline-block';
					lis[8].getElementsByTagName('img')[1].style.display = 'none';
					lis[8].getElementsByTagName('img')[2].style.display = 'none';
				}
			},

			//跳转公司详情
			handleCompany(){
				this.$router.push({
					name: "company_info",
					query:{
						id : this.user_info.company_id
					}
				});
			}
		},
		computed:{
			//是否是左边导航
			IsShow(){
				if(this.$route.meta['parent'] !== 'B_person'){
					return false
				}else{
					return true
				}
			},

			//判断用户类型
			start(){
				if(this.user_info.company_id && this.user_info.user_id){
					if(getType){
						this.apiGet('/api/company/info/' + this.user_info.company_id).then((res) =>{
							this.company_info = res;
							console.log(this.company_info);
						});
						return true
					}else{
						this.$message({
							showClose: true,
							message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
							duration:1000
						});
						return false
					}
				}
			},

			//判断是否为左边导航内容
			showRight(){
				this.active_left = this.$route.fullPath;
				if(this.active_left){
					if(this.IsShow && this.start){
						this.handleOpen(this.active_left);
					}
					return true
				}
				return true
			}
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
										padding: 0 3px;
									}
								}
							}
						}
					}
				}
				.Avatar{
					float: right;
					height: 100%;
					padding-top: 10px;
					display: flex;
					img{
						width:30px;
						height: 30px;
						border-radius: 50%;
						cursor: pointer;
						align-self: flex-start;
					}
					span{
						align-self: flex-start;
						height: 100%;
						color: #D9D9D9;
						font-size: 14px;
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
									img:nth-child(3) {
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