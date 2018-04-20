<template>
    <div class="customDetails f-s-14 c-3">
        <div class="name">
            <el-button type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left" @click="$router.go(-1)">返回
            </el-button>
            <span class="title c-3 f-s-14">客户详情</span>
        </div>
        <div class="information b-c-f">
            <el-card class="box-card m-t-20 m-b-30">
                <div slot="header" class="clearfix">
                    <span class="c-3 f-s-14">客户信息</span>
                    <el-button class="el-button el-button--danger el-button--mini is-plain" style="float: right;"
                               @click="editCustomer(id)">编辑
                    </el-button>
                </div>
                <div class="ub f-s-14">
                    <div class="ub-f1">

                        <img class="picture"
                             src="http://img2.woyaogexing.com/2018/03/21/b1a95ddf04139001!360x360_big.jpg" height="180"
                             width="180"/>
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
                                <div class="c-6">{{personForm.nickname}}</div>
                            </div>
                            <div class="ub m-t-20">
                                <div class="labelName">企业名称:</div>
                                <div class="c-6">{{personForm.company}}</div>
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
                            prop="stayStillAmount"
                            label="订单状态">
                    </el-table-column>
                    <el-table-column
                            prop="repayments"
                            label="待还款">
                        <template slot-scope="scope">
                            <span>{{scope.row.stayStillAmount | format}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            width="140">
                        <template slot-scope="scope">
                            <el-button type="danger" plain size="mini" @click="onClickOrder(scope.row.id)">还款
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="m-t-20 m-l-20">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :total="transactionTotal"
                            :page-size="transactionParams.page_size"
                            @current-change="transactionCurrentChange">
                    </el-pagination>
                </div>
            </el-card>

            <div class="ub ub-pe m-r-30" style="margin-top:-30px;">
                <div style="line-height: 2" class="m-r-30">
                    <el-checkbox v-model="checked">催账订单</el-checkbox>
                </div>
                <div>
                    <el-button :disabled="checked == false" type="danger" plain size="mini" class="m-l-30"
                               @click="print">打印催账订单
                    </el-button>
                </div>
            </div>

            <el-card class="box-card m-t-20 m-b-30 f-s-14">
                <div slot="header" class="clearfix ub">
                    <div class="ub-f4">还款记录</div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">赊账总金额:</div>
                        <div class="m-r-20">{{creditTotal | format}}</div>
                    </div>
                    <div class="ub-f1 ub dealName">
                        <div class="m-r-30">还款总金额:</div>
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
    export default {
        name: 'customDetails',
        data() {
            return {
                //交易情况参数
                transactionParams: {
                    cid: '',
                    page_size: 1,
                    current_page: 1
                },
                //还款记录参数
                repaymentParams: {
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

                id: '',
                checked: true,
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
            }
        },
        mounted() {
            this.id = this.$route.params.id || false;
            //初始化数据
            this.getInfo(this.id);
            this.transaction();
            this.remittance();
        },
        methods: {
            //获取客户详情
            getInfo(id){
                var params = {
                    cid: id,
                };
                customer.info(params)
                    .then(response => {
                        this.personForm = response.data.results;
                        this.personForm.status = this.personForm.status == "Y" ? '正常' : "黑名单";
                        this.personForm.sys_status = this.personForm.sys_status == "Y" ? '正常' : '黑名单';
//                        console.log(response.data.results);
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

            print(){
                // var bdhtml = window.document.body.innerHTML;//获取当前页的html代码

                // var prnhtml = document.getElementById('print').innerHTML;
                // window.document.body.innerHTML = prnhtml;
                // window.print();
                // window.document.body.innerHTML = bdhtml;
                // window.location.reload();
                this.$router.push({name: 'addCustomer/down', params: {id: this.id}});
            },
            //跳转到编辑客户
            editCustomer(id){
                this.$router.push({name: 'addCustomer/update', params: {id: id}});
            },
            //跳转到订单详情
            onClickOrder: function (id) {
                this.$router.push({
                    name: 'order/repayment',
                    params:{
                        repaymentId:this.id
                    }
                })
            },
            //还款记录分页
            repaymentCurrentChange(val){
                this.repaymentParams.current_page = val;
                this.remittance();
            },
            //交易情况分页
            transactionCurrentChange(val){
                this.transactionParams.current_page = val;
                this.transaction();
            }
        },
    }
</script>