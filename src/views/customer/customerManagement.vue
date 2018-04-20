<template>
    <div class="customerManagement">
        <div class="title">
            <label>客户管理</label>
        </div>
        <el-form :model="customersParams" class="m-t-10 b-c-f p-20" label-width="70px">
            <div class="ub">
                <el-form-item label="客户名称" class="ub-f1">
                    <el-input v-model="customersParams.nickname" size="small" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item class="m-l-20 ub-f1" label="客户电话">
                    <el-input v-model="customersParams.phone" size="small" placeholder="请输入客户电话"></el-input>
                </el-form-item>
                <el-form-item class="m-l-20 ub-f1" label="身份证号">
                    <el-input v-model="customersParams.idCard" size="small" placeholder="亲输入身份证号"></el-input>
                </el-form-item>
                <el-form-item class="m-l-20 ub-f1" label="状态">
                    <el-select v-model="customersParams.status" placeholder="请选择状态" size="small">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in stateList" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="ub">
                <el-form-item label="交易金额">
                    <el-input v-model="customersParams.tradeAmount_min" size="small" placeholder="请输入交易最小金额"></el-input>
                </el-form-item>
                <el-form-item label="-" label-width="30px">
                    <el-input v-model="customersParams.tradeAmount_max" size="small" placeholder="请输入交易最大金额"></el-input>
                </el-form-item>

                <el-form-item class="m-l-20 selectData" label="创建时间">
                    <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="timeQuantum"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>

                </el-form-item>
            </div>
            <el-button type="primary" @click="search" icon="el-icon-search" size="small" class="button-search">筛选
            </el-button>
        </el-form>

        <div class="blackTable b-c-f" style="padding: 20px">
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">

                <el-table-column
                        prop="name"
                        label="客户姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.nickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="transactionAmount"
                        label="交易金额">
                    <template slot-scope="scope">
                        <span></span>
                        <span>{{scope.row.tradeAmount | format}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="totalCredit"
                        label="赊账总额">
                    <template slot-scope="scope">
                        <span>{{scope.row.creditAmount | format}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rePayments"
                        label="待还款">
                    <template slot-scope="scope">
                        <span>{{scope.row.notPayAmount | format}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="longestTime"
                        label="赊账最长时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.creditTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="addTime"
                        label="添加时间"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.addTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="平台状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.sys_status}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="拉黑/正常"
                        width="140">
                    <template slot-scope="scope">
                        <div style="position: relative">
                            <el-switch v-model="scope.row.status" on-text="开" off-text="关" active-value="0"
                                       inactive-value="1"
                                       @change="toggleStatus(scope.row.id,scope.row.disabled)"></el-switch>
                        </div>
                        <span v-if="scope.row.sys_status == 0" style="position: absolute; top:14px; left:-68px;">
                                    <img src="../../assets/blackList/blackList.png" height="20" width="20"/>
                        </span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" plain size="mini" @click="onClickDetails(scope.row.cid)">查看</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <div class="m-t-20">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import '@/style/customer/customerManagement.scss';
    import {customer} from '@/services/apis/customer.js'

    export default {
        name: 'home',
        data() {
            return {
                total: null,
                currentPage4: 4,//当前页,
                timeQuantum: [],
                customersParams: {
                    nickname: '',//客户名称
                    phone: '',//手机号
                    idCard: '',//身份证号
                    createTime_start: '',//创建时间开始
                    createTime_end: '',//创建时间结束
                    tradeAmount_min: '',//交易金额小
                    tradeAmount_max: '',//交易金额大
                    status: '',//状态
                    page_size: '10',
                    current_page: '1'
                },

                tableData: [],//客户信息

                customrtInfo: {
                    name: "",
                    phone: "",
                    IdCard: "",
                    state: "",
                    priceStart: "",
                    priceEnd: "",
                    date: "",
                },//自定义筛选
                stateList: [{
                    key: 'Y',
                    value: "黑名单"
                }, {
                    key: 'N',
                    value: "正常"
                }],//状态
            }
        },
        mounted: function () {
            this.getList()
        },
        methods: {
            getList(){
                customer.list(this.customersParams)
                    .then(response => {
                        if(response.data.results.list==''){
                            this.tableData = [];
                        }else {
                            this.tableData = response.data.results.list;
                            this.total = response.data.results.total
                            let q = this.tableData;
                            q.forEach(function (value) {
                                value.sys_status = value.sys_status == "N" ? '正常' : "黑名单";
                                value.status = value.status == "N" ? '1' : '0';
                            });
                        }
                        console.log(this.tableData);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            toggleStatus(rightid, statusBler) {
                console.log(rightid);
                console.log(statusBler);
//                if (statusBler == true) {//开启
//                    var status2 = 1;
//                } else if (statusBler == false) {//关闭
//                    var status2 = 0;
//                }
//                let data = {
//                    id: rightid,
//                    disabled: status2
//                };
//                fetchusercontacts(data).then(response => {
//                    this.success('操作成功!');
//                })
            },
            //跳转到详情页面
            onClickDetails (id){
                this.$router.push({
                    name: 'customDetails',
                    params: {
                        id: id
                    }
                })
            },
            //搜素
            search(){
                if (parseInt(this.customersParams.tradeAmount_max) < parseInt(this.customersParams.tradeAmount_min)) {
                    this.$message.error('交易金额输入有误！请重新输入');
                    return false;
                }
                
                if (this.timeQuantum == null) {
                    this.customersParams.createTime_start = '';
                    this.customersParams.createTime_end = '';
                } else {
                    this.customersParams.createTime_start = this.timeQuantum[0];
                    this.customersParams.createTime_end = this.timeQuantum[1];
                    console.log(this.customersParams);
                }
                this.getList();
            },
            change: function () {
            }
        },

    }
</script>