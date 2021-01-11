<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="部门" class="form-label">
                <!--<el-select v-model="formInline.department" placeholder="选择部门" :clearable="true">-->
                    <!--<el-option label="工程部" value="工程部"></el-option>-->
                <!--</el-select>-->
                <el-input v-model="formInline.department" placeholder="部门"></el-input>
            </el-form-item>
            <el-form-item label="选择角色" class="form-label">
                <el-select v-model="formInline.role" placeholder="选择角色" :clearable="true">
                    <el-option label="管理员" value="ROLE_root"></el-option>
                    <el-option label="普通用户" value="ROLE_user"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="注册时间" class="form-label">
                <div class="block">
                    <el-date-picker
                            v-model="formInline.regTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="onCreate">添加</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="listAll">刷新</el-button>
            </el-form-item>
        </el-form>
        <el-table  :data="listEmployee.slice((currentPage-1)*pagesize,currentPage*pagesize)"  :current-page.sync="currentPage" border   :row-style="tableRowStyle"  :header-cell-style="tableHeaderColor">
            <el-table-column  type="index"  label="序号" align="center" width="70">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" align="center">
            </el-table-column>
            <el-table-column prop="fullName" label="姓名" align="center">
            </el-table-column>
            <el-table-column  prop="department"  label="部门" align="center">
            </el-table-column>
            <el-table-column  prop="phone" label="手机号" align="center">
            </el-table-column>
            <el-table-column prop="role" label="角色" align="center">
            </el-table-column>
            <el-table-column prop="regTime" label="注册时间" align="center">
            </el-table-column>
            <el-table-column  label="操作" align="center">
                <template  slot-scope="scope"   >
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete"  size="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible_3" width="30%">
            <el-form :model="dialogForm" >
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.userName"  ></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.password"  ></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.fullName"  ></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.department" ></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.phone" ></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.role" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_3 = false">取 消</el-button>
                <el-button type="primary" @click="handleCreateConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible_1" width="30%">
            <el-form :model="dialogForm" >
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.userName"  ></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.password" placeholder="不修改即为原密码" ></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.fullName"  ></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.department" ></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.phone" ></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.role" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_1 = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="确认删除？" :visible.sync="dialogFormVisible_2" width="15%">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible_2 = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getRequst} from "../../utils/api";
    import {postKeyValueRequst} from "../../utils/api";

    export default {
        name: "UserManagement",
        data(){
            return{
                listEmployee:[],
                // 横向表单
                formInline: {
                    department: '',
                    role: '',
                    regTime:''
                },
                //分页
                currentPage:1,
                pagesize:15,
                total:0,
                //dialog
                dialogFormVisible_1: false,
                dialogFormVisible_2: false,
                dialogFormVisible_3: false,
                dialogForm: {
                    // 与employee参数一致
                    id:'',
                    userName: '',
                    password: '',
                    fullName:'',
                    department:'',
                    phone:'',
                    role:'',
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
                getRequst('/employee/listAll').then(resp=>{
                    console.log(resp.msg);
                    // console.log(resp.obj);
                    this.listEmployee=resp.obj;
                    // 为表单长度赋值，再除以每页的数量得到有几页
                    this.total=this.listEmployee.length;
                    console.log(this.listEmployee);
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
                postKeyValueRequst('/employee/listSelected',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp);
                        this.listEmployee=resp.obj;
                        this.total=this.listEmployee.length
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
            // 处理点击添加按钮
            onCreate(){
                this.dialogForm.id='';
                this.dialogForm.userName='';
                this.dialogForm.password='';
                this.dialogForm.fullName='';
                this.dialogForm.department='';
                this.dialogForm.phone='';
                this.dialogForm.role='';
                this.dialogFormVisible_3 = true
            },
            // 确认添加
            handleCreateConfirm(){
                postKeyValueRequst('/employee/save',{'employeeStr':JSON.stringify(this.dialogForm)}).then(resp=>{
                    this.listAll()
                });
                this.dialogFormVisible_3 = false
            },
            // 处理点击编辑、删除按钮
            handleEdit(index,row){
                console.log(row);
                this.dialogForm.id=row.id;
                this.dialogForm.userName=row.userName;
                this.dialogForm.fullName=row.fullName;
                this.dialogForm.department=row.department;
                this.dialogForm.phone=row.phone;
                this.dialogForm.role=row.role;
                this.dialogFormVisible_1 = true
            },
            // 保存编辑结果
            handleSave(){
                postKeyValueRequst('/employee/update',{'employeeStr':JSON.stringify(this.dialogForm)}).then(resp=>{
                    this.listAll()
                });
                this.dialogFormVisible_1 = false
            },
            //删除
            handleDelete(index,row){
                this.dialogFormVisible_2 = true;
                this.dialogForm.id=row.id;
            },
            handleDeleteConfirm(){
                postKeyValueRequst('/employee/deleteById',{'id':JSON.stringify(this.dialogForm.id)}).then(resp=>{
                    this.listAll()
                });
                this.dialogFormVisible_2 = false
            },
        }
    }
</script>

<style scoped>

</style>