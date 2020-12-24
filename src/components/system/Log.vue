<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!--<el-form-item label="用户名" class="form-label">-->
                <!--<el-select v-model="formInline.operator" placeholder="用户名" :clearable="true">-->
                    <!--<el-option label="admin" value="admin"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="用户名" class="form-label">
                <el-input v-model="formInline.operator" placeholder="用户名"></el-input>
            </el-form-item>
            <!--<el-form-item label="选择时间" class="form-label">-->
                <!--<div class="block">-->
                    <!--<el-date-picker-->
                            <!--v-model="formInline.time"-->
                            <!--type="date"-->
                            <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                <!--</div>-->
            <!--</el-form-item>-->
            <el-form-item label="选择时间" class="form-label">
                <<el-date-picker
                    v-model="formInline.time"
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
        <el-table  :data="listOperation.slice((currentPage-1)*pagesize,currentPage*pagesize)" :current-page.sync="currentPage" border :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="operator" label="操作人员" align="center">
            </el-table-column>
            <el-table-column prop="events" label="操作详情" align="center">
            </el-table-column>
            <el-table-column  prop="time"  label="操作时间" align="center">
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5,10,15]"
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
        name: "Log",
        data(){
            return{
                listOperation:[],
                formInline: {
                    operator: '',
                    time:['','']
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
                getRequst('/operationLog/listAll').then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listOperation=resp.obj;
                    this.total=this.listOperation.length;
                    console.log(this.listOperation);
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
                if(this.formInline.time==null){
                    this.formInline.time=['','']
                }
                postKeyValueRequst('/operationLog/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listOperation=resp.obj;
                        this.total=this.listOperation.length;
                    }
                })
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

<style >
    .el-table td, .el-table th{
        padding: 8px 0!important;
    }
</style>