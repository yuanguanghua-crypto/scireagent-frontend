
<template>
<div class="box">
    <!-- 【区域三】 通行统计 -->
    <el-row class="btn-cok">
        <el-col :span="3" :offset="21">
            <!-- <span @click="changeDte('1')" :class="{currt:nowFlg == 0}">今日</span> -->
            <span @click="changeDte('7')" :class="{currt:nowFlg == 7}">近7天</span>
            <span @click="changeDte('30')" :class="{currt:nowFlg == 30}">30天</span>
        </el-col>
    </el-row>
    <el-row :gutter="5">
        <el-col :span="12">            
            <div style="margin-left:10px; position: relative">
                <div class="over"></div>
                <el-carousel ref="carousel" :interval="4000" type="card" height="calc((100vh / 8))" indicator-position="none" @mouseenter.native="delHandleMouseEnter">
                    <el-carousel-item v-for="(item,index) in imgArr" :key="index">
                        <img class="el-image" style="width: 100%;height:100%" v-if="item.recordImage" :src="getBaseImgs(item.recordImage)"></img>
                        <img class="el-image" style="width: 100%;height:100%" v-else-if="item.passType == 1" :src="url_04"></img>
                        <img class="el-image" style="width: 100%;height:100%" v-else-if="item.passType == 2" :src="url_02"></img>
                        <img class="el-image" style="width: 100%;height:100%" v-else-if="item.passType == 3" :src="url_01"></img>                    
                        <img class="el-image" style="width: 100%;height:100%" v-else-if="item.passType == 4" :src="url_03"></img>                        
                        <!-- <el-image style="width: 100%;height:100%" :src="getBaseImgs(item.recordImage)"></el-image> -->
                    </el-carousel-item>
                </el-carousel>
                <el-carousel style="margin-bottom:10px;" ref="carouselInfo" :interval="4000" height="7vh" indicator-position="none" @mouseenter.native="delHandleMouseEnter">
                    <el-carousel-item v-for="(item,index) in imgArr" :key="index">
                        <div class="personInfo" style="">
                            <div class="info">
                                <span class="info-l">姓名：{{item.personName?item.personName:'--'}}</span>
                                <span class="info-r">时间：{{item.createTime}}</span>
                            </div>
                            <div class="info">
                                <span>抓拍通道：{{item.channelName}}
                                    <el-tag effect="dark" size="mini" color="#41D9C7">{{accessTypeRender(item.passType)}}</el-tag>
                                </span>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>            
        </el-col>
        <el-col :span="12">
            <div ref="lineChartGurad" class="lineChartGurad"></div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { trafficStatistics, accessRecordTable,strangerAlarmTable } from '@/api/v3/largeScreen/set.js';
import { findDictItem } from '@/api/v3/base_data/wordbook.js';
import bus from '@/utils/bus';
import * as mUtils from '@/utils/mUtils';
export default {
    name: 'echartBar',
    data() {
        return {
            dataArr: [],
            imgArr: [],
            typeList: [],
            chartsData: [],
            accessTypes: [],
            nowFlg: '7',
            lineChartGurad: null,
            
            url_01: require('../img/m_01.png'),
            url_02: require('../img/m_02.png'),
            url_03: require('../img/m_03.png'),
            url_04: require('../img/m_04.png'),
            urlNo: require('../img/null.png'),
        };
    },
    watch: {},
    created() {
        bus.$on('WsPushGuard', this.appendWarning)
    },
    mounted() {
        this.getWordBook();
        this.initData();
        this.getChartData('7');
        this.$refs.carousel.handleMouseEnter = () => { };
        this.$refs.carouselInfo.handleMouseEnter = () => { };
        // this.$refs.carousel.$el.addEventListener('current-change', this.handleCurrentChange)
        // this.$refs.carousel.$el.addEventListener('current-change', this.handleCurrentChange)
    },
    beforeDestroy() {
        bus.$off('WsPushGuard', this.appendWarning)
    },
    methods: {
        changeDte(inx){
            this.nowFlg = inx
            this.getChartData(inx)
        },
        delHandleMouseEnter() {
            this.$refs.carousel.handleMouseEnter = () => { };
            this.$refs.carouselInfo.handleMouseEnter = () => { };            
        },
        handleCurrentChange(val) {
            console.log(val) // 当前的index值
        },
        initData(){
            let params = {
                passType: '3'
            }
            accessRecordTable(params).then(res =>{
                if(res.code == 1000){
                    this.imgArr = res.data.slice(0,3) || []
                    this.dataArr = res.data.slice(0,1) || []
                    // this.dataArr = res.data.records.slice(0,1) || []
                }
            })
        },
        getChartData(numb){
            let params = {
                interval: numb
            }
            trafficStatistics(params).then(res =>{
                if(res.code == 1000){
                    // this.chartsData = res.data || []
                    this.barCategoryGap(res.data)
                }
            })
        },
        getPersonName(val){
            var name = ''
            if(val){
                this.typeList.filter(item => {
                    if (item.code == val) {
                        name = item.name;
                    }
                })
            }
            return name;
        },
        // 字典数据
        async getWordBook() {
            let typeList = await findDictItem({code: 'person_types'});
            this.typeList = typeList.data;
            let accessType = await findDictItem({code: "guardTrafficWay"});
            this.accessTypes = accessType.data
        },
        accessTypeRender(type){
            let name = '--';
            this.accessTypes.filter((item)=>{
                if(item.code==type) {
                    name=item.name;
                }
            })
            return name;
        },
        getBaseImgs(val){
            if(!val){
                return '--'
            }
            let protocol = window.location.protocol;
            let newIps = 'https://' + window.location.hostname + ':19090'
            let dows = newIps + '/download/'
            // let newIp = 'http://' + window.location.hostname + ':19000'
            let newIpts = 'https://' + window.location.hostname + ':19000'
            // let dow = newIp + '/download/'
            if(protocol == 'https:'){
                if(val.indexOf('http:') != -1){
                    var myReg = /.+:(\d{1,5})/;
                    var myResult = val.match(myReg);
                    let ml = myResult[1].length
                    let vl = val.lastIndexOf(':')
                    let len = ml + vl + 1
                    let oldIp = val.substr(0,len);
                    return val = val.replace(oldIp, newIpts)
                }else{
                    if(val.indexOf('/service_download_file') != -1){
                        return val = newIps + '/' + val
                    }else if(val.indexOf('/download/') != -1){
                        return newIps + val
                    }else if(val.indexOf('download/') != -1){
                        return newIps + '/' + val
                    }else{
                        return val = dows + val
                    }
                }
            }else if(val.indexOf('http:') != -1){
                return val
            }else if(val.indexOf('/service_download_file') != -1){
                return protocol + '//' + window.location.hostname + ':' + window.location.port + '/' + val
            }else if(val.indexOf('/download/') != -1){
                return protocol + '//' + window.location.hostname + ':' + window.location.port + val
            }else if(val.indexOf('download/') != -1){
                return protocol + '//' + window.location.hostname + ':' + window.location.port + '/' + val
            }else{
                return protocol + '//' + window.location.hostname + ':' + window.location.port + '/download/' + val
            }
        },
        // =========================================================
        appendWarning(msgParam) {
            
            console.log('--推送---门禁通行记录-----------',msgParam);
            if(msgParam){
                this.initData();
                // msgParam.id = msgParam.eventSource.metadataId
                // msgParam.resourceName = msgParam.eventSource.eventSourceName
                // msgParam.alarmTime = msgParam.eventSource.alarmTime                
                // msgParam.channelName = msgParam.eventSource.channelName
                // delete msgParam.messageId
                // delete msgParam.eventSource
                // this.dataArr.unshift(msgParam)
                // this.dataArr.pop()
            }                
        },
        barCategoryGap(data){
            this.lineChartGurad = echarts.init(this.$refs.lineChartGurad);            
            var dat = []
            var count = []
            data.forEach(v => {
                dat.push(v.date)
                count.push(v.count)
            });
            var counts = count.reverse()
            var dates = dat.reverse()
            var option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        },
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                grid: {
                    top: '15%',
                    left: '20%',
                    right: '8%',
                    bottom: '15%',
                    // containLabel: true
                },
                title: {
                    text: '门禁通行统计',
                    right: "2%",
                    top: "0",
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                    }
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#233653'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        textStyle: {
                            color: '#67ADE8'
                        },
                        formatter: function(data) {
                            return data
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#233653'
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    data: dates
                }],
                yAxis: [{
                    min: 0,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#233653'
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#233653"
                        }

                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#67ADE8'
                        },
                        formatter: function(value) {
                            if (value === 0) {
                                return value
                            }
                            return value
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [{
                    name: '通行',
                    type: 'line',
                    symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                    showAllSymbol: true,
                    symbolSize: 6,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: "#00ffff", // 线条颜色
                        },
                    },
                    itemStyle: {
                        color: "#00ffff",
                    },
                    areaStyle:{
                        normal: {
                            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: "rgba(0,255,255,.6)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,255,255, 0)"
                                }
                            ], false),
                        }
                    },
                    data: counts
                }]
            };       
            this.lineChartGurad.setOption(option);
            window.addEventListener('resize', () => {
                this.lineChartGurad.resize();  
            }, false);
            let currentIndex = -1;
            let _this = this
            if(!this.lineChartGurad) return
            setInterval(() => {
                const dataLen = data.length;
                // 取消之前高亮的图形
                _this.lineChartGurad.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                _this.lineChartGurad.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: currentIndex,
                });
                // 显示 tooltip
                // _this.lineChartGurad.dispatchAction({
                //     type: "showTip",
                //     seriesIndex: 0,
                //     dataIndex: currentIndex,
                // });
            }, 1000);
        },
    }
}
</script>
<style lang="less" scoped>
@font-face{
    font-family: 'PangMenZhengDao';
    src: url('../font/PangMenZhengDaoBiaoTiTi-1.ttf');
}
.box{
    position: relative;
    .btn-cok{
        position: absolute;
        top: -35px;
        right: 0;
        // z-index: 9999;
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
.warning-box{
    border: 1px solid rgba(0, 38, 88, 0.50);
    margin-bottom: 23px;
    .el-image{
        height:125px;
        width:100%
    }
    .alarm_item{
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        padding-right: 10px;
        text-align: left;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .tag{
            float: right
        }
    }
    .alarm_item:last-child{
        margin-bottom: 0
    }

}
.lineChartGurad{
    width: 100%;
    height: calc((100vh / 4) - 45px);
}
.info{
    line-height: 30px;
    span{
        display: inline-block;
    }
    .info-l{
        width: 50%
    }
}
.personInfo{
    // position: absolute;
    // top: calc(25vh - 90px);
}
// /deep/.el-carousel__container{
//     .el-image{
//         height:calc(25vh - 90px)
//     }
// }
.over{
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    height: calc((100vh / 4) - 45px);
    background-color: rgba(255,0,0,0);
}
</style>