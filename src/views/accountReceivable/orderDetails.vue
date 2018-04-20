<template>
	<div class="orderDetails f-s-14 c-3" v-loading="loading">
		<div class="ub ub-ac">
			<el-button @click="goBack()" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
			<div class="m-l-20">现结收账/订单详情</div>
		</div>
		<!--买手信息-->
		<el-card class="box-card m-t-20">
			<div slot="header" class="clearfix">
				<span>买手信息</span>
			</div>
			<div class="infoLayout ub ub-ac">
				<div class="icon"></div>
				<div class="info c-6 ub-f1 m-l-40">
					<div class="ub">
						<div class="ub-f1 ub">
							<div class="key">姓名</div>
							<div class="m-l-30 line-ellipsis-1">{{dataInfo.customer_info.nickname}}</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">企业名称</div>
							<div class="m-l-30 line-ellipsis-1">{{dataInfo.customer_info.company}}</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">身份证号</div>
							<div class="m-l-30 line-ellipsis-1">{{dataInfo.customer_info.idCard}}</div>
						</div>
					</div>
					<div class="ub m-t-10">
						<div class="ub-f1 ub">
							<div class="key">地址</div>
							<div class="m-l-30 line-ellipsis-1">{{dataInfo.customer_info.address}}</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">手机号</div>
							<div class="m-l-30 line-ellipsis-1">{{dataInfo.customer_info.phone}}</div>
						</div>
						<div class="ub-f1"></div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card class="box-card m-t-20">
			<div slot="header" class="clearfix">
				<span>下单信息</span>
			</div>
			<div class="infoLayout c-6">
				<div class="ub info">
					<div class="ub-f1 ub">
						<div class="key">订单编号</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.orderNo}}</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">订单金额</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.salesAmount}}</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">卖手姓名</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.selName}}</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">结算方式</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.payType}}</div>
					</div>
				</div>
				<div class="ub m-t-10 info">
					<div class="ub-f1 ub">
						<div class="key">货主</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.shipName}}</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">车次</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.trainsNum}}</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">下单时间</div>
						<div class="m-l-30 line-ellipsis-1">{{dataInfo.order_info.placeOrderTime}}</div>
					</div>
					<div class="ub-f1"></div>
				</div>
				<div class="remarks m-t-10 ub">
					<div class="key ub ub-ac">
						<div>订单备注</div>
					</div>
					<div class="m-l-30 content ub-f1">
						<div class="">{{dataInfo.order_info.remark}}</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card class="box-card m-t-20">
			<div slot="header" class="clearfix">
				<span>货品信息</span>
			</div>
			<el-table :data="dataInfo.goods" stripe>
				<el-table-column prop="goodName" label="货品名称">
				</el-table-column>
				<el-table-column prop="price" label="货品单价">
					<template slot-scope="scope">
						{{scope.row.price | format}}
					</template>
				</el-table-column>
				<el-table-column prop="goodNum" label="货品数量">
				</el-table-column>
				<el-table-column prop="weight" label="重量">
				</el-table-column>
				<el-table-column prop="goodAmount" label="金额">
				</el-table-column>
				<el-table-column align="center" prop="packCost" label="包装">
				</el-table-column>
			</el-table>
		</el-card>
		<el-card class="box-card m-t-20">
			<div class="infoLayout clearfix">
				<div class="moneyInfo c-6 ub">
					<div class="key">包装费</div>
					<div class="m-l-10 line-ellipsis-1">{{dataInfo.order_info.packCost}}元</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">过磅费</div>
					<div class="m-l-10 line-ellipsis-1">{{dataInfo.order_info.weighCost}}元</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">三轮费</div>
					<div class="m-l-10 line-ellipsis-1">{{dataInfo.order_info.deliveryCost}}元</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">车号</div>
					<div class="m-l-10 line-ellipsis-1">{{dataInfo.order_info.tricycleNo }}</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">状态</div>
					<div class="m-l-10 line-ellipsis-1 type">{{dataInfo.order_info.status}}</div>
				</div>
			</div>
		</el-card>
		<div class="ub m-t-30">
			<div class="ub customerSignature" v-if="orderType == 'order_credit'">
				<div>客户签字：</div>
				<div class="m-l-10 img"></div>
			</div>
			<div class="ub-f1 ub ub-pe c-3 ub-ae">
				<div>总计应收：<span class="f-s-24 c-e72c2c">{{dataInfo.order_info.salesAmount}}</span>&nbsp;元</div>
				<el-button v-if="isAccount" @click="onClickSettlement()" class="settlement-btn m-l-30" type="success">结算</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/style/accountReceivable/orderDetails.scss';
	import { account } from '@/services/apis/account';
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
				return {
					loading:true,
					orderType:this.$route.query.type,
					dataInfo:{
						customer_info:{},
						order_info:{},
						goods:[]
					},
					keyValueData:{},
					listData: []
				}
			},
			methods: {
				getInfo(){
					var params = {
                    	oid:this.$route.params.temporaryUser
	                }
					account.info(params)
	                .then(response => {
	                	this.dataInfo = response.data.results
	                    //结算状态转换
	                    var type = '';
	                    if (this.$route.query.type == 'order_knot') {
	                    	type = 'order_knot_status'
	                    }else if (this.$route.query.type == 'order_credit') {
	                    	type = 'order_remit_status'
	                    }
						for (var i = 0; i < this.keyValueData[type].length; i++) {
							if (this.dataInfo.order_info.status == this.keyValueData[type][i].key) {
								this.dataInfo.order_info.status = this.keyValueData[type][i].value
							}
						};
						//支付方式转换
						for (var i = 0; i < this.keyValueData.pay_type.length; i++) {
							if (this.dataInfo.order_info.payType == this.keyValueData.pay_type[i].key) {
								this.dataInfo.order_info.payType = this.keyValueData.pay_type[i].value
							}
						};
	                    this.loading = false
	                })
				},
				//返回上一页
				goBack() {
					this.$router.go(-1);
				},
				//结算
				onClickSettlement() {
					this.$router.push({
						name: 'order/orderSettlement',
						params: {
							temporaryUser: this.$route.params.temporaryUser,
						}
					})
				}
			},
			created: function() {
				
			},
			computed: {
			    isAccount() {
			    	var status = this.dataInfo.order_info.status;
				    if (this.$route.params.orderType == 'order_knot' && status=='待支付') return true
			    }
			},
			mounted: function() {
				keyValue()
	            .then(response => {
	                this.keyValueData = response.data.results
	            })
				this.getInfo();
			},
			updated(){
				
			}
	}
</script>