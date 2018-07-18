<template>
  <div class="analysis">
    <h2>经营分析 > 收款赊账统计</h2>

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
          <h3>{{creditReceiveTitle}}</h3>
        </div>

        <div class="line"></div>
        <div style="width:92%;margin:0 auto;display:table;padding:20px 0 0;">
          <el-table
            :data="creditReceiveTableData.list"
            height="240"
            style="width: 100%">
            <el-table-column
              prop="shipName"
              label="货主"
            >
            </el-table-column>
            <el-table-column
              prop="stayStillAmountTotal"
              label="未收赊款"
            >
            </el-table-column>
            <el-table-column
              prop="knotAmountTotal"
              label="现结收款">
            </el-table-column>
            <el-table-column
              prop="newCreditAmountTotal"
              label="新赊账款">
            </el-table-column>
            <el-table-column
              prop="newReceiveAmountTotal"
              label="新收账款">
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="analysisAdd">

        <div class="analysisAdd_Head">
          <h3>未结赊账统计</h3>
        </div>

        <div class="line"></div>
        <br style="...">

          <table>
            <thead>
              <tr>
                <th v-for="(headerTitle) in headerTitleList" style ="color:#909399;height:40px;width:150px;padding:3px;font-size:14px;font-weight:bold; border:1px solid rgb(197,205,202);border-width:1px 1px 1px 1px;margin:2px 0 2px 0;text-align:left">
                  {{headerTitle}}
                </th>
              </tr>
            </thead>

            <tbody v-html="rowlist">
            {{rowlist}}
            </tbody>

            <tr >
              <th align="left" v-for ="(footerTitle,index) in footerTitleList" style ="color:#909399;height:40px;width:150px;padding:3px;font-size:14px;font-weight:bold; border:1px solid rgb(197,205,202);border-width:1px 1px 1px 1px;margin:2px 0 2px 0;text-align:left">
                {{footerTitle}}
              </th>
            </tr>
          </table>

        </br>

        </div>
      </div>

      <br/>
      <br/>

    </div>

  </div>

</template>
<style scoped>

  table
  {

    border:1px solid rgb(197,205,202);
    border-width:1px 0 0 1px;
    margin:4px 2px 2px 10px;
    text-align:center;
    border-collapse:collapse;
  }

  td
  {
    padding:3px;
    font-size:12px;
    border:1px solid rgb(197,205,202);
    border-width:0 1px 1px 0;
    margin:2px 0 2px 0;
    text-align:left;
  }

  th
  {
    border:1px solid rgb(197,205,202);
    text-align:left;
    font-weight:400;
    backgroud-color:#F4F4F4;
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
        creditReceiveTitle:'日收款赊账',
        dateType:'curDay',
        clearable:false,
        creditReceiveTableData: [],
        headerTitleList: [],
        footerTitleList: [],
        rowlist:[]
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

        analysis.listCreditReceive(params).then(response=>{
          this.creditReceiveTableData = response.data.results;

          if (dateTypeParam=='curDay') this.creditReceiveTitle = '日收款赊账';
          if (dateTypeParam=='curWeek') this.creditReceiveTitle = '周收款赊账';
          if (dateTypeParam=='curMonth') this.creditReceiveTitle = '月收款赊账';
        })

        analysis.listCreditNotReceive(params).then(response=>{
          this.rowlist = response.data.results.rowlist;
          this.headerTitleList = response.data.results.headertitlelist;
          this.footerTitleList = response.data.results.footertitlelist;

          loading.close();
        })

      }
    }
  }
</script>
