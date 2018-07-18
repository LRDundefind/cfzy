<template>
	<el-container class="tab">
		<el-header class="ub">
			<title-bar></title-bar>
		</el-header>
		<el-container>
			<el-aside width="185px" v-if="showSidebar" >
				<el-row>
					<el-col>
						<el-menu :default-active="setMenuActive($route.path)" router text-color="#333" active-text-color="#33d57c" @open="handleOpen" @close="handleClose">
							<!-- 档主角色首页为home，财务和财务兼卖手角色首页为moneyHome -->
							<el-menu-item v-if="types=='role_finance' || types=='role_finance_sell'" index="/moneyHome">
								<i class="el-icon-menu home-icon"></i>
								<span>首页</span>
							</el-menu-item>
							<el-menu-item v-if="types=='role_owner'" index="/home">
								<i class="el-icon-menu home-icon"></i>
								<span>首页</span>
							</el-menu-item>
							<el-menu-item index="/salesOrder" v-if="types=='role_finance_sell'">
								<i class="el-icon-menu xianjie-icon"></i>
								<span>销售开单</span>
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
							<!-- <el-menu-item index="/analysis">
								<i class="el-icon-menu analysis-icon"></i>
								<span slot="title">经营分析</span>
							</el-menu-item> -->
							<el-submenu index="">
						        <template slot="title">
						          <i class="el-icon-menu analysis-icon"></i>
						          <span>经营分析</span>
						        </template>
						        <el-menu-item-group>
						          <el-menu-item index="/analysis/saleStatistics">销售统计</el-menu-item>
						          <el-menu-item index="/analysis/creditReceive">收款赊款统计</el-menu-item>
						          <el-menu-item index="/analysis/employeeSale">员工销售统计</el-menu-item>
						           <el-menu-item index="/analysis/stallFund">档口资金统计</el-menu-item>
						        </el-menu-item-group>
						    </el-submenu>
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
							<el-menu-item index="/customerManagement">
								<i class="el-icon-menu customer-icon"></i>
								<span slot="title">客户管理</span>
							</el-menu-item>
							<el-menu-item index="/system" v-show="types == 'role_owner'">
								<i class="el-icon-menu set-icon"></i>
								<span>系统设置</span>
							</el-menu-item>
							<el-menu-item index="/manipulateNote" v-show="types == 'role_owner'">
								<i class="el-icon-menu journal-icon"></i>
								<span slot="title">操作日志</span>
							</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
			</el-aside>
			<el-main :style="{'left':showSidebar ? '185px':'0'}">
				<router-view/>
			</el-main>
		</el-container>
		<!-- <sorketmeesage></sorketmeesage> -->
	</el-container>

</template>

<script>
	import '@/style/tab/tab.scss';
	import Cookies from 'js-cookie'
	import sorketmeesage from "@/views/sorketmeesage/index.vue";
	export default {
		name: 'tab',
		components:{
			sorketmeesage
		},
		data() {
			return {
				uid:'',
				home:'',
				types:Cookies.get('roleId'),
				wrapperHeight:0,
				showSidebar: true,
				a: "/home",
				stompClient:null
			}
		},
		// sockets:{
		//     connect: function(){  //这里是监听connect事件
		//     },
		//     customEmit: function(val){
		//       console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
		//     }
		// },
		mounted() {
			const _this = this;
			/**
			 * 点击消息通知进入订单详情
			 * @param  {[type]} id   [订单id]
			 * @param  {[type]} type [订单类型]
			 * @return {[type]}      [description]
			 */
			window.toNewOrder=(id,type)=>{
				//console.log(id+"+++++++"+type)
				_this.$router.push({
		          	path:'/order/orderDetails/'+id+'?type='+type,
			  	});
			  	_this.close();
			};
			this.wrapperHeight = document.body.scrollHeight;
			this.uid = Cookies.get('uid');
			this.connect()
			this.fetchDate()
			//this.open();
		},
		methods: {
			//显示隐藏左侧菜单
			fetchDate() {
				this.showSidebar =
					this.$route.meta.showSidebar !== undefined ?
					this.$route.meta.showSidebar :
					true;
			},
			//设置菜单栏选中状态
			setMenuActive(path) {
				if(path.indexOf("/creditOrder") == 0) {
					return "/creditOrder";
				} else if(path.indexOf("/expenditure") == 0) {
					return "/expenditure";
				} else if(path.indexOf("/system") == 0) {
					return "/system";
				}else if(path.indexOf("/salesOrder") == 0){
					return "/salesOrder";
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
			},
			/**
			 * 弹出订单消息通知
			 * @param  {[type]} obj [订单信息]
			 * @return {[type]}     [description]
			 */
			openMsg(obj){
				let dom = '<a onClick="toNewOrder(\''+obj.oid+'\',\''+obj.orderType+'\')" style="cursor: pointer;">您有一条新的订单</a>'
				//let dom = "<a onClick='toNewOrder()' href='#/order/orderDetails/"+obj.oid+"/?type="+obj.orderType+"' style='color:#333'>您有一条新的订单</a>"
				this.instance = this.$notify({
		          title: '提示',
		          dangerouslyUseHTMLString: true,
		          message: dom,
		          duration: 0,
		          position: 'bottom-right',
		        });
			},
			close() {
                this.instance.close()
            },
			// openMsg(obj) {


		 //        this.$notify({
		 //          title: '新消息',
		 //          dangerouslyUseHTMLString: true,
		 //          message: "<a href='#/order/orderDetails/"+obj.oid+"/?type="+obj.orderType+"' style='color:#333'>您有一条新的订单</a>",
		 //          //message: '<div onClick="toNewOrder(\''+obj.oid+'\',\''+obj.orderType+'\')">您有一条新的订单</div>',
		 //          position: 'bottom-right',
		 //    //       onClick: this.$router.push({
		 //    //       	name:'orderDetails',
		 //    //       	params: {
			// 			// temporaryUser: obj.oid
			// 	  // 	},
			// 	  // 	query: { type:obj.orderType}
			// 	  // }),
		 //          duration: 0
		 //        });
		 //    },
		    //新消息到订单详情
		    toNewOrder(oid,orderType){
		    	//console.log(oid+"======"+orderType);
		    	this.$router.push({
		          	name:'orderDetails',
		          	params: {
						temporaryUser: obj.oid
				  	},
				  	query: { type:obj.orderType}
			  	})
		    },
		    /**
		     * socket消息通知
		     * @return {[type]} [description]
		     */
		    connect() {
		        var _this = this;
		        //process.env.BASE_API
                var socket = new SockJS(process.env.BASE_API+'rest/endpointWisely'); //1连接SockJS的endpoint是“endpointWisely”，与后台代码中注册的endpoint要一样。
		        this.stompClient = Stomp.over(socket);//2创建STOMP协议的webSocket客户端。
		        this.stompClient.connect({}, function(frame) {//3连接webSocket的服务端。
		            //console.log('开始进行连接Connected: ' + frame);
		            _this.stompClient.subscribe('/user/'+_this.uid+'/msg', function(respnose){
		                console.log(respnose);
		                //console.log(respnose.body.responseMessage)
		                //console.log(JSON.parse(respnose.body))
		                _this.openMsg(JSON.parse(JSON.parse(respnose.body).responseMessage))
		            });
		        });
		    },
		},
		/**
		 * 监听路由变化
		 * @type {Object}
		 */
		watch: {
            $route(to, from) {
            	if (from.name == 'order/orderDetails' && to.name == 'order/orderDetails'){
            		window.location.reload();
            	}
            	//console.log(to);
            	// 如果路由有变化，会再次执行该方法
            	this.fetchDate()
            }
        }
	}
</script>
