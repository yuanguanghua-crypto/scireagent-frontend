<template>
<div class="header clearfix">
        <div class="container">


            <!-- <b-navbar toggleable="lg" type="dark" class="logo">
                <b-navbar-brand href="#">
                    <img src="../../assets/img/logo.png" />
                </b-navbar-brand>
            </b-navbar> -->
            <!-- <div class="logo">
                <a href="/"><img src="../../assets/img/logo.png" alt="Jena Bioscience home"></a>
            </div> -->
            

            <!--  -->

            <b-container class="bv-example-row">
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
                                    <a href=""><span class="glyphicon glyphicon-shopping-cart"> </span><b>Your Basket/Online Quote</b></a>
                                    <br>Items: 0 (0,00 €)<br>
                                    <a href="">» Search &amp; Order</a><br>
                                    <a href="">» Sign in / Register</a>
                                </p>
                            </div>
                            <div class="search">
                                <form id="searchform" name="searchf" action="https://www.jenabioscience.com/search" method="post" onsubmit="if(document.searchf.searchstring.value.length<2){return false;}else{return true;}">
                                    <input class="form-control" type="text" name="searchstring" placeholder="Product, Cat.#, CAS#" size="8"><button type="submit" class="glyphicon glyphicon-search search-submit" value=""></button>
                                </form>
                            </div>
                            <div class="citationsearch">
                                &nbsp;&nbsp;&nbsp;<a style="color:#fff;" href="">» Search citations</a>
                            </div>
                        </div>
                        <!--  -->
                        <div class="header-menu">
                            <div class="top-navigation">
                                <ul>
                                    <li><a target="_self" href="">My Account</a></li>
                                    <li><a target="_self" href="">Order Information</a></li>
                                    <li><a target="_self" href="">About us</a></li>
                                    <li><a target="_self" href="">Contact</a></li>
                                    <li><a target="_self" href="">Downloads</a></li>
                                    <li><a target="_self" href="">Search Tools</a></li>
                                </ul>
                            </div>
                        </div>
                    </b-col>

                    <b-col cols="6">
                        <div class="navigation clearfix">
                            <!-- 导航项 -->
                            <b-navbar toggleable="lg" type="dark">
                                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                                <b-collapse id="nav-collapse" is-nav>
                                    <b-navbar-nav>
                                        <b-nav-item-dropdown text="核苷酸和核苷" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="分子生物学" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="表达式" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="蛋白质" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="晶体学和冷冻电镜" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="探针与表观遗传学" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="表达式" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                                        </b-nav-item-dropdown>
                                        <b-nav-item-dropdown text="RAN" variant="hover">
                                            <b-dropdown-item href="#">Action</b-dropdown-item>
                                            <b-dropdown-item href="#">Another action</b-dropdown-item>
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
        };
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
    },
    beforeDestroy() {

    },
    methods: {

    }
};
</script>
<style lang="less" scoped>
.header {
    position: relative;
    z-index: 1001;
    width: 100%;
    background-color: #66bb00;
    height: 30vh;
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
            p {
                font-size: 12px;
                margin: 0;
                a {
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
        #searchform {
            position: relative;
        }
        .search .form-control {
            text-align: left;
            color: #717171;
            opacity: 0.7;
            border: 0;
            border-radius: 0;
            margin: 15px 0 0 0;
        }
        .search .search-submit {
            color: #277800;
            position: absolute;
            top: 0;
            right: 0;
            padding: 6px;
            background-color: transparent;
            border: 0;
            font-size: 21px;
        }      
    }
    .header-menu {
        position: relative;
        float: right;
        top: 17vh;
        right: 10px;
        .top-navigation {
            float: right;
            clear: both;
            position: relative;
            z-index: 110;
            ul {
                margin: 0;
                padding: 0;
                li {
                    list-style-type: none;
                    display: inline;
                    padding: 2px 0;
                    margin-right: 10px;
                    a {
                        color: #fff;
                        font-size: 14px;
                        font-weight: 400;
                    }
                }
            }
        }
    }
    .navigation {
        margin-top: 30px;
        // width: 100%;
        position: absolute;
        z-index: 999;
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
            margin: 0;
            width: 100%;
            text-align: center;
            background-color: #000;
            color: #fff;
            border-radius: 0;
            margin: 0 5px;
            line-height: 3.5rem;
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
                line-height: 2rem;
            }
            .dropdown-item:hover{
                color: #fff;
                background-color: #000;
                line-height: 2rem;
            }
        }
        /deep/.dropdown-toggle::after {
            display: none;
        }
    }
}
// .nav-pills{
//     position: relative;
//     width: 100%;
//     display: flex;
//     justify-content: left;
//     .menu{
//         padding: 20px 40px;
//         width: 8%;
//         height: 4rem;
//         line-height: 4rem;;
//         margin: 0 10px;
//         text-align: center;
//         background-color: #000;
//         font-size: 15px;
//         font-weight: 500;
//         padding: 0;
//         color:#fff;
//         cursor:pointer;
//         // display: flex;
//         // position: relative;
//         // justify-content: center;
//     }
    

// }
// .navbar .nav > li .dropdown-menu {
//     margin: 0;
//     width: 100%;
//     text-align: center;
//     background-color: #000;
//     color: #fff;
//     border-radius: 0;
// }
// .dropdown-menu li{
//     border-bottom: 1px solid #333;
//     height: 2rem;
//     line-height: 2rem;
// }
// .dropdown-menu li:hover{
//     background-color: #333;
// }
/deep/.dropdown:hover .dropdown-menu {
  display: block; /* 显示下拉菜单 */
}


@media (max-width: 768px) {
    .header-menu {
        display: none;
    }
}
</style>
