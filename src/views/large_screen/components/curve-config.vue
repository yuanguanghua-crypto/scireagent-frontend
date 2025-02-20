
<template>
<div class="echart-box">    
    <!-- 事件处理统计 -->
    <div class="btn-cok">
        <span @click="changeDte(6)" :class="{currt:!nowFlg}">近7天</span>
        <span @click="changeDte(30)" :class="{currt:nowFlg}">30天</span>
    </div>
    <div ref="lineChart" class="lineChart"></div>
    <el-row class="top">
        <el-col :span="12">
           <div class="bg_item">待处理：<span class="top-item">{{noHandleNum}}</span>个</div> 
        </el-col>
        <el-col :span="12">
            <div class="bg_item">已处理：<span class="top-items">{{handleNum}}</span>个</div> 
        </el-col>
    </el-row>
</div>
</template>
<script>

var app = {
    currentIndex: -1,
};
import * as echarts from 'echarts';
import { eventHandleLine } from '@/api/v3/largeScreen/set.js';
import * as mUtils from '@/utils/mUtils';
export default {
    name: 'echartBar',
    data() {
        return {
            lineChart: null,
            option: {},            
            allDate: [],
            playVal: '95.24%',
            overVal: null,
            noHandleNum: null,
            handleNum: null,
            nowFlg: true,
            interval: 5
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initData(30); 
    },
    beforeDestroy() {},
    methods: {
        changeDte(inx){
            if(inx == 30){
                this.nowFlg = true
                this.initData(inx);
                this.interval = 5
            }else{
                this.nowFlg = false
                this.initData(inx);
                this.interval = 1
            }
        },
        initData(numb){
            let tDate = mUtils.getAIData(numb);
            this.allDate = mUtils.getAllData(numb);
            let params = {
                startDate: tDate[0],
                endDate: tDate[1]
            }
            eventHandleLine(params).then(res =>{
                if(res.code == 1000){
                    let data = res.data
                    let _this = this
                    let alarmNum = 0
                    let handleNum = 0
                    let noHandleNum = 0
                    data.forEach((its,inx)=>{   
                        // console.log(its)                    
                        alarmNum += its.alarmNum
                        handleNum += +its.handleNum
                        noHandleNum += +its.noHandleNum                    
                    })
                    if(handleNum > 0){                        
                        this.overVal = ((1-(alarmNum - noHandleNum) / alarmNum) *100).toFixed(2) + '%'
                    }else{                        
                        this.overVal = '0%'
                    }
                    this.alarmNum = alarmNum
                    this.handleNum = handleNum
                    this.noHandleNum = noHandleNum
                    let arr = data.sort(this.dateData('date',true))
                    // console.log(handleNum,nohandleNum)
                    // data.reverse()
                    this.barCategoryGap(arr)
                }
            })
        },
        dateData(property, bol) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                if (bol) {
                    // 升序
                    return Date.parse(value1) - Date.parse(value2);
                } else {
                    // 降序
                    return Date.parse(value2) - Date.parse(value1)
                }
            }
        },
        barCategoryGap(data){
            this.lineChart = echarts.init(this.$refs.lineChart);
            var color = ['#1890FF','#0AE1EA','#FACC14','#6A4DFC']               
            this.option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                grid: {
                    left: '13%',
                    top: '15',
                    right: '5%',
                    bottom: '30%',
                    x: 35,
                    y: 25,
                    x2: 8,
                    y2: 25,
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            show: false,
                            color: '#114482'
                        }
                    },
                    axisLabel: {
                        interval: this.interval,
                        rotate: 45,
                        textStyle: {
                            color: '#67ADE8'
                        },
                    },
                    data: (function(data){
                        var arr=[];
                        data.forEach(function(items){
                            let dt = items.date.slice(items.date.indexOf('-')+1,items.date.length)     
                            arr.push(dt);   //name
                        });
                        return arr;
                    })(data)
                }],
                yAxis: [{
                    type: 'value',
                    // name:'m³',
                    axisTick: {
                        // show: true
                    },
                    nameTextStyle: {
                        color: "#ccc"
                    },
                    axisLine: {
                        lineStyle: {
                            show: false,
                            color: '#114482'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14,
                            color: '#67ADE8',
                        },
                    
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#114482'
                        }
                    },
                }],
                series: [{
                    name: '未处理',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(137, 189, 27, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(137, 189, 27, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#24FEE6'
                        }
                    },
                    data: (function(data){
                        var arr=[];
                        data.forEach(function(items){
                            arr.push(items.noHandleNum);   //name
                        });
                        return arr;
                    })(data)
                }]
            };
            this.lineChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.lineChart.resize();
            }, false);
            let _this = this
            setInterval(() => {
                var dataLen = _this.option.series[0].data.length;
                // 取消之前高亮的图形
                _this.lineChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: app.currentIndex
                });
                app.currentIndex = (app.currentIndex + 1) % dataLen;
                //console.log(app.currentIndex);
                // 高亮当前图形
                _this.lineChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: app.currentIndex,
                });
                // 显示 tooltip
                // _this.lineChart.dispatchAction({
                //     type: 'showTip',
                //     seriesIndex: 0,
                //     dataIndex: app.currentIndex
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
.lineChart{
    width: 100%;
    height: calc((100vh / 4 ) - 78px);
}
.top{
    text-align: center;
    font-size:14px;
    .top-item{
        font-size: 20px;
        color: rgba(24, 144, 255, 1);
    }
    .top-items{ 
        font-size: 20px;
        color: rgba(10, 225, 234, 1);
    }

    .bg_item{
        padding:7px 0;
        width: 70%;
        margin: 0 auto;
        background-color: rgba(24, 144, 255,0.3)
    }
}
</style>