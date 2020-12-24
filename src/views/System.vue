<template>
    <div style="margin: 10px 10px">
        <h2 style="color: #FFF94B;display: flex;margin-top: 0;">系统管理</h2>
        <el-tabs v-model="activeName" style="margin: 20px 20px 0px 20px" >
            <el-tab-pane label="用户管理" name="first" ><UserManagement></UserManagement></el-tab-pane>
            <el-tab-pane label="操作日志" name="second"><Log></Log></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Log from '../components/system/Log'
    import UserManagement from '../components/system/UserManagement'

    export default {
        name: "System",
        data(){
            return{
                activeName:"first"
            }
        },
        components:{
            Log,
            UserManagement
        }
    }
</script>

<style >
    .el-tabs__item.is-active{
        color: #FFF94B !important;
    }
    .el-tabs__item{
        font-size: 18px!important;
        color: #fff!important;
        font-weight: bold!important;
    }
    .el-tabs__active-bar{
        background-color: #FFF94B!important;
    }

</style>