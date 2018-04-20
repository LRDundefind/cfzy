<template>
	<div class="owner">
		<label>货主管理</label>
		<el-button type="primary" class="floatRight" size="small" @click="dialogFormVisible = true">新增货主</el-button>
		<!-- 内容 -->
		<div class="content">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="form" label-width="70px" class="clearfix">
				<div class="ub">
					<!-- <el-form-item label="货品名称" >
					    <el-input v-model="form.goods" placeholder="请输入货品名称"></el-input>
					</el-form-item> -->
					<el-form-item label="货主姓名" class="m-l-20">
					    <el-input v-model="params.shipName" placeholder="请输入货主姓名"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click="getList">筛选</el-button>
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
			  @current-change="currentChange">
			</el-pagination>
		</div>
		<el-dialog title="新增货主" :visible.sync="dialogFormVisible" width="800px" @close="dialogClose">
			<el-form :model="addForm">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">货主名称：</label>
							<el-input v-model="addForm.shipName" placeholder="请输入类型名称" style="width: 200px"></el-input>
							
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
						<div class="grid-content clearfix">
							<label for="">电话：</label>
			        		<el-input v-model="addForm.phone" placeholder="请输入联系电话" style="width: 200px"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="addOwner" size='small'>确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/owner/owner.scss';
	import { owner } from '@/services/apis/owner';
	export default {
		data() {
			return {
				dialogFormVisible:false,
				loading:true,
				form:{
					name:''
				},
				addForm:{
					sid:'',
					shipName:'',
					phone:''
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
					page_size:20,
					current_page:1,
					shipName:''
                }
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			getList(){
                owner.list(this.params)
                .then(response => {
                	this.total = response.data.results.total;
                    this.tableData = response.data.results.list;
                    this.loading = false;
                });
			},
			addOwner(){
				if (this.addForm.shipName && this.addForm.phone) {
					owner.addEdit(this.addForm)
	                .then(response => {
	                	this.dialogFormVisible=false,
	                	this.getList();
	                });
				}else{
					this.$message({
						message: '请输入完整的货主信息',
						type: 'warning'
					});
				}
				
			},
			dialogClose(){
				this.addForm.shipName = '';
				this.addForm.phone = '';
			},
			//切换分页
			currentChange(val) {
				this.params.current_page = val;
				this.getList();
			},
		}

	}
</script>