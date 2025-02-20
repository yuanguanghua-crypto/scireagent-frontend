
<template>
    <div class="echart-box">
        <!-- 人员类型统计 -->
        <div ref="discChart" class="discChart"></div>
    </div>
    </template>
    <script>
    import * as echarts from 'echarts';
    import { record_list_area } from "@/api/v3/face/face.js";
    import { getCockpitCofig } from '@/api/v3/largeScreen/set.js';
    export default {
        name: 'echartBar',
        data() {
            return {
                discChart: null,
                option: {},
                seriesData: [],
                timer: null,
                index: 0,
                curIndex: 0,
                timerMore: null
            };
        },
        watch: {
        },
        mounted() {
            this.getCarLineInfo();
            this.setInt();
        },
        beforeDestroy() {
            clearInterval(this.timer)
            clearInterval(this.timerMore)
        },
        methods: {
            getDay(){
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            },
            getCarLineInfo(){
                this.index = 0
                this.seriesData = []
                let params = {
                    code: 'passenger_in_circle'
                }                
                clearInterval(this.timer)
                getCockpitCofig(params).then((res) => {
                    if(res.code == 1000){
                        let newdata = JSON.parse(res.data.param)
                        this.initData(newdata.areaIds,newdata.timePeriod.split('-'))
                    }
                });
            },
            initData(val1,val2){
                let params = {
                    areaIds: val1,
                    startTime: this.getDay() + ' ' + val2[0] + ':00',
                    endTime: this.getDay() + ' ' + val2[1] + ':00'
                }
                record_list_area(params).then(res =>{
                    if(res.code == 1000){
                        let newData = []
                        res.data.forEach((el)=>{
                            newData.push({
                                name: el.areaName,
                                value: el.passengerIn
                            })
                        })
                        this.barCategoryGap(newData)
                    }
                })
            },
            barCategoryGap(dataArr){
                var sum = 0
                var avgValue = 0
                var _this = this
                this.discChart = echarts.init(this.$refs.discChart);
                dataArr.forEach((item) => {
                    sum += item.value;
                });
                avgValue = sum / 100; //间隙数据
                dataArr.forEach((item, index) => {
                    //实际展示数据
                    _this.seriesData.push({
                        name: item.name,
                        value: item.value,
                        avgValue: parseFloat(((item.value / avgValue)).toFixed(2))? parseFloat(((item.value / avgValue)).toFixed(2)) + '%':0
                    });
                   
                    _this.seriesData.push(
                        //虚拟数据做间隙使用
                        // 实际当前数据是渲染成饼图的一部分，设置了颜色透明，视觉效果是间隙
                        {
                            name: '',
                            value: avgValue, //间隔数据取总数的百分之一
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                    },
                                    labelLine: {
                                        show: false,
                                    },
                                    color: 'rgba(0, 0, 0, 0)',
                                    borderColor: 'rgba(0, 0, 0, 0)',
                                    borderWidth: 0,
                                },
                            },
                        }
                    );
                });
                var colorList = ['#1890FF','#41D9C7','#984DFF','#F04864','#4CE570'];
                this.option = {
                    legend: {
                        show: true,
                        orient: 'vertical',
                        top: 'center',
                        right: '5%',
                        icon: 'rect',
                        itemWidth: 14,
                        itemHeight: 7,
                        itemGap: 15,
                        borderWidth: 0,
                        textStyle: {
                            color: '#fff',
                            rich: {
                                a: {
                                    width: 90,
                                    color:'rgba(255,255,255,0.8)',
                                    align: 'left' //文字居中显示       
                                },
                                b:{
                                    width: 60,
                                    align: 'right',
                                    color:'rgba(255,255,255,0.8)'
                                },
                            }
                        },
                        data: dataArr,
                        formatter: (name) => {
                            var data = dataArr
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
                            return `{a|${name}:} {b|${v}}`;
                        },
                    }, 
                    title: [{
                        text: _this.seriesData[0].name,
                        top: '40%',
                        textAlign: 'center',
                        left: '25%',
                        textStyle: {
                            color: '#FFD32D',
                            fontSize: 14,
                            fontFamily: 'SourceHanSansCN',
                        },
                    },{
                        text: _this.seriesData[0].avgValue,
                        top: '53%',
                        textAlign: 'center',
                        left: '25%',
                        textStyle: {
                            color: 'rgba(242, 252, 253, 0.84)',
                            fontSize: 12,
                            fontFamily: 'SourceHanSansCN',
                        },
                    }],
                    series: [{
                        width:'45%',
                        type: 'pie',
                        z: 3,
                        center: ['58%', '50%'],
                        radius: ['70%', '80%'],
                        clockwise: true,
                        avoidLabelOverlap: true,
                        emphasis: {
                            scale: true,
                            scaleSize: 7,
                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex / 2];
                                },
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        label: {
                            show: false,
                        },
                        data: _this.seriesData,
                    }],
                };
                this.discChart.setOption(_this.option);
                this.startAnima()
                // this.discChart.setOption(this.option);
            },
            startAnima() {
                this.setEmphasis(this.index);
                var _this = this
                this.timer = setInterval(function () {
                    if (_this.index >= _this.seriesData.length - 2) {
                        _this.index = 0;
                    } else {
                        _this.index += 2;
                    }
                    _this.setEmphasis(_this.index);
                }, 2000);
            },
            setEmphasis(index) {
                if (this.curIndex != index) {
                    this.discChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: this.curIndex,
                    });
                }
                this.discChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: index,
                });
                //修改option参数
                this.curIndex = index;
                this.option.title[0].text = this.seriesData[index].name;
                this.option.title[1].text = this.seriesData[index].avgValue;
                this.discChart.setOption(this.option);
            },
            setInt(){
                this.timerMore = setInterval(() => {
                    _this.getCarLineInfo();
                }, 18000000);
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