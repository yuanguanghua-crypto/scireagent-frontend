<template>
<div>
    <vHeader></vHeader>
    <div class="container cont-box">
        <div class="row">

            <div class="col-md-12 content-inner-right">
                <h1>您的搜索“ {{searchName}} ”</h1>
                <p><b>Pages中的结果</b></p>
                <div class="result-box">
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="title">聚合酶和核心试剂盒</div>
                            <div class="sub">PRC经典/聚合酶和核心试剂盒</div>
                        </li>
                        <li class="list-group-item">
                            <div class="title">聚合酶和核心试剂盒</div>
                            <div class="sub">PRC经典/聚合酶和核心试剂盒</div>
                        </li>
                        <li class="list-group-item">
                            <div class="title">聚合酶和核心试剂盒</div>
                            <div class="sub">PRC经典/聚合酶和核心试剂盒</div>
                        </li>
                        <li class="list-group-item">
                            <div class="title">聚合酶和核心试剂盒</div>
                            <div class="sub">PRC经典/聚合酶和核心试剂盒</div>
                        </li>
                        <li class="list-group-item">
                            <div class="title">聚合酶和核心试剂盒</div>
                            <div class="sub">PRC经典/聚合酶和核心试剂盒</div>
                        </li>
                    </ul>
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
import vHeader from '../../layout/Header/Header.vue';
import vFooter from '../../layout/Footer/Footer.vue';
export default {
    components: {
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
h1 {
    font-family: 'Fira Sans', sans-serif;
    font-weight: 100;
    font-size: 23px;
    margin-bottom: 25px;
    font-weight: 700
}
.result-box{
    margin-bottom: 40px;
    min-height: 200px;
    font-size: 14px;
    color: #555;
    .title{
        font-size: 16px;
        color: #227700;
        font-weight: 700;
        margin-bottom: 5px;
    }
    .sub{
        font-size: 12px;
        font-weight: 400;
    }
    .list-group-item:hover{
        background-color: #40be0e;
        color: #fff;
        cursor: pointer;
        .title{
            color: #fff;
        }
    }
}
</style>
