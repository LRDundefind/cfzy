<template>
    <div class="feedBack f-s-14 c-3">
        <div class="ub ub-ac">
            <el-button @click="$router.go(-1)" type="info" class="goback-btn" size="mini" icon="el-icon-arrow-left">返回
            </el-button>
            <div class="m-l-20">意见反馈</div>
        </div>

        <div class="b-c-f m-t-20  m-b-30 p-20">

            <div class="contact ub p-t-20">
                <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px"
                         class="">
                    <el-form-item label="反馈内容：" prop="ideaInfo">
                        <el-input
                                type="textarea"
                                clearable
                                :maxlength="10000"
                                :rows="10"
                                placeholder="请输入反馈信息，最多10000字"
                                v-model="ruleForm.ideaInfo">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="联系方式：" prop="phone">
                        <el-input v-model="ruleForm.phone" auto-complete="off" size="small"
                                  placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="ub ub-pe">
                <el-button @click="submit()" class="settlement-btn" type="success">提交反馈</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/style/home/feedBack.scss';
    import {home} from '@/services/apis/home.api'

    export default {
        name: 'feedBack',
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
            };
            return {
                textarea3: '',
                phone: '',
                ruleForm: {
                    phone: '',
                    ideaInfo: '',
                },
                rules2: {
                    ideaInfo: [
                        { required: true, message: '请输入反馈内容', trigger: 'blur'}
                    ],
                    phone: [
                        {validator: checkTelephone, trigger: 'blur'}
                    ]
                },
            }
        },
        mounted() {

        },
        methods: {
            //提交反馈
            submit(){
                if(this.ruleForm.ideaInfo == ''){
                    this.$message({
                        message: '请输入反馈内容',
                        type: 'error'
                    });
                    return false;
                }
                home.feedBack(this.ruleForm)
                    .then(response => {
                        console.log(response);
                        this.$router.push({name: 'home'});

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

        },
    }
</script>