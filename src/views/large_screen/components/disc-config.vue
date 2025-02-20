
<template>
<div class="echart-box">
    <!-- 人员类型统计 -->
    <div ref="discChart" class="discChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { personType } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            discChart: null,
            option: {},
            timer: null
        };
    },
    watch: {
    },
    mounted() {
        this.initData();
        this.setInt();
        
        
    },
    beforeDestroy() {},
    methods: {
        initData(){
            personType().then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        barCategoryGap(data){
            this.discChart = echarts.init(this.$refs.discChart);
            let seriesData = []
            data.forEach((el)=>{
                seriesData.push({
                    name: el.name,
                    value: el.count
                })
            })
            //  [
            //     { name: '录像台数', value: data.openPlanChannel},
            //     { name: '未录像台数', value:  data.downPlanChannel }
            // ];
            this.option = {
                color: ['#909399','#4CE570','#E6A23C','#F8B02B'],
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
                    itemWidth: 10,
                    itemHeight: 6,
                    itemGap: 30,
                    textStyle: {
                        rich: {
                            a: {
                                width: 70,
                                color:'rgba(255,255,255,0.8)',
                                align: 'left' //文字居中显示       
                            },
                            b:{
                                width: 40,
                                align: 'right',
                                color:'rgba(255,255,255,0.8)'
                            },
                            c:{
                                width: 40,
                                align: 'right',
                                color:'rgba(255,255,255,0.8)'
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
                        var p = 0
                        if (total == 0) {
                            p = 0;
                        }else{
                            p = Math.round(((v / total) * 100));
                        }                        
                        return `{a|${name}} {b|${v}个} {c|${p}%}`;
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['65%', '75%'],
                        // 饼图位置参数
                        center: ['25%', '50%'],
                        avoidLabelOverlap: true,                       
                        label: {
                            show: false,
                            position: 'center',
                            rich: {
                                as: {
                                    color: '#FFD32D',
                                    fontSize: 14,
                                },
                                bs: {
                                    color: 'rgba(242, 252, 253, 0.84)',
                                    fontSize: 12,
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
                                length: 20,
                                length2: 30,
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
            this.discChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.discChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
        },
        setInt(){
            let currentIndex = -1;
            let _this = this
            this.timer = setInterval(() => {
                const dataLen = this.option.series[0].data.length;
                // 取消之前高亮的图形
                _this.discChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.discChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                _this.discChart.dispatchAction({
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
.discChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>