<template>
    <div>
        <el-row style="margin-top: 30px">
            <el-col :span="6" id="realTimeTemperature" style=" height: 345px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="avgTemperature" style=" height: 345px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="realTimeHumidity" style=" height: 345px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="avgHumidity" style=" height: 345px;border: 1px solid #fff;" ></el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col :span="24" id="temperature" style=" height: 400px;border: 1px solid #fff;" ></el-col>
        </el-row>
    </div>
</template>

<script>
    import {getRequst} from "../../utils/api";
    import mqtt from 'mqtt'
    const options = {
        connectTimeout: 40000,
        clientId: 'vue-environment'+new Date().toUTCString(),
        username: 'admin',
        password: 'public',
        clean: true
    };
    let client;
    const echarts = require('echarts');
    export default {
        name: "Monitoring",
        data(){
            return{
                chart_data:{
                    date:[],
                    temperature:[],
                    humidity:[]
                }
            }
        },
        methods:{
            // MQTT注册函数
            mqttMSG () {
                client = mqtt.connect("ws://127.0.0.1:8083/mqtt", options);
                // mqtt连接
                client.on('connect', (e) => {
                    console.log('连接成功:');
                    client.subscribe([
                        "equipment/avgHumidity/environment","equipment/humidity/environment",
                        "equipment/avgTemperature/environment","equipment/temperature/environment",], { qos: 1 }, (error) => {
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
                    let value=JSON.parse(message).data;
                    let equipname = topic.split('/')[1];
                    if (equipname==='avgHumidity') this.gauge('avgHumidity','平均湿度',value);
                    else if (equipname==='avgTemperature')  this.gauge('avgTemperature','平均温度',value);
                    else if (equipname==='temperature') this.gauge('realTimeTemperature','当前温度',value);
                    else if (equipname==='humidity') this.gauge('realTimeHumidity','当前湿度',value);
                    else {}
                });
                // 断开发起重连
                client.on('reconnect', (error) => {
                    console.log('正在重连:', error)
                });
                // 链接异常处理
                client.on('error', (error) => {
                    console.log('连接失败:', error)
                })
            },
            // 仪表盘，参数：id,表名，仪表数值
            gauge(id,titleName,theValue){
                // 表盘最小值
                let min='';
                let unit='%';
                //console.log(titleName.substring(2,4));
                if (titleName.substring(2,4)==='温度'){
                    min=-20;
                    unit='℃'
                }
                else
                    min=0;
                let myChart = echarts.init( document.getElementById(id),'chalk');
                let option = {
                    // backgroundColor: '#0476E9',
                    title: {
                        text: titleName,
                        textStyle: {
                            fontWeight: 'bold',
                            color: '#FFF94B'
                        }
                    },
                    tooltip : {
                        formatter: "{c}℃"
                    },
                    series: [
                        {
                            type: 'gauge',
                            radius: "110%",
                            center: ["50%", "70%"],
                            splitNumber:5,
                            min: min,
                            max: min+100,
                            startAngle: 180,
                            endAngle: 0,
                            detail: {formatter:'{value}'+unit},
                            data: [{value: theValue, name: ' '}],
                            splitLine: {
                                length: 30,//刻度节点线长度
                                lineStyle: {width: 2, color: ['#fff94b']}//刻度节点线
                            },
                            axisLine: { // 坐标轴线
                                lineStyle: {
                                    width: 20,
                                    shadowBlur: 0,
                                    color: [
                                        [0.3, '#d0a00e'],
                                        [0.6, '#34da62'],
                                        [1, '#e54c14']
                                    ]
                                }
                            },
                        },

                    ]
                };
                myChart.setOption(option);
            },
            // 折线图
            line(date,temperature,humidity){
                let myChart = echarts.init( document.getElementById("temperature"));
                let option = {
                    dataZoom:{
                        type: 'inside',
                    },
                    // backgroundColor:'#0476E9',
                    title : {
                        textStyle:{
                            color:"#ccc"
                        }
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'right',
                        y:'middle',
                        orient:"vertical",
                        data:['温度','湿度'],
                        textStyle:{
                            color:"#fff"
                        }
                    },
                    grid: {
                        top: 'middle',
                        left: '3%',
                        right: '4%',
                        top: '20%',
                        containLabel: true
                    },
                    toolbox: {
                        show : true,
                        iconStyle:{
                            normal:{borderColor:"#fff"},
                            emphasis:{borderColor:"#fff94b"}
                        },
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis :
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : date,
                            axisTick: {
                                show: true //隐藏X轴刻度
                            },
                            axisLabel: {
                                color: "#34da62",
                                // textStyle: {
                                //     , //X轴文字颜色
                                // },
                                fontSize: 18,
                            },
                            //修改x轴颜色
                            axisLine:{
                                lineStyle:{
                                    color:'#34da62',
                                    width:3,//这里是为了突出显示加上的
                                }
                            }

                        },
                    yAxis : [
                        {
                            type : 'value',
                            name:"温度℃",
                            position:'left',
                            nameTextStyle: {
                                color: "#34da62",
                                fontSize:20,
                            },
                            axisLabel : {
                                formatter: '{value}℃',
                                fontSize:18,
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#34da62',
                                    width:3,//这里是为了突出显示加上的
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    color: '#DDD'
                                }
                            },
                        },
                        {
                            type : 'value',
                            name:"湿度%",
                            position:'right',
                            nameTextStyle: {
                                color: "#F6D06F",
                                fontSize:20,
                            },
                            axisLabel : {
                                formatter: '{value}%',
                                fontSize:18,
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#F6D06F',
                                    width:3,//这里是为了突出显示加上的
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    color: '#DDD'
                                }
                            },
                        }

                    ],
                    series : [
                        {
                            name:'温度',
                            type:'line',
                            min:10,
                            max:40,
                            data:temperature,
                            yAxisIndex: 0,
                            markPoint : {
                                data : [
                                    {name : '周最高', value : 39, xAxis: 2, yAxis: 39}
                                ],
                                symbolSize: 60,
                                itemStyle:{
                                    color: '#d0a00e',
                                    //borderColor: '#000',
                                    borderWidth: 0,
                                    borderType: 'solid',
                                },
                                //修改气泡中字的大小
                                label:{
                                    fontSize:18,
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#AAF487' // 0% 处的颜色
                                        },
                                            {
                                                offset: 0.4,
                                                color: '#47D8BE' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#47D8BE' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(71,216,190, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#AAF487',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                     shadowBlur: 100,*/
                                    borderColor: "#AAF487"
                                }
                            },
                            smooth: true,
                            // markLine : {
                            //     data : [
                            //         {type : 'average', name: '平均值'}
                            //     ]
                            // }
                        },
                        {
                            name:'湿度',
                            type:'line',
                            min:0,
                            max:100,
                            yAxisIndex: 1,
                            data:humidity,
                            markPoint : {
                                data : [
                                    {name : '周最低', value : 22, xAxis: 1, yAxis: 22}
                                ]
                            },
                            lineStyle: {
                                normal: {
                                    width: 5,
                                    color: {
                                        type: 'linear',

                                        colorStops: [{
                                            offset: 0,
                                            color: '#F6D06F' // 0% 处的颜色
                                        },
                                            {
                                                offset: 0.4,
                                                color: '#F9A589' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#F9A589' // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: 'rgba(249,165,137, 0.5)',
                                    shadowBlur: 10,
                                    shadowOffsetY: 7
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F6D06F',
                                    borderWidth: 10,
                                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                                     shadowBlur: 100,*/
                                    borderColor: "#F6D06F"
                                }
                            },
                            smooth: true,

                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        created:function(){
            this.mqttMSG();
        },
        mounted:function () {
            getRequst('/env/listAll').then(resp=>{
                //console.log(resp.obj);
                for (let i = 0; i <resp.obj.length ; i++) {
                    this.chart_data.date[i]=resp.obj[i].recordTime;
                    this.chart_data.temperature[i]=resp.obj[i].averageTemperature;
                    this.chart_data.humidity[i]=resp.obj[i].averageHumidity
                }
                this.line(this.chart_data.date,this.chart_data.temperature,this.chart_data.humidity);
            });
            this.gauge('realTimeTemperature','当前温度',"26");
            this.gauge('avgTemperature','平均温度',"26");
            this.gauge('realTimeHumidity','当前湿度',"26");
            this.gauge('avgHumidity','平均湿度',"26");

        },
        // 离开时，断开连接
        beforeDestroy:function () {
            client.end(true)
        }
    }
</script>

<style scoped>

</style>