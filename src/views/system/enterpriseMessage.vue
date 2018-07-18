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
                    <el-input v-model="editEnterprise.name" size="small" placeholder="请输入企业名称" :maxlength = '50'></el-input>
                </el-form-item>
                <div class="ub">
                    <div class="ub-f1">
                        <el-form-item label="公司宣传照：">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :on-change="onChange1"
                                    :before-upload="beforeAvatarUpload"
                                    :auto-upload="false">
                                <img v-if="editEnterprise.proImg" :src="editEnterprise.proImg"
                                     class="avatar">
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
                                    :on-success="handleAvatarSuccess"
                                    :on-change="onChange2"
                                    :before-upload="beforeAvatarUpload"
                                    :auto-upload="false">
                                <img v-if="editEnterprise.licenseImg" :src="editEnterprise.licenseImg" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item label="公司简介：">
                    <el-input type="textarea" v-model="editEnterprise.descript" placeholder="请输入公司简介" :maxlength = '420' ></el-input>
                </el-form-item>

                <el-form-item label="税号：">
                    <el-input v-model="editEnterprise.taxNo" size="small" placeholder="请输入税号" :maxlength = '50'></el-input>
                </el-form-item>

                <el-form-item label="经营范围：">
                    <el-input type="textarea" v-model="editEnterprise.businessScope " placeholder="请输入经营范围" :maxlength = '420'></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size='small'>取 消</el-button>
                <el-button type="primary" @click="alterInfo" size='small' :loading="editLoading">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import '@/style/system/enterpriseMessage.scss';
    import {enterprise} from '@/services/apis/system/enterprise';
    import Cookies from 'js-cookie'

    export default {
        name: 'enterpriseMessage',
        data() {
            return {
                editLoading:false,//编辑loading
                enterpriseForm: {
                    compayName: '',
                    proImg: '',
                    licenseImg: '',
                    imageUrl: '',
                    descript: '',
                    taxNo: '',
                    businessScope: '',
                },//企业信息

                editEnterprise: {
                    name: '',
                    proImg: '',//公司宣传照
                    licenseImg: '',//营业执照文件
                    descript: '',//公司简介
                    taxNo: '',//税号
                    businessScope: '',//经营范围
                },//编辑企业信息
                dialogFormVisible: false,//编辑企业模态框
                currentPage4: 4,//当前页
                doMain:process.env.BASE_PATH
            }
        },
        mounted() {
            //初始化数据--企业信息
            this.getInfo();
        },
        methods: {
            //获取企业信息
            getInfo(){
                enterprise.getInfo()
                    .then(response => {
                        if(response.data.results !=''){
                            this.enterpriseForm = response.data.results;
                            //存储公司名字
                            Cookies.set('compayName', this.enterpriseForm.compayName);
                            window.localStorage.setItem('compayName', this.enterpriseForm.compayName);
                            let defaultImg = require('../../assets/default/defautImg.png');
                            let picture1 = this.enterpriseForm.proImg;
                            let picture2 = this.enterpriseForm.licenseImg;
                            //图片的处理
                            if(picture1 ==''){
                                this.enterpriseForm.proImg = defaultImg;
                                this.editEnterprise.proImg = defaultImg;
                            }else{
                                this.enterpriseForm.proImg = this.doMain + picture1;
                                this.editEnterprise.proImg = this.doMain + picture1;
                            }
                            //编辑企业赋值
                            this.editEnterprise.cid = response.data.results.cid;
                            this.editEnterprise.name = response.data.results.compayName;
                            this.editEnterprise.descript = response.data.results.descript;
                            this.editEnterprise.taxNo = response.data.results.taxNo;
                            this.editEnterprise.businessScope = response.data.results.businessScope;

                            if(picture2 ==''){
                                this.enterpriseForm.licenseImg = defaultImg;
                                this.editEnterprise.licenseImg = defaultImg;
                            }else{
                                this.enterpriseForm.licenseImg = this.doMain + picture2;
                                this.editEnterprise.licenseImg = this.doMain + picture2;
                            }
                        }else {
                            let defaultImg = require('../../assets/default/defautImg.png');
                            this.enterpriseForm.proImg = defaultImg;
                            this.editEnterprise.proImg = defaultImg;
                            this.enterpriseForm.licenseImg = defaultImg;
                            this.editEnterprise.licenseImg = defaultImg;
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

            //编辑企业信息
            alterInfo(){
                const data = this.editEnterprise;
                if (data.licenseImg == this.enterpriseForm.licenseImg && this.enterpriseForm.licenseImg != '') {
                    data.licenseImg = '';
                } else {
                    this.convertImgToBase64(data.licenseImg, function (base64Img) {
                        data.licenseImg = base64Img;
                    })
                }

                if (data.proImg == this.enterpriseForm.proImg && this.enterpriseForm.proImg != '') {
                    data.proImg = '';
                } else {
                    this.convertImgToBase64(data.proImg, function (base64Img) {
                        data.proImg = base64Img;
                    })
                }

                delete data.uid;
                this.editLoading = true;
                enterprise.editInfo(data)
                    .then(response => {
                        if (response.data.status == 'Y') {
                            this.getInfo();
                            this.dialogFormVisible = false;
                            this.editLoading = false;
                        }else {
                            this.$message.error(response.data.error_msg);
                            this.editLoading = false;
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });

            },

            edit(){

            },
            handleAvatarSuccess(res, file) {
            },
            //处理图片base64
            onChange1(file){
                let _this = this;
                this.convertImgToBase64(file.url, function (base64Img) {
                    _this.editEnterprise.proImg = base64Img;
                })
            },
            //处理图片base64
            onChange2(file){
                let _this = this;
                this.convertImgToBase64(file.url, function (base64Img) {
                    _this.editEnterprise.licenseImg = base64Img;
                })
            },

            //图片上传之前的处理
             beforeAvatarUpload(file) {

             },

            // 图片转base64
            convertImgToBase64(url, callback, outputFormat){
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var img = new Image;
                img.src = url;
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    var width = img.width;
                    var height = img.height;
                    // 按比例压缩2倍
                    var rate = (width < height ? width / height : height / width) / 2;
                    canvas.width = width * rate;
                    canvas.height = height * rate;
                    ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
                    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                    callback.call(this, dataURL);
                    canvas = null;
                };
            }

        }
    }
</script>