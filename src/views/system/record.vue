<template>
    <div class="record">
        <!-- <label>档位管理</label> -->
        <div class="clearfix m-t-10">
            <el-button type="primary" class="floatRight" size="small"
                       @click="addNew">添加档位
            </el-button>
        </div>
        <!-- 内容 -->
        <div class="content">
            <!-- 档位列表 -->
            <el-table
                    stripe
                    :data="tableData"
                    v-loading="loading"
                    class="table-data-list">
                <el-table-column
                        prop="gearName"
                        label="档位名称">
                </el-table-column>
                <el-table-column
                        prop="markName"
                        label="所属市场">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="联系电话">
                </el-table-column>
                <el-table-column
                        prop="addTime"
                        label="添加时间">
                </el-table-column>
                <el-table-column
                        label="过磅系数">
                    <template slot-scope="scope">
                        {{scope.row.poundCoef}} {{scope.row.poundCoefUnit | sellNnit}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button type="primary" plain size="mini" @click="editGear(scope.row)">编辑</el-button>
                        <router-link :to="{ name: 'goodsType',params: { gid: scope.row.gid }}">
                            <el-button type="primary" plain size="mini">管理分类</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="上架/下架"
                    width="180">
                    <template slot-scope="scope">
                        <el-switch  v-model="scope.row.status" on-text="开" off-text="关" active-value="Y" inactive-value="N" @change=""></el-switch>
                    </template>
                </el-table-column> -->
            </el-table>
            <!-- <el-pagination
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination> -->
        </div>
        <el-dialog title="添加档位" :visible.sync="dialogFormVisible" width="800px" :before-close="dialogBeforeClose"
                   @close="defaultData(form)">
            <el-form :model="form" ref="ruleForm" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="档位名称：" prop="gearName">
                                <el-input v-model.trim="form.gearName" placeholder="请输入档位名称" style="width: 225px"
                                          :maxlength="GLOBAL.maxlength"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="所属市场：" prop="markName">
                                <el-select v-model.trim="form.markName" filterable allow-create placeholder="请选择所属市场"
                                           style="width: 225px" @change="selectMarket">
                                    <el-option v-for="item in marketList" :key="item.id" :label="item.marketName"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="地址：" prop="address">
                                <el-input v-model.trim="form.address" placeholder="请输入详细地址" style="width: 225px"
                                          :maxlength="GLOBAL.maxlength"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="联系电话：" prop="phone">
                                <el-input v-model.trim="form.phone" placeholder="请输入联系电话"
                                          style="width: 225px"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="过磅系数：" prop="poundCoef">
                                <el-input v-model.trim="form.poundCoef" placeholder="请输入过磅系数" style="width: 225px">
                                    <el-select v-model="form.poundCoefUnit" slot="append" placeholder="请选择"
                                               style="width: 94px">
                                        <el-option label="元/斤" value="unit_jin"></el-option>
                                        <el-option label="元/公斤" value="unit_kg"></el-option>
                                        <el-option label="元/公担" value="unit_cbd"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="日统计区间：" prop="time">
                                <!--<el-time-select-->
                                    <!--v-model="form.statisticalTime "-->
                                    <!--:clearable = false-->
                                    <!--:picker-options="{-->
                                    <!--start: '00:00',-->
                                    <!--step: '00:10',-->
                                    <!--end: '23:50'-->
                                    <!--}"-->
                                    <!--placeholder="选择时间">-->
                                <!--</el-time-select>-->

                                <el-cascader
                                        style="width: 225px"
                                        expand-trigger="hover"
                                        :options="options"
                                        separator = ':'
                                        v-model="selectedOptions1"
                                        @change="handleChange1">
                                </el-cascader>

                            </el-form-item>
                        </div>
                    </el-col>

                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" size='small'>取 消</el-button>
                <el-button type="primary" @click="addGear" size='small' :loading="buttonLoading">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑档位" :visible.sync="dialogEditFormVisible" width="800px">
            <el-form :model="editForm" ref="ruleEditForm" :rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="档位名称：" prop="gearName">
                                <el-input v-model.trim="editForm.gearName" placeholder="请输入档位名称" style="width: 225px"
                                          :maxlength="GLOBAL.maxlength"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="所属市场：" prop="markName">
                                <el-select v-model.trim="editForm.markName" @change="selectMarketEdit" filterable
                                           allow-create placeholder="请选择所属市场" style="width: 225px">
                                    <el-option v-for="item in marketList" :key="item.id" :label="item.marketName"
                                               :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="地址：" prop="address">
                                <el-input v-model.trim="editForm.address" placeholder="请输入详细地址" style="width: 225px"
                                          :maxlength="GLOBAL.maxlength"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="联系电话：" prop="phone">
                                <el-input v-model.trim="editForm.phone" placeholder="请输入联系电话"
                                          style="width: 225px"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="过磅系数：" prop="poundCoef">
                                <el-input v-model.trim="editForm.poundCoef" placeholder="请输入过磅系数" style="width: 225px">
                                    <el-select v-model="editForm.poundCoefUnit" slot="append" placeholder="请选择"
                                               style="width: 94px">
                                        <el-option label="元/斤" value="unit_jin"></el-option>
                                        <el-option label="元/公斤" value="unit_kg"></el-option>
                                        <el-option label="元/公担" value="unit_cbd"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="grid-content">
                            <el-form-item label="日统计区间：" prop="time">
                                <!--<el-time-select-->
                                    <!--v-model="editForm.statisticalTime "-->
                                    <!--:clearable = false-->
                                    <!--:picker-options="{-->
                                    <!--start: '00:00',-->
                                    <!--step: '00:10',-->
                                    <!--end: '23:50'-->
                                    <!--}"-->
                                    <!--placeholder="选择时间">-->
                                <!--</el-time-select>-->

                                <el-cascader
                                        style="width: 225px"
                                        expand-trigger="hover"
                                        :options="options"
                                        separator = ':'
                                        v-model="selectedOptions2"
                                        @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                        </div>
                    </el-col>


                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="editSure" size='small'>确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import '@/style/system/system.scss';
    import {record} from '@/services/apis/system/record';
    import Cookies from 'js-cookie'
    import Bus from '@/util/bus.js'
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

            return {
                options: [],
                selectedOptions1: [],
                selectedOptions2: [],
                areplay: null,
                addtitlist: false,
                loading: true,
                buttonLoading: false,
                dialogFormVisible: false,
                dialogEditFormVisible: false,
                marketList: [],
                form: {
                    gearName: '',
                    markName: '',
                    mid: '',
                    address: '',
                    phone: '',
                    poundCoef: '',
                    poundCoefUnit: 'unit_jin',
                    statisticalTime :'03:00',
                },
                editForm: {
                    the_gid: '',
                    gearName: '',
                    mid: '',
                    markName: '',
                    address: '',
                    phone: '',
                    poundCoef: '',
                    poundCoefUnit: 'unit_jin',
                    statisticalTime : '',
                },
                tableData: [],
                rules: {   //校验规则
                    gearName: [
                        {required: true, message: '请输入档位名称', trigger: 'blur'},
                    ],
                    markName: [
                        {required: true, message: '请选择所属市场', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'},
                        {validator: checkTelephone, trigger: 'blur'}
                    ],
                    poundCoef: [
                        // { type: 'number', message: '请输入数字值'},
                        {required: true, message: '请输入过磅系数', trigger: 'blur'},
                        {validator: this.GLOBAL.checkNumber, trigger: 'blur'}
                    ],
                }
                //total:100
            }
        },
        created(){


        },
        mounted() {
            for (var i = 0; i < 24; i++) {
                if (i>9) {
                    this.options.push({
                        value: ''+i,
                        label: ''+i,
                        children:[]
                    })
                }else{
                    this.options.push({
                        value: '0'+i,
                        label: '0'+i,
                        children:[]
                    })
                }
                for (var j = 0; j < 6; j++) {
                    this.options[i].children.push({
                        value: j+'0',
                        label: j+'0'
                    })
                }
            }

            this.getList();
            record.marketList().then(response => {
                this.marketList = response.data.results;
            })
        },
        methods: {
            //添加日统计区间
            handleChange1(value){
                this.form.statisticalTime= value[0] +':'+value[1];
            },
            //编辑日统计区间
            handleChange(value) {
                this.editForm.statisticalTime= value[0] +':'+value[1];
            },
            //获取档位列表
            getList(){
                var params = {
                    page_size: '20',
                    current_page: '1'
                }
                record.list(params)
                    .then(response => {
                        this.loading = false;
                        if (response.data.results != '') {
                            this.tableData = response.data.results.list;

                            if (this.tableData.length == 1 && this.addtitlist) {
                                let gid_list = JSON.stringify(this.tableData[0]);
                                Cookies.set('gid', gid_list);
                                this.addtitlist = false;
                                window.location.reload();
                            }
                            //档位添加成功后通过Bus传递到TitleBar组件，从而更新档位列表
                            Bus.$emit('setGear', this.tableData)
                        }
                        else {

                        }


                    })
            },
            //点击添加档位按钮
            addNew(){
                this.selectedOptions1 = [];
                this.selectedOptions1.push('03');
                this.selectedOptions1.push('00');
                this.dialogFormVisible = true;
                this.buttonLoading = false;
                this.form.statisticalTime = '03:00';
            },

            //判断市场是否有id
            marketId(val){
                for (var i = 0; i < this.marketList.length; i++) {
                    if (this.marketList[i].mid == val) {
                        return true
                    }
                }
            },
            //获取市场id
            selectMarket(val){
                if (this.marketId(val)) {
                    this.form.mid = val;
                    let obj = {};
                    obj = this.marketList.find((item) => {//这里的userList就是上面遍历的数据源
                        return item.id === val;//筛选出匹配数据
                    });
                    this.form.markName = obj.marketName
                }
                else this.form.mid = ''
            },
            //选择市场
            selectMarketEdit(val){
                if (this.marketId(val)) {
                    this.editForm.mid = val;
                    let obj = {};
                    obj = this.marketList.find((item) => {//这里的userList就是上面遍历的数据源
                        return item.id === val;//筛选出匹配数据
                    });
                    this.editForm.markName = obj.marketName
                }
                else this.editForm.mid = ''
            },
            //编辑档位
            editGear(data){
                this.editForm.the_gid = data.gid;
                this.editForm.gearName = data.gearName;
                this.editForm.mid = data.mid;
                this.editForm.markName = data.markName;
                this.editForm.address = data.address;
                this.editForm.phone = data.phone;
                this.editForm.poundCoef = data.poundCoef;
                this.editForm.poundCoefUnit = data.poundCoefUnit;
                this.editForm.statisticalTime = data.statisticalTime;
                this.selectedOptions2 = [];
                var time = this.editForm.statisticalTime;
                var time1 = (time.substring(0,2));
                var time2 = time.substring(3,5);

                this.selectedOptions2.push(time1);
                this.selectedOptions2.push(time2);
//                console.log(time);
//                console.log(this.selectedOptions2);
//                console.log(111111111);

                this.dialogEditFormVisible = true;
            },
            editSure(){
                this.$refs.ruleEditForm.validate((valid) => {
                    if (valid) {
                        this.buttonLoading = true;
                        record.edit(this.editForm)
                            .then(response => {
                                this.getList();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            })
                        this.dialogEditFormVisible = false;
                    }
                })

            },
            addGear(){
                this.$refs.ruleForm.validate((valid) => {
                    //console.log(valid)
                    if (valid) {
                        this.buttonLoading = true;
                        record.add(this.form)
                            .then(response => {

                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                let gids = JSON.parse(Cookies.get('gid')) || ''

                                if (gids.gid == '0') {
                                    this.addtitlist = true;
                                }
                                this.getList();
                            })
                        this.dialogFormVisible = false;
                        //重置表单
                        this.$refs.ruleForm.resetFields();

                    }
                })

            },
            //dialog关闭时执行
            dialogBeforeClose(done){
                //this.defaultData(this.form);
                this.$refs.ruleForm.resetFields();
                done();
            },
            //取消按钮执行
            cancel(){
                this.dialogFormVisible = false;
                //this.defaultData(this.form);
                this.$refs.ruleForm.resetFields();
            },
            //恢复默认数据
            defaultData(form){
                form.gearName = '';
                form.markName = '';
                form.address = '';
                form.phone = '';
                form.poundCoef = '';
                form.poundCoefUnit = 'unit_jin';
            },
        }
    }
</script>