    
<template>
<div class="echart-box">
    <div v-for="(item,index) in videoUrl" :key="index" class="video-js">
        <video :id="'myPlayer'+index" style="width: 100%;height: 100%;" class="video-js vjs-default-skin" preload="auto">
            <!-- <source src="rtsp://8.140.174.140:8045/s1" type="application/x-mpegURL"> -->
            <source :src="item.url" type="application/x-mpegURL">                          
            <!-- 勿删 -->
            <!-- <source :src="url" :type="url.endsWith('m3u8')?'application/x-mpegURL':url.endsWith('mp4')?'video/mp4':''"> -->                          
            <!-- <source :src="url"> -->
        </video>
    </div>




</div>
</template>
<script>
// import videojs from 'video.js'
import { getLiveStreamList} from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    props: {
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
            //初始化视频方法 循环列表获取每个视频的id
            let _this = this
            data.map((item,i)=>{
                let myPlayer = _this.$video('myPlayer'+ i, {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //自动播放属性,muted:静音播放
                    autoplay: "muted",
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "800px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "400px",
                    //封面图
                    // poster:item.pic,
                    // controls: true,
                    // autoplay: false,
                    // preload: false,
                    fluid: true, // 自适应宽高
                    controlBar: {
                        // 设置控制条组件
                        currentTimeDisplay: true,
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        volumePanel: {
                            inline: false
                        },
                        children: [
                            { name: 'playToggle' }, // 播放/暂停按钮
                            { name: 'currentTimeDisplay' }, // 视频当前已播放时间
                            { name: 'progressControl' }, // 播放进度条
                            { name: 'durationDisplay' }, // 视频播放总时间
                            { // 倍速播放
                                name: 'playbackRateMenuButton',
                                playbackRates: [0.5, 1, 1.5, 2, 2.5]
                            },{
                                name: 'volumePanel', // 音量控制
                                inline: false // 不使用水平方式
                            },
                            { name: 'FullscreenToggle' } // 全屏
                        ]
                    },
                    // 、、、、、、、


                });
            })
            // let _this = this
            // for (let i = 0; i < data.length; i++) {
            //     // console.log(this.player)
            //     _this.player = videojs(
            //         data[i],
            //         {
            //             controls: true,
            //             autoplay: false,
            //             preload: false,
            //             fluid: true, // 自适应宽高
            //             controlBar: {
            //                 // 设置控制条组件
            //                 currentTimeDisplay: true,
            //                 timeDivider: true,
            //                 durationDisplay: true,
            //                 remainingTimeDisplay: false,
            //                 volumePanel: {
            //                     inline: false
            //                 },
            //                 children: [
            //                     { name: 'playToggle' }, // 播放/暂停按钮
            //                     { name: 'currentTimeDisplay' }, // 视频当前已播放时间
            //                     { name: 'progressControl' }, // 播放进度条
            //                     { name: 'durationDisplay' }, // 视频播放总时间
            //                     { // 倍速播放
            //                         name: 'playbackRateMenuButton',
            //                         playbackRates: [0.5, 1, 1.5, 2, 2.5]
            //                     },{
            //                         name: 'volumePanel', // 音量控制
            //                         inline: false // 不使用水平方式
            //                     },
            //                     { name: 'FullscreenToggle' } // 全屏
            //                 ]
            //             }
            //         },
            //         function() {
            //             this.play() // 自动播放
            //         }
            //     );
            // }
            player.src(url);
            player.on("ended", () => {
                //播放完成
            })
            for (let i = 0; i < data.length; i++) {
                this.player[i].dispose()
            }
            // // 播放器初始化
            // this.player = videojs(this.id, {
            //     bigPlayButton: false,
            //     textTrackDisplay: false,
            //     posterImage: false,
            //     errorDisplay: false,
            //     controlBar: {  //总控制条
            //         //这里可以自己控制各小组件的顺序和显示方式
            //         children: [
            //         { name: 'playToggle' }, // 播放按钮
            //         { name: 'currentTimeDisplay' }, // 当前已播放时间
            //         { name: 'progressControl' }, // 播放进度条
            //         { name: 'durationDisplay' }, // 总时间
            //         { name: 'audioTrackButton' },
            //         { // 倍数播放
            //             name: 'playbackRateMenuButton',
            //             'playbackRates': [0.5, 1, 1.5, 2, 2.5]
            //         },
            //         {
            //             name: 'volumePanel', // 音量控制
            //             // inline: false, // 不使用水平方式
            //         },
            //         ],
            //         PictureInPictureToggle: true,  //画中画
            //         FullscreenToggle: true // 全屏
            //     },
            //     controls: true, //是否显示控件
            //     loop:true, //循环播放
            //     muted: true //静音模式 、、 解决首次页面加载播放。
            // }, function () {
            // this.play() // 自动播放
            // })
        },
        //  修改video的src
        updateUrl() {
            this.player.src(this.videoUrl)
            this.player.play()
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