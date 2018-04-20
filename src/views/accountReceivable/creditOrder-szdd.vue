<!--现结订单列表-赊账订单-->
<template>
	<div class="m-t-20">
		<!--赊账订单赛选-->
		<el-form :model="listQuery" label-width="70px">
			<div class="ub">
				<el-form-item class="ub-f1" label="订单状态">
					<el-select v-model="listQuery.status" placeholder="请选择订单状态">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in keyValueData.order_remit_status" :key="item.key" :label="item.value" :value="item.key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单编号" class="ub-f1 m-l-30">
					<el-input v-model="listQuery.orderNo"></el-input>
				</el-form-item>
				<el-form-item label="客户姓名" class="ub-f1 m-l-30">
					<el-input v-model="listQuery.nickname"></el-input>
				</el-form-item>
				<el-form-item label="卖手" class="ub-f1 m-l-30">
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
				<el-form-item class="ub-f1 m-l-30" label="还款方式">
					<el-select v-model="listQuery.payType" placeholder="请选择还款方式">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in keyValueData.pay_type" :key="item.key" :label="item.value" :value="item.key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="ub-f2 m-l-30 m-r-30" label="下单时间">
					<el-date-picker value-format="timestamp" format="yyyy-MM-dd" v-model="timeQuantum" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
			</div>
			<div class="ub">
				<div class="ub-f1 ub m-r-30 orderPrice">
					<el-form-item label="订单价格">
						<el-input v-model="listQuery.amount_min"></el-input>
					</el-form-item>
					<el-form-item label="-" label-width="30px">
						<el-input v-model="listQuery.amount_max"></el-input>
					</el-form-item>
				</div>
			</div>
		</el-form>
		<!--赛选按钮-->
		<div class="screenLayout">
			<el-button type="primary" icon="el-icon-search" size="small" @click="search">筛选</el-button>
		</div>
		<!--列表-->
		<el-table :data="listData" stripe v-loading="loading" class="m-t-20">
			<el-table-column prop="orderNo" label="订单编号">
			</el-table-column>
			<el-table-column prop="nickname" label="客户姓名">
			</el-table-column>
			<el-table-column prop="placeOrderTime" label="下单时间">
			</el-table-column>
			<el-table-column prop="selName" label="卖手">
			</el-table-column>
			<el-table-column prop="salesAmount" label="销售金额">
			</el-table-column>
			<el-table-column prop="stayStillAmount" label="待还款">
			</el-table-column>
			<el-table-column prop="status" label="订单状态">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="onClickItem(scope.$index, scope.row)" size="mini" type="danger" plain>查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="m-t-20" 
		@current-change="currentChange" 
		background 
		layout="total, prev, pager, next" 
		:page-size="listQuery.page_size"
		:total="total">
		</el-pagination>
	</div>
</template>

<script>
	import '@/style/accountReceivable/creditOrder.scss';
	import { account } from '@/services/apis/account';
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
				return {
					loading:true,
					keyValueData:{},
					msList:[],
					timeQuantum:[],
					listQuery:{  //请求参数
						orderType:'order_credit',
						orderNo:'',	//订单id
						nickname:'',	//客户姓名
						sid:'',	//卖手id
						trainsNum:'',	//车次
						payType:'',	//支付方式
						start_time:'',	//下单时间 开始
						end_time:'',	//下单时间 结束
						amount_min:'',	//订单价格 小
						amount_max:'',	//订单价格 大
						status:'',
						page_size:20,
						current_page:1,
					},
					total: null, //分页总条数
					listData: []
				}
			},
			methods: {
				getList(){
	                account.list(this.listQuery)
	                .then(response => {
	                    this.listData = response.data.results.list;
	                    this.total = response.data.results.total;
	                    if (this.listData) {
	                    	//订单状态转换
							for (var i = 0; i < this.listData.length; i++) {
			                    for (var k = 0; k < this.keyValueData.order_remit_status.length; k++) {
				            		if(this.listData[i].status == this.keyValueData.order_remit_status[k].key){
				            			this.listData[i].status = this.keyValueData.order_remit_status[k].value
				                	}
				            	}
				            }
				        }
	                    this.loading = false;
	                })
	              
				},
				search(){
					var params = this.listQuery
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
				//卖手列表
				getSellinglist(){
					account.sellinglist()
	                .then(response => {
	                    this.msList = response.data.results;
	                })
				},
				//切换分页
				currentChange(val) {
					this.listQuery.current_page = val;
					this.getList();
				},
				//结算
				handleSettlement(index, row) {
					this.$router.push({
						name: 'order/orderSettlement'
					})
				},
				//进入详情
				onClickItem(index, row) {
					this.$router.push({
						name: 'order/orderDetails',
						params: {
							orderType: 'order_credit',
							temporaryUser: row.oid
						},
						query: { type:'order_credit'}
					});
				}
			},
			mounted() {
				//获取键值
				keyValue()
	            .then(response => {
	                this.keyValueData = response.data.results
	            })
				this.getList();
				this.getSellinglist();
			},
	}
</script>