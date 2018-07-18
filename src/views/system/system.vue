<!--系统设置入口-->
<template>
	<div class="system">
		<label>系统设置</label>
		<div class="p-20 m-t-10 b-c-f p-t-0 content">
			<!--切换标题-->
			<el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal">
				<el-menu-item index="/system/enterpriseMessage">企业信息</el-menu-item>
				<el-menu-item index="/system/record">档位管理</el-menu-item>
				<el-menu-item index="/system/creditRules">赊账规则</el-menu-item>
				<el-menu-item index="/system/personalData">个人资料</el-menu-item>
				<el-menu-item index="/system/spendingType">支出类型</el-menu-item>
				<el-menu-item index="/system/staff">员工管理</el-menu-item>
			</el-menu>
			<router-view name="systemView" />
		</div>
	</div>
</template>

<script>
	import '@/style/system/system.scss';

	export default {
		data() {
				return {
					//页面内容样式
	
				}
			},
			methods: {},
			mounted: function() {
				
			},
	}
</script>