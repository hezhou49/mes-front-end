<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="产线" class="form-label">
                <el-select v-model="formInline.lineName" placeholder="选择产线" :clearable="true">
                    <el-option label="轿壁线" value="轿壁线"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号" class="form-label">
                <el-input v-model="formInline.ordernumber" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="规格" class="form-label">
                <el-select v-model="formInline.guige" placeholder="规格" :clearable="true">
                    <el-option label="800mm" value="800"></el-option>
                    <el-option label="900mm" value="900"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开工时间" class="form-label">
                <el-date-picker
                        v-model="formInline.starttime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <div>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="listAll">刷新</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table  :data="listOrderHistory.slice((currentPage-1)*pagesize,currentPage*pagesize)"  :current-page.sync="currentPage" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="ordernumber" label="订单号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="linename" label="产线" align="center" width="100">
            </el-table-column>
            <el-table-column  prop="starttime" label="开工时间" align="center">
            </el-table-column>
            <el-table-column  prop="finishtime" label="完成时间" align="center">
            </el-table-column>
            <el-table-column prop="guige" label="规格"  align="center">
            </el-table-column>
            <el-table-column prop="amount" label="数量"  align="center">
            </el-table-column>
            <el-table-column prop="quality" label="坏件数"  align="center">
            </el-table-column>
            <el-table-column prop="energy" label="能耗/KW"  align="center">
            </el-table-column>
            <!--排产页，无进度-->
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
    import {postKeyValueRequst} from "../../utils/api";

    export default {
        name: "History",
        data(){
            return{
                formInline: {
                    status:'2',
                    lineName: '',
                    ordernumber:'',
                    guige:'',
                    starttime:['',''],
                },
                listOrderHistory:[],
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
            }
        },
        created:function () {
           this.listAll();
        },
        methods:{
            // 访问数据库，ListAll
            listAll(){
                postKeyValueRequst('/order/listAllByStatus',{status:'2'}).then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listOrderHistory=resp.obj;
                    // 为表单长度赋值，再除以每页的数量得到有几页
                    this.total=this.listOrderHistory.length;
                    console.log(this.listOrderHistory);
                });
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
                if(this.formInline.starttime==null){
                    this.formInline.starttime=['','']
                }
                postKeyValueRequst('/order/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listOrderHistory=resp.obj;
                        this.total=this.listOrderHistory.length
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

<style scoped>

</style>