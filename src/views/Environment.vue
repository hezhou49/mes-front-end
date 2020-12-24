<template>
    <div style="margin: 10px 10px">
        <h2 style="color: #FFF94B;display: flex;margin-top: 0;">环境管理</h2>
        <el-tabs v-model="activeName" style="margin: 20px 20px 0px 20px" >
            <el-tab-pane label="车间环境监控" name="first" ><Monitoring></Monitoring></el-tab-pane>
            <el-tab-pane label="环境异常记录" name="second"><Log></Log></el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import Log from '../components/environment/Log'
    import Monitoring from '../components/environment/Monitoring'
    export default {
        name: "Environment",
        data(){
            return{
                activeName:"first"
            }
        },
        components:{
            Log,
            Monitoring
        }
    }
</script>

<style scoped>

</style>