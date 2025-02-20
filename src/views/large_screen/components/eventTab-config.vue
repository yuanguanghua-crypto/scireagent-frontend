
<template>
<div class="echart-box">
    <!-- 事件明细 -->
    <!-- <el-row style="position: relative;top: -5px">
        <el-col :span="5">区域名称</el-col>
        <el-col :span="5">设备名称</el-col>
        <el-col :span="5">通道名称</el-col>
        <el-col :span="4">告警时间</el-col>
        <el-col :span="5" style="text-align:center">事件类型</el-col>
    </el-row> -->
    <!-- <div style="height:80%;overflow:hidden" > -->
        <!-- <vue-seamless-scroll :data="tableData" class="seamless-warp" :class-option="classOption"> -->
            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{'text-align':'center','color': '#fff'}"
                :cell-style="{'text-align':'center','color': '#fff' }"
              class="customer-table">
              <el-table-column prop="deviceName" label="设备名称" width="" show-overflow-tooltip></el-table-column>
              <el-table-column prop="channelName" label="通道名称" width="" show-overflow-tooltip></el-table-column>
              <el-table-column prop="areaName" label="区域名称" width="" show-overflow-tooltip></el-table-column>
              <el-table-column prop="alarmTime" label="告警时间" width="" show-overflow-tooltip>
                  <template slot-scope="scope">
                      <span> {{getTimeFormat(scope.row.alarmTime)}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="resourceName" label="事件类型" width="" show-overflow-tooltip></el-table-column>      
            </el-table>
        <!-- </vue-seamless-scroll> -->
    <!-- </div> -->
</div>
</template>
<script>
import * as echarts from 'echarts';
import { findEventBySourceCodes } from '@/api/v3/largeScreen/set.js';
import vueSeamlessScroll from 'vue-seamless-scroll';
import bus from '@/utils/bus';
import dayjs from 'dayjs'
export default {
    name: 'echartBar',
    components: {
        vueSeamlessScroll
    },
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
            tableData: [],
            tableDatas: [],            
            classOption: {
                step: 0.5, // 数值越大速度滚动越快
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 1, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            },
        };
    },
    mounted() {
        this.barCategoryGap()
        bus.$on('WsPushAlarm', this.appendEvent)
    },
    beforeDestroy() {
        bus.$off('WsPushAlarm', this.appendEvent)
    },
    methods: {
        getTimeFormat(val){
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        },
        barCategoryGap(){
          let parmas = {
              sourceCode: this.sourceCodeList
          }
          findEventBySourceCodes(parmas).then(res =>{
                if(res.code == 1000){
                    this.tableData = res.data || []
                }
            })
        },
        // =========================================================
        appendEvent(msgParam) {
            // console.log('--推送---事件明细-----------',msgParam);
            if(msgParam.eventSource && this.sourceCodeList.includes(msgParam.eventSource.eventSourceCode)){
                let obj = {
                    areaName: msgParam.eventSource.areaName,
                    deviceName: msgParam.eventSource.deviceName,
                    channelName: msgParam.eventSource.channelName,
                    alarmTime: msgParam.eventSource.alarmTime,
                    resourceName: msgParam.eventSource.eventSourceName,
                }
                this.tableData.unshift(obj)
                this.tableData.pop()
            }
        },
    }
}
</script>
<style lang="less" scoped>
.echart-box{
    position: relative;
    width: 100%;
    height: calc((100vh / 4) - 45px);
    margin-top: 0;
    overflow: hidden;
    text-align: center;
    line-height: 20px;
    /deep/.has-gutter{
        height: 20px !important;
        line-height: 20px !important;
    }
}
//去掉每行的下边框
/deep/ .el-table td.el-table__cell,/deep/ .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
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
  height: 36px;
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
    height: 20px !important;
    line-height: 20px !important;
}
/* 首先去除默认的hover效果 */
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(0, 0, 0, 0) !important;
}
</style>