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
        // message.error(data.message)
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