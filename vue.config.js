const proxyTarget = 'http://192.168.113.229:9090'
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    chainWebpack: config => {
        config.module.rule('js').use('babel-loader').end()
        config.module
          .rule('image')
          .test(/\.ico$/)
          .use('url-loader')
          .loader('url-loader')
    },
    devServer: {
        proxy: {
            '/v3': {
                target: proxyTarget,
                changeOrigin: true
            },
            '/download': {
                target: proxyTarget,
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false,
    parallel: false
};
