
<template>
<div class="echart-box">
    <!-- 人员类型统计 -->
    <div ref="columnChart" class="columnChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { personType } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            columnChart: null,
            option: {}
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initData()
        let currentIndex = -1;
        let _this = this
        setInterval(() => {
            const dataLen = this.option.series[0].data.length;
            // 取消之前高亮的图形
            _this.columnChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: currentIndex,
            });
            currentIndex = (currentIndex + 1) % dataLen;
            // 高亮当前图形
            _this.columnChart.dispatchAction({
                type: "highlight",
                seriesIndex: 0,
                dataIndex: currentIndex,
            });
            // 显示 tooltip
            // _this.columnChart.dispatchAction({
            //     type: "showTip",
            //     seriesIndex: 0,
            //     dataIndex: currentIndex,
            // });
        }, 1000);
        // this.barCategoryGap()
    },
    beforeDestroy() {},
    methods: {
        initData(){
            personType().then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        barCategoryGap(data){
            this.columnChart = echarts.init(this.$refs.columnChart);
            let seriesData = []
            let name = []
            
            data.forEach((el)=>{
                name.push(el.name)
                seriesData.push(el.count)
            })
            var option = {
                textStyle: {
                    fontSize: 0,
                },
                grid: {
                    top: '5%',
                    right: '5%',
                    bottom: '15%',
                    left: '12%',
                },
                tooltip: {
                    show: true,
                    backgroundColor: "rgba(0, 0, 0,.8)",
                    textStyle: {
                        color: "#fff",
                    },
                },
                xAxis: {
                    nameTextStyle: {
                        color: '#c0c3cd',
                        padding: [0, 0, -10, 0],
                        fontSize: 12,
                    },
                    axisLabel: {
                        color: '#67ADE8',
                    },
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
                            color: '#384267',
                            width: 1,
                            type: 'dashed',
                        },
                        show: true,
                    },
                    data: name,
                    type: 'category',
                },
                yAxis: {
                    type: 'value',
                    nameTextStyle: {
                        color: '#c0c3cd',
                        padding: [0, 0, -10, 0],
                    },
                    axisLabel: {
                        interval: 0,
                        margin: 20,
                        color: '#67ADE8',
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#384267',
                            width: 1,
                        },
                        show: true,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#384267',
                            type: 'line',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            type: 'line',
                        },
                        show: false,
                    },
                },
                series: [
                    {
                        data: seriesData,
                        type: 'bar',
                        barMaxWidth: 'auto',
                        barWidth: 25,
                        itemStyle: {
                            color: {
                                x: 0, y: 0, x2: 0, y2: 1,
                                type: 'linear',
                                global: false,
                                colorStops: [   
                                    {
                                        offset: 0,
                                        color: '#00BFFF',
                                    },
                                    {
                                        offset: 1,
                                        color: '#54FF9F',
                                    },
                                ],
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            distance: 10,
                            color: '#fff',
                            position: [30, 10],
                        },
                    },
                    
                ],
            };
            this.option = option
            this.columnChart.setOption(option);
            window.addEventListener('resize', () => {
                this.columnChart.resize();
            }, false);
        },
    }
}
</script>
<style lang="less" scoped>
.columnChart{
    width: 100%;
    height: calc((100vh / 4) - 45px); 
}
</style>