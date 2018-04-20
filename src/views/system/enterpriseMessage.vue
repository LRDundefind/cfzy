<template>
	<div class="enterpriseMessage">
        <div class="title clearfix m-t-10">
            <!-- <label>企业信息</label> -->
            <el-button class="floatRight" type="primary" size="small" @click="dialogFormVisible = true">编辑</el-button>
        </div>

        <div class="b-c-f b-c-f p-20 f-s-14 c-6">
            <div class="ub p-b-20 line">
                <div class="labelName">企业名称：</div>
                <div>{{enterpriseForm.compayName}}</div>
            </div>
            <div class="ub p-b-20 p-t-20 line">
                <div class="ub ub-f1">
                    <div class="labelName">公司宣传照:</div>
                    <div>
                        <img :src="enterpriseForm.proImg" alt="" width="200" height="120">
                    </div>
                </div>
                <div class="ub ub-f1">
                    <div class="labelName">营业执照:</div>
                    <div>
                        <img :src="enterpriseForm.licenseImg" alt="" width="200" height="120">
                    </div>
                </div>
            </div>

            <div class="ub p-b-20 p-t-20 line">
                <div class="labelName">公司简介：</div>
                <div class="content">{{enterpriseForm.descript}}</div>
            </div>

            <div class="ub p-b-20 p-t-20 line">
                <div class="labelName">税号：</div>
                <div>{{enterpriseForm.taxNo}}</div>
            </div>
            <div class="ub p-b-20 p-t-20 line m-b-30">
                <div class="labelName">经营范围：</div>
                <div class="content">{{enterpriseForm.businessScope}}</div>
            </div>

        </div>

        <el-dialog title="编辑企业" :visible.sync="dialogFormVisible" width="800px">
            <el-form ref="editEnterprise" :model="editEnterprise" label-width="100px">
                <el-form-item label="企业名称：">
                    <el-input v-model="editEnterprise.name" size="small" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <div class="ub">
                    <div class="ub-f1">
                        <el-form-item label="公司宣传照：">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://192.168.1.138/uploadBase64"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :on-change="onChange"
                                    :before-upload="beforeAvatarUpload"
                                    :auto-upload="false">
                                <img v-if="editEnterprise.publicityUrl" :src="editEnterprise.publicityUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="ub-f1">
                        <el-form-item label="营业执照：">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess1"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="editEnterprise.businessUrl" :src="editEnterprise.businessUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item label="公司简介：">
                    <el-input type="textarea" v-model="editEnterprise.descript" placeholder="请输入公司简介"></el-input>
                </el-form-item>

                <el-form-item label="税号：">
                    <el-input v-model="editEnterprise.taxNo" size="small" placeholder="请输入税号"></el-input>
                </el-form-item>

                <el-form-item label="经营范围：">
                    <el-input type="textarea" v-model="editEnterprise.businessScope " placeholder="请输入经营范围"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>-->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="alterInfo" size='small'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

	import '@/style/system/enterpriseMessage.scss';
    import { enterprise } from '@/services/apis/system/enterprise';

	export default {
		name: 'enterpriseMessage',
		data() {
			return {
                enterpriseForm:{
                    compayName:'',
                    proImg:'',
                    licenseImg:'',
                    imageUrl: '',
                    descript:'',
                    taxNo:'',
                    businessScope:'',
                },//企业信息

                editEnterprise: {
                    name:'',
                    businessUrl:'',
                    publicityUrl: '',
                    descript:'',
                    taxNo:'',
                    businessScope:'',
                },//编辑企业信息
                dialogFormVisible: false,//编辑企业模态框
                currentPage4: 4,//当前页
			}
		},
        mounted() {
            //初始化数据--企业信息
            this.getInfo();
        },
		methods: {
            getInfo(){
                enterprise.getInfo()
                    .then(response => {
                        this.enterpriseForm = response.data.results;
                        window.localStorage.setItem('compayName', this.enterpriseForm.compayName);     //姓名
                        //编辑企业
                        this.enterpriseForm.compayName =response.data.results.compayName;
                        this.enterpriseForm.proImg =response.data.results.proImg;
                        this.enterpriseForm.licenseImg =response.data.results.licenseImg;
                        this.enterpriseForm.descript =response.data.results.descript;
                        this.enterpriseForm.taxNo =response.data.results.taxNo;
                        this.enterpriseForm.businessScope =response.data.results.businessScope;
                        //营业执照
                        this.editEnterprise = response.data.results;
                        this.editEnterprise.name = response.data.results.compayName;

                        this.enterpriseForm.licenseImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521890123693&di=7dbd80fbec58d331ae9c48af920b67e0&imgtype=0&src=http%3A%2F%2Fdocs.ebdoor.com%2FImage%2FCompanyCertificate%2F20%2F205903.jpg';
                        //公司宣传照访问链接
                        this.enterpriseForm.proImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521889995801&di=5d200fceb2699a182cb126140d9f9310&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131014%2F4863396_154539029325_2.jpg';
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

            //编辑企业信息
            alterInfo(){
                const data = this.editEnterprise;
                delete data.licenseImg;
                delete data.uid;
                delete data.proImg;
                delete data.compayName;

                enterprise.editInfo(data)
                    .then(response => {
//                        console.log(response);
                        this.getInfo();
                        this.dialogFormVisible = false;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });

            },


            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            edit(){

            },
            //处理图片
            handleAvatarSuccess(res, file) {
                this.form.publicityUrl = URL.createObjectURL(file.raw);
                console.log(this.form.publicityUrl)
            },
            //处理图片2
            handleAvatarSuccess1(res, file) {
                this.form.businessUrl = URL.createObjectURL(file.raw);
                console.log(this.form.businessUrl)
            },
            //图片上传之前的处理
            beforeAvatarUpload(file) {
                console.log(file)
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onChange(file) {
                console.log(file.url);
            },
            onSubmit() {
                this.dialogFormVisible = false;
                this.form.publicityUrl = this.form.url;
                //console.log(this.form);
            },

        }
	}
</script>