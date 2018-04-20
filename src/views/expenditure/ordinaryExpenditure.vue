<template>
	<div class="ordinaryExpenditure">
		<el-card class="box-card m-t-20 f-s-16 m-b-30">
			<el-form :model="expenditureInfo" label-width="90px">
				<el-form-item>
					<el-checkbox v-model="expenditureInfo.tfAdvances">该费用是否为货主垫付</el-checkbox>
				</el-form-item>
				<el-form-item label="费用类型">
					<el-select v-model="expenditureInfo.fylx" placeholder="请选择费用类型" @change='getEid'>
						<el-option v-for="item in fylxList" :key="item.eid" :label="item.expendName" :value="item.expendName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车次" >
					<el-input v-model="expenditureInfo.cc" placeholder="请选择车次"  suffix-icon="el-icon-arrow-down" @focus="showInput"></el-input>
				</el-form-item>
				<el-form-item label="支付方式">
					<el-select v-model="expenditureInfo.zffs" placeholder="请选择支付方式">
						<el-option v-for="item in zffsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="收款人电话">
					<el-input v-model="expenditureInfo.skrdh"></el-input>
				</el-form-item>
				<el-form-item label="收款人">
					<el-input v-model="expenditureInfo.skr"></el-input>
				</el-form-item>
				<div class="ub">
					<el-form-item label="金额">
						<el-input type="number" v-model="expenditureInfo.je"></el-input>
					</el-form-item>
					<div class="m-l-10 priceUnit">元</div>
				</div>
				<el-form-item label="结款人">
					<el-input v-model="expenditureInfo.jkr"></el-input>
				</el-form-item>
				<el-form-item label="收款账户">
					<el-input v-model="expenditureInfo.skzh"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="expenditureInfo.remark"></el-input>
				</el-form-item>
			</el-form>
			<div class="m-t-20 clearfix">
				<el-button type="success" class="floatRight settlement-btn" @click="getData">结算</el-button>
			</div>
		</el-card>

		<el-dialog title="车次信息" :visible.sync="dialogTableVisible">
		<el-table :data="gridData" highlight-current-row  @current-change="handleCurrentChange" ref="singleTable">
			<el-table-column property="trainsNum" label="车次" ></el-table-column>
			<el-table-column property="shipName" label="货主名称" width="200"></el-table-column>
			<el-table-column property="putStorageTime" label="入库时间"></el-table-column>
			<el-table-column property="tid" label="车次ID"></el-table-column>
		</el-table>
		 <!-- <div style="margin-top: 20px">
			<el-button @click="setCurrent()">取消选择</el-button>
			<el-button @click="SUREbTN">确定</el-button>
		</div> -->
		</el-dialog>
	</div>
</template>
<script>
	import '@/style/expenditure/ordinaryExpenditure.scss';
	import { PAY } from '@/services/apis/expenditure.api';
	import { spending } from '@/services/apis/spendingType.api';
	import {train} from '@/services/apis/train'
	export default {
		data() {
			return {
				gridData:[],
				dialogTableVisible: false,   //获取车次列表弹框
				getEidS:'',					 //类别ID
				trainsID:'',				 //车次ID
				expenditureInfo: {
					tfAdvances:true,
					fylx: "",
					cc: "",
					zzfs: "",
					skrdh: "",
					skr: "",
					je: "",
					jkr: "",
					skzh: "",
					remark:''
				},
				//费用类型
				fylxList: [],
				//车次
		
				//支付方式
				zffsList: [{
					id: "type_wechat",
					name: "微信"
				}, {
					id: "type_alipay",
					name: "支付宝"
				}, {
					id: "type_cash",
					name: "现金"
				}, {
					id: "type_card",
					name: "银行卡"
				}],
			}
		},
		created(){
			this.getspending();
		},
		methods:{
			// 点击横排的时候
			handleCurrentChange(row){
				this.trainsID = row.tid;
				this.expenditureInfo.cc = row.shipName;
				this.dialogTableVisible = false
			},
			// 取消选项
			// setCurrent(row){
			// 	this.$refs.singleTable.setCurrentRow(row);
			// },
			// //确定选项
			// SUREbTN(){
			// 	this.dialogTableVisible = false
			// },
			// 点击input显示弹框
			showInput(){
				this.gettrainList()
				this.dialogTableVisible = true
				
			},
			getEid(){
				//console.log(data)
				//获取下拉分类ID
				 for (var i = 0; i < this.fylxList.length; i++) {
                    if (this.expenditureInfo.fylx == this.fylxList[i].expendName) {
						this.getEidS = this.fylxList[i].eid;
                    }
				}
				
			},
			getData(){
				if(this.expenditureInfo.tfAdvances){
					var dian='Y';
				}
				else{
					var dian='N';
				}
				var params = {
					page_size:'20',
					current_page:'1',
					tfAdvances: dian,  //是否为垫付 
					eid:this.getEidS,									     //费用类型
					tid:this.trainsID,       							     //车次ID  若为垫付，则车次为必填
					expendType:this.expenditureInfo.zffs,        //支付类型
					payeePhone:this.expenditureInfo.skrdh,       //收款人电话
					payeeName:this.expenditureInfo.skr,          //收款人
					amount:this.expenditureInfo.je,        	     //金额
					tieName:this.expenditureInfo.jkr,            //结款人 页面默认填充当前登录用户名称，可手动更改
					payeeAccount:this.expenditureInfo.skzh,   //收款账户
					remark:this.expenditureInfo.remark
				};
				PAY.index(params).then(response => {
	              
	                //this.dataResults = response.data.results
	            })

			},
			getspending(){
				// 获取费用类型
				spending.index().then(response => {
					this.fylxList = response.data.results.filter(function(item){
						return item.status == 'Y'})
	                	//this.fylxList = response.data.results;
	            })
			},
			gettrainList(){
				// 获取车次信息
				train.list().then(response => {
						console.log(response.data.results)
	                	this.gridData = response.data.results.list;
	            })
			}
		},
		
	}
</script>