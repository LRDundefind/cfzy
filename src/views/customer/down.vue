<template>
    <div class="customDetails f-s-14 c-3">
        <div class="name">
            <el-button type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
            <span class="title c-3 f-s-14">催账单打印预览</span>
        </div>
        <div class="information b-c-f plf20" >
                <div id="print">
                    <h2 class="ter p10">{{dangweiName}}催账单</h2>
                    <div class="ub ub-pc">
                        <div class="ub-f1 h25">客户名称：{{listHead.nickname}}</div>
                        <div class="ub-f1 ter h25" v-if="listHead.shipName != ''">货主名称：{{listHead.shipName}}</div>

                        <div class="ub-f1 tri h25" >联系电话：{{listHead.phone}}</div>
                    </div>
                    <div class="ub ub-pc">
                        <div class="ub-f1 h25">银行：{{listHead.bankName}}</div>
                        <div class="ub-f1 ter h25" >户名：{{listHead.bankStatus}}</div>
                        <div class="ub-f1 tri h25" >卡号：{{listHead.bankNum}}</div>
                    </div>
                    <table cellspacing="0">
                        <thead>
                            <tr>
                                <th>订单编号</th>
                                <th>销售日期</th>
                                <th>货品</th>
                                <th>数量</th>
                                <th>单价</th>
                                <th>货款</th>
                                <th>包装费</th>
                                <th>过磅费</th>
                                <th>三轮车费</th>
                                <th>销售金额</th>
                                <th>累计</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData6" :key="item.id">
                                <td v-if="item.orderNo!==false" :rowspan="item.rowspan">{{ item.orderNo }}</td>
                                <td v-if="item.placeOrderTime!==false" :rowspan="item.rowspan">{{ item.placeOrderTime }}</td>
                                <td >{{ item.goodName }}</td>
                                <td >{{ item.good_quantity }}</td>
                                <td >{{ item.price }}</td>
                                <td >{{ item.goodAmount }}</td>
                                <td >{{ item.packCost }}</td>
                                <td v-if="item.weighCost!==false" :rowspan="item.rowspan" >{{ item.weighCost }}</td>
                                <td v-if="item.deliveryCost!==false" :rowspan="item.rowspan" >{{ item.deliveryCost }}</td>
                                <td v-if="item.salesAmount!==false" :rowspan="item.rowspan" >{{ item.salesAmount }}</td>
                                <td v-if="item.grand_total!==false" :rowspan="item.rowspan" >{{ item.grand_total }}</td>
                            </tr>
                            <tr>
                                <td >合计</td>
                                <td ></td>
                                <td></td>
                                <td>{{listHead.total_amount}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{{listHead.total_salesAmount}}</td>
                                <td>{{listHead.total_grand}}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- <el-table
                        :data="tableData6"
                        :span-method="objectSpanMethod"
                        border
                        style="width: 100%; margin-top: 20px">
                        <el-table-column
                            prop="orderNo"
                            label="订单编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="placeOrderTime"
                            label="销售日期">
                        </el-table-column>
                        <el-table-column
                            prop="goodName"
                            label="货品名称">
                        </el-table-column>
                        <el-table-column
                            prop="good_quantity"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="price"
                            label="单价">
                        </el-table-column>
                        <el-table-column
                            prop="goodAmount"
                            label="货款">
                        </el-table-column>
                        <el-table-column
                            prop="packCost"
                            label="包装费">
                        </el-table-column>
                        <el-table-column
                            prop="weighCost"
                            label="过磅费">
                        </el-table-column>
                        <el-table-column
                            prop="deliveryCost"
                            label="三轮车费">
                        </el-table-column>
                        <el-table-column
                            prop="salesAmount"
                            label="销售金额">
                        </el-table-column>
                        <el-table-column
                            prop="grand_total"
                            label="累计">
                        </el-table-column>
                    </el-table>  -->
                    <!-- <ul  class="lista">
                        <li>
                            <span>订单编号</span>
                            <span style="width:200px;">销售日期</span>
                            <span>货品费用</span>
                            <span>数量</span>
                            <span>单价</span>
                            <span>货款</span>
                            <span>包装费</span>
                            <span>过磅费</span>
                            <span>三轮车费</span>
                            <span>销售金额</span>
                            <span>累计</span>
                        </li>
                        <li v-for="item in listHead.list" :key="item.id">
                            <ul>
                                <li v-for="x in item.goods" :key="x.id">
                                    <span>{{item.orderNo}}</span>
                                    <span style="width:200px;">{{item.placeOrderTime}}</span>
                                    <span>{{x.goodName}}</span>
                                    <span>{{x.good_quantity}}</span>
                                    <span>{{x.price}}</span>
                                    <span>{{x.goodAmount}}</span>
                                    <span>{{x.packCost}}</span>
                                    <span>{{item.weighCost}}</span>
                                    <span>{{item.deliveryCost}}</span>
                                    <span>{{item.salesAmount}}</span>
                                    <span>{{item.grand_total}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul> -->
                </div>
                <h3 class="goDy" @click="print">打印</h3>
        </div>

    </div>
</template>
<style scoped>
@page 
    {
        size:  auto;   /* auto is the initial value */
        margin: 5mm;  /* this affects the margin in the printer settings */
    }

    html
    {
        background-color: #FFFFFF; 
        margin: 10px;  /* this affects the margin on the html before sending to printer */
    }

    body
    {
    
        margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
    }
.p10{
    padding: 10px 0;
}
.information{
   overflow: hidden;
}
.goDy{
    float: right;
    padding: 10px 0;
    cursor: pointer;
}
.h25{
    height: 25px;
}
table{
    width: 100%;
}
th{
    text-align: center;
    border: 1px solid;
    height: 50px;
}
td{
    text-align: center;
    border: 1px solid;
    height: 50px;
}
.tri{
    text-align: right;
}
.ter{
    text-align:center;
}
.plf20{
    padding: 0 180px;
}
.lista{
    display: table;
}
.lista li{
    display: table;
}
.hidden{
    display: none;
}
.lista li span{
    display: block;
    width: 120px;
    height: 50px;
    float: left;
    border: 1px solid;
    text-align: center;
    line-height: 50px;
}
</style>


<script>
    import '@/style/customer/customDetails.scss';
    import {customer} from '@/services/apis/customer.js'
     import Cookies from 'js-cookie'
    export default {
        name: 'customDetails',
        data() {
            return {
                id: '',
                bearerId:'',
                dangweiName:'',
                listHead:{},
                tableData6:[]
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.bearerId = this.$route.params.bearerId;
            this.dangweiName=JSON.parse(Cookies.get('gid')).gearName;
            //初始化数据
            this.getInfo(this.id);
        },
        methods: {
            //获取催账单详情
            getInfo(){
                let params = {
                    cid: this.id,
                    bearerId:this.bearerId,
                };

                customer.downLIST(params).then(response =>{     
                    this.listHead=response.data.results;
                    var goodsList=[];
                    for (var i = 0; i < this.listHead.list.length; i++) {
                          var list=this.listHead.list[i];
                          for (var j = 0; j <list.goods.length; j++) {
                              var goods=list.goods[j];
                              if(j==0){
                                goods.rowspan=list.goods.length;
                          goods.orderNo=list.orderNo;
                          goods.placeOrderTime=list.placeOrderTime;
                          goods.weighCost=list.weighCost;
                          goods.deliveryCost=list.deliveryCost;
                          goods.salesAmount=list.salesAmount;
                          goods.grand_total=list.grand_total;
                          }else {

                          goods.orderNo=false;
                          goods.placeOrderTime=false;
                          goods.weighCost=false;
                          goods.deliveryCost=false;
                          goods.salesAmount=false;
                          goods.grand_total=false;
                          }
                          goodsList.push(goods);
                          }
                      }  
                    this.tableData6=goodsList;
                    // 数据处理合并
                    // let newlisr=[];
                    // for(var i=0,len = this.listHead.list.length; i<this.listHead.list.length;i++){
                    //       var newGoods = []
                    //         for(var j = 0,len2 = this.listHead.list[i].goods.length;j<len2;j++){
                    //             this.listHead.list[i].goods[j]['weighCost'] = this.listHead.list[i]['weighCost']; 
                    //             this.listHead.list[i].goods[j]['grand_total'] = this.listHead.list[i]['grand_total']; 
                    //             this.listHead.list[i].goods[j]['salesAmount'] = this.listHead.list[i]['salesAmount']; 
                    //             this.listHead.list[i].goods[j]['deliveryCost'] = this.listHead.list[i]['deliveryCost'];
                    //             this.listHead.list[i].goods[j]['placeOrderTime'] = this.listHead.list[i]['placeOrderTime'];
                    //             newGoods.push(this.listHead.list[i].goods[j])
                    //         }
                    //     newlisr.push(...newGoods)
                    // }

                    // this.combineCell(newlisr)
                    
                    // console.log(this.tableData6)
                })
            },
           combineCell(list) {
                for (var field in list[0]) {
                    var k = 0;
                    while (k < list.length) {
                        list[k][field + 'span'] = 1;
                        list[k][field + 'dis'] = false;
                        for (var i = k + 1; i <= list.length - 1; i++) {
                            if (list[k][field] == list[i][field] && list[k][field] != '') {
                                list[k][field + 'span']++;
                                list[k][field + 'dis'] = false;
                                list[i][field + 'span'] = 1;
                                list[i][field + 'dis'] = true;
                            } else {
                                break;
                            }
                        }
                        k = i;
                    }
                }
                return list;
            },
            print(){
                var bdhtml = window.document.body.innerHTML;//获取当前页的html代码
                var prnhtml = document.getElementById('print').innerHTML;
                window.document.body.innerHTML = prnhtml;
                window.print();
                //  if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
                //     this.remove_ie_header_and_footer();
                //     }
                // else{
                //     window.print();
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
                }
        },
    }
</script>