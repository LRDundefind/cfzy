<template>
	<div class="expenditure">
		<label>订单管理</label>
		<div :style="contentStyle" class="p-20 p-t-0 m-t-10 b-c-f content">
			<!--切换标题-->
			<el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
				<el-menu-item index="/expenditure/ordinaryExpenditure">普通支出</el-menu-item>
				<el-menu-item index="/expenditure/ownerLoan">货主汇款</el-menu-item>
				<el-menu-item index="/expenditure/expendHistory">支出历史</el-menu-item>
			</el-menu>
			<router-view name="expenditureView" />
		</div>
	</div>
</template>
<script>
	import '@/style/expenditure/expenditure.scss';

	export default {
		data() {
				return {
					contentStyle: {
						"min-height": "0"
					},
				}
			},
			mounted: function() {
				this.contentStyle["min-height"] = document.body.clientHeight - 60 - 40 - 24 + "px";
			},
	}
</script>