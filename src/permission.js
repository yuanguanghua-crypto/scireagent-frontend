
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach((to, from, next) => {    
    NProgress.start();
    next()
    // if (findWhiteList(to.path)) {
    //     next()
    // } else if (!localStorage.getItem('token')) {
    //     next('/login')
    // } else {
    //     if(to.redirectedFrom){
    //         if(this.$store.state.menu.activeMenu.address){
    //             next(this.$store.state.menu.activeMenu.address)
    //             window.open(item, '_blank')
    //             return 
    //         }                  
    //     }
    //     checkmenu({ menuPath: to.path }).then(res => {
    //         next(res.code !== 1000 || !res.data.hasPermission ? '/403' : undefined)
    //     })
    // }
    

})

router.afterEach((to,from) => {
    NProgress.done() // 结束Progress
})

export default findWhiteList