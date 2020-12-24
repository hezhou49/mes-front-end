<template>
    <div style="margin: 10px 10px">
        <h2 style="color: #FFF94B;display: flex;margin-top: 0;">设备管理</h2>
        <el-tabs v-model="activeName" style="margin: 20px 20px 0px 20px" >
            <el-tab-pane label="能耗管理" name="first"  ><Energy></Energy></el-tab-pane>
            <el-tab-pane label="OEE管理" name="second" :lazy="isLazy"><OEE></OEE></el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import OEE from '../../components/equipment/OEE'
    import Energy from '../../components/equipment/Energy'
    export default {
        name: "Equipment",
        data(){
            return{
                activeName:"first",
                isLazy:true
            }
        },
        components:{
            OEE,
            Energy
        }
    }
</script>

<style scoped>

</style>