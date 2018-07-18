<template>
	<div class="ordinaryExpenditure">
		<el-card class="box-card m-t-20 f-s-16 m-b-30">
			<el-form :model="expenditureInfo" label-width="90px" :rules="rules">
				<el-form-item>
					<el-checkbox v-model="expenditureInfo.tfAdvances">该费用是否为货主垫付</el-checkbox>
				</el-form-item>
				<el-form-item label="费用类型">
					<el-select v-model="expenditureInfo.fylx" placeholder="请选择费用类型" @change='getEid'>
						<el-option v-for="item in fylxList" :key="item.eid" :label="item.expendName" :value="item.expendName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车次" >
					<el-input v-model="expenditureInfo.cc" placeholder="请选择车次"  suffix-icon="el-icon-arrow-down" @focus="showInput"></el-input>
				</el-form-item>
				<el-form-item label="支付方式">
					<el-select v-model="expenditureInfo.zffs" placeholder="请选择支付方式" @change="payWay(expenditureInfo.zffs)">
						<el-option v-for="item in zffsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="收款人电话" prop="skrdh">
					<el-input v-model="expenditureInfo.skrdh"></el-input>
				</el-form-item>
				<el-form-item label="收款人">
					<el-input v-model="expenditureInfo.skr" :maxlength="GLOBAL.maxlength"></el-input>
				</el-form-item>
				<div class="ub">
					<el-form-item label="金额" prop="je">
						<el-input 
						type="number"
						v-model="expenditureInfo.je"

						></el-input>
					</el-form-item>
					<div class="m-l-10 priceUnit">元</div>
				</div>
				<el-form-item label="结款人">
					<el-input v-model="expenditureInfo.jkr" :maxlength="GLOBAL.maxlength"></el-input>
				</el-form-item>
				<el-form-item label="收款账户">
					<el-input :disabled="expenditureInfo.zffs =='type_cash'" v-model="expenditureInfo.skzh" :maxlength="GLOBAL.maxlength"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="expenditureInfo.remark" :maxlength="GLOBAL.maxTextare"></el-input>
				</el-form-item>
			</el-form>
			<div class="m-t-20 clearfix">
				<el-button type="success" class="floatRight settlement-btn" @click="getData">结算</el-button>
			</div>
		</el-card>

		<el-dialog title="车次信息" :visible.sync="dialogTableVisible">
		<el-table :data="gridData" highlight-current-row  @current-change="handleCurrentChange" ref="singleTable">
			<el-table-column property="trainsNum" label="车次" ></el-table-column>
			<el-table-column property="shipName" label="货主名称" width="200"></el-table-column>
			<el-table-column property="putStorageTime" label="入库时间"></el-table-column>
			<!-- <el-table-column property="tid" label="车次ID" ></el-table-column> -->
		</el-table>
            <div class="p-t-20">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :total="total"
                        :page-size="trainParams.page_size"
                        :current-page.sync="trainParams.current_page"
                        @current-change="handleCurrentChange1">
                </el-pagination>
            </div>

            <!-- <div style="margin-top: 20px">
               <el-button @click="setCurrent()">取消选择</el-button>
               <el-button @click="SUREbTN">确定</el-button>
           </div> -->
		</el-dialog>
	</div>
</template>
<script>
	import '@/style/expenditure/ordinaryExpenditure.scss';
	import { PAY } from '@/services/apis/expenditure.api';
	import { spending } from '@/services/apis/spendingType.api';
	import {train} from '@/services/apis/train'
	import Cookies from 'js-cookie'
	export default {
		data() {
			//手机校验
			var checkTelephone = (rule, value, callback) => {
                if (value != '') {
                    var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error(' 请输入有效的手机号码！'));
                    } else {
                        if (value.length != 11) {
                            callback(new Error('请输入有效的手机号码！'));
                        } else {
                            callback();
                        }
                    }
                } else {
                    callback();
                }
            };
			// //金额校验
			// var checkTeleMoney = (rule, value, callback) => {
            //     if (value != '') {
            //         var myreg = /^\d+(?:.\d{1,2})?$/;
            //         if (value<=0) {
            //             callback(new Error('输入金额应大于0'));
            //         }
			// 		else if(value>9999999999.99){
			// 			callback(new Error('输入金额应小于9999999999.99'));
			// 		}
			// 		 else {
            //             if (!myreg.test(value)) {
            //                 callback(new Error('小数点后只能输入两位小数'));
            //             }
            //         }
            //     } else {
            //         callback();
            //     }
            // };

			return {
                total:null,
                trainParams: {
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

				asd:12,
				rules: {
					skrdh:[
						{ validator: checkTelephone, trigger: 'blur' }
					],
		            je:[{ required: true, message: '请输入数字', trigger: 'blur' },
		          		// {max:12,message: '长度不超过12位',trigger: 'blur'},
						{validator:this.GLOBAL.checkTeleMoney , trigger:'blur'}
		
		            ]
			  	},
				gridData:[],
				dialogTableVisible: false,   //获取车次列表弹框
				getEidS:'',					 //类别ID
				trainsID:'',				 //车次ID
				expenditureInfo: {
					tfAdvances:true,
					fylx: "",
					cc: "",
					zffs: "",
					skrdh: "",
					skr: "",
					je: "",
					jkr: Cookies.get('userName'),  //默认当前操作者
					skzh: "",
					remark:''
				},
				//费用类型
				fylxList: [],
				//车次
		
				//支付方式
				zffsList: [{
					id: "type_cash",
					name: "现金"
				}, {
					id: "type_wechat",
					name: "微信"
				}, {
					id: "type_alipay",
					name: "支付宝"
				}, {
					id: "type_card",
					name: "银行卡"
				}],
			}
		},
		created(){
			this.getspending();
		},
		methods:{
            payWay(way){
                if(way == 'type_cash'){
                    this.expenditureInfo.skzh = '';
                }
            },
			// 点击横排的时候
			handleCurrentChange(row){
				this.trainsID = row.tid;
				this.expenditureInfo.cc = row.trainsNum;
				this.dialogTableVisible = false
			},
			// 取消选项
			// setCurrent(row){
			// 	this.$refs.singleTable.setCurrentRow(row);
			// },
			// //确定选项
			// SUREbTN(){
			// 	this.dialogTableVisible = false
			// },
			// 点击input显示弹框
			showInput(){
				this.gettrainList()
				this.dialogTableVisible = true
				
			},
			getEid(){
				//console.log(data)
				//获取下拉分类ID
				 for (var i = 0; i < this.fylxList.length; i++) {
                    if (this.expenditureInfo.fylx == this.fylxList[i].expendName) {
						this.getEidS = this.fylxList[i].eid;
                    }
				}
				
			},
			getData(){
				if(this.expenditureInfo.tfAdvances){
					// 垫付
					var dian='Y';
					if(this.expenditureInfo.fylx==''){
						this.$message({
								message: '请选择费用类型',
								type: 'warning'
							});
					}
					else if(this.expenditureInfo.cc==''){
						this.$message({
								message: '请选择车次',
								type: 'warning'
							});
					}
					else if(this.expenditureInfo.zffs==''){
						this.$message({
								message: '请选择支付方式',
								type: 'warning'
							});
					}
					// else if(this.expenditureInfo.skrdh==''){
					// 	this.$message({
					// 			message: '请填写收款人电话',
					// 			type: 'warning'
					// 		});
					// }
					else if(this.expenditureInfo.je==''){
						this.$message({
								message: '请填写金额',
								type: 'warning'
							});
					}
					else if(1>this.expenditureInfo.je){
							this.$message({
								message: '汇款金额必须大于0',
								type: 'warning'
							});
					}
					else{

						var params = {
							page_size:'10',
							current_page:'1',
							tfAdvances: dian,  //是否为垫付 
							eid:this.getEidS,									     //费用类型
							tid:this.trainsID,       							     //车次ID  若为垫付，则车次为必填
							expendType:this.expenditureInfo.zffs,        //支付类型
							payeePhone:this.expenditureInfo.skrdh,       //收款人电话
							payeeName:this.expenditureInfo.skr,          //收款人
							amount:this.expenditureInfo.je,        	     //金额
							tieName:this.expenditureInfo.jkr,            //结款人 页面默认填充当前登录用户名称，可手动更改
							payeeAccount:this.expenditureInfo.skzh,   //收款账户
							remark:this.expenditureInfo.remark
						};
						PAY.index(params).then(response => {
			              if(response.data.status='Y'){
			              	this.$router.push({ path: '/expenditure/expendHistory'})
			              }
			                //this.dataResults = response.data.results
			            })
					}
				}
				else{
					// 不垫付
					if(this.expenditureInfo.fylx==''){
							this.$message({
									message: '请选择费用类型',
									type: 'warning'
								});
						}
						else if(this.expenditureInfo.zffs==''){
							this.$message({
									message: '请选择支付方式',
									type: 'warning'
								});
						}
						else if(this.expenditureInfo.je==''){
							this.$message({
									message: '请填写金额',
									type: 'warning'
								});
						}
						else{
							var dian='N';
							var params = {
								page_size:'10',
								current_page:'1',
								tfAdvances: dian,  //是否为垫付 
								eid:this.getEidS,									     //费用类型
								tid:this.trainsID,       							     //车次ID  若为垫付，则车次为必填
								expendType:this.expenditureInfo.zffs,        //支付类型
								payeePhone:this.expenditureInfo.skrdh,       //收款人电话
								payeeName:this.expenditureInfo.skr,          //收款人
								amount:this.expenditureInfo.je,        	     //金额
								tieName:this.expenditureInfo.jkr,            //结款人 页面默认填充当前登录用户名称，可手动更改
								payeeAccount:this.expenditureInfo.skzh,   //收款账户
								remark:this.expenditureInfo.remark
							};
							PAY.index(params).then(response => {
				              if(response.data.status='Y'){
				              	this.$router.push({ path: '/expenditure/expendHistory'})
				              }
				                //this.dataResults = response.data.results
				            })
						}
					
				}
				

			},
			getspending(){
				// 获取费用类型
				spending.index().then(response => {
					this.fylxList = response.data.results.filter(function(item){
						return item.status == 'Y'})
	                	//this.fylxList = response.data.results;
	            })
			},
			gettrainList(){
				// 获取车次信息
				train.list(this.trainParams).then(response => {
	                	this.gridData = response.data.results.list;
                    this.total = response.data.results.total;

                })
			},
            handleCurrentChange1(val){
                this.trainParams.current_page = val;
                this.gettrainList();
            }
		},
		
	}
</script>