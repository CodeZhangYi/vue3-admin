/*
 * @Author: your name
 * @Date: 2021-12-22 14:44:33
 * @LastEditTime: 2021-12-22 15:07:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/sys/menu.js
 */
import service from "../../utils/request";

export function menuList() {
    return service.request({
        url: '/sys/menu/list',
        method: 'get'
    })
}