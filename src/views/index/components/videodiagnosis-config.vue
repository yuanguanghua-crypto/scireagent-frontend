
<template>
<div class="echart-box">
    <!-- 视频质量诊断 -->
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
        </el-col>
    </el-row>
    <div ref="diagnosisChart" class="diagnosisChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import * as mUtils from '@/utils/mUtils';
import { videoDiagnoseCircle } from '@/api/v3/largeScreen/set.js';

export default {
    name: 'echartBar',
    data() {
        return {
            diagnosisChart: null,
            option: {},
            nowFlg: true
        };
    },
    watch: {
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
            videoDiagnoseCircle(params).then(res =>{
                if(res.code == 1000){
                    console.log(res.data)
                    this.barCategoryGap(res.data)
                }
            })
        },

        barCategoryGap(data){
            this.diagnosisChart = echarts.init(this.$refs.diagnosisChart);
            let ck_seriesData = [
                { name: '机构A', value: 10 },
                { name: '机构B', value: 42 },
                { name: '机构C', value: 50 },
                { name: '机构D', value: 60 },
                { name: '机构E', value: 30 },
                { name: '机构F', value: 50 },
            ];
            this.option = {
                backgroundColor: "#012d65",
                color: [
                    '#2FD402',
                    '#FDB900',
                    '#FDB900',
                    '#15B5A8',
                    '#9A30EB',
                    '#22c4ff',
                    '#1ee7d4',
                    '#ffb743',
                    '#ff7943',
                    '#ffe0ab',
                    '#6bc5f4',
                    '#c08ef2',
                    '#ffda49'
                ],
                tooltip: {
                    transitionDuration: 0,
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    orient: 'vertical',
                    top: 'center',
                    right: '10%',
                    icon: 'rect',
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: '#fff'
                    },
                    data: ck_seriesData,
                    formatter: function (name) {
                        var data = ck_seriesData
                        var total = 0
                        var tarValue
                        for (var i = 0; i < data.length; i++) {
                            total += data[i].value
                            if (data[i].name === name) {
                            tarValue = data[i].value
                            }
                        }
                        //var p = ((tarValue / total) * 100).toFixed(2)
                        //${tarValue}%
                        return `${name}`
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['45%', '70%'],
                        // 饼图位置参数
                        center: ['50%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            // 设置不生效
                            borderRadius: 10,
                            borderWidth: 5
                        },
                        label: {
                            show: false,
                            position: 'center',
                            formatter: '{b_style|{b}}\n{c_style|{c}%}',//'{b_style|{b}}\n{c_style|{c}%}\n{b_style|{d}%}',
                            rich: {
                            b_style: {
                                fontSize: 28
                            },
                            c_style: {
                                color: '#fff',
                                fontSize: 32,
                                padding: [5, 0, 5, 0]
                            }
                            }
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'normal'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: ck_seriesData
                    }
                ]
            };
            
            
            this.diagnosisChart.setOption(this.option);
            this.handleChartLoop(this.option,this.diagnosisChart)
            window.addEventListener('resize', () => {
                this.diagnosisChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
        },
        // 饼图自动轮播
        handleChartLoop(option,myChart) {
            if (!myChart) {
                return
            }
            let currentIndex = -1 // 当前高亮图形在饼图数据中的下标
            let changePieInterval = setInterval(selectPie, 1000) // 设置自动切换高亮图形的定时器

            // 取消所有高亮并高亮当前图形
            function highlightPie() {
                // 遍历饼图数据，取消所有图形的高亮效果
                for (var idx in option.series[0].data) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: idx
                    })
                }
                // 高亮当前图形
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                })
            }

            // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
            myChart.on('mouseover', (params) => {
                clearInterval(changePieInterval)
                currentIndex = params.dataIndex
                highlightPie()
            })

            // 用户鼠标移出时，重新开始自动切换
            myChart.on('mouseout', (params) => {
                if (changePieInterval) {
                    clearInterval(changePieInterval)
                }
                changePieInterval = setInterval(selectPie, 1000)
            })

            // 高亮效果切换到下一个图形
            function selectPie() {
                var dataLen = option.series[0].data.length
                currentIndex = (currentIndex + 1) % dataLen
                highlightPie()
            }
        }



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
.diagnosisChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>