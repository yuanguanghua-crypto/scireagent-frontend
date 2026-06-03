import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../pages/CategoryPage.vue'),
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: () => import('../pages/ProductPage.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../pages/SearchPage.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../pages/CartPage.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../pages/FaqPage.vue'),
    },
  ],
})

export default router
