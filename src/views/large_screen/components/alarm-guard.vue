<template>
<div class="box">
    <!-- 通行记录 -->    
    <!-- <vue-seamless-scroll :data="dataArr" class="seamless-warp" :class-option="classOption"> -->
        <div class="warning-box" v-for="(item,index) in dataArr" :key="index">
            <el-row :gutter="20">
                <el-col :span="8">
                    <img class="el-image" v-if="item.recordImage" :src="getBaseImgs(item.recordImage)"></img>
                    <img class="el-image" v-else-if="item.passType == 1" :src="url_04"></img>
                    <img class="el-image" v-else-if="item.passType == 2" :src="url_02"></img>
                    <img class="el-image" v-else-if="item.passType == 3" :src="url_01"></img>                    
                    <img class="el-image" v-else-if="item.passType == 4" :src="url_03"></img>
                    <div v-else class="el-image" style="text-align:center">
                        <img :src="urlNo" alt="" style="width:60px;height:60px; margin-top: 30px"></img>
                    </div>
                </el-col>
                <el-col :span="16">
                    <ul>
                        <!-- -- danger  success -- -->
                        <li class="alarm_item">开门方式：{{accessTypeRender(item.passType)}}
                            <!-- <el-tag effect="dark" class="tag">{{getPersonName(item.personType)}}</el-tag> -->
                        </li>
                        <li class="alarm_item">姓名：{{item.personName?item.personName:'--'}}</li>
                        <li class="alarm_item">时间：{{ getTimeFormat(item.createTime)}}</li>
                        <li class="alarm_item">抓拍通道：{{item.channelName}}</li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    <!-- </vue-seamless-scroll> -->

</div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import { accessRecordTable } from '@/api/v3/largeScreen/set.js';
import { findDictItem } from '@/api/v3/base_data/wordbook.js';
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
            dataArr: [],
            typeList: [],
            url_01: require('../img/m_01.png'),
            url_02: require('../img/m_02.png'),
            url_03: require('../img/m_03.png'),
            url_04: require('../img/m_04.png'),
            urlNo: require('../img/null.png'),
            accessTypes: [],
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
    watch: {},
    created() {
        bus.$on('WsPushGuard', this.appendWarning)
    },
    mounted() {
        this.getWordBook();
        this.initData();
    },
    beforeDestroy() {
        bus.$off('WsPushGuard', this.appendWarning)
    },
    methods: {
        getTimeFormat(val){
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        },
        initData(){            
            // let params = {
            //     passType: '3'
            // }     
            accessRecordTable().then(res =>{
                if(res.code == 1000){
                    this.dataArr = res.data || []
                }
            })
        },
        // 通行类型字典项转换
        accessTypeRender(type){
            let name = '--';
            this.accessTypes.filter((item)=>{
                if(item.code==type) {
                    name=item.name;
                }
            })
            return name;
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
        // =========================================================
        appendWarning(msgParam) {            
            console.log('--推送---门禁-----------',msgParam);
            if(msgParam){
                let msgParams = {}
                msgParams.passType = msgParam.passType    
                msgParams.recordImage = msgParam.recordImage            
                msgParams.createTime = msgParam.passTime
                msgParams.personName = msgParam.personName
                msgParams.channelName = msgParam.channelName
                this.dataArr.unshift(msgParams)
                this.dataArr.pop()
            }
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
    overflow: hidden
}
.warning-box{
    border: 1px solid rgba(0, 38, 88, 0.50);
    margin-bottom: 2vh;
    .el-image{
        height: 14vh;
        width: 100%
    }
    .alarm_item{
        height: 3.5vh;
        line-height: 3.5vh;
        font-size: 14px;
        padding-right: 10px;
        text-align: left;
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