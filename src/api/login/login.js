/*
 * @Author: your name
 * @Date: 2021-12-13 17:08:00
 * @LastEditTime: 2021-12-16 10:07:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/login/login.js
 */
import service from "../../utils/request";
/**
 * @description: 获取登陆验证码
 * @param {*}
 * @return {*}
 */
export function GetCode(data) {
    return service.request({
        url: 'getSms/',
        method: "POST",
        data       
    })
}
/**
 * @description: 获取注册验证码
 * @param {*}
 * @return {*}
 */
export function loginCode(data){
    return service.request({
        url:'login/',
        method:'POST',
        data
    })
}
