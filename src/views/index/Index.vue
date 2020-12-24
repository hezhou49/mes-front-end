<template>
    <div class="middle" :style="backgroundDiv">
        <h2 style="color: #FFF94B;margin-top: 10px;position: absolute">生产过程可视化</h2>
        <p style="color: #2556B5;font-size:30px;position: absolute;top:430px;left: 120px">{{banjian_num.left}}/{{banjian_num.all}}</p>
        <p style="color: #2556B5;font-size:30px;position: absolute;top:400px;right: 230px">{{banjian_num.finish}}</p>
        <!--板件图片-->
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.robot1" style="width: 98px;position: absolute;top:596px;left: 186px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_d_0" style="width: 98px;position: absolute;top:598px;left: 250px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_d_1" style="width: 98px;position: absolute;top:598px;left: 370px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_1" style="width: 98px;position: absolute;top:598px;left: 370px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_2" style="width: 98px;position: absolute;top:598px;left: 490px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_23" style="width: 98px;position: absolute;top:600px;left: 750px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.robot2" style="width: 98px;position: absolute;top:597px;left: 610px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.robot3" style="width: 98px;position: absolute;top:600px;left: 880px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_34" style="width: 98px;position: absolute;top:600px;left: 970px">
        <img src="../../assets/image/板件1.png" alt="板件" v-if="banjian.position_5" style="width: 98px;position: absolute;top:603px;left: 1075px">
        <!--切割机上板件三个状态-->
        <img src="../../assets/image/板件3.png" alt="板件" v-if="qiege[0]" class="image_rotate" style="height: 108px;position: absolute;top:465px;left: 310px">
        <img src="../../assets/image/板件4.png" alt="板件" v-if="qiege[1]" class="image_rotate" style="height: 108px;position: absolute;top:465px;left: 335px">
        <img src="../../assets/image/板件5.png" alt="板件" v-if="qiege[2]" class="image_rotate" style="height: 108px;position: absolute;top:465px;left: 356px">
        <!--机器人图片-->
        <img :src="require(`@/assets/image/robot1/${position.robot1}.png`)"  style="width:286px;position: absolute;top:40%;left: 6%">
        <img :src="require(`@/assets/image/robot2/${position.robot2}.png`)"  style="width: 286px;position: absolute;top:42%;left: 34%">
        <img :src="require(`@/assets/image/robot3/${position.robot3}.png`)"  style="width: 286px;position: absolute;top:42%;left: 48%">
        <img :src="require(`@/assets/image/robot4/${position.robot4}.png`)"  style="width: 286px;position: absolute;top:42%;left: 64%">
        <img :src="require(`@/assets/image/robot5/${position.robot5}.png`)"  style="width: 286px;position: absolute;top:395px;right: 100px">、
        <!--机器人气泡框-->
        <div>
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

                <img src="../../assets/image/warn.png" v-if="isWarning.robot1"  alt="报警" slot="reference" style="left: 235px;top: 440px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 235px;top: 440px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover"
                    :close-delay=0>
                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.yawo1" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>

                <img src="../../assets/image/warn.png" v-if="isWarning.chongchuang_front||isWarning.yawo1_moju"  alt="报警" slot="reference" style="left: 770px;top: 410px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 770px;top: 410px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">
                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.yawo2" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>

                <img src="../../assets/image/warn.png" v-if="isWarning.chongchuang_behind||isWarning.yawo2_moju"  alt="报警" slot="reference" style="left: 820px;top: 410px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 820px;top: 410px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">
                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.yawo3" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>

                <img src="../../assets/image/warn.png" v-if="isWarning.chongchuang_behind||isWarning.yawo3_moju"  alt="报警" slot="reference" style="left: 820px;top: 510px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 820px;top: 510px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">
                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.zhewanji" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>

                <img src="../../assets/image/warn.png" v-if="isWarning.zhewanji"  alt="报警" slot="reference" style="left: 1170px;top: 360px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 1170px;top: 360px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.fanbian800" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/image/warn.png" v-if="isWarning.fanbian800||isWarning.fanbian800_moju"  alt="报警" slot="reference" style="left: 1450px;top: 600px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 1450px;top: 600px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.fanbian900" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/image/warn.png" v-if="isWarning.fanbian900||isWarning.fanbian900_moju"  alt="报警" slot="reference" style="left: 1500px;top: 520px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 1500px;top: 520px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.dianhan800" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/image/warn.png" v-if="isWarning.dianhan800||isWarning.dianhan800_moju"  alt="报警" slot="reference" style="left: 1510px;top: 575px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 1510px;top: 575px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.qiegeji" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/image/warn.png" v-if="isWarning.qiegeji"  alt="报警" slot="reference" style="left: 340px;top: 380px;position: absolute">
                <img src="../../assets/image/normal.png" v-else alt="normal" slot="reference" style="left: 340px;top: 380px;position: absolute">
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
                <img src="../../assets/image/warn.png" v-if="isWarning.robot2"  alt="报警" slot="reference" style="left: 655px;top: 460px;position: absolute">
                <img src="../../assets/image/normal.png" v-else  alt="normal" slot="reference" style="left: 655px;top: 460px;position: absolute">
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
                <img src="../../assets/image/warn.png" v-if="isWarning.robot3"  alt="报警" slot="reference" style="left: 920px;top: 460px;position: absolute">
                <img src="../../assets/image/normal.png" v-else  alt="normal" slot="reference" style="left: 920px;top: 460px;position: absolute">
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
                <img src="../../assets/image/warn.png" v-if="isWarning.robot4"  alt="报警" slot="reference" style="right: 450px;top: 480px;position: absolute">
                <img src="../../assets/image/normal.png" v-else  alt="normal" slot="reference" style="right: 450px;top: 480px;position: absolute">
            </el-popover>
            <el-popover
                    placement="top-start"
                    title="设备信息"
                    width="200"
                    trigger="hover">

                <div  style="position: relative">
                    <div class="mask">
                    </div>
                    <el-table :data="popover.robot5" :show-header="isShowHeader" stripe>
                        <el-table-column width="100" property="first"  ></el-table-column>
                        <el-table-column width="100" property="second" ></el-table-column>
                    </el-table>
                </div>
                <img src="../../assets/image/warn.png" v-if="isWarning.robot5"  alt="报警" slot="reference" style="right: 250px;top: 480px;position: absolute">
                <img src="../../assets/image/normal.png" v-else  alt="normal" slot="reference" style="right: 250px;top: 480px;position: absolute">
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
                    backgroundImage: 'url(' + require('../../assets/image/background.png') + ')'
                },
                //切割机上三张图片
                qiege:[false,false,false],
                count:0,
                // 几个位置板件是否显示
                banjian:{
                    robot1:false,
                    position_d_0:false,
                    position_d_1:false,
                    position_1:false,
                    position_2:true,
                    position_23:false,
                    robot2:false,
                    robot3:false,
                    position_34:false,
                    position_5:false,
                },
                // 各机器位置
                position:{
                    robot1:1,//01-4放输送线位置-工件 01-2取料位置-工件
                    qiegeji:1,
                    robot2:"2_1",//02-2取料位置-工件 02-3对中位置-工件 02-4压窝位置1-工件
                    robot3:"2_1",//03-2取料位置-工件 03-3对中位置-工件 03-4压窝位置-工件
                    robot4:"2_1",//04-3加工位置-工件
                    robot5:1,//05-2取料位置-工件
                },
                // 各机器、设备、模具是否报警
                isWarning:{
                    // 机器人
                    robot1:false,
                    robot2:false,
                    robot3:false,
                    robot4:false,
                    robot5:false,
                    //设备
                    qiegeji:false,
                    chongchuang_front:false,
                    chongchuang_behind:false,
                    zhewanji:false,
                    fanbian800:false,
                    fanbian900:false,
                    dianhan800:false,
                    //模具
                    qiegeji_moju:false,
                    yawo1_moju:false,
                    yawo2_moju:false,
                    yawo3_moju:false,
                    zhewanji_moju:false,
                    fanbian800_moju:false,
                    fanbian900_moju:false,
                    dianhan800_moju:false,
                    maduo_manliao:false,
                },
                // 弹出框不显示表头
                isShowHeader:false,
                // 弹出框内容
                popover:{
                    robot1:[
                        {
                            first: '设备名称',
                            second:'取料机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB1'
                        },
                    ],
                    robot2:[
                        {
                            first: '设备名称',
                            second:'压窝前机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB2'
                        },

                    ],
                    robot3:[
                        {
                            first: '设备名称',
                            second:'压窝后机器人'
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
                    robot5:[
                        {
                            first: '设备名称',
                            second:'堆垛机器人'
                        },
                        {
                            first: '设备型号',
                            second:'ROB5'
                        },
                    ],
                    qiegeji:[
                        {
                            first: '设备名称',
                            second:'激光裁剪机'
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
                    yawo1:[
                        {
                            first: '设备名称',
                            second:'1号压窝冲床'
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
                    yawo2:[
                        {
                            first: '设备名称',
                            second:'2号压窝冲床'
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
                    yawo3:[
                        {
                            first: '设备名称',
                            second:'3号压窝冲床'
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
                    zhewanji:[
                        {
                            first: '设备名称',
                            second:'折弯机'
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
                    fanbian800:[
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
                    fanbian900:[
                        {
                            first: '设备名称',
                            second:'900翻边机'
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
                    dianhan800:[
                        {
                            first: '设备名称',
                            second:'点焊机'
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
                        if(equipname==='robot1'){this.errorNotice('取料机器人报警',offset);offset+=50;}
                        else if (equipname==='qiegeji'){this.errorNotice('激光切割机报警',offset);offset+=50;}
                        else if (equipname==='robot2'){this.errorNotice('压窝前机器人报警',offset);offset+=50;}
                        else if (equipname==='robot3'){this.errorNotice('压窝后机器人报警',offset);offset+=50;}
                        else if (equipname==='robot4'){this.errorNotice('折弯机机器人报警',offset);offset+=50;}
                        else if (equipname==='robot5'){this.errorNotice('码垛机器人报警',offset);offset+=50;}
                        else if (equipname==='chongchuang_front'){this.errorNotice('前压窝冲床报警',offset);offset+=50;}
                        else if (equipname==='chongchuang_behind'){this.errorNotice('后压窝冲床报警',offset);offset+=50;}
                        else if (equipname==='zhewanji'){this.errorNotice('折弯机报警',offset);offset+=50;}
                        else if (equipname==='fanbian800'){this.errorNotice('800翻边机报警',offset);offset+=50;}
                        else if (equipname==='fanbian900'){this.errorNotice('900翻边机报警',offset);offset+=50;}
                        else if (equipname==='dianhan800'){this.errorNotice('800点焊机报警',offset);offset+=50;}
                        else if (equipname==='qiegeji_moju'){this.errorNotice('切割机模具报警',offset);offset+=50;}
                        else if (equipname==='yawo1_moju'){this.errorNotice('压窝1冲床模具报警',offset);offset+=50;}
                        else if (equipname==='yawo2_moju'){this.errorNotice('压窝2冲床模具报警',offset);offset+=50;}
                        else if (equipname==='yawo3_moju'){this.errorNotice('压窝3冲床模具报警',offset);offset+=50;}
                        else if (equipname==='zhewanji_moju'){this.errorNotice('折弯机模具报警',offset);offset+=50;}
                        else if (equipname==='fanbian800_moju'){this.errorNotice('800翻边机模具报警',offset);offset+=50;}
                        else if (equipname==='fanbian900_moju'){this.errorNotice('900翻边机模具报警',offset);offset+=50;}
                        else if (equipname==='dianhan800_moju'){this.errorNotice('点焊机模具报警',offset);offset+=50;}
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
                        if (val === 2) {
                            setTimeout(function () {
                                that.position[equipname]="2_1"
                            },1000);
                        }
                        else if (val === 4) {
                            setTimeout(function () {
                                that.position[equipname]="4_0";
                                that.qiege[0]=true
                            },1000);
                        }
                        else if (val === 5) {that.count=1;}
                        else if (val === 6) {that.count=2;}
                        else if (val === 8) {
                            that.qiege=[false,false,false];
                            that.qiege[that.count]=true;
                            setTimeout(function () {
                                that.position[equipname]="8_0";
                                that.banjian[equipname]=true;
                            },1000);
                            setTimeout(function () {
                                that.banjian['robot1']=false;
                                that.banjian['position_d_0']=true;
                                console.log('步骤1')
                            },2000);
                            setTimeout(function () {
                                that.banjian['position_d_0']=false;
                                that.banjian['position_d_1']=true;
                                console.log('步骤2')
                            },3000);
                            setTimeout(function () {
                                that.banjian['position_d_1']=false;
                                console.log('步骤5')
                            },4000);
                        }
                        else if (val === 9) {that.count=0;that.qiege=[false,false,false]}
                        else {}
                    }
                    if (equipname==='robot4'||equipname==='robot5'){
                        this.position[equipname]=val;
                        console.log(equipname,this.position[equipname])
                        if (val === 2) {
                            setTimeout(function () {
                                that.position[equipname]="2_1"
                            },1000);
                        }
                    }
                    if(equipname==='robot2'||equipname==='robot3'){
                        this.position[equipname]=val;
                        console.log(equipname,this.position[equipname])
                        if (val === 2) {
                            setTimeout(function () {
                                that.position[equipname]="2_1"
                            },1000);
                        }
                        else if(equipname==='robot3'&&val===1){
                            that.banjian['robot1']=false;
                        }
                        else if(val===3){
                            that.banjian[equipname]=false;
                        }
                        else if (val === 6) {
                            setTimeout(function () {
                                that.position[equipname]="6_0";
                                that.banjian[equipname]=true;
                            },1000);
                        }
                    }
                    if(equipname==='banjian_23'){
                        that.banjian['position_23']=val;
                        if (val){
                            that.banjian['robot2']=false;
                            that.banjian['robot3']=false;
                        }
                    }
                    if(equipname==='banjian_34'){
                        that.banjian['position_34']=val;
                    }
                    if(equipname==='banjian_12'){
                        //20200705 想法：判断当前有几块板，分别写出由0->1，1->2，2->1，1->0的情况
                        if (val===2){
                            that.banjian['position_1']=true;
                            that.banjian['position_2']=true
                        }
                        else if (val===1){
                            that.banjian['position_1']=false;
                            that.banjian['position_2']=true
                        }
                        else if(val===0){
                            that.banjian['position_1']=false;
                            that.banjian['position_2']=false
                        }
                        else{}
                    }
                }
                // 是否开启报警检测
                else if(tag==='switch'){
                    this.switch_all=val;
                    console.log("检测报警：",this.switch_all)
                }
                // 模具使用次数
                else if(tag==='moju_num'){
                    if (equipname.split('_')[2]==='use') {
                        that.popover[equipname.split('_')[0]][2].second=val+'/'+ that.popover[equipname.split('_')[0]][2].second.split('/')[1];
                    }
                    else if(equipname.split('_')[2]==='set'){
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
                    client.subscribe(["equipment/robot1/state","equipment/robot1/position",
                                    "equipment/qiegeji/state","equipment/qiegeji/position",
                                    "equipment/robot2/state","equipment/robot2/position",
                                    "equipment/robot3/state","equipment/robot3/position",
                                    "equipment/robot4/state","equipment/robot4/position",
                                    "equipment/robot5/state","equipment/robot5/position",
                                    "equipment/chongchuang_front/state",
                                    "equipment/chongchuang_behind/state","equipment/zhewanji/state",
                                    "equipment/dianhan800/state","equipment/qiegeji_moju/state",
                                    "equipment/yawo1_moju/state","equipment/yawo2_moju/state",
                                    "equipment/yawo3_moju/state","equipment/zhewanji_moju/state",
                                    "equipment/fanbian800_moju/state","equipment/fanbian900_moju/state",
                                    "equipment/dianhan800_moju/state","equipment/maduo_manliao/state",
                                    "equipment/queliao/state","equipment/all/switch",
                                    "equipment/banjian_12/position","equipment/banjian_23/position",
                                    "equipment/banjian_34/position","equipment/qiegeji_moju_use/moju_num",
                                    "equipment/qiegeji_moju_set/moju_num","equipment/yawo1_moju_set/moju_num",
                                    "equipment/yawo1_moju_use/moju_num","equipment/yawo2_moju_set/moju_num",
                                    "equipment/yawo2_moju_use/moju_num","equipment/yawo3_moju_set/moju_num",
                                    "equipment/yawo3_moju_use/moju_num","equipment/zhewanji_moju_set/moju_num",
                                    "equipment/zhewanji_moju_use/moju_num","equipment/fanbian800_moju_set/moju_num",
                                    "equipment/fanbian800_moju_use/moju_num","equipment/fanbian900_moju_set/moju_num",
                                    "equipment/fanbian900_moju_use/moju_num","equipment/dianhan800_moju_set/moju_num",
                                    "equipment/dianhan800_moju_use/moju_num","equipment/all/banjian_num",
                                    "equipment/finish/banjian_num","equipment/left/banjian_num",], { qos: 1 }, (error) => {
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
                if(that.isWarning.robot1){that.errorNotice('取料机器人报警',offset);offset+=50;}
                if (that.isWarning.robot2){that.errorNotice('压窝前机器人报警',offset);offset+=50;}
                if (that.isWarning.robot3){that.errorNotice('压窝后机器人报警',offset);offset+=50;}
                if (that.isWarning.robot4){that.errorNotice('折弯机器人报警',offset);offset+=50;}
                if (that.isWarning.robot5){that.errorNotice('堆垛机器人报警',offset);offset+=50;}
                //设备
                if (that.isWarning.qiegeji){that.errorNotice('激光切割机机报警',offset);offset+=50;}
                if (that.isWarning.chongchuang_front){that.errorNotice('前压窝冲床报警',offset);offset+=50;}
                if (that.isWarning.chongchuang_behind){that.errorNotice('后压窝冲床报警',offset);offset+=50;}
                if (that.isWarning.zhewanji){that.errorNotice('折弯机报警',offset);offset+=50;}
                if (that.isWarning.fanbian800){that.errorNotice('800翻边机报警',offset);offset+=50;}
                if (that.isWarning.fanbian900){that.errorNotice('900翻边机报警',offset);offset+=50;}
                if (that.isWarning.dianhan800){that.errorNotice('800点焊机机报警',offset);offset+=50;}
                //模具
                if (that.isWarning.qiegeji_moju){that.errorNotice('切割机模具报警',offset);offset+=50;}
                if (that.isWarning.yawo1_moju){that.errorNotice('压窝1冲床模具报警',offset);offset+=50;}
                if (that.isWarning.yawo2_moju){that.errorNotice('压窝2冲床模具报警',offset);offset+=50;}
                if (that.isWarning.yawo3_moju){that.errorNotice('压窝3冲床模具报警',offset);offset+=50;}
                if (that.isWarning.zhewanji_moju){that.errorNotice('折弯机模具报警',offset);offset+=50;}
                if (that.isWarning.fanbian800_moju){that.errorNotice('800翻边机模具报警',offset);offset+=50;}
                if (that.isWarning.fanbian900_moju){that.errorNotice('900翻边机模具报警',offset);offset+=50;}
                if (that.isWarning.dianhan800_moju){that.errorNotice('点焊机模具报警',offset);offset+=50;}
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
        -webkit-transform:rotate(3deg); /* Safari 和 Chrome */
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