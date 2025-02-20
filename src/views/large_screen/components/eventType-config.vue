
<template>
<div class="echart-box">
    <!-- 事件类型分布 -->
    <div ref="eventTypeChart" class="eventTypeChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { eventStatisticsCircle } from '@/api/v3/largeScreen/set.js';
import {findDictItem} from '@/api/v3/base_data/wordbook.js';
export default {
    name: 'echartBar',
    props: {
        sourceCodeList: {
          //是否初始化默认选中节点
          type: Array,
          default() {
              return [];
          }
      },
    },
    data() {
        return {
            eventTypeChart: null,
            option: {},
            angle: 0,    //角度，用来做简单的动画效果的
            personTypelist: [],

            
            seriesData: [],
            timer: null,
            index: 0,
            curIndex: 0,
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.getDicty();
        let _this = this
        setInterval(function () {
            _this.draw()
        }, 100);
    },
    beforeDestroy() {    
        clearInterval(this.timer)
    },
    methods: {
        // 字典数据
        async getDicty() {
            // 人员类别
            let _pdata = await findDictItem({code: 'eventType'})
            this.personTypelist = [..._pdata.data]
            this.index = 0
            this.seriesData = []
            this.initData();
        },
        initData(){
            let params = {
                sourceCodeList: this.sourceCodeList
            }
            eventStatisticsCircle(params).then(res =>{
                if(res.code == 1000){
                    this.barCategoryGap(res.data)
                }
            })
        },
        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        getCirlPoint(x0, y0, r, angle) {
            let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
            let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
            return {
                x: x1,
                y: y1
            }
        },
        draw() {
            if(!this.eventTypeChart) return
            this.angle = this.angle + 3
            this.eventTypeChart.setOption(this.option, true)
        },
        
        barCategoryGap(dataArr){
            this.eventTypeChart = echarts.init(this.$refs.eventTypeChart);
            let _this = this
            var sum = 0
            var avgValue = 0
            var color = ['#E5913C', '#885DFF', '#2DF3E2', '#F5D527', '#0BA0FF','#ff5d5f'];
            var legend = [];
            // data.forEach(v => {
            //     legend.push(v.sourceName)
            //     seriesData.push({
            //         name: v.sourceName,
            //         value: v.alarmNum
            //     })
            // });            
            dataArr.forEach((item) => {
                sum += item;
            });
            avgValue = sum / 100; //间隙数据
            dataArr.forEach((item, index) => {
                legend.push(item.sourceName)
                //实际展示数据
                _this.seriesData.push({
                    name: item.sourceName,
                    value: item.alarmNum
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
            this.option = {
                color: color,
                legend: {
                    right: '5%',
                    itemHeight:  9,
                    itemWidth: 14,
                    icon: "rect",
                    orient: 'vertical',
                    top: 'center',
                    itemGap: 10,
                    textStyle:{
                        color:'#fff',
                        fontSize:'10',
                        rich: {
                            a: {
                                width: 90,
                                color:'rgba(255,255,255,0.8)',
                                align: 'left' //文字居中显示       
                            },
                            c:{
                                width: 60,
                                align: 'right',
                                color:'rgba(255,255,255,0.8)'
                            }
                        }
                    },
                    data: legend,
                    formatter: (name) => {
                        if (_this.seriesData.length) {
                            const item = _this.seriesData.filter((item) => item.name === name)[0];
                            return `{a|${name}} {c| ${item.value}次}`;
                        }
                    },
                },
                title: [{
                    text: _this.seriesData[0].name,
                    top: '40%',
                    textAlign: 'center',
                    left: '24%',
                    textStyle: {
                        color: '#FFD32D',
                        fontSize: 14,
                        fontFamily: 'SourceHanSansCN',
                    },
                },{
                    text: _this.seriesData[0].value,
                    top: '52%',
                    textAlign: 'center',
                    left: '24%',
                    textStyle: {
                        color: 'rgba(242, 252, 253, 0.84)',
                        fontSize: 12,
                        fontFamily: 'SourceHanSansCN',
                    },
                }],
                series: [{
                    name: "ring5",
                    type: 'custom',
                    coordinateSystem: "none",
                    renderItem: function (params, api) {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 4,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                                startAngle: (250 + _this.angle) * Math.PI / 180,
                                endAngle: (40 + _this.angle) * Math.PI / 180
                            },
                            style: {
                                stroke: "#0CD3DB",
                                fill: "transparent",
                                lineWidth: 1.5
                            },
                            silent: true
                        };
                    },
                    data: [0]
                    }, {
                        name: "ring5",
                        type: 'custom',
                        coordinateSystem: "none",
                        renderItem: function (params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 4,
                                    cy: api.getHeight() / 2,
                                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                                    startAngle: (70 + _this.angle) * Math.PI / 180,
                                    endAngle: (220 + _this.angle) * Math.PI / 180
                                },
                                style: {
                                    stroke: "#0CD3DB",
                                    fill: "transparent",
                                    lineWidth: 1.5
                                },
                                silent: true
                            };
                        },
                        data: [0]
                    }, {
                        name: "ring5",
                        type: 'custom',
                        coordinateSystem: "none",
                        renderItem: function (params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 4,
                                    cy: api.getHeight() / 2,
                                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                                    startAngle: (270 + -_this.angle) * Math.PI / 180,
                                    endAngle: (40 + -_this.angle) * Math.PI / 180
                                },
                                style: {
                                    stroke: "#0CD3DB",
                                    fill: "transparent",
                                    lineWidth: 1.5
                                },
                                silent: true
                            };
                        },
                        data: [0]
                    }, {
                        name: "ring5",
                        type: 'custom',
                        coordinateSystem: "none",
                        renderItem: function (params, api) {
                            return {
                                type: 'arc',
                                shape: {
                                    cx: api.getWidth() / 4,
                                    cy: api.getHeight() / 2,
                                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                                    startAngle: (90 + -_this.angle) * Math.PI / 180,
                                    endAngle: (220 + -_this.angle) * Math.PI / 180
                                },
                                style: {
                                    stroke: "#0CD3DB",
                                    fill: "transparent",
                                    lineWidth: 1.5
                                },
                                silent: true
                            };
                        },
                        data: [0]
                    }, {
                        name: "ring5",
                        type: 'custom',
                        coordinateSystem: "none",
                        renderItem: function (params, api) {
                            let x0 = api.getWidth() / 4;
                            let y0 = api.getHeight() / 2;
                            let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                            let point = _this.getCirlPoint(x0, y0, r, (90 + -_this.angle))
                            return {
                                type: 'circle',
                                shape: {
                                    cx: point.x,
                                    cy: point.y,
                                    r: 2
                                },
                                style: {
                                    stroke: "#0CD3DB",//粉
                                    fill: "#0CD3DB"
                                },
                                silent: true
                            };
                        },
                        data: [0]
                    }, {
                        name: "ring5",  //绿点
                        type: 'custom',
                        coordinateSystem: "none",
                        renderItem: function (params, api) {
                            let x0 = api.getWidth() / 4;
                            let y0 = api.getHeight() / 2;
                            let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8;
                            let point = _this.getCirlPoint(x0, y0, r, (270 + -_this.angle))
                            return {
                                type: 'circle',
                                shape: {
                                    cx: point.x,
                                    cy: point.y,
                                    r: 2
                                },
                                style: {
                                    stroke: "#0CD3DB",      //绿
                                    fill: "#0CD3DB"
                                },
                                silent: true
                            };
                        },
                        data: [0]
                    }, {
                        name: '占比',
                        type: 'pie',
                        center: ['25%', '50%'],
                        radius: ['50%', '60%'],
                        label: {
                            normal: {
                            show: false,
                            position: 'center',
                                formatter: '{value|{c}}\n{label|{b}}',
                            },

                        },
                        labelLine: {
                            show: false,
                            length: 0,
                            length2: 0,
                        },
                        itemStyle: {//间隔
                            normal: {
                            borderWidth: 3,
                                borderColor: '#050e31',
                            },
                        },
                        data: _this.seriesData,
                    }]
            };
            this.eventTypeChart.setOption(this.option);
            this.startAnima();            
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
                this.eventTypeChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: this.curIndex,
                });
            }
            this.eventTypeChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: index,
            });
            //修改option参数
            this.curIndex = index;
            this.option.title[0].text = this.seriesData[index].name;
            this.option.title[1].text = this.seriesData[index].value;
            this.eventTypeChart.setOption(this.option);
        },
    }
}
</script>
<style lang="less" scoped>
.eventTypeChart{
    width: 100%;
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>