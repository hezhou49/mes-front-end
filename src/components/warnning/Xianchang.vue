<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择产线" class="form-label">
                <el-select v-model="formInline.lineName" placeholder="选择产线" :clearable="true">
                    <el-option label="门板线" value="门板线"></el-option>
                    <el-option label="产线2" value="产线2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称" class="form-label">
                <el-select v-model="formInline.equipmentName" placeholder="设备名称" :clearable="true">
                    <el-option label="取料机器人" value="取料机器人"></el-option>
                    <el-option label="激光裁剪机" value="激光裁剪机"></el-option>
                    <el-option label="前压窝机器人" value="前压窝机器人"></el-option>
                    <el-option label="后压窝机器人" value="后压窝机器人"></el-option>
                    <el-option label="前压窝冲床" value="前压窝冲床"></el-option>
                    <el-option label="后压窝冲床" value="后压窝冲床"></el-option>
                    <el-option label="折弯机" value="折弯机"></el-option>
                    <el-option label="翻边点焊机器人" value="翻边点焊机器人"></el-option>
                    <el-option label="堆垛机器人" value="堆垛机器人"></el-option>
                    <el-option label="点焊机" value="点焊机"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="报警时间" class="form-label">
                <el-date-picker
                        v-model="formInline.warntime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="unhandled">未处理</el-button>
                <el-button type="success" @click="handled">已处理</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="listAll">刷新</el-button>
            </el-form-item>
        </el-form>
        <el-table  :data="listWarnning.slice((currentPage-1)*pagesize,currentPage*pagesize)"  :current-page.sync="currentPage" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="lineName" label="产线" align="center">
            </el-table-column>
            <el-table-column prop="equipmentName" label="设备名称" align="center">
            </el-table-column>
            <el-table-column  prop="warnDetails"  label="报警详情" align="center">
            </el-table-column>
            <el-table-column  prop="warnTime" label="报警时间" align="center">
            </el-table-column>
            <el-table-column prop="warnState" label="报警状态"  align="center">
            </el-table-column>
            <el-table-column  label="报警处理" align="center">
                <template  slot-scope="scope"   >
                    <el-button
                            type="primary"
                            size="mini"
                            :disabled="scope.row.warnState==='已处理'"
                            @click="handleWarn(scope.$index, scope.row)">报警处理</el-button>
                </template>
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
        <el-dialog title="报警处理" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="dialogForm" >
                <el-form-item label="产线名称" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.line" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.equipmentname" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="报警详情" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.warndetails" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="报警时间" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.warntime" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="处理措施" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.handlemeasure" ></el-input>
                </el-form-item>
                <el-form-item label="处理人" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.handleperson" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getRequst} from "../../utils/api";
    import {postKeyValueRequst} from "../../utils/api";

    export default {
        name: "Xianchang",
        data(){
            return{
                //是否按了未处理按钮（增加用户体验）
                isPush:false,
                listWarnning:[],
                formInline: {
                    equipmentName: '',
                    lineName: '',
                    warnDetails:'',
                    warntime:['',''],
                    warnState:''
                },
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
                //dialog
                dialogFormVisible: false,
                dialogForm: {
                    // 与warnningResume一致
                    equipmentname: '',
                    line: '',
                    warndetails:'',
                    warntime:'',
                    handlemeasure:'',
                    handleperson:'',
                    handletime:''
                },
                formLabelWidth: '120px',
                //
                updateId:''
            }
        },
        created:function () {
            this.listAll()
        },
        methods:{
            // 访问数据库，listAll
            listAll(){
                this.isPush=false;
                getRequst('/warnning/listAll').then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listWarnning=resp.obj;
                    // 为表单长度赋值，再除以每页的数量得到有几页
                    this.total=this.listWarnning.length;
                    console.log(this.listWarnning);
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
                postKeyValueRequst('/warnning/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listWarnning=resp.obj;
                        this.total=this.listWarnning.length
                    }
                })
            },
            // 点击报警处理后，input框赋上本row的几个值
            handleWarn(index,row){
                console.log(row);
                this.dialogForm.line=row.lineName;
                this.dialogForm.equipmentname=row.equipmentName;
                this.dialogForm.warndetails=row.warnDetails;
                this.dialogForm.warntime=row.warnTime;
                this.updateId=row.id;
                this.dialogFormVisible = true
            },
            // 向数据库内Save一条warnningResume，并更新报警状态
            handleSave(){
                postKeyValueRequst('/warnning/saveWarnResume',{'warnResume':JSON.stringify(this.dialogForm)}).then(resp=>{
                    if(resp.msg==="报警履历更新成功"){
                        console.log(resp);
                        postKeyValueRequst('/warnning/warnUpdate',{'id':this.updateId}).then(resp=>{
                            console.log(resp);
                            if (this.isPush) {
                                this.unhandled()
                            }
                            else this.listAll();
                            //window.location.reload();
                        });
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
            //表格筛选
            unhandled(){
                this.isPush=true;
                postKeyValueRequst('/warnning/handled',{warnstate:"未处理"}).then(resp=>{
                    this.listWarnning=resp.obj;
                    // 为表单长度赋值，再除以每页的数量得到有几页
                    this.total=this.listWarnning.length;
                    console.log(this.listWarnning);
                })
            },
            handled(){
                postKeyValueRequst('/warnning/handled',{warnstate:"已处理"}).then(resp=>{
                    this.listWarnning=resp.obj;
                    // 为表单长度赋值，再除以每页的数量得到有几页
                    this.total=this.listWarnning.length;
                    console.log(this.listWarnning);
                })
            }

        }
    }
</script>

<style >
    .el-pagination__total {
        color: #fff!important
    }
    .el-pagination__jump{
        color: #fff!important
    }
    .el-input.is-disabled .el-input__inner{
        color: #606266!important;
    }
</style>