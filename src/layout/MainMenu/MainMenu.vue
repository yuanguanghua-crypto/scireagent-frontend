<template>
    <div class="box-menu scroll-box" >
        <!-- <div class="scroll-content" @scroll="onScroll" :style="'overflow-x: hidden; overflow-y: auto;height:' + contentStyleObj.height"> -->
        <div v-if="menusGroup.length > 0" class="scroll-content"  @scroll="handleScroll">

            <div v-for="(item,index) in menusGroup" :key="index" class="nav-main scroll-item" :class="'scrollItem'+index" :ref="'scrollItem'+index">
                <h3>{{item.title}}</h3>
                <el-row>
                    <el-col :span="24">
                        <div class="item-li" v-for="(child,inx) in item.children" :key="inx" @click="gotoPage(child)">
                            <div class="item-box">
                                <el-row :gutter="10">
                                    <el-col :span="7">
                                        <img :src="require('../../assets/img/v3/menu_icon/' + child.icon)" />
                                    </el-col>
                                    <el-col :span="17">
                                        <p class="titleMenu">{{child.title}}</p>
                                        <p class="info" :title="child.remark">{{child.remark}}</p>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="6" v-for="(child,inx) in item.children" :key="inx" class="item-box">
                        <div class="item-li" @click="gotoPage(child)">
                            <el-row :gutter="20">
                                <el-col :span="8"><img :src="require('../../assets/img/v3/menu_icon/' +item.icon)" alt /></el-col>
                                <el-col :span="16">
                                    <p class="titleMenu">{{child.title}}</p>
                                    <p class="info" :title="child.remark">{{child.remark}}</p>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row> -->
            </div>
        </div>
        <div v-else class="noDataInfo">暂无菜单权限，请联系管理员添加相关菜单权限</div>
        <div class="nav-tab">
            <ul>
                <li v-for="(item,index) in menusGroup" :key="index" @click="goNavList(index,'area')" :class="currtIndex == index? 'curtPonit':''">
                    <div class="line-right"></div>
                    {{item.title}}
                </li>
            </ul>
            <!-- <el-tabs v-model="tabName" tab-position="right" style="height: auto;">
                <el-tab-pane v-for="(item,index) in menusGroup" :key="index" :label="item.title" :name="item.title" @click="goNavList(index)">                
                </el-tab-pane>
            </el-tabs> -->
        </div>
    </div>
</template>

<script>
import {MenuVisitCount} from '@/api/v3/base_data/menu.js'
import Pinyin from '../ChinesePY'
import bus from '@/utils/bus';
export default {
    data() {
        return {
            stateName: '',
            tabIndex: '0',
            contentStyleObj: {
                height: '100px',
            },
            tabName: 'first',
            currtIndex: 0
        };
    },
    created() {
        this.$store.commit('setCurrentMenu', 'index')
        // this.getHight()
	    // window.addEventListener('resize', this.getHight)
    },
    mounted(){
        localStorage.setItem('systemType',1);
        bus.$emit('systemTypeChange', 1);
        bus.$emit('tagsEmpty', true);
        window.addEventListener('scroll', this.handleScroll);
    },
    computed: {
        menusGroup(){ // 解析业务菜单 type == 1
            // 排序
            // console.log(this.$store.state.menu.menuGroup.filter(item => item.type == 1),'-------------------')
            // return this.$store.state.menu.menuGroup.filter(item => item.type == 1 && item.code !== 'cockpit' ).sort((a,b)=>{
            //     return a.sort - b.sort
            // })
            let _currentMenu = this.$store.state.menu.menuGroup.filter(item => item.type == 1 && item.code !== 'cockpit' ).sort((a,b)=>{
                return a.sort - b.sort
            })
            _currentMenu.forEach(el => {
                if(el.children && el.children.length > 0){
                    el.children.sort((a,b)=>{
                        return a.sort - b.sort
                    })
                }
            });
            // let _activeL2Menus = _currentMenu ? [..._currentMenu.active1LevelMenu.children] : this.$store.state.menu.active2LevelMenus;
            // this.sort(_currentMenu);
            // console.log(_currentMenu)
            return _currentMenu
        },
        commonMenusGroup(){
            // return this.$store.state.menu.menuGroup.filter(item=>item.type !=2).filter(item=>item.visitCount>0);
            let arr = JSON.parse(JSON.stringify(this.$store.state.menu.menuGroup.filter(item=>item.type ==1).filter(item=>item.visitCount>0)))
            arr.sort((a,b)=>{
                return b.visitCount - a.visitCount
            })
            return arr;
        },

        menus(){
            return this.$store.state.menu.allMenus.filter(item=>item.level !=1).filter(item=>item.type ==1);
        },
        commonmenus(){
            let arr = this.$store.state.menu.menuGroup.filter(item=>item.type ==1).filter(item=>item.visitCount>0)
            let childmenus =  []
                arr.forEach((item)=>{
                    childmenus = [...childmenus,...item.children]
            })
            return childmenus;
        }
    },
    destroyed() {
    },
    methods: {
        //页面锚点定位
        goNavList(val) {
            this.currtIndex = val
            this.$el.querySelector(".scrollItem"+ val).scrollIntoView({ block: "start", behavior: "smooth" });
        },
        handleScroll() {
            var eleIndexs = this.getElementsInHeightRange(0, 300);
            let index=eleIndexs[0]
            if(!index)return
            this.currtIndex = index
        },
        getElementsInHeightRange(start, end) {
              var allElements = document.querySelectorAll('.scroll-item');
              var inRangeElements = [];
            
              for (var i = 0; i < allElements.length; i++) {
                var element = allElements[i];
                var rect = element.getBoundingClientRect();
                var offsetTop = rect.top + window.scrollY;
            
                if (offsetTop >= start && offsetTop <= end) {
                  inRangeElements.push(i);
                }
              }
            
              return inRangeElements;
      },
        // ---------------------------------------------------------------------------------------------------------------------------------
        //跳转页面
        gotoPage(item) {
            // console.log(item)
            if(item.address.indexOf('https:') != -1 || item.address.indexOf('http:') != -1){
                window.open(item.address, '_blank')
                return
            }
            this.sort([item])
            let url ='';
            let activeMenu = {};
            if(item.address){
                url = item.address;
                activeMenu = item.address;
            }
            // if(item.children && item.children.length > 0 && item.children[0].children && item.children[0].children.length){
            //     url = item.children[0].children[0].address;
            //     activeMenu = item.children[0].children[0];
            // }else{
            // console.log(item.children[0],'---00--')
            //     url = item.children[0].address;
            //     activeMenu = item.children[0];
            // }
            // 菜单日志
            MenuVisitCount({
                firstModelId: item.id,
                secondMenuId: activeMenu.id
            })
            // 跳转
            this.$router.push(url);
            this.$store.commit('saveActive2LevelMenus', item.children);
            this.$store.commit('setActiveMenu', activeMenu);
            this.$store.commit('setActive1LevelMenu', item);
        },

        //搜索结果点击事件
        menuChange(item) {
            // 菜单日志 二级
            MenuVisitCount({
                firstModelId:item.active1LevelMenu.id,
                secondMenuId:item.id
            }).then().catch((err)=>{})
            this.$router.push(item.address);
            this.$store.commit('saveActive2LevelMenus', item.level2children);
            this.$store.commit('setActiveMenu', item);
            this.$store.commit('setActive1LevelMenu', item.active1LevelMenu);
        },
        sort(data){
            if(Array.isArray(data)) {
                data.sort((a,b)=>{
                    if( (a.sort - b.sort)>0) {
                        return 1
                    }else if((a.sort - b.sort)<0) {
                        return  -1
                    }else{
                        return this.compare(a.title , b.title) 
                    }
                })
            }
            data.map((item)=>{
                if(item.children && item.children.length>0) {
                    this.sort(item.children)
                }
            })
        },
        compare(a, b) {
            var zhReg = /^[\u4e00-\u9fa5]$/
            var reg=/^[0-9]+.?[0-9]*$/;
            for(let index = 0 ; index < a.length && index < b.length ; index ++) {
                if((zhReg.test(a[index]) && zhReg.test(b[index]))){
                    const curResult =  Pinyin.getWordsCode(a[index]).localeCompare(Pinyin.getWordsCode(b[index]))
                    if(curResult !== 0) {
                        return curResult
                    }
                }else if((!zhReg.test(a[index]) && !zhReg.test(b[index]))) {
                    if(reg.test(+a[index])&& reg.test(+b[index])){
                        const curResult = a[index].localeCompare(b[index])
                        if(curResult !== 0) {
                            return curResult
                        }
                    }else if(reg.test(+a[index])){
                        return 1
                    }else if(reg.test(+b[index])){
                        return -1
                    }
                } else if(zhReg.test(a[index])) {
                    return -1
                }else if(zhReg.test(b[index])) {
                    return 1
                }
            }
            if(a.length > b.length) {
                return 1
            } else if(a.length < b.length) {
                return -1
            } else {
                return 0
            }
        },
        //当前激活
        activeMenuFunc(item) {
            // console.log('001----',this.$store.state.menu.activeMenu)
            if(item.indexOf('https:') != -1 || item.indexOf('http:') != -1){
                window.open(item, '_blank')
                return
            }
            if (this.$store.state.menu.activeMenu && Object.keys(this.$store.state.menu.activeMenu).length == 0) {
                //  路由 判断
                let _allMenus = this.$store.state.menu.allMenus;
                let _currentMenu = null;
                //  当前路由信息
                _allMenus.forEach(item => {
                    if (item.address == this.$route.path) {
                        _currentMenu = item;
                    }
                });

                // 当前路由信息 的 上级路由
                let _parentMenus = null;
                _allMenus.forEach(item => {
                    if (item.address == _currentMenu.parent1Menu) {
                        _parentMenus = item;
                    }
                });

                this.$store.commit('setActiveMenu', _parentMenus);
                return _parentMenus;
            } else {
                return this.$store.state.menu.activeMenu;
            }
            // console.log('当前激活----',item)
            // if(item.indexOf('https:') == -1 || item.indexOf('http:') == -1){
            let _menus =  this.active2LevelMenus()
            _menus.forEach(ele => {
                if (ele.address == item) {
                    this.$store.commit('setActiveMenu', ele);
                    // 菜单日志 二级
                    MenuVisitCount({
                        firstModelId: this.active1LevelMenu.id,
                        secondMenuId: ele.id
                    }).then().catch(err => {});
                }
                if (ele.children && ele.children.length) {
                    ele.children.forEach(submenu => {
                        if (submenu.address == item) {
                            this.$store.commit('setActiveMenu', item);
                        }
                    });
                }
            });
        },
        // -----------------------------------------------------------------



    }
};
</script>
<style lang="less" scoped>
 ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
    }
.search-wrap {
    margin: 52px 0 42px 0px;
    width:100%;
    display: flex;
    justify-content: space-between;
    .search-tit {
        font-size: 18px;
        color: #333;
    }
    /deep/ .el-input--small .el-input__inner {
        height: 36px;
        line-height: 36px;
    }
    .icon_search{
        margin-right: 5px;
        margin-top: 8px;
        display: inline-block;
        width:19px;
        height: 19px;
        vertical-align: middle;
        background: url("../../assets/img/main/icon_search.png");
    }
}
.menu_common,.menu_base{
    width: 58%;
    margin: 0 auto;
}

/deep/ .addr {
    color: #999;
}
/deep/ .el-tooltip__popper.is-light{
    border:none;
    border-color: none;
}

.box-menu{
    height:  calc(100vh - 120px);
    padding: 30px 260px;
    background-color: #F0F2F6;
    // height: 100%;
    overflow: hidden;
    h3{
        height:28px;
        line-height: 28px;
        margin-top: 20px;
        text-indent: 1.2em;
        font-size: 16px;
    }
    /deep/.is-active{
        width: 200px;
        height: 60px;
        line-height: 60px;
        font-weight: 500;
        font-size: 16px;
        color: #165DFF;
        font-style: normal;
        background: linear-gradient( 270deg, #fff 0%, rgba(255,255,255,0) 100%);
    }
    /deep/.el-tabs__active-bar{
        background-color: #165DFF;
    }
    /deep/.el-tabs__nav-wrap:after{
        background: #D8D8D8;
    }
    /deep/.el-tabs--right .el-tabs__nav-wrap.is-right::after {
        right: 0;
        left: auto;
    }
    /deep/.el-tabs__active-bar{
        right: 0 !important
    }
    /deep/.el-tabs--right .el-tabs__active-bar.is-right {
        right: 0 !important;
    }
}

.nav-tab{
    position: fixed;
    right: 160px;
    // bottom: 25%;    
    // top: 25%;
    top: 50%;
    transform: translateY(-50%);
    ul{
        height: auto;
        border-right: 2px solid #e5e5e5;
        li{
            position: relative;
            height: 60px;
            padding-right: 20px;
            line-height: 60px;
            font-size: 15px;
            width: 200px;
            text-align: right;
            // margin: 10px auto;
            cursor: pointer;
            
        }
        li.curtPonit{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 16px;
            color: #165DFF;
            font-style: normal;
            background: linear-gradient( 270deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
            .line-right{
                position: absolute;
                right: -2px;
                width: 2px;
                height: 60px;
                background-color: #165DFF;
            }
        }
        li:hover{
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            color: #165DFF;
            font-style: normal;
            background: linear-gradient( 270deg, #FFFFFF 0%, rgba(255,255,255,0) 100%);
            .line-right{
                position: absolute;
                right: -2px;
                width: 2px;
                height: 60px;
                background-color: #165DFF;
            }
        }
    }
}
/deep/.el-tabs__nav{
    height: auto;
}
/deep/.el-tabs__header{
    background-color: #F7F8FA;
}
.nav-main{
    clear: both;
    height: auto;
}
</style>
<style lang="less">
.el-autocomplete-suggestion li{
    overflow: inherit!important;
}
.nav-box{
    height: auto;
    clear: both;
    margin: 0 auto;

    
}
.item-box{
        width: 240px;
        height: 60px;
        background-color: #fff;
        float: left;
        margin: 20px 10px;
        padding: 20px;
        border-radius: 6px;
        // .item-li{
        //     height: 80px;
        //     margin: 10px;
        //     padding: 10px 20px;
        //     border-radius: 4px;
        //     text-align: center;
        //     color: #333;
        //     cursor: pointer;
        //     box-sizing: border-box;
        //     background: #fff;
        // }
        // .item-li:hover {
        //     box-shadow: 0 1px 5px 5px rgba(10, 111, 232, .20);
        //     -webkit-transform: translateY(-1px);
        //     -moz-transform: translateY(-1px);
        //     transform: translateY(-1px)
        // }
        img {
            width: 60px;
            height: 60px;
        }
        p{
            text-align:left;
            height: 30px;
            line-height: 30px;
        }

        .title {
            margin-bottom: 10px;
            font-size: 16px;
            color: #333;
        }
        .titleMenu{
            font-family: 'Microsoft YaHei';
            font-weight: 550;
            font-size: 15px;
            color: #1D2129;
            line-height: 35px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .info {
            font-weight: 400;
            font-size: 14px;
            color: #888;
            line-height: 28px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .item-box:hover {
        box-shadow: 0 4px 10px rgba(78, 89, 105, .06);
        // -webkit-transform: translateY(-1px);
        // -moz-transform: translateY(-1px);
        // transform: translateY(-1px);
        cursor: pointer;
    }
    .noDataInfo{
        height: calc(100vh - 160px);
        width:400px;
        margin: 0 auto;
        text-align: center;
        line-height: calc(100vh - 160px);
        font-weight: 400;
        font-size: 14px;
        color: #1D2129;
        font-style: normal;
        background-image: url('../../assets/img/menu.png');
        background-repeat: no-repeat;
        background-size: 165px 165px;
        background-position: 50% 30%;
    }
    .scroll-content{
      height: 100%;
      overflow-y: auto;
    }
    // ::-webkit-scrollbar {
    //     display: none;
    // }
</style>
