
<template>
    <div class="contentmenu">
        <div class="h1"><b>核苷酸和核苷</b></div>
        <el-tree
            ref="tree"
            class="tree-area"
            node-key="id"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :data="treeData"
            :highlight-current="true"
            @node-click="handleCheckChange"
            :current-node-key="currentNode"
            :props="props">
            <span :title="node.label" class="custom-tree-node" slot-scope="{ node,data }">
                <span class="el-tree-node__label">
                    <span class="node-txt">{{ node.label }}</span>                    
                </span>
            </span>
        </el-tree>
        
    </div>
</template>
<script>
import { Tree } from 'element-ui';
export default {
    components: { ElTree: Tree },
    name: 'echartBar',
    data() {
        return {
            treeData: [{
                id: 1,
                name: '核苷酸结构',
                expanded: true,
                children: [
                    { id: 2, name: '直接放大' },
                    { id: 3, name: '基于谈真的检测' },
                    { id: 4, name: '基于燃料的检测' },
                    { id: 5, name: '冻干物' },
                ]
            },{
                id: 6,
                name: '逆转录和rt-pcr',
                expanded: true,
                children: []
            },{
                id: 7,
                name: '缓冲液和试剂',
                expanded: true,
                children: []
            },{
                id: 8,
                name: '污染与控制',
                expanded: true,
                children: []
            }],
            props: {
                label: 'name',
                children: 'children',
            },
            currentNode: 1,
        };
    },
    watch: {},
    created(){
       
    },
    mounted(){
        this.$nextTick(() => {
            // 获取第一个节点的 key（例如 id）并设置默认展开的 key
            const firstNodeKey = this.treeData[0].id; // 或者使用其他方式获取第一个节点的 key，例如通过递归找到第一个非叶子节点等
            this.$refs.tree.setCheckedKeys([firstNodeKey]); // 如果需要同时选中，使用 setCheckedKeys，否则使用 setExpandedKeys([firstNodeKey])
            this.$refs.tree.setExpandedKeys([firstNodeKey]); // 只展开第一个节点
        });
    },
    methods: {
        //选中节点改变
        handleCheckChange(node) {
            console.log(node)
            let res = this.$refs.tree.getCheckedNodes();
            let checkedIds = [];
            res.forEach((item) => {
                checkedIds.push(item.id);
            });
            // this.$emit('checkedMenuIds', checkedIds);
            // this.$emit('checkedMenuItem', res);
        },
    }
}
</script>
<style lang="less" scoped>
.contentmenu {
    .h1 {
        font-size: 20px;
        color: #000;
        font-weight: 400;
        color: #046500;
        
    }
    ul {
        list-style-position: outside;
        clear: left;
        padding: 0;
        li{
            padding: 2px 5px;
            color: #046500;
            font-size: 13px;
            padding: 5px;
        }

        li.active {
            background-color: #f2f2f2;
            padding: 10px 5px;
        }
    }
}
.el-tree {
    overflow-y: auto;
    min-height: 50vh;
    .custom-tree-node{
        width: 100%;//外部容器的宽度
        // overflow: hidden;
        // text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        cursor: pointer;
        .el-tree-node__label{
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 40px;
            padding: 20px 15px; 
        }
    }
    .is-current > .el-tree-node__content {
        background: #d9ecff;
        position: relative;
    }
    /deep/.is-current {
        background-color: #f2f2f2;
        color: #046500
    }
}
/deep/ .el-tree-node__expand-icon {
    display: none!important;
}
</style>