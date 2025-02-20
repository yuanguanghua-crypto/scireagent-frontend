
<template>
    <div class="echart-box">
        <!-- 人员类型统计 -->
        <div ref="columnChart" class="columnChart"></div>
    </div>
    </template>
    <script>
    import * as echarts from 'echarts';
    import { record_area_list_time } from "@/api/v3/face/face.js";
    import { getCockpitCofig } from '@/api/v3/largeScreen/set.js';
    export default {
        name: 'echartBar',
        props: {
            channelIds: {
                //是否初始化默认选中节点
                type: Array,
                default() {
                    return [];
                }
            },
            timePeriod: {
                //是否初始化默认选中节点
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                columnChart: null,
                timer: null,
                nowFlg: true,
                option: {},
                dataList: [],
                len: 0
            };
        },
        watch: {},
        mounted() {
            this.getCarLineInfo();
        },
        beforeDestroy() {            
            clearTimeout(this.timer)
        },
        methods: {
            getDay(){
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            },
            getCarLineInfo(){
                let params = {
                    code: 'passenger_conversion_linebar'
                }
                getCockpitCofig(params).then((res) => {
                    if(res.code == 1000){
                        let newdata = JSON.parse(res.data.param)
                        this.initData(newdata.areaIds,newdata.timePeriod.split('-'))
                    }
                });
            },
            initData(val1,val2){                
                clearTimeout(this.timer)
                // let params = {
                //     areaIds: ["1819180997900627969", "1819181077097476098", "1819181121041199106", "1819181176997408769","1712002144246198274"],
                //     endTime: "2024-08-07 23:59:59",
                //     startTime: "2024-08-07 00:00:00"
                // }
                let params = {
                    areaIds: val1,
                    startTime: this.getDay() + ' ' + val2[0] + ':00',
                    endTime: this.getDay() + ' ' + val2[1] + ':00'
                }
                record_area_list_time(params).then(res =>{
                    if(res.code == 1000){
                        let data = res.data || []
                        this.dataList = data
                        this.barCategoryGap()
                        if(data.length > 6){
                            this.setIntLen();
                        } 
                    }
                })
            },
            barCategoryGap(){
                this.columnChart = echarts.init(this.$refs.columnChart);
                let color = [{
                    x: 0, y: 0, x2: 0, y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {offset: 0, color: 'rgba(94, 55, 251, 1)'}, // 0% 处的颜色'#5E37FB'
                        {offset: 1, color: 'rgba(94, 55, 251, 0.2)'}  // 100% 处的颜色
                    ],
                    },{
                    x: 0, y: 0, x2: 0, y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [ 
                        {offset: 0, color: 'rgba(23,141,250, 1)'}, // 0% 处的颜色#178DFA
                        {offset: 1, color: 'rgba(23,141,250, 0.2)'}  // 100% 处的颜色
                    ],
                }]
                let data = []
                let timeArr = []
                let seriesPass = []
                let seriesIn = []
                let seriesPercent = []                
                if(this.len >= this.dataList.length){
                    this.len = 0
                }
                if(this.dataList.length > 6){
                    data = this.dataList.slice(this.len,this.len + 6)
                }else{
                    data = this.dataList
                }
                data.forEach(v => {
                    timeArr.push(v.statisticsTime.split(' ')[1])
                    seriesPass.push(v.passengerPass)
                    seriesIn.push(v.passengerIn)
                    let arr = parseFloat(((v.passengerIn / v.passengerPass) * 100).toFixed(2))? parseFloat(((v.passengerIn / v.passengerPass) * 100).toFixed(2)):0
                    seriesPercent.push(arr)
                });                
                // 使用Math.max找出最大值
                let max = seriesPass.length ? Math.max(...seriesPass) : 25
                let max2 = seriesPercent.length ? Math.max(...seriesPercent) : 25
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'cross',
                        //     crossStyle: {
                        //         color: '#fff'
                        //     }
                        // }
                    },
                    legend: {
                        itemWidth: 18, // 长方形的宽度
                        itemHeight: 12, // 长方形的高度
                        top: '0px',
                        right: '15px',
                        // 图例文本样式
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        },
                        itemStyle: {
                            borderRadius: [0, 0], // 使其变为正方形，然后设置宽高
                            borderColor: '#1f77b4',
                            borderWidth: 2
                        },
                        data: ['路过', '进店', '进店转化率']
                    },
                    grid: {
                        left: '7%',
                        right: '4%',
                        top: '30%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: timeArr,
                        axisLabel: {
                            color: '#67ADE8',
                            interval:0
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }],
                    yAxis: [{
                            type: 'value',
                            name: '单位：人次',
                            min: 0,
                            max: max,
                            // interval: max / 5,
                            axisTick: {
                                lineStyle: {
                                    color: '#0B1535',
                                    width: 1,
                                },
                                show: false,
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#384267',
                                    width: 1,
                                    type: 'dashed',
                                },
                                show: true,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#67ADE8',
                                    width: 1,
                                    type: 'dashed',
                                },
                                show: false,
                            },
                            axisLabel: {
                                color: '#67ADE8',
                            },
                            // axisLabel: {
                            //     formatter: '{value} ml'
                            // }
                        },{
                            type: 'value',
                            name: '单位：%',
                            min: 0,
                            max: max2,
                            // interval: max2 / 5,
                            axisTick: {
                                lineStyle: {
                                    color: '#0B1535',
                                    width: 1,
                                },
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#67ADE8',
                                    width: 1,
                                    type: 'dashed',
                                },
                                show: false,
                            },
                            axisLabel: {
                                color: '#67ADE8',
                            },
                            // axisLabel: {
                            //     formatter: '{value} °C'
                            // }
                    }],
                    series: [{
                        name: '路过',
                        type: 'bar',
                        barWidth: '15px',
                        itemStyle: {
                            color: "#027fff",
                            borderRadius:[25,25,0,0,0],
                        },
                        data: seriesPass
                    },{
                        name: '进店',
                        type: 'bar',
                        barWidth: '15px',
                        itemStyle: {
                            color: "#0AE1EA",
                            borderRadius:[25,25,0,0,0],
                        },
                        data: seriesIn
                    },{
                        name: '进店转化率',
                        type: 'line',
                        yAxisIndex: 1,
                        symbol: 'none', // 设置为 'none' 去掉点
                        itemStyle: {
                            color: "#6A4DFC"
                        },
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' %';
                            }
                        },
                        data: seriesPercent
                    }]
                };
                this.columnChart.setOption(option);
                this.len += 6 
            },
            setIntLen(){
                let _this = this
                this.timer = setInterval(() => {
                    _this.barCategoryGap();
                }, 5000);
            },
        }
    }
    </script>
    <style lang="less" scoped>
    .echart-box{
        position: relative;
        .btn-cok{
            position: absolute;
            top: -35px;
            right: 0;
            z-index: 9999;
            width: 100%;
            color: #fff;
            text-align: center;
            span{
                margin-right: 10px;
                color: '#ccc';
                opacity: 0.5;
                cursor: pointer;
            }
            span.currt{
                color: '#fff';
                opacity: 1;
            }
        }    
    }
    .columnChart{
        width: 100%;
        height: calc((100vh / 4) - 45px); 
    }
    </style>