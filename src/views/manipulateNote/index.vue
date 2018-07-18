<template>
    <div class="train">
        <label>操作日志</label>
        <!-- 内容 -->
        <div class="content">
            <!-- 筛选条件 -->
            <el-form ref="searchForm" :model="searchForm" label-width="85px" class="clearfix">
                <div class="ub">
                    <el-form-item label="操作人名称" >
                        <el-input v-model="searchForm.name" placeholder="请输入操作人名称"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <el-button type="primary" icon="el-icon-search" size="small" @click="search">筛选</el-button>

            <!-- 车次列表 -->
            <el-table
                    stripe
                    :data="tableData"
                    style="width: 100%"
                    class="table-data-list">
                <el-table-column
                        prop="name"
                        label="操作人"
                        width="300">
                </el-table-column>

                <el-table-column
                        prop="content"
                        label="操作内容">
                </el-table-column>
                <el-table-column
                        prop="operateTime"
                        label="操作时间"
                        width="200">
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :total="total"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import '@/style/inventory/inventory.scss';
    import {home} from '@/services/apis/home.api'

    export default {
        data() {
            return {
                searchForm:{
                    name:'',
                },
                serach:'',
                name:{},
                form: {
                    number: '',
                    name: '',
                    train: '',
                    data: ''
                },
                logParams:{
                    name:'',
                    page_size:'10',
                    current_page:'1'
                },
                tableData:[],
//                tableData: [{
//                    operateTime:'',
//                    tid: 1,
//                    trains_number: '20180001',
//                    name: '货主2',
//                    put_storage_ti: '2018-02-30 12:12',
//                    operater: '李',
//                    train_good: '白菜',
//                    pay_amount: 300,
//                    settle_status: '售卖中'
//                }, {
//                    tid: 1,
//                    trains_number: '20180001',
//                    name: '货主2',
//                    put_storage_ti: '2018-02-30 12:12',
//                    operater: '李',
//                    train_good: '白菜',
//                    pay_amount: 300,
//                    settle_status: '售卖中'
//                }],
                total:null
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            //初始化数据
            getData(){
                home.log(this.logParams)
                    .then(response => {
                        if(response.data.status =='Y'){
                            this.tableData = response.data.results.list;
                            this.total = response.data.results.total;
                        }else if(response.data.status =='N'){
                            this.$message.error(response.data.error_msg);
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            handleCurrentChange(val){
                this.logParams.current_page = val;
                this.getData();
            },
            search(){
                this.logParams.name = this.searchForm.name;
                console.log(this.logParams.name );
                this.getData();
            },
        }
    }
</script>