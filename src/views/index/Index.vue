<template>
    <div class="middle" :style="backgroundDiv">
        <h2 style="color: #FFF94B;margin-top: 10px;position: absolute">生产过程可视化</h2>
        <!--<p style="color: #2556B5;font-size:30px;position: absolute;top:430px;left: 120px">{{banjian_num.left}}/{{banjian_num.all}}</p>-->
        <!--<p style="color: #2556B5;font-size:30px;position: absolute;top:400px;right: 230px">{{banjian_num.finish}}</p>-->
        <!--冲床上的外包板-->
        <img src="../../assets/images/banjian_chongchuang.png" alt="板件" v-if="banjian.chongchuang" class="image_rotate" style="width: 456px;position: absolute;top:287px;right: 363px">
        <!--加强筋放料-->
        <img src="../../assets/images/zhiliaojia.png" alt="板件" v-if="banjian.zhiliaojia" class="image_rotate" style="width: 456px;position: absolute;top:295px;left: 210px">
        <!--机器人图片-->
        <img :src="require(`@/assets/images/robot1/${position.robot1}.png`)"  style="width:530px;position: absolute;top:28.3%;left: 8.9%">
        <img :src="require(`@/assets/images/robot2/${position.robot2}.png`)"  style="width: 424px;position: absolute;top:38.3%;left: 28.4%">
        <img :src="require(`@/assets/images/robot3/${position.robot3}.png`)"  style="width: 456px;position: absolute;top:29.5%;left: 49.7%">
        <img :src="require(`@/assets/images/robot4/${position.robot4}.png`)"  style="width: 162px;position: absolute;top:45%;left: 31.2%">
        <!--机器人气泡框-->
        <div>
            <!--1号机器人-->
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">
                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.robot1" :show-header="isShowHeader" stripe >
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>

                <img src="../../assets/images/warn.png" v-if="isWarning.robot1"  alt="报警" slot="reference" style="left: 350px;top: 440px;position: absolute">
                <img src="../../assets/images/normal.png" v-else alt="normal" slot="reference" style="left: 350px;top: 440px;position: absolute">
            </el-popover>
            <!--外包板折弯机-->
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">
                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.zhewanji2" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>

                <img src="../../assets/images/warn.png" v-if="isWarning.zhewanji2"  alt="报警" slot="reference" style="left: 1070px;top: 180px;position: absolute">
                <img src="../../assets/images/normal.png" v-else alt="normal" slot="reference" style="left: 1070px;top: 180px;position: absolute">
            </el-popover>
            <!--冲床-->
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.chongchuang" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.chongchuang||isWarning.chongchuang_moju"  alt="报警" slot="reference" style="left: 1400px;top: 450px;position: absolute">
                <img src="../../assets/images/normal.png" v-else alt="normal" slot="reference" style="left: 1400px;top: 450px;position: absolute">
            </el-popover>
            <!--打胶机-->
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.dajiaoji" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.dajiaoji"  alt="报警" slot="reference" style="left: 605px;top: 265px;position: absolute">
                <img src="../../assets/images/normal.png" v-else alt="normal" slot="reference" style="left: 605px;top: 265px;position: absolute">
            </el-popover>
            <!--翻边机-->
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.fanbianji" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.fanbianji||isWarning.fanbianji_moju"  alt="报警" slot="reference" style="left: 830px;top: 280px;position: absolute">
                <img src="../../assets/images/normal.png" v-else alt="normal" slot="reference" style="left: 830px;top: 280px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.zhewanji1" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.zhewanji1"  alt="报警" slot="reference" style="left: 350px;top: 170px;position: absolute">
                <img src="../../assets/images/normal.png" v-else alt="normal" slot="reference" style="left: 350px;top: 170px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.robot2" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.robot2"  alt="报警" slot="reference" style="left: 680px;top: 460px;position: absolute">
                <img src="../../assets/images/normal.png" v-else  alt="normal" slot="reference" style="left: 680px;top: 460px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.robot3" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.robot3"  alt="报警" slot="reference" style="left: 1020px;top: 460px;position: absolute">
                <img src="../../assets/images/normal.png" v-else  alt="normal" slot="reference" style="left: 1020px;top: 460px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.robot4" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/images/warn.png" v-if="isWarning.robot4"  alt="报警" slot="reference" style="left: 550px;top: 500px;position: absolute">
                <img src="../../assets/images/normal.png" v-else  alt="normal" slot="reference" style="left: 550px;top: 500px;position: absolute">
            </el-popover>
        </div>

    </div>
</template>


<script>
    import globalData from '../../global'
    import mqtt from 'mqtt'
    const options = {
        connectTimeout: 40000,
        clientId: 'mqtitId-vue'+new Date().toUTCString(),
        username: 'admin',
        password: 'public',
        clean: true
    };
    let client;
    export default {
        name: "index",
        data(){
            return{
                // 板件数量
                banjian_num:{
                    left:0,
                    all:0,
                    finish:0,
                },
                // 使用次数
                moju_num:{
                    qiegeji:{
                        use:0,
                        set:0,
                    }
                },
                //是否检测报警
                switch_all:false,
                //背景图片样式
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../../assets/images/background.png') + ')'
                },
                // 几个位置板件是否显示
                banjian:{
                    chongchuang:false,
                    zhiliaojia:false
                },
                // 各机器位置
                position:{
                    robot1:1,//加强筋机器人
                    robot2:1,//组装机器人
                    robot3:1,//外包板机器人
                    robot4:1,//打胶机器人
                },
                // 各机器、设备、模具是否报警
                isWarning:{
                    // 机器人
                    robot1:false,
                    robot2:false,
                    robot3:false,
                    robot4:false,
                    //设备
                    zhewanji1:false,
                    zhewanji2:false,
                    dajiaoji:false,
                    chongchuang:false,
                    fanbianji:false,
                    //模具
                    zhewanji1_moju:false,
                    zhewanji2_moju:false,
                    chongchuang_moju:false,
                    fanbianji_moju:false,
                    //满料
                    maduo_manliao:false,
                },
                // 弹出框不显示表头
                isShowHeader:false,
                // 弹出框内容
                popover:{
                    robot1:[
                        {
                            first: '设备名称',
                            second:'加强筋机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB1'
                        },
                    ],
                    robot2:[
                        {
                            first: '设备名称',
                            second:'组装机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB2'
                        },

                    ],
                    robot3:[
                        {
                            first: '设备名称',
                            second:'外包板机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB3'
                        },
                    ],
                    robot4:[
                        {
                            first: '设备名称',
                            second:'折弯机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB4'
                        },
                    ],
                    zhewanji1:[
                        {
                            first: '设备名称',
                            second:'加强筋折弯机'
                        },
                        {
                            first: '设备型号',
                            second:'M02'
                        },
                        {
                            first: '使用次数',
                            second:'0/9999'
                        }
                    ],
                    zhewanji2:[
                        {
                            first: '设备名称',
                            second:'外包板折弯机'
                        },
                        {
                            first: '设备型号',
                            second:'XXX'
                        },
                        {
                            first: '使用次数',
                            second:'0/9999'
                        }
                    ],
                    chongchuang:[
                        {
                            first: '设备名称',
                            second:'800翻边机'
                        },
                        {
                            first: '设备型号',
                            second:'XXX'
                        },
                        {
                            first: '使用次数',
                            second:'0/9999'
                        }
                    ],
                    dajiaoji:[
                        {
                            first: '设备名称',
                            second:'打胶机'
                        },
                        {
                            first: '设备型号',
                            second:'XXX'
                        },
                    ],
                    fanbianji:[
                        {
                            first: '设备名称',
                            second:'翻边机'
                        },
                        {
                            first: '设备型号',
                            second:'XXX'
                        },
                        {
                            first: '使用次数',
                            second:'0/9999'
                        }
                    ],
                },
            }
        },
        methods:{
            // notice报警
            errorNotice(title,offset){
                this.$notify.error({
                    title: title,
                    position: 'bottom-right',
                    duration: 2000,
                    // onClose:function(res){console.log(res);},
                    offset:offset
                });
            },
            //处理事件
            handleWarning(equipname, tag, val){
                let that=this;
                // 处理报警状态改变
                if(tag==='state'&&this.switch_all){
                    this.isWarning[equipname] = !val;
                    // 实时刷出报警通知
                    if(val===false){
                        let offset=0;
                        if(equipname==='robot1'){this.errorNotice('加强筋机器人报警',offset);offset+=50;}
                        else if (equipname==='robot2'){this.errorNotice('组装机器人报警',offset);offset+=50;}
                        else if (equipname==='robot3'){this.errorNotice('外包板机器人报警',offset);offset+=50;}
                        else if (equipname==='robot4'){this.errorNotice('打胶机器人报警',offset);offset+=50;}
                        else if (equipname==='zhewanji1'){this.errorNotice('加强筋折弯机报警',offset);offset+=50;}
                        else if (equipname==='zhewanji2'){this.errorNotice('外包板折弯机报警',offset);offset+=50;}
                        else if (equipname==='dajiaoji'){this.errorNotice('打胶机报警',offset);offset+=50;}
                        else if (equipname==='fanbianji'){this.errorNotice('翻边机报警',offset);offset+=50;}
                        else if (equipname==='chongchuang'){this.errorNotice('冲床报警',offset);offset+=50;}
                        else if (equipname==='zhewanji1_moju'){this.errorNotice('加强筋折弯机模具报警',offset);offset+=50;}
                        else if (equipname==='zhewanji2_moju'){this.errorNotice('外包板折弯机模具报警',offset);offset+=50;}
                        else if (equipname==='fanbianji_moju'){this.errorNotice('翻边机模具报警',offset);offset+=50;}
                        else if (equipname==='chongchuang_moju'){this.errorNotice('冲床模具报警',offset);offset+=50;}
                        else if (equipname==='zhewanji_moju'){this.errorNotice('折弯机模具报',offset);offset+=50;}
                        else if (equipname==='maduo_manliao'){this.errorNotice('码垛满料报警',offset);offset+=50;}
                        else {}
                    }
                }
                // 处理位置改变
                else if(tag==='position'){
                    //下面处理板件展示效果，定时器设置工件的有否
                    if (equipname==='robot1'){
                        this.position[equipname]=val;
                        console.log(equipname,this.position[equipname])
                        if (val === 5) {
                            // 加强筋放料
                            that.banjian.zhiliaojia=true
                        }
                        else {}
                    }
                    if(equipname==='robot2'){
                        this.position[equipname]=val;
                        console.log(equipname,this.position[equipname])
                        if (val === 4) {
                            //加强筋图片消失
                            that.banjian.zhiliaojia=false
                        }
                    }
                    if(equipname==='robot3'){
                        if (val === 4) {
                            //外包板放置于冲床上
                            that.banjian.chongchuang=true
                        }
                        if (val === 5) {
                            //外包板放置于冲床上
                            that.banjian.chongchuang=false
                        }
                        this.position[equipname]=val;
                        console.log(equipname,this.position[equipname])
                    }
                    if (equipname==='robot4'){
                        this.position[equipname]=val;
                        console.log(equipname,this.position[equipname])
                    }
                }
                // 是否开启报警检测
                else if(tag==='switch'){
                    this.switch_all=val;
                    console.log("检测报警：",this.switch_all)
                }
                // 模具使用次数
                else if(tag==='moju_num'){
                    // equipname.split('_')[1]为use或set
                    if (equipname.split('_')[1]==='use') {
                        that.popover[equipname.split('_')[0]][2].second=val+'/'+ that.popover[equipname.split('_')[0]][2].second.split('/')[1];
                    }
                    else if(equipname.split('_')[1]==='set'){
                        that.popover[equipname.split('_')[0]][2].second=that.popover[equipname.split('_')[0]][2].second.split('/')[0]+'/'+val;
                        // console.log('set',that.qiegeji[2].second)
                    }
                }
                // 板件数量
                else if (tag==='banjian_num'){
                    that.banjian_num[equipname]=val;
                }
            },
            // MQTT注册函数
            mqttMSG () {
                client = mqtt.connect("ws://127.0.0.1:8083/mqtt", options);
                // mqtt连接
                client.on('connect', (e) => {
                    globalData.isConnected=true;
                    console.log('连接成功:');
                    client.subscribe(["line2/robot1/state","line2/robot1/position",
                                    "line2/robot2/state","line2/robot2/position",
                                    "line2/robot3/state","line2/robot3/position",
                                    "line2/robot4/state","line2/robot4/position",
                                    "line2/zhewanji1/state",
                                    "line2/zhewanji2/state","line2/fanbianji/state",
                                    "line2/dajiaoji/state","line2/chongchuang/state",
                                    "line2/zhewanji1_moju/state","line2/zhewanji2_moju/state",
                                    "line2/fanbianji_moju/state","line2/chongchuang_moju/state",
                                    "line2/maduo_manliao/state", "line2/queliao/state",
                                    "line2/all/switch","line2/zhewanji1_set/moju_num",
                                    "line2/zhewanji1_use/moju_num","line2/zhewanji2_set/moju_num",
                                    "line2/zhewanji2_use/moju_num","line2/fanbianji_set/moju_num",
                                    "line2/fanbianji_use/moju_num","line2/chongchuang_use/moju_num",
                                    "line2/yawo3_moju_use/moju_num","line2/zhewanji_moju_set/moju_num",
                                    "line2/chongchuang_set/moju_num","line2/all/banjian_num",
                                    "line2/finish/banjian_num","line2/left/banjian_num","line2/all/jin_num",
                                    "line2/finish/jin_num","line2/left/jin_num"], { qos: 1 }, (error) => {
                        if (!error) {
                            console.log('订阅成功')
                        } else {
                            console.log('订阅失败')
                        }
                    })
                });
                // 接收消息处理
                client.on('message', (topic, message) => {
                    console.log(topic, JSON.parse(message).data);
                    let equipname = topic.split('/')[1];
                    let tag = topic.split('/')[2];
                    this.handleWarning(equipname,tag,JSON.parse(message).data)
                });
                // 断开发起重连
                client.on('reconnect', (error) => {
                    console.log('正在重连:', error)
                });
                // 链接异常处理
                client.on('error', (error) => {
                    console.log('连接失败:', error)
                })
            }
        },
        created:function () {
            //先关闭已有的notice，防止notice重叠
            this.$notify.closeAll();
            // kill上个客户端，重新发起连接请求
            if(globalData.isConnected===true){
                client.end(true);
            }
            // 连接mqtt服务器
            this.mqttMSG();
            //定时器，制造消息闪烁效果
            clearInterval(globalData.timerCount[0]);
            let that=this;
            globalData.timerCount[0]= setInterval(function () {
                //先关闭已有的notice，防止notice重叠
                that.$notify.closeAll();
                // 设置offset的目的是解决通知重叠的问题
                let offset=0;
                console.log("主页定时器");
                if(that.isWarning.robot1){that.errorNotice('加强筋机器人报警',offset);offset+=50;}
                if (that.isWarning.robot2){that.errorNotice('组装机器人报警',offset);offset+=50;}
                if (that.isWarning.robot3){that.errorNotice('外包板机器人报警',offset);offset+=50;}
                if (that.isWarning.robot4){that.errorNotice('打胶机器人报警',offset);offset+=50;}
                //设备
                if (that.isWarning.zhewanji1){that.errorNotice('加强筋折弯机报警',offset);offset+=50;}
                if (that.isWarning.zhewanji2){that.errorNotice('外包板折弯机报警',offset);offset+=50;}
                if (that.isWarning.dajiaoji){that.errorNotice('打胶机报警',offset);offset+=50;}
                if (that.isWarning.chongchuang){that.errorNotice('冲床报警',offset);offset+=50;}
                if (that.isWarning.fanbianji){that.errorNotice('翻边机报警',offset);offset+=50;}
                //模具
                if (that.isWarning.zhewanji1_moju){that.errorNotice('加强筋折弯机模具报警',offset);offset+=50;}
                if (that.isWarning.zhewanji2_moju){that.errorNotice('外包板折弯机模具报警',offset);offset+=50;}
                if (that.isWarning.chongchuang_moju){that.errorNotice('冲床模具报警',offset);offset+=50;}
                if (that.isWarning.fanbianji_moju){that.errorNotice('翻边机模具报警',offset);offset+=50;}
                if (that.isWarning.maduo_manliao){that.errorNotice('码垛满料报警',offset);}
            },4000)

        }
    }
</script>

<style >

    .image_rotate{
        transform:rotate(3deg);
        -ms-transform:rotate(3deg); 	/* IE 9 */
        -moz-transform:rotate(3deg); 	/* Firefox */
        -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
        -o-transform:rotate(3deg); 	/* Opera */
    }
    .middle {
        margin: 0 10px;
        position: relative;
        height: 100%;
        width: 100%;
        background: no-repeat center center;
        background-size: contain;
    }
    .mask {
        background-color: white;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1
    }

    .el-alert__title{
        font-size: 18px!important;
    }
    .el-alert{
        padding-top: 20px!important;
        padding-bottom: 20px!important;
    }
    /*.el-popover__title{*/
        /*border-bottom: 1px solid #EBEEF5!important;*/
    /*}*/
</style>