<template>
<div>
    <vHeader></vHeader>
    <div class="container cont-box">
        <div class="row">
            <div class="col-md-3 content-inner-left">
                <left-list></left-list>
            </div>
            <div class="col-md-9 content-inner-right">
                <div class="breadcrumb">
                    <b>您在这里:</b>&nbsp;&nbsp;蛋白质类 | 天然蛋白质 | 病毒和微生物抗原
                </div>
                <h1>天然病毒和微生物抗原</h1>

                <div class="contentblock cblock_default">
                    <div style="float:right;padding:0 0 10px 10px;">
                        <img src="../../assets/img/Native_Viral_Antigens_S.jpg" border="0" alt="">
                    </div>
                    <p>
                        由于其无与伦比的灵敏度，病原体特异性天然抗原广泛用于免疫诊断测定，例如ELISA。 
                        <br>耶拿生物科学提供广泛的高质量的天然病毒，细菌，真菌和寄生虫抗原
                        <br>
                        <br>
                    </p>
                    <ul>
                        <li>适用于抗体检测或作为各种免疫测定的阳性对照</li>
                        <li>通过ELISA进行功能测试</li>
                        <li>释放前灭活并测试传染性</li>
                        <li>批量可用</li>
                    </ul>
                    <p></p>
                </div>

                
                <div class="row">
                    
                    <div class="col-xs-12 col-sm-6">
                        <div class="prodcatlink">
                            <a href="">病毒抗原</a>
                        </div>
                        <ul>
                            <li><a href="">腺苷-染料标记</a></li>
                            <li><a href="">腺苷猝灭剂标记</a></li>
                            <li><a href="">腺苷-内在荧光</a></li>
                            <li><a href="">鸟苷-染料标记</a></li>
                            <li><a href="">鸟苷-猝灭剂标记</a></li>
                            <li><a href="">鸟苷-内在荧光</a></li>
                            <li><a href="">胞嘧啶-染料标记</a></li>
                            <li><a href="">胞嘧啶-猝灭剂-标记</a></li>
                        </ul>
                        <div class="prodcatlink"><a href="">细菌抗原</a></div>
                        <ul>
                            <li><a href="">Α-磷酸修饰核苷酸</a></li>
                            <li><a href="">Γ-[(6-氨基己基)-亚氨基]-atp α s</a></li>
                            <li><a href="">Α，β 不可水解核苷酸</a></li>
                            <li><a href="">Β-磷酸修饰核苷酸</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <div class="prodcatlink"><a href="">真菌抗原</a></div>
                        <ul>
                            <li><a href="">生物素</a></li>
                        </ul>
                        <div class="prodcatlink"><a href="">寄生虫抗原</a></div>
                        <ul>
                            <li><a href="">盖</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-12 col-sm-6"></div>
                </div>
                <!--  -->
                <!--  -->
            </div>
            <!-- -->
        </div>
    </div>
    <vFooter></vFooter>
</div>
    
</template>
<script>
import bus from '@/utils/bus';
import leftList from './components/leftList.vue';
import vHeader from '../../layout/Header/Header.vue';
import vFooter from '../../layout/Footer/Footer.vue';
export default {
    components: {
        leftList,
        vHeader,
        vFooter
    },
    data () {
        return {
            proForm: {
                searchName: ''
            },
        }
    },
    created() {
        if(this.$route.params.searchName){
            this.searchName = this.$route.params.searchName;
        }
    },    
    watch: {
    },
    mounted(){
        
    },
    beforeDestroy() {},
    computed:{},
    methods: {
        
    }
}
</script>
<style lang="less" scoped>
.cont-box{
    padding-bottom: 20px;
}
.content-inner-right{
    position: relative;
}
.breadcrumb {
    font-size: 12px;
    text-align: left;
    background-color: #fff;
    width: 100%;
    padding-left: 0;
   
    border-bottom: 1px dotted gray;
    border-radius: 0;
    padding: 8px 0;
    margin-bottom: 20px;
    list-style: none;
}
a {
    color: #227700;
    font-weight: 400;
    font-size: 13px;
}
.contentpage h1 {
    font-weight: 500;
}
h1 {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 100;
    font-size: 23px;
    margin-bottom: 25px;
}
.content .row:first-of-type {
    padding-bottom: 0px;
}
.prodcatlink {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 0px;
}
.content ul {
    list-style-position: outside;
    clear: left;
}
li {
    list-style-type: disc !important;
}
.content-inner-left{
    padding-right: 40px;
}
</style>
