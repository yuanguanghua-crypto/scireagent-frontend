
<template>
  <div style="height: 100%">
      <div class="TMap" ref="TMap" style="height: 100%"></div>
      <div ref="infoWinContent" class="box-video">
          <div v-if="currentMarker.classify != 3 && currentMarker.classify != 9 && detailData.channelStatus == 1">
              <div>
                  <el-image style="width: 17px; height: 14px; margin-right:10px" :src="url"></el-image>监控摄像头
              </div>
              <div ref="videoCont"  class="videoCont">
                  <template>
                      <div class="videoItem videoItemActive"
                          v-for="(item, index) in videoArr" :key="index" :style="`width:${videoItemWidth}px;height:${videoItemHeight}px`">
                          <jvideo
                             :key="keynum"
                              ref="videoComponent"
                              :channelId="item.channelId"
                              :deviceId="item.deviceId"
                              :deviceChannel="item.deviceChannel"
                              :islive="item.islive"
                              :videoItemWidth="videoItemWidth"
                              :videoItemHeight="videoItemHeight"
                              :index="index"
                              :isFullScreen="isFullScreen"
                              :isplay="item.isplay"
                              :channelName="deviceName"
                          ></jvideo>
                      </div>
                  </template>
              </div>
          </div>
          <div class="info-title">名称：{{ detailData.channelName }}</div>
          <div class="info-title">所在区域：{{ detailData.areaName }}</div>
      </div>       
  </div>
  </div>
  </template>
  <script>
  import Jvideo from './video_preview';
  import loadJS from '@/utils/loadjs'
  import iconOrg from '@/assets/img/ico/icon_Map.png'
  import Mhalfofl from '@/assets/icons/Mhalfofl.png' //半球离线
  import Mhalfonl from '@/assets/icons/Mhalfonl.png' //半球在线
  import MalramHalf from '@/assets/icons/MalramHalf.png' //半球告警
  import Mballofl from '@/assets/icons/Mballofl.png' //球机 离线线
  import Mballonl from '@/assets/icons/Mballonl.png' //球机 在线
  import MalramBall from '@/assets/icons/MalramBall.png' //球机告警
  import MGofl from '@/assets/icons/channelOffline_qt.png' //枪机 离线
  import MGonl from '@/assets/icons/channelOnline_qt.png' //枪机 在线
  import MGalarmonl from '@/assets/icons/channelAlarm_qt.png' //枪机 告警
  import { getOnlinePointList, getPointDetail, findPowderList } from "@/api/webToPc/pc_staticmap.js";
  import { formatDate } from '@/utils/mUtils'
  import bus from '@/utils/bus'
  const iconMap = {
    orgIcon: null,
    alramHalf: null,
    alramBall: null,
    BallOnl: null,
    BallOfl: null,
    halfOnl: null,
    halfOfl: null,
    GOnl: null,
    GOfl: null,
    Galarmonl: null
  }
  function markerIconShow(type, alarm, status) { //类型 是否告警 通道状态
    if(alarm ==1) { //告警
      switch (type) {
        case '1': return iconMap.alramBall // 球机
        case '2': return iconMap.alramHalf // 半球
        default: return iconMap.Galarmonl
      }
    } else if(status==1) {//在线
      switch (type) {
        case '1': return iconMap.BallOnl // 球机
        case '2': return iconMap.halfOnl // 半球
        default: return iconMap.GOnl
      }
    } else { //离线
      switch (type) {
        case '1': return iconMap.BallOfl // 球机
        case '2': return iconMap.halfOfl // 半球
        default: return iconMap.GOfl
      }
    }
  }
  export default {
    name: 'MapOnline',
    props: {
        setStyle: {
            type: String,
            default: function() {
                return '';
            }
        }
    },
    components: { Jvideo },
    data() {
        return {
          keynum:0,
            isbMapShow: true, //是否处在地图模式
            map: null, //地图实例,
            currentMarker: {}, // 当前选中的标点
            markers: [], //标记点集合
            mapMarkers: [],
            detailData: {},
            livePreview: false,
            videoReplay: false,
            markerTimers: {},
            isVoice: false,
            videoVisi: false,
            videoArr: [], // 视频url数据
            videoItemWidth: 245, // 单个视频宽度
            videoItemHeight: 125, // 单个视频高度
            currentSelectedIndex: 0, // 当前选中的分屏
            isSingleVideo: false, // 是否是单屏
            isFullScreen: false, // 是否是外部全屏
            isSwitch: false, // 分屏切换标识位
            deviceName: null,
            url: require('../img/camer.png')
        };
    },
    watch: {
        markers(newVal) {
            let _this = this
            this.map.clearOverLays() // 清除标点
            newVal.forEach(item => {
                const marker = new T.Marker(new T.LngLat(item.longitude, item.latitude), {
                    icon: item.mnodeType === 2 ? iconMap.orgIcon : markerIconShow(item.channelType, item.alarmStatus, item.channelStatus),
                })
                const markerClick = async () => {
                    this.currentMarker = item
                    this.detailData = (await getPointDetail({ areaOrChannelId: item.mnodeId, classifies: null })).data
                    const res = await findPowderList({channelId: item.mnodeId})
                    const powerList = res.data[0] && res.data[0].permissions || []
                    this.livePreview = powerList.includes('live_preview')
                    this.videoReplay = powerList.includes('video_replay')
                    const infoWin = new T.InfoWindow()
                    infoWin.setContent(this.$refs.infoWinContent)
                    marker.openInfoWindow(infoWin)
                     infoWin.addEventListener('clickclose', function () {                        
                         if(item.channelStatus == 1){
                             _this.videoArr = [{
                                 id: '',
                                 deviceId: '',
                                 channelId: '',
                                 deviceChannel: '',       
                                 islive: false,
                                 isplay: 0
                    
                            }];
                             _this.allDisconnect()
                         }
                     })
                    this.openVisi(item);                    
                     
                }
                if (item.mnodeType !== 2) {
                    marker.addEventListener('click', markerClick)                    
                }
                this.map.addOverLay(marker)
                this.mapMarkers.push(marker)
            })
        }
    },
    mounted() {
        const mapInit = () => {
            iconMap.orgIcon = new T.Icon({ iconUrl: iconOrg, iconSize: new T.Point(40, 40) }) //标记点配置
            iconMap.alramHalf = new T.Icon({ iconUrl: MalramHalf, iconSize: new T.Point(40, 40) }) //告警半球
            iconMap.alramBall = new T.Icon({ iconUrl: MalramBall, iconSize: new T.Point(40, 40) }) //告警球机
            iconMap.BallOnl = new T.Icon({ iconUrl: Mballonl, iconSize: new T.Point(40, 40) }) //球机在线
            iconMap.BallOfl = new T.Icon({ iconUrl: Mballofl, iconSize: new T.Point(40, 40) }) //球机离线
            iconMap.halfOnl = new T.Icon({ iconUrl: Mhalfonl, iconSize: new T.Point(40, 40) }) //半球在线
            iconMap.halfOfl = new T.Icon({ iconUrl: Mhalfofl, iconSize: new T.Point(40, 40) }) //半球离线
            iconMap.GOnl = new T.Icon({ iconUrl: MGonl, iconSize: new T.Point(40, 40) }) //枪球在线
            iconMap.GOfl = new T.Icon({ iconUrl: MGofl, iconSize: new T.Point(40, 40) }) //枪机离线
            iconMap.Galarmonl = new T.Icon({ iconUrl: MGalarmonl, iconSize: new T.Point(40, 40) }) //枪机告警
            this.map = new T.Map(this.$refs.TMap, {
                minZoom: 4,
                maxZoom: 18
            })
            this.map.centerAndZoom(new T.LngLat(116.404, 39.915), 5)
            this.map.setStyle(this.setStyle)
            // this.map.setStyle('indigo')
            this.getOnlinePoint()
            bus.$on('WsPushAlarm', this.alarmReceive)
        }
        if ('T' in window) {
            mapInit()
        } else {
            var http = window.location.protocol    
            if(http=='http:'){
                loadJS('http://api.tianditu.gov.cn/api?v=4.0&tk=' + this.$store.state.app.tMapKey, 'tmap')
            }else{
                loadJS('https://api.tianditu.gov.cn/api?v=4.0&tk=' + this.$store.state.app.tMapKey, 'tmap')
            }
            // loadJS('http://api.tianditu.gov.cn/api?v=4.0&tk=' + this.$store.state.app.tMapKey, 'tmap')
            loadJS.ready('tmap', mapInit)
        }
        this.videoArr = [{
            id: '',
            deviceId: '',
            channelId: '',
            deviceChannel: '',
            islive: true,
            isplay: 0
        }];
        document.addEventListener('visibilitychange', this.handleVisiable)
    },
    beforeDestroy() {
        bus.$off('WsPushAlarm', this.alarmReceive)
        Object.keys(key => window.clearTimeout(this.markerTimers[key]))
        document.removeEventListener('visibilitychange', this.handleVisiable)
    },
    methods: {
        handleVisiable(e) {  
            switch(e.target.visibilityState) {
            case 'prerender':
                console.log('网页预渲染，内容不可见')
                break;
            case 'hidden':
                console.log('内容不可见，处理后台、最小化、锁屏状态')
                this.videoArr = [{
                    id: '',
                    deviceId: '',
                    channelId: '',
                    deviceChannel: '',
                    islive: true,
                    isplay: 0
                }];
                this.allDisconnect();
                // alert('警告！你已经离开当前答题页面');
                break;
            case 'visible':
                console.log('处于正常打开')
                this.openVisi(this.currentMarker);
                break;
            }
        },
        // 全部断开
        allDisconnect() {
            var currentComponentInstance = this.$refs['videoComponent'];
                console.log('-0----',currentComponentInstance)
            if(!currentComponentInstance || currentComponentInstance.length == 0) return
            // currentComponentInstance.disconnectName = this.$t('Jvideo.dklj');
            currentComponentInstance[0].disconnect();
        },
        openVisi(val) {            
            if(val.channelStatus == 0){
                this.$message.warning('设备离线');
                return
            }
            this.videoArr[this.currentSelectedIndex].isplay = 1;
            this.videoArr[this.currentSelectedIndex].id = val.id;
            this.videoArr[this.currentSelectedIndex].deviceId = val.deviceId;
            this.videoArr[this.currentSelectedIndex].channelId = val.channelId;
            this.videoArr[this.currentSelectedIndex].deviceChannel = val.deviceId + '' + val.channelId;
            this.videoArr[this.currentSelectedIndex].islive = true;
            this.keynum=this.keynum+1
            this.videoVisi = true;
        },

  
        //通行记录
        trafficRecord(val){
          if(val.classify=='3'){
            this.$router.push({
              params: {
                channelId: val.channelId,
                type:'map'
              },
              name: 'guardControl'
            });
          }
          if(val.classify=='9'){
            this.$router.push({
              params: {
                laneId: val.deviceSn,
                type:'map'
              },
              name: 'accessRecords'
            });
          }   
        },
        // 获取上线的点 接收对象实例
        async getOnlinePoint() {
          this.markers = (await getOnlinePointList({ zoom: 18, classifies: null, areaId: '1' })).data
        },
        // 预览
        previewFun(detailData, marker) {
          detailData.channelStatus = marker.channelStatus
          this.$refs.videoPreview.openVisi(detailData)
        },
        // 回放
        playbackFun(detailData, marker) {
          detailData.channelStatus = marker.channelStatus
          this.$refs.videoPlayBack.openVisi(detailData)
        },
        alarmDetail(val) {
          let endTime = formatDate(new Date());
          let startTime = formatDate(new Date(new Date().getTime() - 1 * 60 * 60 * 1000));
          this.$router.push({
            params: {
              channelId: val,
              time: [startTime, endTime]
            },
            name: 'warning'
          })
        },
        // 告警消息接收处理
        alarmReceive(msgData) {
            // console.log('--推送---地图-----------',msgData);
            return
            const markerIndex = this.markers.findIndex(item => item.mnodeId === msgData.eventSource.channelId)
            if (markerIndex === -1) return
            const markerItem = this.markers[markerIndex]
            markerItem.alarmStatus = 1
            this.mapMarkers[markerIndex].setIcon(markerIconShow(markerItem.channelType, markerItem.alarmStatus, markerItem.channelStatus))
            if (this.markerTimers[markerItem.mnodeId]) {
                window.clearTimeout(this.markerTimers[markerItem.mnodeId])
            }
            this.markerTimers[markerItem.mnodeId] = setTimeout(() => {
                delete this.markerTimers[markerItem.mnodeId]
                markerItem.alarmStatus = 0
                this.mapMarkers[markerIndex].setIcon(markerIconShow(markerItem.channelType, markerItem.alarmStatus, markerItem.channelStatus))
            }, 60 * 1000)
        }
    }
  }
  </script>
  <style lang="less" scoped>
  @import url('~@/common/less/map.less');
  .box-video{
      padding: 15px;
      width: 245px;
      // height: 225px;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      line-height: 35px;
  }
  /deep/ .tdt-infowindow-content-wrapper{
      background: #333949 !important;
  }
  /deep/ .tdt-infowindow-tip {
      background: #333949 !important;
  }
  .info-title{
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
  }
  </style>