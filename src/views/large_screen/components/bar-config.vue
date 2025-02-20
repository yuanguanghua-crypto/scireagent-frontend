
<template>
<div class="echart-box">
    <!-- 算法配置统计 -->
    <div ref="barChart" class="barChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { algorithmArrangementBar } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            barChart: null
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.getData();
    },
    beforeDestroy() {
      
    },
    methods: {
        getData(){
            algorithmArrangementBar().then(res =>{
                if(res.code == 1000){
                    var data = []
                    var arr = res.data
                    var name = []
                    var max = arr.length > 0 ? Math.max.apply(Math, arr.map(function(item) { return item.count })) : 0
                    res.data.forEach((el)=>{
                        data.push({
                            name: el.type,
                            value: el.count,
                            max: max
                        })
                        name.push(el.type)
                    })
                    this.barCategoryGap(max,name,data)
                }
            })
        },
        barCategoryGap(max,name,data){
            this.barChart = echarts.init(this.$refs.barChart);
            // 创建渐变颜色数组
            var dataList = data
            var xData = [];
            var xLabel = []
            data.forEach(v => {
                xLabel.push(v.name)
                xData.push(v.value)
            });
            let option = {
                tooltip:{
                    show:true,
                },
                animation: false,
                grid: {
                    top: "15%",
                    right: '5%',
                    bottom: "22%"//也可设置left和right设置距离来控制图表的大小
                },
                xAxis: {
                    data: xLabel,
                    axisLine:{
                    show:false,
                    },
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    axisLabel: {
                        show: true,
                        rotate: 25,
                        margin: 10,
                        interval: 0,
                        textStyle: {
                            color: "#67ADE8" //X轴文字颜色
                        }
                    },
                    
                },
                yAxis: [
                    {
                        type: "value",
                        gridIndex: 0,
                        min: 0,
                        max: max,
                        interval: 1,
                        // splitNumber: 4,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type:'dashed',
                                color: 'rgb(20,57,110)',
                                width: 1
                            },
                        },
                        axisLine:{
                            show:false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            margin: 12,
                            textStyle: {
                                color: "#67ADE8" //Y轴文字颜色
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "",
                        type: "bar",
                        barWidth: 15,
                        showBackground:true,
                        backgroundStyle: {
                            color: 'transparent',
                            borderColor:'rgb(20,57,110)',
                            borderWidth:1,
                            borderType:'solid'
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(35,183,199)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(110,65,253)'
                                    }
                                ])
                            },
                            decal:{
                                show:true,
                                symbol:'circle',
                                symbolSize:[0,60],
                            },
                        },
                        data: xData,
                        z: 10,
                        zlevel: 0,
                        label: {
                            show: true,
                            position: "top",
                            distance: 10,
                            fontSize:16,
                            color: '#fff'
                        }
                    },
                    {
                        // 分隔
                        type: 'pictorialBar',
                        itemStyle: {
                            normal:{
                                color:"#0F375F"
                            }
                        },
                        symbolRepeat: 'fixed',
                        symbolMargin: 4,
                        symbol: 'rect',
                        symbolClip: true,
                        symbolSize: [20, 2],
                        symbolPosition: "start",
                        symbolOffset: [0, -1],
                        // symbolBoundingData: this.total,
                        data: xData,
                        width: 10,
                        z: 0,
                        zlevel: 1,
                    },
                ]   
            };
            this.barChart.setOption(option);
            window.addEventListener('resize', () => {
                this.barChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
            let currentIndex = -1;
            let _this = this
            setInterval(() => {
                const dataLen = data.length;
                // 取消之前高亮的图形
                _this.barChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.barChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
            }, 1000);
        },
    }
}
</script>
<style lang="less" scoped>
.barChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>