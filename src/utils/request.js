/*
 * @Author: your name
 * @Date: 2021-12-20 17:18:02
 * @LastEditTime: 2021-12-21 16:50:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/utils/request.js
 */
import axios from "axios";
import { getToken, getUsername } from "./cookies";
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi'
const service = axios.create({
    baseURL: BASEURL,
    timeout: 5000,
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送前做
    config.headers['Token'] = getToken();
    // config.headers['Username'] = getUsername();
    return config;
}, function (error) {
    // 对请求错误做
    return Promise.reject(error);
})
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    if (response.status !== 200) {
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