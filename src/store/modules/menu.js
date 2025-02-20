const menu = {
  state: {
    currentMenu: localStorage.getItem('currentMenu') || 'index',
    menuGroup: localStorage.getItem("menuGroup") ? JSON.parse(localStorage.getItem("menuGroup")) : [], //当前登录人的权限菜单
    allMenus: localStorage.getItem("allMenus") ? JSON.parse(localStorage.getItem("allMenus")) : [], //当前登录人的所有菜单 一二三级
    active2LevelMenus: localStorage.getItem("active2LevelMenus") ? JSON.parse(localStorage.getItem("active2LevelMenus")) : [], //当前被激活的一级菜单下面的所有二级菜单
    activeMenu: localStorage.getItem("activeMenu") ? JSON.parse(localStorage.getItem("activeMenu")) : {}, //当前被激活的末级菜单
    active1LevelMenu: localStorage.getItem("active1LevelMenu") ? JSON.parse(localStorage.getItem("active1LevelMenu")) : [], //当前被激活的一级菜单
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    styleConfig: null
  },
  mutations: {
    setCurrentMenu(state, menuType) {
      localStorage.setItem('currentMenu', menuType)
      state.currentMenu = menuType
    },
    // 一级菜单
    saveMenu(state, menu) {
      localStorage.setItem('menuGroup', JSON.stringify(menu))
      state.menuGroup = menu;
    },
    // 当前登录人的所有菜单 一二三级
    saveAllMenu(state, menu) {
      localStorage.setItem('allMenus', JSON.stringify(menu))
      state.allMenus = menu;
    },
    // 当前被激活的一级菜单下面的所有二级菜单
    saveActive2LevelMenus(state, menu) {
      localStorage.setItem('active2LevelMenus', JSON.stringify(menu))
      state.active2LevelMenus = menu;
    },
    // 当前被激活的末级菜单
    setActiveMenu(state, menu) {
      localStorage.setItem('activeMenu', JSON.stringify(menu))
      state.activeMenu = menu;
    },
    //当前被激活的一级菜单
    setActive1LevelMenu(state, obj) {
      localStorage.setItem('active1LevelMenu', JSON.stringify(obj))
      state.active1LevelMenu = obj;
    },
    setUserInfo(state, userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      state.userInfo = userInfo;
    },
    setAlarmConfig(state, alarmConfig) {
      Object.assign(state.userInfo, alarmConfig)
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    setStyleConfig(state, styleConfig) {
      state.styleConfig = styleConfig
    }
  },
  actions: {

  }
}


export default menu;
