<template>
	<div class="staffDetail">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>员工详情</label>
		<!-- 内容 -->
		<div class="content m-t-10">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>员工信息</span>
				    <el-button v-show='!isEdit' style="float: right; padding: 3px 0" type="text" @click="edit">编辑</el-button>
				    <el-button v-show='isEdit' style="float: right; padding: 3px 0" type="text" @click="save">保存</el-button>
				</div>
				<div>
				    <el-row>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<label for="">姓名：</label>
								<span>{{names}}</span>
								
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<label for="">角色：</label>
								<span v-if="this.types ==0">财务</span>
								<span v-show='!isEdit'>{{the_roleId | role}}</span>
								<el-select size='mini' v-show='isEdit' v-model="the_roleId" placeholder="请选择角色">
									<el-option label="财务" value="role_finance"></el-option>
								    <el-option label="卖手" value="role_sel"></el-option>
			                        <el-option label="财务兼卖手" value="role_finance_sell"></el-option>
								</el-select>						
					  		</div>
					  	</el-col>
					</el-row>
					<el-row>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<label for="">所属档位：</label>
								<span v-show='!isEdit'>{{gearNames}}</span>		
								<el-select size='mini' v-show='isEdit' v-model="form.dangwei" placeholder="请选择所属档位" @change="getdwId">
									<el-option v-for="item in dangweilist" :key="item.gid" :value="item.gearName" :lable="item.gid"></el-option>
								</el-select>					
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<label for="">手机号：</label>
								<span>{{phones}}</span>
								
					  		</div>
					  	</el-col>
					</el-row>
					<el-row>
					  	
					  	<el-col :span="12">
					  		<div class="grid-content">
								<label for="">状态：</label>
								<span v-if="status=='Y'">上架</span>
								<span v-else>下架</span>
					  		</div>
					  	</el-col>
						<el-col :span="12" v-if="types != 0">
					  		<div class="grid-content">
								<label for="">创建时间：</label>
								<span>{{createTimes}}</span>							
					  		</div>
					  	</el-col>
					</el-row>
					<el-row>
					  	<el-col :span="12" v-if="types == 0">
					  		<div class="grid-content">
								<label for="">创建时间：</label>
								<span>{{createTimes}}</span>							
					  		</div>
					  	</el-col>
					  	<el-col :span="24">
					  		<div class="grid-content">
								<label for="" class="floatLeft">备注：</label>
								<span v-show='!isEdit'>{{remark}}</span>
								<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" size='mini' v-show='isEdit' v-model="form.desc" placeholder="请输入备注信息"></el-input>
					  		</div>
					  	</el-col>
					</el-row>
				</div>
			</el-card>
		</div>
	</div>

</template>

<script>
	import '@/style/system/system.scss';
	import { record } from '@/services/apis/system/record';
	import {MessageBox} from 'element-ui';
	import { staff } from '@/services/apis/system/staff';
	export default {
		data() {
			return {
				types: this.$route.params.types, //type 0 财务 type为1 说明是卖手 ，卖手 姓名、手机号、登录密码 不可编辑 
				names:this.$route.params.names,
				the_roleId:this.$route.params.roleId,  //角色ID
				ids:this.$route.params.ids,
				phones:this.$route.params.phones,
				createTimes:this.$route.params.createTimes,
				remark:this.$route.params.remarks,
				gearNames:this.$route.params.gearNames,
				status:this.$route.params.status,
				isEdit:false,
				form:{
					name:'',
					phone:'',
					gears:'',
					desc:'',
					dangwei:'',
					pass:''
				},
				dangweilist:[],
				dangweiId:null
			}
		},
		mounted() {
			// 获取档位信息
			this.getdangweilist()
		},
		methods: {
			// 获取档位ID的方法
			getdwId(){
				 for (var i = 0; i < this.dangweilist.length; i++) {
                    if (this.form.dangwei == this.dangweilist[i].gearName) {
						this.dangweiId = this.dangweilist[i].gid;
                    }
				}
			},
			// 获取档位下拉信息
			getdangweilist(){
				record.list()
				.then(response => {
					this.dangweilist = response.data.results.list;
				})
			},
			edit(){
				
				this.isEdit = true;
				this.form.dangwei=this.gearNames;
				this.form.desc=this.remark;
				this.form.name=this.names;
				this.form.phone=this.phones;
			},
			save(){
				this.isEdit = false;
				if(this.dangweiId==null){
					this.dangweiId=this.dangweilist[0].gid
				}
				let params = {
					remark:this.form.desc,		//备注
					the_roleId:this.the_roleId, //角色ID
					empId:this.ids,			//员工ID
					the_gid:this.dangweiId
				}
	
				staff.EditStaff(params).then(response =>{
					if(response.data.status=='Y'){
						 MessageBox({
							message: '恭喜你，修改成功',
							type: 'success'
						});
						this.$router.push({ name: 'staff'})
					}else{
						MessageBox({
							message: response.data.results,
							type: 'error'
						});
					}
				})
			},
			// 编辑财务
			editorMoney(){
				
				let params = {
					phone:this.form.phone,      //手机号
					remark:this.form.desc,		//备注
					id:this.ids,			//员工ID
					userName:this.form.name,	//姓名
					password:this.form.pass,	//密码
					the_gid:this.dangweiId
				}
				console.log(params);
				staff.editor_MONEY(params).then(response =>{
					if(response.data.status=='Y'){
						 MessageBox({
							message: '恭喜你，修改成功',
							type: 'success'
						});
						this.$router.push({ name: 'staff'})
					}
				})
			},
			// 编辑卖手
			editorPay(){
				let params ={
					remark:this.form.desc,		//备注
					sid:this.ids,			//卖手ID
					the_gid:this.dangweiId
				}
				console.log(params);	
				staff.editor_PAY(params).then(response =>{
					if(response.data.status=='Y'){
						 MessageBox({
							message: '恭喜你，修改成功',
							type: 'success'
						});
						this.$router.push({ name: 'staff'})
					}
				})
			},
		}
	}
</script>