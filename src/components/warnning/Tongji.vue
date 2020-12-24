<template>
    <div>
        <el-row style="margin-top: 30px;">
            <el-col :span="24" id="test" style=" height: 800px;" ></el-col>
        </el-row>
    </div>
</template>

<script>
    const echarts = require('echarts');
    import {getRequst} from "../../utils/api";

    export default {
        name: "Tongji",
        data(){
            return{
                //机器名称
                listEquip:['加强筋机器人', '组装机器人', '外包板机器人', '打胶机器人', '打胶机', '翻边机', '外包板折弯机', '冲床', '加强筋折弯机'],
                //每个机器报警数量
                listEach:[0,0,0,0,0,0,0,0,0],
                formInline: {
                    lineName: '',
                    time:''
                },
            }
        },
        methods:{
            listAll(){
                getRequst('/warnning/listAll').then(resp=>{
                    for (let i = 0; i <resp.obj.length ; i++) {
                        for (let j = 0; j <this.listEquip.length ; j++) {
                            if (this.listEquip[j]===resp.obj[i].equipmentName){
                                this.listEach[j]=this.listEach[j]+1;
                            }
                        }
                    }
                    console.log(this.listEach);
                    this.tongji();
                })
            },
            tongji(){
                let myChart = echarts.init(document.getElementById('test'));
                let option = {
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: '10%',
                        right: '6%',
                        left: '8%',
                        bottom: '12%'
                    },
                    yAxis: [{
                        type: 'category',
                        data: this.listEquip,
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.12)'
                            }
                        },
                        axisLabel: {
                            margin: 5,
                            color: '#e2e9ff',
                            fontSize: 15
                        },

                    }],
                    xAxis: [{
                        axisLabel: {
                            formatter: '{value}',
                            color: '#e2e9ff',
                            fontSize: 18
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.12)'
                            }
                        }
                    }],
                    series: [{
                        type: 'bar',
                        data: this.listEach,
                        barWidth: '21px',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,244,255,1)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,77,167,1)' // 100% 处的颜色
                                }], false),
                                barBorderRadius: [30, 30, 30, 30],
                                shadowColor: 'rgba(0,160,221,1)',
                                shadowBlur: 4,
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                fontSize:20,
                            }
                        }
                    }]
                };
                myChart.setOption(option, true);
            },

        },
        mounted:function () {
            this.listAll()
        }
    }
</script>

<style scoped>

</style>