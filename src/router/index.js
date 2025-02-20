import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    mode: 'history', // 默认为'hash'模式
    routes: [
        // {
        //     path: '/login',
        //     component: () => import( /* webpackChunkName: "main" */ '@/components/login/Login.vue'),
        //     meta: { title: '登录' }
        // },
        // {
        //     path: '/',
        //     component: () => import( /* webpackChunkName: "main" */ '@/layout/Home.vue'),
        //     meta: { title: '首页' },
        //     redirect: '/index',
        //     children: [
        //         {
        //             path: '/index',
        //             name: 'index',
        //             component: () => import( /* webpackChunkName: "main" */ '@/layout/MainMenu/MainMenu.vue'),
        //             meta: { title: '业务管理' }
        //         },
        //         {
        //             path: '/system',
        //             name: 'system',
        //             component: () => import( /* webpackChunkName: "main" */ '@/layout/MainMenu/SystemMenu.vue'),
        //             meta: { title: '系统管理' }
        //         },

        //     ]
        // },
        {
          path: '/index',
          component: () => import( /* webpackChunkName: "map" */ '@/views/index/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/403',
          component: () => import( /* webpackChunkName: "main" */ '@/components/error/403.vue'),
          meta: { title: '403' }
        },
        {
          path: '/404',
          component: () => import( /* webpackChunkName: "main" */ '@/components/error/404.vue'),
          meta: { title: '404' }
        },
        {
          path: '*',
          redirect: '/404'
        }
    ]
})
