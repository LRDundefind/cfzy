<template>
	<div class="spendingType">
		<!-- <label>支出类型</label> -->
		<div class="clearfix m-t-10">
		<el-button type="primary" class="floatRight" size="small" @click="dialogFormVisible = true">添加支出类型</el-button>
		</div>
		<!-- 内容 -->
		<div class="content">

			<!-- 货品列表 -->
			<el-table
				stripe
		      	:data="tableData"
		      	class="table-data-list">
			    <el-table-column
			        prop="expendName"
			        label="类型名称">
			    </el-table-column>
			    <el-table-column
			        prop="createTime"
			        label="创建时间">
			    </el-table-column>
			    <el-table-column
			        label="锁定/解锁"
			        width="180">
			        <template slot-scope="scope">
			        	<el-switch  v-model="scope.row.status" on-text="开" off-text="关" active-value="Y" inactive-value="N" @change="onEditStatus(scope.row.status, scope.row.eid)"></el-switch>
        			</template>
			    </el-table-column>
		    </el-table>	
		    <!--<el-pagination
			  background
			  
		      @current-change="handTrainingCurrentChange"
		      :current-page="currentPage1"
		      :page-size="spendingList.pagesize"
		      :total="allcounts"
		      
			  layout="prev, pager, next"
			  >
			</el-pagination>-->
		</div>
		<el-dialog title="添加支出类型" :visible.sync="dialogFormVisible" width="800px">
			<el-form ref="dynamicValidateForm" :model="newData" :rules="rules">
				<el-form-item label="类型名称：" prop="name">
					<el-input size='mini' v-model="newData.name" placeholder="请输入类型名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button size='small' @click="cancelAddSpending()">取 消</el-button>
			    <el-button type="primary" size='small' @click="addSpending('dynamicValidateForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/system/system.scss';
    import {sysSpending} from '@/services/apis/system/sysSpendingType.js'
	
	export default {
		data() {
			return {
				dialogFormVisible:false,
				tableData: [],
				newData: {
					name:'',
				},
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
					],
				},
				//spendingList: {//分页的默认的参数
	            //    currentpage: 1,
	            //    pagesize: 1
	            //},
	        	//currentPage1: 1,//默认当前展示第几页
	        	//allcounts: null,//数据总数
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			//获取支出类型列表
			getList(){
				var params = {
					status:'',
//					current_page: this.spendingList.currentpage,
//					page_size: this.spendingList.pagesize
				};
				sysSpending.list(params)
					.then(response => {
						this.tableData = response.data.results;
//              		this.allcounts = Number(response.data.results.length);
					})
					.catch(function (response) {
						console.log(response);
					});
			},
			
			//分页-当前页
//	        handTrainingCurrentChange(val) {
//	        	console.log(val);
//				this.spendingList.currentpage = val;
//	            this.getList();
//	        },

			//修改支出类型状态
			onEditStatus(status, eid){
				var params = {
					status: status,
					eid: eid
				};
				sysSpending.editStatus(params)
					.then(response => {
						this.getList();
					})
					.catch(function (response) {
						console.log(response);
					});
			},
			
			//添加支出类型
            addSpending(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
						var params = {
							expendName: this.newData.name
						};
						sysSpending.addList(params)
							.then(response => {
								this.getList();
							})
							.catch(function (response) {
								console.log(response);
							});
							
						this.dialogFormVisible = false;
						this.newData.name = '';
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            
			//取消添加支出类型
			cancelAddSpending(){
				this.dialogFormVisible = false;
				this.newData.name = '';
			}

			
		}
	}
</script>