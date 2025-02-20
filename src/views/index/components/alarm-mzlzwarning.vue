<template>
<div class="box">
    <!--  智能告警-明厨亮灶 全部 -->
    <!-- <vue-seamless-scroll :data="dataArr" class="seamless-warp" :class-option="classOption"> -->
        <div class="warning-box">            
            <ul class="warning-box-ul">
                <li v-for="(item,index) in dataArr" :key="index">
                    <img v-if="item.picBase64" class="el-image" :src="getBaseImg(item.picBase64)" alt="暂无图片"></img>
                    <div v-else class="el-image" style="text-align:center">
                        <img :src="urlNo" alt="" style="width:60px;height:60px; margin-top: 30px"></img>
                    </div>
                    <p>{{item.sourceName}}</p>
                    <p style="font-size:11px">时间：{{getTimeFormat(item.createTime) }}</p>
                    <p style="font-size:11px">
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
import { aiAlarmBrightKitchenTable } from '@/api/v3/largeScreen/set.js';
import { findDictItem } from '@/api/v3/base_data/wordbook.js';
import bus from '@/utils/bus';
import dayjs from 'dayjs'
import { getBaseImg } from '@/utils/mUtils';
export default {
    name: 'echartBar',
    components: {
        tooltipOver
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
            sourceCode: ['bright_kitchen']
        };
    },
    watch: {},
    created() {
        bus.$on('WsPushAlarm', this.appendWarning)
    },
    mounted() {
        // this.getWordBook();
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
            aiAlarmBrightKitchenTable().then(res =>{
                if(res.code == 1000){
                    this.dataArr = res.data || []
                }
            })
        },
        // getPersonName(val){
        //     var name = ''
        //     if(val){
        //         this.typeList.filter(item => {
        //             if (item.code == val) {
        //                 name = item.name;
        //             }
        //         })
        //     }
        //     return name;
        // },
        // 字典数据
        async getWordBook() {
            let typeList = await findDictItem({code: 'person_types'});
            this.typeList = typeList.data;
        },
        // =========================================================
        appendWarning(msgParam) {            
            console.log('--推送---明厨亮照-----------',msgParam.eventSource);
            if(msgParam.eventSource && msgParam.eventSource.sourceCodeType == 'bright_kitchen'){
                msgParam.sourceName = msgParam.eventSource.eventSourceName
                msgParam.createTime = msgParam.eventSource.alarmTime                
                msgParam.channelName = msgParam.eventSource.channelName
                msgParams.picBase64 = msgParam.eventSource.alarmPic
                this.dataArr.unshift(msgParam)
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
        width: 200% !important;
    }
}
.warning-box{
    width: 100%;
    .warning-box-ul{
        height: calc((100vh / 4) - 35px);
        width: auto;
    }
    li{
        margin: 0 1%;
        width: 23%;
        height: 100%;
        line-height:2.2vh;
        margin-bottom: 10px;
        float: left;
        p{
            white-space:nowrap;
            word-break:break-all;
            word-wrap: break-word;
            text-overflow:ellipsis; 
            overflow:hidden;
        }
        
    }    
    .el-image{
        height: 13vh;
        line-height: 13vh;
        text-align: center;
        width:100% !important;
    }
    // /deep/.el-image__error{
    //     height:125px;
    //     width:100% !important;
    // }
    /deep/.el-image__error{
        background-color: hsla(214, 100%, 17%, 0.8) !important; 
    }
    /deep/.el-image__placeholder{
        background-color: hsla(214, 100%, 17%, 0.8) !important; 
    }
    /deep/.image-slot{
        text-align:center;
        height: 125px;
        line-height: 125px;
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
.tooltip {
    position: relative;
    font-size: 14px;
    cursor: pointer;
}

.tooltip::before {
    word-break: keep-all;
    white-space: nowrap;
    content: attr(data-msg);
    position: absolute;
    padding: 2px 6px;
    display: block;
    color: #333;
    border: 1px solid #333;
    border-radius: 5px;
    font-size: 14px;
    line-height: 20px;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
}
.tooltip::after {
    content: "﹀";
    position: absolute;
    top: -8px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #fff;
    height: 7px;
    line-height: 13px;
}
</style>