<template>
	<div class="account">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>车次管理/车次贷款结算</label>
		<!-- 内容 -->
		<div class="content" v-loading="loading">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>货主信息</span>
				</div>
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">姓名：</label>
							<span>{{dataList.goods_owner_info.shipName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">手机号码：</label>
							<span>{{dataList.goods_owner_info.phone}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">供应商名称：</label>
							<span>{{dataList.goods_owner_info.supplierName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">账户信息：</label>
							<span>{{dataList.goods_owner_info.acount}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">地址：</label>
							<span>{{dataList.goods_owner_info.address}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<span>{{dataList.goods_owner_info.remark}}</span>
				  		</div>
				  	</el-col>
				</el-row>
			</el-card>
			<el-card class="box-card m-t-20">
				<div slot="header" class="clearfix">
				    <span>结算信息</span>
				</div>
				<el-row>
				  	<el-col :span="24">
				  		<div class="grid-content">
							<label for="">货品费用：</label>
							<span class='textRed'>{{dataList.goodCost}}元</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
				  		<div class="grid-content">
							<label for="">提成费用：</label>
							<span class='textRed'>{{dataList.commission}}元</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
				  		<div class="grid-content">
							<label for="">回扣：</label>
							<span class='textRed'>{{dataList.rebates}}元</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="24" v-for="item in dataList.storage" :key="item.id">
				  		<div class="grid-content">
							<label for="">{{item.expendName}}</label>
							<span class='textRed'>{{item.amount}}元</span>
				  		</div>
				  	</el-col>
		
				  	<el-col :span="24">
				  		<div class="grid-content">
							<label for="">固定代销费：</label>
							<el-input v-model="params.marketingCost" type="number" placeholder="请输入固定代销费" style="width: 220px"></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
				  		<div class="grid-content" style="width: 330px">
							<label for="">结算金额：</label>
							<span class='textRed'>{{settlement}}元</span>
							<el-button type="success" size="mini" class="floatRight settlement-btn" @click="clear">计算结算金额</el-button>
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="params.remark"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
				<div class="m-t-20 clearfix">
					
					<el-button type="success" class="floatRight settlement-btn" @click="sureSettlement($route.params.tid)">确定结算金额</el-button>
				</div>
			</el-card>
		</div>
	</div>

</template>
<script>
	import '@/style/inventory/inventory.scss';
	import { train } from '@/services/apis/train';
	export default {
		data() {
			return {
				loading:true,
				dataList:{
					goods_owner_info:{},
					storage:[]
				},
				form:{
					cost:'',
					desc:''
				},
				params:{
					tid:this.$route.params.tid,
                    marketingCost: '',
                    remark:'',
                    computer: ''
				},
				settlement: '--'
			}
		},
		mounted() {
			this.getInfo()
		},
		methods:{
			getInfo(){
				var params = {
                    tid:this.$route.params.tid
                }
				train.info(params)
                .then(response => {
                    this.dataList = response.data.results
                    this.loading = false
                })
          
			},
			clear(){
				if (this.params.marketingCost) {
					this.params.computer = 'Y';
					
	                train.clear(this.params)
	                .then(response => {
	                    this.settlement = response.data.results.payAmount
	                })	
                }else{
                	this.$message({
						message: '请输入固定代销费',
						type: 'warning'
					});
                }	
			},
			sureSettlement(id){
				if (this.settlement != '--') {
					this.params.computer = 'N';
	                train.clear(this.params)
	                .then(response => {
	                    this.loading = true;
	                    this.$router.push({
				            name:'train/statement',
				            params: { tid: id }
				        })
	                })	
                }else{
                	this.$message({
						message: '请先计算结算金额',
						type: 'warning'
					});
                }
			}
		}
	}
</script>