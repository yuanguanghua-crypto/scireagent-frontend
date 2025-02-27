<template>
<div class="header clearfix">
        <div class="clearfix">

            <b-container class="bv-example-row clearfix">
                <b-row>
                    <b-col cols="2">
                        <div class="logo">
                            <a href="/"><img src="../../assets/img/logo.png" alt="Jena Bioscience home"></a>
                        </div>
                    </b-col>
                    <b-col cols="10">
                        <!--  -->
                        
                        <div class="basket-search">
                                
                            <div class="boxnotebasket">
                                <p>
                                    <router-link to="/my-account/basket"><span class="fas fa-shopping-cart"></span> &nbsp;<b>您的购物篮/在线报价</b></router-link>
                                </p>
                                <p> 项目: {{quantity}} ({{total}} €)</p>
                                <p> » 搜索和订阅</p>
                                <p> » 登录注册</p>
                            </div>
                            <div class="search">
                                <input class="form-control" type="text" v-model="searchName" name="searchstring" placeholder="产品, Cat.#, CAS#" size="8">
                                <button type="submit" class="fas fa-search search-submit" @click="goSearch()"></button>
                            </div>
                            <div class="citationsearch">&nbsp;&nbsp;&nbsp;» 搜索引文</div>
                        </div>
                        <!--  -->
                        <div class="header-menu clearfix">
                            <div class="top-navigation clearfix">
                                <ul>
                                    <li><router-link to="/my-account/basket">我的账户</router-link></li>
                                    <li><a target="_self" href="">订单信息</a></li>
                                    <li><router-link to="/about-us/about-us">关于我们</router-link></li>
                                    <li><a target="_self" href="">联系人</a></li>
                                    <li><a target="_self" href="">下载</a></li>
                                    <li><a target="_self" href="">搜索工具</a></li>
                                </ul>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <div class="container clearfix" style="height:30px"></div>

            </b-container>
            <b-container class="bv-example-row clearfix">
                <b-row class="clearfix">
                    <b-col cols="12">
                        <div class="navigation clearfix">
                            <!-- 导航项 -->
                            <b-navbar toggleable="lg" type="dark">
                                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                                <b-collapse id="nav-collapse" is-nav>
                                    <b-navbar-nav>
                                        <b-nav-item-dropdown text="核苷酸和核苷" variant="hover">
                                            <b-dropdown-item href="/productOne">核苷酸结构</b-dropdown-item>
                                            <b-dropdown-item href="/productTwo">核苷酸(按应用)</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="点击化学" variant="hover">
                                            <b-dropdown-item href="#">按化学成分点击试剂</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="分子生物学" variant="hover">
                                            <b-dropdown-item href="#">单个组件</b-dropdown-item>
                                            <b-dropdown-item href="#">PCR经典</b-dropdown-item>
                                            <b-dropdown-item href="#">实时PCR</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="词法表达式" variant="hover">
                                            <b-dropdown-item href="#">LEXSY配置 </b-dropdown-item>
                                            <b-dropdown-item href="#">LEXSY栽培</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="蛋白质类" variant="hover">
                                            <b-dropdown-item href="/productThree">重组蛋白</b-dropdown-item>
                                            <b-dropdown-item href="/producFour">天然蛋白质</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="晶体学和cryo-em" variant="hover">
                                            <b-dropdown-item href="/producFive">赛选</b-dropdown-item>
                                            <b-dropdown-item href="#">赛选膜蛋白</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="探针与表观遗传学" variant="hover">
                                            <b-dropdown-item href="#">无功组件</b-dropdown-item>
                                            <b-dropdown-item href="#">DNA/cDNA标记</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="RAN技术" variant="hover">
                                            <b-dropdown-item href="#">生产RNA原料</b-dropdown-item>
                                            <b-dropdown-item href="#">RNA合成</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                    </b-navbar-nav>
                                </b-collapse>
                            </b-navbar>
                        </div>
                    </b-col>
                </b-row>
            </b-container>



            
        </div>
    </div>
</template>

<script>
import bus from '@/utils/bus';
export default {
    components: {
    },
    data() {
        return {
            total: 0,
            quantity: 0,
            searchName: ''
        };
    },
    computed: {},
    created() {},
    mounted() {
        bus.$on('updateQuantity', this.getQuantity)
    },
    beforeDestroy() {
        bus.$off('updateQuantity')
    },
    methods: {
        getQuantity(val){
            this.getQuPrice(val);
        },
        // 价格波动
        getQuPrice(cart){
            if(cart.length > 0){
                this.quantity = cart.reduce((accumulator, currentValue) => {
                    return accumulator + ( + currentValue.quantity ? +currentValue.quantity:0);
                }, 0);
                this.total = this.grandTotal(cart);
            }
        },
        // 计算全部商品总价
        grandTotal(val) {
            return val
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
        },
        goSearch(){
            if(!this.searchName) return
            this.$router.push({
                params: {
                    searchName: this.searchName
                },
                name: 'search'
            });
        }
    }
};
</script>
<style lang="less" scoped>
.header {
    position: relative;
    z-index: 1001;
    width: 100%;
    background-color: #66bb00;
    // height: 30vh;
    .logo {
        float: left;
        width: 280px;
        background: url('../../assets/img/logo.png') no-repeat center center transparent;
        background-size: contain;
        left: -50px;
        position: relative;
        top: 40px;
        a {
            width: 100%;
            height: 105px;
            float: left;
            img {
                width: 280px;
                height: 105px;
                visibility: hidden;
            }
        }
    }

    .basket-search {
        float: right;
        position: relative;
        right: 0;
        top: 0;
        .onlinequoteinfo {
            top: 5px;
            display: none;
            position: absolute;
            right: 222px;
            z-index: 7000;
            width: 250px;
            .tooltip-inner {
                max-width: 250px;
                padding: 8px 8px;
                color: #fff;
                text-align: center;
                background-color: #ad1010;
                border-radius: 6px;
                font-size: 14px;
                line-height: 20px;
            }
        }
        .boxnotebasket {
            font-size: 12px;
            position: relative;
            top: 0;
            right: 0px;
            background-color: #277800;
            width: 220px;
            color: #fff;
            padding: 10px;
            a{                
                color: #fff;
            }
            p {
                font-size: 12px;
                margin-bottom: 5px;
            }
            
        }
        /deep/.citationsearch{
            font-size: 12px;
            margin-bottom: 5px;
            color: #fff;
            cursor: pointer;
        }
        .search{
            position: relative;
            .form-control {
                text-align: left;
                color: #717171;
                opacity: 0.7;
                border: 0;
                border-radius: 0;
                margin: 10px 0 5px 0;
            }
            .search-submit {
                color: #277800;
                position: absolute;
                top: 2px;
                right: 3px;
                width: 30px;
                padding: 6px;
                height: 30px;
                background-color: transparent;
                border: 0;
                font-size: 21px;
            }   
        }   
    }
    .header-menu {
        position: relative;
        float: right;
        right: 10px;
        .top-navigation {
            float: right;
            clear: both;
            position: relative;
            top: 125px;
            z-index: 110;
            ul {
                margin: 0;
                padding: 0;
                li {
                    list-style-type: none;
                    display: inline;
                    height: 30px;
                    line-height:30px;
                    border-left: 1px solid #fff;
                    padding: 0 10px;
                    a {
                        color: #fff;
                        font-size: 14px;
                        font-weight: 400;
                    }
                }
                li:nth-child(1){
                    border-left: 0 solid #fff;
                }
            }
        }
    }
    .bv-example-row{
        // position: relative;
    }

    .navigation {
        // margin-top: 30px;
        // width: 100%;
        position: absolute;
        z-index: 999;
        bottom: -40px;
        // top: 24vh;
        // left: 14%;
        // right: 14%;
        .navbar-box{
            width: 100%;
        }
        .navbar-inner{
            flex-grow: 1
        }
        .navbar-nav{
            width: 100%;
        }
        .nav-item{
            min-width: 140px;
            text-align: center;
            background-color: #000;
            color: #fff;
            border-radius: 0;
            margin: 0 5px;
            height: 60px;
            line-height: 45px;
        }
        .nav-item:nth-child(1){
            border-bottom: 5px solid #66bb00;
        }
        .nav-item:nth-child(2){
            border-bottom: 5px solid #cc0000;
        }
        .nav-item:nth-child(3){
            border-bottom: 5px solid #000066;
        }
        .nav-item:nth-child(4){
            border-bottom: 5px solid #0066cc;
        }
        .nav-item:nth-child(5){
            border-bottom: 5px solid #ff0099;
        }
        .menu:nth-child(6){
            border-bottom: 5px solid #ff9900;
        }
        .nav-item:nth-child(7){
            border-bottom: 5px solid #99cc00;
        }
        .nav-item:nth-child(8){
            border-bottom: 5px solid #00aeef;
        }
        .nav-item:nth-child(1):hover{
            background-color: #66bb00;
        }
        .nav-item:nth-child(2):hover{
            background-color: #cc0000;
        }
        .nav-item:nth-child(3):hover{
            background-color: #000066;
        }
        .nav-item:nth-child(4):hover{
            background-color: #0066cc;
        }
        .nav-item:nth-child(5):hover{
            background-color: #ff0099;
        }
        .nav-item:nth-child(6):hover{
            background-color: #ff9900;
        }
        .nav-item:nth-child(7):hover{
            background-color: #99cc00;
        }
        .nav-item:nth-child(8):hover{
            background-color: #00aeef;
        }
        .b-nav-dropdown{
            text-align: center;
            background-color: #000;
            color: #fff;
            border-radius: 0;
        }
        /deep/.nav-link{
            color: #fff;
        }
        /deep/.dropdown-menu{
            background-color: #000;
            border-radius: 0;
            .dropdown-item{
                color: #fff;
                line-height: 1.5rem;
                font-size: 14px;
            }
            
        }
        /deep/.dropdown-item:hover{
            color: #fff;
            background-color: #888;
        } 
        /deep/.dropdown-toggle::after {
            display: none;
        }
    }
}
/deep/.dropdown:hover .dropdown-menu {
  display: block; /* 显示下拉菜单 */
}


@media (max-width: 768px) {
    .header-menu {
        display: none;
    }
}
</style>
