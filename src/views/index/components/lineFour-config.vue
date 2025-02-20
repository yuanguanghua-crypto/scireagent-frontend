
<template>
<div class="echart-box">
    <!-- 抓拍统计 -->
    <div class="btn-cok">
        <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
        <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
    </div>
    <div ref="lineFourChart" class="lineFourChart"></div>
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
            lineFourChart: null,
            nowFlg: true,
            allDate: [],
            timerFoChat: null
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
            // clearInterval(this.timerFoChat)
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
        handlerDatas(arr){
            const obj = {};
            arr.forEach((item, index) => {
                const { date } = item; //解构赋值
                var obs = []
                if (!obj[date]) {
                    obj[date] = {
                        date,
                        children: []
                    }
                }
                obj[date].children.push(item)
            });
            const data = Object.values(obj); // 最终输出
            return data
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
            this.lineFourChart = echarts.init(this.$refs.lineFourChart);
            var _this = this
            var allDate = this.allDate.reverse()
            var dataNowP = []
            var dataNowB = []
            var dataNowH = []
            var dataNowM = []
            var newData = this.handlerDatas(data)
            // 
            var data = newData.sort(this.dateData('date',true))
            // console.log('----',data)
            var xData = data.map(item=>item.date)
            data.forEach(v => {
                let d = v.children
                if(d.length == 4){
                    d.forEach(el => {
                        if(el.personType == "blackList"){
                            dataNowH.push(el.count)
                        }else if(el.personType == "whiteList"){
                            dataNowB.push(el.count)
                        }else if(el.personType == "publiceUser"){
                            dataNowP.push(el.count)
                        }else if(el.personType == "stranger"){
                            dataNowM.push(el.count)
                        }
                    });
                }else{
                    d.forEach(el => {
                        // console.log(el)
                        if(el.personType == "blackList"){
                            dataNowH.push(el.count)
                        }else{
                            dataNowH.push(0)
                        }
                        if(el.personType == "whiteList"){
                            dataNowB.push(el.count)
                        }else {
                            dataNowB.push(0)
                        }
                        if(el.personType == "publiceUser"){
                            dataNowP.push(el.count)
                        }else {
                            dataNowP.push(0)
                        }
                        if(el.personType == "stranger"){
                            dataNowM.push(el.count)
                        }else {
                            dataNowM.push(0)
                        }
                    });
                }
                
            });
            var option = {
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(33,56,77,1)",
                    borderColor: "rgba(33,56,77,1)",
                    textStyle: {
                        color: "#fff",
                        fontSize: 14,
                    },
                    axisPointer: {
                        lineStyle: {
                            color: "rgba(19,255,241,1)",
                            type: "dashed",
                            width: 2,
                        },
                    },
                },
                legend: {
                    top: '0%',
                    left: "6%",
                    itemWidth: 16,
                    itemHeight: 12,
                    itemGap: 5,
                    textStyle: {
                        color: "#fff",
                    },
                },
                grid: {
                    top: "17%",
                    right: "8%",
                    bottom: "5%",
                    left: "6%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    // boundaryGap: ["0", "10%"],
                    boundaryGap: false,
                    data: xData,
                    axisLabel: {
                        // interval: 0,
                        textStyle: {
                            color: "#67ADE8",
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    
                    splitLine: { 
                        show: true,
                        lineStyle: {        
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    },
                    axisTick: {
                        show: false, // 去除刻度线
                    },
                },
                yAxis: {
                    type: "value",
                    boundaryGap: ["0", "20%"],
                    axisTick: { show: false },
                    axisLine: {
                        show: false,
                    },
                    // splitNumber: 1,
                    axisLabel: {
                        textStyle: {
                            color: "#67ADE8"
                        },
                    },
                    // y轴分割线的颜色
                    splitLine: {
                        show: true,
                        lineStyle: {        
                            color: 'rgba(83, 125, 170, 0.2)',
                            width: 1,
                            type: "dashed" //dotted：虚线 solid:实线
                        }
                    },
                },
                series: [{
                    name: "普通人",
                    smooth: true,
                    type: "line",
                    // 填充颜色设置
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0,0,0,1,
                            [{offset: 0,color: "rgba(19,255,241,.4)"},
                            {offset: 0.9,color: "rgba(19,255,241,0)"}],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)",
                    },
                    // 开始不显示拐点， 鼠标经过显示
                    showSymbol: false,
                    symbolSize: 8,
                    // 设置拐点颜色以及边框
                    itemStyle: {
                    color: "rgba(19,255,241,1)",
                    },
                    data: dataNowP,
                },{
                    name: "白名单",
                    smooth: true,
                    type: "line",
                    // 填充颜色设置
                    areaStyle: {
                    color: new echarts.graphic.LinearGradient(0,0,0,1,
                        [
                            {offset: 0,color: "rgba(241,162,42,.4)"},
                            {offset: 0.9,color: "rgba(241,162,42,0)"}
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    },
                    // 开始不显示拐点， 鼠标经过显示
                    showSymbol: false,
                    symbolSize: 4,
                    // 设置拐点颜色以及边框
                    itemStyle: {
                    color: "rgba(241,162,42,1)",
                    },
                    data: dataNowB
                },{
                    name: "黑名单",
                    smooth: true,
                    type: "line",
                    // 填充颜色设置
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0,0,0,1,
                            [
                                {offset: 0,color: "rgba(0,133,255,.4)"},
                                {offset: 0.9,color: "rgba(0,133,255,0)"},
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)",
                    },
                    // 开始不显示拐点， 鼠标经过显示
                    showSymbol: false,
                    symbolSize: 4,
                    // 设置拐点颜色以及边框
                    itemStyle: {
                        color: "rgba(0,133,255,1)",
                    },
                    data: dataNowH,
                },{
                    name: "陌生人",
                    smooth: true,
                    type: "line",
                    // 填充颜色设置
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0,0,0,1,
                            [
                                {offset: 0,color: "rgba(241,162,42, 0.4)"},
                                {offset: 0.9,color: "rgba(241,162,42, 0)"},
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)",
                    },
                    // 开始不显示拐点， 鼠标经过显示
                    showSymbol: false,
                    symbolSize: 4,
                    // 设置拐点颜色以及边框
                    itemStyle: {
                        color: "rgba(240, 72, 100, 1)",
                    },
                    data: dataNowM,
                }]
            };
            this.lineFourChart.setOption(option);
            window.addEventListener('resize', () => {
                this.lineFourChart.resize();
            }, false);
            // let currentIndex = -1;
            // this.timerFoChat = setInterval(() => {
            //     const dataLen = xData.length;
            //     // 取消之前高亮的图形
            //     _this.lineFourChart.dispatchAction({
            //         type: "downplay",
            //         seriesIndex: [0,1,2,3],
            //         dataIndex: currentIndex,
            //     });
            //     currentIndex = (currentIndex + 1) % dataLen;
            //     // 高亮当前图形
            //     _this.lineFourChart.dispatchAction({
            //         type: "highlight",
            //         seriesIndex: [0,1,2,3],
            //         dataIndex: currentIndex,
            //     });
            // }, 1000);
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
.lineFourChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>