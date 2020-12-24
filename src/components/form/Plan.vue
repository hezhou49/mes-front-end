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
                <el-select v-model="formInline.guige" placeholder="规格" :clearable="true" >
                    <el-option label="800mm" value="800"></el-option>
                    <el-option label="900mm" value="900"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开工时间" class="form-label">
                <el-date-picker
                        v-model="formInline.starttime"
                        type="daterange"
                        :disabled="!available"
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
                <el-form-item>
                    <el-upload action="/api/order/import"
                               :show-file-list="false"
                               :on-success="hanleSuccess"
                               accept=".xls">
                        <el-button type="primary">导入</el-button>
                    </el-upload>
                </el-form-item>
            </div>
        </el-form>
        <el-table  :data="listOrderPlan.slice((currentPage-1)*pagesize,currentPage*pagesize)"  :current-page.sync="currentPage" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="ordernumber" label="订单号" align="center" width="100">
            </el-table-column>
            <el-table-column prop="linename" label="产线" align="center" width="100">
            </el-table-column>
            <!--<el-table-column  prop="submittime" label="订单时间" align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column  prop="delivertime" label="交货时间" align="center">-->
            <!--</el-table-column>-->
            <el-table-column prop="guige" label="规格"  align="center">
            </el-table-column>
            <el-table-column prop="amount" label="数量"  align="center">
            </el-table-column>
            <!--<el-table-column prop="specification" label="备注"  align="center">-->
            <!--</el-table-column>-->
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
        name: "Plan",
        data(){
            return{
                formInline: {
                    status:'0',
                    lineName: '',
                    ordernumber:'',
                    guige:'',
                    starttime:['',''],
                },
                listOrderPlan:[],
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
                //
                available:false
            }
        },
        created:function () {
            this.listAll();
        },
        methods:{
            // 访问数据库，listAll
            listAll(){
                postKeyValueRequst('/order/listAllByStatus',{status:'0'}).then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listOrderPlan=resp.obj;
                    // 为表单长度赋值，再除以每页的数量得到有几页
                    this.total=this.listOrderPlan.length;
                    console.log(this.listOrderPlan);
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
                    this.formInline.submittime=['','']
                }
                postKeyValueRequst('/order/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listOrderPlan=resp.obj;
                        this.total=this.listOrderPlan.length
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
            // excel上传成功回调
            hanleSuccess(response){
                // console.log(response);
                this.$message.success(response.msg)
                // 访问数据库刷新列表
                this.listAll()
            }
        }

    }
</script>

<style scoped>

</style>