<template>
	<div class="goods">
		<label>货品库存</label>
		<!-- 内容 -->
		<div class="content">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="params" label-width="70px" class="clearfix">
				<div class="ub">
					<el-form-item label="货品名称" >
					    <el-input v-model="params.goodName" placeholder="请输入货品名称"></el-input>
					</el-form-item>
					<!-- <el-form-item label="货品状态" class="m-l-20">
					    <el-select v-model="params.status" placeholder="请选择货品状态">
					      <el-option label="全部" value=""></el-option>
					      <el-option label="上架" value="Y"></el-option>
					      <el-option label="下架" value="N"></el-option>
					    </el-select>
					</el-form-item> -->
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click="search">筛选</el-button>
			<!-- 货品列表 -->
			<el-table
				stripe
		      	:data="dataList"
		      	v-loading="loading"
		      	style="width: 100%"
		      	class="table-data-list">
			    <el-table-column
			        type='index'
			        label="序号"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="goodName"
			        label="货品名称"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        label="库存量">
			        <template slot-scope="scope">
			        	{{scope.row.pieceNum}}件+{{scope.row.kgNum}}公斤+{{scope.row.axeNum}}斤
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="备注">
			        <template slot-scope="scope">
						<div class="line-ellipsis-1" :title="scope.row.remark">{{scope.row.remark}}</div>
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">
			        	<el-button type="primary" plain size="mini" @click="editGood(scope.row.goodId,scope.$index)">修改</el-button>
        			</template>
			    </el-table-column>
		    </el-table>	
		    <el-pagination
			  background
			  layout="total, prev, pager, next"
			  @current-change="currentChange"
			  :current-page.sync="params.current_page"
			  :page-size="params.page_size"
			  :total="total">
			</el-pagination>
		</div>
		<el-dialog title="修改货品" :visible.sync="dialogFormVisible" width="800px">
			<el-form :model="goodsForm" label-width="70px" >
				<el-form-item label="库存量：" style="width:100%">
					<el-input placeholder="输入件数" type="number" v-model="goodsForm.pieceNum" class="floatLeft" style="width:214px"><template slot="append">件</template></el-input>
					<el-input placeholder="输入公斤数" type="number" v-model="goodsForm.kgNum" class="floatLeft m-l-20" style="width:214px"><template slot="append">公斤</template></el-input>
					<el-input placeholder="输入斤数" type="number" v-model="goodsForm.axeNum" class="floatLeft m-l-20" style="width:214px"><template slot="append">斤</template></el-input>
				</el-form-item> 	
				<el-form-item label="备注：" style="width:100%">
			        <el-input type='textarea' v-model="goodsForm.remark" placeholder="请输入备注" :maxlength="GLOBAL.maxTextare"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="sureEditGood" size='small'>确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/inventory/inventory.scss';
	import { goods } from '@/services/apis/goods';
	export default {
		data() {
			return {
				dialogFormVisible:false,
				loading:true,
				params:{
					goodName:'',
					status:'',
					page_size:20,
					current_page:1
				},
				goodsForm:{
					wid:'',
					goodId:'',
					pieceNum:'',
					kgNum:'',
					axeNum:'',
					remark:''
				},
				dataList:[],
		        total:null,
			}
		},
		mounted() {
			this.getList();
		},
		 computed: {
		    // 计算属性的 getter
		    reversedNum: function (num) {
		    	if (num == '') num = 0;
		    	return num;
		    }
		},
		methods: {
			search(){
				this.params.current_page = 1;
				this.getList();
			},
			getList(){
				goods.list(this.params)
	            .then(response => {
	                this.dataList = response.data.results.list;
	                this.total = response.data.results.total;
	                this.loading = false;
	            })
			},
			editGood(id, i){
				this.dialogFormVisible = true;
				//this.goodsForm.goodId = id;
				for (var Key1 in this.goodsForm){
            		for (var Key2 in this.dataList[i]){
            			if (Key1 == Key2) this.goodsForm[Key1] = this.dataList[i][Key2]
            		}	
			    }
			},
			sureEditGood(){
				var myreg = /^\d+(?:.\d{1,2})?$/;
				var ref= /^[0-9]+.?[0-9]*$/;
				if (this.goodsForm.pieceNum!=='' && this.goodsForm.kgNum!=='' && this.goodsForm.axeNum!=='') {
				// 	if (!ref.test(this.goodsForm.pieceNum) || !ref.test(this.goodsForm.kgNum) || !ref.test(this.goodsForm.axeNum)) {
				// 		this.$message({
				// 			message: '请输入正确的数字',
				// 			type: 'warning'
				// 		});
				// 	}else if(!myreg.test(this.goodsForm.pieceNum) || !myreg.test(this.goodsForm.kgNum) || !myreg.test(this.goodsForm.axeNum)){
				// 		this.$message({
				// 			message: '小数点后只能输入两位小数',
				// 			type: 'warning'
				// 		});
				// 	}else{
						goods.editGoods(this.goodsForm)
			            .then(response => {
			                this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.getList();
							this.dialogFormVisible = false;
			            })
				// 	}
				}else{
					this.$message({
						message: '请输入正确的数字',
						type: 'warning'
					});
				}
				
			},
			//切换分页
			currentChange(val) {
				this.params.current_page = val;
				this.getList();
			},
		}
	}
</script>