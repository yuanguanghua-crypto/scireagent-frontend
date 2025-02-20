
<template>
<div class="echart-box">
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
        </el-col>
    </el-row>
    <div ref="lineCrosChart" class="lineCrosChart"></div>
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
            lineCrosChart: null,
            nowFlg: true,
            personTypelist: []
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        // this.barCategoryGap()
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
        barCategoryGap(obj){
            this.lineCrosChart = echarts.init(this.$refs.lineCrosChart);
            var demoArry = []
            var _this = this
            var data = obj
            var handleNum = []
            var name = []
            var noHandleNum = []
            var maxNum = data.length > 0 ? Math.max.apply(Math, data.map(function(item) { return item.alarmNum })) : 0 
            data.forEach((el,index)=>{
                demoArry.push({
                    name: el.alarmName,
                    alarmNum: el.alarmNum,
                    handleNum: el.handleNum,
                    noHandleNum: el.noHandleNum
                })
                name.push(el.alarmName)
                handleNum.push(el.handleNum)
                noHandleNum.push(el.noHandleNum)
            })
            var option = {
                title: {
                    show: false
                },
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
                    formatter: function(param) {
                        // console.log(param);
                        var relVal = "";
                        relVal = param[0].name + "<br/>";
                        relVal += param[0].seriesName + "：" + param[0].value + "<br/>";
                        relVal += param[1].seriesName + "：" + param[1].value;
                        return relVal;
                    }
                },
                legend: {
                    itemWidth: 20, //小圆点宽度
                    itemHeight: 7, // 小圆点高度
                    itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
                    textStyle: {
                        fontSize: 14,
                        color: '#fff',
                    },
                    data: ['已处理','未处理']
                },
                grid: { //设置网格属性
                    top: '15%',
                    bottom: '30%',
                    left: '15%', //网格距离容器左侧的距离
                    right: '5%', //网格距离容器右侧的距离
                    borderWidth: 1,
                    containLabel: false
                },
                xAxis: [{
                    type: 'category',
                    data: name,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(255,255,255,1)'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 35,
                        margin: 10,
                        color: '#67ADE8',
                    },
                    axisTick:{
                        show: false //坐标轴小标记
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '',
                    nameTextStyle:{
                        color:'#93d3fc',
                        fontSize: 10,
                        align: 'right'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#67ADE8',
                        },
                        interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
                        margin: 10,
                        //formatter: '{value}'
                    },
                    splitNumber: 5, //y轴刻度设置(值越大刻度越小)
                    axisLine:{ //y轴线
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(15,45,134,.6)', //横向网格线颜色
                            width: 1
                        }
                    },
                    axisTick:{
                        show: false //坐标轴小标记
                    }
                }],
                series: [
                    {
                        name: '未处理',
                        type: 'bar',
                        barWidth: '4px',
                        nameTextStyle: {
                            width: 20,
                            fontSize: 14,
                            borderColor: '#51bbfe',
                            borderWidth: 1,
                            backgroundColor: '#022453',
                            color: '#fff',
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#01FFFF'
                                }, {
                                    offset: 1,
                                    color: '#027FFF'
                                }])
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'left',
                                formatter: '{c}',
                                textStyle: {
                                    color: '#01FDFF',
                                    fontSize: 12
                                }
                            }
                        },
                        barGap: 1,
                        data: noHandleNum 
                    },
                    {
                        name: '已处理',
                        type: 'bar',
                        barWidth:'4px',
                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#48A2FD'
                                }, {
                                    offset: 1,
                                    color: '#FFA800'
                                }])
                            },
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                formatter: '{c}',
                                textStyle: {
                                    color: '#01FDFF',
                                    fontSize: 12
                                }
                            }
                        },
                        barGap: 1,
                        data: handleNum
                    }
                ]
            };
            this.lineCrosChart.setOption(option);
            window.addEventListener('resize', () => {
                this.lineCrosChart.resize();
            }, false);
            let currentIndex = -1;
            setInterval(() => {
                const dataLen = name.length;
                // 取消之前高亮的图形
                _this.lineCrosChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.lineCrosChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.lineCrosChart.dispatchAction({
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
.lineCrosChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>