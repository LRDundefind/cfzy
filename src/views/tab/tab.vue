<template>
	<el-container class="tab">
		<el-header class="ub">
			<title-bar></title-bar>
		</el-header>
		<el-container>
			<el-aside width="185px" v-if="showSidebar">
				<el-row>
					<el-col>
						<el-menu :default-active="setMenuActive($route.path)" router text-color="#333" active-text-color="#33d57c" @open="handleOpen" @close="handleClose">
							<el-menu-item v-if="types=='role_finance'" index="/moneyHome">
								<i class="el-icon-menu home-icon"></i>
								<span>首页</span>
							</el-menu-item>
							<el-menu-item v-if="types=='role_owner'" index="/home">
								<i class="el-icon-menu home-icon"></i>
								<span>首页</span>
							</el-menu-item>
							<el-menu-item index="/order">
								<i class="el-icon-menu xianjie-icon"></i>
								<span>现结收账</span>
							</el-menu-item>
							<el-menu-item index="/creditOrder">
								<i class="el-icon-menu shezhang-icon"></i>
								<span>赊账收账</span>
							</el-menu-item>
							<el-menu-item index="/expenditure">
								<i class="el-icon-menu zhichu-icon"></i>
								<span slot="title">支出</span>
							</el-menu-item>
							<el-menu-item index="/analysis">
								<i class="el-icon-menu analysis-icon"></i>
								<span slot="title">经营分析</span>
							</el-menu-item>
							<el-menu-item index="/train">
								<i class="el-icon-menu checiguanli-icon"></i>
								<span>车次管理</span>
							</el-menu-item>
							<el-menu-item index="/goods">
								<i class="el-icon-menu stock-icon"></i>
								<span>货品库存</span>
							</el-menu-item>
							<el-menu-item index="/owner" v-show="types == 'role_owner'">
								<i class="el-icon-menu huozhu-icon"></i>
								<span slot="title">货主管理</span>
							</el-menu-item>
							<el-menu-item index="/customerManagement" v-show="types == 'role_owner'">
								<i class="el-icon-menu customer-icon"></i>
								<span slot="title">客户管理</span>
							</el-menu-item>
							<el-menu-item index="/system" v-show="types == 'role_owner'">
								<i class="el-icon-menu set-icon"></i>
								<span>系统设置</span>
							</el-menu-item>
							<el-menu-item index="/manipulateNote">
								<i class="el-icon-menu journal-icon"></i>
								<span slot="title">操作日志</span>
							</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
			</el-aside>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
		<!-- <sorketmeesage></sorketmeesage> -->
	</el-container>
	
</template>

<script>
	import '@/style/tab/tab.scss';
	import sorketmeesage from "@/views/sorketmeesage/index.vue";
	export default {
		name: 'tab',
		components:{
			sorketmeesage
		},
		data() {
			return {
				home:'',
				types:window.localStorage.getItem('roleId'),  
				showSidebar: true,
				a: "/home"

			}
		},

		mounted() {
			this.fetchDate(

			)
		},
		methods: {
			//显示隐藏左侧菜单
			fetchDate() {
				this.showSidebar =
					this.$route.meta.showSidebar !== undefined ?
					this.$route.meta.showSidebar :
					true;
			},
			//设置菜单栏选中
			setMenuActive(path) {
				if(path.indexOf("/creditOrder") == 0) {
					return "/creditOrder";
				} else if(path.indexOf("/expenditure") == 0) {
					return "/expenditure";
				} else if(path.indexOf("/system") == 0) {
					return "/system";
				}else {
					return path;
				}
			},
			handleOpen(key, keyPath) {
				//				this.$router.push
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		watch: {  
            $route(to, from) { 
            	// 如果路由有变化，会再次执行该方法
            	this.fetchDate() 
            }  
        }
	}
</script>