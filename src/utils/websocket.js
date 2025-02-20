import request from '@/utils/axios_async'
import bus from '@/utils/bus'

let wsWorker = null
let relinkTimer=null
// 创建WebSocket连接
/**
 * 创建链接
 * @param userInfo 用户信息
 * @param eventEnable 事件中心是否启用
 * @returns 异步创建连接
 */
export async function createConnection(userInfo, eventEnable) {
  if (wsWorker) {
    clearInterval(relinkTimer)
    return
  }
  const deviceId = uuid()
  const onlineTokenRes = await request({
    url: '/v3/auth/get_online_token',
    method: 'post',
    data: { clientType: 'web'}
  })
  if (onlineTokenRes.code !== 1000) {
    return Promise.reject()
  }
  wsWorker = new Worker('/websocket.worker.js')
  wsWorker.postMessage({
    method: 'createConnection',
    param: {
      base: {
        user: userInfo.id,
        token: onlineTokenRes.data.token,
        device_id: deviceId
      },
      url: `${onlineTokenRes.data.online_server_host}/${userInfo.id}/${onlineTokenRes.data.token}`
    },
  })
  wsWorker.addEventListener('message', event => {
      switch(event.data.method) {
        case 'PushAlarm': 
            eventEnable && bus.$emit('WsPushAlarm', event.data.param)
            break
        case 'PushNotice':
            bus.$emit('WsPushNotice', event.data.param)
            break
        case 'PushMessage':
            bus.$emit('WsPushMessage', event.data.param)
            break
        case 'PushConfig':
            bus.$emit('WsPushConfig', event.data.param)
            break
        case 'PushGuard':
            bus.$emit('WsPushGuard', event.data.param)
            break
        case 'PushCar':
            bus.$emit('WsPushCar', event.data.param)
            break        
        case 'PushAccess':
          bus.$emit('WsPushAccess', event.data.param)
          break            
        case 'TokenOverdue': // token过期
            bus.$emit('WsTokenOverdue')
            break
        case 'relink': // 服务器重启重新连接
            {
              if(event.data.param==1006){
                wsWorker=null
                relinkTimer=setInterval(function(){createConnection(userInfo, eventEnable)},60*1000)
              }
            }
          break    
      }
  })
}

/**
 * 用户下线 & 关闭连接
 */
export function closeConnection() {
  if (wsWorker) {
    wsWorker.postMessage({ method: 'closeConnection' })
    wsWorker = null
  }
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}