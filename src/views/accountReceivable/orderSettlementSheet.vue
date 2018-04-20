<template>
	<div class="orderSettlementSheet f-s-14 c-3">
		<div class="ub ub-ac">
			<el-button @click="goBack()" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
			<div class="m-l-20">现结收账/订单结算单</div>
		</div>
		<div id="print" class="ub ub-pc m-t-20">
			<div id="orderSettlementSheet-print" v-bind:style="printStyle" class="b-c-f printLayout p-30">
				<div class="textCenter f-s-28">{{gearName}}</div>
				<div class="textCenter">{{markName}}</div>
				<div class="ub m-t-10">
					<div class="ub-f1">购货人：{{listData.customer_info.nickname}}</div>
					<div>电话：{{listData.customer_info.phone}}</div>
				</div>
				<div class="m-t-10">购货地址：{{listData.customer_info.address}}</div>
				<div class="ub m-t-10">
					<div class="ub-f1">车次：{{listData.order_info.orderNo}}</div>
					<div>结算时间：{{listData.order_info.settleTime}}</div>
				</div>
				<el-table :data="listData.order_info.goods" class="m-t-30">
					<el-table-column prop="goodName" label="货品类别">
					</el-table-column>
					<el-table-column align="center" prop="price" label="单价">
					</el-table-column>
					<el-table-column align="center" prop="good_quantity" label="数量">
					</el-table-column>
					<el-table-column align="center" prop="packCost" label="包装费">
					</el-table-column>
					<el-table-column align="center" prop="goodAmount" label="小计">
					</el-table-column>
				</el-table>
				<div class="ub p-t-20" style="border-top: 1px solid #ebeef5;">
					<div class="ub-f1">过磅费：{{listData.order_info.weighCost}}</div>
					<div class="ub-f1 textCenter">三轮车费：{{listData.order_info.deliveryCost}}</div>
					<div class="ub-f1 textRight">包装费：{{listData.order_info.packCost}}</div>
				</div>
				<div class="ub m-t-20">
					<div class="ub-f1">&nbsp;</div>
					<div class="ub-f1 textCenter">应付金额：{{listData.order_info.salesAmount}}</div>
					<div class="ub-f1 textRight">实付金额：{{listData.order_info.salesAmount}}</div>
				</div>
				<div style="border-top: 1px solid #ebeef5;" class="m-t-20 p-t-10">销货单位：{{listData.company_info.compayName}}</div>
				<div class="m-t-15">地址：{{listData.company_info.address}}</div>
				<div class="m-t-15">电话：{{listData.company_info.phone}}</div>
			</div>
		</div>
		<el-button @click="onClickPrint()" class="settlement-btn print-btn" type="success">打印</el-button>
	</div>
</template>

<script>
	import '@/style/accountReceivable/orderSettlementSheet.scss';
	import { account } from '@/services/apis/account';
	export default {
		data() {
				return {
					gearName: JSON.parse(window.localStorage.getItem('gid'))[0].gearName,
					markName: JSON.parse(window.localStorage.getItem('gid'))[0].markName,
					printStyle: {
						//					width: 0
					},
					listData:{
						customer_info:{},
						order_info:{},
						company_info:{}
					},
				}
			},
			methods: {
				//打印
				onClickPrint() {
					var bdhtml = window.document.body.innerHTML;//获取当前页的html代码   
			        var prnhtml = document.getElementById('print').innerHTML; 
			        window.document.body.innerHTML = prnhtml;  
			        window.print();  
			        window.document.body.innerHTML = bdhtml;
			        window.location.reload();
				},
				//获取结算单信息
				getData(){
					account.doc({oid:this.$route.params.oid})
	                .then(response => {
	                    this.listData = response.data.results;
		            })
				},
				//返回
				goBack() {
					this.$router.go(-1);
				}
			},
			mounted() {
				this.getData();
			}
	}
</script>