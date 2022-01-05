module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: "8080",
        open: true,
        https: false,
        proxy: {
            '/api/users': {
                target: "https://jsonplaceholder.typeicode.com/users",
                ws: true,
                changeOrigin: true,
                pacthRewrite: {
                    '^/api/users': ''
                }
            }
        }
    }
}