<template>
    <div style="margin: 10px 10px">
        <h2 style="color: #FFF94B;display: flex;margin-top: 0;">报警管理</h2>
        <el-tabs v-model="activeName" style="margin: 20px 20px 0 20px" >
            <el-tab-pane label="现场报警" name="first" ><Xianchang></Xianchang></el-tab-pane>
            <el-tab-pane label="报警统计" name="second" :lazy="isLazy"><Tongji></Tongji></el-tab-pane>
            <el-tab-pane label="报警履历归档" name="third"><Guidang></Guidang></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import  Guidang from '../components/warnning/Guidang';
    import Tongji from '../components/warnning/Tongji';
    import Xianchang from '../components/warnning/Xianchang';

    export default {
        name: "Warnning",
        data(){
            return{
                activeName:"first",
                isLazy: true
            }
        },
        components:{
            Guidang,
            Tongji,
            Xianchang
        }
    }
</script>

<style scoped>

</style>