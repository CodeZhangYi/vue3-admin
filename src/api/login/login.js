/*
 * @Author: your name
 * @Date: 2021-12-13 17:08:00
 * @LastEditTime: 2021-12-21 16:53:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/login/login.js
 */
import service from "../../utils/request";
// 获取登陆验证码
export function CodeImg(params) {
    return service.request({
        url: '/captcha.jpg',
        method: 'get',
        params,
        responseType: "arraybuffer"
        // responseType: 'blob',
    })
}
/**
 * @description: 获取注册验证码
 * @param {*}
 * @return {*}
 */
export function loginCode(data) {
    return service.request({
        url: '/sys/login',
        method: 'POST',
        data
    })
}
// 获取用户菜单
export function Menu(params) {
    return service.request({
        url: "/sys/menu/nav",
        method: 'GET',
        params
    })
}
