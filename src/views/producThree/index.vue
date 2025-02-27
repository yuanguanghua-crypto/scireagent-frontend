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
                    <b>您在这里:</b>&nbsp;&nbsp;探针与表观遗传学 | 细胞标记
                </div>
                <div class="col-md-12">
                   
                    <h1>细胞标记</h1>
                    <div style="padding:0 20px 0 0">
                        <div class="contentblock cblock_default">
                            <p>
                                细胞和细胞结构的可视化以及活细胞中核酸和蛋白质的跟踪和调节对于识别，映射和分析细胞信号传导的潜在生化过程是强制性的。<br><br><br>
                                荧光标记的化学报道分子允许直接检测特定靶标，然而，它们中只有一小部分是细胞可渗透的。细胞渗透性的缺乏可以通过蛋白质和核酸内
                                化试剂盒来克服，所述蛋白质和核酸内化试剂盒分别允许蛋白质/肽和核苷酸的有效和低毒内化。
                            </p>
                        </div>
                    </div>
                    <div class="row prodcatlinklist">
                        <div class="col-xs-12 col-sm-6">
                            <div class="prodcatlink">
                                <a href="">荧光激素</a>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6"></div>
                    </div>
                    
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
.content-inner-left{
    padding-right: 40px;
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
.far{
    cursor: pointer;
    color: #227700;
}

.viewproduct {
    position: absolute;
    right: 35px;
    z-index: 100;
    top: -10px;
    line-height: 20px;
}
a {
    color: #227700;
    font-weight: 400;
    font-size: 13px;
}
h1 {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 100;
    font-size: 23px;
    margin-bottom: 25px;
}
.contentblock {
    position: relative;
    clear: both;
    float: left;
    width: 100%;
    font-size: 14px;
    font-weight: 300;
    p {
        margin-bottom: 20px;
    }
}
</style>
