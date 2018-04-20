<template>
	<div class="analysis">
		<h2>经营分析</h2>
         <!-- 搜索查询 -->
            <div class="ub ub-pe" style="margin-right:4%;">
                    <div class="block">
                        结算时间&nbsp;
                     <el-date-picker
                    v-model="daytime"
                    type="date"
                    :clearable="clearable"
                    placeholder="选择日期"
                 
                    @change="getNewListS();getNewListZ()"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                        <!-- <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd">
                        </el-date-picker> -->

                </div>
            </div>
        <div class="analysisCont">

           
            <!-- 日收入展示 -->
            <div class="analysisAdd">
                <div class="analysisAdd_Head">
                    <h3>日收入</h3>
                   
                </div>
                <div class="line"></div>
                <div style="width:92%;margin:0 auto;display:table;padding:20px 0 0;">
                    <el-table
                        :data="tableData3.list"
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
                    <span style="float:right;padding:20px 0;">总计：{{tableData3.total}}</span>
                </div>
            </div>
            <!-- 日支出展示 -->
            <div class="analysisAdd" style="margin-top:40px;margin-bottom:40px;">
                <div class="analysisAdd_Head">
                    <h3>日支出</h3>
                </div>
                <div class="line"></div>
                <div style="width:92%;margin:0 auto;display:table;padding:20px 0 0;">
                    <el-table
                        :data="tableData4.list"
                        style="width: 100%">
                        <el-table-column
                        prop="trainsNum"
                        label="车次"
                    >
                        </el-table-column>
                        <el-table-column
                        prop="exp_time"
                        label="结算时间"
                    >
                        </el-table-column>
                        <el-table-column
                        prop="spendParty"
                        label="费用类型">
                        </el-table-column>
                        <el-table-column
                        prop="amount_sum"
                        label="费用总金额">
                        </el-table-column>
                    </el-table>
                    <span style="float:right;padding:20px 0;">总计：{{tableData4.total}}</span>
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
	export default {
        name:'analysis',
        data() {
			return {
                daytime:'',
                clearable:false,
                value1:'',
                daytimeOut:'',
				tableData3: [],
                tableData4: [],
                
                
			}
		},
		mounted() {
            
        },
        created(){
            this.asd();
            this.getNewListS();
            this.getNewListZ();
            
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
            getNewListS(){
                
                let params={
                    date:this.daytime
                }
                console.log(this.daytime)
                analysis.listS(params).then(response=>{
                    this.tableData3=response.data.results;
                   
                })
            },
             getNewListZ(){
                let params={
                    date:this.daytime
                }
                 console.log(this.daytime)
                analysis.listZ(params).then(response=>{
                    
                    if(response.data.results!=''){
                        for(var i=0;i<response.data.results.list.length;i++){
                        
                        if(response.data.results.list[i].trainsNum==''){
                            // 没有车次的数据
                           
                            response.data.results.list[i].spendParty='普通支出'
                            // 费用类型全部为普通支出，根据接口传递分flag进行区分
                        }
                        else{
                             response.data.results.list[i].exp_time=response.data.results.list[i].exp_time.substring(0, 10);
                             if(response.data.results.list[i].spendParty=='expend_ordinary'){
                                 response.data.results.list[i].spendParty='普通支出';
                            }
                            else{
                                response.data.results.list[i].spendParty='货主汇款';
                            }
                        }
                        }
                        this.tableData4=response.data.results;
                        }
                    else{
                        this.tableData4.list=[]
                    }
                })
            },
        }
	}
</script>