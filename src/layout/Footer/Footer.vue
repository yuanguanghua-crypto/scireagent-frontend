<template>
    <div class="footer">
        <div class="container">
            
            <div class="row">
                <div class="col-md-3">
                    <h4>©2001 – 2025 试剂网站</h4>
                    <p><a href="">网站地图</a> | <a href="">印记</a> | <a href="">隐私声明</a></p>
                    <div class="socialmedia">
                        <a target="_blank" href=""><img src="../../assets/img/baidu.png" style="width:120px;height:40px" alt="baidu icom"></a>
                        <a target="_blank" href=""><img src="../../assets/img/360.png" style="width:120px;height:40px" alt="360 icon"></a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="h4"><a target="_self" href="">核苷酸和核苷</a></div>
                    <ul>
                        <li><a href="">核苷酸结构</a></li>
                        <li><a href="">核苷酸 (按应用)</a></li>
                    </ul>
                    <div class="h4"><a target="_self" href="">点击化学</a></div>
                    <ul>
                        <li><a href="">按化学成分点击试剂</a></li>
                        <li><a href="">按应用程序单击试剂</a></li>
                    </ul>
                    <div class="h4"><a target="_self" href="">分子生物学</a></div>
                    <ul>
                        <li><a href="">单个组件</a></li>
                        <li><a href="">PCR经典</a></li>
                        <li><a href="">实时PCR</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <div class="h4"><a target="_self" href="">词法表达式</a></div>
                    <ul>
                        <li><a href="">LEXSY配置</a></li>
                        <li><a href="">LEXSY栽培</a></li>
                    </ul>
                    <div class="h4"><a target="_self" href="">蛋白质类</a></div>
                    <ul>
                        <li><a href="">重组蛋白</a></li>
                        <li><a href="">天然蛋白质</a></li>
                    </ul>
                    <div class="h4"><a target="_self" href="">晶体学和cryo-em</a></div>
                    <ul>
                        <li><a href="">筛选</a></li>
                        <li><a href="">筛选膜蛋白</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <div class="h4"><a target="_self" href="">探针与表观遗传学</a></div>
                    <ul>
                        <li><a href="">无功组件</a></li>
                        <li><a href="">DNA/cDNA标记</a></li>
                    </ul>
                    <div class="h4"><a target="_self" href="">RNA技术</a></div>
                    <ul>
                        <li><a href="">生产mRNA的原料</a></li>
                        <li><a href="">RNA合成</a></li>
                    </ul>
                    <div class="h4">杂项</div>
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

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
};
</script>

<style lang="less" scoped>
.footer {
    color: rgba(255, 255, 255, 0.4);
    padding: 15px 0 100px 0;
    background-color: #434343;
    float: left;
    width: 100%;
    h4 {
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        margin: 20px 0 5px 0;
    }
    p, li {
        font-size: 14px;
        line-height: 1.5;
        font-weight: 300;
    }
    a{
        color: rgba(255, 255, 255, 0.4);
        font-weight: 400;
        font-size: 12px;
    }
    div.h4 {
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        margin: 20px 0 5px 0;
        a {
            font-weight: 700;
            color: rgba(255, 255, 255, 0.4);
        }
    }
    ul {
        margin: 0;
        padding: 0;
    }
}
</style>