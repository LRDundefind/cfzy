<template>
    <div class="creditRules">
        <!-- <label>赊账规则</label> -->
        <div class="clearfix m-t-10">
            <el-button class="floatRight" type="primary" size="small" @click="dialogVisible = true">编辑</el-button>
        </div>
        <div class="b-c-f m-t-10 m-b-30 f-s-14 c-6">
            <div class="remark c-6 f-s-14">
                <el-form ref="creditData" :model="creditData" label-width="120px">
                    <el-form-item label="赊账规则：">
                        <el-input :disabled="true" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="creditData.rules" :maxlength="GLOBAL.maxTextare" placeholder="请输入赊账规则"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog
                title="编辑"
                :visible.sync="dialogVisible"
                width="650px">
            <div class="">
                <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="edit.rules"
                          placeholder="请输入赊账规则" :maxlength = '420'></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRules" :loading="saveLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import '@/style/system/creditRules.scss';
    import {creditRules} from '@/services/apis/system/creditRules';

    export default {
        name: 'creditRules',
        data() {
            return {
                saveLoading:false,//保存loading
                dialogVisible: false,//模态框显示
                rules: '编辑赊账',//赊账规则
                creditData: {
                    rules: '',
                },
                edit:[],
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            //获取赊账规则
            getInfo(){
                creditRules.getInfo()
                    .then(response => {
                        if(response.data.results){
                            this.creditData.rules = response.data.results.rules;
                            this.edit = response.data.results; 
                        }else{
                            this.edit.rules = '';
                        }

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //编辑赊账规则
            editRules(){
                let data = this.edit;
                // if (this.edit.cid) {
                //     const data = this.edit;
                //     delete  data.uid;
                // }else{
                //     const data = this.edit;
                // }
                this.saveLoading = true;
                creditRules.editInfo(data)
                    .then(response => {
                        if(response.data.status == 'Y'){
                            this.getInfo();
                            this.dialogVisible = false;
                            this.saveLoading =false;
                        }else {
                            this.$message.error(response.data.error_msg);
                            this.saveLoading = false;
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
        },

    }
</script>