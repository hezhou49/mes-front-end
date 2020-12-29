<template>
    <div>
        <img src="../assets/images/sunwanew.png" style="margin-top: 300px;"/>
        <div class="container">
            <el-form >
                <el-form-item>
                    <h2>登陆</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入密码" v-model="loginForm.password" show-password ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="navigate" style="width: 100%">登陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import {postKeyValueRequst} from "../utils/api";
    import {getRequst} from "../utils/api";

    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    username: '',
                    password:''
                }
            }
        },
        methods:{
            navigate(){
                postKeyValueRequst('/doLogin',this.loginForm).then(resp=>{
                    if(resp){
                        // alert(JSON.stringify(resp));
                        window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                        // 登入日志
                        getRequst('/aop_login');
                        this.$router.replace('/index');
                    }
                })

            }
        }
    }
</script>

<style >
    body {
       background-color:  #2556B5;
    }
    .container{
        background-color: #fff;
        margin:30px auto;
        padding: 20px 20px 20px 20px;
        border-radius: 15px;
        width: 500px;
    }


</style>