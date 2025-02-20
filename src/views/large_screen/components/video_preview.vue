<template>
    <div class="maincont">
        <div
            :id="`container${index}`"
            ref="container"
            class="p_container"
            :style="`width:${videoItemWidth}px;height:${videoItemHeight}px;`"
        ></div>
    </div>
</template>

<script>
import { getLivestream } from '@/api/webToPc/pc_staticmap.js';
import { getvideoconfig } from '@/api/v3/video/replayvideo.js';
import videoloading from '@/components/video/components/videoloading.vue';
import Vue from 'vue';
import dayjs from 'dayjs'
export default {
    props: [
        'islive',
        'end_time',
        'videoItemWidth',
        'videoItemHeight',
        'index',
        'isFullScreen',
        'deviceId',
        'channelId',
        'deviceChannel',
        'isplay',
        'channelName'
    ],
    data() {
        return {
            playUrl: '',
            deviceIdc: this.deviceId,
            channelIdc: this.channelId,
            channelNamec: this.channelName,
            deviceChannelc: this.deviceChannel,
            islivePlay: this.islive,
            end_timew: this.end_time,
            value3: 0,
            player: null,
            consecutiveScreenshotsing: false, //连续抓图标志位,
            setRecordName: this.$t('warning.kqlx'),
            isRecord: false, //是否开启了录像
            h: 0,
            m: 0,
            s: 0,
            disconnectName: this.$t('Jvideo.cxlj'),
            isInstantReplay: false, //即时回放标志位
            jshfzt: true, //即时回放时默认处在播放状态
            isPlaying: false,
            screenshotconfig:null //抓图配置
        };
    },
    watch: {
        deviceChannel(nval, oval) {
            nval != '' && this.playVideo();
        },
        end_time(nval) {
            this.end_timew = nval;
        },
        islive(nval) {
            this.islivePlay = nval;
        }
    },
    async mounted() {
        let Player = jPlayer.default;
        let el = document.querySelector('#container' + this.index);
        let Loading = Vue.extend(videoloading);
        let $loading_vm = new Loading();
        $loading_vm.type = "loading";
        $loading_vm.msg = this.$t('warning.spljz');
        let loading_el = $loading_vm.$mount().$el;
        const options = {
            loading_el_str:loading_el,
            pauseimg_el_str:null,
            msg_el_str:function(){
              let Msg = Vue.extend(videoloading);
              let $msg_vm = new Msg();
              return (type,msg)=>{
                if(type){
                    $msg_vm.type = type;
                }
                if(msg){
                    $msg_vm.msg = msg;
                }
                let msg_el = $msg_vm.$mount().$el;
                return msg_el;
              }
            }
        }
        this.player = new Player(el,options);
        this.player && this.player.volume(0);
        if (this.isplay == 1) {
            this.playVideo();
        }
        // this.playVideo();
        this.player.event.on('GET_MEDIA_PLAY', s => {
            this.isPlaying = true;
            this.disconnectName = this.$t('Jvideo.dklj');
        });
        this.player.event.on('GET_MEDIA_STOP', s => {
            this.isPlaying = false;
            this.disconnectName = this.$t('Jvideo.cxlj');
        });
        this.player.event.on('GET_MEDIA_PAUSE', s => {
            this.isPlaying = false;
            this.disconnectName = this.$t('Jvideo.cxlj');
        });
        // let config = await getvideoconfig()
        // //  抓图配置
        // this.screenshotconfig = config.data.captureConfig
        // this.player.onSnapshot = this.onSnapshot.bind(this);
    },
    methods: {
        // 播放视频
        playVideo() {
            let el = document.querySelector('#container' + this.index);
            let options = {
                url: '',
                endtime: this.islivePlay ? null : this.end_timew,
                isStream: this.islivePlay,
                encrypted_key: '',
                encrypted_iv: '',
                encrypted_type: '',
                language: this.$store.state.app.language
            };
            if (this.deviceChannel == '') {
                return;
            }
            var http = window.location.protocol
            getLivestream({
                channelId: this.channelId,
                streamType: 1,
                protocol: http=='http:'?'ws':'wss'
            }).then(res => {
                this.playUrl = res.data.url;
                options.url = res.data.url;

                if (this.player.getState() == 0) {
                    this.player.play(options);
                } else {
                    this.player.event.once('GET_MEDIA_STOP', () => {
                        setTimeout(() => {
                            this.player.play(options);
                        }, 100);
                    });
                    this.player.stop();
                }
            });
        },
        // 打开or关闭声音
        setVolume(val) {
            if (!(this.player && this.player.getState() == 1)) return;
            if (val == 'open') {
                this.player && this.player.volume(1);
            } else {
                this.player && this.player.volume(0);
            }
        },

        // 清除视频
        clearVideo() {
            if (!(this.player && this.player.getState() == 1)) return;
            this.player.stop();
            this.playUrl = '';
            this.deviceIdc = '';
            this.channelIdc = '';
            this.deviceChannelc = '';
        },
        // 单屏全屏展示
        fullscreen() {
            if (!(this.player && this.player.getState() == 1)) return;
            this.player.fullscreen();
        },
        // 获取当前视频的播放状态
        getCurrentVideoState() {
            return this.player.getState();
        },
         // 断开连接
        disconnect() {
            if (!this.player) return;
            if (this.disconnectName == this.$t('Jvideo.dklj')) {
                this.player.stop(this.$t('Jvideo.sddksp'),this.$t('Jvideo.sddksp'));
                this.disconnectName = this.$t('Jvideo.cxlj');
            }else if(this.disconnectName == this.$t('Jvideo.cxlj')) {
                this.reconnect()
            }
        },
        // 重新连接
        reconnect(){
            if (!this.player) return;
            this.playVideo();
            this.disconnectName = this.$t('Jvideo.dklj');
        },
    },
    beforeDestroy() {
        this.player.stop();
    }
};
</script>

<style lang="less" scoped>
.maincontP {
    position: absolute;
    z-index: 6000;
    top: 0;
    left: 0;
}
.p_container {
    overflow: hidden;
    position: relative;
    // height: 520px;
    // width: 750px;
    height: 100%;
    width: 100%;
    background: #000;
    // text-align: center;
}
</style>
