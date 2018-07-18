<template>
	<div class="home f-s-14 commonstyle">
        <!--档位结余-->
        <div class="balance ub">
            <div class="ub-f5 textCenter">
                <div class="ub">
                    <div class="ub-f5">
                        <div class="stall line-ellipsis-1" :title="dataResults.balanceStall | format">{{dataResults.balanceStall |format}}
                        </div>
                        <div class="stall_word">档口结余</div>
                    </div>
                    <div class="ub ub-pc ub-f1">
                        <div class="equal  " >=</div>
                    </div>
                </div>
            </div>

            <div class="ub-f3 textCenter">
                <div class="ub ">
                    <div class="ub-f5">
                        <div class="digital line-ellipsis-1" :title="dataResults.yBalanceStall | format">{{dataResults.yBalanceStall |format}}
                        </div>
                        <div class="digital_word">昨日结余</div>
                    </div>
                    <div class="ub-f1 ub ub-pc">
                        <div class="plus">+</div>
                    </div>

                </div>
            </div>

            <div class="ub-f3 textCenter">
                <div class="ub ">
                    <div class="ub-f5">
                        <div class="digital" :title="dataResults.balanceCash | format">{{dataResults.balanceCash |format}}
                        </div>
                        <div class="digital_word line-ellipsis-1">当日现金结余</div>
                    </div>
                    <div class="ub-f1 ub ub-pc">
                        <div class="plus">+</div>
                    </div>
                </div>
            </div>

            <div class="ub-f3 textCenter">
                <div class="ub ">
                    <div class="ub-f5">
                        <div class="digital" :title="dataResults.balanceWeChat | format">{{dataResults.balanceWeChat | format}}
                        </div>
                        <div class="digital_word line-ellipsis-1">当日微信结余</div>
                    </div>
                    <div class="ub-f1 ub ub-pc">
                        <div class="plus">+</div>
                    </div>
                </div>
            </div>

            <div class="ub-f3 textCenter">
                <div class="ub ">
                    <div class="ub-f5">
                        <div class="digital" :title="dataResults.balanceAlipay | format">{{dataResults.balanceAlipay | format}}
                        </div>
                        <div class="digital_word line-ellipsis-1">当日支付宝结余</div>
                    </div>
                    <div class="ub-f1 ub ub-pc">
                        <div class="plus">+</div>
                    </div>

                </div>
            </div>

            <div class="ub-f2 textCenter">
                <div>
                    <div class="digital" :title="dataResults.balanceCard | format">{{dataResults.balanceCard | format}}</div>
                    <div class="digital_word line-ellipsis-1">当日银行卡结余</div>
                </div>
            </div>
        </div>
        <!--档位结余end-->


        <!--当日统计-->
		<div class="todayStatistics ub c-f" >
			<div class="ub-f1">
				<div :title="dataResults.day_income" class="money line-ellipsis-1">{{dataResults.day_income | format}}</div>
				<div class="explain">当日收入（元）</div>
			</div>
			<div class="ub-f1 m-l-30">
				<div :title="dataResults.day_espenditure" class="money line-ellipsis-1">{{dataResults.day_espenditure | format}}</div>
				<div class="explain">当日支出（元）</div>
			</div>
			<div class="ub-f1 m-l-30">
				<div :title="dataResults.day_credit" class="money line-ellipsis-1">{{dataResults.day_credit | format}}</div>
				<div class="explain">当日赊账金额（元）</div>
			</div>
			<div class="ub-f1 m-l-30">
				<div :title="dataResults.day_repayment" class="money line-ellipsis-1">{{dataResults.day_repayment | format}}</div>
				<div class="explain">当日收赊款（元）</div>
			</div>
		</div>
		<div class="title c-6">快捷入口</div>
		<div class="b-c-f shortcutEntrance ub f-s-24 c-3">
			<div class="ub-f1 click" @click="toSystemRecord">
				<div class="icon"></div>
				<div class="text">添加货品</div>
			</div>
			<div class="line"></div>
			<div class="ub-f1 click" @click="toCustomerManagement">
				<div class="icon"></div>
				<div class="text">客户管理</div>
			</div>
			<div class="line"></div>
			<div class="ub-f1 click" @click="toOwner">
				<div class="icon"></div>
				<div class="text">添加货主</div>
			</div>
			<div class="line"></div>
			
			<div class="ub-f1 click" @click="toCreditOrderSZSZ">
				<div class="icon"></div>
				<div class="text">赊账还款</div>
			</div>
			
		</div>
		<div class="title c-6">当月概况</div>
		<div class="b-c-f monthStatistics ub c-6 f-s-14">
			<div class="ub-f1">
				<div class="explain">订单量</div>
				<div :title="dataResults.month_orders" class="statistics line-ellipsis-1">{{dataResults.month_orders}}</div>
			</div>
			<div class="ub-f1">
				<div class="explain">当月收入</div>
				<div :title="dataResults.month_income" class="statistics line-ellipsis-1">{{dataResults.month_income | format}}</div>
			</div>
			<div class="ub-f1">
				<div class="explain">当月支出</div>
				<div :title="dataResults.month_espenditure" class="statistics line-ellipsis-1">{{dataResults.month_espenditure | format}}</div>
			</div>
			<div class="ub-f1">
				<div class="explain">当月赊账</div>
				<div :title="dataResults.month_credit" class="statistics line-ellipsis-1">{{dataResults.month_credit | format}}</div>
			</div>
			<div class="ub-f1">
				<div class="explain">入库车次量（车）</div>
				<div :title="dataResults.month_vehicle" class="statistics line-ellipsis-1">{{dataResults.month_vehicle}}</div>
			</div>
		</div>
		<div @click="onClickBlacklist()" v-bind:style="blacklistStyle" class="m-t-30 b-c-f blacklist click"></div>
		<div class="title">赊账统计</div>
		<div class="creditStatistics ub b-c-f">
			<div id="creditTimeStatistics" class="ub-f1"></div>
			<div class="line"></div>
			<div id="creditMoneyStatistics" class="ub-f1"></div>
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
	import '@/style/home/home.scss';
	import * as echarts from 'echarts';
	import { home } from '@/services/apis/home.api'
	
	export default {
		name: 'home',
		data() {
			return {
			    data:{
                    balanceStall:"9999999.99",//档口结余
                    yBalanceStall:"9999999.99",//昨日结余
                    balanceCash:"9999999.99",//今日现金结余
                    balanceWeChat:"9999999.99",//今日微信结余
                    balanceAlipay:"9999999.99",//今日支付宝结余
                    balanceCard:"9999999.99",//今日银行卡结余
                },

				//黑名单图片高度
				blacklistStyle: {
					height: 0
				},
				dataResults:{}
			}
		},
		created(){		
				
		},
		methods: {
			getData(){
				var params = {
					page_size:'20',
					current_page:'1'
				};
				home.index(params).then(response => {
	                this.dataResults = response.data.results;
	                var echarts = require('echarts');
					var creditTimeCharts = echarts.init(document.getElementById('creditTimeStatistics'));
					this.setChartsTime(creditTimeCharts, "赊账最长周期排名Top7");
					var creditMoneyStatistics = echarts.init(document.getElementById('creditMoneyStatistics'));
					this.setChartsMoney(creditMoneyStatistics, "赊账金额最大排名Top7");
	            })

				//var BaseTransferEntity = new Object();
			    // BaseTransferEntity.object = Base64.encode(JSON.stringify(params));
			    // BaseTransferEntity.sign   = md5.hex(BaseTransferEntity.object + 'yi21fl');

			},
			//赊账最长周期排名Top7图
			setChartsTime: function(myCharts, title) {
				var xAxisData = [],
					seriesData = [];
				for (var i = 0; i < this.dataResults.credit_cycle_top.length; i++) {
					xAxisData.push(this.dataResults.credit_cycle_top[i].nickname);
					seriesData.push(this.dataResults.credit_cycle_top[i].cycle_days);
				}
				var option = {
					title: {
						text: title,
						textStyle: {
							color: "#333",
							fontSize: 14
						},
						x: 'center'
					},
					grid: {
						top: "40px",
						bottom: '30px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: xAxisData,
						axisTick: {
							alignWithLabel: true //坐标轴刻度不出头
						}
					},
					yAxis: {
						type: 'value',
						axisTick: {
							alignWithLabel: true //坐标轴刻度不出头
						},
						splitLine: { //去除分割线
							show: false
						}
					},
					series: [{
						barWidth: 30, //柱子宽度
						itemStyle: { //柱子样式
							normal: {
								color: "#32d57c"
							}
						},
						data: seriesData,
						type: 'bar'
					}]
				};
				myCharts.setOption(option);
			},
			//赊账金额最大排名Top7图
			setChartsMoney: function(myCharts, title) {
				var xAxisData = [],
					seriesData = [];
				for (var i = 0; i < this.dataResults.credit_max_top.length; i++) {
					xAxisData.push(this.dataResults.credit_max_top[i].nickname);
					seriesData.push(this.dataResults.credit_max_top[i].amount);
				}
				var option = {
					title: {
						text: title,
						textStyle: {
							color: "#333",
							fontSize: 14
						},
						x: 'center'
					},
					grid: {
						top: "40px",
						bottom: '30px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: xAxisData,
						axisTick: {
							alignWithLabel: true //坐标轴刻度不出头
						}
					},
					yAxis: {
						type: 'value',
						axisTick: {
							alignWithLabel: true //坐标轴刻度不出头
						},
						splitLine: { //去除分割线
							show: false
						}
					},
					series: [{
						barWidth: 30, //柱子宽度
						itemStyle: { //柱子样式
							normal: {
								color: "#32d57c"
							}
						},
						data: seriesData,
						type: 'bar'
					}]
				};
				myCharts.setOption(option);
			},
			//客户管理
			toCustomerManagement(){
				this.$router.push({
					name: 'customerManagement'
				})
			},
			//添加货主
			toOwner(){
				this.$router.push({
					name: 'owner'
				})
			},
			//点击添加货品
			toSystemRecord(){
				this.$router.push({
					path: '/system/record',
				})
			},
			//点击赊账还款
			toCreditOrderSZSZ(){
				this.$router.push({
					name: 'creditOrder'
				})
			},
			//点击黑名单
			onClickBlacklist: function() {
				this.$router.push({
					name: 'blackList'
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
			this.getData();
			this.blacklistStyle.height = (window.innerWidth - 185 - 40) / 15.04545454545455 + "px";
		},
	}
</script>