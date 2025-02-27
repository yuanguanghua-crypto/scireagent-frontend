import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import( /* webpackChunkName: "main" */ '@/views/index/index.vue'),
            meta: { title: '首页' },
            redirect: '/index',
            children: []
        },
        {
            path: '/index',
            name: 'index',
            component: () => import( /* webpackChunkName: "service" */ '@/views/index/index.vue'),
            meta: { title: '首页' }
        },
        {
            path: '/my-account/basket',
            name:'basket',
            component: () => import( /* webpackChunkName: "service" */ '../views/cart/index.vue'),
            meta: { title: '购物车' }
        },
        {
            path: '/about-us/about-us',
            name:'aboutUs',
            component: () => import( /* webpackChunkName: "service" */ '@/views/aboutUs/index.vue'),
            meta: { title: '关于我们' }
        },
        {
            path: '/search',
            name:'search',
            component: () => import( /* webpackChunkName: "service" */ '@/views/search/index.vue'),
            meta: { title: '搜索' }
        },
        // 产品
        {
            path: '/productOne',
            name:'productOne',
            component: () => import( /* webpackChunkName: "service" */ '@/views/product/index.vue'),
            meta: { title: '产品一' }
        },
        {
            path: '/productTwo',
            name:'productTwo',
            component: () => import( /* webpackChunkName: "service" */ '@/views/producTwo/index.vue'),
            meta: { title: '产品二' }
        },
        {
            path: '/productThree',
            name:'productThree',
            component: () => import( /* webpackChunkName: "service" */ '@/views/producThree/index.vue'),
            meta: { title: '产品三' }
        },
        {
            path: '/producFour',
            name:'producFour',
            component: () => import( /* webpackChunkName: "service" */ '@/views/producFour/index.vue'),
            meta: { title: '产品四' }
        },
        {
            path: '/producFive',
            name:'producFive',
            component: () => import( /* webpackChunkName: "service" */ '@/views/producFive/index.vue'),
            meta: { title: '产品五' }
        },

        







        {
            path: '/403',
            component: () => import( /* webpackChunkName: "service" */ '@/components/error/403.vue'),
            meta: { title: '403' }
        },
        {
            path: '/404',
            component: () => import( /* webpackChunkName: "service" */ '@/components/error/404.vue'),
            meta: { title: '404' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})