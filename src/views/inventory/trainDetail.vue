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
							<label for="">起始地址：</label>
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
							<p>产品证明</p>
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
					<el-button type="primary" plain class="floatRight" @click='dialogFormVisible = true'>修改信息</el-button>
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
							<span>{{scope.row.goodNum}} 件</span>
				        </template>
				    </el-table-column>
				    <el-table-column
				        prop="goodPrice"
				        label="货品销售均价">
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
				        label="售卖单位">
				        <template slot-scope="scope">
							{{scope.row.sellUnit | sellNnit }}
				        </template>
				    </el-table-column>
				    <!-- <el-table-column
				        prop="rebates"
				        label="回扣">
				    </el-table-column> -->
				    <el-table-column
				        label="操作">
				        <template slot-scope="scope">
				        	<el-button type="primary" plain size="mini" @click='editGoodsInfo(scope.row.tid,scope.$index)'>编辑</el-button>
	        			</template>
				    </el-table-column>
			    </el-table>	
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
					<label>销售总金额：<span class='textRed'>{{dataList.sales_amount}}</span></label>
				</span>
				<span class='m-r-30'>
					<label>结算状态：<span class='textRed'>{{dataList.status}}</span></label>
				</span>
				<span class='m-r-30'>
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
			<div class="m-t-20 clearfix" v-show="dataList.status == '待汇款'">
				<router-link :to="{name:'train/statement',params: { tid: $route.params.tid }}">
				<el-button type="success" class="floatRight settlement-btn">查看结算单</el-button>
				</router-link>
			</div>
		</div>
		<el-dialog title="编辑货品信息" :visible.sync="dialogGoodsFormVisible" width="800px">
			<el-form :model='goodsForm' label-width="120px">
				<el-form-item label="货品销售均价：" style="width:300px">
					<el-input placeholder="输入货品数量" type='number' size='small' v-model="goodsForm.goodNum" >
				    <template slot="append">件</template>
					</el-input>
				</el-form-item>  		
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogGoodsFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="sureGoodsInfo" size='small'>确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="修改物流信息" :visible.sync="dialogFormVisible" width="800px" :before-close="beforeClose">
			<el-form :model="logisticsForm">
				<el-row>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">车次：</label>
							<el-input v-model="logisticsForm.trainsNum" placeholder="请输入类型名称" style="width: 200px"></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">车牌号码：</label>
							<el-input v-model="logisticsForm.plateNum" placeholder="请输入车牌号码" style="width: 200px"></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">司机：</label>
							<el-input v-model="logisticsForm.driverName" placeholder="请输入司机名称" style="width: 200px"></el-input>
				  		</div>
				  	</el-col>
				  	<el-col :span="12">
				  		<div class="grid-content">
							<label for="">司机电话：</label>
							<el-input v-model="logisticsForm.driverPhone" type="number" placeholder="请输入司机名称" style="width: 200px"></el-input>
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
					<p>产品证明</p>
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
							<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="dataList.logistics_info.remark"></el-input>
				  		</div>
				  	</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="editLogistics" size='small'>确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import '@/style/inventory/inventory.scss';
	import { train } from '@/services/apis/train';
	import { keyValue } from '@/services/apis/key-value';
	export default {
		data() {
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
					storage:[{
						payee_name:'王',
						payee_phone:'13132123123',
						ename:'运费',
						amount:200,
						tie_name:'李',
						remark:'经营范围是指国家允许企业生产和经营的商品类别、品种及服务项目。',
					},{
						payee_name:'王',
						payee_phone:'13132123123',
						ename:'运费',
						amount:200,
						tie_name:'李',
						remark:'hello',
					}],
					goods_amount:7200,
					sales_amount:7200,
					status:'待结算',
					marketing_cost:1200,
					commission:720,
					rebates:'',
				},
				logisticsForm:{
					tid:this.$route.params.tid,
					trainsNum: '',
					plateNum:'',
					driverName:'',
					driverPhone:'',
					checkProve:'',
					originProve:'',
					carrierContract:'',
					remark:''
				},
				goodsForm:{
					goodNum:''
				},
			}
		},
		mounted() {
			keyValue()
            .then(response => {
                this.keyValueData = response.data.results
            })
            
			this.getInfo();
			
			//this.goodsForm = 
			//console.log(this.$route.params.tid)
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
			getInfo(){
				var doMain = process.env.BASE_PATH;
				var logistics = this.dataList.logistics_info;
				var params = {
                    tid:this.$route.params.tid
                }
				train.info(params)
                .then(response => {
                    this.dataList = response.data.results
                    // this.imgUrl(this.dataList.logistics_info.checkProve);
                    // this.imgUrl(this.dataList.logistics_info.originProve);
                    // this.imgUrl(this.dataList.logistics_info.carrierContract);

                    if(this.dataList.logistics_info.checkProve.indexOf(doMain) == -1) this.dataList.logistics_info.checkProve = doMain + this.dataList.logistics_info.checkProve;
                    if (this.dataList.logistics_info.originProve.indexOf(doMain) == -1) this.dataList.logistics_info.originProve = doMain + this.dataList.logistics_info.originProve;
                    if (this.dataList.logistics_info.carrierContract.indexOf(doMain) == -1) this.dataList.logistics_info.carrierContract = doMain + this.dataList.logistics_info.carrierContract;
                    for (var Key1 in this.logisticsForm){
                		for (var Key2 in this.dataList.logistics_info){
                			if (Key1 == Key2) this.logisticsForm[Key1] = this.dataList.logistics_info[Key2]
                		}
				     	
				    }
                    this.loading = false
                })
                
			},
			editGoodsInfo(id,i){
				this.dialogGoodsFormVisible = true;
				this.goodsForm.goodNum = this.dataList.goods_info[i].goodNum;
				this.goodsForm.goodId = this.dataList.goods_info[i].goodId;
				
			},
			sureGoodsInfo(){
				var params = {
                    tid:this.$route.params.tid,
                    goodNum:this.goodsForm.goodNum,
                    goodId:this.goodsForm.goodId
                }
                train.editGoodsInfo(params)
                .then(response => {
                    this.dialogGoodsFormVisible = false;
                    this.getInfo();
                })
			},
			handleAvatarSuccess(res, file){
				
			},
			beforeAvatarUpload(file){
				
			},
			beforeClose(done){

			},
			onChange1(file){
				let _this = this;
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
			editLogistics(){
				let _this = this.logisticsForm;
				this.convertImgToBase64(_this.checkProve,function(base64Img){
					_this.checkProve = base64Img;
				})
				this.convertImgToBase64(_this.originProve,function(base64Img){
					_this.originProve = base64Img;
				})
				this.convertImgToBase64(_this.carrierContract,function(base64Img){
					_this.carrierContract = base64Img;
				})
				train.editLogistics(_this)
                .then(response => {
                	this.$message({
						message: '修改成功',
						type: 'success'
					});
					this.getInfo();
                    this.dialogFormVisible = false;
                })
			},
			// 图片转base64
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