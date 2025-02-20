
<template>
<div class="echart-box">
    <!-- 事件分析 -->
    <div class="btn-cok">
        <span @click="changeDte(0)" :class="{currt:nowFlg}">今日预警</span>
        <span @click="changeDte(7)" :class="{currt:!nowFlg}">近7天</span>
    </div>
    <el-row :gutter="10" style="text-align:center">
        <el-col :span="12">
            <span>今日</span>
            <span class="totle">{{todayNum}}</span>
            <span>次</span>
        </el-col>
        <el-col :span="12">
            <span>昨日</span>
            <span class="totle">{{yesterdayNum}}</span>
            <span>次</span>
        </el-col>
    </el-row>    
    <div ref="axisPotierChart" class="axisPotierChart"></div>
    <!-- <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{'text-align':'center','color': '#fff', 'height': '20px'}"
        :cell-style="{'text-align':'center','color': '#fff', 'height': '20px' }"
      class="customer-table">
        <el-table-column prop="resourceName" label="告警名称" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="resourceName" label="告警类型" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="告警时间" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="handleStatusName" label="状态" width="" show-overflow-tooltip></el-table-column>
    </el-table> -->
</div>
</template>
<script>
var app = {
    curIndex: -1,
};
import * as echarts from 'echarts';
import * as mUtils from '@/utils/mUtils';
import { eventStatistics,findEventBySourceCodes,queryEventSource } from '@/api/v3/largeScreen/set.js';
import { findDictItem } from '@/api/v3/base_data/wordbook.js';
export default {
    name: 'echartBar',
    props: {
        sourceCodeList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            axisPotierChart: null,
            chartData: [],
            nowFlg: true,
            allDate: [],
            todayNum: '',
            yesterdayNum: '',
            tableData: [],
            eventType: [],
            name: ''
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.getDicty();
        this.getTable(0);
        this.intervalTime()
    },
    beforeDestroy() {},
    methods: {
        getDicty() {
            this.eventType = []
            queryEventSource(this.sourceCodeList).then(res =>{
                if(res.code == 1000){
                    this.eventType = res.data || []
                    this.initData(0);
                }
            })
            // this.sourceCodeList.forEach(v=>{
            //     queryEventSource([v]).then(res =>{
            //         if(res.code == 1000){
            //             this.eventType.push(res.data[0])                        
            //             this.initData(0);
            //         }
            //     })
            // })       
        },
        getTable(numb){
            let tDate = mUtils.getAIData(numb);
            let params = {
                startDate: tDate[0],
                endDate: tDate[1],
                sourceCodeList: this.sourceCodeList
            }
            findEventBySourceCodes().then(res =>{
                if(res.code == 1000){
                    this.tableData = res.data.slice(0,1)
                }
            })
        },
        changeDte(inx){
            if(inx == 0){
                this.nowFlg = true
                this.initData(inx);
                this.getTable(inx);
                
            }else{
                this.nowFlg = false
                this.initData(inx);
                this.getTable(inx);
            }
        },
        initData(numb){
            let arr = []
            let tDate = mUtils.getAIData(numb);
            this.allDate = mUtils.getAllData(numb);
            let params = {
                startDate: tDate[0],
                endDate: tDate[1],
                sourceCodeList: this.sourceCodeList
            }
            eventStatistics(params).then(res =>{
                if(res.code == 1000){
                    this.todayNum = res.data.todayNum
                    this.yesterdayNum = res.data.yesterdayNum
                    let data = res.data.detailVos
                    let nowData = []
                    // let codeArr = this.sourceCodeList
                    let _this = this
                    data.forEach(el => {
                        nowData.push({
                            name: _this.getName(el.sourceCode),
                            value: el.alarmNum
                        })
                    });
                    this.chartData = nowData
                    console.log('---nowData-------------------',nowData)
                    this.barCategoryGap(nowData)
                }
            })
        },
        getName(val){
            let name = ''
            this.eventType.filter((item)=>{
                if(item && item.code == val) {
                    name = item.name
                }
            })
            console.log('-name-----------',name)
            return name
        },
        barCategoryGap(nowData){
            this.axisPotierChart = echarts.init(this.$refs.axisPotierChart);
            this.option= {             
                tooltip: {
                    show: true,
                    trigger: 'item',  //axis , item
                    backgroundColor:'rgba(0,15,78,0.6)',
                    borderColor:'#00afff',
                    borderWidth: 1,
                    borderRadius: 0,
                    textStyle: {
                        color: "#fff",
                        fontSize: 13,
                        align:'left'
                    },
                    axisPointer:{
                        type: 'shadow', //'line' | 'cross' | 'shadow' | 'none
                        lineStyle: {
                            width: 1,
                            type: 'dotted',
                            color: 'rgba(46,149,230,.9)'
                        }
                    },
                    // formatter: (params) => {
                    //     console.log(params)
                    //     var result = `${params.name} <br/>${params.value}`
                    //     return result;
                    // },
                },
                legend:{
                    show: false
                },
                grid: {
                    top: '10%',
                    right: '2%',
                    bottom: '20%',
                    left: '13%'
                },
                xAxis:{
                    type: 'category',
                    axisLabel: {
                        show: true,
                        interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
                        textStyle: {
                            color: '#67ADE8'
                        },
                        formatter: '{value}'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'rgba(15,45,134,.9)'
                        }
                    },
                    axisTick:{
                        show: false //坐标轴小标记
                    },
                    data: (function(data){
                        var ar=[];
                        data.forEach(function(items){
                            ar.push(items.name);   //name
                        });
                        return ar;
                    })(nowData)  //载入横坐标数据
                },
                yAxis: {
                    type: 'value',
                    name: '',
                    nameTextStyle:{
                        color:'#93d3fc',
                        fontSize: 10,
                        align: 'right'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#67ADE8'
                        },
                        interval: 0, //类目间隔 设置为 1，表示『隔一个标签显示一个标签』
                        margin: 10,
                        //formatter: '{value}'
                    },
                    splitNumber: 5, //y轴刻度设置(值越大刻度越小)
                    axisLine:{ //y轴线
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(15,45,134,.6)', //横向网格线颜色
                            width: 1
                        }
                    },
                    axisTick:{
                        show: false //坐标轴小标记
                    }
                },
                series:[
                {
                    name:'',
                    type: 'effectScatter', //effectScatter 涟漪效果, scatter 散点
                    stack: '',
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#9bc8ff',
                                fontSize: 30
                            },
                            formatter: '{c}' //图形上显示数字
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: 'rgba(10, 225, 234, 1)'},
                                {offset: 1, color: 'rgba(24, 242, 246, 0)'},
                            ]),
                            // color: 'rgba(255,55,135,1)', //颜色
                        }
                    },
                    symbol:"circle",             //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                    symbolSize: 30,            //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
                    symbolRotate: 0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
                    symbolOffset:[0, '-200%'],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
                    symbolPosition: 'end',
                    rippleEffect:{               //涟漪特效相关配置。
                        period: 4,               //动画的时间。
                        scale: 2.5,              //动画中波纹的最大缩放比例。
                        brushType:  'fill',      //波纹的绘制方式，可选 'stroke' 和 'fill'。
                    },
                    //每一列称为一个『维度』。维度下标从0开始
                    data: (function(data){
                        var ar=[];
                        data.forEach(function(items){ 
                            var itemName = items.name,
                                itemValue = items.value,
                                itemStyle = itemValue/1000; //console.log(itemStyle)
                            ar.push({
                                name: itemName,
                                value: itemValue,
                                symbolSize: itemStyle
                            })
                        });
                        return ar;
                    })(nowData)  //载入数据并设置图形尺寸
                },
                {
                    name:'',
                    type:'pictorialBar',
                    barWidth: 40,
                    stack: '',
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#9bc8ff',
                                fontSize: 12
                            },
                            formatter: '{c}' //图形上显示数字
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(142,48,255,1)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(142,48,255,.2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }, //渐变颜色
                        }
                    },
                    symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
                    data: (function(data){
                        var ar=[];
                        data.forEach(function(items){
                            let val = items.value
                            if (val == 0) {
                                ar.push(1);
                            }else{
                                ar.push(val);
                            }
                            //value
                        });
                        return ar;
                    })(nowData)  //载入数据
                },{
                    name:'',
                    type:'pictorialBar',
                    barWidth: 40,
                    stack: '',
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#9bc8ff',
                                fontSize: 12
                            },
                            formatter: '{c}' //图形上显示数字
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(0,236,150,1)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(0,236,150,.2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }, //渐变颜色
                        }
                    },
                    symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
                    data: (function(data){
                        var ar=[];
                        data.forEach(function(items){
                            let val = items.value
                            if (val == 0) {
                                ar.push(1);
                            }else{
                                ar.push(val);
                            }
                        });
                        return ar;
                    })(nowData)  //载入数据
                }]
            };     
            this.axisPotierChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.axisPotierChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
                  
        },
        intervalTime(){
            var _this = this
            setInterval(()=> {
                var dataLen = _this.chartData.length;
                // 取消之前高亮的图形
                if(!_this.axisPotierChart) return
                _this.axisPotierChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: app.curIndex
                });        
                app.curIndex = (app.curIndex + 1) % dataLen;
                // 高亮当前图形
                _this.axisPotierChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: app.curIndex,
                });
            
                // 显示 tooltip
                // _this.axisPotierChart.dispatchAction({
                //     type: 'showTip',
                //     seriesIndex: 0,
                //     dataIndex: app.curIndex
                // });
            
            }, 1000);
        }
    }
}
</script>
<style lang="less" scoped>
.echart-box{
    position: relative;
    font-size: 12px;
    .totle{
        color: #FACC14;
        font-size: 16px;
    }
    .btn-cok{
        position: absolute;
        top: -35px;
        right: 0;
        z-index: 999;
        width: 100%;
        color: #fff;
        text-align: center;
        width: 110px;
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
    /deep/.has-gutter{
        height: 20px !important;
        line-height: 20px !important;
    }
}
.axisPotierChart{
    width: 100%;
    height: calc((100vh / 4) - 72px)
    
}
//去掉每行的下边框
/deep/ .el-table td.el-table__cell,/deep/ .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
} 
/deep/ .el-table tr {
    height: 30px !important;
}
// 去掉表格单元格边框
.customer-table th{
    border:none;
}
.customer-table td,.customer-table th.is-leaf {
  border:none;
}
// 表格最外边框
.el-table--border, .el-table--group{
  border: none;
}
// 头部边框
.customer-table thead tr th.is-leaf{
  border: 1px solid #EBEEF5;
  border-right: none;
}
.customer-table thead tr th:nth-last-of-type(2){
  border-right: 1px solid #EBEEF5;
}
// 表格最外层边框-底部边框
.el-table--border::after, .el-table--group::after{
  width: 0;
}
.customer-table::before{
  width: 0;
}
.customer-table .el-table__fixed-right::before,.el-table__fixed::before{
  width: 0;
}
// 表格有滚动时表格头边框
.el-table--border th.gutter:last-of-type {
    border: 1px solid #EBEEF5;  
    border-left: none;
}
// 去除边框线
/deep/ .el-table::before {
    height: 0;
}
// 表格
/deep/ .el-table,
.el-table__body {
  background: transparent !important;
}
/deep/ .el-table th {
  background-color: transparent !important;
}
/deep/ .el-table tr {
  background-color: transparent !important;
}
//清除鼠标移入效果
/deep/.el-table__body tr.hover-row > td {
  background-color: transparent !important;
}
// 行底边线
/deep/ .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  //   border-bottom: 1px solid #ccc;
}
/deep/ .el-table .el-table__header {
    background-color: transparent !important;
    color: #fff!important;
}
/deep/ .el-table .el-table__header tr .cell {
    width: 100%;
    color: #fff;
    height: 25px !important;
    line-height: 25px !important;
}
/* 首先去除默认的hover效果 */
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(0, 0, 0, 0) !important;
}
</style>