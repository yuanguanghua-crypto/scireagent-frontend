<template>
    <div class="box">
        <!-- 安全生产 全部 -->
        <!-- <vue-seamless-scroll class="seamless-warp" :data="dataArr" :class-option="classOption"> -->
            <div class="warning-box">            
                <ul class="warning-box-ul">
                    <li v-for="(item,index) in dataArr" :key="index">
                        <img v-if="item.picBase64" class="el-image" :src="getBaseImg(item.picBase64)" alt=""></img>
                        <div v-else class="el-image" style="text-align:center">
                            <img :src="urlNo" alt="" style="width:60px;height:40px; margin-top: 30px"></img>
                        </div>
                        <p>{{item.sourceName}}</p>
                        <p>时间：{{getTimeFormat(item.createTime)}}</p>
                        <p>
                            <tooltip-over :content="'抓拍通道：'+item.channelName" class="190" refName="tooltipOver"></tooltip-over> 
                        </p>
                    </li>
                </ul>
            </div>
        <!-- </vue-seamless-scroll> -->
    </div>
    </template>
    <script>
    import tooltipOver from './el-tooltip.vue'
    import { aiAlarmAllTable,queryEventSource,aiAlarm } from '@/api/v3/largeScreen/set.js';
    import { findDictItem } from '@/api/v3/base_data/wordbook.js';
    import vueSeamlessScroll from 'vue-seamless-scroll'
    import bus from '@/utils/bus';
    import dayjs from 'dayjs';
    import { getBaseImg } from '@/utils/mUtils';
    export default {
        name: 'echartBar',
        components: {
            tooltipOver
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
                dataArr: [],
                typeList: [],
                urlNo: require('../img/null.png'),
                classOption: {
                    step: 0.5, // 数值越大速度滚动越快
                    limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
                    hoverStop: true, // 是否开启鼠标悬停stop
                    direction: 2, // 0向下 1向上 2向左 3向右
                    openWatch: true, // 开启数据实时监控刷新dom
                    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                    waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
                },
                sourceCode: ['safe_production']
            };
        },
        watch: {},
        created() {
            bus.$on('WsPushAlarm', this.appendWarning)
        },
        mounted() {
            this.getWordBook();
            this.initData();
        },
        beforeDestroy() {
            bus.$off('WsPushAlarm', this.appendWarning)
        },
        methods: {
            getTimeFormat(val){
                return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
            },
            initData(){   
              let params={
                typeList:['safe_production']
              }
                aiAlarm(params).then(res =>{
                    if(res.code == 1000){
                        this.dataArr = res.data || []
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
            },
            // =========================================================
            appendWarning(msgParam) {
                console.log('--推送---安全生产-----------',msgParam);
                if(msgParam.eventSource && msgParam.eventSource.sourceCodeType == 'safe_production'){
                    let msgParams = {}
                    msgParams.sourceName = msgParam.eventSource.eventSourceName
                    msgParams.picBase64 = msgParam.eventSource.alarmPic
                    msgParams.createTime = msgParam.eventSource.alarmTime                
                    msgParams.channelName = msgParam.eventSource.channelName
                    this.dataArr.unshift(msgParams)
                    this.dataArr.pop()
                }                
            },        
            getBaseImg(val){
                return getBaseImg(val)
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
        height: 100%;
        width: 100%;
        overflow: hidden
    }
    /deep/.seamless-warp{
        width: 100%;
        height: 100%;
        div{
            float: left;
            // width: 100% !important;
        }
    }
    .warning-box{
        width: 100%;
        .warning-box-ul{
            display: flex;
            height: calc((100vh / 4) - 35px);
            flex-direction: row;
            // padding-top: 10px;
            width: auto;
            align-items: space-between;
            flex-wrap: wrap;
        }
        li{
            // flex: 2;
            // margin-right: 2%;
            // width: 23%;
            // height: 100%;
            // line-height:3vh;
            // margin-bottom: 10px;
            
            margin: 0 1%;
            width: 23%;
            height: 100%;
            line-height:2.2vh;
            margin-bottom: 10px;
            p{
                white-space:nowrap;
                word-break:break-all;
                word-wrap: break-word;
                text-overflow:ellipsis; 
                overflow:hidden;
            }
        }
        
        .el-image{
            // height: 10.5vh;
            // text-align: center;
            // width:100% !important;
            height: 13.8vh;
            line-height: 14vh;
            text-align: center;
            width:100% !important;
        }
        /deep/.el-image__error{
            background-color: hsla(214, 100%, 17%, 0.8) !important; 
        }
        /deep/.el-image__placeholder{
            background-color: hsla(214, 100%, 17%, 0.8) !important; 
        }
        /deep/.image-slot{
            text-align:center;
            height: 13.5vh;
            line-height: 13.5vh;
            width: 100%;
            background-color: hsla(214, 100%, 17%, 0.8) !important;
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
    
    </style>