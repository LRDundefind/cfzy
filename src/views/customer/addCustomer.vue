<template>
    <div class="addCustomer f-s-14">
        <div class="ub ub-ac">
            <el-button @click="$router.go(-1)" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回
            </el-button>
            <div class="m-l-20 c-3">编辑客户</div>
        </div>

        <div class="b-c-f m-t-20 m-b-30 p-20">
            <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px" class="member-add">
                <p class="addTitle b-c-de p-l-20 m-b-20">基础信息</p>
                <el-form-item label="姓名：" prop="cusName">
                    <el-input :disabled="nameDisabled" v-model="dataForm.cusName" size="small"
                              placeholder="15字以内"></el-input>
                </el-form-item>

                <el-form-item label="昵称：" prop="nickname">
                    <el-input v-model="dataForm.nickname" size="small" placeholder="请输入昵称" :maxlength = '32'></el-input>
                </el-form-item>

                <el-form-item label="地址：" prop="address">
                    <el-input v-model="dataForm.address" size="small" placeholder="请输入地址" :maxlength = '50'></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="dataForm.phone" size="small" placeholder="请输入手机号" :maxlength = '11'></el-input>
                </el-form-item>

                <p class="addTitle b-c-de p-l-20 m-b-20">更多信息</p>

                <el-form-item label="身份证号：" prop="idCard">
                    <el-input :disabled="cardDisabled" v-model="dataForm.idCard" size="small"
                              placeholder="请输入身份证号"></el-input>
                </el-form-item>

                <el-form-item label="企业名称：" prop="company">
                    <el-input v-model="dataForm.company" size="small" placeholder="请输入企业名称" :maxlength = '50'></el-input>
                </el-form-item>

                <el-form-item label="状态：" prop="status">
                    <div class="p-r-20 floatLeft">
                        <el-switch v-model="dataForm.status" on-text="开" off-text="关" active-value="N"
                                   inactive-value="Y"
                        ></el-switch>
                    </div>
                    <span v-if="dataForm.status == 'Y'">黑名单</span>
                    <span v-else-if="dataForm.status == 'N'">正常</span>
                </el-form-item>

                <el-form-item label="备注：" prop="remark">
                    <el-input type="textarea" v-model="dataForm.remark" size="small" placeholder="请输入备注" :maxlength = '320'></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()" size="small">完成</el-button>
                </el-form-item>

            </el-form>
        </div>

    </div>
</template>

<script>
    import '@/style/customer/addCustomer.scss';
    import {customer} from '@/services/apis/customer.js'

    export default {
        name: 'addCustomer',
        data() {
            var checkTelephone = (rule, value, callback) => {
                if (value != '') {
                    setTimeout(() => {
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
                    }, 500);
                } else {
                    callback();
                }
            };//手机号验证规则
            var checkIdCard = (rule, value, callback) => {
                if (value != '') {
                    setTimeout(() => {
                        var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                        if (!myreg.test(value)) {
                            callback(new Error(' 请输入有效的身份证号码！'));
                        } else {
                            callback();
                        }
                    }, 500);
                } else {
                    callback();
                }
            };//身份证号码验证规则

            return {
                nameDisabled: false,//姓名disabled
                cardDisabled: false,//身份证disabled
                id: '',
                dataForm: {
                    nickname: '',
                    cusName: '',
                    phone: '',
                    idCard: '',
                    company: '',
                    address: '',
                    status: '',
                    remark: '',
                },//客户信息

                rules: {
                    name: [
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    petName: [
                        {message: '请选择活动区域', trigger: 'blur'}
                    ],
                    address: [
                        {message: '请输入地址', trigger: 'blur'}
                    ],
                    telephone: [
                        {validator: checkTelephone, trigger: 'blur'}
                    ],
                    IdCard: [
                        {validator: checkIdCard, trigger: 'blur'}
                    ],
                    remark: [
                        {message: '请填写活动形式', trigger: 'blur'}
                    ],
                },//表单验证规则
            }
        },
        created(){

        },
        mounted() {
            //路由传参
            this.id = this.$route.params.id;
            this.getInfo(this.id);
        },
        methods: {
            //获取客户详情
            getInfo(id){
                var params = {
                    cid: id,
                };
                customer.info(params)
                    .then(response => {
                        let data = response.data.results;
                        this.dataForm.nickname = data.nickname;
                        this.dataForm.cusName = data.cusName;
                        this.nameDisabled = this.dataForm.cusName == '' ? false : true;
                        this.dataForm.phone = data.phone;
                        this.dataForm.idCard = data.idCard;
                        this.cardDisabled = this.dataForm.idCard == '' ? false : true;

                        this.dataForm.company = data.company;
                        this.dataForm.address = data.address;
                        this.dataForm.status = data.status;
                        this.dataForm.remark = data.remark;
                        console.log(this.dataForm);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

            //保存客户信息
            submitForm() {
                let data = this.dataForm;
//                if(this.nameDisabled){
//                    data.cusName ='';
//                }
//                if(this.cardDisabled){
//                    data.idCard = '';
//                }
//                console.log(data);
                data.cid = this.id;
                if(data.status == 'N'){
                    data.reported = 'N'
                }

                customer.editInfo(data)
                    .then(response => {
                        if(response.data.status == 'Y'){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });

                            this.$router.push({
                                name: 'customDetails',
                                params: {
                                    id: this.id
                                }
                            })
                        }

                        console.log(response);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
//            addCustomer(){
//                this.$router.push({ path: '/addCustomer' });
//
//            },
        },
    }
</script>