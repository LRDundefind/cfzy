<template>
	<div class="ordinaryExpenditure">
		<el-card class="box-card m-t-20 f-s-16 m-b-30">
			<el-form :model="expenditureInfo" label-width="90px">
				<el-form-item label="货主">
						<el-input v-model="expenditureInfo.fylx" placeholder="请选择货主"  suffix-icon="el-icon-arrow-down" @focus="showInput"></el-input>
				</el-form-item>
				<el-form-item label="待结算总额">
					<el-input v-model="expenditureInfo.jine" :disabled="true"></el-input>
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
						<el-input v-model="expenditureInfo.je"></el-input>
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
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="expenditureInfo.remark" placeholder="不超过80字"></el-input>
				</el-form-item>
			</el-form>
			<div class="m-t-20 clearfix">
				<el-button type="success" class="floatRight settlement-btn" @click="getData">结算</el-button>
			</div>
		</el-card>


			<el-dialog title="货主信息" :visible.sync="dialogTableVisible">
				<el-table :data="gridData" highlight-current-row  @current-change="handleCurrentChange" ref="singleTable">
					<el-table-column property="shipName" label="货主名称" ></el-table-column>
					<el-table-column property="notPayAmount" label="待汇款金额" width="200"></el-table-column>
					<el-table-column property="phone" label="货主电话"></el-table-column>
					<el-table-column property="sid" label="货主ID"></el-table-column>
				</el-table>
			</el-dialog>
	
	</div>
</template>
<style scoped>

</style>

<script>
	import '@/style/expenditure/ordinaryExpenditure.scss';
	import { owner } from '@/services/apis/owner';
	import { PAY } from '@/services/apis/expenditure.api';
	export default {
		data() {
				return {
					gridData:[],
					dialogTableVisible: false,   //获取货主列表弹框
					ownerID:'',				 //货主ID
					expenditureInfo: {
						fylx: "",
						zzfs: "",
						skrdh: "",
						skr: "",
						je: "",
						jkr: "",
						skzh: "",
						jine:''
					},
					//费用类型
					fylxList: [],
					//车次
					ccList: [],
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
			methods:{
				getData(){
				var params = {
					sid:this.ownerID,       					 //货主ID  
					expendType:this.expenditureInfo.zffs,        //支付类型
					payeePhone:this.expenditureInfo.skrdh,       //收款人电话
					payeeName:this.expenditureInfo.skr,          //收款人
					amount:this.expenditureInfo.je,        	     //金额
					tieName:this.expenditureInfo.jkr,            //结款人 页面默认填充当前登录用户名称，可手动更改
					payeeAccount:this.expenditureInfo.skzh,   //收款账户
					remark:this.expenditureInfo.remark
				};
				PAY.Huozhu(params).then(response => {
	              
	                //this.dataResults = response.data.results
	            })

			},
				// 点击横排的时候
				handleCurrentChange(row){
					this.ownerID = row.sid;
					this.expenditureInfo.fylx = row.shipName;
					this.expenditureInfo.jine = row.notPayAmount;
					this.dialogTableVisible = false
				},
				showInput(){
					this.gettrainList()
					this.dialogTableVisible = true
				},
				gettrainList(){
					// 获取车次信息
					owner.list().then(response => {
							this.gridData = response.data.results.list;
					})
				}
			}
	}
</script>