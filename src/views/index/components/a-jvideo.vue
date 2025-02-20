    
<template>
<div class="echart-box" v-if="isSwitch">
    <!--  -->
    <div v-for="item in videoFirst" class="videoItem">
        <jvideo
            ref="videoComponent"
            :url="item.subStreamUrl"
            :islive="true"
            :videoItemWidth="videoItemWidth"
            :videoItemHeight="videoItemHeight"
            :index="0"
            :isFullScreen="false"
            :isplay="1"
        ></jvideo>
    </div>
    <div v-for="(item,index) in videoArr" :key="index" :class="index == 0? 'videoItemActive videoBoder': 'videoItemActive'">
        <!-- {{`videoComponent${index+1}`}} -->
        <jvideo
            :ref="`videoComponent${index+1}`"
            :url="item.subStreamUrl"
            :islive="true"
            :videoItemWidth="videoItemWidth"
            :videoItemHeight="videoItemHeight"
            :index="index+1"
            :isFullScreen="false"
            :isplay="1"
        ></jvideo>
    </div>
    <!-- <div v-for="(item,index) in videoArr" :key="index" :class="index == 0? 'videoItem': 'videoItemActive'">
        -- {{item.subStreamUrl}} --
        <jvideo
            :ref="`videoComponent${index}`"
            :url="item.subStreamUrl"
            :islive="true"
            :videoItemWidth="videoItemWidth"
            :videoItemHeight="videoItemHeight"
            :index="index"
            :isFullScreen="false"
            :isplay="1"
        ></jvideo>
    </div> -->


</div>
</template>
<script>
import Jvideo from '../video/video_preview';
import {getLiveStreamList} from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    components: {Jvideo},
    data() {
        return {            
            videoArr: [], // 视频url数据
            isSwitch: false, // 分屏切换标识位
            allVideo: [],
            videoItemWidth: 300, // 单个视频宽度
            videoItemHeight: 100, // 单个视频高度
            timer: null,
            times: 20,
            videoFirst: []
            // curIndex: 0
        };
    },
    watch: {},
    mounted() {
        this.getVideoUrl();
        document.addEventListener('visibilitychange', this.handleVisiable)
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.allDisconnect()
        document.removeEventListener('visibilitychange', this.handleVisiable)
    },
    created() {},
    methods: {
        handleVisiable(e) {  
            switch(e.target.visibilityState) {
            case 'prerender':
                console.log('网页预渲染，内容不可见')
                break;
            case 'hidden':
                console.log('内容不可见，处理后台、最小化、锁屏状态')
                this.videoArr = []
                this.videoFirst = []
                clearInterval(this.timer)
                this.allDisconnect();
                // alert('警告！你已经离开当前答题页面');
                break;
            case 'visible':
                console.log('处于正常打开')
                this.getVideoUrl();
                break;
            }
        },
        // 获取视频流
        getVideoUrl(){
            var http = window.location.protocol
            let prams = {
                protocol: http=='http:'?'ws':'wss'
            }
            getLiveStreamList(prams).then((res) => {
                if(res.code == 1000){
                    this.allVideo = res.data
                    this.videoArr = this.allVideo.slice(0,4)
                    this.videoFirst = this.allVideo.slice(0,1)
                    this.stayTimeArr = res.data.map((v)=> {
                        return v.stayTime
                    })
                    this.isSwitch = true
                    this.videoItemWidth = []
                    if(res.data.length > 0){
                        this.times = res.data[0].stayTime
                        this.setInterTimes();
                    }              
                }
            });
        },
        setTimer(){
            this.setInterTimes();
        },

        // 轮播视频  数据的改变
        setInterTimes(){
            let _this = this
            this.timer = setInterval(function () {
                _this.allDisconnect()
                let newData = _this.setIntervalStayTime()
                _this.videoArr = newData.videoArr
                _this.videoFirst = newData.videoArr.slice(0,1)
                _this.times = newData.times
                setTimeout(() => {
                    _this.allRelink();
                }, 100);
                // console.log('--time=---------------',_this.times)
                clearInterval(_this.timer);
                if (_this.times > 0) {
                    _this.setTimer();
                }
            }, _this.times * 1000);
        },
        setIntervalStayTime(){
            var arr = this.allVideo
            var its = this.stayTimeArr
            arr.push(arr.shift())
            its.push(its.shift())
            this.times = its[0]
            let obj = {
                videoArr: arr.slice(0,4),
                times: this.times
            }
            return obj
        },
        // 全部重连
        allRelink() {
            const num = this.videoArr.length;
            for (let i = 1; i <= num; i++) {
                const currentComponentInstance = this.$refs['videoComponent' + i][0];
                currentComponentInstance.disconnectName = this.$t('Jvideo.cxlj');
                currentComponentInstance.disconnect();
            }
            const currentFirst = this.$refs.videoComponent[0];
            currentFirst.disconnectName = this.$t('Jvideo.cxlj');
            currentFirst.disconnect();
        },
        // 全部断开
        allDisconnect() {
            const num = this.videoArr.length;
            for (let i = 1; i <= num; i++) {
                const currentComponentInstance = this.$refs['videoComponent' + i][0];
                currentComponentInstance.disconnectName = this.$t('Jvideo.dklj');
                currentComponentInstance.disconnect();
                // console.log('已断开')
            }
            const currentFirst = this.$refs.videoComponent[0];
            currentFirst.disconnectName = this.$t('Jvideo.dklj');
            currentFirst.disconnect();
        },
        getInterTimes(){
            if(this.stayTimeArr){
                this.times = this.stayTimeArr[0]
                console.log(this.stayTimeArr)
            }
        },
        // ----------------------------------------------------------------------
    }
}
</script>
<style lang="less" scoped>
.echart-box{
    .videoItem{
        // height: 400px;
        height: calc((100vh / 4) * 2 + 2vh);
        width: 80%;
        float:left;
        margin-bottom: 0%;
    }
    .videoItemActive{
        display:inline-block;
        width: 19%;
        float: right;
        height: calc(((100vh / 4) * 2) / 4);
        margin-bottom: 0.7%;
        .video-item{
            height: 100%;
            width: 100%;
        }
    }
    .videoBoder{
        width:  calc(19% - 2px);
        float: right;
        height: calc(((100vh / 4) * 2) / 4);
        border: 1px solid #3E9DE3;
        box-shadow: 2px 0px 3px 1px #3E9DE3;
    }
    // position: relative;
    // .btn-cok{
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     z-index: 9999;
    //     width: 100%;
    //     color: #fff;
    //     text-align: center;
    //     span{
    //         margin-right: 10px
    //     }
    // }
}
</style>