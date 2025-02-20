
<template>
<div class="echart-box">
    <!-- 录像统计 -->
    <div ref="videoChart" class="videoChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { videoStatistics } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            videoChart: null,
            option: {}
        };
    },
    watch: {
    },
    mounted() {
        this.initData();
    },
    beforeDestroy() {
    
    },
    methods: {
        initData(){
            videoStatistics().then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        barCategoryGap(data){
            this.videoChart = echarts.init(this.$refs.videoChart);
            let seriesData = [
                { name: '录像台数', value: data.openPlanChannel},
                { name: '未录像台数', value:  data.downPlanChannel }
            ];
            this.option = {
                color: ['rgba(2, 127, 255, 1)','rgba(10, 225, 234, 1)'],
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(33,56,77,1)",
                    borderColor: "rgba(33,56,77,1)",
                    textStyle: {
                        color: "#FFD32D",
                        fontSize: 14,
                    },
                    axisPointer: {
                        lineStyle: {
                            color: 'rgba(242, 252, 253, 0.84)',
                            fontSize: 12,
                            fontFamily: 'SourceHanSansCN',
                        },
                    },
                },
                legend: {
                    show: true,
                    orient: 'vertical',
                    top: 'center',
                    right: '5%',
                    icon: 'rect',
                    itemWidth: 12,
                    itemHeight: 6,
                    itemGap: 30,
                    textStyle: {
                        color: 'rgba(255,255,255,0.8)',
                        rich: {
                            a: {
                                width: 60,
                                color: 'rgba(255,255,255,0.8)',
                                align: 'left' //文字居中显示       
                            },
                            b: {
                                width: 60,
                                color:'rgba(255,255,255,0.8)',
                                align: 'right'
                            },
                            c:{
                                width: 30,
                                align: 'right',
                                color:'#03C8D7'
                            }
                        }
                    },
                    data: seriesData,
                    formatter: (name) => {
                        var data = seriesData
                        var total = 0;
                        var tarValue;
                        for (var i = 0; i < data.length; i++) {
                            total += Number(data[i].value);
                            if (data[i].name == name) {
                                tarValue = data[i].value;
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
                        return `{a|${name}} {b|${v}个} 占比 {c|${p}%}`;
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['65%', '75%'],
                        // 饼图位置参数
                        center: ['24%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                            rich: {
                                as: {
                                    color: '#FFD32D',
                                    fontSize: 14,
                                    fontFamily: 'SourceHanSansCN',
                                },
                                bs: {
                                    color: 'rgba(242, 252, 253, 0.84)',
                                    fontSize: 12,
                                    fontFamily: 'SourceHanSansCN',
                                }
                            },
                            formatter: function(data){
                                return `{as|${data.name}}\n\n{bs|${data.percent.toFixed(0)}%}`
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
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: true,
                                length: 15,
                                length2: 20,
                                position: 'inner', // 指引线起点位置，inner、outer、start、middle、end
                            }
                        },
                        labelLayout: {
                            verticalAlign: "top",
                            dy: -20,
                        },
                        data: seriesData
                    }
                ]
            };
            this.videoChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.videoChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
            
            let currentIndex = -1
            let _this = this
            setInterval(() => {
                const dataLen = seriesData.length;
                // 取消之前高亮的图形
                _this.videoChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.videoChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                _this.videoChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
            }, 1000);
        },
    }
}
</script>
<style lang="less" scoped>
.videoChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>