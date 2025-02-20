
<template>
<div class="echart-box">
    <div ref="axisChart" class="axisChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { deviceCategory } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            axisChart: null,
            option: {},
            personTypelist: []
        };
    },
    watch: {
    },
    mounted() {
        this.initData();
    },
    beforeDestroy() {
    
    },
    methods: {
        initData(){
            deviceCategory().then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        barCategoryGap(val){
            this.axisChart = echarts.init(this.$refs.axisChart);
            let name = []
            let totalOnlineDevice = []
            let totalOfflineDevice = []
            let max = 0
            let total = []
            // console.log(val,'----------------------------')
            val.forEach((el)=>{
                name.push(el.typeDesc)
                totalOnlineDevice.push(el.totalOnlineDevice)
                totalOfflineDevice.push(el.totalOfflineDevice)
                total.push(el.totalOnlineDevice + el.totalOfflineDevice)
                max += (el.totalOnlineDevice + el.totalOfflineDevice)
            })
            this.option = {
                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
                //         type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.63)', //设置背景颜色
                    textStyle: {
                        color: '#fff'
                    },
                    borderColor: "rgba(255,255,255, .5)",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '0%',
                    top:'15%',
                    containLabel: true
                },
                legend: {
                    data: ['离线','在线'],
                    right: 10,
                    top:0,
                    textStyle: {
                        color: "#fff"
                    },
                    itemWidth: 12,
                    itemHeight: 10,
                    // itemGap: 35
                },
                xAxis: {
                    type: 'category',
                    data: name,
                    axisTick: {show:false},
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white',
                            fontSize: 12
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: '#67ADE8'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    max:max,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: true,
                        // lineStyle: {
                        //     color: 'rgba(255,255,255,0.3)'
                        // }
                        lineStyle: {
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#67ADE8'
                        }
                    }
                },
                // "dataZoom": [{
                // }],
                series: [
                    // { /*背景图*/
                    //     type: 'bar',
                    //     yAxisIndex: 1,
                    //     silent: true,
                    //     itemStyle: {
                    //         normal: {
                    //             show: true,
                    //             color: 'rgba(255, 255, 255, .11)',
                    //             barBorderRadius: 4,
                    //             borderWidth: 0,
                    //         }
                    //     },
                    //     barWidth: '4px',
                    //     barGap: 1,
                    //     data: total
                    // },
                    // { /*背景图*/
                    //     type: 'bar',
                    //     yAxisIndex: 1,
                    //     silent: true,
                    //     itemStyle: {
                    //         normal: {
                    //             show: true,
                    //             color: 'rgba(255, 255, 255, .11)',
                    //             barBorderRadius: 4,
                    //             borderWidth: 0,
                    //         }
                    //     },
                    //     barWidth: '4px',
                    //     barGap: 1,
                    //     data: total
                    // },
                    {
                    name: '在线',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#8bd46e'
                            }, {
                                offset: 1,
                                color: '#09bcb7'
                            }]),
                            barBorderRadius: 11,
                        }
                        
                    },
                    data: totalOnlineDevice
                },{
                    name: '离线',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fccb05'
                            }, {
                                offset: 1,
                                color: '#f5804d'
                            }]),
                            barBorderRadius: 12,
                        },
                    },
                    data: totalOfflineDevice
                }]
            };

            this.axisChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.axisChart.resize();
            }, false);
            var _this = this
            let currentIndex = 0;
            setInterval(() => {
                const dataLen = val.length;
                // 取消之前高亮的图形
                _this.axisChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.axisChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.axisChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: currentIndex,
                // });
            }, 1000);
        },
    }
}
// "dataZoom": [{
//     "show": true,
//     "height": 12,
//     "xAxisIndex": [
//         0
//     ],
//     bottom:'8%',
//     "start": 10,
//     "end": 90,
//     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
//     handleSize: '110%',
//     handleStyle:{
//         color:"#d3dee5",

//     },
//     textStyle:{
//         color:"#fff"},
//     borderColor:"#90979c"
// }, {
//     "type": "inside",
//     "show": true,
//     "height": 15,
//     "start": 1,
//     "end": 35
// }],
</script>
<style lang="less" scoped>
.axisChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>
