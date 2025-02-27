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
                    <b>您在这里:</b>&nbsp;&nbsp;核苷酸和核苷 | 核苷酸结构 | 荧光核苷酸 | 尿苷-猝灭剂标记 | 氨基烯丙基-dUTP | Aminoallyl-dUTP-ATTO-580Q
                </div>
                <h1>Aminoallyl-dUTP-ATTO-580Q</h1>
                <p>5-(3-氨基烯丙基)-2'-deoxyuridine-5 '-三磷酸酯，用ATTO 580Q三乙基铵盐标记</p>


                <div class="col-md-12">
                    <div></div>
                    <div class="table-responsive">
                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style="padding:0 20px;"></div>
                            </div>
                        </div>
                        <table class="table product-table table-striped table-coloured dark-header">
                            <thead class="table-dark">
                                <tr>
                                    <th>规格</th>
                                    <th>金额</th>
                                    <th>价格 (欧元)</th>
                                    <th>购买/备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>NU-803-580Q</td>
                                    <td>40 μ l (1毫米)</td>
                                    <td>1.150,70</td>
                                    <td class="align-right">
                                        <span class="inp_submit2">
                                            <span class="fas fa-envelope-square"></span>
                                            添加到购物篮/报价
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div class="col-md-12 productdetails">
                    <div class="prodimage">
                        <figure>
                            <img src="../../assets/img/NU-803-580Q.png" alt="">
                            <figcaption>Aminoallyl-dUTP-ATTO-580Q的结构式</figcaption>
                        </figure>
                    </div>
                    <div class="prodimage">
                        <img src="../../assets/img/ATTO-580Q_Spektrum_processed.png" alt="ATTO 580Q的吸收光谱"><br>
                        <span>ATTO 580Q的吸收光谱</span>
                    </div>
                    <p><b><b>一般实验室使用。</b></b></p>
                    <p><b>装运:</b>装在凝胶包装上</p>
                    <p><b>储存条件:</b>储存在-20 °C<br>短期暴露 (最多1周累积) 到环境温度可能。</p>
                    <p><b>保质期:</b>交货日期后12个月</p>
                    <p><b>分子式:</b>C<sub>12</sub>H<sub>20</sub>N<sub>3</sub>O<sub>14</sub>P<sub>3</sub>-ATTO 580Q (游离酸)</p>
                    <p><b>分子量:</b>1199.22g/mol (游离酸)</p>
                    <p><b>纯度:</b>≥ 95% (HPLC)</p>
                    <p><b>表格:</b>水溶液</p>
                    <p><b>浓度:</b>1.0毫米-1.1毫米</p>
                    <p><b>Ph值:</b>7.5 ± 0.5</p>
                    <p><b>光谱性质:</b>λ<sub>exc</sub>&nbsp;587 nm, ε 110.0 L mmol<sup>-1</sup>&nbsp;厘米<sup>-1</sup>(Tris-HCl pH 7.5)</p>
                    <br>
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
    font-weight: 500;
    font-size: 23px;
    margin-bottom: 25px;
    margin-top: 25px;
}
p{
    color: #666;
}

.content-inner-left{
    padding-right: 40px;
}

.productdetails {
    margin-bottom: 20px;
}
.prodimage {
    max-width: 50%;
    float: right;
    clear: right;
    margin-bottom: 20px;
    margin-left: 20px;
    text-align: right;
}
.prodimage img {
    max-width: 100%;
    padding-bottom: 8px;
}
</style>
