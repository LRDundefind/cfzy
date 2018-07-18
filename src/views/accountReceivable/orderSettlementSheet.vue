<template>
	<div class="orderSettlementSheet f-s-14 c-3">
		<div class="ub ub-ac">
			<el-button @click="goBack()" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
			<div class="m-l-20">订单结算单</div>
		</div>
		<div id="print" class="ub ub-pc ">
			<div id="orderSettlementSheet-print" v-bind:style="printStyle" class="b-c-f printLayout p-30">
				<div class="textCenter f-s-28 title">{{listData.company_info.compayName}}</div>
				<div class="textCenter">{{listData.company_info.markName}}</div>

				<div class="ub space">
					<div v-show="listData.customer_info.nickname !=''" class="ub-f1">客户：{{listData.customer_info.nickname}}&nbsp;—&nbsp;{{listData.customer_info.phone}}</div>
					<div v-show="listData.customer_info.nickname =='' && listData.customer_info.phone ==''" class="ub-f1">客户：临时客户</div>
                    <div v-show="listData.order_info.settleTime!=''">时间：{{listData.order_info.settleTime}}</div>
                    <div v-show="listData.order_info.settleTime==''">时间：{{listData.order_info.placeOrderTime}}</div>

				</div>
				<!-- <div class="">购货地址：{{listData.customer_info.address}}</div> -->
				<div class="ub space">
					<div class="ub-f1">车次：{{listData.order_info.trainsNum}}</div>
                    <div>订单编号：{{listData.order_info.orderNo}}</div>

                </div>
				<!--<table class='table-print m-t-10' cellspacing="0" cellpadding="0">-->
					<!--<tr>-->
						<!--<td>品名</td>-->
						<!--<td>件数</td>-->
                        <!--<td>数量</td>-->
                        <!--<td>单价</td>-->
                        <!--<td>金额</td>-->
                        <!--<td>包装费</td>-->
					<!--</tr>-->
					<!--<tbody>-->
						<!--&lt;!&ndash;<tr v-for="item in listData.order_info.goods">&ndash;&gt;-->
							<!--&lt;!&ndash;<td>{{item.goodName}}</td>&ndash;&gt;-->
							<!--&lt;!&ndash;<td>测试件数</td>&ndash;&gt;-->
                            <!--&lt;!&ndash;<td>{{item.good_quantity}}</td>&ndash;&gt;-->

                            <!--&lt;!&ndash;<td>{{item.price}}</td>&ndash;&gt;-->
                            <!--&lt;!&ndash;<td>{{item.goodAmount}}</td>&ndash;&gt;-->

                            <!--&lt;!&ndash;<td>{{item.packCost}}</td>&ndash;&gt;-->
						<!--&lt;!&ndash;</tr>&ndash;&gt;-->
					<!--</tbody>-->
				<!--</table>-->


                <ul class="demoBox p-t-10" >

                    <li class="ub textCenter">
                        <div class="ub-f1">品名</div>
                        <div class="ub-f1">件数</div>
                        <div class="ub-f1">数量</div>
                        <div class="ub-f1">单价</div>
                        <div class="ub-f1">金额</div>
                        <div class="ub-f1">包装费</div>
                    </li>

                    <li class="ub textCenter" v-for='item in listData.order_info.goods' :key="item.id">
                        <div class="ub-f1">{{item.goodName}}</div>
                        <div class="ub-f1">{{item.goodNum}}</div>
                        <div class="ub-f1">{{item.good_quantity}}</div>

                        <div class="ub-f1">{{item.price |format}}</div>
                        <div class="ub-f1">{{item.goodAmount |format}}</div>
                        <div class="ub-f1">{{item.packCost |format}}</div>
                    </li>

                    <li class="ub " style="border-top: 1px solid #ebeef5;">
                        <div class="ub-f4 p-l-20">合计</div>
                        <div class="ub-f1 textCenter">{{listData.order_info.goodCost|format}}</div>
                        <div class="ub-f1 textCenter">{{listData.order_info.packCost|format}}</div>
                    </li>

                </ul>


				<!-- <el-table :data="listData.order_info.goods" class="m-t-30">
					<el-table-column prop="goodName" label="货品类别">
					</el-table-column>
					<el-table-column align="center" prop="price" label="单价">
					</el-table-column>
					<el-table-column align="center" prop="good_quantity" label="数量">
					</el-table-column>
					<el-table-column align="center" prop="packCost" label="包装费">
					</el-table-column>
					<el-table-column align="center" prop="goodAmount" label="小计">
					</el-table-column>
				</el-table> -->
				<div class="ub  p-l-20 space" >
					<div class="ub-f1">过磅费：{{listData.order_info.weighCost|format}}</div>
					<div class="ub-f1 ">三轮车费：{{listData.order_info.deliveryCost|format}}</div>
					<!--<div class="ub-f1 textRight">包装费：{{listData.order_info.packCost}}</div>-->
				</div>
				<div class="ub  p-l-20 p-b-10" style="border-bottom: 1px #666 solid;">
					<div class="ub-f1 ">应付：{{listData.order_info.salesAmount|format}}</div>
					<div class="ub-f1 ">实付：{{listData.order_info.actualAmount|format}}</div>
				</div>

                <div class="ub  p-l-20 space" >
                    <div class="ub-f1">产地：{{listData.order_info.origin}}</div>
                    <div class="ub-f1 ">档位前欠：{{listData.customer_info.frontArrears| format}}</div>

                </div>

                <div class="ub  p-l-20 space" >
                    <div class="ub-f1">销售员：{{listData.order_info.selName}}</div>
                    <div class="ub-f1 ">档位累欠：{{listData.customer_info.totalArrears| format}}</div>

                </div>

				<div class="textCenter  p-l-20 space">地址：{{listData.company_info.address}}</div>
				<div class="textCenter  p-l-20 space">联系电话：{{listData.company_info.phone}}</div>
			</div>
		</div>
        <div v-show="roleId == 'role_finance_sell'">
            <el-button @click="toSalesOrder()" class="settlement-btn1 print-btn1" type="success">继续开单</el-button>
            <el-button @click="onClickPrint()" class="settlement-btn print-btn" type="success">打印</el-button>
        </div>
s
        <div v-show="roleId != 'role_finance_sell'">
            <el-button @click="onClickPrint()" class="settlement-btn print-btn" type="success">打印</el-button>
        </div>

	</div>
</template>

<script>
	import '@/style/accountReceivable/orderSettlementSheet.scss';
	import { account } from '@/services/apis/account';
	import Cookies from 'js-cookie'
	export default {
		data() {
				return {
					//gearName: JSON.parse(Cookies.get('gid')).gearName,
					//markName: JSON.parse(Cookies.get('gid')).markName,
					printStyle: {
						//					width: 0
					},
					listData:{
						customer_info:{},
						order_info:{},
						company_info:{}
					},
                    roleId: Cookies.get('roleId'),  //角色
                }
			},
			methods: {
				//打印
				onClickPrint() {
					var bdhtml = window.document.body.innerHTML;//获取当前页的html代码 
					 
			        var prnhtml = document.getElementById('print').innerHTML; 

			        window.document.body.innerHTML = prnhtml; 
			        window.document.body.getElementsByClassName('title')[0].style.fontSize = '16px';
			        window.document.body.getElementsByClassName('printLayout')[0].style.padding = '0';
			        window.document.body.style.fontSize = '10px'; 
			        //console.log(window.document.body)
			        //document.getElementById('print').style.fontSize = '12px';  
			         window.print();
					//  if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
                    // this.remove_ie_header_and_footer();
					// }
					// else{
					// 	  window.print();
					// }
                  
					
			        window.document.body.innerHTML = bdhtml;
			        window.location.reload();
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
				//获取结算单信息
				getData(){
					account.doc({oid:this.$route.params.oid})
	                .then(response => {
	                    this.listData = response.data.results;
		            })
				},
				//返回
				goBack() {
					if (this.$route.query.type=='order_credit') {
						this.$router.push({path:'/creditOrder/SZDD'});
					}else{
						this.$router.push({name:'order'});
					}		
				},

                //跳转到销售开单
                toSalesOrder(){
                    this.$router.push({
                        path: '/salesOrder/sales',
                    })
                },
			},
			mounted() {
				this.getData();
			}
	}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .printLayout{
        font-size: 18px;
    }

    .space{
        padding-top: 2px;
    }

    ul{
        li:first-child{
            border-bottom: 1px #666 solid;

        }
        li{
            font-size: 16px;
            padding: 5px 0;
            list-style-type: none;
            color: #606266;
            word-break: break-all;
        }
        li:last-child{
        }
    }


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
.table-print tr td{
	padding:4px 5px;
}
</style>