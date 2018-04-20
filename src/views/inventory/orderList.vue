<template>
	<div class="orderList">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>车次管理/订单列表</label>
		<!-- 内容 -->
		<div class="content">
			<el-table
				stripe
		      	:data="tableData"
		      	style="width: 100%"
		      	class="table-data-list">
			    <el-table-column
			        prop="orderNo"
			        label="订单编号"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="nickname"
			        label="客户"
			        width="180">
			    </el-table-column>
			    <el-table-column
			        prop="placeOrderTime"
			        label="下单时间">
			    </el-table-column>
			    <el-table-column
			        prop="selName"
			        label="卖手">
			    </el-table-column>
			    <el-table-column
			        prop="salesAmount"
			        label="销售金额">
			    </el-table-column>
			    <!-- <el-table-column
			        prop="toPay"
			        label="待还金额">
			    </el-table-column>
			    <el-table-column
			        prop="type"
			        label="订单类型">
			    </el-table-column> -->
			    <el-table-column
			        prop="status"
			        label="订单状态">
			    </el-table-column>
		    </el-table>	
		</div>
	</div>
</template>
<script>
	import '@/style/inventory/inventory.scss';
	import { train } from '@/services/apis/train';
	export default {
		data() {
			return {
				tableData:[]
			}
		},
		mounted() {
			this.getList()
		},
		methods:{
			getList(){
				var params = {
					tid:this.$route.params.tid
                }
                train.orders(params)
                .then(response => {
                    this.tableData = response.data.results.list
                })
                .catch(response=> {
                    console.log(response);
                });
			}
		}
	}
</script>