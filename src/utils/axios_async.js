import axios from 'axios'
import vm from '../main'
import * as mUtils from '@/utils/mUtils'
import qs from 'qs'
// 创建axios实例
let service = axios.create({
  baseURL: '',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  const XDate = mUtils.formatDate(new Date(), 4)
  const paramStr = JSON.stringify(mUtils.repalceSpecialStr(config.data))
  const XSign = mUtils.MD5(config.method.toUpperCase() + config.url + XDate + mUtils.MD5(paramStr) + '1H8OoEUF')
  Object.assign(config.headers, {
    'X-Date': XDate,
    'X-Sign': XSign,
    'Content-Type': 'application/json',
    'lang': vm.$store.state.app.language.toUpperCase(),
    'clientType': 'web'
  })
  if (!config.headers['X-Token']) {
    Object.assign(config.headers, { 'X-Token': localStorage.getItem('token') })
  }
  if (config.url=='/v3/aiedge/device/logUpload') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // debugger
      config.data = qs.stringify(config.data)
      // console.log(config)
  }
  return config
})

function toLogin() {
  if (vm.$store.state.app.loginTimeout) return
  let loginuser = localStorage.getItem('loginuser')
  localStorage.clear()
  if(loginuser) {
    localStorage.setItem('loginuser', loginuser)
  }
  vm.$store.dispatch('setLoginTimeout', true)
  vm.$router.replace({ path: '/login' });
  if(vm.$store.state.app.playerPlugin && vm.$store.state.app.playerPlugin.isInit) {
    vm.$store.state.app.playerPlugin.logout()
    vm.$store.state.app.playerPlugin = null
  }
}

// respone拦截器
service.interceptors.response.use(
  response => {
    // 导出
    if (response.request.responseType == 'arraybuffer') {
      try {
        let enc = new TextDecoder('utf-8')
        let dataObj = JSON.parse(enc.decode(new Uint8Array(response.data)))
        if (dataObj.code) {
          if (!document.getElementsByClassName('el-message').length){
            vm.$message.error(dataObj.msg)
          }
          return;
        }
      } catch (error) {
        return response.data;
      }
    }
    if (response.data.code === 1000) return response.data
    if (response.data.code === 2001) {
      toLogin()
      return Promise.reject(response.data)
    } else {
        vm.$message.error(response.data.msg);
      // if (!document.getElementsByClassName('el-message').length){
      //   vm.$message.error(response.data.msg);
      // }
      return response.data
    }
  },
  error => {
    if (error.response) {
      let msg1 = error.response.statusText;
      let msg2 = error.response.data && error.response.data.msg;
      if (!document.getElementsByClassName('el-message').length){
        vm.$message.error(msg1 || msg2);
      }
    }
    return Promise.reject(error.response)
  }
)
export default service
