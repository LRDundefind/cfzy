<!--现结订单列表-赊账收账-->
<template>
	<div class="m-t-20">
		<!--赊账收账筛选-->
		<el-form :model="params" label-width="70px">
			<el-form-item label="客户姓名" class="buyerName">
				<el-input v-model="params.nickname"></el-input>
			</el-form-item>
		</el-form>
		<!--列表和筛选按钮-->
		<!--赛选按钮-->
		<div class="screenLayout">
			<el-button type="primary" icon="el-icon-search" size="small" @click="getList">筛选</el-button>
		</div>
		<!--列表-->
		<el-table :data="listData" stripe class="m-t-20" v-loading="loading">
			<el-table-column type="index" label="序号">
			</el-table-column>
			<el-table-column prop="cusName" label="客户姓名">
			</el-table-column>
			<el-table-column prop="nickname" label="昵称">
			</el-table-column>
			<el-table-column prop="idCard" label="身份证号">
			</el-table-column>
			<el-table-column prop="company" label="公司名称">
			</el-table-column>
			<el-table-column label="赊账总金额">
				<template slot-scope="scope">
					{{scope.row.creditAmount | format}}
				</template>
			</el-table-column>
			<el-table-column label="待还款">
				<template slot-scope="scope">
					{{scope.row.notPayAmount | format}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="onClickRepayment(scope.$index, scope.row)" size="mini" type="danger" plain>还款</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="m-t-20" 
			@current-change="currentChange" 
			background 
			layout="total,prev, pager, next" 
			:page-size="params.page_size"
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
	import '@/style/accountReceivable/creditOrder.scss';
	import { account } from '@/services/apis/account';
	export default {
		data() {
				return {
					loading: true,
					params: {
						nickname: "",
						page_size:20,
						current_page:1,
					},
					total: null, //分页总条数
					listData: []
				}
			},
			methods: {
				//获取赊账收款列表
				getList(){
					account.credit(this.params)
	                .then(response => {
	                    this.listData = response.data.results.list;
	                    this.total = response.data.results.total;
	                    this.loading  = false;
	                })
				},
				//切换分页
				currentChange(val) {
					this.params.current_page = val;
					this.getList();
				},
				//还款详情
				onClickRepayment(index, row) {
					this.$router.push({
						name: 'order/repayment',
						params:{
							repaymentId:row.cid
						}
					})
				},
			},
			mounted() {
				this.getList();
			},
	}
</script>