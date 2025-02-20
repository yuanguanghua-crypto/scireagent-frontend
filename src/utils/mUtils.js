import CryptoJS from "crypto-js";
/**
 * 加密函数
 * @param passwd 明文密码
 * @return base64（Rsa(明文)）
 */


/**
 * 递归遍历替换参数对象中非Json格式string类型数据中特殊字符，\替换为/,"替换为',主要遍历obj和array类型的数据
 * @param obj 目标对象
 * @return obj 替换特殊字符后的对象
 */
export const repalceSpecialStr = (obj) => {
  if (obj && obj['isfilter']) {  //富文本场景 避免字符替换 传参额外添加 isfilter 属性标识
    return obj
  }

  //判断数据类型
  function getDataType(o) {
    var type = typeof o;
    if (type == 'object') {
      if (o === null) {
        return 'null';
      }
      if (o instanceof Array) {
        return 'array';
      } else {
        return 'object';
      }
    } else if (type == 'string') { //对json字符串不做替换处理
      try {
        var obj = JSON.parse(o);
        if (typeof obj == 'object' && obj) {
          return 'json';
        } else {
          return 'string';
        }
      } catch (e) {
        return 'string';
      }
    } else {
      return type;
    }
  }
  for (var i in obj) {
    var type = getDataType(obj[i]);
    if (type == 'string') {
      obj[i] = obj[i].replace(/\\/g, '/').replace(/"/g, "“").replace(/'/g, "‘");
    } else if (type == 'object' || type == 'array') {
      obj[i] = repalceSpecialStr(obj[i]);
    }
  }
  return obj;
}

//MD5加密方法
export const MD5 = (obj) => {
  return CryptoJS.MD5(obj).toString();
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  var value = window.localStorage.getItem(name);
  if (value !== null) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      value = value;
    }
  }
  return value;
}


/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
export const formatDate = (date, type) => {
  var year = date.getFullYear(); //年
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //月
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
  var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds() //毫秒
  if (type == 1) {
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
  } else if (type == 2) {
    return year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds;
  } else if (type == 3) {
    return year + "-" + month + "-" + day;
  } else if (type == 4) {
    return year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds + "+08:00"
  } else if (type == 5) {
    return month + "-" + day;
  } else {
    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  }
}


export const download_blob = (data, fileName) => {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
  });
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  if (window.navigator.msSaveOrOpenBlob) {
    // IE下载
    fileName = fileName+".xls";
    navigator.msSaveBlob(blob, fileName);
  } else {
    // IE10+下载
    const aEle = document.createElement("a"); // 创建a标签
    aEle.href = href;
    aEle.download = fileName; // 下载后文件名
    document.body.appendChild(aEle);
    aEle.click(); // 点击下载
    document.body.removeChild(aEle); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
}

// id生成
const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export const guid = () => {
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}


export const listToTree = (oldArr, filed, childArrFiled) => {
  oldArr.forEach(element => {
    let parentId = element[filed];
    if (parentId !== 0) {
      oldArr.forEach(ele => {
        if (ele.id == parentId) { //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
          if (!ele[childArrFiled]) {
            ele[childArrFiled] = [];
          }
          ele[childArrFiled].push(element);
        }
      });
    }
  });
  return oldArr.filter(ele => ele[filed] === 0);
}


// 自定义文件名称下载 支持各种类型
export const downloadFileByCustomName=(Url,fileName)=>{
  const fileBlobGet = (url,cb)=>{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      if (xhr.status === 200) {
        cb(xhr.response);
      }
    };
    xhr.send();
  }
  const fileBlobSave = (_blob,_filename)=>{
    // ie10-
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(_blob, _filename);
    } else {
      var link = document.createElement("a");
      var body = document.querySelector("body");
      link.href = window.URL.createObjectURL(_blob);
      link.download = _filename;
      // fix Firefox
      link.style.display = "none";
      body.appendChild(link);
      link.click();
      body.removeChild(link);
      window.URL.revokeObjectURL(link.href); //释放
    }
  }
  fileBlobGet(Url,function(blob) {
    fileBlobSave(blob,fileName)
  })
}

// 获取近一周   一个月  根据numb参数定义  当天往前推numb天
export const getAIData = (numb) => {
    // 创建一个空数组来存储日期
    let dates = [];
    // 获取当前日期
    let now = new Date();
    // 循环获取最近 7 天的日期
    // 获取当前日期的时间戳
    let timestamp = now.getTime();
    // 计算 i 天前的时间戳
    let dayTimestamp = 24 * 60 * 60 * 1000; // 一天的毫秒数
    let nowTimestamp = timestamp - 0 * dayTimestamp;            //  当天的时间
    let iDayAgoTimestamp = timestamp - numb * dayTimestamp;      //  七天  30天
    // 转换为日期对象
    let nowDate = new Date(nowTimestamp);
    // 格式化日期为 "yyyy-MM-dd" 的字符串并存入数组
    let nowYear = nowDate.getFullYear();
    let nowMonth = ("0" + (nowDate.getMonth() + 1)).slice(-2);
    let nowDay = ("0" + nowDate.getDate()).slice(-2);
    let endTime = nowYear + "-" + nowMonth + "-" + nowDay
    let idate = new Date(iDayAgoTimestamp);
    let year = idate.getFullYear();
    let month = ("0" + (idate.getMonth() + 1)).slice(-2);
    let day = ("0" + idate.getDate()).slice(-2);
    let startTime = year + "-" + month + "-" + day
    dates.push(startTime,endTime)
    return dates;
}
// 获取近一周   一个月  根据numb参数定义  当天往前推numb天 -------------精确到时分秒
export const getAIDatahh = (numb) => {
  // 创建一个空数组来存储日期
  let dates = [];
  // 获取当前日期
  let now = new Date();
  // 循环获取最近 7 天的日期
  // 获取当前日期的时间戳
  let timestamp = now.getTime();
  // 计算 i 天前的时间戳
  let dayTimestamp = 24 * 60 * 60 * 1000; // 一天的毫秒数
  let nowTimestamp = timestamp - 0 * dayTimestamp;            //  当天的时间
  let iDayAgoTimestamp = timestamp - numb * dayTimestamp;      //  七天  30天
  // 转换为日期对象
  let nowDate = new Date(nowTimestamp);
  // 格式化日期为 "yyyy-MM-dd" 的字符串并存入数组
  let nowYear = nowDate.getFullYear();
  let nowMonth = ("0" + (nowDate.getMonth() + 1)).slice(-2);
  let nowDay = ("0" + nowDate.getDate()).slice(-2);
  let endTime = nowYear + "-" + nowMonth + "-" + nowDay + ' 23:59:59'
  let idate = new Date(iDayAgoTimestamp);
  let year = idate.getFullYear();
  let month = ("0" + (idate.getMonth() + 1)).slice(-2);
  let day = ("0" + idate.getDate()).slice(-2);
  let startTime = year + "-" + month + "-" + day + ' 00:00:00'
  dates.push(startTime,endTime)
  return dates;
}

// 获取近一周   一个月  根据numb参数定义  当天往前推numb天  所有日期
export const getAllData = (numb) => {
    // 创建一个空数组来存储日期
    let dates = [];
    // 获取当前日期
    let now = new Date();
    // 循环获取最近 7 天的日期
    for (let i = 0; i < numb; i++) {
        // 获取当前日期的时间戳
        let timestamp = now.getTime();
        // 计算 i 天前的时间戳
        let dayTimestamp = 24 * 60 * 60 * 1000; // 一天的毫秒数
        let iDayAgoTimestamp = timestamp - i * dayTimestamp;
        // 转换为日期对象
        let date = new Date(iDayAgoTimestamp);
        // 格式化日期为 "yyyy-MM-dd" 的字符串并存入数组
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        dates.push(year + "-" + month + "-" + day);
    }
    return dates;
}


// 图片展示
export const getBaseImg = (val) => {
    if(!val){
        return '--'
    }
    // 正则表达式匹配Base64编码的图片
    const base64Regex = /^data:image\/[a-z]+;base64,/;        
    // return base64Regex.test(str);
    if(base64Regex.test(val)){
        return val
    }
    let protocol = window.location.protocol;
    let newIps = 'https://' + window.location.hostname + ':19090'
    let dows = newIps + '/download/'
    // let newIp = 'http://' + window.location.hostname + ':19000'
    let newIpts = 'https://' + window.location.hostname + ':19000'
    // let dow = newIp + '/download/'
    if(protocol == 'https:'){
        if(val.indexOf('http:') != -1){
            var myReg = /.+:(\d{1,5})/;
            var myResult = val.match(myReg);
            let ml = myResult[1].length
            let vl = val.lastIndexOf(':')
            let len = ml + vl + 1
            let oldIp = val.substr(0,len);
            return val = val.replace(oldIp, newIpts)
        }else{
            if(val.indexOf('/service_download_file') != -1){
                return val = newIps + '/' + val
            }else if(val.indexOf('/download/') != -1){
                return newIps + val
            }else if(val.indexOf('download/') != -1){
              return protocol + '//' + window.location.hostname + ':' + window.location.port +  '/' + val
            }else{
                return val = dows + val
            }
        }
    }else if(val.indexOf('http:') != -1){
        return val
    }else if(val.indexOf('/service_download_file') != -1){
        return protocol + '//' + window.location.hostname + ':' + window.location.port + '/' + val
    }else if(val.indexOf('/download/') != -1){
        return protocol + '//' + window.location.hostname + ':' + window.location.port + val
    }else if(val.indexOf('download/') != -1){
        return protocol + '//' + window.location.hostname + ':' + window.location.port +  '/' + val
    }else{
        return protocol + '//' + window.location.hostname + ':' + window.location.port + '/download/' + val
    }
}
