<template>
	<div class="repayment f-s-14 c-3">
		<div class="ub ub-ac">
			<el-button @click="goBack()" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
			<div class="m-l-20">赊账收账/赊账还款</div>
		</div>
		<!--客户信息-->
		<div v-loading="loading">
		<el-card class="box-card m-t-20">
			<div slot="header" class="clearfix">
				<span>客户信息</span>
			</div>
			<div class="infoLayout ub ub-ac">
				<div class="icon" :style="{backgroundImage:`url(${dataInfo.customer_info.headImg})`}">
				</div>
				<div class="info c-6 ub-f1 m-l-40">
					<div class="ub">
						<div class="ub-f1 ub">
							<div class="key">姓名</div>
							<div class="m-l-30 line-ellipsis-1 width-220" :title="dataInfo.customer_info.nickname">{{dataInfo.customer_info.nickname}}</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">企业名称</div>
							<div class="m-l-30 line-ellipsis-1 width-220" :title="dataInfo.customer_info.company">{{dataInfo.customer_info.company}}</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">身份证号</div>
							<div class="m-l-30 line-ellipsis-1 width-220" :title="dataInfo.customer_info.idCard">{{dataInfo.customer_info.idCard}}</div>
						</div>
					</div>
					<div class="ub m-t-10">
						<div class="ub-f1 ub">
							<div class="key">地址</div>
							<div class="m-l-30 line-ellipsis-1 width-220" :title="dataInfo.customer_info.address">{{dataInfo.customer_info.address}}</div>
						</div>
						<div class="ub-f1 ub">
							<div class="key">手机号</div>
							<div class="m-l-30 line-ellipsis-1 width-220" :title="dataInfo.customer_info.phone">{{dataInfo.customer_info.phone}}</div>
						</div>
						<div class="ub-f1"></div>
					</div>
				</div>
			</div>
		</el-card>
		<el-card class="box-card m-t-20">
			<div slot="header" class="clearfix">
				<span>还款信息</span>
			</div>
			<el-form :model="repaymentInfo" label-width="70px">
				<div class="textCenter arrearsMoney">
                    <span class="p-r-20">承赊方：{{bearerName}} </span>
                    <span>欠款总金额：{{notPayAmount | format}} </span>
                </div>
				<div class="ub m-t-10">
					<el-form-item label="还款金额" class="ub-f1">
						<el-input v-model="repaymentInfo.refundAmount" type="number" @change="inputChange"></el-input>
					</el-form-item>
					<el-form-item class="ub-f1 m-l-30" label="还款方式">
						<el-select v-model="repaymentInfo.refundType" placeholder="请选择还款方式"  @change="payWay(repaymentInfo.refundType)">
							<el-option v-for="item in keyValueData.pay_type"  :key="item.key" :label="item.value" :value="item.key"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="收账账号" class="ub-f1 m-l-30">
                        <el-input type="number" v-model="repaymentInfo.gatherAccount" :maxlength="GLOBAL.maxlength"></el-input>
					</el-form-item>
				</div>
				<div class="remarks ub">
					<el-form-item label="备注" class="ub-f1">
						<el-input resize="none" type="textarea" v-model="repaymentInfo.remark" :maxlength="GLOBAL.maxTextare"></el-input>
					</el-form-item>
					<div class="ub-f1 ub ub-ae ub-pe">
						<el-button type="primary" size="small" @click="repaymentList">查看还款订单</el-button>
					</div>
				</div>

			</el-form>
		</el-card>
		<el-card class="box-card m-t-20" v-if="listData">
			<div slot="header" class="clearfix">
				<span>可还款订单</span>
			</div>
			<el-table :data="listData" stripe>
				<el-table-column prop="orderNo" label="订单编号">
				</el-table-column>
				<el-table-column align="center" prop="placeOrderTime" label="下单时间">
				</el-table-column>
				<el-table-column align="center" prop="selName" label="卖手">
				</el-table-column>
				<el-table-column align="center" label="销售金额">
					<template slot-scope="scope">{{scope.row.salesAmount | format}}</template>
				</el-table-column>
				<el-table-column align="center" label="待还款">
					<template slot-scope="scope">{{scope.row.stayStillAmount | format}}</template>
				</el-table-column>
				<el-table-column align="center" label="还款金额">
					<template slot-scope="scope">{{scope.row.this_amount | format}}</template>
				</el-table-column>
			</el-table>
		</el-card>
		<div class="ub ub-pe m-t-30" v-if="listData">
			<el-button @click="onClickConfirmRepayment()" class="settlement-btn" type="success">确认还款</el-button>
		</div>
		</div>
	</div>
</template>

<script>
	import '@/style/accountReceivable/repayment.scss';
	import { account } from '@/services/apis/account';
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
			return {
                bearerName:'',//承赊方名称
                bearerId:'',//承赊方id
                notPayAmount:'',//赊账还款总额
				loading:true,
				keyValueData:{},
				repaymentInfo: { //还款信息
					cid: this.$route.params.repaymentId,
					refundAmount:'',
					refundType:'',
					gatherAccount:'',
					remark:'',
				},
				remarks: "",
				dataInfo: {
					customer_info:{},
					notPayAmount:''
				},
				listData:'',

			}
		},
		methods: {
            payWay(way){
                if(way != 'type_card'){
                    this.repaymentInfo.gatherAccount = '';
                }
            },
			//获取详情
			getInfo(){
				account.creditInfo({cid: this.$route.params.repaymentId})
                .then(response => {
                	this.dataInfo = response.data.results;
                	if (this.dataInfo.customer_info.headImg == '') {
                		this.dataInfo.customer_info.headImg = require('../../assets/default/headImg.png');
                	}
                    this.loading  = false;
                })
			},
			inputChange(){
				if (!this.repaymentInfo.refundAmount) {
					this.listData = ''
				}
			},
			//确认还款信息
			repaymentList(){
				if (this.checkRepayment()) {
                    this.repaymentInfo.bearerId = this.bearerId;
					account.creditAmount(this.repaymentInfo)
	                .then(response => {
	                	this.listData = response.data.results
	                })
				}
			},
			//返回上一页
			goBack() {
				this.$router.go(-1);
			},
			//确认还款
			onClickConfirmRepayment() {
				var params = this.repaymentInfo;
				if (params.refundType) {
				    if(params.refundType == 'type_card' && params.gatherAccount ==''){
                        this.$message({
                            message: '请填写完整还款信息',
                            type: 'warning'
                        });
                        return false;
                    }

					if(this.checkRepayment()){
						account.sureCreditAmount(this.repaymentInfo)
		                .then(response => {
		                    if(response.data.status == 'Y'){
                                this.$message({
                                    message: '还款成功',
                                    type: 'success'
                                });
                                this.$router.go(-1);
                            }

		                })
					}
				}else{
					this.$message({
			          message: '请填写完整还款信息',
			          type: 'warning'
			        });
				}
				
			},
			//校验还款金额
			checkRepayment(){
				var amount = this.repaymentInfo.refundAmount
				if (!amount){
					this.$message({
			          message: '请输入还款金额',
			          type: 'warning'
			        });
				}else if(amount <= 0){
					this.$message({
			          message: '还款金额必须大于0',
			          type: 'warning'
			        });
				}else if (amount > this.dataInfo.notPayAmount){
					this.$message({
			          message: '此次还款金额超出欠款总金额，请重新输入',
			          type: 'warning'
			        });
				}else{
			        return true
				}
			}
		},
		created(){

        },
		mounted() {
            this.bearerName = this.$route.params.bearerName;
            this.bearerId = this.$route.params.bearerId;
            this.notPayAmount = this.$route.params.notPayAmount;

			keyValue()
            .then(response => {
                this.keyValueData = response.data.results;
                this.getInfo();
            })
			
		},
	}
</script>