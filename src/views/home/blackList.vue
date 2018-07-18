<template>
    <div class="blackList f-s-14 c-3">
        <div class="ub ub-ac">
            <el-button @click="goHome()" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回</el-button>
            <div class="m-l-20">平台黑名单</div>
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
                        style="width: 100%" size="small"
                        v-loading="loading">
                    <el-table-column label="头像" width="180" style="padding: 0 20px">
                        <template slot-scope="scope">
                            <img class="black-img" v-show="scope.row.headImg!=''" :src="imgpath+scope.row.headImg" width="46" height="44">
                            <img class="black-img" v-show="scope.row.headImg==''" src="../../assets/default/defautImg.png" alt="" width="46" height="44">

                            <!--<img v-if="scope.row.headImg !='' " :src="scope.row.headImg" width="46" height="44"/>-->
                            <!--<img :src="scope.row.headImg = '' " width="46" height="44"/>-->
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
                <div class="m-t-20">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :total="total"
                            :page-size="blackParams.page_size"
                            @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
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
                loading:true,
                imgpath: process.env.BASE_PATH,
                blackData:{
                    cusName: "",
                    phone: "",
                    idCard:'',
                },//搜索参数
                blackParams: {
                    cusName: "",
                    phone: "",
                    idCard:'',
                    page_size: 10,
                    current_page: 1

                },//黑名单筛选参数
                name: '',
                phone: '',
                IdentityCard: '',//身份证号
                tableData: [],//系统黑名单表单详情
                total:null,
            }
        },
        mounted() {
            this.getData();
        },

        methods:{
            //跳转到首页
            goHome(){
                this.$router.push({name: 'home'});
            },
            //初始化数据
            getData(){
//                var doMain = process.env.BASE_PATH;
//                let defaultImg = require('../../assets/default/defautImg.png');
                home.blacklist(this.blackParams)
                    .then(response => {
                        if(response.data.status == 'Y'){
                            this.tableData =response.data.results.list;
                            this.total = response.data.results.total;
                            this.loading = false;
//                            q.forEach(function (value) {
//                                if(value.headImg == ''){
//                                    value.headImg = defaultImg;
//                                }else {
//                                    value.headImg = doMain + defaultImg;
//                                }
//                            });
                        }else if(response.data.status == 'N'){
                            this.$message.error(response.data.error_msg);
                        }
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
                    params: {id: id, come: 'black'}
                })
            },
            //分页
            handleCurrentChange(val){
                this.blackParams.current_page = val;
                this.getData();
            }
        },
    }
</script>