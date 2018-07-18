<template>
	<div class="owner">
		<label>货主管理</label>
		<el-button type="primary" class="floatRight" size="small" @click="dialogShow">新增货主</el-button>
		<!-- 内容 -->
		<div class="content">
			<!-- 筛选条件 -->
			<el-form :model="form" label-width="70px" class="clearfix">
				<div class="ub">
					<!-- <el-form-item label="货品名称" >
					    <el-input v-model="form.goods" placeholder="请输入货品名称"></el-input>
					</el-form-item> -->
					<el-form-item label="货主名称" class="m-l-20">
					    <el-input v-model="params.shipName" placeholder="请输入货主名称"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click="search">筛选</el-button>
			<!-- 货品列表 -->
			<el-table
				stripe
		      	:data="tableData"
		      	v-loading="loading"
		      	style="width: 100%"
		      	class="table-data-list">
			    <el-table-column
			        prop="shipName"
			        label="货主名称"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="phone"
			        label="电话"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="trainNum"
			        label="进货车次总数">
			    </el-table-column>
			    <el-table-column
			        label="交易总金额">
			        <template slot-scope="scope">
						{{scope.row.tradeAmount | format}}
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="待结款金额">
			        <template slot-scope="scope">
						{{scope.row.notPayAmount | format}}
			        </template>
			    </el-table-column>

                <el-table-column
                        label="不承赊/承赊"
                        >
                    <template slot-scope="scope">
                        <div>
                            <el-switch v-model="scope.row.bearCreditStatus" on-text="开" off-text="关" active-value="Y"
                                       inactive-value="N"
                                       @change="toggleStatus(scope.row)"></el-switch>
                        </div>
                    </template>
                </el-table-column>


			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">
			        	<router-link :to="{name:'owner/ownerDetail',params: { uid: scope.row.sid }}">
			        	<el-button type="danger" plain size="mini">查看</el-button>
			        	</router-link>
        			</template>
			    </el-table-column>
		    </el-table>	
		    <el-pagination
			  background
			  layout="total, prev, pager, next"
			  :total="total"
			  :page-size="params.page_size"
			  :current-page.sync="params.current_page"
			  @current-change="currentChange">
			</el-pagination>
		</div>
		<el-dialog title="新增货主" :visible.sync="dialogFormVisible" width="800px" :before-close="dialogBeforeClose" @close="cancel">
			<el-form ref="ruleForm" :model="addForm" :rules="rules" label-width="100px">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<el-form-item label="货主名称：" prop="shipName">
							<el-input v-model.trim="addForm.shipName" placeholder="请输入货主名称" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
						<div class="grid-content clearfix">
							<el-form-item label="电话：" prop="phone">
			        		<el-input v-model.trim="addForm.phone" placeholder="请输入货主手机号" style="width: 200px"></el-input>
			        		</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<el-form-item label="供应商名称：">
							<el-input v-model="addForm.supplierName" placeholder="请输入供应商名称" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
						<div class="grid-content clearfix">
							<el-form-item label="账户信息：">
			        		<el-input v-model="addForm.acount" placeholder="请输入银行卡号" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
			        		</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="地址：">
							<el-input v-model="addForm.address" placeholder="请输入地址" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<!-- <el-col :span="12">
						<div class="grid-content clearfix">
							<el-form-item label="状态：">
			        		<el-switch  
			        		    v-model="addForm.status" 
				        		active-value="Y" 
				        		inactive-value="N"></el-switch>
				        	</el-form-item>
				  		</div>
				  	</el-col> -->
				  	<el-col :span="12">
				  		<div class="grid-content">
							<el-form-item label="开户信息：">
							<el-input v-model="addForm.openAccountInfo" placeholder="请输入开户信息" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft" style="width: 88px;text-align: right;padding-right: 12px;">备注：</label>
			        		<el-input v-model="addForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注信息" style="width: 584px" :maxlength="GLOBAL.maxTextare"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="cancel" size='small'>取 消</el-button>
			    <el-button type="primary" @click="addOwner" size='small' :loading="buttonLoading">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/owner/owner.scss';
	import { owner } from '@/services/apis/owner';
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
			return {
				dialogFormVisible:false,
				loading:true,
				buttonLoading:false,
				form:{
					name:''
				},
				//defaultAddForm:{},
				addForm:{
					sid:'',
					shipName:'',
					phone:'',
					supplierName:'',
					acount:'',
					address:'',
					status:'Y',
					openAccountInfo:'',
					remark:'',
				},
				tableData: [{
					uid: 1,
		            name: '王小虎',
		            phone: '1311231242',
		            train_num: 12,
		            trade_amount: 1222,
		            not_pay_amount: 22222
		        }],
		        total:null,
		        params:{
					page_size:10,
					current_page:1,
					shipName:''
                },
                rules: {
			        shipName: [
			            { required: true, message: '请输入货主名称', trigger: 'blur' },
			        ],
			        phone: [
			            { required: true, message: '请输入联系电话', trigger: 'blur' },
			            { validator: checkTelephone, trigger: 'blur' }
			        ],
		        }
			}
		},
		mounted() {
			this.getList()
		},
		created(){
			//this.defaultAddForm = JSON.parse(JSON.stringify(this.addForm));
		},
		methods:{
            //切换状态
            toggleStatus(row) {
                let sid = row.sid;
                let bearCreditStatus = row.bearCreditStatus;
                let data ={
                    sid:'',
                    bearCreditStatus: '',
                };
                data.sid = sid;
                data.bearCreditStatus = bearCreditStatus;

                owner.editStatus(data)
                    .then(response => {
                        if(response.data.status == 'Y'){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

			dialogShow(){
				this.dialogFormVisible = true;
				this.buttonLoading = false;
				this.defaultData(this.addForm)
			},
			search(){
				this.params.current_page = 1;
				this.getList();
			},
			getList(){
                owner.list(this.params)
                .then(response => {
                	this.total = response.data.results.total;
                    this.tableData = response.data.results.list;
                    this.loading = false;
                });
			},
			addOwner(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.buttonLoading = true;
						owner.addEdit(this.addForm)
		                .then(response => {
		                	if (response.data.status == "Y") {
		                		this.$message({
						          message: '添加成功',
						          type: 'success'
						        });
						        this.getList();
						        this.$refs.ruleForm.resetFields();
			                	this.dialogFormVisible=false;
		                	}else {
		                		this.$message({
						          message: response.data.error_msg,
						          type: 'error'
						        });
		                		this.buttonLoading = false;
		                	}

		                });
					}else{
						this.$message({
							message: '请输入货主信息',
							type: 'warning'
						});
					}
				})
				
				
			},
			//切换分页
			currentChange(val) {
				this.params.current_page = val;
				this.getList();
			},
			dialogBeforeClose(done){
				this.$refs.ruleForm.resetFields();
				done();
			},
			cancel(){
				this.dialogFormVisible = false;
				//this.defaultData(this.form);
				this.$refs.ruleForm.resetFields();
			},
			//恢复默认数据
			defaultData(form){
				form.sid='';
				form.shipName='';
				form.phone='';
				form.supplierName='';
				form.acount='';
				form.address='';
				form.status='Y';
				form.openAccountInfo='';
				form.remark='';
			},
		}

	}
</script>