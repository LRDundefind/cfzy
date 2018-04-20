<template>
    <div class="blackList f-s-14 c-3">
        <div class="ub ub-ac">
            <el-button @click="$router.go(-1)" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
            <div class="m-l-20">系统黑名单</div>
        </div>

        <div class="b-c-f m-t-20 p-20">
            <el-form :model="blackData" label-width="90px">
                <div class="ub">
                    <el-form-item class="ub-f1" label="客户姓名：">
                        <el-input v-model="blackData.cusName"></el-input>
                    </el-form-item>
                    <el-form-item class="ub-f1 m-l-30" label="客户电话">
                        <el-input v-model="blackData.phone"></el-input>
                    </el-form-item>
                    <el-form-item class="ub-f1 m-l-30" label="身份证号">
                        <el-input v-model="blackData.idCard"></el-input>
                    </el-form-item>
                    <div class="ub-f1"></div>
                </div>
            </el-form>
            <el-button type="primary" @click="search()" icon="el-icon-search" size="small">筛选</el-button>

            <div class="p-t-20 p-b-20">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%" size="small">
                    <el-table-column label="头像" width="180" style="padding: 0 20px">
                        <template slot-scope="scope">
                            <img :src="scope.row.headImg" width="46" height="44"/>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="cusName"
                            label="客户姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="idCard"
                            label="身份证号">
                    </el-table-column>
                    <el-table-column
                            prop="company"
                            label="企业名称">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="添加时间">
                    </el-table-column>
                    <el-table-column
                            prop="blockingReason"
                            label="拉黑原因">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-button @click="onClickDetails(scope.row.cid)" type="text" size="small">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/style/home/blackList.scss';
    import { home } from '@/services/apis/home.api'

    export default {
        name: 'blackList',
        data() {
            return {
                blackData:{
                    cusName: "",
                    phone: "",
                    idCard:'',
                },
                blackParams: {
                    cusName: "",
                    phone: "",
                    idCard:'',
                },//黑名单筛选
                name: '',
                phone: '',
                IdentityCard: '',
                tableData: [{
                    id:'1',
                    picture: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg',
                    name: '王小虎',
                    ID: '410927199307061234',
                    enterprise: '某某欧式企业',
                    phone: '18236911783',
                    date: '2016-05-02',
                    reason: '赊欠巨款',
                }, {
                    id:'2',
                    picture: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg',
                    name: '王小虎',
                    ID: '410927199307061234',
                    enterprise: '某某欧式企业',
                    phone: '18236911783',
                    date: '2016-05-02',
                    reason: '赊欠巨款',
                }],//系统黑名单表单详情
            }
        },
        mounted() {
            this.getData();
        },

        methods:{
            //初始化数据
            getData(){
                home.blacklist(this.blackParams)
                    .then(response => {
                        this.tableData =response.data.results;
                        console.log(response.data.results);

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //按条件查询
            search(){
                this.blackParams.cusName = this.blackData.cusName;
                this.blackParams.phone = this.blackData.phone;
                this.blackParams.idCard = this.blackData.idCard;
                this.getData();
            },

            //点击客户详情
            onClickDetails: function(id) {
                this.$router.push({
                    name: 'customDetails',
                    params: {
                        id: id
                    }
                })
            }
        },
    }
</script>