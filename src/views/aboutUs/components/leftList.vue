
<template>
    <div class="contentmenu">
        <div class="h1">关于我们</div>
        <ul>
            <li class="active">关于我们</li>
            <li>合同制造</li>
            <li>质量管理</li>
            <li>新闻博客</li>
            <li>通讯</li>
            <li>职业生涯</li>
            <li>JBS研讨会</li>
            <li>JBS在新闻界</li>
            <li>JBS项目</li>
            <li>隐私声明</li>
            <li>Jena Bioscience Facebook页面的隐私政策</li>
            <li>印记</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'echartBar',
    data() {
        return {
           
        };
    },
    watch: {},
    created(){
       
    },
    mounted(){},
    methods: {
       
    }
}
</script>
<style lang="less" scoped>
.contentmenu {
    .h1 {
        font-size: 20px;
        color: #000;
        font-weight: 400;
        color: #046500;
        
    }
    ul {
        list-style-position: outside;
        clear: left;
        padding: 0;
        li{
            padding: 2px 5px;
            color: #046500;
            font-size: 13px;
            padding: 5px;
        }

        li.active {
            background-color: #f2f2f2;
            padding: 10px 5px;
        }
    }
}


</style>