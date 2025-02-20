
<template>
<div class="box">
    <!-- 实时抓拍 -->
    <div class="warning-box" v-for="item in dataArr">
        <el-row :gutter="20">
            <el-col :span="10">
                <img v-if="item.objPicUrl" class="el-image" :src="getBaseImg(item.objPicUrl)" alt="暂无图片"></img>
                <div v-else class="el-image" style="text-align:center">
                    <img :src="urlNo" alt="" style="width:60px;height:60px; margin-top: 30px"></img>
                </div>
            </el-col>
            <el-col :span="14">
                <ul style="padding:5px 0">
                    <li class="alarm_item">车牌号码：{{ item.plate?item.plate:'--' }}({{ getPlateColor(item.plateColor) }})</li>
                    <li class="alarm_item">车辆朝向：{{ getOrientation(item.orientation) }}</li>
                    <li class="alarm_item">车辆颜色：{{ getColor(item.color) }}</li>
                    <li class="alarm_item">车牌类型：{{ getPlateType(item.plateType) }}</li>
                    <li class="alarm_item">车辆类型：{{ getType(item.type) }}</li>                    
                    <li class="alarm_item">抓拍时间：{{ item.createTime }}</li>
                    <li class="alarm_item">抓拍通道：{{ item.channelName }}</li>
                </ul>
            </el-col>
        </el-row>
    </div>

</div>
</template>
<script>
import { carCaptureRecord } from '@/api/v3/largeScreen/set.js';
import { querywordbook } from '@/api/v3/common.js';
import dayjs from 'dayjs';
import { getBaseImg } from '@/utils/mUtils';
import bus from '@/utils/bus';
export default {
    name: 'echartBar',
    components: {},
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
                limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 1, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            },
            typeArr: [],
            colorArr: [],
            plateColorArr: [],
            plateTypeArr: [],
            orientationArr: [],
        };
    },
    watch: {}, 
    created() {
        bus.$on('WsPushCar', this.appendWarning)
    },
    mounted() {
        this.getWordbook();
        this.initData();
    },
    beforeDestroy() {
        bus.$off('WsPushCar', this.appendWarning)
    },
    methods: {
        async getWordbook() {
            let car_color = await querywordbook({ code: 'car_color' });
            let car_type = await querywordbook({ code: 'car_type' });
            let plate_color = await querywordbook({ code: 'plate_color' });
            let plate_type = await querywordbook({ code: 'plate_type' });
            let car_orientation = await querywordbook({ code: 'car_orientation' });            
            this.plateTypeArr = plate_type.data || []
            this.orientationArr = car_orientation.data || []
            this.typeArr = car_type.data || []
            this.plateColorArr = plate_color.data || []
            this.colorArr = car_color.data || []
        },
        initData(){
            let _params = {
                total: 2
            }
            carCaptureRecord(_params).then(res =>{
                if(res.code == 1000){
                    this.dataArr = res.data || []
                }
            })
        },
        getBaseImg(val){
            return getBaseImg(val);           
        },
        // =========================================================
        appendWarning(msgParam) {            
            this.initData();
            // let data = {}
            // data.objPicUrl = msgParam.record_image
            // data.plate = msgParam.vehicle_plate_no
            // data.type = msgParam.type
            // data.color = msgParam.color
            // data.channelName = msgParam.channelName
            // this.dataArr.unshift(data)              
        },
        getType(val) {
            let _res = this.typeArr.filter((item) => {
                if (item.code == val) {
                    return item
                }
            })
            return _res.length ? _res[0].name : '--'
        },
        getColor(id) {
            let _res = this.colorArr.filter((item) => {
                if (item.code == id) {
                    return item
                }
            })
            return _res.length ? _res[0].name : '--'
        },
        getPlateColor(id) {
            let _res = this.plateColorArr.filter((item) => {
                if (item.code == id) {
                    return item
                }
            })
            return _res.length ? _res[0].name : '--'
        },
        getSnapTime(val){
            return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
        },
        getOrientation(id) {
            let _res = this.orientationArr.filter((item) => {
                if (item.code == id) {
                    return item
                }
            })
            return _res.length ? _res[0].name : '--'
        },
        getPlateType(id) {
            let _res = this.plateTypeArr.filter((item) => {
                if (item.code == id) {
                    return item
                }
            })
            return _res.length ? _res[0].name : '--'
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
        height: 19vh;
        width: 100%;
        line-height: 15vh;
        margin-top: 1.6vh;
        text-align: center;
    }
    .alarm_item{
        height: 3vh;
        line-height: 3vh;
        font-size: 14px;
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