
<template>
<div class="echart-box">
    <!-- 事件处理统计 -->
    <div class="btn-cok">
        <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
        <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
    </div>
    <div ref="lineDouChart" class="lineDouChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { eventHandleLine } from '@/api/v3/largeScreen/set.js';
import * as mUtils from '@/utils/mUtils';

export default {
    name: 'echartBar',
    data() {
        return {
            lineDouChart: null,
            nowFlg: true,
            allDate: [],
            interval: 1,
            timer: null
        };
    },
    watch: {},
    mounted() {
        this.initData(6);
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        setInter(numb){
            let currentIndex = -1;
            let _this = this
            this.timer = setInterval(() => {
                const dataLen = numb;
                // 取消之前高亮的图形
                _this.lineDouChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.lineDouChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.lineDouChart.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: currentIndex,
                // });
            }, 1000);
        },
        changeDte(inx){            
            clearInterval(this.timer)
            if(inx == 30){
                this.nowFlg = false
                this.initData(inx);
                this.interval = 4
            }else{
                this.nowFlg = true
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
                    let arr = res.data.sort(this.dateData('date',true))
                    this.barCategoryGap(numb,arr)
                    this.setInter(res.data.length);
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
        barCategoryGap(numb,data){
            this.lineDouChart = echarts.init(this.$refs.lineDouChart);
            var color = ['#1890FF','#0AE1EA','#FACC14','#6A4DFC'],
                alarmNum = [],
                handleNum = [],
                // xData = this.allDate.reverse(),
                xData = [],
                arr = [],
                name = []
            // xData.forEach((its,inx)=>{
            //     if(data[inx] && its.includes(data[inx].date)){
            //         alarmNum.push(item.alarmNum)
            //         handleNum.push(item.handleNum + item.noHandleNum)
            //     }else{
            //         alarmNum.push('0')
            //         handleNum.push('0')
            //     }
            // })
            data.forEach(v => {
                alarmNum.push(v.alarmNum)
                handleNum.push(v.handleNum)
                let dt = v.date.slice(v.date.indexOf('-')+1,v.date.length)
                xData.push(dt)
            });
            // console.log(data)
            // console.log(alarmNum)
            // console.log(handleNum)            
            let obj = {
                xData: xData,
                legend: ['告警发生数量', '事件处理数量'],
                // legend: {       //对图形的解释部分
                //     orient: 'vertical',
                //     right: 10,
                //     y: 'center'
                // },
                lineData: [
                    {
                        name: '告警发生数量',
                        data: alarmNum,
                        color: '#1984ff',
                    },
                    {
                        name: '事件处理数量',
                        data: handleNum,
                        color: '#e7f90d',
                    },
                ]
            }
            let serData = []
            obj.lineData.forEach(item => {
                serData.push({
                    name: item.name,
                    type: "line",
                    showSymbol: true,
                    symbolSize: 8,
                    symbol: "circle",
                    lineStyle: {
                        color: item.color,
                    },
                    itemStyle: {
                        color: "#67ADE8",
                        borderColor: item.color,
                        borderWidth: 2,
                    },
                    data: item.data,
                })
            })

            var option = {
                // title: {
                //     text: '教师数量趋势',
                //     top: "1%",
                //     textAlign: "left",
                //     left: "1%",
                //     textStyle: {
                //         color: "#38adb9",
                //         fontSize: 18,
                //         fontWeight: "600",
                //     },
                // },
                grid: {
                    top: "20%",
                    left: "4%",
                    right: "5%",
                    bottom: "5%",
                    containLabel: true,
                },
                legend: {
                    icon: 'circle',
                    top: '2%',
                    //   left: 'center',
                    orient: 'horizontal', //图例方向【horizontal/vertical】
                    itemHeight: 10, //修改icon图形大小
                    itemWidth: 10, //修改icon图形大小
                    selectedMode: false, //不允许点击图例
                    itemGap: 50,
                    textStyle: {
                        fontSize: 12,
                        color: '#fff',
                        padding: [0, 8],
                    },
                    data: obj.legend,
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    backgroundColor: "#0a2b45", // 设置背景颜色
                    textStyle: {
                        color: '#333',
                        color: '#fff',
                        fontSize: 14,
                    },
                    borderColor: "rgba(255, 255, 255, .16)",
                    axisPointer: {
                        lineStyle: {
                            color: "rgba(28, 124, 196)",
                        },
                    },

                    formatter: (params) => {
                        let arr = [...params];
                        let str = '';
                        arr.forEach((item, index) => {
                            str += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                            obj.lineData[index].color +
                            ';"></span>' + item.seriesName + '  ' + item.data + '个<br />';
                        });
                        str = arr[0].name + '<br />' + str;
                        return str;
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#67ADE8",
                            },
                        },
                        axisLabel: {
                            interval: this.interval,
                            align: "center",
                            margin: 10,
                            color: "#67ADE8",
                            rotate: 0,
                            textStyle: {
                                fontSize: 14,
                            },
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        boundaryGap: true,
                        data: obj.xData,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        // name: "单位：个",
                        nameTextStyle: {
                            //y轴上方单位的颜色
                            color: "rgb(139, 143, 147)",
                        },
                        // splitNumber: 6,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#81b0d0",
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(221, 228, 241,.3)",
                                type: "dashed",
                            },
                        },
                        axisLabel: {
                            color: "#67ADE8",
                            textStyle: {
                                fontSize: 14,
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: serData,
            };
            this.lineDouChart.setOption(option);
            window.addEventListener('resize', () => {
                this.lineDouChart.resize();
            }, false);
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
.lineDouChart{
    width: 100%;
    height: calc((100vh / 4 ) - 55px);
}
</style>