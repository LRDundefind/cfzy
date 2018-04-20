<template>
	<div class="record">
		<!-- <label>档位管理</label> -->
		<div class="clearfix m-t-10">
		<el-button type="primary" class="floatRight" size="small" @click="dialogFormVisible = true;buttonLoading = false;">添加档位</el-button>
		</div>
		<!-- 内容 -->
		<div class="content">
			<!-- 档位列表 -->
			<el-table
				stripe
		      	:data="tableData"
		      	v-loading="loading"
		      	class="table-data-list">
			    <el-table-column
			        prop="gearName"
			        label="档位名称">
			    </el-table-column>
			    <el-table-column
			        prop="markName"
			        label="所属市场">
			    </el-table-column>
			    <el-table-column
			    	prop="address"
			        label="地址">
			    </el-table-column>
			    <el-table-column
			        prop="phone"
			        label="联系电话">
			    </el-table-column>
			    <el-table-column
			        prop="addTime"
			        label="添加时间">
			    </el-table-column>
			    <el-table-column
			    	prop="poundCoef"
			        label="过磅系数">
			    </el-table-column>
			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">
			        	<router-link :to="{ name: 'goodsType',params: { gid: scope.row.gid }}">
							<el-button type="primary" plain size="mini">管理分类</el-button>
						</router-link>
			        </template>
			    </el-table-column>
			    <!-- <el-table-column
			        label="上架/下架"
			        width="180">
			        <template slot-scope="scope">
			        	<el-switch  v-model="scope.row.status" on-text="开" off-text="关" active-value="Y" inactive-value="N" @change=""></el-switch>
        			</template>
			    </el-table-column> -->
		    </el-table>	
		    <!-- <el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination> -->
		</div>
		<el-dialog title="添加档位" :visible.sync="dialogFormVisible" width="800px">
			<el-form :model="form">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">档位名称：</label>
							<el-input v-model="form.gearName" placeholder="请输入档位名称" style="width: 200px"></el-input>
							
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">所属市场：</label>
							<el-select v-model="form.markName" filterable allow-create placeholder="请选择所属市场" style="width: 200px">
						      	<el-option v-for="item in marketList" :key="item.id" :label="item.marketName" :value="item.marketName"></el-option>
						    </el-select>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">地址：</label>
							<el-input v-model="form.address" placeholder="请输入详细地址" style="width: 200px"></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">联系电话：</label>
							<el-input v-model="form.phone" placeholder="请输入联系电话" style="width: 200px"></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">过磅系数：</label>
							<el-input v-model="form.poundCoef" type="number" placeholder="请输入过磅系数" style="width: 200px">
								<el-select v-model="form.poundCoefUnit" slot="append" placeholder="请选择" style="width: 74px">
							      <el-option label="斤" value="unit_jin"></el-option>
							      <el-option label="公斤" value="unit_kg"></el-option>
							    </el-select>
							</el-input>	
				  		</div>
				  	</el-col>
				</el-row>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="addGear" size='small' :loading="buttonLoading">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/system/system.scss';
	import { record } from '@/services/apis/system/record';
	export default {
		data() {
			return {
				loading:true,
				buttonLoading:false,
				dialogFormVisible:false,
				marketList:[],
				form:{
					gearName:'',
					markName:'',
					address:'',
					phone:'',
					poundCoef:'',
					poundCoefUnit:'unit_jin'
				},
				tableData: [],
		        //total:100
			}
		},
		mounted() {
			this.getList();
			record.marketList().then(response => {
				this.marketList = response.data.results;
			})
		},
		methods:{
			getList(){
				var params = {
					page_size:'20',
					current_page:'1'
                }
                record.list(params)
                .then(response => {
                    this.tableData = response.data.results.list;
                    this.loading = false;
                })
			},
			addGear(){
				let valid = false;
				let count = 0;
				let l = 0;
				Object.keys(this.form).forEach(key=>{
					l ++
				    if(this.form[key]){
				    	count ++;
				    	return count;
				    }
				});
				if(count == l)  valid = true 
				if (valid) {
					this.buttonLoading = true;
					record.add(this.form)
	                .then(response => {
	                    this.getList();
	                    this.$message({
				          message: '添加成功',
				          type: 'success'
				        });
	                })
	                this.dialogFormVisible =false;
				}else{
					this.$message({
			          message: '请填写所有档主信息',
			          type: 'warning'
			        });
				}
			}
		}
	}
</script>