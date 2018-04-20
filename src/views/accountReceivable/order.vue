<!--现结订单列表-->
<template>
	<div class="order">
		<label>订单管理</label>
		<div class="p-20 b-c-f m-t-10 content">
			<el-form :model="listQuery" label-width="70px">
				<div class="ub">
					<el-form-item class="ub-f1" label="商品名称">
						<el-input v-model="listQuery.goodName"></el-input>
					</el-form-item>
					<el-form-item class="ub-f1 m-l-30" label="订单编号">
						<el-input v-model="listQuery.orderNo"></el-input>
					</el-form-item>
					<el-form-item class="ub-f1 m-l-30" label="客户姓名">
						<el-input v-model="listQuery.nickname"></el-input>
					</el-form-item>
					<el-form-item class="ub-f1 m-l-30" label="卖手">
						<el-select v-model="listQuery.sid" placeholder="请选择卖手">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="item in msList" :key="item.sid" :label="item.selName" :value="item.sid"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="ub">
					<el-form-item class="ub-f1" label="货物车次">
						<el-input v-model="listQuery.trainsNum"></el-input>
					</el-form-item>
					<el-form-item class="ub-f1 m-l-30" label="支付方式">
						<el-select v-model="listQuery.payType" placeholder="请选择支付方式">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="item in keyValueData.pay_type" :key="item.key" :label="item.value" :value="item.key"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="入库时间" class="selectData m-l-30">
					    <el-date-picker
					      value-format="yyyy-MM-dd"
					      v-model="timeQuantum"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
					</el-form-item>
				</div>
				<div class="ub">
					<div class="ub-f1 ub">
						<el-form-item label="订单价格">
							<el-input v-model="listQuery.amount_min" type="number"></el-input>
						</el-form-item>
						<el-form-item label="-" label-width="30px">
							<el-input v-model="listQuery.amount_max" type="number"></el-input>
						</el-form-item>
					</div>
					<div class="ub-f1"></div>
				</div>
			</el-form>
			<el-button type="primary" icon="el-icon-search" size="small" @click='search'>筛选</el-button>
			<!--切换标题-->
			<el-menu :default-active="listQuery.status" class="el-menu-demo" mode="horizontal" @select="selectOrderType">
				<!-- <el-menu-item v-for="item in keyValueData.order_knot_status" :key="item.key" :index="item.key">{{item.value}}</el-menu-item> -->
				<el-menu-item index="status_topay">待支付</el-menu-item>
				<el-menu-item index="status_topick">待提货</el-menu-item>
				<el-menu-item index="status_complete">已完成</el-menu-item>
				<el-menu-item index="status_cancel">已取消</el-menu-item>
				<el-menu-item index="">全部</el-menu-item>

			</el-menu>

			<!--列表-->
			<el-table :data="tableData" stripe v-loading="loading">
				<el-table-column prop="orderNo" label="订单编号" width="130">
				</el-table-column>
				<el-table-column prop="nickname" label="客户" width="130">
				</el-table-column>
				<el-table-column prop="placeOrderTime" width="180" label="下单时间">
				</el-table-column>
				<el-table-column prop="selName" width="130" label="卖手">
				</el-table-column>
				<el-table-column prop="goods" label="货品">
				</el-table-column>
				<el-table-column prop="salesAmount" label="销售金额">
				</el-table-column>
				<el-table-column prop="status" width="120" label="订单状态">
				</el-table-column>
				<el-table-column prop="payType" width="120" label="支付方式">
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button v-if="scope.row.status == '待支付'" @click="handleSettlement(scope.$index, scope.row)" size="mini" type="danger" plain>结算</el-button>
						<el-button @click="onClickItem(scope.$index, scope.row)" size="mini" type="danger" plain>查看</el-button>
						<el-button v-if="scope.row.status == '待支付'"  @click="handleCancel(scope.$index, scope.row)" size="mini" type="info" plain>取消</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="m-t-20" 
			  @current-change="currentChange" 
			  background layout="total, prev, pager, next" 
			  :page-size="listQuery.page_size"
			  :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import '@/style/accountReceivable/order.scss';
	import { account } from '@/services/apis/account';
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
				return { 
					loading:true,
					keyValueData:'',
					timeQuantum:[],
					listQuery:{  //请求参数
						orderType:'order_knot',
						goodName:'',	//商品名称
						orderNo:'',	//订单id
						nickname:'',	//买手姓名
						sid:'',	//卖手id
						trainsNum:'',	//车次
						payType:'',	//支付方式
						start_time:'',	//下单时间 开始
						end_time:'',	//下单时间 结束
						amount_min:'',	//订单价格 小
						amount_max:'',	//订单价格 大
						status:'status_topay',
						page_size:20,
						current_page:1,
					},
					total: null, //分页总条数
					msList: [],
					tableData: []
				}
			},
			methods: {
				getList(){
	                account.list(this.listQuery)
	                .then(response => {
	                    this.tableData = response.data.results.list;
	                    this.total = response.data.results.total;
	                    
	                    if (this.tableData) {
	                    	//支付转换
							for (var i = 0; i < this.tableData.length; i++) {
				            	for (var j = 0; j < this.keyValueData.pay_type.length; j++) {
				            		if(this.tableData[i].payType == this.keyValueData.pay_type[j].key){
				            			this.tableData[i].payType = this.keyValueData.pay_type[j].value
				                	}
				            	}
				            	//订单状态转换
				            	for (var k = 0; k < this.keyValueData.order_knot_status.length; k++) {
				            		if(this.tableData[i].status == this.keyValueData.order_knot_status[k].key){
				            			this.tableData[i].status = this.keyValueData.order_knot_status[k].value
				                	}
				            	}
				            }
				        }
	                    this.loading = false;
	                })
	              
				},
				getSellinglist(){
					account.sellinglist()
	                .then(response => {
	                    this.msList = response.data.results;
	                })
				},
				search(){
					var params = this.listQuery;
					if(this.timeQuantum==null){
						params.start_time='';
						params.end_time='';
					}
					else{
						params.start_time = this.timeQuantum[0];
						params.end_time = this.timeQuantum[1];
					}
					
					if (params.amount_min && params.amount_max=='') {
						params.amount_max = params.amount_min
					}
					if (params.amount_min=='' && params.amount_max) {
						params.amount_min = params.amount_max
					}
					this.getList();
				},
				//切换订单类型
				selectOrderType(key, keyPath) {
					this.listQuery.status = key;
					this.getList();
				},
				//切换分页
				currentChange(val) {
					this.listQuery.current_page = val;
					this.getList();
				},
				//结算
				handleSettlement(index, row) {
					this.$router.push({
						name: 'order/orderSettlement',
						params: {
							temporaryUser: row.oid,
						},
						query: { type:'order_knot'}
					})
				},
				//取消
				handleCancel(index, row) {
					//console.log(index, row.oid);
					account.cancel({oid:row.oid})
	                .then(response => {
	                    this.getList();
	                })
				},
				//进入详情
				onClickItem(index, row) {
					this.$router.push({
						name: 'order/orderDetails',
						params: {
							orderType: 'order_knot',
							temporaryUser: row.oid
						},
						query: { type:'order_knot'}
					});
				}
			},
			mounted: function() {
				//获取键值
				keyValue()
	            .then(response => {
	                this.keyValueData = response.data.results
	            })
				this.getList();
				this.getSellinglist();
			},
			updated(){
				
			}
	}
</script>