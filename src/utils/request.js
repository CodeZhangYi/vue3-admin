/*
 * @Author: your name
 * @Date: 2021-12-13 16:58:25
 * @LastEditTime: 2021-12-13 17:01:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/utils/request.js
 */
import axios from "axios";
import { getToken, getUsername } from "./cookies";
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000,
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送前做
    config.headers['Token'] = getToken();
    config.headers['Username'] = getUsername();
    return config;
}, function (error) {
    // 对请求错误做
    return Promise.reject(error);
})
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // console.log(response);
    const data = response.data;
    if (data.resCode !== 0) {
        this.message.error(data.message)
        return Promise.reject(response)
    } else {
        // 对响应数据做
        return response;
    }
}, function (error) {
    // 对响应错误做
    return Promise.reject(error);
})
export default service