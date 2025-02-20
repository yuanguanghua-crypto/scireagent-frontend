
<template>
<div class="echart-box">
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
        </el-col>
    </el-row>
    <!-- 事件统计分析 -->
    <div ref="panelChart" class="panelChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import * as mUtils from '@/utils/mUtils';
import { eventAnalysis } from '@/api/v3/largeScreen/set.js';
import {findDictItem} from '@/api/v3/base_data/wordbook.js';
export default {
    name: 'echartBar',
    data() {
        return {
            panelChart: null,
            nowFlg: true,
            personTypelist: []
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.getDicty();
    },
    beforeDestroy() {
    
    },
    methods: {
        // 字典数据
        async getDicty() {
            // 人员类别
            let _pdata = await findDictItem({code: 'eventType'})
            this.personTypelist = [..._pdata.data]
            this.initData(6);
        },
        changeDte(inx){
            if(inx == 30){
                this.nowFlg = false
                // mUtils.getAIData(29);
                this.initData(inx);
            }else{
                this.nowFlg = true
                this.initData(inx);
                // mUtils.getAIData(6);
            }
        },
        initData(numb){
            let tDate = mUtils.getAIData(numb);
            let params = {
                startDate: tDate[0],
                endDate: tDate[1]
            }
            eventAnalysis(params).then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        getDeName(val){
            var name = '--'
            if(val){
                name = this.personTypelist.filter(item => item.code == val)[0].name
            }
            return name
        },
        
        // 生成渐变色
        genLinearGradient(colors) {
            const color = {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                {
                    offset: 0,
                    color: colors[0] // 0%处的颜色
                },
                {
                    offset: 1,
                    color: colors[1] // 100%处的颜色
                }
                ],
                global: false
            }
            return color
        },

        barCategoryGap(data){
            this.panelChart = echarts.init(this.$refs.panelChart);
            var basicColors = [
                ['#ABDCFF', '#0396FF'],
                ['#90F7EC', '#32CCBC'],
                ['#FFF6B7', '#F6416C'],
                ['#E2B0FF', '#9F44D3'],
                ['#43CBFF', '#9870CC'],
                ['#FCCF31', '#F55555'],
                ['#F761A1', '#8C1BAB'],
                ['#81FBB8', '#28C76F']
            ]
            var currentIndex = -1
            var _this = this
            // var data = obj.slice(0,3)
            var maxNum = data.length > 0 ? Math.max.apply(Math, data.map(function(item) { return item.handleNum })) : 0 
            var alarmName = []
            var alarmNum = []
            var handleNum = []
            var noHandleNum = []
            data.forEach((el,index)=>{
                alarmName.push(el.alarmName),
                alarmNum.push(el.alarmNum),
                handleNum.push(el.handleNum),
                noHandleNum.push(el.noHandleNum)
            })
            var color = ['#1890FF','#0AE1EA','#FACC14','#6A4DFC']
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    top: '15%',
                    bottom: '0%',
                    right: '5%',
                    containLabel: true
                },
                legend: { 
                    // left: 10,
                    top: 0,
                    right: 20,
                    textStyle: {
                    color: '#fff'
                    },
                    itemWidth: 12,
                    itemHeight: 10,
                    // itemGap: 35
                },
                xAxis: {
                    type: 'category',
                    data: alarmName,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#BDD8FB',
                            width: 1 // 这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                        textStyle: {
                            color: '#67ADE8'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    max: maxNum,
                    axisLine: {
                    show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#114482'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#67ADE8'
                        }
                    }
                },
                series: [{
                    name: '告警数',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                    normal: {
                        color: _this.genLinearGradient(basicColors[6]),
                        barBorderRadius: 12
                    }
                    },
                    data: alarmNum
                },{
                    name: '已处理',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                    normal: {
                    color: _this.genLinearGradient(basicColors[1]),
                        barBorderRadius: 11
                    }

                    },
                    data: handleNum
                },
                {
                    name: '待处理',
                    type: 'bar',
                    barWidth: '15%',
                    itemStyle: {
                    normal: {
                    color: _this.genLinearGradient(basicColors[2]),
                        barBorderRadius: 11
                    }
                    },
                    data: noHandleNum
                }]
            };
            this.panelChart.setOption(option);
            window.addEventListener('resize', () => {
                this.panelChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
            setInterval(() => {
                var dataLen = alarmName.length;
                // 取消之前高亮的图形
                _this.panelChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.panelChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.panelChart.dispatchAction({
                //     type: 'showTip',
                //     seriesIndex: 0,
                //     dataIndex: currentIndex
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
.panelChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>