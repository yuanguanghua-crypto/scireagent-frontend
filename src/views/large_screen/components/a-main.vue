    
<template>
<div class="echart-box">
    <!-- <div ref="mainChart" class="mainChart"></div> -->
    <div class="btn-cok">
        <img class="item_01" :src="urlImg_01" />
        <img class="item_02" :src="urlImg_02" />
        <img class="item_03" :src="urlImg_03" />
        <img class="item_04" :src="urlImg_04" />
        <img class="item_05" :src="urlImg_05" />
        <img class="item_06 appLogo" :src="urlImg_06" />
        <img class="item_07" :src="urlImg_07" />        
        <img class="item_a" :src="urlImg_a" />
        <img class="item_b" :src="urlImg_b" />        
        <img class="item_c" :src="urlImg_c" />        
        <img class="item_d" :src="urlImg_d" />
        <!-- <img class="item_e" :src="urlImg_e" />-->
        <img class="item_f" :src="urlImg_f" />
        <img class="item_g" :src="urlImg_e" />

    </div>
</div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    name: 'echartBar',
    data() {
        return {
            mainChart: null,
            timer: null,
            startAngle: 50,    // 初始旋转角度
            minradius:24,       // 初始缩放尺寸
            radius:24,          // 初始缩放尺寸
            maxradius: 28,      // 初始缩放尺寸
            isBig: true,        // 缩放动画 标识
            allArr: [],
            dataArr: [],
            color: ['#ffffff', '#36fff6', '#ffe93a', '#67f95f'],
            // baseImg: require('../img/lgbgg.gif'.replace('on','off')),
            // baseImg: require('../img/lgbg.png'),
            baseImg: '',
            baseImgsmall: require('../img/abg0.png'),
            baseImgsmalls: require('../img/abg1.png'),
            baseImgsmalla: require('../img/abg2.png'),
            baseImgsmallc: require('../img/abg3.png'),

            urlImg_01: require('../cimg/01.png'),
            urlImg_02: require('../cimg/02.png'),
            urlImg_03: require('../cimg/03.png'),
            urlImg_04: require('../cimg/04.png'),
            urlImg_05: require('../cimg/05.png'),
            urlImg_06: require('../cimg/06.png'),
            urlImg_07: require('../cimg/07.png'),
            urlImg_a: require('../cimg/a.png'),
            urlImg_b: require('../cimg/b.png'),
            urlImg_c: require('../cimg/c.png'),
            urlImg_d: require('../cimg/d.png'),
            urlImg_e: require('../cimg/e.png'),
            urlImg_f: require('../cimg/f.png'),
        };
    },
    watch: {
        // markers(newVal) {
        // }
    },
    mounted() {
        this.initLineEchart();
        // this.draw()
        // this.timer = setInterval(_this.draw, 500);
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        // 
        initLineEchart(){
            let bigImg = [];
            let erArr = [{
                type: 1,
                symbol: 'image://' + this.baseImgsmalla,
                symbolSize: 160,
            },{
                type: 1,
                symbol: 'image://' + this.baseImgsmalls,
                symbolSize: 160,
            },{
                type: 1,
                symbol: 'image://' + this.baseImgsmall,
                symbolSize: 160,
            },{
                type: 1,
                symbol: 'image://' + this.baseImgsmallc,
                symbolSize: 160,
            }];
            let allArr = [...bigImg, ...erArr],
                dataArr = [];
            // 点
            allArr.forEach((el, ind) => {
                if (el.type > 0) {
                    el.symbolSize = 200;
                    el.symbol = el.symbol;
                    el.itemStyle = {
                        color:this.color[el.type],
                    };
                }
            });
            bigImg = this.group(bigImg, 0);
            erArr = this.group(erArr, 41);
            this.allArr = [...bigImg, ...erArr] ;
            // 线坐标和配置
            this.dataArr = this.linesConfig(allArr);
        },
        // 圆形分区
        group(arr, r) {
            const newArray = [];
            const {
                length: arLen
            } = arr;
            arr.forEach((e, ind) => {
                // 按角度均匀分布
                const ang = 135 - (360 / arLen).toFixed(2) * (ind + 1);
                const x = (Math.cos(ang * Math.PI / 180)).toFixed(2) * r;
                const y = (Math.sin(ang * Math.PI / 180)).toFixed(2) * r;
                const x1 = (Math.cos(ang * Math.PI / 180)).toFixed(2) * (r - 5);
                const y1 = (Math.sin(ang * Math.PI / 180)).toFixed(2) * (r - 5);
                const x0 = (Math.cos(ang * Math.PI / 180)).toFixed(2) * (r - 30);
                const y0 = (Math.sin(ang * Math.PI / 180)).toFixed(2) * (r - 30);
                e.value = [x.toFixed(2), y.toFixed(2)]
                e.twoPoint = [[x1.toFixed(2), y1.toFixed(2)], [x0.toFixed(2), y0.toFixed(2)]];
                newArray.push(e);
            });
            return newArray;
        },
        // 线配置
        linesConfig(arr) {
            const [dataArr, targetCoord] = [[],[0, 0]];
            arr.forEach((el) => {
                dataArr.push(this.getFormatItem(el, 0, 1));                      
            });
            return dataArr;
        },
        getFormatItem(el,start, end) {
            let item = [
                {coord: el.twoPoint[start]},// 起点
                {coord: el.twoPoint[end],
                    lineStyle: {
                        color: '#1890FF',
                        // curveness: el.type === 3 ? 0.1 : 0, linear-gradient(to right, transparent, #1890FF)
                    },
                    effect: {
                        color: '#1890FF'
                    }
                }, // 终点
            ]
            return item
        },
        getOption(startAngle, radius) {
            let option = {
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                xAxis: {
                    show: false,
                    type: "value",
                    max: 50,
                    min: -51,
                },                
                yAxis: {
                    show: false,
                    type: "value",
                    max: 50,
                    min: -50,
                },
                graphic: {
                    elements: [
                        {
                            type: 'image',
                            z: 4,
                            style: {
                                image: this.baseImg,
                                width: 400,
                                height: 320,
                            },
                            left: 'center',
                            top: 'top',
                        },
                    ],
                },
                series: [{
                    // 四个图
                    name: "节点",
                    type: "graph",
                    silent: false,
                    hoverAnimation: false, // 鼠标悬浮高亮
                    cursor: 'default',
                    coordinateSystem: "cartesian2d",
                    z: 3,
                    itemStyle: {
                        normal: {
                            shadowColor: "none",
                        },
                    },
                    emphasis: {
                        scale: false
                    },
                    lineStyle: {
                        width: 2,
                        color: 'source',
                        type: 'dashed',
                    },
                    data: this.allArr,
                },
                {
                    name: "线图",
                    type: "lines",
                    hoverAnimation: false,
                    silent: false,
                    cursor: 'default',
                    coordinateSystem: "cartesian2d",
                    polyline: false, // 多线段
                    z: 1,
                    lineStyle: {
                        width: 2,
                        type: 'dashed',
                        curveness: 0,
                    },
                    effect: {
                        show: true,
                        period: 4, //箭头指向速度，值越小速度越快
                        trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: 'arrow', //箭头图标
                        symbolSize: 12
                    },
                    emphasis: {
                        lineStyle: {
                            type: 'dashed',
                        }
                    },
                    data: this.dataArr
                }
            ],
            };
            return option;
        },
        draw() {
            this.mainChart = echarts.init(this.$refs.mainChart);
            this.startAngle = this.startAngle - 5
            if (this.isBig) {
                this.radius = this.radius + 0.5
                if (this.radius > this.maxradius) {
                    this.isBig = false
                }
            } else {
                this.radius = this.radius - 0.5
                if (this.radius < this.minradius) {
                    this.isBig = true
                }
            }
            let option = this.getOption(this.startAngle, this.radius)
            this.mainChart.setOption(option, true);
            window.addEventListener('resize', () => {
                this.mainChart.resize();
            }, false); // false代表事件句柄在冒泡阶段执行
        },
        // ----------------------------------------------------------------------
    }
}
</script>
<style lang="less" scoped>
@-webkit-keyframes moveBox {
    25% {transform: translateY(10px);}
    50%, 100% {transform: translateY(0);}
    75% {transform: translateY(-10px);}
}
@-webkit-keyframes moveAi {
    25% {transform: translateY(4px);}
    50%, 100% {transform: translateY(0);}
    75% {transform: translateY(-4px);}
}
.echart-box{
    position: relative;
    height: calc((100vh / 4) * 2 + 2vh);
    .btn-cok{
        position: absolute;
        top: 0%;
        left: 0%;
        height: 100%;
        width: 100%;
        transition: all 5s;
        // background-image: url('../cimg/00.png');
        // background-size: 100% 100%;
        .item_a{
            position: absolute;
            top: 14%;
            left: 12.3%;
            width: 10%;
            height: 21%;
            -webkit-animation: moveAi 3s linear infinite;
        }
        .item_b{
            position: absolute;
            top: 14%;
            right: 11%;
            width: 13%;
            height: 19%;
            -webkit-animation: moveAi 3s linear infinite;
        }
        .item_c{
            position: absolute;
            bottom: 12%;
            right: 13%;
            width: 10%;
            height: 21%;
            -webkit-animation: moveAi 3s linear infinite;
        }
        .item_d{
            position: absolute;
            bottom: 10%;
            left: 13.7%;
            width: 10%;
            height: 21%;
            -webkit-animation: moveAi 3s linear infinite;
        }
        .item_e{            
            position: absolute;
            bottom: -3%;
            left: 5%;
            width: 91%;
            height: 80%;
            z-index: 7;
            -webkit-animation: moveAi 3s linear infinite;
        }
        .item_f{
            position: absolute;
            bottom: -2%;
            left: 5%;
            width: 91%;
            height: 80%;
            z-index: 7;
            -webkit-animation: moveAi 3s linear infinite;
        }        
        .item_g{            
            position: absolute;
            bottom: -4%;
            left: 5%;
            width: 91%;
            height: 80%;
            z-index: 7;
            -webkit-animation: moveAi 3s linear infinite;
        }
        // .item_g{
        //     position: absolute;
        //     top: 14%;
        //     right: 11%;
        //     width: 13%;
        //     height: 19%;
        //     -webkit-animation: moveAi 3s linear infinite;
        // }
        // .item_h{position: absolute;
        //     bottom: 10%;
        //     left: 13.7%;
        //     width: 10%;
        //     height: 21%;
        //     -webkit-animation: moveAi 3s linear infinite;
        // }
        .item_01{
            position: absolute;
            top: 10%;
            left: 34.5%;
            width: 28.5%;
            height: 23%;
            -webkit-animation: moveBox 2s linear infinite;
        }        
        .item_02{
            position: absolute;
            top: 18%;
            left: 27%;
            width: 10%;
            height: 15%;
            -webkit-animation: moveBox 3s linear infinite;
        }
        .item_03{
            position: absolute;
            top: 17%;
            right: 24%;
            width: 11%;
            height: 40%;
            -webkit-animation: moveBox 5s linear infinite;
        }
        .item_04{
            position: absolute;
            top: 20%;
            left: 35.5%;
            width: 29%;
            height: 41%;
            z-index: 2;
            -webkit-animation: moveBox 4s linear infinite;
        }
        .item_05{
            position: absolute;
            bottom: 38.5%;
            left: 36%;
            width: 28%;
            height: 40%;
            z-index: 2;
        }
        .item_06{
            position: absolute;
            top: 20%;
            left: 29%;
            width: 42%;
            height: 21%;
            z-index: 5;
            -webkit-animation: moveBox 5s linear infinite;
        }
        .item_07{
            position: absolute;
            bottom: 0%;
            left: 7.5%;
            width: 85%;
            height: 90%;
            z-index: 0;
        }
    }
}
.mainChart{
    width: 100%;
    // height: 400px;
    height: calc((100vh / 4) * 2 + 2vh);
}


.line-box{
    position: absolute;
    height: calc((100vh / 2) - 55px); 
    width: 100%;
    .line-one {
        position: absolute;
        top: 10vh; // 位置上偏移
        left: 10vw; // 位置左偏移
        width: 10vw; // 线的长度
        height: 32px; // 线的宽度
        transform-origin: left bottom;
        z-index: 10;
        transform: rotateZ(32.8deg); // 线的旋转角度
    }
    .line-two {
        position: absolute;
        top: 11vh; // 位置上偏移
        right: 10vw; // 位置左偏移
        width: 10vw; // 线的长度
        height: 32px; // 线的宽度
        transform-origin: right bottom;
        z-index: 0;
        transform: rotateZ(-32.6deg); // 线的旋转角度
    }
    .line-three {
        position: absolute;
        top: 30vh; // 位置上偏移
        right: 10vw; // 位置左偏移
        width: 10vw; // 线的长度
        height: 32px; // 线的宽度
        transform-origin: right top;
        z-index: 10;
        transform: rotateZ(12deg); // 线的旋转角度
    }
    .line-four {
        position: absolute;
        top: 35vh; // 位置上偏移
        left: 8vw; // 位置左偏移
        width: 10vw; // 线的长度
        height: 32px; // 线的宽度
        transform-origin: left top;
        z-index: 10;
        transform: rotateZ(-20deg); // 线的旋转角度
    }
    .line-one-item::before {
        content: "";
        position: absolute;
        height: 32px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
        width: 100px; // 流体路线长度，最好与线保持一致
        background: linear-gradient(to right, transparent, #1890FF); // 流体样式，这里是渐变
        animation: fade-right 2s linear infinite; //使用fade-left动画
    }
    .line-two-item::before {
        content: "";
        position: absolute;
        height: 32px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
        width: 100px; // 流体路线长度，最好与线保持一致
        background: linear-gradient(to left, transparent, #1890FF); // 流体样式，这里是渐变
        animation: fade-left 2s linear infinite; //使用fade-left动画
    }
    .line-three-item::before {
        content: "";
        position: absolute;
        height: 32px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
        width: 100px; // 流体路线长度，最好与线保持一致
        background: linear-gradient(to left, transparent, #1890FF); // 流体样式，这里是渐变
        animation: fade-left 2s linear infinite; //使用fade-left动画
        background-image: linear-gradient(to left,-135deg, transparent 15px, #1890FF 0), linear-gradient(to left,135deg, transparent 15px, #1890FF 0);
        background-size: 100% 100%;

        background-repeat: no-repeat;

        background-position: right center,left center;
    }
    .line-four-item::before {
        content: "";
        position: absolute;
        height: 32px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
        width: 100px; // 流体路线长度，最好与线保持一致
        background: linear-gradient(to right, transparent, #1890FF); // 流体样式，这里是渐变
        animation: fade-right 2s linear infinite; //使用fade-left动画
    }
}

.top-l-line-left::before {
    content: "";
    position: absolute;
    height: 3px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
    width: 100px; // 流体路线长度，最好与线保持一致
    background: linear-gradient(to right, transparent, #fff); // 流体样式，这里是渐变
    animation: fade-right 2s linear infinite; //使用fade-left动画
    // box-shadow: 0px 0px 10px 2px #fff; // 外发光
}
// .top-r-line-right::before {
//     content: "";
//     position: absolute;
//     height: 3px; // 流体的宽度，可以适当宽一些，但是注意位置偏移
//     width: 100px; // 流体路线长度，最好与线保持一致
//     background: linear-gradient(to left, transparent, #fff); // 流体样式，这里是渐变
//     animation: fade-left 2s linear infinite; //使用fade-left动画
//     // box-shadow: 0px 0px 10px 2px #fff; // 外发光
// }

// 向左流动，right改left为向右流动
@keyframes fade-left {
    0% {
        right: 0px;
        opacity: 0.1;
    }
    10% {
        opacity: 0.2;
    }
    20% {
        opacity: 0.3;
    }
    30% {
        opacity: 0.4;
    }
    40% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.6;
    }
    60% {
        opacity: 0.7;
    }
    70% {
        opacity: 0.8;
    }  
    80% {
        opacity: 0.9;
    }
    90% {
        opacity: 0.5;
    }
    100% {
        right: calc(100% - 100px); // 到达终点时位置要减去自身的长度
        opacity: 0;
    }
}
@keyframes fade-right {
    0% {
        left: 0px;
        opacity: 0.1;
    }
    10% {
        opacity: 0.2;
    }
    20% {
        opacity: 0.3;
    }
    30% {
        opacity: 0.4;
    }
    40% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.6;
    }
    60% {
        opacity: 0.7;
    }
    70% {
        opacity: 0.8;
    }  
    80% {
        opacity: 0.4;
    }
    90% {
        opacity: 0.1;
    }
    100% {
        left: calc(100% - 100px); // 到达终点时位置要减去自身的长度
        opacity: 0;
    }
}

</style>