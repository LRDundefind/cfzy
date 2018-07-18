<template>
	<div class="mongeyHome">
		<div class="mongeyTop">
			<div class="ub c-f listthree">
				<div class="ub-f1 " >
					<h3 :title="dataResults.day_income" class="money line-ellipsis-1">{{dataResults.day_income | format}}</h3>
					<p class="explain">当日收入（元）</p>
				</div>
				<div class="ub-f1 m-l-30" >
					<h3 :title="dataResults.day_espenditure" class="money line-ellipsis-1">{{dataResults.day_espenditure | format}}</h3>
					<p class="explain">当日支出（元）</p>
				</div>
				<div class="ub-f1 m-l-30" >
					<h3 :title="dataResults.day_credit" class="money line-ellipsis-1">{{dataResults.day_credit | format}}</h3>
					<p class="explain">当日赊账金额（元）</p>

				</div>
				<div class="ub-f1 m-l-30" >
					<h3 :title="dataResults.day_repayment" class="money line-ellipsis-1">{{dataResults.day_repayment | format}}</h3>
					<p class="explain">当日收赊款（元）</p>
				</div>
			</div>
		
		</div>
		<div class="monryGo" style="margin:20px 0 0;">
				<div class=" monryListOne ub" >
					<div class="ub-f1">
						<router-link to="/order">
							<div class="icon addmongey"></div>
							<div class="text">现结收账</div>
						</router-link>
					</div>
					<div class="ub-f1">
						<router-link to="/creditOrder">
							<div class="icon coback"></div>
							<div class="text">赊账还款</div>
						</router-link>
					</div>
				</div>
				<div class="ub monryListtwo">
					<div class="ub-f1">
						<router-link to="/expenditure">
							<div class="icon outmoney"></div>
							<div class="text">普通支出</div>
						</router-link>
					</div>
					<div class="ub-f1">
						<router-link to="/expenditure/ownerLoan">
							<div class="icon huomongey"></div>
							<div class="text">货主汇款</div>
						</router-link>
					</div>
					<div class="ub-f1">
						<router-link to="/train">
							<div class="icon overcar"></div>
							<div class="text">车次结算</div>
						</router-link>
					</div>
				</div>
		</div>
		<div class="companyInformation textCenter f-s-12 c-6 m-t-30">
			<div>公司简介</div>
			<div class="m-t-10">
				<span>合作洽谈：4009008038</span>
				<span class="m-l-20">销售热线：4009008038</span>
				<!-- <span class="m-l-20">咨询QQ：1158863538</span> -->
				<!-- <span class="m-l-20">邮箱：1158863538@qq.com</span> -->
				<span @click="onClickFeedback()" class="m-l-20 click">意见反馈</span>
			</div>
			<div class="m-t-10">2018 程丰智运 All Rights Reserved</div>
		</div>

	</div>
	
</template>

<script>
	import { home } from '@/services/apis/home.api'

	export default {
		name: 'mongeyHome',
		data() {
			return {
					dataResults:{}
				}
			
		},
		created(){
			this.getData();
		},
		methods: {
			getData(){
					let params = {
						page_size:'20',
						current_page:'1'
					};
				home.index(params).then(response => {
	                this.dataResults = response.data.results;
	            })
			},
			//点击意见反馈
			onClickFeedback: function() {
				this.$router.push({
					name: 'feedBack'
				})
			}
		},
		mounted: function() {
			
		}
	}
</script>