<!--现结订单列表-->
<template>
	<div class="creditOrder">
		<label>赊账收账</label>
		<div :style="contentStyle" class="p-20 m-t-10 b-c-f p-t-0 content">
			<!--切换标题-->
			<el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
				<el-menu-item index="/creditOrder/SZSZ">赊账收账</el-menu-item>
				<el-menu-item index="/creditOrder/SZDD">赊账订单</el-menu-item>
				<el-menu-item index="/creditOrder/HZDD">坏账订单</el-menu-item>
			</el-menu>
			<router-view name="creditOrderView" />
		</div>
	</div>
</template>

<script>
	import '@/style/accountReceivable/creditOrder.scss';

	export default {
		data() {
				return {
					//页面内容样式
					contentStyle: {
						"min-height": "0"
					}
				}
			},
			methods: {},
			mounted: function() {
				this.contentStyle["min-height"] = document.body.clientHeight - 60 - 40 - 24 + "px";
			},
	}
</script>