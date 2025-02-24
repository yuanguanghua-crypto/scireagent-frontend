// import Vue from 'vue';
// import Router from 'vue-router';


// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// Vue.use(VueRouter)
// Vue.use(Router);

// export default new Router({
//     mode: 'history', // 默认为'hash'模式
//     routes: [
//         // {
//         //     path: '/login',
//         //     component: () => import( /* webpackChunkName: "main" */ '@/components/login/Login.vue'),
//         //     meta: { title: '登录' }
//         // },
//         {
//             path: '/',
//             component: () => import( /* webpackChunkName: "main" */ '@/layout/Home.vue'),
//             meta: { title: '首页' },
//             redirect: '/index',
//             children: [
//                 {
//                     path: '/index',
//                     name: 'index',
//                     component: () => import( /* webpackChunkName: "main" */ '@/views/index/index.vue'),
//                     meta: { title: '业务管理' }
//                 },
//                 {
//                     path: '/shoppingCart/basket',
//                     name: 'basket',
//                     component: () => import( /* webpackChunkName: "main" */ '@/views/shoppingCart/index.vue'),
//                     meta: { title: '购物车' }
//                 },
                
                
//                 // {
//                 //     path: '/system',
//                 //     name: 'system',
//                 //     component: () => import( /* webpackChunkName: "main" */ '@/layout/MainMenu/SystemMenu.vue'),
//                 //     meta: { title: '系统管理' }
//                 // },

//             ]
//         },
        
//         {
//           path: '/403',
//           component: () => import( /* webpackChunkName: "main" */ '@/components/error/403.vue'),
//           meta: { title: '403' }
//         },
//         {
//           path: '/404',
//           component: () => import( /* webpackChunkName: "main" */ '@/components/error/404.vue'),
//           meta: { title: '404' }
//         },
//         {
//           path: '*',
//           redirect: '/404'
//         }
//     ]
// })









import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'index',
    component: () => import( /* webpackChunkName: "invitation" */ '@/views/index/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/ServiceAgreenment',
    name: 'ServiceAgreenment',
    component: () => import( /* webpackChunkName: "service" */ '@/components/AppRelease/ServiceAgreement.vue'),
    meta: {
      title: '服务协议'
    }
  },
  {
    path: '/PrivacyAgreement',
    name: 'PrivacyAgreement',
    component: () => import( /* webpackChunkName: "service" */ '@/components/AppRelease/PrivacyAgreement.vue'),
    meta: {
      title: '隐私协议'
    }
  },
  // -------------------------------------------------------

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
