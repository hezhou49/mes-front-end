<template>
    <div>
        <div style="margin: 10px 10px">
            <h2 style="color: #FFF94B;display: flex;margin-top: 0;">质量管理</h2>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="选择产线" class="form-label">
                    <el-select v-model="formInline.lineName" placeholder="选择产线" :clearable="true">
                        <el-option label="轿壁线" value="轿壁线"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单号" class="form-label">
                    <el-input v-model="formInline.orderNum" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="报警类型" class="form-label">
                    <el-input v-model="formInline.warnType" placeholder="报警类型"></el-input>
                </el-form-item>
                <el-form-item label="选择时间" class="form-label">
                    <div class="block">
                        <el-date-picker
                                v-model="formInline.warnTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="listAll">刷新</el-button>
                </el-form-item>
            </el-form>
            <el-table  :data="listQuality.slice((currentPage-1)*pagesize,currentPage*pagesize)" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
                <el-table-column  type="index"  label="序号" align="center"  width="70">
                </el-table-column>
                <el-table-column prop="orderNum" label="订单号" align="center">
                </el-table-column>
                <el-table-column prop="lineName" label="产线" align="center">
                </el-table-column>
                <el-table-column  prop="equipmentName"  label="设备名称" align="center">
                </el-table-column>
                <el-table-column  prop="warnType" label="报警类型" align="center">
                </el-table-column>
                <el-table-column prop="warnTime" label="报警时间" align="center">
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
    </div>
</template>

<script>
    import {getRequst} from "../utils/api";
    import {postKeyValueRequst} from "../utils/api";
    export default {
        name: "Quality",
        data(){
            return{
                listQuality:[],
                formInline: {
                    lineName: '',
                    orderNum: '',
                    warnType: '',
                    warnTime:''
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
        methods: {
            // 访问数据库，listAll
            listAll(){
                getRequst('/qualitywarnning/listAll').then(resp=>{
                    //console.log(Date.parse(resp.obj[0].warnTime));
                    //console.log(Date.parse('2019-12-09 00:00:00'));
                    // console.log(resp.obj);
                    this.listQuality=resp.obj;
                    this.total=this.listQuality.length;
                    console.log(this.listQuality);
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
                console.log('submit!');
                postKeyValueRequst('/qualitywarnning/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listQuality=resp.obj;
                        this.total=this.listQuality.length
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
    .el-table tbody tr:hover>td {
        background-color:#2556B5!important
    }
    .demo-form-inline{
        display: flex;
        justify-content: space-between;
        margin: 20px 20px;
    }
    .form-label .el-form-item__label{
        font-size: 18px;
        font-weight: bold;
        color:#fff
    }
</style>