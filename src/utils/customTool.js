// 自定义的公用方法

window.clearallInterval = function () {
    // 暴力清除 定时器  ie不可用
    for (let i = 0; i < 5000; i++) {
        clearInterval(i)
    }
}

