const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        proxy.createProxyMiddleware({
            // target: 'http://172.16.77.30:8090/api',
            target: 'http://localhost:8090/api',
            // target: 'http://172.16.37.135:8090/api',
            // target: 'http://192.168.42.128:9000/api',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    )

    // app.use(
    //     '/java',
    //     proxy.createProxyMiddleware({
    //         target: 'http://127.0.0.1:9200/java',
    //         // target: 'http://192.168.42.128:9200/java',
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/java': ''
    //         }
    //     })
    // )
};
