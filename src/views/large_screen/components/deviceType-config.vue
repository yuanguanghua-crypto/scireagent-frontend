
<template>
<div class="echart-box">
    <div class="panelChart">
        <div class="item" v-for="(item,index) in tableArr" :key="index">            
            <div class="item-left item-01" v-if="item.type == '1'">
                <el-image class="lef-pic" :src="star"></el-image>
            </div>
            <div class="item-left item-02" v-if="item.type == '2'">
                <el-image class="lef-pic" :src="star"></el-image>
            </div>
            <div class="item-left item-07" v-if="item.type == '3'">
                <el-image class="lef-pic" :src="star"></el-image>
            </div>
            <div class="item-left item-03" v-if="item.type == '4'">
                <el-image class="lef-pic" :src="star"></el-image>
            </div>
            <div class="item-left item-05" v-if="item.type == '5'">
                <el-image class="lef-pic" :src="star"></el-image>
            </div>
            <div class="item-left item-06" v-if="item.type == '6'">
                <el-image class="lef-pic" :src="star"></el-image>
            </div>
            <div class="item-right">
                <p>{{item.totalOnlineDevice}}/{{item.totalOnlineDevice+item.totalOfflineDevice}}</p>
                <p class="fot12">{{item.typeDesc}}</p>
            </div>

        </div>
    </div>
</div>
</template>
<script>
import { deviceCategory } from '@/api/v3/largeScreen/set.js';
export default {
    name: 'echartBar',
    data() {
        return {
            star: require('../img/star.png'),
            tableArr: []
        };
    },
    watch: {},
    mounted() {
        this.initData();
    },
    beforeDestroy() {
    
    },
    methods: {
        initData(){
            deviceCategory().then(res =>{
                if(res.code == 1000){
                    // console.log(res.data)
                    this.tableArr = res.data.slice(0,6)
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
@font-face{
  font-family: 'PangMenZhengDao';
  src: url('../font/PangMenZhengDaoBiaoTiTi-1.ttf');
}
.panelChart{
    // height: 150px;
    height: calc((100vh / 4) - 45px);
    padding:0 10px;
    .item{
        width: 33%;
        height: 36%;
        float: left;
        padding:15px 0;
        .item-left{
            float: left;
            margin-right: 0;
            width: 35%;
            text-align: left;
        }
        .item-01{
            background-image: url('../img/01.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .item-02{
            background-image: url('../img/02.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;}
        .item-03{
            background-image: url('../img/03.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;}
        .item-04{
            background-image: url('../img/04.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;}
        .item-05{
            background-image: url('../img/05.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;}
        .item-06{
            background-image: url('../img/06.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;}
        .item-07{
            background-image: url('../img/07.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;}
        .item-right{
            float: left;
            height: 100%;
            text-align: center;
            width: 65%;
            p{
                line-height: 25px;
            }
            .fot12{
                font-size:12px;
                color: rgba(255, 255, 255, 0.90);
            }
        }

    }
}
.lef-pic{
    width: 100%; 
    height: 100%;
    // animation: shake 5s infinite;
    animation: shake-bounce 3s linear infinite;
}
@keyframes shake-bounce {
    from { opacity: 0.1; }                          /* 动画开始时的不透明度 */
    10% { opacity: 0.2; }
    20% { opacity: 0.4; }
    30% { opacity: 0.6; }
    40% { opacity: 0.8; }    
    50% { opacity: 1; }
    60% { opacity: 0.8; }
    70% { opacity: 0.6; }
    80% { opacity: 0.4; }
    90% { opacity: 0.2; }
    to {
        opacity: 0.1;
    }
    // 0%, 100% {
    //     transform: translateY(0) rotate(0);
    // }
    // 25%, 75% {
    //     transform: translateY(-5px) rotate(-5deg);
    // }
    // 50% {
    //     transform: translateY(-5px) rotate(5deg);
    // }
}

</style>