<template>
	<div class="trainDetail">
		<el-button class="goback-btn" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button> <label>车次管理/车次详情</label>
		<!-- 内容 -->
		<div class="content" v-loading="loading">
			<!-- 货主信息 -->
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span>货主信息</span>
				</div>
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">姓名：</label>
							<span>{{dataList.goods_owner_info.shipName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">手机号码：</label>
							<span>{{dataList.goods_owner_info.phone}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">供应商名称：</label>
							<span>{{dataList.goods_owner_info.supplierName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">账户信息：</label>
							<span>{{dataList.goods_owner_info.acount}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">地址：</label>
							<span>{{dataList.goods_owner_info.address}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							
				  		</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<span>{{dataList.goods_owner_info.remark}}</span>
				  		</div>
				  	</el-col>
				</el-row>
			</el-card>
			<!-- 物流信息 -->
			<el-card class="box-card m-t-20">
				<div slot="header" class="clearfix">
				    <span>物流信息</span>
				</div>
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">车次：</label>
							<span>{{dataList.logistics_info.trainsNum}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">车牌号码：</label>
							<span>{{dataList.logistics_info.plateNum}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">司机：</label>
							<span>{{dataList.logistics_info.driverName}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">司机电话：</label>
							<span>{{dataList.logistics_info.driverPhone}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">入库时间：</label>
							<span>{{dataList.logistics_info.putStorageTime}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">发货地点：</label>
							<span>{{dataList.logistics_info.startAddress}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">产地：</label>
							<span>{{dataList.logistics_info.origin}}</span>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  		</div>
				  	</el-col>
				</el-row>
				<el-row>
				  	<el-col :span="8" class='textCenter'>
						<div class="grid-content">
							<div class='imgBox' :style="{backgroundImage:`url(${dataList.logistics_info.checkProve})`}">
								<!-- <img :src="dataList.logistics_info.check_prove" alt=""> -->
							</div>
							<p>检验证明</p>
						</div>
				  	</el-col>
				  	<el-col :span="8" class='textCenter'>
						<div class="grid-content">
							<div class='imgBox' :style="{backgroundImage:`url(${dataList.logistics_info.originProve})`}">
								<!-- <img :src="dataList.logistics_info.origin_prove" alt=""> -->
							</div>
							<p>产地证明</p>
						</div>
				  	</el-col>
				  	<el-col :span="8" class='textCenter'>
						<div class="grid-content">
							<div class='imgBox' :style="{backgroundImage:`url(${dataList.logistics_info.carrierContract})`}">
								<!-- <img :src="dataList.logistics_info.carrier_contract" alt=""> -->
							</div>
							<p>承运合同</p>
						</div>
				  	</el-col>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<span>{{dataList.logistics_info.remark}}</span>
				  		</div>
				  	</el-col>
				</el-row>
				<div class="m-t-20 clearfix">
					<el-button type="primary" plain class="floatRight" @click='editLogistics'>修改信息</el-button>
				</div>
			</el-card>
			<!-- 货品信息 -->
			<el-card class="box-card m-t-20">
				<div slot="header" class="clearfix">
				    <span>货品信息</span>
				</div>
				<el-table
					stripe
			      	:data="dataList.goods_info"
			      	style="width: 100%"
			      	class="table-data-list">
				    <el-table-column
				        prop="goodName"
				        label="货品名称"
				        width="180">
				    </el-table-column>
				    <el-table-column
				        label="货品数量"
				        width="180">
				        <template slot-scope="scope">
							<span>{{scope.row.goodNum}} {{scope.row.numUnit | sellNnit}}</span>
				        </template>
				    </el-table-column>
				    <el-table-column
				        label="货品销售均价">

                        <template slot-scope="scope">
                            <span class="p-r-5" v-if="scope.row.goodPricePie !='0'">{{scope.row.goodPricePie | format}} 元/件</span>

                            <span class="p-r-5" v-if="scope.row.goodPriceJin !='0'">{{scope.row.goodPriceJin | format}} 元/斤</span>

                            <span v-if="scope.row.goodPriceKg !='0'">{{scope.row.goodPriceKg | format}} 元/公斤</span>
                        </template>

				    </el-table-column>
				    <el-table-column
				        prop="lossNum"
				        label="货品损耗">
				    </el-table-column>
				    <el-table-column
				        prop="payment"
				        label="货款">
				    </el-table-column>
				    <!-- <el-table-column
				        prop="commission"
				        label="提成">
				    </el-table-column> -->
				    <el-table-column
				        label="默认售卖单位">
				        <template slot-scope="scope">
							{{scope.row.sellUnit | sellNnit }}
				        </template>
				    </el-table-column>
				    <!-- <el-table-column
				        prop="rebates"
				        label="回扣">
				    </el-table-column> -->
				    <el-table-column
				        label="操作"
				        v-if="dataList.logistics_info.settleStatus == 'status_not_selling'">
				        <template slot-scope="scope">
				        	<el-button type="primary" plain size="mini" @click='editGoodsInfo(scope.row.tid,scope.$index)'>编辑</el-button>
	        			</template>
				    </el-table-column>
			    </el-table>	
			    <div class="m-t-20 clearfix" v-if="dataList.logistics_info.settleStatus == 'status_not_selling'">
					<el-button type="primary" plain class="floatRight" @click='addGood'>添加货品</el-button>
				</div>
			</el-card>
			<!-- 入库结算 -->
			<el-card class="box-card m-t-20">
				<div slot="header" class="clearfix">
				    <span>入库结算</span>
				   <!--  <span class='floatRight'>总计费用：<span class="textRed">500</span></span> -->
				</div>
				<div class="libraryItem" v-for='item in dataList.storage'>
					<el-row>
					  	<el-col :span="6">
							<div class="grid-content">
								<label for="">收款人：</label><span>{{item.payeeName}}</span>
							</div>
					  	</el-col>
					  	<el-col :span="6">
							<div class="grid-content">
								<label for="">费用类型：</label><span>{{item.expendName}}</span>
							</div>
					  	</el-col>
					  	<el-col :span="6">
							<div class="grid-content">
								<label for="">金额：</label><span>{{item.amount}}</span>
							</div>
					  	</el-col>
					  	<el-col :span="6">
							<div class="grid-content">
								<label for="">收款人电话：</label><span>{{item.payeePhone}}</span>
							</div>
					  	</el-col>
					</el-row>
					<el-row>
					  	<el-col :span="6">
							<div class="grid-content">
								<label for="">结算人：</label><span>{{item.tieName}}</span>
							</div>
					  	</el-col>
					  	<el-col :span="18">
							<div class="grid-content">
								<label for="" class="floatLeft">备注：</label>
								<span>{{item.remark}}</span>
								<!-- <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="item.remark"></el-input> -->
							</div>
					  	</el-col>
					</el-row>
				</div>
			</el-card>
			<div class="m-t-20 clearfix">

				<span class='m-r-30'>
					<label>货款总金额：<span class='textRed'>{{dataList.goodCost | format}}</span></label>
				</span>
				<span class='m-r-30'>
					<label>销售总金额：<span class='textRed'>{{dataList.sales_amount | format}}</span></label>
				</span>
				<span class='m-r-30'>
					<label>结算状态：<span class='textRed'>{{dataList.status}}</span></label>
				</span>
				<span class='m-r-30' v-show="dataList.status == '待汇款' || dataList.status == '已汇款'">
					<label>代销费：<span class='textRed'>{{dataList.marketingCost | format}}</span></label>
				</span>
				<span class='m-r-30'>
					<label>提成费：<span class='textRed'>{{dataList.commission | format}}</span></label>
				</span>
				<span class='m-r-30'>
					<label>回扣：<span class='textRed'>{{dataList.rebates | format}}</span></label>
				</span>
				<router-link :to="{name:'train/orderList',params: { tid: $route.params.tid }}"><el-button type="text" class="floatRight">售卖订单<i class='el-icon-d-arrow-right'></i></el-button></router-link>

			</div>
			<div class="m-t-20 clearfix" v-show="dataList.status == '待结算'">
				<router-link :to="{name:'train/account',params: { tid: $route.params.tid }}">
				<el-button type="success" class="floatRight settlement-btn">结算</el-button>
				</router-link>
			</div>
			<div class="m-t-20 clearfix" v-show="dataList.status == '待汇款' || dataList.status == '已完成'">
				<router-link :to="{name:'train/statement',params: { tid: $route.params.tid }}">
				<el-button type="success" class="floatRight settlement-btn">查看结算单</el-button>
				</router-link>

                <router-link :to="{name:'train/carPrint',params: { tid: $route.params.tid }}">
                    <el-button type="success" class="floatRight settlement-btn" style="margin-right: 30px">查看车次结算明细</el-button>
                </router-link>

			</div>
		</div>
		<el-dialog title="编辑货品信息" :visible.sync="dialogGoodsFormVisible" width="800px">
			<el-form :model='goodsForm' label-width="120px">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<el-form-item label="货品名称：" style="width:300px">
								<el-input placeholder="输入货品名称" readonly size='small' v-model="goodsForm.goodName" @click.native="getGoodsList">
								</el-input>
							</el-form-item> 
							<div class="goodListClass" v-show="showGoodList">
								<p v-for="item in goodList.list" @click="selectGood(item)">{{item.goodName}}</p>
								<el-pagination
								    layout="prev, pager, next"
								    :total="goodList.total"
								    @current-change="currentChange">
								</el-pagination>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
				  		<div class="grid-content">
							<el-form-item label="入库量：" style="width:300px">
								<el-input placeholder="输入货品数量" type='number' size='small' v-model="goodsForm.goodNum" >
							    <!-- <template slot="append">{{goodsForm.unit | sellNnit}}</template> -->
							    <el-select v-model="goodsForm.numUnit" size='small' slot="append" placeholder="请选择" style="width: 80px">
	                                <el-option label="斤" value="unit_jin"></el-option>
	                                <el-option label="公斤" value="unit_kg"></el-option>
	                                <el-option label="件" value="unit_pie"></el-option>
	                            </el-select>
								</el-input>
							</el-form-item>  
						</div>
					</el-col>
					
				</el-row>		
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogGoodsFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="sureGoodsInfo" size='small'>确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改物流信息" :visible.sync="dialogFormVisible" width="800px">
			<el-form :model="logisticsForm" ref="ruleForm" :rules="rules" label-width="100px">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="车次：">
							<el-input v-model="logisticsForm.trainsNum" placeholder="请输入车次" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="车牌号码：">
							<el-input v-model="logisticsForm.plateNum" placeholder="请输入车牌号码" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="司机：">
							<el-input v-model="logisticsForm.driverName" placeholder="请输入司机名称" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="司机电话：" prop="driverPhone">
							<el-input v-model="logisticsForm.driverPhone" placeholder="请输入司机电话" style="width: 200px"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="产地：">
							<el-input v-model="logisticsForm.origin" placeholder="请输入产地" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
				  			<el-form-item label="发货地点：">
							<el-input v-model="logisticsForm.startAddress" placeholder="请输入发货地点" style="width: 200px" :maxlength="GLOBAL.maxlength"></el-input>
							</el-form-item>
				  		</div>
				  	</el-col>
				</el-row>
			
				<div class="textCenter m-t-20">
					
					<el-upload
					  class="avatar-uploader"
					  action=""
					  :show-file-list="false"
					  :auto-upload="false"
					  :on-change="onChange1"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <div class='imgBox' v-if="logisticsForm.checkProve" :style="{backgroundImage:`url(${logisticsForm.checkProve})`}">

					  </div>
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<p>检验证明</p>
				</div>

				<div class="textCenter m-t-20">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-change="onChange2"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <div class='imgBox' v-if="logisticsForm.originProve" :style="{backgroundImage:`url(${logisticsForm.originProve})`}">
					  </div>
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<p>产地证明</p>
				</div>
				<div class="textCenter m-t-20">
					
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-change="onChange3"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <div class='imgBox' v-if="logisticsForm.carrierContract" :style="{backgroundImage:`url(${logisticsForm.carrierContract})`}">
					  </div>
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<p>承运合同</p>
				</div>
				
				<el-row>
				  	<el-col :span="24">
						<div class="grid-content clearfix">
							<label for="" class="floatLeft">备注：</label>
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="logisticsForm.remark" :maxlength="GLOBAL.maxTextare"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="sureLogistics" size='small'>确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/inventory/inventory.scss';
	import { train } from '@/services/apis/train';
	import { record } from '@/services/apis/system/record';
	import { keyValue } from '@/services/apis/key-value';
	import Cookies from 'js-cookie'
	export default {
		data() {
			//手机校验
			var checkTelephone = (rule, value, callback) => {
                if (value != '') {
                    var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
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
			return {
				loading: true,
				dialogFormVisible:false,
				dialogGoodsFormVisible:false,
				keyValueData:{},
				dataSave:'',
				dataList:{
					goods_owner_info:{},
					logistics_info:{},
					goods_info:[],
					storage:[],
					goods_amount:'',
					sales_amount:'',
					status:'',
					marketing_cost:'',
					commission:'',
					rebates:'',
				},
				logisticsForm:{
					tid:this.$route.params.tid,
					trainsNum: '',
					plateNum:'',
					driverName:'',
					startAddress:'',
					origin:'',
					driverPhone:'',
					checkProve:'',
					originProve:'',
					carrierContract:'',
					remark:''
				},
				showGoodList:false,  //显示货品列表
				goodsForm:{
					goodNum:'',
					goodName:'',
					numUnit:'unit_jin'
				},
				goodListParams:{
					target_gid:JSON.parse(Cookies.get('gid')).gid,
					page_size:10,
					current_page:1
				},//货品列表参数
				goodList:'',  //货品列表
				rules: {
			        driverPhone: [
			            { validator: checkTelephone, trigger: 'blur' }
			        ],
		        }
			}
		},
		mounted() {
			//从键值表获取车次状态，结算状态等信息
			keyValue()
            .then(response => {
                this.keyValueData = response.data.results;
                this.getInfo();
            })
		},
		updated(){
			//结算状态转换
			for (var i = 0; i < this.keyValueData.car_status.length; i++) {
				if (this.dataList.status == this.keyValueData.car_status[i].key) {
					this.dataList.status = this.keyValueData.car_status[i].value
				}
			};
		},
		methods: {
			imgUrl(url){
				if (url.indexOf(process.env.BASE_PATH) == -1) return process.env.BASE_PATH + url
			},
			/**
			 * 获取货品列表
			 * @return {[type]} [description]
			 */
			getGoodsList(){
				this.showGoodList = !this.showGoodList;
                record.goodsList(this.goodListParams)
                .then(response => {
                	if (response.data.results) {
                		this.goodList = response.data.results
                	}
                    
                })
			},
			//选择货品
			selectGood(data){
				this.showGoodList = false;
				this.goodsForm.goodName = data.goodName;
				this.goodsForm.goodId = data.goodId;
			},
			//添加货品
			addGood(){
				this.dialogGoodsFormVisible = true;
				this.goodsForm.goodNum = '';
				this.goodsForm.goodName = '';
				this.goodsForm.goodId = '';
				this.goodsForm.id = '';
				this.goodsForm.numUnit = 'unit_jin';
			},
			//货品列表分页
			currentChange(value){
				this.goodListParams.current_page = value;
				this.getGoodsList();
				this.showGoodList = true;
			},
			getInfo(){
				
				let params = {
                    tid:this.$route.params.tid
                }
				train.info(params)
                .then(response => {
                    this.dataList = response.data.results
                    let doMain = process.env.BASE_PATH;
					let defaultImg = require('../../assets/default/defautImg.png'),
						checkProveImg = this.dataList.logistics_info.checkProve,
						originProveImg = this.dataList.logistics_info.originProve,
						carrierContractImg = this.dataList.logistics_info.carrierContract;
	                // this.imgUrl(this.dataList.logistics_info.checkProve);
	                // this.imgUrl(this.dataList.logistics_info.originProve);
	                // this.imgUrl(this.dataList.logistics_info.carrierContract);

	                for (var Key1 in this.logisticsForm){
	            		for (var Key2 in this.dataList.logistics_info){
	            			if (Key1 == Key2) this.logisticsForm[Key1] = this.dataList.logistics_info[Key2]
	            		}
				     	
				    }
				    //分别判断三张图片是否为空
				    if(checkProveImg ==''){
				    	this.logisticsForm.checkProve = defaultImg;
	                	this.dataList.logistics_info.checkProve = defaultImg;
	                }else{
	                	this.logisticsForm.checkProve = doMain + checkProveImg;
	                	this.dataList.logistics_info.checkProve = doMain + checkProveImg;
	                } 
	                if(originProveImg ==''){
	                	this.logisticsForm.originProve = defaultImg
	                	this.dataList.logistics_info.originProve = defaultImg;
	                }else{
	                	this.logisticsForm.originProve = doMain + originProveImg;
	                	this.dataList.logistics_info.originProve = doMain + originProveImg;
	                } 
	                if(carrierContractImg ==''){
	                	this.logisticsForm.carrierContract = defaultImg;
	                	this.dataList.logistics_info.carrierContract = defaultImg;
	                }else{
	                	this.logisticsForm.carrierContract = doMain + carrierContractImg;
	                	this.dataList.logistics_info.carrierContract = doMain + carrierContractImg;
	                }
                    this.loading = false
                })
                
			},
			/**
			 * 编辑货品弹出框
			 * @param  {[type]} id [货品id]
			 * @param  {[type]} i  [货品索引]
			 * @return {[type]}    [description]
			 */
			editGoodsInfo(id,i){
				this.dialogGoodsFormVisible = true;
				this.goodsForm.goodNum = this.dataList.goods_info[i].goodNum;
				this.goodsForm.goodName = this.dataList.goods_info[i].goodName;
				this.goodsForm.goodId = this.dataList.goods_info[i].goodId;
				this.goodsForm.id = this.dataList.goods_info[i].id;
				this.goodsForm.numUnit = this.dataList.goods_info[i].numUnit;
			},
			/**
			 * 确定修改货品
			 * @return {[type]} [description]
			 */
			sureGoodsInfo(){
				var params = {
                    tid:this.$route.params.tid,
                    id:this.goodsForm.id,
                    goodName:this.goodsForm.goodName,
                    goodNum:this.goodsForm.goodNum,
                    goodId:this.goodsForm.goodId,
                    numUnit:this.goodsForm.numUnit,
                    trainsNum: this.dataList.logistics_info.trainsNum
                }
                if (this.goodsForm.goodId!='' && this.goodsForm.goodNum!='') {
                	train.editGoodsInfo(params)
	                .then(response => {
	                    this.dialogGoodsFormVisible = false;
	                    this.getInfo();
	                })
                }else{
                	this.$message({
						message: '请完善货品信息',
						type: 'success'
					});
                }
                
			},
			handleAvatarSuccess(res, file){
				
			},
			beforeAvatarUpload(file){
				
			},
			beforeClose(done){

			},
			/**
			 * 三张图片分别上传（待优化）
			 * @param  {[type]} file [description]
			 * @return {[type]}      [description]
			 */
			onChange1(file){
				let _this = this;
				console.log(file.url);
				this.convertImgToBase64(file.url,function(base64Img){
					_this.logisticsForm.checkProve = base64Img;
				})
			},
			onChange2(file){
				let _this = this;
				this.convertImgToBase64(file.url,function(base64Img){
					_this.logisticsForm.originProve = base64Img;
				})
			},
			onChange3(file){
				let _this = this;
				this.convertImgToBase64(file.url,function(base64Img){
					_this.logisticsForm.carrierContract = base64Img;
				})
			},
			/**
			 * 编辑车次信息弹出框
			 * @return {[type]} [description]
			 */
			editLogistics(){
				this.dialogFormVisible = true;
			},
			/**
			 * 确定修改物流信息
			 * @return {[type]} [description]
			 */
			sureLogistics(){
				let _this = this.logisticsForm;
				
				if (_this.checkProve == this.dataList.logistics_info.checkProve) {
					_this.checkProve = '';
				}else{
					this.convertImgToBase64(_this.checkProve,function(base64Img){
						_this.checkProve = base64Img;
					})
				}
				
				if (_this.originProve == this.dataList.logistics_info.originProve) {
					_this.originProve = '';
				}else{
					this.convertImgToBase64(_this.originProve,function(base64Img){
						_this.originProve = base64Img;
					})
				}
				
				if (_this.carrierContract == this.dataList.logistics_info.carrierContract) {
					_this.carrierContract = '';
				}else{
					this.convertImgToBase64(_this.carrierContract,function(base64Img){
						_this.carrierContract = base64Img;
					})
				}
				
				this.$refs.ruleForm.validate((valid) => {

					if (valid) {

						train.editLogistics(_this)
		                .then(response => {
		                	this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.getInfo();
		                    this.dialogFormVisible = false;
		                })
					}
				})
				
			},
			/**
			 * 图片转base64的方法
			 * @param  {[type]}   url          [图片地址]
			 * @param  {Function} callback     [转换成功之后的回调]
			 * @param  {[type]}   outputFormat [description]
			 * @return {[type]}                [description]
			 */
			convertImgToBase64(url, callback, outputFormat){
				var canvas = document.createElement('CANVAS'); 
				var ctx = canvas.getContext('2d'); 
				var img = new Image; 
				img.src = url;
				img.crossOrigin = 'Anonymous'; 
				img.onload = function(){
				  var width = img.width;
				  var height = img.height;
				  // 按比例压缩2倍
				  var rate = (width<height ? width/height : height/width)/2;
				  canvas.width = width*rate; 
				  canvas.height = height*rate; 
				  ctx.drawImage(img,0,0,width,height,0,0,width*rate,height*rate); 
				  var dataURL = canvas.toDataURL(outputFormat || 'image/png'); 
				  callback.call(this, dataURL); 
				  canvas = null; 
				};
			}
		}
	}
</script>