<template>
    <div>
        <el-row style="margin-top: 30px">
            <el-col :span="6" id="zonggong" style=" height: 345px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="niandu" style=" height: 345px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="yuedu" style=" height: 345px;border: 1px solid #fff;" ></el-col>
            <el-col :span="6" id="dangri" style=" height: 345px;border: 1px solid #fff;" ></el-col>
        </el-row>
        <el-row style="margin-top: 30px;border: 1px solid #fff;position: relative;">
            <el-col :span="24" id="zonghe" style=" height: 400px;" ></el-col>
            <el-button type="primary" size="mini" :disabled="disable[0]" style="position: absolute;left:40px;top:30px;" @click="handleClick(1)">每日</el-button>
            <el-button type="primary" size="mini" :disabled="disable[1]" style="position: absolute;left:30px;top:60px;" @click="handleClick(2)">每月</el-button>
            <el-button type="primary" size="mini" :disabled="disable[2]" style="position: absolute;left:30px;top:90px;" @click="handleClick(3)">每年</el-button>
            <el-button type="primary" size="mini" :disabled="disable[3]" style="position: absolute;left:30px;top:120px;" @click="handleClick(4)">订单</el-button>
        </el-row>

    </div>
</template>

<script>
    import {getRequst} from "../../utils/api";
    import {postKeyValueRequst} from "../../utils/api";
    import chalk from '../../assets/js/chalk'
    const echarts = require('echarts');
    let interval;
    export default {
        name: "Energy",
        data(){
            return{
                // 全部数据
                list_all:{
                    date:[],
                    data:[],
                },
                list_month:[],
                list_year:[],
                value_top:{},
                // 3个按钮显示状态
                disable:[true,false,false,false]
            }
        },
        methods:{
            // 查询所有数据并可视化
            listAll(){
                getRequst('/energy/listAll').then(resp=>{
                    this.value_top=resp.obj[0];
                    for (let i = 0; i <resp.obj.length ; i++) {
                        this.list_all.date[i]=resp.obj[i].date;
                        this.list_all.data[i]=resp.obj[i].day_energy;
                    }
                    console.log(this.list_all);
                    // 可视化
                    this.nenghao(this.value_top.total_energy,60,'zonggong','总能耗');
                    this.nenghao(this.value_top.year_energy,60,'niandu','年度能耗');
                    this.nenghao(this.value_top.month_energy,80,'yuedu','月度能耗');
                    this.nenghao(this.value_top.day_energy,90,'dangri','当日能耗');
                    this.energy_all();
                })
            },
            // 按钮点击事件，切换数据
            handleClick(flag){
                if(flag===1){
                    // 禁用按钮
                    this.disable=[true,false,false,false];
                    this.listAll();
                }
                if(flag===2){
                    this.disable=[false,true,false,false];
                    postKeyValueRequst('/energy/listTop',{column:'month'}).then(resp=>{
                        console.log(resp.obj);
                        this.list_all.date=[];
                        this.list_all.data=[];
                        for (let i = 0; i <resp.obj.length ; i++) {
                            this.list_all.date[i]=resp.obj[i].month;
                            this.list_all.data[i]=resp.obj[i].month_energy;
                        }
                        this.energy_all();
                    })
                }
                if(flag===3){
                    this.disable=[false,false,true,false];
                    postKeyValueRequst('/energy/listTop',{column:'year'}).then(resp=>{
                        console.log(resp.obj);
                        this.list_all.date=[];
                        this.list_all.data=[];
                        for (let i = 0; i <resp.obj.length ; i++) {
                            this.list_all.date[i]=resp.obj[i].year;
                            this.list_all.data[i]=resp.obj[i].year_energy;
                        }
                        this.energy_all();
                    })
                }
                if(flag===4){
                    this.disable=[false,false,false,true];
                    postKeyValueRequst('/order/listAllByStatus',{status:'2'}).then(resp=>{
                        // console.log(resp.obj);
                        this.list_all.date=[];
                        this.list_all.data=[];
                        for (let i = 0; i <resp.obj.length ; i++) {
                            this.list_all.date[i]=resp.obj[i].ordernumber;
                            this.list_all.data[i]=resp.obj[i].energy;
                        }
                        this.energy_all();
                    });
                }
            },
            nenghao(all,position,id,title_name) {
                let obj=chalk;
                echarts.registerTheme('chalk', obj);
                let myChart = echarts.init( document.getElementById(id),'chalk');
                let value_all=all;
                let option = {
                    title: {
                        text: title_name,
                        textStyle: {
                            fontWeight: 'bold',
                            color: '#FFF94B'
                        }
                    },
                    series: [
                        {
                            type: 'gauge',
                            radius: "110%",
                            center: ["50%", "70%"],
                            splitNumber:5,
                            min: 0,
                            max: 100,
                            startAngle: 180,
                            endAngle: 0,
                            detail: {formatter: ''+value_all+'KW',},
                            data: [{value: position, name: ' '}],
                            splitLine: {
                                length: 30,//刻度节点线长度
                                lineStyle: {width: 2, color: ['#fff94b']}//刻度节点线
                            },
                            axisLine: { // 坐标轴线
                                lineStyle: {
                                    width: 20,
                                    shadowBlur: 0,
                                    color: [
                                        [0.3, '#34da62'],
                                        [0.6,'#d0a00e' ],
                                        [1, '#e54c14']
                                    ]
                                }
                            },
                        },

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                // 给tab加上“lazy”属性，可以延迟渲染，就不用resize了
            },
            energy_all() {
                let obj=chalk;
                echarts.registerTheme('chalk', obj);
                let myChart = echarts.init( document.getElementById("zonghe"),'chalk');
                let option = {
                    title:{
                        text:"综合能耗统计图",
                        x:'center',
                        textStyle:{
                            fontSize:18
                        }
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: "{b}<br />能耗：{c}KW"
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            magicType : {show: true, type: ['line', 'bar']},
                            saveAsImage : {show: true}
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.list_all.date
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.list_all.data,
                        type: 'line',
                        smooth:true,
                        itemStyle:{
                            color:'#11da0f',
                        },
                        areaStyle: {
                            color: 'lime',
                        }
                    }],
        
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option,true);
            }
        },
        mounted:function () {
            this.listAll();
            let that=this;
            interval = setInterval(function () {
                console.log("能量管理页定时器");
                getRequst('/energy/listAll').then(resp=>{
                    that.value_top=resp.obj[0];
                    for (let i = 0; i <resp.obj.length ; i++) {
                        that.list_all.date[i]=resp.obj[i].date;
                        that.list_all.data[i]=resp.obj[i].day_energy;
                    }
                    that.nenghao(that.value_top.day_energy,90,'dangri','当日能耗');
                })
            },60000);
            //
        },
        beforeDestroy:function () {
            console.log("清除能量管理页定时器");
            clearInterval(interval);
        }
    }
</script>

<style scoped>

</style>