import request from '@/utils/axios_async.js'

// 获取设备列表
export function getDeviceList(params={}) {
    return request({
        url: '/v3/aibox/device/getDeviceList',
        method: 'post',
        data: params
    })
}
// 设备添加
export function addDevice(params={}) {
    return request({
        url: '/v3/aibox/device/addDevice',
        method: 'post',
        data: params
    })
}

// 批量删除设备
export function batchDeleteDevice(params={}) {
    return request({
        url: '/v3/aibox/device/batchDeleteDevice',
        method: 'post',
        data: params
    })
}

// 重启设备
export function rebootDevice(params={}) {
    return request({
        url: '/v3/aibox/device/rebootDevice',
        method: 'post',
        data: params
    })
}

// 获取设备上已经配置的算法
export function getAbilityBySn(params={}) {
    return request({
        url: '/v3/aibox/channle/config/getAbilityBySn',
        method: 'post',
        data: params
    })
}

// 选择设备运行算法
export function selectAbilityList(params={}) {
    return request({
        url: '/v3/aibox/abilty/config/selectAbilityList',
        method: 'post',
        data: params
    })
}

// 算法配置====保存
export function configAbility(params={}) {
    return request({
        url: '/v3/aibox/abilty/config/configAbility',
        method: 'post',
        data: params
    })
}

// 添加/更新通道
export function addOrUpdateChannel(params={}) {
    return request({
        url: '/v3/aibox/channle/config/addOrUpdateChannel',
        method: 'post',
        data: params
    })
}

// 删除通道
export function deleteChannel(params={}) {
    return request({
        url: '/v3/aibox/channle/config/deleteChannel',
        method: 'post',
        data: params
    })
}

// 获取通道列表
export function getChannelList(params={}) {
    return request({
        url: '/v3/aibox/channle/config/getChannelList',
        method: 'post',
        data: params
    })
}

// 获取算法配置列表
export function getLocalAbilityList(params={}) {
    return request({
        url: '/v3/aibox/abilty/config/getLocalAbilityList',
        method: 'post',
        data: params
    })
}

// 启用/停止/卸载
export function controlAbility(params={}) {
    return request({
        url: '/v3/aibox/abilty/config/controlAbility',
        method: 'post',
        data: params
    })
}

// 应用包授权
export function authorizeAbility(params={}) {
    return request({
        url: '/v3/aibox/abilty/config/authorizeAbility',
        method: 'post',
        data: params
    })
}
// 升级
export function deviceUpgrade(params={}) {
    return request({
        url: '/v3/aibox/device/deviceUpgrade',
        method: 'post',
        data: params
    })
}


// 获取设备组件列表
export function getPackage(params={}) {
    return request({
        url: '/v3/aibox/device/getPackage',
        method: 'post',
        data: params
    })
}
// 获取组件版本信息
export function getPackageInfo(params={}) {
    return request({
        url: '/v3/aibox/device/getPackageInfo',
        method: 'post',
        data: params
    })
}
// 上传设备日志文件
export function logUpload(params={}) {
    return request({
        url: '/v3/aiedge/device/logUpload',
        method: 'post',
        data: params
    })
}

// 日志文件列表
export function getLogList(params={}) {
    return request({
        url: '/v3/aiedge/device/get_log_list',
        method: 'post',
        data: params
    })
}
// 日志文件列表--shanchu
export function delLog(params={}) {
    return request({
        url: '/v3/aiedge/device/delete_log',
        method: 'post',
        data: params
    })
}

// 一键清除--shanchu
export function clearAi(params={}) {
    return request({
        url: '/v3/aibox/device/deleteAll',
        method: 'post',
        data: params,
        timeout: 30000
    })
}