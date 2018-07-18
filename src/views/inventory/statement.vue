<template>
	<div class="orderList">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="goBack()">返回</el-button> <label>车次管理/车次结算单打印预览</label>
		<!-- 内容 -->
		<div class="content"  style="width: 1200px;margin:0 auto">
			<!--startprint-->
			<div id="print">
			<h1 class='textCenter'>车次结算单</h1>
			<el-row>
  				<el-col :span="8">
  					<div class="grid-content">
						<label for="">货主：</label><span>{{dataList.shipName}}</span>
  					</div>
  				</el-col>
			  	<el-col :span="8">
			  		<div class="grid-content">
			  		</div>
			  	</el-col>
			  	<el-col :span="8">
			  		<div class="grid-content">
						<label for="">联系电话：</label><span>{{dataList.phone}}</span>
			  		</div>
			  	</el-col>
			  	<el-col :span="8">
  					<div class="grid-content">
						<label for="">车次：</label><span>{{dataList.trainsNum}}</span>
  					</div>
  				</el-col>
			  	<el-col :span="8">
			  		<div class="grid-content">
			  			<label for="">入库日期：</label><span>{{dataList.putStorageTime}}</span>
			  		</div>
			  	</el-col>
			  	<el-col :span="8">
			  		<div class="grid-content">
						<label for="">售完日期：</label><span>{{dataList.soldOutTime}}</span>
			  		</div>
			  	</el-col>
			</el-row>
			<table class='table-print m-t-20' cellspacing="0" cellpadding="0">
				<tr>
					<td>销售日期</td>
					<td>货品类别</td>
					<td>销售数量</td>
					<td>售卖件数</td>
					<td>小计金额</td>
				</tr>
				<tr v-for='item in dataList.day_sellinfo' :key="item.id">
					<td>{{item.sel_time}}</td>
					<td>{{item.goodName}}</td>
					<td>{{item.sel_quantity |format}}</td>
					<td>{{item.sel_pie |format}}</td>
					<td>{{item.com_amount | format}}</td>
				</tr>
			</table>
			<table class='table-print' cellspacing="0" cellpadding="0">
				<tr>
					<td style="text-align: right;margin-top: 0">金额合计：{{dataList.pay_amount}}</td>
				</tr>
			</table>
			<table class='table-print' cellspacing="0" cellpadding="0">
				<tr>
					<td colspan="4">报损总计：{{dataList.damage}}</td>
				</tr>
				<tr v-for="(item,index) in rowNum">

					<td>{{dataList.other_amount[index*2].expendName}}</td>
					<td>{{dataList.other_amount[index*2].amount}}</td>
					<td><span v-if="dataList.other_amount[index*2+1]">{{dataList.other_amount[index*2+1].expendName}}</span></td>
					<td><span v-if="dataList.other_amount[index*2+1]">{{dataList.other_amount[index*2+1].amount}}</span></td>
				</tr>
				<tr>
					<td>回扣</td>
					<td>{{dataList.rebates}}</td>
					<td>固定代销费</td>
					<td>{{dataList.marketingCost}}</td>
				</tr>
				<tr>
					<td>车次提成</td>
					<td>{{dataList.commission}}</td>
					<td>费用总计</td>
					<td>{{dataList.amount_total}}</td>
				</tr>
				<tr>
					<td>应付金额</td>
					<td colspan="3">{{dataList.payAmount}}</td>
				</tr>
			</table>
			</div>
			<!--endprint-->
			<div class="clearfix m-t-20">
				<el-button type="text" class="floatRight" @click="print"><i class="el-icon-printer" style="font-size: 20px"></i> 打印</el-button>
			</div>
		</div>
	</div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
@page 
    {
        size:  auto;   /* auto is the initial value */
        margin: 5mm;  /* this affects the margin in the printer settings */
    }

    html
    {
        background-color: #FFFFFF; 
        margin: 10pxpx;  /* this affects the margin on the html before sending to printer */
    }

    body
    {
    
        margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
    }
</style>

<script>
	import '@/style/inventory/inventory.scss';
	import { train } from '@/services/apis/train';
	export default {
		data() {
			return {
				dataList:{
					name:'钱少',
					phone:'13715154952',
					trains_number:'2018-01-01 钱多多 车次01',
					put_storage_time:'2018-01-01',
					sold_out_time:'2018-01-01',
					day_sellinfo:[],
					pay_amount:2000,
					damage:'',
					rebates:100,
					marketing_cost :100,
					commission:100,
					other_amount:'',
					amount_total:600,
					pay_amount:800,
				}
			}
		},
		mounted() {
			
			this.getData();
		},
		methods: {
			
			getData(){
				var params = {
                    tid:this.$route.params.tid,
                }
				train.finalStatement(params)
                .then(response => {
                    this.dataList = response.data.results
                })	
			},
			print(){
				var bdhtml = window.document.body.innerHTML;//获取当前页的html代码   
 
		        var prnhtml = document.getElementById('print').innerHTML; 
		        window.document.body.innerHTML = prnhtml;  
				window.print();  
				// if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
				// this.remove_ie_header_and_footer();
				// }
				// else{
				// 	window.print();
				// }
				
		        window.document.body.innerHTML = bdhtml;
		        window.location.reload();
		        //this.$router.go(0)
			},
             remove_ie_header_and_footer() {
                var hkey_path;
                hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
                try {
                var RegWsh = new ActiveXObject("WScript.Shell");
                    RegWsh.RegWrite(hkey_path + "header", "");
                    RegWsh.RegWrite(hkey_path + "footer", "");
                 } 
                    catch (e) {
                    }
                },
			//返回
			goBack() {
				this.$router.push({name:'train'});
			}
		},
		computed: {
			rowNum() {
		    	var l = this.dataList.other_amount.length;
		    	if (l%2 == 0) return  l/2;
		    	else return Math.ceil(l/2);
		    },
		},
		updated(){
			
		}
	}
</script>