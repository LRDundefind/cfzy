<template>
  <div class="analysis">
    <h2>经营分析 > 销售统计</h2>

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

      <!-- 日收入展示 -->
      <div class="analysisAdd">
        <div class="analysisAdd_Head">
          <!--<h3>日销售统计</h3>-->
          <h3>{{modelTitle}}</h3>
        </div>

        <div class="line"></div>
        <div style="width:92%;margin:0 auto;display:table;padding:20px 0 0;">
          <el-table
            :data="tableData.list"
            height="240"
            style="width: 100%">
            <el-table-column
              prop="shipName"
              label="货主"
            >
            </el-table-column>
            <el-table-column
              prop="payment"
              label="货款"
            >
            </el-table-column>
            <el-table-column
              prop="guobangfei"
              label="过磅费">
            </el-table-column>
            <el-table-column
              prop="fare"
              label="垫付三轮">
            </el-table-column>
            <el-table-column
              prop="packageing"
              label="包装费">
            </el-table-column>
            <el-table-column
              prop="total"
              label="小计">
            </el-table-column>
          </el-table>
          <span style="float:right;padding:20px 0;">总计：{{tableData.total}}</span>
        </div>
      </div>

    </div>
  </div>

</template>
<style scoped>
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
        modelTitle:'日销售统计',
        dateType:'curDay',
        clearable:false,
        tableData: []
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

        analysis.listSale(params).then(response=>{
          this.tableData = response.data.results;

          loading.close();

          if (dateTypeParam=='curDay') this.modelTitle='日销售统计';
          if (dateTypeParam=='curWeek') this.modelTitle='周销售统计';
          if (dateTypeParam=='curMonth') this.modelTitle='月销售统计';

        })
      }
    }
  }
</script>
