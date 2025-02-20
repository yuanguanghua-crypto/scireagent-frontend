<!-- 一个上传事例文件 -->
<template>
    <div class="uploader-example">
        <uploader
            :options="options"
            :autoStart="false"
            :fileStatusText="statusText"            
            ref="uploader"
            @file-added="onFileAdded"
            @file-progress="onFileProgress"
            @file-success="onFileSuccess"
            @file-removed="removeFile"
            @file-error="onFileError">
            <uploader-unsupport></uploader-unsupport>
            <uploader-drop>
                <uploader-btn :attrs="attrs" ref="uploadBtn">选择视频</uploader-btn>
            </uploader-drop>
            <uploader-list></uploader-list>
        </uploader>
    </div>
</template>

<script>
// sparkMD5工具
import SparkMD5 from 'spark-md5';
import { uploadPicVideo,deletePicVideo } from '@/api/v3/largeScreen/set.js';
import * as mUtils from '@/utils/mUtils'
export default {
    data() {
        return {
            file: '',
            fileMd5: '',
            chunkTotal: 0,
            fileChunkSize: 20 * 1024 * 1024, // 文件分块大小
            //进度条数值
            options: {
                target: '/v3/portal/promotionalFile/upload',
                singleFile: true,
                fileParameterName: 'file',
                simultaneousUploads: 1,
                chunkSize: 20 * 1024 * 1024,
                testChunks: true,
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: (chunk, result) => {
                    this.chunkTotal++;
                    let data = JSON.parse(result);
                    if (data.skipUpload) {
                        return true;
                    }
                    return (data.uploaded || []).indexOf(chunk.offset + 1) >= 0;
                },
                attrs: this.attrs,
                testMethod: 'POST',
                headers: {
                      'X-Date': mUtils.formatDate(new Date(), 4),
                      'X-Token':localStorage.getItem('token'),
                      // 'X-Sign': mUtils.MD5(config.method.toUpperCase() + config.url + XDate + mUtils.MD5(paramStr) + '1H8OoEUF'),
                      'token': localStorage.getItem('token'),
                      "lang": (this.$store.state.app.language).toUpperCase(),
                      'clientType': 'web',
                },
                query() {}
            },
            attrs: {
                accept: ["video/*"]
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
            window.uploader = this.$refs.uploader.uploader;
        });
    },
    computed: {
        statusText() {
            return {
                success: this.$t('server_setting.success'),
                error: this.$t('server_setting.Error'),
                uploading: this.$t('server_setting.shangc'),
                paused: this.$t('server_setting.zant'),
                waiting: this.$t('server_setting.dengd')
            };
        },
        // Uploader实例
        uploader() {
            return this.$refs.uploader.uploader;
        }
    },
    methods: {
        complete() {
            console.log('complete', arguments);
        },
        fileComplete() {
            console.log('file complete', arguments);
        },
        // 文件添加时触发
        onFileAdded(file) {
            this.file = file;
            this.computeMD5(file);
        }, //文件删除
        removeFile(file) {
            var paramData = {
                fileMd5: this.fileMd5
            };
            deletePicVideo(paramData).then(res => {
                if (res.code == 1000) {
                    this.local_time = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        onFileProgress(rootFile, file, chunk) {
            console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`);
        },
        onFileSuccess(rootFile, file, response, chunk) {
            // let res = JSON.parse(response);
            // // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
            // //合并文件
            // if (res.data.skipUpload) {
            //     this.$message({ message: '系统升级成功', type: 'success' });
            //     return;
            // }
            uploadPicVideo({
                fileMd5: this.fileMd5,
                chunkTotal: this.chunkTotal,
                fileName: file.name
            }).then(res => {
                this.$message({ message: this.$t('public.shangccg'), type: 'success' });
                console.info(res);
                this.$emit('fileinfo',res)
            });

            // 重置总块数
            this.chunkTotal = 0;
        },
        onFileError(rootFile, file, response, chunk) {
            this.$message({
                message: response,
                type: 'error'
            });
        },
        /**
         * 计算md5，实现断点续传及秒传
         * @param file
         */
        computeMD5(file) {
            const loading = this.$loading({
                lock: true,
                text: this.$t('server_setting.zzdqwj'),
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });

            let fileReader = new FileReader();
            let time = new Date().getTime();
            let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
            let currentChunk = 0;
            let chunkSize = 20 * 1024 * 1024;
            let chunks = Math.ceil(file.size / chunkSize);
            let spark = new SparkMD5.ArrayBuffer();
            file.pause();
            loadNext();
            console.info('chunks:', chunks);
            fileReader.onload = e => {
                spark.append(e.target.result);
                if (currentChunk < chunks) {
                    currentChunk++;
                    loadNext();
                } else {
                    let md5 = spark.end();
                    this.fileMd5 = md5;
                    loading.close();
                    this.computeMD5Success(md5, file);
                    this.$emit('getFail', file.name);
                    console.log(
                        `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() -
                            time} ms`
                    );
                }
            };
            fileReader.onerror = function() {
                this.error(`文件${file.name}读取出错，请检查该文件`);
                // loading.close();
                file.cancel();
            };
            function loadNext() {
                let start = currentChunk * chunkSize;
                let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
            }
        },
        computeMD5Success(md5, file) {
            // Object.assign(this.uploader.opts, {
            //     query: {
            //         // file: file.file,
            //         token: localStorage.getItem('token')
            //     }
            // });
            file.uniqueIdentifier = md5;
            // file.resume();
        },
        upload() {
            this.file.resume();
        }
    }
};
</script>

<style lang="less" scoped>
.uploader-example {
    width: 100px;
    display: inline-block;
    vertical-align: middle;
}
/deep/.uploader-file-status {
    text-indent: 6px;
}
/deep/.uploader-btn {
    display: inline-block;
    width: 80px;
    height: 23px;
    font-size: 14px;
    padding: 6px 8px 4px 8px;
    border: none;
    border-radius: 4px;
    background: #e8ecf0;
    outline: none;
    text-align: center;
    margin-left: -1px;
}
/deep/.uploader-drop {
    position: relative;
    padding: 0px;
    overflow: hidden;
    border: 0px dashed rgba(255, 255, 255, 0.5);
    background-color: #ffffff;
}
/deep/.uploader-list {
   width: 350px;
}
/deep/.uploader-file {
    position: relative;
    margin-top: 23px;
    height: 49px;
    line-height: 49px;
    overflow: hidden;
    border-bottom: 1px solid #cdcdcd;
}
</style>
