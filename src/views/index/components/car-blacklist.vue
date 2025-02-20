
<template>
<div class="box">
    <!-- 实时抓拍 -->
    <div class="warning-box" v-for="item in dataArr">
        <el-row :gutter="20">
            <el-col :span="8">
                <img v-if="item.picBase64" class="el-image" :src="getBaseImgs(item.picBase64)" alt="暂无图片"></img>
                <div v-else class="el-image" style="text-align:center">
                    <img :src="urlNo" alt="" style="width:60px;height:60px; margin-top: 30px"></img>
                </div>
            </el-col>
            <el-col :span="16">
                <ul style="padding:5px 0">
                    <li class="alarm_item">车牌号：{{getPlate(item.extend)}}</li>
                    <li class="alarm_item">时间：{{item.createTime}}</li>
                    <li class="alarm_item" :title="item.channelName">抓拍通道：{{item.channelName}}</li>
                </ul>
            </el-col>
        </el-row>
    </div>
</div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import { realtimeSnapshotTable } from '@/api/v3/largeScreen/set.js';
import { findDictItem } from '@/api/v3/base_data/wordbook.js';
import { warningQuery } from '@/api/v3/even/warning.js'
import bus from '@/utils/bus';
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
            urlNo: require('../img/null.png')
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
        getPlate(val){
            if(val){
                let arr = JSON.parse(val)
                return arr.plate
            }
        },
        initData(){
            let _params = {
                pageNum: 1,
                pageSize: 3,
                eventClassify: ["1", "5", "8"],
                sourceCode: "car_balcklist",
                triggerLink: 1
            }
            warningQuery(_params).then(res =>{
                if(res.code == 1000){
                    this.dataArr = res.data.list || []
                }
            })
        },
        getPersonName(val){
            var name = '陌生人'
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
            if(msgParam.sourceCode == 'car_blacklist'){
                this.initData();
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
    margin-bottom: 23px;
    .el-image{
        height: 13.8vh;
        width:100%;
        line-height: 13.6vh;
        text-align: center;
    }
    .alarm_item{
        height: 3.3vh;
        line-height: 3.3vh;
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
.blackList{
    color: #909399;
}
.whiteList{
    color: #E6A23C;
}
.stranger{
    color: #F56C6C;
}
.publiceUser{
    color: #409EFF;
}
</style>