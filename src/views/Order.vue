<template>
    <div style="margin: 10px 10px">
        <h2 style="color: #FFF94B;display: flex;margin-top: 0;">订单管理</h2>
        <el-tabs v-model="activeName" style="margin: 20px 20px 0 20px" >
            <el-tab-pane label="当前订单" name="first" ><Current></Current></el-tab-pane>
            <el-tab-pane label="历史订单" name="second"><History></History></el-tab-pane>
            <el-tab-pane label="排产计划" name="third"><Plan></Plan></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Current from '../components/form/Current'
    import History from '../components/form/History'
    import Plan from '../components/form/Plan'
    export default {
        name: "Order",
        data(){
            return{
                activeName:"first"
            }
        },
        components:{
            Current,
            History,
            Plan
        }
    }
</script>

<style scoped>

</style>