<template>
    <div class="customerManagement">
        <div class="title">
            <label>客户管理</label>
        </div>
        <el-form :model="customersParams" class="m-t-10 b-c-f p-20" label-width="70px">
            <div class="ub">
                <el-form-item label="客户名称" class="ub-f1">
                    <el-input v-model="customersParams.nickname" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item class="m-l-20 ub-f1" label="客户电话">
                    <el-input v-model="customersParams.phone" placeholder="请输入客户电话"></el-input>
                </el-form-item>
                <el-form-item class="m-l-20 ub-f1" label="身份证号">
                    <el-input v-model="customersParams.idCard" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item class="m-l-20 ub-f1" label="平台状态">
                    <el-select v-model="customersParams.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in stateList" :key="item.key" :label="item.value"
                                   :value="item.key"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="ub">
                <el-form-item label="交易金额">
                    <el-input v-model="customersParams.tradeAmount_min" placeholder="请输入交易最小金额"></el-input>
                </el-form-item>
                <el-form-item label="-" label-width="30px">
                    <el-input v-model="customersParams.tradeAmount_max" placeholder="请输入交易最大金额"></el-input>
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
                    style="width: 100%"
                    v-loading="loading">

                <el-table-column
                        prop="name"
                        label="昵称">
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
                            <el-switch v-model="scope.row.status" on-text="开" off-text="关" active-value="N"
                                       inactive-value="Y"
                                       @change="toggleStatus(scope.row)"></el-switch>
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
                        :total="total"
                        :page-size="customersParams.page_size"
                        @current-change="handleCurrentChange">
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
                loading:true,
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
                    page_size: 10,
                    current_page: 1
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
            //获取客户列表
            getList(){
                customer.list(this.customersParams)
                    .then(response => {
                        this.tableData = response.data.results.list;
                        this.total = response.data.results.total;
                        if(this.tableData){
                            let q = this.tableData;
                            q.forEach(function (value) {
                                value.sys_status = value.sys_status == "N" ? '正常' : "黑名单";
                            });
                        }
                        this.loading = false;
                    })
            },

            //分页
            handleCurrentChange(val){
                this.customersParams.current_page = val;
                this.getList();
            },
            //切换状态
            toggleStatus(row) {
                let cid = row.cid;
                let status = row.status;
                let data ={
                    cid:'',
                    nickname: '',
                    cusName: '',
                    phone: '',
                    idCard: '',
                    company: '',
                    address: '',
                    status: '',
                    remark: '',
                    reported:'',
                };
                data.status = status;
                data.cid = cid;
                if(data.status == 'N'){
                    data.reported = 'N'
                }else {
                    delete data.reported;
                }
                customer.editInfo(data)
                    .then(response => {
                        if(response.data.status == 'Y'){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
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
            //搜索
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
                this.customersParams.current_page = 1;
                this.getList();
            },
            change: function () {
            }
        },

    }
</script>