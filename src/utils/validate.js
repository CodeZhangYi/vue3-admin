/*
 * @Author: your name
 * @Date: 2021-12-13 15:47:34
 * @LastEditTime: 2021-12-13 15:47:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/utils/validate.js
 */
// 正则
export const reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
export const reg_email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export const reg_phone = /^1[3456789]\d{9}$/;

// 密码验证
export const validate_password = reg_password;
// 验证邮箱
export function validate_email(value){
    return reg_email.test(value)
}
// 密码验证
export function validate_pass(value){
    return reg_password.test(value)
}
/**
 * 检验手机号
 */
export function validate_phone(value){
    return reg_phone.test(value);
}