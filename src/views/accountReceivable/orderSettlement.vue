<template>
	<div class="orderSettlement f-s-14 c-3">
		<div class="ub ub-ac">
			<el-button @click="goBack()" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
			<div class="m-l-20">现结收账/订单结算</div>
		</div>
		<el-card class="box-card m-t-20 f-s-16 m-b-30">
			<div slot="header" class="clearfix">
				<span>客户信息</span>
			</div>
			<div class="ub">
				<div class="labelName">客户姓名：</div>
				<div class="c-6">{{customerName}}</div>
			</div>
			<div class="ub m-t-20">
				<div class="labelName">货品费用：</div>
				<div class="c-6">{{cost.salesAmount}}</div>
			</div>
			<div class="ub m-t-20">
				<div class="labelName">包装费：</div>
				<div class="c-6">{{cost.packCost}}</div>
			</div>
			<div class="ub m-t-20">
				<div class="labelName">三轮车费：</div>
				<div class="c-6">{{cost.deliveryCost}}</div>
			</div>
			<div class="ub m-t-20">
				<div class="labelName">过磅费：</div>
				<div class="c-6">{{cost.salesAmount}}</div>
			</div>
			<div class="ub m-t-20">
				<div class="labelName">应付总金额：</div>
				<div class="c-6">{{cost.weighCost}}</div>
			</div>
			<div class="ub m-t-20">
				<div class="labelName payType">支付方式：</div>
				<el-select v-model="params.payType" placeholder="请选择">
					<el-option v-for="item in keyValueData.pay_type" :key="item.key" :label="item.value" :value="item.key">
					</el-option>
				</el-select>
			</div>
		</el-card>
		<div class="ub ub-pe">
			<el-button @click="settlement()" class="settlement-btn" type="success">结算</el-button>
		</div>
	</div>
</template>

<script>
	import '@/style/accountReceivable/orderSettlement.scss';
	import { account } from '@/services/apis/account';
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
				return {
					params:{
						oid:this.$route.params.temporaryUser,
						payType:''
					},
					customerName:'',
					cost:{},
					keyValueData :"",
				}
			},
			methods: {
				//获取信息
				getInfo(){
					var params = {
                    	oid:this.$route.params.temporaryUser
	                }
					account.info(params)
	                .then(response => {
	                	this.customerName = response.data.results.customer_info.nickname
	                	this.cost = response.data.results.order_info;
	                });
	            },
				//结算
				settlement() {
					if (this.params.payType) {
						account.knotclear(this.params)
		                .then(response => {
		                    this.$router.push({
								name: 'order/orderSettlementSheet',
								params:{
									oid: this.$route.params.temporaryUser,
								}
							})
		                })
					}else{
						this.$message({
				          message: '请选择支付方式',
				          type: 'warning'
				        });
					}
				},
				//返回
				goBack() {
					this.$router.go(-1);
				}
			},
			mounted() {
				this.getInfo();
				//console.log(this.$route.params.data);
				//获取键值
				keyValue()
	            .then(response => {
	                this.keyValueData = response.data.results
	            })
			},
			watch: {
				// 如果路由有变化，会再次执行该方法
				'$route' (to, from) {
					//console.log(from)
				}
			},
	}
</script>