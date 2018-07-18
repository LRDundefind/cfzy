<template>
    <div class="personalData">
        <!-- <label>个人资料</label> -->
        <div class="clearfix m-t-10">
            <el-button class="floatRight" type="primary" size="small" @click="openPersonal('editForm')">编辑</el-button>
        </div>
        <div class="b-c-f b-c-f p-20 f-s-14 c-6 p-b-30">
            <div class="ub p-b-20 p-t-20 line">
                <div class="labelName">头像：</div>
                <div>
                    <!--<img :src="personalData.headImg" alt="" width="200" height="180">-->
                    <img v-show="personalData.headImg!=''" :src="imgpath+personalData.headImg" width="200" height="180">
                    <img v-show="personalData.headImg==''" src="../../assets/default/defautImg.png" alt="" width="200"
                         height="180">
                </div>
            </div>
            <div class="p-b-20 line">
                <div class="ub m-t-10">
                    <div class="labelName">姓名:</div>
                    <div>{{personalData.userName}}</div>
                </div>
            </div>

            <div class="ub p-b-20 p-t-20 line">
                <div class="labelName">身份证号：</div>
                <div>{{personalData.idCard}}</div>
            </div>

            <div class=" line p-b-20 p-t-20">
                <div class="ub ">
                    <div class="ub-f1 c-3 ub">
                        <div class="labelName">电话：</div>
                        <div class="">{{personalData.phone}}</div>
                    </div>
                    <div class="ub-f1 p-r-20">
                        <div class="ub ub-pe">
                            <el-button class="" type="danger" plain size="mini" @click="showPhone('phoneForm')">编辑
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" p-b-20 p-t-20 line">
                <div class="ub ">
                    <div class="ub-f1 c-3 ub">
                        <div class="labelName">登录密码：</div>
                        <div class="">**********</div>
                    </div>
                    <div class="ub-f1 p-r-20">
                        <div class="ub ub-pe">
                            <el-button class="" type="danger" plain size="mini" @click="showPassword('passForm')">
                                编辑
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ub p-b-20 p-t-20 line">
                <div class="ub-f1">
                    <div class="ub">
                        <div class="labelName">银行名称：</div>
                        <div>{{personalData.bankName}}</div>
                    </div>
                </div>
                <div class="ub-f1">
                    <div class="ub">
                        <div class="labelName">户名：</div>
                        <div>{{personalData.bankStatus}}</div>
                    </div>
                </div>
                <div class="ub-f1">
                    <div class="ub">
                        <div class="labelName">卡号：</div>
                        <div>{{personalData.bankNum}}</div>
                    </div>
                </div>
                <div class="ub-f1"></div>
            </div>

            <div class="ub p-b-20 p-t-20 line">
                <div class="labelName">注册时间：</div>
                <div>{{personalData.createTime}}</div>
            </div>
        </div>
        <!--设置个人资料    -->
        <el-dialog title="修改个人资料" :visible.sync="dialogFormVisible" width="650px">
            <el-form ref="editForm" :model="editForm" label-width="100px">
                <el-form-item label="姓名：">
                    <el-input v-model="editForm.userName" size="small" placeholder="请输入名字" :maxlength='18'></el-input>
                </el-form-item>

                <el-form-item label="身份证号：">
                    <el-input v-model="editForm.idCard" size="small" placeholder="请输入身份证号"></el-input>
                </el-form-item>

                <el-form-item label="银行名称：">
                    <el-input v-model="editForm.bankName" size="small" placeholder="请输入银行名称" :maxlength='50'></el-input>
                </el-form-item>

                <el-form-item label="户名：">
                    <el-input v-model="editForm.bankStatus" size="small" placeholder="请输入户名" :maxlength='16'></el-input>
                </el-form-item>

                <el-form-item label="卡号：">
                    <el-input v-model="editForm.bankNum" size="small" placeholder="请输入卡号" :maxlength='20'></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="editPersonal()" size='small' :loading="personalLoading">确 定
                </el-button>
            </div>
        </el-dialog>

        <!--修改密码-->
        <el-dialog title="修改密码" :rules="passRules" :visible.sync="dialogPasswordVisible" width="650px">
            <el-form :model="passForm" status-icon :rules="passRules" ref="passForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item label="当前密码：" prop="old_password">
                    <el-input type="password" v-model="passForm.old_password" auto-complete="off" size="small"
                              placeholder="请输入6-16位数字和字母的组合"></el-input>
                </el-form-item>

                <el-form-item label="输入新密码：" prop="password">
                    <el-input type="password" v-model="passForm.password" auto-complete="off" size="small"
                              placeholder="请输入6-16位数字和字母的组合"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="checkPass">
                    <el-input type="password" v-model="passForm.checkPass" auto-complete="off" size="small"
                              placeholder="请输入6-16位数字和字母的组合"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPasswordVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="alterPassword('passForm')" size='small' :loading="passwordLoading">
                    确 定
                </el-button>
            </div>
        </el-dialog>

        <!--修改手机号-->
        <el-dialog title="修改手机号" :rules="phoneRules" :visible.sync="dialogPhoneVisible" width="650px">
            <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item label="新的手机号：" prop="phone">
                    <el-input v-model="phoneForm.phone" auto-complete="off" placeholder="请输入新的手机号"
                              size="small"></el-input>
                </el-form-item>

                <el-form-item label="验证码：" prop="code">
                    <div class="ub">
                        <div>
                            <el-input v-model="phoneForm.code" auto-complete="off" placeholder="请输入4位验证码"
                                      class="validate" size="small" :maxlength='4'></el-input>
                        </div>
                        <div>
                            <el-button type="primary" v-show="show" @click="daojishi(phoneForm.phone)" size="small">
                                获取验证码
                            </el-button>
                            <el-button type="primary" v-show="!show" disabled size="small">{{count + '秒后获取'}}
                            </el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPhoneVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="alterPhone('phoneForm')" size='small'>确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import '@/style/system/personalData.scss';
    import {personal} from '@/services/apis/system/personal';
    import {login} from '@/services/apis/login'
    import Cookies from 'js-cookie'

    const TIME_COUNT = 60;
    export default {
        name: 'personalData',
        data() {
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
            };//手机号验证规则
            //身份证校验
            // var checkIDcard = (rule, value, callback) =>{
            //     var IDreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            //     if (!IDreg.test(value)) {
            //         callback(new Error(' 请输入有效的身份证号！'));
            //     }else{
            //         callback();
            //     }
            // }
            //密码格式验证
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                setTimeout(() => {
                    var myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                    if (!myreg.test(value)) {
                        callback(new Error(' 密码格式不正确'));
                    } else {
//                        if (this.passForm.checkPass !== '') {
//                            this.$refs.passForm.validateField('checkPass');
//                        }
                        callback();
                    }
                }, 500);
            };

            //密码一致性验证
            var validateCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                personalLoading: false,
                passwordLoading: false,
                imgpath: process.env.BASE_PATH,
                dialogFormVisible: false,//个人资料模态框
                dialogPhoneVisible: false,//手机号模态框
                dialogPasswordVisible: false,//密码模态框
                sendMsgDisabled: false,
                show: true,
                count: '',
                timer: null,
                auth: {
                    key: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJRqAC45zJt7CFWUuRQgA+mm", //加密的key
                    randomKey: '' //生成签名的key
                },
                editForm: {
                    userName: '',
                    idCard: '',
                    bankName: '',
                    bankStatus: '',
                    bankNum: '',
                },//编辑个人资料
                personalData: {
                    headImg: '',
                    userName: '',
                    idCard: '',
                    phone: '',
                    password: '',
                    bankName: '',
                    bankStatus: '',
                    bankNum: '',
                    createTime: '',
                },//获取个人资料
                passForm: {
                    old_password: '',
                    password: '',
                    checkPass: '',
                },//密码表单
                phoneForm: {
                    phone: '',
                    code: '',
                },//密码表单
                currentPage4: 4,
                phonesend: {},//修改手机号参数
                passRules: {
                    old_password: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                    checkPass: [
                        {validator: validateCheck, trigger: 'blur'},
                    ],
                },//修改密码验证规则
                phoneRules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkTelephone, trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '验证码不能为空'},
                    ],
                },//修改手机号验证规则
            }
        },
        mounted() {
            //初始化数据--企业信息
            this.getInfo();
        },

        methods: {
            //修改个人资料模态框
            openPersonal(formName){
                this.getInfo();
                this.dialogFormVisible = true;
            },
            //修改手机号模态框
            showPhone(formName){
                this.dialogPhoneVisible = true;
                this.$refs[formName].resetFields();
                clearInterval(this.timer);
                this.time = null;
                this.count = '';
                this.show = true;
            },
            //修改密码模态框
            showPassword(formName){
                this.dialogPasswordVisible = true;
                this.$refs[formName].resetFields();
            },

            //获取个人资料
            getInfo(){
                personal.getInfo()
                    .then(response => {
                        this.personalData = response.data.results;
                        Cookies.set('userName', this.personalData.userName);

                        let defaultImg = require('../../assets/default/defautImg.png');
                        //编辑表单的信息
                        this.editForm.userName = response.data.results.userName;
                        window.localStorage.setItem('userName', this.editForm.userName);     //姓名
                        this.editForm.idCard = response.data.results.idCard;
                        this.editForm.bankName = response.data.results.bankName;
                        this.editForm.bankStatus = response.data.results.bankStatus;
                        this.editForm.bankNum = response.data.results.bankNum;
                        //服务器未传回图片的情况下，展示本地图片
//                        if(this.personalData.headImg == ''){
//                            this.personalData.headImg = defaultImg;
//                        }
                        this.personalData.password = '**********';
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //编辑个人资料
            editPersonal(){
                const data = this.editForm;
                if (data.bankName == '' && data.bankNum == '' && data.bankStatus == '' && data.idCard == '' && data.userName == '') {
                    this.$message.error('请完善个人资料');

                } else {
                    if (data.idCard != '' && !new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(data.idCard)) {
                        this.$message.error('请输入有效的身份证号！');
                    } else {
                        this.personalLoading = true;
                        personal.editInfo(data)
                            .then(response => {
                                if (response.data.status == 'Y') {
                                    this.$message({
                                        message: '个人资料设置成功',
                                        type: 'success'
                                    });
                                    this.getInfo();
                                    this.dialogFormVisible = false;
                                    this.personalLoading = false;
                                } else if (response.data.status == 'N') {
                                    this.personalLoading = false;
                                }
                                this.personalLoading = false;
                            })
                    }
                }
            },
            //修改手机号
            alterPhone(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data = this.phoneForm;
                        console.log(data);
//                if(data.code == ''){
//                    this.$message.error('请输入验证码');
//                    return false;
//                }
                        personal.alterPhone(data)
                            .then(response => {
                                if (response.data.status == 'Y') {
                                    this.$message({
                                        message: '手机号设置成功',
                                        type: 'success'
                                    });
                                    this.getInfo();
                                    this.dialogPhoneVisible = false;
                                    this.phoneForm.phone = '';
                                    this.phoneForm.code = '';
                                    this.show = true;
                                    const TIME_COUNT = 60;
                                } else if (response.data.status == 'N') {
                                    this.$message.error(response.data.error_msg);
                                }
                            })
                            .catch(function (response) {
                                console.log(response);
                            });
                    } else {
                        this.$message.error('请填写完整后提交');
                        return false;
                    }
                })

            },
            //修改密码
            alterPassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data = this.passForm;
                        if (data.password == data.old_password) {
                            this.$message.error('新密码与旧密码相同，请重新输入');
                            return false;
                        }
                        this.passwordLoading = true;
                        personal.alterPassword(data)
                            .then(response => {
                                if (response.data.status == 'Y') {
                                    this.$message({
                                        message: '密码设置成功',
                                        type: 'success'
                                    });
                                    this.dialogPasswordVisible = false;
                                    this.passForm.old_password = '';
                                    this.passForm.password = '';
                                    this.passForm.checkPass = '';
                                    this.passwordLoading = false;
                                } else if (response.data.status == 'N') {
                                    this.passwordLoading = false;
                                    this.$message.error(response.data.error_msg);
                                } else {
                                    this.passwordLoading = false;
                                }

//                        console.log(this.response);
                            })
                            .catch(function (response) {
                                console.log(response);
                            });
                    } else {
                        this.$message.error('请填写完整后提交');
                        return false;
                    }
                });
            },
            //获取验证码
            daojishi(account){
                //console.log(account);
                if (!(new RegExp(/^1[3|4|5|7|8][0-9]{9}$/).test(account))) {
                    this.$message.error('请输入有效的手机号码！');
                    return false;
                }
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
                // 调取接口获取验证信息

                this.phonesend.phone = this.phoneForm.phone;
                this.phonesend.verCodeName = 'Forget';

                let params2 = {
                    'str': strEnc(JSON.stringify(this.phonesend), this.auth.key, this.auth.key, this.auth.key)
                };
                login.getmessname(params2)
                    .then(response => {
                        if (response.data.status == 'Y') {
                            this.$message({
                                message: '验证码发送成功',
                                type: 'success'
                            });
                        } else if (response.data.status == 'N') {
                            this.$message.error(response.data.error_msg);
                        } else {

                        }
                    })
            },
        },

    }
</script>