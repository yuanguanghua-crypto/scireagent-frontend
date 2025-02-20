<template>
<div>
    <template>
        <div class="box">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </template>
</div>
</template>

<script>
  import * as mUtils from '@/utils/mUtils';
  import bus from '@/utils/bus.js';
  export default {
    components: {},
    data() {
        return {};
    },
    computed: {
    },
    mounted() {},
    async created() {
 
    },
    methods: {
       
    }
  };
</script>
<style lang="less" scoped>
.main-menu {
  height: calc(100vh - 50px);
  background-color: #F0F2F5;
  overflow-y: auto;
  margin: 0 auto;
  &::-webkit-scrollbar { width: 8px }
}
.box{
    background: #F0F2F6;
    height: 100vh;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}

.content-box {
    // margin-left: 240px;
    width: 240px;
    float: left;
    background: #fff;
    height: 100vh;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
.content-boxs {
    background: #F5F7FD;
    height: 100vh;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
}
</style>
