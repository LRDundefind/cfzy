<template>
	<div class="orderDetails f-s-14 c-3">
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
							<div class="m-l-30 line-ellipsis-1">王金刀</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">企业名称</div>
							<div class="m-l-30 line-ellipsis-1">程丰智运</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">身份证号</div>
							<div class="m-l-30 line-ellipsis-1">362226111111111111</div>
						</div>
					</div>
					<div class="ub m-t-10">
						<div class="ub-f1 ub">
							<div class="key">地址</div>
							<div class="m-l-30 line-ellipsis-1">北京市海淀区中关村南大街</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">手机号</div>
							<div class="m-l-30 line-ellipsis-1">13321132251</div>
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
						<div class="m-l-30 line-ellipsis-1">12312312312</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">订单金额</div>
						<div class="m-l-30 line-ellipsis-1">123231.15</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">卖手姓名</div>
						<div class="m-l-30 line-ellipsis-1">王金刃</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">结算方式</div>
						<div class="m-l-30 line-ellipsis-1">支付宝</div>
					</div>
				</div>
				<div class="ub m-t-10 info">
					<div class="ub-f1 ub">
						<div class="key">货主</div>
						<div class="m-l-30 line-ellipsis-1">王全刀</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">车次</div>
						<div class="m-l-30 line-ellipsis-1">1232</div>
					</div>
					<div class="ub-f1 ub">
						<div class="key">下单时间</div>
						<div class="m-l-30 line-ellipsis-1">2018-08-08</div>
					</div>
					<div class="ub-f1"></div>
				</div>
				<div class="remarks m-t-10 ub">
					<div class="key ub ub-ac">
						<div>订单备注</div>
					</div>
					<div class="m-l-30 content ub-f1">
						<div class="">订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订订单备注订单备注订单备注订</div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card class="box-card m-t-20">
			<div slot="header" class="clearfix">
				<span>货品信息</span>
			</div>
			<el-table :data="listData" stripe>
				<el-table-column prop="hpmc" label="货品名称">
				</el-table-column>
				<el-table-column label="货品单价">
					<template slot-scope="scope">
						<el-input v-if="!scope.row.hpdj" class="unitPriceInput" v-model="scope.row.hpdj_" size="mini"></el-input>
						<div v-if="!scope.row.hpdj" class="m-l-10 saleCompany">{{scope.row.dw}}</div>
						<div v-if="scope.row.hpdj">{{scope.row.hpdj}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="hpsl" label="货品数量">
				</el-table-column>
				<el-table-column prop="zl" label="重量">
				</el-table-column>
				<el-table-column prop="je" label="金额">
				</el-table-column>
				<el-table-column align="center" prop="bz" label="包装">
				</el-table-column>
			</el-table>
		</el-card>
		<el-card class="box-card m-t-20">
			<div class="infoLayout clearfix">
				<div class="moneyInfo c-6 ub">
					<div class="key">包装费</div>
					<div class="m-l-10 line-ellipsis-1">0.00元</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">过磅费</div>
					<div class="m-l-10 line-ellipsis-1">34.00元</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">三轮费</div>
					<div class="m-l-10 line-ellipsis-1">34.00元</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">车号</div>
					<div class="m-l-10 line-ellipsis-1">金A3433</div>
				</div>
				<div class="moneyInfo c-6 ub">
					<div class="key">状态</div>
					<div class="m-l-10 line-ellipsis-1 type">待支付</div>
				</div>
			</div>
		</el-card>
		<div class="ub m-t-30">
			<div class="ub customerSignature">
				<div>客户签字：</div>
				<div class="m-l-10 img"></div>
			</div>
			<div class="ub-f1 ub ub-pe c-3 ub-ae">
				<div class="m-r-30">总计应收：<span class="f-s-24 c-e72c2c">1258900.00</span>&nbsp;元</div>
				<el-button @click="onClickCalculatingPrice()" class="settlement-btn" type="success">计算价格</el-button>
				<el-button @click="onClickSubmitPrice()" class="settlement-btn" type="success">提交价格</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/style/accountReceivable/orderDetails.scss';

	export default {
		data() {
				return {
					listData: [{
						hpmc: "苹果",
						hpdj: "",
						hpsl: 55,
						bz: "4.0",
						je: 10002.00,
						zl: "50斤",
						hpdj_: "",
						dw: "件"
					}, {
						hpmc: "苹果",
						hpdj: 1234.00,
						hpsl: 55,
						bz: "4.0",
						je: 10002.00,
						zl: "50斤",
						hpdj_: "",
						dw: "件"
					}, {
						hpmc: "苹果",
						hpdj: "1234.00",
						hpsl: 55,
						bz: "4.0",
						je: 10002.00,
						zl: "50斤",
						hpdj_: "",
						dw: "公斤"
					}, {
						hpmc: "苹果",
						hpdj: 1234.00,
						hpsl: 55,
						bz: "4.0",
						je: 10002.00,
						zl: "50斤",
						hpdj_: "",
						dw: "件"
					}, {
						hpmc: "苹果",
						hpdj: 1234.00,
						hpsl: 55,
						bz: "4.0",
						je: 10002.00,
						zl: "50斤",
						hpdj_: "",
						dw: "公斤"
					}, {
						hpmc: "苹果",
						hpdj: 1234.00,
						hpsl: 55,
						bz: "4.0",
						je: 10002.00,
						zl: "50斤",
						hpdj_: "",
						dw: "公斤"
					}]
				}
			},
			methods: {
				//返回上一页
				goBack() {
					this.$router.go(-1);
				},
				//计算价格
				onClickCalculatingPrice() {

				},
				//提交价格
				onClickSubmitPrice() {
					this.$router.go(-1);
				}
			},
			created: function() {},
			mounted: function() {

			},
	}
</script>