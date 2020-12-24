<template>
    <div style="margin: 10px 10px">
        <h2 style="color: #FFF94B;display: flex;margin-top: 0;">产品管理</h2>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择产线" class="form-label">
                <el-select v-model="formInline.lineName" placeholder="选择产线" :clearable="true">
                    <el-option label="轿壁线" value="轿壁线"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号" class="form-label">
                <el-input v-model="formInline.orderNum" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="物料编号" class="form-label">
                <el-input v-model="formInline.workpieceNum" placeholder="物料编号"></el-input>
            </el-form-item>
            <el-form-item label="工件质量" class="form-label">
                <el-select v-model="formInline.quality" placeholder="工件质量" :clearable="true">
                    <el-option label="合格" value="合格"></el-option>
                    <el-option label="不合格" value="不合格"></el-option>
                </el-select>
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
            <div>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="listAll">刷新</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table  :data="listProduct.slice((currentPage-1)*pagesize,currentPage*pagesize)" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="lineName" label="产线" align="center">
            </el-table-column>
            <el-table-column prop="orderNum" label="订单号" align="center">
            </el-table-column>
            <el-table-column  prop="workpieceNum"  label="物料编号" align="center">
            </el-table-column>
            <!--<el-table-column  label="加工时间" align="center">-->
                <!--<template  slot-scope="scope"   >-->
                    <!--<div >-->
                        <!--{{formatSeconds(Date.parse(scope.row.endTime)-Date.parse(scope.row.beginTime))}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="quality" label="工件质量" align="center">-->
            <!--</el-table-column>-->
            <el-table-column prop="workTime" label="加工时间" align="center">
                <template  slot-scope="scope"   >
                    <div >
                        {{parseInt(scope.row.workTime/60)+'分'+(scope.row.workTime%60)+'秒'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="quality" label="工件质量" align="center">
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
    import {getRequst} from "../utils/api";
    import {postKeyValueRequst} from "../utils/api";
    import {formatSeconds} from "../utils/util";

    export default {
        name: "Product",
        data(){
            return{
                listProduct:[],
                formInline: {
                    lineName: '',
                    orderNum: '',
                    workpieceNum: '',
                    quality:''
                },
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
            }
        },
        created:function () {
           this.listAll();
        },
        methods: {
            // 访问数据库，listAll
            listAll(){
                getRequst('/product_new/listAll').then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listProduct=resp.obj;
                    this.total=this.listProduct.length;
                    console.log(this.listProduct);
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
                postKeyValueRequst('/product_new/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listProduct=resp.obj;
                        this.total=this.listProduct.length;
                    }
                })
            },
            // 引入formatSeconds
            formatSeconds,
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
    .el-pagination{
        margin-top: 10px;
    }
    .form-label .el-form-item__label{
        font-size: 18px;
        font-weight: bold;
        color:#fff
    }
</style>