<template>
	<div class="ownerDetail">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>货主管理/货主详情</label>
		<!-- 内容 -->
		<div class="content" v-loading="loading">
			<!-- 货主信息 -->
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>货主信息</span>
				    <el-button v-show='!isEdit' style="float: right; padding: 3px 0" type="text" @click="editOwner">编辑</el-button>
				   
				</div>
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">姓名：</label>
							<span>{{dataInfo.shipName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">手机号码：</label>
							<span>{{dataInfo.phone}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">供应商名称：</label>
							<span>{{dataInfo.supplierName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">账户信息：</label>
							<span>{{dataInfo.acount}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">地址：</label>
							<span>{{dataInfo.address}}</span>
				  		</div>
				  	</el-col>
				  	<!-- <el-col :span="12">
				  		<div class="grid-content">
							<label for="">状态：</label>
							<span v-if="dataInfo.status=='Y'">上架</span>
							<span v-else>下架</span>
							<el-switch  
								disabled
			        		    v-model="dataInfo.status"
			        		    active-text="上架"
  								inactive-text="下架" 
				        		active-value="Y" 
				        		inactive-value="N"></el-switch>
				  		</div>
				  	</el-col> -->
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">开户信息：</label>
							<span>{{dataInfo.openAccountInfo}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<span>{{dataInfo.remark}}</span>
				  		</div>
				  	</el-col>
				</el-row>
			</el-card>
			<el-dialog title="编辑货主" :visible.sync="dialogFormVisible" width="800px">
				<el-form ref="ruleForm" :model="editForm" :rules="rules" label-width="102px">
					<el-row>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<el-form-item label="货主名称：" prop="shipName">
								<el-input v-model.trim="editForm.shipName" placeholder="请输入类型名称" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
								</el-form-item>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
							<div class="grid-content clearfix">
								<el-form-item label="电话：" prop="phone">
				        		<el-input v-model.trim="editForm.phone" placeholder="请输入联系电话" style="width: 200px"></el-input>
				        		</el-form-item>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<el-form-item label="供应商名称：">
								<el-input v-model="editForm.supplierName" placeholder="请输入供应商名称" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
								</el-form-item>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
							<div class="grid-content clearfix">
								<el-form-item label="账户信息：">
				        		<el-input v-model="editForm.acount" placeholder="请输入银行卡号" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
				        		</el-form-item>
					  		</div>
					  	</el-col>
					  	<el-col :span="12">
					  		<div class="grid-content">
								<el-form-item label="地址：">
								<el-input v-model="editForm.address" placeholder="请输入地址" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
								</el-form-item>
					  		</div>
					  	</el-col>
					  	<!-- <el-col :span="12">
							<div class="grid-content clearfix">
								<el-form-item label="状态：">
				        		<el-switch  
				        		    v-model="editForm.status" 
					        		active-value="Y" 
					        		inactive-value="N"></el-switch>
					        	</el-form-item>
					  		</div>
					  	</el-col> -->
					  	<el-col :span="12">
					  		<div class="grid-content">
								<el-form-item label="开户信息：">
								<el-input v-model="editForm.openAccountInfo" placeholder="请输入开户信息" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
								</el-form-item>
					  		</div>
					  	</el-col>
					  	<el-col :span="24">
							<div class="grid-content clearfix">
								<label for="" class="floatLeft" style="width: 88px;text-align: right;padding-right: 12px;">备注：</label>
				        		<el-input v-model="editForm.remark" type="textarea":autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注信息" style="width: 584px" :maxlength="GLOBAL.maxTextare"></el-input>
					  		</div>
					  	</el-col>
					</el-row>
				   
				</el-form>
				<div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
				    <el-button type="primary" @click="addOwner" size='small'>确 定</el-button>
				</div>
			</el-dialog>
			<!-- 交易详情 -->
			<el-card class="box-card m-t-20">
				<div slot="header" class="clearfix">
				    <span>交易详情</span>
				</div>
				<el-table
					stripe
			      	:data="transactionData"
			      	style="width: 100%"
			      	class="table-data-list">
				    <el-table-column
				        prop="trainsNum"
				        label="车次">
				    </el-table-column>
				    <el-table-column
				        prop="putStorageTime"
				        label="入库时间"
				        width="180">
				    </el-table-column>
				    <el-table-column
				        prop="soldOutTime"
				        label="售完时间">
				    </el-table-column>
				    <!-- <el-table-column
				        prop="good_num"
				        label="件数">
				    </el-table-column> -->
				    <el-table-column
				        label="货款">
				        <template slot-scope="scope">
							{{scope.row.payAmount | format}}
				        </template>
				    </el-table-column>
				    <el-table-column
				        prop="settlementTime"
				        label="结算日期">
				    </el-table-column>
				    <el-table-column
				        label="汇款金额">
				        <template slot-scope="scope">
							{{scope.row.remitAmount | format}}
				        </template>
				    </el-table-column>
				    <el-table-column
				        prop="settleStatus"
				        label="结算状态">
				    </el-table-column>
				    <el-table-column
				        label="操作">
				        <template slot-scope="scope">
				        	<router-link :to="{ name: 'train/trainDetail',params: { tid: scope.row.tid }}">
					        	<el-button type="danger" plain size="mini">查看</el-button>
					        </router-link>
					        <router-link :to="{ name: 'train/account',params: { tid: scope.row.tid }}">
				        		<el-button type="danger" plain size="mini" v-if="scope.row.settleStatus == '待结算'">结算</el-button>
				        	</router-link>
	        			</template>
				    </el-table-column>
			    </el-table>	
			    <el-pagination
				  background
				  layout="total, prev, pager, next"
				  @current-change="currentChange1"
				  :page-size="params1.page_size"
				  :total="total1">
				</el-pagination>
			</el-card>
			<!-- 汇款记录 -->
			<el-card class="box-card m-t-20">
				<div slot="header" class="clearfix">
				    <span>汇款记录</span>
				</div>
				<el-table
					stripe
			      	:data="remittance_recordData"
			      	style="width: 100%"
			      	class="table-data-list">
				    <el-table-column
				        type="index"
				        label="序号"
				        width="180">
				    </el-table-column>
				    <el-table-column
				        prop="expTime"
				        label="汇款日期">
				    </el-table-column>
				    <el-table-column
				        prop="expendType"
				        label="还款方式">
				    </el-table-column>
				    <el-table-column
				        label="汇款金额">
				        <template slot-scope="scope">
							{{scope.row.amount | format}}
				        </template>
				    </el-table-column>
				    <el-table-column
				        prop="remark"
				        label="备注">
				    </el-table-column>
			    </el-table>	
			    <el-pagination
				  background
				  layout="total, prev, pager, next"
				  @current-change="currentChange2"
				  :page-size="params2.page_size"
				  :total="total2">
				</el-pagination>
			</el-card>
		</div>
	</div>
</template>
<script>
	import '@/style/owner/owner.scss';
	import { owner } from '@/services/apis/owner';
	import { keyValue } from '@/services/apis/key-value';
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
				isEdit:false,
				loading:true,
				dataInfo:{},
				keyValueData:{},
				carStauts:[],
				transactionData:[],
				remittance_recordData:[],
				editForm:{
					sid:this.$route.params.uid,
					phone:'',
					shipName:'',
					supplierName:'',
					acount:'',
					address:'',
					status:'',
					openAccountInfo:'',
					remark:'',
				},
				params1:{
					sid:this.$route.params.uid,
                	page_size:10,
					current_page:1
				},
				params2:{
					sid:this.$route.params.uid,
                	page_size:10,
					current_page:1
				},
				total1:null,
				total2:null,
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
			keyValue()
            .then(response => {
                this.keyValueData = response.data.results
                this.carStauts = this.keyValueData.car_status;
                this.getInfo();
				this.getOwnerTrans();
				this.getOwnerRemit();
            })
			
		},
		updated(){
			this.loading = false;
		},
		methods:{
			getInfo(){
                //获取货主详情
                owner.info({sid:this.$route.params.uid})
                .then(response => {
                	this.dataInfo = response.data.results;
                });
            },
            getOwnerTrans(){
            	//获取交易详情
                owner.ownerTrans(this.params1)
                .then(response => {
                	this.transactionData = response.data.results.list;
                	this.total1 = response.data.results.total;
                	if (this.transactionData) {
	                	for (var i = 0; i < this.transactionData.length; i++) {
			            	for (var j = 0; j < this.keyValueData.car_status.length; j++) {
			            		if(this.transactionData[i].settleStatus == this.keyValueData.car_status[j].key){
			            			this.transactionData[i].settleStatus = this.keyValueData.car_status[j].value
			                	}
			            	}
			            }
			        }
                });
            },
            getOwnerRemit(){
            	//获取汇款记录
                owner.ownerRemit(this.params2)
                .then(response => {
                	this.remittance_recordData = response.data.results.list;
                	this.total2 = response.data.results.total
                });
            },
            editOwner(){
            	this.dialogFormVisible = true;
            	for (var Key1 in this.editForm){
            		for (var Key2 in this.dataInfo){
            			if (Key1 == Key2) this.editForm[Key1] = this.dataInfo[Key2]
            		}
			     	
			    }
            },
			addOwner(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						owner.addEdit(this.editForm)
		                .then(response => {
		                	this.dialogFormVisible=false,
		                	this.getInfo();
		                });
					}else{
						this.$message({
							message: '请输入货主信息',
							type: 'warning'
						});
					}
				})
			},
			currentChange1(val){
				this.params1.current_page = val;
				this.getOwnerTrans();
			},
			currentChange2(val){
				this.params2.current_page = val;
				this.getOwnerRemit();
			},
		},

	}
</script>