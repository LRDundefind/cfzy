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
					<!-- <el-form-item label="货品状态" class="m-l-20">
					    <el-select v-model="goodsParams.status" placeholder="请选择货品状态">
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
			        label="减水重"
			        width="180">
                    <template slot-scope="scope">
                        {{scope.row.slushing}}（{{scope.row.slushingUnit | slushingWeight}}）
                    </template>
			    </el-table-column>
			    <el-table-column
			        label="包装费"
			        width="180">
			        <template slot-scope="scope">
					{{scope.row.packCoef}}（元/{{scope.row.packCoefUnit | sellNnit}}）
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="提成"
			        width="180">
			        <template slot-scope="scope">
					{{scope.row.commission}}（元/{{scope.row.commissionUnit | sellNnit}}）
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="回扣"
			        width="180">
			        <template slot-scope="scope">
					{{scope.row.rebates}}（元/{{scope.row.rebatesUnit | sellNnit}}）
			        </template>
			    </el-table-column>
			    <el-table-column
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
			        label="备注">
			        <template slot-scope="scope">
						<div class="line-ellipsis-1" :title="scope.row.remark">{{scope.row.remark}}</div>
			        </template>
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
			  :current-page.sync="goodsParams.current_page"
			  @current-change="currentChange">
			</el-pagination>
		</div>
		<el-dialog title="编辑货品" :visible.sync="dialogGoodsFormVisible" width="800px">
			<el-form ref="ruleFormEdit" :model="goodsForm" :rules="rules" label-width="100px">
				<el-row>
					<el-col :span="12">
						<div class="grid-content"> 
							<el-form-item label="售卖单位">
							<el-select v-model="goodsForm.sellUnit" placeholder="请选择售卖单位" style="width: 200px">
						      <el-option label="件" value="unit_pie"></el-option>
						      <el-option label="斤" value="unit_jin"></el-option>
						      <el-option label="公斤" value="unit_kg"></el-option>
						    </el-select>
						    </el-form-item>
						</div>
					</el-col> 
				  	<el-col :span="12">
				  		<div class="grid-content">
							<!--<el-form-item label="减水重" prop="slushing">-->
							<!--<el-input placeholder="输入减水重" v-model.trim="goodsForm.slushing" style="width: 200px">-->
								<!--<template slot="append">斤/每件</template>-->
							<!--</el-input>-->
							<!--</el-form-item>-->

                            <el-form-item label="减水重" prop="slushing">
                                <el-input placeholder="输入金额" v-model.trim="goodsForm.slushing" style="width: 200px">
                                    <el-select v-model="goodsForm.slushingUnit" slot="append" placeholder="请选择" style="width: 96px">
                                        <el-option label="斤/件" value="unit_jin"></el-option>
                                        <el-option label="公斤/件" value="unit_kg"></el-option>
                                    </el-select>
                                    <!-- <template slot="append">元/{{goodsForm.commissionUnit | sellNnit}}</template> -->
                                </el-input>
                            </el-form-item>

							
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<el-form-item label="提成" prop="commission">
							<el-input placeholder="输入金额" v-model.trim="goodsForm.commission" style="width: 200px">
								<el-select v-model="goodsForm.commissionUnit" slot="append" placeholder="请选择" style="width: 96px">
							      <el-option label="元/件" value="unit_pie"></el-option>
							      <el-option label="元/斤" value="unit_jin"></el-option>
							      <el-option label="元/公斤" value="unit_kg"></el-option>
							    </el-select>
								<!-- <template slot="append">元/{{goodsForm.commissionUnit | sellNnit}}</template> -->
							</el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<el-form-item label="包装费" prop="packCoef">
							<el-input placeholder="输入金额" v-model.trim="goodsForm.packCoef" style="width: 200px">
								<el-select v-model="goodsForm.packCoefUnit" slot="append" placeholder="请选择" style="width: 96px">
							      <el-option label="元/件" value="unit_pie"></el-option>
							      <el-option label="元/斤" value="unit_jin"></el-option>
							      <el-option label="元/公斤" value="unit_kg"></el-option>
							    </el-select>
								<!-- <template slot="append">元/{{goodsForm.packCoefUnit | sellNnit}}</template> -->
							</el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content"> 
							<el-form-item label="回扣" prop="rebates">
							<el-input placeholder="输入金额" v-model.trim="goodsForm.rebates" style="width: 200px">
								<el-select v-model="goodsForm.rebatesUnit" slot="append" placeholder="请选择" style="width: 96px">
							      <el-option label="元/件" value="unit_pie"></el-option>
							      <el-option label="元/斤" value="unit_jin"></el-option>
							      <el-option label="元/公斤" value="unit_kg"></el-option>
							    </el-select>
								<!-- <template slot="append">元/{{goodsForm.rebatesUnit | sellNnit}}</template> -->
							</el-input>
							</el-form-item>
						</div>
					</el-col> 
					<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft textRight" style="width: 88px;padding-right: 12px;">备注</label>
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="goodsForm.remark" :maxlength="GLOBAL.maxTextare"></el-input>
				  		</div>
				  	</el-col>
				</el-row> 		
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogGoodsFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="sureEditGood" size='small'>确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="800px" :before-close="dialogBeforeClose" @close="defaultData(form)">
			<el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<el-form-item label="类型名称" prop="goodName">
							<el-input v-model.trim="form.goodName" :maxlength="GLOBAL.maxlength" placeholder="请输入类型名称" style="width: 200px"></el-input>
							</el-form-item>
							
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<!--<el-form-item label="减水重" prop="slushing">-->
							<!--<el-input placeholder="输入减水重" v-model.trim="form.slushing" style="width: 200px">-->
								<!--<template slot="append">斤/每件</template>-->
							<!--</el-input>-->
							<!--</el-form-item>-->
                            <el-form-item label="减水重" prop="slushing">
                                <el-input placeholder="输入金额" v-model.trim="form.slushing" style="width: 200px">
                                    <el-select v-model="form.slushingUnit" slot="append" placeholder="请选择" style="width: 96px">
                                        <el-option label="斤/件" value="unit_jin"></el-option>
                                        <el-option label="公斤/件" value="unit_kg"></el-option>
                                    </el-select>
                                    <!-- <template slot="append">元/{{form.sellUnit | sellNnit}}</template> -->
                                </el-input>
                            </el-form-item>

						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content"> 
							<el-form-item label="售卖单位">
							<el-select v-model="form.sellUnit" placeholder="请选择售卖单位" style="width: 200px">
						      <el-option label="件" value="unit_pie"></el-option>
						      <el-option label="斤" value="unit_jin"></el-option>
						      <el-option label="公斤" value="unit_kg"></el-option>
						    </el-select>
						    </el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<el-form-item label="提成" prop="commission">
							<el-input placeholder="输入金额" v-model.trim="form.commission" style="width: 200px">
								<el-select v-model="form.commissionUnit" slot="append" placeholder="请选择" style="width: 96px">
							      <el-option label="元/件" value="unit_pie"></el-option>
							      <el-option label="元/斤" value="unit_jin"></el-option>
							      <el-option label="元/公斤" value="unit_kg"></el-option>
							    </el-select>
								<!-- <template slot="append">元/{{form.sellUnit | sellNnit}}</template> -->
							</el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content">
							<el-form-item label="包装费" prop="packCoef">
							<el-input placeholder="输入金额" v-model.trim="form.packCoef" style="width: 200px">
								<el-select v-model="form.packCoefUnit" slot="append" placeholder="请选择" style="width: 96px">
							      <el-option label="元/件" value="unit_pie"></el-option>
							      <el-option label="元/斤" value="unit_jin"></el-option>
							      <el-option label="元/公斤" value="unit_kg"></el-option>
							    </el-select>
								<!-- <template slot="append">元/{{form.sellUnit | sellNnit}}</template> -->
							</el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content"> 
							<el-form-item label="回扣" prop="rebates">
							<el-input placeholder="输入金额" v-model.trim="form.rebates" style="width: 200px">
								<el-select v-model="form.rebatesUnit" slot="append" placeholder="请选择" style="width: 96px">
							      <el-option label="元/件" value="unit_pie"></el-option>
							      <el-option label="元/斤" value="unit_jin"></el-option>
							      <el-option label="元/公斤" value="unit_kg"></el-option>
							    </el-select>
								<!-- <template slot="append">元/{{form.sellUnit | sellNnit}}</template> -->
							</el-input>
							</el-form-item>
						</div>
					</el-col> 
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft textRight" style="width: 88px;padding-right: 12px;">备注</label>
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.remark" :maxlength="GLOBAL.maxTextare"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="cancel" size='small'>取 消</el-button>
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
				//defaultForm:{},  //保存原始数据
				form:{
					target_gid:this.$route.params.gid,
					goodName:'',
					remark:'',
					commission:'',
					commissionUnit:'unit_jin',
					rebates:'',
					rebatesUnit:'unit_jin',
					slushing:'',
					sellUnit:'unit_jin',
					slushingUnit:'unit_jin',
					packCoef:'',
					packCoefUnit:'unit_jin',
				},
				dataList: [],
				goodsParams:{
					target_gid:this.$route.params.gid,
					page_size:10,
					current_page:1,
					goodName:'',
					status:''
				},
		        goodsForm:{
		        	sellUnit:'unit_jin',//售卖单位
		        	commissionUnit:'',//提成单位
		        	rebatesUnit:'',//回扣单位
		        	packCoefUnit:'',//包装费单位
                    slushingUnit:'',//减水重单位
		        },
		        total:null,
		        rules: {
			        goodName: [
			            { required: true, message: '请输入类型名称', trigger: 'blur' },
			        ],
			        slushing:[
			        	{required: true, message: '请输入减水重', trigger: 'blur'},
			        	{validator:this.GLOBAL.checkNumber , trigger:'blur'}
			        ],
			        commission:[
			        	{required: true, message: '请输入提成', trigger: 'blur'},
			        	{validator:this.GLOBAL.checkNumber , trigger:'blur'}
			        ],
			        packCoef:[
			        	{required: true, message: '请输入包装费', trigger: 'blur'},
			        	{validator:this.GLOBAL.checkNumber , trigger:'blur'}
			        ],
			        rebates:[
			        	{required: true, message: '请输入回扣', trigger: 'blur'},
			        	{validator:this.GLOBAL.checkNumber , trigger:'blur'}
			        ],
		        }
			}
		},
		created(){
			//this.defaultForm = JSON.parse(JSON.stringify(this.form));
		},
		mounted() {
			this.getGoodsList();
		},
		methods: {
			/**
			 * 点击编辑货品弹出框
			 * @param  {[type]} id [货品id]
			 * @param  {[type]} i  [货品索引]
			 * @return {[type]}    [description]
			 */
			editGoods(id,i){
				this.dialogGoodsFormVisible = true;
				this.dialogGoodsFormVisible = true;
				this.goodsForm.goodId = id;
				this.goodsForm.sellUnit = this.dataList[i].sellUnit;
				this.goodsForm.slushing = this.dataList[i].slushing.toString();
                this.goodsForm.slushingUnit = this.dataList[i].slushingUnit;

                this.goodsForm.commission = this.dataList[i].commission.toString();
				this.goodsForm.commissionUnit = this.dataList[i].commissionUnit;
				this.goodsForm.rebates = this.dataList[i].rebates.toString();
				this.goodsForm.rebatesUnit = this.dataList[i].rebatesUnit;
				this.goodsForm.packCoef = this.dataList[i].packCoef.toString();	
				this.goodsForm.packCoefUnit = this.dataList[i].packCoefUnit;
				this.goodsForm.remark = this.dataList[i].remark;			
			},
			/**
			 * 确定添加
			 * @return {[type]} [description]
			 */
			sureEditGood(){
				this.$refs.ruleFormEdit.validate((valid) => {
					if (valid) {
						record.editGoods(this.goodsForm)
		                .then(response => {
		                    this.getGoodsList();
		                    this.$message({
					          message: '修改成功',
					          type: 'success'
					        });
		                })
		                this.dialogGoodsFormVisible = false;
					}
				})
			},
			search(){
				this.goodsParams.current_page = 1;
				this.getGoodsList();
			},
			getGoodsList(){
                record.goodsList(this.goodsParams)
                .then(response => {
                    this.dataList = response.data.results.list;
                    this.total = response.data.results.total;
                    this.loading = false;
                })
			},
			/**
			 * 切换分页
			 * @param  {[type]} val [当前页码]
			 * @return {[type]}     [description]
			 */
			currentChange(val) {
				this.goodsParams.current_page = val;
				this.getGoodsList();
			},
			//添加货品
			addGoods(){
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.buttonLoading = true;
						record.addGoods(this.form)
		                .then(response => {
		                    this.getGoodsList();
		                    this.$message({
					          message: '添加成功',
					          type: 'success'
					        });
					 		this.defaultData(this.form);
					 		this.dialogFormVisible = false;
		                }) 
					}

				})
				// if (this.validate(this.form)) {
					 
				// }else{
				// 	this.$message({
			 //          message: '请填写所有货品信息',
			 //          type: 'warning'
			 //        });
				// }
				
			},
			dialogBeforeClose(done){
				this.defaultData(this.form);
				done();
			},
			cancel(){
				this.dialogFormVisible =false;
				this.defaultData(this.form);
			},
			//恢复默认数据
			defaultData(form){
				this.$refs.ruleForm.resetFields();
				form.target_gid=this.$route.params.gid;
				form.goodName='';
				form.remark='';
				form.commission='';
				form.rebates='';
				form.slushing='';
				form.sellUnit='unit_jin';
				form.slushingUnit='unit_jin';
				form.packCoef='';
			}
		}
	}
</script>