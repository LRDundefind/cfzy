<template>
	<div class="goodsType">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>货品分类</label>
		<el-button type="primary" class="floatRight" size="small" @click="dialogFormVisible = true;buttonLoading = false;">新增分类</el-button>
		<!-- 内容 -->
		<div class="content m-t-10 p-20" v-loading="loading">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="form" label-width="70px" class="clearfix">
				<div class="ub">
					<el-form-item label="货品名称" >
					    <el-input v-model="goodsParams.goodName" placeholder="请输入货品名称"></el-input>
					</el-form-item>
					<el-form-item label="货品状态" class="m-l-20">
					    <el-select v-model="goodsParams.status" placeholder="请选择货品状态">
					      <el-option label="全部" value=""></el-option>
					      <el-option label="上架" value="Y"></el-option>
					      <el-option label="下架" value="N"></el-option>
					    </el-select>
					</el-form-item>
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click="getGoodsList">筛选</el-button>
			<!-- 货品列表 -->
			<el-table
				stripe
		      	:data="dataList"
		      	style="width: 100%"
		      	class="table-data-list">
			    <el-table-column
			        type="index"
			        label="序号"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="goodName"
			        label="货品名称"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="slushing"
			        label="减水重（斤）">
			    </el-table-column>
			    <el-table-column
			        prop="packCoef"
			        label="包装费（元/每件）"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="commission"
			        label="提成"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="rebates"
			        label="回扣">
			    </el-table-column>
			    <el-table-column
			        prop="sellUnit"
			        label="售卖单位">
			        <template slot-scope="scope">
					{{scope.row.sellUnit | sellNnit}}
			        </template>
			    </el-table-column>
			    <el-table-column
			        prop="createTime"
			        label="创建时间">
			    </el-table-column>
			    <el-table-column
			        prop="remark"
			        label="备注">
			    </el-table-column>
			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">
			        	<el-button type="primary" plain size="mini" @click='editGoods(scope.row.goodId,scope.$index)'>编辑</el-button>
			        	
        			</template>
			    </el-table-column>
		    </el-table>	
		    <el-pagination
			  background
			  layout="total, prev, pager, next"
			  :total="total"
			  :page-size="goodsParams.page_size"
			  @current-change="currentChange">
			</el-pagination>
		</div>
		<el-dialog title="编辑货品" :visible.sync="dialogGoodsFormVisible" width="800px">
			<el-form :model="goodsForm">
				<el-row>
					<el-col :span="12">
						<div class="grid-content"> 
							<label for="">售卖单位</label>
							<el-select v-model="goodsForm.sellUnit" placeholder="请选择售卖单位" style="width: 200px">
						      <el-option label="元/件" value="unit_pie"></el-option>
						      <el-option label="元/斤" value="unit_jin"></el-option>
						      <el-option label="元/公斤" value="unit_kg"></el-option>
						    </el-select>
						</div>
					</el-col> 
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">减水重（斤/每件）</label>
							<el-input placeholder="输入数量" type='number' v-model="goodsForm.slushing" style="width: 200px"></el-input>
							
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<label for="">提成</label>
							<el-input placeholder="输入数量" type='number' v-model="goodsForm.commission" style="width: 200px">
								<template slot="append">元/{{goodsForm.sellUnit | sellNnit}}</template>
							</el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<label for="">包装费</label>
							<el-input placeholder="输入数量" type='number' v-model="goodsForm.packCoef" style="width: 200px">
								<template slot="append">元/{{goodsForm.sellUnit | sellNnit}}</template>
							</el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content"> 
							<label for="">回扣</label>
							<el-input placeholder="输入数量" type='number' v-model="goodsForm.rebates" style="width: 200px">
								<template slot="append">元/{{goodsForm.sellUnit | sellNnit}}</template>
							</el-input>
						</div>
					</el-col> 
					
				</el-row> 		
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogGoodsFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="sureEditGood" size='small'>确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="800px">
			<el-form :model="form">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">类型名称：</label>
							<el-input v-model="form.goodName" placeholder="请输入类型名称" style="width: 200px"></el-input>
							
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">减水重（斤/每件）</label>
							<el-input placeholder="输入数量" type='number' v-model="form.slushing" style="width: 200px"></el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content"> 
							<label for="">售卖单位</label>
							<el-select v-model="form.sellUnit" placeholder="请选择售卖单位" style="width: 200px">
						      <el-option label="元/件" value="unit_pie"></el-option>
						      <el-option label="元/斤" value="unit_jin"></el-option>
						      <el-option label="元/公斤" value="unit_kg"></el-option>
						    </el-select>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<label for="">提成</label>
							<el-input placeholder="输入数量" type='number' v-model="form.commission" style="width: 200px">
								<template slot="append">元/{{form.sellUnit | sellNnit}}</template>
							</el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<label for="">包装费</label>
							<el-input placeholder="输入数量" type='number' v-model="form.packCoef" style="width: 200px">
								<template slot="append">元/{{form.sellUnit | sellNnit}}</template>
							</el-input>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content"> 
							<label for="">回扣</label>
							<el-input placeholder="输入数量" type='number' v-model="form.rebates" style="width: 200px">
								<template slot="append">元/{{form.sellUnit | sellNnit}}</template>
							</el-input>
						</div>
					</el-col> 
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.remark"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			   
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="addGoods" size='small' :loading="buttonLoading">确 定</el-button>
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
				dialogGoodsFormVisible:false,
				dialogFormVisible:false,
				form:{
					target_gid:this.$route.params.gid,
					goodName:'',
					remark:'',
					commission:'',
					rebates:'',
					slushing:'',
					sellUnit:'unit_jin',
					slushingUnit:'unit_jin',
					packCoef:'',
				},
				dataList: [],
				goodsParams:{
					target_gid:this.$route.params.gid,
					page_size:20,
					current_page:1,
					goodName:'',
					status:''
				},
		        goodsForm:{
		        	sellUnit:'unit_jin',
		        	slushingUnit:'unit_jin'
		        },
		        total:null
			}
		},
		mounted() {
			this.getGoodsList();
		},
		methods: {
			validate(params){
				let count = 0;
				let l = 0;
				Object.keys(params).forEach(key=>{
					l ++
				    if(params[key]){
				    	count ++;
				    	return count;
				    }
				});
				if(count == l) return true
			},
			editGoods(id,i){
				this.dialogGoodsFormVisible = true;
				this.dialogGoodsFormVisible = true;
				this.goodsForm.goodId = id;
				this.goodsForm.sellUnit = this.dataList[i].sellUnit;
				this.goodsForm.slushing = this.dataList[i].slushing;
				this.goodsForm.commission = this.dataList[i].commission;
				this.goodsForm.rebates = this.dataList[i].rebates;
				this.goodsForm.packCoef = this.dataList[i].packCoef;				
			},
			sureEditGood(){
				if (this.validate(this.goodsForm)) {
					record.editGoods(this.goodsForm)
	                .then(response => {
	                    this.getGoodsList();
	                    this.$message({
				          message: '修改成功',
				          type: 'success'
				        });
	                })
	                this.dialogGoodsFormVisible = false;
				}else{
					this.$message({
			          message: '请填写所有货品信息',
			          type: 'warning'
			        });
				}
			},
			getGoodsList(){
                record.goodsList(this.goodsParams)
                .then(response => {
                    this.dataList = response.data.results.list;
                    this.total = response.data.results.total;
                    this.loading = false;
                })
			},
			//切换分页
			currentChange(val) {
				this.goodsParams.current_page = val;
				this.getGoodsList();
			},
			//添加货品
			addGoods(){
				if (this.validate(this.form)) {
					this.buttonLoading = true;
					record.addGoods(this.form)
	                .then(response => {
	                    this.getGoodsList();
	                    this.$message({
				          message: '添加成功',
				          type: 'success'
				        });
	                })
	                this.dialogFormVisible = false
				}else{
					this.$message({
			          message: '请填写所有货品信息',
			          type: 'warning'
			        });
				}
				
			}
		}
	}
</script>