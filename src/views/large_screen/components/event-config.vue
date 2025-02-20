
<template>
<div class="echart-box">
    <!-- 事件统计 -->
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
        </el-col>
    </el-row>
    <div ref="eventChart" class="eventChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import * as mUtils from '@/utils/mUtils';
import { eventAnalysisLine } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            eventChart: null,
            nowFlg: true,
            allDate: [],
            interval: 0
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initData(6)
        
    },
    beforeDestroy() {
    
    },
    methods: {
        changeDte(inx){
            if(inx == 30){
                this.nowFlg = false
                // mUtils.getAIData(29);
                this.initData(inx);
                this.interval = 5
            }else{
                this.nowFlg = true
                this.initData(inx);
                this.interval = 0
                // mUtils.getAIData(6);
            }
        },
        initData(numb){
            let tDate = mUtils.getAIData(numb);
            this.allDate = mUtils.getAllData(numb);
            let params = {
                startDate: tDate[0],
                endDate: tDate[1]
            }
            eventAnalysisLine(params).then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(numb,res.data)
                }
            })
        },
        barCategoryGap(numb,data){
            this.eventChart = echarts.init(this.$refs.eventChart);            
            var _this = this
            var currentIndex = -1;
            var color = ['#1890FF','#0AE1EA','#FACC14','#6A4DFC'],            
            count = [],
            xData = [];
            data.forEach(v => {
                count.push(v.alarmNum)
                let dt = v.date.slice(v.date.indexOf('-')+1,v.date.length) 
                xData.push(dt)
            });
            // xData = this.allDate.reverse()           
            // this.allDate.forEach((its,inx)=>{
            //     data.forEach((el,index)=>{                    
            //         if(its.indexOf(el.date) != -1){
            //             if(its == el.date){
            //                 count.push(el.alarmNum)
            //             }
            //         }else{
            //             count.push('0')
            //         }                    
            //     })
            // })
            var option = {
                color: ["#5090FF", "#01B3E4"],
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(0,0,0,.6)",
                    borderColor: "rgba(147, 235, 248, .8)",
                    textStyle: {
                        color: "#FFF",
                    },
                },
                grid: {
                    left: "2%",
                    right: "7%",
                    bottom: "5%",
                    top: "12%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#67ADE8",
                            fontSize: 12,
                        },
                    },
                    axisLabel: {
                        interval: _this.interval,
                        color: "#67ADE8",
                    },
                    axisTick: {
                        show: false,
                    },
                    data: xData,
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    minInterval: 1,
                    nameTextStyle: {
                        color: "#67ADE8",
                        align: "center",
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.15)",
                            type: 'dashed', // dotted 虚线
                        },
                    },
                    splitArea: { show: false },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        color: "#67ADE8",
                    },
                },
                series: [{
                    type: "line",
                    // symbol: "none",
                    // showSymbol: false,
                    smooth: false, // 是否曲线
                    name: "", // 图例对应类别
                    data: count, // 纵坐标数据
                    areaStyle: {
                        color: {
                        type: 'linear',
                        x: 0,  //右
                        y: 0,  //下
                        x2: 0,  //左
                        y2: 1,  //上
                        colorStops: [
                            {
                                offset: 0.1,
                                color: '#5090FF' // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#1057E500' // 100% 处的颜色
                            }
                        ]
                        },
                    },
                }]
            };
            this.eventChart.setOption(option);
            window.addEventListener('resize', () => {
                this.eventChart.resize();
            }, false); 
            
            setInterval(() => {
                const dataLen = data.length;
                // 取消之前高亮的图形
                _this.eventChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.eventChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.eventChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: currentIndex,
                // });
            }, 1000);
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
.eventChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>