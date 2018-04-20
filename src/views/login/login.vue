<template>
		<div class="login" id="Login">
			<h2>程丰智运档主管理系统登录</h2>


			<!-- 登录模块 -->
			<div class="login_cont" v-if="register">
				<H3>管理端登录</H3>
				<div class="bg1">
					<span class="usericonBg"></span>
					<input v-model="userName" placeholder="用户名" class="usericon ">
				</div>
				
				<div class="bg2">
					<span class="passIconBg"></span>
					<input v-model="passWord" placeholder="密码" type="password"  class="passIcon ">
				</div>
				

				<div class="forgepass">
					<!-- <el-checkbox v-model="checked">记住密码</el-checkbox> -->
					
					<span @click="registerTab">注册档主</span>
				</div>

				<el-button type="primary" @click="loginBtn" style="width:100%;margin:45px 0 60px;">登录</el-button>
				
				
			</div>

			<!-- 注册模块 -->
			<div class="register_cont" v-else>
				<H3>管理端登录</H3>
				
				<input v-model="phoneNumber" placeholder="请输入手机号"  class="passIcon phoneIconBg">

				<input v-model="oncePassWord" placeholder="密码"  class="passIcon phoneIconBg2">
				

				<div class="pageYz">
					<input v-model="yanzhengma" placeholder="验证码"  class="passIconYz">
					<span v-show="show" @click="daojishi"  class="getNumber">获取验证码</span>
         			<span v-show="!show" class="getNumber">重新获取{{count}} s</span>
				</div>

				<el-button type="primary" @click="registerBtn" style="width:100%;margin:45px 0 60px;">注册</el-button>
				
				
			</div>

			
		</div>
	

</template>
<style scoped>
	.login{
		width: 100%;
		height: 100%;
		background: url(../../assets/login/dl_bg.png) no-repeat;
		background-size: cover;
		
	}
	.login h2{
		text-align: right;
		color: #fff;
		padding-top: 10%;
		margin:0 0 20px 0;
		padding-right: 14%;
	}
	.bg1,.bg2{
		position: relative;
	}
	.bg1 .usericonBg{
		position: absolute;
		width: 40px;
		height: 40px;
		z-index: 100;
		left: 8px;
		top: 7px;
		background: url(../../assets/login/dl_yonghuming_icon.png) no-repeat;
	}
	.bg2 .passIconBg{
		position: absolute;
		width: 40px;
		height: 40px;
		z-index: 100;
		left: 10px;
		top: 7px;
		background: url(../../assets/login/dl_mima_icon.png) no-repeat;
	}
	.login_cont,.register_cont{
		width: 380px;
		padding: 20px 40px;
		float: right;
		background: #fff;
		border-radius: 5px;
		margin-right: 10%;
	}
	.login_cont h3,.register_cont h3{
		text-align: center;
		font-weight: 400;
		padding-bottom: 20px;
	}
	.el-input__inner{
		padding: 0 0 0 40px !important;
	}
	.usericon,.passIcon{
		display: block;
		width: 400px;
		height: 40px;
		box-sizing: border-box;
		padding-left: 40px;
		border: 1px solid #dfdddf;
		font-size: 14px;
	}
	.phoneIconBg{
		background: url(../../assets/login/phone_icon.png) no-repeat;
		background-position: 10px 7px;
	}
	.phoneIconBg2{
		background: url(../../assets/login/dl_mima_icon.png) no-repeat;
		background-position: 10px 7px;
	}
	.passIcon{
		margin:20px 0;
	}
	.forgepass{
		display: inline;
		font-size: 14px;
	}
	.forgepass span{
		display: block;
		float: right;
		cursor: pointer;
	}
	.pageYz{
		display: table;
		width: 400px;
	}
	.passIconYz{
		width: 300px;
		display: block;
		float: left;
		height: 40px;
		border: 1px solid #dfdfdf;
		padding-left: 30px;
		box-sizing: border-box;
	}
	.getNumber{
		width: 98px;
		height: 38px;
		display: block;
		float: left;
		cursor: pointer;
		background: #3a8ee6;
		border: 1px solid #3a8ee6;
		text-align: center;
		color: #fff;
		line-height: 40px;
	}
</style>

<script>
	import { login } from '@/services/apis/login'

	const TIME_COUNT = 60;
	export default {
		name: 'Login',
		data() {
			return {
				userName:'',     //登录输入用户名
				passWord:'',	 //登录输入密码
				//checked:false,	 //登录记住密码是否选中
				register:true,	 //登录和注册的切换
				oncePassWord:'', //注册设置第一遍密码
				phoneNumber:'',   //输入手机号
				yanzhengma:'',     //验证码
				show: true,
				count: '',
				timer: null,
				form:{},
				auth:{
			        key:"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJRqAC45zJt7CFWUuRQgA+mm", //加密的key
			        randomKey:'' //生成签名的key
			    },
			    phonesend:{},
			    send:{},

			}
		},
		methods: {
			loginBtn(){
				let params = this.form;
				this.form.phone = this.userName
				this.form.password = this.passWord

				params = {
		          'str': strEnc(JSON.stringify(this.form),this.auth.key,this.auth.key,this.auth.key)
		        };
		  		
				if(this.userName==''){
					 this.$message({
								message: '请输入账号',
								type: 'warning'
							});
				}
				else if(!(new RegExp( /^1[3|4|5|7|8][0-9]{9}$/).test(this.userName))){
					this.$message({
								message: '账号格式不正确',
								type: 'warning'
							});
				}
				else if(this.passWord==''){
					this.$message({
								message: '请输入密码',
								type: 'warning'
							});
				}
				else if(!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.passWord))){
					this.$message({
								message: '密码格式不正确，请输入6-16位数字和字母的组合',
								type: 'warning'
							});
				}
				else{
					//获取登录信息
					login.auth(params)
					.then(response => {
		                if(response.data.status=='Y'){
							var result = response.data.results;

							// 数据存储
							let gid_list=[];
							if(result.stalls_list.length==0){
								gid_list=JSON.stringify([{gid:0,markName:''}])
							}
							else{
								gid_list=JSON.stringify(result.stalls_list)
							}
							
		    				window.localStorage.setItem('token', result.token);          
							window.localStorage.setItem('randomKey', result.randomKey);
							window.localStorage.setItem('owner_id', result.owner_id);     //档主ID
							window.localStorage.setItem('gid', gid_list);                 //档位信息集合
							window.localStorage.setItem('roleId', result.roleId);          //身份区分，档主还是财务
							window.localStorage.setItem('uid', result.uid);                //登录用户ID
							window.localStorage.setItem('userName', result.userName);     //姓名
							window.localStorage.setItem('compayName', result.compayName); //公司名称
							

							
							let redirect = '/'
							if(result.roleId=='role_finance'){
								//setTimeout(() => {
									//this.$router.push({name:'moneyHome'});
									redirect = this.$route.query.redirect || '/moneyHome';
				
								//}, 1500)
							}
							else if(result.roleId=='role_owner'){
								//setTimeout(() => {
									//this.$router.push({name:'home'});
									redirect = this.$route.query.redirect || '/home';
							        
								//}, 1500)
							}
							this.$router.push({
					            path: redirect
					        })
		                }
		                else{
		                	this.$message({
								message: response.data.error_msg,
								type: 'warning'
							});
		                }
		            })
		            .catch(function (response) {
				        console.log(response);
				    });
					
				}
			},
			registerTab(){
				this.register=false;
			},
			// 注册验证
			registerBtn(){
				if(this.phoneNumber==''){
					this.$message.error('请输入手机号');
				}
				else if(!(new RegExp( /^1[3|4|5|7|8][0-9]{9}$/).test(this.phoneNumber))){
					this.$message({
								message: '账号格式不正确',
								type: 'warning'
							});
				}
				else if(this.oncePassWord==''){
					this.$message.error('请输入密码');
				}
				else if(!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.oncePassWord))){
					this.$message({
								message: '密码格式不正确，请输入6-16位数字和字母的组合',
								type: 'warning'
							});
				}
				else if(this.yanzhengma==''){
					this.$message.error('验证码不能为空');
				}
				else{

					this.send.userName = this.phoneNumber;
					this.send.phone = this.phoneNumber;
					this.send.password = this.oncePassWord;
					this.send.verCode = this.yanzhengma;
					this.send.verCodeName='Register';
					let params3 = {
					  'str':strEnc(JSON.stringify(this.send),this.auth.key,this.auth.key,this.auth.key)
			        };

					login.zhuce(params3)

					 this.$message({
						message: '恭喜你，注册成功',
						type: 'success'
						});
					//调取接口
					this.register=true;
				}
			},
			// 倒计时函数
			daojishi(){

				if(this.phoneNumber==''){
					this.$message.error('请输入手机号');
				}
				else if(!(new RegExp( /^1[3|4|5|7|8][0-9]{9}$/).test(this.phoneNumber))){
					this.$message({
								message: '账号格式不正确',
								type: 'warning'
							});
				}
				else{
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
						}, 1000)
					}
					// 调取接口获取验证信息
					
					this.phonesend.phone = this.phoneNumber;
					let params2 = {
			          'str': strEnc(JSON.stringify(this.phonesend),this.auth.key,this.auth.key,this.auth.key)
			        };
					login.getmessname(params2)
				}
				  
			}
			
			
			
		},
		mounted: function() {
		
		},
		computed:{
			
		},
		watch:{
		
		}
	}
</script>