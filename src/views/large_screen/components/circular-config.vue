<template>
<div class="echart-box"><!-- 视频质量诊断 -->
    <el-row class="btn-cok">
        <el-col :span="8" :offset="16">
            <span @click="changeDte(6)" :class="{currt:nowFlg}">近7天</span>
            <span @click="changeDte(30)" :class="{currt:!nowFlg}">30天</span>
        </el-col>
    </el-row>
    <div ref="circularChart" class="circularChart"></div>
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
            circularChart: null,
            nowFlg: true,
            timer: null,
            index: 0,
            curIndex: 0,
            seriesData: [],
            option: {},
            dataArr: []
        };
    },
    mounted() {
        this.initData(6)
    },
    beforeDestroy(){
        this.clearAnima();
    },
    methods: {
        changeDte(inx){
            this.index = 0
            this.clearAnima();
            this.seriesData = []
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
                    let data = []
                    res.data.forEach((el)=>{
                        data.push({
                            name: el.sourceName,
                            value: el.alarmNum
                        })
                    })
                    this.barCategoryGap(data)
                }
            })
        },
        barCategoryGap(dataArr){
            var sum = 0
            var avgValue = 0
            var _this = this
            this.circularChart = echarts.init(this.$refs.circularChart);
            dataArr.forEach((item) => {
                sum += item;
            });
            avgValue = sum / 100; //间隙数据
            dataArr.forEach((item, index) => {
                //实际展示数据
                _this.seriesData.push({
                    name: item.name,
                    value: item.value
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
            var _this = this

            var colorList = ['#5CEDFF', '#259AF0', '#23C376', '#EE8C2C', '#CD2323','#D141D9','#6A4DFC','#FACC14','#ecf561','#a2f561','#cac7b4','#0b8e89'];
            this.option = {
                legend: [{
                    right: 'right',
                    top: '10%',
                    right: '30%',
                    itemHeight: 6,
                    itemWidth: 12,
                    icon: "rect",
                    orient: 'vertical',
                    textStyle:{
                        fontSize:'14',
                        verticalAlign: 'middle',
                        rich: {
                            // a: {
                            //     width: 50,   
                            // },
                            // b: {
                            //     width: 40,
                            //     color:'#03C8D7',
                            // },
                            a: {
                                width: 50,
                                color: 'rgba(255,255,255,0.8)',
                                align: 'left' //文字居中显示       
                            },
                            b:{
                                align: 'middle',
                                color:'#03C8D7'
                            }
                            // c:{
                            //     align: 'middle',
                            //     color:'#03C8D7'
                            // }
                        }
                    },
                    formatter: function(name) {
                        var data = dataArr;
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
                        return `{a|${name}}  {b|${v}}`;
                    },
                     data: dataArr.slice(0, 6)
                },{
                    right: 'right',
                    top: '10%',
                    right: '1%',
                    itemHeight: 6,
                    itemWidth: 12,
                    icon: "rect",
                    orient: 'vertical',
                    textStyle:{
                        fontSize:'14',
                        verticalAlign: 'middle',
                        rich: {
                            a: {
                                width: 50,
                                color: 'rgba(255,255,255,0.8)',
                                align: 'left' //文字居中显示       
                            },
                            b:{
                                align: 'middle',
                                color:'#03C8D7'
                            }
                        }
                    },
                    formatter: function(name) {
                        var data = dataArr;
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
                        return `{a|${name}}  {b|${v}}`;
                    },
                    data: dataArr.slice(6,12)
                }
                ],  
                title: [{
                    text: _this.seriesData[0].name,
                    top: '40%',
                    textAlign: 'center',
                    left: '20%',
                    textStyle: {
                        color: '#FFD32D',
                        fontSize: 14,
                        fontFamily: 'SourceHanSansCN',
                    },
                },{
                    text: _this.seriesData[0].value,
                    top: '52%',
                    textAlign: 'center',
                    left: '20%',
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
                    center: ['46%', '50%'],
                    radius: ['60%', '70%'],
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
                },],
            };
            this.circularChart.setOption(_this.option);
            window.addEventListener('resize', () => {
                this.circularChart.resize();
            }, false);
            this.startAnima()
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
                this.circularChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: this.curIndex,
                });
            }
            this.circularChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: index,
            });
            //修改option参数
            this.curIndex = index;
            this.option.title[0].text = this.seriesData[index].name;
            this.option.title[1].text = this.seriesData[index].value;
            this.circularChart.setOption(this.option);
            //鼠标移入事件
            // this.circularChart.on('mouseover', function (e) {
            //     this.clearAnima();
            //     this.setEmphasis(e.dataIndex);
            // });
            // this.circularChart.on('mouseout', function (e) {
            //     this.startAnima();
            // });
        },
        clearAnima() {
            clearInterval(this.timer);
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
.circularChart{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>