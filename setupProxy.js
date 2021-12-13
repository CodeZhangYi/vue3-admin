/*
 * @Author: your name
 * @Date: 2021-12-13 17:05:05
 * @LastEditTime: 2021-12-13 17:39:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/setupProxy.js
 */

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware([process.env.VUE_APP_API], {
        target: process.env.VUE_APP_BASE_URL, //配置你要请求的服务器地址
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.VUE_APP_API}`]: ""
        },
    }))
    // /devApi/login/
    /**
     * 1、匹配到devApi，开始做代理  http://www.web-jshtml.cn/api/react
     * 2、/devApi/login/ => /login/
     * 3、替换之后的地址：http://www.web-jshtml.cn/api/react/login/
     */
    // app.use(proxy("/manage/api", {
    //     target: "http://admintest.happymmall.com:7000" ,
    //     changeOrigin: true,
    // }))
};
