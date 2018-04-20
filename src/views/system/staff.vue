<template>
	<div class="staff">
		<!-- <label>员工管理</label> -->
		<div class="clearfix m-t-10">
		<el-button type="primary" class="floatRight" size="small" @click="dialogFormVisible = true">新增员工</el-button>
		</div>
		<!-- 内容 -->
		<div class="content m-t-10">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="search" label-width="70px" class="clearfix">
				<div class="ub">
					<el-form-item label="员工姓名" >
					    <el-input v-model="search.name" placeholder="请输入员工姓名"></el-input>
					</el-form-item>
					<el-form-item label="状态" class="m-l-20">
					    <el-select v-model="search.status" placeholder="请选择货品状态">
					      <el-option label="上架" value="Y"></el-option>
					      <el-option label="下架" value="N"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="角色" class="m-l-20">
					    <el-select v-model="search.role" placeholder="请选择角色">
					      <el-option label="财务" value="role_finance"></el-option>
					      <el-option label="卖手" value="role_owner"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="档位" class="m-l-20">
						<el-select v-model="search.dangwei" placeholder="请选择所属档位" @change="getdwId">
						      	<el-option v-for="item in dangweilist" :key="item.gid" :value="item.gearName" :lable="item.gid"></el-option>
						    </el-select>
					</el-form-item>
				</div>
				<div class="ub">
					<el-form-item label="创建时间" class="selectData">
					    <el-date-picker
						value-format="yyyy-MM-dd"
					      v-model="search.times"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</el-form-item>
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click="getList">筛选</el-button>
			<!-- 货品列表 -->
			<el-table
				stripe
		      	:data="tableData"
		      	style="width: 100%"
		      	class="table-data-list">
			    <el-table-column
			        prop="name"
			        label="员工名称"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="phone"
			        label="手机号"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="roleName"
			        label="角色">
					<template slot-scope="scope">
			        	<span>{{scope.row.roleName}}</span>
        			</template>
			    </el-table-column>
			    <el-table-column
			        prop="gearName"
			        label="档位">
			    </el-table-column>
			    <el-table-column
			        prop="createTime"
			        label="创建日期">
			    </el-table-column>
			    <el-table-column
			        prop="remark"
			        label="备注">
			    </el-table-column>
			    <el-table-column
			        label="绑定/解绑">
			        <template slot-scope="scope">
			        	<el-switch  v-model="scope.row.status" on-text="开" off-text="关" active-value='Y' inactive-value='N' @change="Bjbind(scope.row.roleName,scope.row.id)"></el-switch>
        			</template>
			    </el-table-column>
			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">

			        	<el-button type="danger" plain size="mini" 
						@click="goEdit(scope.row.roleName,scope.row.id,scope.row.name,scope.row.phone,scope.row.createTime,scope.row.remark,scope.row.gearName,scope.row.status)">
						查看</el-button>
			        	
        			</template>
			    </el-table-column>
		    </el-table>	
		    <!-- 不需要分页功能<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination> -->
		</div>

		<!-- 添加员工操作 -->

		<el-dialog title="添加员工" :visible.sync="dialogFormVisible" width="800px">
			<el-form :model="add">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">角色：</label>
							<el-select v-model="add.role" placeholder="请选择角色" style="width: 200px" @change="cleanR">
						      	<el-option label="财务" value="role_finance"></el-option>
						      	<el-option label="卖手" value="role_sel"></el-option>
						    </el-select>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">手机号：</label>
							<el-input type="text" 
							v-model="add.phone" 
							placeholder="请输入手机号" 
							style="width: 200px" 
							ref="type1"
							@change="getlength"
							></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">姓名：</label>
							<el-input v-model="add.userName" placeholder="请输入员工姓名" style="width: 200px" v-if="add.role!='role_sel' "></el-input>
							<el-input v-model="add.userName" placeholder="请输入员工姓名" style="width: 200px" :disabled='true' v-else></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">所属档位：</label>
							<el-select v-model="form.dangwei" placeholder="请选择所属档位" style="width: 200px" @change="getdwIdadd">
						      	<el-option v-for="item in dangweilist" :key="item.gid" :value="item.gearName" :lable="item.gearName"></el-option>
						    </el-select>
				  		</div>
				  	</el-col>
				  	<el-col :span="12" v-if="add.role!='role_sel' ">
				  		<div class="grid-content">
							<label for="">登录密码：</label>
							<el-input v-model="add.password" placeholder="请输入登录密码" style="width: 200px" ></el-input>	
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="add.remark"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="Adds" size='small'>确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/system/system.scss';
	import {MessageBox} from 'element-ui';
	import { staff } from '@/services/apis/system/staff';
	export default {
		data() {
			return {
				total:null,
				dialogFormVisible: false,
				search:{
					name:'',
					status:'',
					dangwei:'',
					role:'',
					times:[]
				},
				form:{
					name:'',
					status:'',
					role:'',
					gears:'',
					date:'',
					dangwei:'',
					phone:''
				},
				money:{         //编辑卖手和财务信息
					phone:'',      //手机号
					remark:'',		//备注
					id:'',			//员工ID
					userName:'',	//姓名
					password:'',	//密码
					status:'',		//状态
				},
				pay:{
					remark:'',		//备注
					sid:'',			//卖手ID
					status:'',		//状态
				},
				add:{         //添加卖手和财务信息
					role:'',       //身份信息财务还是卖手
					phone:'',      //手机号
					remark:'',		//备注
					id:'',			//员工ID
					userName:'',	//姓名
					password:'',	//密码
					status:'',		//状态
					sid:'',			//卖手ID
				},
				tableData: null,
				dangweilist:[],
				searchdangweiId:null,
				adddangweiId:null

			}
		},
		mounted() {
			// 获取列表
			this.getList();
			// 获取档位下拉信息
			this.getdangweilist()
		},
		methods:{
			cleanR(){
				// 清空输入的信息
				this.form.dangwei='';
				this.add.userName='';
				this.add.password='';
				this.add.remark='';
				this.add.phone='';
			},
			goEdit(roleName,id,name,phone,createTime,remark,gearName,status){
				if(roleName=='财务'){
					this.$router.push({ name: 'staff/staffDetail', params: { types: 0, ids: id ,names: name ,phones:phone,createTimes:createTime,remarks:remark,gearNames:gearName,status:status}})
				}
				else{
					this.$router.push({ name: 'staff/staffDetail', params: { types: 1, ids: id, names: name,phones:phone,createTimes:createTime,remarks:remark,gearNames:gearName,status:status}})
				}
			},
			// search获取档位ID的方法
			getdwId(){
				 for (var i = 0; i < this.dangweilist.length; i++) {
                    if (this.search.dangwei == this.dangweilist[i].gearName) {
						this.searchdangweiId = this.dangweilist[i].gid;
                    }
				}
			
			},
			// 添加获取档位ID的方法
			getdwIdadd(){
				 for (var i = 0; i < this.dangweilist.length; i++) {
                    if (this.form.dangwei == this.dangweilist[i].gearName) {
						this.adddangweiId = this.dangweilist[i].gid;
                    }
				}
			
			},
			searCh(){
				// 筛选
				console.log(this.search)
			},
			// 获取档位下拉信息
			getdangweilist(){
				this.dangweilist = JSON.parse(window.localStorage.getItem('gid'));
			},
			// 根据输入手机号获取获取卖手信息
			getlength(){
			
				if(this.add.phone.length==11 && this.add.role=='role_sel'){
					let params = {
						phone:this.add.phone,      //手机号
					}
					alert(123)
					staff.get_PAYmessage(params).then(response =>{
						let s=response.data.error_code;
						if(s==204){
							
						}
						else{
							this.add.name=response.data.results.selName;
							this.add.sid=response.data.results.sid
						}
					})
				}
				
			},
			// 添加员工
			Adds(){
				this.dialogFormVisible = false;
				// role role_finance代表财务 role_sel代表卖手
				if(this.add.role=='role_finance'){
					this.AddMoney();
					for(var keys in this.add){
						this.add[keys] ='';
					}
					this.search.dangwei='';
				}
				else{
					this.AddPay();
					for(var keys in this.add){
						this.add[keys] ='';
					}
					this.search.dangwei='';
				}
			},
				// 添加财务
			AddMoney(){
				let params = {
					phone:this.add.phone,      //手机号
					remark:this.add.remark,		//备注
					the_roleId:this.add.role,		//角色ID
					userName:this.add.userName,	//姓名
					password:this.add.password,	//密码
					the_gid:this.adddangweiId      //分配到哪个档位对应的ID
				}
				console.log(params);
				staff.add_MONEY(params).then(response =>{
					if(response.data.status=='Y'){
						 MessageBox({
							message: '恭喜你，添加成功',
							type: 'success',
							duration: 3 * 1000
						});
						this.getList();
					}
				})
			},
			// 添加卖手
			AddPay(){
				let params ={
					phone:this.add.phone,      //手机号
					remark:this.add.remark,		//备注
					sid:this.add.sid,			//卖手ID
					the_roleId:this.add.role,		//角色ID  role_finance代表财务 role_sel代表卖手
					the_gid:this.adddangweiId      //分配到哪个档位对应的ID
				}
				console.log(params);
				staff.add_PAY(params).then(response =>{
					if(response.data.status=='Y'){
						 MessageBox({
							message: '恭喜你，添加成功',
							type: 'success',
							duration: 3 * 1000
						});
						this.getList();
					}
					//  for(var keys in this.form){
					// 	this.form[keys] ='';
					// }
				})
			},
			// 绑定解绑传入参数   根据这条数据的角色区分编辑调入的接口
			Bjbind(shenfen,idcard){
				if(shenfen=='财务'){
					this.money.id=idcard;
					console.log(idcard)
					this.editorMoney();
				}
				else{
					console.log(idcard)
					this.pay.sid=idcard;
					this.editorPay();
				}
			},
			// 编辑财务
			editorMoney(){
				let params = {
					page_size:'20',
					current_page:'1',
					phone:this.money.phone,      //手机号
					remark:this.money.remark,		//备注
					id:this.money.sid,			//员工ID
					userName:this.money.userName,	//姓名
					password:this.money.password,	//密码
					status:this.money.status,		//状态
                }
				staff.editor_MONEY(params).then(response =>{

				})
			},
			// 编辑卖手
			editorPay(){
				let params ={
					page_size:'20',
					current_page:'1',
					remark:this.pay.remark,		//备注
					sid:this.pay.sid,			//卖手ID
					status:this.pay.status,		//状态
				}
					
				staff.editor_PAY(params).then(response =>{
					
				})
			},
			// 获取列表
			getList(){
				if(this.search.times==null){
					var a,b = ''
				}
				else{
					a=this.search.times[0];
					b=this.search.times[1];
				}
				var params = {
					page_size:'20',
					current_page:'1',
					name:this.search.name,
					roleId:this.search.role,
					status:this.search.status,
					createTime_start:a,
					createTime_end:b,
					the_gid:this.searchdangweiId
                }
                staff.list(params)
                .then(response => {
					
					//  for (var i = 0; i < response.data.results.length; i++) {
                    //     if (response.data.results[i].status == 'Y') {
                    //         response.data.results[i].status = true
                    //     }
                    //     else if (response.data.results[i].status == 'N') {
                    //         response.data.results[i].status = false
                    //     }
					// }
					if(response.data.results==''){
						this.tableData = [];
					}
					else{
						this.tableData = response.data.results;
					}
					
					// this.total = response.data.results.total
                })
                .catch(response=> {
                    console.log(response);
                });
			}
		},
		 watch:{
		// 	form:{  暂时不做监听
		// 	    handler:function(val,oldval){
		// 	     console.log(this.$refs.type1.type1);
		// 	    }

		//    }
		  },
		
	}
</script>