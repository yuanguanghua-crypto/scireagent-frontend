    
<template>
<div class="echart-box">
    <div v-for="(item,index) in videoUrl" :key="index" class="video-js">
        <VideoPreview ref="videoPreview"></VideoPreview>
    </div>
</div>
</template>
<script>
import VideoPreview from "@/components/tableVideo/video/index.vue"
import { getLiveStreamList} from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    props: {
    },
    components: {
        VideoPreview
    },
    data() {
        return {
            player: null,
            videoUrl: [],            
            id: [0,1,2,3,4],
        };
    },
    watch: {
        // www() {  // 监听url，动态修改video的src
        //     this.updateUrl()
        // }
    },
    mounted() {
        this.getVideoUrl()
        // this.init()
    },
    // 离开页面销毁视频播放器
    beforeDestroy() {
        if (this.player != null) {
            this.player.dispose() // dispose()会直接删除Dom元素
        }
    },
    methods: {
        // 
        getVideoUrl(){
            var http = window.location.protocol
            let prams = {
                protocol: http=='http:'?'ws':'wss'
            }
            getLiveStreamList(prams).then((res) => {
                if(res.code == 1000){
                    console.log(res.data)
                    this.videoUrl = res.data
                    setTimeout(()=>{
                        this.init(res.data)
                    },3000)
                }
            });
        },


        init(data) {

        },
        //  修改video的src
        updateUrl() {

        },

    }
}
</script>
<style lang="less" scoped>
.echart-box{
    position: relative;
    .btn-cok{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9999;
        width: 100%;
        color: #fff;
        text-align: center;
        span{
            margin-right: 10px
        }
    }
}
.video-js{
    display:inline-block;
    width: 19%;
    float: right;
    height: 23%;
    margin-bottom: 1.55%;
    .video-item{
        height: 100%;
        width: 100%;
    }
}
.video-js:first-child{
    height: 100%;
    width: 80%;
    float:left;
    margin-bottom: 0%;
}

.video-js:last-child{
    margin-bottom: 0%;
}
</style>