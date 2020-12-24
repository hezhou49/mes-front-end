<template>
    <div >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择产线" class="form-label">
                <el-select v-model="formInline.line" placeholder="选择产线" :clearable="true">
                    <el-option label="轿壁线" value="轿壁线"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称" class="form-label">
                <el-select v-model="formInline.name" placeholder="设备名称" :clearable="true">
                    <el-option label="加强筋机器人" value="加强筋机器人"></el-option>
                    <el-option label="组装机器人" value="组装机器人"></el-option>
                    <el-option label="外包板机器人" value="外包板机器人"></el-option>
                    <el-option label="打胶机器人" value="打胶机器人"></el-option>
                    <el-option label="翻边机" value="翻边机"></el-option>
                    <el-option label="冲床" value="冲床"></el-option>
                    <el-option label="加强筋折弯机" value="加强筋折弯机"></el-option>
                    <el-option label="外包板折弯机" value="外包板折弯机"></el-option>
                    <el-option label="打胶机" value="打胶机"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择时间" class="form-label">
                <div class="block">
                    <el-date-picker
                            v-model="formInline.date"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="6" id="shijian" style=" height: 250px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="xingneng" style=" height: 250px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="hege" style=" height: 250px;border: 1px solid #fff;" ></el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col :span="24" id="history" style=" height: 400px;border: 1px solid #fff;" ></el-col>

        </el-row>
    </div>
</template>

<script>
    import {getRequst} from "../../utils/api";
    import {postKeyValueRequst} from "../../utils/api";
    const echarts = require('echarts');
    const liquidfill = require('echarts-liquidfill');
    import chalk from '../../assets/js/chalk'

    export default {
        name: "oee",
        data(){
            return{
                // 横向表单
                formInline: {
                    name: '',
                    line: '',
                    date:''
                },
                list:null,

            }
        },
        methods:{
            timeList(timeoee) {
                let obj=chalk;
                echarts.registerTheme('chalk', obj);
                let myChart = echarts.init( document.getElementById("shijian"),'chalk');
                let value = timeoee;
                let data = [value, value/1.2, value/1.4, value/1.6 ];
                let option = {
                    backgroundColor: '#2556B5',
                    title: {
                        text: '时间开动率',
                        textStyle: {
                            color: '#FFF94B'
                        }
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [{
                        type: 'liquidFill',
                        radius: '90%',
                        data: data,
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#1daaeb',
                            color: '#fff'
                        },
                        label: {
                            normal: {
                                formatter: (value * 100) + '%',
                                textStyle: {
                                    fontSize: 30
                                }
                            }
                        }
                    }]
                }

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
             xingnenglv(xingneng) {
                 let obj=chalk;
                 echarts.registerTheme('chalk', obj);
                let myChart = echarts.init( document.getElementById("xingneng"),'chalk');
                let value = xingneng
                let data = [value, value/1.2, value/1.4, value/1.6 ];
                let option = {
                    backgroundColor: '#2556B5',
                    title: {
                        text: '性能开动率',
                        textStyle: {
                            // fontWeight: 'normal',
                            color: '#FFF94B'
                        }
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [{
                        type: 'liquidFill',
                        radius: '90%',
                        data: data,
                        backgroundStyle: {
                            borderWidth: 5,
                            //borderColor: '#FFF94B',
                            borderColor: '#1daaeb',
                            color: '#fff'
                        },
                        label: {
                            normal: {
                                formatter: (value * 100) + '%',
                                textStyle: {
                                    fontSize: 30
                                }
                            }
                        }
                    }]
                }
        
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
             hegelv(hege) {
                 let obj=chalk;
                 echarts.registerTheme('chalk', obj);
                let myChart = echarts.init( document.getElementById("hege"),'chalk');
                let value = hege
                let data = [value, value/1.2, value/1.4, value/1.6 ];
                let option = {
                    backgroundColor: '#2556B5',
                    title: {
                        text: '良品率',
                        textStyle: {
                            // fontWeight: 'normal',
                            color: '#FFF94B',
                        }
                    },
                    toolbox: {
                        feature: {
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [{
                        type: 'liquidFill',
                        radius: '90%',
                        data: data,
                        backgroundStyle: {
                            borderWidth: 5,
                            borderColor: '#1daaeb',
                            color: '#fff'
                        },
                        label: {
                            normal: {
                                formatter: (value * 100) + '%',
                                textStyle: {
                                    fontSize: 30
                                }
                            }
                        }
                    }]
                }
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
             history(list,id) {
                console.log('断点1');
                // 引入自定义主题
                let obj=chalk;
                echarts.registerTheme('chalk', obj);
                let dom = document.getElementById(id);
                let myChart = echarts.init(dom,'chalk');
                let app = {};
                let option = null;
                 let data1=[];let data2=[];let data3=[];let data4=[];let data5=[];
                 let data6=[];let data7=[];let data8=[];let data9=[];let data10=[];
                 let data_time=[];
                 for (let i=0;i<list.length;i++){
                     if (list[i].name==="加强筋机器人"){data1.push(list[i].alloee)}
                     else if(list[i].name==="组装机器人"){data2.push(list[i].alloee)}
                     else if(list[i].name==="外包板机器人"){data3.push(list[i].alloee)}
                     else if(list[i].name==="打胶机器人"){data4.push(list[i].alloee)}
                     else if(list[i].name==="加强筋折弯机"){data5.push(list[i].alloee)}
                     else if(list[i].name==="打胶机"){data6.push(list[i].alloee)}
                     else if(list[i].name==="翻边机"){data7.push(list[i].alloee)}
                     else if(list[i].name==="外包板折弯机"){data8.push(list[i].alloee)}
                     else if(list[i].name==="冲床"){data9.push(list[i].alloee)}
                     else {}
                     //横轴时间
                     if(!data_time.includes(list[i].date)){data_time.push(list[i].date)}
                 }
                 //console.log(data1,data2,data3,data4,data5,data6,data7,data7,data9,data10)
                let posList = [
                    'left', 'right', 'top', 'bottom',
                    'inside',
                    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
                ];
        
                app.configParameters = {
                    rotate: {
                        min: -90,
                        max: 90
                    },
                    align: {
                        options: {
                            left: 'left',
                            center: 'center',
                            right: 'right'
                        }
                    },
                    verticalAlign: {
                        options: {
                            top: 'top',
                            middle: 'middle',
                            bottom: 'bottom'
                        }
                    },
                    position: {
                        options: echarts.util.reduce(posList, function (map, pos) {
                            map[pos] = pos;
                            return map;
                        }, {})
                    },
                    distance: {
                        min: 0,
                        max: 100
                    }
                };
        
                app.config = {
                    rotate: 90,
                    align: 'left',
                    verticalAlign: 'middle',
                    position: 'insideBottom',
                    distance: 10,
                    onChange: function () {
                        let labelOption = {
                            normal: {
                                rotate: app.config.rotate,
                                align: app.config.align,
                                verticalAlign: app.config.verticalAlign,
                                position: app.config.position,
                                distance: app.config.distance
                            }
                        };
                        myChart.setOption({
                            series: [{
                                label: labelOption
                            }, {
                                label: labelOption
        
                            }, {
                                label: labelOption
                            }]
                        });
                    }
                };
        
        
                let labelOption = {
                    normal: {
                        show: true,
                        position: app.config.position,
                        distance: app.config.distance,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        rotate: app.config.rotate,
        //						        formatter: '{c}  {name|{a}}',
                        fontSize: 12,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                };
        
                option = {
                    title:{
                        text:"综合OEE统计图",
                        x:'center',
                        textStyle:{
        
                            fontSize:18
                        }
                    },
                    dataZoom: [{
                        type: 'slider',
                        show: true, //flase直接隐藏图形
                        xAxisIndex: [0],
                        left: '9%', //滚动条靠左侧的百分比
                        bottom: 5,
                        start: 0,//滚动条的起始位置
                        end: 100 ,//滚动条的截止位置（按比例分割你的柱状图x轴长度）
        
                    }],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        y:'bottom',
                        padding: 20,
                        data: ['加强筋机器人', '组装机器人', '外包板机器人','打胶机器人','加强筋折弯机','打胶机','翻边机','外包板折弯机','冲床']
                    },
                    toolbox: {
                        show: true,
                        orient: 'horizontal',
                        left: 'right',
                        //x:1435,
                        // top: 'center',
                        feature: {
                            //mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            // magicType: {show: true, type: ['line', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: data_time
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel:  {
                                formatter: function(value){
                                    let a=value*100;
                                    return a.toFixed(0)+"%";}
                            },
                        }
                    ],
                    series: [
                        {
                            name: '加强筋机器人',
                            type: 'bar',
                            barGap:0,
                            label: {
                                //labelOption,
                                // show: true,
                                // formatter: '{b}\n{c}%'
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    //show: true,
                                    // position: app.config.position,
                                    // distance: app.config.distance,
                                    // align: app.config.align,
                                    // verticalAlign: app.config.verticalAlign,
                                    rotate: app.config.rotate,
                                    //						        formatter: '{c}  {name|{a}}',
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
                            data: data1
                        },
                        {
                            name: '组装机器人',
                            type: 'bar',
                            label: {
                                //labelOption,
                                // show: true,
                                // formatter: '{b}\n{c}%'
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    //show: true,
                                    // position: app.config.position,
                                    // distance: app.config.distance,
                                    // align: app.config.align,
                                    // verticalAlign: app.config.verticalAlign,
                                    rotate: app.config.rotate,
                                    //						        formatter: '{c}  {name|{a}}',
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
                            data: data2
                        },
        
                        {
                            name: '外包板机器人',
                            type: 'bar',
                            label: {
                                //labelOption,
                                // show: true,
                                // formatter: '{b}\n{c}%'
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    //show: true,
                                    // position: app.config.position,
                                    // distance: app.config.distance,
                                    // align: app.config.align,
                                    // verticalAlign: app.config.verticalAlign,
                                    rotate: app.config.rotate,
                                    //						        formatter: '{c}  {name|{a}}',
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
        
                            data: data3
                        },
                        {
                            name: '打胶机器人',
                            type: 'bar',
                            label: {
                                //labelOption,
                                // show: true,
                                // formatter: '{b}\n{c}%'
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    //show: true,
                                    // position: app.config.position,
                                    // distance: app.config.distance,
                                    // align: app.config.align,
                                    // verticalAlign: app.config.verticalAlign,
                                    rotate: app.config.rotate,
                                    //						        formatter: '{c}  {name|{a}}',
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
        
                            data: data4
                        },
                        {
                            name: '加强筋折弯机',
                            type: 'bar',
                            label: {
                                //labelOption,
                                // show: true,
                                // formatter: '{b}\n{c}%'
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    //show: true,
                                    // position: app.config.position,
                                    // distance: app.config.distance,
                                    // align: app.config.align,
                                    // verticalAlign: app.config.verticalAlign,
                                    rotate: app.config.rotate,
                                    //						        formatter: '{c}  {name|{a}}',
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
        
                            data: data5
                        },
                        {
                            name: '打胶机',
                            type: 'bar',
                            label: {
                                //labelOption,
                                // show: true,
                                // formatter: '{b}\n{c}%'
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    //show: true,
                                    // position: app.config.position,
                                    // distance: app.config.distance,
                                    // align: app.config.align,
                                    // verticalAlign: app.config.verticalAlign,
                                    rotate: app.config.rotate,
                                    //						        formatter: '{c}  {name|{a}}',
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
        
                            data: data6
                        },
                        {
                            name: '翻边机',
                            type: 'bar',
                            label: {
                                normal:{
                                    show:true,
                                    //formatter:'{c}%',
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    rotate: app.config.rotate,
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
                            data: data7
                        },
                        {
                            name: '外包板折弯机',
                            type: 'bar',
                            label: {
                                normal:{
                                    show:true,
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    rotate: app.config.rotate,
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
                            data: data8
                        },
                        {
                            name: '冲床',
                            type: 'bar',
                            label: {
                                normal:{
                                    show:true,
                                    formatter : function(c){
                                        let a=c.value*100;
                                        return a.toFixed(1)+"%";},
                                    rotate: app.config.rotate,
                                    fontSize: 15,
                                    rich: {
                                        name: {
                                            textBorderColor: '#fff'
                                        }
                                    }
                                },
                            },
                            data: data9
                        },

                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            },
            // 提交表单，进行查询
            onSubmit() {
                postKeyValueRequst('/oeenew/oeeOne',this.formInline).then(resp=>{
                    if(resp){
                        console.log(resp.obj);
                        let timeoee=resp.obj.timeoee;
                        let propertyoee=resp.obj.propertyoee;
                        let qualityoee=resp.obj.qualityoee;
                        this.timeList(timeoee);
                        this.xingnenglv(propertyoee);
                        this.hegelv(qualityoee);
                    }
                })
            },

    },
        mounted:function(){
            console.log(11);
            this.timeList(0.8);
            this.xingnenglv(0.8);
            this.hegelv(0.8);
            getRequst('/oeenew/listAll').then(resp=>{
                //console.log(resp.msg);
                console.log(resp.obj)
                this.history(resp.obj,'history')
            })
        },

    }
</script>

<style scoped>

</style>