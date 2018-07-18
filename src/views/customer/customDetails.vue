<template>
    <div class="customDetails f-s-14 c-3">
        <div class="name">
            <el-button type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left" @click="goCustomer">返回
            </el-button>
            <span class="title c-3 f-s-14">客户详情</span>
        </div>
        <div class="information b-c-f" >
            <el-card class="box-card m-t-20 m-b-30">
                <div slot="header" class="clearfix">
                    <span class="c-3 f-s-14">客户信息</span>
                    <el-button :disabled="come =='black'" class="el-button el-button--danger el-button--mini is-plain" style="float: right;"
                               @click="editCustomer(id)">编辑
                    </el-button>
                </div>
                <div class="ub f-s-14">
                    <div class="ub-f1">
                        <img class="picture"  v-show="personForm.headImg!=''" :src="imgpath+personForm.headImg"  height="180"  width="180" >
                        <img class="picture"  v-show="personForm.headImg==''" src="../../assets/default/defautImg.png" height="180"  width="180">
                    </div>
                    <div class="ub-f3 ub">
                        <div class="ub-f2">
                            <div class="ub ">
                                <div class="labelName">姓名:</div>
                                <div class="c-6">{{personForm.cusName}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">身份证号:</div>
                                <div class="c-6">{{personForm.idCard}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">地址:</div>
                                <div class="c-6">{{personForm.address}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">平台状态:</div>
                                <div class="c-6">{{personForm.sys_status}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">拉黑原因:</div>
                                <div class="c-6 balckName">
                                    {{personForm.blackingReason}}
                                </div>
                            </div>

                        </div>
                        <div class="ub-f1">
                            <div class="ub">
                                <div class="labelName">昵称:</div>
                                <div class="c-6 balckName" >{{personForm.nickname}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">企业名称:</div>
                                <div class="c-6 balckName">{{personForm.company}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">手机号码:</div>
                                <div class="c-6">{{personForm.phone}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">状态:</div>
                                <div class="c-6">{{personForm.status}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">备注:</div>
                                <div class="remark c-6">
                                    {{personForm.remark}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="ub f-s-14 ">-->
                <!--<div class="ub-f1"></div>-->
                <!--<div class="ub-f3 ub">-->
                <!--<div class="labelName">备注：</div>-->
                <!--<div class="remark c-6">-->
                <!--{{personForm.remark}}-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
            </el-card>

            <el-card class="box-card m-t-20 m-b-30 f-s-14" id="print">
                <div slot="header" class="clearfix ub">
                    <div class="ub-f1">交易情况</div>
                    <div class="ub-f2 ub dealName">
                        <div class="m-r-30">交易总金额:</div>
                        <div class="m-r-20">{{tradeAmount | format}}</div>
                    </div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">赊账总金额:</div>
                        <div class="m-r-20">{{creditAmount | format}}</div>
                    </div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">待还款:</div>
                        <div class="m-r-20">{{notPayAmount | format}}</div>
                    </div>
                </div>

                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="orderNo"
                            label="订单编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="placeOrderTime"
                            label="下单时间"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="selName"
                            label="卖手">
                    </el-table-column>
                    <el-table-column
                            prop="orderType "
                            label="订单类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.orderType | order}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="salesAmount"
                            label="销售金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.salesAmount | format}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="订单状态">
                    </el-table-column>
                    <el-table-column
                            prop="repayments"
                            label="待还款">
                        <template slot-scope="scope">
                            <span>{{scope.row.stayStillAmount | format}}</span>
                        </template>
                    </el-table-column>

                    <!--<el-table-column-->
                            <!--label="操作"-->
                            <!--width="140">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button type="danger" plain size="mini" @click="onClickOrder(scope.row.id)">还款-->
                            <!--</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->

                </el-table>
                <div class="ub">
                    <div class="m-t-20 m-l-20 ub-f3">
                        <el-pagination
                                background
                                layout="total, prev, pager, next"
                                :total="transactionTotal"
                                :page-size="transactionParams.page_size"
                                @current-change="transactionCurrentChange">
                        </el-pagination>
                    </div>
                    <!--打印催账单弃用-->
                    <!--<div class="ub ub-pe m-r-30 ub-f1 m-t-20 m-l-20">-->
                        <!--<div style="line-height: 2" class="m-r-30" @click="changestatus">-->
                            <!--<el-checkbox v-model="checked">催账订单</el-checkbox>-->
                        <!--</div>-->
                        <!--<div>-->
                            <!--<el-button :disabled="checked == false" type="danger" plain size="mini" class="m-l-30"-->
                                       <!--@click="print">打印催账订单-->
                            <!--</el-button>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--打印催账单弃用end -->

                </div>

            </el-card>

            <!--赊账情况-->
            <el-card class="box-card m-t-20 m-b-30 f-s-14">
                <div slot="header" class="clearfix ub">
                    <div class="ub-f4">赊账情况</div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">赊账总金额:</div>
                        <div class="m-r-20">{{statusCredit | format}}</div>
                    </div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">待还款总金额:</div>
                        <div class="m-r-20">{{statusnotPay | format}}</div>
                    </div>
                </div>

                <el-table
                        :data="tableCredit"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="150"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="bearerName"
                            label="承赊方名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="creditAmount"
                            label="赊账总金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.creditAmount | format}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="notPayAmount"
                            label="待还款">
                        <template slot-scope="scope">
                            <span>{{scope.row.notPayAmount | format}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="lastRepayTime"
                            label="最后还款时间">
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button type="danger" plain size="mini" @click="onClickOrder(scope.row)">还款</el-button>
                            <el-button type="danger" plain size="mini" @click="print(scope.row.bearerId)">打印催账单</el-button>
                        </template>
                    </el-table-column>


                </el-table>
                <div class="m-t-20 ">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :total="statusTotal"
                            :page-size="creditParams.page_size"
                            @current-change="creditCurrentChange">
                    </el-pagination>
                </div>
            </el-card>
            <!--赊账情况 end-->

            <el-card class="box-card m-t-20 m-b-30 f-s-14">
                <div slot="header" class="clearfix ub">
                    <div class="ub-f4">还款记录</div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">赊账总金额:</div>
                        <div class="m-r-20">{{creditTotal | format}}</div>
                    </div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">已还款总金额:</div>
                        <div class="m-r-20">{{payAmount | format}}</div>
                    </div>
                </div>

                <el-table
                        :data="tablePayment"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="150"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="refundTime"
                            label="还款日期"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="refundType"
                            label="还款方式">
                        <template slot-scope="scope">
                            <span>{{scope.row.refundType | paymentWay}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="refundAmount"
                            label="还款金额">
                        <template slot-scope="scope">
                            <span>{{scope.row.refundAmount | format}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注">
                    </el-table-column>

                </el-table>
                <div class="m-t-20 ">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :total="repaymentTotal"
                            :page-size="repaymentParams.page_size"
                            @current-change="repaymentCurrentChange">
                    </el-pagination>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    import '@/style/customer/customDetails.scss';
    import {customer} from '@/services/apis/customer.js'
    import {keyValue} from '@/services/apis/key-value';

    export default {
        name: 'customDetails',
        data() {
            return {
                statusnotPay:'',//还款总金额
                statusCredit:'',//赊账总金额
                //交易情况参数
                come:'',
                transactionParams: {
                    call_payment:'N',
                    cid: '',
                    page_size: 10,
                    current_page: 1
                },
                //还款记录参数
                repaymentParams: {
                    cid: '',
                    page_size: 10,
                    current_page: 1
                },

                //获取赊账情况参数
                creditParams:{
                    cid: '',
                    page_size: 10,
                    current_page: 1
                },

                tradeAmount: '', //交易总金额
                creditAmount: '',//交易赊账总金额
                notPayAmount: '',//待还款
                transactionTotal: null,

                creditTotal: '', //还款赊账总金额
                payAmount: '', //还款总金额
                repaymentTotal: null,
                statusTotal:null,//赊账情况总条数

                id: '',
                checked: false,
                name: '',
                phone: '',
                IdentityCard: '',
                personForm: {
                    cusName: '',
                    headImg: '',
                    nickname: '',
                    idCard: '',
                    company: '',
                    address: '',
                    phone: '',
                    sys_status: '',
                    status: '',
                    blackingReason: '',
                    remark: '',
                },
                tablePayment: [],
                tableData: [],
                imgpath:process.env.BASE_PATH,
                keyValueData:[],
                orderKnot:[],
                orderRemit:[],
                tableCredit:[],

            }
        },
        created(){
            //路由传参
            this.come = this.$route.params.come || false;
            //键值对匹配
            keyValue()
                .then(response => {
                    this.keyValueData = response.data.results;
//                    this.payType = this.keyValueData.pay_type;
                    this.orderKnot = this.keyValueData.order_knot_status;
                    this.orderRemit = this.keyValueData.order_remit_status;
                    this.getInfo(this.id);
                    this.transaction();
                    this.remittance();
                    this.getCredit();
                })
        },
        mounted() {
            this.id = this.$route.params.id || false;
        },
        methods: {
            //催账订单弃用
//            changestatus(){
//                if(this.checked){
//                    this.transactionParams.call_payment='N';
//                }else {
//                    this.transactionParams.call_payment='Y';
//                }
//                 this.transaction();
//            },
            //跳转到客户管理列表
            goCustomer(){
                if(this.come){
                    this.$router.push({name: 'blackList'})
                }else {
                    this.$router.push({name: 'customerManagement'})
                }
            },

            //获取客户详情
            getInfo(id){
                var params = {
                    cid: id,
                };
                customer.info(params)
                    .then(response => {
                        this.personForm = response.data.results;
                        this.personForm.status = this.personForm.status == "N" ? '正常' : "黑名单";
                        this.personForm.sys_status = this.personForm.sys_status == "N" ? '正常' : '黑名单';

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //获取客户交易历史
            transaction(){
                this.transactionParams.cid = this.id;
                customer.transaction(this.transactionParams)
                    .then(response => {
                        if (response.data.results.total == 0) {
                            this.tableData = [];
                            this.transactionTotal = 0;
                        } else {
                            this.tableData = response.data.results.list;
                            for(var i = 0;i<this.tableData.length;i++){
                                if(this.tableData[i].orderType == 'order_knot'){
                                    for(var j = 0; j<this.orderKnot.length;j++){
                                        if(this.tableData[i].status == this.orderKnot[j].key){
                                            this.tableData[i].status = this.orderKnot[j].value;
                                        }
                                    }
                                }else if(this.tableData[i].orderType == 'order_credit'){
                                    for(var k = 0;k<this.orderRemit.length;k++){
                                        if(this.tableData[i].status == this.orderRemit[k].key){
                                            this.tableData[i].status = this.orderRemit[k].value;
                                        }
                                    }
                                }
                            }

                            this.transactionTotal = response.data.results.total;
                        }
                        this.creditAmount = response.data.results.creditAmount;
                        this.notPayAmount = response.data.results.notPayAmount;
                        this.tradeAmount = response.data.results.tradeAmount;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //获取还款记录
            remittance(){
                this.repaymentParams.cid = this.id;
                customer.remittance(this.repaymentParams)
                    .then(response => {
                        if (response.data.results.total == 0) {
                            this.tablePayment = [];
                            this.repaymentTotal = 0;
                        } else {
                            this.tablePayment = response.data.results.list;
                            this.repaymentTotal = response.data.results.total;
                        }
                        this.creditTotal = response.data.results.creditAmount;
                        this.payAmount = response.data.results.payAmount;
                        console.log(response.data.results.list);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

            //获取赊账情况
            getCredit(){
                this.creditParams.cid = this.id;
                customer.getCredit(this.creditParams)
                    .then(response => {
                        if (response.data.results.total == 0) {
                            this.tableCredit = [];
                            this.statusTotal = 0;
                        } else {
                            this.tableCredit = response.data.results.list;
                            this.statusTotal = response.data.results.total;

                            this.statusnotPay = response.data.results.notPayAmount;
                            this.statusCredit = response.data.results.creditAmount;

                        }
                    })
            },

            //打印催账单弃用
            print(bearerId){
                // var bdhtml = window.document.body.innerHTML;//获取当前页的html代码

                // var prnhtml = document.getElementById('print').innerHTML;
                // window.document.body.innerHTML = prnhtml;
                // window.print();
                // window.document.body.innerHTML = bdhtml;
                // window.location.reload();
                this.$router.push({name: 'addCustomer/down', params: {bearerId: bearerId,id:this.id}});
            },
            //跳转到编辑客户
            editCustomer(id){
                this.$router.push({name: 'addCustomer/update', params: {id: id}});
            },
            //跳转到订单详情
            onClickOrder: function (row) {
                this.$router.push({
                    name: 'order/repayment',
                    params:{
                        repaymentId:this.id,
                        bearerId:row.bearerId,
                        bearerName:row.bearerName,
                        notPayAmount:row.notPayAmount,
                    }
                })
            },
            //还款记录分页
            repaymentCurrentChange(val){
                this.repaymentParams.current_page = val;
                this.remittance();
            },
            //赊账情况分页
            creditCurrentChange(val){
                this.creditParams.current_page = val;
                this.getCredit();
            },
            //交易情况分页
            transactionCurrentChange(val){
                this.transactionParams.current_page = val;
                this.transaction();
            }
        },
    }
</script>