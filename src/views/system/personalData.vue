<template>
    <div class="personalData">
        <!-- <label>个人资料</label> -->
        <div class="clearfix m-t-10">
            <el-button class="floatRight" type="primary" size="small" @click="dialogFormVisible = true">编辑</el-button>
        </div>
        <div class="b-c-f b-c-f p-20 f-s-14 c-6 p-b-30">
            <div class="ub p-b-20 p-t-20 line">
                <div class="labelName">头像：</div>
                <div>
                    <img :src="personalData.headImg" alt="" width="200" height="180">
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
                            <el-button class="" type="danger" plain size="mini" @click="dialogPhoneVisible = true">编辑
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" p-b-20 p-t-20 line">
                <div class="ub ">
                    <div class="ub-f1 c-3 ub">
                        <div class="labelName">登陆密码：</div>
                        <div class="">{{personalData.password}}</div>
                    </div>
                    <div class="ub-f1 p-r-20">
                        <div class="ub ub-pe">
                            <el-button class="" type="danger" plain size="mini" @click="dialogPasswordVisible = true">
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
                    <el-input v-model="editForm.userName" size="small" placeholder="请输入名字"></el-input>
                </el-form-item>

                <el-form-item label="身份证号：">
                    <el-input v-model="editForm.idCard" size="small" placeholder="请输入身份证号"></el-input>
                </el-form-item>

                <el-form-item label="银行名称：">
                    <el-input v-model="editForm.bankName" size="small" placeholder="请输入银行名称"></el-input>
                </el-form-item>

                <el-form-item label="户名：">
                    <el-input v-model="editForm.bankStatus" size="small" placeholder="请输入户名"></el-input>
                </el-form-item>

                <el-form-item label="卡号：">
                    <el-input v-model="editForm.bankNum" size="small" placeholder="请输入卡号"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="editPersonal()" size='small'>确 定</el-button>
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
                <el-button type="primary" @click="alterPassword('passForm')" size='small'>确 定</el-button>
            </div>
        </el-dialog>

        <!--修改手机号-->
        <el-dialog title="修改手机号" :rules="phoneRules" :visible.sync="dialogPhoneVisible" width="650px">
            <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="passForm" label-width="120px"
                     class="demo-ruleForm">
                <el-form-item label="新的手机号：" prop="phone">
                    <el-input v-model="phoneForm.phone" auto-complete="off" placeholder="请输入新的手机号"
                              size="small"></el-input>
                </el-form-item>

                <el-form-item label="验证码：" prop="code">
                    <div class="ub">
                        <div>
                            <el-input v-model="phoneForm.code" auto-complete="off" placeholder="验证码"
                                      class="validate" size="small"></el-input>
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
                <el-button type="primary" @click="alterPhone" size='small'>确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import '@/style/system/personalData.scss';
    import {personal} from '@/services/apis/system/personal';
    const TIME_COUNT = 60;
    export default {
        name: 'personalData',
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
                dialogFormVisible: false,//个人资料模态框
                dialogPhoneVisible: false,//手机号模态框
                dialogPasswordVisible: false,//密码模态框
                sendMsgDisabled: false,
                show: true,
                count: '',
                timer: null,
                editForm: {
                    userName: '',
                    idCard: '',
                    bankName: '',
                    bankStatus: '',
                    bankNum: '',
                },//个人资料表单
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
                },
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
                },
                phoneRules: {
                    account: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkTelephone, trigger: 'blur'},
                    ],
                }
            }
        },
        mounted() {
            //初始化数据--企业信息
            this.getInfo();
        },

        methods: {
            //获取个人资料
            getInfo(){
                personal.getInfo()
                    .then(response => {
                        this.personalData = response.data.results;
                        this.personalData.password = '**********';
                        this.personalData.headImg = 'http://img5.imgtn.bdimg.com/it/u=1020377488,888137863&fm=27&gp=0.jpg';
                        //编辑表单的信息
                        this.editForm.userName = response.data.results.userName;
                        window.localStorage.setItem('userName', this.editForm.userName);     //姓名
                        this.editForm.idCard = response.data.results.idCard;
                        this.editForm.bankName = response.data.results.bankName;
                        this.editForm.bankStatus = response.data.results.bankStatus;
                        this.editForm.bankNum = response.data.results.bankNum;
                        //服务器未传回图片的情况下，展示本地图片
                        this.personalData.headImg = 'http://img4.imgtn.bdimg.com/it/u=2603659354,39736236&fm=27&gp=0.jpg';
                        this.personalData.password = '******';

//                        console.log(this.personalData.password);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //编辑个人资料
            editPersonal(){
                const data = this.editForm;
                personal.editInfo(data)
                    .then(response => {
//                        console.log(response);
                        this.getInfo();
                        this.dialogFormVisible = false;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });

            },
            //修改手机号
            alterPhone(){
                const data = this.phoneForm;
                personal.alterPhone(data)
                    .then(response => {
//                        console.log(this.response);
                        this.getInfo();
                        this.dialogPhoneVisible = false;

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //修改密码
            alterPassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const data = this.passForm;
                        delete data.checkPass;
                        personal.alterPassword(data)
                            .then(response => {
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
            
            daojishi(account){
//                console.log(account);
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
            },
        },

    }
</script>