<template>
    <div class="contain ChannelTable">
        <div class="right-content">
            <div class="jvs-container">
                
                <div class="table_data">
                    <div class="title_table">
                        <div class="search" style="margin: 0;padding-left: 0;">
                            <div style="float: right; width: 480px">
                                <el-input v-model="search.keyword" :placeholder="$t('qsrdtsb')" style="width: 240px; margin-right: 20px"></el-input>
                                <el-button type="primary" class="btn60" size="mini" @click="onSubmit" >{{ $t('public.cx') }}</el-button>
                                <el-button class="btn60" size="mini" @click="empty" plain>{{ $t('public.qk') }} </el-button>
                            </div>
                        </div>
                        <div>
                            <el-button type="primary" class="btn100" size="mini" @click="batchDelete()" icon="el-icon-delete" style="margin: 0 0 0 12px">
                            {{$t('public.sc')}}</el-button>
                        </div>
                    </div>
                    <div class="table-row">
                        <el-table
                            height="400"
                            ref="table"
                            :data="tableDatas"
                            :row-class-name="tableRowClassName"
                            v-loading="listLoading"
                            @select="tableSelect"
                            @select-all="tableSelectAll"
                            :element-loading-text="$t('public.sjjzz')">
                            <template slot="empty">
                                <div class="nodata">
                                    <img src="@/assets/img/nodata.png" />
                                    <div class="txt">{{ $t('public.zwsj') }}</div>
                                </div>
                            </template>
                            <el-table-column type="selection" :selectable="() => true" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="order" :label="$t('public.xh')" width="80"  show-overflow-tooltip></el-table-column>
                            <el-table-column prop="channelName" sortable="custom" :label="$t('eventRule.tdmc')" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="deviceName" :label="$t('eventRule.sssb')" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="areaName" :label="$t('eventRule.ssqy')" show-overflow-tooltip></el-table-column>                            
                            <el-table-column prop="streamType" label="码流类型" show-overflow-tooltip></el-table-column>                            
                            <el-table-column prop="stayTime" label="停留时间" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="id" :label="$t('public.cz')" width="110">
                                <template slot-scope="scope">
                                    <span>
                                        <i class="iconfont iconshanchu icon-css" @click="deleteRule(scope.row)" :title="$t('public.sc')"></i>
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChannelTable',
    props: {
        // 元数据
        tableData: {
            require: true,
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            total: 0,
            search: {
                keyword: '',
                page_size: 15,
                page_index: 1
            },
            listLoading: false,
            ruleId: '', //当前点击数据
            orderBy: '',
            asc: null,
            // 操作table数据
            tableDatas: [],
            delTables: [],
            tableHeight: 410
        };
    },
    watch: {
        tableData: {
            handler(val) {
                val.forEach((item) => {
                    item.searchStr = item.channelName + item.deviceName + item.areaName;
                });
                this.tableDatas = JSON.parse(JSON.stringify(val));
                this.total = this.tableDatas.length;
                this.getRuleList(this.tableDatas, this.search.page_index, this.search.page_size);
            },
            deep: true
        }
    },
    created() {},
    mounted() {},
    methods: {
        sortChange(column) {
            this.orderBy = column.prop;
            if (column.order === 'ascending') {
                this.asc = true;
            } else if (column.order === 'descending') {
                this.asc = false;
            } else {
                this.asc = null;
                this.orderBy = '';
            }
        },
        empty() {
            this.search.page_index = 1;
            this.search.page_size = 15;
            this.search.keyword = '';
            this.getRuleList(this.tableData, this.search.page_index, this.search.page_size);
        },
        closeAddDiolog() {
            this.ruleId = '';
            this.dialogVisible = false;
        },
        // 获取列表
        getRuleList(list, index, size) {
            this.total = list.length;
            let copyList = JSON.parse(JSON.stringify(list));
            this.tableDatas = copyList.splice((index - 1) * size, size);
        },
        //搜索按钮
        onSubmit() {
            this.search.page_index = 1;
            let searchDatas = this.tableData.filter((item) => {
                return item.searchStr.includes(this.search.keyword);
            });
            this.getRuleList(searchDatas, this.search.page_index, this.search.page_size);
        },
        getPageSize(val) {
            this.search.page_size = val;
            this.search.page_index = 1;
            this.getRuleList(this.tableData, this.search.page_index, this.search.page_size);
        },
        //获取当前点击的页码
        getPageIndex(page) {
            // this.search.page_index = page;
            // this.getRuleList(this.tableData, this.search.page_index, this.search.page_size);

            if(this.search.keyword!=''){
                let searchDatas = this.tableData.filter((item) => {
                    return item.searchStr.includes(this.search.keyword);
                });
                this.search.page_index = page;
                this.getRuleList(searchDatas, this.search.page_index, this.search.page_size);
            }else{
                this.search.page_index = page;
                this.getRuleList(this.tableData, this.search.page_index, this.search.page_size);
            }
        },
        tableRowClassName({ row, rowIndex }) {
            row.rowIndex = rowIndex;
        },
        tableSelect(val) {
            this.delTables = val;
        },
        tableSelectAll(val) {
            this.delTables = val;
        },

        //序号
        order(row, column, cellValue, index) {
            //放回索引值
            return this.search.page_size * (this.search.page_index - 1) + 1 + row.rowIndex;
        },
        //单选删除按钮
        deleteRule(row) {
            this.dataDeteleFn(this.tableData, [row]);
            let num=this.tableData.length%this.search.page_size
            if(num==0){
                this.search.page_index=this.search.page_index-1
                if(this.search.page_index==0){
                    this.search.page_index=1
                }
            }
            this.getRuleList(this.tableData, this.search.page_index, this.search.page_size);
        },

        //批量删除
        batchDelete() {
            if(this.delTables.length==0) return
            this.dataDeteleFn(this.tableData, this.delTables);
            let num=this.tableData.length%this.search.page_size
            if(num==0){
                this.search.page_index=this.search.page_index-1
                if(this.search.page_index==0){
                    this.search.page_index=1
                }
            }
            this.getRuleList(this.tableData, this.search.page_index, this.search.page_size);
        },

        //确认删除
        dataDeteleFn(list = [], delArr = []) {
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                for (let j = 0; j < delArr.length; j++) {
                    const delItem = delArr[j];
                    if (item.channelId == delItem.channelId) {
                        list.splice(i, 1);
                        i--;
                    }
                }
            }
            let ids = list.map((item) => item.channelId);
            this.$emit('checkedKeys', ids);
            
        }
    }
};
</script>

<style lang="less" scoped>
.contain {
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    padding: 0;
    height: 100%;
}
.ChannelTable {
    .right-content {
        width: 100%;
        box-sizing: border-box;
        .search {
            display: block;
            padding-top: 13px;
            padding-right: 20px;
            box-sizing: border-box;
            border-bottom: solid 1px #e8ecf0;
            height: 60px;
        }
    }
}
.title_table {
    height: 50px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.table_data {
    // margin-top: 10px;
    border-radius: 4px;
    overflow: hidden;
    // padding-right: 20px;
    background: #fff;
}
</style>
