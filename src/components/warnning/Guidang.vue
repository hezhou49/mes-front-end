<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择产线" class="form-label">
                <el-select v-model="formInline.lineName" placeholder="选择产线" :clearable="true">
                    <el-option label="轿壁线" value="轿壁线"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称" class="form-label">
                <el-select v-model="formInline.equipmentName" placeholder="设备名称" :clearable="true">
                    <el-option label="加强筋机器人" value="加强筋机器人"></el-option>
                    <el-option label="组装机器人" value="组装机器人"></el-option>
                    <el-option label="外包板机器人" value="外包板机器人"></el-option>
                    <el-option label="打胶机器人" value="打胶机器人"></el-option>
                    <el-option label="加强筋折弯机" value="加强筋折弯机"></el-option>
                    <el-option label="打胶机" value="打胶机"></el-option>
                    <el-option label="翻边机" value="翻边机"></el-option>
                    <el-option label="外包板折弯机" value="外包板折弯机"></el-option>
                    <el-option label="冲床" value="冲床"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报警时间" class="form-label">
                <<el-date-picker
                    v-model="formInline.warntime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="listAll">刷新</el-button>
            </el-form-item>
        </el-form>
        <el-table  :data="listWarnningResume.slice((currentPage-1)*pagesize,currentPage*pagesize)" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="line" label="产线" align="center">
            </el-table-column>
            <el-table-column prop="equipmentname" label="设备名称" align="center">
            </el-table-column>
            <el-table-column  prop="warndetails"  label="报警详情" align="center">
            </el-table-column>
            <el-table-column  prop="warntime" label="报警时间" align="center">
            </el-table-column>
            <el-table-column prop="handlemeasure" label="处理措施" align="center">
            </el-table-column>
            <el-table-column prop="handleperson" label="处理人" align="center">
            </el-table-column>
            <el-table-column prop="handletime" label="处理时间" align="center">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5,10, 15]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>

</template>

<script>
    import {getRequst} from "../../utils/api";
    import {postKeyValueRequst} from "../../utils/api";

    export default {
        name: "Guidang",
        data(){
            return{
                listWarnningResume:[],
                formInline: {
                    equipmentName: '',
                    lineName: '',
                    warntime:['','']
                },
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
            }
        },
        created:function () {
            this.listAll()
        },
        methods:{
            // 访问数据库，listAll
            listAll(){
                getRequst('/warnning/warnResumeListAll').then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listWarnningResume=resp.obj;
                    this.total=this.listWarnningResume.length;
                    console.log(this.listWarnningResume);
                })
            },
            // 修改table tr行的背景色
            tableRowStyle({row, rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'background-color: #0476E9;color: #fff'
                }
                else
                    return 'background-color: #076DD7;color: #fff'
            },
            // 修改table header的背景色
            tableHeaderColor({row, column, rowIndex, columnIndex}) {
                if (rowIndex === 0) {
                    return 'background-color: #2556B5;color: #fff;font-size: 16px;font-weight: bold;'
                }
            },
            // 提交表单，进行查询
            onSubmit() {
                console.log(this.formInline);
                if(this.formInline.warntime==null){
                    this.formInline.warntime=['','']
                }
                postKeyValueRequst('/warnning/warnResumeListSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listWarnningResume=resp.obj;
                        this.total=this.listWarnningResume.length;
                    }
                })
            },
            handleWarn(index,row){
                console.log(row);
                this.dialogForm.lineName=row.lineName;
                this.dialogForm.equipmentName=row.equipmentName;
                this.dialogForm.warnDetails=row.warnDetails;
                this.dialogForm.warnTime=row.warnTime;
                this.dialogFormVisible = true
            },
            // 表格分页
            handleSizeChange(val) {
                this.pagesize=val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
        }
    }
</script>

<style scoped>

</style>