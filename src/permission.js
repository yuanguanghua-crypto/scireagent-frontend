
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach((to, from, next) => {    
    NProgress.start();
    next()
})

router.afterEach((to,from) => {
    NProgress.done() // 结束Progress
})

export default findWhiteList