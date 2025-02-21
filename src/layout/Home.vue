<template>
<div class="contentpage">
    <template>
        <vHeader></vHeader>
        <router-view></router-view>
        <vFooter></vFooter>
    </template>
</div>
</template>

<script>
import vHeader from './Header/Header.vue';
import vFooter from './Footer/Footer.vue';
import * as mUtils from '@/utils/mUtils';
import bus from '@/utils/bus.js';
export default {
    components: {
        vHeader,
        vFooter
    },
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
</style>
