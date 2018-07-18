<template>
	<el-card class="box-card">
		<el-table
            :data="creditList">
            <el-table-column
                prop="orderNo"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="客户昵称">
            </el-table-column>
            <el-table-column
                prop="address"
                label="客户地址">
            </el-table-column>
            <el-table-column
                prop="placeOrderTime"
                label="下单时间">
            </el-table-column>
            <!-- <el-table-column
                label="卖手">
            </el-table-column> -->

            <el-table-column
                label="编辑">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="setPrice(scope.row.oid)">设置单价</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
		  title="订单详情"
		  :visible.sync="dialogVisible"
		  width="800px"
		  top="5vh"
		  class="goodInfoDialog"
		  :close-on-click-modal=false>
		  	<el-form ref="orderForm" :model="orderForm" label-width="90px">
	            <el-card class="box-card">

	                <el-form-item label="车次：">
	                    {{creditInfo.trainsNum}}
	                </el-form-item>
	                <el-form-item label="客户：">
	                    {{creditInfo.nickname}}
	                </el-form-item>
	                <el-form-item label="卖手：">
	                    {{creditInfo.selName}}
	                </el-form-item>
	                
	            </el-card>
	            <el-card class="box-card m-t-20">

	                <h4 class="textCenter m-t-20 m-b-20">销售货品清单</h4>
	                <el-table
	                    :data="creditInfo.goods">
	                    <el-table-column
	                        prop="goodName"
	                        label="品名">
	                    </el-table-column>
	                    <el-table-column
	                        prop="goodNum"
	                        label="件数">
	                    </el-table-column>
	                    <el-table-column
	                        prop="netWeight"
	                        label="重量">
	                    </el-table-column>
	                    <el-table-column
	                        label="单价">
	                        <template slot-scope="scope">
                    			<el-input v-model="scope.row.price" placeholder="请输入单价" @change="priceInput(scope.$index)" size="mini"></el-input>

	                        </template>
	                    </el-table-column>
	                    <el-table-column
	                        prop="goodAmount"
	                        label="金额">
	                    </el-table-column>
	                    <el-table-column
	                        prop="packCost"
	                        label="包装费">
	                    </el-table-column>
	                    <!-- <el-table-column
	                        label="编辑"
	                        width="150">
	                        <template slot-scope="scope">
	                            <el-button type="primary" plain size="mini">编辑</el-button>
	                            <el-button type="danger" plain size="mini">删除</el-button>
	                        </template>
	                    </el-table-column> -->
	                </el-table>
	            </el-card>
	            <el-card class="box-card m-t-20">
	            	<el-form-item label="合计金额：">
	                    {{totalCost.total}}
	                </el-form-item>
	                <el-form-item label="货款金额：">
	                    {{totalCost.totalAmount}}
	                </el-form-item>
	                <el-form-item label="包装费：">
	                    {{creditInfo.packCost}}
	                </el-form-item>
	                <el-form-item label="过磅费：">
	                    {{creditInfo.weighCost}}
	                </el-form-item>
	                <el-form-item label="三轮车费：">
	                    {{creditInfo.deliveryCost}}
	                </el-form-item>
	                <el-form-item label="车牌号：">
	                    {{creditInfo.tricycleNo}}
	                </el-form-item>
	                <el-form-item label="备注：">
	                    {{creditInfo.remark}}
	                </el-form-item>
	            </el-card>
	        </el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="preservation">保 存</el-button>
			</span>
		</el-dialog>
	</el-card>
</template>
<style scoped>

</style>
<script>
    import '@/style/salesOrder/salesOrder.scss';
    import { sales } from '@/services/apis/sales'
	export default {

        data() {
			return {
				dialogVisible:false,
				orderOid: '',  //当前暂存订单的oid
				totalCost: {
					totalAmount: 0,  //货款费用总和-金额总和
					total: 0,  //合计金额
				},

    			creditList:[],
    			creditInfo:{},  //暂存订单详情
                orderForm:{}, 
			}
		},
		created(){

        },
		mounted() {
            this.getCreditList()
        },
        methods:{
        	getCreditList(){
        		sales.creditList().then(response => {
        			this.creditList = response.data.results
        		})

        	},
        	/**
        	 * 暂存订单弹窗
        	 * @param {[type]} id [订单id]
        	 */
            setPrice(id){
            	this.orderOid = id;
            	
            	sales.creditInfo({oid:id}).then(response => {
        			this.creditInfo = response.data.results;
        			for(var i = 0; i < this.creditInfo.goods.length; i++){
        				//未改变单价前的总货款 ， 初始货款 = 货品信息中所有的金额
						this.totalCost.totalAmount += this.creditInfo.goods[i]['goodAmount'];

        			}
        			
        			this.totalCost.total = parseInt(this.totalCost.totalAmount)+parseInt(this.creditInfo.packCost)+parseInt(this.creditInfo.weighCost)+parseInt(this.creditInfo.deliveryCost)
        			
        		})
            	this.dialogVisible = true;
            },
            priceInput(index){
            	var good = this.creditInfo.goods[index]
            	if(good.price == '' ){
	    			this.$message({
                      message: '请正确单价',
                      type: 'warning'
                    });
	    			good.goodAmount = '';
	    			this.totalCost.totalAmount = '';
	    			this.totalCost.total = '';
	    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(good.price)) || good.price > 9999.99){
	    			this.$message({
                      message: '请正确输入单价',
                      type: 'warning'
                    });
	    		}else{
	            	var params = {
	            		goodId: good.goodId,//单个货品id
						id: good.id,//单个货品id
						trainGoodId: good.trainGoodId,
						price: good.price,//单价
						goodNum: good.goodNum,//件数
						weight: good.weight,//重量
						weight_util: good.weight_util,//重量单位 
						sellUnit: good.priceUnit,//售卖单位
						slabWeight: good.slabWeight,//平板重
						slushing: good.slushing,  //减水重
			        	slushingUnit: good.slushingUnit,  //减水重单位
			        	packCoef: good.packCoef,  //包装费
			        	packCoefUnit: good.packCoefUnit,  //包装费单位
			        	poundCoef: good.poundCoef,  //过磅费
			        	poundCoefUnit: good.poundCoefUnit,  //过磅费单位
	            	}
	            	sales.goodCost(params).then(response => {
	            		this.totalCost.totalAmount = 0;
	            		this.totalCost.total = 0;
	            		good.goodAmount = response.data.results.goodAmount
	            		for(var i = 0; i < this.creditInfo.goods.length; i++){
							this.totalCost.totalAmount += this.creditInfo.goods[i]['goodAmount'];
	        			}
	        			this.totalCost.total = parseInt(this.totalCost.totalAmount)+parseInt(this.creditInfo.packCost)+parseInt(this.creditInfo.weighCost)+parseInt(this.creditInfo.deliveryCost)

	        		})
	            }
            },
            //保存
	        preservation(){
	            for(var i = 0;i < this.creditInfo.goods.length; i ++){
	            	if(this.creditInfo.goods[i].price == '' || !(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.creditInfo.goods[i].price)) || this.creditInfo.goods[i].price > 9999.99){
						this.$message({
                          message: '请正确输入单价',
                          type: 'warning'
                        });
						return false;
	            	}
	            }
				var params = {
					oid: this.orderOid,
					goods: this.creditInfo.goods
				};
				sales.deposit(params).then(response => {
					this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
					this.dialogVisible = false;
					this.getCreditList();
				})

	        },
        }
	}
</script>