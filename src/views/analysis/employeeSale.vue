<template>
	<div class="analysis">
    <h2>经营分析 > 员工销售统计</h2>
         <!-- 搜索查询 -->
        </br>
        <div class="title clearfix m-t-10">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销售日期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <el-date-picker v-model="daytime" type="date" :clearable="clearable"
                          placeholder="选择日期"  value-format="yyyy-MM-dd">
            </el-date-picker>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="small" @click="getList('seller')">卖手员工</el-button>
            &nbsp;
            <el-button type="primary" size="small" @click="getList('financer')">财务员工</el-button>
        </div>

        <div class="analysisCont">

            <div class="analysisAdd" style="margin-bottom: 40px">
                <div class="analysisAdd_Head">
                    <h3>员工销售情况</h3>
                </div>
                <div class="line"></div>

              <div style="...">

                <table>
                  <tbody>

                    <tr style="font-weight:bold;text-align:center;font-size:14px;">
                      <td rowspan="2">员工</td>
                      <td rowspan="2">货品销售数（件）</td>
                      <td colspan="2" style="text-align:center;">销售金额（元）</td>
                    </tr>

                    <tr style="font-weight:bold;text-align:center;font-size:14px;">
                      <td>现结</td>
                      <td>赊账</td>
                    </tr>

                    <tr v-for="(row) in saleList">
                       <td>{{row.selName}}</td>
                       <td style="width: 200px" v-html="row.saleGoodsDetail">{{row.saleGoodsDetail}}</td>
                       <td style="width: 200px" v-html="row.knotSaleAmountDetail">{{row.knotSaleAmountDetail}}</td>
                       <td>{{row.creditSaleAmountDetail}}</td>
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
    border:1px solid rgb(197,205,202);
    border-width:1px 0 0 1px;
    /*margin:2px 0 2px 0;*/
    margin:10px 2px 2px 10px;
    border-collapse:collapse;
  }

  td
  {
    padding:3px;
    font-size:12px;
    border:1px solid rgb(197,205,202);
    border-width:0 1px 1px 0;
    margin:2px 0 2px 0;
    /*text-align:left;*/
    width:150px;
  }


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
                daytime:'',
                roleType:'',
                clearable:false,
                saleList: [],
            }
	     	},
		    mounted() {
        },
        created(){
            this.asd();
            this.getList("seller");
        },
        methods:{
            asd(){
                    Date.prototype.Format = function(fmt) { // author: meizz
                    var o = {
                    "M+" : this.getMonth() + 1, // 月份
                    "d+" : this.getDate(), // 日
                    "h+" : this.getHours(), // 小时
                    "m+" : this.getMinutes(), // 分
                    "s+" : this.getSeconds(), // 秒
                    "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
                    "S" : this.getMilliseconds()
                    // 毫秒
                    };
                    if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                    .substr(4 - RegExp.$1.length));
                    for ( var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                    }

                    this.daytime=new Date().Format("yyyy-MM-dd");//返回2017-03-12的日期格式
                },

          getList(roleTypeParam){

                let params={
                    date:this.daytime,
                    roleType:roleTypeParam
                }

                let loading = Vue.prototype.$loading({text:"数据加载中 . . ."});

                analysis.employeeSale(params).then(response=>{
                    this.saleList = response.data.results.saleList;
                    loading.close();
                })
            },

        }
	}
</script>
