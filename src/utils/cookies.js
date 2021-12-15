/*
 * @Author: your name
 * @Date: 2021-12-13 16:58:42
 * @LastEditTime: 2021-12-13 16:58:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/utils/cookies.js
 */
import cookies from 'react-cookies';
const tokenAdmin = 'adminToken';
const username = 'username'

export function setToken(value) {
    cookies.save(tokenAdmin, value)
}
export function getToken() {
    return cookies.load(tokenAdmin)
}
export function setUsername(value) {
    cookies.save(username, value);
}
export function getUsername(){
    return cookies.load(username)
}