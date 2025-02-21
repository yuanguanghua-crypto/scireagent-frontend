<template>
<div class="header clearfix">
        <div class="container">
            <div class="logo">
                <a href="/"><img src="../../assets/img/logo.png" alt="Jena Bioscience home"></a>
            </div>
            <!-- <div class="mobiletopnav">
                <a href="#" class="mobilesearch glyphicon glyphicon-search"> </a>
                <a href="" class="mobilebasket glyphicon glyphicon-shopping-cart"> </a>
            </div> -->
            <div class="basket-search">
                <div id="onlinequoteinfo" class="onlinequoteinfo" style="display: none;">
                    <div class="tooltip-inner"> 
                        Need a quotation? Create it here!<br>
                        No login/account required.
                    </div> 
                    <div class="tooltip-arrow"></div>
                </div>
                    
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
            <div class="navigation">
                <nav class="navbar navbar-inverse navbar-static-top">
                    <div class="container">


                        
                    <!-- <nav class="navbar navbar-expand-lg navbar-collapse">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Features</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown link
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav> -->

                        <nav class="navbar-toggle-wrapper">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="menu-icon">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span></span>
                                <span class="menu-text"> </span>
                            </button>
                        </nav>

                        <nav class="navbar-collapse collapse">
                            <ul id="nav" class="nav navbar-nav">
                                <li class="dropdown nav-item nav-item-1 active">
                                    <a target="_self" href="">Nucleotides &amp; Nucleosides</a>
                                    <span class="droplink level1 glyphicon glyphicon-menu-right"></span>
                                    <ul class="dropdown-menu nav-2 dropdown-menu-1" role="menu">
                                        <li>
                                            <a class="dropdown-toggle" role="button" aria-expanded="false" target="_self" href="">Nucleotides by Structure</a>
                                            <span class="droplink level2 glyphicon glyphicon-menu-right"></span>
                                            <ul class="nav-3 dropdown-menu menu2">
                                                <li><a target="_self" href="">Fluorescent Nucleotides</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li class="dropdown nav-item nav-item-8">
                                    <a target="_self" href="">RNA Technologies</a>
                                    <span class="droplink level1 glyphicon glyphicon-menu-right"></span>
                                </li>
                            </ul>
                        </nav>


                    </div>
                </nav>
            </div>




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
    width: 100%;
    background-color: #66bb00;
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
        top: 115px;
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
    // .navigation {
    //     float: left;
    //     margin-bottom: -35px;
    //     margin-top: 15px;

    //     .navbar-inverse .navbar-nav {
    //         position: relative;
    //         padding: 0;
    //         .li {
    //             margin-right: 2px;
    //             display: flex;
    //             text-align: center;
    //             background-color: transparent;
    //             height: 60px;
    //             padding: 0;
    //             float: left;
    //         }
    //         .nav-item-1 {
    //             border-bottom: 5px solid #009900;
    //         }
    //         .nav-item-2{
    //             border-bottom: 5px solid #cc0000;
    //         }
    //         .active.nav-item-1 > a {
    //             background-color: #009900;
    //         }

    //         a {
    //             color: #fff;
    //             background-color: #000;
    //             font-size: 15px;
    //             font-weight: 500;
    //             padding: 0;
    //             display: flex;
    //             position: relative;
    //             align-items: center;
    //             width: 100%;
    //             justify-content: center;
    //         }

    //     }
    // }
}
</style>
