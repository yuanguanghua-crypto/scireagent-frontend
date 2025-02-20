
<template>
<div class="echart-box">
    <el-carousel v-if="carousel" :autoplay="autoplay" :interval="interval" 
        :initial-index="initialIndex" :height="height" 
    indicator-position="none" ref="carousel" 
    @change="onChange" style="width:100%; height:calc((100vh / 4) * 2 + 2vh);">
        <el-carousel-item v-for="(item, index) in picArr" :key="index" name="index">
            <el-image v-if="item.type == '1'" :src="getBaseUrl(item.path)" style="width: 100%; height:100%"></el-image>
            <video-player class="video-player vjs-custom-skin" 
                v-else
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @ended="onPlayerEnded($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                ></video-player>
        </el-carousel-item>
    </el-carousel>
    <!-- @play="onPlayerPlay($event)" -->
    <!-- <el-carousel :height="height" style="width:100%; height:calc(100vh / 2.25);" indicator-position="none" :interval="interval">
        <el-carousel-item v-for="(item,index) in picArr" :key="index">
            <el-image v-if="item.type == '1'" :src="getBaseUrl(item.path)" style="width: 100%; height:100%"></el-image>
            <video  ref="videoBox" v-if="item.type == '2'" :src="getBaseUrl(item.path)"class="multimedia" height="430px" width="100%" muted autoplay :loop="true"></video>
        </el-carousel-item>
    </el-carousel> -->    
</div>
</template>
<script>import {getPicVideo} from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            picArr: [],
            height: 'calc(100vh / 4)',
            autoplay: true,
            carousel: false,
            interval: 1000,
            oldInterval: 1000,
            initialIndex: 0, //轮播默认滑动到第一个
            //视频参数
            playerOptions: {
                autoplay: true, //如果true,浏览器准备好时开始回放。实现自动播放，autoplay、muted都设置为true
                muted: true, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: "zh-CN",
                aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: "", //url地址
                    },
                ],
                width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar:{
                  timeDivider:false,
                  durationDisplay:false,
                  remainingTimeDisplay:false,
                  fullscreenToggle:false,
                }
            },
        };
    },
    watch: {},
    created(){
        this.inintData();
    },
    mounted(){},
    methods: {
        onPlayerLoadeddata (player) {
            // 获取资源总时长
            this.duration = player.cache_.duration;
        },
        //监听媒体是否已到达结尾，播放完
        onPlayerEnded (player) {
            let _this = this
            this.autoplay = true;
        },
        // 监听轮播图改变
        onChange (index) {
            let _this = this
            // 如果是视频,就等播放完再进行下一个
            if (this.picArr[index].type == '2') {
                this.$refs.videoPlayer[0].player.src(this.playerOptions["sources"][0]["src"])  // 重置进度条,再次轮播时让视频重新播放
                // this.interval = this.duration * 1000;
                this.interval = 1000
                this.autoplay = false;
            }else{
                this.interval = this.oldInterval
            }
        },
        
        inintData(){
            getPicVideo().then((res) => {
                if(res.code == 1000){
                    let data = res.data
                    this.picArr = data || []
                    this.interval = data[0].time * 1000
                    this.oldInterval = data[0].time * 1000
                    this.carousel = true
                    if(data.length > 0){
                        data.forEach(v => {
                            if(v.type == 2){
                                this.playerOptions.sources[0].src = v.path
                            }
                        });
                    }
                }
            });
        },
        // 图片展示
        getBaseUrl(url){
            let val = ''
            if(url){
                if(url.indexOf('http') != -1){
                    val = url
                }else{
                    val = url
                    // val = window.location.protocol + window.location.host + '/' + url
                }
            }
            return val
        },
    }
}
</script>
<style lang="less" scoped>
@font-face{
  font-family: 'PangMenZhengDao';
  src: url('../font/PangMenZhengDaoBiaoTiTi-1.ttf');
}
.echart-box{
    width: 100%;
    /deep/.el-carousel__container{
        height: 100% !important
    }
}
/deep/.video-js{
    height: 100%!important
}
/deep/.video-js{
    background-color: rgba(0, 41, 102, 0.2)!important
}
/deep/ .video-js .vjs-tech{
  width:auto;
  height: 100%;
}

  /deep/.vjs-custom-skin > .video-js .vjs-big-play-button{
    display: none;
  }
  /deep/.vjs-custom-skin > .video-js .vjs-control-bar{
    display: none;
  }
</style>