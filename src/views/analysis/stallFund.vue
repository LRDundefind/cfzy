<template>
  <div class="analysis">
    <h2>经营分析 > 档口资金统计</h2>

    <div class="title clearfix m-t-10">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button  type="primary" size="small" @click="getList('curDay')">当日</el-button>
      <el-button  type="primary" size="small" @click="getList('curWeek')">本周</el-button>
      <el-button  type="primary" size="small" @click="getList('curMonth')">本月</el-button>
    </div>

    <div class="analysisCont">
      <div class="analysisAdd">
       <div class="analysisAdd_Head">
         <h3>{{fundTitle}}资金收支情况</h3>
        </div>
        <div class="line"></div>
        <div style="...">

          <table>
            <tbody>

              <tr>
                <td colspan="5" style="font-weight:bold;text-align:center;font-size:16px;">{{fundTitle}}资金情况</td>
              </tr>

              <tr style="font-weight:bold;">
                <td rowspan="7" style="text-align:center;">
                  {{fundTitle}}收款</td>
                <td colspan="2" style="text-align:center;">现结收款</td>
                <td colspan="2" style="text-align:center;">赊账收款</td>
              </tr>

              <tr>
                <td>现金</td>
                <td>{{fundReceiveData.knotCashAmountTotal}}</td>
                <td>现金</td>
                <td>{{fundReceiveData.newReceiveCashAmountTotal}}</td>
              </tr>
              <tr>
                <td>微信</td>
                <td>{{fundReceiveData.knotWechatAmountTotal}}</td>
                <td>微信</td>
                <td>{{fundReceiveData.newReceiveWechatAmountTotal}}</td>
              </tr>
              <tr>
                <td>支付宝</td>
                <td>{{fundReceiveData.knotAlipayAmountTotal}}</td>
                <td>支付宝</td>
                <td>{{fundReceiveData.newReceiveAlipayAmountTotal}}</td>
              </tr>
              <tr>
                <td>银行卡</td>
                <td>{{fundReceiveData.knotCardAmountTotal}}</td>
                <td>银行卡</td>
                <td>{{fundReceiveData.newReceiveCardAmountTotal}}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;text-align:center;">小计</td>
                <td>{{knotTotal}}</td>
                <td style="font-weight:bold;text-align:center;">小计</td>
                <td>{{newReceiveTotal}}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;text-align:center;">{{fundTitle}}收款合计</td>
                <td colspan="3">{{fundReceiveTotal}}</td>
              </tr>


              <tr style="font-weight:bold;">
                <td :rowspan="expendRowCount" style="text-align:center;">{{fundTitle}}付款</td>
                <td colspan="4" style="text-align:center;">货主汇款（上交款）</td>
              </tr>

              <tr>
                <td>现金</td>
                <td>{{remittanceData.cashAmountTotal}}</td>
                <td>微信</td>
                <td>{{remittanceData.wechatAmountTotal}}</td>
              </tr>
              <tr>
                <td>支付宝</td>
                <td>{{remittanceData.alipayAmountTotal}}</td>
                <td>银行卡</td>
                <td>{{remittanceData.cardAmountTotal}}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;text-align:center;">货主汇款小计</td>
                <td colspan="3">{{remittanceTotal}}</td>
              </tr>

              <tr style="font-weight:bold;">
                <td colspan="4" style="text-align:center;">货主垫付</td>
              </tr>

              <tr v-for="(row) in tfAdvancesData">
                <td>{{row.expendName}}</td>
                <td>{{row.payAmountTotal}}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;text-align:center;">货主垫付款小计</td>
                <td colspan="3">{{tfAdvancesTotal}}</td>
              </tr>

              <tr style="font-weight:bold;">
                <td colspan="4" style="text-align:center;">档口开支</td>
              </tr>

              <tr v-for="(row) in expendData">
                <td>{{row.expendName}}</td>
                <td colspan="3">{{row.payAmountTotal}}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;text-align:center;">档口开支小计</td>
                <td colspan="3">{{expendTotal}}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;text-align:center;">{{fundTitle}}付款合计</td>
                <td colspan="3">{{stallFundTotal}}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;text-align:center;">往期结余</td>
                <td colspan="4">{{yesBalance}}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;text-align:center;">{{fundTitle}}结余</td>
                <td colspan="4">{{todayBalance}}</td>
              </tr>

            </tbody>
          </table>

          <br/>

          <table>
            <tbody>

            <tr>
              <td colspan="6" style="font-weight:bold;text-align:center;font-size:16px;">{{fundTitle}}收支情况</td>
            </tr>
            <tr>
              <td rowspan="3" style="font-weight:bold;text-align:center;">{{fundTitle}}档口收入</td>
              <td>固定代销费</td>
              <td>包装费</td>
              <td>过磅费</td>
              <td>三轮费</td>
              <td>提成</td>
            </tr>
            <tr>
              <td>{{incomeData.marketingCostTotal}}</td>
              <td>{{incomeData.packCostTotal}}</td>
              <td>{{incomeData.weightCostTotal}}</td>
              <td>{{incomeData.deliveryCostTotal}}</td>
              <td>{{incomeData.commissionTotal}}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;text-align:center;">{{fundTitle}}档口收入合计</td>
              <td colspan="4">{{incomeTotal}}</td>
            </tr>

            <tr v-for ="(item,index) in expendAllData">
              <td  v-if = "index == 0"  :rowspan="expendAllData.length + 1" style="font-weight:bold;text-align:center;">{{fundTitle}}档口支出</td>

              <td>{{item.expendName}}</td>
              <td colspan="5">{{item.payAmountTotal}}</td>
            </tr>

            <tr>
              <td style="font-weight:bold;text-align:center;">{{fundTitle}}档口支出合计</td>
              <td colspan="4">{{expendAllTotal}}</td>
            </tr>

            <tr>
              <td style="font-weight:bold;text-align:center;">{{fundTitle}}档口利润</td>
              <td colspan="5">{{stallGain}}</td>
            </tr>
            </tbody>
          </table>
          <br/>

        </div>
      </div>
    </div>

  </div>

</template>
<style scoped>

  table
  {
    /*border:1px solid rgb(245,245,245);*/
    /*border:1px solid rgb(64,158,255);*/
    /*border:1px solid rgb(234,234,234); */
    border:1px solid rgb(197,205,202);
    border-width:1px 0 0 1px;
    /*margin:2px 0 2px 0;*/
    margin:10px 10px 2px 10px;
    border-collapse:collapse;
  }

  td
  {
    padding:3px;
    font-size:12px;
    /*border:1px solid rgb(234,234,234); */
    border:1px solid rgb(197,205,202);
    border-width:0 1px 1px 0;
    margin:2px 0 2px 0;
    text-align:left;
    width:150px;
  }

/*  th
  {
    font-weight:600;
    backgroud-color:#F4F4F4;

    color:#909399;
    height:40px;
    padding:3px;
    font-size:14px;
    border:1px solid rgb(64,158,255);
    border-width:1px 1px 1px 1px;
    margin:2px 0 2px 0;
  }*/

  .analysis{
    background: #fff;
    width: 100%;
    height: 100%;
  }
  .analysisCont{
    overflow: hidden;
    background: #fff;
    padding-top: 30px;
  }
  .analysis h2{
    padding: 10px;
    font-size: 18px;
    font-weight: 400;
  }
  .analysisAdd{
    width: 92%;
    margin: 0 auto;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
  }
  .analysisAdd_Head{
    height: 70px;
    border-bottom: #f5f5f5;
    line-height: 70px;
    width: 100%;
    margin: 0 auto;
  }
  .analysisAdd_Head h3{
    float: left;
    padding-left: 20px;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #dfdfdf;
  }

</style>

<script>
  import { analysis } from '@/services/apis/analysis'
  import Vue from 'vue'
  export default {
    name:'analysis',
    data() {
      return {
        fundTitle:'当日',
        dateType:'curDay',
        clearable:false,
        fundReceiveData: [],
        knotTotal:0,
        newReceiveTotal:0,
        receiveFundTotal:0,
        fundReceiveTotal:0,
        remittanceData: [],
        remittanceTotal :0,
        tfAdvancesData: [],
        tfAdvancesTotal:0,
        expendData: [],
        expendTotal:0,
        stallFundTotal:0,
        expendRowCount:0,
        incomeData: [],
        incomeTotal:0,
        expendAllHtmlRows:"",
        expendAllData:[],
        expendAllTotal: 0,
        stallGain:0,
        yesBalance:0,
        todayBalance:0,

      }
    },
    mounted() {

    },
    created(){
      this.getList("curDay");
    },
    methods:{

      getList(dateTypeParam)
      {
        let params = {
          dateType : dateTypeParam
        }

        let loading = Vue.prototype.$loading({text:"数据加载中 . . ."});

        analysis.stallFundReceive(params).then(response=>{

          this.fundReceiveData = response.data.results.fundReceiveData;
          this.knotTotal = response.data.results.knotTotal;
          this.newReceiveTotal = response.data.results.newReceiveTotal;
          this.fundReceiveTotal = response.data.results.fundReceiveTotal;
          this.yesBalance = response.data.results.yesBalance;

          if (dateTypeParam=='curDay') this.fundTitle = '当日';
          if (dateTypeParam=='curWeek') this.fundTitle = '本周';
          if (dateTypeParam=='curMonth') this.fundTitle = '本月';

          this.todayBalance = this.yesBalance + this.fundReceiveTotal - this.stallFundTotal;

        })

        analysis.stallFundPay(params).then(response=>{

          this.remittanceData = response.data.results.remittanceData;
          this.remittanceTotal = response.data.results.remittanceTotal;

          this.tfAdvancesData = response.data.results.tfAdvancesData;
          this.tfAdvancesTotal = response.data.results.tfAdvancesTotal;

          this.expendData = response.data.results.expendData;
          this.expendTotal = response.data.results.expendTotal;

          this.stallFundTotal = response.data.results.stallFundTotal;

          this.expendRowCount = 9 + this.tfAdvancesData.length + this.expendData.length;

//         this.expendAllHtmlRows = response.data.results.expendAllHtmlRows;

          this.expendAllData = response.data.results.expendAllData;
          this.expendAllTotal = response.data.results.expendAllTotal;

          this.todayBalance = this.yesBalance + this.fundReceiveTotal - this.stallFundTotal;

          this.stallGain = this.incomeTotal - this.expendAllTotal;

        })

        analysis.stallStallIncome(params).then(response=>{

          this.incomeData = response.data.results.incomeData;
          this.incomeTotal = response.data.results.incomeTotal;

          this.stallGain = this.incomeTotal - this.expendAllTotal;

          loading.close();

        })

      }
    }
  }
</script>
