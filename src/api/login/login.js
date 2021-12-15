/*
 * @Author: your name
 * @Date: 2021-12-13 17:08:00
 * @LastEditTime: 2021-12-14 13:57:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/login/login.js
 */
import service from "../../utils/request";
/**
 * @description: 获取验证码
 * @param {*}
 * @return {*}
 * http://old.web-jshtml.cn/vue_admin_api/getSms/ 
 */
export function GetCode(data) {
    return service.request({
        url: 'getSms/',
        method: "POST",
        data       
    })
}
