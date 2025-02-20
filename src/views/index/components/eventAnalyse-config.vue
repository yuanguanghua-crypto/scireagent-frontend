
<template>
<div class="echart-box">
    <!-- 算法统计 -->
    <div ref="eventAnalyseChart" class="eventAnalyseChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import { eventStatisticsCircle } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    props: {
        sourceCodeList: {
          //是否初始化默认选中节点
          type: Array,
          default() {
              return [];
          }
      },
    },
    data() {
        return {
            eventAnalyseChart: null
        };
    },
    watch: {},
    mounted() {
        this.initData();
    },
    beforeDestroy() {
    
    },
    methods: {
        initData(){
            let params = {
                sourceCodeList: this.sourceCodeList
            }
            eventStatisticsCircle(params).then(res =>{
                if(res.code == 1000){
                    let data = res.data
                    let newData = []
                    let itemStyle = [                        
                        {color: "#D141D9"},
                        {color: "#FDE82D"},
                        {color: "#1B83EF"},
                        {color: "#8543E0"},
                        {color: "#D01659"},
                        {color: "#19D6FF"}
                    ]
                    data.forEach((v,x) => {
                        newData.push({
                            name: v.sourceName,
                            value: v.alarmNum,
                            itemStyle: itemStyle[x]
                        })
                    });
                    this.barCategoryGap(newData)
                }
            })
        },
        getData(){
            // eventStatistics
        },
        // 3D效果 饼图-------------------------------------
        barCategoryGap(newData){
            var that = this
            this.eventAnalyseChart = echarts.init(this.$refs.eventAnalyseChart);
            var series = this.getPie3D(newData, 0.8, 240, 28, 26, 1);
            // 准备待返回的配置项，把准备好的 legendData、series 传入。
            var option = {
                grid: {
                    top: '0%',
                    left: '5%',
                    right: '5%',
                    bottom: '20%',
                },
                // 背景图片设置
                // graphic: [{
                //     type: "image",
                //     // bounding: true,
                //     // left: "center",
                //     // top: '10%',
                //     z: 10,
                //     left: '19%',
                //     top: '20%',
                //     // bounding: "raw",
                //     rotation: 0, //旋转
                //     // origin: ['50%', '50%'], //中心点
                //     scale: [0.4, 0.3], //缩放
                //     style: {
                //         // 背景图
                //         image: require("../img/milky.png"),
                //         opacity: 1,
                //     },
                // }],
                legend: {
                    show: true,
                    tooltip: {
                        show: true,
                    },
                    orient: "horizontal",
                    // data: ['越界', '入侵', '遮挡', '烟火', '吸烟', '高抛'],
                    x: "center",
                    y: 'bottom',
                    itemGap: 14,
                    itemHeight: 4,
                    itemWidth: 10,
                    right: "2%",
                    textStyle:{
                        color:'#fff',
                        fontSize:'14',
                        rich: {
                            a: {
                                align: 'left' //文字居中显示       
                            },
                            b: {
                                width: 50,
                                color:'#fff',
                                align: 'middle'
                            },
                            c:{
                                width: 30,
                                align: 'right',
                                color:'#fff'
                            }
                        }
                    },
                    formatter: function(name) {
                        var total = 0;
                        var data = newData
                        var tarValue;
                        for (var i = 0; i < data.length; i++) {
                            total += Number(data[i].value);
                            if (data[i].name == name) {
                                tarValue = data[i].value;
                            }
                        }
                        var v = tarValue;
                        var p = Math.round(((v / total) * 100));
                        return `{a|${name}} {b|${v} 次}`;
                    },
                },
                animation: true,
                tooltip: {
                    formatter: (params) => {
                        if (
                        params.seriesName !== "mouseoutSeries" &&
                        params.seriesName !== "pie2d"
                        ) {
                        return `${
                            params.seriesName
                        }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                            params.color
                        };"></span>${
                            option.series[params.seriesIndex].pieData.value
                        }`;
                        }
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                },
                labelLine: {
                    show: false
                },
                xAxis3D: {
                    min: -1,
                    max: 1,
                },
                yAxis3D: {
                    min: -1,
                    max: 1,
                },
                zAxis3D: {
                    min: -1,
                    max: 1,
                },
                grid3D: {
                    show: false,
                    boxHeight: 0.2,
                    top: '-10%',
                    left: '0',
                    bottom: "30%",
                    // environment: "rgba(255,255,255,0)",
                    viewControl: {
                        distance: 180,
                        alpha: 25,
                        beta: 60,
                        autoRotate: true, // 自动旋转
                        zoomSensitivity: false,
                    },
                },
                series: series,
            };
            // 传入数据生成 option
            this.$nextTick(()=>{
                this.eventAnalyseChart.setOption(option);
                window.addEventListener('resize', () => {
                    this.eventAnalyseChart.resize();  
                }, false); // 
            })
        },
        getParametricEquation(startRatio,endRatio,isSelected,isHovered,k,height) {
            // 计算
            let midRatio = (startRatio + endRatio) / 2;
            let startRadian = startRatio * Math.PI * 2;
            let endRadian = endRatio * Math.PI * 2;
            let midRadian = midRatio * Math.PI * 2;
            // 如果只有一个扇形，则不实现选中效果。
            if (startRatio === 0 && endRatio === 1) {
                isSelected = false;
            }
            // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
            k = typeof k !== "undefined" ? k : 1 / 3;
            // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
            let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
            let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
            // 计算高亮效果的放大比例（未高亮，则比例为 1）
            let hoverRate = isHovered ? 1.05 : 1;
            // 返回曲面参数方程
            return {
                u: {
                    min: -Math.PI,
                    max: Math.PI * 3,
                    step: Math.PI / 32,
                },
                v: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },
                x: function (u, v) {
                    if (u < startRadian) {
                        return (
                        offsetX +
                        Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                        );
                    }
                    if (u > endRadian) {
                        return (
                        offsetX +
                        Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                        );
                    }
                    return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
                },
                y: function (u, v) {
                    if (u < startRadian) {
                        return (
                        offsetY +
                        Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                        );
                    }
                    if (u > endRadian) {
                        return (
                        offsetY +
                        Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                        );
                    }
                    return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
                },
                z: function (u, v) {
                    if (u < -Math.PI * 0.5) {
                        return Math.sin(u);
                    }
                    if (u > Math.PI * 2.5) {
                        return Math.sin(u);
                    }
                    return Math.sin(v) > 0 ? 1 * height : -1;
                },
            };
        },
        // 生成模拟 3D 饼图的配置项
        getPie3D(pieData, internalDiameterRatio) {
            let series = [];
            let sumValue = 0;
            let startValue = 0;
            let endValue = 0;
            let legendData = [];
            let k =
            typeof internalDiameterRatio !== "undefined"
                ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                : 1 / 3;
            // 为每一个饼图数据，生成一个 series-surface 配置
            for (let i = 0; i < pieData.length; i++) {
                sumValue += pieData[i].value;
                let seriesItem = {
                    name:
                    typeof pieData[i].name === "undefined"
                        ? `series${i}`
                        : pieData[i].name,
                    type: "surface",
                    parametric: true,
                    wireframe: {
                        show: false,
                    },
                    pieData: pieData[i],
                    pieStatus: {
                    selected: false,
                    hovered: false,
                    k: k,
                    },
                };
                if (typeof pieData[i].itemStyle != "undefined") {
                    let itemStyle = {};
                    typeof pieData[i].itemStyle.color != "undefined"
                    ? (itemStyle.color = pieData[i].itemStyle.color)
                    : null;
                    typeof pieData[i].itemStyle.opacity != "undefined"
                    ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                    : null;
                    seriesItem.itemStyle = itemStyle;
                }
                series.push(seriesItem);
            }
            // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
            // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
            for (let i = 0; i < series.length; i++) {
                endValue = startValue + series[i].pieData.value;
                series[i].pieData.startRatio = startValue / sumValue;
                series[i].pieData.endRatio = endValue / sumValue;
                series[i].parametricEquation = this.getParametricEquation(
                    series[i].pieData.startRatio,
                    series[i].pieData.endRatio,
                    false,
                    false,
                    k,
                    series[i].pieData.value / 50
                );
                startValue = endValue;
                legendData.push(series[i].name);
            }
            return series;
        },
        // --------------------------------------------------
    }
}
</script>
<style lang="less" scoped>
.eventAnalyseChart{
    width: 100%;
    // height: 100%;
    height: calc((100vh  / 4) - 55px);
    background-image: url("../img/milky.png");
    background-repeat: no-repeat;
    background-size:  50% 52%;
    background-position: 50% 40%;
}
</style>