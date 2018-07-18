<template>
	<div class="staff">
		<!-- <label>员工管理</label> -->
		<div class="clearfix m-t-10">
		<el-button type="primary" class="floatRight" size="small" @click="addYg()">新增员工</el-button>
		</div>
		<!-- 内容 -->
		<div class="content m-t-10">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="search" label-width="70px" class="clearfix">
				<div class="ub pj">
					<el-form-item label="员工名称" >
					    <el-input v-model="search.name" placeholder="请输入员工姓名" :maxlength="GLOBAL.maxlength"></el-input>
					</el-form-item>
					<el-form-item label="状态" class="m-l-20">
					    <el-select v-model="search.status" placeholder="请选择货品状态">
					      <el-option label="全部" value=""></el-option>
					      <el-option label="上架" value="Y"></el-option>
					      <el-option label="下架" value="N"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="角色" class="m-l-20">
					    <el-select v-model="search.role" placeholder="请选择角色">
							<el-option label="全部" value=""></el-option>
					      <el-option label="财务" value="role_finance"></el-option>
					      <el-option label="卖手" value="role_sel"></el-option>
                          <el-option label="财务兼卖手" value="role_finance_sell"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="档位" class="m-l-20">
						<el-select v-model="search.dangwei" placeholder="请选择所属档位" @change="getdwId">
								<el-option label="全部" value=""></el-option>
						      	<el-option v-for="item in dangweilist" :key="item.gid" :value="item.gearName" :lable="item.gid"></el-option>
						    </el-select>
					</el-form-item>
				</div>
				<div class="ub pj">
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
			        label="创建时间">
			    </el-table-column>
			    <el-table-column
			        label="备注">
			        <template slot-scope="scope">
						<div class="line-ellipsis-1" :title="scope.row.remark">{{scope.row.remark}}</div>
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="锁定/解锁">
			        <template slot-scope="scope">
			        	<el-switch  v-model="scope.row.status" on-text="开" off-text="关" active-value='Y' inactive-value='N' @change="statusBind(scope.row.remark,scope.row.roleId,scope.row.id,scope.row.status,scope.row.the_gid)"></el-switch>
        			</template>
			    </el-table-column>
			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">

			        	<el-button type="danger" plain size="mini" 
						@click="goEdit(scope.row.roleId,scope.row.roleName,scope.row.id,scope.row.name,scope.row.phone,scope.row.createTime,scope.row.remark,scope.row.gearName,scope.row.status)">
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
		<!--  -->
		<el-dialog title="添加员工" 
		:lock-scroll= true
		:visible.sync="dialogFormVisible" 
		:close-on-click-modal= false
		:close-on-press-escape= false 
		:show-close= false
		width="800px">
			<el-form :model="add"  ref="ruleForm" :rules="rules" >
				<el-row>
				  	<el-col :span="12" style="height:85px;">
				  		<div class="grid-content">
							<el-form-item label="角色：" prop="role">
								<el-select v-model="add.role" placeholder="请选择角色" style="width: 200px" @change="cleanR">
									<el-option label="财务" value="role_finance"></el-option>
									<el-option label="卖手" value="role_sel"></el-option>
									<el-option label="财务兼卖手" value="role_finance_sell"></el-option>
								</el-select>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12" style="height:85px;">
				  		<div class="grid-content">
							<el-form-item label="手机号：" prop="phone">
								<el-input type="text" 
								v-model.trim="add.phone" 
								placeholder="请输入手机号" 
								style="width: 200px" 
								ref="type1"
								@input="getlength"
								></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12" style="height:85px;">
				  		<div class="grid-content">
				  			<!-- prop="userName" -->
							<el-form-item label="姓名：" >
								<!-- <el-input v-model="add.userName" placeholder="请输入员工姓名" style="width: 200px" v-if="showName && add.role=='role_finance'"></el-input>
                                <el-input v-model="add.userName" placeholder="请输入员工姓名" style="width: 200px" v-else-if="showName && add.role=='role_finance_sell'"></el-input> -->

                                <el-input v-model="add.userName" placeholder="请输入员工姓名" style="width: 200px" :disabled='true'></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12" style="height:85px;">
				  		<div class="grid-content">
							<el-form-item label="所属档位：" prop="dangwei">
								<el-select v-model="add.dangwei" placeholder="请选择所属档位" style="width: 200px" @change="getdwIdadd">
									<el-option v-for="item in dangweilist" :key="item.gid" :value="item.gearName" :lable="item.gearName"></el-option>
								</el-select>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<!-- <el-col :span="12" v-if="add.role!='role_sel' "  style="height:85px;">
				  		<div class="grid-content">
							<el-form-item label="登录密码：" prop="password">
							<el-input v-model="add.password" placeholder="请输入6位以上数字+字母" style="width: 200px" ></el-input>
							</el-form-item>	
				  		</div>
				  	</el-col> -->
				  	<el-col :span="24"  style="height:85px;">
						<div class="grid-content clearfix">
							<el-form-item label="备注：">
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="add.remark" :maxlength="GLOBAL.maxTextare"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				</el-row>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="deleatAll('ruleForm')" size='small'>取 消</el-button>
			    <el-button type="primary" @click="Adds('ruleForm')" size='small'>确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>
<style scoped>
.el-form-item__error{
	left: 122px !important;
}
</style>

<script>
	import '@/style/system/system.scss';
	import {MessageBox} from 'element-ui';
	import { staff } from '@/services/apis/system/staff';
	import { record } from '@/services/apis/system/record';
	export default {
		data() {
			//手机校验
			var checkTelephone = (rule, value, callback) => {
                if (value != '') {
                    var myreg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error(' 请输入有效的手机号码！'));
                    } else {
                        if (value.length != 11) {
                            callback(new Error('请输入有效的手机号码！'));
                        } else {
                            callback();
                        }
                    }
                } else {
                    callback();
                }
			};
			var checkPassword=(rule, value, callback)=>{
				var yan = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if (!yan.test(value)) {
                        callback(new Error(' 密码格式不正确！'));
					}
					else {
                    callback();
                }
			};
			return {
				rules: {
			        role: [
			            { required: true, message: '请选择角色', trigger: 'change' },
			        ],
			        phone: [
			            { required: true, message: '请输入手机号', trigger: 'blur' },
			            { validator: checkTelephone, trigger: 'blur' }
			        ],
					// userName: [
			  //           { required: true, message: '请填写姓名', trigger: 'blur' },
			  //       ],
					dangwei: [
			            { required: true, message: '请选择挡位', trigger: 'change' },
			        ],
					password: [
						{ required: true, message: '请输入6位以上数字+字母', trigger: 'blur' },
						{validator:checkPassword,trigger:'blur'}
			        ],
					
		        },
				total:null,
				dialogFormVisible: false,
				showName:true,   //添加姓名显示的姓名条件
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
			
			addYg(){
				this.showName=true;
				this.dialogFormVisible = true;
				// this.form.dangwei='';
				// this.add.userName='';
				// this.add.password='';
				// this.add.remark='';
				// this.add.phone='';
				//  resetForm(formName) {
					// this.$refs[asd].resetFields();
				// }
			},
			deleatAll(messageAll){
				this.dialogFormVisible = false
				this.$refs[messageAll].resetFields();
				this.showName=false;
				this.add.userName='';
			},
			cleanR(){
				// 清空输入的信息
				this.form.dangwei='';
				this.add.userName='';
				this.add.password='';
				this.add.remark='';
				this.add.phone='';
			},
			goEdit(roleId,roleName,id,name,phone,createTime,remark,gearName,status){
				
				this.$router.push({ name: 'staff/staffDetail', params: { ids: id,roleId:roleId, names: name,phones:phone,createTimes:createTime,remarks:remark,gearNames:gearName,status:status}})
				
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
                    if (this.add.dangwei == this.dangweilist[i].gearName) {
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
				// this.dangweilist = JSON.parse(window.localStorage.getItem('gid'));
				record.list()
				.then(response => {
					this.dangweilist = response.data.results.list;
				})
			},
			// 根据输入手机号获取获取卖手信息
			getlength(){
				
				if(this.add.phone.length==11){
					let params = {
						phone:this.add.phone,      //手机号
					}
					
					staff.get_PAYmessage(params).then(response =>{
						
						this.showName=false;
						this.add.userName=response.data.results.userName;
						this.add.id=response.data.results.uid;

					})
				}
				
			},
			// 添加员工
			Adds(messageAll){
				let _this=this;
				this.$refs.ruleForm.validate((valid) => {
					// 验证通过
					if (valid) {
						let params = {
							phone:this.add.phone,      //手机号
							remark:this.add.remark,		//备注
							the_roleId:this.add.role,		//角色ID
							empId:this.add.id || '',  //员工id
							the_gid:this.adddangweiId      //分配到哪个档位对应的ID
						}

						staff.addStaff(params).then(response =>{
							if(response.data.status=='Y'){
								this.dialogFormVisible = false;
								MessageBox({
									message: '恭喜你，添加成功',
									type: 'success',
									duration: 3 * 1000
								});
								this.getList();
								this.$refs[messageAll].resetFields();
								this.add.userName='';
								this.add.remark='';
							}
							else{
								this.$message({
									message: response.data.error_msg,
									type: 'warning'
								});

							}
						})
					}
					
				})
				
				
			},
				// 添加财务
			AddMoney(messageAll){
				
					let params = {
						phone:this.add.phone,      //手机号
						remark:this.add.remark,		//备注
						the_roleId:this.add.role,		//角色ID
						userName:this.add.userName,	//姓名
						password:this.add.password,	//密码
						the_gid:this.adddangweiId      //分配到哪个档位对应的ID
					}

					staff.add_MONEY(params).then(response =>{
						if(response.data.status=='Y'){
							this.dialogFormVisible = false;
							MessageBox({
								message: '恭喜你，添加成功',
								type: 'success',
								duration: 3 * 1000
							});
							this.getList();
							this.$refs[messageAll].resetFields();
							this.add.userName='';
							this.add.remark='';
						}
						else{
							this.$message({
								message: response.data.error_msg,
								type: 'warning'
							});

						}
					})
				
				
			},
			// 添加卖手
			AddPay(messageAll){
				
					let params ={
					phone:this.add.phone,      //手机号
					remark:this.add.remark,		//备注
					sid:this.add.sid,			//卖手ID
					the_roleId:this.add.role,		//角色ID  role_finance代表财务 role_sel代表卖手
					the_gid:this.adddangweiId      //分配到哪个档位对应的ID
					}
					staff.add_PAY(params).then(response =>{
						if(response.data.status=='Y'){
							this.dialogFormVisible = false;
							MessageBox({
								message: '恭喜你，添加成功',
								type: 'success',
								duration: 3 * 1000
							});
							this.$refs[messageAll].resetFields();
							this.add.userName='';
							this.add.remark='';
							this.getList();
						}
						else{
							this.$message({
								message: response.data.error_msg,
								type: 'warning'
							});

						}

					})
	
				
			},
			// 绑定解绑传入参数   根据这条数据的角色区分编辑调入的接口
            statusBind(remark,roleId,id,status,the_gid){
                let data ={
                    remark:remark,		//备注
                    empId:id,//员工id
                    the_roleId:roleId, //角色ID
                    status:status,//状态
                    the_gid:the_gid,//档位id
                };

                staff.EditStaff(data).then(response =>{
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

//			Bjbind(shenfen,idcard,status){
//				if(shenfen=='财务' || shenfen=='财务兼卖手'){
//					this.money.id=idcard;
//					this.money.status=status;
//					console.log(idcard)
//					this.editorMoney();
//				}
//				else{
//					console.log(idcard)
//					this.pay.sid=idcard;
//					this.pay.status=status;
//					this.editorPay();
//				}
//			},
//			// 编辑财务
//			editorMoney(){
//				let params = {
//					page_size:'20',
//					current_page:'1',
//					// phone:this.money.phone,      //手机号
//					// remark:this.money.remark,		//备注
//					id:this.money.id,			//员工ID
//					// userName:this.money.userName,	//姓名
//					// password:this.money.password,	//密码
//					status:this.money.status,		//状态
//					// the_gid:this.dangweilist[0].gid
//                }
//				staff.editor_MONEY(params).then(response =>{
//					if(response.data.status=='Y'){
//						MessageBox({
//							message: '修改成功',
//							type: 'success',
//							duration: 3 * 1000
//						});
//					}
//				})
//			},
//			// 编辑卖手
//			editorPay(){
//				let params ={
//					page_size:'20',
//					current_page:'1',
//					// remark:this.pay.remark,		//备注
//					sid:this.pay.sid,			//卖手ID
//					status:this.pay.status,		//状态
//					 the_gid:this.dangweilist[0].gid
//				}
//
//				staff.editor_PAY(params).then(response =>{
//					if(response.data.status=='Y'){
//						MessageBox({
//							message: '修改成功',
//							type: 'success',
//							duration: 3 * 1000
//						});
//					}
//				})
//			},
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
					the_roleId:this.search.role,
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