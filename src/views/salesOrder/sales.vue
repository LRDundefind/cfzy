<template>
	<div >
        <!-- 内容 -->
        <el-form ref="orderForm" :model="orderForm" label-width="80px">
            <el-card class="box-card">

            
                <el-form-item label="车次">
                    <el-input v-model="orderForm.trainsNum" placeholder="请选择客车次" @focus="showInput('t')"></el-input>

                </el-form-item>
                <el-form-item label="客户">
                    <el-radio-group v-model="orderForm.client" style="width: 100%" @change="clientChange">
                        <p class="m-t-15 m-b-20">
                            <el-radio label="old">老客户</el-radio>
                            <el-input class="m-t-20" v-if="orderForm.client == 'old'" v-model="orderForm.clientName" placeholder="请选择客户" @focus="showInput('c')"></el-input>
                        </p>
                        
                        <p><el-radio label="short">临时客户</el-radio></p>
                    </el-radio-group>
                    
                </el-form-item>
                <el-form-item label="付款类型">
                    <el-radio-group v-model="orderForm.orderType">
                        <el-radio label="order_knot">现结</el-radio>
                        <el-radio label="order_credit" v-if="orderForm.client == 'old'">赊账</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="卖手">
                    <el-input v-model="orderForm.bear" placeholder="请选择客卖手" @focus="showInput('s')"></el-input>
                </el-form-item>
            </el-card>
            <el-card class="box-card m-t-20">
                <div><label>选择出售货品</label></div>
          
                <!-- <div v-for="item in goodsList" class="goodsTag m-t-20 m-l-10 pos-r goodsTagActive" ><i class="el-alert__icon el-icon-success"></i> {{item.goodName}}</div> -->
                
                <!-- <el-checkbox-button class="goodsTag m-t-20 m-l-10 pos-r" v-for="(item,index) in goodsList" :key="item" @change="selectChange(item)">{{item}}</el-checkbox-button> -->
                
                <h4 class="textCenter m-t-20 m-b-20">销售货品清单</h4>
                <el-table
                    :data="goodsListList">
                    <el-table-column
                        prop="goodName"
                        label="品名">
                    </el-table-column>
                    <el-table-column
                        prop="goodNum"
                        label="件数">
                    </el-table-column>
                    <el-table-column
                        prop="netWeight"
                        label="重量">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价">
                    </el-table-column>
                    <el-table-column
                        label="金额">
                        <template slot-scope="scope">
                            <span v-if="scope.row.goodAmount == 0">{{scope.row.goodAmount}}</span>
                            <span v-if="scope.row.goodNum != '' && scope.row.goodAmount!=''">{{scope.row.goodAmount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="包装费">
                        <template slot-scope="scope">
                             <span v-if="scope.row.goodNum != ''">{{scope.row.packCost}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="编辑">
                        <template slot-scope="scope">
                      
                            <el-button type="primary" plain size="mini" @click="editGood(scope.row,scope.$index)">编辑</el-button>
                            <!-- <el-button type="danger" plain size="mini" @click="deleteGood(scope.$index)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card class="box-card m-t-20">
                <el-form-item label="货款金额">
                    <span v-if="isPrice">--</span>
                    <span v-else>{{totalCost.totalAmount}}</span>
                </el-form-item>
                <el-form-item label="包装费">
                    {{totalCost.totalPack}}
                </el-form-item>
                <el-form-item label="过磅费">
                    {{totalCost.totalWeigh}}
                </el-form-item>
                <el-form-item label="三轮车费">
                    <el-input v-model="orderForm.deliveryCost" @change="deliveryChange"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input v-model="orderForm.tricycleNo" placeholder="请输入车牌号"></el-input>
                </el-form-item>
                <el-form-item label="合计金额">
                    <span v-if="isPrice">--</span>
                    <span v-else>{{totalCost.tatol}}</span>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type='textarea' v-model="orderForm.remark" placeholder="请输入备注" :maxlength="GLOBAL.maxTextare"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitOrder('order')">下单</el-button>
                    <el-button v-show="orderForm.orderType == 'order_credit'" type="primary" plain @click="submitOrder('deposit')">暂存</el-button>
                </el-form-item>
            </el-card>
        </el-form>
        <el-dialog title="车次信息" :visible.sync="dialogTableVisible" width="800px">
            <el-table :data="gridData" highlight-current-row  @row-click="handleCurrentChange">
                <el-table-column property="trainsNum" label="车次" ></el-table-column>
                <el-table-column property="plateNum" label="车牌号"></el-table-column>
                <el-table-column property="putStorageTime" label="入库时间" ></el-table-column>
                
            </el-table>
            <el-pagination
              background
              layout="total, prev, pager, next"
              :total="trainPage.total"
              :page-size="trainPage.page_size"
              :current-page.sync="trainPage.current_page"
               @current-change="currentChangeT">
            </el-pagination>
        </el-dialog>
        <el-dialog title="卖手信息" :visible.sync="dialogTableVisibleSell" width="800px">
            <el-table :data="sellData" highlight-current-row  @row-click="handleCurrentChangeSell">
                <el-table-column property="name" label="员工名称" ></el-table-column>
                <el-table-column property="phone" label="手机号"></el-table-column>
                <!-- <el-table-column property="roleName" label="角色" ></el-table-column> -->
                
            </el-table>
            <el-pagination
              background
              layout="total, prev, pager, next"
              :total="sellPage.total"
              :page-size="sellPage.page_size"
              :current-page.sync="sellPage.current_page"
               @current-change="currentChangeS">
            </el-pagination>
        </el-dialog>
        <el-dialog title="客户信息" :visible.sync="dialogTableVisibleClient" width="800px">
            <el-form :model="clientPage" class="m-t-10 b-c-f" label-width="70px">
                <div class="ub">
                    <el-form-item label="客户名称" class="ub-f1" >
                        <el-input v-model="clientPage.nickname" placeholder="请输入客户名称"></el-input>
                    </el-form-item>
                    <el-form-item class="m-l-20 ub-f1" label="客户电话">
                        <el-input v-model="clientPage.phone" placeholder="请输入客户电话"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="searchClient" icon="el-icon-search" class="button-search m-l-20">筛选
                    </el-button>
                </div>
                
            </el-form>
            <el-table :data="clientData" highlight-current-row  @row-click="handleCurrentChangeClient">
                <el-table-column property="nickname" label="客户名称" ></el-table-column>
                <el-table-column property="tradeAmount" label="交易总金额"></el-table-column>
                <el-table-column property="phone" label="手机号"></el-table-column>

                <el-table-column
                        label="状态"
                        >
                    <template slot-scope="scope">

                        <div class="ub">
                            <div class="ub-f1" v-show="scope.row.sys_status == 'Y'">
                                <img src="../../assets/default/platform.png" height="45" width="75"/>
                            </div>
                            <div class="ub-f1" v-show="scope.row.status == 'Y'">
                                <img src="../../assets/default/custom.png" height="45" width="75"/>
                            </div>

                            <div class="ub-f1" v-show="scope.row.status == 'N'&& scope.row.sys_status == 'N'">
                                正常
                            </div>

                        </div>

                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="total, prev, pager, next"
              :total="clientPage.total"
              :page-size="clientPage.page_size"
              :current-page.sync="clientPage.current_page"
               @current-change="currentChangeC">
            </el-pagination>
        </el-dialog>
        <el-dialog title="编辑货品" :visible.sync="dialogTableVisibleGood" width="800px">
            <el-form ref="goodForm" :rules="goodFormRules" :model="goodForm" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content"> 
                        <el-form-item label="货品">
                            {{goodForm.goodName}}
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="售卖方式">
                            <el-select v-model="goodForm.sellUnit" placeholder="请选择" style="width: 100%">
                            <el-option value="unit_jin" label="斤"></el-option>
                            <el-option value="unit_kg" label="公斤"></el-option>
                            <el-option value="unit_pie" label="件"></el-option>
                          </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="单价" prop="price">
                            <el-input placeholder="请输入单价" v-model="goodForm.price"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="件数" prop="goodNum">
                            <el-input :placeholder="surplus" v-model="goodForm.goodNum">
                                <template slot="append">件</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="重量" prop="weight">
                            <el-input :placeholder="weightPlus" v-model="goodForm.weight" class="input-with-select">
                            <!-- <el-select v-model="goodForm.weight_util" slot="append" placeholder="请选择" style="width: 100px">
                              <el-option label="斤" value="unit_jin"></el-option>
                              <el-option label="公斤" value="unit_kg"></el-option>
                              
                            </el-select> -->
                            <template slot="append">{{goodForm.weight_util | sellNnit}}</template>
                          </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="平板重" prop="slabWeight">
                            <el-input placeholder="请输入平板重" v-model="goodForm.slabWeight">
                                <template slot="append">{{goodForm.weight_util | sellNnit}}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="减水重" prop="slushing">
                            <el-input placeholder="请输入减水重" v-model="goodForm.slushing" class="input-with-select">
                                <!-- <el-select v-model="goodForm.slushingUnit" slot="append" placeholder="请选择" style="width: 100px">
                                  <el-option label="斤/件" value="unit_jin"></el-option>
                                  <el-option label="公斤/件" value="unit_kg"></el-option>
                                  
                                </el-select> -->
                                <template slot="append">{{goodForm.slushingUnit | sellNnit}}/件</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="包装费" prop="packCoef">
                            <el-input placeholder="请输入包装费" v-model="goodForm.packCoef" class="input-with-select">
                                <!-- <el-select v-model="goodForm.packCoefUnit" slot="append" placeholder="请选择" style="width: 100px">
                                  <el-option label="元/斤" value="unit_jin"></el-option>
                                  <el-option label="元/公斤" value="unit_kg"></el-option>
                                  <el-option label="元/件" value="unit_pie"></el-option>
                                </el-select> -->
                                <template slot="append">元/{{goodForm.packCoefUnit | sellNnit}}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"> 
                        <el-form-item label="过磅费" prop="poundCoef">
                            <el-input placeholder="请输入过磅费" v-model="goodForm.poundCoef" class="input-with-select">
                                <!-- <el-select v-model="goodForm.poundCoefUnit" slot="append" placeholder="请选择" style="width: 100px">
                                  <el-option label="元/斤" value="unit_jin"></el-option>
                                  <el-option label="元/公斤" value="unit_kg"></el-option>
                                  <el-option label="元/公担" value="unit_cbd"></el-option>
                                </el-select> -->
                                <template slot="append">元/{{goodForm.poundCoefUnit | sellNnit}}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>    
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisibleGood = false">取 消</el-button>
                <el-button type="primary" @click="goodCost">确 定</el-button>
            </span>
        </el-dialog>
	</div>

</template>
<style scoped>

</style>

<script>
    import '@/style/salesOrder/salesOrder.scss';
    import { sales } from '@/services/apis/sales'
    import {customer} from '@/services/apis/customer.js'
    import Cookies from 'js-cookie'
	export default {
        name:'salesOrder',
        data() {
            //件数，重量，平板重校验
            var checkNumber9999 = (rule, value, callback) => {
                if (!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(value)) || value > 99999999.99) {
                     callback(new Error(' 请输入有效数字且小于99999999.99！'));
                } else {
                    callback();
                }
            }
			return {
                gridData:[], //车次列表
                trainPage:{
                    total:null,
                    page_size:10,
                    current_page:1
                },  //车次分页
                sellData:[],  //卖手列表
                sellPage:{
                    total:null,
                    page_size:10,
                    current_page:1
                },  //卖手分页
                clientData:[],  //客户列表
                clientPage:{
                    nickname:'',
                    phone:'',
                    total:null,
                    page_size:10,
                    current_page:1
                },//客户分页
                goodsIndex:'',  //货品序号
                isPrice: false, //判断是否有货品没有填写单价

                dialogTableVisibleGood: false,  //编辑货品
                dialogTableVisibleClient:false,  //显示客户列表
                dialogTableVisible:false,  //显示车次列表
                dialogTableVisibleSell: false,  //显示卖手列表
                goodsList:[],  //所有货品
                goodsListList:[],
                orderForm:{
                    trainsNum:'',  //车次
                    tid:'',  //车次id
                    orderType:'order_knot',  //订单类型
                    sid:'',  //卖手id
                    client:'old',
                    clientName: '',
                    cid:'',  //客户id
                    bear:'',  //卖手姓名
                    deliveryCost: 0,  //三轮车费
                    tricycleNo:'',  //车牌号
                    remark:'',  //备注
                    deposit: '',  //是否暂存,若订单类型为赊账订单则，传入该值。Y：暂存订单；N：普通赊账订单
                    goods:[],  //此订单的所有货品
                    signImg:''  //电子签名图片
                },
                goodForm:{    //货品弹出框数据
                    goodName:'',
                    sid:'',
                    goodId:'',
                    numUnit:'',
                    price:'',
                    goodNum:'',
                    id:'',
                    weight:'',
                    weight_util:'unit_jin',
                    sellUnit:'',
                    slabWeight:'0',
                    slushing:'',
                    slushingUnit:'',
                    packCoef:'',
                    packCoefUnit:'',
                    poundCoef:'',
                    poundCoefUnit :'',
                    surplusNum:'',
                },  
                totalCost: {    //费用总和
                    totalAmount: 0,  //货款费用总和-金额总和
                    totalPack: 0,  //包装费总和
                    totalWeigh: 0,  //过磅费总和
                    tatol: 0,  //合计金额
                },
                goodFormRules:{
                    
                    goodNum:[
                        {required: true, message: '请输入件数', trigger: 'blur'},
                        {validator:checkNumber9999 , trigger:'blur'}
                    ],
                    weight:[
                        {required: true, message: '请输入重量', trigger: 'blur'},
                        {validator:checkNumber9999 , trigger:'blur'}
                    ],
                    slabWeight:[
                        {required: true, message: '请输入平板重', trigger: 'blur'},
                        {validator:checkNumber9999 , trigger:'blur'}
                    ],
                    slushing:[
                        {required: true, message: '请输入减水重', trigger: 'blur'},
                        {validator:this.GLOBAL.checkNumber , trigger:'blur'}
                    ],
                    packCoef:[
                        {required: true, message: '请输入包装费', trigger: 'blur'},
                        {validator:this.GLOBAL.checkNumber , trigger:'blur'}
                    ],
                    poundCoef:[
                        {required: true, message: '请输入包装费', trigger: 'blur'},
                        {validator:this.GLOBAL.checkNumber , trigger:'blur'}
                    ]
                }
			}
		},
		mounted() {
            //默认卖手id
            this.orderForm.bear = Cookies.get('userName')
            this.orderForm.sid = Cookies.get('uid')
        },
        created(){

        },
        computed: {
            //入库单位为件时，显示剩余件数
            surplus:function(){
                if (this.goodForm.numUnit == 'unit_pie' && this.goodForm.surplusNum) {
                    return '剩余' + this.goodForm.surplusNum.toString() +'件';
                }else{
                    return "请输入件数";
                }
            },
            //入库单位为重量时，显示剩余重量
            weightPlus:function () {
                if (this.goodForm.numUnit == 'unit_jin' && this.goodForm.surplusNum) {
                    return '剩余' + this.goodForm.surplusNum.toString() +'斤';
                } else if (this.numUnit == 'unit_kg' && this.goodForm.surplusNum) {
                    return '剩余' + this.goodForm.surplusNum.toString() +'公斤';
                } else{
                    return "请输入重量";
                }
            }

        },
        methods:{
            /**
             * 显示车次，客户，卖手弹出框
             * @param  {[type]} type [t：车次；s：卖手；c：客户]
             * @return {[type]}      [description]
             */
            showInput(type){
                if (type == 't') {
                    this.dialogTableVisible = true
                    sales.trainList({page_size:this.trainPage.page_size,current_page:this.trainPage.current_page}).then(response => {
                        this.gridData = response.data.results.list
                        this.trainPage.total = response.data.results.total
                        //清空费用总计
                        this.totalCost.totalAmount = 0;
                        this.totalCost.totalPack = 0;
                        this.totalCost.totalWeigh = 0;
                        this.totalCost.tatol = 0;
                        this.orderForm.deliveryCost = 0;
                    })
                }else if (type == 's') {
                    this.dialogTableVisibleSell = true
                    sales.sellmenList({page_size:this.sellPage.page_size,current_page:this.sellPage.current_page}).then(response => {
                        this.sellData = response.data.results.list
                        this.sellPage.total = response.data.results.total
                    })
                }else if (type == 'c') {
                    this.dialogTableVisibleClient = true
                    customer.list({page_size:this.clientPage.page_size,current_page:this.clientPage.current_page,nickname:this.clientPage.nickname,phone:this.clientPage.phone}).then(response => {
                        this.clientData = response.data.results.list
                        this.clientPage.total = response.data.results.total
                    })
                }
                
            },
            /**
             * 切换客户
             * @param  {[type]} val [description]
             * @return {[type]}     [description]
             */
            clientChange(val){
                this.orderForm.cid = ''
                this.orderForm.clientName = ''
                if (val == 'short') {
                    this.orderForm.orderType = 'order_knot'
                }
            },
            /**
             * 分页
             */
            currentChangeT(val){
                this.trainPage.current_page = val;
                this.showInput('t')
            },
            currentChangeC(val){
                this.clientPage.current_page = val;
                this.showInput('c')
            },
            currentChangeS(val){
                this.sellPage.current_page = val;
                this.showInput('s')
            },
            //客户列表搜索
            searchClient(){
                this.clientPage.current_page = 1;
                this.showInput('c')
            },
            /**
             * 显示对应列表
             * @param  {[type]} row [description]
             * @return {[type]}     [description]
             */
            handleCurrentChangeClient(row){
                this.orderForm.clientName = row.nickname
                this.orderForm.cid = row.cid
                this.dialogTableVisibleClient = false
            },
            handleCurrentChangeSell(row){
                this.orderForm.bear = row.name
                this.orderForm.sid = row.sid
                this.dialogTableVisibleSell = false
            },
            handleCurrentChange(row){
                this.orderForm.trainsNum = row.trainsNum
                this.orderForm.tid = row.tid
                this.dialogTableVisible = false
                sales.goodsInfo({tid:row.tid}).then(response => {
                    this.goodsListList = []
                    //this.goodsList = response.data.results
                    this.orderForm.goods = response.data.results
                    //将车次货品添加到下单列表
                    for (var i = 0; i < this.orderForm.goods.length; i++) {
                        this.goodsList.push(this.orderForm.goods[i].goodName)
                        this.goodsListList.push({
                            goodName:this.orderForm.goods[i].goodName,
                            goodNum:'',
                            netWeight:'',
                            price:'',
                            goodAmount:'',
                            packCost:'',
                        })
                        this.orderForm.goods[i].goodNum = ''
                        this.orderForm.goods[i].weight = ''
                        this.orderForm.goods[i].price = ''
                        this.orderForm.goods[i].netWeight = ''
                        this.orderForm.goods[i].goodAmount = ''
                        this.orderForm.goods[i].packCost = '' 
                        this.orderForm.goods[i].weighCost = '' 
                    }

                })
            },

            selectChange(name){
                this.orderForm.goods.push({
                    goodName:name,
                    goodNum:'',
                    price:'',
                    netWeight:'',
                    goodAmount:'',
                    packCost:''
                })
                // if (this.orderForm.goods !=[]) {
                //     for (var i = 0; i < this.orderForm.goods.length; i++) {
                //         if (this.orderForm.goods[i].goodName == name) {

                //         }             
                //     }
                // }
                
               
            },
            /**
             * 编辑货品
             * @param  {[type]} data  [货品信息]
             * @param  {[type]} index [货品索引值]
             * @return {[type]}       [description]
             */
            editGood(data,index){

                if (this.orderForm.client == 'old' && this.orderForm.cid == '') {
                    this.$message({
                      message: '请先选择客户',
                      type: 'warning'
                    });
                }else{
                    this.goodsIndex = index
                    //console.log(this.orderForm.goods[this.goodsIndex])
                    this.dialogTableVisibleGood = true;

                    for (var Key1 in this.goodForm){
                        for (var Key2 in this.orderForm.goods[this.goodsIndex]){
                            if (Key1 == Key2) this.goodForm[Key1] = this.orderForm.goods[this.goodsIndex][Key2]
                        }
                        
                    }

                    if (this.orderForm.goods[this.goodsIndex].numUnit == 'unit_pie') {
                        this.goodForm.weight_util = 'unit_kg'
                    }else{
                        this.goodForm.weight_util = this.orderForm.goods[this.goodsIndex].numUnit
                    }
                    
                    this.goodForm.sid = this.orderForm.sid
                }
                
            },
            deleteGood(index){
                this.orderForm.goods.splice(index, 1)
            },
            /**
             * 计算价格
             * @return {[type]} [description]
             */
            goodCost(){
                var good = this.orderForm.goods[this.goodsIndex]
                this.$refs.goodForm.validate((valid) => {
                    if (valid) {

                        if(this.goodForm.price != ''){
                            if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.goodForm.price))|| this.goodForm.price > 9999.99){
                                this.$message({
                                  message: '请正确输入单价',
                                  type: 'warning'
                                });
                            }else{
                                this.isPrice = false;
                                this.getGoodsInformation(good);
                            }
                        }else{
                            this.getGoodsInformation(good);
                        }
                        
                    }
                })
                
            },
            /**
             * 计算下单货品的费用
             * @param  {[type]} good [编辑的货品]
             * @return {[type]}      [description]
             */
            getGoodsInformation(good){
                //重置费用
                this.totalCost.totalAmount = 0; //总货款费用
                this.totalCost.totalPack = 0; //总包装费
                this.totalCost.totalWeigh = 0; //总过磅费
                this.totalCost.tatol = 0
                sales.goodCost(this.goodForm).then(response => {
                    // for (var Key1 in this.goodForm){
                    //     for (var Key2 in good){
                    //         if (Key1 == Key2) good[Key2] = this.goodForm[Key1]
                    //     }
                        
                    // }
                    this.goodsListList[this.goodsIndex].goodNum = this.goodForm.goodNum;
                    this.goodsListList[this.goodsIndex].price = this.goodForm.price;
                    this.goodsListList[this.goodsIndex].netWeight = response.data.results.netWeight;
                    this.goodsListList[this.goodsIndex].goodAmount = response.data.results.goodAmount;
                    this.goodsListList[this.goodsIndex].packCost = response.data.results.packCost;


                    good.goodNum = this.goodForm.goodNum;
                    good.price = this.goodForm.price;
                    good.netWeight = response.data.results.netWeight;
                    good.goodAmount = response.data.results.goodAmount;
                    good.packCost = response.data.results.packCost;
                    good.weighCost = response.data.results.weighCost;
                    good.sellUnit = this.goodForm.sellUnit
                    good.weight = this.goodForm.weight
                    good.slabWeight = this.goodForm.slabWeight
                    good.weight_util = this.goodForm.weight_util
                    good.slushing = this.goodForm.slushing
                    good.slushingUnit = this.goodForm.slushingUnit
                    good.packCoef = this.goodForm.packCoef
                    good.packCoefUnit = this.goodForm.packCoefUnit
                    good.poundCoef = this.goodForm.poundCoef
                    good.poundCoefUnit = this.goodForm.poundCoefUnit
                    this.dialogTableVisibleGood = false;
                    //根据返回数据计算总和
                    for(var i=0;i<this.orderForm.goods.length;i++){
                        if (this.orderForm.goods[i].goodNum !='' && this.orderForm.goods[i].price == '') {
                            //console.log(this.$parent.goodsInfo[i])
                            this.isPrice = true
                        }
                        if(this.orderForm.goods[i]['goodAmount'] == '') this.orderForm.goods[i]['goodAmount'] = 0
                        if(this.orderForm.goods[i]['packCost'] == '') this.orderForm.goods[i]['packCost'] = 0
                        if(this.orderForm.goods[i]['weighCost'] == '') this.orderForm.goods[i]['weighCost'] = 0
                        this.totalCost.totalAmount += parseInt(this.orderForm.goods[i]['goodAmount']); //总货款费用
                        this.totalCost.totalPack += parseInt(this.orderForm.goods[i]['packCost']); //总包装费
                        this.totalCost.totalWeigh += parseInt(this.orderForm.goods[i]['weighCost']); //总过磅费
                    }
                    //计算总费用
                    this.totalCost.tatol = parseInt(this.totalCost.totalAmount) + parseInt(this.totalCost.totalPack) + parseInt(this.totalCost.totalWeigh) + parseInt(this.orderForm.deliveryCost);
                })
            },
            //三轮车费
            deliveryChange(){
                if(!(new RegExp(/^(0|[1-9][0-9]*)$/).test(this.orderForm.deliveryCost)) || this.orderForm.deliveryCost > 9999){
                    this.$message({
                      message: '请正确三轮车费',
                      type: 'warning'
                    });
                
                }else{
                    this.totalCost.tatol = parseInt(this.totalCost.totalAmount) + parseInt(this.totalCost.totalPack) + parseInt(this.totalCost.totalWeigh) + parseInt(this.orderForm.deliveryCost);
                }
            },
            /**
             * 下单或暂存
             * @param  {[type]} type [订单类型]
             * @return {[type]}      [description]
             */
            submitOrder(type){
                if (this.orderForm.client == 'old') {
                    if (this.orderForm.cid == '') {
                        this.$message({
                          message: '请选择客户',
                          type: 'warning'
                        });
                        return false;
                    }
                }
                //填写的购买货品的总件数 以此判断至少有一项货品填写了下单信息
                var buyNum = false; //件数
                var bugWigth = false; //重量
                for(var index in this.orderForm.goods){
                    if (this.orderForm.goods[index].goodNum != 0) buyNum = true
                    if (this.orderForm.goods[index].weight != 0) bugWigth = true
                }

                //现结+赊账 至少填写了一项货品信息
                if(!buyNum && !buyNum){
                    this.$message({
                      message: '请完善货品购买量信息',
                      type: 'warning'
                    });
                    return false;
                }
                if (type == 'order') {
                    for(var i = 0;i < this.orderForm.goods.length; i ++){
                        if(this.orderForm.goods[i].weight != '' && this.orderForm.goods[i].price == ''){
                            this.$message({
                              message: '请完善货品单价',
                              type: 'warning'
                            });
                            return false
                        }
                    }
                    if(this.orderForm.orderType == 'order_credit') this.orderForm.deposit = 'N'
                }else if(type == 'deposit'){
                    this.orderForm.deposit = 'Y'
                }
                sales.submitOrder(this.orderForm).then(response => {
                    this.$message({
                      message: '操作成功',
                      type: 'success'
                    });
                    if(type == 'order'){
                        //现结下单成功跳转至现结订单结算
                        if (this.orderForm.orderType == 'order_knot') {
                            this.$router.push({
                                name: 'order/orderSettlement',
                                params: {
                                    temporaryUser: response.data.results.oid,
                                },
                                query: { type:'order_knot'}
                            });
                        }else if(this.orderForm.orderType == 'order_credit'){
                            //赊账下单成功跳转至首页
                            this.$router.push({
                                name: 'order/orderSettlementSheet',
                                params: {
                                    oid: response.data.results.oid,
                                },
                                query: { type:'order_credit'}
                            });
                        }
                    }else if (type == 'deposit') {
                        //暂存订单成功跳转至暂存订单列表
                        this.$router.push({
                            path: 'tsList',
                        });
                    }
                    
                })
            },

        }
	}
</script>