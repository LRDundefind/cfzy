<template>
	<div class="orderList">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>车次管理/售卖订单列表</label>
		<!-- 内容 -->
		<div class="content">
			<el-table
		      	:data="tableData"
		      	style="width: 100%"
		      	class="table-data-list">
                <!--<el-table-column-->
                        <!--prop="nickname"-->
                        <!--label="购买客户"-->
                        <!--width="180">-->
                <!--</el-table-column>-->
                <el-table-column label="购买客户">
                    <template slot-scope="scope">
                        <div>
                            <span v-show="scope.row.nickname != ''">{{scope.row.nickname}}</span>
                            <span v-show=" scope.row.phone == '' && scope.row.nickname == ''">临时客户</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="品名"
                        width="220"
                >
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.goods" class="ub">
                            <div class=" list-item ub">
                                <div class="goodName" :title="item.goodName">
                                    {{item.goodName}}
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="件数"
                >
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.goods" class="ub">
                            <div class="list-item">{{item.goodNum}}</div>
                        </div>
                    </template>
                </el-table-column>


                <el-table-column
                        label="重量"
                >
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.goods" class="ub">
                            <div class="list-item">{{item.weight}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="单价"
                >
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.goods" class="ub">
                            <div class="list-item">{{item.price}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="金额"
                >
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.goods" class="ub">
                            <div class="list-item">{{item.goodAmount}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="包装费"
                >
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.goods" class="ub">
                            <div class="list-item">{{item.packCost}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="salesAmount"
                        label="销售金额">
                </el-table-column>

                <el-table-column
                        prop="selName"
                        label="卖手">
                </el-table-column>

                <el-table-column
                        prop="placeOrderTime"
                        label="下单时间">
                </el-table-column>

                <el-table-column
			        prop="orderNo"
			        label="订单编号"
			        width="180">
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
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
			return {
				keyValueData:{},
				tableData:[]
			}
		},
		mounted() {
			keyValue()
            .then(response => {
                this.keyValueData = response.data.results;
                this.getList();
            })
		},
		methods:{
			getList(){
				var params = {
					tid:this.$route.params.tid
                }
                train.orders(params)
                .then(response => {
                    this.tableData = response.data.results.list
                    if (this.tableData) {
		                for (var i = 0; i < this.tableData.length; i++) {
		                	if(this.tableData[i].orderType == 'order_knot'){
		                		for (var j = 0; j < this.keyValueData.order_knot_status.length; j++) {
				            		if(this.tableData[i].status == this.keyValueData.order_knot_status[j].key){
				            			this.tableData[i].status = this.keyValueData.order_knot_status[j].value
				                	}
				            	}
		                	}else if (this.tableData[i].orderType == 'order_credit'){
		                		for (var j = 0; j < this.keyValueData.order_remit_status.length; j++) {
				            		if(this.tableData[i].status == this.keyValueData.order_remit_status[j].key){
				            			this.tableData[i].status = this.keyValueData.order_remit_status[j].value
				                	}
				            	}
		                	}
			            }
		            }
                })
                .catch(response=> {
                    console.log(response);
                });
			}
		}
	}
</script>