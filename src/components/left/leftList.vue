
<template>
    <div class="contentmenu">
        <div class="h1">购物篮</div>
        <ul>
            <li class="active">购物篮</li>
            <li>登录/注册</li>
            <li>忘记密码</li>
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