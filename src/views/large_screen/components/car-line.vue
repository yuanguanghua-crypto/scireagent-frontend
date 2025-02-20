
<template>
<div class="echart-box">
    <!-- 人员类型统计 -->
    <div ref="columnChart" class="columnChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { carSnapshotLine,getCockpitCofig } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    props: {
        channelIds: {
            //是否初始化默认选中节点
            type: Array,
            default() {
                return [];
            }
        },
        timePeriod: {
            //是否初始化默认选中节点
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            columnChart: null,
            nowFlg: true,
            option: {},
            dataList: [],
            timer: null,
            timerMore: null,
            len: 0
        };
    },
    watch: {},
    mounted() {
        this.columnChart = echarts.init(this.$refs.columnChart);
        this.getCarLineInfo();
        this.setInt();
    },
    beforeDestroy() {
        clearTimeout(this.timer)
        clearTimeout(this.timerMore)
    },
    methods: {
        getCarLineInfo(){
            let params = {
                code: 'car_snapshot_line'
            }
            getCockpitCofig(params).then((res) => {
                if(res.code == 1000){
                    let newdata =  JSON.parse(res.data.param)
                    this.initData(newdata.channelIds,newdata.timePeriod.split('-'))
                }
            });
        },
        initData(val1,val2){
            clearTimeout(this.timer)
            let params = {
                channelIds: val1,
                startTime: val2[0] + ':00',
                endTime: val2[1] + ':59'
            }
            carSnapshotLine(params).then(res =>{
                if(res.code == 1000){
                    let data = res.data || []
                    this.dataList = data
                    this.barCategoryGap();
                    if(data.length > 6){
                        this.setIntLen();
                    }                  
                }
            })
        },
        barCategoryGap(){
            // let datas = this.dataList            
            let data = []
            let time = []
            let recordCount = []
            if(this.len >= this.dataList.length){
                this.len = 0
            }
            if(this.dataList.length > 6){
                data = this.dataList.slice(this.len,this.len + 6)
            }else{
                data = this.dataList
            }       
            data.forEach((el,index)=>{
                time.push(el.hourOfDay + ':00')
                recordCount.push(el.recordCount)
            })
            var option = {               
                tooltip: {
                    trigger: 'axis'
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
                legend: {
                    itemWidth: 18, // 长方形的宽度
                    itemHeight: 12, // 长方形的高度
                    top: '0px',
                    right: '15px',
                    // 图例文本样式
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    itemStyle: {
                        borderRadius: [0, 0], // 使其变为正方形，然后设置宽高
                        borderColor: '#1f77b4',
                        borderWidth: 2
                    },
                    data: ['抓拍']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '20%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    nameTextStyle: {
                        color: '#c0c3cd',
                        padding: [0, 0, -10, 0],
                        fontSize: 12,
                    },
                    axisLabel: {
                        color: '#67ADE8',                        
                        interval: 0,
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
                    type: 'category',
                    data: time
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
                series: [
                    {
                        name: '抓拍',
                        type: 'line',
                        stack: 'Total',
                        // label: {
                        //     show: true,
                        //     fontSize: '12px',
                        //     color: '#fff'
                        // },
                        lineStyle: {
                            color: '#188FFC',
                            width: 2
                        },
                        data: recordCount
                    },
                ]
            };
            this.columnChart.setOption(option,true);
            this.len += 6          
        },
        setIntLen(){
            let _this = this
            this.timer = setInterval(() => {
                _this.barCategoryGap();
            }, 5000);
        },
        setInt(){
            let _this = this
            this.timerMore = setInterval(() => {
                _this.getCarLineInfo();
            }, 18000000);
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