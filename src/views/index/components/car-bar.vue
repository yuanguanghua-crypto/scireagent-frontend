
<template>
<div class="echart-box">
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(7)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(15)" :class="{currt:!nowFlg}">15天</span>
        </el-col>
    </el-row>
    <!-- 人员类型统计 -->
    <div ref="columnChart" class="columnChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { carRecordRank } from '@/api/v3/largeScreen/set.js';
import { querywordbook } from '@/api/v3/common.js';
export default {
    name: 'echartBar',
    data() {
        return {
            columnChart: null,
            nowFlg: true,
            option: {}
        };
    },
    watch: {},
    mounted() {
        this.getWordbook();
    },
    beforeDestroy() {},
    methods: {
        changeDte(inx){
            if(inx == 15){
                this.nowFlg = false
                this.initData(inx);
            }else{
                this.nowFlg = true
                this.initData(inx);
            }
        },
        initData(numb){
            let params = {
                interval: numb
            }
            carRecordRank(params).then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        async getWordbook() {
            let car_category = await querywordbook({ code: 'car_category' });            
            this.categoryArr = car_category.data || []
            this.initData(7)               
        },
        getName(val){
            let name = '陌生车辆';
            this.categoryArr.filter(item => {
                if (item.code == val) {
                    name = item.name;
                }
            });
            return name;
        },
        barCategoryGap(data){
            this.columnChart = echarts.init(this.$refs.columnChart);
            // let name = ['普通车辆','黑名单车辆','白名单车辆','陌生车辆']
            let name = []
            let color = [
                {
                    x: 0, y: 0, x2: 0, y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {offset: 0, color: 'rgba(2,127,255, 1)'}, // 0% 处的颜色'#027fff'
                        {offset: 1, color: 'rgba(2,127,255, 0.2)'}  // 100% 处的颜色
                    ],
                },
                {
                    x: 0, y: 0, x2: 0, y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [ 
                        {offset: 0, color: 'rgba(10,225,234, 1)'}, // 0% 处的颜色#0AE1EA
                        {offset: 1, color: 'rgba(10,225,234, 0.2)'}  // 100% 处的颜色
                    ],
                },
                {
                    x: 0, y: 0, x2: 0, y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {offset: 0, color: 'rgba(250,204,20, 1)'}, // 0% 处的颜色#FACC14
                        {offset: 1, color: 'rgba(250,204,20, 0.2)'}  // 100% 处的颜色
                    ],
                },{
                    x: 0, y: 0, x2: 0, y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {offset: 0, color: 'rgba(106,77,252, 1)'}, // 0% 处的颜色'#6A4DFC'
                        {offset: 1, color: 'rgba(106,77,252, 0.2)'}  // 100% 处的颜色
                    ],
                },
                // '#5E37FB','#178DFA','#D13C6A','#A2B6DC'
            ]
            let newData = []
            data.forEach((el,index)=>{
                name.push(this.getName(el.category))
                newData.push({value: el.count,itemStyle: {color: color[index]}})
            })
            let seriesData = [...newData].sort((a, b) => b.value - a.value);
            var option = {
                legend: {
                    // 显示图例
                    show: true,
                    // 图例的位置
                    top: 'bottom',
                    // 图例布局方式，可选值有：'horizontal'和'vertical'
                    orient: 'horizontal',
                    // 图例标记的图形大小
                    icon: 'circle',
                    // 图例文本样式
                    textStyle: {
                        color: 'red',
                        fontSize: 16
                    },
                    // 图例的数据数组
                    data: name
                },
                grid: {
                    top: '15%',
                    right: '5%',
                    bottom: '15%',
                    left: '15%',
                },
                tooltip: {
                    show: true,
                    backgroundColor: "rgba(0, 0, 0,.8)",
                    textStyle: {
                        color: "#fff",
                    },
                },
                title: [{
                    subtext: "单位：辆",
                    left: 8, // 距离左边位置
                    top: -8, // 距离上面位置
                    subtextStyle: {
                        // 设置二级标题的样式
                        color: "#fff",
                    },
                }],
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
                    data: name ,
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
                            type: 'dashed',
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            type: 'dashed',
                        },
                        show: false,
                    },
                },
                series: 
                [{
                    data: seriesData,
                    type: 'bar',
                    barMaxWidth: 'auto',
                    barWidth: 25
                }],
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
.columnChart{
    width: 100%;
    height: calc((100vh / 4) - 45px); 
}
</style>