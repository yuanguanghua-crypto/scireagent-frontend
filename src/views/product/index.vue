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
                    <b>您在这里:</b>&nbsp;&nbsp;实时PCR
                </div>
                <div class="col-md-12" style="position:relative">
                    <div class="viewproduct">
                        <a href="">
                            <span class="fas fa-arrow-circle-down" style="vertical-align:top;"></span>查看产品
                        </a>
                    </div>
                    <h1>补品</h1>
                    <div style="padding:0 20px 0 0">
                        <div class="contentblock cblock_default">
                            <div style="float:right;padding:0 0 10px 10px;">
                                <img src="../../assets/img/pipetting_s.jpg" border="0" alt="">
                            </div>
                            <p><b>有用的工具</b>对于实时PCR，测试功能或控制qPCR聚合酶和qPCR测定条件的质量。</p>
                        </div>
                    </div>
                    <div class="productsblock pando clearfix">
                        <a name="products"><h2>产品和订购</h2></a>
                        <a name="PCR-353"></a>
                        <div class="productlist productlist_1">
                            <span class="productmarker fas fa-arrow-circle-right"></span>
                            <a href="">
                                <span class="producttitle">不耐热UNG (尿嘧啶N-糖基化酶) - 1 u/µ l</span> 
                                <span class="catalogno">PCR-353</span><br>
                                <span class="productdescr">防止遗留污染</span>
                            </a>
                        </div>
                        <a name="PCR-378-1ML"></a>
                        <div class="productlist productlist_0">
                            <span class="productmarker fas fa-arrow-circle-right"></span>
                            <a href="">
                                <span class="producttitle">绿色荧光DNA染色</span>
                                <span class="catalogno">PCR-378</span><br>
                                <span class="productdescr">用于实时PCR分析的DNA嵌入染料</span>
                            </a>
                        </div>
                        <a name="PCR-379"></a>
                        <div class="productlist productlist_1">
                            <span class="productmarker fas fa-arrow-circle-right"></span>
                            <a href="">
                                <span class="producttitle">EvaGreen®荧光DNA染色</span>
                                <span class="catalogno">PCR-379</span><br>
                                <span class="productdescr">用于实时qPCR荧光分析的DNA嵌入染料，包括HRM</span>
                            </a>
                        </div>
                        <a name="PCR-351"></a>
                        <div class="productlist productlist_0">
                            <span class="productmarker fas fa-arrow-circle-right"></span>
                            <a href="">
                                <span class="producttitle">ROX参比染料-25 µ m</span> 
                                <span class="catalogno">PCR-351</span><br>
                                <span class="productdescr">用于荧光信号归一化的参比染料</span>
                            </a>
                        </div>
                        <a name="PCR-356-1ML"></a>
                        <div class="productlist productlist_1">
                            <span class="productmarker fas fa-arrow-circle-right"></span>
                            <a href="">
                                <span class="producttitle">ROX参比染料-100 µ m</span>
                                <span class="catalogno">PCR-356</span><br>
                                <span class="productdescr">用于荧光信号归一化的参比染料</span>
                            </a>
                        </div>
                        <div class="clear1px"></div>
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

.productsblock {
    clear: both;
    margin-bottom: 20px;
    h2 {
        padding-top: 15px;
    }
}
.pando {
    padding-left: 141px;
    background: #30a000 url(../../assets/img/jbs-ico-products-and-ordering.png) no-repeat 10px 60px;
    margin-right: 20px;
    min-height: 200px;
    h2 {
        margin-left: -122px;
        color: #fff;
        font-size: 24px;
    }
}


.pando .productlist {
    border: 10px solid #f0f6ed;
    border-bottom: none;
}
.productlist_1 {
    background-color: #e9f1e5;
}
.pando .productlist_0 {
    background-color: #f0f6ed;
}
.productlist {
    position: relative;
    padding: 10px;
    font-size: 14px;
    float: left;
    width: 100%;
}
.productlist .productmarker {
    position: absolute;
    top: 10px;
    left: 10px;
}
.productmarker {
    display: block;
    float: left;
    width: 20px;
    padding-bottom: 0;
    margin: 3px 10px 0 0;
    color: #277800;
}
.productlist a {
    position: relative;
    margin-left: 30px;
    float: left;
    width: calc(100% - 30px);
    padding-right: 0px;
}
.producttitle {
    padding-left: 0;
    font-weight: 600;
}
.catalogno {
    font-size: 12px;
}
.productlist .productdescr {
    padding: 0;
}
.fa-arrow-circle-down {
    position: relative;
    top: 5px;
}
</style>
