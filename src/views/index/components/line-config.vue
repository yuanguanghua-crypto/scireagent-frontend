    
<template>
<div class="echart-box">
    <!-- 设备日活趋势 -->
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(7)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
        </el-col>
    </el-row>
    <div ref="lineChart" class="lineChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import * as mUtils from '@/utils/mUtils';
import { deviceOnlineTrend } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            lineChart: null,
            nowFlg: true,            
            interval: 0,
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initData(6)
    },
    methods: {
        // 流光曲线
        initLineEchart(xaxisData,yaxisData,animationData){
            // 动画数据
            // animationData 
            if (!this.lineChart) {
                this.lineChart = echarts.init(this.$refs.lineChart);
            }
            // rgba(2, 127, 255, 1)
            var line = this.$refs.line
            // 创建渐变颜色数组
            var colors = ['#ff0000', '#00ff00', '#0000ff'];

            // // 配置项
            var option = {  
                // backgroundColor: '#001829',
                grid: {  
                    top: '16%',
                    left: '3%',
                    right: '5%',
                    bottom: '7%',
                    containLabel: true
                },
                legend: {
                    top: '0',
                    left: 'center',
                    textStyle: {
                        color: '#fff' // 设置字体颜色为红色
                    }
                },
                tooltip: {  
                    trigger: 'axis',
                    confine: true,
                    backgroundColor: 'rgba(2, 127, 255, 0.5)',
                    borderColor: 'rgba(2, 127, 255, 1)',
                    textStyle: {  
                        fontSize: 16,
                        color: '#fff'
                    },
                    formatter: (params) => {  
                        const item = params[0];
                        return '日活数量' + '<br/>' + item.name + '：' + item.value + ' 个';
                    },
                    // 鼠标移入时竖线的样式
                    axisPointer: {  
                        type: 'line',
                        lineStyle: {  
                            color: '#FF845A'
                        }
                    }
                },
                xAxis: {
                    data: xaxisData,
                    boundaryGap: false,
                    axisLabel : {
                        interval: this.interval
                    },
                    axisLine: {  
                        show: false,
                        symbol: ['none', 'rect'],
                        symbolSize: [6, 12],
                        lineStyle: {  
                            width: 2,
                            color: '#67ADE8'
                        }
                    },
                    splitLine: {
                        show: true,
                        // lineStyle: { //分割线
                        //     color: "#268C8C",
                        //     width: 1,
                        //     type: "dashed" //dotted：虚线 solid:实线
                        // },
                        lineStyle: {        
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    },
                    axisTick: {  
                        show: false
                    }
                },
                yAxis: {
                    name: ' ',
                    nameTextStyle: {        
                        color: '#AEC9FF',
                        fontWeight: 400,
                        fontSize: 14
                    },
                    axisLabel: {        
                        color: '#67ADE8'
                    },
                    // x、y轴顶端的样式，小矩形
                    axisLine: {        
                        show: false,
                        symbol: ['none', 'rect'],
                        symbolSize: [6, 12],
                        lineStyle: {        
                            width: 2,
                            color: '#537DAA'
                        }
                    },
                    axisTick: {        
                        show: false
                    },
                    splitLine: {
                        show: true,
                        // lineStyle: { //分割线
                        //     color: "#268C8C",
                        //     width: 1,
                        //     type: "dashed" //dotted：虚线 solid:实线
                        // },
                        lineStyle: {        
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    }
                },
                series: [{  
                    type: 'line',
                    lineWidth: 1.2,
                    smooth: true, //是否平滑
                    data: yaxisData,
                    // 线条节点的样式
                    // symbol: 'image://https://easyv.assets.dtstack.com/data/114350/729633/img/aqp4b9ektk_1642493282093_00kx2xfruc.png',
                    symbolSize: 0,
                    itemStyle: {  
                        color: 'rgba(114, 178, 255, 1)'
                    },
                    // 线条样式
                    lineStyle: {  
                        width: 2,
                        shadowBlur: 20,
                        shadowColor: '#72B2FF',
                        shadowOffsetY: 10
                    },
                    // 线条下面阴影的样式，线性渐变
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0,0,0,1,
                            [{offset: 0,color: 'rgba(2, 127, 255, 0.6)'},{ offset: 1,color: 'rgba(2, 127, 255, 0)'}],
                            false
                        ),
                        opacity: 1
                    }
                },{
                    type: 'lines',
                    coordinateSystem: 'cartesian2d',
                    data: [{  
                        coords: animationData
                    }],
                    zlevel: 1,
                    // 是否是多线段
                    polyline: true,
                    symbol: 'circle',
                    effect: {  
                        show: true,
                        trailLength: 0.6,
                        symbol: 'circle',
                        period: 4,
                        symbolSize: 6
                    },
                    lineStyle: {  
                        normal: {  
                            color: '#64FFFF',
                            width: 0,
                            opacity: 0,
                            curveness: 1
                        }
                    }
                }],
            };
            this.lineChart.setOption(option,true);
            window.addEventListener('resize', () => {
                this.lineChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
        },
        changeDte(inx){
            if(inx == 30){
                this.nowFlg = false
                // mUtils.getAIData(29);
                this.initData(inx);
                this.interval = 4
            }else{
                this.nowFlg = true
                this.initData(inx);
                // mUtils.getAIData(6);
                this.interval = 1
            }
        },
        initData(numb){
            let tDate = mUtils.getAIData(numb);
            let params = {
                startDate: tDate[0],
                endDate: tDate[1]
            }
            deviceOnlineTrend(params).then(res =>{
                if(res.code == 1000){
                    let xaxisData = []
                    let yaxisData = []
                    let animationData = []
                    res.data.forEach(el => {
                        let arr = el.date.split('-')
                        let nar = arr[1]+'-'+arr[2]
                        xaxisData.push(nar)
                        yaxisData.push(el.maxChannelOnline)
                        animationData.push([nar,el.maxChannelOnline])
                    });
                    this.initLineEchart(xaxisData,yaxisData,animationData)
                }
            })
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
.lineChart{
    width: 100%;
    // height: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>