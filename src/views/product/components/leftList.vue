
<template>
    <div class="contentmenu">
        <div class="h1">按结构划分的核苷酸</div>
        <el-tree
            ref="tree"
            class="tree-area"
            node-key="id"
            :expand-on-click-node="false"
            :default-expand-all="true"
            :data="treeData"
            :highlight-current="true"
            @node-click="handleCheckChange"
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
                name: 'Node 1',
                expanded: true,
                children: [
                    { id: 2, name: 'Child 1' },
                    { id: 3, name: 'Child 2' }
                ]
            },{
                id: 4,
                name: 'Node 2',
                expanded: true,
                children: [
                    { id: 5, name: 'Child 3' },
                    { id: 6, name: 'Child 4' }
                ]
            }],
            props: {
                label: 'name',
                children: 'children',
            },
        };
    },
    watch: {},
    created(){
       
    },
    mounted(){},
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
    height: 100%;
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