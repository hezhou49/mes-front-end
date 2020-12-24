<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择类型" class="form-label">
                <el-select v-model="formInline.type" placeholder="选择类型" :clearable="true">
                    <el-option label="温度" value="温度"></el-option>
                    <el-option label="湿度" value="湿度"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择时间" class="form-label">
                <div class="block">
                    <el-date-picker
                            v-model="formInline.time"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="温度阈值：" class="form-label">
                <div style="font-size: 18px;font-weight: bold;color:#fff;">{{threshold.minTemperature}}°C-{{threshold.maxTemperature}}°C</div>
            </el-form-item>
            <el-form-item label="湿度阈值：" class="form-label">
                <div style="font-size: 18px;font-weight: bold;color:#fff;">{{threshold.minHumidity}}%-{{threshold.maxHumidity}}%</div>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="dialogFormVisible = true">修改</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="listAll">刷新</el-button>
            </el-form-item>
        </el-form>
        <el-table  :data="listException.slice((currentPage-1)*pagesize,currentPage*pagesize)" border :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="warnType" label="类型" align="center">
            </el-table-column>
            <el-table-column prop="recordValue" label="记录值" align="center">
            </el-table-column>
            <el-table-column  prop="setMinValue"  label="最小阈值" align="center">
            </el-table-column>
            <el-table-column  prop="setMaxValue"  label="最大阈值" align="center">
            </el-table-column>
            <el-table-column  prop="recordTime"  label="记录时间" align="center">
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
        <el-dialog title="报警处理" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="dialogForm" >
                <el-form-item label="温度下限" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.minTemperature" ></el-input>
                </el-form-item>
                <el-form-item label="温度上限" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.maxTemperature" ></el-input>
                </el-form-item>
                <el-form-item label="湿度下限" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.minHumidity" ></el-input>
                </el-form-item>
                <el-form-item label="湿度上限" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.maxHumidity" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getRequst} from "../../utils/api";
    import {postKeyValueRequst} from "../../utils/api";
    export default {
        name: "Log",
        data(){
            return{
                // 当前阈值
                threshold:{
                    minTemperature:20,
                    maxTemperature:50,
                    minHumidity:30,
                    maxHumidity:70
                },
                listException:[],
                formInline: {
                    type: '',
                    time:''
                },
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
                //dialog
                dialogFormVisible: false,
                dialogForm: {
                    minTemperature: '',
                    maxTemperature: '',
                    minHumidity:'',
                    maxHumidity:'',
                },
                formLabelWidth: '120px',
            }
        },
        created:function () {
           this.listAll()
        },
        methods:{
            // 访问数据库，listAll
            listAll(){
                getRequst('/env/warnning/listAll').then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listException=resp.obj;
                    this.total=this.listException.length;
                    console.log(this.listException);
                })
                getRequst('/env/warnning/listTop').then(resp=>{
                    console.log(resp.obj);
                    this.threshold.minTemperature=resp.obj[0].minTemperature;
                    this.threshold.maxTemperature=resp.obj[0].maxTemperature;
                    this.threshold.minHumidity=resp.obj[0].minHumidity;
                    this.threshold.maxHumidity=resp.obj[0].maxHumidity;

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
                postKeyValueRequst('/env/warnning/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listException=resp.obj;
                        this.total=this.listException.length;
                    }
                })
            },
            // 向数据库内Save一条temperature，并更新报警状态
            handleSave(){
                postKeyValueRequst('/env/warnning/insert',{'warnResume':JSON.stringify(this.dialogForm)}).then(resp=>{
                    if(resp){
                        console.log(resp);
                        getRequst('/env/warnning/listTop').then(resp=>{
                            console.log(resp.obj);
                            this.threshold.minTemperature=resp.obj[0].minTemperature;
                            this.threshold.maxTemperature=resp.obj[0].maxTemperature;
                            this.threshold.minHumidity=resp.obj[0].minHumidity;
                            this.threshold.maxHumidity=resp.obj[0].maxHumidity;

                        })
                    }
                });
                this.dialogFormVisible = false
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