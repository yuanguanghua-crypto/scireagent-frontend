<!-- 区域通道树 -->
<template>
    <div>
        <div class="search-wrap">
            <el-input :placeholder="$t('qsrdtsb')" style="width:90%;margin-right:5px" v-if="isTreeSearch" v-model="filterText">
                <i slot="suffix" class="el-icon-search"></i>
            </el-input>
            <i class="el-icon-refresh" @click="getAreaChannelTree"></i>
        </div>
        <el-tree
            ref="tree"
            class="tree-channel"
            :default-expanded-keys="expandKeys"
            :default-checked-keys="checkedKeys"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :data="treeData"
            :show-checkbox="showCheckbox"
            node-key="id"
            @check="checkNode"
            @node-click="nodeClick"
            @check-change="handleCheckChange"
            :props="treeprops"
            :check-strictly='false'>
            <span :title="node.label" class="custom-tree-node" slot-scope="{ data,node }">
                <span class="el-tree-node__label">
                    <span v-if="!data.channelId">
                        <img v-if="data.cloudIdentity=='SELF'" style="width: 18px" src="@/assets/icons/icon_area.svg"/>
                        <img v-if="data.cloudIdentity=='CLOUD'" style="width: 18px" src="@/assets/icons/yqy.png"/>
                    </span>
                    <span v-else>
                        <img style="width: 18px" :src="channelIconShow(data.channelType,data.channelStatus)" >
                    </span>
                    <span class="node-txt">{{ node.label }}</span>
                </span>
            </span>
        </el-tree>
    </div>
</template>
<script>
import { AreasChannelTree } from '@/api/v3/base_data/role';
import { setAreasChannelTree } from '@/common/js/common.js';
export default {
    name: 'treeMenu',
    props: {
        isTreeSearch: {
            type: Boolean,
            default() {
                return false;
            }
        },
        showCheckbox: {
            type: Boolean,
            default() {
                return false;
            }
        },
        isDefaultChecked: {
            //是否初始化默认选中节点
            type: Boolean,
            default() {
                return false;
            }
        },
        checkedKeys: {
            require: true,
            type: Array,
            default() {
                return [];
            }
        },
        code: {
            type: String,
            default: '1'
        },
        setType:{
            type: String,
            default: 'false'
        },
        powerInfo:{
            type: String,
            default: ''
        },
        areaType:{
            type: String,
            default: ''
        },
    },
    data() {
        return {
            expandKeys: [],
            filterText: '',
            treeData: [],
            treeprops: {
                children: 'children',
                label: function (a, b) {
                    return a.name || a.channelName;
                }
            },
            GchannelOnlIcon: require('@/assets/img/v3/video/channel_online.svg'), //枪机 通道在线
            GchannelOflIcon: require('@/assets/img/v3/video/channel_offline.svg'), // 枪机 通道离线
            QchannelOnlIcon: require('@/assets/img/v3/video/qonline.svg'), //球机 通道在线
            QchannelOflIcon: require('@/assets/img/v3/video/qoff.svg'), // 球机 通道离线
            HchannelOnlIcon: require('@/assets/img/v3/video/halfOnline.svg'), // 半机 通道在线
            HchannelOflIcon: require('@/assets/img/v3/video/halfoutline.svg'), // 半机 通道在线
        };
    },
    created() {
        this.getAreaChannelTree();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        //  通道图标展示
        channelIconShow(type,status) {
            if(status== 1) {//在线
                switch (type) {
                    case '1'://球机
                        return  this.QchannelOnlIcon
                        break;
                    case '2'://半球机
                        return  this.HchannelOnlIcon
                        break;
                    default: //枪机
                        return  this.GchannelOnlIcon 
                        break;
                }
            }else { //离线
                switch (type) {
                    case '1'://球机
                        return  this.QchannelOflIcon
                        break;
                    case '2'://半球机
                        return  this.HchannelOflIcon
                        break;
                    default: //枪机
                        return  this.GchannelOflIcon
                        break;
                }
            }
        },

        filterNode(value, data) {
            if (!value) return true;
            let name = data.name || data.channelName;
            return name.indexOf(value) !== -1;
        },
        filterParam(list = []) {
            list.forEach(item => {
                if (item.children) {
                    item['disabled']=true
                    this.filterParam(item.children);
                }
            });
        },
        powerParam(list) {
            if (list.length==0) return
            var a=[]
            for(var i=0;i<list.length;i++){
                if(this.powerInfo=='ptz_control'&&list[i].supportAbility!=undefined){

                    if(list[i].supportAbility==''||list[i].supportAbility.indexOf('ptz')==-1) {
                        list.splice(i,1)
                        i--
                    }
                }
                if(this.powerInfo=='voice_intercom'&&list[i].supportAbility!=undefined){

                    if(list[i].supportAbility==''||list[i].supportAbility.indexOf('talk')==-1) {
                        list.splice(i,1)
                        i--
                    }
                }
                if(list[i]!=undefined){
                    if (list[i].children && list[i].children.length) {
                        this.powerParam(list[i].children);
                    }
                }
            }
        },

        //获取有权限的区域通道树
        async getAreaChannelTree() {
            this.filterText = ''
            let res = await AreasChannelTree({ deviceClassify: this.code,powerList:[this.powerInfo],areaType:this.areaType });

            this.treeData = setAreasChannelTree(res.data);
            if(this.setType=='preset'||this.setType=='track'||this.setType=='videoTime'||this.setType=='video'||this.setType=='img'){
                this.treeData.forEach(item => {
                    if (item.children && item.children.length) {
                        item['disabled']=true
                        this.filterParam(item.children);
                    }
                });
            }
            if (this.treeData[0] && this.treeData[0].id) {
                this.expandKeys.push(this.treeData[0].id);
            }
            this.treeData = this.addPathToTree(this.treeData);
            this.$emit('allAreaTree', this.treeData);
            this.setDefaultClick(this.treeData);
        },

        addPathToTree(list = [], path = '', id = '') {
            list.forEach((item) => {
                if (item.channelId) {
                    item.path = path + ',' + id;
                }
                if (item.children && item.children.length) {
                    this.addPathToTree(item.children, item.path, item.id);
                }
            });
            return list;
        },
        // 初始化默认点击的节点
        setDefaultClick(val) {
            if (!this.isDefaultChecked) return;
            if (val.length == 0) {
                this.$emit('nodeClick', { id: '0' });
                return;
            }
            this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(val[0].id);
            });
            this.$emit('nodeClick', val[0]);
        },
        //节点点击事件
        nodeClick(node) {
            this.$emit('nodeClick', node);

        },
        // 复选框选中
        checkNode(node, currentNode) {
            var arr=['videoTime','video','img']
            var type =arr.indexOf(this.setType)>-1?true:false
            var num=0
            if(currentNode.checkedNodes.length!=0){
                for (let i = 0; i < currentNode.checkedNodes.length; i++) {
                    if(currentNode.checkedNodes[i].children==undefined){
                        num++
                    }
                }
            }
            if(type&&num>=5){
                if(currentNode.checkedKeys.length>=5){}
                for (let i = 0; i < currentNode.checkedKeys.length; i++) {
                    if(node.id==currentNode.checkedKeys[i]){
                        currentNode.checkedKeys.splice(i,1)
                    }

                }
                this.radioChange(currentNode.checkedKeys)
                this.$message.error(this.$t('eventRule.zdktj4g'));
            }else{
                this.$emit('checkedNode', node, currentNode);
            }
        },
        //选中节点改变
        handleCheckChange(node) {
            let res = this.$refs.tree.getCheckedNodes();
            let checkedIds = [];
            res.forEach((item) => {
                checkedIds.push(item.id);
            });
            this.$emit('checkedAreaIds', checkedIds);
            this.$emit('checkedAreaItem', res);
        },
        setCheckedKeys(ids) {
            this.$refs.tree.setCheckedKeys(ids);
        },
        //只许单选
        radioChange(data){
            this.getAreaChannelTree();
            this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys(data);
            });

        }

    }
};

</script>

<style lang="less" scoped>
/deep/.is-current > .el-tree-node__content {
    background: #d9ecff;
    position: relative;
}
/deep/.is-current > .el-tree-node__content::before {
    content: '';
    position: absolute;
    width: 3px;
    height: 100%;
    background: #409eff;
    top: 0;
    left: 0;
    opacity: 1;
}
.search-wrap {
    padding: 8px 12px;
    .el-icon-search {
        line-height: 32px;
        margin-right: 5px;
        font-size: 18px;
    }
}
.iconjiedian {
    width: 15px;
    margin-right: 3px;
    vertical-align: middle;
}
.el-tree-node__label img {
    vertical-align: middle;
    margin-right: 3px;
}
/deep/.tree-channel{
    height: 401px;
    overflow-y: scroll;
}
/deep/.el-icon-refresh:hover{
    color: #409eff;
}
/deep/.el-icon-refresh{
    cursor: pointer
}
</style>
