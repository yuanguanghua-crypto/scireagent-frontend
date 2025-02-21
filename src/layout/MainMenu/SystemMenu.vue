<template>
    <div>
        <div class="systemMenu">
            <div class="systemMenu_item  flexBlock_column"
                 v-for="menuItem in menusGroup"
                 :key="menuItem.id">
                <div class="menuItem_head">
                    <span>{{menuItem.title}}</span>
                </div>
                <div class="menuItem_body flexBlock_row flexBlock_justy_start flexBlock_wrap">
                    <div class="menuItem_body_child  flexBlock_column flexBlock_justy_center"
                         v-for="menuItemChild in menuItem.children"
                         :key="menuItemChild.id"
                         @click="toTargetPage(menuItemChild)">
                        <img  v-if="menuItemChild.managerIcon" :src="require(`../../assets/img/v3/menu_icon/`+ menuItemChild.managerIcon)" alt />
                        <img v-else :src="require('../../assets/img/v3/menu_icon/icon_program.png')"  alt />
                        <span>{{menuItemChild.title}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {MenuVisitCount} from '@/api/v3/base_data/menu.js'
    import Pinyin from '../ChinesePY'
    export default {
        name:'systemMenu',
        computed: {
            menusGroup(){
                let  _menuGroup =  this.$store.state.menu.menuGroup.filter(item => item.type == 2)
                // 排序
                this.sort(_menuGroup)
                return _menuGroup
            },
        },
        created(){
            this.$store.commit('setCurrentMenu', 'system')
        },
        methods: {
            toTargetPage(item) {
                if(item.address.indexOf('https:') != -1 || item.address.indexOf('http:') != -1){
                    window.open(item.address, '_blank')
                    return
                }
                this.$store.commit('saveActive2LevelMenus', item.level2children);
                let url ='';
                let activeMenu = {};

                if(item.children[0] && item.children[0].children){
                    url = item.children[0].address;
                    activeMenu = item.children[0];
                }else{
                    url = item.address;
                    activeMenu = item;
                };

                // 菜单日志 二级
                MenuVisitCount({
                    firstModelId:item.active1LevelMenu.id,
                    secondMenuId:activeMenu.id
                }).then().catch((err)=>{})

                this.$router.push(url);
                this.$store.commit('setActiveMenu', activeMenu);
                this.$store.commit('setActive1LevelMenu', item.active1LevelMenu);
            },
            // 排序
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
            }
        }
    }
</script>

<style lang="less" scoped>
    .flexBlock_row {
        display: flex;
        flex-direction: row;
    }

    .flexBlock_column {
        display: flex;
        flex-direction: column;
    }

    .flexBlock_wrap {
        flex-wrap: wrap;
    }

    .flexBlock_justy_center {
        display: flex;
        justify-content: center;
        align-items: center;
        align-items: center;
    }

    .flexBlock_justy_start {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-items: center;
    }

    .systemMenu {
        width: 90%;
        min-height: 100%;
        margin: 0 auto;
        padding-bottom: 40px;
        padding-top: 1%;
        .systemMenu_item {
            width: 98%;
            padding: 1%;
            margin-bottom: 10px;

            .menuItem_head {
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
                height: 23px;
                line-height: 23px;
                margin-bottom: 16px;

            }

            .menuItem_body {
                width: calc(100% - 80px);
                padding:30px 40px;
                background: #FFFFFF;
                border-radius: 4px;
                border-radius: 4px;

                .menuItem_body_child {
                    text-align: center;
                    width: 140px;
                    height: 130px;
                    cursor: pointer;

                    &:last-child {
                        margin-right: 0;
                    }

                    img {
                        width: 72px;
                        height: 72px;
                        margin-bottom: 14px;
                    }

                    span {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        text-align: center;
                        height: 20px;
                        line-height: 20px;
                    }

                }
            }
        }
    }

</style>
