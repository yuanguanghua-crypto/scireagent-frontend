<template>
<div class="contentpage">
 
    <div class="header">
        <div class="container">
            <div class="logo">
                <a href="/"><img src="/styles/images/logo.png" alt="Jena Bioscience home"></a>
            </div>

            <!-- <div class="mobiletopnav">
                <a href="#" class="mobilesearch glyphicon glyphicon-search"> </a>
                <a href="/my-account/basket" class="mobilebasket glyphicon glyphicon-shopping-cart"> </a>
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
                        <a href="/my-account/basket"><span class="glyphicon glyphicon-shopping-cart"> </span><b>Your Basket/Online Quote</b></a>
                        <br>Items: 0 (0,00 €)<br>
                        <a href="/order-information/search-order">» Search &amp; Order</a><br>
                        <a href="/my-account/sign-in-registration">» Sign in / Register</a>
                    </p>
                </div>
                <div class="search">
                    <form id="searchform" name="searchf" action="https://www.jenabioscience.com/search" method="post" onsubmit="if(document.searchf.searchstring.value.length<2){return false;}else{return true;}">
                        <input class="form-control" type="text" name="searchstring" placeholder="Product, Cat.#, CAS#" size="8"><button type="submit" class="glyphicon glyphicon-search search-submit" value=""></button>
                    </form>
                </div>
                <div class="citationsearch">
                    &nbsp;&nbsp;&nbsp;<a style="color:#fff;" href="/search-tools/jena-bioscience-citation-search">» Search citations</a>
                </div>
            </div>

        </div>
    </div>

</div>
</template>
<script>
import dayjs from 'dayjs'
import * as mUtils from '@/utils/mUtils'
import bus from '@/utils/bus';
export default {
    components: {},
    data () {
        return {                
            showMenuSys: true,
            showMenuBus: true,
            psdOpendialog: false,
            accessInfo: {},
            // poitUrl: require("./img/poit.png"),
            iconPass: '',
            iconNo: '',
            warningIcon: '',
            defaultIcon: ''
        }
    },
    created() {},
    mounted(){},
    beforeDestroy() {},
    computed:{
    },
    methods: {}
}
</script>
