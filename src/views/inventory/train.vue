<template>
	<div class="train">
		<label>入库车次列表</label>
		<!-- 内容 -->
		<div class="content">
			<!-- 筛选条件 -->
			<el-form ref="form" :model="params" label-position="left" label-width="70px" class="clearfix">
				<div class="ub">
					<el-form-item label="车次">
					    <el-input v-model="params.trainsNum" placeholder="请输入车次"></el-input>
					</el-form-item>
					<el-form-item label="货主" class="m-l-20">
						<el-input v-model="params.shipName" placeholder="请输入货主"></el-input>
					</el-form-item>
					<el-form-item label="结算状态" class="m-l-20">
					    <el-select v-model="params.status" placeholder="请选择结算状态">
					      <el-option label="全部" value=""></el-option>
					      <el-option v-for="item in carStauts" :key="item.key" :label="item.value" :value="item.key"></el-option>
					    </el-select>
					</el-form-item>
					
					<el-form-item label="货品" class="m-l-20">
					    <el-select v-model="params.goodId" placeholder="请选择货品">
					      <el-option label="全部" value=""></el-option>
					      <el-option v-for="item in goodsList" :key="item.goodId" :label="item.goodName" :value="item.goodId"></el-option>
					    </el-select>
					</el-form-item>
				</div>
				<div class="ub">
					<el-form-item label="入库员">
					    <el-select v-model="params.selId" placeholder="请选择入库员">
					      <el-option label="全部" value=""></el-option>
					      <el-option v-for="item in msList" :key="item.sid" :label="item.selName" :value="item.sid"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="入库时间" class="selectData m-l-20">
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
			</el-form>
			<el-button type="primary" icon="el-icon-search" @click="search" size="small">筛选</el-button>
			<!-- 车次列表 -->
			<el-table
				stripe
		      	:data="tableData"
		      	style="width: 100%"
		      	v-loading="loading"
		      	class="table-data-list">
			    <el-table-column
			        prop="trainsNum"
			        label="车次">
			    </el-table-column>
			    <el-table-column
			        prop="shipName"
			        label="货主"
			        width="100">
			    </el-table-column>
			    <el-table-column
			        prop="putStorageTime"
			        label="入库时间">
			    </el-table-column>
			    <el-table-column
			        prop="selName"
			        label="入库员">
			    </el-table-column>
			    <el-table-column
			        label="货品">
			        <template slot-scope="scope">
						<div class="line-ellipsis-1" :title="scope.row.train_good">{{scope.row.train_good}}</div>
			        </template>
			    </el-table-column>
			    <el-table-column
			        label="货品结算金额">
			        <template slot-scope="scope">
						{{scope.row.payAmount | format}}
			        </template>
			    </el-table-column>
			    <el-table-column
			        prop="settleStatus"
			        label="状态">
			    </el-table-column>
			    <el-table-column
			        label="操作">
			        <template slot-scope="scope">
			        	<router-link :to="{ name: 'train/trainDetail',params: { tid: scope.row.tid }}">
			        		<el-button type="danger" plain size="mini">查看</el-button>
			        	</router-link>
			        	<router-link :to="{ name: 'train/account',params: { tid: scope.row.tid }}">
			        		<el-button v-if="scope.row.settleStatus == '待结算' || (roleId == 'role_finance_sell' && scope.row.settleStatus == '售卖中')" type="danger" plain size="mini">结算</el-button>
			        	</router-link>
			        	<el-button v-if="scope.row.settleStatus == '未开卖'" type="danger" @click="deleteTrain(scope.row.tid)" plain size="mini">删除</el-button>
        			</template>
			    </el-table-column>
		    </el-table>	
		    <el-pagination
			  background
			  layout="total, prev, pager, next"
			  :total="total"
			  :page-size="params.page_size"
			  :current-page.sync="params.current_page"
			   @current-change="handleCurrentChange">
			</el-pagination>
            <!--删除-->
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                   >
                <span>确认删除该车次？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteConfirm()">确 定</el-button>
              </span>
            </el-dialog>

		</div>
	</div>

</template>

<script>
	import '@/style/inventory/inventory.scss';
	import { train } from '@/services/apis/train';
	import { keyValue } from '@/services/apis/key-value';
	import Cookies from 'js-cookie'
	export default {
		data() {
			return {
			    trainId:'',
                dialogVisible:false,
				roleId: Cookies.get('roleId'),  //角色
				loading: true,
				keyValueData:{},
				carStauts:[],
				goodsList:[],
				msList:[],
				tableData: [],
				timeQuantum: [],
				params: {
					trainsNum:'',
					shipName:'',
					status:'',
					start_time:'',
					end_time:'',
					goodId:'',
					selId:'',
					page_size:10,
					current_page:1
                },
		        total:null
			}
		},
		created(){
            //获取货品
 			train.goods({target_gid:JSON.parse(Cookies.get('gid')).gid,page_size:'100',current_page:'1'})
            .then(response => {
                this.goodsList = response.data.results.list
            });
            //获取入库员
            train.sellinglist()
            .then(response => {
                this.msList = response.data.results;
            })
            
		},
		mounted() {

			keyValue()
            .then(response => {
                this.keyValueData = response.data.results
                this.carStauts = this.keyValueData.car_status;
                this.getList();
            })
			
		},
		updated(){
   			
		},
		methods:{
			getList(){
                train.list(this.params)
                .then(response => {
                    this.tableData = response.data.results.list;
                    this.total = response.data.results.total;
                    if (this.tableData) {
		                for (var i = 0; i < this.tableData.length; i++) {
			            	for (var j = 0; j < this.keyValueData.car_status.length; j++) {
			            		if(this.tableData[i].settleStatus == this.keyValueData.car_status[j].key){
			            			this.tableData[i].settleStatus = this.keyValueData.car_status[j].value
			                	}
			            	}
			            }
		            }
                    this.loading = false;
                });
			},
			search(){
				this.params.current_page = 1;
				if(this.timeQuantum==null){
					this.params.start_time='';
					this.params.end_time='';
				}
				else{
					this.params.start_time = this.timeQuantum[0];
					this.params.end_time = this.timeQuantum[1];
				}
				this.getList();
			},
			handleCurrentChange(val){
				this.params.current_page = val;
				this.getList();
			},

            deleteTrain(id){
			    this.trainId = id;
			    this.dialogVisible = true;
            },

            deleteConfirm(){
                let data = {
                    tid:this.trainId,
                };
                train.deleteTrain(data)
                    .then(response => {
                        this.dialogVisible = false;
                        this.getList();
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    })
            },

//			deleteTrain(tid){
//				 train.deleteTrain({tid:tid})
//                .then(response => {
//                	this.getList();
//                	this.$message({
//			          message: '操作成功',
//			          type: 'success'
//			        });
//                })
//			}
		}
	}
</script>