
<template>
<div class="echart-box"><!-- 识别统计 -->
    <div class="btn-cok">
        <span @click="changeDte(7)" :class="{currt:nowFlg}">近7天</span>
        <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
    </div>
    <div ref="captureChart" class="captureChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { snapShot } from '@/api/v3/largeScreen/set.js';
import * as mUtils from '@/utils/mUtils';
export default {
    name: 'echartBar',
    data() {
        return {
            captureChart: null,
            nowFlg: true,
            allDate: []
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initData(7);        
    },
    beforeDestroy() {
    
    },
    methods: {
        changeDte(inx){
            if(inx == 30){
                this.nowFlg = false
                this.initData(inx);
            }else{
                this.nowFlg = true
                this.initData(inx);
            }
        },
        initData(numb){
            let tDate = mUtils.getAIData(numb);
            this.allDate = mUtils.getAllData(numb);
            
            let params = {
                startDate: tDate[0],
                endDate: tDate[1]
            }
            snapShot(params).then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(numb,res.data)
                }
            })
        },
        barCategoryGap(numb,data){
            this.captureChart = echarts.init(this.$refs.captureChart);                
            var colorList = ['#04FEF9', '#77ED4D', '#48A3FF', '#FFE822', '#FF61D8', '#FCCF77'];
            var _this = this
            let name = []            
            let value = []
            let max = 0
            var newData = data
            const res = new Map();
            newData = newData.reduce((list, item)=>{
                if(res.has(item.name)){
                    res.get(item.name).count += item.count * 1
                }else{
                    let o = {...item,count: item.count*1}
                    list.push(o)
                    res.set(item.name, o)
                }
                return list
            }, []);
            // console.log(newData)
            newData.forEach(v => {
                name.push(v.name)
                value.push(v.count)
            });
            // console.log(data,'----------------------------')
            var option = {
                color: colorList,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '10%',
                    top:'10%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: name,  //['陌生人', '白名单', '普通人', '黑名单'],
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#132C57'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#67ADE8'
                        }
                    }
                }],
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    },
                    axisLabel: {
                        color: '#67ADE8'
                    }
                },
                series: [{
                    tooltip: {
                        show: false
                    },
                    name: 'bg',
                    type: 'pictorialBar',
                    barWidth: '30',
                    silent: true,
                    symbol: 'rect',
                    symbolRepeat: true,
                    symbolMargin: 1,
                    symbolSize: [25, 2],
                    itemStyle: {
                        color: '#0B4B57'
                    },
                    data: [max, max, max, max]
                },{
                    type: 'pictorialBar',
                    animation: true,
                    animationDuration: max,
                    symbol: 'rect',
                    symbolRepeat: true,
                    symbolSize: [20, 2],
                    symbolMargin: 1,
                    barWidth: '30',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            },
                            label: {
                                show: false
                            }
                        }
                    },
                    data: value
                }]
            };
            this.captureChart.setOption(option);
            window.addEventListener('resize', () => {
                this.captureChart.resize();
            }, false);            
            let currentIndex = -1;
            setInterval(() => {
                var dataLen = data.length
                // 取消之前高亮的图形
                _this.captureChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.captureChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.captureChart.dispatchAction({
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
        width: 90px;
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
.captureChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);    
}
</style>