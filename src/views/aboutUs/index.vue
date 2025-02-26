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
                    您在这里:&nbsp; &nbsp;关于我们
                </div>
                <div class="col-md-12">
                    <h1 style="margin-bottom:17px;"><b>JBS团队</b></h1>
                </div>
                <div class="col-md-12" style="padding-bottom:25px;">	
                    <img src="./img/02.jpg" border="0" class="img-responsive" style="width:100%">
                </div>
                <div class="col-md-12" style="padding-bottom:25px;">	
                    <img src="./img/01.jpg" border="0" class="img-responsive">
                </div>

                <div class="col-md-12">
                    <div class="contentblock cblock_default">
                        <h2>公司简介</h2>
                        <p>
                            由马克斯-普朗克分子生理学研究所 (多特蒙德) 的一组科学家于1998年成立，jena Bioscience利用超过25年的学术知识为100多个国家的研究和工业客户开发创新试剂。
                            迄今为止，耶拿生物科学仍然是一家自营企业。
                            <br>
                            <br>
                        </p>
                    </div>
                    <div class="contentblock cblock_default">
                        <div style="float:right;padding:0 0 10px 10px;">
                            <img src="./img/ifta_ag.gif" border="0">
                        </div>
                        <p>
                            我们在德国制造根据国际标准DIN EN ISO 9001(自2008年起) &amp;DIN EN ISO 14001(自2015年)。<br>
                            <br>
                            跟我们说话!对于您的技术和科学问题，我们可以与产品开发科学家直接沟通。我们会亲自和单独处理您的询问!
                            <br>
                            <br>
                        </p>
                    </div>
                    <div class="contentblock cblock_default">
                        <div style="float:left;padding:0 10px 10px 0;">
                            <img src="./img/03.jpg" border="0" style="max-width:150px;">
                        </div>
                        <h3>核酸和点击化学，探针和表观遗传学，RNA技术</h3>
                        <p>
                            在我们的化学部门，我们有数以百计的核苷酸库存。凭借我们的内部专业知识，我们甚至制造最奇特的
                            核苷酸类似物从mg到kg规模。此外，我们还提供用于 (生物) 分子功能化、结合和标记的创新试剂，
                            以及用于rna合成、标记、修饰、分析和检测的工具箱，由定制的特定服务补充。请参阅我们的探针与表观遗传学,点击化学和RNA技术有关详细信息的章节。
                        </p>                            
                        <br>
                        <br>                        
                        <span class="inp_submit2">
                            <span class="fas fa-envelope-square"></span>
                            联系Barbara
                        </span>
                        <br>
                        <div style="clear:both;"> </div>
                    </div>
                    <div class="contentblock cblock_default">
                        <div style="float:left;padding:0 10px 10px 0;">
                            <img src="./img/4.jpg" border="0" style="max-width:150px;">
                        </div>
                        <h3>词法表达式</h3>
                        在重组蛋白生产领域，耶拿生物科学开发了其专有的LEXSY (利什曼原虫表达系统) 技术。
                        它基于S1-classified的单细胞生物，将易于处理与真核蛋白折叠和修饰机制相结合。除了您在实验室建立LEXSY所需的一切之外，我们还提供重组蛋白的定制表达。 
                        <br>
                        <br>
                        <span class="inp_submit2"><span class="fas fa-envelope-square"></span>联系Andreas</span>
                        <br>
                        <div style="clear:both;"> </div>
                    </div>                
                    <div class="contentblock cblock_default">
                        <div style="float:left;padding:0 10px 10px 0;">
                            <img src="./img/5.jpg" border="0" style="max-width:150px;">
                        </div>
                        <h3>分子生物学与晶体学</h3>
                        <p>
                            在该领域的应用
                            分子生物学我们提供大量的单一试剂、完整的试剂盒和优化的主混合物。本部分包括用于DNA或RNA纯化、扩增和修饰的产品，重点是PCR相关技术。<br>
                            对于生物大分子的结晶-这通常是确定蛋白质3d结构的瓶颈-我们提供专门的试剂
                            蛋白质稳定化,晶体筛选,晶体优化,和定相这可以减少获得高分辨率蛋白质结构所需的时间。
                        </p>                        
                        <br>
                        <br>                    
                        <span class="inp_submit2">
                            <span class="fas fa-envelope-square"></span>
                            联系Buerk
                        </span>                       
                        <br>
                        <div style="clear:both;"> </div>
                    </div>
                    <div class="contentblock cblock_default">
                        <h2>位置</h2>
                        <p>我们的公司所在地位于耶拿市 (德国图林根州) 北部的Saalepark工业区。2015年3月，我们将所有业务转移到我们新的2，500平方米的公司大楼。</p>
                        <p><span class="fas fa-share"></span>如何找到我们</p>
                    </div>
                    
                    <div class="contentblock cblock_default" style="position:relative">
                        <div class="slider swiper swiper-container-initialized swiper-container-horizontal">
                            <b-carousel 
                                :interval="4000"
                                indicators
                                :controls="false"
                                background="#f6f6f6"
                                img-width="100%"
                                img-height="100%"
                                style="text-shadow: 1px 1px 2px #333;">
                                <b-carousel-slide caption="First Slide" text="Nulla vitae elit libero, a pharetra augue mollis interdum." :img-src="url01"></b-carousel-slide>
                                <b-carousel-slide caption="Second Slide" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." :img-src="url02"></b-carousel-slide>
                                <b-carousel-slide caption="Second Slide" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." :img-src="url03"></b-carousel-slide>
                                <b-carousel-slide caption="Second Slide" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." :img-src="url04"></b-carousel-slide>
                                <b-carousel-slide caption="Second Slide" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." :img-src="url05"></b-carousel-slide>
                                <!-- 更多幻灯片 -->
                            </b-carousel>
                        </div>
                    </div>
                    <div class="contentblock cblock_default">
                        <p><a name="video"></a></p>
                        <div class="embed-responsive embed-responsive-16by9">
                            <!-- <iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/5Y6wI_B6c2s" frameborder="0" allowfullscreen=""></iframe> -->
                        </div>
                        <p></p>
                    </div>
                </div>
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
                proNumber: '',
                proName: ''
            },
            rules: {
                proName: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                ],
                proNumber: [
                    { required: true, message: '请输入产品编号', trigger: 'blur' }
                ],
            },
            fields: [
                { key: 'quantity', label: '数量' },
                { key: 'name', label: '规格' },
                { key: 'specification', label: '产品' },
                { key: 'price', label: '金额' },
                { key: 'unitPrice', label: '单价' },
                { key: 'totalPrice', label: '总额' },
                { key: 'actions', label: '' }
            ],
            cart: [
                { id: 1, specification: 'NU-247-CY5', name: 'N6-(6-氨基己基)-ADP-Cy5', unitPrice: 9.9, price: 100,  quantity: 1 },
                { id: 2, specification: 'NU-247-CY4', name: 'N6-(6-氨基己基)-ADP-Cy3', unitPrice: 8.8, price: 1234, quantity: 2 },
                { id: 3, specification: 'NU-247-CY5', name: 'N6-(6-氨基己基)-ADP-Cy2', unitPrice: 6.6, price: 789, quantity: 1 },
            ],
            quantity: 0,
            url01: require("./img/n01.jpg"),
            url02: require("./img/n02.jpg"),
            url03: require("./img/n03.jpg"),
            url04: require("./img/n04.jpg"),
            url05: require("./img/n05.jpg"),
        }
    },
    created() {
        if(this.cart.length > 0){
            this.quantity = this.cart.reduce((accumulator, currentValue) => {
                return accumulator + ( + currentValue.quantity ? +currentValue.quantity:0);
            }, 0);
        }
    },    
    watch: {
        quantity: {
            handler(newVal, oldVal) {
                bus.$emit('updateQuantity', newVal)
            },
            deep: true,
            immediate: true
        }
    },
    mounted(){
        
    },
    beforeDestroy() {},
    computed:{},
    methods: {
        changeQuantity(){
            this.quantity = this.cart.reduce((accumulator, currentValue) => {
                return accumulator + ( + currentValue.quantity ? +currentValue.quantity:0);
            }, 0);
        },
        incrementQuantity(item) {
            item.quantity++;
        },
        decrementQuantity(item) {
        if (item.quantity > 1) {
            item.quantity--;
        }
        },
        removeItem(item) {
            this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
            if(this.cart.length > 0){
                this.quantity = this.cart.reduce((accumulator, currentValue) => {
                    return accumulator + ( + currentValue.quantity ? +currentValue.quantity:0);
                }, 0);
            }
        },
        onSubmit(evt) {
            // evt.preventDefault(); // 阻止表单的默认提交行为
            // const form = this.$refs.form; // 获取表单元素引用
            // form.bootstrapValidator('validate'); // 触发验证过程
            // if (form.data('bootstrapValidator').isValid()) { // 检查是否验证通过
            //     // 表单验证通过后的操作，例如提交到服务器等。
            //     console.log('表单验证通过');
            // } else {
            //     console.log('表单验证失败');
            // }
        }
    }
}
</script>
<style lang="less" scoped>
h1 {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 100;
    font-size: 23px;
    margin-bottom: 25px;
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
.carousel-inner>.item>a>img, .carousel-inner>.item>img, .img-responsive, .thumbnail a>img, .thumbnail>img {
    display: block;
    max-width: 100%;
    height: auto;
}
.contentblock.cblock_default img {
    margin-bottom: 15px;
}
.contentpage {
    h1{
        font-weight: 700;
    }
}
p {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.5;
    font-weight: 300;
}
h3 {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 700;
    font-size: 14px;
    margin-top: 10px;
}
.contentblock{
    /deep/.carousel-indicators {
        position: absolute;
        height: 15px;
        right: 0;
        bottom: 5%;
        left: 0;
        z-index: 2;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 0;
        margin-right: 15%;
        margin-bottom: 0;
        margin-left: 15%;
        li{ 
            width: 15px;
            height: 15px;
            background-color: #fff;
            opacity: 0.6;
            margin: 0 5px;
            border-radius: 50%
        }
        li.active{
            background-color: #227700;
        }
        
    }
}
</style>
