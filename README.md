
## 功能

-   [x] Element UI

## 安装步骤

```
git clone git@git.jovision.com:Jaws/WEB3.0.git   // 把模板下载到本地
cd WEB3.0   // 进入模板目录
npm install     // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 开启服务器，浏览器访问 http://localhost:8080
npm run dev

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 组件使用说明


### 限制规则

```js
import { validateInterAndZero } from '@/utils/validate';
const validateSeq = (rule, value, callback) => {
  if (value === '' || value === null || value === undefined) {
    callback();
  } else {
    if (!validateInterAndZero(value)) {
      callback(new Error('只能输入0以及正整数'));
    } else {
      if (value < 0 || value > 100000) {
        callback(new Error('只能输入0-100000'));
      } else {
        callback();
      }
    }
  }
};
```

### 公共样式
  
```
 页面中主按钮 type="primary" class="btn100" 
 页面中清空/取消按钮 type="default" class="btn100"
```

#### 示例
```html
<el-button type="primary" class="btn100" @click="search">查询</el-button>
<el-button type="default" class="btn100" @click="clearSearch">清空</el-button>
```

## 国际化处理

项目中使用vue-i18n处理国际化

### 语言包引入
```javascript
//  src/langs/index.js

import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || 'zh',
  messages
})

```

1. 默认使用当前localStorage中缓存的设置，如果没有，则默认为中文
2. 需要同时引入自定义的语言包和`element-ui`中内置的语言包，如果是element没有内置的语言，需要自行编写
3. 语言标识为方便统一，约定为小写的2个字母形式标识，具体参考语言代码对照表，例如中文是`zh`，英文是`en`，日语是`ja`

### 语言切换

```javascript
this.$i18n.locale = language
this.$store.dispatch('setLanguage', language)
```
这里的language必须与`src/langs/index.js`中定义的语言标识相统一
