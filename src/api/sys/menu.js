/*
 * @Author: your name
 * @Date: 2021-12-22 14:44:33
 * @LastEditTime: 2021-12-27 16:08:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/api/sys/menu.js
 */
import service from "../../utils/request";
// 获取菜单列表
export function menuList() {
    return service.request({
        url: '/sys/menu/list',
        method: 'get'
    })
}
// 添加 修改菜单列表
export function menuSelect() {
    return service.request({
        url: '/sys/menu/select',
        method: 'GET'
    })
}
// 新增菜单列表
export function addMenu(data) {
    return service.request({
        url: '/sys/menu/save',
        method: 'post',
        data
    })
}
// 删除菜单
export function delMenu(data) {
    return service.request({
        url: `/sys/menu/delete/${data}`,
        method: 'post',
    })
}
