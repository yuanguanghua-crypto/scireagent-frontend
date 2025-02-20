export const mixTableHeight = (useHeight = 180, ref = 'table') => {
    return {
        data() {
            return {
                tableHeight: 0
            }
        },
        methods: {
            comHeight() {
                if (!this.$refs[ref]) return
                this.$nextTick(() => {
                    setTimeout(()=>{
                        this.tableHeight = window.innerHeight - this.$refs[ref].$el.offsetTop - useHeight;
                    },300)
                    // 监听窗口大小变化
                    window.onresize = () => {
                        if (!this.$refs[ref]) return
                        this.tableHeight = window.innerHeight - this.$refs[ref].$el.offsetTop - useHeight;
                    };
                });
            }
        },
        mounted() {
            this.comHeight()
        }
    }
}
export const mixTableHeight2 = (useHeight = 180, ref = 'table',offsetTop=54) => {
  return {
      data() {
          return {
              tableHeight: 0
          }
      },
      methods: {
          comHeight() {
              if (!this.$refs[ref]) return
              this.$nextTick(() => {
                  setTimeout(()=>{
                      this.tableHeight = window.innerHeight - offsetTop - useHeight;
                  },300)
                  // 监听窗口大小变化
                  window.onresize = () => {
                      if (!this.$refs[ref]) return
                      this.tableHeight = window.innerHeight - offsetTop - useHeight;
                  };
              });
          }
      },
      mounted() {
          this.comHeight()
      }
  }
}
// 列表生成树
export function toTree(data) {
  let result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
      delete item.children;
  });
  let map = {};
  data.forEach(item => {
      map[item.id] = item;
  });
  data.forEach(item => {
    let parent = map[item.parentId];
    if (parent) {
        (parent.children || (parent.children = [])).push(item);
    } else {
        result.push(item);
    }
  });
  return result;
}
// 查找树所有节点id
export function getChildNodes(data, result = []){
  if (!Array.isArray(data)) {
    return result
  }
  for(var i in data){
    result.push(data[i].id)
    if(data[i].children){
      getChildNodes(data[i].children,result);
    }
  }
  return result;
}
// 查找树所有节点数据
export function getChildNodesInfo(data, result = []){
  if (!Array.isArray(data)) {
    return result
  }
  for(var i in data){
    result.push(data[i])
    if(data[i].children){
      getChildNodesInfo(data[i].children,result);
    }
  }
  return result;
}
// 查找树所有节点
export function getChildNodesByList(data, result = []){
  if (!Array.isArray(data)) {
    return result
  }
  for(var i in data){
    result.push(data[i].id)
    if(data[i].list){
      getChildNodesByList(data[i].list,result);
    }
  }
  return result;
}
// 查找节点的所有父元素
export function familyTree(arr1, id) {
  // 声明数据集合
  var temp = [];
  // 声明递归函数
  var forFn = function (arr, id) {
    // 遍历树
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item.id === id) {
        // 查找到指定节点并加入集合
        temp.push(item);
        // 查找其父节点
        forFn(arr1, item.parentId);
        // 不必向下遍历，跳出循环
        break;
      } else {
        if (item.children) {
          // 向下查找到id
          forFn(item.children, id);
        }
      }
    }
  };
  // 调用函数
  forFn(arr1, id);
  // 返回结果
  return temp;
}
// 查找节点的所有父元素
export function familyTreeByList(arr1, id) {
  // 声明数据集合
  var temp = [];
  // 声明递归函数
  var forFn = function (arr, id) {
    // 遍历树
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item.id === id) {
        // 查找到指定节点并加入集合
        temp.push(item);
        // 查找其父节点
        forFn(arr1, item.parentId);
        // 不必向下遍历，跳出循环
        break;
      } else {
        if (item.list) {
          // 向下查找到id
          forFn(item.list, id);
        }
      }
    }
  };
  // 调用函数
  forFn(arr1, id);
  // 返回结果
  return temp;
}
// 合并区域通道树的通道和区域
export function setAreasChannelTree(data){
  if (!Array.isArray(data)) {
    return []
  }
  data.forEach(item=>{
    if(item.areaChannels&&item.areaChannels.length>0){
      if(!item.children){
        item.children=[]
      }
      item.areaChannels.forEach(channelsItem=>{
        channelsItem.parentId=item.id;
        item.children.push(channelsItem);
      })
    }
    if(item.id){
      item.type="1"
    }else{
      item.type="2"
      item.id=item.channelId
    }
    item.devicePowerList=[];
    if(item.children){
      setAreasChannelTree(item.children);
    }
  })
  return data;
}
// 根据id查父元素
export function getParentTree(id, tree) {
  let arr = [] //要返回的数组
  for (let i = 0; i < tree.length; i++) {
    let item = tree[i]
    arr = []
    arr.push(item) //保存当前节点id
    if (id== item.id) {
      //判断当前id是否是默认id
      return arr //是则退出循环、返回数据
    } else {
      //否则进入下面判断，判断当前节点是否有子节点数据
      if (item.children && item.children.length > 0) {
        //合并子节点返回的数据
        arr = arr.concat(getParentTree(id, item.children ? item.children : []))
        console.log(arr)
        if (arr.map(item2 => (item2 ? item2.id : '')).includes(id)) {
          //如果当前数据中已包含默认节点，则退出循环、返回数据
          return arr
        }
      }
    }
  }
}