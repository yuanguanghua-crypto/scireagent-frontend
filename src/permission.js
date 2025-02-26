
import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // progress bar style
const whiteList = [
    '/appbench',
    '/appbench/licensePlateManage/vehicleAlarmManage',
    '/appbench/licensePlateManage',
    '/filtrate',
    '/search',
    '/appbench/licensePlateManage/vehicleAlarmRecordManage',
    '/warningFiltrate',
    '/warningSearch',
    '/appbench/licensePlateManage/alarmStatisticsManage',
    '/filtrateStatis',
    '/invitation',
    '/ServiceAgreenment',
    '/PrivacyAgreement',
    '/appbench/headcountManage/flowManage'    
] // 白名单
function findWhiteList(path, isParent = false) {
    return whiteList().find(item => {
        if (typeof item === 'string') {
            return item === path
        } else {
            return (isParent ? item.parent : item.path) === path
        }
    })
}
router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
})

router.afterEach((to,from) => {
    NProgress.done() // 结束Progress
})

export default findWhiteList