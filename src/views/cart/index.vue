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
                    <b>您在这里:</b>&nbsp;&nbsp;购物篮
                </div>
                <div class="col-md-12">
                    <h1>你的购物篮</h1>
                    <div class="alert alert-success" role="alert" v-if="cart.length == 0">
                        <b>你的篮子是空的。添加产品订购或创建您的在线报价。</b>
                    </div>

                    <div v-else>
                        <div class="table-responsive">
                            <b-table :items="cart" :fields="fields" striped responsive hover class="table product-table table-striped table-coloured">
                                <template v-slot:cell(quantity)="row">
                                    <b-form-input v-model="row.item.quantity" maxlength="5" @input="changeQuantity()" 
                                        style="width: 80px; text-align: center; border: 1px solid #eee;border-radius:5px;height: 30px;">
                                    </b-form-input>
                                    <!-- <b-button size="sm" @click="decrementQuantity(row.item)">-</b-button>
                                    <b-button size="sm" @click="incrementQuantity(row.item)">+</b-button> -->
                                </template>
                                <template #cell(total)="row">
                                    {{ calculateItemTotal(row.item) }}
                                </template>
                                <template v-slot:cell(actions)="row">
                                    <i class="far fa-trash-alt" @click="removeItem(row.item)" style="font-size: 120%;"  />
                                </template>
                            </b-table>
                        </div>
                        <div class="container clearfix">
                            如果您在选择中找不到目的地，请
                            <span class="inp_submit2"><span class="fas fa-envelope-square"></span> 联系我们的管理团队</span>
                            <ul style="margin:0 0 20px -20px;">
                                <li>没有有效增值税号的欧洲客户和德国客户请为总价增加19% 的增值税。</li>
                                <li>价格在报价发布时有效 (见上文)。</li>
                                <li>可用性取决于您订购时的库存状态。</li>
                                <li>交货时间将在订单确认中注明，您将在订单提交给Jena Bioscience后不久收到。</li>
                                <li>非欧盟客户: 进口到您的国家/地区后，可能会收取额外的海关费用。耶拿生物科学对这些成本没有影响。</li>
                                <li>手续费: 对于低于100欧元的订单价值，我们收取20欧元的额外手续费。此费用包含在上述运输和处理费用中。</li>
                            </ul>
                        </div>
                        <div class="basket-buttons clearfix">
                            <span class="inp_submit2">在线报价</span>&nbsp;
                            <span class="inp_submit2"><span class="fas fa-sync-alt">更新</span></span>&nbsp;
                            <span class="inp_submit2">继续结账</span>
                        </div>
                    </div>

                    <div class="row search_and_order">
                        <div class="col-md-6">
                            <h2>按产品编号或名称搜索产品</h2>
                            <p>请输入产品编号或名称以搜索产品。<br></p>                        
                            <b-form @submit="onSubmit" ref="proForm" class="clearfix">
                                <b-form-group label="产品名称:" label-for="proName">
                                    <b-form-input id="proName" v-model="proForm.proName" required style="width:200px;float:left"></b-form-input>
                                </b-form-group>
                                <b-form-group label="产品编号:" label-for="proNumber">
                                    <b-form-input id="proNumber" v-model="proForm.proNumber" required style="width:200px;float:left"></b-form-input>
                                </b-form-group>                            
                            </b-form>
                            <input class="inp_submit2 btn-find" type="submit" name="prodsearch" value="查找"><br>
                        </div>
                        <div class="col-md-6"><form name="form2" method="post">
                            <h2>一次订购多个产品</h2><p>请输入多个产品编号 (每行一个，或用逗号分隔)，然后按 “添加到篮子” 按钮将所有相应的产品同时放入篮子中。<br></p>
                            <textarea name="productids" cols="35" rows="5"></textarea><br>
                                <div class="clear1px">&nbsp;</div>
                                <input type="submit" name="prodsearch2" class="inp_submit2" value="添加到购物篮"><br>
                                <div class="clear1px">&nbsp;</div>
                            </form>
                        </div>
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
import leftList from '@/components/left/leftList.vue';
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
                { key: 'price', label: '单价' },
                { key: 'total', label: '总价' },
                { key: 'actions', label: '' }
            ],
            cart: [
                { id: 1, specification: 'NU-247-CY5', name: 'N6-(6-氨基己基)-ADP-Cy5', price: 5, quantity: 1 },
                { id: 2, specification: 'NU-247-CY4', name: 'N6-(6-氨基己基)-ADP-Cy3', price: 10, quantity: 2 },
                { id: 3, specification: 'NU-247-CY5', name: 'N6-(6-氨基己基)-ADP-Cy2', price: 6, quantity: 1 },
            ],
            quantity: 0,
            grossPrice: 0
        }
    },
    created() {},    
    watch: {
        quantity: {
            handler(newVal, oldVal) {
                bus.$emit('updateQuantity', this.cart)
            },
            deep: true,
            immediate: true
        }
    },
    mounted(){
        bus.$emit('updateQuantity', this.cart)
    },
    beforeDestroy() {},
    computed:{},
    methods: {
        // 计算单个商品总价
        calculateItemTotal(item) {
            return (item.price * item.quantity).toFixed(2);
        },
        changeQuantity(){
            bus.$emit('updateQuantity', this.cart)
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
            bus.$emit('updateQuantity', this.cart)
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
.alert-success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
}
.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}
h2 {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 700;
    font-size: 18px;
}
p, li {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 300;
}
.search_and_order label {
    width: 30%;
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 13px;
}
/deep/.d-block{
    display: inline-block;
    width: 140px;
    float: left;
}
.form-group{
    margin-bottom: 5px;
    clear: both;
    height: 40px;
}
.btn-find{
    margin-left: 140px;
}
.far{
    cursor: pointer;
    color: #227700;
}
.basket-buttons {
    text-align: right;
    margin-bottom: 40px;
}
// .table-responsive {
//     /deep/thead{
//         background-color: #ccc
//     }
// }
</style>
