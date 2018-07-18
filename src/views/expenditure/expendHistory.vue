<template>
	<div class="staff">
		<!-- 内容 -->
		<div class="content">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="form" label-width="70px" class="clearfix" style="margin-top:40px;">
				<div class="ub">
					<el-form-item label="收款人" class="ub-f1">
					    <el-input v-model="form.payeeName" placeholder="请输入收款人姓名" :maxlength="GLOBAL.maxlength"></el-input>
					</el-form-item>
					<el-form-item label="车次" class="ub-f1" >
					    <el-input v-model="form.trainsNum" placeholder="请输入车次"></el-input>
					</el-form-item>
					<el-form-item label="费用类型" class="ub-f1">
					    <el-select v-model="form.eid" placeholder="请选择费用类型" @change='getEid'>
							<el-option v-for="item in fylxList" :key="item.eid" :label="item.expendName" :value="item.expendName"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="ub">
					<el-form-item label="创建时间" class="selectData">
					    <el-date-picker
						 value-format="yyyy-MM-dd"
					      v-model="form.times"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</el-form-item>
					 <el-form-item label="支出金额">
						<el-input v-model="form.amount_min"  :maxlength="GLOBAL.maxNumber"></el-input>
					</el-form-item>
					<el-form-item label="-" label-width="30px">
						<el-input v-model="form.amount_max"  :maxlength="GLOBAL.maxNumber"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click="search">筛选</el-button>
			<!-- 货品列表 -->
			<el-table
				stripe
		      	:data="tableData"
		      	style="width: 100%"
		      	class="table-data-list">
				<el-table-column
			        type="index"
			        label="序号"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="payeeName"
			        label="收款人"
			        width="180">
					  <template slot-scope="scope">
                        <span>{{scope.row.payeeName}}</span>
                    </template>
			    </el-table-column>
			    <el-table-column
			        prop="expendName"
			        label="费用类型"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="tieName"
			        label="结算人">
			    </el-table-column>
			    <el-table-column
			        prop="expTime"
			        label="结算时间">
			    </el-table-column>
			    <el-table-column
			        prop="amount"
			        label="汇款金额">
			    </el-table-column>
			    <el-table-column
			        prop="remark"
			        label="备注">
					<template slot-scope="scope">
                        <span>{{scope.row.remark}}</span>
                    </template>
			    </el-table-column>

			    <!-- <el-table-column
			        label="修改">
			        <template slot-scope="scope">
			        	<el-button type="danger" plain size="mini" @click="changeMessage(scope.row.remark,scope.row.genId)">修改</el-button>
        			</template>
			    </el-table-column> -->
		    </el-table>	
			<!-- 修改操作 -->
			<!-- <el-dialog
				title="请填写新的备注信息"
				:visible.sync="dialogVisible"
				width="30%"
				:before-close="handleClose"
				>
				<p>{{oldMessage}}</p>
				<el-input v-model="newMessage" placeholder="备注信息"></el-input>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="getChange">确 定</el-button>
				</span>
			</el-dialog> -->

		    <el-pagination class="m-t-20" @current-change="currentChange" :current-page.sync="current_pages" background layout="total, prev, pager, next" :total="total">
			</el-pagination>
		</div>
	
	</div>

</template>

<script>
	import '@/style/system/system.scss';
	import { spending } from '@/services/apis/spendingType.api';
	export default {
		data() {
			return {
				dialogVisible:false,
				oldMessage:'',    //老的修改时展示的备注信息
				newMessage:'',    //修改之后的备注信息
				changeid:'',      //需要给接口传递的数据id
				getEidS:'',       //费用类型EID
				form:{
					trainsNum:'',
					payeeName:'',
					eid:'',
					amount_min:'',
					amount_max:'',
					times:[]
				},
				tableData: [],
				//费用类型
				fylxList: [],
				total:null,
				current_pages: 1
			}
		},
		mounted() {

		},
		created(){
			this.getlistdatd();
			this.getspending();
		},
		methods: {
			getspending(){
				// 获取费用类型
				spending.index().then(response => {
					this.fylxList = response.data.results.filter(function(item){
						return item.status == 'Y'})
	            })
			},
			getEid(){
			
				//获取下拉分类ID
				 for (var i = 0; i < this.fylxList.length; i++) {
                    if (this.form.eid == this.fylxList[i].expendName) {
						this.getEidS = this.fylxList[i].eid;
                    }
				}
				
			},
			currentChange(val) {
				
					this.current_pages = val;
					this.getlistdatd();
				},
			search(){
				this.current_pages = 1;
				this.getlistdatd();
			},
			getlistdatd(){
				if(this.form.times==null){
					var a,b = ''
				}
				else{
					a=this.form.times[0];
					b=this.form.times[1];
				}
				let params ={
					page_size:'10',
					current_page:this.current_pages,
					trainsNum:this.form.trainsNum,
					payeeName:this.form.payeeName,
					eid:this.getEidS,
					amount_min:this.form.amount_min,
					amount_max:this.form.amount_max,
					exp_time_start:a,
					exp_time_end:b 
				}
				spending.history(params).then(response => {
						
						this.tableData = response.data.results.list;
						this.total = response.data.results.total;
	            })
			},
			//修改暂时隐藏
			// changeMessage(message,id){
			// 	this.dialogVisible=true;
			// 	this.oldMessage=message;
			// 	this.changeid=id;
				
			// },
			// getChange(){
			// 	// 获取ID，新的修改信息，
			// 	alert(this.changeid)
			// 	alert(this.newMessage)
			// 	//调取接口之后要把 this.newMessage='' 还原
			// 	this.dialogVisible=false;
			// },
			

		}
		
	}
</script>