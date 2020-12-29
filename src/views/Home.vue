<template>
    <div style="height: 100%">
        <el-container  style="height: 100%">
            <el-header class="homeHeader">
                <!--<div class ="headerText">升华电梯</div>-->
                <img src="../assets/images/sunwanew.png" style="height: 30px;margin-top: 15px;margin-bottom: 15px;"/>
                <el-dropdown  @command="handleCommand">
                      <span class="el-dropdown-link"><i class="el-icon-user-solid"></i>
                        {{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>{{user.authorities[0].authority}}</el-dropdown-item>
                        <el-dropdown-item command="person">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container >
                <el-aside width="250px" style="background-color: #0476E9;text-align: left">
                    <el-menu router  :default-active="$route.path" class="el-menu-vertical-demo"  background-color="#0476E9"
                             text-color="#73FFDA"
                             active-text-color="#FFF94B"
                             style="border-right-color:#0476E9">
                        <el-menu-item index="/index" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-view i-color"></i>
                            <span slot="title" style="font-size: 18px">生产过程可视化</span>
                        </el-menu-item>
                        <el-menu-item index="/order" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-tickets"></i>
                            <span slot="title" style="font-size: 18px">订单管理</span>
                        </el-menu-item>
                        <el-menu-item index="/product" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-set-up"></i>
                            <span slot="title" style="font-size: 18px">产品管理</span>
                        </el-menu-item>
                        <el-menu-item index="/equipment" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-edit"></i>
                            <span slot="title" style="font-size: 18px">设备管理</span>
                        </el-menu-item>
                        <el-menu-item index="/warnning" style="border-bottom: 3px solid #2556B5;">
                            <i class="el-icon-cpu"></i>
                            <span slot="title" style="font-size: 18px">报警管理</span>
                        </el-menu-item>
                        <el-menu-item index="/quality" style="border-bottom: 3px solid #2556B5;">
                            <i class="el-icon-warning-outline"></i>
                            <span slot="title" style="font-size: 18px">质量管理</span>
                        </el-menu-item>
                        <el-menu-item index="/environment" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-files"></i>
                            <span slot="title" style="font-size: 18px">环境管理</span>
                        </el-menu-item>
                        <el-menu-item index="/safemanagement" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-sunrise"></i>
                            <span slot="title" style="font-size: 18px">安全管理</span>
                        </el-menu-item>
                        <el-menu-item index="/agv" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-refresh-right"></i>
                            <span slot="title" style="font-size: 18px">物流管理</span>
                        </el-menu-item>
                        <el-menu-item index="/system" v-if="role==='ROLE_root'" style="border-bottom: 3px solid #2556B5">
                            <i class="el-icon-set-up"></i>
                            <span slot="title" style="font-size: 18px">系统管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container style="background-color: #2556B5">
                    <el-main >
                        <router-view/>
                    </el-main>
                    <a href="http://www.shenghua.com.cn/" title="升华电梯集团"><p style="position: absolute;left: 250px;bottom: 0;font-size: 16px;color:#73FFDA">升华电梯集团© 2019</p></a>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {getRequst} from "../utils/api";
    import global from "../global"
    let interval;
    export default {
        name: "Home",
        data(){
            return{
                user: JSON.parse(window.sessionStorage.getItem("user")),
                role: JSON.parse(window.sessionStorage.getItem("user")).authorities[0].authority,
            }
        },
        created:function(){
            console.log("still alive");
            // 保持登陆
            interval=setInterval(function () {
              getRequst('/keep_login').then(resp=>{
                    console.log("still alive")
              })
            },60000)
        },
        methods:{
            handleCommand(command){
                // console.log(command)
                if(command==="logout"){
                    //登出日志
                    getRequst('/aop_logout').then(resp=>{
                        console.log(resp);
                        clearInterval(interval);
                        getRequst('/logout').then(resp=>{
                            console.log(resp);
                        });
                    });
                    clearInterval(global.timerCount[0]);
                    window.sessionStorage.removeItem("user");
                    this.$router.replace("/")
                }
            },
        }
    }
</script>

<style>
    html, body {
        height: 100%;
        margin:0;
        padding:0;
    }
.homeHeader{
    background-image: linear-gradient(#2556B5, #1B203C);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.homeHeader .headerText{
    font-family: "Adobe 黑体 Std R";
    font-size: 24px;
    color: #ffff;
}
.el-dropdown-link {
    cursor: pointer;
    color: #73FFDA;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.el-menu-item i{
    color: #c3faff !important;
}
.el-menu-item.is-active i {
    color: inherit !important;
}

.el-menu-item.is-active {
    font-weight: bold;
}
</style>