
<template>
<div class="echart-box">
    <!-- 设备分类统计 -->
    <div ref="ntgrChart" class="ntgrChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { deviceCategory } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            ntgrChart: null,
            timer: null,
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initData()
    },
    beforeDestroy() {
        clearInterval();
    },
    methods: {
        initData(){
            deviceCategory().then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        barCategoryGap(val){
            this.ntgrChart = echarts.init(this.$refs.ntgrChart);
            let arr = []
            val.forEach((el)=>{
                arr.push({
                    name: el.typeDesc,
                    value: el.totalOnlineDevice + el.totalOfflineDevice
                })
            })
            let data = arr
            var option = {
                color: ['#1890FF', '#0AE1EA', '#6A4DFC', '#FACC14','#D141D9','#9AE65C','#4CE570','#FF4D4F'],
                tooltip: {
                    trigger: 'item',
                    textStyle: {
                        fontSize: 12,
                    },
                    formatter: (params) => {
                        var total = 0;
                        var tarValue;
                        for (var i = 0; i < data.length; i++) {
                            total += Number(data[i].value);
                            if (data[i].name == params.name) {
                                tarValue = data[i].value
                            }
                        }
                        var v = tarValue;
                        // var p = Math.round(((v / total) * 100));  
                        var p = 0
                        if (total == 0) {
                            p = 0;
                        }else{
                            p = Math.round(((v / total) * 100));
                        }                      
                        return '类型：' + params.name  + '<br />' + '占比：' + p + '%';
                    },
                },
                grid: {
                    top: "0%",
                    left: "10%",
                    right: "5%",
                    bottom: "0%",
                    containLabel: true,
                },
                legend: {
                    data: data,
                    orient: 'vertical',
                    right: '5%',
                    top: 'center',
                    itemWidth: 12,
                    itemHeight: 6,
                    itemGap: 10,
                    textStyle:{
                        rich: {
                            a: {
                                width: 90,
                                color:'rgba(255,255,255,0.7)',
                                align: 'left' //文字居中显示       
                            },
                            c:{
                                width: 60,
                                align: 'right',
                                color:'rgba(255,255,255,0.8)'
                            }
                        }
                    },
                    formatter: function(name) {
                        var total = 0;
                        var tarValue;
                        for (var i = 0; i < data.length; i++) {
                            total += Number(data[i].value);
                            if (data[i].name == name) {
                                tarValue = data[i].value;
                            }
                        }
                        var v = tarValue;
                        var p = Math.round(((v / total) * 100));
                        return `{a|${name}}   {c|${v} 个}`;
                    },
                },
                series: [{
                    name: ' ',
                    type: 'pie',
                    clockwise: false,
                    startAngle: 90,
                    radius: '80%',
                    center: ['25%', '53%'],
                    hoverAnimation: true,
                    roseType: false, //area 、radius
                    data: data,
                    itemStyle: {
                        normal: {
                            borderColor: '#273454',
                            borderWidth: '0'
                        },
                    },
                    label: {
                        normal: {
                            show: true, 
                            position: 'inside', 
                            formatter: '{d}%',
                            formatter: function(data){
                                if(data.percent == 0){
                                    return ''
                                }else{
                                    return data.percent.toFixed(0)+"%";
                                }
                            },
                            textStyle : { 
                                align : 'center',
                                color: '#fff',
                                baseline : 'middle',
                                fontSize : 12,
                                fontWeight : 'bolder'
                            }
                        },
                    },
                }],
            }     
            this.ntgrChart.setOption(option);
            window.addEventListener('resize', () => {
                this.ntgrChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
            let _this = this
            let lastIndex = 0;
            let currentIndex = 0;
            setInterval(() => {
                _this.ntgrChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: lastIndex,
                });
                _this.ntgrChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // _this.ntgrChart.dispatchAction({
                //     type: 'showTip',
                //     seriesIndex: 0,
                //     dataIndex: currentIndex,
                // });
                lastIndex = currentIndex;
                ++currentIndex;
                if(currentIndex > data.length) {
                    currentIndex = 0;
                }
            }, 1000)
        },
    }
}
</script>
<style lang="less" scoped>
.ntgrChart{
    width: 100%;
    // height: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>