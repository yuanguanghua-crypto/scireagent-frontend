<template>
    <div class="pagination-container">
        <div v-if="showTotal" class="pageTotal">{{$t('index.g')}} {{Math.ceil(total/pageCurrentPageSize)}} {{$t('index.y')}} / {{total}} {{$t('index.t')}}<span></span></div>
        <div v-else></div>
       
        <div style="display:flex;align-items: center;">
            <div class="el-pagination btn-fore" v-if="swy">
                <button type="button" class="btn-prev" @click="toFore" :disabled="pageCurrentIndex==1">{{$t('index.sy')}}</button>
            </div>
            <!-- 分页主体 -->
            <!-- :prev-text="$t('index.syy')"
            :next-text="$t('index.xyy')" -->
            <el-pagination
                :small="issmall"
                background
                prev-text="<"
                next-text=">"
                layout="prev, pager, next"
                :pager-count=5
                @current-change="handleCurrentChange"
                :current-page.sync="elPageIndex"
                :page-size.sync="pageSize"
                :total="total">
            </el-pagination>
            <div class="el-pagination btn-fore" v-if="swy">
                <button type="button" class="btn-prev" @click="toAft" :disabled="pageCurrentIndex==Math.ceil(this.total==0?1:this.total/this.pageCurrentPageSize)">{{$t('index.wy')}}</button>
            </div>
             <!-- 分页设置 -->
            <div  v-if="showImg">
                <el-select class="yesize" v-model="pageCurrentPageSize" @change="updatePageSize">
                    <el-option
                    v-for="item in pagesizes"
                    :key="item"
                    :label="`${item} ` + $t('index.t') + '/'  + $t('index.y')"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
            <div v-if="showTotal" class="pageJump">
                <span>{{$t('index.tz')}}</span>
                <el-input class="yema" v-model="pageCurrentIndex" @change="inputBlur"></el-input>
                <span>{{$t('index.y')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyPagination',
    props: {
      issmall:{
        type: Boolean,
          default: false
      },
        swy:{
          type: Boolean,
          default: true
        },
        total: {
            required: true,
            type: Number
        },
        pageSize: {
            type: Number,
            default: 15
        },
        pageIndex: {
            type: Number,
            default: 1
        },
        showTotal: {
            type: Boolean,
            default: true
        },
        showImg: {
            type: Boolean,
            default: true
        },
        pagesizes: {
            type: Array,
            default: function () {
                return [15,30,45,60,75,100,200];
            }
        }
    },
    data() {
        return {
            background: true,
			pageCurrentTotal:0,
			pageCurrentPageSize:10,
            pageCurrentIndex: 1,
			elPageIndex:1,
			// pagesizes:[15,30,45,60,75,100,200]
        };
    },
    watch: {
        pageIndex: {
            handler(newVal, oldVal) {
                this.pageCurrentIndex = newVal;
                this.elPageIndex = newVal;
            },
            immediate: true
        },
        pageSize: {
            handler(newVal, oldVal) {
                this.pageCurrentPageSize = newVal;
            },
            immediate: true
        },
        total: {
            handler(newVal, oldVal) {
                this.pageCurrentTotal = newVal;
            },
            immediate: true
        },
		pageCurrentIndex(newVal, oldVal){
			if(newVal==""){
				// this.pageCurrentIndex = 1;
			}else{
				if(isNaN(parseInt(newVal))){
					this.pageCurrentIndex = 1;
				}else{
					if(parseInt(newVal)==0){
						this.pageCurrentIndex = 1;
					}else{
						this.pageCurrentIndex = parseInt(newVal);
					}
				}
			}
			
		},
    },
    methods: {
        handleCurrentChange(val) {
            this.$emit('pagination', val);
        },
		updatePageSize(val){
			this.$emit('getPageSize', val);
		},
		updataCurrentIndex(){
			this.$emit('pagination', parseInt(this.pageCurrentIndex));
		},
		inputBlur(){
			if(this.pageCurrentIndex==""){
				this.pageCurrentIndex = 1;
			}else{
				if(parseInt(this.pageCurrentIndex)>Math.ceil(parseInt(this.total)/parseInt(this.pageCurrentPageSize))){
					this.pageCurrentIndex = Math.ceil(this.total==0?1:this.total/this.pageCurrentPageSize);
				}
            }
            this.updataCurrentIndex();
        },
        toFore(){
            this.pageCurrentIndex = 1;
            this.updataCurrentIndex();
        },
        toAft(){
            this.pageCurrentIndex = Math.ceil(this.total==0?1:this.total/this.pageCurrentPageSize);
            this.updataCurrentIndex();
        }
    }
};
</script>

<style lang="less" scoped>

/deep/.el-input__inner{
	height: 32px;
}
// 分页总数样式
.pageTotal{
    margin-right: 32px;
    font-size: 14px;
    color:#1D2129 ;
}
// 分页设置样式
.yesize{
	width: 105px;
	/deep/.el-input__icon{
		line-height: 32px;
	}
}
// 上下一页样式
/deep/ .el-pagination.is-background .btn-prev,/deep/ .el-pagination.is-background .btn-next{
    background-color: unset;
    height: unset;
    line-height: unset;
    span{
        height: 32px;
        line-height: 32px;
        color: #1D2129 ;
    }
}
// 分页页码样式
/deep/ .el-pagination.is-background .el-pager li{
    background-color: unset;
    height: 32px;
    line-height: 32px;
    // width: unset;
    color: #1D2129 ;
    &.active {
        width: 32px;
    }
}
// 首页尾页样式
.btn-fore.el-pagination{
    padding: 0;
    button{
        color: #1D2129 ;
        padding: 0;
        margin: 0;
        height: 32px;
        line-height: 32px;
        background-color: unset;
    }
}
// 分页跳转样式
.pageJump{
    display:flex;
    align-items:center;
    margin-left:10px;
    color: #1D2129 ;
}
.yema{
	width: 46px;
    font-size: 14px;
    margin: 0 6px;
	/deep/.el-input__inner{
		padding: 0;
		text-align: center;
        color: #1D2129;
        background-color: unset;
        min-width: auto;
	} 
}
</style>
