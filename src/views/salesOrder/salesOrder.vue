<template>
    <div class="salesOrder">
        <label>销售开单</label>
        <!-- 内容 -->
        <div class="content">
        <!--切换标题-->
            <el-menu :default-active="$route.path" router class="el-menu-demo p-l-20" mode="horizontal">
                <el-menu-item index="/salesOrder/sales">销售开单</el-menu-item>
                <el-menu-item index="/salesOrder/tsList">暂存订单</el-menu-item>
            </el-menu>
            <router-view name="salesOrder" />
          
        </div>
    </div>

</template>
<style scoped>

</style>

<script>

    export default {
        name:'salesOrder',
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        created(){

        },
        methods:{
            
        }
    }
</script>