
<template>
<div class="echart-box">
    <!-- 设备总览 -->
    <div class="img">
        <!-- <video x5-video-player-type="h5" x5-playsinline="" disablePictureInPicture 
        playsinline="" webkitplaysinline="true" width="70" 
        height="70" autoplay="autoplay" loop  muted="muted"
        src="https://easyv.assets.dtstack.com/data/video/8872/1138652/krlmrsfbq9_1660806097210_cvovvxum4d.webm" 
        poster="" webkit-playsinline="" controlslist="nodownload" 
        style="width: 70px; height: 70px; 
        object-fit: fill;"></video> -->
        <video x5-video-player-type="h5" x5-playsinline="" disablePictureInPicture 
            playsinline="" webkitplaysinline="true" width="70" 
            height="70" autoplay="autoplay" loop  muted="muted"
            poster="" webkit-playsinline="" controlslist="nodownload"
            :src="src"
            style="width: 70px; height: 70px; 
            object-fit: fill;">
            <source :src="src" type="video/webm">
        </video>
    </div>
    <div ref="circleChart" class="circleChart"></div>
</div>
</template>
<script>
import * as echarts from 'echarts';
import { deviceOverview } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            circleChart: null,
            initData: [],
            src: require('../cimg/screen_video.webm')
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.getData();
    },
    beforeDestroy() {
    
    },
    methods: {
        getData(){
            deviceOverview().then(res =>{
                if(res.code == 1000){
                    var name = '摄像头数'
                    var total = res.data.totalOfflineDevice + res.data.totalOnlineDevice
                    var dataArr = [
                        // {name: '摄像头数',value: res.data.totalOfflineDevice + res.data.totalOnlineDevice},
                        {name: '在线数',value: res.data.totalOnlineDevice},
                        {name: '离线数',value: res.data.totalOfflineDevice}
                    ]
                    this.barCategoryGap(name,total,dataArr)
                }
            })
        },
        barCategoryGap(name,total,data){
            this.circleChart = echarts.init(this.$refs.circleChart);
            var titleArr = [],
                seriesArr = [],
                colors = [
                    ['rgba(2, 127, 255, 0.2)', 'rgba(2, 127, 255, 1)'],
                    ['rgba(10, 225, 234, 0.2)', 'rgba(10, 225, 234, 1)'],
                    ['rgba(250, 204, 20, 0.2)', 'rgba(250, 204, 20, 1)'],
                ];

            titleArr.push({
                text: name,
                left: 0 * 30 + 19 + '%',
                top: '80%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '14',
                    color: colors[0][1],
                    textAlign: 'center',
                },
            });
            seriesArr.push({
                name: name,
                type: 'pie',
                clockWise: false,
                radius: [40, 35],
                itemStyle: {
                    normal: {
                        color: colors[0][0],
                        borderRadius: "50%",
                        shadowColor: colors[0][0],
                        shadowBlur: 20,
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                    },
                },
                hoverAnimation: false,
                center: [0 * 30 + 19 + '%', '45%'],
                data: [
                    {
                        value: 0,
                        label: {
                            normal: {
                                formatter: function (params) {
                                    return total;
                                },
                                position: 'center',
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold',
                                    color: colors[0][1],
                                },
                            },
                        },
                    },
                    {
                        value: total,
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: colors[0][1],
                            },
                            emphasis: {
                                color: colors[0][1],
                            },
                        },
                    },
                ],
            });
            data.forEach(function (item, inx) {
                let index = inx + 1
                titleArr.push({
                    text: item.name,
                    left: index * 30 + 19 + '%',
                    top: '80%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '14',
                        color: colors[index][1],
                        textAlign: 'center',
                    },
                });
                seriesArr.push({
                    name: item.name,
                    type: 'pie',
                    clockWise: false,
                    radius: [40, 35],
                    itemStyle: {
                        normal: {
                            color: colors[index][1],
                            borderRadius: "50%",
                            shadowColor: colors[index][0],
                            shadowBlur: 0,
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                        },
                    },
                    hoverAnimation: false,
                    center: [index * 30 + 19 + '%', '45%'],
                    data: [
                        {
                            value: item.value,
                            label: {
                                normal: {
                                    formatter: function (params) {
                                        return params.value;
                                    },
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color: colors[index][1],
                                    },
                                },
                            },
                        },
                        {
                            value: total - item.value,
                            name: 'invisible',
                            itemStyle: {
                                normal: {
                                    color: colors[index][0],
                                },
                                emphasis: {
                                    color: colors[index][0],
                                },
                            },
                        },
                    ],
                });
            }); 
            var option = {
                title: titleArr,
                series: seriesArr
            };        
            this.circleChart.setOption(option);
            window.addEventListener('resize', () => {
                this.circleChart.resize();  
            }, false); // 
        },
    }
}
</script>
<style lang="less" scoped>
.echart-box{
    position: relative;
    .img{
        position: absolute;
        top: -10px;
        right: -5px;
        z-index: 1000000;
    }
}
.circleChart{
    width: 100%;
    // height: 100%;
    height: calc((100vh / 4) - 45px);
}
</style>